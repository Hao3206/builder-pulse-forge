import { Phone, Search, ChevronDown, Globe } from "lucide-react";
import { ProductServicesDropdown, SolutionsDropdown } from "./DropdownMenus";
import NewsDropdown from "./NewsDropdown";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  isScrolled?: boolean;
}

export default function Header({ isScrolled = false }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="w-full">
      <div
        className={`flex w-full h-[88px] py-5 px-40 justify-center items-center gap-2.5 transition-all duration-300 ${
          isScrolled ? "border-b border-[#DCDCDC]" : "border-b border-white/21"
        }`}
      >
        <div className="flex items-center gap-[91px] px-8">
          {/* Logo */}
          <img
            src={
              isScrolled
                ? "https://api.builder.io/api/v1/image/assets/TEMP/1fee28a4f9031537e9b8b95943a60af33406ebb2?width=300"
                : "https://api.builder.io/api/v1/image/assets/TEMP/96232ba0ae227372c391ef7914f1eefa297895e9?width=314"
            }
            alt="浙东环交所 Logo"
            className="w-[150px] h-[48px] cursor-pointer"
            onClick={() => navigate("/")}
          />

          <div className="flex items-center gap-[160px]">
            {/* Navigation */}
            <nav className="flex items-center gap-8 whitespace-nowrap">
              <ProductServicesDropdown isScrolled={isScrolled} />
              <SolutionsDropdown isScrolled={isScrolled} />

              <div className="flex items-center justify-center gap-1.5 rounded-md">
                <span
                  className={`font-inter text-[15px] font-medium leading-[22px] transition-colors duration-300 ${
                    isScrolled ? "text-[#333]" : "text-white"
                  }`}
                >
                  成功案例
                </span>
              </div>

              <NewsDropdown isScrolled={isScrolled} />

              <div
                className="flex items-center justify-center gap-1.5 rounded-md cursor-pointer"
                onClick={() => navigate("/about")}
              >
                <span
                  className={`font-inter text-[15px] font-medium leading-[22px] transition-colors duration-300 ${
                    isScrolled ? "text-[#333]" : "text-white"
                  }`}
                >
                  关于我们
                </span>
              </div>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-start gap-[30px]">
              {/* Phone */}
              <div className="flex items-center gap-[7px]">
                <Phone
                  className={`w-5 h-5 transition-colors duration-300 ${
                    isScrolled ? "text-[#333]" : "text-white"
                  }`}
                />
                <span
                  className={`font-inter text-[15px] font-normal leading-[22px] transition-colors duration-300 ${
                    isScrolled ? "text-[#333]" : "text-white"
                  }`}
                >
                  0574-87310818
                </span>
              </div>

              {/* Language Selector */}
              <div className="flex items-center gap-2 px-0.5">
                <Globe
                  className={`w-5 h-5 transition-colors duration-300 ${
                    isScrolled ? "text-[#333]" : "text-white"
                  }`}
                />
                <ChevronDown
                  className={`w-3 h-3 transition-colors duration-300 ${
                    isScrolled ? "text-[#333]" : "text-white"
                  }`}
                />
              </div>

              {/* Search */}
              <Search
                className={`w-5 h-5 transition-colors duration-300 ${
                  isScrolled ? "text-[#333]" : "text-white"
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
