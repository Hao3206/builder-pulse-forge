import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function CustomTraining() {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scenarios = [
    { title: "新员工/普及型", desc: "双碳基础认知、组织核算与合规要求入门。" },
    { title: "业务条线提升", desc: "生产/采购/物流/销售等条线专项能力提升。" },
    { title: "管理干部工作坊", desc: "战略与治理、投策与绩效的闭门研讨。" },
    { title: "项目制辅导", desc: "以项目为载体，提供咨询+培训一体化服务。" },
  ];

  const deliverables = [
    "定制化课程大纲",
    "企业案例与数据脱敏演练",
    "表单模板与工具包",
    "结业证书与成效评估报告",
  ];

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
            <h1 className="text-[48px] font-bold leading-[56px] text-white mb-6 tracking-[-0.48px]">其他定制化培训</h1>
            <p className="text-lg text-white/90">围绕企业诉求定制内容、时长与形式，聚焦实操与落地</p>
          </div>
        </div>
      </section>

      <section className="py-[72px] bg-white">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="text-center mb-12"><h2 className="text-[32px] font-bold text-[#333] mb-4">典型场景</h2><p className="text-[16px] text-[#858C95]">覆盖从普及到高阶的多层次需求。</p></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">{scenarios.map((s, i) => (<div key={i} className="bg-white rounded-lg p-8 shadow-sm"><h3 className="text-[20px] font-bold text-[#333] mb-2">{s.title}</h3><p className="text-[15px] text-[#666]">{s.desc}</p></div>))}</div>
        </div>
      </section>

      <section className="py-[72px] bg-[#058A65]">
        <div className="max-w-[1280px] mx-auto px-8 text-white">
          <div className="text-center mb-12"><h2 className="text-[32px] font-bold mb-4">交付与保障</h2><p className="text-[16px] text-white/80">输出标准化成果，保障培训效果落地。</p></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">{deliverables.map((d, i) => (<div key={i} className="bg-white rounded-lg p-6 text-[#333] text-center font-semibold shadow-sm">{d}</div>))}</div>
        </div>
      </section>

      <section id="contact" className="py-[72px] bg-[#F2F9F7]">
        <div className="max-w-[840px] mx-auto px-8">
          <div className="text-center mb-10"><h2 className="text-[28px] font-bold text-[#333] mb-3">定制咨询</h2><p className="text-[15px] text-[#858C95]">留下需求，我们将提供定制化方案与报价。</p></div>
          <div className="space-y-6"><div className="grid grid-cols-1 md:grid-cols-2 gap-6"><input type="text" placeholder="您的姓名" className="w-full px-4 py-3 border border-[#DAE0E6] rounded-md bg-white placeholder-[#999] shadow-sm" /><input type="text" placeholder="您的联系方式" className="w-full px-4 py-3 border border-[#DAE0E6] rounded-md bg-white placeholder-[#999] shadow-sm" /></div><input type="text" placeholder="您的公司/岗位" className="w-full px-4 py-3 border border-[#DAE0E6] rounded-md bg-white placeholder-[#999] shadow-sm" /><textarea placeholder="培训主题/受众/时长/形式/时间" rows={5} className="w-full px-4 py-3 border border-[#DAE0E6] rounded-md bg-white placeholder-[#999] shadow-sm resize-none" /><div className="text-center"><button className="bg-[#058A65] text-white px-6 py-3 rounded-full font-semibold">提交</button></div></div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
