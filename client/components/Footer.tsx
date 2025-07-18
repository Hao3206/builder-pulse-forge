export default function Footer() {
  return (
    <>
      {/* Main Footer */}
      <footer className="bg-brand-green py-16 px-28">
        <div className="max-w-7xl mx-auto">
          {/* Footer Content */}
          <div className="flex justify-between items-start mb-14">
            {/* Logo and Contact Section */}
            <div className="flex flex-col gap-4 w-[247px]">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/fa613bde97f40bc79e4c1d9f49052c56c7039e22?width=314"
                alt="万泽时代 Logo"
                className="w-[157px] h-[50px]"
              />

              <div className="flex flex-col gap-4">
                <div className="text-white/80 font-inter text-base font-medium leading-6 tracking-[-0.16px]">
                  8888-8888-888
                  <br />
                  地址信息文字文字文字字文字字文
                </div>

                {/* QR Code Placeholder */}
                <div className="w-[88px] h-[88px] bg-white/80" />

                <div className="text-white/80 font-inter text-base font-medium leading-6 tracking-[-0.16px]">
                  关注订阅号
                </div>
              </div>
            </div>

            {/* Products & Services */}
            <div className="flex flex-col gap-6">
              <h3 className="text-neutral-200 font-inter text-base font-semibold leading-6 tracking-[-0.16px]">
                产品服务
              </h3>
              <div className="flex flex-col gap-3">
                <div className="text-white/70 font-inter text-base font-medium leading-6 tracking-[-0.16px]">
                  产品碳足迹
                </div>
                <div className="text-white/70 font-inter text-base font-medium leading-6 tracking-[-0.16px]">
                  CBAM核算与申报
                </div>
                <div className="text-white/70 font-inter text-base font-medium leading-6 tracking-[-0.16px]">
                  ESG信息披露
                </div>
                <div className="text-white/70 font-inter text-base font-medium leading-6 tracking-[-0.16px]">
                  地方碳普惠交易
                </div>
                <div className="text-white/70 font-inter text-base font-medium leading-6 tracking-[-0.16px]">
                  企业碳资产管理
                </div>
              </div>
            </div>

            {/* Solutions */}
            <div className="flex flex-col gap-6">
              <h3 className="text-neutral-200 font-inter text-base font-semibold leading-6 tracking-[-0.16px]">
                解决方案
              </h3>
              <div className="flex flex-col gap-3">
                <div className="text-white/70 font-inter text-base font-medium leading-6 tracking-[-0.16px]">
                  能碳管理系统解决方案
                </div>
                <div className="text-white/70 font-inter text-base font-medium leading-6 tracking-[-0.16px]">
                  零碳园区解决方案
                </div>
                <div className="text-white/70 font-inter text-base font-medium leading-6 tracking-[-0.16px]">
                  双碳检测解决方案
                </div>
                <div className="text-white/70 font-inter text-base font-medium leading-6 tracking-[-0.16px]">
                  碳核算解决方案
                </div>
              </div>
            </div>

            {/* News & Resources */}
            <div className="flex flex-col gap-6">
              <h3 className="text-neutral-200 font-inter text-base font-semibold leading-6 tracking-[-0.16px]">
                资讯中心
              </h3>
              <div className="flex flex-col gap-3">
                <div className="text-white/70 font-inter text-base font-medium leading-6 tracking-[-0.16px]">
                  政策解读
                </div>
                <div className="text-white/70 font-inter text-base font-medium leading-6 tracking-[-0.16px]">
                  新闻资讯
                </div>
                <div className="text-white/70 font-inter text-base font-medium leading-6 tracking-[-0.16px]">
                  本所动态
                </div>
                <div className="text-white/70 font-inter text-base font-medium leading-6 tracking-[-0.16px]">
                  通知广告
                </div>
              </div>
            </div>

            {/* About Us */}
            <div className="flex flex-col gap-6">
              <h3 className="text-neutral-200 font-inter text-base font-semibold leading-6 tracking-[-0.16px]">
                关于我们
              </h3>
              <div className="flex flex-col gap-3">
                <div className="text-white/70 font-inter text-base font-medium leading-6 tracking-[-0.16px]">
                  成功案例
                </div>
                <div className="text-white/70 font-inter text-base font-medium leading-6 tracking-[-0.16px]">
                  本所介绍
                </div>
                <div className="text-white/70 font-inter text-base font-medium leading-6 tracking-[-0.16px]">
                  共建平台
                </div>
                <div className="text-white/70 font-inter text-base font-medium leading-6 tracking-[-0.16px]">
                  联系我们
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="flex flex-col gap-2.5">
            {/* Divider */}
            <div className="w-full h-px bg-white/33" />

            {/* Links and Copyright */}
            <div className="flex flex-col gap-2.5 items-end">
              <div className="text-white/67 font-inter text-base font-medium leading-6 tracking-[-0.16px]">
                友情链接： 生态环境部
              </div>
              <div className="text-white/67 font-inter text-base font-medium leading-6 tracking-[-0.16px]">
                © 2025 ningbozhedong. All Rights Reserved.
                公安网备42010602001482号 ICP备13012389号-1
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
