import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function CarbonFootprint() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Sticky Header */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-lg" : "bg-transparent"
        }`}
      >
        <Header isScrolled={isScrolled} />
      </div>

      {/* Hero Section */}
      <section className="relative">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#155B75] to-[#088AB2] h-[374px]"></div>

        {/* Background Image Overlay */}
        <div
          className="absolute inset-0 h-[374px] bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://api.builder.io/api/v1/image/assets/TEMP/9026b87008e8884034ad247a59bfca58d7b09cc8?width=2880')",
            backgroundBlendMode: "multiply",
          }}
        ></div>

        <div className="relative z-10 flex flex-col items-center justify-center px-8 py-20">
          <div className="max-w-2xl text-center">
            <h1 className="text-[52px] font-bold leading-[60px] text-white mb-6 tracking-[-0.52px]">
              碳核算与碳足迹专题
            </h1>
            <p className="text-lg text-white/90">推动低碳发展 · 共建绿色未来</p>
          </div>
        </div>
      </section>

      {/* Basic Knowledge Section */}
      <section className="py-22 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">
              基础知识
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              基础知识���述性文案描述性文案描述性文案描述性文案描述性文案
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
            {/* Carbon Footprint Definition */}
            <div className="flex flex-col">
              <div className="flex items-center justify-center w-12 h-12 bg-[#058A65] rounded-full mb-5">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24.0912 4C24.8624 4.00085 25.6018 4.30758 26.1471 4.8529C26.6924 5.39823 26.9992 6.1376 27 6.9088V15.2768C27 15.9376 26.6992 16.2976 26.0992 16.3568L25.9104 16.3664C25.184 16.3664 24.8208 16.0032 24.8208 15.2768L24.8192 13.3968V6.9088C24.8188 6.716 24.7419 6.53124 24.6054 6.39506C24.4689 6.25888 24.284 6.1824 24.0912 6.1824H5.9088C5.71628 6.18282 5.53176 6.25949 5.39562 6.39562C5.25949 6.53176 5.18282 6.71628 5.1824 6.9088V25.0912C5.1824 25.4912 5.5072 25.8176 5.9088 25.8176H12.4848V25.8192H16.4816C17.1408 25.8192 17.5024 26.12 17.5616 26.7216L17.5712 26.9104C17.5712 27.6368 17.208 28 16.4816 28H5.9088C5.1376 27.9992 4.39823 27.6924 3.8529 27.1471C3.30758 26.6018 3.00085 25.8624 3 25.0912V6.9088C3.00085 6.1376 3.30758 5.39823 3.8529 4.8529C4.39823 4.30758 5.1376 4.00085 5.9088 4H24.0912Z"
                    fill="white"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                碳足迹定义
              </h3>
              <p className="text-gray-600 leading-relaxed">
                碳足迹是指个人、组织或产品在特定时间段内直接或间接产生的温室气体排放总量，以二氧化碳当量(CO₂e)������。
              </p>
            </div>

            {/* Emission Scope Classification */}
            <div className="flex flex-col">
              <div className="flex items-center justify-center w-12 h-12 bg-[#058A65] rounded-full mb-5">
                <svg
                  width="33"
                  height="32"
                  viewBox="0 0 33 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.80033 5.33301H13.1337C13.6995 5.33301 14.2421 5.55777 14.6422 5.95785C15.0422 6.35792 15.267 6.90055 15.267 7.46634V12.7997C15.267 13.3655 15.0422 13.9081 14.6422 14.3082C14.2421 14.7082 13.6995 14.933 13.1337 14.933H7.80033C7.23453 14.933 6.69191 14.7082 6.29183 14.3082C5.89175 13.9081 5.66699 13.3655 5.66699 12.7997V7.46634C5.66699 6.90055 5.89175 6.35792 6.29183 5.95785C6.69191 5.55777 7.23453 5.33301 7.80033 5.33301Z"
                    fill="white"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                排放范围分类
              </h3>
              <p className="text-gray-600 leading-relaxed">
                范围一：直接排放；范围二：电力相关间接排放；范围三：其他间接排放
              </p>
            </div>

            {/* Calculation Method */}
            <div className="flex flex-col">
              <div className="flex items-center justify-center w-12 h-12 bg-[#058A65] rounded-full mb-5">
                <svg
                  width="33"
                  height="32"
                  viewBox="0 0 33 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24.4415 27.725H8.8665C7.4415 27.725 6.2915 26.575 6.2915 25.15V6.825C6.2915 5.4 7.4415 4.25 8.8665 4.25H24.4415C25.8665 4.25 27.0165 5.4 27.0165 6.825V25.15C27.0165 26.575 25.8665 27.725 24.4415 27.725Z"
                    fill="white"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                计算方法
              </h3>
              <p className="text-gray-600 leading-relaxed">
                碳排放量 = 活动数据 × 排放因子 ×
                GWP值，通过这一公式将各种温室气体排放量统一转换为二氧化碳当量。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Policies and Regulations Section */}
      <section className="py-22 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col lg:flex-row items-start gap-20">
            <div className="lg:w-1/2 max-w-2xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">
                政策法��
              </h2>
              <p className="text-gray-600 mb-12 text-base leading-relaxed">
                政策法规文案描��文案描述文案描述文案描述文案描述
              </p>

              <div className="space-y-0">
                {/* National Policy - Active */}
                <div className="bg-[#F7F8FA] rounded-xl p-6 relative">
                  <div className="absolute left-0 top-4 bottom-4 w-2 bg-[#058A65] rounded-full"></div>
                  <div className="pl-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-semibold text-gray-900">
                        国家政策
                      </h3>
                      <div className="w-6 h-6">
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                        >
                          <path
                            d="M11 21L11 1M11 1L5 7M11 1L17 7"
                            stroke="#058A65"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed font-medium">
                      《关于建立碳足迹管理体系的实施方案》提出到2027年初步建立碳足迹管理体系，到2030年体系更加完善。
                    </p>
                  </div>
                </div>

                {/* Local Policy */}
                <div className="bg-white px-6 py-5 flex items-center justify-between border-l-4 border-[#DCE4E3]">
                  <div className="flex items-center gap-6">
                    <div className="w-2 h-12 bg-[#DCE4E3] rounded-full"></div>
                    <h3 className="text-2xl font-semibold text-gray-900">
                      地方政策
                    </h3>
                  </div>
                  <div className="w-6 h-6">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <path
                        d="M7 10L11 14L15 10"
                        stroke="#ccc"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* International Policy */}
                <div className="bg-white px-6 py-5 flex items-center justify-between border-l-4 border-[#DCE4E3]">
                  <div className="flex items-center gap-6">
                    <div className="w-2 h-12 bg-[#DCE4E3] rounded-full"></div>
                    <h3 className="text-2xl font-semibold text-gray-900">
                      ��际政策
                    </h3>
                  </div>
                  <div className="w-6 h-6">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <path
                        d="M7 10L11 14L15 10"
                        stroke="#ccc"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 flex justify-center">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/7ca461c02e9998d60d4dfe570f20ad648479e9b6?width=976"
                alt="Policy illustration"
                className="w-full max-w-lg h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Application Scenarios Section */}
      <section className="py-22 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">应用场景</h2>
            <p className="text-gray-600">
              应用场景描述性文案描述性文案描述性文案描述性文案描述性文案
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Manufacturing Application */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="h-56 bg-gray-100">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/097ecb1743757d06d193729868f220c6028a2aa9?width=768"
                  alt="制造业应用"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  制造业应用
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  通过产品碳足迹核算优化生产工艺，降低碳排放，提升产品国际竞争力。
                </p>
              </div>
            </div>

            {/* Construction Industry Application */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="h-56 bg-gray-100">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/b78d212a80bbcda33f31d68008388ef94f6c464a?width=768"
                  alt="建筑行业应用"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  建筑行业应用
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  建筑全生命周期碳足迹评估，推动绿色建筑设计和低碳施工。
                </p>
              </div>
            </div>

            {/* Transportation Application */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="h-56 bg-gray-100">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/3e8886d20b85a92ac5005e42070b86fed5971a54?width=768"
                  alt="交通领域应用"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  交通领域应用
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  交通运输碳足迹计算，优化物流路线和运输方式，降低运输环节碳排放。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-22 bg-[#F2F9F7]">
        <div className="max-w-3xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">联系我们</h2>
            <p className="text-gray-600">
              联系我们描述性文案描述性文案描述性文案描述性文案描述性文案
            </p>
          </div>

          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <input
                  type="text"
                  placeholder="您的姓名"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#058A65] focus:border-transparent"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="您的联系方式"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#058A65] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <input
                type="text"
                placeholder="您的公司"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#058A65] focus:border-transparent"
              />
            </div>

            <div>
              <textarea
                placeholder="您的留言内容"
                rows={4}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#058A65] focus:border-transparent resize-none"
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="px-6 py-3 bg-[#058A65] text-white font-semibold rounded-full hover:bg-[#047556] transition-colors duration-200"
              >
                立即咨询
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
