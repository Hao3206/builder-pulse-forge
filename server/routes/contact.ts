import express from "express";
import { db } from "../database";
import { verifyAdminToken } from "./admin";
const router = express.Router();

// 提交留言
router.post("/", async (req, res) => {
  const { name, company, contact, message, source, website } = req.body;
  if (typeof website === "string" && website.trim()) {
    return res.json({ success: true });
  }
  if (
    typeof name !== "string" ||
    typeof contact !== "string" ||
    !name.trim() ||
    !contact.trim()
  ) {
    return res
      .status(400)
      .json({ success: false, error: "姓名和联系方式必填" });
  }
  if (name.trim().length > 80 || contact.trim().length > 120) {
    return res
      .status(400)
      .json({ success: false, error: "姓名或联系方式过长" });
  }
  if (typeof company === "string" && company.trim().length > 160) {
    return res.status(400).json({ success: false, error: "公司名称过长" });
  }
  if (typeof message === "string" && message.trim().length > 2000) {
    return res.status(400).json({ success: false, error: "留言内容过长" });
  }
  await db.run(
    "INSERT INTO contact_messages (name, company, contact, message, source) VALUES (?, ?, ?, ?, ?)",
    [
      name.trim().slice(0, 80),
      typeof company === "string" ? company.trim() || null : null,
      contact.trim(),
      typeof message === "string" ? message.trim() || null : null,
      typeof source === "string" ? source.trim().slice(0, 300) || null : null,
    ],
  );
  res.json({ success: true });
});

// 获取所有留言（后台用）
router.get("/", verifyAdminToken, async (req, res) => {
  const rows = await db.all(
    "SELECT * FROM contact_messages ORDER BY createdAt DESC",
  );
  res.json({ success: true, data: rows });
});

// 修改留言状态
router.patch("/:id", verifyAdminToken, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!["未处理", "处理中", "已处理"].includes(status))
    return res.status(400).json({ success: false, error: "无效状态" });
  await db.run("UPDATE contact_messages SET status = ? WHERE id = ?", [
    status,
    id,
  ]);
  res.json({ success: true });
});

router.delete("/:id", verifyAdminToken, async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ success: false, error: "无效留言编号" });
  }
  const result = await db.run("DELETE FROM contact_messages WHERE id = ?", [
    id,
  ]);
  if (!result.changes) {
    return res.status(404).json({ success: false, error: "留言不存在" });
  }
  res.json({ success: true });
});

export default router;
