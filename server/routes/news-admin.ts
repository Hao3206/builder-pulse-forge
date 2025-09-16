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
    res.json(news);
  } else {
    res.status(404).send("News not found");
  }
});

// Create a new news article
router.post("/news", async (req, res) => {
  const { title, content, rich_content, imageUrl, author, category } = req.body;
  const result = await db.run(
    "INSERT INTO news (title, content, rich_content, imageUrl, author, category) VALUES (?, ?, ?, ?, ?, ?)",
    [title, content, rich_content || content, imageUrl, author, category]
  );
  res.status(201).json({ id: result.lastID });
});

// Update a news article
router.put("/news/:id", async (req, res) => {
  const { title, content, rich_content, imageUrl, author, category } = req.body;
  const result = await db.run(
    "UPDATE news SET title = ?, content = ?, rich_content = ?, imageUrl = ?, author = ?, category = ? WHERE id = ?",
    [title, content, rich_content || content, imageUrl, author, category, req.params.id]
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
