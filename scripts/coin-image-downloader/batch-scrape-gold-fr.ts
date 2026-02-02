import "dotenv/config";
import Browserbase from "@browserbasehq/sdk";
import { chromium, type Page } from "playwright-core";
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const OUTPUT_DIR = join(process.cwd(), "..", "..", "app", "public", "coins-v2");

// Direct image URLs from gold.fr (found via research)
const COIN_IMAGES: {
  coinId: string;
  metal: "gold" | "silver";
  aversUrl: string;
  reversUrl: string | null;
}[] = [
  // === OR - Krugerrand (has Face/Pile) ===
  {
    coinId: "krugerrand-1oz-or",
    metal: "gold",
    aversUrl:
      "https://media.gold.fr/Maxime/Once%20Or%20Krugerrand/Once_Krugerrand_Or_Face.jpg",
    reversUrl:
      "https://media.gold.fr/Maxime/Once%20Or%20Krugerrand/Once_Krugerrand_Or_Pile.jpg",
  },
  // === OR - Modern bullion (catalog images - single side) ===
  {
    coinId: "american-buffalo-1oz-or",
    metal: "gold",
    aversUrl: "https://media.gold.fr/coins_images/american-buffalo-or.png",
    reversUrl: null,
  },
  {
    coinId: "american-eagle-1oz-or",
    metal: "gold",
    aversUrl: "https://media.gold.fr/coins_images/american-eagle-oz-or.png",
    reversUrl: null,
  },
  {
    coinId: "britannia-1oz-or",
    metal: "gold",
    aversUrl: "https://media.gold.fr/coins_images/britannia-1-oz-or.png",
    reversUrl: null,
  },
  {
    coinId: "kangourou-1oz-or",
    metal: "gold",
    aversUrl: "https://media.gold.fr/coins_images/kangourou-1-oz-or.png",
    reversUrl: null,
  },
  {
    coinId: "maple-leaf-1oz-or",
    metal: "gold",
    aversUrl: "https://media.gold.fr/coins_images/maple-leaf-1oz-or.png",
    reversUrl: null,
  },
  {
    coinId: "philharmonique-1oz-or",
    metal: "gold",
    aversUrl: "https://media.gold.fr/coins_images/philharmonique-1-oz.png",
    reversUrl: null,
  },
  {
    coinId: "panda-30g-or",
    metal: "gold",
    aversUrl: "https://media.gold.fr/coins_images/panda-or-30g.png",
    reversUrl: null,
  },
  // === OR - Fractional ===
  {
    coinId: "britannia-1-2oz-or",
    metal: "gold",
    aversUrl: "https://media.gold.fr/coins_images/britannia-1-2-oz-or.png",
    reversUrl: null,
  },
  {
    coinId: "kangourou-1-2oz-or",
    metal: "gold",
    aversUrl: "https://media.gold.fr/coins_images/kangourou-1-2-oz-or.png",
    reversUrl: null,
  },
  {
    coinId: "maple-leaf-1-2oz-or",
    metal: "gold",
    aversUrl: "https://media.gold.fr/coins_images/maple-leaf-demi-oz.png",
    reversUrl: null,
  },
  {
    coinId: "philharmonique-1-2oz-or",
    metal: "gold",
    aversUrl: "https://media.gold.fr/coins_images/philharmonique-demi-once.png",
    reversUrl: null,
  },
  {
    coinId: "britannia-1-4oz-or",
    metal: "gold",
    aversUrl: "https://media.gold.fr/coins_images/britannia-or-1-4-oz.png",
    reversUrl: null,
  },
  {
    coinId: "kangourou-1-4oz-or",
    metal: "gold",
    aversUrl: "https://media.gold.fr/coins_images/kangourou-1-4-oz-or.png",
    reversUrl: null,
  },
  {
    coinId: "maple-leaf-1-4oz-or",
    metal: "gold",
    aversUrl: "https://media.gold.fr/coins_images/maple-leaf-1-4-oz.jpg",
    reversUrl: null,
  },
  {
    coinId: "philharmonique-1-4oz-or",
    metal: "gold",
    aversUrl: "https://media.gold.fr/coins_images/philharmonique-1_4-oz-or.png",
    reversUrl: null,
  },
  {
    coinId: "panda-15g-or",
    metal: "gold",
    aversUrl: "https://media.gold.fr/coins_images/panda-or-15g.png",
    reversUrl: null,
  },
  {
    coinId: "panda-8g-or",
    metal: "gold",
    aversUrl: "https://media.gold.fr/coins_images/panda-or-8g.png",
    reversUrl: null,
  },
  // === OR - Classic French ===
  {
    coinId: "napoleon-20f-or",
    metal: "gold",
    aversUrl:
      "https://media.gold.fr/coins_images/achat_piece_napoleon_louis_d_or_meilleur_prix.jpg",
    reversUrl: null,
  },
  {
    coinId: "20-francs-suisse-or",
    metal: "gold",
    aversUrl:
      "https://media.gold.fr/coins_images/acheter_piece_20_francs_suisse_vreneli_meilleur_prix.jpg",
    reversUrl: null,
  },
  {
    coinId: "souverain-or",
    metal: "gold",
    aversUrl:
      "https://media.gold.fr/coins_images/acheter_piece_or_souverain_pas_cher.jpg",
    reversUrl: null,
  },
  // === ARGENT - Britannia (has Face/Pile) ===
  {
    coinId: "britannia-1oz-argent",
    metal: "silver",
    aversUrl:
      "https://media.gold.fr/coins_images/piece-britannia-argent-face.jpg",
    reversUrl:
      "https://media.gold.fr/coins_images/britannia-2-livres-1oz-silver-2013-pile.jpg",
  },
  // === ARGENT - Maple Leaf (has Face/Pile) ===
  {
    coinId: "maple-leaf-1oz-argent",
    metal: "silver",
    aversUrl: "https://media.gold.fr/coins_images/maple-leaf-2021-1oz-face.jpg",
    reversUrl:
      "https://media.gold.fr/coins_images/maple-leaf-2021-1oz-pile.jpg",
  },
  // === ARGENT - Philharmonique ===
  {
    coinId: "philharmonique-1oz-argent",
    metal: "silver",
    aversUrl:
      "https://media.gold.fr/coins_images/philharmonic-2021-1oz-face.jpg",
    reversUrl:
      "https://media.gold.fr/coins_images/philharmonic-2021-1oz-pile.jpg",
  },
  // === ARGENT - Kangourou ===
  {
    coinId: "kangourou-1oz-argent",
    metal: "silver",
    aversUrl: "https://media.gold.fr/coins_images/kangourou-2021-1oz-face.jpg",
    reversUrl: "https://media.gold.fr/coins_images/kangourou-2021-1oz-pile.jpg",
  },
  // === ARGENT - American Eagle ===
  {
    coinId: "american-eagle-1oz-argent",
    metal: "silver",
    aversUrl:
      "https://media.gold.fr/coins_images/1oz-americaneagle-argent-2019-face.jpg",
    reversUrl:
      "https://media.gold.fr/coins_images/1oz-americaneagle-argent-2019-pile.jpg",
  },
  // === ARGENT - Krugerrand ===
  {
    coinId: "krugerrand-1oz-argent",
    metal: "silver",
    aversUrl:
      "https://media.gold.fr/coins_images/krugerrand-argent-1-oz-face.jpg",
    reversUrl:
      "https://media.gold.fr/coins_images/krugerrand-argent-1-oz-pile.jpg",
  },
  // === ARGENT - French classics ===
  {
    coinId: "50-francs-hercule-argent",
    metal: "silver",
    aversUrl:
      "https://media.gold.fr/coins_images/argent/50-francs-hercule-face.jpg",
    reversUrl:
      "https://media.gold.fr/coins_images/argent/50%20francs%20hercule%20pile.jpg",
  },
  {
    coinId: "10-francs-hercule-argent",
    metal: "silver",
    aversUrl:
      "https://media.gold.fr/coins_images/argent/10-francs-hercule-face.jpg",
    reversUrl:
      "https://media.gold.fr/coins_images/argent/10-francs-hercule-pile-modif.jpg",
  },
  {
    coinId: "5-francs-semeuse-argent",
    metal: "silver",
    aversUrl:
      "https://media.gold.fr/coins_images/argent/5-francs-semeuse-face.jpg",
    reversUrl:
      "https://media.gold.fr/coins_images/argent/5-francs-semeuse-pile-modif.jpg",
  },
  {
    coinId: "100-francs-pantheon-argent",
    metal: "silver",
    aversUrl:
      "https://media.gold.fr/coins_images/argent/100-francs-pantheon-face.jpg",
    reversUrl:
      "https://media.gold.fr/coins_images/argent/100%20francs%20pantheon%20pile.jpg",
  },
  // === OR - 1/10 oz ===
  {
    coinId: "britannia-1-10oz-or",
    metal: "gold",
    aversUrl: "https://media.gold.fr/coins_images/britannia-1-10oz-or.png",
    reversUrl: null,
  },
  {
    coinId: "kangourou-1-10oz-or",
    metal: "gold",
    aversUrl: "https://media.gold.fr/coins_images/kangourou-1-10oz-or.png",
    reversUrl: null,
  },
  {
    coinId: "maple-leaf-1-10oz-or",
    metal: "gold",
    aversUrl: "https://media.gold.fr/coins_images/maple-leaf-1-10oz-or.png",
    reversUrl: null,
  },
  {
    coinId: "philharmonique-1-10oz-or",
    metal: "gold",
    aversUrl: "https://media.gold.fr/coins_images/philharmonique-1-10oz-or.png",
    reversUrl: null,
  },
  {
    coinId: "maple-leaf-1-20oz-or",
    metal: "gold",
    aversUrl: "https://media.gold.fr/coins_images/maple-leaf-1-20oz-or.png",
    reversUrl: null,
  },
];

