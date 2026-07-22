import express from "express";
import { db } from "../database";
import { sanitizeRichContent, summarizeRichContent } from "../lib/content";

const router = express.Router();

function sanitizeArticle<T extends Record<string, any>>(article: T): T {
  return {
    ...article,
    content: sanitizeRichContent(article.content),
    rich_content: sanitizeRichContent(article.rich_content || article.content),
  };
}

// Get all news articles for the public
router.get("/", async (req, res) => {
  try {
    if (req.query.view === "summary") {
      const news = await db.all(
        `SELECT id, title, rich_content, content, imageUrl, author, category, createdAt, source_url
         FROM news ORDER BY createdAt DESC`,
      );
      return res.json({
        success: true,
        data: news.map((article) => ({
          id: article.id,
          title: article.title,
          summary: summarizeRichContent(
            article.rich_content || article.content,
          ),
          imageUrl: article.imageUrl || "",
          author: article.author || "",
          category: article.category || "未分类",
          createdAt: article.createdAt,
          source_url: article.source_url || "",
        })),
      });
    }
    const news = await db.all("SELECT * FROM news ORDER BY createdAt DESC");
    res.json({ success: true, data: news.map(sanitizeArticle) });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch news" });
  }
});

// Get featured news
router.get("/featured", async (req, res) => {
  try {
    const featuredNews = await db.all(
      "SELECT * FROM news ORDER BY createdAt DESC LIMIT 3",
    );
    res.json({
      success: true,
      data: featuredNews.map((article) => ({
        id: article.id,
        title: article.title,
        summary: summarizeRichContent(article.rich_content || article.content),
        imageUrl: article.imageUrl || "",
        author: article.author || "",
        category: article.category || "未分类",
        createdAt: article.createdAt,
      })),
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch featured news" });
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
      res.json({ success: true, data: sanitizeArticle(news) });
    } else {
      res.status(404).json({ success: false, error: "资讯不存在" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch news article" });
  }
});

export default router;
