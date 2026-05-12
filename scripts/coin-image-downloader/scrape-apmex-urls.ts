import "dotenv/config";
import Browserbase from "@browserbasehq/sdk";
import { chromium } from "playwright-core";

// Pièces argent manquantes avec leurs URLs APMEX (URLs vérifiées 2026-02)
const COINS_TO_SCRAPE = [
  {
    id: "koala-1oz-argent",
    url: "https://www.apmex.com/product/102420/1-oz-australian-silver-koala-bu-random-year",
  },
  {
    id: "panda-30g-argent",
    url: "https://www.apmex.com/product/169389/china-30-gram-silver-panda-random-year",
  },
  {
    id: "noah-ark-1oz-argent",
    url: "https://www.apmex.com/product/157489/armenia-1-oz-silver-500-drams-noahs-ark-bu-random-year",
  },
  {
    id: "lunar-1oz-argent",
    url: "https://www.apmex.com/product/283163/2024-australia-1-oz-silver-lunar-dragon-bu-series-iii",
  },
  {
    id: "buffalo-1oz-argent",
    url: "https://www.apmex.com/product/44447/1-oz-silver-round-buffalo",
  },
  {
    id: "turtle-1oz-argent",
    url: "https://www.apmex.com/product/225244/2021-niue-1-oz-silver-2-hawksbill-turtle-bu",
  },
];

async function main() {
  console.log("🚀 APMEX Silver Coin URL Scraper\n");

  const bb = new Browserbase({
    apiKey: process.env.BROWSERBASE_API_KEY!,
  });

  const session = await bb.sessions.create({
    projectId: process.env.BROWSERBASE_PROJECT_ID!,
  });

  console.log(`👀 Live: https://browserbase.com/sessions/${session.id}\n`);

  const browser = await chromium.connectOverCDP(session.connectUrl);
  const context = browser.contexts()[0];
  const page = context.pages()[0] || (await context.newPage());

  const results: Record<string, string[]> = {};

  for (const coin of COINS_TO_SCRAPE) {
    console.log(`\n📀 ${coin.id}`);
    console.log(`   ${coin.url}`);

    try {
      await page.goto(coin.url, {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      });
      await page.waitForTimeout(3000);

      // Extract image URLs
      const imageUrls = await page.evaluate(() => {
        const images: string[] = [];
        const imgElements = document.querySelectorAll("img");

        for (const img of imgElements) {
          const src = img.src || img.getAttribute("data-src") || "";

          if (
            src &&
            (src.includes("apmex") ||
              src.includes("cloudfront") ||
              src.includes("images")) &&
            !src.includes("logo") &&
            !src.includes("icon") &&
            !src.includes("banner") &&
            !src.includes("sprite") &&
            !src.includes("payment") &&
            !src.includes("flag") &&
            img.naturalWidth > 150
          ) {
            images.push(src);
          }
        }

        return [...new Set(images)];
      });

      console.log(`   ✅ Found ${imageUrls.length} images:`);
      imageUrls.slice(0, 5).forEach((url, i) => {
        console.log(`      [${i}] ${url}`);
      });

      results[coin.id] = imageUrls;
    } catch (error) {
      console.error(`   ❌ Error: ${error}`);
      results[coin.id] = [];
    }

    await page.waitForTimeout(1500);
  }

  await browser.close();

  // Print config for batch script
  console.log("\n" + "=".repeat(70));
  console.log("📋 Add to batch-scrape-gold-fr.ts COIN_IMAGES array:");
  console.log("=".repeat(70) + "\n");

  for (const [coinId, urls] of Object.entries(results)) {
    if (urls.length > 0) {
      console.log(`  {`);
      console.log(`    coinId: "${coinId}",`);
      console.log(`    metal: "silver",`);
      console.log(`    aversUrl: "${urls[0]}",`);
      console.log(`    reversUrl: ${urls[1] ? `"${urls[1]}"` : "null"},`);
      console.log(`  },`);
    }
  }
}

main().catch((err) => {
  console.error("❌ Fatal:", err);
  process.exit(1);
});
