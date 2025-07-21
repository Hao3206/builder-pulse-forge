import { RequestHandler } from "express";
import { ApiResponse, NewsArticle, CreateNewsRequest } from "@shared/api";

// 导入现有的模拟数据 (在实际项目中应该使用数据库)
// 这里我们创建一个可变的数据副本用于管理操作
let adminMockNews: NewsArticle[] = [
  {
    id: "1",
    title: "浙江省发布碳达峰实施方案，明确2030年达峰目标",
    summary:
      "浙江省政府正式发布《浙江省碳达峰实施方案》，明确提出2030年前实现碳达峰的具体路径和政策措施。",
    content: `
      浙江省政府近日正式发布《浙江省碳达峰实施方案》，这标志着浙江省在碳达峰、碳中和目标实现上迈出了重要一步。

      **主要目标**
      
      根据方案，浙江省将确保2030年前实现碳达峰，并力争在全国率先实现碳达峰。具���目标包括：
      
      - 到2025年，单位GDP二氧化碳排放比2020年下降20%
      - 到2030年，单位GDP二氧化碳排放比2005年下降65%以上
      - 非化石能源消费比重达到24%以上
      
      **重点任务**
      
      方案明确了十大重点任务：
      
      1. 推进能源绿色低碳转型
      2. 实施节能降碳增效行动
      3. 推进工业领域碳达峰
      4. 促进城乡建设碳达峰
      5. 加快交通运输绿色低碳发展
      
      **政策保障**
      
      浙江省将建立健全碳达峰工作推进机制，完善政策法规体系，加强资金保障，强化科技创新支撑。
    `,
    category: "政策解读",
    author: "浙江日报",
    publishedAt: "2024-01-25T09:00:00Z",
    updatedAt: "2024-01-25T09:00:00Z",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e5?w=800&h=400&fit=crop",
    tags: ["碳达峰", "浙江省", "政策", "绿色发展"],
    readTime: 5,
  },
  {
    id: "2",
    title: "CCER重启交易首日，浙东环交所成交额突破千万",
    summary:
      "全国温室气体自愿减排交易市场重启后首个交易日，浙东环境能源交易所CCER交易表现活跃。",
    content: `
      1月22日，全国温室气体自愿减排交易市场重启交易的首个工作日，浙东环境能源交易所（以下简称"浙东环交所"）CCER交易表现活跃，成交额突破千万元大关。

      **交易情况**
      
      截至收盘，浙东环交所当日CCER成交量达到25万吨，成交额1,250万元，平均成交价格为每吨50元。交易项目涵盖森林碳汇、可再生能源、甲烷利用等多个领域。

      **市场反应**
      
      多家企业表示，CCER市场的重启为企业履行减排责任、实现碳中和目标提供了重要工具。不少企业已经开始制定CCER采购计划。

      **专家观点**
      
      业内专家认为，CCER市场的重启将有效激活全国碳市场的活跃度，为实现双碳目标提供市场化手段。预计未来CCER交易将保持较高增长势头。
    `,
    category: "新闻资讯",
    author: "证券日报",
    publishedAt: "2024-01-22T16:30:00Z",
    updatedAt: "2024-01-22T16:30:00Z",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop",
    tags: ["CCER", "碳交易", "浙东环交所", "市场"],
    readTime: 3,
  },
  {
    id: "3",
    title: "浙东环交所与宁波大学签署碳��和人才培养合作协议",
    summary: "双方将在碳管理人才培养、研发创新、平台建设等方面开展深度合作。",
    content: `
      1月20日，浙东环境能源交易所与宁波大学正式签署碳中和人才培养合作协议，双方将在碳管理人才培养、技术研发创新、实践平台建设等方面开展深度合作。

      **合作内容**
      
      根据协议，双方将共同开展以下合作：
      
      - 建立碳中和人才培养基地
      - 开发碳管理相关课程体系
      - 共建碳核算与交易实验室
      - 联合培养碳管理专业人才
      - 开展碳中和技术研发合作

      **意义重大**
      
      此次合作协议的签署，标志着产学研合作在碳中和领域的深度融合，将为浙江省乃至全国培养更多碳管理专业人才。

      **未来展望**
      
      双方表示，将以此次合作为起点，不断深化合作关系，为实现碳达峰、碳中和目标贡献更多智慧和力量。
    `,
    category: "本所动态",
    author: "浙东环交所",
    publishedAt: "2024-01-20T14:00:00Z",
    updatedAt: "2024-01-20T14:00:00Z",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=400&fit=crop",
    tags: ["人才培养", "产学研合作", "宁波大学", "碳中和"],
    readTime: 4,
  },
];

