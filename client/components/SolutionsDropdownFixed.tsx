import { ChevronDown, ChevronRight } from "lucide-react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "../hooks/useLanguage";

interface DropdownProps {
  title: string;
  isActive?: boolean;
  isScrolled?: boolean;
  children: React.ReactNode;
}

function Dropdown({
  title,
  isActive = false,
  isScrolled = false,
  children,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center justify-center gap-1.5 rounded-md cursor-pointer">
        <span
          className={`font-inter text-[15px] font-medium leading-[22px] transition-colors duration-300 whitespace-nowrap ${
            isActive && isScrolled
              ? "text-[#058A65]"
              : isScrolled
                ? "text-[#333]"
                : "text-white"
          }`}
        >
          {title}
        </span>
        <ChevronDown
          className={`w-5 h-5 transition-all duration-300 ${
            isActive && isScrolled
              ? "text-[#058A65]"
              : isScrolled
                ? "text-[#333]"
                : "text-white"
          } ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      {/* Dropdown Content */}
      {isOpen && (
        <div
          className="fixed top-[88px] left-0 z-50 w-full"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="bg-white shadow-[0px_13px_11.7px_rgba(0,0,0,0.11)] overflow-hidden w-full max-w-screen-2xl mx-auto">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

interface DropdownComponentProps {
  isScrolled?: boolean;
  isActive?: boolean;
}

export function SolutionsDropdown({
  isScrolled = false,
  isActive = false,
}: DropdownComponentProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Dropdown
      title={t("nav.solutions")}
      isScrolled={isScrolled}
      isActive={isActive}
    >
      <div className="flex h-[308px]">
        {/* Left Sidebar */}
        <div className="w-[340px] bg-[#EBF8F6] px-[30px] flex flex-col justify-center">
          <h3 className="text-[#333] font-inter text-[18px] font-bold leading-[20px] tracking-[-0.1px] mb-4">
            解决方案
          </h3>
          <p className="text-[#666] font-inter text-[14px] font-normal leading-normal tracking-[-0.1px] mb-6 w-[163px]">
            全行业的解决方案，助力用户快速增长。
          </p>
          <button className="flex items-center gap-2 text-[#058A65] font-inter text-[15px] font-normal leading-6 tracking-[-0.1px]">
            更多内容
            <ChevronRight className="w-5 h-5 -rotate-90" />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white relative">
          {/* Top row solutions */}
          <div className="absolute left-8 top-[30px] flex items-center gap-1">
            <span
              className="text-[#058A65] font-inter text-[16px] font-medium leading-6 tracking-[-0.16px] cursor-pointer hover:text-[#046B52] transition-colors"
              onClick={() => handleNavigation("/solution")}
            >
              能碳管理系统(园区/工厂)解决方案
            </span>
            <ChevronRight className="w-5 h-5 text-[#058A65] -rotate-90" />
          </div>

          <div className="absolute left-[369px] top-[30px] flex items-center gap-1">
            <span
              className="text-[#058A65] font-inter text-[16px] font-medium leading-6 tracking-[-0.16px] cursor-pointer hover:text-[#046B52] transition-colors"
              onClick={() => handleNavigation("/zero-carbon-park")}
            >
              零碳园区解决方案
            </span>
            <ChevronRight className="w-5 h-5 text-[#058A65] -rotate-90" />
          </div>

          <div className="absolute left-[584px] top-[30px] flex items-center gap-1">
            <span
              className="text-[#058A65] font-inter text-[16px] font-medium leading-6 tracking-[-0.16px] cursor-pointer hover:text-[#046B52] transition-colors"
              onClick={() => handleNavigation("/zero-carbon-factory")}
            >
              零碳工厂解决方案
            </span>
            <ChevronRight className="w-5 h-5 text-[#058A65] -rotate-90" />
          </div>

          {/* Description text for top row */}
          <div className="absolute left-8 top-[64px] w-[210px]">
            <p className="text-[#999] font-inter text-[14px] leading-5 tracking-[-0.1px]">
              一体化能源和碳管理解决方案，实现能源利用效率最大化和碳排放最小化
            </p>
          </div>

          <div className="absolute left-[369px] top-[64px] w-[210px]">
            <p className="text-[#999] font-inter text-[14px] leading-5 tracking-[-0.1px]">
              通过智能监测和碳排放优化，助力园区实现碳中和目标
            </p>
          </div>

          {/* Bottom row solutions */}
          <div className="absolute left-8 top-[164px] flex items-center gap-1">
            <span
              className="text-[#058A65] font-inter text-[16px] font-medium leading-6 tracking-[-0.16px] cursor-pointer hover:text-[#046B52] transition-colors"
              onClick={() => handleNavigation("/corporate-carbon-management")}
            >
              企业碳管理一站式解决方案
            </span>
            <ChevronRight className="w-5 h-5 text-[#058A65] -rotate-90" />
          </div>

          <div className="absolute left-[369px] top-[164px] flex items-center gap-1">
            <span
              className="text-[#058A65] font-inter text-[16px] font-medium leading-6 tracking-[-0.16px] cursor-pointer hover:text-[#046B52] transition-colors"
              onClick={() => handleNavigation("/carbon-footprint")}
            >
              碳核算/碳足迹解决方案
            </span>
            <ChevronRight className="w-5 h-5 text-[#058A65] -rotate-90" />
          </div>

          {/* Description text for bottom row */}
          <div className="absolute left-8 top-[198px] w-[210px]">
            <p className="text-[#999] font-inter text-[14px] leading-5 tracking-[-0.1px]">
              提供从碳核算、碳监测到碳交易的全流程服务，助力企业绿色��型
            </p>
          </div>

          <div className="absolute left-[369px] top-[198px] w-[210px]">
            <p className="text-[#999] font-inter text-[14px] leading-5 tracking-[-0.1px]">
              精确的碳排放计算和碳足迹追踪，实现碳数据透明化管理
            </p>
          </div>

          {/* Right side images/icons */}
          <div className="absolute right-[292px] top-[21px] w-[90px] h-[90px] bg-[#D9D9D9]"></div>
          <div className="absolute right-[292px] top-[159px] w-[90px] h-[90px] bg-[#D9D9D9]"></div>

          {/* Image labels */}
          <div className="absolute right-[310px] top-[114px] text-[#666] font-inter text-[14px] font-medium leading-6 tracking-[-0.14px]">
            甬城低碳
          </div>
          <div className="absolute right-[290px] top-[257px] text-[#666] font-inter text-[14px] font-medium leading-6 tracking-[-0.14px]">
            个人碳足迹计算
          </div>
        </div>
      </div>
    </Dropdown>
  );
}
