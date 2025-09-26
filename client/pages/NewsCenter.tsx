import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Search,
  Play,
  Volume2,
  MoreHorizontal,
  ChevronDown,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

// Define the type for a single news article from the API
interface ApiNewsArticle {
  id: string;
  title: string;
  imageUrl: string;
  content: string;
  rich_content?: string;
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
}

export default function NewsCenter() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState("全部");
  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState<ComponentArticle[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    const fetchNews = async () => {
      try {
        const response = await fetch("/api/news");
        const result = await response.json();
        if (result.success && Array.isArray(result.data)) {
          // Transform API data to the format the component expects
          const formattedArticles = result.data.map((apiArticle: ApiNewsArticle) => {
            const d = new Date(apiArticle.createdAt);
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            
            // 从HTML内容中提取纯文本作为摘要
            const extractTextFromHTML = (html: string): string => {
              if (!html) return '';
              
              // 如果内容包含HTML标签，提取纯文本
              if (html.includes('<') && html.includes('>')) {
                // 创建一个临时的DOM元素来解析HTML
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = html;
                const textContent = tempDiv.textContent || tempDiv.innerText || '';
                
                // 清理多余的空白字符并截取前200个字符作为摘要
                return textContent.replace(/\s+/g, ' ').trim().substring(0, 200) + '...';
              }
              
              // 如果是纯文本，直接截取前200个字符
              return html.substring(0, 200) + (html.length > 200 ? '...' : '');
            };
            
            return {
              id: apiArticle.id,
              date: `${month}/${day}`,
              year: String(d.getFullYear()),
              title: apiArticle.title,
              content: extractTextFromHTML(apiArticle.rich_content || ''),
              category: apiArticle.category,
            };
          });
          setArticles(formattedArticles);
        }
      } catch (error) {
        console.error("Failed to fetch news:", error);
      }
    };

    fetchNews();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle URL category parameter and scroll to news section
  useEffect(() => {
    const categoryParam = searchParams.get("category");
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
      description: "浏览所有类别的文章，了解最新资讯动态"
    },
    {
      id: "政策解读",
      name: "政策解读",
      description: "深入解读国家及地方碳达峰碳中和相关政策法规，为企业提供政策指引"
    },
    {
      id: "本所动态",
      name: "本所动态",
      description: "及时发布本所重要活动、业务进展及重大事项信息"
    },
    {
      id: "通知公告",
      name: "通知公告",
      description: "发布本所各类通知公告，确保信息及时传达"
    },
    {
      id: "新闻资讯",
      name: "新闻资讯",
      description: "汇集国内外碳市场最新动态，掌握行业发展趋势"
    },
    {
      id: "知识专栏",
      name: "知识专栏",
      description: "分享碳市场专业知识，普及碳交易相关概念"
    }
  ];

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
          src="https://api.builder.io/api/v1/image/assets/TEMP/98e13ab9047ae91c29a19fadad047b469733151f?width=3840"
          alt="Forest Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Content */}
        <div className="relative z-10 text-center text-white mt-[88px]">
          <h1 className="text-[44px] font-bold leading-[60px] tracking-[-0.88px] mb-6">
            资讯中心
          </h1>
          <p className="text-lg leading-[26px] tracking-[-0.1px] text-white/80">
            这里，您将发现最新的双碳资讯、深入的行业分析及创新的实践案例
          </p>
        </div>
      </div>

      {/* Featured Article Section */}
      <div className="bg-white py-12 px-4 lg:px-28">
        <div className="max-w-screen-2xl mx-auto">
          <div className="bg-white rounded-xl border border-[#E5E5E7] shadow-sm overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Left Image Area */}
              <div
                className="w-full lg:w-[505px] h-[330px] bg-cover bg-center relative flex items-end justify-center pb-4"
                style={{
                  backgroundImage: "url('/news-featured-image.jpg')",
                }}
              >
                {/* Progress Dots */}
                <div className="flex items-center gap-2">
                  <div className="w-5 h-1 bg-white rounded"></div>
                  <div className="w-5 h-1 bg-white/52 rounded"></div>
                  <div className="w-5 h-1 bg-white/52 rounded"></div>
                  <div className="w-5 h-1 bg-white/52 rounded"></div>
                </div>
              </div>

              {/* Right Content Area */}
              <div className="flex-1 p-8">
                <div className="space-y-8">
                  {/* Article Content */}
                  <div className="space-y-4">
                    <h2 className="text-[22px] font-bold leading-[30px] tracking-[-0.22px] text-[#333]">
                      碳达峰碳中和的提出
                    </h2>
                    <p className="text-base leading-6 tracking-[-0.1px] text-[#666]">
                      2020年9月22日，习近平主席在第75届联合国大会一般性辩论上作出我国二氧化碳排放力争于2030年前达到峰值、努力争取2060年前实现碳中和的重大宣示。
                    </p>
                  </div>

                  {/* Audio Player */}
                  <div className="relative">
                    <div className="bg-[#F1F3F4] rounded-full h-[50px] flex items-center px-4 gap-4">
                      <Play className="w-[14px] h-[14px] fill-[#333] rotate-90" />
                      <span className="text-base text-[#666] tracking-[-0.1px]">
                        0:00/0:19
                      </span>

                      {/* Progress Bar */}
                      <div className="flex-1 relative">
                        <div className="w-full h-1 bg-[#C1C2C3] rounded-full"></div>
                        <div className="absolute top-0 left-0 w-[40%] h-1 bg-[#595959] rounded-full"></div>
                      </div>

                      <Volume2 className="w-4 h-4 text-[#333]" />
                      <MoreHorizontal className="w-4 h-4 text-[#333]" />
                    </div>
                  </div>

                  {/* Partner Logos */}
                  <div className="flex items-center gap-5">
                    <img
                      src="https://api.builder.io/api/v1/image/assets/TEMP/e2b144e437ae6601fc1795040020ee4ab17039d9?width=284"
                      alt="Partner Logo"
                      className="w-[142px] h-[60px]"
                    />
                    <img
                      src="https://api.builder.io/api/v1/image/assets/TEMP/35aa67d35d470ec49e2dd4ab47b4f342488ef45d?width=284"
                      alt="Partner Logo"
                      className="w-[142px] h-[60px]"
                    />
                    <img
                      src="https://api.builder.io/api/v1/image/assets/TEMP/18300e2234598f0edd2074e6c88ef9873fac7c64?width=284"
                      alt="Partner Logo"
                      className="w-[142px] h-[60px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs & Search */}
      <div id="news-list-section" className="bg-white py-8">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8">
          <div className="flex flex-col gap-6">
            {/* Category Description */}
            <div className="text-center">
              <h2 className="text-[#333] text-xl font-bold mb-2">
                {categories.find(cat => cat.id === activeCategory)?.name || "全部资讯"}
              </h2>
              <p className="text-[#666] text-base">
                {categories.find(cat => cat.id === activeCategory)?.description || "浏览所有类别的文章，了解最新资讯动态"}
              </p>
            </div>

            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              {/* Category Tabs */}
              <div className="flex items-center gap-4 flex-wrap">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
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
                    placeholder="输入您想要查询的内容"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 text-sm text-[#999] tracking-[-0.1px] outline-none"
                  />
                </div>
                <button className="px-5 py-3 bg-white border border-[#058A65] text-[#058A65] text-sm font-semibold rounded-md hover:bg-[#058A65]/5 transition-colors">
                  搜索
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Articles List */}
      <div className="bg-white pb-12">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-28">
          {articles
            .filter((article) => activeCategory === "全部" || article.category === activeCategory)
            .map((article) => (
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
                  <h3 className="text-[22px] font-bold leading-[30px] tracking-[-0.22px] text-[#333]">
                    {article.title}
                  </h3>
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
          ))}
        </div>
      </div>

      {/* Load More Button */}
      <div className="bg-white py-10">
        <div className="max-w-screen-2xl mx-auto text-center">
          <button className="px-5 py-3 border border-[#058A65] text-[#058A65] text-sm font-semibold rounded-full hover:bg-[#058A65]/5 transition-colors">
            查看全部
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
