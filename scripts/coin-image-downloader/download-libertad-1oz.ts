import "dotenv/config";
import Browserbase from "@browserbasehq/sdk";
import { chromium } from "playwright-core";
import { writeFileSync } from "fs";
import { join } from "path";

const OUTPUT_DIR = join(process.cwd(), "..", "..", "app", "public", "coins-v2", "silver");
const APMEX_URL = "https://www.apmex.com/product/300026/2024-mexico-1-oz-silver-libertad-bu";

async function main() {
  console.log("🪙 Re-downloading Libertad 1oz\n");
  const bb = new Browserbase({ apiKey: process.env.BROWSERBASE_API_KEY! });
  const session = await bb.sessions.create({ projectId: process.env.BROWSERBASE_PROJECT_ID! });
  console.log(`👀 Live: https://browserbase.com/sessions/${session.id}\n`);

  const browser = await chromium.connectOverCDP(session.connectUrl);
  const context = browser.contexts()[0];
  const page = context.pages()[0] || (await context.newPage());

  await page.goto(APMEX_URL, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForTimeout(5000);
  for (let i = 0; i < 5; i++) { await page.evaluate(() => window.scrollBy(0, 400)); await page.waitForTimeout(300); }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1500);

  const imageUrls = await page.evaluate(() => {
    const urls: string[] = [];
    document.querySelectorAll("img").forEach((img: HTMLImageElement) => {
      const candidates = [img.src, img.getAttribute("data-src") || "", (img.getAttribute("srcset") || "").split(",")[0]?.trim().split(" ")[0] || ""];
      for (const src of candidates) {
        if (src && src.includes("images-apmex.com") && !src.includes("logo") && !src.includes("icon") && !src.includes("banner") && !src.includes("sprite") && !src.includes("payment") && !src.includes("flag")) urls.push(src);
      }
    });
    return [...new Set(urls)];
  });

  console.log(`📷 Found ${imageUrls.length} images`);
  imageUrls.forEach((url, i) => console.log(`   [${i}] ${url.substring(0, 120)}`));

  const obvUrl = imageUrls.find((u) => u.toLowerCase().includes("_obv"));
  const revUrl = imageUrls.find((u) => u.toLowerCase().includes("_rev"));
  const catalogUrls = imageUrls.filter((u) => u.includes("/products/") && !u.toLowerCase().includes("_obv") && !u.toLowerCase().includes("_rev"));

  const toDownload = [
    { url: obvUrl || catalogUrls[0], name: "libertad-1oz-argent-avers.jpg" },
    { url: revUrl || catalogUrls[1], name: "libertad-1oz-argent-revers.jpg" },
  ].filter(d => d.url);

  for (const img of toDownload) {
    img.url = img.url!.replace(/[&?]width=\d+/g, "").replace(/[&?]height=\d+/g, "");
    console.log(`\n⬇️  ${img.name}: ${img.url!.substring(0, 100)}`);
    const imageData = await page.evaluate(async (u: string) => {
      const r = await fetch(u); if (!r.ok) return null;
      const b = await r.blob(); const ab = await b.arrayBuffer();
      return Array.from(new Uint8Array(ab));
    }, img.url!);
    if (imageData && imageData.length > 1000) {
      writeFileSync(join(OUTPUT_DIR, img.name), Buffer.from(imageData));
      console.log(`   ✅ ${Math.round(imageData.length / 1024)}KB`);
    } else console.log(`   ❌ Failed`);
  }
  await browser.close();
  console.log("\n✅ Done");
}
main().catch(e => { console.error(e); process.exit(1); });
