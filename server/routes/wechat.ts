import express from "express";
import { db } from "../database";

const router = express.Router();

// 处理内容中的图片，将图片URL替换为微信media_id
async function processContentImages(content: string, accessToken: string): Promise<string> {
  if (!content) return content;
  
  // 匹配所有img标签
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  let processedContent = content;
  let match;
  
  while ((match = imgRegex.exec(content)) !== null) {
    const imgTag = match[0];
    const imgUrl = match[1];
    
    try {
      // 如果是相对路径，转换为完整URL
      let fullImgUrl = imgUrl;
      if (imgUrl.startsWith('/uploads/')) {
        fullImgUrl = `https://www.zdeaee.com${imgUrl}`;
      }
      
      // 下载图片
      const imgResponse = await fetch(fullImgUrl);
      if (!imgResponse.ok) {
        console.warn(`无法下载图片: ${fullImgUrl}`);
        continue;
      }
      
      const imgBuffer = await imgResponse.arrayBuffer();
      const imgBlob = new Blob([new Uint8Array(imgBuffer)]);
      
      // 上传到微信服务器
      const formData = new FormData();
      formData.append('media', imgBlob, 'image.jpg');
      
      const uploadResponse = await fetch(
        `https://api.weixin.qq.com/cgi-bin/media/upload?access_token=${accessToken}&type=image`,
        {
          method: 'POST',
          body: formData
        }
      );
      
      const uploadResult = await uploadResponse.json();
      
      if (uploadResult.media_id) {
        // 替换img标签为微信格式
        const wechatImgTag = `<img src="${uploadResult.media_id}" />`;
        processedContent = processedContent.replace(imgTag, wechatImgTag);
        console.log(`图片上传成功: ${imgUrl} -> ${uploadResult.media_id}`);
      } else {
        console.warn(`图片上传失败: ${imgUrl}`, uploadResult);
      }
    } catch (error) {
      console.error(`处理图片失败: ${imgUrl}`, error);
    }
  }
  
  return processedContent;
}

// 获取微信访问令牌
async function getWechatAccessToken(): Promise<string> {
  const config = await db.get("SELECT * FROM wechat_config LIMIT 1");
  if (!config) {
    throw new Error("微信公众号配置未设置");
  }

  if (config.accessToken && config.expiresAt && Date.now() < config.expiresAt) {
    return config.accessToken;
  }

  const response = await fetch(
    `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${config.appId}&secret=${config.appSecret}`
  );
  const data = await response.json();

  if (data.access_token) {
    const expiresAt = Date.now() + (data.expires_in - 300) * 1000;
    await db.run(
      "UPDATE wechat_config SET accessToken = ?, expiresAt = ?",
      [data.access_token, expiresAt]
    );
    return data.access_token;
  } else {
    throw new Error(`获取微信访问令牌失败: ${data.errmsg}`);
  }
}

