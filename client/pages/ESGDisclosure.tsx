import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ESGDisclosure() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const reasons = [
    { title: "合规要求与监管趋势", desc: "应对境内外监管（如交易所/CSRD/ISSB）与供应链披露要求。" },
    { title: "资本市场与投融资", desc: "提升信息透明度与ESG评分，优化资本成本与投资者关系。" },
    { title: "品牌与客户信任", desc: "通过可验证的ESG表现增强客户与公众信任度。" },
    { title: "内部管理与韧性", desc: "建立指标体系与改进闭环，提升组织韧性与运营效率。" },
  ];

  const frameworks = [
    "GRI 通用与专题标准",
    "ISSB/IFRS S1、S2",
    "CSRD/ESRS（欧盟）",
    "TCFD 气候相关信息披露",
    "SASB 行业标准（并入ISSB）",
    "HKEX ESG 披露指引",
  ];

  const scope = [
    { title: "环境（E）", points: ["碳排放/能源/水与废弃物", "气候风险与机会", "生物多样性与资源循环"] },
    { title: "社会（S）", points: ["员工健康安全与发展", "供应链与客户责任", "隐私与信息安全"] },
    { title: "治理（G）", points: ["董事会治理与多元化", "商业道德与合规", "风险管理与内控"] },
  ];

  const modules = [
    { title: "重要性评估", desc: "双重重要性方法，识别对企业与利益相关方均重要的议题。" },
    { title: "指标库与口径对齐", desc: "内置GRI/ISSB/CSRD等指标库，支持多框架映射与口径统一。" },
    { title: "数据采集与校核", desc: "流程化采数、证据留痕与抽样校核，提升数据可审计性。" },
    { title: "目标与行动计划", desc: "KPI/KR设定、年度目标分解与改善跟踪。" },
    { title: "第三方验证支持", desc: "支撑独立鉴证（Assurance）材料与穿行测试。" },
    { title: "报告生成与发布", desc: "一键生成披露文本、图表与数据册，支持多语言与网页发布。" },
  ];

  const steps = [
    { step: "1", title: "框架选型与差距评估", desc: "明确适用框架与监管边界，开展现状对标与差距识别。" },
    { step: "2", title: "重要性评估", desc: "利益相关方参与，完成双重重要性矩阵与优先级。" },
    { step: "3", title: "指标口径与数据方案", desc: "确定口径与边界，设计采集模板与证据要求。" },
    { step: "4", title: "数据采集与核验", desc: "按流程采数、抽样校核与问题闭环，沉淀数据资产。" },
    { step: "5", title: "披露文本与图表", desc: "撰写报告、构建可视化图表与管理层声明。" },
    { step: "6", title: "验证发布与存档", desc: "对接第三方验证，发布纸质/网页版本并存档。" },
  ];

  const deliverables = [
    "年度ESG报告（PDF/网页）",
    "重要性评估与矩阵结果",
    "指标口径与数据册（Data Book）",
    "第三方验证支持材料",
    "多框架映射与合规核对清单",
  ];

  const faqs = [
    { q: "应选择哪些披露框架？", a: "依据上市地/融资计划/客户要求与行业属性，通常组合使用GRI+ISSB/IFRS S1、S2，并关注本地监管指引。" },
    { q: "如何保证数据可验证？", a: "建立统一口径、证据留痕与抽样核验机制形成数据治理流程与审计线索。" },
    { q: "与碳核算的关系？", a: "E维度中的温室气体数据与气候风险披露需与碳盘查/目标设定保持一致并互相校核。" },
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
            <h1 className="text-[52px] font-bold leading-[60px] text-white mb-6 tracking-[-0.52px]">ESG信息披露</h1>
            <p className="text-lg text-white/90 mb-10 tracking-[-0.1px]">多框架合规、一体化采数与验证，提升披露质量与可信度</p>
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
            <h2 className="text-[32px] font-bold text-[#333] mb-4 tracking-[-0.64px]">为什么要开展ESG信息披露</h2>
            <p className="text-[16px] text-[#858C95] max-w-[800px] mx-auto tracking-[-0.1px]">面向监管、资本与市场的系统化披露，构建可持续竞争力。</p>
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

      {/* Scope */}
      <section className="py-[88px] bg-[#F7F8FA]">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-[32px] font-bold text-[#333] mb-4 tracking-[-0.64px]">披露范围与主题</h2>
            <p className="text-[16px] text-[#858C95] max-w-[800px] mx-auto tracking-[-0.1px]">覆盖E/S/G三大维度，围绕重点议题建立指标与行动。</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {scope.map((s, i) => (
              <div key={i} className="bg-white rounded-lg p-8 shadow-sm">
                <h3 className="text-[22px] font-bold text-[#333] mb-4 tracking-[-0.22px]">{s.title}</h3>
                <ul className="space-y-2 text-[15px] text-[#666]">
                  {s.points.map((p, idx) => (
                    <li key={idx}>• {p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frameworks */}
      <section className="py-[88px] bg-white">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-[32px] font-bold text-[#333] mb-4 tracking-[-0.64px]">对标的框架与标准</h2>
            <p className="text-[16px] text-[#858C95] max-w-[800px] mx-auto tracking-[-0.1px]">支持多框架映射，确保全球合规与可比性。</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {frameworks.map((f, i) => (
              <span key={i} className="px-4 py-2 rounded-full bg-[#F2F9F7] text-[#058A65] text-[14px] border border-[#DAE0E6]">{f}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="py-[88px] bg-white">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-[32px] font-bold text-[#333] mb-4 tracking-[-0.64px]">平台能力与功能模块</h2>
            <p className="text-[16px] text-[#858C95] max-w-[800px] mx-auto tracking-[-0.1px]">以数据为中心，打通"评估-采数-验证-披露"全流程。</p>
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

      {/* Process */}
      <section id="process" className="py-[88px] bg-[#F7F8FA]">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-[32px] font-bold text-[#333] mb-4 tracking-[-0.64px]">披露流程</h2>
            <p className="text-[16px] text-[#858C95] max-w-[800px] mx-auto tracking-[-0.1px]">六步法提升披露质量，兼顾合规、可比与可验证。</p>
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

      {/* Deliverables */}
      <section className="py-[88px] bg-[#058A65]">
        <div className="max-w-[1280px] mx-auto px-8 text-white">
          <div className="text-center mb-16">
            <h2 className="text-[32px] font-bold mb-4 tracking-[-0.64px]">成果产出</h2>
            <p className="text-[16px] text-white/80 max-w-[800px] mx-auto tracking-[-0.1px]">标准化交付，支撑多渠道发布与审计验证。</p>
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
            <p className="text-[16px] text-[#858C95] tracking-[-0.1px]">披露框架、数据可验证性与气候披露等重点问题说明。</p>
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
            <p className="text-[16px] text-[#858C95] tracking-[-0.1px]">预约专家，获取适配贵司监管与行业的披露方案。</p>
          </div>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" placeholder="您的姓名" className="w-full px-4 py-3 border border-[#DAE0E6] rounded-md bg-white text-[15px] placeholder-[#999] shadow-sm" />
              <input type="text" placeholder="您的联系方式" className="w-full px-4 py-3 border border-[#DAE0E6] rounded-md bg-white text-[15px] placeholder-[#999] shadow-sm" />
            </div>
            <input type="text" placeholder="您的公司" className="w-full px-4 py-3 border border-[#DAE0E6] rounded-md bg-white text-[15px] placeholder-[#999] shadow-sm" />
            <textarea placeholder="您的披露框架偏好与关注议题（如气候、劳安、治理等）" rows={5} className="w-full px-4 py-3 border border-[#DAE0E6] rounded-md bg-white text-[15px] placeholder-[#999] shadow-sm resize-none" />
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
