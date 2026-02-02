/**
 * Main script - Scrape all dealers
 * Usage: npx tsx scrape-all.ts [--json]
 */

import { scrapeGodot } from "./scrape-godot";
import { scrapePiecesOr } from "./scrape-pieces-or";
import { type DealerPrice, sleep } from "./types";

interface ScraperConfig {
  name: string;
  scrape: () => Promise<DealerPrice[]>;
}

const SCRAPERS: readonly ScraperConfig[] = [
  { name: "Godot & Fils", scrape: scrapeGodot },
  { name: "Pieces-Or.com", scrape: scrapePiecesOr },
] as const;

const DELAY_BETWEEN_DEALERS_MS = 3000;

/**
 * Run a single scraper with error handling
 */
async function runScraper(config: ScraperConfig): Promise<DealerPrice[]> {
  try {
    return await config.scrape();
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Error ${config.name}: ${message}`);
    return [];
  }
}

/**
 * Display comparison summary grouped by coin
 */
function displaySummary(results: DealerPrice[]): void {
  console.log("\n");
  console.log("+--------------------------------------------------+");
  console.log("|                    SUMMARY                       |");
  console.log("+--------------------------------------------------+");
  console.log("\n");

  // Group by coin
  const byCoins = new Map<string, DealerPrice[]>();
  for (const result of results) {
    const existing = byCoins.get(result.coin_slug) ?? [];
    existing.push(result);
    byCoins.set(result.coin_slug, existing);
  }

  // Display comparison
  for (const [coinSlug, prices] of byCoins) {
    const coinName = prices[0]?.coin_name ?? coinSlug;
    console.log(`\n[COIN] ${coinName}`);
    console.log("-".repeat(40));

    // Sort by price ascending
    prices.sort((a, b) => a.price_cents - b.price_cents);

    const medals = ["#1", "#2", "#3"];
    for (let i = 0; i < prices.length; i++) {
      const price = prices[i];
      if (!price) continue;
      const medal = medals[i] ?? `#${i + 1}`;
      const priceEur = (price.price_cents / 100).toFixed(2);
      console.log(`  ${medal} ${price.dealer.padEnd(12)} ${priceEur} EUR`);
    }

    // Calculate spread
    if (prices.length >= 2) {
      const cheapest = prices[0]?.price_cents ?? 0;
      const mostExpensive = prices[prices.length - 1]?.price_cents ?? 0;
      if (cheapest > 0) {
        const diff = (((mostExpensive - cheapest) / cheapest) * 100).toFixed(2);
        console.log(`  [SPREAD] ${diff}%`);
      }
    }
  }

  console.log("\n");
  console.log(`Total: ${results.length} prices retrieved`);
  console.log(`Timestamp: ${new Date().toISOString()}`);
}

async function scrapeAll(): Promise<DealerPrice[]> {
  console.log("\n");
  console.log("+--------------------------------------------------+");
  console.log("|       PRICE COMPARATOR - DAILY SCRAPING          |");
  console.log("|                                                  |");
  console.log("|  Dealers: Godot & Fils, Pieces-Or.com            |");
  console.log("+--------------------------------------------------+");
  console.log("\n");

  const allResults: DealerPrice[] = [];

  for (let i = 0; i < SCRAPERS.length; i++) {
    const scraper = SCRAPERS[i];
    if (!scraper) continue;

    const results = await runScraper(scraper);
    allResults.push(...results);

    // Delay between dealers (except for the last one)
    if (i < SCRAPERS.length - 1) {
      await sleep(DELAY_BETWEEN_DEALERS_MS);
    }
  }

  displaySummary(allResults);

  return allResults;
}

// Execution
scrapeAll()
  .then((results) => {
    // Optional: export as JSON for Supabase
    if (process.argv.includes("--json")) {
      console.log("\n--- JSON OUTPUT ---");
      console.log(JSON.stringify(results, null, 2));
    }
  })
  .catch((error: unknown) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
