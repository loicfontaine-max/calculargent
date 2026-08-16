import type { MetadataRoute } from "next";
import { calculators } from "../lib/calculators";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.SITE_URL || "http://localhost:3000";
  return [
    { url: baseUrl, changeFrequency: "monthly", priority: 1 },
    ...calculators.map(({ slug }) => ({ url: `${baseUrl}/calculateur/${slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: `${baseUrl}/methode`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/confidentialite`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
