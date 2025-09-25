import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { successCases } from "@/data/successCases";

export default function SuccessCases() {
  const navigate = useNavigate();
  
  // 取第7、8、9个真实案例数据
  const featuredCases = successCases.slice(6, 9);

  const handleMoreCases = () => {
    navigate("/success-cases");
  };

  const handleCaseClick = (caseId: number) => {
    navigate(`/success-cases/${caseId}`);
  };

  return (
    <section className="bg-brand-green-50 py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-[#333] font-inter text-[34px] font-bold leading-[40px] tracking-[-0.68px] mb-8">
            全国海量的成功案例
          </h2>

          {/* More Cases Link */}
          <button 
            onClick={handleMoreCases}
            className="inline-flex items-center gap-2 text-brand-green font-inter text-[22px] font-normal leading-6 tracking-[-0.1px] group hover:text-[#046B52] transition-colors"
          >
            更多案例
            <ChevronRight className="w-5 h-5 -rotate-90 group-hover:transform group-hover:-rotate-90 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredCases.map((caseItem) => (
            <div
              key={caseItem.id}
              onClick={() => handleCaseClick(caseItem.id)}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105"
            >
              {/* Case Image */}
              <div className="relative h-[260px] rounded-t-lg overflow-hidden">
                <img
                  src={caseItem.image}
                  alt={caseItem.title}
                  className="w-full h-full object-cover"
                />
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-[#058A65] text-white px-3 py-1 rounded-full text-xs font-medium">
                    {caseItem.category}
                  </span>
                </div>
              </div>

              {/* Case Content */}
              <div className="p-7 bg-gradient-to-b from-white/80 via-white/97 to-white">
                <h3 className="text-[#333] font-inter text-[22px] font-bold leading-normal tracking-[-0.44px] mb-4">
                  {caseItem.title}
                </h3>
                <p className="text-[#666] font-inter text-sm font-normal leading-6 tracking-[-0.1px] mb-4">
                  {caseItem.description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {caseItem.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Location and Date */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>📍 {caseItem.location}</span>
                  <span>📅 {caseItem.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
