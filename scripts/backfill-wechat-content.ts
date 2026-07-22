import { db } from "../server/database";
import { fetchWechatArticle } from "../server/services/wechat-article";

const applyChanges = process.argv.includes("--apply");
const limitArgument = process.argv.find((value) =>
  value.startsWith("--limit="),
);
const limit = limitArgument
  ? Math.max(1, Number(limitArgument.split("=")[1]) || 1)
  : 500;

const rows = await db.all(
  `SELECT id, title, source_url, imageUrl
   FROM news
   WHERE source_url LIKE 'https://mp.weixin.qq.com/%'
     AND (rich_content LIKE '%阅读微信公众号原文%'
       OR content LIKE '%阅读微信公众号原文%')
   ORDER BY id ASC
   LIMIT ?`,
  [limit],
);

let cursor = 0;
let succeeded = 0;
let failed = 0;
let localizedImages = 0;
const failures: Array<{ id: number; title: string; error: string }> = [];

async function processNext() {
  while (cursor < rows.length) {
    const row = rows[cursor++];
    try {
      const article = await fetchWechatArticle(row.source_url);
      if (applyChanges) {
        await db.run(
          `UPDATE news
           SET content = ?, rich_content = ?, imageUrl = ?
           WHERE id = ?`,
          [
            article.richContent,
            article.richContent,
            article.coverImage || row.imageUrl || "",
            row.id,
          ],
        );
        await db.run(
          `UPDATE wechat_candidates
           SET rich_content = ?, content_status = 'fetched', content_error = '',
               content_fetched_at = CURRENT_TIMESTAMP, localized_images = ?,
               updated_at = CURRENT_TIMESTAMP
           WHERE source_url = ?`,
          [article.richContent, article.localizedImages, row.source_url],
        );
      }
      localizedImages += article.localizedImages;
      succeeded += 1;
      console.log(
        `${applyChanges ? "UPDATED" : "READY"} #${row.id} ${row.title} ` +
          `(${article.textLength} 字, ${article.localizedImages} 图, ${article.source})`,
      );
    } catch (error) {
      failed += 1;
      failures.push({
        id: row.id,
        title: row.title,
        error: error instanceof Error ? error.message : "未知错误",
      });
      console.error(
        `FAILED #${row.id} ${row.title}: ${failures.at(-1)?.error}`,
      );
    }
  }
}

await Promise.all(
  Array.from({ length: Math.min(3, rows.length) }, () => processNext()),
);
if (applyChanges) {
  await db.run(`
    UPDATE wechat_candidates
    SET rich_content = (
          SELECT news.rich_content FROM news
          WHERE news.source_url = wechat_candidates.source_url
        ),
        content_status = 'fetched', content_error = '',
        content_fetched_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
    WHERE EXISTS (
      SELECT 1 FROM news
      WHERE news.source_url = wechat_candidates.source_url
        AND news.rich_content NOT LIKE '%阅读微信公众号原文%'
    )
  `);
}
await db.close();

console.log(
  JSON.stringify(
    {
      mode: applyChanges ? "apply" : "dry-run",
      total: rows.length,
      succeeded,
      failed,
      localizedImages,
      failures,
    },
    null,
    2,
  ),
);

if (failed) process.exitCode = 1;
