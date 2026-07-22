import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import newsRoutes from "./routes/news";
import {
  adminLogin,
  verifyAdminToken,
  getAdminProfile,
  adminLogout,
} from "./routes/admin";
import newsAdminRoutes from "./routes/news-admin";
import contactRoutes from "./routes/contact";
import wechatRoutes from "./routes/wechat";
import wechatCandidateRoutes from "./routes/wechat-candidates";
import uploadRoutes from "./routes/upload";
import siteSettingsRoutes from "./routes/site-settings";
import { createRateLimiter } from "./middleware/security";
import "./database"; // Import to initialize

export function createServer() {
  const app = express();
  const contactSubmissionLimiter = createRateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: "提交过于频繁，请稍后重试",
  });

  // Middleware
  app.disable("x-powered-by");
  app.set("trust proxy", 1);
  app.use((_req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader(
      "Permissions-Policy",
      "camera=(), microphone=(), geolocation=()",
    );
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    if (process.env.NODE_ENV === "production") {
      res.setHeader(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains",
      );
    }
    next();
  });
  app.use(cors({ origin: process.env.CORS_ORIGIN?.split(",") || false }));
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true }));

  // 静态文件服务 - 附件目录
  const uploadsPath = path.join(process.cwd(), "public", "uploads");
  app.use(
    "/uploads",
    express.static(uploadsPath, {
      immutable: true,
      maxAge: "1y",
      setHeaders(res) {
        res.setHeader("X-Content-Type-Options", "nosniff");
      },
    }),
  );

  const attachmentsPath = path.join(process.cwd(), "public", "attachments");
  app.use(
    "/attachments",
    express.static(attachmentsPath, {
      setHeaders(res, filePath) {
        res.setHeader("X-Content-Type-Options", "nosniff");
        res.setHeader(
          "Content-Disposition",
          `attachment; filename*=UTF-8''${encodeURIComponent(path.basename(filePath))}`,
        );
      },
    }),
  );

  // Mount the routers
  app.use("/api/news", newsRoutes);
  app.use(
    "/api/contact",
    (req, res, next) =>
      req.method === "POST" ? contactSubmissionLimiter(req, res, next) : next(),
    contactRoutes,
  );
  app.use("/api/wechat", wechatRoutes);
  app.use("/api/wechat-candidates", wechatCandidateRoutes);
  app.use("/api/upload", uploadRoutes);
  app.use("/api/site-settings", siteSettingsRoutes);

  // Health check
  app.get("/api/ping", (_req, res) => {
    res.json({
      message: "浙东环境能源交易所API服务正常运行",
      timestamp: new Date().toISOString(),
      version: "1.0.0",
    });
  });

  // 管理员认证API
  app.post(
    "/api/admin/login",
    createRateLimiter({
      windowMs: 15 * 60 * 1000,
      max: 10,
      message: "登录尝试过多，请稍后重试",
    }),
    adminLogin,
  );
  app.post("/api/admin/logout", verifyAdminToken, adminLogout);
  app.get("/api/admin/profile", verifyAdminToken, getAdminProfile);
  app.use("/api/admin", newsAdminRoutes);

  // 管理员新闻管理API is now handled by newsAdminRoutes

  // 错误处理中间件
  app.use(
    (
      err: unknown,
      _req: express.Request,
      res: express.Response,
      _next: express.NextFunction,
    ) => {
      console.error("API错误:", err);
      const message = err instanceof Error ? err.message : "服务器内部错误";
      const isUploadError =
        err instanceof multer.MulterError ||
        ["只允许上传图片文件", "不支持的附件类型"].includes(message);
      res.status(isUploadError ? 400 : 500).json({
        success: false,
        error: isUploadError ? message : "服务器内部错误",
        message:
          process.env.NODE_ENV === "development" ? message : "请稍后重试",
      });
    },
  );

  // 404处理 - 只处理 API 路由
  app.use("/api/*", (req, res) => {
    res.status(404).json({
      success: false,
      error: "API路径不存在",
      message: `路径 ${req.path} 不存在`,
    });
  });

  // 注意：非 API 路由的 404 处理由 node-build.ts 中的 SPA 路由处理
  // 这里不处理，让请求继续传递到 node-build.ts 中的 app.get("*", ...)

  return app;
}
