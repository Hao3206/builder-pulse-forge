import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function CarbonStandardDevelopment() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const reasons = [
    { title: "行业规范与对齐", desc: "建立统一口径与流程，提升跨企业、跨区域的可比性。" },
    { title: "合规与互认", desc: "对接国内外法规与市场机制，促进标准互认与流通。" },
    { title: "数据可度量", desc: "明确定义与计算方法，增强数据可验证与可审计。" },
    { title: "促进创新与落地", desc: "以标准牵引技术应用与产业化，形成良性生态。" },
  ];

  const scope = [
    { title: "技术标准", points: ["测量与计量", "检测与校准", "设备与系统接口"] },
    { title: "管理标准", points: ["组织管理流程", "绩效与考核", "内控与审核"] },
    { title: "方法学标准", points: ["核算边界与口径", "排放因子与模型", "不确定性评估"] },
    { title: "数据与交换标准", points: ["主数据字典", "数据格式与接口", "留痕与追溯"] },
  ];

  const process = [
    { step: "1", title: "立项与框架设计", desc: "明确对象、边界与采用框架，形成工作大纲。" },
    { step: "2", title: "调研与对标", desc: "系统检索国内外标准，完成差距分析与路径。" },
    { step: "3", title: "草案起草", desc: "形成术语、定义、流程与方法学条款。" },
    { step: "4", title: "征求意见", desc: "广泛征求政产学研用意见，汇总与修订。" },
    { step: "5", title: "试点验证", desc: "在标杆场景试运行，验证可实施性与可审计性。" },
    { step: "6", title: "评审发布与宣贯", desc: "组织专家评审、定稿发布并开展宣贯与培训。" },
  ];

  const modules = [
    { title: "标准治理与组织", desc: "专家委员会、秘书处机制与工作制度。" },
    { title: "条款起草工具", desc: "术语库、条款模板与交叉引用校核。" },
    { title: "意见征集与处理", desc: "线上征集、议题归并、处置闭环与记录。" },
    { title: "证据与案例库", desc: "试点案例、实测数据与验证材料留痕。" },
    { title: "版本与追溯管理", desc: "版本对比、变更���录与可视化红线。" },
    { title: "宣贯与培训支持", desc: "教材课件、考试题库与认证管理。" },
  ];

  const references = [
    "GB/T 国家与行业标准体系",
    "ISO 14060/14064/14067 及相关族",
    "GHG Protocol 组织与产品标准",
    "IPCC 指南与系数库",
    "地方与行业双碳指南",
  ];

  const deliverables = [
    "标准立项建议书与可行性报告",
    "标准草案与征求意见稿",
    "试点验证评估报告",
    "发布文本与应用指南",
    "宣贯培训材料与题库",
  ];

  const faqs = [
    { q: "一个标准周期多长？", a: "通常6-12个月，视范围与参与度而定；含立项、起草、征求意见、试点与发布。" },
    { q: "如何确保与国际接轨？", a: "采用对标矩阵与术语映射，保持与ISO/GHG Protocol一致性并记录差异。" },
    { q: "试点需要具备什么条件？", a: "具备代表性的业务场景与数据基础，并愿意开放验证与反馈。" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header isScrolled={isScrolled} />

      <section className="relative w-full h-[520px] bg-white">
        <div className="absolute inset-0">
          <div className="w-full h-full bg-gradient-to-r from-[#155B75] to-[#088AB2]" />
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://api.builder.io/api/v1/image/assets/TEMP/9026b87008e8884034ad247a59bfca58d7b09cc8?width=2880')", backgroundBlendMode: "multiply" }} />
        </div>
        <div className="relative z-10 flex items-center justify-center h-full pt-[88px]">
          <div className="max-w-[760px] text-center px-8">
            <h1 className="text-[52px] font-bold leading-[60px] text-white mb-6 tracking-[-0.52px]">双碳标准编制</h1>
            <p className="text-lg text-white/90 mb-10 tracking-[-0.1px]">以方法学为核心、以试点为抓手，打造可实施、可验证的行业标准</p>
            <div className="flex gap-4 justify-center">
              <a href="#contact" className="bg-[#058A65] text-white px-6 py-3 rounded-full font-semibold text-[15px] shadow-sm">申请合作</a>
              <a href="#process" className="bg-white/10 backdrop-blur text-white px-6 py-3 rounded-full font-semibold text-[15px] border border-white/30">查看流程</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-[88px] bg-white">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-[32px] font-bold text-[#333] mb-4 tracking-[-0.64px]">为什么开展标准编制</h2>
            <p className="text-[16px] text-[#858C95] max-w-[800px] mx-auto tracking-[-0.1px]">提升统一性、合规性与可审计性，助力行业健康发展。</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {reasons.map((r, i) => (
              <div key={i} className="bg-white border border-[#EAEBF0] rounded-lg p-8"><h3 className="text-[20px] font-bold text-[#333] mb-3 tracking-[-0.2px]">{r.title}</h3><p className="text-[15px] text-[#666] tracking-[-0.1px]">{r.desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-[88px] bg-[#F7F8FA]">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-[32px] font-bold text-[#333] mb-4 tracking-[-0.64px]">编制范围</h2>
            <p className="text-[16px] text-[#858C95] max-w-[800px] mx-auto tracking-[-0.1px]">覆盖技术、管理、方法学与数据标准的全景体系。</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {scope.map((s, i) => (
              <div key={i} className="bg-white rounded-lg p-8 shadow-sm"><h3 className="text-[22px] font-bold text-[#333] mb-4 tracking-[-0.22px]">{s.title}</h3><ul className="space-y-2 text-[15px] text-[#666]">{s.points.map((p, idx) => (<li key={idx}>• {p}</li>))}</ul></div>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="py-[88px] bg-white">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-[32px] font-bold text-[#333] mb-4 tracking-[-0.64px]">编制流程</h2>
            <p className="text-[16px] text-[#858C95] max-w-[800px] mx-auto tracking-[-0.1px]">标准化六步法，保证科学性、透明性与可实施性。</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {process.map((s, idx) => (
              <div key={idx} className="bg-white rounded-lg p-8 shadow-sm relative">
                <div className="absolute top-4 right-4 bg-[#058A65] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">{s.step}</div>
                <h3 className="text-[22px] font-bold text-[#333] mb-3 tracking-[-0.22px]">{s.title}</h3>
                <p className="text-[15px] text-[#666] tracking-[-0.1px]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-[88px] bg-white">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-[32px] font-bold text-[#333] mb-4 tracking-[-0.64px]">平台能力与工具</h2>
            <p className="text-[16px] text-[#858C95] max-w-[800px] mx-auto tracking-[-0.1px]">从治理到工具到证据库，沉淀标准化资产与流程。"</p>
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

      <section className="py-[88px] bg-white">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-[32px] font-bold text-[#333] mb-4 tracking-[-0.64px]">参考与对标</h2>
            <p className="text-[16px] text-[#858C95] max-w-[800px] mx-auto tracking-[-0.1px]">坚持国际接轨、本土适配、可执行可验证。</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {references.map((r, i) => (
              <span key={i} className="px-4 py-2 rounded-full bg-[#F2F9F7] text-[#058A65] text-[14px] border border-[#DAE0E6]">{r}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-[88px] bg-[#058A65]">
        <div className="max-w-[1280px] mx-auto px-8 text-white">
          <div className="text-center mb-16">
            <h2 className="text-[32px] font-bold mb-4 tracking-[-0.64px]">成果产出</h2>
            <p className="text-[16px] text白/80 max-w-[800px] mx-auto tracking-[-0.1px]">标准文本与方法学、应用指南与培训材料一体化交付。</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {deliverables.map((d, i) => (
              <div key={i} className="bg白 rounded-lg p-6 text-[#333] text-center font-semibold shadow-sm">{d}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-[88px] bg-white">
        <div className="max-w-[840px] mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-[32px] font-bold text-[#333] mb-4 tracking-[-0.64px]">常见问题</h2>
            <p className="text-[16px] text-[#858C95] tracking-[-0.1px]">标准治理、国际对标与试点验证等问题解答。</p>
          </div>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <details key={i} className="group border border-[#EAEBF0] rounded-lg p-6">
                <summary className="cursor-pointer list-none flex items-center justify-between"><span className="text-[16px] font-semibold text-[#333]">{f.q}</span><span className="ml-4 w-6 h-6 rounded-full bg-[#F2F9F7] text-[#058A65] flex items-center justify-center">+</span></summary>
                <div className="mt-3 text-[15px] text-[#666] leading-relaxed">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-[88px] bg-[#F2F9F7]">
        <div className="max-w-[840px] mx-auto px-8">
          <div className="text-center mb-12"><h2 className="text-[32px] font-bold text-[#333] mb-4 tracking-[-0.64px]">联系我们</h2><p className="text-[16px] text-[#858C95] tracking-[-0.1px]">共建行业标准与方法学，欢迎联合立项与试点。</p></div>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" placeholder="您的姓名" className="w-full px-4 py-3 border border-[#DAE0E6] rounded-md bg-white text-[15px] placeholder-[#999] shadow-sm" />
              <input type="text" placeholder="您的联系方式" className="w-full px-4 py-3 border border-[#DAE0E6] rounded-md bg-white text-[15px] placeholder-[#999] shadow-sm" />
            </div>
            <input type="text" placeholder="您的单位/机构" className="w-full px-4 py-3 border border-[#DAE0E6] rounded-md bg-white text-[15px] placeholder-[#999] shadow-sm" />
            <textarea placeholder="关注的标准方向与合作方式" rows={5} className="w-full px-4 py-3 border border-[#DAE0E6] rounded-md bg-white text-[15px] placeholder-[#999] shadow-sm resize-none" />
            <div className="text-center"><button className="bg-[#058A65] text-white px-6 py-3 rounded-full font-semibold text-[15px] shadow-sm">提交合作意向</button></div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
