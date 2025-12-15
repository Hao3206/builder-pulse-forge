import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs/promises";
import { verifyAdminToken } from "./admin";

const router = express.Router();

// 确保上传目录存在
const uploadDir = path.join(process.cwd(), "public", "uploads");
fs.mkdir(uploadDir, { recursive: true }).catch(console.error);

// 配置multer
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // 生成唯一文件名
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `image-${uniqueSuffix}${ext}`);
  },
});

// 图片上传配置
const imageUpload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB限制
  },
  fileFilter: (req, file, cb) => {
    // 只允许图片文件
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("只允许上传图片文件"));
    }
  },
});

// 附件上传配置（支持各种文件类型）
const attachmentsDir = path.join(process.cwd(), "public", "attachments");
fs.mkdir(attachmentsDir, { recursive: true }).catch(console.error);

const attachmentStorage = multer.diskStorage({
  destination: async (req, file, cb) => {
    cb(null, attachmentsDir);
  },
  filename: (req, file, cb) => {
    // 生成唯一文件名，保留原始扩展名
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const nameWithoutExt = path.basename(file.originalname, ext);
    // 清理文件名，移除特殊字符
    const cleanName = nameWithoutExt.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, "_");
    cb(null, `attachment-${uniqueSuffix}-${cleanName}${ext}`);
  },
});

const attachmentUpload = multer({
  storage: attachmentStorage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB限制
  },
});

// 上传图片 - 需要管理员认证
router.post("/image", verifyAdminToken, imageUpload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "没有上传文件",
      });
    }

    // 返回图片URL
    const imageUrl = `/uploads/${req.file.filename}`;
    
    res.json({
      success: true,
      data: {
        url: imageUrl,
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
      },
      message: "图片上传成功",
    });
  } catch (error) {
    console.error("图片上传失败:", error);
    res.status(500).json({
      success: false,
      error: "图片上传失败",
    });
  }
});

// 获取已上传的图片列表
router.get("/images", async (req, res) => {
  try {
    const files = await fs.readdir(uploadDir);
    const images = files
      .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
      .map(file => ({
        filename: file,
        url: `/uploads/${file}`,
        path: path.join(uploadDir, file),
      }));

    res.json({
      success: true,
      data: images,
    });
  } catch (error) {
    console.error("获取图片列表失败:", error);
    res.status(500).json({
      success: false,
      error: "获取图片列表失败",
    });
  }
});

// 删除图片
router.delete("/image/:filename", async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(uploadDir, filename);
    
    // 检查文件是否存在
    try {
      await fs.access(filePath);
    } catch {
      return res.status(404).json({
        success: false,
        error: "文件不存在",
      });
    }

    // 删除文件
    await fs.unlink(filePath);
    
    res.json({
      success: true,
      message: "图片删除成功",
    });
  } catch (error) {
    console.error("删除图片失败:", error);
    res.status(500).json({
      success: false,
      error: "删除图片失败",
    });
  }
});

// 上传附件（支持各种文件类型）- 需要管理员认证
router.post("/attachment", verifyAdminToken, attachmentUpload.single("attachment"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "没有上传文件",
      });
    }

    // 返回附件信息
    const attachmentUrl = `/attachments/${req.file.filename}`;
    
    res.json({
      success: true,
      data: {
        url: attachmentUrl,
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype,
      },
      message: "附件上传成功",
    });
  } catch (error: any) {
    console.error("附件上传失败:", error);
    res.status(500).json({
      success: false,
      error: error.message || "附件上传失败",
    });
  }
});

// 下载附件
router.get("/attachment/:filename", async (req, res) => {
  try {
    const { filename } = req.params;
    // 防止路径遍历攻击
    const safeFilename = path.basename(filename);
    const filePath = path.join(attachmentsDir, safeFilename);
    
    // 检查文件是否存在
    try {
      await fs.access(filePath);
    } catch {
      return res.status(404).json({
        success: false,
        error: "文件不存在",
      });
    }

    // 从数据库中查找原始文件名（如果可能）
    // 这里简化处理，从文件名中提取原始名称
    const originalName = safeFilename.replace(/^attachment-\d+-\d+-/, "").replace(/^attachment-\d+-/, "");
    
    // 设置下载响应头
    res.setHeader("Content-Disposition", `attachment; filename="${encodeURIComponent(originalName)}"`);
    res.setHeader("Content-Type", "application/octet-stream");
    
    // 使用绝对路径发送文件
    res.sendFile(path.resolve(filePath));
  } catch (error) {
    console.error("下载附件失败:", error);
    res.status(500).json({
      success: false,
      error: "下载附件失败",
    });
  }
});

export default router;

