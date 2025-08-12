import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const assetTypes = [
  {
    id: "carbon-credits",
    title: "碳信用资产",
    content: "包括CCER、CER等各类碳信用，是企业碳资产的重要组成部分，可用于抵消碳排放或进行交易。",
  },
  {
    id: "green-certificates",
    title: "绿证资产",
    content: "绿色电力证书等环境权益凭证，体现企业的绿色能源消费和环境贡献。",
  },
  {
    id: "carbon-allowances",
    title: "碳配额资产",
    content: "政府分配的碳排放配额，是企业碳排放权的体现，具有重要的交易价值。",
  },
];

const serviceItems = [
  {
    title: "碳资产盘查",
    description: "全面梳理企业现有的碳资产，建立碳资产清单，评估资产价值和潜力",
    icon: "📋",
  },
  {
    title: "资产价值评估",
    description: "运用专业方法评估碳资产的市场价值，为企业提供资产定价参考",
    icon: "💰",
  },
  {
    title: "投资组合优化",
    description: "根据企业需求和市场情况，优化碳资产投资组合，实现价值最大化",
    icon: "📊",
  },
  {
    title: "交易策略制定",
    description: "制定科学的碳资产交易策略，把握市场机会，实现资产增值",
    icon: "🎯",
  },
  {
    title: "风险管理",
    description: "建立碳资产风险管理体系，识别和防范各类风险，保障资产安全",
    icon: "🛡️",
  },
  {
    title: "合规管理",
    description: "确保碳资产管理活动符合相关法规要求，建立合规管理体系",
    icon: "✅",
  },
];

const benefits = [
  {
    title: "实现资产增值",
    description: "通过专业的资产管理，实现碳资产的价值最大化，为企业创造额外收益",
  },
  {
    title: "降低合规成本",
    description: "优化碳资产配置，降低企业碳排放合规成本，提高经济效益",
  },
  {
    title: "提升企业形象",
    description: "展示企业的碳资产管理能力，提升绿色形象和市场竞争力",
  },
  {
    title: "支持战略发展",
    description: "为企业碳达峰碳中和战略提供资产支撑，助力绿色转型发展",
  },
];

const managementProcess = [
  {
    step: "01",
    title: "资产盘查",
    description: "全面梳理企业碳资产现状，建立资产清单和数据库",
  },
  {
    step: "02",
    title: "价值评估",
    description: "评估碳资产的市场价值和发展潜力，制定管理策略",
  },
  {
    step: "03",
    title: "投资配置",
    description: "根据企业需求和市场情况，优化碳资产投资组合",
  },
  {
    step: "04",
    title: "持续管理",
    description: "建立持续监控和管理机制，实现资产价值最大化",
  },
];

export default function EnterpriseCarbonAssetManagement() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeType, setActiveType] = useState("carbon-credits");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Sticky Header */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-lg" : "bg-transparent"
        }`}
      >
        <Header isScrolled={isScrolled} />
      </div>

      {/* Hero Section */}
      <section className="relative">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#155B75] to-[#088AB2] h-[374px]"></div>

        {/* Background Image Overlay */}
        <div
          className="absolute inset-0 h-[374px] bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://api.builder.io/api/v1/image/assets/TEMP/9026b87008e8884034ad247a59bfca58d7b09cc8?width=2880')",
            backgroundBlendMode: "multiply",
          }}
        ></div>

        <div className="relative z-10 flex flex-col items-center justify-center px-8 pt-32 pb-16">
          <div className="max-w-2xl text-center">
            <h1 className="text-[52px] font-bold leading-[60px] text-white mb-6 tracking-[-0.52px]">
              企业碳资产管理
            </h1>
            <p className="text-lg text-white/90">专业碳资产管理 · 实现价值最大化</p>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-32 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">
              什么是企业碳资产管理？
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              企业碳资产管理是指对企业拥有的各类碳资产进行专业化管理，包括碳信用、绿证、碳配额等环境权益资产。
               通过科学的资产管理方法，实现碳资产的价值最大化，为企业创造经济效益，
               同时支持企业的碳达峰碳中和战略目标。专业的碳资产管理能够帮助企业降低合规成本、
               提升资产收益、增强市场竞争力。
            </p>
          </div>

          {/* Asset Types Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {assetTypes.map((type) => (
              <div
                key={type.id}
                className={`p-6 rounded-lg border-2 transition-all duration-300 cursor-pointer ${
                  activeType === type.id
                    ? "border-[#058A65] bg-[#058A65]/5"
                    : "border-gray-200 hover:border-[#058A65]/50"
                }`}
                onClick={() => setActiveType(type.id)}
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {type.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {type.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">
              我们的服务
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              提供全方位的企业碳资产管理服务，从资产盘查到价值实现，助力企业实现碳资产价值最大化
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceItems.map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-32 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">
              碳资产管理的价值
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              专业的碳资产管理能够为企业创造多重价值，实现经济效益和环境效益的统一
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-[#058A65] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{index + 1}</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">
              碳资产管理流程
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              科学的管理流程，确保碳资产管理的专业性和有效性
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {managementProcess.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-[#058A65] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">{item.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-[#058A65]">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            开启专业碳资产管理
          </h2>
          <p className="text-white/90 text-lg mb-8 leading-relaxed">
            让专业的碳资产管理为您的企业创造更多价值，
            助力实现碳达峰碳中和战略目标
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#058A65] font-semibold py-4 px-8 rounded-lg hover:bg-gray-50 transition-colors">
              立即咨询
            </button>
            <button className="border-2 border-white text-white font-semibold py-4 px-8 rounded-lg hover:bg-white hover:text-[#058A65] transition-colors">
              了解更多
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
