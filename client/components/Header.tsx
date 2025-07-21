import { useState } from "react";
import { ProductServicesDropdown, NewsCenterDropdown } from "./DropdownMenus";
import { SolutionsDropdown } from "./SolutionsDropdownFixed";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  isScrolled?: boolean;
}

export default function Header({ isScrolled = false }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const [searchOpen, setSearchOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Helper function to check if current path matches navigation item
  const isActivePath = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/news-center?search=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleLanguageChange = (lang: "zh" | "en") => {
    setLanguage(lang);
    setLanguageOpen(false);
  };

  return (
    <>
      <header
        className={`w-full fixed top-0 left-0 z-40 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-sm" : "bg-transparent"
        }`}
      >
        {/* Desktop Header */}
        <div
          className={`hidden lg:flex w-full h-[88px] py-[20px] px-[160px] justify-center items-center gap-[10px] transition-all duration-300 ${
            isScrolled
              ? "border-b border-[#DCDCDC] bg-white"
              : "border-b border-white/20"
          }`}
        >
          <div className="flex px-[32px] items-center gap-[91px] relative">
            {/* Logo - 按照Figma尺寸：157px x 50px */}
            <img
              src={
                isScrolled
                  ? "https://api.builder.io/api/v1/image/assets/TEMP/1fee28a4f9031537e9b8b95943a60af33406ebb2?width=300"
                  : "https://api.builder.io/api/v1/image/assets/TEMP/96232ba0ae227372c391ef7914f1eefa297895e9?width=314"
              }
              alt="浙东环交所 Logo"
              className="w-[157px] h-[50px] cursor-pointer relative"
              onClick={() => navigate("/")}
            />

            <div className="flex items-center gap-[160px] relative">
              {/* Navigation - 按照Figma间距：gap-32px */}
              <nav className="flex items-center gap-[32px] relative">
                <ProductServicesDropdown
                  isScrolled={isScrolled}
                  isActive={
                    isActivePath("/product-service") ||
                    isActivePath("/solution") ||
                    isActivePath("/zero-carbon-park") ||
                    isActivePath("/corporate-carbon-management") ||
                    isActivePath("/carbon-footprint")
                  }
                />

                <SolutionsDropdown
                  isScrolled={isScrolled}
                  isActive={isActivePath("/solution")}
                />

                <span
                  className={`font-inter text-[15px] font-medium leading-[22px] cursor-pointer transition-colors duration-300 whitespace-nowrap ${
                    isActivePath("/success-cases")
                      ? "text-[#058A65]"
                      : isScrolled
                        ? "text-[#333]"
                        : "text-white"
                  }`}
                  onClick={() => navigate("/success-cases")}
                >
                  {t("nav.cases")}
                </span>

                <NewsCenterDropdown
                  isScrolled={isScrolled}
                  isActive={isActivePath("/news-center")}
                />

                <span
                  className={`font-inter text-[15px] font-medium leading-[22px] cursor-pointer transition-colors duration-300 whitespace-nowrap ${
                    isActivePath("/about")
                      ? "text-[#058A65]"
                      : isScrolled
                        ? "text-[#333]"
                        : "text-white"
                  }`}
                  onClick={() => navigate("/about")}
                >
                  {t("nav.about")}
                </span>
              </nav>

              {/* Right Side Actions - 按照Figma间距：gap-30px */}
              <div className="flex justify-end items-start gap-[30px] relative">
                {/* Phone - 按照Figma尺寸：139px x 22px */}
                <div className="w-[139px] h-[22px] relative">
                  <span
                    className={`absolute left-[27px] top-0 w-[112px] h-[22px] font-inter text-[15px] font-normal leading-[22px] transition-colors duration-300 ${
                      isScrolled ? "text-[#333]" : "text-white"
                    }`}
                  >
                    {t("common.phone")}
                  </span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 absolute left-0 top-[1px]"
                  >
                    <g clipPath="url(#clip0_77_830)">
                      <path
                        d="M3.01595 0.954743L2.99173 0.974743C2.9827 0.98057 2.97376 0.986534 2.96491 0.992633L2.90491 1.03683C2.84715 1.08302 2.7969 1.13789 2.75595 1.19947L2.74384 1.22L1.13228 2.83263C-0.829833 4.79474 1.42964 9.37209 6.0428 13.9832L6.37333 14.31C10.8375 18.6658 15.1959 20.7511 17.1191 18.9016L18.8275 17.1932C19.7986 16.2689 19.8375 14.7142 18.9023 13.7316L18.7033 13.5316L18.6486 13.4826L16.0965 11.4537C15.1175 10.7095 13.7081 10.8079 12.8307 11.7116L12.1181 12.4247L12.0496 12.3816C10.3021 11.2671 8.8196 9.78381 7.70595 8.03578L7.647 7.94158L8.32439 7.18L8.3128 7.19158C8.7633 6.75441 9.03128 6.16269 9.06273 5.53574C9.09418 4.90878 8.88676 4.29322 8.48228 3.81316L6.54228 1.37316C6.12816 0.852931 5.52545 0.517156 4.86515 0.438808C4.20485 0.36046 3.54031 0.545869 3.01595 0.954743ZM5.55384 2.16L7.56228 4.68631C7.86964 5.10947 7.877 5.66209 7.60386 6.07894L7.56386 6.13422L6.08911 7.79316L6.31964 8.18842C7.66539 10.4986 9.58677 12.4207 11.8965 13.7674L12.317 14.0127L13.7307 12.5979L13.8002 12.5316C14.0186 12.3368 14.2998 12.2273 14.5924 12.223C14.885 12.2187 15.1694 12.3201 15.3933 12.5084L17.8328 14.4479L17.9875 14.6021C18.2056 14.8314 18.3237 15.1379 18.3158 15.4543C18.3079 15.7706 18.1747 16.0709 17.9454 16.289L16.2349 17.9995C15.0275 19.1605 11.0349 17.189 6.93542 13.09L6.767 12.9205C2.75544 8.85525 0.835421 4.91631 2.02648 3.72631L3.8212 1.92947L3.7928 1.95052C4.05469 1.74638 4.38655 1.65381 4.71629 1.69294C5.04603 1.73206 5.34701 1.89971 5.55386 2.15947L5.55384 2.16Z"
                        fill={isScrolled ? "#333333" : "white"}
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_77_830">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>

                {/* Language Selector - 按照Figma设计 */}
                <div className="relative">
                  <div
                    className="flex w-[42px] px-[2px] items-center gap-[8px] relative cursor-pointer"
                    onClick={() => setLanguageOpen(!languageOpen)}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 relative"
                    >
                      <circle
                        cx="10"
                        cy="10"
                        r="8"
                        fill={isScrolled ? "#333" : "white"}
                      />
                      <text
                        x="10"
                        y="14"
                        textAnchor="middle"
                        fontSize="8"
                        fill={isScrolled ? "white" : "#333"}
                      >
                        文
                      </text>
                    </svg>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3 h-3 relative"
                    >
                      <path
                        d="M6 8L2 4h8L6 8z"
                        fill={isScrolled ? "#333" : "white"}
                      />
                    </svg>
                  </div>

                  {/* Language Dropdown */}
                  {languageOpen && (
                    <div className="absolute top-full right-0 mt-2 w-28 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <button
                        className={`w-full px-4 py-2 text-left hover:bg-gray-100 text-sm transition-colors ${
                          language === "zh" ? "bg-gray-100 font-medium" : ""
                        }`}
                        onClick={() => handleLanguageChange("zh")}
                      >
                        {t("common.language.zh")}
                      </button>
                      <button
                        className={`w-full px-4 py-2 text-left hover:bg-gray-100 text-sm transition-colors ${
                          language === "en" ? "bg-gray-100 font-medium" : ""
                        }`}
                        onClick={() => handleLanguageChange("en")}
                      >
                        {t("common.language.en")}
                      </button>
                    </div>
                  )}
                </div>

                {/* Search - 按照Figma设计 */}
                <div className="relative">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 cursor-pointer relative"
                    onClick={() => setSearchOpen(!searchOpen)}
                  >
                    <g clipPath="url(#clip0_77_837)">
                      <path
                        d="M3.47964 13.8605C2.79752 13.1819 2.25676 12.3747 1.88864 11.4856C1.52052 10.5966 1.33234 9.64342 1.33501 8.6812C1.33501 6.72507 2.09649 4.88628 3.47964 3.50313C4.15816 2.82116 4.96515 2.28049 5.85395 1.91237C6.74274 1.54425 7.6957 1.356 8.65771 1.3585C10.6151 1.3585 12.4526 2.11998 13.837 3.50313C14.519 4.18165 15.0597 4.98864 15.4278 5.87744C15.7959 6.76623 15.9842 7.71919 15.9817 8.6812C15.9843 9.64342 15.7962 10.5966 15.428 11.4856C15.0599 12.3747 14.5192 13.1819 13.837 13.8605C13.1585 14.5428 12.3513 15.0836 11.4622 15.4517C10.5732 15.8198 9.61995 16.008 8.65771 16.0052C6.70158 16.0052 4.86279 15.2437 3.47964 13.8605ZM19.7816 18.8638L15.2252 14.3074C16.6841 12.6094 17.428 10.4118 17.3004 8.17672C17.1728 5.94161 16.1837 3.843 14.541 2.322C12.8983 0.800994 10.7299 -0.0239545 8.49155 0.0205483C6.25325 0.0650511 4.11936 0.975539 2.5384 2.56064C1.32735 3.77088 0.502469 5.31313 0.16811 6.99228C-0.166248 8.67142 0.00493942 10.412 0.660017 11.9938C1.31509 13.5757 2.42463 14.9277 3.84825 15.8788C5.27186 16.8299 6.9456 17.3374 8.65771 17.3371C10.7227 17.3371 12.7191 16.596 14.2839 15.2487L18.8403 19.8051C18.9652 19.9299 19.1344 20 19.311 20C19.4875 20 19.6568 19.9299 19.7816 19.8051C19.9064 19.6803 19.9765 19.511 19.9765 19.3345C19.9765 19.1579 19.9064 18.9887 19.7816 18.8638Z"
                        fill={isScrolled ? "#333333" : "white"}
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_77_837">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Header */}
        <div
          className={`lg:hidden flex w-full h-[70px] py-[10px] px-[20px] justify-between items-center transition-all duration-300 ${
            isScrolled
              ? "border-b border-[#DCDCDC] bg-white"
              : "border-b border-white/20"
          }`}
        >
          {/* Mobile Logo */}
          <img
            src={
              isScrolled
                ? "https://api.builder.io/api/v1/image/assets/TEMP/1fee28a4f9031537e9b8b95943a60af33406ebb2?width=300"
                : "https://api.builder.io/api/v1/image/assets/TEMP/96232ba0ae227372c391ef7914f1eefa297895e9?width=314"
            }
            alt="浙东环交所 Logo"
            className="h-[40px] w-auto cursor-pointer"
            onClick={() => navigate("/")}
          />

          {/* Mobile Actions */}
          <div className="flex items-center gap-4">
            {/* Mobile Search */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 cursor-pointer"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <g clipPath="url(#clip0_77_962)">
                <path
                  d="M3.47964 13.8605C2.79752 13.1819 2.25676 12.3747 1.88864 11.4856C1.52052 10.5966 1.33234 9.64342 1.33501 8.6812C1.33501 6.72507 2.09649 4.88628 3.47964 3.50313C4.15816 2.82116 4.96515 2.28049 5.85395 1.91237C6.74274 1.54425 7.6957 1.356 8.65771 1.3585C10.6151 1.3585 12.4526 2.11998 13.837 3.50313C14.519 4.18165 15.0597 4.98864 15.4278 5.87744C15.7959 6.76623 15.9842 7.71919 15.9817 8.6812C15.9843 9.64342 15.7962 10.5966 15.428 11.4856C15.0599 12.3747 14.5192 13.1819 13.837 13.8605C13.1585 14.5428 12.3513 15.0836 11.4622 15.4517C10.5732 15.8198 9.61995 16.008 8.65771 16.0052C6.70158 16.0052 4.86279 15.2437 3.47964 13.8605ZM19.7816 18.8638L15.2252 14.3074C16.6841 12.6094 17.428 10.4118 17.3004 8.17672C17.1728 5.94161 16.1837 3.843 14.541 2.322C12.8983 0.800994 10.7299 -0.0239545 8.49155 0.0205483C6.25325 0.0650511 4.11936 0.975539 2.5384 2.56064C1.32735 3.77088 0.502469 5.31313 0.16811 6.99228C-0.166248 8.67142 0.00493942 10.412 0.660017 11.9938C1.31509 13.5757 2.42463 14.9277 3.84825 15.8788C5.27186 16.8299 6.9456 17.3374 8.65771 17.3371C10.7227 17.3371 12.7191 16.596 14.2839 15.2487L18.8403 19.8051C18.9652 19.9299 19.1344 20 19.311 20C19.4875 20 19.6568 19.9299 19.7816 19.8051C19.9064 19.6803 19.9765 19.511 19.9765 19.3345C19.9765 19.1579 19.9064 18.9887 19.7816 18.8638Z"
                  fill={isScrolled ? "#333333" : "white"}
                />
              </g>
              <defs>
                <clipPath id="clip0_77_962">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>

            {/* Mobile Language Selector */}
            <div className="relative">
              <div
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => setLanguageOpen(!languageOpen)}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                >
                  <circle
                    cx="10"
                    cy="10"
                    r="8"
                    fill={isScrolled ? "#333" : "white"}
                  />
                  <text
                    x="10"
                    y="14"
                    textAnchor="middle"
                    fontSize="8"
                    fill={isScrolled ? "white" : "#333"}
                  >
                    文
                  </text>
                </svg>
              </div>
              {languageOpen && (
                <div className="absolute top-full right-0 mt-2 w-28 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <button
                    className={`w-full px-4 py-2 text-left hover:bg-gray-100 text-sm transition-colors ${
                      language === "zh" ? "bg-gray-100 font-medium" : ""
                    }`}
                    onClick={() => handleLanguageChange("zh")}
                  >
                    {t("common.language.zh")}
                  </button>
                  <button
                    className={`w-full px-4 py-2 text-left hover:bg-gray-100 text-sm transition-colors ${
                      language === "en" ? "bg-gray-100 font-medium" : ""
                    }`}
                    onClick={() => handleLanguageChange("en")}
                  >
                    {t("common.language.en")}
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="p-1"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X
                  className={`w-6 h-6 ${isScrolled ? "text-[#333]" : "text-white"}`}
                />
              ) : (
                <Menu
                  className={`w-6 h-6 ${isScrolled ? "text-[#333]" : "text-white"}`}
                />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-[70px] left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-40">
            <div className="flex flex-col py-4">
              {/* Mobile Navigation Items */}
              <div className="flex flex-col space-y-2 px-6">
                <button
                  className={`text-left py-3 px-4 rounded-lg transition-colors ${
                    isActivePath("/product-service") ||
                    isActivePath("/solution") ||
                    isActivePath("/zero-carbon-park") ||
                    isActivePath("/corporate-carbon-management") ||
                    isActivePath("/carbon-footprint")
                      ? "text-[#058A65] bg-green-50"
                      : "text-[#333] hover:bg-gray-50"
                  }`}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    // Could navigate to products overview page
                  }}
                >
                  {t("nav.products")}
                </button>

                <button
                  className={`text-left py-3 px-4 rounded-lg transition-colors ${
                    isActivePath("/solution")
                      ? "text-[#058A65] bg-green-50"
                      : "text-[#333] hover:bg-gray-50"
                  }`}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    // Could navigate to solutions page
                  }}
                >
                  {t("nav.solutions")}
                </button>

                <button
                  className={`text-left py-3 px-4 rounded-lg transition-colors ${
                    isActivePath("/success-cases")
                      ? "text-[#058A65] bg-green-50"
                      : "text-[#333] hover:bg-gray-50"
                  }`}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate("/success-cases");
                  }}
                >
                  {t("nav.cases")}
                </button>

                <button
                  className={`text-left py-3 px-4 rounded-lg transition-colors ${
                    isActivePath("/news-center")
                      ? "text-[#058A65] bg-green-50"
                      : "text-[#333] hover:bg-gray-50"
                  }`}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate("/news-center");
                  }}
                >
                  {t("nav.news")}
                </button>

                <button
                  className={`text-left py-3 px-4 rounded-lg transition-colors ${
                    isActivePath("/about")
                      ? "text-[#058A65] bg-green-50"
                      : "text-[#333] hover:bg-gray-50"
                  }`}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate("/about");
                  }}
                >
                  {t("nav.about")}
                </button>
              </div>

              {/* Mobile Contact */}
              <div className="px-6 py-4 border-t border-gray-100 mt-4">
                <div className="flex items-center gap-3 text-[#333]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                  >
                    <g clipPath="url(#clip0_77_955)">
                      <path
                        d="M3.01595 0.954743L2.99173 0.974743C2.9827 0.98057 2.97376 0.986534 2.96491 0.992633L2.90491 1.03683C2.84715 1.08302 2.7969 1.13789 2.75595 1.19947L2.74384 1.22L1.13228 2.83263C-0.829833 4.79474 1.42964 9.37209 6.0428 13.9832L6.37333 14.31C10.8375 18.6658 15.1959 20.7511 17.1191 18.9016L18.8275 17.1932C19.7986 16.2689 19.8375 14.7142 18.9023 13.7316L18.7033 13.5316L18.6486 13.4826L16.0965 11.4537C15.1175 10.7095 13.7081 10.8079 12.8307 11.7116L12.1181 12.4247L12.0496 12.3816C10.3021 11.2671 8.8196 9.78381 7.70595 8.03578L7.647 7.94158L8.32439 7.18L8.3128 7.19158C8.7633 6.75441 9.03128 6.16269 9.06273 5.53574C9.09418 4.90878 8.88676 4.29322 8.48228 3.81316L6.54228 1.37316C6.12816 0.852931 5.52545 0.517156 4.86515 0.438808C4.20485 0.36046 3.54031 0.545869 3.01595 0.954743ZM5.55384 2.16L7.56228 4.68631C7.86964 5.10947 7.877 5.66209 7.60386 6.07894L7.56386 6.13422L6.08911 7.79316L6.31964 8.18842C7.66539 10.4986 9.58677 12.4207 11.8965 13.7674L12.317 14.0127L13.7307 12.5979L13.8002 12.5316C14.0186 12.3368 14.2998 12.2273 14.5924 12.223C14.885 12.2187 15.1694 12.3201 15.3933 12.5084L17.8328 14.4479L17.9875 14.6021C18.2056 14.8314 18.3237 15.1379 18.3158 15.4543C18.3079 15.7706 18.1747 16.0709 17.9454 16.289L16.2349 17.9995C15.0275 19.1605 11.0349 17.189 6.93542 13.09L6.767 12.9205C2.75544 8.85525 0.835421 4.91631 2.02648 3.72631L3.8212 1.92947L3.7928 1.95052C4.05469 1.74638 4.38655 1.65381 4.71629 1.69294C5.04603 1.73206 5.34701 1.89971 5.55386 2.15947L5.55384 2.16Z"
                        fill="#333333"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_77_955">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span className="font-inter text-[15px] font-normal">
                    {t("common.phone")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <form onSubmit={handleSearch}>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t("search.placeholder")}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#058A65] focus:border-transparent outline-none"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#058A65] text-white rounded-lg hover:bg-[#046B52] transition-colors"
                >
                  {t("search.button")}
                </button>
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {t("search.cancel")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Overlay for dropdowns */}
      {(languageOpen || searchOpen || mobileMenuOpen) && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => {
            setLanguageOpen(false);
            setSearchOpen(false);
            setMobileMenuOpen(false);
          }}
        />
      )}
    </>
  );
}
