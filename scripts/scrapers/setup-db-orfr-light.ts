/**
 * Or.fr light scraper + Supabase insertion
 *
 * Runs the lightweight Or.fr scraper (no Playwright) and inserts
 * prices into Supabase. Designed for the 30-min cron workflow.
 *
 * Usage: SUPABASE_URL=... SUPABASE_SERVICE_KEY=... pnpm exec tsx setup-db-orfr-light.ts
 */

import { supabase } from "./supabase-client";
import { scrapeOrFrLight } from "./scrape-orfr-light";
import type { DealerPrice } from "./types";

async function insertPrices(prices: DealerPrice[]): Promise<boolean> {
  console.log(`\nInserting ${prices.length} prices into Supabase...`);

  const rows = prices.map((p) => ({
    coin_slug: p.coin_slug,
    coin_name: p.coin_name,
    dealer: p.dealer,
    price_cents: p.price_cents,
    currency: p.currency,
    in_stock: p.in_stock,
    product_url: p.product_url,
    scraped_at: p.scraped_at,
  }));

  const { data, error } = await supabase
    .from("dealer_prices")
    .insert(rows)
    .select();

  if (error) {
    console.error("❌ Error inserting prices:", error.message);
    return false;
  }

  console.log(`✅ Inserted ${data?.length ?? 0} prices`);
  return true;
}

async function main(): Promise<void> {
  console.log("=".repeat(50));
  console.log("OR.FR LIGHT SCRAPE + SUPABASE");
  console.log("=".repeat(50));

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
    console.error("\n❌ Missing SUPABASE_URL or SUPABASE_SERVICE_KEY");
    process.exit(1);
  }

  const prices = await scrapeOrFrLight();

  if (prices.length > 0) {
    const success = await insertPrices(prices);
    if (!success) {
      process.exit(1);
    }
  } else {
    console.log("\n⚠️ No prices scraped, nothing to insert");
  }

  console.log("\nDONE");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
