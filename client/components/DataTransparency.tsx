import { ChevronRight } from "lucide-react";

export default function DataTransparency() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-[#333] font-inter text-[34px] font-bold leading-[40px] tracking-[-0.68px]">
            全面、详细的信息公开
          </h2>
        </div>

        {/* Data Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Left Chart - Carbon Trading Data */}
          <div>
            <h3 className="text-[#333] font-inter text-[22px] font-medium leading-6 tracking-[-0.1px] mb-6">
              碳排放权交易数据
            </h3>
            <div className="bg-gray-100 rounded-lg h-[300px] flex items-center justify-center">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/ad18ef2f2dc17e29c4e87da3d7d93240100179b2?width=1584"
                alt="碳排放权交易数据图表"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
          </div>

          {/* Right Chart - Pollution Trading Data */}
          <div>
            <h3 className="text-[#333] font-inter text-[22px] font-medium leading-6 tracking-[-0.1px] mb-6">
              排污权交易数据
            </h3>
            <div className="bg-gray-100 rounded-lg h-[300px] flex items-center justify-center">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/7b8ab5ef49658d038697736a798fcde878d4a7dd?width=915"
                alt="排污权交易数据图表"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* More Content Link */}
        <div className="text-center">
          <button className="inline-flex items-center gap-2 text-brand-green font-inter text-[22px] font-normal leading-6 tracking-[-0.1px] group">
            更多内容
            <ChevronRight className="w-5 h-5 -rotate-90 group-hover:transform group-hover:-rotate-90 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
