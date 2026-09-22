import { chromium } from "playwright";

const SHOP = "https://foreg.base.shop/";
const OUT  = "shop-latest.png";

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1200, height: 750 },
  locale: "ja-JP",
  userAgent:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
    "(KHTML, like Gecko) Chrome/124.0 Safari/537.36",
});

await page.goto(SHOP, { waitUntil: "networkidle", timeout: 60_000 });

// 遅延読み込みの商品画像を出すため、一度スクロールして戻す
await page.evaluate(() => window.scrollTo(0, 600));
await page.waitForTimeout(2000);
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(2000);

await page.screenshot({
  path: OUT,
  clip: { x: 0, y: 0, width: 1200, height: 750 },
});

await browser.close();
console.log("wrote", OUT);
