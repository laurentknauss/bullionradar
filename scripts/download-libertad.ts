import { chromium } from "playwright";
import * as fs from "fs";
import * as path from "path";

const OUTPUT_DIR = "../app/public/coins-v2/silver";

async function downloadLibertadImages() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Go to APMEX Libertad page
  await page.goto("https://www.apmex.com/category/23890/mexico-silver-libertad-coins");
  await page.waitForTimeout(2000);

  // Find product image
  const imgUrl = await page.evaluate(() => {
    const img = document.querySelector('img[alt*="Libertad"]') as HTMLImageElement;
    return img?.src || null;
  });

  if (imgUrl) {
    console.log("Found image:", imgUrl);

    // Download image via fetch in browser context
    const imageBuffer = await page.evaluate(async (url) => {
      const response = await fetch(url);
      const blob = await response.blob();
      const arrayBuffer = await blob.arrayBuffer();
      return Array.from(new Uint8Array(arrayBuffer));
    }, imgUrl);

    const outputPath = path.join(__dirname, OUTPUT_DIR, "libertad-1oz-argent-avers.png");
    fs.writeFileSync(outputPath, Buffer.from(imageBuffer));
    console.log("Saved to:", outputPath);
  } else {
    console.log("No image found, taking screenshot instead");
    await page.screenshot({ path: path.join(__dirname, OUTPUT_DIR, "libertad-screenshot.png") });
  }

  await browser.close();
}

downloadLibertadImages().catch(console.error);
