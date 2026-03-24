import { ChevronRight } from "lucide-react";

export default function TrainingServices() {
  const trainingPrograms = [
    {
      title: "制造业企业碳中和高级研修",
      image: "https://www.zdeaee.com/uploads/training-presentation-1.png",
    },
    {
      title: "制造业企业碳中和高级研修…",
      image: "https://www.zdeaee.com/uploads/training-presentation-2.webp",
    },
    {
      title: "制造业企业碳中和高级",
      image: "https://www.zdeaee.com/uploads/training-presentation-3.webp",
    },
    {
      title: "制造业企业碳中和高级研修…",
      image: "https://www.zdeaee.com/uploads/training-presentation-4.webp",
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
              {/* Image */}
              <div className="w-full h-40 bg-gray-100 rounded-t-lg overflow-hidden">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
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
