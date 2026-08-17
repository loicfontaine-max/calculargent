import type { MetadataRoute } from "next";
import { assumptions, calculators } from "../lib/calculators";
import { categorySlugs } from "../lib/categories";
import { guideSlugs } from "../lib/guides";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.SITE_URL || "http://localhost:3000";
  const lastModified = new Date(assumptions.updatedAtIso);
  return [
    { url: baseUrl, lastModified, changeFrequency: "monthly", priority: 1 },
    ...calculators.map(({ slug }) => ({ url: `${baseUrl}/calculateur/${slug}`, lastModified, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...categorySlugs.map((slug) => ({ url: `${baseUrl}/${slug}`, lastModified, changeFrequency: "monthly" as const, priority: 0.7 })),
    { url: `${baseUrl}/guides`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    ...guideSlugs.map((slug) => ({ url: `${baseUrl}/guides/${slug}`, lastModified, changeFrequency: "monthly" as const, priority: 0.75 })),
    { url: `${baseUrl}/lexique`, lastModified, changeFrequency: "monthly", priority: 0.65 },
    { url: `${baseUrl}/methode`, lastModified, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/journal-des-mises-a-jour`, lastModified, changeFrequency: "monthly", priority: 0.45 },
    { url: `${baseUrl}/confidentialite`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/a-propos`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseUrl}/auteur`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseUrl}/cookies`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/publicite`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
