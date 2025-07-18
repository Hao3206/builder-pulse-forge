import { ChevronDown, ChevronRight } from "lucide-react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface NewsDropdownProps {
  isScrolled?: boolean;
}

export default function NewsDropdown({
  isScrolled = false,
}: NewsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150); // 150ms delay before closing
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="flex items-center justify-center gap-1.5 rounded-md cursor-pointer"
        onClick={() => navigate("/news-center")}
      >
        <span
          className={`font-inter text-[15px] font-medium leading-[22px] transition-colors duration-300 ${
            isScrolled ? "text-[#333]" : "text-white"
          }`}
        >
          资讯中心
        </span>
        <ChevronDown
          className={`w-5 h-5 transition-all duration-300 ${
            isScrolled ? "text-[#333]" : "text-neutral-200"
          } ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      {/* Dropdown Content - Full Width */}
      {isOpen && (
        <div
          className="fixed top-[88px] left-0 z-50 w-full max-w-screen-2xl mx-auto"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="bg-white shadow-[0px_13px_11.7px_rgba(0,0,0,0.11)] overflow-hidden w-full">
            <div className="flex h-[266px]">
              {/* Left Sidebar */}
              <div className="w-[340px] bg-[#EBF8F6] p-8 flex flex-col justify-center">
                <h3 className="text-[#333] font-inter text-lg font-bold leading-5 tracking-[-0.1px] mb-4">
                  资讯中心
                </h3>
                <p className="text-[#666] font-inter text-sm font-normal leading-normal tracking-[-0.1px] mb-6 w-[163px]">
                  获取深度内容，了解最新动态。
                </p>
                <button className="flex items-center gap-2 text-[#058A65] font-inter text-[15px] font-normal leading-6 tracking-[-0.1px]">
                  更多内容
                  <ChevronRight className="w-5 h-5 -rotate-90" />
                </button>
              </div>

              {/* Main Content */}
              <div className="flex-1 relative">
                {/* First Column - 政策解读 & 新闻资讯 */}
                <div className="absolute left-[32px] top-[30px]">
                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-[#058A65] font-inter text-base font-medium leading-6 tracking-[-0.16px]">
                      政策解读
                    </span>
                    <ChevronRight className="w-5 h-5 text-[#058A65] -rotate-90" />
                  </div>
                  <p className="text-[#999] font-inter text-sm leading-5 tracking-[-0.1px] w-[180px]">
                    解决方案描述性文字文案文
                  </p>
                </div>

                <div className="absolute left-[32px] top-[144px]">
                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-[#058A65] font-inter text-base font-medium leading-6 tracking-[-0.16px]">
                      新闻资讯
                    </span>
                    <ChevronRight className="w-5 h-5 text-[#058A65] -rotate-90" />
                  </div>
                  <p className="text-[#999] font-inter text-sm leading-5 tracking-[-0.1px] w-[180px]">
                    解决方案描述性文字文案文
                  </p>
                </div>

                {/* Second Column - 本所动态 & 知识专栏 */}
                <div className="absolute left-[262px] top-[30px]">
                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-[#058A65] font-inter text-base font-medium leading-6 tracking-[-0.16px]">
                      本所动态
                    </span>
                    <ChevronRight className="w-5 h-5 text-[#058A65] -rotate-90" />
                  </div>
                  <p className="text-[#999] font-inter text-sm leading-5 tracking-[-0.1px] w-[180px]">
                    解决方案描述性文字文
                  </p>
                </div>

                <div className="absolute left-[262px] top-[144px]">
                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-[#058A65] font-inter text-base font-medium leading-6 tracking-[-0.16px]">
                      知识专栏
                    </span>
                    <ChevronRight className="w-5 h-5 text-[#058A65] -rotate-90" />
                  </div>
                  <p className="text-[#999] font-inter text-sm leading-5 tracking-[-0.1px] w-[180px]">
                    解决方案描述性文字文
                  </p>
                </div>

                {/* Third Column - 通知公告 & Gray Area */}
                <div className="absolute left-[492px] top-[30px]">
                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-[#058A65] font-inter text-base font-medium leading-6 tracking-[-0.16px]">
                      通知公告
                    </span>
                    <ChevronRight className="w-5 h-5 text-[#058A65] -rotate-90" />
                  </div>
                  <p className="text-[#999] font-inter text-sm leading-5 tracking-[-0.1px] w-[180px] mb-4">
                    解决方案描述性文字文
                  </p>
                </div>

                {/* Gray placeholder area - positioned based on Figma coordinates */}
                <div className="absolute right-[112px] top-[48px] w-[280px] h-[170px] bg-[#D9D9D9]"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
