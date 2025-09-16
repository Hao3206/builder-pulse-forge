import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactSection from "../components/ContactSection";

const tradingFeatures = [
  {
    id: "local",
    title: "地方特色",
    content: "结合地方产业特点和发展需求，制定符合当地实际情况的碳普惠交易机制，促进地方绿色经济发展。",
  },
  {
    id: "inclusive",
    title: "普惠性质",
    content: "面向中小企业、个人和社区，降低参与门槛，让更多主体能够参与到碳减排行动中来。",
  },
  {
    id: "innovative",
    title: "创新机制",
    content: "建立灵活多样的碳普惠交易模式，包括碳积分、碳信用、碳权益等多种形式。",
  },
];

const serviceItems = [
  {
    title: "碳普惠项目开发",
    description: "协助企业和个人开发符合地方标准的碳普惠项目，包括节能改造、清洁能源、绿色出行等",
    icon: "01",
  },
  {
    title: "碳积分体系建设",
    description: "设计科学合理的碳积分计算方法和兑换机制，建立完整的碳普惠积分体系",
    icon: "02",
  },
  {
    title: "交易平台搭建",
    description: "提供碳普惠交易平台的技术支持和运营服务，确保交易的安全性和透明度",
    icon: "03",
  },
  {
    title: "政策咨询服务",
    description: "提供地方碳普惠政策解读和咨询服务，帮助企业了解政策要求和参与方式",
    icon: "04",
  },
  {
    title: "碳资产认证",
    description: "协助完成碳普惠项目的认证和核证工作，确保项目的真实性和减排效果",
    icon: "05",
  },
  {
    title: "市场推广支持",
    description: "提供碳普惠项目的市场推广和宣传支持，扩大项目影响力和参与度",
    icon: "06",
  },
];

const benefits = [
  {
    title: "促进地方减排",
    description: "通过市场化机制激励更多主体参与碳减排，推动地方绿色低碳发展",
  },
  {
    title: "创造经济价值",
    description: "将碳减排行为转化为经济价值，为参与主体创造额外收益",
  },
  {
    title: "提升环保意识",
    description: "增强公众的环保意识和参与度，形成全社会共同参与的良好氛围",
  },
  {
    title: "推动产业升级",
    description: "引导企业采用清洁技术和绿色生产方式，推动产业结构优化升级",
  },
];

export default function LocalCarbonTrading() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeFeature, setActiveFeature] = useState("local");

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
              地方碳普惠交易
            </h1>
            <p className="text-lg text-white/90">让每个人都能参与碳减排 · 创造绿色价值</p>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-32 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">
              什么是地方碳普惠交易？
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              地方碳普惠交易是一种创新的碳减排激励机制，通过将个人、家庭、社区和中小企业的低碳行为转化为可交易的碳积分或碳信用，
              在地方交易平台上进行交易，实现碳减排行为的经济价值化。这种机制让更多主体能够参与到碳减排行动中来，
              形成全社会共同参与碳减排的良好氛围。
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {tradingFeatures.map((feature) => (
              <div
                key={feature.id}
                className={`p-6 rounded-lg border-2 transition-all duration-300 cursor-pointer ${
                  activeFeature === feature.id
                    ? "border-[#058A65] bg-[#058A65]/5"
                    : "border-gray-200 hover:border-[#058A65]/50"
                }`}
                onClick={() => setActiveFeature(feature.id)}
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.content}
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
              提供全方位的地方碳普惠交易服务，从项目开发到平台运营，助力地方建立完善的碳普惠交易体系
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
              碳普惠交易的价值
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              地方碳普惠交易不仅能够促进碳减排，还能创造多重价值，实现环境效益和经济效益的双赢
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
              参与流程
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              简单四步，即可参与到地方碳普惠交易中来，让您的低碳行为创造价值
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "注册账户",
                description: "在碳普惠交易平台注册账户，完成身份认证",
              },
              {
                step: "02",
                title: "参与减排",
                description: "通过绿色出行、节能改造等方式参与碳减排行动",
              },
              {
                step: "03",
                title: "获得积分",
                description: "系统自动计算并发放相应的碳积分或碳信用",
              },
              {
                step: "04",
                title: "交易变现",
                description: "在交易平台上出售碳积分，获得经济收益",
              },
            ].map((item, index) => (
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
            开始您的碳普惠之旅
          </h2>
          <p className="text-white/90 text-lg mb-8 leading-relaxed">
            加入地方碳普惠交易，让您的每一个低碳行为都能创造价值，
            共同建设绿色低碳的美好家园
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
