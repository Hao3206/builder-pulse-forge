import { createHash } from "node:crypto";
import { mkdir, access, writeFile } from "node:fs/promises";
import path from "node:path";
import render from "dom-serializer";
import { findAll, findOne, textContent } from "domutils";
import { parseDocument } from "htmlparser2";
import type { AnyNode, Element } from "domhandler";
import { sanitizeRichContent, summarizeRichContent } from "../lib/content";

const WECHAT_HOSTS = new Set(["mp.weixin.qq.com", "mp.weixin.qq.com.cn"]);
const IMAGE_HOST_SUFFIXES = [".qpic.cn", ".qlogo.cn"];
const ARTICLE_USER_AGENT =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) " +
  "AppleWebKit/605.1.15 MicroMessenger/8.0.50 Mobile/15E148";
const imageDirectory = path.join(process.cwd(), "public", "uploads", "wechat");

export interface ParsedWechatArticle {
  title: string;
  author: string;
  account: string;
  coverImage: string;
  contentHtml: string;
  textLength: number;
  source: "dom" | "embedded";
}

export interface FetchedWechatArticle extends ParsedWechatArticle {
  richContent: string;
  summary: string;
  localizedImages: number;
  failedImages: number;
}

function isElement(node: AnyNode): node is Element {
  return node.type === "tag" || node.type === "script" || node.type === "style";
}

function findById(nodes: AnyNode[], id: string) {
  return findOne(
    (node) => isElement(node) && node.attribs?.id === id,
    nodes,
    true,
  ) as Element | null;
}

function metaContent(nodes: AnyNode[], property: string) {
  const node = findOne(
    (candidate) =>
      isElement(candidate) &&
      candidate.name === "meta" &&
      (candidate.attribs?.property === property ||
        candidate.attribs?.name === property),
    nodes,
    true,
  ) as Element | null;
  return node?.attribs?.content?.trim() || "";
}

function decodeEmbeddedContent(value: string) {
  return value
    .replace(/\\x([0-9a-f]{2})/gi, (_match, hex) =>
      String.fromCharCode(Number.parseInt(hex, 16)),
    )
    .replace(/\\u([0-9a-f]{4})/gi, (_match, hex) =>
      String.fromCharCode(Number.parseInt(hex, 16)),
    )
    .replace(/\\n/g, "\n")
    .replace(/\\r/g, "\r")
    .replace(/\\t/g, "\t")
    .replace(/\\'/g, "'")
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, "\\");
}

function embeddedContent(pageHtml: string) {
  const match = pageHtml.match(/content_noencode:\s*'((?:\\.|[^'])*)',/s);
  return match ? decodeEmbeddedContent(match[1]) : "";
}

function cleanText(nodes: AnyNode[]) {
  return textContent(nodes).replace(/\s+/g, " ").trim();
}

export function parseWechatArticleHtml(pageHtml: string): ParsedWechatArticle {
  const document = parseDocument(pageHtml);
  const titleNode = findById(document.children, "activity-name");
  const authorNode =
    findById(document.children, "js_author_name_text") ||
    findById(document.children, "js_author_name");
  const accountNode = findById(document.children, "js_name");
  const standardContent = findById(document.children, "js_content");

  let contentNodes = standardContent?.children || [];
  let source: ParsedWechatArticle["source"] = "dom";
  if (
    !cleanText(contentNodes) &&
    !findAll((node) => isElement(node), contentNodes).length
  ) {
    const fallback = embeddedContent(pageHtml);
    if (fallback) {
      contentNodes = parseDocument(fallback).children;
      source = "embedded";
    }
  }

  const title =
    cleanText(titleNode?.children || []) ||
    metaContent(document.children, "og:title");
  const textLength = cleanText(contentNodes).length;
  if (
    !title ||
    (!textLength &&
      !findAll(
        (node) => isElement(node) && node.name === "img",
        contentNodes,
      ).length)
  ) {
    throw new Error("未能识别公众号文章正文");
  }

  return {
    title,
    author: cleanText(authorNode?.children || []),
    account: cleanText(accountNode?.children || []) || "微信公众号",
    coverImage: metaContent(document.children, "og:image"),
    contentHtml: render(contentNodes, { encodeEntities: "utf8" }),
    textLength,
    source,
  };
}

function safeWechatArticleUrl(value: string) {
  const url = new URL(value);
  if (url.protocol !== "https:" || !WECHAT_HOSTS.has(url.hostname)) {
    throw new Error("公众号原文链接无效");
  }
  return url.toString();
}

