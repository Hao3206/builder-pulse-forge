import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactSection from "../components/ContactSection";

const financeTypes = [
  {
    id: "carbon-credit",
    title: "碳信用融资",
    content: "基于企业碳减排项目产生的碳信用，提供灵活的融资解决方案，帮助企业盘活碳资产。",
  },
  {
    id: "green-bond",
    title: "绿色债券",
    content: "为低碳项目提供绿色债券发行服务，帮助企业获得低成本资金支持。",
  },
  {
    id: "carbon-insurance",
    title: "碳保险",
    content: "为碳减排项目提供风险保障，降低项目投资风险，提高项目可行性。",
  },
];

const serviceItems = [
  {
    title: "碳资产评估",
    description: "对企业碳资产进行全面评估，确定资产价值和融资潜力",
    icon: "01",
  },
  {
    title: "融资方案设计",
    description: "根据企业需求设计个性化的碳金融融资方案",
    icon: "02",
  },
  {
    title: "风险控制",
    description: "建立完善的风险控制体系，保障融资安全",
    icon: "03",
  },
  {
    title: "合规管理",
    description: "确保碳金融业务符合相关法规和标准要求",
    icon: "04",
  },
  {
    title: "市场对接",
    description: "连接企业与金融机构，促进碳金融产品交易",
    icon: "05",
  },
  {
    title: "持续服务",
    description: "提供碳金融全生命周期服务，支持企业长期发展",
    icon: "06",
  },
];

const benefits = [
  {
    title: "盘活碳资产",
    description: "将企业的碳减排成果转化为可交易的金融资产，实现价值变现",
  },
  {
    title: "降低融资成本",
    description: "通过碳金融产品获得更优惠的融资条件，降低企业资金成本",
  },
  {
    title: "支持绿色发展",
    description: "为企业的绿色转型和可持续发展提供资金保障",
  },
  {
    title: "提升企业价值",
    description: "通过碳金融展示企业的环保责任，提升品牌价值和市场竞争力",
  },
];

const processSteps = [
  {
    step: "01",
    title: "需求分析",
    description: "了解企业碳资产情况和融资需求",
  },
  {
    step: "02",
    title: "资产评估",
    description: "对企业碳资产进行专业评估",
  },
  {
    step: "03",
    title: "方案设计",
    description: "设计个性化的碳金融解决方案",
  },
  {
    step: "04",
    title: "风险控制",
    description: "建立完善的风险控制机制",
  },
  {
    step: "05",
    title: "实施落地",
    description: "协助企业实施碳金融方案",
  },
  {
    step: "06",
    title: "持续服务",
    description: "提供长期跟踪和服务支持",
  },
];

export default function CarbonFinanceSolution() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeType, setActiveType] = useState("carbon-credit");

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
              碳金融解决方案
            </h1>
            <p className="text-lg text-white/90">创新金融工具 · 助力绿色转型</p>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-32 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">
              什么是碳金融解决方案？
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              碳金融解决方案是指基于碳减排项目和企业碳资产，提供的一系列创新金融产品和服务。
               通过碳信用融资、绿色债券、碳保险等金融工具，帮助企业盘活碳资产，
               获得低成本资金支持，推动绿色转型和可持续发展。
            </p>
          </div>

          {/* Finance Types Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {financeTypes.map((type) => (
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
              提供全方位的碳金融服务，从资产评估到方案实施，为企业创造价值
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
              碳金融的价值
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              专业的碳金融解决方案能够为企业创造多重价值，支持企业的可持续发展
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
              服务流程
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              标准化的服务流程，确保碳金融方案的专业性和有效性
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            {processSteps.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-[#058A65] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">{item.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
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
            开启您的碳金融之旅
          </h2>
          <p className="text-white/90 text-lg mb-8 leading-relaxed">
            让专业的碳金融解决方案为您的企业提供创新的资金支持，
            助力实现绿色转型和可持续发展
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
