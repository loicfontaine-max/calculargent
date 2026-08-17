import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { calculators } from "../lib/calculators.ts";
import { editorialSources } from "../lib/editorial-sources.ts";

const trustedHosts = new Set(["www.amf-france.org", "www.insee.fr", "www.economie.gouv.fr", "www.service-public.fr", "www.banque-france.fr"]);

test("gives every calculator at least two institutional references", () => {
  assert.deepEqual(Object.keys(editorialSources).sort(), calculators.map(({ slug }) => slug).sort());
  for (const calculator of calculators) {
    const sources = editorialSources[calculator.slug];
    assert.ok(sources.length >= 2, `${calculator.slug} doit avoir au moins deux sources`);
    for (const source of sources) {
      const url = new URL(source.url);
      assert.equal(url.protocol, "https:");
      assert.ok(trustedHosts.has(url.hostname), `${url.hostname} doit être une source institutionnelle approuvée`);
      assert.ok(source.label.length > 20);
      assert.ok(source.publisher.length > 3);
    }
  }
});

test("keeps noindex trust pages out of the sitemap", async () => {
  const source = await readFile(new URL("../app/sitemap.ts", import.meta.url), "utf8");
  assert.match(source, /lastModified/);
  assert.match(source, /\.\.\.calculators\.map/);
  assert.match(source, /\.\.\.categorySlugs\.map/);
  assert.doesNotMatch(source, /baseUrl}\/contact/);
  assert.doesNotMatch(source, /baseUrl}\/mentions-legales/);
});
