/**
 * Scrape only French silver coins from Godot & insert into Supabase
 */

import { chromium, type Page } from "playwright";
import {
  type DealerPrice,
  type CoinConfig,
  parseFrenchPrice,
  sleep,
} from "./types";
import { supabase } from "./supabase-client";

const DEALER_NAME = "godot";

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
];

async function acceptCookies(page: Page): Promise<void> {
  try {
    const acceptButton = page.locator('button:has-text("Accept all")');
    if (await acceptButton.isVisible({ timeout: 3000 })) {
      await acceptButton.click();
    }
  } catch {}
}

async function scrapeCoinPrice(
  page: Page,
  coin: CoinConfig,
): Promise<DealerPrice | null> {
  console.log(`\n-> Scraping ${coin.name}...`);
  try {
    await page.goto(coin.url, { waitUntil: "domcontentloaded" });
    await acceptCookies(page);
    await page.waitForSelector("table", { timeout: 10000 });

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
    const priceDisplay = `${(priceCents / 100).toFixed(2).replace(".", ",")} €`;
    console.log(`  [ok] ${priceDisplay} (${priceCents} cents)`);

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
    console.error(`  [error] ${coin.name}: ${message}`);
    return null;
  }
}

async function main() {
  console.log("=== SCRAPE FR SILVER COINS (Godot) ===\n");

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    viewport: { width: 1280, height: 720 },
  });
  const page = await context.newPage();
  const results: DealerPrice[] = [];

  try {
    for (const coin of FRENCH_SILVER_COINS) {
      const price = await scrapeCoinPrice(page, coin);
      if (price) results.push(price);
      await sleep(2000);
    }
  } finally {
    await browser.close();
  }

  console.log(
    `\n${results.length}/${FRENCH_SILVER_COINS.length} prices scraped`,
  );

  if (results.length > 0) {
    const rows = results.map((p) => ({
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
      console.error("Insert error:", error.message);
      process.exit(1);
    }
    console.log(`\nInserted ${data?.length ?? 0} prices into Supabase`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
