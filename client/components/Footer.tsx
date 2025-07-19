import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="bg-[#058A65] py-16 px-28">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex flex-col gap-14">
          {/* Main Content */}
          <div className="flex justify-between items-start">
            {/* Logo Section */}
            <div className="flex flex-col gap-4 w-[247px]">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/fa613bde97f40bc79e4c1d9f49052c56c7039e22?width=314"
                alt="万���时代 Logo"
                className="w-[157px] h-[50px]"
              />

              <div className="flex flex-col gap-4">
                <div className="text-white/80 font-inter text-base font-normal leading-6 tracking-[-0.16px]">
                  8888-8888-888
                  <br />
                  地址信息文字文字文字字文字字文
                </div>

                {/* QR Code Placeholder */}
                <div className="w-[88px] h-[88px] bg-white/80" />

                <div className="text-white/80 font-inter text-base font-normal leading-6 tracking-[-0.16px]">
                  关注订阅号
                </div>
              </div>
            </div>

            {/* Products & Services */}
            <div className="flex flex-col gap-6">
              <div className="flex justify-center items-center gap-1 rounded-[5px]">
                <div className="text-[#F9F9F9] font-inter text-base font-bold leading-6 tracking-[-0.16px]">
                  产品服务
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex justify-center items-center gap-1 rounded-[5px]">
                  <div className="text-white/70 font-inter text-base font-normal leading-6 tracking-[-0.16px]">
                    产品碳足迹
                  </div>
                </div>
                <div className="flex justify-center items-center gap-1 rounded-[5px]">
                  <div className="text-white/70 font-inter text-base font-normal leading-6 tracking-[-0.16px]">
                    CBAM核算与申报
                  </div>
                </div>
                <div className="flex justify-center items-center gap-1 rounded-[5px]">
                  <div className="text-white/70 font-inter text-base font-normal leading-6 tracking-[-0.16px]">
                    ESG信息披露
                  </div>
                </div>
                <div className="flex justify-center items-center gap-1 rounded-[5px]">
                  <div className="text-white/70 font-inter text-base font-normal leading-6 tracking-[-0.16px]">
                    地方碳普惠交易
                  </div>
                </div>
                <div className="flex justify-center items-center gap-1 rounded-[5px]">
                  <div className="text-white/70 font-inter text-base font-normal leading-6 tracking-[-0.16px]">
                    企业碳资产管理
                  </div>
                </div>
              </div>
            </div>

            {/* Solutions */}
            <div className="flex flex-col gap-6">
              <div className="flex justify-center items-center gap-1 rounded-[5px]">
                <div className="text-[#F9F9F9] font-inter text-base font-bold leading-6 tracking-[-0.16px]">
                  解决方案
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex justify-center items-center gap-1 rounded-[5px]">
                  <div
                    className="text-white/70 font-inter text-base font-normal leading-6 tracking-[-0.16px] cursor-pointer hover:text-white transition-colors"
                    onClick={() => navigate("/solution")}
                  >
                    能碳管理系统解决方案
                  </div>
                </div>
                <div className="flex justify-center items-center gap-1 rounded-[5px]">
                  <div
                    className="text-white/70 font-inter text-base font-normal leading-6 tracking-[-0.16px] cursor-pointer hover:text-white transition-colors"
                    onClick={() => navigate("/corporate-carbon-management")}
                  >
                    企业碳管理一站式解决方案
                  </div>
                </div>
                <div className="flex justify-center items-center gap-1 rounded-[5px]">
                  <div
                    className="text-white/70 font-inter text-base font-normal leading-6 tracking-[-0.16px] cursor-pointer hover:text-white transition-colors"
                    onClick={() => navigate("/zero-carbon-park")}
                  >
                    零碳园区解决方案
                  </div>
                </div>
                <div className="flex justify-center items-center gap-1 rounded-[5px]">
                  <div className="text-white/70 font-inter text-base font-normal leading-6 tracking-[-0.16px]">
                    双碳检测解决方案
                  </div>
                </div>
                <div className="flex justify-center items-center gap-1 rounded-[5px]">
                  <div
                    className="text-white/70 font-inter text-base font-normal leading-6 tracking-[-0.16px] cursor-pointer hover:text-white transition-colors"
                    onClick={() => navigate("/carbon-footprint")}
                  >
                    碳核算解决方案
                  </div>
                </div>
              </div>
            </div>

            {/* News Center */}
            <div className="flex flex-col gap-6">
              <div className="flex justify-center items-center gap-1 rounded-[5px]">
                <div className="text-[#F9F9F9] font-inter text-base font-bold leading-6 tracking-[-0.16px]">
                  资讯中心
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex justify-center items-center gap-1 rounded-[5px]">
                  <div className="text-white/70 font-inter text-base font-normal leading-6 tracking-[-0.16px]">
                    政策解读
                  </div>
                </div>
                <div className="flex justify-center items-center gap-1 rounded-[5px]">
                  <div className="text-white/70 font-inter text-base font-normal leading-6 tracking-[-0.16px]">
                    新闻资讯
                  </div>
                </div>
                <div className="flex justify-center items-center gap-1 rounded-[5px]">
                  <div className="text-white/70 font-inter text-base font-normal leading-6 tracking-[-0.16px]">
                    本所动态
                  </div>
                </div>
                <div className="flex justify-center items-center gap-1 rounded-[5px]">
                  <div className="text-white/70 font-inter text-base font-normal leading-6 tracking-[-0.16px]">
                    通知广告
                  </div>
                </div>
              </div>
            </div>

            {/* About Us */}
            <div className="flex flex-col gap-6">
              <div className="flex justify-center items-center gap-1 rounded-[5px]">
                <div className="text-[#F9F9F9] font-inter text-base font-bold leading-6 tracking-[-0.16px]">
                  关于我们
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex justify-center items-center gap-1 rounded-[5px]">
                  <div className="text-white/70 font-inter text-base font-normal leading-6 tracking-[-0.16px]">
                    成功案例
                  </div>
                </div>
                <div className="flex justify-center items-center gap-1 rounded-[5px]">
                  <div className="text-white/70 font-inter text-base font-normal leading-6 tracking-[-0.16px]">
                    本所介绍
                  </div>
                </div>
                <div className="flex justify-center items-center gap-1 rounded-[5px]">
                  <div className="text-white/70 font-inter text-base font-normal leading-6 tracking-[-0.16px]">
                    共��平台
                  </div>
                </div>
                <div className="flex justify-center items-center gap-1 rounded-[5px]">
                  <div className="text-white/70 font-inter text-base font-normal leading-6 tracking-[-0.16px]">
                    联系我们
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col gap-2.5 items-end">
            <div className="text-white font-inter text-base font-normal leading-6 tracking-[-0.16px] w-full opacity-67">
              友情链接： 生态环境部
            </div>
            <div className="text-white font-inter text-base font-normal leading-6 tracking-[-0.16px] w-full opacity-67">
              © 2025 ningbozhedong. All Rights Reserved.
              公安网备42010602001482号 ICP备13012389号-1
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
