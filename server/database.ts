import sqlite3 from "sqlite3";
import { open } from "sqlite";

// Let's create a new database connection
export const db = await open({
  filename: "./database.db",
  driver: sqlite3.Database,
});

async function setup() {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS news (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      rich_content TEXT,
      imageUrl TEXT,
      author TEXT,
      category TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      wechat_media_id TEXT,
      wechat_synced_at DATETIME
    );
  `);

  // 创建微信公众号配置表
  await db.exec(`
    CREATE TABLE IF NOT EXISTS wechat_config (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      appId TEXT NOT NULL,
      appSecret TEXT NOT NULL,
      accessToken TEXT,
      expiresAt INTEGER
    );
  `);

  try {
    await db.exec("ALTER TABLE contact_messages ADD COLUMN source TEXT;");
  } catch (e) {
    // 字段已存在时忽略
  }
  await db.exec(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      company TEXT,
      contact TEXT,
      message TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      status TEXT DEFAULT '未处理',
      source TEXT
    );
  `);

  // 创建碳排放足迹表
  await db.exec(`
    CREATE TABLE IF NOT EXISTS carbon_footprints (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      entity_type TEXT NOT NULL CHECK(entity_type IN ('individual', 'company', 'product')),
      entity_name TEXT NOT NULL,
      total_emissions REAL NOT NULL,
      unit TEXT DEFAULT 'tCO2e',
      period_start TEXT NOT NULL,
      period_end TEXT NOT NULL,
      breakdown TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 创建索引以提高查询性能
  await db.exec(`
    CREATE INDEX IF NOT EXISTS idx_carbon_footprints_user_id ON carbon_footprints(user_id);
    CREATE INDEX IF NOT EXISTS idx_carbon_footprints_created_at ON carbon_footprints(created_at);
  `);

  // For testing, let's add some mock data if the table is empty
  const count = await db.get("SELECT COUNT(*) as count FROM news");
  if (count.count === 0) {
    await db.run(
      "INSERT INTO news (title, content, imageUrl, author, category) VALUES (?, ?, ?, ?, ?)",
      [
        "国家发改委发布《“十四五”循环经济发展规划》深度解读",
        "规划明确了“十四五”时期循环经济发展的主要目标和重点任务，强调构建资源循环型产业体系和废旧物资循环利用体系，对我国绿色低碳转型具有重要指导意义。",
        "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e5?q=80&w=800&auto=format&fit=crop",
        "政策研究室",
        "政策解读",
      ]
    );
    await db.run(
      "INSERT INTO news (title, content, imageUrl, author, category) VALUES (?, ?, ?, ?, ?)",
      [
        "我所成功举办首届“碳中和”主题线上研讨会",
        "为探讨碳中和路径，分享前沿技术，我所于近日成功举办线上研讨会，吸引了众多行业专家和学者参与，共同为实现“双碳”目标建言献策。",
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop",
        "本所新闻",
        "本所动态",
      ]
    );
    await db.run(
      "INSERT INTO news (title, content, imageUrl, author, category) VALUES (?, ?, ?, ?, ?)",
      [
        "关于系统将于本周五晚进行升级维护的通知",
        "为提升服务质量，我所信息系统将于本周五晚22:00至次日凌晨4:00进行升级维护，届时相关服务将暂停使用，敬请谅解。",
        "https://images.unsplash.com/photo-1584949091598-c31daaaa4aa9?q=80&w=800&auto=format&fit=crop",
        "信息技术部",
        "通知公告",
      ]
    );
    await db.run(
      "INSERT INTO news (title, content, imageUrl, author, category) VALUES (?, ?, ?, ?, ?)",
      [
        "全球最大碳捕集项目在冰岛投入运营",
        "近日，全球最大的直接空气碳捕集与封存（DACCS）项目“猛犸”（Mammoth）在冰岛正式投入运营，标志着负碳技术迈出了商业化应用的关键一步。",
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop",
        "国际能源网",
        "新闻资讯",
      ]
    );
    await db.run(
      "INSERT INTO news (title, content, imageUrl, author, category) VALUES (?, ?, ?, ?, ?)",
      [
        "一文读懂：什么是碳配额（CEA）与国家核证自愿减排量（CCER）？",
        "碳市场中有两种核心的交易产品：碳配额（CEA）和国家核证自愿减排量（CCER）。本文将详细介绍它们的定义、区别以及在碳市场中的作用。",
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop",
        "科普君",
        "知识专栏",
      ]
    );
  }
}

setup(); 