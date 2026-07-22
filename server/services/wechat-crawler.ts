import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import {
  chromium,
  type Browser,
  type BrowserContext,
  type Page,
} from "playwright";

interface CrawlerSession {
  id: string;
  browser: Browser;
  context: BrowserContext;
  page: Page;
  createdAt: string;
  lastSeenAt: number;
}

const sessions = new Map<string, CrawlerSession>();
let sessionCreation: Promise<
  Awaited<ReturnType<typeof createCrawlerSessionInternal>>
> | null = null;
const profileRoot = path.resolve(
  process.env.WECHAT_CRAWLER_PROFILE_DIR ||
    "./local-data/wechat-crawler/server-profile",
);
const storageStatePath = path.join(profileRoot, "storage-state.json");

function tokenFromUrl(value: string) {
  try {
    return new URL(value).searchParams.get("token") || "";
  } catch {
    return "";
  }
}

function parseJson(value: unknown): any {
  if (typeof value !== "string") return value;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function normalizeList(value: unknown): any[] {
  const parsed = parseJson(value);
  if (Array.isArray(parsed)) return parsed;
  if (Array.isArray(parsed?.publish_list)) return parsed.publish_list;
  if (!parsed || typeof parsed !== "object") return [];
  return Object.values(parsed).filter(
    (item) => item && typeof item === "object",
  );
}

function normalizeArticle(article: any, record: any = {}) {
  const sentInfo = record.sent_info || {};
  const sentTime = Number(
    article.sent_time ||
      sentInfo.time ||
      record.sent_time ||
      record.create_time ||
      0,
  );
  return {
    title: article.title || "",
    url:
      article.link ||
      article.url ||
      article.content_url ||
      article.source_url ||
      "",
    digest: article.digest || article.summary || "",
    cover_image:
      article.cover || article.cover_img || article.pic_cdn_url || "",
    publish_date: sentTime ? new Date(sentTime * 1000).toISOString() : null,
    appmsgid: article.appmsgid || article.appmsg_id || article.id || "",
    itemidx: article.itemidx || article.item_idx || 1,
  };
}

function extractArticles(record: any) {
  const info = parseJson(record.publish_info) || record;
  const appmsg = info.appmsg_info || info.app_msg_info || info;
  const multiple = Array.isArray(appmsg)
    ? appmsg
    : appmsg.multi_appmsg_item_list || appmsg.multi_item || [];
  const single =
    !Array.isArray(appmsg) && (appmsg.title || appmsg.link || appmsg.url)
      ? [appmsg]
      : [];
  return [...single, ...multiple]
    .filter((item) => item && (item.title || item.link || item.url))
    .map((item) => normalizeArticle(item, info));
}

function uniqueArticles(articles: any[]) {
  const seen = new Set<string>();
  return articles.filter((item) => {
    const key = item.url || `${item.appmsgid}:${item.itemidx}` || item.title;
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function closeSession(session: CrawlerSession) {
  sessions.delete(session.id);
  await session.context
    .storageState({ path: storageStatePath })
    .catch(() => undefined);
  await session.context.close().catch(() => undefined);
  await session.browser.close().catch(() => undefined);
}

export async function closeCrawlerSessions() {
  await Promise.all([...sessions.values()].map(closeSession));
}

async function createCrawlerSessionInternal() {
  await closeCrawlerSessions();
  fs.mkdirSync(profileRoot, { recursive: true });
  const executablePath = process.env.CHROMIUM_EXECUTABLE_PATH;
  const browser = await chromium.launch({
    headless: true,
    executablePath:
      executablePath && fs.existsSync(executablePath)
        ? executablePath
        : undefined,
    args: [
      "--no-sandbox",
      "--disable-dev-shm-usage",
      "--disable-blink-features=AutomationControlled",
    ],
  });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 860 },
    storageState: fs.existsSync(storageStatePath)
      ? storageStatePath
      : undefined,
  });
  const page = await context.newPage();
  await page.goto("https://mp.weixin.qq.com/", {
    waitUntil: "domcontentloaded",
    timeout: 30_000,
  });
  await page.waitForTimeout(1_500);
  if (!tokenFromUrl(page.url()) && !page.url().includes("/cgi-bin/home")) {
    const quickLogin = page.getByText("微信快捷登录", { exact: true });
    if ((await quickLogin.count()) === 1) {
      await quickLogin.click().catch(() => undefined);
      await page.waitForTimeout(1_500);
    } else {
      const scanLogin = page.getByText("扫码登录", { exact: true });
      if ((await scanLogin.count()) === 1) {
        await scanLogin.click().catch(() => undefined);
        await page.waitForTimeout(1_200);
      }
    }
  }
  const session: CrawlerSession = {
    id: crypto.randomUUID(),
    browser,
    context,
    page,
    createdAt: new Date().toISOString(),
    lastSeenAt: Date.now(),
  };
  sessions.set(session.id, session);
  return crawlerSessionSnapshot(session.id);
}

export function createCrawlerSession() {
  if (sessionCreation) return sessionCreation;
  sessionCreation = createCrawlerSessionInternal().finally(() => {
    sessionCreation = null;
  });
  return sessionCreation;
}

export async function crawlerSessionSnapshot(sessionId: string) {
  const session = sessions.get(sessionId);
  if (!session) throw new Error("采集会话不存在或已关闭");
  const url = session.page.url();
  const loggedIn = Boolean(tokenFromUrl(url) || url.includes("/cgi-bin/home"));
  if (loggedIn) {
    await session.context
      .storageState({ path: storageStatePath })
      .catch(() => undefined);
  }
  const screenshot = await session.page
    .screenshot({ type: "png", fullPage: false })
    .catch(() => null);
  session.lastSeenAt = Date.now();
  return {
    session_id: session.id,
    logged_in: loggedIn,
    url,
    screenshot: screenshot
      ? `data:image/png;base64,${screenshot.toString("base64")}`
      : "",
    created_at: session.createdAt,
    last_seen_at: session.lastSeenAt,
  };
}

export async function clickCrawlerSession(
  sessionId: string,
  x: number,
  y: number,
) {
  const session = sessions.get(sessionId);
  if (!session) throw new Error("采集会话不存在或已关闭");
  if (!Number.isFinite(x) || !Number.isFinite(y))
    throw new Error("点击坐标无效");

  const viewport = session.page.viewportSize() || { width: 1280, height: 860 };
  const safeX = Math.max(0, Math.min(viewport.width - 1, x));
  const safeY = Math.max(0, Math.min(viewport.height - 1, y));
  const clickedTarget = await session.page.evaluate(
    ({ x, y }) => {
      const element = document.elementFromPoint(x, y) as HTMLElement | null;
      return element
        ? {
            tag: element.tagName.toLowerCase(),
            text: (element.innerText || element.textContent || "")
              .trim()
              .slice(0, 80),
            class_name: String(element.className || "").slice(0, 160),
          }
        : null;
    },
    { x: safeX, y: safeY },
  );
  let clickedInsideFrame = false;
  if (clickedTarget?.tag === "iframe") {
    const iframes = await session.page.locator("iframe").all();
    for (const iframe of iframes) {
      const bounds = await iframe.boundingBox();
      if (
        !bounds ||
        safeX < bounds.x ||
        safeX > bounds.x + bounds.width ||
        safeY < bounds.y ||
        safeY > bounds.y + bounds.height
      )
        continue;
      const handle = await iframe.elementHandle();
      const frame = await handle?.contentFrame();
      if (!frame) continue;
      await frame.locator("body").click({
        position: { x: safeX - bounds.x, y: safeY - bounds.y },
      });
      clickedInsideFrame = true;
      break;
    }
  }
  if (!clickedInsideFrame) await session.page.mouse.click(safeX, safeY);
  await session.page.waitForTimeout(800);
  return {
    ...(await crawlerSessionSnapshot(sessionId)),
    clicked_target: clickedTarget,
  };
}

export async function scrollCrawlerSession(
  sessionId: string,
  x: number,
  y: number,
  deltaY: number,
) {
  const session = sessions.get(sessionId);
  if (!session) throw new Error("采集会话不存在或已关闭");
  if (![x, y, deltaY].every(Number.isFinite)) throw new Error("滚动参数无效");

  const viewport = session.page.viewportSize() || { width: 1280, height: 860 };
  const safeX = Math.max(0, Math.min(viewport.width - 1, x));
  const safeY = Math.max(0, Math.min(viewport.height - 1, y));
  const safeDeltaY = Math.max(-1200, Math.min(1200, deltaY));
  if (safeDeltaY === 0) return crawlerSessionSnapshot(sessionId);

  await session.page.mouse.move(safeX, safeY);
  await session.page.mouse.wheel(0, safeDeltaY);
  await session.page.waitForTimeout(500);
  return crawlerSessionSnapshot(sessionId);
}

export async function deleteCrawlerSession(sessionId: string) {
  const session = sessions.get(sessionId);
  if (session) await closeSession(session);
}

export async function clearCrawlerProfile() {
  await closeCrawlerSessions();
  fs.rmSync(profileRoot, { recursive: true, force: true });
}

async function fetchPublishPage(
  page: Page,
  token: string,
  begin: number,
  count: number,
) {
  return page.evaluate(
    async ({ token, begin, count }) => {
      const params = new URLSearchParams({
        sub: "list",
        begin: String(begin),
        count: String(count),
        token,
        lang: "zh_CN",
        f: "json",
        ajax: "1",
      });
      const response = await fetch(`/cgi-bin/appmsgpublish?${params}`, {
        credentials: "include",
        headers: { "X-Requested-With": "XMLHttpRequest" },
      });
      const text = await response.text();
      try {
        return JSON.parse(text);
      } catch {
        return { base_resp: { ret: -1, errmsg: text.slice(0, 300) } };
      }
    },
    { token, begin, count },
  );
}

export async function collectPublishedArticles(
  sessionId: string,
  pages = 1,
  count = 10,
) {
  const session = sessions.get(sessionId);
  if (!session) throw new Error("采集会话不存在或已关闭");
  const token = tokenFromUrl(session.page.url());
  if (!token) throw new Error("公众号后台尚未登录，请先扫码确认");
  const safePages = Math.max(1, Math.min(Number(pages) || 1, 10));
  const safeCount = Math.max(1, Math.min(Number(count) || 10, 20));
  const articles: any[] = [];
  const pageInfos = [];
  let total = 0;
  for (let index = 0; index < safePages; index += 1) {
    const begin = index * safeCount;
    const raw: any = await fetchPublishPage(
      session.page,
      token,
      begin,
      safeCount,
    );
    const base = raw.base_resp || raw.baseResp || {};
    if (Number(base.ret || 0) !== 0)
      throw new Error(base.errmsg || `第 ${index + 1} 页抓取失败`);
    const records = normalizeList(
      raw.publish_page || raw.list || raw.item || raw.publish_list || [],
    );
    total = Number(raw.total_count || raw.total || total || 0);
    const pageArticles = records.flatMap(extractArticles);
    articles.push(...pageArticles);
    pageInfos.push({
      begin,
      records: records.length,
      articles: pageArticles.length,
      total,
    });
    if (!records.length || (total && begin + safeCount >= total)) break;
    await session.page.waitForTimeout(600);
  }
  const unique = uniqueArticles(articles);
  return {
    articles: unique,
    summary: {
      total_records: total,
      pages: pageInfos.length,
      articles: articles.length,
      unique_articles: unique.length,
    },
    pages: pageInfos,
  };
}
