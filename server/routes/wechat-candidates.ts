import express from "express";
import { db } from "../database";
import { verifyAdminToken } from "./admin";
import { sanitizeRichContent } from "../lib/content";
import { fetchWechatArticle } from "../services/wechat-article";
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
    content_status: row.content_status || "pending",
    content_error: row.content_error || "",
    content_fetched_at: row.content_fetched_at,
    localized_images: Number(row.localized_images || 0),
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
  let contentFetched = 0;
  let contentFailed = 0;
  const pendingArticles: Array<{
    article: any;
    title: string;
    sourceUrl: string;
    candidateId?: number;
  }> = [];

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
      "SELECT id, content_status FROM wechat_candidates WHERE source_url = ?",
      [sourceUrl],
    );
    if (existingNews || existingCandidate?.content_status === "fetched") {
      skipped += 1;
      continue;
    }

    pendingArticles.push({
      article,
      title,
      sourceUrl,
      candidateId: existingCandidate?.id,
    });
  }

  let cursor = 0;
  async function importNext() {
    while (cursor < pendingArticles.length) {
      const { article, title, sourceUrl, candidateId } =
        pendingArticles[cursor++];
      let richContent = "";
      let contentStatus = "failed";
      let contentError = "";
      let localizedImages = 0;
      let fetchedCover = "";
      try {
        const fetched = await fetchWechatArticle(sourceUrl);
        richContent = fetched.richContent;
        localizedImages = fetched.localizedImages;
        fetchedCover = fetched.coverImage;
        contentStatus = "fetched";
        contentFetched += 1;
      } catch (error) {
        contentError =
          error instanceof Error ? error.message.slice(0, 500) : "正文采集失败";
        contentFailed += 1;
      }

      if (candidateId) {
        await db.run(
          `UPDATE wechat_candidates
           SET rich_content = ?, content_status = ?, content_error = ?,
               content_fetched_at = CASE WHEN ? = 'fetched' THEN CURRENT_TIMESTAMP ELSE NULL END,
               localized_images = ?, updated_at = CURRENT_TIMESTAMP
           WHERE id = ?`,
          [
            richContent,
            contentStatus,
            contentError,
            contentStatus,
            localizedImages,
            candidateId,
          ],
        );
        skipped += 1;
      } else {
        await db.run(
          `INSERT INTO wechat_candidates
        (title, digest, cover_image, source_url, publish_date, category,
         rich_content, content_status, content_error, content_fetched_at,
         localized_images, raw_payload)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CASE WHEN ? = 'fetched' THEN CURRENT_TIMESTAMP ELSE NULL END, ?, ?)`,
          [
            title,
            typeof article.digest === "string"
              ? article.digest.trim().slice(0, 1000)
              : "",
            fetchedCover ||
              (typeof (article.cover_image || article.cover) === "string"
                ? article.cover_image || article.cover
                : ""),
            sourceUrl,
            article.publish_date || null,
            typeof article.category === "string"
              ? article.category
              : defaultCategory,
            richContent,
            contentStatus,
            contentError,
            contentStatus,
            localizedImages,
            JSON.stringify(article),
          ],
        );
        created += 1;
      }
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(3, pendingArticles.length) }, () =>
      importNext(),
    ),
  );

  return {
    created,
    skipped,
    invalid,
    contentFetched,
    contentFailed,
    total: articles.length,
  };
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
    res.status(500).json({
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
    res.status(404).json({
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
    res.status(400).json({
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

router.post("/:id/fetch-content", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ success: false, error: "无效候选文章编号" });
  }
  const candidate = await db.get(
    "SELECT id, source_url, news_id FROM wechat_candidates WHERE id = ?",
    [id],
  );
  if (!candidate) {
    return res.status(404).json({ success: false, error: "候选文章不存在" });
  }
  try {
    const article = await fetchWechatArticle(candidate.source_url);
    await db.run(
      `UPDATE wechat_candidates
       SET rich_content = ?, cover_image = COALESCE(NULLIF(?, ''), cover_image),
           content_status = 'fetched', content_error = '',
           content_fetched_at = CURRENT_TIMESTAMP, localized_images = ?,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [article.richContent, article.coverImage, article.localizedImages, id],
    );
    if (candidate.news_id) {
      await db.run(
        `UPDATE news
         SET content = ?, rich_content = ?, imageUrl = COALESCE(NULLIF(?, ''), imageUrl)
         WHERE id = ?`,
        [
          article.richContent,
          article.richContent,
          article.coverImage,
          candidate.news_id,
        ],
      );
    }
    res.json({
      success: true,
      data: {
        content_status: "fetched",
        localized_images: article.localizedImages,
      },
      message: "正文重新采集成功",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "正文采集失败";
    await db.run(
      `UPDATE wechat_candidates
       SET content_status = 'failed', content_error = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [message.slice(0, 500), id],
    );
    res.status(400).json({ success: false, error: message });
  }
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
      const link = candidate.rich_content
        ? sanitizeRichContent(candidate.rich_content)
        : sanitizeRichContent(
            `<p>${escapeHtml(candidate.digest || "正文暂未成功采集，请点击原文链接查看。")}</p><p><a href="${candidate.source_url}" target="_blank" rel="noopener noreferrer">阅读微信公众号原文</a></p>`,
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
