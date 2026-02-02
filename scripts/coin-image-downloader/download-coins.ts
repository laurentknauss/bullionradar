import "dotenv/config";
import Browserbase from "@browserbasehq/sdk";
import { chromium, type Page } from "playwright-core";
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const OUTPUT_DIR = join(process.cwd(), "..", "..", "app", "public", "coins");

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
      console.log(`❌ HTTP ${response.status}`);
      return false;
    }
    const buffer = await response.arrayBuffer();
    if (buffer.byteLength < 1000) {
      console.log(`❌ Too small (${buffer.byteLength} bytes)`);
      return false;
    }
    writeFileSync(filepath, Buffer.from(buffer));
    const sizeKb = Math.round(buffer.byteLength / 1024);
    console.log(`✅ Downloaded ${sizeKb}KB → ${filepath.split("/").pop()}`);
    return true;
  } catch (err) {
    console.log(`❌ ${err}`);
    return false;
  }
}

async function scrapeGoldFr(
  page: Page,
  url: string,
  coinId: string,
  metal: "gold" | "silver",
) {
  console.log(`\n🔍 Navigating to: ${url}`);

  await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(2000);

  // Get all images on the page
  const images = await page.evaluate(() => {
    const imgs: { src: string; alt: string; width: number }[] = [];
    document.querySelectorAll("img").forEach((img) => {
      const src = img.getAttribute("src") || img.getAttribute("data-src") || "";
      const alt = img.getAttribute("alt") || "";
      const width = img.naturalWidth || img.width || 0;
      if (
        src &&
        !src.includes("logo") &&
        !src.includes("icon") &&
        !src.includes("sprite")
      ) {
        imgs.push({ src, alt, width });
      }
    });
    return imgs;
  });

  console.log(`📷 Found ${images.length} images:`);
  images.forEach((img, i) => {
    console.log(
      `   ${i}: ${img.src.substring(0, 80)}... (${img.width}px) [${img.alt.substring(0, 30)}]`,
    );
  });

  // Let user choose which images to download
  const coinDir = join(OUTPUT_DIR, metal);
  mkdirSync(coinDir, { recursive: true });

  return images;
}

async function main() {
  const url = process.argv[2];
  const coinId = process.argv[3];
  const metal = (process.argv[4] || "gold") as "gold" | "silver";

  if (!url || !coinId) {
    console.log("Usage: pnpm download <URL> <COIN_ID> [gold|silver]");
    console.log(
      "Example: pnpm download https://www.gold.fr/achat-or/maple-leaf-1-once-or/ maple-leaf-1oz-or gold",
    );
    process.exit(1);
  }

  console.log(`\n🪙 Gold.fr Scraper`);
  console.log(`📦 Coin: ${coinId}`);
  console.log(`🔗 URL: ${url}`);

  mkdirSync(join(OUTPUT_DIR, "gold"), { recursive: true });
  mkdirSync(join(OUTPUT_DIR, "silver"), { recursive: true });

  // Create Browserbase session
  const bb = new Browserbase({
    apiKey: process.env.BROWSERBASE_API_KEY!,
  });

  const session = await bb.sessions.create({
    projectId: process.env.BROWSERBASE_PROJECT_ID!,
  });

  console.log(`\n👀 Live: https://browserbase.com/sessions/${session.id}\n`);

  const browser = await chromium.connectOverCDP(session.connectUrl);
  const context = browser.contexts()[0];
  const page = context.pages()[0] || (await context.newPage());

  const images = await scrapeGoldFr(page, url, coinId, metal);

  // Ask which images to download
  console.log("\n📥 Enter image numbers to download (comma-separated):");
  console.log("   Format: <index>:avers or <index>:revers");
  console.log("   Example: 0:avers,1:revers");

  // For now, auto-download first 2 if they look good
  const coinDir = join(OUTPUT_DIR, metal);

  if (images.length >= 1 && images[0].src) {
    const imgUrl = images[0].src.startsWith("//")
      ? `https:${images[0].src}`
      : images[0].src.startsWith("/")
        ? `https://www.gold.fr${images[0].src}`
        : images[0].src;
    const ext = imgUrl.split(".").pop()?.split("?")[0]?.toLowerCase() || "jpg";
    console.log(`\n⬇️  Downloading image 0 as obverse...`);
    await downloadImage(imgUrl, join(coinDir, `${coinId}-avers.${ext}`));
  }

  if (images.length >= 2 && images[1].src) {
    const imgUrl = images[1].src.startsWith("//")
      ? `https:${images[1].src}`
      : images[1].src.startsWith("/")
        ? `https://www.gold.fr${images[1].src}`
        : images[1].src;
    const ext = imgUrl.split(".").pop()?.split("?")[0]?.toLowerCase() || "jpg";
    console.log(`⬇️  Downloading image 1 as reverse...`);
    await downloadImage(imgUrl, join(coinDir, `${coinId}-revers.${ext}`));
  }

  await browser.close();
  console.log("\n✅ Done");
}

main().catch((err) => {
  console.error("❌ Fatal:", err);
  process.exit(1);
});
