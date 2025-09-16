import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AdvancedCarbonTraining() {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const audience = [
    "董事会/高管与战略部门",
    "ESG/可持续发展负责人",
    "能源与设备管理负责人",
    "投策与财务负责人",
  ];

  const modules = [
    { title: "双碳战略与政策", desc: "国家双碳战略、地方实施细则与行业监管趋势。" },
    { title: "组织与产品核算", desc: "ISO/GHG Protocol与LCA方法学及口径一致性。" },
    { title: "路径与技术路线", desc: "达峰/中和路径、节能改造与清洁能源替代。" },
    { title: "绿电与碳市场机制", desc: "绿电采购、绿证与配额/自愿减排的交易策略。" },
    { title: "投策与ROI测算", desc: "MACC曲线、投资优先级与财务影响分析。" },
    { title: "治理与绩效落地", desc: "目标分解、绩效考核、内控与审计合规。" },
  ];

  const schedule = [
    { day: "Day 1", title: "战略与核算", items: ["双碳战略与政策框架", "组织核算与产品碳足迹方法"] },
    { day: "Day 2", title: "路径与市场", items: ["路径规划与关键技术", "绿电与碳市场机制"] },
    { day: "Day 3", title: "投策与治理", items: ["MACC与投策评估", "治理与绩效体系构建"] },
  ];

  const deliverables = [
    "结业证书（高级研修班）",
    "课程讲义与模板工具包",
    "路径与投资测算样例库",
    "后续专家问答与社群支持",
  ];

  const faqs = [
    { q: "是否提供结业证书？", a: "完成全程课程并通过测评后颁发高级研修班结业证书。" },
    { q: "是否支持企业内训？", a: "支持，内容可按行业与企业现状定制，并提供咨询辅导。" },
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
            <h1 className="text-[52px] font-bold leading-[60px] text-white mb-6 tracking-[-0.52px]">碳达峰碳中和战略规划高级研修班</h1>
            <p className="text-lg text-white/90 mb-10 tracking-[-0.1px]">战略-核算-路径-投策一体化，打造落地型双碳能力体系</p>
            <div className="flex gap-4 justify-center">
              <a href="#contact" className="bg-[#058A65] text-white px-6 py-3 rounded-full font-semibold text-[15px] shadow-sm">报名咨询</a>
              <a href="#modules" className="bg-white/10 backdrop-blur text-white px-6 py-3 rounded-full font-semibold text-[15px] border border-white/30">课程大纲</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-[88px] bg-white">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="text-center mb-16"><h2 className="text-[32px] font-bold text-[#333] mb-4 tracking-[-0.64px]">适合人群</h2><p className="text-[16px] text-[#858C95] max-w-[800px] mx-auto tracking-[-0.1px]">面向战略、ESG、能源与投策等核心岗位，系统提升双碳治理能力。</p></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">{audience.map((a, i) => (<div key={i} className="bg-white border border-[#EAEBF0] rounded-lg p-6 text-center font-semibold">{a}</div>))}</div>
        </div>
      </section>

      <section id="modules" className="py-[88px] bg-[#F7F8FA]">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="text-center mb-16"><h2 className="text-[32px] font-bold text-[#333] mb-4 tracking-[-0.64px]">课程模块</h2><p className="text-[16px] text-[#858C95] max-w-[800px] mx-auto tracking-[-0.1px]">六大模块，从基础到实战，覆盖双碳全链路关键能力。</p></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{modules.map((m, i) => (<div key={i} className="bg-white rounded-lg p-8 shadow-sm"><h3 className="text-[22px] font-bold text-[#333] mb-3 tracking-[-0.22px]">{m.title}</h3><p className="text-[15px] text-[#666] tracking-[-0.1px]">{m.desc}</p></div>))}</div>
        </div>
      </section>

      <section className="py-[88px] bg-white">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="text-center mb-16"><h2 className="text-[32px] font-bold text-[#333] mb-4 tracking-[-0.64px]">课程安排</h2><p className="text-[16px] text-[#858C95] max-w-[800px] mx-auto tracking-[-0.1px]">3天线下/线上混合形式，可按企业需求灵活定制时长与模块。</p></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">{schedule.map((s, i) => (<div key={i} className="bg-white rounded-lg p-8 shadow-sm relative"><div className="absolute top-4 right-4 bg-[#058A65] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">{i+1}</div><h3 className="text-[20px] font-bold text-[#333] mb-2 tracking-[-0.2px]">{s.day} · {s.title}</h3><ul className="space-y-2 text-[15px] text-[#666]">{s.items.map((it, idx) => (<li key={idx}>• {it}</li>))}</ul></div>))}</div>
        </div>
      </section>

      <section className="py-[88px] bg-[#058A65]">
        <div className="max-w-[1280px] mx-auto px-8 text-white">
          <div className="text-center mb-16"><h2 className="text-[32px] font-bold mb-4 tracking-[-0.64px]">成果与服务</h2><p className="text-[16px] text-white/80 max-w-[800px] mx-auto tracking-[-0.1px]">完成研修后获得认证证书、工具包以及专家咨询支持。</p></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">{deliverables.map((d, i) => (<div key={i} className="bg-white rounded-lg p-6 text-[#333] text-center font-semibold shadow-sm">{d}</div>))}</div>
        </div>
      </section>

      <section className="py-[88px] bg-white">
        <div className="max-w-[840px] mx-auto px-8">
          <div className="text-center mb-12"><h2 className="text-[32px] font-bold text-[#333] mb-4 tracking-[-0.64px]">常见问题</h2><p className="text-[16px] text-[#858C95] tracking-[-0.1px]">证书、内训与定制化相关问题解答。</p></div>
          <div className="space-y-4">{faqs.map((f, i) => (<details key={i} className="group border border-[#EAEBF0] rounded-lg p-6"><summary className="cursor-pointer list-none flex items-center justify-between"><span className="text-[16px] font-semibold text-[#333]">{f.q}</span><span className="ml-4 w-6 h-6 rounded-full bg-[#F2F9F7] text-[#058A65] flex items-center justify-center">+</span></summary><div className="mt-3 text-[15px] text-[#666] leading-relaxed">{f.a}</div></details>))}</div>
        </div>
      </section>

      <section id="contact" className="py-[88px] bg-[#F2F9F7]">
        <div className="max-w-[840px] mx-auto px-8">
          <div className="text-center mb-12"><h2 className="text-[32px] font-bold text-[#333] mb-4 tracking-[-0.64px]">报名咨询</h2><p className="text-[16px] text-[#858C95] tracking-[-0.1px]">提交您的信息，我们将在1个工作日内与您联系。</p></div>
          <div className="space-y-6"><div className="grid grid-cols-1 md:grid-cols-2 gap-6"><input type="text" placeholder="您的姓名" className="w-full px-4 py-3 border border-[#DAE0E6] rounded-md bg-white text-[15px] placeholder-[#999] shadow-sm" /><input type="text" placeholder="您的联系方式" className="w-full px-4 py-3 border border-[#DAE0E6] rounded-md bg-white text-[15px] placeholder-[#999] shadow-sm" /></div><input type="text" placeholder="您的单位与岗位" className="w-full px-4 py-3 border border-[#DAE0E6] rounded-md bg-white text-[15px] placeholder-[#999] shadow-sm" /><textarea placeholder="希望了解的模块/开班城市/时间" rows={5} className="w-full px-4 py-3 border border-[#DAE0E6] rounded-md bg-white text-[15px] placeholder-[#999] shadow-sm resize-none" /><div className="text-center"><button className="bg-[#058A65] text-white px-6 py-3 rounded-full font-semibold text-[15px] shadow-sm">提交</button></div></div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
