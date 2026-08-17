import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/", origin = "http://localhost") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`${origin}${pathname}`, {
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

test("publishes the guide hub and complete editorial guides", async () => {
  const paths = ["/guides", "/guides/interets-composes", "/guides/combien-epargner-par-mois", "/guides/rembourser-credit-ou-epargner", "/guides/calcul-taux-endettement", "/guides/construire-fonds-urgence", "/guides/calcul-mensualite-pret", "/guides/calculer-patrimoine-net", "/guides/budget-50-30-20", "/guides/rendement-reel-inflation"];
  const responses = await Promise.all(paths.map((path) => render(path)));
  assert.deepEqual(responses.map((response) => response.status), paths.map(() => 200));
  const pages = await Promise.all(responses.map((response) => response.text()));
  assert.match(pages[0], /Les guides/);
  for (const html of pages.slice(1)) {
    assert.match(html, /"@type":"Article"/);
    assert.match(html, /"@type":"FAQPage"/);
    assert.match(html, /SOURCES OFFICIELLES/);
    assert.match(html, /PASSEZ À VOS CHIFFRES/);
    assert.doesNotMatch(html, /<meta property="og:image"[^>]+og\.png/);
  }
});

test("publishes a structured glossary and an editorial update log", async () => {
  const [glossaryResponse, updatesResponse] = await Promise.all([render("/lexique"), render("/journal-des-mises-a-jour")]);
  assert.equal(glossaryResponse.status, 200);
  assert.equal(updatesResponse.status, 200);
  const [glossary, updates] = await Promise.all([glossaryResponse.text(), updatesResponse.text()]);
  assert.match(glossary, /"@type":"DefinedTermSet"/);
  assert.match(glossary, /Taux annuel effectif global/);
  assert.match(glossary, /href="\/calculateur\/patrimoine-net"/);
  assert.match(updates, /Journal des/);
  assert.match(updates, /Architecture éditoriale/);
});

test("publishes every indexable page in the sitemap", async () => {
  const response = await render("/sitemap.xml");
  assert.equal(response.status, 200);
  const xml = await response.text();
  const locations = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
  assert.equal(locations.length, 35);
  assert.equal(new Set(locations).size, 35);
  assert.ok(locations.some((location) => location.endsWith("/lexique")));
  assert.ok(locations.some((location) => location.endsWith("/journal-des-mises-a-jour")));
  assert.ok(locations.some((location) => location.endsWith("/guides/rendement-reel-inflation")));
});

test("consolidates the www host and keeps missing pages out of the index", async () => {
  const wwwResponse = await render("/guides?source=test", "https://www.calculargent.fr");
  assert.equal(wwwResponse.status, 308);
  assert.equal(wwwResponse.headers.get("location"), "https://calculargent.fr/guides?source=test");

  const missingResponse = await render("/page-inexistante");
  assert.equal(missingResponse.status, 404);
  const missing = await missingResponse.text();
  assert.match(missing, /Page introuvable/);
  assert.match(missing, /<meta name="robots" content="noindex, follow"/i);
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
