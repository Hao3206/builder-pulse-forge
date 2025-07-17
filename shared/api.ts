/**
 * Shared code between client and server
 * API types and interfaces for the carbon trading platform
 */

// 基础响应类型
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// 用户相关类型
export interface User {
  id: string;
  name: string;
  email: string;
  company?: string;
  role: "admin" | "user" | "manager";
  avatar?: string;
  createdAt: string;
}

// 碳交易相关类型
export interface CarbonCredit {
  id: string;
  type: "CCER" | "VCS" | "GS" | "CDM";
  name: string;
  description: string;
  price: number;
  quantity: number;
  unit: "tCO2e";
  vintage: number; // 年份
  status: "available" | "pending" | "retired";
  project: CarbonProject;
  createdAt: string;
  updatedAt: string;
}

export interface CarbonProject {
  id: string;
  name: string;
  type: string;
  location: string;
  methodology: string;
  developer: string;
  status: "active" | "completed" | "pending";
  description: string;
  images?: string[];
}

// 碳足迹相关类型
export interface CarbonFootprint {
  id: string;
  userId: string;
  entityType: "individual" | "company" | "product";
  entityName: string;
  totalEmissions: number;
  unit: "tCO2e";
  period: {
    start: string;
    end: string;
  };
  breakdown: EmissionCategory[];
  createdAt: string;
}

export interface EmissionCategory {
  category: string;
  subcategory?: string;
  amount: number;
  unit: "tCO2e";
  percentage: number;
}

// 解决方案相关类型
export interface Solution {
  id: string;
  title: string;
  description: string;
  category:
    | "zero-carbon-park"
    | "carbon-accounting"
    | "carbon-monitoring"
    | "energy-management"
    | "low-carbon-platform";
  features: string[];
  benefits: string[];
  caseStudies?: CaseStudy[];
  pricing?: PricingTier[];
  status: "active" | "beta" | "coming-soon";
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  description: string;
  results: string[];
  images?: string[];
  completedAt: string;
}

export interface PricingTier {
  name: string;
  price: number;
  currency: "CNY";
  period: "month" | "year";
  features: string[];
  popular?: boolean;
}

// 新闻资讯类型
export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: "policy" | "news" | "company" | "announcement";
  author: string;
  publishedAt: string;
  updatedAt: string;
  featured: boolean;
  image?: string;
  tags: string[];
  readTime: number; // 分钟
}

// 培训服务类型
export interface TrainingCourse {
  id: string;
  title: string;
  description: string;
  type: "carbon-trader" | "carbon-manager" | "seminar" | "custom" | "executive";
  duration: number; // 天数
  capacity: number;
  instructor: string;
  price: number;
  currency: "CNY";
  schedule: CourseSchedule[];
  status: "open" | "full" | "completed" | "cancelled";
  certificate: boolean;
}

export interface CourseSchedule {
  id: string;
  startDate: string;
  endDate: string;
  location: string;
  registeredCount: number;
  status: "upcoming" | "ongoing" | "completed";
}

// API请求类型
export interface CreateCarbonFootprintRequest {
  entityType: "individual" | "company" | "product";
  entityName: string;
  period: {
    start: string;
    end: string;
  };
  emissions: {
    category: string;
    subcategory?: string;
    amount: number;
  }[];
}

export interface UpdateUserRequest {
  name?: string;
  company?: string;
  avatar?: string;
}

export interface CreateNewsRequest {
  title: string;
  summary: string;
  content: string;
  category: "policy" | "news" | "company" | "announcement";
  featured?: boolean;
  image?: string;
  tags?: string[];
}

// API路径常量
export const API_ENDPOINTS = {
  // 用户相关
  USER_PROFILE: "/api/user/profile",
  UPDATE_USER: "/api/user/update",

  // 碳交易相关
  CARBON_CREDITS: "/api/carbon/credits",
  CARBON_PROJECTS: "/api/carbon/projects",

  // 碳足迹相关
  CARBON_FOOTPRINT: "/api/carbon/footprint",
  CREATE_FOOTPRINT: "/api/carbon/footprint/create",

  // 解决方案相关
  SOLUTIONS: "/api/solutions",
  CASE_STUDIES: "/api/solutions/cases",

  // 新闻资讯
  NEWS: "/api/news",
  NEWS_FEATURED: "/api/news/featured",

  // 培训服务
  TRAINING_COURSES: "/api/training/courses",
  COURSE_REGISTRATION: "/api/training/register",

  // 其他
  PING: "/api/ping",
  DEMO: "/api/demo",
} as const;

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}
