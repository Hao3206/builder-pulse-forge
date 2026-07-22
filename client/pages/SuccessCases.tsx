import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Search } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { successCases } from "@/data/successCases";

export default function SuccessCases() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState("全部案例");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = [
    "全部案例",
    "零碳园区",
    "企业碳管理",
    "碳足迹核算",
    "ESG报告",
    "碳交易",
    "培训/研修",
  ];

  const filteredCases =
    activeCategory === "全部案例"
      ? successCases
      : successCases.filter((item) => item.category === activeCategory);

  const searchFilteredCases = searchQuery
    ? filteredCases.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : filteredCases;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-lg" : "bg-transparent"
        }`}
      >
        <Header isScrolled={isScrolled} />
      </div>

      {/* Hero Section */}
      <div className="relative h-[420px] flex flex-col justify-center items-center bg-[#F8F9FB] overflow-hidden">
        {/* Background Image */}
        <img
          src="/assets/remote/unsplash-e8b529f257c91d31.webp"
          alt="绿色能源项目园区"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative z-10 text-center text-white mt-[88px]">
          <h1 className="mb-6 text-[34px] font-bold leading-[44px] sm:text-[44px] sm:leading-[60px]">
            成功案例
          </h1>
          <p className="text-lg leading-[26px] tracking-[-0.1px] text-white/80">
            见证浙东能源环交所在双碳领域的专业实力与卓越成果
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="mb-2 text-[38px] font-bold text-[#058A65] sm:text-[48px]">
                100+
              </div>
              <div className="text-[#666] text-lg">服务客户</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-[38px] font-bold text-[#058A65] sm:text-[48px]">
                50%
              </div>
              <div className="text-[#666] text-lg">平均减排效果</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-[38px] font-bold text-[#058A65] sm:text-[48px]">
                200万吨
              </div>
              <div className="text-[#666] text-lg">累计减排量</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-[38px] font-bold text-[#058A65] sm:text-[48px]">
                98%
              </div>
              <div className="text-[#666] text-lg">客户满意度</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs & Search */}
      <div className="bg-white py-8 border-b border-[#E5E5E7]">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            {/* Category Tabs */}
            <div className="flex items-center gap-4 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium tracking-[-0.1px] transition-colors ${
                    activeCategory === category
                      ? "bg-[#058A65] text-white"
                      : "bg-[#F8F9FB] text-[#333] hover:bg-[#058A65]/10"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="flex items-center gap-3 w-full lg:w-auto">
              <div className="flex items-center border border-[#E5E5E7] rounded-full px-3 py-3 bg-white w-full lg:w-[400px]">
                <Search className="w-4 h-4 text-[#999] mr-2" />
                <input
                  type="text"
                  placeholder="搜索案例标题或描述"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 text-sm text-[#333] tracking-[-0.1px] outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cases Grid */}
      <div className="bg-white py-12">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {searchFilteredCases.map((caseItem) => (
              <div
                key={caseItem.id}
                className="bg-white rounded-xl border border-[#E5E5E7] shadow-sm hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
                onClick={() => navigate(`/success-cases/${caseItem.id}`)}
              >
                {/* Image */}
                <div className="relative h-[200px] overflow-hidden">
                  <img
                    src={caseItem.image}
                    alt={caseItem.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[#058A65] text-white text-xs font-medium rounded-full">
                      {caseItem.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 text-white text-xs bg-black/50 px-2 py-1 rounded">
                    {caseItem.date}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#333] mb-3 line-clamp-2">
                    {caseItem.title}
                  </h3>
                  <p className="text-sm text-[#666] mb-4 line-clamp-3">
                    {caseItem.description}
                  </p>

                  {/* Tags */}
                  <div className="flex items-center gap-2 mb-4 flex-wrap">
                    {caseItem.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-[#F2F9F7] text-[#058A65] text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Results */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-[#058A65]">
                        {caseItem.results.carbonReduction}
                      </div>
                      <div className="text-xs text-[#666]">减排效果</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-[#058A65]">
                        {caseItem.results.energySaving}
                      </div>
                      <div className="text-xs text-[#666]">节能效果</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-[#058A65]">
                        {caseItem.results.costSaving}
                      </div>
                      <div className="text-xs text-[#666]">成本节约</div>
                    </div>
                  </div>

                  {/* Location & CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#999]">
                      📍 {caseItem.location}
                    </span>
                    <button className="flex items-center gap-1 text-[#058A65] text-sm font-semibold hover:text-[#046B52] transition-colors">
                      查看详情
                      <ChevronDown className="w-4 h-4 -rotate-90" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {searchFilteredCases.length === 0 && (
            <div className="text-center py-16">
              <div className="text-[#999] text-lg">暂无符合条件的案例</div>
              <div className="text-[#666] text-sm mt-2">
                请尝试调整搜索条件或选择不同的分类
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
