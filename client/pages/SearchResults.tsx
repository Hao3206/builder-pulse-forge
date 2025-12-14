import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ArrowRight } from "lucide-react";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: "product" | "solution" | "news";
  path: string;
  category?: string;
}

const PRODUCTS_DATA = [
  {
    id: "local-carbon-trading",
    title: "本地碳交易",
    description: "本地碳交易服务和平台",
    type: "product" as const,
    path: "/local-carbon-trading",
  },
  {
    id: "green-certificate-trading",
    title: "绿证交易",
    description: "绿色证书交易服务",
    type: "product" as const,
    path: "/green-certificate-trading",
  },
  {
    id: "enterprise-carbon-asset-management",
    title: "企业碳资产管理",
    description: "企业碳资产管理解决方案",
    type: "product" as const,
    path: "/enterprise-carbon-asset-management",
  },
  {
    id: "green-low-carbon-factory",
    title: "绿色低碳工厂",
    description: "绿色低碳工厂规划和建设",
    type: "product" as const,
    path: "/product-service/green-low-carbon-factory",
  },
  {
    id: "ceav-carbon-accounting",
    title: "碳核算",
    description: "企业碳排放核算服务",
    type: "product" as const,
    path: "/ceav-carbon-accounting",
  },
  {
    id: "carbon-neutrality-planning",
    title: "碳中和规划",
    description: "企业碳中和规划服务",
    type: "product" as const,
    path: "/carbon-neutrality-planning",
  },
  {
    id: "esg-disclosure",
    title: "ESG信息披露",
    description: "ESG信息披露体系建设",
    type: "product" as const,
    path: "/esg-disclosure",
  },
  {
    id: "carbon-standard-development",
    title: "碳标准体系",
    description: "碳排放标准开发服务",
    type: "product" as const,
    path: "/carbon-standard-development",
  },
  {
    id: "carbon-research",
    title: "碳研究",
    description: "碳市场和政策研究",
    type: "product" as const,
    path: "/carbon-research",
  },
  {
    id: "carbon-finance-solution",
    title: "碳金融",
    description: "碳金融解决方案",
    type: "product" as const,
    path: "/carbon-finance-solution",
  },
  {
    id: "corporate-carbon-management",
    title: "企业碳管理平台",
    description: "企业碳管理信息化平台",
    type: "product" as const,
    path: "/corporate-carbon-management",
  },
  {
    id: "regional-carbon-brain",
    title: "区域碳大脑",
    description: "区域碳管理大脑系统",
    type: "product" as const,
    path: "/product-service/regional-carbon-brain",
  },
  {
    id: "personal-carbon-account",
    title: "个人碳账户",
    description: "个人碳减排账户系统",
    type: "product" as const,
    path: "/product-service/personal-carbon-account",
  },
  {
    id: "green-trade-platform",
    title: "绿色贸易平台",
    description: "绿色商品交易平台",
    type: "product" as const,
    path: "/product-service/green-trade-platform",
  },
  {
    id: "carbon-footprint-accounting",
    title: "产品碳足迹核算",
    description: "产品生命周期碳足迹评估",
    type: "product" as const,
    path: "/product-service/carbon-footprint-accounting",
  },
  {
    id: "carbon-trader-training",
    title: "碳交易员培训",
    description: "专业碳交易员培训课程",
    type: "product" as const,
    path: "/product-service/carbon-trader-training",
  },
  {
    id: "carbon-admin-training",
    title: "碳管理员培训",
    description: "企业碳管理员培训课程",
    type: "product" as const,
    path: "/product-service/carbon-admin-training",
  },
  {
    id: "industry-seminars-forums",
    title: "行业研讨论坛",
    description: "碳领域行业研讨会和论坛",
    type: "product" as const,
    path: "/product-service/industry-seminars-forums",
  },
  {
    id: "custom-training",
    title: "定制培训",
    description: "企业定制培训服务",
    type: "product" as const,
    path: "/product-service/custom-training",
  },
  {
    id: "advanced-carbon-training",
    title: "高级碳管理培训",
    description: "高级碳管理培训课程",
    type: "product" as const,
    path: "/product-service/advanced-carbon-training",
  },
  {
    id: "zero-carbon-park",
    title: "零碳园区",
    description: "零碳园区规划和建设",
    type: "product" as const,
    path: "/zero-carbon-park",
  },
  {
    id: "zero-carbon-factory",
    title: "零碳工厂",
    description: "零碳工厂解决方案",
    type: "product" as const,
    path: "/zero-carbon-factory",
  },
  {
    id: "carbon-footprint",
    title: "产品碳足迹",
    description: "产品碳足迹评估服务",
    type: "product" as const,
    path: "/carbon-footprint",
  },
];

