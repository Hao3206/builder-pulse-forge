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
          "部署覆盖全园区的智能电网和能源监测系统，实现能源使用的实��监控和优化调度。",
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
    title: "大���制造企业碳中和管理平台建设",
    description:
      "为某大型制造企业搭建完整的碳排放监测、核算与管理平台，实现数据统一口径、可审计与降本增效，支撑集团碳中和路线落地。",
    image:
      "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&h=600&fit=crop",
    heroImage:
      "https://images.unsplash.com/photo-1581093588401-16bcb8d6ff83?w=1920&h=1080&fit=crop",
    tags: ["制造业", "碳中和", "数字化管理"],
    date: "2024-11",
    location: "江苏苏州",
    client: "某大型制造企业集团",
    duration: "12个月",
    projectScale: "两大生产基地，年产能超100万件设备，覆盖冲压/焊接/涂装/总装等核心工序",
    challenges: [
      "多工厂多系统数据割裂，缺乏统一数据口径与证据留痕",
      "排放因子来源分散，结果一致性与可审计性不足",
      "生产过程高能耗与余热未利用，能效提升空间大",
      "绿电比例低，峰谷电价波动导致用能成本偏高",
    ],
    solutions: [
      {
        title: "统一碳数据治理与口径体系",
        description:
          "构建集团级数据标准与口径手册，建立证据留痕机制与抽样核验流程，保障可��计性。",
        image:
          "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=600&fit=crop",
      },
      {
        title: "碳核算与排放监测一体化平台",
        description:
          "打通ERP/MES/能管/计量等系统，自动采集活动数据与计量数据，按ISO 14064/GB标准完成组织层面核算。",
        image:
          "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=800&h=600&fit=crop",
      },
      {
        title: "工艺节能改造与余热回收",
        description:
          "针对涂装与加热工序实施换热回收与变频改造，优化工艺参数，显著降低单位产品能耗。",
        image:
          "https://images.unsplash.com/photo-1481330744575-8fe8a3d0f6df?w=800&h=600&fit=crop",
      },
      {
        title: "绿电采购与用能优化",
        description:
          "引入绿电直购与自建分布式光伏，提高可再生能源占比；结合峰谷电价策略优化生产排程。",
        image:
          "https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=800&h=600&fit=crop",
      },
      {
        title: "CCER 项目识别与收益管理",
        description:
          "识别余热利用与光伏发电等减排项目的CCER开发��力，评估减排量与收益路径。",
        image:
          "https://images.unsplash.com/photo-1581090463529-c2653f5f36b9?w=800&h=600&fit=crop",
      },
    ],
    timeline: [
      { phase: "诊断与立项", period: "2024.01-2024.02", description: "完成差距诊断、路线规划与预算评审" },
      { phase: "数据治理与平台建设", period: "2024.03-2024.06", description: "制定口径标准，搭建数据采集与核算平台" },
      { phase: "工艺改造与绿电接入", period: "2024.07-2024.10", description: "实施节能改造与绿电采购，联调平台与报表" },
      { phase: "验证与运营", period: "2024.11-至今", description: "第三方验证通过，进入持续运营与优化阶段" },
    ],
    testimonial: {
      content:
        "项目让我们的碳数据实现了可追溯、可审计，工艺改造与绿电策略也带来了显著降本效果，为集团碳中和目标奠定了坚实基础。",
      author: "王总",
      position: "制造集团信息化负责人",
    },
    images: [
      "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1481330744575-8fe8a3d0f6df?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=600&fit=crop",
    ],
    results: {
      carbonReduction: "45%",
      energySaving: "35%",
      costSaving: "25%",
      renewableEnergy: "40%",
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
    title: "工业园区碳资产开���与交易项目",
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
