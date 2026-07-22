const NEWS_FALLBACK_IMAGE = "/news-featured-image.jpg";

export function publicNewsImage(value: unknown) {
  if (typeof value !== "string" || !value.trim()) return NEWS_FALLBACK_IMAGE;
  try {
    const url = new URL(value, "https://local.invalid");
    if (url.hostname === "mmbiz.qpic.cn" || url.hostname.endsWith(".qpic.cn")) {
      return NEWS_FALLBACK_IMAGE;
    }
    return value;
  } catch {
    return NEWS_FALLBACK_IMAGE;
  }
}

export { NEWS_FALLBACK_IMAGE };
