import { ChevronRight } from "lucide-react";

export default function TrainingServices() {
  const trainingPrograms = [
    {
      title: "制造业企业碳中和高级研修",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/placeholder1.jpg",
    },
    {
      title: "制造业企业碳中和高级研修…",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/placeholder2.jpg",
    },
    {
      title: "制造业企业碳中和高级",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/placeholder3.jpg",
    },
    {
      title: "制造业企业碳中和高级研修…",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/placeholder4.jpg",
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-[#333] font-inter text-[34px] font-bold leading-[40px] tracking-[-0.68px] mb-4">
            专业的碳培训服务
          </h2>

          {/* More Content Link */}
          <button className="inline-flex items-center gap-2 text-brand-green font-inter text-[22px] font-normal leading-6 tracking-[-0.1px] group">
            更多内容
            <ChevronRight className="w-5 h-5 -rotate-90 group-hover:transform group-hover:-rotate-90 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Training Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trainingPrograms.map((program, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow"
            >
              {/* Image Placeholder */}
              <div className="w-full h-40 bg-gray-200 rounded-t-lg flex items-center justify-center">
                <div className="text-gray-400 text-sm">培训图片</div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-[#333] font-inter text-[22px] font-medium leading-normal tracking-[-0.44px]">
                  {program.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
