import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Search } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
  ];

  const successCases = [
    {
      id: 1,
      category: "零碳园区",
      title: "某国际生态园区零碳转型示范项目",
      description:
        "通过综合能源管理系统和智慧碳管理平台，该园区实现了碳排放减少60%，成为行业标杆案例。",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
      tags: ["园区管理", "减排60%", "智慧监控"],
      date: "2024-12",
      location: "浙江宁波",
      results: {
        carbonReduction: "60%",
        energySaving: "45%",
        costSaving: "30%",
      },
    },
    {
      id: 2,
      category: "企业碳管理",
      title: "大型制造企业碳中和管理平台建设",
      description:
        "为某大型制造企业搭建完整的碳排放监测、核算和管理体系，助力企业实现碳中和目标。",
      image:
        "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&h=600&fit=crop",
      tags: ["制造业", "碳中和", "数字化管理"],
      date: "2024-11",
      location: "江苏苏州",
      results: {
        carbonReduction: "45%",
        energySaving: "35%",
        costSaving: "25%",
      },
    },
    {
      id: 3,
      category: "碳足迹核算",
      title: "消费品行业产品碳足迹评估项目",
      description:
        "为知名消费品牌建立完整的产品生命周期碳足迹评估体系，提升品牌ESG价值。",
      image:
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop",
      tags: ["生命周期评估", "消费品", "ESG提升"],
      date: "2024-10",
      location: "上海",
      results: {
        carbonReduction: "30%",
        energySaving: "28%",
        costSaving: "20%",
      },
    },
    {
      id: 4,
      category: "ESG报告",
      title: "金融机构ESG信息披露体系构建",
      description:
        "协助大型银行建立符合国际标准的ESG信息披露体系，提升可持续发展治理水平。",
      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop",
      tags: ["金融业", "信息披露", "国际标准"],
      date: "2024-09",
      location: "北京",
      results: {
        carbonReduction: "25%",
        energySaving: "22%",
        costSaving: "15%",
      },
    },
    {
      id: 5,
      category: "碳交易",
      title: "工业园区碳资产开发与交易项目",
      description:
        "帮助工业园区开发碳减排项目，成功完成碳信用交易，实现经济效益与环境效益双赢。",
      image:
        "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800&h=600&fit=crop",
      tags: ["碳资产", "碳交易", "经济效益"],
      date: "2024-08",
      location: "广东深圳",
      results: {
        carbonReduction: "55%",
        energySaving: "40%",
        costSaving: "35%",
      },
    },
    {
      id: 6,
      category: "零碳园区",
      title: "高科技产业园零碳智慧化改造",
      description:
        "运用数字孪生技术为高科技产业园打造智慧能源管理系统，实现园区运营零碳化。",
      image:
        "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&h=600&fit=crop",
      tags: ["数字孪生", "智慧能源", "零碳运营"],
      date: "2024-07",
      location: "深圳",
      results: {
        carbonReduction: "65%",
        energySaving: "50%",
        costSaving: "40%",
      },
    },
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
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop"
          alt="Success Cases Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative z-10 text-center text-white mt-[88px]">
          <h1 className="text-[44px] font-bold leading-[60px] tracking-[-0.88px] mb-6">
            成功��例
          </h1>
          <p className="text-lg leading-[26px] tracking-[-0.1px] text-white/80">
            见证万泽时代在双碳领域的专业实力与卓越成果
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-[48px] font-bold text-[#058A65] mb-2">
                100+
              </div>
              <div className="text-[#666] text-lg">服务客户</div>
            </div>
            <div className="text-center">
              <div className="text-[48px] font-bold text-[#058A65] mb-2">
                50%
              </div>
              <div className="text-[#666] text-lg">平均减排效果</div>
            </div>
            <div className="text-center">
              <div className="text-[48px] font-bold text-[#058A65] mb-2">
                200万吨
              </div>
              <div className="text-[#666] text-lg">累计减排量</div>
            </div>
            <div className="text-center">
              <div className="text-[48px] font-bold text-[#058A65] mb-2">
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
              <button className="px-5 py-3 bg-[#058A65] text-white text-sm font-semibold rounded-md hover:bg-[#046B52] transition-colors">
                搜索
              </button>
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

      {/* Load More Button */}
      {searchFilteredCases.length > 0 && (
        <div className="bg-white py-10">
          <div className="max-w-screen-2xl mx-auto text-center">
            <button className="px-8 py-3 border border-[#058A65] text-[#058A65] text-sm font-semibold rounded-full hover:bg-[#058A65]/5 transition-colors">
              加载更多案例
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
