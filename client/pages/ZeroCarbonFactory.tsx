import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactSection from "../components/ContactSection";
export default function ZeroCarbonFactory() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header isScrolled={isScrolled} />

      {/* Hero Section */}
      <section className="relative w-full h-[556px] bg-white">
        <div className="absolute inset-0">
          <div className="w-full h-full bg-gradient-to-r from-[#155B75] to-[#088AB2]" />
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://api.builder.io/api/v1/image/assets/TEMP/d3c2a75c75d2b22cd54ba87fdf99348bf0398abd?width=2880')",
              backgroundBlendMode: "multiply",
            }}
          />
        </div>

        <div className="relative z-10 flex items-center justify-center h-full pt-[88px]">
          <div className="max-w-[640px] text-center px-8">
            <h1 className="text-[52px] font-bold leading-[60px] text-white mb-6 tracking-[-0.52px]">
              零碳制造 智慧驱动
            </h1>
            <p className="text-lg text-white mb-12 tracking-[-0.1px]">
              打造企业绿色转型一站式解决方案
            </p>
            <div className="flex gap-4 justify-center">
              <a
                href="#factory-path"
                className="bg-[#058A65] text-white px-6 py-3 rounded-full font-semibold text-[15px] shadow-sm"
              >
                了解建设路径
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Build Zero Carbon Factory Section */}
      <section id="factory-reasons" className="py-[88px] bg-white">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-[32px] font-bold text-[#333] mb-4 tracking-[-0.64px]">
              为什么建设零碳工厂
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="text-center">
              <div className="bg-[#F5FAFF] p-6 rounded-lg w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 3L19.09 12.26L29 9L22.18 16L29 23L19.09 19.74L16 29L12.91 19.74L3 23L9.82 16L3 9L12.91 12.26L16 3Z"
                    fill="#058A65"
                  />
                </svg>
              </div>
              <h3 className="text-[20px] font-bold text-[#333] mb-4 tracking-[-0.2px]">
                政策驱动
              </h3>
              <p className="text-[16px] text-[#666] tracking-[-0.1px]">
                国家双碳政策要求，绿色制造成为企业发展必然趋势
              </p>
            </div>

            <div className="text-center">
              <div className="bg-[#F5FAFF] p-6 rounded-lg w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M28 8H4C2.9 8 2 8.9 2 10V22C2 23.1 2.9 24 4 24H28C29.1 24 30 23.1 30 22V10C30 8.9 29.1 8 28 8ZM28 22H4V10H28V22ZM6 12H10V20H6V12ZM12 14H16V20H12V14ZM18 16H22V20H18V16Z"
                    fill="#058A65"
                  />
                </svg>
              </div>
              <h3 className="text-[20px] font-bold text-[#333] mb-4 tracking-[-0.2px]">
                降本增效
              </h3>
              <p className="text-[16px] text-[#666] tracking-[-0.1px]">
                通过智能化管理，有效降低能耗成本，提升生产效率
              </p>
            </div>

            <div className="text-center">
              <div className="bg-[#F5FAFF] p-6 rounded-lg w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 2L20.09 10.26L30 12L22 20.74L24.18 30L16 25.5L7.82 30L10 20.74L2 12L11.91 10.26L16 2Z"
                    fill="#058A65"
                  />
                </svg>
              </div>
              <h3 className="text-[20px] font-bold text-[#333] mb-4 tracking-[-0.2px]">
                品牌提升
              </h3>
              <p className="text-[16px] text-[#666] tracking-[-0.1px]">
                树立绿色企业形象，增强市场竞争力和品牌价值
              </p>
            </div>

            <div className="text-center">
              <div className="bg-[#F5FAFF] p-6 rounded-lg w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 2C8.27 2 2 8.27 2 16C2 23.73 8.27 30 16 30C23.73 30 30 23.73 30 16C30 8.27 23.73 2 16 2ZM16 28C9.38 28 4 22.62 4 16C4 9.38 9.38 4 16 4C22.62 4 28 9.38 28 16C28 22.62 22.62 28 16 28ZM22.59 9.41L14 18L9.41 13.41L8 14.82L14 20.82L24 10.82L22.59 9.41Z"
                    fill="#058A65"
                  />
                </svg>
              </div>
              <h3 className="text-[20px] font-bold text-[#333] mb-4 tracking-[-0.2px]">
                市场准入
              </h3>
              <p className="text-[16px] text-[#666] tracking-[-0.1px]">
                满足绿色供应链要求，获得更多商业合作机会
              </p>
            </div>

            <div className="text-center">
              <div className="bg-[#F5FAFF] p-6 rounded-lg w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 3C10.5 3 6 7.5 6 13C6 18.5 10.5 23 16 23C21.5 23 26 18.5 26 13C26 7.5 21.5 3 16 3ZM14 18L9 13L10.41 11.59L14 15.17L21.59 7.58L23 9L14 18ZM16 29C8.82 29 3 23.18 3 16H5C5 22.08 9.92 27 16 27C22.08 27 27 22.08 27 16H29C29 23.18 23.18 29 16 29Z"
                    fill="#058A65"
                  />
                </svg>
              </div>
              <h3 className="text-[20px] font-bold text-[#333] mb-4 tracking-[-0.2px]">
                风险防控
              </h3>
              <p className="text-[16px] text-[#666] tracking-[-0.1px]">
                应对碳税征收等未来政策风险，提前布局绿色转型
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Zero Carbon Factory Construction Path Section */}
      <section id="factory-path" className="py-[88px] bg-[#F7F8FA]">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-[32px] font-bold text-[#333] mb-4 tracking-[-0.64px]">
              零碳工厂建设路径
            </h2>
            <p className="text-[16px] text-[#858C95] max-w-[800px] mx-auto tracking-[-0.1px]">
              六步实现零碳工厂目标，系统性指导企业绿色转型升级
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "现状调研",
                description:
                  "深入了解工厂现有能源结构、碳排放基线、生产工艺等基础情况",
              },
              {
                step: "2",
                title: "目标制定",
                description:
                  "设定分阶段减碳目标，制定零碳工厂建设时间表和里程碑",
              },
              {
                step: "3",
                title: "技术改造",
                description:
                  "实施节能技术改造、清洁能源替代、工艺流程优化等措施",
              },
              {
                step: "4",
                title: "系统建设",
                description: "部署智能化能碳管理系统，实现数据采集、分析和优化",
              },
              {
                step: "5",
                title: "运营管理",
                description: "建立完善的碳管理制度，培训专业团队，持续优化运营",
              },
              {
                step: "6",
                title: "认证验收",
                description: "申请零碳工厂认证，通过第三方验证，获得权威认可",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-8 shadow-sm relative"
              >
                <div className="absolute top-4 right-4 bg-[#058A65] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  {item.step}
                </div>
                <h3 className="text-[22px] font-bold text-[#333] mb-4 tracking-[-0.22px]">
                  {item.title}
                </h3>
                <p className="text-[16px] text-[#666] tracking-[-0.1px]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Information Management System Section */}
      <section className="py-[88px] bg-white">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-[32px] font-bold text-[#333] mb-4 tracking-[-0.64px]">
              信息化能碳管理系统
            </h2>
            <p className="text-[16px] text-[#858C95] max-w-[800px] mx-auto tracking-[-0.1px]">
              智能化系统助力零碳工厂管理，实现全流程数字化监控与优化
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white border border-[#EAEBF0] rounded-lg p-8 h-[280px] flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 mb-6">
                  <div className="bg-[#F5FAFF] p-3 rounded-lg w-12 h-12 flex items-center justify-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 3V21H21V3H3ZM19 19H5V5H19V19ZM17 7H7V9H17V7ZM17 11H7V13H17V11ZM17 15H7V17H17V15Z"
                        fill="#058A65"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-[22px] font-bold text-[#333] mb-4 tracking-[-0.22px]">
                  数据采集监控
                </h3>
                <p className="text-[16px] text-[#666] tracking-[-0.16px]">
                  实时采集能源消耗、设备运行等关键数据
                </p>
              </div>
            </div>

            <div className="bg-white border border-[#EAEBF0] rounded-lg p-8 h-[280px] flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 mb-6">
                  <div className="bg-[#F5FAFF] p-3 rounded-lg w-12 h-12 flex items-center justify-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM7 10H17V12H7V10ZM7 14H14V16H7V14Z"
                        fill="#058A65"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-[22px] font-bold text-[#333] mb-4 tracking-[-0.22px]">
                  碳排放核算
                </h3>
                <p className="text-[16px] text-[#666] tracking-[-0.16px]">
                  精准计算各环节碳排放量，建立完整碳账本
                </p>
              </div>
            </div>

            <div className="bg-white border border-[#EAEBF0] rounded-lg p-8 h-[280px] flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 mb-6">
                  <div className="bg-[#F5FAFF] p-3 rounded-lg w-12 h-12 flex items-center justify-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2L13.09 8.26L19 9L14.18 13.27L15.18 19L12 16.77L8.82 19L9.82 13.27L5 9L10.91 8.26L12 2Z"
                        fill="#058A65"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-[22px] font-bold text-[#333] mb-4 tracking-[-0.22px]">
                  智能优化
                </h3>
                <p className="text-[16px] text-[#666] tracking-[-0.16px]">
                  AI算法驱动，提供节能减排优化建议
                </p>
              </div>
            </div>

            <div className="bg-white border border-[#EAEBF0] rounded-lg p-8 h-[280px] flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 mb-6">
                  <div className="bg-[#F5FAFF] p-3 rounded-lg w-12 h-12 flex items-center justify-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z"
                        fill="#058A65"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-[22px] font-bold text-[#333] mb-4 tracking-[-0.22px]">
                  报告生成
                </h3>
                <p className="text-[16px] text-[#666] tracking-[-0.16px]">
                  自动生成各类碳管理报告，支持合规披露
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Support Section */}
      <section className="py-[88px] bg-[#058A65]">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-[32px] font-bold text-white mb-4 tracking-[-0.48px]">
              实施保障和支撑
            </h2>
            <p className="text-[16px] text-white/80 max-w-[800px] mx-auto tracking-[-0.16px]">
              专业团队提供全程技术支持，确保零碳工厂建设顺利实施
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg p-8 h-[200px] flex flex-col justify-center items-center text-center">
              <div className="w-12 h-12 mb-4 flex items-center justify-center">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 2C8.27 2 2 8.27 2 16C2 23.73 8.27 30 16 30C23.73 30 30 23.73 30 16C30 8.27 23.73 2 16 2ZM16 28C9.38 28 4 22.62 4 16C4 9.38 9.38 4 16 4C22.62 4 28 9.38 28 16C28 22.62 22.62 28 16 28ZM15 8H17V16H15V8ZM15 18H17V20H15V18Z"
                    fill="#058A65"
                  />
                </svg>
              </div>
              <h3 className="text-[18px] font-bold text-[#333] mb-2 tracking-[-0.18px]">
                专家团队
              </h3>
              <p className="text-[14px] text-[#666] tracking-[-0.14px]">
                资深碳管理专家全程指导
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 h-[200px] flex flex-col justify-center items-center text-center">
              <div className="w-12 h-12 mb-4 flex items-center justify-center">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M28 8H4C2.9 8 2 8.9 2 10V22C2 23.1 2.9 24 4 24H28C29.1 24 30 23.1 30 22V10C30 8.9 29.1 8 28 8ZM28 22H4V10H28V22ZM6 12H10V20H6V12ZM12 14H16V20H12V14ZM18 16H22V20H18V16Z"
                    fill="#058A65"
                  />
                </svg>
              </div>
              <h3 className="text-[18px] font-bold text-[#333] mb-2 tracking-[-0.18px]">
                技术培训
              </h3>
              <p className="text-[14px] text-[#666] tracking-[-0.14px]">
                系统化培训企业管理团队
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 h-[200px] flex flex-col justify-center items-center text-center">
              <div className="w-12 h-12 mb-4 flex items-center justify-center">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 2L20.09 10.26L30 12L22 20.74L24.18 30L16 25.5L7.82 30L10 20.74L2 12L11.91 10.26L16 2Z"
                    fill="#058A65"
                  />
                </svg>
              </div>
              <h3 className="text-[18px] font-bold text-[#333] mb-2 tracking-[-0.18px]">
                持续优化
              </h3>
              <p className="text-[14px] text-[#666] tracking-[-0.14px]">
                定期评估优化管理策略
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 h-[200px] flex flex-col justify-center items-center text-center">
              <div className="w-12 h-12 mb-4 flex items-center justify-center">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 3C10.5 3 6 7.5 6 13C6 18.5 10.5 23 16 23C21.5 23 26 18.5 26 13C26 7.5 21.5 3 16 3ZM14 18L9 13L10.41 11.59L14 15.17L21.59 7.58L23 9L14 18Z"
                    fill="#058A65"
                  />
                </svg>
              </div>
              <h3 className="text-[18px] font-bold text-[#333] mb-2 tracking-[-0.18px]">
                认证支持
              </h3>
              <p className="text-[14px] text-[#666] tracking-[-0.14px]">
                协助申请权威认证体系
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Typical Application Scenarios Section */}
      <section className="py-[88px] bg-white">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-[32px] font-bold text-[#333] mb-4 tracking-[-0.64px]">
              典型应用场景
            </h2>
            <p className="text-[16px] text-[#858C95] max-w-[800px] mx-auto tracking-[-0.1px]">
              覆盖各类制造业场景，提供针对性的零碳工厂解决方案
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white border border-[#EAEBF0] rounded-lg shadow-sm overflow-hidden">
              <div className="h-[200px] overflow-hidden">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/6278c676c2ad30d7e027ccabe01c97e69052b327?width=560"
                  alt="电子制造"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-[22px] font-bold text-[#333] mb-4 tracking-[-0.22px]">
                  电子制造
                </h3>
                <p className="text-[16px] text-[#666] tracking-[-0.1px]">
                  半导体、消费电子等高耗能制造业的零碳转型典型案例
                </p>
              </div>
            </div>

            <div className="bg-white border border-[#EAEBF0] rounded-lg shadow-sm overflow-hidden">
              <div className="h-[200px] overflow-hidden">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/19417e8a7776c13c6c140cf41d4bf3d5fb5f662a?width=560"
                  alt="汽车制造"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-[22px] font-bold text-[#333] mb-4 tracking-[-0.22px]">
                  汽车制造
                </h3>
                <p className="text-[16px] text-[#666] tracking-[-0.1px]">
                  汽车及零部件制造企业的绿色工厂建设实践
                </p>
              </div>
            </div>

            <div className="bg-white border border-[#EAEBF0] rounded-lg shadow-sm overflow-hidden">
              <div className="h-[200px] overflow-hidden">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/057e0cdafd21c78f25cd903a7ae570798f3f48d0?width=560"
                  alt="化工制造"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-[22px] font-bold text-[#333] mb-4 tracking-[-0.22px]">
                  化工制造
                </h3>
                <p className="text-[16px] text-[#666] tracking-[-0.1px]">
                  石化、精细化工等行业的低碳转型解决方案
                </p>
              </div>
            </div>

            <div className="bg-white border border-[#EAEBF0] rounded-lg shadow-sm overflow-hidden">
              <div className="h-[200px] overflow-hidden">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/f14fb6ae155be56e4370c89a04f2842b615e855b?width=560"
                  alt="纺织制造"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-[22px] font-bold text-[#333] mb-4 tracking-[-0.22px]">
                  纺织制造
                </h3>
                <p className="text-[16px] text-[#666] tracking-[-0.1px]">
                  服装、纺织品制造的可持续发展转型路径
                </p>
              </div>
            </div>

            <div className="bg-white border border-[#EAEBF0] rounded-lg shadow-sm overflow-hidden">
              <div className="h-[200px] overflow-hidden">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/6278c676c2ad30d7e027ccabe01c97e69052b327?width=560"
                  alt="食品制造"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-[22px] font-bold text-[#333] mb-4 tracking-[-0.22px]">
                  食品制造
                </h3>
                <p className="text-[16px] text-[#666] tracking-[-0.1px]">
                  食品饮料加工企业的绿色生产模式创新
                </p>
              </div>
            </div>

            <div className="bg-white border border-[#EAEBF0] rounded-lg shadow-sm overflow-hidden">
              <div className="h-[200px] overflow-hidden">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/19417e8a7776c13c6c140cf41d4bf3d5fb5f662a?width=560"
                  alt="建材制造"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-[22px] font-bold text-[#333] mb-4 tracking-[-0.22px]">
                  建材制造
                </h3>
                <p className="text-[16px] text-[#666] tracking-[-0.1px]">
                  水泥、钢铁等高碳排放行业的减排改造方案
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
      <Footer />
    </div>
  );
}
