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
        description: "完成项目调研���方案设计和合同签署",
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
          "构建集团级数据标准与口径手册，建立证据留痕机制与抽样核验流程，保障可审计性。",
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
          "识别余热利用与光伏发电等减排项目的CCER开发潜力，评估减排量与收益路径。",
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
      "为知名消费品牌建立完整的产品生命周期碳足迹评估体系，明确功能单位与系统边界，形成可审计的核算与披露材料，支持ESG价值提升与海外合规。",
    image:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop",
    heroImage:
      "https://images.unsplash.com/photo-1562158070-74b1b9b4d7d9?w=1920&h=1080&fit=crop",
    tags: ["生命周期评估", "消费品", "ISO 14067", "ESG提升"],
    date: "2024-10",
    location: "上海",
    client: "国内头部消费品牌",
    duration: "10个月",
    projectScale: "覆盖3大产品线、12个SKU，年产量超500万件，涉及包装、原料、装配与物流环节",
    challenges: [
      "SKU多、供应链长，活动��据采集口径不一致",
      "上游原料排放因子来源复杂，区域/年份差异影响结果稳定性",
      "海外披露要求差异较大，EPD/CFP验证资料准备难度高",
      "包装与物流阶段排放占比高，改进路径需兼顾成本与交付",
    ],
    solutions: [
      {
        title: "依据 ISO 14067 的LCA核算体系",
        description:
          "明确功能单位与系统边界（从摇篮到大门/到坟墓），构建数据质量评价与不确定性分析模型，确保结果可比与可验证。",
        image:
          "https://images.unsplash.com/photo-1581093588401-16bcb8d6ff83?w=800&h=600&fit=crop",
      },
      {
        title: "供应链数据打通与证据留痕",
        description:
          "对接供应商原料数据、能管与计量系统，建立留痕与抽样核验流程，统一口径并形成审计链路。",
        image:
          "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=600&fit=crop",
      },
      {
        title: "包装轻量化与再生材料替代",
        description:
          "优化包装结构与材质，用再生塑料/纸替代部分原生材料，保持强度与体验的同时降低单位产品碳排。",
        image:
          "https://images.unsplash.com/photo-1520975922203-bd7b00e3d8f8?w=800&h=600&fit=crop",
      },
      {
        title: "制造能效提升与绿电接入",
        description:
          "实施设备节能改造与工艺参数优化，引入绿电直购与光伏消纳，降低范围2排放强度。",
        image:
          "https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=800&h=600&fit=crop",
      },
      {
        title: "物流优化与低碳运输",
        description:
          "通过仓网优化与装载率提升，优先选择铁路/水运与新能源车辆，降低范围3物流排放。",
        image:
          "https://images.unsplash.com/photo-1542010589005-d1eacc3918f3?w=800&h=600&fit=crop",
      },
      {
        title: "海外披露与第三方验证",
        description:
          "按客户市场要求输出CFP报告与EPD，穿行测试资料并配合第三方验证机构完成核查。",
        image:
          "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=800&h=600&fit=crop",
      },
    ],
    timeline: [
      { phase: "项目启动与边界定义", period: "2024.01-2024.02", description: "确定功能单位、系统边界与关键排放阶段" },
      { phase: "数据采集与因子确认", period: "2024.03-2024.05", description: "采集活动数据、评估因子来源并开展DQI评估" },
      { phase: "核算与不确定性分析", period: "2024.06-2024.07", description: "完成核算建模与敏感性分析，提���减排策略" },
      { phase: "披露与验证", period: "2024.08-2024.10", description: "输出CFP/EPD报告并通过第三方验证" },
    ],
    testimonial: {
      content:
        "项目帮助我们建立了系统化的产品碳足迹核算能力，披露效率与数据说服力显著提升，为国际市场ESG沟通提供了坚实支撑。",
      author: "陈总",
      position: "品牌可持续发展负责人",
    },
    images: [
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1520975922203-bd7b00e3d8f8?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1542010589005-d1eacc3918f3?w=800&h=600&fit=crop",
    ],
    results: {
      carbonReduction: "30%",
      energySaving: "18%",
      costSaving: "12%",
      renewableEnergy: "35%",
    },
  },
  {
    id: 4,
    category: "ESG报告",
    title: "金融机构ESG信息披露体系构建",
    description:
      "协助大型商业银行建立与国际标准对齐的ESG信息披露体系，覆盖治理、环境与社会三大维度的指标框架、数据治理、流程与内外部披露，实现合规、可审计��价值沟通。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop",
    heroImage:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1920&h=1080&fit=crop",
    tags: ["金融业", "信息披露", "国际标准", "数据治理"],
    date: "2024-09",
    location: "北京",
    client: "国内领先商业银行",
    duration: "8个月",
    projectScale: "总部与两家分行试点，覆盖董事会/风险/合规/人资/运营等8个条线，50+披露指标",
    challenges: [
      "ESG指标口径不统一，跨条线数据口径与口径更新机制缺失",
      "披露框架与国际标准（如TCFD/ISSB/GRI）映射不清，治理与风险披露不足",
      "证据留痕薄弱，第三方核验准备成本高、效率低",
      "内部流程未形成年度闭环，披露与经营管理脱节",
    ],
    solutions: [
      {
        title: "披露框架对齐与指标库建设",
        description:
          "以ISSB/TCFD/GRI为基准构建指标体系与映射关系，明确指标归口、计算口径、更新频率与责任人。",
        image:
          "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop",
      },
      {
        title: "ESG数��治理与留痕机制",
        description:
          "建立数据血缘、证据留痕与抽样核验流程，形成自证材料包，提升可审计性与复用效率。",
        image:
          "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=800&h=600&fit=crop",
      },
      {
        title: "气候相关风险与机会披露（TCFD）",
        description:
          "识别气候物理/转型风险，建立情景分析与压力测试，完善治理、战略、风险管理与指标目标披露。",
        image:
          "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&h=600&fit=crop",
      },
      {
        title: "双重重要性评估与利益相关方沟通",
        description:
          "完成双重重要性评估与利益相关方访谈，形成矩阵与行动清单，指导披露重点与改进路径。",
        image:
          "https://images.unsplash.com/photo-1523958203904-cdcb402031fd?w=800&h=600&fit=crop",
      },
      {
        title: "年度披露流程与内控体系",
        description:
          "设计年度披露计划、内控与审阅流程，打通与风险管理/战略/合规条线的联动机制，形成闭环。",
        image:
          "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=800&h=600&fit=crop",
      },
    ],
    timeline: [
      { phase: "现状评估与规划", period: "2024.01-2024.02", description: "完成披露差距评估、路线图与预算评审" },
      { phase: "框架与指标库建设", period: "2024.03-2024.04", description: "搭建指标库与映射关系，明确责任与流程" },
      { phase: "数据治理与留痕", period: "2024.05-2024.06", description: "建立数据血缘、证据留痕与核验机制" },
      { phase: "披露稿撰写与审阅", period: "2024.07-2024.08", description: "输出披露文本、完成内外部审阅与修订" },
    ],
    testimonial: {
      content:
        "通过本次项目，我们实现了披露框架的系统化升级与数据治理的规范化，内外部审阅效率大幅提升，投资者沟通更具说服力。",
      author: "刘总",
      position: "银行ESG与投资者关系负责人",
    },
    images: [
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1523958203904-cdcb402031fd?w=800&h=600&fit=crop",
    ],
    results: {
      carbonReduction: "12%",
      energySaving: "8%",
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
