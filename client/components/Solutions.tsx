import { ArrowRight } from "lucide-react";
import { useState } from "react";

const solutionsData = [
  {
    id: 1,
    name: "零碳园区",
    title: "零碳园区解决方案",
    description:
      "零碳园区解决方案通过综合能源管理、智能监测和碳排放优化，助力园区实现碳中和目标。我们提供从规划设计到运营管理的全生命周期服务，包括可再生能源配置、储能系统、智慧用能管控等关键技术，为园区构建绿色低碳的可持续发展生态。",
    tags: ["绿色能源", "节能减排", "碳中和", "碳检测"],
  },
  {
    id: 2,
    name: "碳核算/碳足迹",
    title: "碳核算与碳足迹追踪系统",
    description:
      "提供精确的碳排放计算和全生命周期碳足迹追踪服务。通过先进的监测技术和数据分析，帮助企业建立完整的碳排放账本，实现碳数据的透明化管理。支持多种核算标准，满足不同行业和监管要求。",
    tags: ["碳核算", "数据监测", "生命周期", "标准化"],
  },
  {
    id: 3,
    name: "双碳检测",
    title: "智能双碳监测平台",
    description:
      "基于物联网和大数据技术的智能监测平台，实时监控企业碳排放和碳吸收情况。提供24小时连续监测、预警提醒、趋势分析等功能，助力企业实现精准的双碳管理和决策支持。",
    tags: ["实时监测", "智能预警", "大数据", "物联网"],
  },
  {
    id: 4,
    name: "能碳管理",
    title: "一体化能碳管理系统",
    description:
      "集成能源管理和碳管理的一体化解决方案，通过优化能源结构、提升能效水平、管控碳排放，实现能源和碳排放的协同管理。提供能耗分析、碳排放预测、减排策略制定等专业服务。",
    tags: ["能源优化", "协同管理", "智能分析", "策略制定"],
  },
  {
    id: 5,
    name: "低碳消费平台",
    title: "低碳生活消费服务平台",
    description:
      "面向消费者的低碳生活服务平台，通过碳积分、绿色购物、低碳出行等方式，鼓励公众参与低碳生活。平台整合各类低碳产品和服务，为用户提供便捷的绿色消费体验，推动全社会低碳转型。",
    tags: ["碳积分", "绿色消费", "低碳出行", "社会参与"],
  },
];

export default function Solutions() {
  const [activeItem, setActiveItem] = useState(solutionsData[0]);

  const handleItemClick = (item: (typeof solutionsData)[0]) => {
    setActiveItem(item);
  };

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
              {/* Service Items */}
              <div className="space-y-6">
                {solutionsData.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    className={`group flex items-center gap-4 px-6 py-3 rounded-full font-semibold text-xl transition-all duration-300 ${
                      activeItem.id === item.id
                        ? "bg-brand-green text-white"
                        : "text-[#333] hover:bg-white/50 hover:text-brand-green"
                    }`}
                  >
                    {item.name}
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center -rotate-90 transition-all duration-300 ${
                        activeItem.id === item.id
                          ? "bg-white"
                          : "bg-brand-green/10 group-hover:bg-brand-green/20"
                      }`}
                    >
                      <ArrowRight
                        className={`w-4 h-4 transition-colors duration-300 ${
                          activeItem.id === item.id
                            ? "text-brand-green"
                            : "text-brand-green"
                        }`}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Content Card */}
          <div className="flex-1 bg-white/70 rounded-lg p-10 max-w-4xl transition-all duration-500">
            {/* Green accent line */}
            <div className="w-1 h-7 bg-brand-green mb-4" />

            <h3 className="text-[#333] font-inter text-[22px] font-bold leading-[33px] mb-6">
              {activeItem.title}
            </h3>

            <p className="text-[#333] font-inter text-base leading-6 mb-8">
              {activeItem.description}
            </p>

            {/* Tags */}
            <div className="flex gap-4 mb-8 flex-wrap">
              {activeItem.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-[#666] font-inter text-[15px] px-3 py-1 bg-gray-100 rounded"
                >
                  {tag}
                </span>
              ))}
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