export interface UpdateNewsRequest extends CreateNewsRequest {
  id: string;
}

// 获取所有新闻 (管理后台)
export const getAdminNews: RequestHandler = (req, res) => {
  try {
    const {
      category,
      featured,
      page = "1",
      limit = "10",
      search,
      status = "all",
    } = req.query;

    let filteredNews = [...adminMockNews];

    // 按分类筛选
    if (category && category !== "all") {
      filteredNews = filteredNews.filter(
        (article) => article.category === category,
      );
    }

    // 按精选筛选
    if (featured === "true") {
      filteredNews = filteredNews.filter((article) => article.featured);
    } else if (featured === "false") {
      filteredNews = filteredNews.filter((article) => !article.featured);
    }

    // 搜索功能
    if (search) {
      const searchTerm = String(search).toLowerCase();
      filteredNews = filteredNews.filter(
        (article) =>
          article.title.toLowerCase().includes(searchTerm) ||
          article.summary.toLowerCase().includes(searchTerm) ||
          article.author.toLowerCase().includes(searchTerm) ||
          article.tags.some((tag) => tag.toLowerCase().includes(searchTerm)),
      );
    }

    // 排序：最新的在前面
    filteredNews.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );

    // 分页
    const pageNum = parseInt(String(page));
    const limitNum = parseInt(String(limit));
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;

    const paginatedNews = filteredNews.slice(startIndex, endIndex);

    const response: ApiResponse<{
      articles: NewsArticle[];
      pagination: {
        current: number;
        total: number;
        pages: number;
        hasNext: boolean;
        hasPrev: boolean;
      };
      statistics: {
        total: number;
        featured: number;
        categories: Record<string, number>;
      };
    }> = {
      success: true,
      data: {
        articles: paginatedNews,
        pagination: {
          current: pageNum,
          total: filteredNews.length,
          pages: Math.ceil(filteredNews.length / limitNum),
          hasNext: endIndex < filteredNews.length,
          hasPrev: pageNum > 1,
        },
        statistics: {
          total: adminMockNews.length,
          featured: adminMockNews.filter((article) => article.featured).length,
          categories: adminMockNews.reduce(
            (acc, article) => {
              acc[article.category] = (acc[article.category] || 0) + 1;
              return acc;
            },
            {} as Record<string, number>,
          ),
        },
      },
      message: `找到 ${filteredNews.length} 条新闻`,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "获取新闻列表失败",
    });
  }
};

