/**
 * Scraper Or.fr (GoldBroker)
 * Retrieves buy prices for gold coins with shipping (Livraison)
 *
 * Note: Or.fr is the French portal for GoldBroker.com
 * - Uses EUR currency
 * - serviceType=3 = Livraison (shipping)
 * - Prices are for individual coins unless specified as "Tube de 10"
 */

import { chromium, type Page } from "playwright";
import {
  type DealerPrice,
  type CoinConfig,
  parseFrenchPrice,
  sleep,
} from "./types";

const DEALER_NAME = "orfr";
const BASE_URL = "https://or.fr";

// Coins to scrape from Or.fr (URLs verified 2026-02-27)
// All gold bullion coins available on Or.fr for shipping
const COINS_TO_SCRAPE: readonly CoinConfig[] = [
  // === 1 oz ===
  {
    slug: "krugerrand-1oz",
    name: "Krugerrand 1 Once",
    url: "https://or.fr/produits/acheter-or/pieces-or/krugerrand-or-1-once-2026-south-african-mint-498?serviceType=3",
  },
  {
    slug: "maple-leaf-1oz",
    name: "Maple Leaf 1 Once",
    url: "https://or.fr/produits/acheter-or/pieces-or/maple-leaf-or-1-once-2026-royal-canadian-mint-470?serviceType=3",
  },
  {
    slug: "philharmonique-1oz",
    name: "Philharmonique 1 Once",
    url: "https://or.fr/produits/acheter-or/pieces-or/philharmonique-or-1-once-2026-austrian-mint-477?serviceType=3",
  },
  {
    slug: "britannia-1oz-or",
    name: "Britannia 1 Oz Or",
    url: "https://or.fr/produits/acheter-or/pieces-or/britannia-or-1once-2026-royal-mint-445?serviceType=3",
  },
  {
    slug: "kangourou-1oz-or",
    name: "Kangourou 1 Once",
    url: "https://or.fr/produits/acheter-or/pieces-or/kangourou-or-1-once-2026-perth-mint-464?serviceType=3",
  },
  {
    slug: "american-eagle-1oz-or",
    name: "American Eagle 1 Once",
    url: "https://or.fr/produits/acheter-or/pieces-or/american-eagle-or-1-once-2026-us-mint-483?serviceType=3",
  },
  // === 1/2 oz ===
  {
    slug: "britannia-1-2oz-or",
    name: "Britannia 1/2 Oz Or",
    url: "https://or.fr/produits/acheter-or/pieces-or/britannia-or-1-2-once-2026-royal-mint-447?serviceType=3",
  },
  {
    slug: "krugerrand-1-2oz-or",
    name: "Krugerrand 1/2 Once",
    url: "https://or.fr/produits/acheter-or/pieces-or/krugerrand-or-1-2-once-2026-south-african-mint-496?serviceType=3",
  },
  {
    slug: "kangourou-1-2oz-or",
    name: "Kangourou 1/2 Once",
    url: "https://or.fr/produits/acheter-or/pieces-or/kangourou-or-1-2-onces-2026-perth-mint-466?serviceType=3",
  },
  {
    slug: "maple-leaf-1-2oz-or",
    name: "Maple Leaf 1/2 Once",
    url: "https://or.fr/produits/acheter-or/pieces-or/maple-leaf-or-1-2-once-2026-royal-canadian-mint-491?serviceType=3",
  },
  {
    slug: "american-eagle-1-2oz-or",
    name: "American Eagle 1/2 Once",
    url: "https://or.fr/produits/acheter-or/pieces-or/american-eagle-or-1-2-once-2026-us-mint-485?serviceType=3",
  },
  // === 1/4 oz ===
  {
    slug: "krugerrand-1-4oz-or",
    name: "Krugerrand 1/4 Once",
    url: "https://or.fr/produits/acheter-or/pieces-or/krugerrand-or-1-4-once-2026-south-african-mint-495?serviceType=3",
  },
  {
    slug: "kangourou-1-4oz-or",
    name: "Kangourou 1/4 Once",
    url: "https://or.fr/produits/acheter-or/pieces-or/kangourou-or-1-4-once-2026-perth-mint-467?serviceType=3",
  },
  {
    slug: "maple-leaf-1-4oz-or",
    name: "Maple Leaf 1/4 Once",
    url: "https://or.fr/produits/acheter-or/pieces-or/maple-leaf-or-1-4-once-2026-royal-canadian-mint-492?serviceType=3",
  },
  {
    slug: "american-eagle-1-4oz-or",
    name: "American Eagle 1/4 Once",
    url: "https://or.fr/produits/acheter-or/pieces-or/american-eagle-or-1-4-once-2026-us-mint-486?serviceType=3",
  },
  // === 1/10 oz ===
  {
    slug: "britannia-1-10oz-or",
    name: "Britannia 1/10 Oz Or",
    url: "https://or.fr/produits/acheter-or/pieces-or/britannia-or-1-10-once-2026-royal-mint-449?serviceType=3",
  },
  {
    slug: "krugerrand-1-10oz-or",
    name: "Krugerrand 1/10 Once",
    url: "https://or.fr/produits/acheter-or/pieces-or/krugerrand-or-1-10-once-2026-south-african-mint-497?serviceType=3",
  },
  {
    slug: "kangourou-1-10oz-or",
    name: "Kangourou 1/10 Once",
    url: "https://or.fr/produits/acheter-or/pieces-or/kangourou-or-1-10-once-2026-perth-mint-468?serviceType=3",
  },
  {
    slug: "maple-leaf-1-10oz-or",
    name: "Maple Leaf 1/10 Once",
    url: "https://or.fr/produits/acheter-or/pieces-or/maple-leaf-or-1-10-once-2026-royal-canadian-mint-493?serviceType=3",
  },
  {
    slug: "american-eagle-1-10oz-or",
    name: "American Eagle 1/10 Once",
    url: "https://or.fr/produits/acheter-or/pieces-or/american-eagle-or-1-10-once-2026-us-mint-473?serviceType=3",
  },
  // === 1/20 oz ===
  {
    slug: "maple-leaf-1-20oz-or",
    name: "Maple Leaf 1/20 Once",
    url: "https://or.fr/produits/acheter-or/pieces-or/maple-leaf-or-1-20-once-2026-royal-canadian-mint-501?serviceType=3",
  },
  // === Pièces françaises/suisses ===
  {
    slug: "napoleon-20f",
    name: "Napoleon 20 Francs",
    url: "https://or.fr/produits/acheter-or/pieces-or/20-francs-marianne-coq-napoleon-433?serviceType=3",
  },
  {
    slug: "20-francs-suisse",
    name: "20 Francs Suisse",
    url: "https://or.fr/produits/acheter-or/pieces-or/20-francs-suisse-vreneli-439?serviceType=3",
  },
] as const;

