import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactSection from "../components/ContactSection";

export default function IndustrySeminarsForums() {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const themes = [
    { title: "制造业低碳转型", desc: "能效提升、工艺优化与零碳工厂实践。" },
    { title: "产品碳足迹与供应链", desc: "LCA、供应商协同与出口合规。" },
    { title: "绿电与能源转型", desc: "绿电采购、储能与源网荷储一体化。" },
    { title: "碳市场与金融", desc: "配额/自愿减排、碳资产管理与绿色金融。" },
  ];

  const formats = [
    { title: "主题演讲", desc: "邀请政策专家、技术专家与标杆企业分享。" },
    { title: "圆桌论坛", desc: "多方对话，交流实践挑战与机会。" },
    { title: "工作坊", desc: "小班研讨与情景演练，聚焦具体问题。" },
    { title: "闭门交流", desc: "行业/企业专场，深度沟通与对接。" },
  ];

  const deliverables = ["会议纪要与PPT合集", "视频回放（可选）", "专家答疑与对接", "后续合作建议书"];

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
            <h1 className="text-[48px] font-bold leading-[56px] text-white mb-6 tracking-[-0.48px]">行业专题讲座 / 论坛</h1>
            <p className="text-lg text-white/90">链接政策、技术与产业实践，构建行业交流平台</p>
          </div>
        </div>
      </section>

      <section className="py-[72px] bg-white">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="text-center mb-12"><h2 className="text-[32px] font-bold text-[#333] mb-4">主题方向</h2><p className="text-[16px] text-[#858C95]">可按行业定制专题内容与议程。</p></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">{themes.map((t, i) => (<div key={i} className="bg-white rounded-lg p-8 shadow-sm"><h3 className="text-[20px] font-bold text-[#333] mb-2">{t.title}</h3><p className="text-[15px] text-[#666]">{t.desc}</p></div>))}</div>
        </div>
      </section>

      <section className="py-[72px] bg-[#F7F8FA]">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="text-center mb-12"><h2 className="text-[32px] font-bold text-[#333] mb-4">形式与安排</h2><p className="text-[16px] text-[#858C95]">多样化形式满足不同目标与人群。</p></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">{formats.map((f, i) => (<div key={i} className="bg-white rounded-lg p-8 shadow-sm"><h3 className="text-[20px] font-bold text-[#333] mb-2">{f.title}</h3><p className="text-[15px] text-[#666]">{f.desc}</p></div>))}</div>
        </div>
      </section>

      <section className="py-[72px] bg-[#058A65]">
        <div className="max-w-[1280px] mx-auto px-8 text-white">
          <div className="text-center mb-12"><h2 className="text-[32px] font-bold mb-4">成果与服务</h2><p className="text-[16px] text-white/80">沉淀知识资产，促进合作对接。</p></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">{deliverables.map((d, i) => (<div key={i} className="bg-white rounded-lg p-6 text-[#333] text-center font-semibold shadow-sm">{d}</div>))}</div>
        </div>
      </section>

      <section id="contact" className="py-[72px] bg-[#F2F9F7]">
        <div className="max-w-[840px] mx-auto px-8">
          <div className="text-center mb-10"><h2 className="text-[28px] font-bold text-[#333] mb-3">活动合作/报名</h2><p className="text-[15px] text-[#858C95]">欢迎高校、协会与园区共办。</p></div>
          <div className="space-y-6"><div className="grid grid-cols-1 md:grid-cols-2 gap-6"><input type="text" placeholder="您的姓名" className="w-full px-4 py-3 border border-[#DAE0E6] rounded-md bg-white placeholder-[#999] shadow-sm" /><input type="text" placeholder="您的联系方式" className="w-full px-4 py-3 border border-[#DAE0E6] rounded-md bg-white placeholder-[#999] shadow-sm" /></div><input type="text" placeholder="单位/合作意向（共办/赞助/参会）" className="w-full px-4 py-3 border border-[#DAE0E6] rounded-md bg-white placeholder-[#999] shadow-sm" /><textarea placeholder="主题/规模/时间/城市" rows={5} className="w-full px-4 py-3 border border-[#DAE0E6] rounded-md bg-white placeholder-[#999] shadow-sm resize-none" /><div className="text-center"><button className="bg-[#058A65] text-white px-6 py-3 rounded-full font-semibold">提交</button></div></div>
        </div>
      </section>

      <ContactSection />
      <Footer />
    </div>
  );
}
