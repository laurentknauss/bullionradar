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

// === Pièces historiques / semi-numismatiques ===
const GOLD_HISTORIC: readonly CoinConfig[] = [
  {
    slug: "10-francs-napoleon-or",
    name: "10 Francs Napoleon (Demi Napoleon)",
    url: "https://www.achat-or-et-argent.fr/or/10-francs-napoleon/32",
  },
  {
    slug: "10-francs-marianne-coq-or",
    name: "10 Francs Marianne Coq",
    url: "https://www.achat-or-et-argent.fr/or/10-francs-marianne-coq/18860",
  },
  {
    slug: "20-francs-marianne-coq-or",
    name: "20 Francs Marianne Coq",
    url: "https://www.achat-or-et-argent.fr/or/20-francs-marianne-coq/17",
  },
  {
    slug: "union-latine-or",
    name: "Union Latine",
    url: "https://www.achat-or-et-argent.fr/or/union-latine/20",
  },
  {
    slug: "louis-dor-20-francs-or",
    name: "Louis d'Or - 20 Francs Or",
    url: "https://www.achat-or-et-argent.fr/or/louis-d-or-20-francs-or/5231",
  },
  {
    slug: "50-francs-napoleon-iii-or",
    name: "50 Francs Napoleon III",
    url: "https://www.achat-or-et-argent.fr/or/50-francs-napoleon-iii/1208",
  },
  {
    slug: "demi-souverain-or",
    name: "Demi Souverain",
    url: "https://www.achat-or-et-argent.fr/or/demi-souverain/49",
  },
  {
    slug: "demi-souverain-elisabeth-ii-or",
    name: "Demi Souverain Elisabeth II",
    url: "https://www.achat-or-et-argent.fr/or/demi-souverain-elisabeth-ii/4691",
  },
  {
    slug: "5-dollars-us-or",
    name: "5 Dollars US",
    url: "https://www.achat-or-et-argent.fr/or/5-dollars-us/33",
  },
  {
    slug: "10-dollars-us-or",
    name: "10 Dollars US",
    url: "https://www.achat-or-et-argent.fr/or/10-dollars-us/13",
  },
  {
    slug: "20-dollars-us-or",
    name: "20 Dollars US",
    url: "https://www.achat-or-et-argent.fr/or/20-dollars-us/19",
  },
  {
    slug: "50-pesos-or",
    name: "50 Pesos Or (Mexique)",
    url: "https://www.achat-or-et-argent.fr/or/50-pesos/11",
  },
  {
    slug: "4-ducats-or",
    name: "4 Ducats Or (Francois-Joseph)",
    url: "https://www.achat-or-et-argent.fr/or/4-ducats-or/839",
  },
  {
    slug: "1-ducat-or",
    name: "1 Ducat Or Francois-Joseph 1915",
    url: "https://www.achat-or-et-argent.fr/or/1-ducat-or-francois-joseph-1915/4767",
  },
  {
    slug: "100-corona-or",
    name: "100 Corona Francois-Joseph 1915",
    url: "https://www.achat-or-et-argent.fr/or/100-corona-francois-joseph-1915-vienne/2916",
  },
  {
    slug: "20-reichsmarks-or",
    name: "20 Reichsmarks",
    url: "https://www.achat-or-et-argent.fr/or/20-reichsmarks/34",
  },
  {
    slug: "20-francs-tunisie-or",
    name: "20 Francs Tunisie",
    url: "https://www.achat-or-et-argent.fr/or/20-francs-tunisie/44",
  },
  {
    slug: "10-florins-or",
    name: "10 Florins (Pays-Bas)",
    url: "https://www.achat-or-et-argent.fr/or/10-florins/18",
  },
  {
    slug: "100-kurush-or",
    name: "Empire Ottoman 100 Kurush",
    url: "https://www.achat-or-et-argent.fr/or/empire-ottoman-turquie-100-kurush-1844-1923/5041",
  },
] as const;

