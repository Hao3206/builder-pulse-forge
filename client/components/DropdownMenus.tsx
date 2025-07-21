import { ChevronDown, ChevronRight } from "lucide-react";
import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "../hooks/useLanguage";

interface DropdownProps {
  title: string;
  isActive?: boolean;
  isScrolled?: boolean;
  children: React.ReactNode;
  onTitleClick?: () => void;
}

function Dropdown({
  title,
  isActive = false,
  isScrolled = false,
  children,
  onTitleClick,
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
    }, 150); // 150ms delay before closing
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center justify-center gap-1.5 rounded-md cursor-pointer">
        <span
          className={`font-inter text-[15px] font-medium leading-[22px] transition-colors duration-300 ${
            isActive
              ? "text-[#058A65]"
              : isScrolled
                ? "text-[#333]"
                : "text-white"
          }`}
          onClick={onTitleClick}
        >
          {title}
        </span>
        <ChevronDown
          className={`w-5 h-5 transition-all duration-300 ${
            isActive
              ? "text-[#058A65]"
              : isScrolled
                ? "text-[#333]"
                : "text-white"
          } ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      {/* Dropdown Content - Full Width */}
      {isOpen && (
        <div
          className="fixed top-[88px] left-0 z-50 w-full"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="bg-white shadow-[0px_13px_11.7px_rgba(0,0,0,0.11)] overflow-hidden w-full">
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

export function ProductServicesDropdown({
  isScrolled = false,
  isActive = false,
}: DropdownComponentProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const isActiveService = (serviceId: string) => {
    return location.pathname === `/product-service/${serviceId}`;
  };

  return (
    <Dropdown
      title={t("nav.products")}
      isScrolled={isScrolled}
      isActive={isActive}
      onTitleClick={() => {}}
    >
      <div className="flex h-[506px]">
        {/* Left Sidebar */}
        <div className="w-[340px] h-[506px] bg-[#EBF8F6] flex flex-col justify-center px-[30px]">
          <h3 className="text-[#333] font-inter text-[18px] font-bold leading-[20px] tracking-[-0.1px] mb-4">
            产品服务
          </h3>
          <p className="text-[#666] font-inter text-[14px] font-normal leading-normal tracking-[-0.1px] mb-6 w-[163px]">
            描述性小文字阐述文字文字描述性小文字阐.。
          </p>
          <button className="flex items-center gap-2 text-brand-green font-inter text-[15px] font-normal leading-6 tracking-[-0.1px]">
            更多内容
            <ChevronRight className="w-5 h-5 -rotate-90" />
          </button>
        </div>

        {/* Main Content */}
        <div className="relative flex-1 h-[506px] bg-white">
          {/* Row 1 - Top positioned elements - positions from Figma: 372px, 620px, 868px, 1116px minus 340px sidebar = 32px, 280px, 528px, 776px */}
          <div className="absolute top-[30px] left-[32px] flex items-center gap-1">
            <span className="text-brand-green font-inter text-[16px] font-semibold leading-6 tracking-[-0.16px]">
              碳交易
            </span>
            <ChevronRight className="w-5 h-5 text-brand-green -rotate-90" />
          </div>

          <div className="absolute top-[30px] left-[280px] flex items-center gap-1">
            <span className="text-brand-green font-inter text-[16px] font-semibold leading-6 tracking-[-0.16px]">
              碳咨询
            </span>
            <ChevronRight className="w-5 h-5 text-brand-green -rotate-90" />
          </div>

          <div className="absolute top-[30px] left-[528px] flex items-center gap-1">
            <span className="text-brand-green font-inter text-[16px] font-semibold leading-6 tracking-[-0.16px]">
              碳金融
            </span>
            <ChevronRight className="w-5 h-5 text-brand-green -rotate-90" />
          </div>

          <div className="absolute top-[30px] left-[776px] flex items-center gap-1">
            <span className="text-brand-green font-inter text-[16px] font-semibold leading-6 tracking-[-0.16px]">
              碳信息化
            </span>
            <ChevronRight className="w-5 h-5 text-brand-green -rotate-90" />
          </div>

          {/* Content under 碳交易 */}
          <div className="absolute top-[64px] left-[32px] w-[210px] space-y-3">
            <div className="text-[#999] font-inter text-[14px] leading-5 tracking-[-0.1px]">
              地方碳普惠交易
            </div>
            <div
              className={`font-inter text-[14px] leading-5 tracking-[-0.1px] cursor-pointer transition-colors ${
                isActiveService("ccer-asset-development")
                  ? "text-white bg-brand-green font-medium rounded-[4px] px-3 py-1 w-[218px]"
                  : "text-[#999] hover:text-brand-green"
              }`}
              onClick={() =>
                navigate("/product-service/ccer-asset-development")
              }
            >
              CCER资产开发与交易
            </div>
            <div className="text-[#999] font-inter text-[14px] leading-5 tracking-[-0.1px]">
              绿证交��
            </div>
            <div className="text-[#999] font-inter text-[14px] leading-5 tracking-[-0.1px]">
              企业碳资产管理
            </div>
          </div>

          {/* Content under 碳咨询 */}
          <div className="absolute top-[64px] left-[280px] w-[210px] space-y-3">
            <div
              className={`font-inter text-[14px] leading-5 tracking-[-0.1px] cursor-pointer transition-colors ${
                isActiveService("green-low-carbon-factory")
                  ? "text-white bg-brand-green font-medium rounded-[4px] px-3 py-1 w-[218px]"
                  : "text-[#999] hover:text-brand-green"
              }`}
              onClick={() =>
                navigate("/product-service/green-low-carbon-factory")
              }
            >
              绿色/低碳工厂创建
            </div>
            <div className="text-[#999] font-inter text-[14px] leading-5 tracking-[-0.1px]">
              CEAV产品碳排放核算与申报
            </div>
            <div className="text-[#999] font-inter text-[14px] leading-5 tracking-[-0.1px]">
              碳达峰碳中和路径规划
            </div>
            <div className="text-[#999] font-inter text-[14px] leading-5 tracking-[-0.1px]">
              ESG信息披露
            </div>
            <div className="text-[#999] font-inter text-[14px] leading-5 tracking-[-0.1px]">
              双碳标准编生
            </div>
            <div className="text-[#999] font-inter text-[14px] leading-5 tracking-[-0.1px]">
              双���课题研究
            </div>
          </div>

          {/* Content under 碳金融 */}
          <div className="absolute top-[64px] left-[528px] w-[210px]">
            <div className="text-[#999] font-inter text-[14px] leading-5 tracking-[-0.1px]">
              碳���融解决方案
            </div>
          </div>

          {/* Content under 碳信息化 */}
          <div className="absolute top-[64px] left-[776px] w-[210px] space-y-3">
            <div
              className="text-[#999] font-inter text-[14px] leading-5 tracking-[-0.1px] cursor-pointer hover:text-brand-green transition-colors"
              onClick={() => navigate("/corporate-carbon-management")}
            >
              企业碳管理平台
            </div>
            <div className="text-[#999] font-inter text-[14px] leading-5 tracking-[-0.1px]">
              区域双碳大脑
            </div>
            <div className="text-[#999] font-inter text-[14px] leading-5 tracking-[-0.1px]">
              企业碳管理平台
            </div>
            <div className="text-[#999] font-inter text-[14px] leading-5 tracking-[-0.1px]">
              个人碳账��建设
            </div>
            <div className="text-[#999] font-inter text-[14px] leading-5 tracking-[-0.1px]">
              绿色贸易服务平台
            </div>
          </div>

          {/* Row 2 - Bottom positioned elements */}
          <div className="absolute top-[282px] left-[32px] flex items-center gap-1">
            <span className="text-brand-green font-inter text-[16px] font-semibold leading-6 tracking-[-0.16px]">
              碳足迹
            </span>
            <ChevronRight className="w-5 h-5 text-brand-green -rotate-90" />
          </div>

          <div className="absolute top-[282px] left-[280px] flex items-center gap-1">
            <span className="text-brand-green font-inter text-[16px] font-semibold leading-6 tracking-[-0.16px]">
              碳培训
            </span>
            <ChevronRight className="w-5 h-5 text-brand-green -rotate-90" />
          </div>

          <div className="absolute top-[282px] left-[528px] flex items-center gap-1">
            <span className="text-brand-green font-inter text-[16px] font-semibold leading-6 tracking-[-0.16px] cursor-pointer hover:text-[#046B52] transition-colors">
              零碳园区
            </span>
            <ChevronRight className="w-5 h-5 text-brand-green -rotate-90" />
          </div>

          {/* Content under 碳足��� */}
          <div className="absolute top-[316px] left-[32px] w-[210px]">
            <div className="text-[#999] font-inter text-[14px] leading-5 tracking-[-0.1px]">
              碳盘查/碳足迹核算
            </div>
          </div>

          {/* Content under 碳培训 */}
          <div className="absolute top-[316px] left-[280px] w-[210px] space-y-3">
            <div className="text-[#999] font-inter text-[14px] leading-5 tracking-[-0.1px]">
              碳排放交易员培训
            </div>
            <div className="text-[#999] font-inter text-[14px] leading-5 tracking-[-0.1px]">
              碳排放管理员培训
            </div>
            <div className="text-[#999] font-inter text-[14px] leading-5 tracking-[-0.1px]">
              行业专题讲座/论坛
            </div>
            <div className="text-[#999] font-inter text-[14px] leading-5 tracking-[-0.1px]">
              其他定制化培训
            </div>
            <div className="text-[#999] font-inter text-[14px] leading-5 tracking-[-0.1px]">
              碳达峰碳中和战略规划高级研修班
            </div>
          </div>

          {/* Content under 零碳园区 */}
          <div className="absolute top-[316px] left-[528px] w-[210px] space-y-3">
            <div
              className="text-[#999] font-inter text-[14px] leading-5 tracking-[-0.1px] cursor-pointer hover:text-brand-green transition-colors"
              onClick={() => navigate("/zero-carbon-park")}
            >
              零碳园区解决方案
            </div>
            <div className="text-[#999] font-inter text-[14px] leading-5 tracking-[-0.1px]">
              其他低/零碳解决方案
            </div>
          </div>
        </div>
      </div>
    </Dropdown>
  );
}

export function SolutionsDropdown({
  isScrolled = false,
}: DropdownComponentProps) {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Dropdown title="解决方案" isScrolled={isScrolled}>
      <div className="flex h-[308px]">
        {/* Left Sidebar */}
        <div className="w-[340px] bg-[#EBF8F6] px-[30px] flex flex-col justify-center">
          <h3 className="text-[#333] font-inter text-[18px] font-bold leading-[20px] tracking-[-0.1px] mb-4">
            解决方案
          </h3>
          <p className="text-[#666] font-inter text-[14px] font-normal leading-normal tracking-[-0.1px] mb-6 w-[163px]">
            全行业的解决方案，助��用户快速增长。
          </p>
          <button className="flex items-center gap-2 text-[#058A65] font-inter text-[15px] font-normal leading-6 tracking-[-0.1px]">
            更多内容
            <ChevronRight className="w-5 h-5 -rotate-90" />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="grid grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              <div>
                <div
                  className="flex items-center gap-1 mb-2 cursor-pointer"
                  onClick={() => handleNavigation("/solution")}
                >
                  <span className="text-brand-green font-inter text-base font-medium leading-6 tracking-[-0.16px] hover:text-[#046B52] transition-colors">
                    能碳管理系统(园区/工厂)解决方案
                  </span>
                  <ChevronRight className="w-5 h-5 text-brand-green -rotate-90" />
                </div>
                <p className="text-[#999] font-inter text-sm leading-5 tracking-[-0.1px]">
                  全面赋能工厂实现能碳精益管理，助力双碳目标落地
                </p>
              </div>

              <div>
                <div
                  className="flex items-center gap-1 mb-2 cursor-pointer"
                  onClick={() =>
                    handleNavigation("/corporate-carbon-management")
                  }
                >
                  <span className="text-brand-green font-inter text-base font-medium leading-6 tracking-[-0.16px] hover:text-[#046B52] transition-colors">
                    企业��管理一站式解决方��
                  </span>
                  <ChevronRight className="w-5 h-5 text-brand-green -rotate-90" />
                </div>
                <p className="text-[#999] font-inter text-sm leading-5 tracking-[-0.1px]">
                  解决方案描述性文字文案文案文案文案文案文案文��文案
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <div>
                <div
                  className="flex items-center gap-1 mb-2 cursor-pointer"
                  onClick={() => handleNavigation("/zero-carbon-park")}
                >
                  <span className="text-brand-green font-inter text-base font-medium leading-6 tracking-[-0.16px] hover:text-[#046B52] transition-colors">
                    零碳园区解决方案
                  </span>
                  <ChevronRight className="w-5 h-5 text-brand-green -rotate-90" />
                </div>
                <p className="text-[#999] font-inter text-sm leading-5 tracking-[-0.1px]">
                  解决方案���述性文字文案文案文案文案文案文案文案文案
                </p>
              </div>

              <div>
                <div
                  className="flex items-center gap-1 mb-2 cursor-pointer"
                  onClick={() => handleNavigation("/carbon-footprint")}
                >
                  <span className="text-brand-green font-inter text-base font-medium leading-6 tracking-[-0.16px] hover:text-[#046B52] transition-colors">
                    碳核算/碳足迹解决方案
                  </span>
                  <ChevronRight className="w-5 h-5 text-brand-green -rotate-90" />
                </div>
                <p className="text-[#999] font-inter text-sm leading-5 tracking-[-0.1px]">
                  全�����碳足迹核算与管理解决方案，助力企业实现低碳发展
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dropdown>
  );
}

export function NewsCenterDropdown({
  isScrolled = false,
}: DropdownComponentProps) {
  const navigate = useNavigate();

  const handleNavigation = (category: string) => {
    navigate(`/news-center?category=${encodeURIComponent(category)}`);
  };

  const handleTitleClick = () => {
    navigate("/news-center");
  };

  return (
    <Dropdown
      title="资讯中心"
      isScrolled={isScrolled}
      onTitleClick={handleTitleClick}
    >
      <div className="flex h-[266px] shadow-[0px_13px_11.7px_rgba(0,0,0,0.11)]">
        {/* Left Sidebar */}
        <div className="w-[340px] h-[266px] bg-[#EBF8F6] flex flex-col justify-center px-[30px]">
          <h3 className="text-[#333] font-inter text-[18px] font-bold leading-[20px] tracking-[-0.1px] mb-4">
            资讯中心
          </h3>
          <p className="text-[#666] font-inter text-[14px] font-normal leading-normal tracking-[-0.1px] mb-6 w-[163px]">
            获取深度内容，了解最新动态。
          </p>
          <button className="flex items-center gap-2 text-[#058A65] font-inter text-[15px] font-normal leading-6 tracking-[-0.1px]">
            更多内容
            <ChevronRight className="w-5 h-5 -rotate-90" />
          </button>
        </div>

        {/* Main Content */}
        <div className="relative flex-1 h-[266px] bg-white">
          {/* First Row */}
          <div
            className="absolute left-[32px] top-[30px] flex items-center gap-1 cursor-pointer"
            onClick={() => handleNavigation("政策解读")}
          >
            <span className="text-[#058A65] font-inter text-[16px] font-medium leading-6 tracking-[-0.16px] hover:text-[#046B52] transition-colors">
              政策解读
            </span>
            <ChevronRight className="w-5 h-5 text-[#058A65] -rotate-90" />
          </div>

          <div
            className="absolute left-[262px] top-[30px] flex items-center gap-1 cursor-pointer"
            onClick={() => handleNavigation("本所动态")}
          >
            <span className="text-[#058A65] font-inter text-[16px] font-medium leading-6 tracking-[-0.16px] hover:text-[#046B52] transition-colors">
              本所动态
            </span>
            <ChevronRight className="w-5 h-5 text-[#058A65] -rotate-90" />
          </div>

          <div
            className="absolute left-[492px] top-[30px] flex items-center gap-1 cursor-pointer"
            onClick={() => handleNavigation("通知公告")}
          >
            <span className="text-[#058A65] font-inter text-[16px] font-medium leading-6 tracking-[-0.16px] hover:text-[#046B52] transition-colors">
              通知公告
            </span>
            <ChevronRight className="w-5 h-5 text-[#058A65] -rotate-90" />
          </div>

          {/* First Row Descriptions */}
          <div className="absolute left-[32px] top-[64px] w-[180px]">
            <div className="text-[#999] font-inter text-[14px] font-normal leading-5 tracking-[-0.1px]">
              解决方案描述性文字文案文
            </div>
          </div>

          <div className="absolute left-[262px] top-[64px] w-[180px]">
            <div className="text-[#999] font-inter text-[14px] font-normal leading-5 tracking-[-0.1px]">
              解决方案描述性文字文
            </div>
          </div>

          <div className="absolute left-[492px] top-[64px] w-[180px]">
            <div className="text-[#999] font-inter text-[14px] font-normal leading-5 tracking-[-0.1px]">
              解决方案描述性文字文
            </div>
          </div>

          {/* Second Row */}
          <div
            className="absolute left-[32px] top-[144px] flex items-center gap-1 cursor-pointer"
            onClick={() => handleNavigation("新闻资讯")}
          >
            <span className="text-[#058A65] font-inter text-[16px] font-medium leading-6 tracking-[-0.16px] hover:text-[#046B52] transition-colors">
              新闻资讯
            </span>
            <ChevronRight className="w-5 h-5 text-[#058A65] -rotate-90" />
          </div>

          <div
            className="absolute left-[262px] top-[144px] flex items-center gap-1 cursor-pointer"
            onClick={() => handleNavigation("知识专��")}
          >
            <span className="text-[#058A65] font-inter text-[16px] font-medium leading-6 tracking-[-0.16px] hover:text-[#046B52] transition-colors">
              知识专栏
            </span>
            <ChevronRight className="w-5 h-5 text-[#058A65] -rotate-90" />
          </div>

          {/* Second Row Descriptions */}
          <div className="absolute left-[32px] top-[178px] w-[180px]">
            <div className="text-[#999] font-inter text-[14px] font-normal leading-5 tracking-[-0.1px]">
              解决方案描述性文字文案文
            </div>
          </div>

          <div className="absolute left-[262px] top-[178px] w-[180px]">
            <div className="text-[#999] font-inter text-[14px] font-normal leading-5 tracking-[-0.1px]">
              解决方案描述性文字文
            </div>
          </div>

          {/* Gray Placeholder Area */}
          <div className="absolute right-[32px] top-[48px] w-[280px] h-[170px] bg-[#D9D9D9]"></div>
        </div>
      </div>
    </Dropdown>
  );
}

export function AboutDropdown({ isScrolled = false }: DropdownComponentProps) {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Dropdown title="关于我���" isScrolled={isScrolled}>
      <div className="p-8 h-[300px]">
        <div className="grid grid-cols-3 gap-8">
          <div>
            <h4 className="text-brand-green font-inter text-base font-semibold mb-4">
              公司介��
            </h4>
            <div className="space-y-2">
              <div
                className="text-[#999] font-inter text-sm cursor-pointer hover:text-brand-green transition-colors"
                onClick={() => handleNavigation("/about")}
              >
                企业简介
              </div>
              <div
                className="text-[#999] font-inter text-sm cursor-pointer hover:text-brand-green transition-colors"
                onClick={() => handleNavigation("/about")}
              >
                发展历程
              </div>
              <div
                className="text-[#999] font-inter text-sm cursor-pointer hover:text-brand-green transition-colors"
                onClick={() => handleNavigation("/about")}
              >
                企业文化
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-brand-green font-inter text-base font-semibold mb-4">
              成功案��
            </h4>
            <div className="space-y-2">
              <div
                className="text-[#999] font-inter text-sm cursor-pointer hover:text-brand-green transition-colors"
                onClick={() => navigate("/success-cases")}
              >
                典型案例
              </div>
              <div
                className="text-[#999] font-inter text-sm cursor-pointer hover:text-brand-green transition-colors"
                onClick={() => navigate("/success-cases")}
              >
                客户见证
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-brand-green font-inter text-base font-semibold mb-4">
              联系我们
            </h4>
            <div className="space-y-2">
              <div
                className="text-[#999] font-inter text-sm cursor-pointer hover:text-brand-green transition-colors"
                onClick={() => handleNavigation("/about")}
              >
                联系方式
              </div>
              <div
                className="text-[#999] font-inter text-sm cursor-pointer hover:text-brand-green transition-colors"
                onClick={() => handleNavigation("/about")}
              >
                地��信息
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dropdown>
  );
}
