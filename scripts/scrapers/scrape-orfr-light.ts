/**
 * Scraper léger Or.fr — sans Playwright
 *
 * Utilise l'endpoint AJAX `/produits/{id}/as-low-as/EUR` qui retourne
 * un fragment HTML avec le prix. ~200ms par pièce au lieu de ~3s avec Playwright.
 *
 * Conçu pour tourner toutes les 30 min via GitHub Actions cron.
 */

import { type DealerPrice, parseFrenchPrice, sleep } from "./types";

const DEALER_NAME = "orfr";

interface OrFrCoin {
  slug: string;
  name: string;
  productId: number;
  productUrl: string;
}

// Product IDs extraits des URLs Or.fr dans scrape-orfr.ts
const COINS: readonly OrFrCoin[] = [
  // 1 oz
  {
    slug: "krugerrand-1oz",
    name: "Krugerrand 1 Once",
    productId: 498,
    productUrl:
      "https://or.fr/produits/acheter-or/pieces-or/krugerrand-or-1-once-2026-south-african-mint-498?serviceType=3",
  },
  {
    slug: "maple-leaf-1oz",
    name: "Maple Leaf 1 Once",
    productId: 470,
    productUrl:
      "https://or.fr/produits/acheter-or/pieces-or/maple-leaf-or-1-once-2026-royal-canadian-mint-470?serviceType=3",
  },
  {
    slug: "philharmonique-1oz",
    name: "Philharmonique 1 Once",
    productId: 477,
    productUrl:
      "https://or.fr/produits/acheter-or/pieces-or/philharmonique-or-1-once-2026-austrian-mint-477?serviceType=3",
  },
  {
    slug: "britannia-1oz-or",
    name: "Britannia 1 Oz Or",
    productId: 445,
    productUrl:
      "https://or.fr/produits/acheter-or/pieces-or/britannia-or-1once-2026-royal-mint-445?serviceType=3",
  },
  {
    slug: "kangourou-1oz-or",
    name: "Kangourou 1 Once",
    productId: 464,
    productUrl:
      "https://or.fr/produits/acheter-or/pieces-or/kangourou-or-1-once-2026-perth-mint-464?serviceType=3",
  },
  {
    slug: "american-eagle-1oz-or",
    name: "American Eagle 1 Once",
    productId: 483,
    productUrl:
      "https://or.fr/produits/acheter-or/pieces-or/american-eagle-or-1-once-2026-us-mint-483?serviceType=3",
  },
  // 1/2 oz
  {
    slug: "britannia-1-2oz-or",
    name: "Britannia 1/2 Oz Or",
    productId: 447,
    productUrl:
      "https://or.fr/produits/acheter-or/pieces-or/britannia-or-1-2-once-2026-royal-mint-447?serviceType=3",
  },
  {
    slug: "krugerrand-1-2oz-or",
    name: "Krugerrand 1/2 Once",
    productId: 496,
    productUrl:
      "https://or.fr/produits/acheter-or/pieces-or/krugerrand-or-1-2-once-2026-south-african-mint-496?serviceType=3",
  },
  {
    slug: "kangourou-1-2oz-or",
    name: "Kangourou 1/2 Once",
    productId: 466,
    productUrl:
      "https://or.fr/produits/acheter-or/pieces-or/kangourou-or-1-2-onces-2026-perth-mint-466?serviceType=3",
  },
  {
    slug: "maple-leaf-1-2oz-or",
    name: "Maple Leaf 1/2 Once",
    productId: 491,
    productUrl:
      "https://or.fr/produits/acheter-or/pieces-or/maple-leaf-or-1-2-once-2026-royal-canadian-mint-491?serviceType=3",
  },
  {
    slug: "american-eagle-1-2oz-or",
    name: "American Eagle 1/2 Once",
    productId: 485,
    productUrl:
      "https://or.fr/produits/acheter-or/pieces-or/american-eagle-or-1-2-once-2026-us-mint-485?serviceType=3",
  },
  // 1/4 oz
  {
    slug: "krugerrand-1-4oz-or",
    name: "Krugerrand 1/4 Once",
    productId: 495,
    productUrl:
      "https://or.fr/produits/acheter-or/pieces-or/krugerrand-or-1-4-once-2026-south-african-mint-495?serviceType=3",
  },
  {
    slug: "kangourou-1-4oz-or",
    name: "Kangourou 1/4 Once",
    productId: 467,
    productUrl:
      "https://or.fr/produits/acheter-or/pieces-or/kangourou-or-1-4-once-2026-perth-mint-467?serviceType=3",
  },
  {
    slug: "maple-leaf-1-4oz-or",
    name: "Maple Leaf 1/4 Once",
    productId: 492,
    productUrl:
      "https://or.fr/produits/acheter-or/pieces-or/maple-leaf-or-1-4-once-2026-royal-canadian-mint-492?serviceType=3",
  },
  {
    slug: "american-eagle-1-4oz-or",
    name: "American Eagle 1/4 Once",
    productId: 486,
    productUrl:
      "https://or.fr/produits/acheter-or/pieces-or/american-eagle-or-1-4-once-2026-us-mint-486?serviceType=3",
  },
  // 1/10 oz
  {
    slug: "britannia-1-10oz-or",
    name: "Britannia 1/10 Oz Or",
    productId: 449,
    productUrl:
      "https://or.fr/produits/acheter-or/pieces-or/britannia-or-1-10-once-2026-royal-mint-449?serviceType=3",
  },
  {
    slug: "krugerrand-1-10oz-or",
    name: "Krugerrand 1/10 Once",
    productId: 497,
    productUrl:
      "https://or.fr/produits/acheter-or/pieces-or/krugerrand-or-1-10-once-2026-south-african-mint-497?serviceType=3",
  },
  {
    slug: "kangourou-1-10oz-or",
    name: "Kangourou 1/10 Once",
    productId: 468,
    productUrl:
      "https://or.fr/produits/acheter-or/pieces-or/kangourou-or-1-10-once-2026-perth-mint-468?serviceType=3",
  },
  {
    slug: "maple-leaf-1-10oz-or",
    name: "Maple Leaf 1/10 Once",
    productId: 493,
    productUrl:
      "https://or.fr/produits/acheter-or/pieces-or/maple-leaf-or-1-10-once-2026-royal-canadian-mint-493?serviceType=3",
  },
  {
    slug: "american-eagle-1-10oz-or",
    name: "American Eagle 1/10 Once",
    productId: 473,
    productUrl:
      "https://or.fr/produits/acheter-or/pieces-or/american-eagle-or-1-10-once-2026-us-mint-473?serviceType=3",
  },
  // 1/20 oz
  {
    slug: "maple-leaf-1-20oz-or",
    name: "Maple Leaf 1/20 Once",
    productId: 501,
    productUrl:
      "https://or.fr/produits/acheter-or/pieces-or/maple-leaf-or-1-20-once-2026-royal-canadian-mint-501?serviceType=3",
  },
  // Pièces françaises/suisses
  {
    slug: "napoleon-20f",
    name: "Napoleon 20 Francs",
    productId: 433,
    productUrl:
      "https://or.fr/produits/acheter-or/pieces-or/20-francs-marianne-coq-napoleon-433?serviceType=3",
  },
  {
    slug: "20-francs-suisse",
    name: "20 Francs Suisse",
    productId: 439,
    productUrl:
      "https://or.fr/produits/acheter-or/pieces-or/20-francs-suisse-vreneli-439?serviceType=3",
  },
] as const;

