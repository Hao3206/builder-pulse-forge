import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";

interface NewsArticle {
  id: string;
  title: string;
  imageUrl: string;
  content: string;
  category: string;
  createdAt: string;
  author: string;
  featured: boolean;
}

export default function NewsResources() {
  const [selectedCategory, setSelectedCategory] = useState<string>("全部");
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [featuredArticles, setFeaturedArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/news");
        const result = await response.json();
        if (result.success && Array.isArray(result.data)) {
          setArticles(result.data);
          // Manually filter featured articles
          setFeaturedArticles(
            result.data.filter((a: any) => a.featured).slice(0, 2)
          );
        }
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
  }, []);

  const categories = [
    { key: "全部", label: "全部", color: "bg-gray-100" },
    { key: "政策解读", label: "政策解读", color: "bg-blue-100" },
    { key: "新闻资讯", label: "新闻资讯", color: "bg-green-100" },
    { key: "本所动态", label: "本所动态", color: "bg-purple-100" },
    { key: "通知公告", label: "通知公告", color: "bg-orange-100" },
    { key: "知识专栏", label: "知识专栏", color: "bg-yellow-100" },
  ];

  const filteredArticles =
    selectedCategory === "全部"
      ? articles
      : articles.filter((article) => article.category === selectedCategory);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-[#333] font-inter text-[34px] font-bold leading-[40px] tracking-[-0.68px] mb-4">
            了解浙东环交所的最新资讯
          </h2>
          <p className="text-[#666] font-inter text-lg">
            掌握碳交易政策动态，洞悉行业发展趋势
          </p>
        </div>

        {/* Featured News */}
        {featuredArticles.length > 0 && (
          <div className="mb-16">
            <h3 className="text-[#333] font-inter text-2xl font-bold mb-8">
              精选资讯
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredArticles.map((article) => (
                <div
                  key={article.id}
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                  onClick={() => navigate(`/news-detail/${article.id}`)}
                >
                  {article.imageUrl && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          categories.find(
                            (cat) => cat.key === article.category
                          )?.color || "bg-gray-100"
                        }`}
                      >
                        {categories.find(
                          (cat) => cat.key === article.category
                        )?.label || "其他"}
                      </span>
                      <div className="flex items-center gap-1 text-gray-500 text-sm">
                        <Calendar className="w-4 h-4" />
                        {new Date(article.createdAt).toLocaleDateString(
                          "zh-CN"
                        )}
                      </div>
                    </div>
                    <h4 className="text-[#333] font-inter text-xl font-bold leading-tight mb-3 line-clamp-2">
                      {article.title}
                    </h4>
                    <p className="text-[#666] font-inter text-base leading-relaxed mb-4 line-clamp-3">
                      {article.content.substring(0, 100)}...
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 ${
                  selectedCategory === category.key
                    ? "bg-brand-green text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-md animate-pulse"
              >
                <div className="aspect-video bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-3 w-1/4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))
          ) : filteredArticles.length > 0 ? (
            filteredArticles.slice(0, 6).map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() => navigate(`/news-detail/${article.id}`)}
              >
                {article.imageUrl && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        categories.find(
                          (cat) => cat.key === article.category
                        )?.color || "bg-gray-100"
                      }`}
                    >
                      {categories.find(
                        (cat) => cat.key === article.category
                      )?.label || "其他"}
                    </span>
                    <span className="text-gray-500 text-xs">
                      {new Date(article.createdAt).toLocaleDateString("zh-CN")}
                    </span>
                  </div>
                  <h4 className="text-[#333] font-inter text-lg font-semibold leading-tight mb-3 line-clamp-2">
                    {article.title}
                  </h4>
                  <p className="text-[#666] font-inter text-sm leading-relaxed mb-4 line-clamp-3">
                    {article.content.substring(0, 100)}...
                  </p>
                  <button
                    onClick={() => navigate(`/news-detail/${article.id}`)}
                    className="text-brand-green font-medium text-sm hover:text-brand-green/80 transition-colors"
                  >
                    查看详情
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">
                {selectedCategory ? "该分类下暂无资讯" : "暂无资讯内容"}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
