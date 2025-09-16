import { useRef } from "react";

export default function ContactSection() {
  const contactRef = useRef<HTMLDivElement>(null);

  return (
    <section id="contact" className="py-[88px] bg-[#F2F9F7]">
      <div className="max-w-[840px] mx-auto px-8">
        <div ref={contactRef}>
          <div className="text-center mb-12">
            <h2 className="text-[32px] font-bold text-[#333] mb-4 tracking-[-0.64px]">联系我们</h2>
            <p className="text-[16px] text-[#858C95] tracking-[-0.1px]">如果您有任何问题或疑问，请与我们联系，我们将尽最大努力尽快回复您。</p>
          </div>
          <form className="space-y-6" onSubmit={async (e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const data = {
              name: (form.elements[0] as HTMLInputElement).value,
              contact: (form.elements[1] as HTMLInputElement).value,
              company: (form.elements[2] as HTMLInputElement).value,
              message: (form.elements[3] as HTMLTextAreaElement).value,
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
          }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input 
                type="text" 
                placeholder="您的姓名" 
                className="w-full px-4 py-3 border border-[#DAE0E6] rounded-md bg-white text-[15px] placeholder-[#999] shadow-sm" 
              />
              <input 
                type="text" 
                placeholder="您的联系方式" 
                className="w-full px-4 py-3 border border-[#DAE0E6] rounded-md bg-white text-[15px] placeholder-[#999] shadow-sm" 
              />
            </div>
            <input 
              type="text" 
              placeholder="您的公司" 
              className="w-full px-4 py-3 border border-[#DAE0E6] rounded-md bg-white text-[15px] placeholder-[#999] shadow-sm" 
            />
            <textarea 
              placeholder="您的问题或需求" 
              rows={5} 
              className="w-full px-4 py-3 border border-[#DAE0E6] rounded-md bg-white text-[15px] placeholder-[#999] shadow-sm resize-none" 
            />
            <div className="text-center">
              <button 
                type="submit"
                className="bg-[#058A65] text-white px-6 py-3 rounded-full font-semibold text-[15px] shadow-sm"
              >
                提交咨询
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
