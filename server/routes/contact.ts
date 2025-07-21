import express from "express";
import { db } from "../database";
const router = express.Router();

// 提交留言
router.post("/", async (req, res) => {
  const { name, company, contact, message, source } = req.body;
  if (!name || !contact) {
    return res.status(400).json({ success: false, error: "姓名和联系方式必填" });
  }
  await db.run(
    "INSERT INTO contact_messages (name, company, contact, message, source) VALUES (?, ?, ?, ?, ?)",
    [name, company, contact, message, source || null]
  );
  res.json({ success: true });
});

// 获取所有留言（后台用）
router.get("/", async (req, res) => {
  const rows = await db.all("SELECT * FROM contact_messages ORDER BY createdAt DESC");
  res.json({ success: true, data: rows });
});

// 修改留言状态
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!status) return res.status(400).json({ success: false, error: "缺少状态" });
  await db.run("UPDATE contact_messages SET status = ? WHERE id = ?", [status, id]);
  res.json({ success: true });
});

export default router; 