// 创建新闻
export const createAdminNews: RequestHandler = (req, res) => {
  try {
    const newsData: CreateNewsRequest = req.body;
    const admin = (req as any).admin;

    if (!newsData.title || !newsData.content || !newsData.category) {
      return res.status(400).json({
        success: false,
        error: "标题、内容和分类不能为空",
      });
    }

    const newArticle: NewsArticle = {
      id: `news_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title: newsData.title,
      summary: newsData.summary || newsData.content.substring(0, 200) + "...",
      content: newsData.content,
      category: newsData.category,
      author: admin?.name || "系统管理员",
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      featured: newsData.featured || false,
      image:
        newsData.image ||
        "https://images.unsplash.com/photo-1586083702768-190ae093d34d?w=800&h=400&fit=crop",
      tags: newsData.tags || [],
      readTime: Math.ceil(newsData.content.length / 200),
    };

    adminMockNews.unshift(newArticle);

    const response: ApiResponse<NewsArticle> = {
      success: true,
      data: newArticle,
      message: "新闻创建成功",
    };

    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "创建新闻失败",
    });
  }
};

// 更新新闻
export const updateAdminNews: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const updateData: Partial<CreateNewsRequest> = req.body;
    const admin = (req as any).admin;

    const articleIndex = adminMockNews.findIndex(
      (article) => article.id === id,
    );

    if (articleIndex === -1) {
      return res.status(404).json({
        success: false,
        error: "新闻不存在",
      });
    }

    const existingArticle = adminMockNews[articleIndex];

    // 更新文章
    const updatedArticle: NewsArticle = {
      ...existingArticle,
      ...updateData,
      id: existingArticle.id,
      publishedAt: existingArticle.publishedAt,
      updatedAt: new Date().toISOString(),
      readTime: updateData.content
        ? Math.ceil(updateData.content.length / 200)
        : existingArticle.readTime,
    };

    adminMockNews[articleIndex] = updatedArticle;

    const response: ApiResponse<NewsArticle> = {
      success: true,
      data: updatedArticle,
      message: "新闻更新成功",
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "更新新闻失败",
    });
  }
};

// 删除新闻
export const deleteAdminNews: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;

    const articleIndex = adminMockNews.findIndex(
      (article) => article.id === id,
    );

    if (articleIndex === -1) {
      return res.status(404).json({
        success: false,
        error: "新闻不存在",
      });
    }

    const deletedArticle = adminMockNews.splice(articleIndex, 1)[0];

    const response: ApiResponse<NewsArticle> = {
      success: true,
      data: deletedArticle,
      message: "新闻删除成功",
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "删除新闻失败",
    });
  }
};

// 批量删除新��
export const batchDeleteNews: RequestHandler = (req, res) => {
  try {
    const { ids }: { ids: string[] } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        error: "请提供要删除的新闻ID列表",
      });
    }

    const deletedArticles: NewsArticle[] = [];

    ids.forEach((id) => {
      const articleIndex = adminMockNews.findIndex(
        (article) => article.id === id,
      );
      if (articleIndex !== -1) {
        deletedArticles.push(...adminMockNews.splice(articleIndex, 1));
      }
    });

    const response: ApiResponse<{
      deletedCount: number;
      deletedArticles: NewsArticle[];
    }> = {
      success: true,
      data: {
        deletedCount: deletedArticles.length,
        deletedArticles,
      },
      message: `成功删除 ${deletedArticles.length} 条新闻`,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "批量删除新闻失败",
    });
  }
};

// 批量更新新闻状态 (精选/取消精选)
export const batchUpdateNewsStatus: RequestHandler = (req, res) => {
  try {
    const { ids, featured }: { ids: string[]; featured: boolean } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        error: "请提供要更新的新闻ID列表",
      });
    }

    const updatedArticles: NewsArticle[] = [];

    ids.forEach((id) => {
      const articleIndex = adminMockNews.findIndex(
        (article) => article.id === id,
      );
      if (articleIndex !== -1) {
        adminMockNews[articleIndex] = {
          ...adminMockNews[articleIndex],
          featured: featured,
          updatedAt: new Date().toISOString(),
        };
        updatedArticles.push(adminMockNews[articleIndex]);
      }
    });

    const response: ApiResponse<{
      updatedCount: number;
      updatedArticles: NewsArticle[];
    }> = {
      success: true,
      data: {
        updatedCount: updatedArticles.length,
        updatedArticles,
      },
      message: `成功更新 ${updatedArticles.length} 条新闻状态`,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "批量更新新闻状态失败",
    });
  }
};

// 获取单篇新闻详情 (管理后台)
export const getAdminNewsById: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const article = adminMockNews.find((news) => news.id === id);

    if (!article) {
      return res.status(404).json({
        success: false,
        error: "新闻不存在",
      });
    }

    const response: ApiResponse<NewsArticle> = {
      success: true,
      data: article,
      message: "获取新闻详情成功",
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "获取新闻详情失败",
    });
  }
};
