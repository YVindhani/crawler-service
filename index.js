import express from "express";
import { chromium } from "playwright";

const app = express();
app.use(express.json());

app.post("/api/crawl", async (req, res) => {
  const { url } = req.body;

  if (!url) return res.status(400).json({ error: "Missing url" });

  try {
    // ✅ Launch Chromium with safe flags for Railway
    const browser = await chromium.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle" });

    // ✅ Capture everything
    const title = await page.title();
    const text = await page.textContent("body");
    const html = await page.content();
    const screenshotBuffer = await page.screenshot({ fullPage: true });
    const screenshotBase64 = screenshotBuffer.toString("base64");

    await browser.close();

    res.json({
      url,
      title,
      text,
      html,
      screenshot: `data:image/png;base64,${screenshotBase64}`
    });
  } catch (error) {
    console.error("Crawler error:", error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Use Railway's dynamic port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Crawler running on port ${PORT}`);
});
