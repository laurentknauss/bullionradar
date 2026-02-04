/**
 * Scraper Pieces-Or.com
 * Retrieves buy prices for gold and silver coins
 */

import { chromium, type Page } from "playwright";
import {
  type DealerPrice,
  type CoinConfig,
  parseFrenchPrice,
  sleep,
} from "./types";

const DEALER_NAME = "pieces-or";
const BASE_URL = "https://www.pieces-or.com";

// Direct product page URLs (discovered from catalog)
const COINS_TO_SCRAPE: readonly CoinConfig[] = [
  {
    slug: "krugerrand-1oz",
    name: "Krugerrand 1 Once",
    url: "https://www.pieces-or.com/achat-or-argent/5-Krugerrand.html",
  },
  {
    slug: "napoleon-20f",
    name: "Napoleon 20 Francs",
    url: "https://www.pieces-or.com/achat-or-argent/1-Napoleon-20-Francs.html",
  },
  {
    slug: "souverain",
    name: "Souverain",
    url: "https://www.pieces-or.com/achat-or-argent/3-Souverain.html",
  },
  {
    slug: "maple-leaf-1oz",
    name: "Maple Leaf 1 Once",
    url: "https://www.pieces-or.com/achat-or-argent/29-Maple-Leaf.html",
  },
  {
    slug: "20-francs-suisse",
    name: "20 Francs Suisse",
    url: "https://www.pieces-or.com/achat-or-argent/4-20-Francs-Suisse.html",
  },
  {
    slug: "philharmonique-1oz",
    name: "Philharmonique 1 Once",
    url: "https://www.pieces-or.com/achat-or-argent/30-Philharmonique-de-Vienne.html",
  },
] as const;

/**
 * Scrape the price of a coin from a Pieces-Or product page
 */
async function scrapeCoinPrice(
  page: Page,
  coin: CoinConfig,
): Promise<DealerPrice | null> {
  console.log(`\n-> Scraping ${coin.name}...`);

  try {
    await page.goto(coin.url, { waitUntil: "networkidle", timeout: 30000 });

    // Wait for price element to load
    // Price is in an element with class containing "price"
    await page.waitForSelector("[class*=price], [class*=Price]", {
      timeout: 10000,
    });

    // Get the main price (first one, for 1-4 pieces tier)
    const priceElement = page.locator("[class*=price], [class*=Price]").first();
    const priceText = await priceElement.textContent();

    if (!priceText) {
      console.error(`  [error] Price element empty for ${coin.name}`);
      return null;
    }

    const priceCents = parseFrenchPrice(priceText);
    const priceDisplay = `${(priceCents / 100).toFixed(2).replace(".", ",")} €`;

    console.log(`  [ok] Price found: ${priceDisplay} (${priceCents} cents)`);

    return {
      coin_slug: coin.slug,
      coin_name: coin.name,
      dealer: DEALER_NAME,
      price_cents: priceCents,
      price_display: priceDisplay,
      currency: "EUR",
      in_stock: true,
      product_url: coin.url,
      scraped_at: new Date().toISOString(),
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`  [error] Scraping ${coin.name}: ${message}`);
    return null;
  }
}

/**
 * Scrape all prices from Pieces-Or
 */
export async function scrapePiecesOr(): Promise<DealerPrice[]> {
  console.log("=".repeat(50));
  console.log("SCRAPING PIECES-OR.COM");
  console.log("=".repeat(50));

  const browser = await chromium.launch({
    headless: true,
  });

  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    viewport: { width: 1280, height: 720 },
  });

  const page = await context.newPage();
  const results: DealerPrice[] = [];

  try {
    for (const coin of COINS_TO_SCRAPE) {
      const price = await scrapeCoinPrice(page, coin);
      if (price) {
        results.push(price);
      }
      // Delay between requests to avoid rate limiting
      await sleep(2000);
    }
  } finally {
    await browser.close();
  }

  console.log("\n" + "=".repeat(50));
  console.log(
    `RESULT: ${results.length}/${COINS_TO_SCRAPE.length} coins scraped`,
  );
  console.log("=".repeat(50));

  return results;
}

// Direct execution if run as CLI
if (import.meta.url.endsWith(process.argv[1]?.replace(/.*[\\/]/, "") ?? "")) {
  scrapePiecesOr()
    .then((results) => {
      console.log("\nJSON results:");
      console.log(JSON.stringify(results, null, 2));
    })
    .catch((error: unknown) => {
      console.error("Fatal error:", error);
      process.exit(1);
    });
}
