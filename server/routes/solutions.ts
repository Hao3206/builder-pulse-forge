import { RequestHandler } from "express";
import { ApiResponse, Solution, CaseStudy } from "@shared/api";

// 模拟解决方案数据
const mockSolutions: Solution[] = [
  {
    id: "1",
    title: "零碳园区解决方案",
    description:
      "零碳园区解决方案通过综合能源管理、智能监测和碳排放优化，助力园区实现碳中和目标。我们提供从规划设计到运营管理的全生命周期服务，包括可再生能源配置、储能系统、智慧用能管控等关键技术，为园区构建绿色低碳的可持续发展生态。",
    category: "zero-carbon-park",
    features: [
      "综合能源管理系统",
      "智能碳排放监测",
      "可再生能源配置",
      "储能系统集成",
      "智慧用能管控",
      "碳中和路径规划",
    ],
    benefits: [
      "降低园区碳排放强度60%以上",
      "提升能源利用效率30%",
      "减少能源成本25%",
      "实现园区碳中和目标",
      "提升园区竞争力和品牌价值",
    ],
    pricing: [
      {
        name: "基础版",
        price: 100000,
        currency: "CNY",
        period: "year",
        features: [
          "碳排放监测",
          "能源管理基础功能",
          "月度碳排放报告",
          "在线技术支持",
        ],
      },
      {
        name: "专业版",
        price: 300000,
        currency: "CNY",
        period: "year",
        features: [
          "全部基础版功能",
          "智能预测分析",
          "碳中和路径规划",
          "定制化咨询服务",
          "现场技术支持",
        ],
        popular: true,
      },
      {
        name: "企业版",
        price: 800000,
        currency: "CNY",
        period: "year",
        features: [
          "全部专业版功能",
          "多园区统一管理",
          "API接口集成",
          "专属客户经理",
          "7x24小时支持",
        ],
      },
    ],
    status: "active",
  },
  {
    id: "2",
    title: "碳核算与碳足迹追踪系统",
    description:
      "提供精确的碳排放计算和全生命周期碳足迹追踪服务。通过先进的监测技术和数据分析，帮助企业建立完整的碳排放账本，实现碳数据的透明化管理。支持多种核算标准，满足不同行业和监管要求。",
    category: "carbon-accounting",
    features: [
      "多标准碳核算",
      "全生命周期分析",
      "实时数据采集",
      "智能碳足迹追踪",
      "第三方认证支持",
      "合规报告生成",
    ],
    benefits: [
      "提升碳数据准确性95%以上",
      "减少人工核算工作量80%",
      "支持多种国际标准",
      "简化合规报告流程",
      "提供决策数据支持",
    ],
    status: "active",
  },
  {
    id: "3",
    title: "智能双碳监测平台",
    description:
      "基于物联网和大数据技术的智能监测平台，实时监控企业碳排放和碳吸收情况。提供24小时连续监测、预警提醒、趋势分析等功能，助力企业实现精准的双碳管理和决策支持。",
    category: "carbon-monitoring",
    features: [
      "24小时实时监测",
      "智能预警系统",
      "大数据分析",
      "物联网集成",
      "移动端管理",
      "第三方系统集成",
    ],
    benefits: [
      "实现碳排放实时监控",
      "提前发现异常情况",
      "优化减排策略",
      "提升管理效率",
      "支持科学决策",
    ],
    status: "active",
  },
  {
    id: "4",
    title: "一体化能碳管理系统",
    description:
      "集成能源管理和碳管理的一体化解决方案，通过优化能源结构、提升能效水平、管控碳排放，实现能源和碳排放的协同管理。提供能耗分析、碳排放预测、减排策略制定等专业服务。",
    category: "energy-management",
    features: [
      "能源消耗监测",
      "碳排放计算",
      "能效优化建议",
      "减排策略制定",
      "成本效益分析",
      "智能调度控制",
    ],
    benefits: [
      "降低能源成本20-30%",
      "提升能源利用效率",
      "实现能碳协同管理",
      "优化设备运行",
      "支持绿色认证",
    ],
    status: "active",
  },
  {
    id: "5",
    title: "低碳生活消费服务平台",
    description:
      "面向消费者的低碳生活服务平台，通过碳积分、绿色购物、低碳出行等方式，鼓励公众参与低碳生活。平台整合各类低碳产品和服务，为用户提供便捷的绿色消费体验，推动全社会低碳转型。",
    category: "low-carbon-platform",
    features: [
      "碳积分体系",
      "绿色产品商城",
      "低碳出行服务",
      "个人碳足迹",
      "社区互动",
      "环保教育",
    ],
    benefits: [
      "激励用户参与低碳行为",
      "提升环保意识",
      "创建绿色生活方式",
      "建立低碳社区",
      "推动消费转型",
    ],
    status: "beta",
  },
];