async function downloadImage(url: string, filepath: string): Promise<boolean> {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0",
        Referer: "https://www.gold.fr/",
      },
    });
    if (!response.ok) {
      console.log(`  ❌ HTTP ${response.status}`);
      return false;
    }
    const buffer = await response.arrayBuffer();
    if (buffer.byteLength < 1000) {
      console.log(`  ❌ Too small (${buffer.byteLength} bytes)`);
      return false;
    }
    writeFileSync(filepath, Buffer.from(buffer));
    const sizeKb = Math.round(buffer.byteLength / 1024);
    console.log(`  ✅ ${sizeKb}KB → ${filepath.split("/").pop()}`);
    return true;
  } catch (err) {
    console.log(`  ❌ ${err}`);
    return false;
  }
}

async function scrapePage(
  page: Page,
  url: string,
  keyword: string,
): Promise<string[]> {
  console.log(`\n🔍 Scraping ${url} for "${keyword}" images...`);

  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForTimeout(2000);

    // Scroll to load lazy images
    for (let i = 0; i < 5; i++) {
      await page.evaluate(() => window.scrollBy(0, 400));
      await page.waitForTimeout(200);
    }

    const images = await page.evaluate((kw) => {
      const found: string[] = [];
      document.querySelectorAll("img").forEach((img) => {
        const src =
          img.getAttribute("src") || img.getAttribute("data-src") || "";
        if (
          src.includes("media.gold.fr") &&
          src.toLowerCase().includes(kw.toLowerCase())
        ) {
          found.push(src);
        }
      });
      return found;
    }, keyword);

    console.log(`   Found ${images.length} matching images`);
    return images;
  } catch (err) {
    console.log(`   ❌ Error: ${err}`);
    return [];
  }
}

