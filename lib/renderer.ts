import puppeteer, { Browser } from "puppeteer-core";
import chromium from "@sparticuz/chromium";

let browserInstance: Browser | null = null;

async function getBrowser(): Promise<Browser> {
  if (browserInstance) {
    try {
      // Verify the browser is still connected
      await browserInstance.version();
      return browserInstance;
    } catch {
      browserInstance = null;
    }
  }

  // On Vercel / Lambda, use @sparticuz/chromium
  // Locally, fall back to a system Chrome path
  let executablePath: string;

  if (process.env.NODE_ENV === "production" || process.env.VERCEL) {
    executablePath = await chromium.executablePath();
  } else {
    // Local dev fallbacks — adjust per platform
    executablePath =
      process.env.PUPPETEER_EXECUTABLE_PATH ||
      (process.platform === "win32"
        ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
        : process.platform === "darwin"
        ? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
        : "/usr/bin/chromium-browser");
  }

  browserInstance = await puppeteer.launch({
    args: [
      ...chromium.args,
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
    ],
    defaultViewport: null,
    executablePath,
    headless: true,
  });

  return browserInstance;
}

export async function renderHtmlToPng(
  html: string,
  width: number,
  height: number
): Promise<Buffer> {
  const browser = await getBrowser();
  const page = await browser.newPage();

  try {
    // 2× device scale for crisp retina-quality output
    await page.setViewport({ width, height, deviceScaleFactor: 2 });
    await page.setContent(html, { waitUntil: "networkidle0", timeout: 10000 });

    const buffer = await page.screenshot({
      type: "png",
      clip: { x: 0, y: 0, width, height },
    });

    return Buffer.from(buffer);
  } finally {
    await page.close();
  }
}
