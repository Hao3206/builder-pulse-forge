import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function CarbonTraderTraining() {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const highlights = [
    { title: "市场规则精讲", desc: "覆盖配额交易、CCER与国际自愿市场机制。" },
    { title: "交易实战演练", desc: "模拟盘+案例推演，掌握下单、对冲与风控。" },
    { title: "数据与策略", desc: "基本面/资金面/政策面综合分析与量化入门。" },
    { title: "合规与风控", desc: "掌握合规边界、报告义务与风控框架。" },
  ];

  const outline = [
    { step: "1", title: "碳市场概论", desc: "国内外碳市场与配额分配机制、履约规则。" },
    { step: "2", title: "产品与交易规则", desc: "配额/CCER/绿证等产品与交易制度。" },
    { step: "3", title: "交易策略与实操", desc: "做市、波段、套保与跨品种套利方法。" },
    { step: "4", title: "风控合规与运维", desc: "风控指标、风控流程与运营规范。" },
  ];

  const deliverables = ["培训证书", "实操指南与策略清单", "模拟盘账号（课堂）", "课后社群答疑"];

  return (
    <div className="min-h-screen bg-white">
      <Header isScrolled={isScrolled} />

      <section className="relative w-full h-[480px] bg-white">
        <div className="absolute inset-0">
          <div className="w-full h-full bg-gradient-to-r from-[#155B75] to-[#088AB2]" />
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://api.builder.io/api/v1/image/assets/TEMP/9026b87008e8884034ad247a59bfca58d7b09cc8?width=2880')", backgroundBlendMode: "multiply" }} />
        </div>
        <div className="relative z-10 flex items-center justify-center h-full pt-[88px]">
          <div className="max-w-[760px] text-center px-8">
            <h1 className="text-[48px] font-bold leading-[56px] text-white mb-6 tracking-[-0.48px]">碳排放交易员培训</h1>
            <p className="text-lg text-white/90">市场机制+交易实战+风控合规，一课掌握核心能力</p>
          </div>
        </div>
      </section>

      <section className="py-[72px] bg-white">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">{highlights.map((h, i) => (<div key={i} className="bg-white border border-[#EAEBF0] rounded-lg p-6"><h3 className="text-[20px] font-bold text-[#333] mb-2">{h.title}</h3><p className="text-[15px] text-[#666]">{h.desc}</p></div>))}</div>
        </div>
      </section>

      <section className="py-[72px] bg-[#F7F8FA]">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="text-center mb-12"><h2 className="text-[32px] font-bold text-[#333] mb-4">课程大纲</h2><p className="text-[16px] text-[#858C95]">理论+实战双轨，掌握交易全流程。</p></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">{outline.map((s, idx) => (<div key={idx} className="bg-white rounded-lg p-8 shadow-sm relative"><div className="absolute top-4 right-4 bg-[#058A65] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">{s.step}</div><h3 className="text-[20px] font-bold text-[#333] mb-3">{s.title}</h3><p className="text-[15px] text-[#666]">{s.desc}</p></div>))}</div>
        </div>
      </section>

      <section className="py-[72px] bg-[#058A65]">
        <div className="max-w-[1280px] mx-auto px-8 text-white">
          <div className="text-center mb-12"><h2 className="text-[32px] font-bold mb-4">成果与服务</h2><p className="text-[16px] text-white/80">完成培训即可获得以下支持与资料。</p></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">{deliverables.map((d, i) => (<div key={i} className="bg-white rounded-lg p-6 text-[#333] text-center font-semibold shadow-sm">{d}</div>))}</div>
        </div>
      </section>

      <section id="contact" className="py-[72px] bg-[#F2F9F7]">
        <div className="max-w-[840px] mx-auto px-8">
          <div className="text-center mb-10"><h2 className="text-[28px] font-bold text-[#333] mb-3">报名咨询</h2><p className="text-[15px] text-[#858C95]">提交信息获取开班时间与优惠政策。</p></div>
          <div className="space-y-6"><div className="grid grid-cols-1 md:grid-cols-2 gap-6"><input type="text" placeholder="您的姓名" className="w-full px-4 py-3 border border-[#DAE0E6] rounded-md bg-white placeholder-[#999] shadow-sm" /><input type="text" placeholder="您的联系方式" className="w-full px-4 py-3 border border-[#DAE0E6] rounded-md bg-white placeholder-[#999] shadow-sm" /></div><input type="text" placeholder="您的公司/岗位" className="w-full px-4 py-3 border border-[#DAE0E6] rounded-md bg-white placeholder-[#999] shadow-sm" /><textarea placeholder="培训需求（线下/线上、人数、时间）" rows={5} className="w-full px-4 py-3 border border-[#DAE0E6] rounded-md bg-white placeholder-[#999] shadow-sm resize-none" /><div className="text-center"><button className="bg-[#058A65] text-white px-6 py-3 rounded-full font-semibold">提交</button></div></div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