/**
 * Fetch price for a single coin via the lightweight AJAX endpoint
 */
async function fetchCoinPrice(coin: OrFrCoin): Promise<DealerPrice | null> {
  const url = `https://or.fr/produits/${coin.productId}/as-low-as/EUR`;

  try {
    const response = await fetch(url, {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        Accept: "text/html",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    if (!response.ok) {
      console.error(`  [error] HTTP ${response.status} for ${coin.name}`);
      return null;
    }

    const html = await response.text();

    // Extract price from: <span class="as-low-as-price">4 593,91 €</span>
    const priceMatch = html.match(/as-low-as-price[^>]*>\s*([\d\s.,]+\s*€)/);
    if (!priceMatch?.[1]) {
      console.error(`  [error] Price not found for ${coin.name}`);
      return null;
    }

    const priceCents = parseFrenchPrice(priceMatch[1]);
    const priceDisplay = `${(priceCents / 100).toFixed(2).replace(".", ",")} €`;

    console.log(`  [ok] ${coin.name}: ${priceDisplay}`);

    return {
      coin_slug: coin.slug,
      coin_name: coin.name,
      dealer: DEALER_NAME,
      price_cents: priceCents,
      price_display: priceDisplay,
      currency: "EUR",
      in_stock: true,
      product_url: coin.productUrl,
      scraped_at: new Date().toISOString(),
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`  [error] ${coin.name}: ${message}`);
    return null;
  }
}

/**
 * Scrape all Or.fr coins via lightweight API
 */
export async function scrapeOrFrLight(): Promise<DealerPrice[]> {
  console.log("=".repeat(50));
  console.log("SCRAPING OR.FR (LIGHT API)");
  console.log("=".repeat(50));

  const results: DealerPrice[] = [];

  for (const coin of COINS) {
    const price = await fetchCoinPrice(coin);
    if (price) {
      results.push(price);
    }
    // Small delay to avoid rate limiting
    await sleep(500);
  }

  console.log("\n" + "=".repeat(50));
  console.log(`RESULT: ${results.length}/${COINS.length} coins scraped`);
  console.log("=".repeat(50));

  return results;
}

// Direct execution if run as CLI
const scriptName = process.argv[1]?.replace(/.*[\\/]/, "") ?? "";
if (import.meta.url.endsWith(scriptName)) {
  scrapeOrFrLight()
    .then((results) => {
      console.log("\nJSON results:");
      console.log(JSON.stringify(results, null, 2));
    })
    .catch((error: unknown) => {
      console.error("Fatal error:", error);
      process.exit(1);
    });
}
