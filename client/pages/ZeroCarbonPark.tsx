import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ZeroCarbonPark() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white font-inter">
      {/* Sticky Header */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-lg" : "bg-transparent"
        }`}
      >
        <Header isScrolled={isScrolled} />
      </div>

      {/* Hero Section */}
      <section className="relative w-full h-[518px] bg-white">
        {/* Background Layers */}
        <div className="absolute inset-0">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#155B75] to-[#088AB2]" />
          {/* Background Image with multiply blend */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://api.builder.io/api/v1/image/assets/TEMP/8a78814ba839293dd723ad68882b975c1a9dfbf2?width=2880')",
              mixBlendMode: "multiply",
            }}
          />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 flex flex-col justify-center items-center w-full h-full px-[30px] pt-20 pb-[92px]">
          <div className="flex w-[640px] flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-12 w-full">
              <div className="flex flex-col items-center gap-6 w-full">
                <h1 className="text-[#F9F9F9] text-center font-inter text-[52px] font-bold leading-[60px] tracking-[-0.52px] w-full">
                  构建零碳园区生态系统
                </h1>
                <h2 className="text-[#F9F9F9] text-center font-inter text-[30px] font-bold leading-[26px] tracking-[-0.1px] w-full">
                  打造可持续发展的智慧园区管理平台
                </h2>
                <p className="text-[#F9F9F9] text-center font-inter text-lg font-normal leading-[26px] tracking-[-0.1px] w-full">
                  从规划设计到运营管理，全方位助力园区实现零碳目标
                </p>
              </div>
              <div className="flex items-start gap-4">
                <button className="flex w-[142px] py-3 px-[18px] justify-center items-center gap-1.5 rounded-full bg-[#058A65] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.04)]">
                  <span className="text-white font-inter text-[15px] font-bold leading-[22px]">
                    立即了解方案
                  </span>
                </button>
                <button className="flex py-3 px-[18px] justify-center items-center gap-1.5 rounded-full bg-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.04)]">
                  <span className="text-[#058A65] font-inter text-[15px] font-bold leading-[22px]">
                    查看成功案例
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="w-full py-[100px] px-[112px] flex flex-col justify-center items-center gap-16 bg-white">
        <div className="flex max-w-[1280px] flex-col justify-center items-center gap-3 w-full">
          <div className="flex w-[800px] flex-col justify-center items-center gap-2">
            <div className="flex flex-col items-center gap-4 w-full">
              <h2 className="text-[#333] text-center font-inter text-[32px] font-bold leading-10 tracking-[-0.48px] w-full">
                什么是零碳园区解决方案？
              </h2>
              <p className="text-[#858C95] text-center font-inter text-lg font-normal leading-[26px] tracking-[-0.18px] w-full">
                零碳园区解决方案是集园区规划设计、能源管理、碳排放监控、
                <br />
                生态环境优化为一体的综合管理平台，助力产业园区实现零碳目标。
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-12 w-full">
          <div className="flex w-[528px] flex-col items-start gap-10">
            <div className="flex flex-col items-start gap-6 w-full">
              <div className="flex flex-col items-start gap-3 w-full">
                <div className="flex flex-col items-start gap-[30px] w-full">
                  <div className="flex flex-col items-start gap-3 w-full">
                    <h3 className="text-[#333] font-inter text-[24px] font-bold leading-8 tracking-[-0.24px] w-full">
                      核心特色
                    </h3>
                    <ul className="text-[#666] font-inter text-base font-normal leading-6 tracking-[-0.16px] w-full space-y-2">
                      <li>• 全生命周期碳管理：从规划到运营的全过程零碳管控</li>
                      <li>• 智能化园区运营：基于物联网和大数据的智慧管理</li>
                      <li>• 多元化能源配置：可再生能源优化配置与调度</li>
                      <li>• 生态环境保护：绿色建筑与生态环境一体化设计</li>
                      <li>• 产业协同发展：低碳产业链构建与优化</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/ad33659c33381eac40061641b81f19d65a13ad9f?width=1040"
            className="w-[520px] h-[400px] rounded-[20px] border-2 border-[#E5E5E7] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.04)]"
            alt="零碳园区示意图"
          />
        </div>
      </section>

      {/* Core Functions Section */}
      <section className="w-full py-[88px] px-[112px] flex flex-col justify-center items-center gap-16 bg-[#F7F8FA]">
        <div className="flex max-w-[1280px] flex-col justify-center items-center gap-3 w-full">
          <div className="flex w-[800px] flex-col justify-center items-center gap-2">
            <div className="flex flex-col items-center gap-4 w-full">
              <h2 className="text-[#333] text-center font-inter text-[32px] font-bold leading-10 tracking-[-0.48px] w-full">
                解决方案核心模块
              </h2>
              <p className="text-[#858C95] text-center font-inter text-lg font-normal leading-6 tracking-[-0.16px] w-full">
                覆盖园区建设运营全流程的综合解决方案
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8 w-full max-w-[1280px]">
          {[
            {
              icon: "🏗️",
              title: "零碳规划设计",
              description: "园区总体规划、碳减排路径设计、绿色建筑标准制定",
            },
            {
              icon: "⚡",
              title: "智慧能源管理",
              description: "可再生能源配置、储能系统设计、能源优化调度",
            },
            {
              icon: "📊",
              title: "碳排放监控",
              description: "实时碳排放监测、碳足迹追踪、碳中和目标管理",
            },
            {
              icon: "🌱",
              title: "生态环境优化",
              description: "绿色基础设施建设、生态修复、环境质量监测",
            },
            {
              icon: "🏭",
              title: "产业协同管理",
              description: "低碳产业引入、产业链协同、循环经济模式构建",
            },
            {
              icon: "🔧",
              title: "运营维护服务",
              description: "智能化运维、设备管理、性能优化、故障预警",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-6 p-8 rounded-[10px] bg-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.04)]"
            >
              <div className="flex w-16 h-16 justify-center items-center rounded-full bg-[#EBF8F6]">
                <span className="text-3xl">{item.icon}</span>
              </div>
              <div className="flex flex-col items-center gap-3 w-full">
                <h3 className="text-[#333] text-center font-inter text-[20px] font-bold leading-[28px] tracking-[-0.2px]">
                  {item.title}
                </h3>
                <p className="text-[#666] text-center font-inter text-base font-normal leading-6 tracking-[-0.16px]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full py-[88px] px-[112px] flex flex-col justify-center items-center gap-16 bg-white">
        <div className="flex max-w-[1280px] flex-col justify-center items-center gap-3 w-full">
          <div className="flex w-[800px] flex-col justify-center items-center gap-2">
            <div className="flex flex-col items-center gap-4 w-full">
              <h2 className="text-[#333] text-center font-inter text-[32px] font-bold leading-10 tracking-[-0.48px] w-full">
                零碳园区的优势
              </h2>
              <p className="text-[#858C95] text-center font-inter text-lg font-normal leading-6 tracking-[-0.16px] w-full">
                为园区发展带来的多重价值
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 w-full max-w-[1280px]">
          {[
            {
              title: "环境效益",
              points: [
                "大幅减少碳排放",
                "改善区域环境质量",
                "提升生态系统功能",
                "促进可持续发展",
              ],
            },
            {
              title: "经济效益",
              points: [
                "降低运营成本",
                "提升资产价值",
                "吸引绿色投资",
                "创造就业机会",
              ],
            },
            {
              title: "社会效益",
              points: [
                "提升园区形象",
                "改善工作环境",
                "促进产业升级",
                "增强竞争优势",
              ],
            },
            {
              title: "政策优势",
              points: [
                "享受政策支持",
                "获得补贴资金",
                "符合监管要求",
                "提升合规水平",
              ],
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col gap-6 p-8 rounded-[10px] border border-[#E5E5E7] bg-white"
            >
              <h3 className="text-[#333] font-inter text-[22px] font-bold leading-[30px] tracking-[-0.22px]">
                {item.title}
              </h3>
              <ul className="space-y-3">
                {item.points.map((point, pointIndex) => (
                  <li
                    key={pointIndex}
                    className="flex items-center gap-3 text-[#666] font-inter text-base font-normal leading-6 tracking-[-0.16px]"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#058A65]"></div>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="w-full py-[88px] px-[112px] flex flex-col justify-center items-center gap-16 bg-[#F7F8FA]">
        <div className="flex max-w-[1280px] flex-col justify-center items-center gap-3 w-full">
          <div className="flex w-[800px] flex-col justify-center items-center gap-2">
            <div className="flex flex-col items-center gap-4 w-full">
              <h2 className="text-[#333] text-center font-inter text-[32px] font-bold leading-10 tracking-[-0.48px] w-full">
                成功案例
              </h2>
              <p className="text-[#858C95] text-center font-inter text-lg font-normal leading-6 tracking-[-0.16px] w-full">
                已成功实施的零碳园区建设项目
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8 w-full max-w-[1280px]">
          {[
            {
              image:
                "https://api.builder.io/api/v1/image/assets/TEMP/a5a7491bf957bd8ca480e57dd9c04f41bc90e824?width=400",
              title: "某国家级经开区零碳示范园",
              description: "实现100%可再生能源供应，年减排CO₂超过50万吨",
            },
            {
              image:
                "https://api.builder.io/api/v1/image/assets/TEMP/4ba9d16fece065f0fbcc28a076415af2bb1b4bfb?width=400",
              title: "某高新技术产业园区",
              description: "建成区域首个零碳智慧园区，获得国际绿色认证",
            },
            {
              image:
                "https://api.builder.io/api/v1/image/assets/TEMP/c83347a96312ed3c58ce15679a8db6ac1c1cf473?width=400",
              title: "某生态工业园区改造",
              description: "传统园区零碳改造，节能率达到40%以上",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 rounded-[10px] bg-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.04)] overflow-hidden"
            >
              <img
                src={item.image}
                className="w-full h-[200px] object-cover"
                alt={item.title}
              />
              <div className="p-6">
                <h3 className="text-[#333] font-inter text-[18px] font-bold leading-[26px] tracking-[-0.18px] mb-3">
                  {item.title}
                </h3>
                <p className="text-[#666] font-inter text-base font-normal leading-6 tracking-[-0.16px]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full h-[240px] relative">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/c3d8bbdfb00719bc52fa3a75698c8e12e1c784dc?width=2880"
          className="w-full h-[240px] object-cover"
          style={{ backgroundBlendMode: "multiply" }}
          alt="背景图"
        />
        <div className="flex w-[600px] flex-col items-center gap-2 absolute left-[420px] top-[46px] h-[148px]">
          <div className="h-[148px] w-full relative">
            <div className="flex w-[600px] flex-col items-start gap-[30px] absolute left-0 top-0 h-[148px]">
              <div className="flex flex-col justify-center items-center gap-1.5 w-full">
                <h2 className="text-[#333] text-center font-inter text-[32px] font-bold leading-[42px] tracking-[-0.32px] w-full">
                  开启零碳园区建设之旅
                </h2>
                <p className="text-[#666] text-center font-inter text-base font-normal leading-6 tracking-[-0.1px] w-full">
                  欢迎咨询零碳园区解决方案，共同构建可持续发展的未来
                </p>
              </div>
              <div className="flex justify-center items-center gap-4 w-full">
                <button className="flex w-[120px] py-3 px-[18px] justify-center items-center gap-1.5 rounded-full bg-white">
                  <span className="text-[#058A65] text-center font-inter text-[15px] font-bold leading-[22px]">
                    联系我们
                  </span>
                </button>
                <button className="flex w-[120px] py-3 px-[18px] justify-center items-center gap-1.5 rounded-full bg-[#058A65] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.04)]">
                  <span className="text-white text-center font-inter text-[15px] font-bold leading-[22px]">
                    获取方案
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
