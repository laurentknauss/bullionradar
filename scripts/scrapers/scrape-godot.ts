/**
 * Scraper Godot & Fils (achat-or-et-argent.fr)
 * Retrieves buy prices for gold coins
 */

import { chromium, type Page } from "playwright";
import {
  type DealerPrice,
  type CoinConfig,
  parseFrenchPrice,
  sleep,
} from "./types";

const DEALER_NAME = "godot";

// Gold coins to scrape from Godot
// === 1 oz ===
const GOLD_1OZ: readonly CoinConfig[] = [
  {
    slug: "krugerrand-1oz",
    name: "Krugerrand 1 Once",
    url: "https://www.achat-or-et-argent.fr/or/krugerrand/12",
  },
  {
    slug: "maple-leaf-1oz",
    name: "Maple Leaf 1 Once",
    url: "https://www.achat-or-et-argent.fr/or/maple-leaf-1-once-or/3192",
  },
  {
    slug: "philharmonique-1oz",
    name: "Philharmonique 1 Once",
    url: "https://www.achat-or-et-argent.fr/or/philharmonique-1-once-or/3207",
  },
  {
    slug: "britannia-1oz-or",
    name: "Britannia 1 Oz Or",
    url: "https://www.achat-or-et-argent.fr/or/britannia-1-once-or/3220",
  },
  {
    slug: "kangourou-1oz-or",
    name: "Kangourou 1 Once",
    url: "https://www.achat-or-et-argent.fr/or/kangourou-1-once-or/3296",
  },
  {
    slug: "american-eagle-1oz-or",
    name: "American Eagle 1 Once",
    url: "https://www.achat-or-et-argent.fr/or/american-eagle-1-once-or/3215",
  },
  {
    slug: "american-buffalo-1oz-or",
    name: "American Buffalo 1 Once",
    url: "https://www.achat-or-et-argent.fr/or/american-buffalo-1-once-or/3219",
  },
  {
    slug: "napoleon-20f",
    name: "Napoleon 20 Francs",
    url: "https://www.achat-or-et-argent.fr/or/20-francs-napoleon/6",
  },
  {
    slug: "souverain",
    name: "Souverain",
    url: "https://www.achat-or-et-argent.fr/or/souverain/14",
  },
  {
    slug: "20-francs-suisse",
    name: "20 Francs Suisse",
    url: "https://www.achat-or-et-argent.fr/or/20-francs-suisse/15",
  },
] as const;

// === 1/2 oz ===
const GOLD_HALF: readonly CoinConfig[] = [
  {
    slug: "krugerrand-1-2oz-or",
    name: "Krugerrand 1/2 Once",
    url: "https://www.achat-or-et-argent.fr/or/krugerrand-1-2-once/668",
  },
  {
    slug: "maple-leaf-1-2oz-or",
    name: "Maple Leaf 1/2 Once",
    url: "https://www.achat-or-et-argent.fr/or/maple-leaf-1-2-once-or/3194",
  },
  {
    slug: "philharmonique-1-2oz-or",
    name: "Philharmonique 1/2 Once",
    url: "https://www.achat-or-et-argent.fr/or/philharmonique-1-2-once-or/3206",
  },
  {
    slug: "britannia-1-2oz-or",
    name: "Britannia 1/2 Oz Or",
    url: "https://www.achat-or-et-argent.fr/or/britannia-1-2-once-or/3295",
  },
  {
    slug: "kangourou-1-2oz-or",
    name: "Kangourou 1/2 Once",
    url: "https://www.achat-or-et-argent.fr/or/nugget-1-2-once-or/3297",
  },
  {
    slug: "american-eagle-1-2oz-or",
    name: "American Eagle 1/2 Once",
    url: "https://www.achat-or-et-argent.fr/or/american-eagle-1-2-once-or/3217",
  },
] as const;

