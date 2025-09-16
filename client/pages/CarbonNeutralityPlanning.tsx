import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function CarbonNeutralityPlanning() {
  const [isScrolled, setIsScrolled] = useState(false);

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
              碳达峰碳中和路径规划
            </h1>
            <p className="text-lg text-white/90">科学规划减排路径 · 助力绿色转型发展</p>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-32 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">
              什么是碳达峰碳中和路径规划？
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              碳达峰碳中和路径规划是指为企业制定科学、可行的碳减排路线图，明确碳达峰时间节点和碳中和目标，
              设计分阶段、分领域的减排措施和实施方案。通过系统性的规划，帮助企业有序推进碳减排工作，
              实现经济效益和环境效益的统一。
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
