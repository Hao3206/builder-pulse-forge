import express from "express";
import { db } from "../database";

const router = express.Router();

// Get all news articles for the public
router.get("/", async (req, res) => {
  try {
    const news = await db.all("SELECT * FROM news ORDER BY createdAt DESC");
    res.json({ success: true, data: news });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch news" });
  }
});

// Get a single news article by ID for the public
router.get("/:id", async (req, res) => {
  try {
    const news = await db.get("SELECT * FROM news WHERE id = ?", [
      req.params.id,
    ]);
    if (news) {
      // 解析附件JSON字符串
      if (news.attachments) {
        try {
          news.attachments = JSON.parse(news.attachments);
        } catch (e) {
          news.attachments = [];
        }
      } else {
        news.attachments = [];
      }
      res.json({ success: true, data: news });
    } else {
      res.status(404).json({ success: false, error: "News not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch news article" });
  }
});

// Get featured news
router.get("/featured", async (req, res) => {
  try {
    // This assumes you have a way to mark news as featured.
    // For now, let's just return the 3 latest articles as "featured".
    const featuredNews = await db.all(
      "SELECT * FROM news ORDER BY createdAt DESC LIMIT 3"
    );
    res.json({ success: true, data: featuredNews });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch featured news" });
  }
});


export default router;