/**
 * Accept cookies if popup appears
 */
async function acceptCookies(page: Page): Promise<void> {
  try {
    // French cookie button
    const acceptButton = page.locator('button:has-text("Tout accepter")');
    if (await acceptButton.isVisible({ timeout: 3000 })) {
      await acceptButton.click();
      console.log("  [ok] Cookies accepted");
      await sleep(500);
    }
  } catch {
    // No cookie popup, continue
  }
}

/**
 * Set currency to EUR if not already
 */
async function ensureEurCurrency(page: Page): Promise<void> {
  try {
    // Check if already EUR
    const currencySelector = page.locator('text="EUR €"');
    if (await currencySelector.isVisible({ timeout: 2000 })) {
      return; // Already EUR
    }

    // Click on currency selector (USD $ or other)
    const currencyButton = page
      .locator('[class*="currency"], button:has-text("USD")')
      .first();
    if (await currencyButton.isVisible({ timeout: 2000 })) {
      await currencyButton.click();
      await sleep(500);

      // Select EUR
      const eurOption = page.locator('text="EUR €"').first();
      if (await eurOption.isVisible({ timeout: 2000 })) {
        await eurOption.click();
        console.log("  [ok] Currency set to EUR");
        await sleep(1000);
      }
    }
  } catch {
    console.log("  [warn] Could not verify/set EUR currency");
  }
}

/**
 * Scrape the price of a coin from an Or.fr product page
 */
