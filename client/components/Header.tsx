import { Phone, Search, ChevronDown, Globe } from "lucide-react";
import {
  ProductServicesDropdown,
  SolutionsDropdown,
  NewsDropdown,
  AboutDropdown,
} from "./DropdownMenus";

export default function Header() {
  return (
    <header className="relative w-full">
      <div className="flex w-full h-[90px] px-40 justify-center items-center border-b border-white/21">
        <div className="flex items-center gap-[91px] px-8">
          {/* Logo */}
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/96232ba0ae227372c391ef7914f1eefa297895e9?width=314"
            alt="万泽时代 Logo"
            className="w-[157px] h-[50px]"
          />

          <div className="flex items-center gap-40">
            {/* Navigation */}
            <nav className="flex items-center gap-8">
              <ProductServicesDropdown />
              <SolutionsDropdown />

              <div className="flex items-center justify-center gap-3 rounded-md">
                <span className="text-neutral-200 font-inter text-[15px] font-medium leading-[22px]">
                  成功案例
                </span>
              </div>

              <NewsDropdown />
              <AboutDropdown />
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-start gap-[30px]">
              {/* Phone */}
              <div className="flex items-center gap-[7px]">
                <Phone className="w-5 h-5 text-white" />
                <span className="text-white font-inter text-[15px] font-normal leading-[22px]">
                  0574-87310818
                </span>
              </div>

              {/* Language Selector */}
              <div className="flex items-center gap-2 px-0.5">
                <Globe className="w-5 h-5 text-white" />
                <ChevronDown className="w-3 h-3 text-white" />
              </div>

              {/* Search */}
              <Search className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
