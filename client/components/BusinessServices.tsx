import { MessageCircleMore } from "lucide-react";

export default function BusinessServices() {
  const services = [
    {
      title: "碳咨询",
      subtitle:
        "增加点文案描述增加点文案描述增加点文案描述增加点文案描述增加点文案描述增加点文案描述",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/7bb1fe9f262a0519faa5ffb370502b8d01792d9d?width=349",
      icon: MessageCircleMore,
    },
    {
      title: "碳交易",
      subtitle:
        "专业的碳交易服务，助力企业实现碳资产价值最大化，提供交易策略和市场分析。",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/016820fd6b8a92264e45eec769581861a334348a?width=546",
      icon: MessageCircleMore,
    },
    {
      title: "碳金融",
      subtitle:
        "创新的碳金融产品和服务，为企业提供绿色融资解决方案和碳资产管理。",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/ac321a0ee51299b257411524ffab412103ab7b2c?width=1329",
      icon: MessageCircleMore,
    },
    {
      title: "碳信息化",
      subtitle:
        "数字化碳管理平台，实现碳数据的智能监测、分析和报告，提升管理效率。",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/6a64cd50e1b9fc8390c4aaf934f7576ecfbaa7f2?width=632",
      icon: MessageCircleMore,
    },
    {
      title: "碳足迹",
      subtitle:
        "全面的产品碳足迹评估和认证服务，帮助企业了解和优化产品生命周期碳排放。",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/681c8a293aa285306001bad46de4183adcf195e3?width=2104",
      icon: MessageCircleMore,
    },
    {
      title: "碳培训",
      subtitle: "专业的碳管理培训课程，提升企业团队的双碳管理能力和专业水平。",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/0fa5766228890ff20bfed118baf1bbc6c23711f6?width=1338",
      icon: MessageCircleMore,
    },
    {
      title: "零碳园区",
      subtitle: "零碳园区规划和建设解决方案，打造绿色低碳的产业园区生态系统。",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/d900a4c1d4408745c3bae28ab6d14e3468f7d624?width=1406",
      icon: MessageCircleMore,
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-[#333] font-inter text-[34px] font-bold leading-[40px] tracking-[-0.68px] mb-4">
            细分、垂直的七大业务体系
          </h2>
        </div>

        {/* Services Grid */}
        <div className="flex gap-6 h-[446px] relative">
          {/* All Services with Consistent Hover Effects */}
          {services.map((service, index) => {
            const IconComponent = service.icon;
            const isMiddleCard = index === 1; // 碳交易 card is wider

            return (
              <div
                key={index}
                className={`relative ${isMiddleCard ? "w-[244px]" : "w-[156px]"} h-full rounded-lg overflow-hidden group cursor-pointer`}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/48" />
                <div className="absolute inset-0 bg-brand-green/90 opacity-0 group-hover:opacity-100 transition-all duration-300" />

                {/* Default State - Only Title */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 group-hover:opacity-0 transition-opacity duration-300">
                  <h3 className="text-white text-center text-lg font-medium whitespace-nowrap">
                    {service.title}
                  </h3>
                </div>

                {/* Hover State - Full Content */}
                <div className="absolute inset-0 p-6 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-center items-center">
                  <div className="flex justify-center mb-4">
                    <IconComponent className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-center text-lg font-medium mb-4">
                    {service.title}
                  </h3>
                  <p className="text-sm text-white/70 leading-6 mb-6 text-center">
                    {service.subtitle}
                  </p>
                  <button className="bg-white text-brand-green font-semibold py-3 px-6 rounded-full text-sm hover:bg-gray-50 transition-colors">
                    了解更多
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
