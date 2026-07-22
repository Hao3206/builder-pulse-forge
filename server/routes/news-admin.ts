import express from "express";
import { db } from "../database";
import { sanitizeRichContent } from "../lib/content";
import { verifyAdminToken } from "./admin";

const router = express.Router();
router.use(verifyAdminToken);

function optionalText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function validImageUrl(value: string) {
  if (!value) return true;
  if (value.startsWith("/uploads/")) return true;
  try {
    return ["http:", "https:"].includes(new URL(value).protocol);
  } catch {
    return false;
  }
}

function normalizeAttachments(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.slice(0, 20).flatMap((item) => {
    const attachment = item as Record<string, unknown> | null;
    if (
      !attachment ||
      typeof attachment !== "object" ||
      typeof attachment.url !== "string" ||
      !attachment.url.startsWith("/attachments/")
    )
      return [];
    return [
      {
        url: attachment.url.slice(0, 500),
        filename: optionalText(attachment.filename, 255),
        originalName: optionalText(attachment.originalName, 255),
        size: Number.isFinite(attachment.size)
          ? Math.max(0, Number(attachment.size))
          : 0,
        mimetype: optionalText(attachment.mimetype, 120),
      },
    ];
  });
}

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
    res.status(404).json({ success: false, error: "资讯不存在" });
  }
});

// Create a new news article
router.post("/news", async (req, res) => {
  const { title, rich_content, imageUrl, author, category, attachments } =
    req.body;
  const cleanContent = sanitizeRichContent(rich_content);

  if (typeof title !== "string" || !title.trim() || !cleanContent) {
    return res.status(400).json({ error: "内容不能为空" });
  }
  if (title.trim().length > 200) {
    return res.status(400).json({ error: "资讯标题不能超过200个字符" });
  }
  const normalizedImageUrl = optionalText(imageUrl, 1000);
  if (!validImageUrl(normalizedImageUrl)) {
    return res.status(400).json({ error: "封面图片地址无效" });
  }

  // 将附件数组转换为JSON字符串存储
  const attachmentsJson = JSON.stringify(normalizeAttachments(attachments));

  const result = await db.run(
    "INSERT INTO news (title, content, rich_content, imageUrl, author, category, attachments) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      title.trim(),
      cleanContent,
      cleanContent,
      normalizedImageUrl,
      optionalText(author, 100),
      optionalText(category, 80),
      attachmentsJson,
    ],
  );
  res.status(201).json({ id: result.lastID });
});

// Update a news article
router.put("/news/:id", async (req, res) => {
  const { title, rich_content, imageUrl, author, category, attachments } =
    req.body;
  const cleanContent = sanitizeRichContent(rich_content);

  if (typeof title !== "string" || !title.trim() || !cleanContent) {
    return res.status(400).json({ error: "内容不能为空" });
  }
  if (title.trim().length > 200) {
    return res.status(400).json({ error: "资讯标题不能超过200个字符" });
  }
  const normalizedImageUrl = optionalText(imageUrl, 1000);
  if (!validImageUrl(normalizedImageUrl)) {
    return res.status(400).json({ error: "封面图片地址无效" });
  }

  // 将附件数组转换为JSON字符串存储
  const attachmentsJson = JSON.stringify(normalizeAttachments(attachments));

  const result = await db.run(
    "UPDATE news SET title = ?, content = ?, rich_content = ?, imageUrl = ?, author = ?, category = ?, attachments = ? WHERE id = ?",
    [
      title.trim(),
      cleanContent,
      cleanContent,
      normalizedImageUrl,
      optionalText(author, 100),
      optionalText(category, 80),
      attachmentsJson,
      req.params.id,
    ],
  );
  if (result.changes > 0) {
    res.json({ success: true, message: "资讯更新成功" });
  } else {
    res.status(404).json({ success: false, error: "资讯不存在" });
  }
});

// Delete a news article
router.delete("/news/:id", async (req, res) => {
  const result = await db.run("DELETE FROM news WHERE id = ?", [req.params.id]);
  if (result.changes > 0) {
    res.json({ success: true, message: "资讯已删除" });
  } else {
    res.status(404).json({ success: false, error: "资讯不存在" });
  }
});

export default router;
