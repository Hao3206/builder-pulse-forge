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
                alt={t("footer.logo.alt")}
                className="w-[120px] h-[38px] lg:w-[157px] lg:h-[50px]"
              />

              <div className="flex flex-col gap-4">
                <div className="text-white/80 font-inter text-sm lg:text-base font-normal leading-5 lg:leading-6 tracking-[-0.16px]">
                  {t("common.phone")}
                  <br />
                  {t("footer.address.info")}
                </div>

                {/* Mobile: Hide QR code and subscription text on small screens */}
                <div className="hidden sm:flex flex-col gap-4">
                  {/* QR Code */}
                  <img 
                    src="/qrcode.jpg" 
                    alt="关注订阅号" 
                    className="w-[70px] h-[70px] lg:w-[88px] lg:h-[88px] object-cover rounded-lg" 
                  />
                  <div className="text-white/80 font-inter text-sm lg:text-base font-normal leading-5 lg:leading-6 tracking-[-0.16px]">
                    {t("footer.follow.subscription")}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Sections - Mobile: 2x2 grid, Desktop: horizontal */}
            <div className="grid grid-cols-2 lg:flex lg:flex-row gap-6 lg:gap-16 w-full lg:w-auto">
              {/* Products & Services */}
              <div className="flex flex-col gap-4 lg:gap-6">
                <div className="flex justify-start lg:justify-center items-center gap-1 rounded-[5px]">
                  <div className="text-[#F9F9F9] font-inter text-sm lg:text-base font-bold leading-5 lg:leading-6 tracking-[-0.16px] text-center lg:text-center">
                    {t("nav.products")}
                  </div>
                </div>
                <div className="flex flex-col gap-2 lg:gap-3">
                  <div className="flex justify-start lg:justify-center items-center gap-1 rounded-[5px]">
                    <div className="text-white/70 font-inter text-xs lg:text-base font-normal leading-4 lg:leading-6 tracking-[-0.16px] text-center lg:text-center">
                      {t("footer.product.carbon.footprint")}
                    </div>
                  </div>
                  <div className="flex justify-start lg:justify-center items-center gap-1 rounded-[5px]">
                    <div className="text-white/70 font-inter text-xs lg:text-base font-normal leading-4 lg:leading-6 tracking-[-0.16px] text-center lg:text-center">
                      {t("footer.cbam.accounting")}
                    </div>
                  </div>
                  <div className="flex justify-start lg:justify-center items-center gap-1 rounded-[5px]">
                    <div className="text-white/70 font-inter text-xs lg:text-base font-normal leading-4 lg:leading-6 tracking-[-0.16px] text-center lg:text-center">
                      {t("footer.esg.disclosure")}
                    </div>
                  </div>
                  <div className="flex justify-start lg:justify-center items-center gap-1 rounded-[5px]">
                    <div className="text-white/70 font-inter text-xs lg:text-base font-normal leading-4 lg:leading-6 tracking-[-0.16px] text-center lg:text-center">
                      {t("footer.local.carbon.trading")}
                    </div>
                  </div>
                  <div className="flex justify-start lg:justify-center items-center gap-1 rounded-[5px]">
                    <div className="text-white/70 font-inter text-xs lg:text-base font-normal leading-4 lg:leading-6 tracking-[-0.16px] text-center lg:text-center">
                      {t("footer.enterprise.carbon.management")}
                    </div>
                  </div>
                </div>
              </div>

              {/* Solutions */}
              <div className="flex flex-col gap-4 lg:gap-6">
                <div className="flex justify-start lg:justify-center items-center gap-1 rounded-[5px]">
                  <div className="text-[#F9F9F9] font-inter text-sm lg:text-base font-bold leading-5 lg:leading-6 tracking-[-0.16px] text-center lg:text-center">
                    {t("nav.solutions")}
                  </div>
                </div>
                <div className="flex flex-col gap-2 lg:gap-3">
                  <div className="flex justify-start lg:justify-center items-center gap-1 rounded-[5px]">
                    <div
                      className="text-white/70 font-inter text-xs lg:text-base font-normal leading-4 lg:leading-6 tracking-[-0.16px] cursor-pointer hover:text-white transition-colors text-center lg:text-center"
                      onClick={() => navigate("/solution")}
                    >
                      {t("footer.energy.carbon.management.solution")}
                    </div>
                  </div>
                  <div className="flex justify-start lg:justify-center items-center gap-1 rounded-[5px]">
                    <div
                      className="text-white/70 font-inter text-xs lg:text-base font-normal leading-4 lg:leading-6 tracking-[-0.16px] cursor-pointer hover:text-white transition-colors text-center lg:text-center"
                      onClick={() => navigate("/corporate-carbon-management")}
                    >
                      {t("footer.enterprise.carbon.management.solution")}
                    </div>
                  </div>
                  <div className="flex justify-start lg:justify-center items-center gap-1 rounded-[5px]">
                    <div
                      className="text-white/70 font-inter text-xs lg:text-base font-normal leading-4 lg:leading-6 tracking-[-0.16px] cursor-pointer hover:text-white transition-colors text-center lg:text-center"
                      onClick={() => navigate("/zero-carbon-park")}
                    >
                      {t("footer.zero.carbon.park.solution")}
                    </div>
                  </div>
                  <div className="flex justify-start lg:justify-center items-center gap-1 rounded-[5px]">
                    <div
                      className="text-white/70 font-inter text-xs lg:text-base font-normal leading-4 lg:leading-6 tracking-[-0.16px] cursor-pointer hover:text-white transition-colors text-center lg:text-center"
                      onClick={() => navigate("/zero-carbon-factory")}
                    >
                      {t("footer.zero.carbon.factory.solution")}
                    </div>
                  </div>
                  <div className="flex justify-start lg:justify-center items-center gap-1 rounded-[5px]">
                    <div className="text-white/70 font-inter text-xs lg:text-base font-normal leading-4 lg:leading-6 tracking-[-0.16px] text-center lg:text-center">
                      {t("footer.dual.carbon.detection.solution")}
                    </div>
                  </div>
                  <div className="flex justify-start lg:justify-center items-center gap-1 rounded-[5px]">
                    <div
                      className="text-white/70 font-inter text-xs lg:text-base font-normal leading-4 lg:leading-6 tracking-[-0.16px] cursor-pointer hover:text-white transition-colors text-center lg:text-center"
                      onClick={() => navigate("/carbon-footprint")}
                    >
                      {t("footer.carbon.accounting.solution")}
                    </div>
                  </div>
                </div>
              </div>

              {/* News Center */}
              <div className="flex flex-col gap-4 lg:gap-6">
                <div className="flex justify-start lg:justify-center items-center gap-1 rounded-[5px]">
                  <div className="text-[#F9F9F9] font-inter text-sm lg:text-base font-bold leading-5 lg:leading-6 tracking-[-0.16px] text-center lg:text-center">
                    {t("nav.news")}
                  </div>
                </div>
                <div className="flex flex-col gap-2 lg:gap-3">
                  <div className="flex justify-start lg:justify-center items-center gap-1 rounded-[5px]">
                    <div
                      className="text-white/70 font-inter text-xs lg:text-base font-normal leading-4 lg:leading-6 tracking-[-0.16px] cursor-pointer hover:text-white transition-colors text-center lg:text-center"
                      onClick={() => navigate("/news-center?category=政策解读")}
                    >
                      {t("footer.policy.interpretation")}
                    </div>
                  </div>
                  <div className="flex justify-start lg:justify-center items-center gap-1 rounded-[5px]">
                    <div
                      className="text-white/70 font-inter text-xs lg:text-base font-normal leading-4 lg:leading-6 tracking-[-0.16px] cursor-pointer hover:text-white transition-colors text-center lg:text-center"
                      onClick={() => navigate("/news-center?category=新闻资讯")}
                    >
                      {t("footer.news.information")}
                    </div>
                  </div>
                  <div className="flex justify-start lg:justify-center items-center gap-1 rounded-[5px]">
                    <div
                      className="text-white/70 font-inter text-xs lg:text-base font-normal leading-4 lg:leading-6 tracking-[-0.16px] cursor-pointer hover:text-white transition-colors text-center lg:text-center"
                      onClick={() => navigate("/news-center?category=本所动态")}
                    >
                      {t("footer.institute.news")}
                    </div>
                  </div>
                  <div className="flex justify-start lg:justify-center items-center gap-1 rounded-[5px]">
                    <div
                      className="text-white/70 font-inter text-xs lg:text-base font-normal leading-4 lg:leading-6 tracking-[-0.16px] cursor-pointer hover:text-white transition-colors text-center lg:text-center"
                      onClick={() => navigate("/news-center?category=通知公告")}
                    >
                      {t("footer.announcements")}
                    </div>
                  </div>
                </div>
              </div>

              {/* About Us */}
              <div className="flex flex-col gap-4 lg:gap-6">
                <div className="flex justify-start lg:justify-center items-center gap-1 rounded-[5px]">
                  <div className="text-[#F9F9F9] font-inter text-sm lg:text-base font-bold leading-5 lg:leading-6 tracking-[-0.16px] text-center lg:text-center">
                    {t("nav.about")}
                  </div>
                </div>
                <div className="flex flex-col gap-2 lg:gap-3">
                  <div className="flex justify-start lg:justify-center items-center gap-1 rounded-[5px]">
                    <div
                      className="text-white/70 font-inter text-xs lg:text-base font-normal leading-4 lg:leading-6 tracking-[-0.16px] cursor-pointer hover:text-white transition-colors text-center lg:text-center"
                      onClick={() => navigate("/success-cases")}
                    >
                      {t("footer.success.cases")}
                    </div>
                  </div>
                  <div className="flex justify-start lg:justify-center items-center gap-1 rounded-[5px]">
                    <div
                      className="text-white/70 font-inter text-xs lg:text-base font-normal leading-4 lg:leading-6 tracking-[-0.16px] cursor-pointer hover:text-white transition-colors text-center lg:text-center"
                      onClick={() => navigate("/about")}
                    >
                      {t("footer.institute.introduction")}
                    </div>
                  </div>
                  <div className="flex justify-start lg:justify-center items-center gap-1 rounded-[5px]">
                    <div className="text-white/70 font-inter text-xs lg:text-base font-normal leading-4 lg:leading-6 tracking-[-0.16px] text-center lg:text-center">
                      {t("footer.cooperation.platform")}
                    </div>
                  </div>
                  <div className="flex justify-start lg:justify-center items-center gap-1 rounded-[5px]">
                    <div
                      className="text-white/70 font-inter text-xs lg:text-base font-normal leading-4 lg:leading-6 tracking-[-0.16px] cursor-pointer hover:text-white transition-colors text-center lg:text-center"
                      onClick={() => navigate("/about")}
                    >
                      {t("footer.contact.us")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile: QR Code section for small screens */}
          <div className="sm:hidden flex items-center gap-4 pt-4 border-t border-white/20">
            <img 
              src="/qrcode.jpg" 
              alt="关注订阅号" 
              className="w-[60px] h-[60px] object-cover rounded-lg flex-shrink-0" 
            />
            <div className="text-white/80 font-inter text-sm font-normal leading-5">
              {t("footer.follow.subscription")}
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col gap-2 lg:gap-2.5 items-start lg:items-end pt-4 lg:pt-0 border-t lg:border-t-0 border-white/20">
            <div className="text-white font-inter text-xs lg:text-base font-normal leading-4 lg:leading-6 tracking-[-0.16px] w-full opacity-67">
              {t("footer.friendship.links")}
            </div>
            <div className="text-white font-inter text-xs lg:text-base font-normal leading-4 lg:leading-6 tracking-[-0.16px] w-full opacity-67">
              {t("footer.copyright")}
              <br className="sm:hidden" />
              <span className="hidden sm:inline"> </span>
              {t("footer.icp.record")}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
