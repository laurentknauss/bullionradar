/**
 * Scrape dealers and populate Supabase
 *
 * Prerequisite: Create table via Supabase Dashboard > SQL Editor:
 *
 * CREATE TABLE dealer_prices (
 *   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *   coin_slug TEXT NOT NULL,
 *   coin_name TEXT NOT NULL,
 *   dealer TEXT NOT NULL,
 *   price_cents INTEGER NOT NULL,
 *   currency TEXT DEFAULT 'EUR',
 *   in_stock BOOLEAN DEFAULT true,
 *   product_url TEXT,
 *   scraped_at TIMESTAMPTZ NOT NULL,
 *   created_at TIMESTAMPTZ DEFAULT now()
 * );
 *
 * ALTER TABLE dealer_prices ENABLE ROW LEVEL SECURITY;
 * CREATE POLICY "Allow public read" ON dealer_prices FOR SELECT USING (true);
 *
 * Usage: SUPABASE_URL=... SUPABASE_SERVICE_KEY=... pnpm run setup-db
 */

import { supabase } from "./supabase-client";
import { scrapeGodot } from "./scrape-godot";
import { scrapePiecesOr } from "./scrape-pieces-or";
import { scrapeOrFr } from "./scrape-orfr";
import { type DealerPrice, sleep } from "./types";

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
    if (error.message.includes("does not exist")) {
      console.error(
        "\n⚠️ Table doesn't exist! Create it first in Supabase Dashboard.",
      );
      console.error(
        "Go to: SQL Editor > New Query and run the CREATE TABLE SQL above.",
      );
    }
    return false;
  }

  console.log(`✅ Inserted ${data?.length ?? 0} prices`);
  return true;
}

async function main(): Promise<void> {
  console.log("=".repeat(50));
  console.log("SCRAPE + POPULATE SUPABASE");
  console.log("=".repeat(50));

  // Check env vars
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
    console.error("\n❌ Missing environment variables!");
    console.error("Export them before running:");
    console.error("  export SUPABASE_URL=https://xxx.supabase.co");
    console.error("  export SUPABASE_SERVICE_KEY=sb_secret_...");
    process.exit(1);
  }

  console.log("\nSupabase URL:", process.env.SUPABASE_URL);

  // Scrape all dealers
  const allPrices: DealerPrice[] = [];

  console.log("\n--- Scraping Godot ---");
  const godotPrices = await scrapeGodot();
  allPrices.push(...godotPrices);

  await sleep(3000);

  console.log("\n--- Scraping Pieces-Or ---");
  const piecesOrPrices = await scrapePiecesOr();
  allPrices.push(...piecesOrPrices);

  await sleep(3000);

  console.log("\n--- Scraping Or.fr ---");
  const orfrPrices = await scrapeOrFr();
  allPrices.push(...orfrPrices);

  // Insert into Supabase
  if (allPrices.length > 0) {
    const success = await insertPrices(allPrices);
    if (!success) {
      process.exit(1);
    }
  } else {
    console.log("\n⚠️ No prices scraped, nothing to insert");
  }

  console.log("\n" + "=".repeat(50));
  console.log("DONE");
  console.log("=".repeat(50));
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
