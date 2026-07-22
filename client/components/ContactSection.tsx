import { useLocation } from "react-router-dom";
import InquiryForm from "./InquiryForm";

export default function ContactSection() {
  const location = useLocation();

  return (
    <section
      id="contact"
      className="scroll-mt-20 bg-[#F2F9F7] py-16 sm:py-[88px]"
    >
      <div className="mx-auto max-w-[840px] px-5 sm:px-8">
        <div>
          <div className="text-center mb-12">
            <h2 className="text-[32px] font-bold text-[#333] mb-4 tracking-[-0.64px]">
              联系我们
            </h2>
            <p className="text-[16px] text-[#858C95] tracking-[-0.1px]">
              如果您有任何问题或疑问，请与我们联系，我们将尽最大努力尽快回复您。
            </p>
          </div>
          <InquiryForm
            source={location.pathname}
            messagePlaceholder="您的问题或需求"
          />
        </div>
      </div>
    </section>
  );
}