// 模拟案例研究数据
const mockCaseStudies: CaseStudy[] = [
  {
    id: "1",
    title: "宁波某大型制造企业零碳工厂改造项目",
    client: "宁波制造集团",
    industry: "机械制造",
    description:
      "为宁波某大型制造企业打造零碳工厂，通过能源结构优化、生产工艺改进、智能管理系统部署等综合措施，成功实现工厂碳中和目标。",
    results: [
      "碳排放量降低85%，年减排量达到15,000吨CO2e",
      "能源成本下降30%，年节约成本500万元",
      "获得国家级绿色工厂认证",
      "成为行业零碳工厂示范案例",
      "员工环保意识大幅提升",
    ],
    images: [
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1562408590-e32931084e23?w=800&h=400&fit=crop",
    ],
    completedAt: "2023-12-15T00:00:00Z",
  },
  {
    id: "2",
    title: "杭州科技园区智慧碳管理平台建设",
    client: "杭州高新技术产业开发区",
    industry: "科技园区",
    description:
      "为杭州科技园区建设智慧碳管理平台，整合园区内100多家企业的碳排放数据，实现园区级别的碳监测、分析和管理。",
    results: [
      "覆盖园区120家企业，监测面积达800万平方米",
      "园区整体碳排放强度下降45%",
      "建立完善的碳数据管理体系",
      "获得省级低碳园区示范称号",
      "吸引15家绿色科技企业入驻",
    ],
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=400&fit=crop",
    ],
    completedAt: "2023-10-20T00:00:00Z",
  },
  {
    id: "3",
    title: "温州市碳普惠平台建设项目",
    client: "温州市生态环境局",
    industry: "政府公共服务",
    description:
      "协助温州市建设碳普惠平台，鼓励市民参与低碳行为，通过积分奖励机制推动全社会低碳转型。",
    results: [
      "平台注册用户超过50万人",
      "累计���排量达到80,000吨CO2e",
      "发放碳积分1.2亿分",
      "合作商户超过3,000家",
      "成为全国碳普惠平台标杆案例",
    ],
    images: [
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=400&fit=crop",
    ],
    completedAt: "2023-08-30T00:00:00Z",
  },
];

// 获取解决方案列表
export const getSolutions: RequestHandler = (req, res) => {
  try {
    const { category, status } = req.query;

    let filteredSolutions = [...mockSolutions];

    // 按分类筛选
    if (category) {
      filteredSolutions = filteredSolutions.filter(
        (solution) => solution.category === category,
      );
    }

    // 按状态筛选
    if (status) {
      filteredSolutions = filteredSolutions.filter(
        (solution) => solution.status === status,
      );
    }

    const response: ApiResponse<Solution[]> = {
      success: true,
      data: filteredSolutions,
      message: `找到 ${filteredSolutions.length} 个解决方案`,
    };

    res.status(200).json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: "获取解决方案失败",
    };
    res.status(500).json(response);
  }
};

// 获取单个解决方案详情
export const getSolutionById: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const solution = mockSolutions.find((sol) => sol.id === id);

    if (!solution) {
      const response: ApiResponse = {
        success: false,
        error: "解决方案不存在",
      };
      return res.status(404).json(response);
    }

    // 添加相关案例研究
    const relatedCases = mockCaseStudies.filter((caseStudy) => {
      // 简单的关联逻辑，实际项目中可以更复杂
      if (solution.category === "zero-carbon-park") {
        return (
          caseStudy.industry.includes("制造") ||
          caseStudy.industry.includes("园区")
        );
      }
      return true;
    });

    const solutionWithCases = {
      ...solution,
      caseStudies: relatedCases,
    };

    const response: ApiResponse<Solution> = {
      success: true,
      data: solutionWithCases,
      message: "获取解决方案详情成功",
    };

    res.status(200).json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: "获取解决方案详情失败",
    };
    res.status(500).json(response);
  }
};

// 获取案例研究列表
export const getCaseStudies: RequestHandler = (req, res) => {
  try {
    const { industry, client } = req.query;

    let filteredCases = [...mockCaseStudies];

    // 按行业筛选
    if (industry) {
      filteredCases = filteredCases.filter((caseStudy) =>
        caseStudy.industry
          .toLowerCase()
          .includes(String(industry).toLowerCase()),
      );
    }

    // 按客户筛选
    if (client) {
      filteredCases = filteredCases.filter((caseStudy) =>
        caseStudy.client.toLowerCase().includes(String(client).toLowerCase()),
      );
    }

    const response: ApiResponse<CaseStudy[]> = {
      success: true,
      data: filteredCases,
      message: `找到 ${filteredCases.length} 个案例研究`,
    };

    res.status(200).json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: "获取案例研究失败",
    };
    res.status(500).json(response);
  }
};

// 获取案例研究详情
export const getCaseStudyById: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const caseStudy = mockCaseStudies.find((case_) => case_.id === id);

    if (!caseStudy) {
      const response: ApiResponse = {
        success: false,
        error: "案例研究不存在",
      };
      return res.status(404).json(response);
    }

    const response: ApiResponse<CaseStudy> = {
      success: true,
      data: caseStudy,
      message: "获取案例研究详情成功",
    };

    res.status(200).json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: "获取案例研究详情失败",
    };
    res.status(500).json(response);
  }
};

// 获取解决方案统计数据
export const getSolutionsStats: RequestHandler = (req, res) => {
  try {
    const stats = {
      total: mockSolutions.length,
      byCategory: {
        "zero-carbon-park": mockSolutions.filter(
          (sol) => sol.category === "zero-carbon-park",
        ).length,
        "carbon-accounting": mockSolutions.filter(
          (sol) => sol.category === "carbon-accounting",
        ).length,
        "carbon-monitoring": mockSolutions.filter(
          (sol) => sol.category === "carbon-monitoring",
        ).length,
        "energy-management": mockSolutions.filter(
          (sol) => sol.category === "energy-management",
        ).length,
        "low-carbon-platform": mockSolutions.filter(
          (sol) => sol.category === "low-carbon-platform",
        ).length,
      },
      byStatus: {
        active: mockSolutions.filter((sol) => sol.status === "active").length,
        beta: mockSolutions.filter((sol) => sol.status === "beta").length,
        "coming-soon": mockSolutions.filter(
          (sol) => sol.status === "coming-soon",
        ).length,
      },
      totalCases: mockCaseStudies.length,
    };

    const response: ApiResponse<typeof stats> = {
      success: true,
      data: stats,
      message: "解决方案统计数据获取成功",
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
