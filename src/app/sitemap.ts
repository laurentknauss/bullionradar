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

  // Prix argent (calculateur)
  urls.push({
    url: `${BASE_URL}/prix-argent`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.9,
  });

  // Fiscalite
  urls.push({
    url: `${BASE_URL}/fiscalite`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  });

  // Vente or
  urls.push({
    url: `${BASE_URL}/vente-or`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  });

  // Solutions stockage
  urls.push({
    url: `${BASE_URL}/solutions-stockage`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  });

  // BullionVault (page affiliation / or alloué)
  urls.push({
    url: `${BASE_URL}/bullionvault`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  });

  // Guide
  urls.push({
    url: `${BASE_URL}/guide`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  });

  // Guide — Nettoyage pièces argent
  urls.push({
    url: `${BASE_URL}/guide/nettoyer-pieces-argent`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  });

  // A propos
  urls.push({
    url: `${BASE_URL}/a-propos`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.5,
  });

  // Mentions legales
  urls.push({
    url: `${BASE_URL}/mentions-legales`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.3,
  });

  // Fiches coin - 58 pièces (contenu unique, priorité haute pour Google)
  for (const coin of COINS) {
    urls.push({
      url: `${BASE_URL}/coin/${slugify(coin.name)}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    });
  }

  // VS pages - ordre alphabétique uniquement (dédup des duplicates A-vs-B / B-vs-A).
  // La canonical est définie sur l'ordre alphabétique dans generateMetadata(),
  // on ne soumet donc à Google que cette version canonique pour éviter le signal
  // "duplicate content" qui faisait rejeter l'ensemble des pages /vs/.
  for (let i = 0; i < COINS.length; i++) {
    for (let j = i + 1; j < COINS.length; j++) {
      const slug1 = slugify(COINS[i]!.name);
      const slug2 = slugify(COINS[j]!.name);
      const canonicalSlug =
        slug1 < slug2 ? `${slug1}-vs-${slug2}` : `${slug2}-vs-${slug1}`;
      urls.push({
        url: `${BASE_URL}/vs/${canonicalSlug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
  }

  return urls;
}
