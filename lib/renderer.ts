import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium-min";

// Hosted chromium binary for Vercel/Lambda
const CHROMIUM_REMOTE_EXEC_PATH =
  "https://github.com/Sparticuz/chromium/releases/download/v131.0.1/chromium-v131.0.1-pack.tar";

export async function renderHtmlToPng(
  html: string,
  width: number,
  height: number
): Promise<Buffer> {
  const isServerless =
    !!process.env.VERCEL || !!process.env.AWS_LAMBDA_FUNCTION_NAME;

  const executablePath = isServerless
    ? await chromium.executablePath(CHROMIUM_REMOTE_EXEC_PATH)
    : process.platform === "win32"
    ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
    : process.platform === "darwin"
    ? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
    : "/usr/bin/chromium-browser";

  const browser = await puppeteer.launch({
    args: [...chromium.args, "--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage", "--single-process"],
    executablePath,
    headless: true,
    defaultViewport: null,
  });

  const page = await browser.newPage();
  try {
    await page.setViewport({ width, height, deviceScaleFactor: 2 });
    await page.setContent(html, { waitUntil: "domcontentloaded" });
    await page.evaluateHandle("document.fonts.ready");
    const buffer = await page.screenshot({
      type: "png",
      clip: { x: 0, y: 0, width, height },
    });
    return Buffer.from(buffer);
  } finally {
    await page.close();
    await browser.close();
  }
}