// === 1/4 oz ===
const GOLD_QUARTER: readonly CoinConfig[] = [
  {
    slug: "krugerrand-1-4oz-or",
    name: "Krugerrand 1/4 Once",
    url: "https://www.achat-or-et-argent.fr/or/krugerrand-1-4-once/667",
  },
  {
    slug: "maple-leaf-1-4oz-or",
    name: "Maple Leaf 1/4 Once",
    url: "https://www.achat-or-et-argent.fr/or/maple-leaf-1-4-once-or/3195",
  },
  {
    slug: "philharmonique-1-4oz-or",
    name: "Philharmonique 1/4 Once",
    url: "https://www.achat-or-et-argent.fr/or/philharmonique-1-4-once-or/3205",
  },
  {
    slug: "britannia-1-4oz-or",
    name: "Britannia 1/4 Oz Or",
    url: "https://www.achat-or-et-argent.fr/or/britannia-1-4-once-or/3293",
  },
  {
    slug: "kangourou-1-4oz-or",
    name: "Kangourou 1/4 Once",
    url: "https://www.achat-or-et-argent.fr/or/nugget-1-4-once/1698",
  },
  {
    slug: "american-eagle-1-4oz-or",
    name: "American Eagle 1/4 Once",
    url: "https://www.achat-or-et-argent.fr/or/american-eagle-1-4-once-or/3216",
  },
] as const;

// === 1/10 oz ===
const GOLD_TENTH: readonly CoinConfig[] = [
  {
    slug: "krugerrand-1-10oz-or",
    name: "Krugerrand 1/10 Once",
    url: "https://www.achat-or-et-argent.fr/or/krugerrand-1-10-once/1055",
  },
  {
    slug: "maple-leaf-1-10oz-or",
    name: "Maple Leaf 1/10 Once",
    url: "https://www.achat-or-et-argent.fr/or/maple-leaf-1-10-once-or/3193",
  },
  {
    slug: "philharmonique-1-10oz-or",
    name: "Philharmonique 1/10 Once",
    url: "https://www.achat-or-et-argent.fr/or/philharmonique-1-10-once-or/3208",
  },
  {
    slug: "britannia-1-10oz-or",
    name: "Britannia 1/10 Oz Or",
    url: "https://www.achat-or-et-argent.fr/or/britannia-1-10-once-or/3294",
  },
  {
    slug: "kangourou-1-10oz-or",
    name: "Kangourou 1/10 Once",
    url: "https://www.achat-or-et-argent.fr/or/nugget-1-10-once-or/3299",
  },
  {
    slug: "american-eagle-1-10oz-or",
    name: "American Eagle 1/10 Once",
    url: "https://www.achat-or-et-argent.fr/or/american-eagle-1-10-once-or/3218",
  },
] as const;

const GOLD_COINS: readonly CoinConfig[] = [
  ...GOLD_1OZ,
  ...GOLD_HALF,
  ...GOLD_QUARTER,
  ...GOLD_TENTH,
] as const;

// Silver coins to scrape from Godot
const SILVER_COINS: readonly CoinConfig[] = [
  {
    slug: "maple-leaf-1oz-argent",
    name: "Maple Leaf 1 Once Argent",
    url: "https://www.achat-or-et-argent.fr/argent/maple-leaf-1-once/1668",
  },
  {
    slug: "philharmonique-1oz-argent",
    name: "Philharmonique 1 Once Argent",
    url: "https://www.achat-or-et-argent.fr/argent/philharmonique-1-once/1673",
  },
  {
    slug: "britannia-1oz-argent",
    name: "Britannia 1 Once Argent",
    url: "https://www.achat-or-et-argent.fr/argent/britannia-1-once/1648",
  },
  {
    slug: "krugerrand-1oz-argent",
    name: "Krugerrand 1 Once Argent",
    url: "https://www.achat-or-et-argent.fr/argent/krugerrand-1-once-argent/3507",
  },
  {
    slug: "kangourou-1oz-argent",
    name: "Kangourou 1 Once Argent",
    url: "https://www.achat-or-et-argent.fr/argent/kangourou-1-once/1571",
  },
  {
    slug: "silver-eagle-1oz",
    name: "Silver Eagle 1 Once",
    url: "https://www.achat-or-et-argent.fr/argent/silver-eagle-1-once/1663",
  },
] as const;

