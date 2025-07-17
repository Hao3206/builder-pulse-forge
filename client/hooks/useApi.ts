import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  carbonService,
  newsService,
  solutionsService,
  commonService,
  withErrorHandling,
} from "../services/api";
import {
  CarbonCredit,
  CarbonProject,
  CarbonFootprint,
  CreateCarbonFootprintRequest,
  NewsArticle,
  CreateNewsRequest,
  Solution,
  CaseStudy,
} from "@shared/api";

// React Query 配置
export const queryKeys = {
  carbonCredits: (filters?: any) => ["carbonCredits", filters],
  carbonProjects: () => ["carbonProjects"],
  carbonFootprint: (userId: string) => ["carbonFootprint", userId],
  carbonFootprintStats: () => ["carbonFootprintStats"],
  news: (params?: any) => ["news", params],
  newsById: (id: string) => ["news", id],
  featuredNews: () => ["featuredNews"],
  newsStats: () => ["newsStats"],
  solutions: (filters?: any) => ["solutions", filters],
  solutionById: (id: string) => ["solutions", id],
  caseStudies: (filters?: any) => ["caseStudies", filters],
  caseStudyById: (id: string) => ["caseStudies", id],
  solutionsStats: () => ["solutionsStats"],
} as const;

// 碳交易相关hooks
export const useCarbonCredits = (filters?: {
  type?: string;
  status?: string;
  minPrice?: number;
  maxPrice?: number;
}) => {
  return useQuery({
    queryKey: queryKeys.carbonCredits(filters),
    queryFn: () =>
      withErrorHandling(() => carbonService.getCarbonCredits(filters)),
    staleTime: 5 * 60 * 1000, // 5分钟
    gcTime: 10 * 60 * 1000, // 10分钟
  });
};

export const useCarbonProjects = () => {
  return useQuery({
    queryKey: queryKeys.carbonProjects(),
    queryFn: () => withErrorHandling(() => carbonService.getCarbonProjects()),
    staleTime: 10 * 60 * 1000, // 10分钟
  });
};

export const useCarbonFootprint = (userId: string) => {
  return useQuery({
    queryKey: queryKeys.carbonFootprint(userId),
    queryFn: () =>
      withErrorHandling(() => carbonService.getCarbonFootprint(userId)),
    enabled: !!userId,
    staleTime: 2 * 60 * 1000, // 2分钟
  });
};

export const useCarbonFootprintStats = () => {
  return useQuery({
    queryKey: queryKeys.carbonFootprintStats(),
    queryFn: () =>
      withErrorHandling(() => carbonService.getCarbonFootprintStats()),
    staleTime: 5 * 60 * 1000, // 5分钟
  });
};

export const useCreateCarbonFootprint = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCarbonFootprintRequest) =>
      withErrorHandling(() =>
        carbonService.createCarbonFootprint(userId, data),
      ),
    onSuccess: () => {
      // 更新相关查询
      queryClient.invalidateQueries({
        queryKey: queryKeys.carbonFootprint(userId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.carbonFootprintStats(),
      });
    },
  });
};