async function main() {
  console.log(`\n🏦 Gold.fr Direct Image Downloader`);
  console.log(`📁 Output: ${OUTPUT_DIR}`);
  console.log(`📊 Coins configured: ${COIN_IMAGES.length}\n`);

  mkdirSync(join(OUTPUT_DIR, "gold"), { recursive: true });
  mkdirSync(join(OUTPUT_DIR, "silver"), { recursive: true });

  const results: { coin: string; obverse: boolean; reverse: boolean }[] = [];

  for (const coin of COIN_IMAGES) {
    console.log(`\n🪙 ${coin.coinId}`);

    const coinDir = join(OUTPUT_DIR, coin.metal);
    let aversOk = false;
    let reversOk = false;

    // Download avers
    const aversExt = coin.aversUrl.split(".").pop()?.split("?")[0] || "jpg";
    console.log(`  ⬇️ Downloading avers...`);
    aversOk = await downloadImage(
      coin.aversUrl,
      join(coinDir, `${coin.coinId}-avers.${aversExt}`),
    );

    // Download revers if available
    if (coin.reversUrl) {
      const reversExt = coin.reversUrl.split(".").pop()?.split("?")[0] || "jpg";
      console.log(`  ⬇️ Downloading revers...`);
      reversOk = await downloadImage(
        coin.reversUrl,
        join(coinDir, `${coin.coinId}-revers.${reversExt}`),
      );
    }

    results.push({ coin: coin.coinId, obverse: aversOk, reverse: reversOk });
  }

  // Summary
  console.log(`\n${"=".repeat(50)}`);
  console.log(`📊 SUMMARY`);
  console.log(`${"=".repeat(50)}`);

  const complete = results.filter((r) => r.obverse && r.reverse);
  const aversOnly = results.filter((r) => r.obverse && !r.reverse);
  const failed = results.filter((r) => !r.obverse);

  console.log(`\n✅ Complete (both sides): ${complete.length}`);
  complete.forEach((r) => console.log(`   - ${r.coin}`));

  console.log(`\n📷 Avers only: ${aversOnly.length}`);
  aversOnly.forEach((r) => console.log(`   - ${r.coin}`));

  if (failed.length > 0) {
    console.log(`\n❌ Failed: ${failed.length}`);
    failed.forEach((r) => console.log(`   - ${r.coin}`));
  }

  // Save results
  writeFileSync(
    join(process.cwd(), "batch-results.json"),
    JSON.stringify(results, null, 2),
  );
  console.log(`\n📝 Results saved to batch-results.json`);
}

main().catch((err) => {
  console.error("❌ Fatal:", err);
  process.exit(1);
});
