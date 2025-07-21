import { useNavigate } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";

export default function Footer() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <footer className="bg-[#058A65] py-8 lg:py-16 px-4 sm:px-6 lg:px-28">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex flex-col gap-8 lg:gap-14">
          {/* Main Content */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-4">
            {/* Logo Section */}
            <div className="flex flex-col gap-4 w-full lg:w-[247px]">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/fa613bde97f40bc79e4c1d9f49052c56c7039e22?width=314"
                alt="万泽时代 Logo"
                className="w-[120px] h-[38px] lg:w-[157px] lg:h-[50px]"
              />

              <div className="flex flex-col gap-4">
                <div className="text-white/80 font-inter text-sm lg:text-base font-normal leading-5 lg:leading-6 tracking-[-0.16px]">
                  {t("common.phone")}
                  <br />
                  地址信息文字文字文字字文字字文
                </div>

                {/* Mobile: Hide QR code and subscription text on small screens */}
                <div className="hidden sm:flex flex-col gap-4">
                  {/* QR Code Placeholder */}
                  <div className="w-[70px] h-[70px] lg:w-[88px] lg:h-[88px] bg-white/80" />
                  <div className="text-white/80 font-inter text-sm lg:text-base font-normal leading-5 lg:leading-6 tracking-[-0.16px]">
                    关注订阅号
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Sections - Mobile: 2x2 grid, Desktop: horizontal */}
            <div className="grid grid-cols-2 lg:flex lg:flex-row gap-6 lg:gap-16 w-full lg:w-auto">
              {/* Products & Services */}
              <div className="flex flex-col gap-4 lg:gap-6">
                <div className="flex justify-start lg:justify-center items-center gap-1 rounded-[5px]">
                  <div className="text-[#F9F9F9] font-inter text-sm lg:text-base font-bold leading-5 lg:leading-6 tracking-[-0.16px]">
                    {t("nav.products")}
                  </div>
                </div>
                <div className="flex flex-col gap-2 lg:gap-3">
                  <div className="flex justify-start lg:justify-center items-center gap-1 rounded-[5px]">
                    <div className="text-white/70 font-inter text-xs lg:text-base font-normal leading-4 lg:leading-6 tracking-[-0.16px]">
                      产品碳足迹
                    </div>
                  </div>
                  <div className="flex justify-start lg:justify-center items-center gap-1 rounded-[5px]">
                    <div className="text-white/70 font-inter text-xs lg:text-base font-normal leading-4 lg:leading-6 tracking-[-0.16px]">
                      CBAM核算与申报
                    </div>
                  </div>
                  <div className="flex justify-start lg:justify-center items-center gap-1 rounded-[5px]">
                    <div className="text-white/70 font-inter text-xs lg:text-base font-normal leading-4 lg:leading-6 tracking-[-0.16px]">
                      ESG信息披露
                    </div>
                  </div>
                  <div className="flex justify-start lg:justify-center items-center gap-1 rounded-[5px]">
                    <div className="text-white/70 font-inter text-xs lg:text-base font-normal leading-4 lg:leading-6 tracking-[-0.16px]">
                      地方碳普惠交易
                    </div>
                  </div>
                  <div className="flex justify-start lg:justify-center items-center gap-1 rounded-[5px]">
                    <div className="text-white/70 font-inter text-xs lg:text-base font-normal leading-4 lg:leading-6 tracking-[-0.16px]">
                      企业碳资产管理
                    </div>
                  </div>
                </div>
              </div>

              {/* Solutions */}
              <div className="flex flex-col gap-4 lg:gap-6">
                <div className="flex justify-start lg:justify-center items-center gap-1 rounded-[5px]">
                  <div className="text-[#F9F9F9] font-inter text-sm lg:text-base font-bold leading-5 lg:leading-6 tracking-[-0.16px]">
                    {t("nav.solutions")}
                  </div>
                </div>
                <div className="flex flex-col gap-2 lg:gap-3">
                  <div className="flex justify-start lg:justify-center items-center gap-1 rounded-[5px]">
                    <div
                      className="text-white/70 font-inter text-xs lg:text-base font-normal leading-4 lg:leading-6 tracking-[-0.16px] cursor-pointer hover:text-white transition-colors"
                      onClick={() => navigate("/solution")}
                    >
                      能碳管理系统解决方案
                    </div>
                  </div>
                  <div className="flex justify-start lg:justify-center items-center gap-1 rounded-[5px]">
                    <div
                      className="text-white/70 font-inter text-xs lg:text-base font-normal leading-4 lg:leading-6 tracking-[-0.16px] cursor-pointer hover:text-white transition-colors"
                      onClick={() => navigate("/corporate-carbon-management")}
                    >
                      企业碳管理一站式解决方案
                    </div>
                  </div>
                  <div className="flex justify-start lg:justify-center items-center gap-1 rounded-[5px]">
                    <div
                      className="text-white/70 font-inter text-xs lg:text-base font-normal leading-4 lg:leading-6 tracking-[-0.16px] cursor-pointer hover:text-white transition-colors"
                      onClick={() => navigate("/zero-carbon-park")}
                    >
                      零碳园区解决方案
                    </div>
                  </div>
                  <div className="flex justify-start lg:justify-center items-center gap-1 rounded-[5px]">
                    <div className="text-white/70 font-inter text-xs lg:text-base font-normal leading-4 lg:leading-6 tracking-[-0.16px]">
                      双碳检测解决方案
                    </div>
                  </div>
                  <div className="flex justify-start lg:justify-center items-center gap-1 rounded-[5px]">
                    <div
                      className="text-white/70 font-inter text-xs lg:text-base font-normal leading-4 lg:leading-6 tracking-[-0.16px] cursor-pointer hover:text-white transition-colors"
                      onClick={() => navigate("/carbon-footprint")}
                    >
                      碳核算解决方案
                    </div>
                  </div>
                </div>
              </div>

              {/* News Center */}
              <div className="flex flex-col gap-4 lg:gap-6">
                <div className="flex justify-start lg:justify-center items-center gap-1 rounded-[5px]">
                  <div className="text-[#F9F9F9] font-inter text-sm lg:text-base font-bold leading-5 lg:leading-6 tracking-[-0.16px]">
                    {t("nav.news")}
                  </div>
                </div>
                <div className="flex flex-col gap-2 lg:gap-3">
                  <div className="flex justify-start lg:justify-center items-center gap-1 rounded-[5px]">
                    <div
                      className="text-white/70 font-inter text-xs lg:text-base font-normal leading-4 lg:leading-6 tracking-[-0.16px] cursor-pointer hover:text-white transition-colors"
                      onClick={() => navigate("/news-center?category=政策解读")}
                    >
                      政策解读
                    </div>
                  </div>
                  <div className="flex justify-start lg:justify-center items-center gap-1 rounded-[5px]">
                    <div
                      className="text-white/70 font-inter text-xs lg:text-base font-normal leading-4 lg:leading-6 tracking-[-0.16px] cursor-pointer hover:text-white transition-colors"
                      onClick={() => navigate("/news-center?category=新闻资讯")}
                    >
                      新闻资讯
                    </div>
                  </div>
                  <div className="flex justify-start lg:justify-center items-center gap-1 rounded-[5px]">
                    <div
                      className="text-white/70 font-inter text-xs lg:text-base font-normal leading-4 lg:leading-6 tracking-[-0.16px] cursor-pointer hover:text-white transition-colors"
                      onClick={() => navigate("/news-center?category=本所动态")}
                    >
                      本所动态
                    </div>
                  </div>
                  <div className="flex justify-start lg:justify-center items-center gap-1 rounded-[5px]">
                    <div
                      className="text-white/70 font-inter text-xs lg:text-base font-normal leading-4 lg:leading-6 tracking-[-0.16px] cursor-pointer hover:text-white transition-colors"
                      onClick={() => navigate("/news-center?category=通知公告")}
                    >
                      通知公告
                    </div>
                  </div>
                </div>
              </div>

              {/* About Us */}
              <div className="flex flex-col gap-4 lg:gap-6">
                <div className="flex justify-start lg:justify-center items-center gap-1 rounded-[5px]">
                  <div className="text-[#F9F9F9] font-inter text-sm lg:text-base font-bold leading-5 lg:leading-6 tracking-[-0.16px]">
                    {t("nav.about")}
                  </div>
                </div>
                <div className="flex flex-col gap-2 lg:gap-3">
                  <div className="flex justify-start lg:justify-center items-center gap-1 rounded-[5px]">
                    <div
                      className="text-white/70 font-inter text-xs lg:text-base font-normal leading-4 lg:leading-6 tracking-[-0.16px] cursor-pointer hover:text-white transition-colors"
                      onClick={() => navigate("/success-cases")}
                    >
                      成功案例
                    </div>
                  </div>
                  <div className="flex justify-start lg:justify-center items-center gap-1 rounded-[5px]">
                    <div
                      className="text-white/70 font-inter text-xs lg:text-base font-normal leading-4 lg:leading-6 tracking-[-0.16px] cursor-pointer hover:text-white transition-colors"
                      onClick={() => navigate("/about")}
                    >
                      本所介绍
                    </div>
                  </div>
                  <div className="flex justify-start lg:justify-center items-center gap-1 rounded-[5px]">
                    <div className="text-white/70 font-inter text-xs lg:text-base font-normal leading-4 lg:leading-6 tracking-[-0.16px]">
                      共建平台
                    </div>
                  </div>
                  <div className="flex justify-start lg:justify-center items-center gap-1 rounded-[5px]">
                    <div
                      className="text-white/70 font-inter text-xs lg:text-base font-normal leading-4 lg:leading-6 tracking-[-0.16px] cursor-pointer hover:text-white transition-colors"
                      onClick={() => navigate("/about")}
                    >
                      联系我们
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile: QR Code section for small screens */}
          <div className="sm:hidden flex items-center gap-4 pt-4 border-t border-white/20">
            <div className="w-[60px] h-[60px] bg-white/80 flex-shrink-0" />
            <div className="text-white/80 font-inter text-sm font-normal leading-5">
              关注订阅号
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col gap-2 lg:gap-2.5 items-start lg:items-end pt-4 lg:pt-0 border-t lg:border-t-0 border-white/20">
            <div className="text-white font-inter text-xs lg:text-base font-normal leading-4 lg:leading-6 tracking-[-0.16px] w-full opacity-67">
              友情链接： 生态环境部
            </div>
            <div className="text-white font-inter text-xs lg:text-base font-normal leading-4 lg:leading-6 tracking-[-0.16px] w-full opacity-67">
              © 2025 ningbozhedong. All Rights Reserved.
              <br className="sm:hidden" />
              <span className="hidden sm:inline"> </span>
              公安网备42010602001482号 ICP备13012389号-1
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
