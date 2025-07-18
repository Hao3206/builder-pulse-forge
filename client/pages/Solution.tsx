import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Solution() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white font-inter">
      {/* Header */}
      <Header isScrolled={isScrolled} />

      {/* Hero Section */}
      <section className="relative w-full min-h-[518px]">
        {/* Background */}
        <div className="absolute inset-0 bg-[#F0F8F6]">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#155B75] to-[#088AB2]" />
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat mix-blend-multiply"
            style={{
              backgroundImage:
                "url('https://api.builder.io/api/v1/image/assets/TEMP/d3c2a75c75d2b22cd54ba87fdf99348bf0398abd?width=2880')",
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col justify-center items-center px-[30px] py-20 min-h-[430px]">
          <div className="w-full max-w-[640px] flex flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-12 w-full">
              <div className="flex flex-col items-center gap-6 w-full">
                <h1 className="text-[#F9F9F9] text-center font-inter text-[52px] font-bold leading-[60px] tracking-[-0.52px] w-full">
                  打造零碳未来
                </h1>
                <p className="text-[#F9F9F9] text-center font-inter text-lg font-normal leading-[26px] tracking-[-0.1px] w-full">
                  构建绿色、智能、可持续的产业园区生态系统
                </p>
              </div>
              <div className="flex items-start gap-4">
                <button className="flex w-[120px] py-3 px-[18px] justify-center items-center gap-1.5 rounded-full bg-[#058A65] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.04)]">
                  <span className="text-white font-inter text-[15px] font-bold leading-[22px]">
                    了解详情
                  </span>
                </button>
                <button className="flex w-[120px] py-3 px-[18px] justify-center items-center gap-1.5 rounded-full bg-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.04)]">
                  <span className="text-[#058A65] font-inter text-[15px] font-bold leading-[22px]">
                    联系我们
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-[88px] px-[112px] flex flex-col justify-center items-center gap-16 bg-[rgba(5,138,101,0.06)]">
        <div className="flex max-w-[1280px] flex-col justify-center items-center gap-3 w-full">
          <div className="flex w-[800px] flex-col justify-center items-center gap-2">
            <div className="flex flex-col items-center gap-4 w-full">
              <h2 className="text-[#323539] text-center font-inter text-[32px] font-bold leading-10 tracking-[-0.48px] w-full">
                零碳园区建设理念
              </h2>
              <p className="text-[#858C95] text-center font-inter text-lg font-normal leading-[26px] tracking-[-0.18px] w-full">
                以创新技术为驱动，构建可持续发展的产业生态
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-start content-start gap-8 w-full flex-wrap max-w-[1216px]">
          {/* Feature 1 */}
          <div className="flex h-[300px] min-w-[320px] py-[34px] px-8 flex-col items-start gap-5 flex-1 rounded-xl bg-white">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/46e33197f9c96c898d50fb066b9ce8b72588c437?width=96"
              className="w-12 h-12 rounded-[10px]"
              alt="绿色低碳图标"
            />
            <div className="flex h-[164px] flex-col items-start gap-5 w-full">
              <h3 className="text-[#058A65] font-inter text-[26px] font-bold leading-[42px] tracking-[-0.26px] w-full">
                绿色低碳
              </h3>
              <p className="text-[#858C95] font-inter text-base font-normal leading-6 tracking-[-0.16px] w-full">
                以创新技术为驱动，构建可持续发展的产业生态
              </p>
              <div className="flex items-start gap-2.5 flex-wrap">
                <div className="flex py-1 px-[14px] justify-center items-center gap-2.5 rounded-md bg-[#F2F9F7]">
                  <span className="text-[#058461] font-inter text-sm font-normal leading-[26px] tracking-[-0.14px]">
                    光伏发电
                  </span>
                </div>
                <div className="flex py-1 px-[14px] justify-center items-center gap-2.5 rounded-md bg-[#F2F9F7]">
                  <span className="text-[#058461] font-inter text-sm font-normal leading-[26px] tracking-[-0.14px]">
                    储能系统
                  </span>
                </div>
                <div className="flex py-1 px-[14px] justify-center items-center gap-2.5 rounded-md bg-[#F2F9F7]">
                  <span className="text-[#058461] font-inter text-sm font-normal leading-[26px] tracking-[-0.14px]">
                    碳汇开发
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex h-[300px] min-w-[320px] py-[34px] px-8 flex-col items-start gap-5 flex-1 rounded-xl bg-white">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/9607aca296eceee88b082d337783c0d911d6abe3?width=96"
              className="w-12 h-12 rounded-lg"
              alt="智慧运营图标"
            />
            <div className="flex h-[164px] flex-col items-start gap-5 w-full">
              <h3 className="text-[#058A65] font-inter text-[26px] font-bold leading-[42px] tracking-[-0.26px] w-full">
                智慧运营
              </h3>
              <p className="text-[#858C95] font-inter text-base font-normal leading-6 tracking-[-0.16px] w-full">
                基于数字孪生技术，构建园区碳管理智慧大脑，实现精细化运营
              </p>
              <div className="flex items-start gap-2.5 flex-wrap">
                <div className="flex py-1 px-[14px] justify-center items-center gap-2.5 rounded-md bg-[#F2F9F7]">
                  <span className="text-[#058461] font-inter text-sm font-normal leading-[26px] tracking-[-0.14px]">
                    数字孪生
                  </span>
                </div>
                <div className="flex py-1 px-[14px] justify-center items-center gap-2.5 rounded-md bg-[#F2F9F7]">
                  <span className="text-[#058461] font-inter text-sm font-normal leading-[26px] tracking-[-0.14px]">
                    IoT监测
                  </span>
                </div>
                <div className="flex py-1 px-[14px] justify-center items-center gap-2.5 rounded-md bg-[#F2F9F7]">
                  <span className="text-[#058461] font-inter text-sm font-normal leading-[26px] tracking-[-0.14px]">
                    AI优化
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex h-[300px] min-w-[320px] py-[34px] px-8 flex-col items-start gap-5 flex-1 rounded-xl bg-white">
            <div className="flex w-12 h-12 p-2 justify-center items-center rounded-lg bg-[#058460]">
              <svg
                className="w-[30px] h-[30px]"
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.2118 23.845C10.1337 23.8509 9.05553 23.8538 7.9774 23.8596L5.95885 23.8684C5.4608 23.8714 4.96568 23.9065 4.51451 23.637C3.97838 23.3177 3.64147 22.6936 3.68834 22.0696C3.70885 21.7825 3.81725 21.5247 3.95787 21.2815L4.52916 20.2884C5.25279 19.0315 5.97643 17.7776 6.70299 16.5208L7.69615 14.7981C7.83678 14.555 7.99498 14.3147 8.12975 14.0657C8.26451 14.47 8.39635 14.8772 8.53111 15.2815C8.60729 15.5159 8.66881 15.7503 8.84459 15.9378C9.17272 16.2893 9.72936 16.304 10.0897 15.9905C10.3651 15.7503 10.4471 15.3665 10.3417 15.0237C10.2919 14.8684 10.2391 14.7132 10.1893 14.5579C9.98717 13.9456 9.78795 13.3333 9.5858 12.718C9.45982 12.3343 9.3485 11.9417 9.20494 11.5638C9.01744 11.0598 8.46666 10.8841 7.98912 11.0686C7.87486 11.1126 7.75475 11.1477 7.63756 11.1858C6.62975 11.511 5.61314 11.8216 4.61119 12.1643C4.20104 12.305 3.94908 12.6975 4.00768 13.1341C4.07213 13.6028 4.49693 13.9368 4.96861 13.8899C5.1942 13.8665 5.41979 13.7669 5.63072 13.6966C5.90025 13.6087 6.16979 13.5179 6.43639 13.43C5.9149 14.3352 5.39049 15.2434 4.869 16.1487C4.0985 17.4846 3.32799 18.8235 2.55455 20.1595C2.49889 20.2561 2.44029 20.3557 2.38463 20.4524C2.05064 21.0354 1.869 21.7005 1.91002 22.3743C1.99498 23.7688 2.95006 25.0403 4.28307 25.471C4.89537 25.6673 5.52232 25.638 6.15221 25.635C6.99303 25.6321 7.83385 25.6262 8.6776 25.6233L10.8954 25.6145C11.0624 25.6145 11.2411 25.6262 11.4051 25.594C12.0233 25.471 12.3016 24.7093 11.9354 24.2024C11.7626 23.9739 11.496 23.8509 11.2118 23.845ZM27.9872 21.3196C27.9286 21.0999 27.8495 20.886 27.7528 20.6809C27.6883 20.4495 27.536 20.2356 27.4188 20.0305C27.1962 19.6409 26.9735 19.2542 26.7479 18.8645C26.2147 17.9358 25.6815 17.01 25.1483 16.0813C25.0106 15.8411 24.8729 15.5979 24.7323 15.3606C24.4393 14.8596 23.7128 14.7102 23.2997 15.1643C23.0565 15.4339 22.9921 15.8352 23.1503 16.1634C23.1796 16.2249 23.2147 16.2805 23.2469 16.3391C23.4227 16.6438 23.5985 16.9485 23.7743 17.2561C24.3133 18.1936 24.8553 19.1341 25.3944 20.0716C25.579 20.3909 25.7606 20.7102 25.9452 21.0296C26.2001 21.4749 26.4139 21.9641 26.3085 22.4886C26.1503 23.2884 25.4413 23.8655 24.6297 23.8714H24.1317C23.2352 23.8684 22.3358 23.8655 21.4393 23.8655L18.1053 23.8567C17.4637 23.8538 16.8192 23.8538 16.1776 23.8509C16.4588 23.5374 16.743 23.2268 17.0243 22.9134C17.162 22.761 17.3407 22.6028 17.4344 22.4153C17.6424 22.0052 17.496 21.4807 17.0946 21.2493C16.7372 21.0442 16.2831 21.1262 16.0018 21.4221C15.9081 21.5218 15.8143 21.6272 15.7235 21.7298C15.3016 22.1956 14.8827 22.6614 14.4608 23.1243C14.1649 23.4495 13.8661 23.7747 13.576 24.1028C13.286 24.4309 13.2391 24.929 13.5145 25.2835C13.6288 25.43 13.8046 25.5237 13.9452 25.6497C14.7303 26.3587 15.5008 27.0882 16.3006 27.7825C16.6083 28.0491 17.0506 28.1282 17.3993 27.885C17.7889 27.6126 17.9061 27.0647 17.6424 26.6663C17.5194 26.4788 17.3172 26.3323 17.1503 26.1829L16.535 25.6292C16.9247 25.6292 17.3143 25.6321 17.704 25.6321L20.8358 25.6409C21.8055 25.6438 22.7782 25.6468 23.7479 25.6468C24.4276 25.6497 25.119 25.6907 25.7753 25.468C27.4657 24.8938 28.4325 23.0364 27.9872 21.3196ZM15.1991 3.75613C15.7294 3.81766 16.1805 4.13406 16.453 4.58816C16.6053 4.84598 16.7547 5.10672 16.9042 5.36453C17.6512 6.65652 18.4012 7.94559 19.1483 9.23758C19.5057 9.85574 19.8661 10.4768 20.2235 11.095C20.3788 11.3645 20.5253 11.6516 20.6893 11.9182C20.2645 11.8274 19.8368 11.7395 19.412 11.6487C19.1893 11.6018 18.952 11.5286 18.7235 11.5638C18.2489 11.6399 17.9296 12.097 17.9881 12.5686C18.035 12.9524 18.3221 13.2395 18.6942 13.3216C18.8524 13.3567 19.0106 13.386 19.1688 13.4212C19.7987 13.553 20.4315 13.6848 21.0614 13.8167C21.4569 13.8987 21.8553 13.972 22.2479 14.0628C22.7137 14.1741 23.1913 13.8489 23.3143 13.3919C23.3465 13.2747 23.3641 13.1516 23.3905 13.0315C23.6131 11.9739 23.8446 10.9163 24.0585 9.85574C24.1405 9.45145 23.9764 9.02664 23.5868 8.84793C23.162 8.65164 22.6258 8.7952 22.4061 9.22C22.3006 9.42508 22.2743 9.68875 22.2274 9.91141L22.0516 10.7376C21.5536 9.87332 21.0555 9.00906 20.5575 8.14773C19.787 6.8118 19.0165 5.47293 18.243 4.13699C17.9676 3.65652 17.6922 3.1907 17.2674 2.81863C16.2831 1.9573 14.8446 1.73465 13.6376 2.23855C13.0516 2.48465 12.5506 2.89187 12.1756 3.40457C12.0292 3.60672 11.9325 3.82937 11.8094 4.04617C11.4725 4.63504 11.1327 5.22098 10.7958 5.80984C10.3768 6.53934 9.95494 7.27176 9.536 8.00125C9.40709 8.22684 9.27525 8.45242 9.14635 8.67801C9.0233 8.89187 8.92369 9.10281 8.95299 9.36062C8.98522 9.6448 9.14049 9.8909 9.38365 10.0403C9.82018 10.2805 10.3534 10.1311 10.6024 9.7034C10.6756 9.57742 10.746 9.45437 10.8163 9.3284C11.1561 8.7366 11.4989 8.14187 11.8387 7.55008C12.2254 6.87625 12.6122 6.20242 13.0018 5.52859C13.1893 5.20047 13.4032 4.8782 13.5702 4.53836C13.8544 3.96121 14.5809 3.68289 15.1991 3.75613Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="flex h-[164px] flex-col items-start gap-5 w-full">
              <h3 className="text-[#058A65] font-inter text-[26px] font-bold leading-[42px] tracking-[-0.26px] w-full">
                循环经济
              </h3>
              <p className="text-[#858C95] font-inter text-base font-normal leading-6 tracking-[-0.16px] w-full">
                建立资源循环利用体系，推动产业协同和废物资源化利用
              </p>
              <div className="flex items-start gap-2.5 flex-wrap">
                <div className="flex py-1 px-[14px] justify-center items-center gap-2.5 rounded-md bg-[#F2F9F7]">
                  <span className="text-[#058461] font-inter text-sm font-normal leading-[26px] tracking-[-0.14px]">
                    废物利用
                  </span>
                </div>
                <div className="flex py-1 px-[14px] justify-center items-center gap-2.5 rounded-md bg-[#F2F9F7]">
                  <span className="text-[#058461] font-inter text-sm font-normal leading-[26px] tracking-[-0.14px]">
                    产业协同
                  </span>
                </div>
                <div className="flex py-1 px-[14px] justify-center items-center gap-2.5 rounded-md bg-[#F2F9F7]">
                  <span className="text-[#058461] font-inter text-sm font-normal leading-[26px] tracking-[-0.14px]">
                    资源共享
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Path Section */}
      <section className="w-full h-[550px] relative bg-[#058A65]">
        {/* Background SVG */}
        <svg
          className="w-full h-[550px] absolute left-0 top-0"
          width="1440"
          height="550"
          viewBox="0 0 1440 550"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0H360H697.514C700.073 0 702.535 0.981491 704.393 2.74235L713.121 11.015C716.978 14.6715 723.022 14.6714 726.879 11.015L735.607 2.74235C737.465 0.98149 739.927 0 742.486 0H1080H1440V550H0V0Z"
            fill="#058A65"
          />
        </svg>

        {/* Background Image Overlay */}
        <div className="w-full h-[550px] absolute left-0 top-0">
          <img
            className="w-[1477px] h-[831px] absolute left-[-7px] top-[-129px] mix-blend-multiply"
            src="https://api.builder.io/api/v1/image/assets/TEMP/1c55a1792c8dc15683c883fd3a952d1983361665?width=2954"
            alt="背景图"
          />
        </div>

        {/* Header */}
        <div className="flex w-[1216px] flex-col items-center gap-10 absolute left-[112px] top-[88px] h-[82px]">
          <div className="flex max-w-[1280px] flex-col justify-center items-center gap-3 w-full">
            <div className="flex w-[800px] flex-col justify-center items-center gap-2">
              <div className="flex flex-col items-center gap-4 w-full">
                <h2 className="text-white text-center font-inter text-[32px] font-bold leading-10 tracking-[-0.48px] w-full">
                  零碳园区建设路径
                </h2>
                <p className="text-white/80 text-center font-inter text-lg font-normal leading-[26px] tracking-[-0.18px] w-full">
                  科学规划、分步实施的全流程解决方案
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Process Steps */}
        <div className="absolute left-[112px] top-[270px] w-[1216px] flex justify-between items-center">
          {["碳盘查诊断", "减排规划", "技术实施", "监测优化", "认证验收"].map(
            (step, index) => (
              <div key={index} className="flex flex-col items-center gap-4">
                {/* Step Icon */}
                <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center">
                  <svg
                    className="w-8 h-8"
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.36996 14.8856L29.6173 2.82137C31.5231 1.7392 33.8674 1.78232 35.7322 2.93383L55.0328 14.8519C56.8029 15.9449 57.8804 17.8768 57.8804 19.957V43.0749C57.8804 45.0847 56.8741 46.9611 55.1999 48.073L35.8923 60.896C33.9499 62.1861 31.4358 62.2339 29.4457 61.0186L8.20537 48.0472C6.42096 46.9575 5.33252 45.0174 5.33252 42.9265V20.1032C5.33252 17.9442 6.49249 15.9517 8.36996 14.8856Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M13.2346 34.1641H19.0251C19.3871 34.1641 19.7208 33.9685 19.8976 33.6527L22.873 28.3395C23.2778 27.6166 24.3359 27.6714 24.6638 28.4323L30.3048 41.5195C30.6812 42.3926 31.949 42.2972 32.1904 41.3775L37.0149 22.9986C37.264 22.0495 38.5887 21.9896 38.9225 22.9124L42.7536 33.5042C42.8968 33.9002 43.2728 34.1641 43.6939 34.1641H49.9762"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                {/* Step Title */}
                <div className="text-white text-center font-inter text-lg font-medium leading-[26px] tracking-[-0.18px]">
                  {step}
                </div>

                {/* Step Description */}
                <div className="w-[151px] text-white/70 text-center font-inter text-sm font-normal leading-[22px] tracking-[-0.14px]">
                  全面评估园区碳排放现状，识别减排潜力
                </div>

                {/* Arrow */}
                {index < 4 && (
                  <svg
                    className="absolute left-[200px] top-8"
                    width="180"
                    height="14"
                    viewBox="0 0 180 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 7H179"
                      stroke="white"
                      strokeLinecap="round"
                      strokeDasharray="2 2"
                    />
                    <path
                      d="M90 1L94.625 6.625L90 12.375"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M102.25 2.8125L106 6.625L102.25 10.625"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </div>
            ),
          )}
        </div>
      </section>

      {/* Core Capabilities Section */}
      <section className="w-full py-16 flex-col justify-center items-center gap-16 bg-white">
        <div className="w-[1216px] px-8 flex flex-col justify-center items-center gap-3 mx-auto">
          <div className="flex w-[800px] flex-col justify-center items-center gap-2">
            <div className="flex flex-col items-center gap-4 w-full">
              <h2 className="text-[#272D37] text-center font-inter text-[32px] font-bold leading-10 tracking-[-0.64px] w-full">
                我们的核心能力
              </h2>
              <p className="text-[#858C95] text-center font-inter text-base font-normal leading-6 tracking-[-0.1px] w-full">
                全方位支持园区低碳转型的专业服务
              </p>
            </div>
          </div>
        </div>

        <div className="w-[1216px] mx-auto mt-16 space-y-16">
          {/* Carbon Portrait & Diagnosis */}
          <div className="flex items-center gap-[118px]">
            <div className="flex w-[528px] h-[462px] justify-center items-center relative">
              <div className="w-[438px] h-[438px] bg-white rounded-full relative">
                <div className="w-[393px] h-[382px] absolute left-[25px] top-[34px]">
                  <div className="w-[382px] h-[382px] rounded-full bg-gradient-to-b from-[#E2F1EE]/80 to-transparent absolute left-0 top-0"></div>
                  <div className="w-[361px] h-[90px] rounded-full bg-[#E2F1EE]/50 absolute left-[26px] top-[259px]"></div>
                  <div className="w-[229px] h-[58px] fill-[#058A65]/10 border-2 border-white absolute left-[89px] top-[265px]"></div>

                  {/* Carbon gas visualization */}
                  <div className="absolute left-[31px] top-[51px] w-16 h-16">
                    <div className="w-[53px] h-[38px] fill-[#058A65] absolute left-2 top-[13px] rounded-full bg-[#058A65]"></div>
                    <span className="absolute left-[21px] top-[25px] text-white font-['ADLaM_Display'] text-base">
                      CO₂
                    </span>
                  </div>
                  <div className="absolute left-[104px] top-[21px] w-[53px] h-[38px] rounded-full bg-[#058A65]"></div>
                  <span className="absolute left-[117px] top-[32px] text-white font-['ADLaM_Display'] text-base">
                    CH₄
                  </span>
                  <div className="absolute left-[188px] top-[3px] w-[53px] h-[38px] rounded-full bg-[#058A65]"></div>
                  <span className="absolute left-[198px] top-[14px] text-white font-['ADLaM_Display'] text-base">
                    N₂O
                  </span>
                  <div className="absolute left-[265px] top-[35px] w-[53px] h-[38px] rounded-full bg-[#058A65]"></div>
                  <span className="absolute left-[279px] top-[45px] text-white font-['ADLaM_Display'] text-base">
                    NF₃
                  </span>
                  <div className="absolute left-[320px] top-[90px] w-[53px] h-[38px] rounded-full bg-[#058A65]"></div>
                  <span className="absolute left-[334px] top-[100px] text-white font-['ADLaM_Display'] text-base">
                    SF₆
                  </span>
                </div>
              </div>
            </div>
            <div className="flex w-[490px] flex-col items-start gap-10">
              <div className="flex w-[490px] flex-col items-start gap-2">
                <div className="flex flex-col items-start gap-4 w-full">
                  <h3 className="text-[#272D37] font-inter text-[32px] font-bold leading-[42px] tracking-[-0.32px] w-full">
                    碳画像与诊断
                  </h3>
                  <p className="w-[480px] text-[#666] font-inter text-base font-normal leading-6 tracking-[-0.1px]">
                    基于全生命周期评估方法，构建园区碳画像，精准识别减排重点领域和关键环节，为低碳转型提供科学依据。
                  </p>
                </div>
              </div>
              <button className="flex w-[120px] py-3 px-[18px] justify-center items-center gap-1.5 rounded-full bg-[#058A65] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.04)]">
                <span className="text-white font-inter text-[15px] font-bold leading-[22px]">
                  咨询详情
                </span>
              </button>
            </div>
          </div>

          {/* Digital Twin Platform */}
          <div className="flex items-center gap-20">
            <div className="flex w-[490px] flex-col items-start gap-10">
              <div className="flex w-[490px] flex-col items-start gap-2">
                <div className="flex flex-col items-start gap-4 w-full">
                  <h3 className="text-[#272D37] font-inter text-[32px] font-bold leading-[42px] tracking-[-0.32px] w-full">
                    数字孪生平台
                  </h3>
                  <p className="w-[480px] text-[#666] font-inter text-base font-normal leading-6 tracking-[-0.1px]">
                    构建园区数字孪生体，实现碳排放实时监测、预测预警和优化调控，提升碳管理精细化水平。
                  </p>
                </div>
              </div>
              <button className="flex w-[120px] py-3 px-[18px] justify-center items-center gap-1.5 rounded-full bg-[#058A65] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.04)]">
                <span className="text-white font-inter text-[15px] font-bold leading-[22px]">
                  了解方案
                </span>
              </button>
            </div>
            <div className="flex w-[528px] h-[462px] justify-center items-center">
              <div className="w-[438px] h-[438px] bg-white rounded-full relative">
                <div className="w-[387px] h-[382px] absolute left-[25px] top-[34px]">
                  <div className="w-[382px] h-[382px] rounded-full bg-[#F5FAF9] absolute left-0 top-0"></div>
                  <div className="w-[260px] h-[260px] rounded-full border-2 border-white bg-[#E2F1EE] absolute left-[58px] top-[55px]"></div>
                  <div className="w-[314px] h-[314px] rounded-full border border-[#058A65]/30 absolute left-[31px] top-[28px]"></div>

                  {/* Digital twin visualization */}
                  <div className="absolute left-[83px] top-[76px]">
                    <div className="w-[54px] h-[54px] rounded-full bg-[#058A65] absolute left-[207px] top-[-10px]"></div>
                    <div className="w-[54px] h-[54px] rounded-full bg-[#058A65] absolute left-[77px] top-[-73px]"></div>
                    <div className="w-[54px] h-[54px] rounded-full bg-[#058A65] absolute left-[-53px] top-[-5px]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Energy Operation Optimization */}
          <div className="flex items-center gap-[118px]">
            <div className="flex w-[528px] h-[462px] justify-center items-center">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/defff75d300cd64416ae24df91ed64864ab0feb5"
                alt="Energy Optimization Visualization"
                className="w-[438px] h-[438px]"
              />
            </div>
            <div className="flex w-[490px] flex-col items-start gap-10">
              <div className="flex w-[490px] flex-col items-start gap-2">
                <div className="flex flex-col items-start gap-4 w-full">
                  <h3 className="text-[#272D37] font-inter text-[32px] font-bold leading-[42px] tracking-[-0.32px] w-full">
                    能源运营优化
                  </h3>
                  <p className="w-[480px] text-[#666] font-inter text-base font-normal leading-6 tracking-[-0.1px]">
                    整合分布式能源、储能系统和柔性负荷，构建多能互补的智慧能源系统，降低能源成本与碳排放。
                  </p>
                </div>
              </div>
              <button className="flex w-[120px] py-3 px-[18px] justify-center items-center gap-1.5 rounded-full bg-[#058A65] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.04)]">
                <span className="text-white font-inter text-[15px] font-bold leading-[22px]">
                  获取方案
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="w-full py-16 px-[112px] flex flex-col justify-center items-center bg-[rgba(5,138,101,0.05)]">
        <div className="flex flex-col justify-center items-center gap-8 w-full">
          <div className="flex w-[752px] flex-col items-center gap-4">
            <h2 className="text-[#333] text-center font-inter text-[32px] font-bold leading-10 tracking-[-0.48px] w-full">
              联系我们
            </h2>
            <p className="text-[#666] text-center font-inter text-base font-normal leading-6 tracking-[-0.1px] w-full">
              欢迎预约系统演示，获取专属能碳管理解决方案
            </p>
          </div>
          <div className="flex w-[752px] justify-center items-start gap-4">
            <div className="flex flex-col items-start gap-2 flex-1">
              <div className="flex h-[46px] py-3 px-3 items-center gap-2 w-full rounded-md border border-[#E5E5E7] bg-white">
                <input
                  type="text"
                  placeholder="您的姓名"
                  className="flex-1 text-[#999] font-inter text-[15px] font-normal leading-[22px] bg-transparent border-none outline-none"
                />
              </div>
            </div>
            <div className="flex flex-col items-start gap-2 flex-1">
              <div className="flex h-[46px] py-3 px-3 items-center gap-2 w-full rounded-md border border-[#E5E5E7] bg-white">
                <input
                  type="text"
                  placeholder="您的联系方式"
                  className="flex-1 text-[#999] font-inter text-[15px] font-normal leading-[22px] bg-transparent border-none outline-none"
                />
              </div>
            </div>
            <button className="flex py-3 px-5 justify-center items-center gap-1.5 rounded-md bg-[#058A65] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.04)]">
              <span className="text-white font-inter text-[15px] font-bold leading-[22px]">
                提交信息
              </span>
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
