const baseUrl = (process.env.SEO_BASE_URL || "https://calculargent.fr").replace(/\/$/, "");
const baseOrigin = new URL(baseUrl).origin;

function normalizeUrl(value) {
  const url = new URL(value, baseUrl);
  url.hash = "";
  const pathname = url.pathname === "/" ? "" : url.pathname.replace(/\/$/, "");
  return `${url.origin}${pathname}${url.search}`;
}

function textFrom(html, pattern) {
  return (html.match(pattern)?.[1] || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function attribute(html, tag, name, value, attributeName) {
  const tags = html.match(new RegExp(`<${tag}\\b[^>]*>`, "gi")) || [];
  for (const candidate of tags) {
    const expected = candidate.match(new RegExp(`${name}=["']([^"']+)["']`, "i"))?.[1];
    if (expected?.toLowerCase() !== value.toLowerCase()) continue;
    const found = candidate.match(new RegExp(`${attributeName}=["']([^"']+)["']`, "i"))?.[1];
    if (found) return found;
  }
  return "";
}

const sitemapResponse = await fetch(`${baseUrl}/sitemap.xml`);
if (!sitemapResponse.ok) throw new Error(`Sitemap inaccessible (${sitemapResponse.status})`);
const sitemap = await sitemapResponse.text();
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
const rows = [];

for (const url of urls) {
  const response = await fetch(url, { redirect: "follow" });
  const html = await response.text();
  const visible = html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/&(?:\w+|#\d+);/g, " ").replace(/\s+/g, " ").trim();
  const outgoing = [...html.matchAll(/<a\b[^>]+href=["']([^"']+)["']/gi)].map((match) => match[1].replaceAll("&amp;", "&")).filter((href) => !/^(?:mailto:|tel:|javascript:)/i.test(href)).map((href) => normalizeUrl(href)).filter((href) => new URL(href).origin === baseOrigin);
  rows.push({
    url,
    status: response.status,
    title: textFrom(html, /<title>(.*?)<\/title>/is),
    description: attribute(html, "meta", "name", "description", "content"),
    canonical: attribute(html, "link", "rel", "canonical", "href"),
    robots: attribute(html, "meta", "name", "robots", "content"),
    h1: (html.match(/<h1\b/gi) || []).length,
    words: visible ? visible.split(/\s+/).length : 0,
    structuredData: (html.match(/application\/ld\+json/gi) || []).length,
    internalLinks: (html.match(/<a\b[^>]+href=["']\//gi) || []).length,
    outgoing: [...new Set(outgoing)],
  });
}

const duplicateTitles = Object.entries(Object.groupBy(rows, (row) => row.title))
  .filter(([, matches]) => matches.length > 1)
  .map(([title, matches]) => ({ title, urls: matches.map(({ url }) => url) }));
const failures = rows.filter((row) => row.status !== 200 || row.h1 !== 1 || !row.title || !row.description || !row.canonical || row.canonical !== row.url);
const weakPages = rows.filter((row) => row.words < 250 || row.internalLinks < 3 || row.structuredData < 1);
const titleWarnings = rows.filter((row) => row.title.length < 25 || row.title.length > 65).map(({ url, title }) => ({ url, length: title.length, title }));
const descriptionWarnings = rows.filter((row) => row.description.length < 80 || row.description.length > 165).map(({ url, description }) => ({ url, length: description.length, description }));
const sitemapUrls = new Set(urls.map(normalizeUrl));
const inbound = Object.fromEntries([...sitemapUrls].map((url) => [url, 0]));
for (const row of rows) for (const url of row.outgoing) if (url !== normalizeUrl(row.url) && url in inbound) inbound[url] += 1;
const orphanPages = Object.entries(inbound).filter(([url, count]) => url !== normalizeUrl(baseUrl) && count === 0).map(([url]) => url);
const discoveredInternal = [...new Set(rows.flatMap((row) => row.outgoing))];
const brokenInternalLinks = [];
for (const url of discoveredInternal) {
  const response = await fetch(url, { redirect: "manual" });
  if (response.status >= 400) brokenInternalLinks.push({ url, status: response.status });
}
const reportRows = rows.map((row) => Object.fromEntries(Object.entries(row).filter(([key]) => key !== "outgoing")));

console.log(JSON.stringify({ baseUrl, urlCount: rows.length, failures, duplicateTitles, titleWarnings, descriptionWarnings, orphanPages, brokenInternalLinks, weakPages, rows: reportRows }, null, 2));
if (failures.length || duplicateTitles.length || orphanPages.length || brokenInternalLinks.length) process.exitCode = 1;
