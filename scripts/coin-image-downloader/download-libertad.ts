import "dotenv/config";
import Browserbase from "@browserbasehq/sdk";
import { chromium, type Page } from "playwright-core";
import { writeFileSync } from "fs";
import { join } from "path";

const OUTPUT_DIR = join(
  process.cwd(),
  "..",
  "..",
  "app",
  "public",
  "coins-v2",
  "silver",
);

// All Libertad silver denominations — 2024 specific pages (no "RANDOM YEAR" overlay)
const LIBERTAD_COINS = [
  {
    id: "libertad-1-20oz-argent",
    url: "https://www.apmex.com/product/301579/2024-mexico-1-20-oz-silver-libertad-bu",
  },
  {
    id: "libertad-1-10oz-argent",
    url: "https://www.apmex.com/product/301578/2024-mexico-1-10-oz-silver-libertad-bu",
  },
  {
    id: "libertad-1-4oz-argent",
    url: "https://www.apmex.com/product/301577/2024-mexico-1-4-oz-silver-libertad-bu",
  },
  {
    id: "libertad-1-2oz-argent",
    url: "https://www.apmex.com/product/301569/2024-mexico-1-2-oz-silver-libertad-bu",
  },
  {
    id: "libertad-2oz-argent",
    url: "https://www.apmex.com/product/301580/2024-mexico-2-oz-silver-libertad-bu",
  },
  {
    id: "libertad-5oz-argent",
    url: "https://www.apmex.com/product/301582/2024-mexico-5-oz-silver-libertad-bu",
  },
  {
    id: "libertad-1kg-argent",
    url: "https://www.apmex.com/product/303628/2024-mexico-1-kilo-silver-libertad-bu-in-capsule",
  },
];

function extractApmexImages(page: Page) {
  return page.evaluate(() => {
    const urls: string[] = [];
    document.querySelectorAll("img").forEach((img: HTMLImageElement) => {
      const candidates = [
        img.src,
        img.getAttribute("data-src") || "",
        img.getAttribute("data-lazy-src") || "",
        (img.getAttribute("srcset") || "")
          .split(",")[0]
          ?.trim()
          .split(" ")[0] || "",
      ];
      for (const src of candidates) {
        if (
          src &&
          src.includes("images-apmex.com") &&
          !src.includes("logo") &&
          !src.includes("icon") &&
          !src.includes("banner") &&
          !src.includes("sprite") &&
          !src.includes("payment") &&
          !src.includes("flag")
        ) {
          urls.push(src);
        }
      }
    });
    return [...new Set(urls)];
  });
}

function cleanUrl(url: string): string {
  return url.replace(/[&?]width=\d+/g, "").replace(/[&?]height=\d+/g, "");
}

async function downloadImage(
  page: Page,
  url: string,
  outputPath: string,
): Promise<boolean> {
  const imageData = await page.evaluate(async (u: string) => {
    const response = await fetch(u);
    if (!response.ok) return null;
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    return Array.from(new Uint8Array(arrayBuffer));
  }, url);

  if (imageData && imageData.length > 1000) {
    writeFileSync(outputPath, Buffer.from(imageData));
    const sizeKb = Math.round(imageData.length / 1024);
    console.log(`   ✅ ${sizeKb}KB → ${outputPath}`);
    return true;
  }
  console.log(`   ❌ Failed or too small`);
  return false;
}

async function main() {
  console.log(
    "🪙 Libertad Silver — All Denominations (APMEX via Browserbase)\n",
  );

  const bb = new Browserbase({ apiKey: process.env.BROWSERBASE_API_KEY! });
  const session = await bb.sessions.create({
    projectId: process.env.BROWSERBASE_PROJECT_ID!,
  });

  console.log(`👀 Live: https://browserbase.com/sessions/${session.id}\n`);

  const browser = await chromium.connectOverCDP(session.connectUrl);
  const context = browser.contexts()[0];
  const page = context.pages()[0] || (await context.newPage());

  for (const coin of LIBERTAD_COINS) {
    console.log(`\n${"=".repeat(60)}`);
    console.log(`📀 ${coin.id}`);
    console.log(`🔗 ${coin.url}`);

    try {
      await page.goto(coin.url, {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      });
      await page.waitForTimeout(5000);

      // Scroll to trigger lazy loading
      for (let i = 0; i < 5; i++) {
        await page.evaluate(() => window.scrollBy(0, 400));
        await page.waitForTimeout(300);
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(1500);

      const title = await page.title();
      console.log(`📄 ${title}`);

      const imageUrls = await extractApmexImages(page);
      console.log(`📷 Found ${imageUrls.length} APMEX images`);
      imageUrls.forEach((url, i) =>
        console.log(`   [${i}] ${url.substring(0, 120)}`),
      );

      // Find obverse (_obv) and reverse (_rev)
      const obvUrl = imageUrls.find((u) => u.toLowerCase().includes("_obv"));
      const revUrl = imageUrls.find((u) => u.toLowerCase().includes("_rev"));

      // Fallback: first two product images
      const catalogUrls = imageUrls.filter(
        (u) =>
          u.includes("/products/") &&
          !u.toLowerCase().includes("_obv") &&
          !u.toLowerCase().includes("_rev"),
      );

      const aversUrl = obvUrl || catalogUrls[0];
      const reversUrl = revUrl || catalogUrls[1];

      if (aversUrl) {
        const cleaned = cleanUrl(aversUrl);
        console.log(`\n⬇️  Avers: ${cleaned.substring(0, 100)}`);
        await downloadImage(
          page,
          cleaned,
          join(OUTPUT_DIR, `${coin.id}-avers.jpg`),
        );
      } else {
        console.log(`   ⚠️  No avers image found`);
      }

      if (reversUrl) {
        const cleaned = cleanUrl(reversUrl);
        console.log(`⬇️  Revers: ${cleaned.substring(0, 100)}`);
        await downloadImage(
          page,
          cleaned,
          join(OUTPUT_DIR, `${coin.id}-revers.jpg`),
        );
      } else {
        console.log(`   ⚠️  No revers image found`);
      }
    } catch (error) {
      console.error(`   ❌ Error: ${error}`);
    }

    await page.waitForTimeout(1500);
  }

  await browser.close();
  console.log("\n\n✅ All done!");
}

main().catch((err) => {
  console.error("❌ Fatal:", err);
  process.exit(1);
});