// French silver coins to scrape from Godot
const FRENCH_SILVER_COINS: readonly CoinConfig[] = [
  {
    slug: "50-francs-hercule-argent",
    name: "50 Francs Hercule Argent",
    url: "https://www.achat-or-et-argent.fr/argent/50-francs-hercule/23",
  },
  {
    slug: "10-francs-hercule-argent",
    name: "10 Francs Hercule Argent",
    url: "https://www.achat-or-et-argent.fr/argent/10-francs-hercule-1964-1973/25",
  },
  {
    slug: "5-francs-semeuse-argent",
    name: "5 Francs Semeuse Argent",
    url: "https://www.achat-or-et-argent.fr/argent/5-francs-semeuse-1959-1969/22",
  },
  {
    slug: "20-francs-turin-argent",
    name: "20 Francs Turin Argent",
    url: "https://www.achat-or-et-argent.fr/argent/20-francs-turin-1929-1939/27",
  },
  {
    slug: "10-francs-turin-argent",
    name: "10 Francs Turin Argent",
    url: "https://www.achat-or-et-argent.fr/argent/10-francs-turin-1929-1939/26",
  },
  {
    slug: "5-francs-hercule-ecu-argent",
    name: "5 Francs Hercule (Ecu) Argent",
    url: "https://www.achat-or-et-argent.fr/argent/ecu-5-francs-1795---1889/28",
  },
] as const;

// All coins to scrape
const COINS_TO_SCRAPE: readonly CoinConfig[] = [
  ...GOLD_COINS,
  ...SILVER_COINS,
  ...FRENCH_SILVER_COINS,
] as const;

/**
 * Accept cookies if popup appears
 */
async function acceptCookies(page: Page): Promise<void> {
  try {
    const acceptButton = page.locator('button:has-text("Accept all")');
    if (await acceptButton.isVisible({ timeout: 3000 })) {
      await acceptButton.click();
      console.log("  [ok] Cookies accepted");
    }
  } catch {
    // No cookie popup, continue
  }
}

/**
 * Scrape the price of a coin from a Godot page
 */
async function scrapeCoinPrice(
  page: Page,
  coin: CoinConfig,
): Promise<DealerPrice | null> {
  console.log(`\n-> Scraping ${coin.name}...`);

  try {
    await page.goto(coin.url, { waitUntil: "domcontentloaded" });
    await acceptCookies(page);

    // Wait for the price table to load
    await page.waitForSelector("table", { timeout: 10000 });

    // Find the "VOUS ACHETEZ" price (1 to 4 coins)
    // Structure: table with header "VOUS ACHETEZ" -> first row of tbody -> last cell
    const priceCell = page
      .locator('table:has(th:has-text("VOUS ACHETEZ")) tbody tr')
      .first()
      .locator("td")
      .last();

    const priceText = await priceCell.textContent();

    if (!priceText) {
      console.error(`  [error] Price not found for ${coin.name}`);
      return null;
    }

    const priceCents = parseFrenchPrice(priceText);
    // Format clean price display from cents
    const priceDisplay = `${(priceCents / 100).toFixed(2).replace(".", ",")} €`;

    console.log(`  [ok] Price found: ${priceDisplay} (${priceCents} cents)`);

    return {
      coin_slug: coin.slug,
      coin_name: coin.name,
      dealer: DEALER_NAME,
      price_cents: priceCents,
      price_display: priceDisplay,
      currency: "EUR",
      in_stock: true, // Godot always shows available products
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
 * Scrape all Godot coins
 */
export async function scrapeGodot(): Promise<DealerPrice[]> {
  console.log("=".repeat(50));
  console.log("SCRAPING GODOT & FILS");
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
  scrapeGodot()
    .then((results) => {
      console.log("\nJSON results:");
      console.log(JSON.stringify(results, null, 2));
    })
    .catch((error: unknown) => {
      console.error("Fatal error:", error);
      process.exit(1);
    });
}
