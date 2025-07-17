import {
  ApiResponse,
  CarbonCredit,
  CarbonProject,
  CarbonFootprint,
  CreateCarbonFootprintRequest,
  NewsArticle,
  CreateNewsRequest,
  Solution,
  CaseStudy,
  API_ENDPOINTS,
} from "@shared/api";

// API基础配置
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.PROD ? window.location.origin : "http://localhost:8080");

// HTTP客户端类
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error("API请求失败:", error);
      throw error;
    }
  }

  // GET请求
  async get<T>(
    endpoint: string,
    params?: Record<string, any>,
  ): Promise<ApiResponse<T>> {
    const searchParams = params ? new URLSearchParams(params).toString() : "";
    const url = searchParams ? `${endpoint}?${searchParams}` : endpoint;
    return this.request<T>(url);
  }

  // POST请求
  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // PUT请求
  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // DELETE请求
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "DELETE",
    });
  }
}

// 创建API客户端实例
const apiClient = new ApiClient(API_BASE_URL);

// 碳交易��关API服务
export const carbonService = {
  // 获取碳信用额度列表
  async getCarbonCredits(filters?: {
    type?: string;
    status?: string;
    minPrice?: number;
    maxPrice?: number;
  }): Promise<CarbonCredit[]> {
    const response = await apiClient.get<CarbonCredit[]>(
      API_ENDPOINTS.CARBON_CREDITS,
      filters,
    );
    return response.data || [];
  },

  // 获取碳项目列表
  async getCarbonProjects(): Promise<CarbonProject[]> {
    const response = await apiClient.get<CarbonProject[]>(
      API_ENDPOINTS.CARBON_PROJECTS,
    );
    return response.data || [];
  },

  // 获取用户碳足迹
  async getCarbonFootprint(userId: string): Promise<CarbonFootprint[]> {
    const response = await apiClient.get<CarbonFootprint[]>(
      `/api/carbon/footprint/${userId}`,
    );
    return response.data || [];
  },

  // 创建碳足迹记录
  async createCarbonFootprint(
    userId: string,
    data: CreateCarbonFootprintRequest,
  ): Promise<CarbonFootprint> {
    const response = await apiClient.post<CarbonFootprint>(
      `/api/carbon/footprint/${userId}`,
      data,
    );
    return response.data!;
  },

  // 获取碳足迹统计数据
  async getCarbonFootprintStats(): Promise<any> {
    const response = await apiClient.get("/api/carbon/footprint/stats");
    return response.data;
  },
};

// 新闻资讯API服务
export const newsService = {
  // 获取新闻列表
  async getNews(params?: {
    category?: string;
    featured?: boolean;
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<{
    articles: NewsArticle[];
    pagination: {
      current: number;
      total: number;
      pages: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  }> {
    const response = await apiClient.get<{
      articles: NewsArticle[];
      pagination: any;
    }>(API_ENDPOINTS.NEWS, params);
    return response.data!;
  },

  // 获取单篇新闻
  async getNewsById(id: string): Promise<NewsArticle> {
    const response = await apiClient.get<NewsArticle>(`/api/news/${id}`);
    return response.data!;
  },

  // 获取精选新闻
  async getFeaturedNews(): Promise<NewsArticle[]> {
    const response = await apiClient.get<NewsArticle[]>(
      API_ENDPOINTS.NEWS_FEATURED,
    );
    return response.data || [];
  },

  // 创建新闻
  async createNews(data: CreateNewsRequest): Promise<NewsArticle> {
    const response = await apiClient.post<NewsArticle>(
      API_ENDPOINTS.NEWS,
      data,
    );
    return response.data!;
  },

  // 获取新闻统计
  async getNewsStats(): Promise<any> {
    const response = await apiClient.get("/api/news/stats");
    return response.data;
  },
};

// 解决方案API服务
export const solutionsService = {
  // 获取解决方案列表
  async getSolutions(filters?: {
    category?: string;
    status?: string;
  }): Promise<Solution[]> {
    const response = await apiClient.get<Solution[]>(
      API_ENDPOINTS.SOLUTIONS,
      filters,
    );
    return response.data || [];
  },

  // 获取解决方案详情
  async getSolutionById(id: string): Promise<Solution> {
    const response = await apiClient.get<Solution>(`/api/solutions/${id}`);
    return response.data!;
  },

  // 获取案例研究列表
  async getCaseStudies(filters?: {
    industry?: string;
    client?: string;
  }): Promise<CaseStudy[]> {
    const response = await apiClient.get<CaseStudy[]>(
      API_ENDPOINTS.CASE_STUDIES,
      filters,
    );
    return response.data || [];
  },

  // 获取案例研究详情
  async getCaseStudyById(id: string): Promise<CaseStudy> {
    const response = await apiClient.get<CaseStudy>(
      `/api/solutions/cases/${id}`,
    );
    return response.data!;
  },

  // 获取解决方案统计
  async getSolutionsStats(): Promise<any> {
    const response = await apiClient.get("/api/solutions/stats");
    return response.data;
  },
};

// 通用API服务
export const commonService = {
  // 健康检查
  async ping(): Promise<any> {
    const response = await apiClient.get(API_ENDPOINTS.PING);
    return response.data;
  },

  // 示例API
  async demo(): Promise<any> {
    const response = await apiClient.get(API_ENDPOINTS.DEMO);
    return response.data;
  },
};

// 导出默认API客户端
export default apiClient;

// 错误处理工具
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// API响应包装器
export const withErrorHandling = async <T>(
  apiCall: () => Promise<T>,
): Promise<T> => {
  try {
    return await apiCall();
  } catch (error) {
    if (error instanceof Error) {
      throw new ApiError(error.message);
    }
    throw new ApiError("未知错误");
  }
};
