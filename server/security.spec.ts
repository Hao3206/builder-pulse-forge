import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { createServer } from "./index";
import { sanitizeRichContent } from "./lib/content";
import { db } from "./database";

describe("P0 security controls", () => {
  const previousEnv = { ...process.env };

  beforeAll(() => {
    process.env.ADMIN_USERNAME = "test-admin";
    process.env.ADMIN_PASSWORD = "test-password";
    process.env.ADMIN_TOKEN_SECRET = "test-token-secret-that-is-long-enough";
  });

  afterAll(() => {
    process.env = previousEnv;
  });

  it("requires authentication for management endpoints", async () => {
    const app = createServer();
    const paths = [
      "/api/admin/news",
      "/api/contact",
      "/api/upload/images",
      "/api/wechat/config",
      "/api/wechat-candidates",
    ];

    for (const path of paths) {
      const response = await request(app).get(path);
      expect(response.status, path).toBe(401);
    }
  });

  it("issues an expiring token and accepts it on protected endpoints", async () => {
    const app = createServer();
    const login = await request(app)
      .post("/api/admin/login")
      .send({ username: "test-admin", password: "test-password" });

    expect(login.status).toBe(200);
    const profile = await request(app)
      .get("/api/admin/profile")
      .set("Authorization", `Bearer ${login.body.data.token}`);
    expect(profile.status).toBe(200);
    expect(profile.body.data.username).toBe("test-admin");
  });

  it("does not expose secrets or server paths through management APIs", async () => {
    const app = createServer();
    const login = await request(app)
      .post("/api/admin/login")
      .send({ username: "test-admin", password: "test-password" });
    const authorization = `Bearer ${login.body.data.token}`;

    const config = await request(app)
      .get("/api/wechat/config")
      .set("Authorization", authorization);
    expect(config.status).toBe(200);
    expect(config.body.data).not.toHaveProperty("appSecret");
    expect(typeof config.body.data.hasSecret).toBe("boolean");

    const images = await request(app)
      .get("/api/upload/images")
      .set("Authorization", authorization);
    expect(images.status).toBe(200);
    for (const image of images.body.data)
      expect(image).not.toHaveProperty("path");

    const invalidSync = await request(app)
      .post("/api/wechat/sync/not-an-id")
      .set("Authorization", authorization);
    expect(invalidSync.status).toBe(400);
  });

  it("does not apply the public submission limit to contact management", async () => {
    const app = createServer();
    const login = await request(app)
      .post("/api/admin/login")
      .send({ username: "test-admin", password: "test-password" });
    const authorization = `Bearer ${login.body.data.token}`;

    for (let index = 0; index < 12; index += 1) {
      const response = await request(app)
        .get("/api/contact")
        .set("Authorization", authorization);
      expect(response.status).toBe(200);
    }
  });

  it("validates and manages contact submissions safely", async () => {
    const app = createServer();
    const tooLong = await request(app)
      .post("/api/contact")
      .send({
        name: "测试访客",
        contact: "1".repeat(121),
      });
    expect(tooLong.status).toBe(400);

    const botSource = `/security-bot-${Date.now()}`;
    const botSubmission = await request(app).post("/api/contact").send({
      name: "自动提交",
      contact: "bot@example.com",
      source: botSource,
      website: "https://spam.example.com",
    });
    expect(botSubmission.status).toBe(200);
    expect(
      await db.get("SELECT id FROM contact_messages WHERE source = ?", [
        botSource,
      ]),
    ).toBeUndefined();

    const created = await request(app).post("/api/contact").send({
      name: "留言接口测试",
      contact: "test@example.com",
      message: "用于验证后台留言工作流",
      source: "/security-test",
    });
    expect(created.status).toBe(200);

    const row = await db.get(
      "SELECT id FROM contact_messages WHERE name = ? AND source = ? ORDER BY id DESC",
      ["留言接口测试", "/security-test"],
    );
    expect(row?.id).toBeTruthy();

    const login = await request(app)
      .post("/api/admin/login")
      .send({ username: "test-admin", password: "test-password" });
    const authorization = `Bearer ${login.body.data.token}`;
    expect(
      (
        await request(app)
          .patch(`/api/contact/${row.id}`)
          .set("Authorization", authorization)
          .send({ status: "已处理" })
      ).status,
    ).toBe(200);
    expect(
      (
        await request(app)
          .delete(`/api/contact/${row.id}`)
          .set("Authorization", authorization)
      ).status,
    ).toBe(200);
  });

  it("keeps named routes reachable before parameter routes", async () => {
    const app = createServer();
    expect((await request(app).get("/api/news/featured")).status).toBe(200);
    expect((await request(app).get("/api/solutions/cases")).status).toBe(200);
  });

  it("sets baseline browser security headers", async () => {
    const response = await request(createServer()).get("/api/ping");
    expect(response.headers["x-content-type-options"]).toBe("nosniff");
    expect(response.headers["x-frame-options"]).toBe("SAMEORIGIN");
    expect(response.headers["referrer-policy"]).toBe(
      "strict-origin-when-cross-origin",
    );
    expect(response.headers["permissions-policy"]).toContain("camera=()");
  });

  it("sets HSTS in production", async () => {
    const previousNodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "production";
    try {
      const response = await request(createServer()).get("/api/ping");
      expect(response.headers["strict-transport-security"]).toContain(
        "max-age=31536000",
      );
    } finally {
      process.env.NODE_ENV = previousNodeEnv;
    }
  });

  it("removes executable markup from rich content", () => {
    const clean = sanitizeRichContent(
      '<p onclick="alert(1)">ok</p><script>alert(1)</script><img src="javascript:alert(1)">',
    );
    expect(clean).toContain("<p>ok</p>");
    expect(clean).not.toContain("onclick");
    expect(clean).not.toContain("script");
    expect(clean).not.toContain("javascript:");
  });

  it("sanitizes existing content returned by the public API", async () => {
    const app = createServer();
    const response = await request(app).get("/api/news");
    expect(response.status).toBe(200);
    for (const article of response.body.data) {
      expect(article.rich_content).not.toContain("<script");
      expect(article.rich_content).not.toContain("javascript:");
    }
  });

  it("returns a lightweight public news summary view", async () => {
    const response = await request(createServer()).get(
      "/api/news?view=summary",
    );
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
    for (const article of response.body.data) {
      expect(typeof article.summary).toBe("string");
      expect(article).not.toHaveProperty("rich_content");
      expect(article).not.toHaveProperty("attachments");
      expect(article).not.toHaveProperty("wechat_media_id");
    }
  });

  it("imports crawler results into a review pool before publishing", async () => {
    const app = createServer();
    const login = await request(app)
      .post("/api/admin/login")
      .send({ username: "test-admin", password: "test-password" });
    const authorization = `Bearer ${login.body.data.token}`;
    const sourceUrl = "https://mp.weixin.qq.com/s/test-candidate-integration";

    await db.run("DELETE FROM news WHERE source_url = ?", [sourceUrl]);
    await db.run("DELETE FROM wechat_candidates WHERE source_url = ?", [
      sourceUrl,
    ]);

    const imported = await request(app)
      .post("/api/wechat-candidates/import")
      .set("Authorization", authorization)
      .send({
        articles: [
          { title: "候选池集成测试", url: sourceUrl, digest: "尚未发布" },
        ],
      });
    expect(imported.status).toBe(200);
    expect(imported.body.data.created).toBe(1);
    expect(
      await db.get("SELECT id FROM news WHERE source_url = ?", [sourceUrl]),
    ).toBeUndefined();

    const duplicate = await request(app)
      .post("/api/wechat-candidates/import")
      .set("Authorization", authorization)
      .send({ articles: [{ title: "候选池集成测试", url: sourceUrl }] });
    expect(duplicate.body.data.skipped).toBe(1);

    const candidate = await db.get(
      "SELECT id FROM wechat_candidates WHERE source_url = ?",
      [sourceUrl],
    );
    const confirmed = await request(app)
      .post("/api/wechat-candidates/confirm")
      .set("Authorization", authorization)
      .send({ ids: [candidate.id], category: "本所动态" });
    expect(confirmed.body.data.created).toBe(1);
    expect(
      await db.get("SELECT id FROM news WHERE source_url = ?", [sourceUrl]),
    ).toBeTruthy();

    await db.run("DELETE FROM news WHERE source_url = ?", [sourceUrl]);
    await db.run("DELETE FROM wechat_candidates WHERE source_url = ?", [
      sourceUrl,
    ]);
  });
});
