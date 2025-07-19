import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function About() {
  const [currentHonor, setCurrentHonor] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const honors = [
    {
      id: 1,
      title: "国家级碳资产管理资质",
      image: "#D9D9D9",
    },
    {
      id: 2,
      title: "绿色工厂示范单位",
      image: "#D9D9D9",
    },
    {
      id: 3,
      title: "ISO 14001认证",
      image: "#D9D9D9",
    },
    {
      id: 4,
      title: "双碳标准编制单位",
      image: "#D9D9D9",
    },
  ];

  const nextHonor = () => {
    setCurrentHonor((prev) => (prev + 1) % honors.length);
  };

  const prevHonor = () => {
    setCurrentHonor((prev) => (prev - 1 + honors.length) % honors.length);
  };

  return (
    <div className="min-h-screen bg-white font-inter">
      {/* Sticky Header */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-lg" : "bg-transparent"
        }`}
      >
        <Header isScrolled={isScrolled} />
      </div>

      {/* Hero Section */}
      <section className="relative w-full bg-[#F8F9FB] pt-[88px]">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://api.builder.io/api/v1/image/assets/TEMP/2de65da77c5648ddbe85ded358b4e35acab603fb?width=2969')",
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center px-8 py-20 min-h-[500px]">
          <div className="max-w-4xl text-center">
            <h1 className="text-white font-inter text-[44px] font-bold leading-[60px] tracking-[-0.88px] mb-6">
              关于浙东环境能源交易所
            </h1>
            <p className="text-white/80 font-inter text-lg font-normal leading-[26px] tracking-[-0.1px] max-w-2xl mx-auto">
              推动全球双碳目标的实现，助力可持续发展的低碳未来
            </p>
          </div>
        </div>
      </section>

      {/* Company Introduction Section */}
      <section className="relative py-20 bg-[rgba(5,138,101,0.05)]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="border border-[#EBF8F6] p-6 rounded-lg bg-white/50">
                <h2 className="text-[#333] font-inter text-[32px] font-bold leading-10 tracking-[-0.64px] mb-4">
                  关于浙东环境能源交易所
                </h2>
                <p className="text-[#666] font-inter text-base font-normal leading-6 tracking-[-0.1px]">
                  宁波浙东环境能源交易所成立于2011年，是由宁波市人民政府批准、国务院部际联席会议备案的环境权益类交易机构。专注于节能减排、环境保护与能源领域的权益交易，致力于为电力、能源、化工等行业客户提供碳资产开发管理、双碳咨询与培训服务。
                </p>
              </div>

              {/* Mission and Vision */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="flex w-[60px] h-[60px] p-2 justify-center items-center rounded-full border border-[#EBF8F6] bg-[#058A65] mx-auto mb-4">
                    <svg
                      className="w-[30px] h-[30px]"
                      viewBox="0 0 30 30"
                      fill="none"
                    >
                      <path
                        d="M26.4204 12.7808C26.4204 13.3748 26.4048 13.7924 25.8096 13.7924C25.2144 13.7924 24.8184 13.3748 24.8184 12.7808V8.23403C24.8184 7.64123 24.8184 7.24643 23.826 7.04843C20.256 6.45563 17.2812 4.87403 14.9004 2.50163C12.5208 5.07203 9.546 6.65363 5.976 7.24763C5.382 7.24763 4.9848 7.64363 4.9848 8.23523V21.6848C4.9848 21.8816 5.3808 22.0724 5.58 22.2704C5.778 22.4684 6.1752 22.6664 7.1664 23.2592L14.9016 27.41L22.836 23.258C23.8272 22.8632 24.0264 22.6652 24.4224 22.4684C24.6216 22.2704 24.8184 22.2704 25.0176 21.8744C25.1292 21.6848 25.0176 21.2816 25.0176 20.096V18.9092C25.0176 18.3164 25.2168 18.0272 25.8108 18.0272C26.406 18.0272 26.5632 18.3164 26.5632 18.9092V21.8744C26.3652 22.4672 26.6304 22.5548 25.8372 23.2592C25.4412 23.6552 24.8196 24.0032 23.6292 24.6428L15.1008 29.1908H14.5056L6.1752 24.6428C4.9848 24.05 4.8768 23.852 4.2816 23.4572C3.8856 23.0612 3.4884 23.0612 3.2892 22.4684V7.15763C3.2892 6.56483 3.6852 5.97203 4.2816 5.97203C8.4468 5.77403 11.556 3.99443 14.1336 1.02923C14.5308 0.633229 15.126 0.633229 15.5232 0.831229L15.7212 1.02923C18.102 3.99443 22.0848 5.51003 25.4532 5.97203C25.8504 5.97203 26.4216 6.56483 26.4216 7.15763V12.7808H26.4204Z"
                        fill="#F2F6F5"
                      />
                      <path
                        d="M9.72721 17.6607C9.22321 17.6607 8.88721 17.2683 8.88721 16.6791V12.7551C8.88721 12.1671 9.22321 11.7735 9.72721 11.7735C10.2312 11.7735 10.5672 12.1659 10.5672 12.7551V16.6791C10.5672 17.2683 10.2312 17.6607 9.72721 17.6607ZM19.6632 17.6607C19.1592 17.6607 18.8232 17.2683 18.8232 16.6791V12.7551C18.8232 12.1671 19.1592 11.7735 19.6632 11.7735C20.1672 11.7735 20.5032 12.1659 20.5032 12.7551V16.6791C20.5032 17.2683 20.1672 17.6607 19.6632 17.6607ZM14.6952 19.6227C14.1912 19.6227 13.8552 19.2303 13.8552 18.6423V10.7931C13.8552 10.2039 14.1912 9.81152 14.6952 9.81152C15.1992 9.81152 15.5352 10.2039 15.5352 10.7931V18.6411C15.5352 19.2303 15.1992 19.6227 14.6952 19.6227Z"
                        fill="#F2F6F5"
                      />
                    </svg>
                  </div>
                  <h3 className="text-[#333] text-center font-inter text-2xl font-semibold leading-7 tracking-[-0.24px] mb-2">
                    使命
                  </h3>
                  <p className="text-[#666] font-inter text-base font-normal leading-6">
                    推动全球双碳目标的实现，为企业和政府提供专业的碳管理解决方案��
                  </p>
                </div>

                <div className="text-center">
                  <div className="flex w-[60px] h-[60px] p-2 justify-center items-center rounded-full border border-[#EBF8F6] bg-[#058A65] mx-auto mb-4">
                    <svg
                      className="w-[30px] h-[30px]"
                      viewBox="0 0 30 30"
                      fill="none"
                    >
                      <path
                        d="M15.0015 30C11.4249 30 8.7276 23.5513 8.7276 15C8.72884 6.44938 11.4249 0 15.0015 0C18.578 0 21.2741 6.44938 21.2741 15.0013C21.2741 23.5519 18.5774 30 15.0015 30ZM15.0015 1.48562C12.749 1.48562 10.2394 7.03562 10.2394 15.0013C10.2394 22.9638 12.7497 28.515 15.0015 28.515C17.2533 28.515 19.7623 22.9644 19.7623 15.0006C19.7623 7.03563 17.2533 1.48625 15.0015 1.48625V1.48562Z"
                        fill="white"
                      />
                      <path
                        d="M23.982 24.2806C20.7416 24.2806 16.2119 22.8081 11.8648 20.3413C8.43182 18.3931 5.49155 16.0525 3.58335 13.75C1.5192 11.2606 0.881681 9.04125 1.78638 7.5C2.26358 6.6875 3.38576 5.71875 6.02094 5.71875C9.26071 5.71875 13.7904 7.1925 18.1374 9.66C25.6702 13.9363 30.0029 19.4556 28.2153 22.5013C27.7381 23.3125 26.6171 24.2806 23.982 24.2806ZM6.02219 7.20563C4.52844 7.20563 3.4889 7.57375 3.09683 8.24312C2.54382 9.18438 3.16455 10.8913 4.7571 12.8119C6.55158 14.9769 9.34459 17.1944 12.6223 19.0544C16.7487 21.3969 20.9963 22.795 23.9826 22.795H23.9832C25.4769 22.795 26.5146 22.4269 26.9073 21.7581C28.0326 19.8406 24.3989 14.9281 17.3831 10.9469C13.2542 8.60375 9.0072 7.20563 6.02219 7.20563Z"
                        fill="white"
                      />
                      <path
                        d="M6.0222 24.2806C6.02158 24.2806 6.02158 24.2806 6.0222 24.2806C3.38702 24.2806 2.26546 23.3138 1.78702 22.5006C-1.16825e-05 19.4556 4.33273 13.9356 11.8655 9.65938C16.2131 7.19188 20.7422 5.71875 23.982 5.71875C26.6178 5.71875 27.74 6.68688 28.2165 7.5C30.0036 10.5438 25.6714 16.0644 18.1381 20.3406C13.7917 22.8075 9.26135 24.2806 6.0222 24.2806ZM23.9813 7.20563C20.9957 7.20563 16.7487 8.60437 12.6217 10.9469C5.60527 14.9294 1.97156 19.8406 3.09746 21.7588C3.48892 22.4275 4.52908 22.795 6.0222 22.795C9.00845 22.7963 13.2548 21.3963 17.3825 19.0544C24.3989 15.0731 28.0326 10.1613 26.9073 8.24375C26.5146 7.57375 25.4751 7.20625 23.9813 7.20625V7.20563Z"
                        fill="white"
                      />
                      <circle cx="15" cy="15" r="2.5" fill="white" />
                    </svg>
                  </div>
                  <h3 className="text-[#333] text-center font-inter text-2xl font-semibold leading-7 tracking-[-0.24px] mb-2">
                    愿景
                  </h3>
                  <p className="text-[#666] font-inter text-base font-normal leading-6 tracking-[-0.1px]">
                    成为国内领先、国际一流的环境能源交易平台，助力实现可持续发展的低碳未来。
                  </p>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/7aefd54b19448f9ce0deccde8c5ce2fe364bab4c?width=942"
                alt="Company Building"
                className="w-full h-auto rounded-lg shadow-lg"
              />
              {/* Decorative SVG */}
              <svg
                className="absolute -top-8 -right-8 w-[200px] h-[200px] opacity-30"
                viewBox="0 0 586 396"
                fill="none"
              >
                <path
                  d="M1 396C1 177.848 178.071 1 396.5 1C464.751 1 528.965 18.2664 585 48.6642"
                  stroke="#058A65"
                  strokeOpacity="0.37"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Culture & Values Section */}
      <section className="py-20 bg-[#058A65]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Values */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Innovation */}
              <div className="text-center">
                <h3 className="text-white font-inter text-2xl font-semibold leading-7 tracking-[-0.24px] mb-4">
                  创新
                </h3>
                <p className="text-white/80 font-inter text-sm font-normal leading-6 tracking-[-0.1px]">
                  始终站在行业前沿，不断探索和创新碳管理与绿色发展技术。
                </p>
              </div>

              {/* Collaboration */}
              <div className="text-center">
                <h3 className="text-white font-inter text-2xl font-semibold leading-7 tracking-[-0.24px] mb-4">
                  协作
                </h3>
                <p className="text-white/80 font-inter text-sm font-normal leading-6 tracking-[-0.1px]">
                  与各界伙伴携手，共同推动碳中和目标的实现。
                </p>
              </div>

              {/* Responsibility */}
              <div className="text-center">
                <h3 className="text-white font-inter text-2xl font-semibold leading-7 tracking-[-0.24px] mb-4">
                  责任
                </h3>
                <p className="text-white/80 font-inter text-sm font-normal leading-6 tracking-[-0.1px]">
                  关注环境保护与社会发展，致力于可持续发展的商业模式。
                </p>
              </div>
            </div>

            {/* Right - Header */}
            <div>
              <h2 className="text-white font-inter text-[32px] font-bold leading-normal tracking-[-0.64px] mb-4">
                我们的文化与价值观
              </h2>
              <p className="text-white font-inter text-base font-normal leading-6 tracking-[-0.1px]">
                浙东环境能源交易所秉持创新、协作、责任的企业文化，致力于为员工、客户与社会创造共同价值
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Platforms */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-[#333] font-inter text-[32px] font-bold leading-10 tracking-[-0.48px] mb-4">
              与学术机构与行业共建平台
            </h2>
            <p className="text-[#858C95] font-inter text-lg font-normal leading-[26px] tracking-[-0.18px] max-w-2xl mx-auto">
              我们与多家知名机构合作，推动碳中和技术与创新研究
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex p-6 flex-col justify-center items-start gap-5 rounded-[10px] bg-[#F7F8FA]">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/1375d9eceea05d153f2972b8b8eb44a08a0176a4?width=56"
                alt="Institution Icon"
                className="w-7 h-7"
              />
              <div>
                <h3 className="text-[#333] font-inter text-[22px] font-bold leading-7 tracking-[-0.22px] mb-2">
                  宁波碳中和技术联合研究中心
                </h3>
                <p className="text-[#666] font-inter text-base font-normal leading-[26px] tracking-[-0.16px]">
                  与浙大宁波理工学院合作，聚焦碳中和示范试点、碳中和技术攻关等领域
                </p>
              </div>
            </div>

            <div className="flex p-6 flex-col justify-center items-start gap-5 rounded-[10px] bg-[#F7F8FA]">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/95f3c2fb61bcded1c654a8ce8cac4d50f6241009?width=56"
                alt="Lab Icon"
                className="w-7 h-7"
              />
              <div>
                <h3 className="text-[#333] font-inter text-[22px] font-bold leading-7 tracking-[-0.22px] mb-2">
                  双碳测试评价联合实验室
                </h3>
                <p className="text-[#666] font-inter text-base font-normal leading-[26px] tracking-[-0.16px]">
                  与中科院宁波材料所合作，主要进行碳中和技术成果转化、碳项目申报与技术人才培养
                </p>
              </div>
            </div>

            <div className="flex p-6 flex-col justify-center items-start gap-5 bg-[#F7F8FA]">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/40d51393a9c5639be634f082a9bff1af6068d9fc?width=56"
                alt="Association Icon"
                className="w-7 h-7"
              />
              <div>
                <h3 className="text-[#333] font-inter text-[22px] font-bold leading-7 tracking-[-0.22px] mb-2">
                  宁波市节能协会碳中和专委会
                </h3>
                <p className="text-[#666] font-inter text-base font-normal leading-[26px] tracking-[-0.16px]">
                  牵头行业研究与政策制定，推动绿色低碳技术的应用
                </p>
              </div>
            </div>

            <div className="flex p-6 flex-col justify-center items-start gap-5 rounded-[10px] bg-[#F7F8FA]">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/d34cb9f93650b54e6826e58b0172fc5de9fb25fb?width=56"
                alt="Trade Icon"
                className="w-7 h-7"
              />
              <div>
                <h3 className="text-[#333] font-inter text-[22px] font-bold leading-7 tracking-[-0.22px] mb-2">
                  绿色贸易工作委员会
                </h3>
                <p className="text-[#666] font-inter text-base font-normal leading-[26px] tracking-[-0.16px]">
                  联合外贸企业提供碳排放管理和解决方案，帮助企业实现低碳化
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Honors & Qualifications */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-[#333] font-inter text-[32px] font-bold leading-10 tracking-[-0.64px] mb-4">
              我们��得的荣誉与资质
            </h2>
            <p className="text-[#858C95] font-inter text-base font-normal leading-6 tracking-[-0.1px] max-w-3xl mx-auto">
              浙东环境能源交易所秉持创新、协作、责任的企业文化，致力于为员工、客户与社会创造共同价值
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {honors.map((honor, index) => (
              <div
                key={honor.id}
                className="flex flex-col justify-center items-center gap-4 rounded-[10px]"
              >
                <div className="w-full aspect-[4/5] rounded-[10px] bg-[#D9D9D9]" />
                <h3 className="text-[#333] font-inter text-xl font-medium leading-[30px] tracking-[-0.2px] text-center">
                  {honor.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-20 bg-[rgba(5,138,101,0.05)]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-[#333] font-inter text-[32px] font-bold leading-10 tracking-[-0.48px] mb-4">
              我们的服务
            </h2>
            <p className="text-[#858C95] font-inter text-base font-normal leading-6 tracking-[-0.16px] max-w-2xl mx-auto">
              提供全面的碳管理服务，涵盖以下业务领域
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col items-start gap-6 p-6 rounded-xl bg-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.04)]">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/adf935000c6c08e27a84d6e4b8546f5750074411?width=96"
                alt="Carbon Footprint Icon"
                className="w-12 h-12"
              />
              <div>
                <h3 className="text-[#333] font-inter text-[22px] font-bold leading-[30px] tracking-[-0.22px] mb-2">
                  碳盘查与碳足迹核算
                </h3>
                <p className="text-[#858C95] font-inter text-base font-normal leading-6 tracking-[-0.16px]">
                  对企业进行全面碳排放监测，计算和核查产品碳足迹。
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start gap-6 p-6 rounded-xl bg-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.04)]">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/2f9929af664bbf1e64400732488a8052f7100b0f?width=96"
                alt="Green Factory Icon"
                className="w-12 h-12"
              />
              <div>
                <h3 className="text-[#333] font-inter text-[22px] font-bold leading-[30px] tracking-[-0.22px] mb-2">
                  绿色/零碳工厂建设
                </h3>
                <p className="text-[#858C95] font-inter text-base font-normal leading-6 tracking-[-0.16px]">
                  帮助企业从节能减排到零碳工厂的建设与认证。
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start gap-6 p-6 rounded-xl bg-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.04)]">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/86f224687a51ec7ec2dc88e9d64e68a255149798?width=96"
                alt="Carbon Neutral Icon"
                className="w-12 h-12"
              />
              <div>
                <h3 className="text-[#333] font-inter text-[22px] font-bold leading-[30px] tracking-[-0.22px] mb-2">
                  碳达峰与碳中和路径规划
                </h3>
                <p className="text-[#858C95] font-inter text-base font-normal leading-6 tracking-[-0.16px]">
                  提供企业的双碳发展路线图与实施计划。
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start gap-6 p-6 rounded-xl bg-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.04)]">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/8aaa4c1be1d45b2254fd23a9fb15d27012910161?width=96"
                alt="Standards Icon"
                className="w-12 h-12"
              />
              <div>
                <h3 className="text-[#333] font-inter text-[22px] font-bold leading-[30px] tracking-[-0.22px] mb-2">
                  双碳标准编制与行业研究
                </h3>
                <p className="text-[#858C95] font-inter text-base font-normal leading-6 tracking-[-0.16px]">
                  参与和编制各类行业碳减排标准，开展课题研究。
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start gap-6 p-6 rounded-xl bg-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.04)]">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/9706a5c17f8b519e3119bb8463b4ff16bb538b47?width=96"
                alt="Carbon Trading Icon"
                className="w-12 h-12"
              />
              <div>
                <h3 className="text-[#333] font-inter text-[22px] font-bold leading-[30px] tracking-[-0.22px] mb-2">
                  碳交易与碳金融服务
                </h3>
                <p className="text-[#858C95] font-inter text-base font-normal leading-6 tracking-[-0.16px]">
                  提供绿证、CCER交易服务及碳税和碳金融产品。
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start gap-6 p-6 rounded-xl bg-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.04)]">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/1a009ac9c370ad4937a8ec3526d6e309d2c4cc4e?width=96"
                alt="ESG Icon"
                className="w-12 h-12"
              />
              <div>
                <h3 className="text-[#333] font-inter text-[22px] font-bold leading-[30px] tracking-[-0.22px] mb-2">
                  ESG信息披露与碳报告编制
                </h3>
                <p className="text-[#858C95] font-inter text-base font-normal leading-6 tracking-[-0.16px]">
                  为企业提供环境、社会和治理信息披露服务。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Map */}
            <div className="relative">
              <div
                className="w-full h-[464px] rounded-2xl border border-[#E5E5E7] bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage:
                    "url('https://api.builder.io/api/v1/image/assets/TEMP/0199bf4e2203c2a1d68459433f7cc59913ba7781?width=1152')",
                }}
              />

              {/* Map Marker */}
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/a1cc6b2dded43a45244f008283a59eab5e5e6e68?width=96"
                alt="Map Marker"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full"
              />

              {/* Contact Info Card */}
              <div className="absolute bottom-4 left-4 right-4 flex p-4 items-start gap-6 rounded-[10px] border border-[#E5E5E7] bg-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.04)]">
                <div className="flex-1">
                  <h4 className="text-[#333] font-inter text-[15px] font-semibold leading-[22px] mb-1">
                    公司地址
                  </h4>
                  <p className="text-[#666] font-inter text-sm font-medium leading-5 tracking-[-0.1px]">
                    地址文案文案文案文案
                  </p>
                </div>
                <div className="flex-1">
                  <h4 className="text-[#333] font-inter text-[15px] font-semibold leading-[22px] tracking-[-0.1px] mb-1">
                    电话
                  </h4>
                  <p className="text-[#666] font-inter text-sm font-medium leading-5 tracking-[-0.1px]">
                    021-888888888
                  </p>
                </div>
                <div className="flex-1">
                  <h4 className="text-[#333] font-inter text-[15px] font-semibold leading-[22px] tracking-[-0.1px] mb-1">
                    邮箱
                  </h4>
                  <p className="text-[#666] font-inter text-sm font-medium leading-5 tracking-[-0.1px]">
                    wewfewf@163.com
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="mb-12">
                <h2 className="text-[#333] font-inter text-[32px] font-bold leading-10 tracking-[-0.48px] mb-4">
                  联系我们
                </h2>
                <p className="text-[#666] font-inter text-lg font-normal leading-[26px] tracking-[-0.18px]">
                  如果您有任何问题或疑问，请与我们联系我们将尽最大努力尽快回复您。
                </p>
              </div>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="您的名字"
                    className="w-full p-3 rounded-md border border-[#E5E5E7] bg-[#F8F9FB] text-[#999] font-inter text-[15px] font-normal leading-[22px] focus:outline-none focus:ring-2 focus:ring-[#058A65] focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="您的公司"
                    className="w-full p-3 rounded-md border border-[#E5E5E7] bg-[#F8F9FB] text-[#999] font-inter text-[15px] font-normal leading-[22px] focus:outline-none focus:ring-2 focus:ring-[#058A65] focus:border-transparent"
                  />
                </div>

                <input
                  type="text"
                  placeholder="您的联系方式"
                  className="w-full p-3 rounded-md border border-[#E5E5E7] bg-[#F8F9FB] text-[#999] font-inter text-[15px] font-normal leading-[22px] focus:outline-none focus:ring-2 focus:ring-[#058A65] focus:border-transparent"
                />

                <textarea
                  placeholder="您的问题"
                  rows={4}
                  className="w-full p-3 rounded-md border border-[#E5E5E7] bg-[#F8F9FB] text-[#999] font-inter text-[15px] font-medium leading-[22px] resize-none focus:outline-none focus:ring-2 focus:ring-[#058A65] focus:border-transparent"
                ></textarea>

                <button
                  type="submit"
                  className="w-full py-3 px-[18px] rounded-full bg-[#058A65] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.04)] text-white font-inter text-[15px] font-semibold leading-[22px] hover:bg-[#047556] transition-colors duration-200"
                >
                  立即咨询
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
