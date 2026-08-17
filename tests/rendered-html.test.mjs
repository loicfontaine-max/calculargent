import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the CalculArgent homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>CalculArgent — Calculateurs financiers gratuits<\/title>/i);
  assert.match(html, /Voyez plus clair/);
  assert.match(html, /12<\/b><span>outils essentiels/);
  assert.match(html, /"@type":"WebSite"/);
  assert.match(html, /rel="canonical" href="http:\/\/localhost:3000\/?"/);
  assert.match(html, /href="\/calculateur\/interets-composes"/);
  assert.match(html, /href="\/calculateur\/mensualite-pret"/);
  assert.match(html, /href="\/budget"/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|Building your site/i);
});

test("renders calculator authority and structured navigation signals", async () => {
  const response = await render("/calculateur/taux-endettement");
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /"@type":"BreadcrumbList"/);
  assert.match(html, /"@type":"WebPage"/);
  assert.match(html, /Haut Conseil de stabilité financière/);
  assert.match(html, /SOURCES INSTITUTIONNELLES/);
  assert.match(html, /rel="canonical" href="http:\/\/localhost:3000\/calculateur\/taux-endettement"/);
  assert.doesNotMatch(html, /<meta property="og:image"[^>]+og\.png/);
});

test("publishes category, author and new calculator pages", async () => {
  const responses = await Promise.all([render("/epargne"), render("/dettes"), render("/patrimoine"), render("/budget"), render("/auteur"), render("/calculateur/mensualite-pret")]);
  assert.deepEqual(responses.map((response) => response.status), [200, 200, 200, 200, 200, 200]);
  const pages = await Promise.all(responses.map((response) => response.text()));
  assert.match(pages[0], /Calculateurs d’épargne/);
  assert.match(pages[4], /Loïc Fontaine/);
  assert.match(pages[5], /Mensualité estimée|Quelle mensualité/);
});

test("keeps calculator content and assumptions centralized", async () => {
  const [calculators, calculatorPage, layout] = await Promise.all([
    readFile(new URL("../lib/calculators.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/calculateur/[slug]/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(calculators, /export const assumptions/);
  assert.match(calculators, /export const calculators/);
  assert.match(calculators, /export function calculate/);
  assert.match(calculatorPage, /generateStaticParams/);
  assert.match(calculatorPage, /generateMetadata/);
  assert.match(layout, /NEXT_PUBLIC_ADSENSE_CLIENT/);
  assert.doesNotMatch(layout, /next\/font/);
});

test("publishes complete trust pages without local filesystem paths", async () => {
  const [homeResponse, legalResponse, contactResponse] = await Promise.all([
    render(),
    render("/mentions-legales"),
    render("/contact"),
  ]);
  const [home, legal, contact] = await Promise.all([
    homeResponse.text(),
    legalResponse.text(),
    contactResponse.text(),
  ]);

  assert.doesNotMatch(home, /\/Users\//);
  assert.match(legal, /Loïc Fontaine/);
  assert.match(legal, /OpenAI Ireland Limited/);
  assert.doesNotMatch(legal, /À compléter|Version préparatoire/i);
  assert.match(contact, /Ouvrir une demande sur GitHub/);
});