// 新闻资讯相关hooks
export const useNews = (params?: {
  category?: string;
  featured?: boolean;
  page?: number;
  limit?: number;
  search?: string;
}) => {
  return useQuery({
    queryKey: queryKeys.news(params),
    queryFn: () => withErrorHandling(() => newsService.getNews(params)),
    staleTime: 3 * 60 * 1000, // 3分钟
    retry: (failureCount, error) => {
      // 网络错误重试3次，其他错误不重试
      if (error?.message?.includes("Failed to fetch")) {
        return failureCount < 3;
      }
      return false;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useNewsById = (id: string) => {
  return useQuery({
    queryKey: queryKeys.newsById(id),
    queryFn: () => withErrorHandling(() => newsService.getNewsById(id)),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5分钟
  });
};

export const useFeaturedNews = () => {
  return useQuery({
    queryKey: queryKeys.featuredNews(),
    queryFn: () => withErrorHandling(() => newsService.getFeaturedNews()),
    staleTime: 5 * 60 * 1000, // 5分钟
    retry: (failureCount, error) => {
      // 网络错误重试3次，其他错误不重试
      if (error?.message?.includes("Failed to fetch")) {
        return failureCount < 3;
      }
      return false;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useNewsStats = () => {
  return useQuery({
    queryKey: queryKeys.newsStats(),
    queryFn: () => withErrorHandling(() => newsService.getNewsStats()),
    staleTime: 10 * 60 * 1000, // 10分钟
  });
};

export const useCreateNews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateNewsRequest) =>
      withErrorHandling(() => newsService.createNews(data)),
    onSuccess: () => {
      // 更新相关查询
      queryClient.invalidateQueries({ queryKey: ["news"] });
      queryClient.invalidateQueries({ queryKey: queryKeys.featuredNews() });
      queryClient.invalidateQueries({ queryKey: queryKeys.newsStats() });
    },
  });
};

// 解决方案相关hooks
export const useSolutions = (filters?: {
  category?: string;
  status?: string;
}) => {
  return useQuery({
    queryKey: queryKeys.solutions(filters),
    queryFn: () =>
      withErrorHandling(() => solutionsService.getSolutions(filters)),
    staleTime: 10 * 60 * 1000, // 10分钟
  });
};

export const useSolutionById = (id: string) => {
  return useQuery({
    queryKey: queryKeys.solutionById(id),
    queryFn: () =>
      withErrorHandling(() => solutionsService.getSolutionById(id)),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10分钟
  });
};

export const useCaseStudies = (filters?: {
  industry?: string;
  client?: string;
}) => {
  return useQuery({
    queryKey: queryKeys.caseStudies(filters),
    queryFn: () =>
      withErrorHandling(() => solutionsService.getCaseStudies(filters)),
    staleTime: 10 * 60 * 1000, // 10分钟
  });
};

export const useCaseStudyById = (id: string) => {
  return useQuery({
    queryKey: queryKeys.caseStudyById(id),
    queryFn: () =>
      withErrorHandling(() => solutionsService.getCaseStudyById(id)),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10分钟
  });
};

export const useSolutionsStats = () => {
  return useQuery({
    queryKey: queryKeys.solutionsStats(),
    queryFn: () =>
      withErrorHandling(() => solutionsService.getSolutionsStats()),
    staleTime: 15 * 60 * 1000, // 15分钟
  });
};

// 通用hooks
export const usePing = () => {
  return useQuery({
    queryKey: ["ping"],
    queryFn: () => withErrorHandling(() => commonService.ping()),
    refetchInterval: 30 * 1000, // 30秒自动刷新
    staleTime: 0, // 立即过期，确保实时性
  });
};

// 自定义hook用于批量预取数据
export const usePrefetchHomeData = () => {
  const queryClient = useQueryClient();

  const prefetchData = async () => {
    // 预取首页需要的数据
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: queryKeys.featuredNews(),
        queryFn: () => newsService.getFeaturedNews(),
        staleTime: 5 * 60 * 1000,
      }),
      queryClient.prefetchQuery({
        queryKey: queryKeys.solutions({ status: "active" }),
        queryFn: () => solutionsService.getSolutions({ status: "active" }),
        staleTime: 10 * 60 * 1000,
      }),
      queryClient.prefetchQuery({
        queryKey: queryKeys.carbonCredits({ status: "available" }),
        queryFn: () => carbonService.getCarbonCredits({ status: "available" }),
        staleTime: 5 * 60 * 1000,
      }),
    ]);
  };

  return { prefetchData };
};

// Error boundary helper
export const useApiError = () => {
  return {
    isNetworkError: (error: any) => {
      return (
        error?.message?.includes("Failed to fetch") ||
        error?.message?.includes("Network Error")
      );
    },
    isServerError: (error: any) => {
      return error?.status >= 500;
    },
    isClientError: (error: any) => {
      return error?.status >= 400 && error?.status < 500;
    },
  };
};
