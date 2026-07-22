import "./load-env";
import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "./index";
import * as express from "express";
import { db } from "./database";
import { closeCrawlerSessions } from "./services/wechat-crawler";

const app = createServer();
const port = process.env.PORT || 3000;

// In production, serve the built SPA files
// Fix for import.meta.dirname compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, "../spa");

// Cache fingerprinted bundles aggressively while keeping the SPA shell fresh.
app.use(
  express.static(distPath, {
    setHeaders(res, filePath) {
      if (filePath.endsWith(".html")) {
        res.setHeader("Cache-Control", "no-cache");
      } else if (/[-.][A-Za-z0-9_-]{8,}\.(?:js|css)$/.test(filePath)) {
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      } else {
        res.setHeader("Cache-Control", "public, max-age=86400");
      }
    },
  }),
);

// Handle React Router - serve index.html for all non-API routes
app.get("*", (req, res) => {
  // Don't serve index.html for API routes
  if (req.path.startsWith("/api/") || req.path.startsWith("/health")) {
    return res.status(404).json({ error: "API endpoint not found" });
  }

  res.sendFile(path.join(distPath, "index.html"));
});

const httpServer = app.listen(port, () => {
  console.log(`🚀 Fusion Starter server running on port ${port}`);
  console.log(`📱 Frontend: http://localhost:${port}`);
  console.log(`🔧 API: http://localhost:${port}/api`);
});

let shuttingDown = false;
async function shutdown(signal: string) {
  if (shuttingDown) return;
  shuttingDown = true;
  console.log(`${signal} received, shutting down gracefully`);
  const forceExit = setTimeout(() => process.exit(1), 10_000);
  forceExit.unref();
  await closeCrawlerSessions().catch(console.error);
  await new Promise<void>((resolve) => httpServer.close(() => resolve()));
  await db.close().catch(console.error);
  clearTimeout(forceExit);
  process.exit(0);
}

process.on("SIGTERM", () => void shutdown("SIGTERM"));
process.on("SIGINT", () => void shutdown("SIGINT"));
