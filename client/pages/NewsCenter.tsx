import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, AlertCircle, ChevronDown, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { NEWS_FALLBACK_IMAGE, publicNewsImage } from "@/lib/news";

// Define the type for a single news article from the API
interface ApiNewsArticle {
  id: string;
  title: string;
  imageUrl: string;
  summary: string;
  category: string;
  createdAt: string;
  author: string;
}

// Define the type for the article format used by the component
interface ComponentArticle {
  id: string;
  date: string;
  year: string;
  title: string;
  content: string;
  category: string;
  imageUrl: string;
  author: string;
}

export default function NewsCenter() {
  const [searchParams] = useSearchParams();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState("全部");
  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState<ComponentArticle[]>([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    const fetchNews = async () => {
      try {
        const response = await fetch("/api/news?view=summary");
        const result = await response.json().catch(() => ({}));
        if (response.ok && result.success && Array.isArray(result.data)) {
          // Transform API data to the format the component expects
          const formattedArticles = result.data.map(
            (apiArticle: ApiNewsArticle) => {
              const d = new Date(apiArticle.createdAt);
              const month = String(d.getMonth() + 1).padStart(2, "0");
              const day = String(d.getDate()).padStart(2, "0");

              return {
                id: apiArticle.id,
                date: `${month}/${day}`,
                year: String(d.getFullYear()),
                title: apiArticle.title,
                content: apiArticle.summary || "",
                category: apiArticle.category,
                imageUrl: apiArticle.imageUrl || "",
                author: apiArticle.author || "浙东环境能源交易所",
              };
            },
          );
          setArticles(formattedArticles);
        } else {
          throw new Error(result.error || "资讯加载失败");
        }
      } catch (error) {
        setLoadError(error instanceof Error ? error.message : "资讯加载失败");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle URL category parameter and scroll to news section
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const searchParam = searchParams.get("search");
    if (searchParam) setSearchQuery(searchParam);
    if (categoryParam) {
      setActiveCategory(categoryParam);
      // Scroll to news list section after a short delay to ensure the page has loaded
      setTimeout(() => {
        const newsSection = document.getElementById("news-list-section");
        if (newsSection) {
          newsSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    }
  }, [searchParams]);

  const categories = [
    {
      id: "全部",
      name: "全部",
      description: "浏览所有类别的文章，了解最新资讯动态",
    },
    {
      id: "政策解读",
      name: "政策解读",
      description:
        "深入解读国家及地方碳达峰碳中和相关政策法规，为企业提供政策指引",
    },
    {
      id: "本所动态",
      name: "本所动态",
      description: "及时发布本所重要活动、业务进展及重大事项信息",
    },
    {
      id: "通知公告",
      name: "通知公告",
      description: "发布本所各类通知公告，确保信息及时传达",
    },
    {
      id: "新闻资讯",
      name: "新闻资讯",
      description: "汇集国内外碳市场最新动态，掌握行业发展趋势",
    },
    {
      id: "知识专栏",
      name: "知识专栏",
      description: "分享碳市场专业知识，普及碳交易相关概念",
    },
  ];

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredArticles = articles.filter((article) => {
    const matchesCategory =
      activeCategory === "全部" || article.category === activeCategory;
    const matchesSearch =
      !normalizedQuery ||
      article.title.toLowerCase().includes(normalizedQuery) ||
      article.content.toLowerCase().includes(normalizedQuery);
    return matchesCategory && matchesSearch;
  });
  const visibleArticles = filteredArticles.slice(0, visibleCount);
  const featuredArticle = articles[0];

  useEffect(() => {
    setVisibleCount(8);
  }, [activeCategory, searchQuery]);

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
          src="/assets/remote/98e13ab9047ae91c29a19fadad047b469733151f.webp"
          alt="绿色森林与道路航拍"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Content */}
        <div className="relative z-10 text-center text-white mt-[88px]">
          <h1 className="mb-6 text-[34px] font-bold leading-[44px] sm:text-[44px] sm:leading-[60px]">
            资讯中心
          </h1>
          <p className="text-lg leading-[26px] tracking-[-0.1px] text-white/80">
            这里，您将发现最新的双碳资讯、深入的行业分析及创新的实践案例
          </p>
        </div>
      </div>

      {/* Featured Article Section */}
      <div className="bg-white px-4 py-12 lg:px-28">
        <div className="mx-auto max-w-screen-2xl">
          {loading ? (
            <div className="flex min-h-64 items-center justify-center gap-2 rounded-md border border-[#E5E5E7] text-sm text-gray-500">
              <Loader2 className="h-6 w-6 animate-spin text-[#058A65]" />
              正在加载最新资讯
            </div>
          ) : loadError ? (
            <div className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-md border border-red-100 bg-red-50/40 px-6 text-center">
              <AlertCircle className="h-7 w-7 text-red-500" />
              <h2 className="font-semibold text-gray-900">资讯暂时无法加载</h2>
              <p className="text-sm text-gray-500">{loadError}</p>
              <button
                onClick={() => window.location.reload()}
                className="rounded-md border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-700"
              >
                重新加载
              </button>
            </div>
          ) : featuredArticle ? (
            <article className="grid overflow-hidden rounded-md border border-[#E5E5E7] bg-white lg:grid-cols-[minmax(320px,0.9fr)_minmax(0,1.1fr)]">
              <Link
                to={`/news-detail/${featuredArticle.id}`}
                className="block min-h-60 overflow-hidden bg-gray-100 lg:min-h-80"
              >
                <img
                  src={publicNewsImage(featuredArticle.imageUrl)}
                  alt={featuredArticle.title}
                  className="h-full w-full object-cover transition duration-300 hover:scale-[1.02]"
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = NEWS_FALLBACK_IMAGE;
                  }}
                />
              </Link>
              <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                  <span className="rounded-full bg-[#058A65]/10 px-3 py-1 font-medium text-[#058A65]">
                    最新资讯
                  </span>
                  <span>{featuredArticle.category}</span>
                  <span>
                    {featuredArticle.year}/{featuredArticle.date}
                  </span>
                </div>
                <h2 className="text-2xl font-bold leading-9 text-[#333]">
                  {featuredArticle.title}
                </h2>
                <p className="mt-4 line-clamp-4 text-base leading-7 text-[#666]">
                  {featuredArticle.content || "点击查看资讯详情。"}
                </p>
                <div className="mt-6 flex items-center justify-between gap-4">
                  <span className="text-sm text-gray-500">
                    来源：{featuredArticle.author}
                  </span>
                  <Link
                    to={`/news-detail/${featuredArticle.id}`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-[#058A65]"
                  >
                    查看详情
                    <ChevronDown className="h-4 w-4 -rotate-90" />
                  </Link>
                </div>
              </div>
            </article>
          ) : (
            <div className="flex min-h-64 items-center justify-center rounded-md border border-[#E5E5E7] text-sm text-gray-500">
              暂时没有资讯
            </div>
          )}
        </div>
      </div>

      {/* Navigation Tabs & Search */}
      <div id="news-list-section" className="bg-white py-8">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8">
          <div className="flex flex-col gap-6">
            {/* Category Description */}
            <div className="text-center">
              <h2 className="text-[#333] text-xl font-bold mb-2">
                {categories.find((cat) => cat.id === activeCategory)?.name ||
                  "全部资讯"}
              </h2>
              <p className="text-[#666] text-base">
                {categories.find((cat) => cat.id === activeCategory)
                  ?.description || "浏览所有类别的文章，了解最新资讯动态"}
              </p>
            </div>

            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              {/* Category Tabs */}
              <div className="flex items-center gap-4 flex-wrap">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    aria-pressed={activeCategory === category.id}
                    className={`px-3 py-2 rounded-full text-sm font-medium tracking-[-0.1px] transition-colors ${
                      activeCategory === category.id
                        ? "bg-[#058A65]/10 text-[#058A65]"
                        : "bg-[#F8F9FB] text-[#333] hover:bg-[#058A65]/5"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="flex items-center gap-3 w-full lg:w-auto">
                <div className="flex items-center border border-[#E5E5E7] rounded-full px-3 py-3 bg-white w-full lg:w-[400px]">
                  <Search className="w-4 h-4 text-[#999] mr-2" />
                  <input
                    type="text"
                    aria-label="搜索资讯"
                    placeholder="输入您想要查询的内容"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 text-sm text-[#999] tracking-[-0.1px] outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Articles List */}
      <div className="bg-white pb-12">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-28">
          {loading ? (
            <div className="flex min-h-48 items-center justify-center gap-2 text-sm text-gray-500">
              <Loader2 className="h-5 w-5 animate-spin text-[#058A65]" />
              正在加载资讯列表
            </div>
          ) : !loadError && visibleArticles.length === 0 ? (
            <div className="flex min-h-48 flex-col items-center justify-center gap-2 text-center">
              <Search className="h-6 w-6 text-gray-400" />
              <h2 className="font-semibold text-gray-800">没有匹配的资讯</h2>
              <p className="text-sm text-gray-500">请调整分类或搜索关键词。</p>
            </div>
          ) : (
            visibleArticles.map((article) => (
              <div
                key={article.id}
                className="flex flex-col lg:flex-row items-start gap-6 lg:gap-10 py-10 border-b border-[#E5E5E7] last:border-b-0"
              >
                {/* Date */}
                <div className="flex items-start w-full lg:w-auto">
                  <div className="px-4 lg:px-10 py-5 text-center">
                    <div className="text-[26px] font-bold leading-[22px] text-[#333] font-mono">
                      {article.date}
                    </div>
                    <div className="text-base font-bold leading-[22px] text-[#999] font-mono mt-2">
                      {article.year}
                    </div>
                  </div>
                  <div className="hidden lg:block w-px h-[120px] bg-[#E5E5E7] ml-4"></div>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-5">
                  <div className="space-y-4">
                    <Link
                      to={`/news-detail/${article.id}`}
                      className="text-[22px] font-bold leading-[30px] tracking-[-0.22px] text-[#333] hover:text-[#058A65] transition-colors cursor-pointer inline-block"
                    >
                      {article.title}
                    </Link>
                    <p className="text-base leading-6 tracking-[-0.16px] text-[#999]">
                      {article.content}
                    </p>
                  </div>

                  <Link
                    to={`/news-detail/${article.id}`}
                    className="flex items-center gap-2 text-[#058A65] text-sm font-semibold hover:text-[#046B52] transition-colors"
                  >
                    查看详情
                    <ChevronDown className="w-5 h-5 -rotate-90" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Load More Button */}
      {visibleCount < filteredArticles.length && (
        <div className="bg-white py-10">
          <div className="max-w-screen-2xl mx-auto text-center">
            <button
              onClick={() => setVisibleCount((count) => count + 8)}
              aria-label="加载更多资讯"
              className="px-5 py-3 border border-[#058A65] text-[#058A65] text-sm font-semibold rounded-full hover:bg-[#058A65]/5 transition-colors"
            >
              加载更多资讯
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
