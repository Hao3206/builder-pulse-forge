import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function CarbonNeutralityPlanning() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const reasons = [
    { title: "合规达标与政策窗口", desc: "响应双碳战略与地方考核要求，抢抓政策红利。" },
    { title: "成本优化与风险管理", desc: "能源结构优化与能效提升，缓释碳税与供需波动风险。" },
    { title: "市场与品牌价值", desc: "绿色竞争力加分，增强客户与投资者信任。" },
    { title: "供应链协同与溢出效应", desc: "对接上下游低碳协同，形成规模化减排与数据流通。" },
  ];

  const roadmap = [
    { step: "1", title: "基线盘查", desc: "开展组织边界设定与基准年核算，识别主要排放源。" },
    { step: "2", title: "目标设定", desc: "制定碳达峰与碳中和目标，参考SBTi等科学目标框架。" },
    { step: "3", title: "情景与路径设计", desc: "构建多情景（保守/稳健/领先）与技术路线图。" },
    { step: "4", title: "节能与工艺优化", desc: "实施节能改造、余热利用、过程优化与精益管理" },
    { step: "5", title: "清洁能源替代", desc: "推进绿电采购、自建分布式与电气化改造。" },
    { step: "6", title: "负排放与抵消", desc: "布局CCUS与高质量碳汇/信用抵消，实现残余中和。" },
  ];

  const pillars = [
    { title: "数据治理与平台", desc: "统一数据底座，贯通能耗、生产、排放与财务口径。" },
    { title: "方法学与模型库", desc: "对标IPCC、ISO、GHG Protocol，沉淀行业参数与曲线。" },
    { title: "投策评估与ROI", desc: "项目组合评估、边际减排成本曲线（MACC），辅助决策。" },
    { title: "组织机制与内控", desc: "目标分解、绩效考核与内审流程，确保持续落地。" },
  ];

  const standards = [
    "ISO 14064 组织温室气体核算",
    "GHG Protocol 企业核算标准",
    "SBTi 科学减排目标",
    "ISO 50001 能源管理体系",
    "IPCC 2006 指南与后续修订",
  ];

  const deliverables = [
    "碳达峰/碳中和路线图报告",
    "MACC曲线与投资优先级建议",
    "年度实施计划与KPI体系",
    "绿电采购与RE证书策略",
    "抵消策略与风险合规建议",
  ];

  const faqs = [
    { q: "如何设定达峰/中和目标？", a: "结合行业基准、存量资产与增长规划，参照SBTi与地方细则进行校准。" },
    { q: "路径如何动态调整？", a: "采用年度滚动评审与情景更新机制，结合价格、政策与技术迭代修订。" },
    { q: "数据口径不一致怎么办？", a: "建立统一数据标准与治理流程，平台化采集与校核，确保可追溯。" },
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
            <h1 className="text-[52px] font-bold leading-[60px] text-white mb-6 tracking-[-0.52px]">碳达峰碳中和路径规划</h1>
            <p className="text-lg text-white/90 mb-10 tracking-[-0.1px]">以数据为底座、以路径为抓手，规划可落地、可量化、可验证的双碳路线图</p>
            <div className="flex gap-4 justify-center">
              <a href="#contact" className="bg-[#058A65] text-white px-6 py-3 rounded-full font-semibold text-[15px] shadow-sm">获取方案</a>
              <a href="#roadmap" className="bg-white/10 backdrop-blur text-white px-6 py-3 rounded-full font-semibold text-[15px] border border-white/30">查看路径</a>
            </div>
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="py-[88px] bg-white">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-[32px] font-bold text-[#333] mb-4 tracking-[-0.64px]">为什么需要路径规划</h2>
            <p className="text-[16px] text-[#858C95] max-w-[800px] mx-auto tracking-[-0.1px]">以系统工程方法，统筹目标、项目与投策，实现稳步达峰与高质量中和。</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {reasons.map((r, i) => (
              <div key={i} className="bg-white border border-[#EAEBF0] rounded-lg p-8">
                <h3 className="text-[20px] font-bold text-[#333] mb-3 tracking-[-0.2px]">{r.title}</h3>
                <p className="text-[15px] text-[#666] tracking-[-0.1px]">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="py-[88px] bg-[#F7F8FA]">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-[32px] font-bold text-[#333] mb-4 tracking-[-0.64px]">达峰与中和路线图</h2>
            <p className="text-[16px] text-[#858C95] max-w-[800px] mx-auto tracking-[-0.1px]">六步构建从基线到中和的完整闭环，年度滚动迭代。</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {roadmap.map((s, idx) => (
              <div key={idx} className="bg-white rounded-lg p-8 shadow-sm relative">
                <div className="absolute top-4 right-4 bg-[#058A65] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">{s.step}</div>
                <h3 className="text-[22px] font-bold text-[#333] mb-3 tracking-[-0.22px]">{s.title}</h3>
                <p className="text-[15px] text-[#666] tracking-[-0.1px]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-[88px] bg-white">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-[32px] font-bold text-[#333] mb-4 tracking-[-0.64px]">实施支柱</h2>
            <p className="text-[16px] text-[#858C95] max-w-[800px] mx-auto tracking-[-0.1px]">平台+方法+投策+组织四位一体，保障方案落地。</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((p, i) => (
              <div key={i} className="bg-white border border-[#EAEBF0] rounded-lg p-8 h-[200px] flex flex-col justify-between">
                <div>
                  <h3 className="text-[20px] font-bold text-[#333] mb-3 tracking-[-0.2px]">{p.title}</h3>
                  <p className="text-[15px] text-[#666] tracking-[-0.1px]">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Standards */}
      <section className="py-[88px] bg-white">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-[32px] font-bold text-[#333] mb-4 tracking-[-0.64px]">遵循的标准与框架</h2>
            <p className="text-[16px] text-[#858C95] max-w-[800px] mx-auto tracking-[-0.1px]">对齐国际国内主流体系，确保方法学合规与结果可审计。</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {standards.map((s, i) => (
              <span key={i} className="px-4 py-2 rounded-full bg-[#F2F9F7] text-[#058A65] text-[14px] border border-[#DAE0E6]">{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="py-[88px] bg-[#058A65]">
        <div className="max-w-[1280px] mx-auto px-8 text-white">
          <div className="text-center mb-16">
            <h2 className="text-[32px] font-bold mb-4 tracking-[-0.64px]">成果产出</h2>
            <p className="text-[16px] text-white/80 max-w-[800px] mx-auto tracking-[-0.1px]">标准化与可落地并重，支持投决与外部沟通。</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {deliverables.map((d, i) => (
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
            <p className="text-[16px] text-[#858C95] tracking-[-0.1px]">规划与实施过程中的关键问题与解法。</p>
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

      {/* Contact */}
      <section id="contact" className="py-[88px] bg-[#F2F9F7]">
        <div className="max-w-[840px] mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-[32px] font-bold text-[#333] mb-4 tracking-[-0.64px]">联系我们</h2>
            <p className="text-[16px] text-[#858C95] tracking-[-0.1px]">获取专属规划路线与投资测算，预约专家咨询。</p>
          </div>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" placeholder="您的姓名" className="w-full px-4 py-3 border border-[#DAE0E6] rounded-md bg-white text-[15px] placeholder-[#999] shadow-sm" />
              <input type="text" placeholder="您的联系方式" className="w-full px-4 py-3 border border-[#DAE0E6] rounded-md bg-white text-[15px] placeholder-[#999] shadow-sm" />
            </div>
            <input type="text" placeholder="您的公司" className="w-full px-4 py-3 border border-[#DAE0E6] rounded-md bg-white text-[15px] placeholder-[#999] shadow-sm" />
            <textarea placeholder="您的需求或关注领域（如能效、绿电、工艺优化等）" rows={5} className="w-full px-4 py-3 border border-[#DAE0E6] rounded-md bg-white text-[15px] placeholder-[#999] shadow-sm resize-none" />
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
