import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const solutionsData = [
  {
    id: 1,
    name: "零碳园区",
    title: "零碳园区解决方案",
    path: "/zero-carbon-park",
    description:
      "零碳园区解决方案通过综合能源管理、智能监测和碳排放优化，助力园区实现碳中和目标。我们提供从规划设计到运营管理的全生命周期服务，包括可再生能源配置、储能系统、智慧用能管控等关键技术，为园区构建绿色低碳的可持续发展生态。通过先进的碳核算技术和智能监测平台，实现园区碳排放的精准管控和持续优化，打造真正的零碳示范园区。",
    tags: ["绿色能源", "节能减排", "碳中和", "碳检测"],
  },
  {
    id: 2,
    name: "碳核算/碳足迹",
    title: "碳核算与碳足迹追踪系统",
    path: "/carbon-footprint",
    description:
      "提供精确的碳排放计算和全生命周期碳足迹追踪服务。通过先进的监测技术和数据分析，帮助企业建立完整的碳排放账本，实现碳数据的透明化管理。支持多种核算标准，满足不同行业和监管要求。系统具备强大的数据处理能力，能够自动识别碳排放源，建立科学的核算体系，为企业制定减排策略提供数据支撑。",
    tags: ["碳核算", "数据监测", "生命周期", "标准化"],
  },
  {
    id: 3,
    name: "零碳工厂",
    title: "零碳工厂解决方案",
    path: "/zero-carbon-factory",
    description:
      "零碳工厂解决方案通过优化生产工艺、应用清洁能源、建立能效管理体系，助力制造企业实现碳中和生产目标。我们提供从工厂碳排查到低碳改造的全生命周期服务，包括可再生能源接入、生产流程优化、余热利用、碳核算与监测等关键技术方案。通过科学的碳管理体系和智能化监测平台，实现工厂生产全过程的碳排放精准管控，打造真正的绿色低碳示范工厂。",
    tags: ["清洁能源", "工艺优化", "碳中和", "生产管理"],
  },
  {
    id: 4,
    name: "能碳管理",
    title: "能碳管理系统(园区/工厂)解决方案",
    path: "/solution",
    description:
      "集成能源管理和碳管理的一体化解决方案，通过优化能源结构、提升能效水平、管控碳排放，实现能源和碳排放的协同管理。提供能耗分析、碳排放预测、减排策略制定等专业服务。系统覆盖园区和工厂的各类用能场景，通过智能算法优化用能方案，实现能源利用效率的最大化和碳排放的最小化，为企业创造显著的节能降碳效益。",
    tags: ["能源优化", "协同管理", "智能分析", "策略制定"],
  },
  {
    id: 5,
    name: "低碳消费平台",
    title: "企业碳管理一站式解决方案",
    path: "/corporate-carbon-management",
    description:
      "面向企业的碳管理一站式服务平台，提供从碳核算、碳监测到碳交易的全流程服务。平台整合碳管理各个环节，为企业提供便捷高效的碳管理工具，帮助企业建立完善的碳管理体系。通过标准化的服务流程和专业的技术支持，助力企业实现碳管理的规范化、科学化和高效化，推动企业绿色转型和可持续发展。",
    tags: ["碳积分", "绿色消费", "低碳出行", "社会参与"],
  },
];

export default function Solutions() {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState(solutionsData[0]);

  const handleItemClick = (item: (typeof solutionsData)[0]) => {
    setActiveItem(item);
  };

  const handleLearnMore = () => {
    if (activeItem.path) {
      navigate(activeItem.path);
    }
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
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
          {/* Left Side - Services List */}
          <div className="flex-shrink-0 w-full md:w-auto">
            <div className="space-y-8">
              {/* Service Items */}
              <div className="space-y-6">
                {solutionsData.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    className={`group flex items-center gap-4 px-6 py-3 rounded-full font-semibold text-xl transition-all duration-300 w-full md:w-auto justify-between md:justify-start ${
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
          <div className="w-full md:flex-1 bg-white/70 rounded-lg p-6 md:p-10 max-w-full md:max-w-4xl transition-all duration-500 mt-6 md:mt-0">
            {/* Green accent line and Title in one row */}
            <div className="flex items-center mb-6">
              <div className="w-1 h-7 bg-brand-green mr-3" />
              <h3 className="text-[#333] font-inter text-[22px] font-bold leading-[33px]">
                {activeItem.title}
              </h3>
            </div>

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
            <button
              onClick={handleLearnMore}
              className="bg-brand-green text-white px-6 py-3 rounded-full font-semibold text-[15px] hover:bg-brand-green/90 transition-colors cursor-pointer"
            >
              了解更多
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
