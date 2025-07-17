import { ChevronRight } from "lucide-react";

export default function SuccessCases() {
  const cases = [
    {
      title: "成功案例名称",
      description:
        "增加点文案描述增加点文案描述增加点文案描述增加点文案描述增加点文案描述增加点文案.",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/case1.jpg",
    },
    {
      title: "成功案例名称",
      description:
        "增加点文案描述增加点文案描述增加点文案描述增加点文案描述增加点文案描述增加点文案.",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/case2.jpg",
    },
    {
      title: "成功案例名称",
      description:
        "增加点文案描述增加点文案描述增加点文案描述增加点文案描述增加点文案描述增加点文案.",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/case3.jpg",
    },
  ];

  return (
    <section className="bg-brand-green-50 py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-[#333] font-inter text-[34px] font-bold leading-[40px] tracking-[-0.68px] mb-8">
            全国海量的成功案例
          </h2>

          {/* More Cases Link */}
          <button className="inline-flex items-center gap-2 text-brand-green font-inter text-[22px] font-normal leading-6 tracking-[-0.1px] group">
            更多案例
            <ChevronRight className="w-5 h-5 -rotate-90 group-hover:transform group-hover:-rotate-90 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cases.map((caseItem, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
            >
              {/* Case Image */}
              <div className="relative h-[260px] bg-gradient-to-b from-gray-300 to-gray-400 rounded-t-lg">
                {/* Placeholder for case image */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-600">
                  案例图片
                </div>
              </div>

              {/* Case Content */}
              <div className="p-7 bg-gradient-to-b from-white/80 via-white/97 to-white">
                <h3 className="text-[#333] font-inter text-[22px] font-bold leading-normal tracking-[-0.44px] mb-4">
                  {caseItem.title}
                </h3>
                <p className="text-[#666] font-inter text-sm font-normal leading-6 tracking-[-0.1px]">
                  {caseItem.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
