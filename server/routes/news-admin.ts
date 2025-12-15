import express from "express";
import { db } from "../database";

const router = express.Router();

// Get all news articles
router.get("/news", async (req, res) => {
  const news = await db.all("SELECT * FROM news ORDER BY createdAt DESC");
  res.json(news);
});

// Get a single news article
router.get("/news/:id", async (req, res) => {
  const news = await db.get("SELECT * FROM news WHERE id = ?", [req.params.id]);
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
    res.json(news);
  } else {
    res.status(404).send("News not found");
  }
});

// Create a new news article
router.post("/news", async (req, res) => {
  const { title, rich_content, imageUrl, author, category, attachments } = req.body;
  
  if (!rich_content || !rich_content.trim()) {
    return res.status(400).json({ error: "内容不能为空" });
  }
  
  // 将附件数组转换为JSON字符串存储
  const attachmentsJson = attachments && Array.isArray(attachments) 
    ? JSON.stringify(attachments) 
    : null;
  
  const result = await db.run(
    "INSERT INTO news (title, content, rich_content, imageUrl, author, category, attachments) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [title, rich_content, rich_content, imageUrl, author, category, attachmentsJson]
  );
  res.status(201).json({ id: result.lastID });
});

// Update a news article
router.put("/news/:id", async (req, res) => {
  const { title, rich_content, imageUrl, author, category, attachments } = req.body;
  
  if (!rich_content || !rich_content.trim()) {
    return res.status(400).json({ error: "内容不能为空" });
  }
  
  // 将附件数组转换为JSON字符串存储
  const attachmentsJson = attachments && Array.isArray(attachments) 
    ? JSON.stringify(attachments) 
    : null;
  
  const result = await db.run(
    "UPDATE news SET title = ?, content = ?, rich_content = ?, imageUrl = ?, author = ?, category = ?, attachments = ? WHERE id = ?",
    [title, rich_content, rich_content, imageUrl, author, category, attachmentsJson, req.params.id]
  );
  if (result.changes > 0) {
    res.json({ message: "News updated successfully" });
  } else {
    res.status(404).send("News not found");
  }
});

// Delete a news article
router.delete("/news/:id", async (req, res) => {
  const result = await db.run("DELETE FROM news WHERE id = ?", [req.params.id]);
  if (result.changes > 0) {
    res.status(204).send();
  } else {
    res.status(404).send("News not found");
  }
});

export default router;
