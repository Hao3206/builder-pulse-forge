import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function CarbonAdminTraining() {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const modules = [
    { title: "碳盘查与台账管理", desc: "组织边界、数据口径、台账建立与维护。" },
    { title: "履约与报告", desc: "年度履约流程、报告撰写与审核对接。" },
    { title: "制度与内控", desc: "制度建设、职责分工与流程内控。" },
    { title: "系统与工具", desc: "能碳数据平台使用、报表与留痕。" },
  ];

  const outline = [
    { step: "1", title: "基础与政策", desc: "碳管理基础知识与最新政策解读。" },
    { step: "2", title: "数据与口径", desc: "活动数据采集与排放因子管理。" },
    { step: "3", title: "履���与披露", desc: "配额履约、审定核查与信息披露。" },
    { step: "4", title: "系统与内控", desc: "系统操作、流程内控与审计配合。" },
  ];

  const deliverables = ["培训证书", "标准化表单与台账模板", "报表样例与检查清单", "课后技术支持"];

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
            <h1 className="text-[48px] font-bold leading-[56px] text-white mb-6 tracking-[-0.48px]">碳排放管理员培训</h1>
            <p className="text-lg text-white/90">从台账到履约到披露，打造企业碳管理骨干能力</p>
          </div>
        </div>
      </section>

      <section className="py-[72px] bg-white">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="text-center mb-12"><h2 className="text-[32px] font-bold text-[#333] mb-4">课程模块</h2><p className="text-[16px] text-[#858C95]">覆盖碳管理全流程的关键环节。</p></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">{modules.map((m, i) => (<div key={i} className="bg-white rounded-lg p-8 shadow-sm"><h3 className="text-[20px] font-bold text-[#333] mb-2">{m.title}</h3><p className="text-[15px] text-[#666]">{m.desc}</p></div>))}</div>
        </div>
      </section>

      <section className="py-[72px] bg-[#F7F8FA]">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="text-center mb-12"><h2 className="text-[32px] font-bold text-[#333] mb-4">课程大纲</h2><p className="text-[16px] text-[#858C95]">四步掌握关键能力，兼顾实操与合规。</p></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">{outline.map((s, idx) => (<div key={idx} className="bg-white rounded-lg p-8 shadow-sm relative"><div className="absolute top-4 right-4 bg-[#058A65] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">{s.step}</div><h3 className="text-[20px] font-bold text-[#333] mb-3">{s.title}</h3><p className="text-[15px] text-[#666]">{s.desc}</p></div>))}</div>
        </div>
      </section>

      <section className="py-[72px] bg-[#058A65]">
        <div className="max-w-[1280px] mx-auto px-8 text-white">
          <div className="text-center mb-12"><h2 className="text-[32px] font-bold mb-4">成果与服务</h2><p className="text-[16px] text-white/80">提供证书、模板与实操支持。</p></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">{deliverables.map((d, i) => (<div key={i} className="bg-white rounded-lg p-6 text-[#333] text-center font-semibold shadow-sm">{d}</div>))}</div>
        </div>
      </section>

      <section id="contact" className="py-[72px] bg-[#F2F9F7]">
        <div className="max-w-[840px] mx-auto px-8">
          <div className="text-center mb-10"><h2 className="text-[28px] font-bold text-[#333] mb-3">报名咨询</h2><p className="text-[15px] text-[#858C95]">企业内训支持按需定制。</p></div>
          <div className="space-y-6"><div className="grid grid-cols-1 md:grid-cols-2 gap-6"><input type="text" placeholder="您的姓名" className="w-full px-4 py-3 border border-[#DAE0E6] rounded-md bg-white placeholder-[#999] shadow-sm" /><input type="text" placeholder="您的联系方式" className="w-full px-4 py-3 border border-[#DAE0E6] rounded-md bg-white placeholder-[#999] shadow-sm" /></div><input type="text" placeholder="您的公司/岗位" className="w-full px-4 py-3 border border-[#DAE0E6] rounded-md bg-white placeholder-[#999] shadow-sm" /><textarea placeholder="培训需求（主题、时长、人数）" rows={5} className="w-full px-4 py-3 border border-[#DAE0E6] rounded-md bg-white placeholder-[#999] shadow-sm resize-none" /><div className="text-center"><button className="bg-[#058A65] text-white px-6 py-3 rounded-full font-semibold">提交</button></div></div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
