import { RequestHandler } from "express";
import {
  ApiResponse,
  CarbonCredit,
  CarbonProject,
  CarbonFootprint,
  CreateCarbonFootprintRequest,
} from "@shared/api";

// 模拟数据库数据
const mockCarbonCredits: CarbonCredit[] = [
  {
    id: "1",
    type: "CCER",
    name: "浙江省森林碳汇项目",
    description: "浙江省丽水市森林保护与增汇项目，通过森林保护和管理实现碳减排",
    price: 45.5,
    quantity: 10000,
    unit: "tCO2e",
    vintage: 2023,
    status: "available",
    project: {
      id: "proj_1",
      name: "丽水森林碳汇项目",
      type: "森林碳汇",
      location: "浙江省丽水市",
      methodology: "AR-CM-001-v1.0",
      developer: "浙东环境能源交易所",
      status: "active",
      description:
        "通过科学的森林管理和保护措施，增加森林碳储量，实现碳减排效益。",
    },
    createdAt: "2024-01-15T08:00:00Z",
    updatedAt: "2024-01-20T10:30:00Z",
  },
  {
    id: "2",
    type: "CCER",
    name: "宁波垃圾焚烧发电项目",
    description: "宁波市生活垃圾焚烧发电项目，通过替代化石燃料发电实现碳减排",
    price: 52.0,
    quantity: 25000,
    unit: "tCO2e",
    vintage: 2023,
    status: "available",
    project: {
      id: "proj_2",
      name: "宁波垃圾焚烧发电项目",
      type: "垃圾焚烧发电",
      location: "浙江省宁波市",
      methodology: "AMS-III.E-v2.1",
      developer: "宁波环保能源有限公司",
      status: "active",
      description: "利用生活垃圾焚烧发电，替代部分火力发电，减少温室气体排放。",
    },
    createdAt: "2024-01-10T09:15:00Z",
    updatedAt: "2024-01-22T14:20:00Z",
  },
];

const mockFootprints: CarbonFootprint[] = [
  {
    id: "1",
    userId: "user_1",
    entityType: "company",
    entityName: "浙江某制造企业",
    totalEmissions: 1250.5,
    unit: "tCO2e",
    period: {
      start: "2023-01-01",
      end: "2023-12-31",
    },
    breakdown: [
      {
        category: "能源消耗",
        subcategory: "电力",
        amount: 680.2,
        unit: "tCO2e",
        percentage: 54.4,
      },
      {
        category: "能源消耗",
        subcategory: "天然气",
        amount: 320.8,
        unit: "tCO2e",
        percentage: 25.7,
      },
      {
        category: "交通运输",
        amount: 149.3,
        unit: "tCO2e",
        percentage: 11.9,
      },
      {
        category: "工业过程",
        amount: 100.2,
        unit: "tCO2e",
        percentage: 8.0,
      },
    ],
    createdAt: "2024-01-25T10:00:00Z",
  },
];

// 获取碳信用额度列表
export const getCarbonCredits: RequestHandler = (req, res) => {
  try {
    const { type, status, minPrice, maxPrice } = req.query;

    let filteredCredits = [...mockCarbonCredits];

    // 按类型筛选
    if (type) {
      filteredCredits = filteredCredits.filter(
        (credit) => credit.type === type,
      );
    }

    // 按状态筛选
    if (status) {
      filteredCredits = filteredCredits.filter(
        (credit) => credit.status === status,
      );
    }

    // 按价格筛选
    if (minPrice) {
      filteredCredits = filteredCredits.filter(
        (credit) => credit.price >= Number(minPrice),
      );
    }
    if (maxPrice) {
      filteredCredits = filteredCredits.filter(
        (credit) => credit.price <= Number(maxPrice),
      );
    }

    const response: ApiResponse<CarbonCredit[]> = {
      success: true,
      data: filteredCredits,
      message: `找到 ${filteredCredits.length} 个碳信用额度`,
    };

    res.status(200).json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: "获取碳信用额度失败",
    };
    res.status(500).json(response);
  }
};

// 获取碳项目列表
export const getCarbonProjects: RequestHandler = (req, res) => {
  try {
    const projects = mockCarbonCredits.map((credit) => credit.project);

    const response: ApiResponse<CarbonProject[]> = {
      success: true,
      data: projects,
      message: `找到 ${projects.length} 个碳项目`,
    };

    res.status(200).json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: "获取碳项目失败",
    };
    res.status(500).json(response);
  }
};

// 获取碳足迹数据
export const getCarbonFootprint: RequestHandler = (req, res) => {
  try {
    const { userId } = req.params;

    const userFootprints = mockFootprints.filter(
      (footprint) => footprint.userId === userId,
    );

    const response: ApiResponse<CarbonFootprint[]> = {
      success: true,
      data: userFootprints,
      message: `找到 ${userFootprints.length} 条碳足迹记录`,
    };

    res.status(200).json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: "获取碳足迹数据失败",
    };
    res.status(500).json(response);
  }
};

// 创建碳足迹记录
export const createCarbonFootprint: RequestHandler = (req, res) => {
  try {
    const { userId } = req.params;
    const footprintData: CreateCarbonFootprintRequest = req.body;

    // 计算总排放量
    const totalEmissions = footprintData.emissions.reduce(
      (sum, emission) => sum + emission.amount,
      0,
    );

    // 计算分类占比
    const breakdown = footprintData.emissions.map((emission) => ({
      category: emission.category,
      subcategory: emission.subcategory,
      amount: emission.amount,
      unit: "tCO2e" as const,
      percentage: (emission.amount / totalEmissions) * 100,
    }));

    const newFootprint: CarbonFootprint = {
      id: `footprint_${Date.now()}`,
      userId,
      entityType: footprintData.entityType,
      entityName: footprintData.entityName,
      totalEmissions,
      unit: "tCO2e",
      period: footprintData.period,
      breakdown,
      createdAt: new Date().toISOString(),
    };

    // 模拟保存到数据库
    mockFootprints.push(newFootprint);

    const response: ApiResponse<CarbonFootprint> = {
      success: true,
      data: newFootprint,
      message: "碳足迹记录创建成功",
    };

    res.status(201).json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: "创建碳足迹记录失败",
    };
    res.status(500).json(response);
  }
};

// 获取碳足迹统计数据
export const getCarbonFootprintStats: RequestHandler = (req, res) => {
  try {
    const totalFootprints = mockFootprints.length;
    const totalEmissions = mockFootprints.reduce(
      (sum, footprint) => sum + footprint.totalEmissions,
      0,
    );

    const avgEmissions =
      totalFootprints > 0 ? totalEmissions / totalFootprints : 0;

    const stats = {
      totalFootprints,
      totalEmissions,
      avgEmissions,
      byEntityType: {
        company: mockFootprints.filter((f) => f.entityType === "company")
          .length,
        individual: mockFootprints.filter((f) => f.entityType === "individual")
          .length,
        product: mockFootprints.filter((f) => f.entityType === "product")
          .length,
      },
    };

    const response: ApiResponse<typeof stats> = {
      success: true,
      data: stats,
      message: "碳足迹统计数据获取成功",
    };

    res.status(200).json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: "获取统计数据失败",
    };
    res.status(500).json(response);
  }
};
