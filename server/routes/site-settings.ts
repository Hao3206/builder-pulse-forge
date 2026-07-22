import express from "express";
import { db } from "../database";
import { verifyAdminToken } from "./admin";

const router = express.Router();
const CUSTOMER_QR_KEY = "customer_service_wechat_qr";
const UPLOADED_IMAGE_PATTERN =
  /^\/uploads\/[a-zA-Z0-9._-]+\.(?:jpe?g|png|gif|webp)$/i;

router.get("/customer-service", async (_req, res) => {
  const setting = await db.get(
    "SELECT value FROM site_settings WHERE key = ?",
    [CUSTOMER_QR_KEY],
  );
  res.json({
    success: true,
    data: { wechatQrCodeUrl: setting?.value || "" },
  });
});

router.put("/customer-service", verifyAdminToken, async (req, res) => {
  const wechatQrCodeUrl = req.body?.wechatQrCodeUrl;
  if (typeof wechatQrCodeUrl !== "string") {
    return res.status(400).json({ success: false, error: "二维码地址格式不正确" });
  }

  const normalizedUrl = wechatQrCodeUrl.trim();
  if (normalizedUrl && !UPLOADED_IMAGE_PATTERN.test(normalizedUrl)) {
    return res.status(400).json({
      success: false,
      error: "请使用后台上传的二维码图片",
    });
  }

  if (normalizedUrl) {
    await db.run(
      `INSERT INTO site_settings (key, value, updated_at)
       VALUES (?, ?, CURRENT_TIMESTAMP)
       ON CONFLICT(key) DO UPDATE SET
         value = excluded.value,
         updated_at = CURRENT_TIMESTAMP`,
      [CUSTOMER_QR_KEY, normalizedUrl],
    );
  } else {
    await db.run("DELETE FROM site_settings WHERE key = ?", [CUSTOMER_QR_KEY]);
  }

  res.json({
    success: true,
    data: { wechatQrCodeUrl: normalizedUrl },
    message: normalizedUrl ? "客服二维码已保存" : "客服二维码已清除",
  });
});

export default router;
