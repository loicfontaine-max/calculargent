import type { MetadataRoute } from "next";
import { calculators } from "../lib/calculators";
import { categorySlugs } from "../lib/categories";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.SITE_URL || "http://localhost:3000";
  return [
    { url: baseUrl, changeFrequency: "monthly", priority: 1 },
    ...calculators.map(({ slug }) => ({ url: `${baseUrl}/calculateur/${slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...categorySlugs.map((slug) => ({ url: `${baseUrl}/${slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
    { url: `${baseUrl}/methode`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/confidentialite`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/a-propos`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseUrl}/auteur`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseUrl}/cookies`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/publicite`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/contact`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/mentions-legales`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
