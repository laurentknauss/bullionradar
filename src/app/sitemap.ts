import { MetadataRoute } from "next";
import { COINS } from "@/lib/coins-data";

const BASE_URL = "https://bullionradar.fr";

function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const PERIODS = ["1-an", "5-ans", "10-ans", "20-ans"];

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];

  // Homepage
  urls.push({
    url: BASE_URL,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1.0,
  });

  // Cours Or
  urls.push({
    url: `${BASE_URL}/cours-or`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.9,
  });
  for (const period of PERIODS) {
    urls.push({
      url: `${BASE_URL}/cours-or/${period}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    });
  }

  // Cours Argent
  urls.push({
    url: `${BASE_URL}/cours-argent`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.9,
  });
  for (const period of PERIODS) {
    urls.push({
      url: `${BASE_URL}/cours-argent/${period}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    });
  }

  // Mentions legales
  urls.push({
    url: `${BASE_URL}/mentions-legales`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.3,
  });

  // VS pages - toutes les combinaisons
  for (let i = 0; i < COINS.length; i++) {
    for (let j = 0; j < COINS.length; j++) {
      if (i === j) continue;
      const slug = `${slugify(COINS[i].name)}-vs-${slugify(COINS[j].name)}`;
      urls.push({
        url: `${BASE_URL}/vs/${slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
  }

  return urls;
}