// === Panda fractions ===
const GOLD_PANDA: readonly CoinConfig[] = [
  {
    slug: "panda-15g-or",
    name: "Panda 15g Or",
    url: "https://www.achat-or-et-argent.fr/or/panda-15g-or/3289",
  },
  {
    slug: "panda-8g-or",
    name: "Panda 8g Or",
    url: "https://www.achat-or-et-argent.fr/or/panda-8g-or/3288",
  },
  {
    slug: "panda-3g-or",
    name: "Panda 3g Or",
    url: "https://www.achat-or-et-argent.fr/or/panda-3g-or/3291",
  },
] as const;

// === Zodiac / Monnaie de Paris ===
const GOLD_ZODIAC: readonly CoinConfig[] = [
  {
    slug: "zodiac-taureau-2026-or",
    name: "Signe du Zodiaque Taureau 2026",
    url: "https://www.achat-or-et-argent.fr/or/signe-du-zodiaque-taureau-2026/23152",
  },
  {
    slug: "zodiac-gemeaux-2026-or",
    name: "Signe du Zodiaque Gemeaux 2026",
    url: "https://www.achat-or-et-argent.fr/or/signe-du-zodiaque-gemeaux-2026/23197",
  },
  {
    slug: "zodiac-cancer-2026-or",
    name: "Signe du Zodiaque Cancer 2026",
    url: "https://www.achat-or-et-argent.fr/or/signe-du-zodiaque-cancer-2026/23200",
  },
  {
    slug: "zodiac-lion-2026-or",
    name: "Signe du Zodiaque Lion 2026",
    url: "https://www.achat-or-et-argent.fr/or/signe-du-zodiaque-lion-2026/23221",
  },
  {
    slug: "zodiac-vierge-2026-or",
    name: "Signe du Zodiaque Vierge 2026",
    url: "https://www.achat-or-et-argent.fr/or/signe-du-zodiaque-vierge-2026/23233",
  },
  {
    slug: "zodiac-balance-2026-or",
    name: "Signe du Zodiaque Balance 2026",
    url: "https://www.achat-or-et-argent.fr/or/signe-du-zodiaque-balance-2026/23242",
  },
  {
    slug: "zodiac-sagittaire-2026-or",
    name: "Signe du Zodiaque Sagittaire 2026",
    url: "https://www.achat-or-et-argent.fr/or/signe-du-zodiaque-sagittaire-2026/23254",
  },
  {
    slug: "austerlitz-2025-or",
    name: "Austerlitz 1805-2025 (Monnaie de Paris)",
    url: "https://www.achat-or-et-argent.fr/or/austerlitz-1805-2025/23662",
  },
] as const;

const GOLD_COINS: readonly CoinConfig[] = [
  ...GOLD_1OZ,
  ...GOLD_HALF,
  ...GOLD_QUARTER,
  ...GOLD_TENTH,
  ...GOLD_HISTORIC,
  ...GOLD_PANDA,
  ...GOLD_ZODIAC,
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
  {
    slug: "buffalo-1oz-argent",
    name: "American Buffalo 1 Once Argent",
    url: "https://www.achat-or-et-argent.fr/argent/american-buffalo-1-once/1653",
  },
  {
    slug: "kookaburra-1oz-argent",
    name: "Kookaburra 1 Once Argent",
    url: "https://www.achat-or-et-argent.fr/argent/kookaburra-1-once/1660",
  },
  {
    slug: "panda-30g-argent",
    name: "Panda 30g Argent",
    url: "https://www.achat-or-et-argent.fr/argent/panda-30g/3286",
  },
  {
    slug: "walking-liberty-1oz-argent",
    name: "Walking Liberty 1 Once Argent",
    url: "https://www.achat-or-et-argent.fr/argent/walking-liberty-1-once/1808",
  },
  {
    slug: "hokusai-grande-vague-1oz-argent",
    name: "Hokusai Grande Vague 1 Once Argent",
    url: "https://www.achat-or-et-argent.fr/argent/hokusai-grande-vague-1-once/2503",
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
  {
    slug: "100-francs-argent-1982-2002",
    name: "100 Francs Argent 1982-2002",
    url: "https://www.achat-or-et-argent.fr/argent/100-francs-argent-1982-2002/24",
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
