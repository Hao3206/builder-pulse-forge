import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs/promises";

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

const upload = multer({
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

// 上传图片
router.post("/image", upload.single("image"), async (req, res) => {
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

export default router;