async function scrapeCoinPrice(
  page: Page,
  coin: CoinConfig,
): Promise<DealerPrice | null> {
  console.log(`\n-> Scraping ${coin.name}...`);

  try {
    await page.goto(coin.url, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    await acceptCookies(page);

    // Wait for page to fully load (JS content)
    await sleep(3000);

    // Get the unit price from the "Individuel" option
    // Or.fr pages have radio buttons: "Tube de 10" and "Individuel"
    // The price is loaded via AJAX into a span next to the radio
    // We find the radio labeled "Individuel" and get the price from its row
    let priceText = "";

    try {
      // The "Individuel" radio is inside a container that also has the price
      // Use the radio input for delivery (id contains "delivery") that is NOT the tube
      // Product IDs: individual = coin.url product ID, tube = different ID
      const individuelContainer = page
        .locator(".form-check")
        .filter({ has: page.locator('input[id*="delivery"]') })
        .filter({
          has: page.locator(
            'input[id*="' + coin.url.match(/(\d+)\?/)?.[1] + '"]',
          ),
        })
        .locator(
          'xpath=ancestor::*[contains(@class,"d-flex") or contains(@class,"align-items")]',
        )
        .first();

      if (await individuelContainer.isVisible({ timeout: 5000 })) {
        const text = (await individuelContainer.textContent()) || "";
        const match = text.match(/(\d[\d\s]*[.,]\d{2})\s*€/);
        if (match) {
          priceText = match[0];
        }
      }
    } catch {
      // Fallback: find the row containing "Individuel" text and extract price
    }

    // Fallback: get the radio by role name containing "Individuel"
    if (!priceText) {
      try {
        const individuelRadio = page.getByRole("radio", {
          name: /Individuel/i,
        });
        if (await individuelRadio.isVisible({ timeout: 3000 })) {
          // Navigate up to the row container that includes the price
          const row = individuelRadio
            .locator('xpath=ancestor::*[contains(@class,"d-flex")]')
            .first();
          const text = (await row.textContent()) || "";
          const match = text.match(/(\d[\d\s]*[.,]\d{2})\s*€/);
          if (match) {
            priceText = match[0];
          }
        }
      } catch {
        // Not found
      }
    }

    if (!priceText) {
      console.error(`  [error] Price not found for ${coin.name}`);
      return null;
    }

    // Extract price from text like "4 292,51 €" or "À partir de 4 477,53 €"
    const priceMatch = priceText.match(/(\d[\d\s]*[.,]\d{2})\s*€/);
    if (!priceMatch?.[1]) {
      console.error(`  [error] Could not parse price: "${priceText}"`);
      return null;
    }

    const priceCents = parseFrenchPrice(priceMatch[1] + " €");
    const priceDisplay = `${(priceCents / 100).toFixed(2).replace(".", ",")} €`;

    // Check stock/shipping info
    let inStock = true;
    try {
      const shippingInfo = page.locator("text=/Expédition sous/");
      if (await shippingInfo.isVisible({ timeout: 2000 })) {
        inStock = true;
      }
    } catch {
      // No shipping info found, assume in stock
    }

    console.log(`  [ok] Price found: ${priceDisplay} (${priceCents} cents)`);

    return {
      coin_slug: coin.slug,
      coin_name: coin.name,
      dealer: DEALER_NAME,
      price_cents: priceCents,
      price_display: priceDisplay,
      currency: "EUR",
      in_stock: inStock,
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
 * Scrape all Or.fr coins
 */
export async function scrapeOrFr(): Promise<DealerPrice[]> {
  console.log("=".repeat(50));
  console.log("SCRAPING OR.FR (GOLDBROKER)");
  console.log("=".repeat(50));

  const browser = await chromium.launch({
    headless: true,
  });

  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    viewport: { width: 1280, height: 720 },
    locale: "fr-FR",
  });

  const page = await context.newPage();
  const results: DealerPrice[] = [];

  try {
    // First visit to set up cookies and currency
    console.log("\n-> Setting up session (cookies, currency)...");
    await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });
    await acceptCookies(page);
    await ensureEurCurrency(page);

    for (const coin of COINS_TO_SCRAPE) {
      const price = await scrapeCoinPrice(page, coin);
      if (price) {
        results.push(price);
      }
      // Delay between requests to avoid rate limiting
      await sleep(2500);
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
  scrapeOrFr()
    .then((results) => {
      console.log("\nJSON results:");
      console.log(JSON.stringify(results, null, 2));
    })
    .catch((error: unknown) => {
      console.error("Fatal error:", error);
      process.exit(1);
    });
}
