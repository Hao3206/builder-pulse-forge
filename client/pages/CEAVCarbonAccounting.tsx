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
      title: "合规申报保障",
      desc: "紧跟欧盟 CBAM 最新法规与模板，确保季度报告、年度报告零差错。",
      icon: (
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 2C8.27 2 2 8.27 2 16C2 23.73 8.27 30 16 30C23.73 30 30 23.73 30 16C30 8.27 23.73 2 16 2ZM14 22L8 16L9.41 14.59L14 19.17L22.59 10.58L24 12L14 22Z" fill="#058A65"/>
        </svg>
      ),
    },
    {
      title: "关税成本控管",
      desc: "提前测算嵌入式排放与证书额度，制定采购与价格策略，降低 CBAM 成本。",
      icon: (
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M28 8H4C2.9 8 2 8.9 2 10V22C2 23.1 2.9 24 4 24H28C29.1 24 30 23.1 30 22V10C30 8.9 29.1 8 28 8ZM28 22H4V10H28V22ZM6 12H10V20H6V12ZM12 14H16V20H12V14ZM18 16H22V20H18V16Z" fill="#058A65"/>
        </svg>
      ),
    },
    {
      title: "供应链数据协同",
      desc: "搭建供应商数据通道，获取高质量输入，满足境外客户嵌入式排放申报要求。",
      icon: (
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 2L20.09 10.26L30 12L22 20.74L24.18 30L16 25.5L7.82 30L10 20.74L2 12L11.91 10.26L16 2Z" fill="#058A65"/>
        </svg>
      ),
    },
    {
      title: "品牌与市场竞争力",
      desc: "以合规碳数据支持客户拓展与招投标，提升绿色品牌形象与议价能力。",
      icon: (
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 3C10.5 3 6 7.5 6 13C6 18.5 10.5 23 16 23C21.5 23 26 18.5 26 13C26 7.5 21.5 3 16 3ZM14 18L9 13L10.41 11.59L14 15.17L21.59 7.58L23 9L14 18Z" fill="#058A65"/>
        </svg>
      ),
    },
  ];

  const steps = [
    { step: "1", title: "产品识别与风险评估", desc: "梳理出口欧盟的 CBAM 涵盖产品、关税编码与责任主体。" },
    { step: "2", title: "数据采集与质量控制", desc: "建立工序级能耗、原料、排放台账，明确数据来源与等级。" },
    { step: "3", title: "排放核算与因子管理", desc: "依据实测/估算/默认因子核算直接、间接排放，区分可抵扣电量。" },
    { step: "4", title: "CBAM 报告生成", desc: "自动生成季度、年度报告与 XML/Excel 模板，支持多语组稿。" },
    { step: "5", title: "验证与审查配合", desc: "协同第三方审查机构，提供留痕证据与问询响应。" },
    { step: "6", title: "证书采购与递交", desc: "测算证书需求，管理采购、注销与结转，完成正式递交。" },
  ];

  const modules = [
    { title: "CBAM 产品库", desc: "内置 CN 编码、默认排放与法规更新，快速匹配适用产品与国家。" },
    { title: "数据台账中心", desc: "采集生产、能源、原料、工序数据，支持批次追溯与版本管理。" },
    { title: "排放核算引擎", desc: "兼容实测、估算、默认路径，自动区分可抵扣电力与工序排放。" },
    { title: "供应商协同门户", desc: "邀请上游提交排放数据与附件，形成跨境协同证据链。" },
    { title: "报告与模板库", desc: "一键生成季度报告、年度审查报告、客户沟通材料，多语言输出。" },
    { title: "证书与风控管理", desc: "测算证书需求，预警缺口与成本，管理采购、注销全流程记录。" },
  ];

  const standards = [
    "Regulation (EU) 2023/956 — CBAM 正式法规",
    "Implementing Regulation (EU) 2023/1773 — 过渡期申报细则",
    "CBAM Transitional Registry & Communication Guidance",
    "GHG Protocol 企业与产品核算标准",
  ];

  const faqs = [
    { q: "哪些产品需要开展 CBAM 核算？", a: "目前涵盖铁钢、水泥、铝、电力、化肥、氢六大类，需结合关税编码判断是否在监管清单内。企业应密切关注欧盟扩围计划。" },
    { q: "没有实测排放因子可以申报吗？", a: "过渡期可使用欧盟默认值，但建议尽快建立实测因子体系，以降低正式期证书成本并提升客户认可度。" },
    { q: "CBAM 证书应如何管理？", a: "需在 CBAM 注册账户内按季度采购、注销证书。系统可协助测算需求、生成采购计划并留存审批记录，确保财务合规。" },
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
            <h1 className="text-[52px] font-bold leading-[60px] text-white mb-6 tracking-[-0.52px] whitespace-nowrap">
              CBAM 碳边境调节机制应对服务
            </h1>
            <p className="text-lg text-white/90 mb-10 tracking-[-0.1px]">
              面向出口欧盟的制造企业，提供从核算、申报到证书管理的一站式解决方案
            </p>
            <div className="flex gap-4 justify-center">
              <a href="#contact" className="bg-[#058A65] text-white px-6 py-3 rounded-full font-semibold text-[15px] shadow-sm">立即咨询</a>
              <a href="#process" className="bg-white/10 backdrop-blur text-white px-6 py-3 rounded-full font-semibold text-[15px] border border-white/30">查看流程</a>
            </div>
          </div>
        </div>
      </section>

      {/* Why CBAM */}
      <section className="py-[88px] bg-white">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-[32px] font-bold text-[#333] mb-4 tracking-[-0.64px]">为什么要提前应对 CBAM</h2>
            <p className="text-[16px] text-[#858C95] max-w-[800px] mx-auto tracking-[-0.1px]">从合规、成本、供应链与市场四大维度，助力企业稳健进入欧盟市场。</p>
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
            <p className="text-[16px] text-[#858C95] max-w-[800px] mx-auto tracking-[-0.1px]">严格对标国际国内通行标准，确保结果权威可靠。</p>
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
              "CBAM 季度报告与年度综合报告",
              "第三方审查结论与整改建议",
              "证书需求测算与采购计划",
              "客户与供应链沟通材料（多语种）",
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
            <p className="text-[16px] text-[#858C95] tracking-[-0.1px]">预约 CBAM 顾问，获取专项诊断与系统演示，快速搭建合规申报体系。</p>
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
