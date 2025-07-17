import { ArrowRight } from "lucide-react";

export default function Solutions() {
  return (
    <section className="relative bg-brand-green-50 py-20">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/2363313ddbbb93771e18b640faf9df8a90d1c91d?width=2133"
          alt="Solutions background"
          className="w-full h-full object-cover opacity-80"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-[#333] font-inter text-[34px] font-bold leading-[40px] tracking-[-0.68px]">
            丰富、成熟、专业的解决方案
          </h2>
        </div>

        {/* Content Layout */}
        <div className="flex gap-16 items-start">
          {/* Left Side - Services List */}
          <div className="flex-shrink-0">
            <div className="space-y-8">
              {/* Featured Button */}
              <button className="flex items-center gap-4 bg-brand-green text-white px-6 py-3 rounded-full font-semibold text-xl">
                零碳园区
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center -rotate-90">
                  <ArrowRight className="w-4 h-4 text-brand-green" />
                </div>
              </button>

              {/* Service Items */}
              <div className="space-y-6 text-[#333] font-inter text-xl">
                <div>碳核算/碳足迹</div>
                <div>双碳检测</div>
                <div>双碳检测</div>
                <div>能碳管理</div>
                <div>低碳消费平台</div>
              </div>
            </div>
          </div>

          {/* Right Side - Content Card */}
          <div className="flex-1 bg-white/70 rounded-lg p-10 max-w-4xl">
            {/* Green accent line */}
            <div className="w-1 h-7 bg-brand-green mb-4" />

            <h3 className="text-[#333] font-inter text-[22px] font-bold leading-[33px] mb-6">
              零碳园区解决方案
            </h3>

            <p className="text-[#333] font-inter text-base leading-6 mb-8">
              解决方案文字描述描述文案，文字描述文案描述文案描述文案描述文案描述文案描述文文案描述文案描述文文案描述文案描述文文案描述文案描述文案描述文案，描述文案描述文案描述文案描述文案描述文案描述文案描述文案描述文案描述文案
            </p>

            {/* Tags */}
            <div className="flex gap-4 mb-8">
              <span className="text-[#666] font-inter text-[15px] px-3 py-1 bg-gray-100 rounded">
                绿色能源
              </span>
              <span className="text-[#666] font-inter text-[15px] px-3 py-1 bg-gray-100 rounded">
                节能减排
              </span>
              <span className="text-[#666] font-inter text-[15px] px-3 py-1 bg-gray-100 rounded">
                碳中和
              </span>
              <span className="text-[#666] font-inter text-[15px] px-3 py-1 bg-gray-100 rounded">
                碳检测
              </span>
            </div>

            {/* CTA Button */}
            <button className="bg-brand-green text-white px-6 py-3 rounded-full font-semibold text-[15px] hover:bg-brand-green/90 transition-colors">
              了解更多
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
