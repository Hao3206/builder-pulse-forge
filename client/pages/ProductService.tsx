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
      heroImage:
        "https://images.unsplash.com/photo-1463062511209-f6e52b984e8a?w=1920&h=1080&fit=crop",
      category: "碳咨询",
      features: [
        { icon: Target, title: "组织碳盘查", description: "按ISO 14064与GHG Protocol进行组织层面温室气体核算" },
        { icon: FileText, title: "产品碳足迹", description: "依据ISO 14067/PAS 2050开展LCA核算与分摊" },
        { icon: TrendingUp, title: "第三方验证支持", description: "穿行测试资料、抽样与证据留痕，配合验证机构" },
        { icon: Award, title: "披露与系统对接", description: "生成披露文本与报表，支持系统化接入与留痕管理" },
      ],
      benefits: [
        "方法学与行业经验兼备，保证口径一致与结果可靠",
        "平台化采数与留痕，缩短实施周期，提升可审计性",
        "覆盖组织/产品/供应链，满足客户与监管披露需求",
        "可输出改进建议与路线，为后续减排与投策奠基",
      ],
      process: [
        { step: "01", title: "需求与诊断", description: "沟通诉求与边界，完成差距诊断与计划" },
        { step: "02", title: "边界与口径", description: "明确组织/产品边界、功能单位与排放范围" },
        { step: "03", title: "采数与核算", description: "采集活动数据与因子，完成核算/分摊/不确定性分析" },
        { step: "04", title: "验证与披露", description: "准备验证资料，输出报告与披露文本" },
        { step: "05", title: "持续改进", description: "识别减排机会，形成年度滚动改进方案" },
      ],
      stats: [
        { number: "120+", label: "服务项目" },
        { number: "30+", label: "细分行业" },
        { number: "2-6周", label: "典型周期" },
        { number: "95%+", label: "验证通过率" },
      ],
      caseStudies: [
        { title: "消费电子产品碳足迹", description: "完成多SKU产品碳足迹核算与海外披露模��输出", result: "获得客户认可并中标供应链名录" },
        { title: "装备制造组织盘查", description: "组织层面温室气体核算与管理制度落地", result: "建立年度核算与内审机制，形成改进清单" },
      ],
      pricing: {
        consultation: "免费初步咨询",
        development: "组织/产品核算：5-20万元",
        trading: "第三方验证：按机构报价",
        management: "年度维护与更新：3-5万元",
      },
      contact: { phone: "0574-87310818", email: "service@zdhjsuo.com", address: "浙江省宁波市江北区" },
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
            "协助企业申请国家级、省级绿色工���认定，提升企业绿色制造水平",
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
          title: "某汽车零部件制造企业绿色工���认定",
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
        phone: "0574-87310818",
        email: "green@zdhjsuo.com",
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
            "协助企业进行CCER交易，包括买���对接、价格谈判、交易执行等",
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
          description: "���助完成CCER签发，提供交易服务",
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
          result: "成功签发并交���，为企业创造额外收益约600万元",
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
        phone: "0574-87310818",
        email: "service@zdhjsuo.com",
        address: "浙江省宁波市江北区",
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
            <button className="px-8 py-3 bg-[#058A65] text-white font-semibold rounded-md hover:bg-[#046B52] transition-colors">
              立即咨询
            </button>
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
            <button className="px-8 py-3 bg-white text-[#058A65] font-semibold rounded-md hover:bg-gray-100 transition-colors">
              立即咨询
            </button>
            <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-md hover:bg-white hover:text-[#058A65] transition-colors">
              下载资料
            </button>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-white py-16">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-[32px] font-bold text-[#333] mb-4">联系我们</h2>
            <p className="text-lg text-[#666]">
              多种联系方式，选择最适合您的沟通渠道
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#058A65] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#333] mb-2">电话咨询</h3>
              <p className="text-[#666]">{service.contact.phone}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#058A65] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#333] mb-2">邮件联系</h3>
              <p className="text-[#666]">{service.contact.email}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#058A65] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#333] mb-2">地址</h3>
              <p className="text-[#666]">{service.contact.address}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
