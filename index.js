import express from "express";
import { chromium } from "playwright";

const app = express();
app.use(express.json());

// Simple crawler endpoint
app.post("/crawl", async (req, res) => {
  const { url } = req.body;

  if (!url) return res.status(400).json({ error: "Missing url" });

  try {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle" });

    const title = await page.title();
    const text = await page.textContent("body");

    await browser.close();

    res.json({ url, title, text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Default port for Vercel is handled automatically
app.listen(3000, () => {
  console.log("Crawler running...");
});
