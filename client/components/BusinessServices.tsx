import { MessageCircleMore } from "lucide-react";

export default function BusinessServices() {
  const services = [
    {
      title: "碳咨询",
      subtitle:
        "增加点文案描述增加点文案描述增加点文案描述增加点文案描述增加点文案描述增加点文案描述",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/7bb1fe9f262a0519faa5ffb370502b8d01792d9d?width=349",
      featured: true,
    },
    {
      title: "碳交易",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/016820fd6b8a92264e45eec769581861a334348a?width=546",
    },
    {
      title: "碳金融",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/ac321a0ee51299b257411524ffab412103ab7b2c?width=1329",
    },
    {
      title: "碳信息化",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/6a64cd50e1b9fc8390c4aaf934f7576ecfbaa7f2?width=632",
    },
    {
      title: "碳足迹",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/681c8a293aa285306001bad46de4183adcf195e3?width=2104",
    },
    {
      title: "碳培训",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/0fa5766228890ff20bfed118baf1bbc6c23711f6?width=1338",
    },
    {
      title: "零碳园区",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/d900a4c1d4408745c3bae28ab6d14e3468f7d624?width=1406",
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
          {/* First Column - 碳咨询 (Featured) */}
          <div className="relative w-[156px] h-full rounded-lg overflow-hidden group">
            <img
              src={services[0].image}
              alt={services[0].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/48" />
            <div className="absolute inset-0 bg-brand-green/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex justify-center mb-4">
                <MessageCircleMore className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-center text-lg font-medium mb-4">
                {services[0].title}
              </h3>
              <p className="text-sm text-white/70 leading-6 mb-6">
                {services[0].subtitle}
              </p>
              <button className="w-full bg-white text-brand-green font-semibold py-3 px-6 rounded-full text-sm hover:bg-gray-50 transition-colors">
                了解更多
              </button>
            </div>
          </div>

          {/* Middle Section - Large Featured */}
          <div className="relative w-[244px] h-full rounded-lg overflow-hidden">
            <img
              src={services[1].image}
              alt={services[1].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/48" />
            <div className="absolute inset-0 bg-brand-green/90" />

            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
              <h3 className="text-white text-center text-lg font-medium">
                {services[1].title}
              </h3>
            </div>
          </div>

          {/* Remaining Services */}
          {services.slice(2).map((service, index) => (
            <div
              key={index}
              className="relative w-[156px] h-full rounded-lg overflow-hidden group"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/48" />
              <div className="absolute inset-0 bg-brand-green/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                <h3 className="text-white text-center text-lg font-medium whitespace-nowrap">
                  {service.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
