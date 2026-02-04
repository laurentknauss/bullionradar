/**
 * Test Or.fr scraping with different Playwright configurations
 * Goal: Find a config that bypasses anti-bot detection
 *
 * Usage: npx tsx test-orfr-playwright.ts
 */

import { chromium, firefox, webkit, type Browser, type Page } from "playwright";

const TEST_URL =
  "https://or.fr/produits/acheter-or/pieces-or/maple-leaf-or-1-once-2026-royal-canadian-mint-470?serviceType=3";

interface TestConfig {
  name: string;
  browserType: "chromium" | "firefox" | "webkit";
  headless: boolean;
  userAgent?: string;
  locale?: string;
  extraHeaders?: Record<string, string>;
  viewport?: { width: number; height: number };
  javaScriptEnabled?: boolean;
  args?: string[];
}

const CONFIGS: TestConfig[] = [
  // Config 1: Default headless (baseline - expected to fail)
  {
    name: "1. Chromium headless default",
    browserType: "chromium",
    headless: true,
  },

  // Config 2: Headless with realistic UA + French locale
  {
    name: "2. Chromium headless + FR locale + realistic UA",
    browserType: "chromium",
    headless: true,
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
    locale: "fr-FR",
    viewport: { width: 1920, height: 1080 },
  },

  // Config 3: Headless with extra headers (mimic real browser)
  {
    name: "3. Chromium headless + extra headers",
    browserType: "chromium",
    headless: true,
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
    locale: "fr-FR",
    extraHeaders: {
      "Accept-Language": "fr-FR,fr;q=0.9,en;q=0.8",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
      "Sec-Ch-Ua":
        '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
      "Sec-Ch-Ua-Mobile": "?0",
      "Sec-Ch-Ua-Platform": '"macOS"',
      "Sec-Fetch-Dest": "document",
      "Sec-Fetch-Mode": "navigate",
      "Sec-Fetch-Site": "none",
      "Sec-Fetch-User": "?1",
      "Upgrade-Insecure-Requests": "1",
    },
  },

  // Config 4: Chromium with stealth args
  {
    name: "4. Chromium headless + stealth args",
    browserType: "chromium",
    headless: true,
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
    locale: "fr-FR",
    args: [
      "--disable-blink-features=AutomationControlled",
      "--disable-features=IsolateOrigins,site-per-process",
      "--disable-site-isolation-trials",
    ],
  },

  // Config 5: Firefox headless (different engine, might work)
  {
    name: "5. Firefox headless",
    browserType: "firefox",
    headless: true,
    locale: "fr-FR",
  },

  // Config 6: Webkit headless (Safari engine)
  {
    name: "6. Webkit headless (Safari)",
    browserType: "webkit",
    headless: true,
    locale: "fr-FR",
  },

  // Config 7: Chromium headed (visible browser - usually works)
  {
    name: "7. Chromium HEADED (visible)",
    browserType: "chromium",
    headless: false,
    locale: "fr-FR",
  },

  // Config 8: New headless mode (Chromium 109+)
  {
    name: "8. Chromium new headless mode",
    browserType: "chromium",
    headless: true,
    args: ["--headless=new"],
    locale: "fr-FR",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
  },
];

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function testConfig(config: TestConfig): Promise<boolean> {
  console.log(`\n${"=".repeat(60)}`);
  console.log(`Testing: ${config.name}`);
  console.log("=".repeat(60));

  let browser: Browser | null = null;

  try {
    // Select browser type
    const browserLauncher =
      config.browserType === "firefox"
        ? firefox
        : config.browserType === "webkit"
          ? webkit
          : chromium;

    // Launch options
    const launchOptions: Parameters<typeof browserLauncher.launch>[0] = {
      headless: config.headless,
      args: config.args,
    };

    browser = await browserLauncher.launch(launchOptions);

    // Context options
    const contextOptions: Parameters<typeof browser.newContext>[0] = {
      userAgent: config.userAgent,
      locale: config.locale,
      viewport: config.viewport || { width: 1280, height: 720 },
      javaScriptEnabled: config.javaScriptEnabled ?? true,
      extraHTTPHeaders: config.extraHeaders,
    };

    const context = await browser.newContext(contextOptions);
    const page = await context.newPage();

    // Navigate
    console.log(`-> Navigating to ${TEST_URL.substring(0, 60)}...`);
    await page.goto(TEST_URL, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });

    // Wait a bit for JS to load
    await sleep(3000);

    // Try to accept cookies if present
    try {
      const cookieBtn = page.locator('button:has-text("Tout accepter")');
      if (await cookieBtn.isVisible({ timeout: 2000 })) {
        await cookieBtn.click();
        console.log("-> Cookies accepted");
        await sleep(1000);
      }
    } catch {
      // No cookie popup
    }

    // Check page title
    const title = await page.title();
    console.log(`-> Page title: ${title}`);

    // Check if we got blocked or redirected
    const currentUrl = page.url();
    if (currentUrl.includes("captcha") || currentUrl.includes("blocked")) {
      console.log("❌ BLOCKED - Redirected to captcha/block page");
      return false;
    }

    // Try to find price element
    // Look for "À partir de" or price in EUR
    const pricePatterns = [
      "text=/À partir de/",
      "text=/\\d+[\\s,]\\d+.*€/",
      '[class*="price"]',
      "text=/EUR/",
    ];

    let priceFound = false;
    let priceText = "";

    for (const pattern of pricePatterns) {
      try {
        const element = page.locator(pattern).first();
        if (await element.isVisible({ timeout: 3000 })) {
          priceText = (await element.textContent()) || "";
          if (priceText && priceText.match(/\d/)) {
            priceFound = true;
            break;
          }
        }
      } catch {
        // Pattern not found, try next
      }
    }

    if (priceFound) {
      console.log(
        `✅ SUCCESS - Price found: "${priceText.trim().substring(0, 50)}"`,
      );
      return true;
    }

    // Check page content for clues
    const bodyText = await page.locator("body").textContent();
    const has404 =
      bodyText?.includes("Page not found") || bodyText?.includes("404");
    const hasPrice = bodyText?.match(/\d{3,}[,.\s]\d{2}\s*€/);

    if (has404) {
      console.log("❌ FAILED - Got 404 page");
      return false;
    }

    if (hasPrice) {
      console.log(`✅ SUCCESS - Price in body: "${hasPrice[0]}"`);
      return true;
    }

    // Take screenshot for debugging
    const screenshotPath = `/tmp/orfr-test-${config.name.replace(/[^a-z0-9]/gi, "-")}.png`;
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`❌ FAILED - No price found. Screenshot: ${screenshotPath}`);

    // Log some page info for debugging
    const h1 = await page
      .locator("h1")
      .first()
      .textContent()
      .catch(() => "N/A");
    console.log(`-> H1: ${h1?.substring(0, 50)}`);

    return false;
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.log(`❌ ERROR - ${msg.substring(0, 100)}`);
    return false;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

async function main(): Promise<void> {
  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║     OR.FR PLAYWRIGHT CONFIGURATION TESTER                  ║");
  console.log("║     Testing multiple configs to bypass anti-bot            ║");
  console.log("╚════════════════════════════════════════════════════════════╝");

  const results: { name: string; success: boolean }[] = [];

  for (const config of CONFIGS) {
    const success = await testConfig(config);
    results.push({ name: config.name, success });

    // Delay between tests
    await sleep(2000);
  }

  // Summary
  console.log("\n");
  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║                      RESULTS SUMMARY                       ║");
  console.log("╚════════════════════════════════════════════════════════════╝");
  console.log("");

  for (const result of results) {
    const status = result.success ? "✅ SUCCESS" : "❌ FAILED ";
    console.log(`${status} | ${result.name}`);
  }

  const successCount = results.filter((r) => r.success).length;
  console.log("");
  console.log(`Total: ${successCount}/${results.length} configurations work`);

  if (successCount > 0) {
    console.log("\n🎉 At least one config works! Use it in scrape-orfr.ts");
  } else {
    console.log("\n😞 No config works. Consider using Browserbase instead.");
  }
}

main().catch(console.error);