// 同步文章到微信公众号
async function syncArticleToWechat(articleId: number): Promise<any> {
  const article = await db.get("SELECT * FROM news WHERE id = ?", [articleId]);
  if (!article) {
    throw new Error("文章不存在");
  }

  const accessToken = await getWechatAccessToken();
  
  // 如果文章已经同步过，先删除旧的草稿
  if (article.wechat_media_id) {
    try {
      console.log("删除旧的微信草稿:", article.wechat_media_id);
      const deleteResponse = await fetch(
        `https://api.weixin.qq.com/cgi-bin/draft/delete?access_token=${accessToken}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            media_id: article.wechat_media_id
          })
        }
      );
      const deleteResult = await deleteResponse.json();
      console.log("删除旧草稿结果:", JSON.stringify(deleteResult, null, 2));
    } catch (error) {
      console.error("删除旧草稿失败:", error);
      // 继续执行，不因为删除失败而中断
    }
  }
  
  // 处理文章内容，确保符合微信API要求
  // 移除HTML标签并清理内容
  const cleanContent = article.content
    .replace(/<[^>]*>/g, '') // 移除HTML标签
    .replace(/\s+/g, ' ') // 合并多个空格
    .trim();
  
  // 微信描述限制为64个字符
  const digest = cleanContent.length > 64 ? cleanContent.substring(0, 64) + "..." : cleanContent;
  
  // 处理富文本内容中的图片
  let processedContent = await processContentImages(article.content, accessToken);
  
  // 使用指定的封面图片
  let thumbMediaId = "";
  try {
    // 使用本地banner-1.jpg图片
    const fs = await import('fs/promises');
    const path = await import('path');
    const imagePath = path.join(process.cwd(), 'public', 'banner-1.jpg');
    const imageBuffer = await fs.readFile(imagePath);
    
    // 上传到微信服务器
    const formData = new FormData();
    formData.append('media', new Blob([new Uint8Array(imageBuffer)]), 'banner-1.jpg');
    
    const uploadResponse = await fetch(
      `https://api.weixin.qq.com/cgi-bin/material/add_material?access_token=${accessToken}&type=image`,
      {
        method: 'POST',
        body: formData
      }
    );
    
    const uploadResult = await uploadResponse.json();
    console.log("图片上传结果:", JSON.stringify(uploadResult, null, 2));
    
    if (uploadResult.media_id) {
      thumbMediaId = uploadResult.media_id;
    } else {
      console.error("图片上传失败:", uploadResult);
    }
  } catch (error) {
    console.error("上传封面图片失败:", error);
  }
  
  const articleData = {
    articles: [{
      title: article.title,
      author: article.author || "浙东环境能源交易所",
      digest: digest,
      content: processedContent, // 使用处理后的内容（包含微信media_id的图片）
      content_source_url: "",
      thumb_media_id: thumbMediaId,
      show_cover_pic: 1
    }]
  };

  // 使用草稿箱API
  const response = await fetch(
    `https://api.weixin.qq.com/cgi-bin/draft/add?access_token=${accessToken}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(articleData)
    }
  );

  const result = await response.json();
  console.log("微信API响应:", JSON.stringify(result, null, 2));
  
  if (result.media_id) {
    await db.run(
      "UPDATE news SET wechat_media_id = ?, wechat_synced_at = CURRENT_TIMESTAMP WHERE id = ?",
      [result.media_id, articleId]
    );
    return result;
  } else {
    throw new Error(`同步到微信失败: ${result.errmsg}`);
  }
}

// 获取微信公众号配置
router.get("/config", async (req, res) => {
  try {
    const config = await db.get("SELECT appId, appSecret FROM wechat_config LIMIT 1");
    res.json({
      success: true,
      data: config || {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "获取配置失败"
    });
  }
});

// 更新微信公众号配置
router.post("/config", async (req, res) => {
  try {
    const { appId, appSecret } = req.body;
    
    const existing = await db.get("SELECT id FROM wechat_config LIMIT 1");
    if (existing) {
      await db.run(
        "UPDATE wechat_config SET appId = ?, appSecret = ?",
        [appId, appSecret]
      );
    } else {
      await db.run(
        "INSERT INTO wechat_config (appId, appSecret) VALUES (?, ?)",
        [appId, appSecret]
      );
    }
    
    res.json({
      success: true,
      message: "配置更新成功"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "更新配置失败"
    });
  }
});

// 同步单篇文章到微信
router.post("/sync/:id", async (req, res) => {
  try {
    const articleId = parseInt(req.params.id);
    const result = await syncArticleToWechat(articleId);
    
    res.json({
      success: true,
      data: result,
      message: "同步成功"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// 获取同步状态
router.get("/sync-status/:id", async (req, res) => {
  try {
    const articleId = parseInt(req.params.id);
    const article = await db.get(
      "SELECT wechat_media_id, wechat_synced_at FROM news WHERE id = ?",
      [articleId]
    );
    
    res.json({
      success: true,
      data: {
        synced: !!article?.wechat_media_id,
        mediaId: article?.wechat_media_id,
        syncedAt: article?.wechat_synced_at
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "获取同步状态失败"
    });
  }
});

// 从微信草稿箱同步文章到网站
router.post("/sync-from-wechat", async (req, res) => {
  try {
    const accessToken = await getWechatAccessToken();
    
    // 获取草稿箱文章列表
    const response = await fetch(
      `https://api.weixin.qq.com/cgi-bin/draft/batchget?access_token=${accessToken}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          offset: 0,
          count: 20
        })
      }
    );
    
    const result = await response.json();
    console.log("获取微信草稿箱结果:", JSON.stringify(result, null, 2));
    
    if (!result.item || !Array.isArray(result.item)) {
      throw new Error("获取微信草稿箱失败");
    }
    
    const syncedArticles = [];
    
    // 遍历草稿箱中的文章
    for (const draft of result.item) {
      if (draft.content && draft.content.news_item && draft.content.news_item.length > 0) {
        const wechatArticle = draft.content.news_item[0];
        
        // 处理微信文章内容
        let cleanContent = processWechatContent(wechatArticle.content);
        let richContent = wechatArticle.content; // 保留原始富文本内容
        
        // 如果内容为空，使用摘要
        if (!cleanContent && wechatArticle.digest) {
          cleanContent = wechatArticle.digest;
          richContent = `<p>${wechatArticle.digest}</p>`;
        }
        
        // 检查文章是否已经存在（通过标题匹配）
        const existingArticle = await db.get(
          "SELECT id FROM news WHERE title = ?",
          [wechatArticle.title]
        );
        
        if (!existingArticle) {
          // 插入新文章
          const insertResult = await db.run(
            "INSERT INTO news (title, content, rich_content, author, category, wechat_media_id, wechat_synced_at) VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)",
            [
              wechatArticle.title,
              cleanContent,
              richContent,
              wechatArticle.author || "微信公众号",
              "微信同步",
              draft.media_id
            ]
          );
          
          syncedArticles.push({
            title: wechatArticle.title,
            id: insertResult.lastID,
            action: "新增"
          });
        } else {
          // 更新现有文章
          await db.run(
            "UPDATE news SET content = ?, rich_content = ?, author = ?, wechat_media_id = ?, wechat_synced_at = CURRENT_TIMESTAMP WHERE id = ?",
            [
              cleanContent,
              richContent,
              wechatArticle.author || "微信公众号",
              draft.media_id,
              existingArticle.id
            ]
          );
          
          syncedArticles.push({
            title: wechatArticle.title,
            id: existingArticle.id,
            action: "更新"
          });
        }
      }
    }
    
    res.json({
      success: true,
      data: {
        total: result.item_count,
        synced: syncedArticles.length,
        articles: syncedArticles
      },
      message: `成功同步 ${syncedArticles.length} 篇文章`
    });
    
  } catch (error) {
    console.error("从微信同步失败:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// 处理微信文章内容的函数
function processWechatContent(content: string): string {
  if (!content) return "";
  
  // 移除HTML标签，但保留换行符
  let cleanContent = content
    .replace(/<br\s*\/?>/gi, '\n')  // 保留换行
    .replace(/<p[^>]*>/gi, '\n')    // 段落开始
    .replace(/<\/p>/gi, '\n')       // 段落结束
    .replace(/<[^>]*>/g, '')        // 移除其他HTML标签
    .replace(/&nbsp;/g, ' ')        // 替换HTML实体
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
  
  // 清理多余的空白字符
  cleanContent = cleanContent
    .replace(/\n\s*\n/g, '\n\n')    // 多个空行合并为两个
    .replace(/[ \t]+/g, ' ')        // 多个空格合并为一个
    .trim();
  
  return cleanContent;
}

// 获取微信草稿箱文章列表（预览）
router.get("/drafts", async (req, res) => {
  try {
    const accessToken = await getWechatAccessToken();
    
    const response = await fetch(
      `https://api.weixin.qq.com/cgi-bin/draft/batchget?access_token=${accessToken}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          offset: 0,
          count: 20
        })
      }
    );
    
    const result = await response.json();
    
    if (!result.item || !Array.isArray(result.item)) {
      throw new Error("获取微信草稿箱失败");
    }
    
    const drafts = result.item.map(draft => {
      if (draft.content && draft.content.news_item && draft.content.news_item.length > 0) {
        const article = draft.content.news_item[0];
        return {
          media_id: draft.media_id,
          title: article.title,
          author: article.author,
          digest: article.digest,
          content_preview: processWechatContent(article.content).substring(0, 200) + "...",
          update_time: draft.update_time
        };
      }
      return null;
    }).filter(Boolean);
    
    res.json({
      success: true,
      data: {
        total: result.item_count,
        drafts: drafts
      }
    });
    
  } catch (error) {
    console.error("获取微信草稿箱失败:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;
