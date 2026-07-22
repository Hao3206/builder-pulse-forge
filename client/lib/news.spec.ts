import { describe, expect, it } from "vitest";
import { NEWS_FALLBACK_IMAGE, publicNewsImage } from "./news";

describe("publicNewsImage", () => {
  it("falls back for empty and WeChat anti-hotlink images", () => {
    expect(publicNewsImage("")).toBe(NEWS_FALLBACK_IMAGE);
    expect(publicNewsImage("https://mmbiz.qpic.cn/example/0?wx_fmt=jpeg")).toBe(
      NEWS_FALLBACK_IMAGE,
    );
  });

  it("keeps local and ordinary web images", () => {
    expect(publicNewsImage("/uploads/example.webp")).toBe(
      "/uploads/example.webp",
    );
    expect(publicNewsImage("https://images.example.com/cover.jpg")).toBe(
      "https://images.example.com/cover.jpg",
    );
  });
});
