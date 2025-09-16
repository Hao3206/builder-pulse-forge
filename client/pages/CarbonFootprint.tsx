import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function CarbonFootprint() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const reasons = [
    { title: "合规要求与客户准入", desc: "满足监管与客户供应链核算/披露要求（含CBAM/客户协议）。" },
    { title: "降本增效与风险管理", desc: "识别高排放环节，优化能耗结构，缓释碳税与交易成本。" },
    { title: "品牌与市场竞争力", desc: "提升绿色形象与议价能力，支撑国内外市场拓展。" },
    { title: "数据资产沉淀", desc: "建立可追溯的数据底座，为路径规划与投策提供依据。" },
  ];

  const steps = [
    { step: "1", title: "边界与口径界定", desc: "组织/产品边界、功能单位与核算口径定义。" },
    { step: "2", title: "数据采集与校核", desc: "采集活动数据与排放因子，完成一致性与完整性核验。" },
    { step: "3", title: "核算与分摊", desc: "依据方法学进行核算与分摊，开展不确定性分析。" },
    { step: "4", title: "验证与改进", desc: "准备验证材料，提出减排机会与改进路径。" },
    { step: "5", title: "报告与披露", desc: "输出核算报告与披露文本，支撑对外合规与传达。" },
  ];

  const standards = [
    "ISO 14064 组织温室气体核算",
    "ISO 14067 产品碳足迹",
    "GHG Protocol 组织/产品标准",
    "PAS 2050 生命周期评估",
    "IPCC 指南与因子库",
  ];

  const modules = [
    { title: "数据采集与对接", desc: "对接ERP/MES/计量等系统，模板化采集，口径统一。" },
    { title: "排放因子与参数库", desc: "内置权威因子库，支持行业参数与版本管理。" },
    { title: "LCA核算引擎", desc: "支持组织/产品核算、分摊与敏感性分析。" },
    { title: "质量控制与留痕", desc: "证据留痕、抽样核验与不一致项闭环。" },
    { title: "报告与披露", desc: "一键生成报告与披露文本，支持多模板/多语言。" },
    { title: "第三方��证支持", desc: "按验证要求输出穿行材料与核查清单。" },
  ];

  const deliverables = [
    "组织碳盘查报告（ISO 14064）",
    "产品碳足迹报告（ISO 14067/PAS 2050）",
    "验证材料与穿行测试清单",
    "披露报表（客户/监管模板）",
  ];

  const faqs = [
    { q: "没有完整数据怎么办？", a: "可使用替代数据与默认因子，并进行不确定性评估与说明，同时建立改进计划逐步完善。" },
    { q: "组织核算与产品核算关系？", a: "组织核算为总量与边界，产品核算关注单一功能单位，二者口径需一致并互相校核。" },
    { q: "第三方验证周期多久？", a: "通常2-6周，取决于产品复杂度与数据完备程度；建议提前准备证据与抽样材料。" },
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
            <h1 className="text-[52px] font-bold leading-[60px] text-white mb-6 tracking-[-0.52px]">碳盘查 / 碳足迹核算</h1>
            <p className="text-lg text-white/90 mb-10 tracking-[-0.1px]">组织与产品双维核算 · 合规披露与验证支持</p>
            <div className="flex gap-4 justify-center">
              <a href="#contact" className="bg-[#058A65] text-white px-6 py-3 rounded-full font-semibold text-[15px] shadow-sm">获取方案</a>
              <a href="#process" className="bg-white/10 backdrop-blur text-white px-6 py-3 rounded-full font-semibold text-[15px] border border-white/30">查看流程</a>
            </div>
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="py-[88px] bg-white">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-[32px] font-bold text-[#333] mb-4 tracking-[-0.64px]">��什么要开展碳盘查/碳足迹核算</h2>
            <p className="text-[16px] text-[#858C95] max-w-[800px] mx-auto tracking-[-0.1px]">合规、降本、品牌、数据四大维度驱动，夯实双碳治理基础。</p>
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

      {/* Process */}
      <section id="process" className="py-[88px] bg-[#F7F8FA]">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-[32px] font-bold text-[#333] mb-4 tracking-[-0.64px]">核算流程</h2>
            <p className="text-[16px] text-[#858C95] max-w-[800px] mx-auto tracking-[-0.1px]">标准化五步法，确保可比性、可追溯与可验证。</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {steps.map((s, idx) => (
              <div key={idx} className="bg-white rounded-lg p-8 shadow-sm relative">
                <div className="absolute top-4 right-4 bg-[#058A65] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">{s.step}</div>
                <h3 className="text-[20px] font-bold text-[#333] mb-3 tracking-[-0.2px]">{s.title}</h3>
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
            <p className="text-[16px] text-[#858C95] max-w-[800px] mx-auto tracking-[-0.1px]">对齐国际国内主流体系，确保结果权威可靠。</p>
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
            <h2 className="text-[32px] font-bold text-[#333] mb-4 tracking-[-0.64px]">平台能力与功能模块</h2>
            <p className="text-[16px] text-[#858C95] max-w-[800px] mx-auto tracking-[-0.1px]">从采数到核算到披露的全流程能力，轻松对接第三方验证。</p>
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
            <p className="text-[16px] text-white/80 max-w-[800px] mx-auto tracking-[-0.1px]">标准化交付，支撑合规申报与客户披露。</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
            <p className="text-[16px] text-[#858C95] tracking-[-0.1px]">核算边界、数据与验证等重点问题解答。</p>
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
            <p className="text-[16px] text-[#858C95] tracking-[-0.1px]">提交您的需求，我们将为您匹配适配的核算与披露方案。</p>
          </div>
          <form
            className="space-y-6"
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const data = {
                name: (form.elements[0] as HTMLInputElement).value,
                contact: (form.elements[1] as HTMLInputElement).value,
                company: (form.elements[2] as HTMLInputElement).value,
                message: (form.elements[3] as HTMLTextAreaElement).value,
                source: "/carbon-footprint",
              };
              const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
              });
              if (res.ok) {
                alert("提交成功！");
                form.reset();
              } else {
                alert("提交失败，请重试");
              }
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" placeholder="您的姓名" className="w-full px-4 py-3 border border-[#DAE0E6] rounded-md bg-white placeholder-[#999] shadow-sm" />
              <input type="text" placeholder="您的联系方式" className="w-full px-4 py-3 border border-[#DAE0E6] rounded-md bg-white placeholder-[#999] shadow-sm" />
            </div>
            <input type="text" placeholder="您的公司" className="w-full px-4 py-3 border border-[#DAE0E6] rounded-md bg-white placeholder-[#999] shadow-sm" />
            <textarea placeholder="您的需求（组织/产品、验证/披露等）" rows={5} className="w-full px-4 py-3 border border-[#DAE0E6] rounded-md bg-white placeholder-[#999] shadow-sm resize-none" />
            <div className="text-center">
              <button className="bg-[#058A65] text-white px-6 py-3 rounded-full font-semibold text-[15px] shadow-sm">提交</button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
