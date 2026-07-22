import { describe, expect, it } from "vitest";
import { parseWechatArticleHtml } from "./services/wechat-article";

describe("parseWechatArticleHtml", () => {
  it("extracts a standard WeChat article body", () => {
    const article = parseWechatArticleHtml(`
      <html><head><meta property="og:image" content="https://mmbiz.qpic.cn/a.jpg"></head>
      <body>
        <h1 id="activity-name">测试文章</h1>
        <span id="js_name">测试公众号</span>
        <div id="js_content"><p>第一段正文</p><img data-src="https://mmbiz.qpic.cn/body.jpg"></div>
      </body></html>
    `);

    expect(article.title).toBe("测试文章");
    expect(article.account).toBe("测试公众号");
    expect(article.contentHtml).toContain("第一段正文");
    expect(article.source).toBe("dom");
  });

  it("falls back to embedded content for reprinted articles", () => {
    const article = parseWechatArticleHtml(`
      <html><body>
        <h1 id="activity-name">转载文章</h1>
        <div id="js_content" aria-hidden="true"></div>
        <script>window.data = { content_noencode: '\\x3cp\\x3e转载正文\\x3c/p\\x3e', other: '' };</script>
      </body></html>
    `);

    expect(article.contentHtml).toContain("转载正文");
    expect(article.textLength).toBe(4);
    expect(article.source).toBe("embedded");
  });

  it("rejects pages without an article body", () => {
    expect(() =>
      parseWechatArticleHtml(
        '<html><body><h1 id="activity-name">空文章</h1></body></html>',
      ),
    ).toThrow("未能识别公众号文章正文");
  });
});
