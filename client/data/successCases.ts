export type CaseResults = {
  carbonReduction: string;
  energySaving: string;
  costSaving: string;
  renewableEnergy?: string;
};

export type CaseSolution = { title: string; description: string; image: string };
export type CaseTimeline = { phase: string; period: string; description: string };
export type CaseTestimonial = { content: string; author: string; position: string };

export type SuccessCase = {
  id: number;
  category: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  date: string;
  location: string;
  results: CaseResults;
  // optional extended fields for detail page
  heroImage?: string;
  client?: string;
  duration?: string;
  projectScale?: string;
  challenges?: string[];
  solutions?: CaseSolution[];
  timeline?: CaseTimeline[];
  testimonial?: CaseTestimonial;
  images?: string[];
};

export const successCases: SuccessCase[] = [
  {
    id: 1,
    category: "零碳园区",
    title: "某国际生态园区零碳转型示范项目",
    description:
      "通过综合能源管理系统和智慧碳管理平台，该园区实现了碳排放减少60%，成为行业标杆案例。",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
    tags: ["园区管理", "减排60%", "智慧监控"],
    date: "2024-12",
    location: "浙江宁波",
    results: {
      carbonReduction: "60%",
      energySaving: "45%",
      costSaving: "30%",
      renewableEnergy: "75%",
    },
    heroImage:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop",
    client: "某国际生态园区",
    duration: "18个月",
    projectScale: "占地500公顷，入驻企业150家",
    challenges: [
      "园区内企业众多，能源消���类型复杂多样",
      "缺乏统一的碳排放监测和管理系统",
      "传统能源结构导致碳排放量居高不下",
      "各企业间缺乏有效的节能减排协同机制",
    ],
    solutions: [
      {
        title: "智慧能源管理系统",
        description:
          "部署覆盖全园区的智能电网和能源监测系统，实现能源使用的实时监控和优化调度。",
        image:
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
      },
      {
        title: "碳排放监测平台",
        description:
          "建立统一的碳排放数据采集、分析和报告平台，为园区和企业提供精准的碳排放数据。",
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      },
      {
        title: "清洁能源改造",
        description:
          "大规模部署太阳能、风能等清洁能源设施，构建园区绿色能源供应体系。",
        image:
          "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&h=600&fit=crop",
      },
      {
        title: "数字孪生管理",
        description:
          "构建园区数字孪生模型，实现虚拟仿真和智能决策，提升管理效率。",
        image:
          "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop",
      },
    ],
    timeline: [
      {
        phase: "项目启动",
        period: "2023年6月 - 2023年8月",
        description: "完成项目调研、方案设计和合同签署",
      },
      {
        phase: "基础设施建设",
        period: "2023年9月 - 2024年3月",
        description: "部署智能电网、监测设备和清洁能源设施",
      },
      {
        phase: "系统集成测试",
        period: "2024年4月 - 2024年6月",
        description: "完成各系统集成、测试和优化调试",
      },
      {
        phase: "正式运营",
        period: "2024年7月至今",
        description: "系统正式投入运营，持续监测和优化",
      },
    ],
    testimonial: {
      content:
        "浙东能源环交所为我们提供了全方位的零碳转型解决方案，不仅实现了显著的减排效果，还为园区带来了可观的经济效益。他们的专业团队和先进技术让我们对未来的可持续发展充满信心。",
      author: "李总",
      position: "园区管理委员会主任",
    },
    images: [
      "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop",
    ],
  },
  {
    id: 2,
    category: "企业碳管理",
    title: "大型制造企业碳中和管理平台建设",
    description:
      "为某大型制造企业搭建完整的碳排放监测、核算和管理体系，助力企业实现碳中和目标。",
    image:
      "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&h=600&fit=crop",
    tags: ["制造业", "碳中和", "数字化管理"],
    date: "2024-11",
    location: "江苏苏州",
    results: {
      carbonReduction: "45%",
      energySaving: "35%",
      costSaving: "25%",
    },
  },
  {
    id: 3,
    category: "碳足迹核算",
    title: "消费品行业产品碳足迹评估项目",
    description:
      "为知名消费品牌建立完整的产品生命周期碳足迹评估体系，提升品牌ESG价值。",
    image:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop",
    tags: ["生命周期评估", "消费品", "ESG提升"],
    date: "2024-10",
    location: "上海",
    results: {
      carbonReduction: "30%",
      energySaving: "28%",
      costSaving: "20%",
    },
  },
  {
    id: 4,
    category: "ESG报告",
    title: "金融机构ESG信息披露体系构建",
    description:
      "协助大型银行建立符合国际标准的ESG信息披露体系，提升可持续发展治理水平。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop",
    tags: ["金融业", "信息披露", "国际标准"],
    date: "2024-09",
    location: "北京",
    results: {
      carbonReduction: "25%",
      energySaving: "22%",
      costSaving: "15%",
    },
  },
  {
    id: 5,
    category: "碳交易",
    title: "工业园区碳资产开发与交易项目",
    description:
      "帮助工业园区开发碳减排项目，成功完成碳信用交易，实现经济效益与环境效益双赢。",
    image:
      "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800&h=600&fit=crop",
    tags: ["碳资产", "碳交易", "经济效益"],
    date: "2024-08",
    location: "广东深圳",
    results: {
      carbonReduction: "55%",
      energySaving: "40%",
      costSaving: "35%",
    },
  },
  {
    id: 6,
    category: "零碳园区",
    title: "高科技产业园零碳智慧化改造",
    description:
      "运用数字孪生技术为高科技产业园打造智慧能源管理系统，实现园区运营零碳化。",
    image:
      "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&h=600&fit=crop",
    tags: ["数字孪生", "智慧能源", "零碳运营"],
    date: "2024-07",
    location: "深圳",
    results: {
      carbonReduction: "65%",
      energySaving: "50%",
      costSaving: "40%",
    },
  },
];