function safeWechatImageUrl(value: string) {
  const normalized = value.startsWith("//") ? `https:${value}` : value;
  const url = new URL(normalized);
  if (
    url.protocol !== "https:" ||
    !IMAGE_HOST_SUFFIXES.some(
      (suffix) =>
        url.hostname === suffix.slice(1) || url.hostname.endsWith(suffix),
    )
  ) {
    throw new Error("图片来源不受支持");
  }
  return url.toString();
}

function extensionFor(contentType: string) {
  if (contentType.includes("png")) return "png";
  if (contentType.includes("gif")) return "gif";
  if (contentType.includes("webp")) return "webp";
  return "jpg";
}

export async function localizeWechatImage(value: string) {
  const url = safeWechatImageUrl(value);
  const hash = createHash("sha256").update(url).digest("hex").slice(0, 24);
  await mkdir(imageDirectory, { recursive: true });

  for (const extension of ["jpg", "png", "gif", "webp"]) {
    const filename = `${hash}.${extension}`;
    try {
      await access(path.join(imageDirectory, filename));
      return `/uploads/wechat/${filename}`;
    } catch {
      // Download below when no cached file exists.
    }
  }

  const response = await fetch(url, {
    headers: {
      Referer: "https://mp.weixin.qq.com/",
      "User-Agent": ARTICLE_USER_AGENT,
    },
    signal: AbortSignal.timeout(20_000),
  });
  if (!response.ok) throw new Error(`图片下载失败 (${response.status})`);
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.startsWith("image/")) throw new Error("图片响应类型无效");
  const bytes = Buffer.from(await response.arrayBuffer());
  if (!bytes.length || bytes.length > 12 * 1024 * 1024) {
    throw new Error("图片大小无效");
  }
  const filename = `${hash}.${extensionFor(contentType)}`;
  await writeFile(path.join(imageDirectory, filename), bytes, {
    flag: "wx",
  }).catch((error: NodeJS.ErrnoException) => {
    if (error.code !== "EEXIST") throw error;
  });
  return `/uploads/wechat/${filename}`;
}

async function localizeContentImages(contentHtml: string) {
  const document = parseDocument(contentHtml);
  const images = findAll(
    (node) => isElement(node) && node.name === "img",
    document.children,
  ) as Element[];
  let localized = 0;
  let failed = 0;

  await Promise.all(
    images.map(async (image) => {
      const source = image.attribs["data-src"] || image.attribs.src || "";
      if (!source) return;
      try {
        image.attribs.src = await localizeWechatImage(source);
        localized += 1;
      } catch {
        image.attribs.src = source.startsWith("//")
          ? `https:${source}`
          : source;
        failed += 1;
      }
      image.attribs.alt ||= "公众号文章配图";
      delete image.attribs["data-src"];
    }),
  );

  return {
    html: render(document.children, { encodeEntities: "utf8" }),
    localized,
    failed,
  };
}

export async function fetchWechatArticle(
  sourceUrl: string,
): Promise<FetchedWechatArticle> {
  const url = safeWechatArticleUrl(sourceUrl);
  const response = await fetch(url, {
    headers: { "User-Agent": ARTICLE_USER_AGENT },
    redirect: "follow",
    signal: AbortSignal.timeout(25_000),
  });
  if (!response.ok) throw new Error(`公众号文章获取失败 (${response.status})`);
  const pageHtml = await response.text();
  if (/环境异常|访问过于频繁|请输入验证码/.test(pageHtml)) {
    throw new Error("微信返回了访问验证页面");
  }

  const parsed = parseWechatArticleHtml(pageHtml);
  const localized = await localizeContentImages(parsed.contentHtml);
  const sourceLink = `<p style="margin-top:32px"><a href="${url}" target="_blank" rel="noopener noreferrer">查看微信公众号原文</a></p>`;
  const richContent = sanitizeRichContent(`${localized.html}${sourceLink}`);
  if (!richContent) throw new Error("公众号正文清洗后为空");

  let coverImage = parsed.coverImage;
  if (coverImage) {
    coverImage = await localizeWechatImage(coverImage).catch(() => coverImage);
  }
  return {
    ...parsed,
    coverImage,
    richContent,
    summary: summarizeRichContent(richContent, 500),
    localizedImages: localized.localized,
    failedImages: localized.failed,
  };
}
