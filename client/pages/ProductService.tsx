import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle,
  Users,
  TrendingUp,
  FileText,
  Clock,
  Target,
  Award,
  ArrowRight,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";

export default function ProductService() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mock data - in real app this would come from API based on serviceId
  const serviceData = {
    "carbon-footprint-accounting": {
      id: "carbon-footprint-accounting",
      title: "碳盘查/碳足迹核算",
      subtitle: "组织与产品双维核算，合规披露与验证支持",
      description:
        "提供组织碳盘查（ISO 14064）与产品碳足迹（ISO 14067/PAS 2050）一体化服务，覆盖边界界定、数据采集、核算分摊、第三方验证与披露。",
      heroImage: "/banner-1.jpg",
      category: "碳咨询",
      features: [
        {
          icon: Target,
          title: "组织碳盘查",
          description: "按ISO 14064与GHG Protocol进行组织层面温室气体核算",
        },
        {
          icon: FileText,
          title: "产品碳足迹",
          description: "依据ISO 14067/PAS 2050开展LCA核算与分摊",
        },
        {
          icon: TrendingUp,
          title: "第三方验证支持",
          description: "穿行测试资料、抽样与证据留痕，配合验证机构",
        },
        {
          icon: Award,
          title: "披露与系统对接",
          description: "生成披露文本与报表，支持系统化接入与留痕管理",
        },
      ],
      benefits: [
        "方法学与行业经验兼备，保证口径一致与结果可靠",
        "平台化采数与留痕，缩短实施周期，提升可审计性",
        "覆盖组织/产品/供应链，满足客户与监管披露需求",
        "可输出改进建议与路线，为后续减排与投策奠基",
      ],
      process: [
        {
          step: "01",
          title: "需求与诊断",
          description: "沟通诉求与边界，完成差距诊断与计划",
        },
        {
          step: "02",
          title: "边界与口径",
          description: "明确组织/产品边界、功能单位与排放范围",
        },
        {
          step: "03",
          title: "采数与核算",
          description: "采集活动数据与因子，完成核算/分摊/不确定性分析",
        },
        {
          step: "04",
          title: "验证与披露",
          description: "准备验证资料，输出报告与披露文本",
        },
        {
          step: "05",
          title: "持续改进",
          description: "识别减排机会，形成年度滚动改进方案",
        },
      ],
      stats: [
        { number: "120+", label: "服务项目" },
        { number: "30+", label: "细分行业" },
        { number: "2-6周", label: "典型周期" },
        { number: "95%+", label: "验证通过率" },
      ],
      caseStudies: [
        {
          title: "消费电子产品碳足迹",
          description: "完成多SKU产品碳足迹核算与海外披露模型输出",
          result: "获得客户认可并中标供应链名录",
        },
        {
          title: "装备制造组织盘查",
          description: "组织层面温室气体核算与管理制度落地",
          result: "建立年度核算与内审机制，形成改进清单",
        },
      ],
      pricing: {
        consultation: "免费初步咨询",
        development: "组织/产品核算：5-20万元",
        trading: "第三方验证：按机构报价",
        management: "年度维护与更新：3-5万元",
      },
      contact: {
        phone: "18606624246",
        email: "zdhjs2021@163.com",
        address: "浙江省宁波市鄞州区汇海路26号环领未来大楼",
      },
    },

    "green-low-carbon-factory": {
      id: "green-low-carbon-factory",
      title: "绿色/低碳工厂创建",
      subtitle: "专业的绿色低碳工厂建设咨询服务",
      description:
        "为制造企业提供从绿色工厂认定到低碳工厂建设的全方位咨询服务，助力企业实现绿色转型和可持续发展。",
      heroImage:
        "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1920&h=1080&fit=crop",
      category: "碳咨询",
      features: [
        {
          icon: Target,
          title: "绿色工厂认定",
          description:
            "协助企业申请国家级、省级绿色工厂认定，提升企业绿色制造水平",
        },
        {
          icon: FileText,
          title: "低碳工厂建设",
          description: "制定低碳工厂建设方案，指导企业实施节能减排技术改造",
        },
        {
          icon: TrendingUp,
          title: "绿色供应链",
          description: "建立绿色供应链管理体系，推动上下游企业共同绿色发展",
        },
        {
          icon: Award,
          title: "认证体系",
          description: "协助企业建立ISO14001、ISO50001等环境管理体系认证",
        },
      ],
      benefits: [
        "丰富的绿色工厂认定经验，成功率高",
        "专业的技术团队，深度了解政策要求",
        "全程陪伴服务，从申报到认定一站式解决",
        "后续持续支持，确保认定后的持续改进",
        "成本效益最优，为企业节省大量时间和资源",
      ],
      process: [
        {
          step: "01",
          title: "现状评估",
          description: "深入企业调研，评估现有绿色制造基础和改进空间",
        },
        {
          step: "02",
          title: "方案制定",
          description: "制定个性化的绿色工厂建设方案和实施路径",
        },
        {
          step: "03",
          title: "技术改造",
          description: "指导企业实施节能减排技术改造和绿色化改造",
        },
        {
          step: "04",
          title: "申报认定",
          description: "协助企业完成绿色工厂认定申报和现场验收",
        },
        {
          step: "05",
          title: "持续改进",
          description: "提供后续技术支持，确保绿色工厂持续运营",
        },
      ],
      stats: [
        {
          number: "80+",
          label: "认定项目",
        },
        {
          number: "95%",
          label: "认定成功率",
        },
        {
          number: "30%",
          label: "平均节能率",
        },
        {
          number: "15个",
          label: "服务行业",
        },
      ],
      caseStudies: [
        {
          title: "某汽车零部件制造企业绿色工厂认定",
          description: "协助完成国家级绿色工厂认定，实施智能化生产线改造",
          result: "成功获得国家级绿色工厂认定，年节约成本约200万元",
        },
        {
          title: "某纺织企业低碳工厂建设",
          description: "指导企业建设低碳工厂，实施清洁生产技术改造",
          result: "碳排放强度降低40%，获得省级低碳工厂示范称号",
        },
      ],
      pricing: {
        consultation: "免费初步咨询",
        development: "方案制定：8-15万元",
        trading: "申报服务：10-20万元",
        management: "技术支持：年度3-5万元",
      },
      contact: {
        phone: "18606624246",
        email: "zdhjs2021@163.com",
        address: "浙江省宁波市江北区",
      },
    },
    "ccer-asset-development": {
      id: "ccer-asset-development",
      title: "CCER资产开发与交易",
      subtitle: "专业的碳资产开发与交易服务",
      description:
        "为企业提供从项目识别、开发设计到交易变现的全链条CCER资产管理服务，助力企业实现碳资产价值最大化。",
      heroImage:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=1080&fit=crop",
      category: "碳交易",
      features: [
        {
          icon: Target,
          title: "项目识别与评估",
          description:
            "专业团队协助企业识别具备CCER开发潜力的项目，进行可行性评估",
        },
        {
          icon: FileText,
          title: "项目设计与申报",
          description:
            "提供项目设计文件编制、监测计划制定、项目申报等全流程服务",
        },
        {
          icon: TrendingUp,
          title: "交易服务",
          description:
            "协助企业进行CCER交易，包括买卖对接、价格谈判、交易执行等",
        },
        {
          icon: Award,
          title: "资产管理",
          description: "建立完善的碳资产管理体系，优化资产配置，实现价值最大化",
        },
      ],
      benefits: [
        "专业的技术团队，丰富的项目经验",
        "完整的服务链条，一站式解决方案",
        "广泛的市场网络，优质的交易渠道",
        "严格的质量管控，确保项目合规性",
        "灵活的合作模式，降低客户风险",
      ],
      process: [
        {
          step: "01",
          title: "项目调研",
          description: "深入了解客户需求，分析项目开发潜力",
        },
        {
          step: "02",
          title: "方案设计",
          description: "制定详细的开发方案和实施计划",
        },
        {
          step: "03",
          title: "项目申报",
          description: "编制申报材料，协助完成项目备案",
        },
        {
          step: "04",
          title: "监测核查",
          description: "执行监测计划，配合第三方核查机构",
        },
        {
          step: "05",
          title: "签发交易",
          description: "帮助完成CCER签发，提供交易服务",
        },
      ],
      stats: [
        {
          number: "100+",
          label: "服务项目",
        },
        {
          number: "500万吨",
          label: "累计开发量",
        },
        {
          number: "95%",
          label: "成功率",
        },
        {
          number: "50+",
          label: "合作企业",
        },
      ],
      caseStudies: [
        {
          title: "某新能源企业风电CCER项目",
          description: "协助开发200MW风电项目CCER，年减排量约30万吨CO2",
          result: "成功签发并交易，为企业创造额外收益约600万元",
        },
        {
          title: "某制造企业节能改造CCER项目",
          description: "协助开发工业节能改造项目CCER，年减排量约5万吨CO2",
          result: "项目顺利备案，预计年收益约100万元",
        },
      ],
      pricing: {
        consultation: "免费咨询评估",
        development: "项目开发费用面议",
        trading: "交易佣金：成交额的3-5%",
        management: "资产管理费：年度1-2%",
      },
      contact: {
        phone: "18606624246",
        email: "zdhjs2021@163.com",
        address: "浙江省宁波市鄞州区汇海路26号环领未来大楼",
      },
    },
    "carbon-trader-training": {
      id: "carbon-trader-training",
      title: "碳排放交易员培训",
      subtitle: "市场规则+交易实战+风控合规，一课掌握核心能力",
      description:
        "覆盖配额交易、CCER与国际自愿市场机制，结合模拟盘与案例推演，掌握下单、对冲、风控的全流程能力。",
      heroImage:
        "https://images.unsplash.com/photo-1569025690938-a00729c9e8f8?w=1920&h=1080&fit=crop",
      category: "碳培训",
      features: [
        {
          icon: Target,
          title: "市场规则精讲",
          description: "配额分配、履约与交易机制详解",
        },
        {
          icon: FileText,
          title: "产品全景",
          description: "配额/CCER/绿证据等产品与制度",
        },
        {
          icon: TrendingUp,
          title: "交易实战",
          description: "做市、波段、套保与跨品种套利演练",
        },
        {
          icon: Award,
          title: "风控与合规",
          description: "指标体系、流程规范与风控框架",
        },
      ],
      benefits: [
        "理论+实操双轨，快速上手",
        "模拟盘演练，巩固策略",
        "讲师一对一答疑",
        "结业证据书与资料包",
      ],
      process: [
        { step: "01", title: "概论与规则", description: "市场体系与履约机制" },
        { step: "02", title: "产品与制度", description: "配额/CCER/绿证据详解" },
        {
          step: "03",
          title: "策略与实操",
          description: "下单、套保与风控演练",
        },
        { step: "04", title: "测评与结业", description: "综合测评与答疑" },
      ],
      stats: [
        { number: "1000+", label: "培训学员" },
        { number: "4+", label: "核心模块" },
        { number: "2-3天", label: "典型时长" },
        { number: "95%+", label: "满意度" },
      ],
      caseStudies: [
        {
          title: "制造业交易团队训练营",
          description: "从零到一构建交易体系",
          result: "建立交易与风控流程",
        },
      ],
      pricing: {
        consultation: "免费咨询",
        development: "线下/线上：面议",
        trading: "团体价：按人数",
        management: "内训定制：支持",
      },
      contact: {
        phone: "18606624246",
        email: "zdhjs2021@163.com",
        address: "浙江省宁波市鄞州区汇海路26号环领未来大楼",
      },
    },
    "carbon-admin-training": {
      id: "carbon-admin-training",
      title: "碳排放管理员培训",
      subtitle: "从台账到履约到披露，打造企业碳管理骨干能力",
      description:
        "系统掌握碳盘查台账、配额履约、报告披露与系统化管理，适配企业碳管理岗位能力模型。",
      heroImage:
        "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1920&h=1080&fit=crop",
      category: "碳培训",
      features: [
        {
          icon: FileText,
          title: "台账与口径",
          description: "活动数据采集、因子管理与台账规范",
        },
        {
          icon: Target,
          title: "履约与披露",
          description: "年度履约、核查与信息披露流程",
        },
        {
          icon: TrendingUp,
          title: "系统化管理",
          description: "平台操作、报表与留痕",
        },
        {
          icon: Award,
          title: "内控与审计",
          description: "职责分工、流程内控与配合审计",
        },
      ],
      benefits: ["模板工具包", "岗位胜任力提升", "讲师答疑", "证据书与评估"],
      process: [
        {
          step: "01",
          title: "基础与政策",
          description: "碳管理基础与最新政策",
        },
        { step: "02", title: "数据与口径", description: "采集模板与口径统一" },
        { step: "03", title: "履约与披露", description: "核查对接与披露撰写" },
        { step: "04", title: "系统与内控", description: "系统操作与流程内控" },
      ],
      stats: [
        { number: "800+", label: "培训学员" },
        { number: "4+", label: "核心模块" },
        { number: "2天", label: "典型时长" },
        { number: "90%+", label: "通过率" },
      ],
      caseStudies: [
        {
          title: "大型装备企业内训",
          description: "多部门联合培训",
          result: "建立年度台账与履约流程",
        },
      ],
      pricing: {
        consultation: "免费咨询",
        development: "线下/线上：面议",
        trading: "团体价：按人数",
        management: "内训定制：支持",
      },
      contact: {
        phone: "18606624246",
        email: "zdhjs2021@163.com",
        address: "浙江省宁波市鄞州区汇海路26号环领未来大楼",
      },
    },
    "industry-seminars-forums": {
      id: "industry-seminars-forums",
      title: "行业专题讲座/论坛",
      subtitle: "链接政策、技术与产业实践，构建行业交流平台",
      description:
        "围绕制造业低碳转型、产品碳足迹、绿电与碳金融等主题举办讲座/论坛/工作坊。",
      heroImage:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&h=1080&fit=crop",
      category: "碳培训",
      features: [
        { icon: Target, title: "主题演讲", description: "政策解读与技术分享" },
        { icon: Users, title: "圆桌论坛", description: "多方对话与案例交流" },
        { icon: FileText, title: "工作坊", description: "小班研讨与情景演练" },
        { icon: Award, title: "闭门交流", description: "企业/行业专场对接" },
      ],
      benefits: ["专家资源对接", "资料沉淀", "合作拓展", "品牌传播"],
      process: [
        { step: "01", title: "主题与嘉宾", description: "确定议题与嘉宾阵容" },
        { step: "02", title: "议程与报名", description: "发布议程与报名渠道" },
        { step: "03", title: "执行与互动", description: "现场组织与互动交流" },
        { step: "04", title: "沉淀与跟进", description: "纪要与合作建议书" },
      ],
      stats: [
        { number: "50+", label: "活动场次" },
        { number: "1000+", label: "参会人次" },
        { number: "10+", label: "合作机构" },
        { number: "8+", label: "主题方向" },
      ],
      caseStudies: [
        {
          title: "园区双碳论坛",
          description: "政治与实践闭环分享",
          result: "促成多项合作意向",
        },
      ],
      pricing: {
        consultation: "免费咨询",
        development: "共办/赞助：面议",
        trading: "参会：免费/报名",
        management: "定制专场：支持",
      },
      contact: {
        phone: "18606624246",
        email: "zdhjs2021@163.com",
        address: "浙江省宁波市鄞州区汇海路26号环领未来大楼",
      },
    },
    "custom-training": {
      id: "custom-training",
      title: "其他定制化培训",
      subtitle: "围绕企业诉求定制内容、时长与形式，聚焦实操与落地",
      description:
        "覆盖普及型、条线提升、管理层工作坊与项目制辅导，按需定制，效果导向。",
      heroImage:
        "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=1920&h=1080&fit=crop",
      category: "碳培训",
      features: [
        {
          icon: Users,
          title: "画像与目标",
          description: "定位受众画像与成效目标",
        },
        {
          icon: FileText,
          title: "大纲与内容",
          description: "定制课程大纲与案例库",
        },
        {
          icon: Target,
          title: "授课与辅导",
          description: "授课+实操+辅导一体化",
        },
        { icon: Award, title: "评估与认证", description: "成效评估与结业认证" },
      ],
      benefits: ["紧贴场景", "高度定制", "工具输出", "落地导向"],
      process: [
        { step: "01", title: "需求洞察", description: "访谈与问卷" },
        { step: "02", title: "方案制定", description: "定制大纲与排期" },
        { step: "03", title: "实施交付", description: "授课+实操+辅导" },
        { step: "04", title: "评估认证", description: "测评与证据书" },
      ],
      stats: [
        { number: "100+", label: "企业服务" },
        { number: "4类", label: "典型场景" },
        { number: "1-3天", label: "时长范围" },
        { number: "98%", label: "满意度" },
      ],
      caseStudies: [
        {
          title: "头部制造企业定制班",
          description: "跨部门联合定制",
          result: "产出工具包与路线图",
        },
      ],
      pricing: {
        consultation: "免费咨询",
        development: "按需定制：面议",
        trading: "团体价：按人数",
        management: "后续辅导：支持",
      },
      contact: {
        phone: "18606624246",
        email: "zdhjs2021@163.com",
        address: "浙江省宁波市鄞州区汇海路26号环领未来大楼",
      },
    },
    "advanced-carbon-training": {
      id: "advanced-carbon-training",
      title: "碳达峰碳中和战略规划高级研修班",
      subtitle: "战略-核算-路径-投策一体化，打造落地型双碳能力体系",
      description:
        "面向管理层与核心骨干的高级课程，系统覆盖战略、核算、路径、绿电、碳金融与治理体系。",
      heroImage:
        "https://images.unsplash.com/photo-1483721310020-03333e577078?w=1920&h=1080&fit=crop",
      category: "碳培训",
      features: [
        {
          icon: Target,
          title: "双碳战略",
          description: "国家与地方战略、行业趋势",
        },
        {
          icon: FileText,
          title: "核算与披露",
          description: "组织/产品核算与披露体系",
        },
        {
          icon: TrendingUp,
          title: "路径与绿电",
          description: "达峰/中和路径与绿电策略",
        },
        {
          icon: Award,
          title: "投策与治理",
          description: "MACC、ROI与治理绩效",
        },
      ],
      benefits: ["高阶体系化", "实战案例库", "工具包输出", "专家社群"],
      process: [
        { step: "01", title: "战略与核算", description: "战略框架与方法学" },
        {
          step: "02",
          title: "路径与市场",
          description: "路径路线与绿电/碳市场",
        },
        { step: "03", title: "投策与治理", description: "MACC与治理落地" },
      ],
      stats: [
        { number: "3天", label: "典型时长" },
        { number: "6+", label: "核心模块" },
        { number: "500+", label: "校友网络" },
        { number: "95%+", label: "满意度" },
      ],
      caseStudies: [
        {
          title: "集团总部高层研修",
          description: "定制高阶班",
          result: "形成集团年度双碳路线",
        },
      ],
      pricing: {
        consultation: "免费咨询",
        development: "线下/线上：面议",
        trading: "团体价：按人数",
        management: "校友社群：支持",
      },
      contact: {
        phone: "18606624246",
        email: "zdhjs2021@163.com",
        address: "浙江省宁波市鄞州区汇海路26号环领未来大楼",
      },
    },
    "regional-carbon-brain": {
      id: "regional-carbon-brain",
      title: "区域双碳大脑",
      subtitle: "区域端碳数据汇聚、分析与决策支持平台",
      description:
        "面向政府与园区的双碳管理平台，汇聚能耗与排放数据，支持达峰路线、绿电消纳、项目评估与绩效考核。",
      heroImage:
        "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1920&h=1080&fit=crop",
      category: "碳信息化",
      features: [
        {
          icon: Users,
          title: "多源数据汇聚",
          description: "接入能耗、排放、气象与企业报送数据",
        },
        {
          icon: TrendingUp,
          title: "监测与研判",
          description: "区域碳强度、产业结构与趋势研判",
        },
        {
          icon: Target,
          title: "路径与投策",
          description: "达峰路线、项目评估与ROI分析",
        },
        {
          icon: Award,
          title: "考核与绩效",
          description: "目标分解、绩效看板与督导闭环",
        },
      ],
      benefits: ["统一数据底座", "辅助科学决策", "跨部门协同", "绩效闭环"],
      process: [
        { step: "01", title: "调研评估", description: "现状评估与方案设计" },
        { step: "02", title: "平台建设", description: "数据接入与功能实现" },
        { step: "03", title: "应用推广", description: "专题应用与示范推广" },
        { step: "04", title: "运营维护", description: "运维与优化提升" },
      ],
      stats: [
        { number: "10+", label: "试点区域" },
        { number: "50+", label: "数据接口" },
        { number: "7x24", label: "稳定运行" },
        { number: ">99.9%", label: "可用性" },
      ],
      caseStudies: [
        {
          title: "某省级区域双碳平台",
          description: "实现跨部门数据打通",
          result: "支撑年度考核与路径滚动更新",
        },
      ],
      pricing: {
        consultation: "免费咨询",
        development: "项目制：面议",
        trading: "接口扩展：协商",
        management: "运维服务：年度",
      },
      contact: {
        phone: "18606624246",
        email: "zdhjs2021@163.com",
        address: "浙江省宁波市鄞州区汇海路26号环领未来大楼",
      },
    },
    "personal-carbon-account": {
      id: "personal-carbon-account",
      title: "个人碳账户建设",
      subtitle: "个人端碳行为量化、激励与绿色生活生态",
      description:
        "以行为数据为基础，构建个人碳账户体系，支持个人碳足迹、绿色消费与积分激励。",
      heroImage:
        "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?w=1920&h=1080&fit=crop",
      category: "碳信息化",
      features: [
        {
          icon: Users,
          title: "账户体系",
          description: "个人唯一ID、账户与积分体系",
        },
        {
          icon: FileText,
          title: "数据采集",
          description: "出行、用电、消费等行为数据接入",
        },
        {
          icon: TrendingUp,
          title: "核算与减排",
          description: "个人碳足迹核算与减排评估",
        },
        {
          icon: Award,
          title: "激励与生态",
          description: "积分兑换、公益与消费联动",
        },
      ],
      benefits: ["提升公众参与", "促进绿色消费", "沉淀数据资产", "生态合作"],
      process: [
        { step: "01", title: "方案设计", description: "场景与规则设计" },
        { step: "02", title: "平台建设", description: "小程序/APP与服务端" },
        { step: "03", title: "生态接入", description: "商户与公益合作" },
        { step: "04", title: "运营增长", description: "活动与增长机制" },
      ],
      stats: [
        { number: "100万+", label: "覆盖用户" },
        { number: "50+", label: "生态伙伴" },
        { number: "10+", label: "典型场景" },
        { number: ">99.9%", label: "稳定性" },
      ],
      caseStudies: [
        {
          title: "市级个人碳账户",
          description: "公交出行与绿色消费积分",
          result: "月活提升200%",
        },
      ],
      pricing: {
        consultation: "免费咨询",
        development: "平台建设：面议",
        trading: "生态合作：协商",
        management: "运营服务：可选",
      },
      contact: {
        phone: "18606624246",
        email: "zdhjs2021@163.com",
        address: "浙江省宁波市鄞州区汇海路26号环领未来大楼",
      },
    },
    "green-trade-platform": {
      id: "green-trade-platform",
      title: "绿色贸易服务平台",
      subtitle: "出口合规低碳认证与供应链协同的一站式平台",
      description:
        "面向外贸企业，提供碳足迹、ESG披露、CBAM合规、低碳认证与供应链协同，打通绿色贸易全链路。",
      heroImage:
        "https://images.unsplash.com/photo-1586521995568-39f60f91db4a?w=1920&h=1080&fit=crop",
      category: "碳信息化",
      features: [
        {
          icon: FileText,
          title: "合规与认证",
          description: "CBAM/ESG与低碳认证对接",
        },
        {
          icon: Users,
          title: "供应链协同",
          description: "供应商数据采集与协同",
        },
        {
          icon: TrendingUp,
          title: "可视化看板",
          description: "贸易碳强度、交付与合规进度",
        },
        { icon: Award, title: "客户与品牌", description: "低碳标签与市场传播" },
      ],
      benefits: ["降低合规成本", "提升履约效率", "增强品牌力", "拓展海外市场"],
      process: [
        { step: "01", title: "诊断与导入", description: "现状评估与数据导入" },
        { step: "02", title: "对接与配置", description: "对接认证/关务系统" },
        {
          step: "03",
          title: "实施与协同",
          description: "供应链协同与看板上线",
        },
        { step: "04", title: "优化与迭代", description: "合规升级与市场发展" },
      ],
      stats: [
        { number: "500+", label: "出口SKU" },
        { number: "30+", label: "目的国/地区" },
        { number: "80%", label: "效率提升" },
        { number: "50%", label: "成本下降" },
      ],
      caseStudies: [
        {
          title: "外贸企业绿色转型",
          description: "CBAM与ESG一体化",
          result: "准入风险显著降低",
        },
      ],
      pricing: {
        consultation: "免费咨询",
        development: "平台建设：面议",
        trading: "接口与认证：协商",
        management: "运维服务：年度",
      },
      contact: {
        phone: "18606624246",
        email: "zdhjs2021@163.com",
        address: "浙江省宁波市鄞州区汇海路26号环领未来大楼",
      },
    },
  };

  const service = serviceData[serviceId as keyof typeof serviceData];

  if (!service) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#333] mb-4">服务不存在</h1>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-[#058A65] text-white rounded-md hover:bg-[#046B52] transition-colors"
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-lg" : "bg-transparent"
        }`}
      >
        <Header isScrolled={isScrolled} />
      </div>

      {/* Hero Section */}
      <div className="relative h-[500px] overflow-hidden">
        <img
          src={service.heroImage}
          alt={service.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />

        {/* Back Button */}

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <div className="inline-block px-4 py-2 bg-[#058A65] rounded-full text-sm font-medium mb-4">
              {service.category}
            </div>
            <h1 className="text-[48px] font-bold leading-[60px] mb-6">
              {service.title}
            </h1>
            <p className="text-xl leading-[30px] text-white/90 max-w-2xl mx-auto mb-8">
              {service.description}
            </p>
            <a href="#contact" className="px-8 py-3 bg-[#058A65] text-white font-semibold rounded-md hover:bg-[#046B52] transition-colors inline-block">
              立即咨询
            </a>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {service.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-[48px] font-bold text-[#058A65] mb-2">
                  {stat.number}
                </div>
                <div className="text-[#666] text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-[#F8F9FB] py-16">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-[32px] font-bold text-[#333] mb-4">核心服务</h2>
            <p className="text-lg text-[#666]">
              专业的团队，完善的服务，为您提供全方位的碳资产解决方案
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {service.features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl border border-[#E5E5E7] hover:shadow-lg transition-shadow"
              >
                <feature.icon className="w-12 h-12 text-[#058A65] mb-6" />
                <h3 className="text-xl font-bold text-[#333] mb-3">
                  {feature.title}
                </h3>
                <p className="text-[#666] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Service Process */}
      <div className="bg-white py-16">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-[32px] font-bold text-[#333] mb-4">服务流程</h2>
            <p className="text-lg text-[#666]">
              标准化的服务流程，确保项目顺利实施
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-[#E5E5E7] h-full"></div>

            <div className="space-y-12">
              {service.process.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-8 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                >
                  <div
                    className={`flex-1 ${index % 2 === 0 ? "text-right" : "text-left"}`}
                  >
                    <div className="bg-white p-6 rounded-xl border border-[#E5E5E7] inline-block max-w-md">
                      <div className="text-[#058A65] font-bold text-2xl mb-2">
                        {step.step}
                      </div>
                      <h3 className="text-lg font-bold text-[#333] mb-2">
                        {step.title}
                      </h3>
                      <p className="text-[#666] text-sm">{step.description}</p>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="w-4 h-4 bg-[#058A65] rounded-full border-4 border-white z-10 relative"></div>
                  </div>

                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-[#F8F9FB] py-16">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-[32px] font-bold text-[#333] mb-8">
                选择我们的优势
              </h2>
              <div className="space-y-4">
                {service.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-[#058A65] flex-shrink-0 mt-0.5" />
                    <span className="text-[#666] leading-relaxed">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop"
                alt="服务优势"
                className="w-full h-[400px] object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Case Studies */}
      <div className="bg-white py-16">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-[32px] font-bold text-[#333] mb-4">典型案例</h2>
            <p className="text-lg text-[#666]">
              成功的项目经验，值得信赖的专业服务
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {service.caseStudies.map((caseStudy, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl border border-[#E5E5E7] hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold text-[#333] mb-4">
                  {caseStudy.title}
                </h3>
                <p className="text-[#666] mb-4 leading-relaxed">
                  {caseStudy.description}
                </p>
                <div className="bg-[#F2F9F7] p-4 rounded-lg">
                  <div className="text-sm text-[#058A65] font-medium mb-1">
                    项目成果
                  </div>
                  <div className="text-[#333] font-medium">
                    {caseStudy.result}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="bg-[#F8F9FB] py-16">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-[32px] font-bold text-[#333] mb-4">服务价格</h2>
            <p className="text-lg text-[#666]">
              透明的收费标准，灵活的合作模式
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-[#E5E5E7] text-center">
              <div className="text-[#058A65] font-bold text-lg mb-2">
                咨询评估
              </div>
              <div className="text-[#333] font-medium">
                {service.pricing.consultation}
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-[#E5E5E7] text-center">
              <div className="text-[#058A65] font-bold text-lg mb-2">
                项目开发
              </div>
              <div className="text-[#333] font-medium">
                {service.pricing.development}
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-[#E5E5E7] text-center">
              <div className="text-[#058A65] font-bold text-lg mb-2">
                交易服务
              </div>
              <div className="text-[#333] font-medium">
                {service.pricing.trading}
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-[#E5E5E7] text-center">
              <div className="text-[#058A65] font-bold text-lg mb-2">
                资产管理
              </div>
              <div className="text-[#333] font-medium">
                {service.pricing.management}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#058A65] py-16">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-[32px] font-bold text-white mb-4">
            准备开始您的碳资产项目？
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            我们的专业团队随时为您提供咨询服务，助力您的碳资产价值最大化
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-white">
              <Users className="w-5 h-5" />
              <span>专业团队</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <Clock className="w-5 h-5" />
              <span>快速响应</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <Award className="w-5 h-5" />
              <span>品质保证</span>
            </div>
          </div>
          <div className="mt-8 flex items-center justify-center gap-4">
            <a href="#contact" className="px-8 py-3 bg-white text-[#058A65] font-semibold rounded-md hover:bg-gray-100 transition-colors inline-block">
              立即咨询
            </a>
            <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-md hover:bg-white hover:text-[#058A65] transition-colors">
              下载资料
            </button>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      

      <ContactSection />
      {/* Footer */}
      <Footer />
    </div>
  );
}
