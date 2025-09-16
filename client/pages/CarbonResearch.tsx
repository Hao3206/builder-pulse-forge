import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function CarbonResearch() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const reasons = [
    { title: "政策前瞻与决策支持", desc: "围绕双碳战略开展政策机制研究，为企业与政府提供决策依据。" },
    { title: "技术创新与示范", desc: "探索节能降碳关键技术并开展示范应用，形成可复制路径。" },
    { title: "市场与金融机制", desc: "研究碳市场、绿电交易与绿色金融工具，支撑商业落地。" },
    { title: "数字化与数据资产", desc: "构建MRV与LCA模型体系，沉淀可复用数据资产与算法。" },
  ];

  const topics = [
    { title: "能效与工艺优化", points: ["过程能效评估", "精益与自动化", "余热余压利用"] },
    { title: "可再生能源与绿电", points: ["PPA与绿证策略", "储能与柔性负荷", "源网荷储协同"] },
    { title: "CCUS与负排放", points: ["捕集工艺与经济性", "封存监测", "生物质与BECCS"] },
    { title: "供应链与产品低碳", points: ["范围3核算", "产品碳足迹与分摊", "低碳材料与设计"] },
    { title: "碳市场与金融", points: ["配额机制与成本", "自愿减排方法学", "绿色金融工具"] },
    { title: "数字化与MRV", points: ["数据治理与口径", "LCA/MRV模型库", "不确定性与敏感性分析"] },
  ];

  const method = [
    { step: "1", title: "选题与立项", desc: "明确研究问题与价值，形成研究大纲与计划。" },
    { step: "2", title: "文献与对标", desc: "系统文献综述与国内外对标，识别研究空白。" },
    { step: "3", title: "模型与实验设计", desc: "建立理论模型或实验方案，确定数据需求与指标。" },
    { step: "4", title: "数据采集与试验", desc: "实测/仿真/问卷等多源数据获取与质量控制。" },
    { step: "5", title: "分析与结论", desc: "采用统计与优化方法得到结论并进行鲁棒性检验。" },
    { step: "6", title: "成果发布与应用", desc: "形成报告/论文/专利与应用指南，推进落地。" },
  ];

  const modules = [
    { title: "研究数据平台", desc: "统一数据底座，接入能耗/生产/气象/市场等多源数据。" },
    { title: "模型与算法库", desc: "提供LCA、MRV、优化与预测等模型组件与工具链。" },
    { title: "试点与项目管理", desc: "课题进度、样本与试验流程管理，沉淀证据库。" },
    { title: "成果管理与发布", desc: "报告模板、可视化图表、网页发布与知识库沉淀。" },
  ];

  const deliverables = [
    "研究报告与政策建议",
    "技术白皮书与方法学",
    "试验数据集与代码仓库",
    "论文/专利与软著",
    "示范项目与应用指南",
  ];

  const faqs = [
    { q: "课题周期多久？", a: "通常3-9个月，视研究深度与试验范围而定；复杂示范项目可分阶段实施。" },
    { q: "数据如何获取？", a: "结合公开数据、企业实测与第三方数据库，采用数据使用与隐私合规协议。" },
    { q: "知识产权如何归属？", a: "依据合作模式约定成果归属与许可方式，并做好保密与合规管理。" },
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
            <h1 className="text-[52px] font-bold leading-[60px] text-white mb-6 tracking-[-0.52px]">双碳课题研究</h1>
            <p className="text-lg text-white/90 mb-10 tracking-[-0.1px]">以科学研究赋能双碳实践，打造可验证、可复制的创新成果</p>
            <div className="flex gap-4 justify-center">
              <a href="#contact" className="bg-[#058A65] text-white px-6 py-3 rounded-full font-semibold text-[15px] shadow-sm">申请合作</a>
              <a href="#method" className="bg-white/10 backdrop-blur text-white px-6 py-3 rounded-full font-semibold text-[15px] border border-white/30">研究方法</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-[88px] bg-white">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="text-center mb-16"><h2 className="text-[32px] font-bold text-[#333] mb-4 tracking-[-0.64px]">为什么要开展课题研究</h2><p className="text-[16px] text-[#858C95] max-w-[800px] mx-auto tracking-[-0.1px]">面向政策、技术、市场与数据四个维度，形成系统性解决思路。</p></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">{reasons.map((r, i) => (<div key={i} className="bg-white border border-[#EAEBF0] rounded-lg p-8"><h3 className="text-[20px] font-bold text-[#333] mb-3 tracking-[-0.2px]">{r.title}</h3><p className="text-[15px] text-[#666] tracking-[-0.1px]">{r.desc}</p></div>))}</div>
        </div>
      </section>

      <section className="py-[88px] bg-[#F7F8FA]">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="text-center mb-16"><h2 className="text-[32px] font-bold text-[#333] mb-4 tracking-[-0.64px]">重点研究方向</h2><p className="text-[16px] text-[#858C95] max-w-[800px] mx-auto tracking-[-0.1px]">覆盖效率、能源、负排放、供应链、市场与数字化等核心主题。</p></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{topics.map((s, i) => (<div key={i} className="bg-white rounded-lg p-8 shadow-sm"><h3 className="text-[22px] font-bold text-[#333] mb-4 tracking-[-0.22px]">{s.title}</h3><ul className="space-y-2 text-[15px] text-[#666]">{s.points.map((p, idx) => (<li key={idx}>• {p}</li>))}</ul></div>))}</div>
        </div>
      </section>

      <section id="method" className="py-[88px] bg-white">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="text-center mb-16"><h2 className="text-[32px] font-bold text-[#333] mb-4 tracking-[-0.64px]">研究方法与路线</h2><p className="text-[16px] text-[#858C95] max-w-[800px] mx-auto tracking-[-0.1px]">标准化六步法，确保科学性、可复现与可评审。</p></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{method.map((s, idx) => (<div key={idx} className="bg-white rounded-lg p-8 shadow-sm relative"><div className="absolute top-4 right-4 bg-[#058A65] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">{s.step}</div><h3 className="text-[22px] font-bold text-[#333] mb-3 tracking-[-0.22px]">{s.title}</h3><p className="text-[15px] text-[#666] tracking-[-0.1px]">{s.desc}</p></div>))}</div>
        </div>
      </section>

      <section className="py-[88px] bg-white">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="text-center mb-16"><h2 className="text-[32px] font-bold text-[#333] mb-4 tracking-[-0.64px]">平台能力与工具</h2><p className="text-[16px] text-[#858C95] max-w-[800px] mx-auto tracking-[-0.1px]">以数据与模型为核心，沉淀研究方法与成果资产。</p></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">{modules.map((m, i) => (<div key={i} className="bg-white border border-[#EAEBF0] rounded-lg p-8 h-[180px] flex flex-col justify-between"><div><h3 className="text-[20px] font-bold text-[#333] mb-3 tracking-[-0.2px]">{m.title}</h3><p className="text-[15px] text-[#666] tracking-[-0.1px]">{m.desc}</p></div></div>))}</div>
        </div>
      </section>

      <section className="py-[88px] bg-[#058A65]">
        <div className="max-w-[1280px] mx-auto px-8 text-white">
          <div className="text-center mb-16"><h2 className="text-[32px] font-bold mb-4 tracking-[-0.64px]">成果产出</h2><p className="text-[16px] text-white/80 max-w-[800px] mx-auto tracking-[-0.1px]">形成可发表、可应用、可复制的研究成果体系。</p></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">{deliverables.map((d, i) => (<div key={i} className="bg-white rounded-lg p-6 text-[#333] text-center font-semibold shadow-sm">{d}</div>))}</div>
        </div>
      </section>

      <section className="py-[88px] bg-white">
        <div className="max-w-[840px] mx-auto px-8">
          <div className="text-center mb-12"><h2 className="text-[32px] font-bold text-[#333] mb-4 tracking-[-0.64px]">常见问题</h2><p className="text-[16px] text-[#858C95] tracking-[-0.1px]">周期、数据与知识产权等常见问题说明。</p></div>
          <div className="space-y-4">{faqs.map((f, i) => (<details key={i} className="group border border-[#EAEBF0] rounded-lg p-6"><summary className="cursor-pointer list-none flex items-center justify-between"><span className="text-[16px] font-semibold text-[#333]">{f.q}</span><span className="ml-4 w-6 h-6 rounded-full bg-[#F2F9F7] text-[#058A65] flex items-center justify-center">+</span></summary><div className="mt-3 text-[15px] text-[#666] leading-relaxed">{f.a}</div></details>))}</div>
        </div>
      </section>

      <section id="contact" className="py-[88px] bg-[#F2F9F7]">
        <div className="max-w-[840px] mx-auto px-8">
          <div className="text-center mb-12"><h2 className="text-[32px] font-bold text-[#333] mb-4 tracking-[-0.64px]">联系我们</h2><p className="text-[16px] text-[#858C95] tracking-[-0.1px]">共建双碳研究，欢迎联合课题与示范项目合作。</p></div>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6"><input type="text" placeholder="您的姓名" className="w-full px-4 py-3 border border-[#DAE0E6] rounded-md bg-white text-[15px] placeholder-[#999] shadow-sm" /><input type="text" placeholder="您的联系方式" className="w-full px-4 py-3 border border-[#DAE0E6] rounded-md bg-white text-[15px] placeholder-[#999] shadow-sm" /></div>
            <input type="text" placeholder="您的单位/研究方向" className="w-full px-4 py-3 border border-[#DAE0E6] rounded-md bg-white text-[15px] placeholder-[#999] shadow-sm" />
            <textarea placeholder="拟合作课题与目标" rows={5} className="w-full px-4 py-3 border border-[#DAE0E6] rounded-md bg-white text-[15px] placeholder-[#999] shadow-sm resize-none" />
            <div className="text-center"><button className="bg-[#058A65] text-white px-6 py-3 rounded-full font-semibold text-[15px] shadow-sm">提交合作意向</button></div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
