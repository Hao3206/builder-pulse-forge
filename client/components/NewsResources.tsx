import { useFeaturedNews, useNews } from "../hooks/useApi";
import { useState } from "react";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";

export default function NewsResources() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // 使用API hooks获取数据
  const {
    data: featuredNews,
    isLoading: featuredLoading,
    error: featuredError,
  } = useFeaturedNews();

  const {
    data: newsData,
    isLoading: newsLoading,
    error: newsError,
  } = useNews({
    category: selectedCategory || undefined,
    limit: 6,
  });

  const categories = [
    { key: "", label: "全部", color: "bg-gray-100" },
    { key: "policy", label: "政策解读", color: "bg-blue-100" },
    { key: "news", label: "新闻资讯", color: "bg-green-100" },
    { key: "company", label: "本所动态", color: "bg-purple-100" },
    { key: "announcement", label: "通知广告", color: "bg-orange-100" },
  ];

  // 错误处理
  if (featuredError || newsError) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-red-800 font-semibold mb-2">加载失败</h3>
            <p className="text-red-600">
              {featuredError?.message || newsError?.message || "网络连接异常"}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-[#333] font-inter text-[34px] font-bold leading-[40px] tracking-[-0.68px] mb-4">
            了解浙东环交所的最新资讯
          </h2>
          <p className="text-[#666] font-inter text-lg">
            掌握碳交易政策动态，洞察行业发展趋势
          </p>
        </div>

        {/* Featured News */}
        {featuredNews && featuredNews.length > 0 && (
          <div className="mb-16">
            <h3 className="text-[#333] font-inter text-2xl font-bold mb-8">
              精选资讯
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredNews.slice(0, 2).map((article) => (
                <div
                  key={article.id}
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                >
                  {article.image && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          categories.find((cat) => cat.key === article.category)
                            ?.color || "bg-gray-100"
                        }`}
                      >
                        {categories.find((cat) => cat.key === article.category)
                          ?.label || "其他"}
                      </span>
                      <div className="flex items-center gap-1 text-gray-500 text-sm">
                        <Calendar className="w-4 h-4" />
                        {new Date(article.publishedAt).toLocaleDateString(
                          "zh-CN",
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-gray-500 text-sm">
                        <Clock className="w-4 h-4" />
                        {article.readTime}分钟阅读
                      </div>
                    </div>
                    <h4 className="text-[#333] font-inter text-xl font-bold leading-tight mb-3 line-clamp-2">
                      {article.title}
                    </h4>
                    <p className="text-[#666] font-inter text-base leading-relaxed mb-4 line-clamp-3">
                      {article.summary}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-gray-400" />
                        <div className="flex gap-2">
                          {article.tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button className="flex items-center gap-1 text-brand-green font-medium text-sm hover:text-brand-green/80 transition-colors">
                        阅读更多
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
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
          {newsLoading ? (
            // Loading skeleton
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-md animate-pulse"
              >
                <div className="aspect-video bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-3"></div>
                  <div className="h-6 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))
          ) : newsData?.articles && newsData.articles.length > 0 ? (
            newsData.articles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              >
                {article.image && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        categories.find((cat) => cat.key === article.category)
                          ?.color || "bg-gray-100"
                      }`}
                    >
                      {categories.find((cat) => cat.key === article.category)
                        ?.label || "其他"}
                    </span>
                    <span className="text-gray-500 text-xs">
                      {new Date(article.publishedAt).toLocaleDateString(
                        "zh-CN",
                      )}
                    </span>
                  </div>
                  <h4 className="text-[#333] font-inter text-lg font-semibold leading-tight mb-3 line-clamp-2">
                    {article.title}
                  </h4>
                  <p className="text-[#666] font-inter text-sm leading-relaxed mb-4 line-clamp-3">
                    {article.summary}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-xs">
                      {article.readTime}分钟阅读
                    </span>
                    <button className="text-brand-green font-medium text-sm hover:text-brand-green/80 transition-colors">
                      查看详情
                    </button>
                  </div>
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

        {/* Pagination */}
        {newsData?.pagination && newsData.pagination.pages > 1 && (
          <div className="mt-12 flex justify-center">
            <div className="flex items-center gap-2">
              <button
                disabled={!newsData.pagination.hasPrev}
                className="px-4 py-2 rounded border border-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                上一页
              </button>
              <span className="px-4 py-2 text-gray-700">
                第 {newsData.pagination.current} 页，共{" "}
                {newsData.pagination.pages} 页
              </span>
              <button
                disabled={!newsData.pagination.hasNext}
                className="px-4 py-2 rounded border border-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                下一页
              </button>
            </div>
          </div>
        )}

        {/* API Status Display (Development Mode) */}
        {import.meta.env.DEV && (
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="text-blue-800 font-semibold mb-2">
              API状态 (开发模式)
            </h4>
            <div className="text-sm space-y-1">
              <p className="text-blue-700">
                精选新闻: {featuredLoading ? "加载中..." : "加载完成"}
              </p>
              <p className="text-blue-700">
                新闻列表: {newsLoading ? "加载中..." : "加载完成"}
              </p>
              {newsData?.articles && (
                <p className="text-blue-700">
                  当前显示: {newsData.articles.length} 条新闻
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
