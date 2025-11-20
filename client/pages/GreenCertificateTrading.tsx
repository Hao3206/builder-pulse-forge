import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactSection from "../components/ContactSection";
import SolutionHero from "../components/SolutionHero";

const certificateTypes = [
  {
    id: "renewable",
    title: "可再生能源证书",
    content: "包括风电、光伏、水电等可再生能源发电项目产生的绿色电力证书，是绿证交易的主要品种。",
  },
  {
    id: "energy",
    title: "节能证书",
    content: "通过节能技术改造、能效提升等措施产生的节能证书，体现企业的节能降碳成果。",
  },
  {
    id: "carbon",
    title: "碳减排证书",
    content: "通过碳减排项目产生的碳信用证书，可用于抵消碳排放或进行交易。",
  },
];

const serviceItems = [
  {
    title: "绿证项目开发",
    description: "协助企业开发符合标准的绿证项目，包括项目设计、申报、审核等全流程服务",
    icon: "01",
  },
  {
    title: "绿证认证核证",
    description: "提供绿证项目的第三方认证和核证服务，确保项目的真实性和合规性",
    icon: "02",
  },
  {
    title: "交易平台服务",
    description: "提供绿证交易平台的技术支持和运营服务，确保交易的安全性和透明度",
    icon: "03",
  },
  {
    title: "政策咨询服务",
    description: "提供绿证交易政策解读和咨询服务，帮助企业了解政策要求和参与方式",
    icon: "04",
  },
  {
    title: "市场分析报告",
    description: "提供绿证市场分析报告和价格趋势预测，帮助企业制定交易策略",
    icon: "05",
  },
  {
    title: "合规管理服务",
    description: "协助企业建立绿证交易合规管理体系，确保交易活动的合规性",
    icon: "06",
  },
];

const benefits = [
  {
    title: "促进绿色能源发展",
    description: "通过市场化机制激励可再生能源项目开发，推动绿色能源产业发展",
  },
  {
    title: "实现环境价值变现",
    description: "将绿色能源的环境价值转化为经济价值，为项目业主创造额外收益",
  },
  {
    title: "满足企业绿色需求",
    description: "帮助企业满足绿色电力消费需求，提升企业绿色形象和竞争力",
  },
  {
    title: "推动能源结构转型",
    description: "引导能源消费向绿色低碳方向转型，助力实现碳达峰碳中和目标",
  },
];

const tradingProcess = [
  {
    step: "01",
    title: "项目评估",
    description: "评估绿证项目的可行性和合规性，确定项目类型和规模",
  },
  {
    step: "02",
    title: "项目开发",
    description: "协助完成项目设计、申报、审核等开发流程",
  },
  {
    step: "03",
    title: "证书生成",
    description: "项目运行后生成相应的绿证，进入交易市场",
  },
  {
    step: "04",
    title: "交易变现",
    description: "在交易平台上出售绿证，实现环境价值的经济变现",
  },
];

export default function GreenCertificateTrading() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeType, setActiveType] = useState("renewable");

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

      <SolutionHero
        tag="碳交易"
        title="绿证交易"
        description="绿色能源的价值变现，推动能源结构向低碳转型"
        primaryHref="#contact"
        secondaryText="了解服务"
        secondaryHref="#certificate-types"
        backgroundImage="https://api.builder.io/api/v1/image/assets/TEMP/9026b87008e8884034ad247a59bfca58d7b09cc8?width=2880"
        heightClass="h-[460px]"
      />

      {/* Introduction Section */}
      <section id="certificate-types" className="py-32 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">
              什么是绿证交易？
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              绿证交易是指绿色电力证书（Green Certificate）的交易活动。绿证是绿色能源发电项目产生的环境权益凭证，
              代表一定量的绿色电力所产生的环境价值。通过绿证交易，绿色能源的环境价值得以市场化定价和交易，
              为可再生能源项目提供额外的经济激励，同时满足企业和个人对绿色电力的消费需求。
            </p>
          </div>

          {/* Certificate Types Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {certificateTypes.map((type) => (
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
              提供全方位的绿证交易服务，从项目开发到交易变现，助力企业实现绿色能源的价值最大化
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceItems.map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-[#058A65] rounded-full flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-lg">{service.icon}</span>
                </div>
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
              绿证交易的价值
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              绿证交易不仅能够促进绿色能源发展，还能创造多重价值，实现环境效益和经济效益的统一
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
              绿证交易流程
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              从项目开发到交易变现，我们提供全流程的绿证交易服务支持
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {tradingProcess.map((item, index) => (
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
            开启您的绿证交易之旅
          </h2>
          <p className="text-white/90 text-lg mb-8 leading-relaxed">
            加入绿证交易，让绿色能源创造更多价值，
            共同推动能源结构向绿色低碳方向转型
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="bg-white text-[#058A65] font-semibold py-4 px-8 rounded-lg hover:bg-gray-50 transition-colors inline-block">
              立即咨询
            </a>
            <button className="border-2 border-white text-white font-semibold py-4 px-8 rounded-lg hover:bg-white hover:text-[#058A65] transition-colors">
              了解更多
            </button>
          </div>
        </div>
      </section>

      <ContactSection />
      <Footer />
    </div>
  );
}