const SOLUTIONS_DATA = [
  {
    id: 1,
    name: "零碳园区",
    title: "零碳园区解决方案",
    description: "零碳园区解决方案通过综合能源管理、智能监测和碳排放优化，助力园区实现碳中和目标。",
    type: "solution" as const,
    path: "/solution",
  },
  {
    id: 2,
    name: "碳核算/碳足迹",
    title: "碳核算与碳足迹追踪系统",
    description: "提供精确的碳排放计算和全生命周期碳足迹追踪服务。",
    type: "solution" as const,
    path: "/solution",
  },
  {
    id: 3,
    name: "零碳工厂",
    title: "零碳工厂解决方案",
    description: "零碳工厂解决方案通过优化生产工艺、应用清洁能源、建立能效管理体系，助力制造企业实现碳中和生产目标。",
    type: "solution" as const,
    path: "/solution",
  },
  {
    id: 4,
    name: "能碳管理",
    title: "能碳管理系统(园区/工厂)解决方案",
    description: "集成能源管理和碳管理的一体化解决方案，通过优化能源结构、提升能效水平、管控碳排放。",
    type: "solution" as const,
    path: "/solution",
  },
  {
    id: 5,
    name: "低碳消费平台",
    title: "企业碳管理一站式解决方案",
    description: "面向企业的碳管理一站式服务平台，提供从碳核算、碳监测到碳交易的全流程服务。",
    type: "solution" as const,
    path: "/solution",
  },
];

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const performSearch = async () => {
      if (!searchQuery.trim()) {
        setResults([]);
        return;
      }

      const query = searchQuery.toLowerCase();
      const allResults: SearchResult[] = [];

      // Search in products
      PRODUCTS_DATA.forEach((product) => {
        if (
          product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
        ) {
          allResults.push({
            id: product.id,
            title: product.title,
            description: product.description,
            type: "product",
            path: product.path,
          });
        }
      });

      // Search in solutions
      SOLUTIONS_DATA.forEach((solution) => {
        if (
          solution.name.toLowerCase().includes(query) ||
          solution.title.toLowerCase().includes(query) ||
          solution.description.toLowerCase().includes(query)
        ) {
          allResults.push({
            id: `solution-${solution.id}`,
            title: solution.name,
            description: solution.description,
            type: "solution",
            path: solution.path,
          });
        }
      });

      // Search in news
      try {
        const response = await fetch("/api/news");
        const result = await response.json();
        if (result.success && Array.isArray(result.data)) {
          result.data.forEach((article: any) => {
            if (
              article.title.toLowerCase().includes(query) ||
              article.content.toLowerCase().includes(query)
            ) {
              allResults.push({
                id: article.id,
                title: article.title,
                description: article.content
                  .substring(0, 150)
                  .replace(/<[^>]*>/g, ""),
                type: "news",
                path: `/news-center?search=${encodeURIComponent(searchQuery)}`,
                category: article.category,
              });
            }
          });
        }
      } catch (error) {
        console.error("Failed to fetch news:", error);
      }

      setResults(allResults);
    };

    performSearch();
  }, [searchQuery]);

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "product":
        return "产品服务";
      case "solution":
        return "解决方案";
      case "news":
        return "资讯";
      default:
        return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "product":
        return "bg-blue-100 text-blue-700";
      case "solution":
        return "bg-green-100 text-green-700";
      case "news":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-white font-inter">
      {/* Sticky Header */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-lg" : "bg-transparent"
        }`}
      >
        <Header isScrolled={isScrolled} />
      </div>

      {/* Main Content */}
      <main className="pt-[120px] pb-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Search Info */}
          <div className="mb-12">
            <h1 className="text-[34px] font-bold text-[#333] mb-2">搜索结果</h1>
            <p className="text-[#666]">
              关于 "<span className="font-semibold text-[#333]">{searchQuery}</span>" 的搜索结果
              {results.length > 0 && (
                <span className="font-semibold text-brand-green ml-2">
                  找到 {results.length} 个结果
                </span>
              )}
            </p>
          </div>

          {/* Results */}
          {results.length > 0 ? (
            <div className="space-y-6">
              {results.map((result) => (
                <div
                  key={result.id}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => navigate(result.path)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-[#333]">
                          {result.title}
                        </h3>
                        <span
                          className={`text-xs font-medium px-3 py-1 rounded-full ${getTypeColor(
                            result.type
                          )}`}
                        >
                          {getTypeLabel(result.type)}
                        </span>
                      </div>
                      <p className="text-[#666] text-sm leading-6">
                        {result.description}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-brand-green flex-shrink-0 mt-1" />
                  </div>
                </div>
              ))}
            </div>
          ) : searchQuery ? (
            <div className="text-center py-20">
              <p className="text-lg text-[#666] mb-4">未找到相关内容</p>
              <p className="text-sm text-[#999] mb-8">
                请尝试使用其他关键词进行搜索
              </p>
              <button
                onClick={() => navigate("/")}
                className="bg-brand-green text-white px-6 py-2 rounded-full hover:bg-brand-green/90 transition-colors"
              >
                返回首页
              </button>
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-lg text-[#666]">请输入搜索关键词</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
