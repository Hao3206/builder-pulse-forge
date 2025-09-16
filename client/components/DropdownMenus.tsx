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
          className={`font-inter text-[15px] font-medium leading-[22px] transition-colors duration-300 whitespace-nowrap ${
            isActive && isScrolled
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
            isActive && isScrolled
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

  const isActivePath = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
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
            {t("nav.products")}
          </h3>
          <p className="text-[#666] font-inter text-[14px] font-normal leading-normal tracking-[-0.1px] mb-6 w-[163px]">
            {t("common.description.placeholder")}
          </p>
          <button className="flex items-center gap-2 text-brand-green font-inter text-[15px] font-normal leading-6 tracking-[-0.1px]">
            {t("common.more.content")}
            <ChevronRight className="w-5 h-5 -rotate-90" />
          </button>
        </div>

        {/* Main Content */}
        <div className="relative flex-1 h-[506px] bg-white">
          {/* Row 1 - Top positioned elements - positions from Figma: 372px, 620px, 868px, 1116px minus 340px sidebar = 32px, 280px, 528px, 776px */}
          <div className="absolute top-[30px] left-[32px] flex items-center gap-1">
            <span className="text-brand-green font-inter text-[16px] font-semibold leading-6 tracking-[-0.16px]">
              {t("products.carbon.trading")}
            </span>
            <ChevronRight className="w-5 h-5 text-brand-green -rotate-90" />
          </div>

          <div className="absolute top-[30px] left-[280px] flex items-center gap-1">
            <span className="text-brand-green font-inter text-[16px] font-semibold leading-6 tracking-[-0.16px]">
              {t("products.carbon.consulting")}
            </span>
            <ChevronRight className="w-5 h-5 text-brand-green -rotate-90" />
          </div>

          <div className="absolute top-[30px] left-[528px] flex items-center gap-1">
            <span className="text-brand-green font-inter text-[16px] font-semibold leading-6 tracking-[-0.16px]">
              {t("products.carbon.finance")}
            </span>
            <ChevronRight className="w-5 h-5 text-brand-green -rotate-90" />
          </div>

          <div className="absolute top-[30px] left-[776px] flex items-center gap-1">
            <span className="text-brand-green font-inter text-[16px] font-semibold leading-6 tracking-[-0.16px]">
              {t("products.carbon.tech")}
            </span>
            <ChevronRight className="w-5 h-5 text-brand-green -rotate-90" />
          </div>

          {/* Content under 碳交易 */}
          <div className="absolute top-[64px] left-[32px] w-[210px] space-y-3">
            <div
              className={`font-inter text-[14px] leading-5 tracking-[-0.1px] cursor-pointer transition-colors ${
                isActivePath("/local-carbon-trading")
                  ? "text-white bg-brand-green font-medium rounded-[4px] px-3 py-1 w-[218px]"
                  : "text-[#999] hover:text-brand-green"
              }`}
              onClick={() => navigate("/local-carbon-trading")}
            >
              {t("products.local.carbon.trading")}
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
              {t("products.ccer.development")}
            </div>
            <div
              className={`font-inter text-[14px] leading-5 tracking-[-0.1px] cursor-pointer transition-colors ${
                isActivePath("/green-certificate-trading")
                  ? "text-white bg-brand-green font-medium rounded-[4px] px-3 py-1 w-[218px]"
                  : "text-[#999] hover:text-brand-green"
              }`}
              onClick={() => navigate("/green-certificate-trading")}
            >
              {t("products.green.certificate")}
            </div>
            <div
              className={`font-inter text-[14px] leading-5 tracking-[-0.1px] cursor-pointer transition-colors ${
                isActivePath("/enterprise-carbon-asset-management")
                  ? "text-white bg-brand-green font-medium rounded-[4px] px-3 py-1 w-[218px]"
                  : "text-[#999] hover:text-brand-green"
              }`}
              onClick={() => navigate("/enterprise-carbon-asset-management")}
            >
              {t("products.enterprise.carbon.management")}
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
              {t("products.green.factory")}
            </div>
            <div
              className={`font-inter text-[14px] leading-5 tracking-[-0.1px] cursor-pointer transition-colors ${
                isActivePath("/ceav-carbon-accounting")
                  ? "text-white bg-brand-green font-medium rounded-[4px] px-3 py-1 w-[218px]"
                  : "text-[#999] hover:text-brand-green"
              }`}
              onClick={() => navigate("/ceav-carbon-accounting")}
            >
              {t("products.ceav.accounting")}
            </div>
            <div
              className={`font-inter text-[14px] leading-5 tracking-[-0.1px] cursor-pointer transition-colors ${
                isActivePath("/carbon-neutrality-planning")
                  ? "text-white bg-brand-green font-medium rounded-[4px] px-3 py-1 w-[218px]"
                  : "text-[#999] hover:text-brand-green"
              }`}
              onClick={() => navigate("/carbon-neutrality-planning")}
            >
              {t("products.carbon.neutral.planning")}
            </div>
            <div
              className={`font-inter text-[14px] leading-5 tracking-[-0.1px] cursor-pointer transition-colors ${
                isActivePath("/esg-disclosure")
                  ? "text-white bg-brand-green font-medium rounded-[4px] px-3 py-1 w-[218px]"
                  : "text-[#999] hover:text-brand-green"
              }`}
              onClick={() => navigate("/esg-disclosure")}
            >
              {t("products.esg.disclosure")}
            </div>
            <div
              className={`font-inter text-[14px] leading-5 tracking-[-0.1px] cursor-pointer transition-colors ${
                isActivePath("/carbon-standard-development")
                  ? "text-white bg-brand-green font-medium rounded-[4px] px-3 py-1 w-[218px]"
                  : "text-[#999] hover:text-brand-green"
              }`}
              onClick={() => navigate("/carbon-standard-development")}
            >
              {t("products.carbon.standard")}
            </div>
            <div
              className={`font-inter text-[14px] leading-5 tracking-[-0.1px] cursor-pointer transition-colors ${isActivePath("/carbon-research") ? "text-white bg-brand-green font-medium rounded-[4px] px-3 py-1 w-[218px]" : "text-[#999] hover:text-brand-green"}`}
              onClick={() => navigate("/carbon-research")}
            >
              {t("products.carbon.research")}
            </div>
          </div>

          {/* Content under 碳金融 */}
          <div className="absolute top-[64px] left-[528px] w-[210px]">
            <div
              className={`font-inter text-[14px] leading-5 tracking-[-0.1px] cursor-pointer transition-colors ${isActivePath("/carbon-finance-solution") ? "text-white bg-brand-green font-medium rounded-[4px] px-3 py-1 w-[218px]" : "text-[#999] hover:text-brand-green"}`}
              onClick={() => navigate("/carbon-finance-solution")}
            >
              {t("products.carbon.finance.solutions")}
            </div>
          </div>

          {/* Content under 碳信息化 */}
          <div className="absolute top-[64px] left-[776px] w-[210px] space-y-3">
            <div
              className={`font-inter text-[14px] leading-5 tracking-[-0.1px] cursor-pointer transition-colors ${isActivePath("/corporate-carbon-management") ? "text-white bg-brand-green font-medium rounded-[4px] px-3 py-1 w-[218px]" : "text-[#999] hover:text-brand-green"}`}
              onClick={() => navigate("/corporate-carbon-management")}
            >
              {t("products.enterprise.platform")}
            </div>
            <div
              className={`font-inter text-[14px] leading-5 tracking-[-0.1px] cursor-pointer transition-colors ${
                isActiveService("regional-carbon-brain")
                  ? "text-white bg-brand-green font-medium rounded-[4px] px-3 py-1 w-[218px]"
                  : "text-[#999] hover:text-brand-green"
              }`}
              onClick={() => navigate("/product-service/regional-carbon-brain")}
            >
              {t("products.regional.brain")}
            </div>
            <div
              className={`font-inter text-[14px] leading-5 tracking-[-0.1px] cursor-pointer transition-colors ${
                isActiveService("personal-carbon-account")
                  ? "text-white bg-brand-green font-medium rounded-[4px] px-3 py-1 w-[218px]"
                  : "text-[#999] hover:text-brand-green"
              }`}
              onClick={() =>
                navigate("/product-service/personal-carbon-account")
              }
            >
              {t("products.personal.account")}
            </div>
            <div
              className={`font-inter text-[14px] leading-5 tracking-[-0.1px] cursor-pointer transition-colors ${
                isActiveService("green-trade-platform")
                  ? "text-white bg-brand-green font-medium rounded-[4px] px-3 py-1 w-[218px]"
                  : "text-[#999] hover:text-brand-green"
              }`}
              onClick={() => navigate("/product-service/green-trade-platform")}
            >
              {t("products.green.trade.platform")}
            </div>
          </div>

          {/* Row 2 - Bottom positioned elements */}
          <div className="absolute top-[282px] left-[32px] flex items-center gap-1">
            <span className="text-brand-green font-inter text-[16px] font-semibold leading-6 tracking-[-0.16px]">
              {t("products.carbon.footprint")}
            </span>
            <ChevronRight className="w-5 h-5 text-brand-green -rotate-90" />
          </div>

          <div className="absolute top-[282px] left-[280px] flex items-center gap-1">
            <span className="text-brand-green font-inter text-[16px] font-semibold leading-6 tracking-[-0.16px]">
              {t("products.carbon.training")}
            </span>
            <ChevronRight className="w-5 h-5 text-brand-green -rotate-90" />
          </div>

          <div className="absolute top-[282px] left-[528px] flex items-center gap-1">
            <span className="text-brand-green font-inter text-[16px] font-semibold leading-6 tracking-[-0.16px] cursor-pointer hover:text-[#046B52] transition-colors">
              {t("products.zero.carbon.park")}
            </span>
            <ChevronRight className="w-5 h-5 text-brand-green -rotate-90" />
          </div>

          {/* Content under 碳足迹 */}
          <div className="absolute top-[316px] left-[32px] w-[210px]">
            <div
              className={`font-inter text-[14px] leading-5 tracking-[-0.1px] cursor-pointer transition-colors ${
                isActiveService("carbon-footprint-accounting")
                  ? "text-white bg-brand-green font-medium rounded-[4px] px-3 py-1 w-[218px]"
                  : "text-[#999] hover:text-brand-green"
              }`}
              onClick={() =>
                navigate("/product-service/carbon-footprint-accounting")
              }
            >
              {t("products.carbon.accounting")}
            </div>
          </div>

          {/* Content under 碳培训 */}
          <div className="absolute top-[316px] left-[280px] w-[210px] space-y-3">
            <div
              className={`font-inter text-[14px] leading-5 tracking-[-0.1px] cursor-pointer transition-colors ${
                isActiveService("carbon-trader-training")
                  ? "text-white bg-brand-green font-medium rounded-[4px] px-3 py-1 w-[218px]"
                  : "text-[#999] hover:text-brand-green"
              }`}
              onClick={() =>
                navigate("/product-service/carbon-trader-training")
              }
            >
              {t("products.trader.training")}
            </div>
            <div
              className={`font-inter text-[14px] leading-5 tracking-[-0.1px] cursor-pointer transition-colors ${
                isActiveService("carbon-admin-training")
                  ? "text-white bg-brand-green font-medium rounded-[4px] px-3 py-1 w-[218px]"
                  : "text-[#999] hover:text-brand-green"
              }`}
              onClick={() => navigate("/product-service/carbon-admin-training")}
            >
              {t("products.manager.training")}
            </div>
            <div
              className={`font-inter text-[14px] leading-5 tracking-[-0.1px] cursor-pointer transition-colors ${
                isActiveService("industry-seminars-forums")
                  ? "text-white bg-brand-green font-medium rounded-[4px] px-3 py-1 w-[218px]"
                  : "text-[#999] hover:text-brand-green"
              }`}
              onClick={() =>
                navigate("/product-service/industry-seminars-forums")
              }
            >
              {t("products.industry.seminar")}
            </div>
            <div
              className={`font-inter text-[14px] leading-5 tracking-[-0.1px] cursor-pointer transition-colors ${
                isActiveService("custom-training")
                  ? "text-white bg-brand-green font-medium rounded-[4px] px-3 py-1 w-[218px]"
                  : "text-[#999] hover:text-brand-green"
              }`}
              onClick={() => navigate("/product-service/custom-training")}
            >
              {t("products.custom.training")}
            </div>
            <div
              className={`font-inter text-[14px] leading-5 tracking-[-0.1px] cursor-pointer transition-colors ${
                isActiveService("advanced-carbon-training")
                  ? "text-white bg-brand-green font-medium rounded-[4px] px-3 py-1 w-[218px]"
                  : "text-[#999] hover:text-brand-green"
              }`}
              onClick={() =>
                navigate("/product-service/advanced-carbon-training")
              }
            >
              {t("products.advanced.training")}
            </div>
          </div>

          {/* Content under 零碳园区 */}
          <div className="absolute top-[316px] left-[528px] w-[210px] space-y-3">
            <div
              className={`font-inter text-[14px] leading-5 tracking-[-0.1px] cursor-pointer transition-colors ${isActivePath("/zero-carbon-park") ? "text-white bg-brand-green font-medium rounded-[4px] px-3 py-1 w-[218px]" : "text-[#999] hover:text-brand-green"}`}
              onClick={() => navigate("/zero-carbon-park")}
            >
              {t("products.zero.carbon.solutions")}
            </div>
            <div
              className={`font-inter text-[14px] leading-5 tracking-[-0.1px] cursor-pointer transition-colors ${isActivePath("/zero-carbon-factory") ? "text-white bg-brand-green font-medium rounded-[4px] px-3 py-1 w-[218px]" : "text-[#999] hover:text-brand-green"}`}
              onClick={() => navigate("/zero-carbon-factory")}
            >
              {t("products.zero.carbon.factory")}
            </div>
            <div className="text-[#999] font-inter text-[14px] leading-5 tracking-[-0.1px]">
              {t("products.low.carbon.solutions")}
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
                    企业碳管理一站式解决方案
                  </span>
                  <ChevronRight className="w-5 h-5 text-brand-green -rotate-90" />
                </div>
                <p className="text-[#999] font-inter text-sm leading-5 tracking-[-0.1px]">
                  为企业提供全方位的碳管理服务，包括碳盘查、碳核算、碳交易等一站式解决方案
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
                  为园区提供零碳转型整体解决方案，包括能源管理、碳监测、减排技术等
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
                  碳足迹核算与管理解决方案，助力企业实现低碳发展
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
  isActive = false,
}: DropdownComponentProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleNavigation = (category: string) => {
    navigate(`/news-center?category=${encodeURIComponent(category)}`);
  };

  const handleTitleClick = () => {
    navigate("/news-center");
  };

  return (
    <Dropdown
      title={t("nav.news")}
      isScrolled={isScrolled}
      isActive={isActive}
      onTitleClick={handleTitleClick}
    >
      <div className="flex h-[266px] shadow-[0px_13px_11.7px_rgba(0,0,0,0.11)]">
        {/* Left Sidebar */}
        <div className="w-[340px] h-[266px] bg-[#EBF8F6] flex flex-col justify-center px-[30px]">
          <h3 className="text-[#333] font-inter text-[18px] font-bold leading-[20px] tracking-[-0.1px] mb-4">
            {t("news.sidebar.title")}
          </h3>
          <p className="text-[#666] font-inter text-[14px] font-normal leading-normal tracking-[-0.1px] mb-6 w-[163px]">
            {t("news.sidebar.description")}
          </p>
          <button className="flex items-center gap-2 text-[#058A65] font-inter text-[15px] font-normal leading-6 tracking-[-0.1px]">
            {t("common.more.content")}
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
              {t("news.policy")}
            </span>
            <ChevronRight className="w-5 h-5 text-[#058A65] -rotate-90" />
          </div>

          <div
            className="absolute left-[262px] top-[30px] flex items-center gap-1 cursor-pointer"
            onClick={() => handleNavigation("本所动态")}
          >
            <span className="text-[#058A65] font-inter text-[16px] font-medium leading-6 tracking-[-0.16px] hover:text-[#046B52] transition-colors">
              {t("news.dynamics")}
            </span>
            <ChevronRight className="w-5 h-5 text-[#058A65] -rotate-90" />
          </div>

          <div
            className="absolute left-[492px] top-[30px] flex items-center gap-1 cursor-pointer"
            onClick={() => handleNavigation("通知公告")}
          >
            <span className="text-[#058A65] font-inter text-[16px] font-medium leading-6 tracking-[-0.16px] hover:text-[#046B52] transition-colors">
              {t("news.announcement")}
            </span>
            <ChevronRight className="w-5 h-5 text-[#058A65] -rotate-90" />
          </div>

          {/* First Row Descriptions */}
          <div className="absolute left-[32px] top-[64px] w-[180px]">
            <div className="text-[#999] font-inter text-[14px] font-normal leading-5 tracking-[-0.1px]">
              {t("news.policy.interpretation.desc")}
            </div>
          </div>

          <div className="absolute left-[262px] top-[64px] w-[180px]">
            <div className="text-[#999] font-inter text-[14px] font-normal leading-5 tracking-[-0.1px]">
              {t("news.institute.news.desc")}
            </div>
          </div>

          <div className="absolute left-[492px] top-[64px] w-[180px]">
            <div className="text-[#999] font-inter text-[14px] font-normal leading-5 tracking-[-0.1px]">
              {t("news.announcements.desc")}
            </div>
          </div>

          {/* Second Row */}
          <div
            className="absolute left-[32px] top-[144px] flex items-center gap-1 cursor-pointer"
            onClick={() => handleNavigation("新闻资讯")}
          >
            <span className="text-[#058A65] font-inter text-[16px] font-medium leading-6 tracking-[-0.16px] hover:text-[#046B52] transition-colors">
              {t("news.general")}
            </span>
            <ChevronRight className="w-5 h-5 text-[#058A65] -rotate-90" />
          </div>

          <div
            className="absolute left-[262px] top-[144px] flex items-center gap-1 cursor-pointer"
            onClick={() => handleNavigation("知识专栏")}
          >
            <span className="text-[#058A65] font-inter text-[16px] font-medium leading-6 tracking-[-0.16px] hover:text-[#046B52] transition-colors">
              {t("news.knowledge")}
            </span>
            <ChevronRight className="w-5 h-5 text-[#058A65] -rotate-90" />
          </div>

          {/* Second Row Descriptions */}
          <div className="absolute left-[32px] top-[178px] w-[180px]">
            <div className="text-[#999] font-inter text-[14px] font-normal leading-5 tracking-[-0.1px]">
              {t("news.news.information.desc")}
            </div>
          </div>

          <div className="absolute left-[262px] top-[178px] w-[180px]">
            <div className="text-[#999] font-inter text-[14px] font-normal leading-5 tracking-[-0.1px]">
              {t("news.knowledge.column.desc")}
            </div>
          </div>

          {/* News Image Area */}
          <div className="absolute right-[32px] top-[48px] w-[280px] h-[170px]">
            <img
              src="/news-featured-image.jpg"
              alt="资讯中心"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
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
    <Dropdown title="关于我们" isScrolled={isScrolled}>
      <div className="p-8 h-[300px]">
        <div className="grid grid-cols-3 gap-8">
          <div>
            <h4 className="text-brand-green font-inter text-base font-semibold mb-4">
              公司介绍
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
              成功案例
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
