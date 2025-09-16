export type CaseResults = {
  carbonReduction: string;
  energySaving: string;
  costSaving: string;
  renewableEnergy?: string;
};

export type CaseSolution = {
  title: string;
  description: string;
  image: string;
};
export type CaseTimeline = {
  phase: string;
  period: string;
  description: string;
};
export type CaseTestimonial = {
  content: string;
  author: string;
  position: string;
};

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
    location: "华东地区",
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
      "园区内企业众多，能源消耗类型复杂多样",
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
        period: "2023年6个月 - 2023年8月",
        description: "完成项目调研方案设计和合同签署",
      },
      {
        phase: "基础设施建设",
        period: "2023年9月 - 2024年3月",
        description: "部署智能电网、监测设备和清洁能源设施",
      },
      {
        phase: "系统集成测试",
        period: "2024年4月 - 2024年6个月",
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
      author: "项目负责人",
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
    location: "华东地区",
    client: "某大型制造企业集团",
    duration: "12个月",
    projectScale:
      "两大生产基地，年产能超100万件设备，覆盖冲压/焊接/涂装/总装等核心工序",
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
      {
        phase: "诊断与立项",
        period: "2024.01-2024.02",
        description: "完成差距诊断、路线规划与预算评审",
      },
      {
        phase: "数据治理与平台建设",
        period: "2024.03-2024.06",
        description: "制定口径标准，搭建数据采集与核算平台",
      },
      {
        phase: "工艺改造与绿电接入",
        period: "2024.07-2024.10",
        description: "实施节能改造与绿电采购，联调平台与报表",
      },
      {
        phase: "验证与运营",
        period: "2024.11-至今",
        description: "第三方验证通过，进入持续运营与优化阶段",
      },
    ],
    testimonial: {
      content:
        "项目让我们的碳数据实现了可追溯、可审计，工艺改造与绿电策略也带来了显著降本效果，为集团碳中和目标奠定了坚实基础。",
      author: "项目负责人",
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
    location: "华东地区",
    client: "国内头部消费品牌",
    duration: "10个月",
    projectScale:
      "覆盖3大产品线、12个SKU，年产量超500万件，涉及包装、原料、装配与物流环节",
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
      {
        phase: "项目启动与边界定义",
        period: "2024.01-2024.02",
        description: "确定功能单位、系统边界与关键排放阶段",
      },
      {
        phase: "数据采集与因子确认",
        period: "2024.03-2024.05",
        description: "采集活动数据、评估因子来源并开展DQI评估",
      },
      {
        phase: "核算与不确定性分析",
        period: "2024.06-2024.07",
        description: "完成核算建模与敏感性分析，提出减排策略",
      },
      {
        phase: "披露与验证",
        period: "2024.08-2024.10",
        description: "输出CFP/EPD报告并通过第三方验证",
      },
    ],
    testimonial: {
      content:
        "项目帮助我们建立了系统化的产品碳足迹核算能力，披露效率与数据说服力显著提升，为国际市场ESG沟通提供了坚实支撑。",
      author: "项目负责人",
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
    location: "华北地区",
    client: "国内领先商业银行",
    duration: "8个月",
    projectScale:
      "总部与两家分行试点，覆盖董事会/风险/合规/人资/运营等8个条线，50+披露指标",
    challenges: [
      "ESG指标口径不统一，跨条线数据口径与口径更新机制缺失",
      "披露框架与国际标准（如TCFD/ISSB/GRI）映射不清，治理与风险披露不足",
      "证据留痕薄弱，第三方核验准备成本高、效��低",
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
          "识别气候物理/转型风险，建立情景分析与压力测试，完善治理、战略、风险管理与指标披露。",
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
      {
        phase: "现状评估与规划",
        period: "2024.01-2024.02",
        description: "完成披露差距评估、路线图与预算评审",
      },
      {
        phase: "框架与指标库建设",
        period: "2024.03-2024.04",
        description: "搭建指标库与映射关系，明确责任与流程",
      },
      {
        phase: "数据治理与留痕",
        period: "2024.05-2024.06",
        description: "建立数据血缘、证据留痕与核验机制",
      },
      {
        phase: "披露稿撰写与审阅",
        period: "2024.07-2024.08",
        description: "输出披露文本、完成内外部审阅与修订",
      },
    ],
    testimonial: {
      content:
        "通过本次项目，我们实现了披露框架的系统化升级与数据治理的规范化，内外部审阅效率大幅提升，投资者沟通更具说服力。",
      author: "项目负责人",
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
    location: "华南地区",
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
    location: "华南地区",
    results: {
      carbonReduction: "65%",
      energySaving: "50%",
      costSaving: "40%",
    },
  },
  {
    id: 7,
    category: "碳交易",
    title: "助力两家机构获评省级\"零碳\"公共机构",
    description:
      "浙东环境能源交易所为两家公共机构提供碳交易与碳中和服务，通过核销林业碳汇与CCER抵消2022年度排放，获评二星级省级\"零碳\"公共机构。",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&h=600&fit=crop",
    heroImage:
      "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1920&h=1080&fit=crop",
    tags: ["碳中和", "碳交易", "公共机构", "零碳"],
    date: "2024-06",
    location: "华东地区",
    client: "两家公共机构",
    duration: "6��月",
    projectScale:
      "两家公共机构获评省级二星级“零碳”公共机构；核销与抵消2022年度排放共计995.02吨CO₂e（825.86吨+169.16吨）",
    challenges: [
      "缺乏统一核算口径与留痕，需形成可审计的碳中和证据链",
      "抵消来源需合规、真实可追溯（林业碳汇、CCER）",
      "需同步满足省级“零碳”公共机构评价标准的佐证要求",
    ],
    solutions: [
      {
        title: "组织边界与排放核算",
        description:
          "确定公共机构组织边界与排放范围，完成2022年度温室气体排放清单与台账核验。",
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      },
      {
        title: "碳资产采购与核销（林业碳汇/CCER）",
        description:
          "撮合“某林业碳汇项目”等合规自愿减排量资产采购与核销，形成可追溯凭据与交易记录。",
        image:
          "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&h=600&fit=crop",
      },
      {
        title: "碳中和证书签发与披露材料",
        description:
          "为两家机构签发《碳中和证书》，输出核算方法、抵消路径、凭证清单等披露材料。",
        image:
          "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=800&h=600&fit=crop",
      },
      {
        title: "“零碳”公共机构评价支持",
        description:
          "依据省级评价细则准备审查材料，配合现场核查与专家评审，完成等级评价与授牌。",
        image:
          "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop",
      },
    ],
    timeline: [
      {
        phase: "核算与诊断",
        period: "2023.12-2024.01",
        description: "组织边界与排放核算、抵消需求测算",
      },
      {
        phase: "资产采购与核销",
        period: "2024.02-2024.03",
        description: "撮合碳减排量资产采购，完成核销登记",
      },
      {
        phase: "证书签发与披露",
        period: "2024.04",
        description: "签发碳中和证书，完善披露材料与档案",
      },
      {
        phase: "评价支持与授牌",
        period: "2024.05-2024.06",
        description: "配合省“零碳”公共机构评价验收并获评二星级",
      },
    ],
    testimonial: {
      content:
        "在交易所专业团队支持下，我们顺利完成年度碳中和并通过省级‘零碳’公共机构评价，材料规范、过程合规、社会影响良好。",
      author: "项目负责人",
      position: "相关公共机构代表",
    },
    images: [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop",
    ],
    results: {
      carbonReduction: "100%",
      energySaving: "—",
      costSaving: "—",
    },
  },
  {
    id: 8,
    category: "碳交易",
    title: "助力光伏项目施工实现碳中和并获碳减排贷款",
    description:
      "与银行合作，助力某制造企业1.6MWp分布式光伏发电项目施工阶段实现碳中和，并获得碳减排贷款。",
    image:
      "https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=800&h=600&fit=crop",
    heroImage:
      "https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=1920&h=1080&fit=crop",
    tags: ["光伏", "施工碳中和", "CCER", "碳金融"],
    date: "2024-07",
    location: "华东地区",
    client: "某制造企业",
    duration: "3个月",
    projectScale:
      "1.6MWp分布式光伏发电项目；覆盖施工阶段燃料燃烧、电力使用与交通运输排放核算，并实现等量CCER注销抵消",
    challenges: [
      "施工阶段排放边界复杂，需要统一直接与间接排放的核算口径",
      "交通运输等间接排放的数据采集与证据留痕要求高",
      "需快速匹配合规CCER资源并完成注销流程",
      "碳减排贷款所需合规材料与审查流程较为严格",
    ],
    solutions: [
      {
        title: "ISO 14064与建筑碳排放标准核算",
        description:
          "基于ISO 14064与《建筑碳排放计算标准》明确功能单位与系统边界，建立数据质量评价与核算模型。",
        image:
          "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=600&fit=crop",
      },
      {
        title: "覆盖直接/间接排放的全口径核算",
        description:
          "纳入化石燃料燃烧直接排放、电力消费间接排放及交通运输间接排放，形成可审计的台账。",
        image:
          "https://images.unsplash.com/photo-1581093588401-16bcb8d6ff83?w=800&h=600&fit=crop",
      },
      {
        title: "CCER采购与注销实现施��碳中和",
        description:
          "撮合采购并注销等量合规CCER，抵消施工阶段核算排放，出具《碳中和证书》与凭证清单。",
        image:
          "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=800&h=600&fit=crop",
      },
      {
        title: "碳金融工具与贷款落地",
        description:
          "串联央行碳减排支持工具与银行碳减排贷款，形成“核算+交易+金融”一体化路径，降低资金成本。",
        image:
          "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=800&h=600&fit=crop",
      },
      {
        title: "披露材料与档案管理",
        description:
          "输出核算报告、抵消路径、凭证与影像资料，建立留痕档案，便于外部审查与复用。",
        image:
          "https://images.unsplash.com/photo-1523958203904-cdcb402031fd?w=800&h=600&fit=crop",
      },
    ],
    timeline: [
      {
        phase: "立项与边界定义",
        period: "2024.05",
        description: "确定系统边界与排放口径，拟定数据采集方案",
      },
      {
        phase: "数据采集与核算",
        period: "2024.05-2024.06",
        description: "采集施工活动数据并完成核算建模",
      },
      {
        phase: "CCER采购与注销",
        period: "2024.06",
        description: "撮合采购并完成注销登记，准备证书与凭证",
      },
      {
        phase: "碳减排贷款落地",
        period: "2024.07",
        description: "对接银行完成贷款审批与发放",
      },
    ],
    testimonial: {
      content:
        "在交易所团队支持下，我们的光伏项目施工阶段实现了碳中和并获得了碳减排贷款，流程规范、落地高效。",
      author: "企业负责人",
      position: "宁波某有限公司项目负责人",
    },
    images: [
      "https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1581093588401-16bcb8d6ff83?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=800&h=600&fit=crop",
    ],
    results: {
      carbonReduction: "100%",
      energySaving: "—",
      costSaving: "—",
    },
  },
  {
    id: 9,
    category: "培训/研修",
    title: "\"碳排放、碳管理专技人才高级研修班\"顺利举办",
    description:
      "由人力资源和社会保障局主办，浙东环境能源交易所联合高等院校组织，80余名学员参加的高级研修班顺利举办，聚焦双碳战略、碳资产交易、信息披露与实务核查。",
    image:
      "https://images.unsplash.com/photo-1516528387618-afa90b13e000?w=800&h=600&fit=crop",
    heroImage:
      "https://images.unsplash.com/photo-1517520287167-4bbf64a00d66?w=1920&h=1080&fit=crop",
    tags: ["培训", "研修班", "人才培养", "双碳"],
    date: "2024-09",
    location: "浙江宁波",
    client: "人力资源和社会保障局、高等院校",
    duration: "3天",
    projectScale:
      "80+名学员、6位专家授课，含现场教学（某新能源企业），结业获得高级研修班证书，学时计入继续教育系统",
    challenges: [
      "学员行业覆盖广，知识背景差异大，需系统化课程设计",
      "理论与实务需打通，强调口径一致与可落地",
      "需兼顾政策前沿、核算披露实务与产业案例",
    ],
    solutions: [
      {
        title: "体系化课程设计（战略-核算-披露-交易）",
        description:
          "设置双碳战略与实现路径、能源结构与工业降碳、碳资产交易与路径规划、信息披露评价体系、碳关税与应对策略、核算与核查实践等模块。",
        image:
          "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=800&h=600&fit=crop",
      },
      {
        title: "专家授课与专题分享",
        description:
          "邀请多位行业专家进行主题授课与案例解析。",
        image:
          "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop",
      },
      {
        title: "现场教学：东方日升新能源",
        description:
          "组织学员赴东方日升新能源开展现场教学，理解光伏制造产业链与零碳实践。",
        image:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&h=600&fit=crop",
      },
      {
        title: "结业认证与学时登记",
        description:
          "完成学习考核，颁发高级研修班证书，学时计入继续教育学习登记管理系统。",
        image:
          "https://images.unsplash.com/photo-1517732306149-e8f829eb588a?w=800&h=600&fit=crop",
      },
    ],
    timeline: [
      {
        phase: "筹备与招生",
        period: "2024.08",
        description: "完成课程设计、讲师安排与报名审核",
      },
      {
        phase: "课程实施",
        period: "2024.09-上旬",
        description: "专题授课与案例研讨，穿插实操环节",
      },
      {
        phase: "现场教学",
        period: "2024.09-中旬",
        description: "走进某新能源企业参观与教学",
      },
      {
        phase: "结业与认证",
        period: "2024.09-下旬",
        description: "结业考核、证书发放与学时登记",
      },
    ],
    testimonial: {
      content:
        "课程体系完整、案例实用、讲师权威，对于理解双碳政策企业落地实践帮助很大。",
      author: "学员代表",
      position: "企业碳管理负责人",
    },
    images: [
      "https://images.unsplash.com/photo-1516528387618-afa90b13e000?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1517520287167-4bbf64a00d66?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&h=600&fit=crop",
    ],
    results: {
      carbonReduction: "—",
      energySaving: "—",
      costSaving: "—",
    },
  },
];
