import { ChevronRight } from "lucide-react";

export default function NewsResources() {
  const newsItems = [
    {
      title: "标题文字文字文字文字文字文字文字文字文字文字文字文字",
      description:
        "小文字描述文字描述文字小文字描述文字描述文字小文字描述文字描述文字小文字描述文字描述文字小文字描述文字描述文…",
      date: "205-12-11",
      category: "政策解读",
      featured: true,
    },
    {
      title: "标题文字文字文字文字文字文字文字文",
      date: "205-12-11",
      category: "政策解读",
    },
    {
      title: "标题文字文字文字文字文字文字文字文字文字文字文",
      date: "205-12-11",
      category: "政策解读",
    },
    {
      title: "标题文字文字文字文字文字文字文",
      date: "205-12-11",
      category: "政策解读",
    },
  ];

  const dynamicNews = [
    {
      title: "标题文字文字文字文字文字文字文字文",
      date: "205-12-11",
    },
    {
      title: "标题文字文字文字文字文字文字文字文字文字文字文",
      date: "205-12-11",
    },
    {
      title: "标题文字文字文字文字文字文字文",
      date: "205-12-11",
    },
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-[#333] font-inter text-[34px] font-bold leading-[40px] tracking-[-0.68px]">
            了解浙东环交所的最新资讯
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - Policy Interpretation */}
          <div>
            {/* Featured News Image */}
            <div className="relative mb-8">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/abe3ce23bdb521b7b334754d3d63a8e012ac1ad5?width=1120"
                alt="Featured news"
                className="w-full h-[332px] rounded-lg object-cover"
              />

              {/* Featured Article Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 rounded-b-lg">
                <h3 className="text-white font-inter text-lg font-medium leading-6 tracking-[-0.18px]">
                  标题文字文字文字文字文字文字文字文字文字文
                </h3>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-8">
                <div className="flex flex-col">
                  <button className="text-brand-green font-inter text-xl font-bold leading-6 tracking-[-0.2px] pb-2">
                    政策解读
                  </button>
                  <div className="w-20 h-0.5 bg-brand-green" />
                </div>
                <button className="text-[#333] font-inter text-xl font-bold leading-6 tracking-[-0.2px]">
                  通知 广告
                </button>
              </div>
              <button className="flex items-center gap-1 text-[#999] font-inter text-[15px] font-normal leading-6 tracking-[-0.1px]">
                更多
                <ChevronRight className="w-5 h-5 -rotate-90" />
              </button>
            </div>

            {/* Featured Article */}
            <div className="border-b border-[#D6D6D6] pb-5 mb-6">
              <div className="flex justify-between items-start gap-8">
                <div className="flex-1">
                  <h3 className="text-brand-green font-inter text-lg font-medium leading-6 tracking-[-0.18px] mb-2">
                    {newsItems[0].title}
                  </h3>
                  <p className="text-[#666] font-inter text-base font-medium leading-6 tracking-[-0.16px]">
                    {newsItems[0].description}
                  </p>
                </div>
                <span className="text-brand-green font-inter text-sm font-medium leading-6 tracking-[-0.14px] whitespace-nowrap">
                  {newsItems[0].date}
                </span>
              </div>
            </div>

            {/* News List */}
            <div className="space-y-1">
              {newsItems.slice(1).map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-4"
                >
                  <h4 className="text-[#333] font-inter text-lg font-medium leading-6 tracking-[-0.18px] flex-1 pr-8">
                    {item.title}
                  </h4>
                  <span className="text-[#999] font-inter text-sm font-medium leading-6 tracking-[-0.14px] whitespace-nowrap">
                    {item.date}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - News & Updates */}
          <div>
            {/* Section Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-1 h-6 bg-brand-green" />
                <h3 className="text-[#333] font-inter text-xl font-bold leading-6 tracking-[-0.2px]">
                  本所动态
                </h3>
              </div>
              <button className="flex items-center gap-1 text-[#999] font-inter text-[15px] font-normal leading-6 tracking-[-0.1px]">
                更多
                <ChevronRight className="w-5 h-5 -rotate-90" />
              </button>
            </div>

            {/* Dynamic News List */}
            <div className="space-y-1 mb-8">
              {dynamicNews.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-2"
                >
                  <h4 className="text-[#333] font-inter text-lg font-medium leading-6 tracking-[-0.18px] flex-1 pr-8">
                    {item.title}
                  </h4>
                  <span className="text-[#999] font-inter text-sm font-medium leading-6 tracking-[-0.14px] whitespace-nowrap">
                    {item.date}
                  </span>
                </div>
              ))}
            </div>

            {/* News & Updates Section */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-1 h-6 bg-brand-green" />
                <h3 className="text-[#333] font-inter text-xl font-bold leading-6 tracking-[-0.2px]">
                  新闻资讯
                </h3>
              </div>
              <button className="flex items-center gap-1 text-[#999] font-inter text-[15px] font-normal leading-6 tracking-[-0.1px]">
                更多
                <ChevronRight className="w-5 h-5 -rotate-90" />
              </button>
            </div>

            {/* Featured Image and Content */}
            <div className="space-y-4">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/2acae74145d8c35527027e8dc2f1726b9d054fce?width=400"
                alt="News image"
                className="w-[200px] h-[115px] rounded-lg object-cover float-right ml-4"
              />
              <h4 className="text-[#333] font-inter text-lg font-semibold leading-6 tracking-[-0.18px]">
                标题文字文字文字文字文字文字文字文字
              </h4>
              <p className="text-[#666] font-inter text-base font-medium leading-6 tracking-[-0.16px]">
                小文字描述文字描述文字描述文字描述文字小文字描述文字描述文字描述文字描述文字
              </p>
              <span className="text-[#999] font-inter text-sm font-medium leading-6 tracking-[-0.14px]">
                205-12-11
              </span>
            </div>
          </div>
        </div>

        {/* More Content Link */}
        <div className="text-center mt-16">
          <button className="inline-flex items-center gap-2 text-brand-green font-inter text-[22px] font-normal leading-6 tracking-[-0.1px] group">
            更多内容
            <ChevronRight className="w-5 h-5 -rotate-90 group-hover:transform group-hover:-rotate-90 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
