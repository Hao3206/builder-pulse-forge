import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  getCarbonCredits,
  getCarbonProjects,
  getCarbonFootprint,
  createCarbonFootprint,
  getCarbonFootprintStats,
} from "./routes/carbon";
import {
  getNews,
  getNewsById,
  getFeaturedNews,
  createNews,
  getNewsStats,
} from "./routes/news";
import {
  adminLogin,
  verifyAdminToken,
  getAdminProfile,
  adminLogout,
} from "./routes/admin";
import {
  getAdminNews,
  createAdminNews,
  updateAdminNews,
  deleteAdminNews,
  batchDeleteNews,
  batchUpdateNewsStatus,
  getAdminNewsById,
} from "./routes/news-admin";
import {
  getSolutions,
  getSolutionById,
  getCaseStudies,
  getCaseStudyById,
  getSolutionsStats,
} from "./routes/solutions";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

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

  // 新闻资讯API
  app.get("/api/news", getNews);
  app.get("/api/news/featured", getFeaturedNews);
  app.get("/api/news/stats", getNewsStats);
  app.get("/api/news/:id", getNewsById);
  app.post("/api/news", createNews);

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

  // 管理员新闻管理API
  app.get("/api/admin/news", verifyAdminToken, getAdminNews);
  app.get("/api/admin/news/:id", verifyAdminToken, getAdminNewsById);
  app.post("/api/admin/news", verifyAdminToken, createAdminNews);
  app.put("/api/admin/news/:id", verifyAdminToken, updateAdminNews);
  app.delete("/api/admin/news/:id", verifyAdminToken, deleteAdminNews);
  app.post("/api/admin/news/batch-delete", verifyAdminToken, batchDeleteNews);
  app.post(
    "/api/admin/news/batch-update",
    verifyAdminToken,
    batchUpdateNewsStatus,
  );

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

  // 404处理
  app.use((req, res) => {
    res.status(404).json({
      success: false,
      error: "API路径不存在",
      message: `路径 ${req.path} 不存在`,
    });
  });

  return app;
}
