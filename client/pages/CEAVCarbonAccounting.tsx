import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function CEAVCarbonAccounting() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const benefits = [
    {
      title: "合规与政策要求",
      desc: "满足国内外法规与供应链要求，支撑绿色低碳转型。",
      icon: (
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 2C8.27 2 2 8.27 2 16C2 23.73 8.27 30 16 30C23.73 30 30 23.73 30 16C30 8.27 23.73 2 16 2ZM14 22L8 16L9.41 14.59L14 19.17L22.59 10.58L24 12L14 22Z" fill="#058A65"/>
        </svg>
      ),
    },
    {
      title: "降本增效",
      desc: "识别高排放环节，优化能耗结构，助力成本优化。",
      icon: (
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M28 8H4C2.9 8 2 8.9 2 10V22C2 23.1 2.9 24 4 24H28C29.1 24 30 23.1 30 22V10C30 8.9 29.1 8 28 8ZM28 22H4V10H28V22ZM6 12H10V20H6V12ZM12 14H16V20H12V14ZM18 16H22V20H18V16Z" fill="#058A65"/>
        </svg>
      ),
    },
    {
      title: "品牌竞争力",
      desc: "提升绿色信誉与国际影响力，增强市场议价能力。",
      icon: (
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 2L20.09 10.26L30 12L22 20.74L24.18 30L16 25.5L7.82 30L10 20.74L2 12L11.91 10.26L16 2Z" fill="#058A65"/>
        </svg>
      ),
    },
    {
      title: "供应链协同",
      desc: "实现上游数据采集与下游披露对接，打造低碳供应链。",
      icon: (
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 3C10.5 3 6 7.5 6 13C6 18.5 10.5 23 16 23C21.5 23 26 18.5 26 13C26 7.5 21.5 3 16 3ZM14 18L9 13L10.41 11.59L14 15.17L21.59 7.58L23 9L14 18Z" fill="#058A65"/>
        </svg>
      ),
    },
  ];

  const steps = [
    { step: "1", title: "边界与对象界定", desc: "确定产品系统边界、功能单位与核算口径。" },
    { step: "2", title: "数据采集与质量控制", desc: "收集活动数据与排放因子，开展数据核验。" },
    { step: "3", title: "生命周期核算", desc: "依据方法学开展LCA核算，覆盖上游至下游。" },
    { step: "4", title: "减排识别与优化", desc: "识别高排放环节，提出节能降碳改进方案。" },
    { step: "5", title: "第三方验证与出具", desc: "组织第三方验证，获取核证与报告结论。" },
    { step: "6", title: "申报与对外披露", desc: "按标准完成申报披露，支撑市场准入与交易。" },
  ];

  const modules = [
    { title: "数据采集与对接", desc: "灵活接入ERP、MES、能源计量等系统，标准化采集。" },
    { title: "排放因子管理", desc: "内置权威排放因子库，支持自定义与版本管理。" },
    { title: "LCA核算引擎", desc: "符合ISO 14067、GHG Protocol的核算与分摊模型。" },
    { title: "供应商协同", desc: "供应商门户采数与校核，提升上游数据真实性。" },
    { title: "验证与留痕", desc: "全过程留痕与抽样记录，便于第三方验证。" },
    { title: "报告与披露", desc: "一键生成申报材料与合规披露报表，支持多语种。" },
  ];

  const standards = [
    "ISO 14067 产品碳足迹",
    "GHG Protocol 产品标准",
    "PAS 2050 生命周期评估",
    "ISO 14040/14044 LCA",
  ];

  const faqs = [
    { q: "如何选择核算边界？", a: "根据产品属性与应用场景，结合行业惯例与申报要求确定，确保可比性与可验证性。" },
    { q: "数据不完整怎么办？", a: "可采用替代数据与默认因子，但需进行不确定性评估与敏感性分析，并逐年提升质量。" },
    { q: "第三方验证周期多久？", a: "通常2-6周，取决于产品复杂度、数据完备程度与现场核查安排。" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header isScrolled={isScrolled} />

      {/* Hero */}
      <section className="relative w-full h-[520px] bg-white">
        <div className="absolute inset-0">
          <div className="w-full h-full bg-gradient-to-r from-[#155B75] to-[#088AB2]" />
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://api.builder.io/api/v1/image/assets/TEMP/9026b87008e8884034ad247a59bfca58d7b09cc8?width=2880')",
              backgroundBlendMode: "multiply",
            }}
          />
        </div>

        <div className="relative z-10 flex items-center justify-center h-full pt-[88px]">
          <div className="max-w-[760px] text-center px-8">
            <h1 className="text-[52px] font-bold leading-[60px] text-white mb-6 tracking-[-0.52px]">
              CEAV产品碳排放核算与申报
            </h1>
            <p className="text-lg text-white/90 mb-10 tracking-[-0.1px]">
              科学核算全生命周期碳排放 · 精准生成申报材料
            </p>
            <div className="flex gap-4 justify-center">
              <a href="#contact" className="bg-[#058A65] text-white px-6 py-3 rounded-full font-semibold text-[15px] shadow-sm">立即咨询</a>
              <a href="#process" className="bg-white/10 backdrop-blur text-white px-6 py-3 rounded-full font-semibold text-[15px] border border-white/30">查看流程</a>
            </div>
          </div>
        </div>
      </section>

      {/* Why CEAV */}
      <section className="py-[88px] bg-white">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-[32px] font-bold text-[#333] mb-4 tracking-[-0.64px]">为什么开展CEAV核算与申报</h2>
            <p className="text-[16px] text-[#858C95] max-w-[800px] mx-auto tracking-[-0.1px]">从合规、成本、品牌与供应链四大维度助力企业可持续发展。</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((b, i) => (
              <div key={i} className="bg-white border border-[#EAEBF0] rounded-lg p-8 h-full">
                <div className="w-12 h-12 mb-6 bg-[#F5FAFF] rounded-lg flex items-center justify-center">{b.icon}</div>
                <h3 className="text-[20px] font-bold text-[#333] mb-3 tracking-[-0.2px]">{b.title}</h3>
                <p className="text-[15px] text-[#666] tracking-[-0.1px]">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="py-[88px] bg-[#F7F8FA]">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-[32px] font-bold text-[#333] mb-4 tracking-[-0.64px]">核算与申报流程</h2>
            <p className="text-[16px] text-[#858C95] max-w-[800px] mx-auto tracking-[-0.1px]">标准化六步法，确保可比性、可追溯与可验证。</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((s, idx) => (
              <div key={idx} className="bg-white rounded-lg p-8 shadow-sm relative">
                <div className="absolute top-4 right-4 bg-[#058A65] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">{s.step}</div>
                <h3 className="text-[22px] font-bold text-[#333] mb-3 tracking-[-0.22px]">{s.title}</h3>
                <p className="text-[15px] text-[#666] tracking-[-0.1px]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Standards */}
      <section className="py-[88px] bg-white">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-[32px] font-bold text-[#333] mb-4 tracking-[-0.64px]">遵循的方法学与标准</h2>
            <p className="text-[16px] text-[#858C95] max-w-[800px] mx-auto tracking-[-0.1px]">严格对标国际��国内通行标准，确保结果权威可靠。</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {standards.map((s, i) => (
              <span key={i} className="px-4 py-2 rounded-full bg-[#F2F9F7] text-[#058A65] text-[14px] border border-[#DAE0E6]">{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="py-[88px] bg-white">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-[32px] font-bold text-[#333] mb-4 tracking-[-0.64px]">功能模块</h2>
            <p className="text-[16px] text-[#858C95] max-w-[800px] mx-auto tracking-[-0.1px]">覆盖从数据到披露的全流程，开箱即用、易于扩展。</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modules.map((m, i) => (
              <div key={i} className="bg-white border border-[#EAEBF0] rounded-lg p-8 h-[180px] flex flex-col justify-between">
                <div>
                  <h3 className="text-[20px] font-bold text-[#333] mb-3 tracking-[-0.2px]">{m.title}</h3>
                  <p className="text-[15px] text-[#666] tracking-[-0.1px]">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="py-[88px] bg-[#058A65]">
        <div className="max-w-[1280px] mx-auto px-8 text-white">
          <div className="text-center mb-16">
            <h2 className="text-[32px] font-bold mb-4 tracking-[-0.64px]">成果产出</h2>
            <p className="text-[16px] text-white/80 max-w-[800px] mx-auto tracking-[-0.1px]">标准化交付，助力合规申报与对外传播。</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "产品碳排放核算报告",
              "第三方验证/核证结论",
              "合规披露报表（多模板）",
              "申报材料与说明书",
            ].map((d, i) => (
              <div key={i} className="bg-white rounded-lg p-6 text-[#333] text-center font-semibold shadow-sm">{d}</div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-[88px] bg-white">
        <div className="max-w-[840px] mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-[32px] font-bold text-[#333] mb-4 tracking-[-0.64px]">常见问题</h2>
            <p className="text-[16px] text-[#858C95] tracking-[-0.1px]">为您解答开展核算与申报过程中的共性问题。</p>
          </div>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <details key={i} className="group border border-[#EAEBF0] rounded-lg p-6">
                <summary className="cursor-pointer list-none flex items-center justify-between">
                  <span className="text-[16px] font-semibold text-[#333]">{f.q}</span>
                  <span className="ml-4 w-6 h-6 rounded-full bg-[#F2F9F7] text-[#058A65] flex items-center justify-center">+</span>
                </summary>
                <div className="mt-3 text-[15px] text-[#666] leading-relaxed">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-[88px] bg-[#F2F9F7]">
        <div className="max-w-[840px] mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-[32px] font-bold text-[#333] mb-4 tracking-[-0.64px]">联系我们</h2>
            <p className="text-[16px] text-[#858C95] tracking-[-0.1px]">获取专属顾问与产品演示，了解��适合您的核算申报路径。</p>
          </div>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" placeholder="您的姓名" className="w-full px-4 py-3 border border-[#DAE0E6] rounded-md bg-white text-[15px] placeholder-[#999] shadow-sm"/>
              <input type="text" placeholder="您的联系方式" className="w-full px-4 py-3 border border-[#DAE0E6] rounded-md bg-white text-[15px] placeholder-[#999] shadow-sm"/>
            </div>
            <input type="text" placeholder="您的公司" className="w-full px-4 py-3 border border-[#DAE0E6] rounded-md bg-white text-[15px] placeholder-[#999] shadow-sm"/>
            <textarea placeholder="您的需求与产品信息" rows={5} className="w-full px-4 py-3 border border-[#DAE0E6] rounded-md bg-white text-[15px] placeholder-[#999] shadow-sm resize-none"/>
            <div className="text-center">
              <button className="bg-[#058A65] text-white px-6 py-3 rounded-full font-semibold text-[15px] shadow-sm">提交咨询</button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
