import express from "express";
import cors from "cors";
import path from "path";
import { handleDemo } from "./routes/demo";
import {
  getCarbonCredits,
  getCarbonProjects,
  getCarbonFootprint,
  createCarbonFootprint,
  getCarbonFootprintStats,
} from "./routes/carbon";
import newsRoutes from "./routes/news";
import {
  adminLogin,
  verifyAdminToken,
  getAdminProfile,
  adminLogout,
} from "./routes/admin";
import newsAdminRoutes from "./routes/news-admin";
import {
  getSolutions,
  getSolutionById,
  getCaseStudies,
  getCaseStudyById,
  getSolutionsStats,
} from "./routes/solutions";
import contactRoutes from "./routes/contact";
import wechatRoutes from "./routes/wechat";
import uploadRoutes from "./routes/upload";
import "./database"; // Import to initialize

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  // 静态文件服务 - 附件目录
  const attachmentsPath = path.join(process.cwd(), "public", "attachments");
  app.use("/attachments", express.static(attachmentsPath));

  // Mount the routers
  app.use("/api/admin", newsAdminRoutes);
  app.use("/api/news", newsRoutes);
  app.use("/api/contact", contactRoutes);
  app.use("/api/wechat", wechatRoutes);
  app.use("/api/upload", uploadRoutes);

  // Health check
  app.get("/api/ping", (_req, res) => {
    res.json({
      message: "浙东环境能源交易所API服务正常运行",
      timestamp: new Date().toISOString(),
      version: "1.0.0",
    });
  });

  // Legacy demo route
  app.get("/api/demo", handleDemo);

  // 碳交易相关API
  app.get("/api/carbon/credits", getCarbonCredits);
  app.get("/api/carbon/projects", getCarbonProjects);
  app.get("/api/carbon/footprint/stats", getCarbonFootprintStats);
  app.get("/api/carbon/footprint/:userId", getCarbonFootprint);
  app.post("/api/carbon/footprint/:userId", createCarbonFootprint);

  // 新闻资讯API is now handled by newsRoutes

  // 解决方案API
  app.get("/api/solutions", getSolutions);
  app.get("/api/solutions/stats", getSolutionsStats);
  app.get("/api/solutions/:id", getSolutionById);
  app.get("/api/solutions/cases", getCaseStudies);
  app.get("/api/solutions/cases/:id", getCaseStudyById);

  // 管理员认证API
  app.post("/api/admin/login", adminLogin);
  app.post("/api/admin/logout", verifyAdminToken, adminLogout);
  app.get("/api/admin/profile", verifyAdminToken, getAdminProfile);

  // 管理员新闻管理API is now handled by newsAdminRoutes

  // 错误处理中间件
  app.use(
    (
      err: any,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction,
    ) => {
      console.error("API错误:", err);
      res.status(500).json({
        success: false,
        error: "服务器内部错误",
        message:
          process.env.NODE_ENV === "development" ? err.message : "请稍后重试",
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
