import express from "express";
import { db } from "../database";
import { verifyAdminToken } from "./admin";
import { sanitizeRichContent } from "../lib/content";
import {
  clearCrawlerProfile,
  clickCrawlerSession,
  collectPublishedArticles,
  createCrawlerSession,
  crawlerSessionSnapshot,
  deleteCrawlerSession,
  scrollCrawlerSession,
} from "../services/wechat-crawler";

const router = express.Router();
router.use(verifyAdminToken);

function isWechatArticleUrl(value: unknown): value is string {
  if (typeof value !== "string") return false;
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      ["mp.weixin.qq.com", "mp.weixin.qq.com.cn"].includes(url.hostname)
    );
  } catch {
    return false;
  }
}

function serialize(row: any) {
  return {
    id: row.id,
    title: row.title,
    digest: row.digest || "",
    cover_image: row.cover_image || "",
    source_url: row.source_url,
    publish_date: row.publish_date,
    category: row.category,
    status: row.status,
    news_id: row.news_id,
    created_at: row.created_at,
  };
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character] || character,
  );
}

async function importCandidates(articles: any[], defaultCategory = "本所动态") {
  let created = 0;
  let skipped = 0;
  let invalid = 0;

  for (const article of articles.slice(0, 200)) {
    const title =
      typeof article?.title === "string" ? article.title.trim() : "";
    const sourceUrl = article?.url || article?.source_url;
    if (!title || !isWechatArticleUrl(sourceUrl)) {
      invalid += 1;
      continue;
    }

    const existingNews = await db.get(
      "SELECT id FROM news WHERE source_url = ? OR title = ?",
      [sourceUrl, title],
    );
    const existingCandidate = await db.get(
      "SELECT id FROM wechat_candidates WHERE source_url = ?",
      [sourceUrl],
    );
    if (existingNews || existingCandidate) {
      skipped += 1;
      continue;
    }

    await db.run(
      `INSERT INTO wechat_candidates
        (title, digest, cover_image, source_url, publish_date, category, raw_payload)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        typeof article.digest === "string"
          ? article.digest.trim().slice(0, 1000)
          : "",
        typeof (article.cover_image || article.cover) === "string"
          ? article.cover_image || article.cover
          : "",
        sourceUrl,
        article.publish_date || null,
        typeof article.category === "string"
          ? article.category
          : defaultCategory,
        JSON.stringify(article),
      ],
    );
    created += 1;
  }

  return { created, skipped, invalid, total: articles.length };
}

router.post("/import", async (req, res) => {
  const articles = Array.isArray(req.body?.articles) ? req.body.articles : [];
  const category =
    typeof req.body?.category === "string" ? req.body.category : "本所动态";
  res.json({
    success: true,
    data: await importCandidates(articles, category),
    message: "采集结果已进入待确认池",
  });
});

router.post("/sessions", async (_req, res) => {
  try {
    res.json({ success: true, data: await createCrawlerSession() });
  } catch (error) {
    console.error("启动公众号采集会话失败:", error);
    res
      .status(500)
      .json({
        success: false,
        error: error instanceof Error ? error.message : "采集会话启动失败",
      });
  }
});

router.get("/sessions/:id", async (req, res) => {
  try {
    res.json({
      success: true,
      data: await crawlerSessionSnapshot(req.params.id),
    });
  } catch (error) {
    res
      .status(404)
      .json({
        success: false,
        error: error instanceof Error ? error.message : "会话不存在",
      });
  }
});

router.post("/sessions/:id/click", async (req, res) => {
  try {
    const x = Number(req.body?.x);
    const y = Number(req.body?.y);
    res.json({
      success: true,
      data: await clickCrawlerSession(req.params.id, x, y),
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : "远程点击失败",
    });
  }
});

router.post("/sessions/:id/scroll", async (req, res) => {
  try {
    const x = Number(req.body?.x);
    const y = Number(req.body?.y);
    const deltaY = Number(req.body?.delta_y);
    res.json({
      success: true,
      data: await scrollCrawlerSession(req.params.id, x, y, deltaY),
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : "远程滚动失败",
    });
  }
});

router.post("/sessions/:id/collect", async (req, res) => {
  try {
    const payload = await collectPublishedArticles(
      req.params.id,
      req.body?.pages,
      req.body?.count,
    );
    const category =
      typeof req.body?.category === "string" ? req.body.category : "本所动态";
    const result = await importCandidates(payload.articles, category);
    res.json({
      success: true,
      data: { ...result, crawler_summary: payload.summary },
      message: "采集完成，结果已进入待确认池",
    });
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        error: error instanceof Error ? error.message : "采集失败",
      });
  }
});

router.delete("/sessions/:id", async (req, res) => {
  await deleteCrawlerSession(req.params.id);
  res.json({ success: true });
});

router.delete("/profile", async (_req, res) => {
  await clearCrawlerProfile();
  res.json({ success: true, message: "公众号登录态已清理" });
});

router.get("/", async (req, res) => {
  const status =
    typeof req.query.status === "string" ? req.query.status : "pending";
  const keyword =
    typeof req.query.keyword === "string" ? req.query.keyword.trim() : "";
  const conditions: string[] = [];
  const params: unknown[] = [];
  if (["pending", "ignored", "imported"].includes(status)) {
    conditions.push("status = ?");
    params.push(status);
  }
  if (keyword) {
    conditions.push("title LIKE ?");
    params.push(`%${keyword}%`);
  }
  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  const rows = await db.all(
    `SELECT * FROM wechat_candidates ${where} ORDER BY publish_date DESC, id DESC LIMIT 200`,
    params,
  );
  res.json({ success: true, data: rows.map(serialize) });
});

router.patch("/status", async (req, res) => {
  const ids = Array.isArray(req.body?.ids)
    ? req.body.ids.map(Number).filter(Number.isInteger)
    : [];
  const status = req.body?.status;
  if (!ids.length || !["pending", "ignored"].includes(status)) {
    return res
      .status(400)
      .json({ success: false, error: "请选择文章并提供有效状态" });
  }
  const placeholders = ids.map(() => "?").join(",");
  const result = await db.run(
    `UPDATE wechat_candidates SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id IN (${placeholders}) AND status IN ('pending', 'ignored')`,
    [status, ...ids],
  );
  res.json({ success: true, data: { updated: result.changes || 0 } });
});

router.post("/confirm", async (req, res) => {
  const ids = Array.isArray(req.body?.ids)
    ? req.body.ids.map(Number).filter(Number.isInteger)
    : [];
  const category =
    typeof req.body?.category === "string" ? req.body.category : "本所动态";
  if (!ids.length)
    return res
      .status(400)
      .json({ success: false, error: "请选择需要发布的文章" });

  const placeholders = ids.map(() => "?").join(",");
  const candidates = await db.all(
    `SELECT * FROM wechat_candidates WHERE id IN (${placeholders}) AND status = 'pending'`,
    ids,
  );
  let created = 0;
  let skipped = 0;
  for (const candidate of candidates) {
    const existing = await db.get(
      "SELECT id FROM news WHERE source_url = ? OR title = ?",
      [candidate.source_url, candidate.title],
    );
    let newsId = existing?.id;
    if (!newsId) {
      const link = sanitizeRichContent(
        `<p>${escapeHtml(candidate.digest || "点击下方原文链接查看完整内容。")}</p><p><a href="${candidate.source_url}" target="_blank" rel="noopener noreferrer">阅读微信公众号原文</a></p>`,
      );
      const result = await db.run(
        `INSERT INTO news (title, content, rich_content, imageUrl, author, category, createdAt, source_url)
         VALUES (?, ?, ?, ?, ?, ?, COALESCE(?, CURRENT_TIMESTAMP), ?)`,
        [
          candidate.title,
          link,
          link,
          candidate.cover_image,
          "浙东环境能源交易所",
          category || candidate.category,
          candidate.publish_date,
          candidate.source_url,
        ],
      );
      newsId = result.lastID;
      created += 1;
    } else {
      skipped += 1;
    }
    await db.run(
      "UPDATE wechat_candidates SET status = 'imported', news_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
      [newsId, candidate.id],
    );
  }
  res.json({
    success: true,
    data: { created, skipped },
    message: "确认发布完成",
  });
});

export default router;
