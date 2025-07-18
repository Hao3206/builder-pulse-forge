import { useState, useEffect } from "react";
import {
  Search,
  Play,
  Volume2,
  MoreHorizontal,
  ChevronDown,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NewsCenter() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState("本所动态");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = [
    "政策解读",
    "本所动态",
    "通知公告",
    "新闻资讯",
    "知识专栏",
  ];

  const articles = [
    {
      date: "06/17",
      year: "2025",
      title: "资讯标题文字文字文案文字文字文案",
      content:
        "正文文案文字习近平主席在第75届联合国大会一案正文文案文正文文案文正文文案文正文文案文正文文案文，文文案文正文文案文文文案文正文文案文文文案文正文文案���文文案文正文文案文文文案文正文文案文最多显示两行....",
    },
    {
      date: "06/17",
      year: "2025",
      title: "资讯标题文字文字文案文字文字文案",
      content:
        "正文文案文字习近平主席在第75届联合国大会一案正文文案文正文文案文正文文案文正文文案文正文文案文，文文案文正文文案文文文案文正文文案文文文案文正文文案文文文案文正文文案文文文案文正文文案文最多显示两行....",
    },
    {
      date: "06/17",
      year: "2025",
      title: "资讯标题文字文字文案文字文字文案",
      content:
        "正文文案文字习近平主席在第75届联合国大会一案正文文案文正文文案文正文文案文正文文案文正文文案文，文文案文正文文案文文文案文正文文案文文文案文正文文案文文文案文正文文案文文文案文正文文案文最多显示两行....",
    },
    {
      date: "06/17",
      year: "2025",
      title: "资讯标题文字文字文案文字文字文案",
      content:
        "正文文案文字习近平主席在第75届联合国大会一案正文文案文正文文案文正文文案文正文文案文正文文案文，文文案文正文文案文文文案文正文文案文文文案文正文文案文文文案文正文文案文文文案文正文文案文最多显示两行....",
    },
    {
      date: "06/17",
      year: "2025",
      title: "资讯标题文字文字文案文字文字文案",
      content:
        "正文文案文字习近平主席在第75届联合国大会一案正文文案文正文文案文正文文案文正文文案文正文文案文，文文案文正文文案文文文案文正文文案文文文案文正文文案文文文案文正文文案文文文案文正文文案文最多显示两行....",
    },
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
            <div className="flex">
              {/* Left Image Area */}
              <div
                className="w-[505px] h-[330px] bg-cover bg-center relative flex items-end justify-center pb-4"
                style={{
                  backgroundImage:
                    "url('https://api.builder.io/api/v1/image/assets/TEMP/373835713d1e8499bfad12a64de0aefda4bb2407?width=1010')",
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
      <div className="bg-white py-8">
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className="flex justify-between items-center">
            {/* Category Tabs */}
            <div className="flex items-center gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 py-2 rounded-full text-sm font-medium tracking-[-0.1px] transition-colors ${
                    activeCategory === category
                      ? "bg-[#058A65]/10 text-[#058A65]"
                      : "bg-[#F8F9FB] text-[#333] hover:bg-[#058A65]/5"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-[#E5E5E7] rounded-full px-3 py-3 bg-white w-[400px]">
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

      {/* Articles List */}
      <div className="bg-white pb-12">
        <div className="max-w-screen-2xl mx-auto px-28">
          {articles.map((article, index) => (
            <div
              key={index}
              className="flex items-start gap-10 py-10 border-b border-[#E5E5E7] last:border-b-0"
            >
              {/* Date */}
              <div className="flex items-start">
                <div className="px-10 py-5 text-center">
                  <div className="text-[26px] font-bold leading-[22px] text-[#333] font-mono">
                    {article.date}
                  </div>
                  <div className="text-base font-bold leading-[22px] text-[#999] font-mono mt-2">
                    {article.year}
                  </div>
                </div>
                <div className="w-px h-[120px] bg-[#E5E5E7] ml-4"></div>
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

                <button className="flex items-center gap-2 text-[#058A65] text-sm font-semibold hover:text-[#046B52] transition-colors">
                  查看详情
                  <ChevronDown className="w-5 h-5 -rotate-90" />
                </button>
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
