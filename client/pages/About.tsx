import { useState } from "react";
import { ArrowLeft, ArrowRight, Phone, MapPin, Mail } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function About() {
  const [currentHonor, setCurrentHonor] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const honors = [
    {
      id: 1,
      title: "国家级碳资产管理资质",
      image:
        "https://images.unsplash.com/photo-1577412647305-991150c7d163?w=400&h=500&fit=crop",
    },
    {
      id: 2,
      title: "绿色工厂示范单位",
      image:
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=500&fit=crop",
    },
    {
      id: 3,
      title: "ISO 14001认证",
      image:
        "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=500&fit=crop",
    },
    {
      id: 4,
      title: "双碳标准编制单位",
      image:
        "https://images.unsplash.com/photo-1497436072909-f5e4be242e9b?w=400&h=500&fit=crop",
    },
  ];

  const nextHonor = () => {
    setCurrentHonor((prev) => (prev + 1) % honors.length);
  };

  const prevHonor = () => {
    setCurrentHonor((prev) => (prev - 1 + honors.length) % honors.length);
  };

  const services = [
    {
      id: 1,
      title: "碳盘查与碳足迹核算",
      description: "对企业进行全面碳排放监测，计算和核查产品碳足迹。",
      icon: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=100&h=100&fit=crop",
    },
    {
      id: 2,
      title: "绿色/零碳工厂建设",
      description: "帮助企业从节能减排到零碳工厂的建设与认证。",
      icon: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop",
    },
    {
      id: 3,
      title: "碳达峰与碳中和路径规划",
      description: "提供企业的双碳发展路线图与实施计划。",
      icon: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=100&h=100&fit=crop",
    },
    {
      id: 4,
      title: "双碳标准编制与行业研究",
      description: "参与和编制各类行业碳减排标准，开展课题研究。",
      icon: "https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?w=100&h=100&fit=crop",
    },
    {
      id: 5,
      title: "碳交易与碳金融服务",
      description: "提供绿证、CCER交易服务及碳税和碳金融产品。",
      icon: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=100&h=100&fit=crop",
    },
    {
      id: 6,
      title: "ESG信息披露与碳报告编制",
      description: "为企业提供环境、社会和治理信息披露服务。",
      icon: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=100&h=100&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-inter">
      {/* Sticky Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <Header isScrolled={isScrolled} />
      </div>

      {/* Hero Section */}
      <section className="relative h-[600px] flex flex-col justify-center items-center bg-[#F8F9FB] overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-white font-inter text-[44px] font-bold leading-[60px] tracking-[-0.88px] mb-6">
            关于浙东环境能源交易所
          </h1>
          <p className="text-white/80 font-inter text-lg leading-[26px] tracking-[-0.1px] max-w-2xl">
            推动全球双碳目标的实现，助力可持续发展的低碳未来
          </p>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="relative py-20 bg-gradient-to-b from-[rgba(5,138,101,0.05)] to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-start gap-16">
            {/* Left Content */}
            <div className="flex-1">
              <div className="mb-16">
                <h2 className="text-[#333] font-inter text-[32px] font-bold leading-[40px] tracking-[-0.64px] mb-4">
                  ���于浙东环境能源交易所
                </h2>
                <p className="text-[#666] font-inter text-base leading-6 tracking-[-0.1px] max-w-2xl">
                  宁波浙东环境能源交易所成立于2011年，是由宁波市人民政府批准、国务院部际联席会议备案的环境权益类交易机构。
                  专注于节能减排、环境保护与能源领域的权益交易，致力于为电力、能源、化工等行业客户提供碳资产开发管理、双碳咨询与培训服务。
                </p>
              </div>

              {/* Mission & Vision */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="flex flex-col items-start">
                  <div className="w-[60px] h-[60px] bg-brand-green rounded-full flex items-center justify-center mb-6">
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
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
                  <h3 className="text-[#333] font-inter text-2xl font-semibold mb-4">
                    使命
                  </h3>
                  <p className="text-[#666] font-inter text-base leading-6">
                    推动全球双碳目标的实现，为企业和政府提供专业的碳管理解决方案。
                  </p>
                </div>

                <div className="flex flex-col items-start">
                  <div className="w-[60px] h-[60px] bg-brand-green rounded-full flex items-center justify-center mb-6">
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
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
                  <h3 className="text-[#333] font-inter text-2xl font-semibold mb-4">
                    愿景
                  </h3>
                  <p className="text-[#666] font-inter text-base leading-6">
                    成为国内领先、国际一流的环境能源交易平台，助力实现可持续发展的低碳未来。
                  </p>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=700&fit=crop"
                alt="Company Building"
                className="w-[471px] h-[525px] object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Culture & Values */}
      <section className="py-20 bg-brand-green">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-16">
              {/* Innovation */}
              <div className="text-center">
                <h3 className="text-white font-inter text-2xl font-semibold mb-4">
                  创新
                </h3>
                <p className="text-white/80 font-inter text-sm leading-6 max-w-[200px]">
                  始终站在行业前沿，不断探索和创新碳管理与绿色发展技术。
                </p>
              </div>

              {/* Collaboration */}
              <div className="text-center">
                <h3 className="text-white font-inter text-2xl font-semibold mb-4">
                  协作
                </h3>
                <p className="text-white/80 font-inter text-sm leading-6 max-w-[200px]">
                  与各界伙伴携手，共同推动碳中和目标的实现。
                </p>
              </div>

              {/* Responsibility */}
              <div className="text-center">
                <h3 className="text-white font-inter text-2xl font-semibold mb-4">
                  责任
                </h3>
                <p className="text-white/80 font-inter text-sm leading-6 max-w-[200px]">
                  关注环境保护与社会发展，致力于可持续发展的商业模式。
                </p>
              </div>
            </div>

            <div className="text-right">
              <h2 className="text-white font-inter text-[32px] font-bold mb-4">
                我们的文化与价值观
              </h2>
              <p className="text-white font-inter text-base max-w-[358px]">
                浙东环境能源交易所秉持创新、协作、责任的企业文化，致力于为员工、客户与社会创造共同价值
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Platforms */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-[#333] font-inter text-[32px] font-bold leading-[40px] tracking-[-0.48px] mb-4">
              与学术机构与行业共建平台
            </h2>
            <p className="text-[#858C95] font-inter text-lg leading-[26px] tracking-[-0.18px]">
              我们与多家知名机构合作，推动碳中和技术与创新研究
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "宁波碳中和技术联合研究中心",
                description:
                  "与浙大宁波理工学院合作，聚焦碳中和示范试点、碳中和技术攻关等领域",
                icon: "🏛️",
              },
              {
                title: "双碳测试评价联合实验室",
                description:
                  "与中科院宁波材料所合作，主要进行碳中和技术成果转化、碳项目申报与技术人才培养",
                icon: "🔬",
              },
              {
                title: "宁波市节能协会碳中和专委会",
                description: "牵头行业研究与政策制定，推动绿色低碳技术的应用",
                icon: "⚙️",
              },
              {
                title: "绿色贸易工作委员会",
                description:
                  "联合外贸企业提供碳排放管理和解决方案，帮助企业实现低碳化",
                icon: "🌱",
              },
            ].map((platform, index) => (
              <div
                key={index}
                className="bg-[#F7F8FA] rounded-lg p-7 min-h-[188px] flex flex-col"
              >
                <div className="text-3xl mb-5">{platform.icon}</div>
                <h3 className="text-[#333] font-inter text-[22px] font-bold leading-7 tracking-[-0.22px] mb-3">
                  {platform.title}
                </h3>
                <p className="text-[#666] font-inter text-base leading-[26px] tracking-[-0.16px]">
                  {platform.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Honors & Qualifications */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-[#333] font-inter text-[32px] font-bold leading-[40px] tracking-[-0.64px] mb-3">
              我们获得的荣誉与资质
            </h2>
            <p className="text-[#858C95] font-inter text-base leading-6 tracking-[-0.1px]">
              浙东环境能源交易所秉持创新、协作、责任的企业文化，致力于为员工、客户与社会创造共同价值
            </p>
          </div>

          <div className="relative">
            <div className="flex justify-center gap-7">
              {honors
                .slice(currentHonor, currentHonor + 4)
                .map((honor, index) => (
                  <div key={honor.id} className="flex flex-col items-center">
                    <div className="w-[260px] h-[334px] bg-gray-200 rounded-lg mb-4 overflow-hidden">
                      <img
                        src={honor.image}
                        alt={honor.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-[#333] font-inter text-xl font-medium leading-[30px] tracking-[-0.2px] text-center">
                      {honor.title}
                    </h3>
                  </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevHonor}
              className="absolute left-28 top-1/2 -translate-y-1/2 w-[66px] h-[66px] bg-black/30 rounded-full flex items-center justify-center hover:bg-black/50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>

            <button
              onClick={nextHonor}
              className="absolute right-28 top-1/2 -translate-y-1/2 w-[66px] h-[66px] bg-black/30 rounded-full flex items-center justify-center hover:bg-black/50 transition-colors"
            >
              <ArrowRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-20 bg-[rgba(5,138,101,0.05)]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-[#333] font-inter text-[32px] font-bold leading-[40px] tracking-[-0.48px] mb-4">
              我们的服务
            </h2>
            <p className="text-[#858C95] font-inter text-base leading-6 tracking-[-0.16px]">
              提供全面的碳管理服务，涵盖以下业务领域
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-xl p-6 shadow-sm min-h-[230px] flex flex-col"
              >
                <div className="mb-6">
                  <img
                    src={service.icon}
                    alt={service.title}
                    className="w-12 h-12 rounded object-cover"
                  />
                </div>
                <h3 className="text-[#333] font-inter text-[22px] font-bold leading-[30px] tracking-[-0.22px] mb-2">
                  {service.title}
                </h3>
                <p className="text-[#858C95] font-inter text-base leading-6 tracking-[-0.16px]">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-16">
            {/* Map */}
            <div className="flex-1">
              <div className="relative">
                <div
                  className="w-full h-[464px] rounded-2xl bg-gray-200 bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&h=800&fit=crop')",
                  }}
                >
                  {/* Map Marker */}
                  <div className="absolute top-16 right-44">
                    <div className="w-12 h-12 bg-brand-green rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                {/* Contact Info Card */}
                <div className="absolute bottom-0 left-0 right-0 bg-white border border-[#E5E5E7] rounded-lg shadow-sm p-5 m-8">
                  <div className="flex gap-6">
                    <div className="flex-1">
                      <h4 className="text-[#333] font-inter text-[15px] font-semibold mb-1">
                        公司地址
                      </h4>
                      <p className="text-[#666] font-inter text-sm leading-5">
                        浙江省宁波市江北区北岸财富中心
                      </p>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[#333] font-inter text-[15px] font-semibold mb-1">
                        电话
                      </h4>
                      <p className="text-[#666] font-inter text-sm leading-5">
                        0574-87310818
                      </p>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[#333] font-inter text-[15px] font-semibold mb-1">
                        邮箱
                      </h4>
                      <p className="text-[#666] font-inter text-sm leading-5">
                        info@zdhjnj.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="flex-1">
              <div className="mb-12">
                <h2 className="text-[#333] font-inter text-[32px] font-bold leading-[40px] tracking-[-0.48px] mb-4">
                  联系我们
                </h2>
                <p className="text-[#666] font-inter text-lg leading-[26px] tracking-[-0.18px]">
                  如果您有任何问题或疑问，请与我们联系我们将尽最大努力尽快回复您。
                </p>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <input
                      type="text"
                      placeholder="您的名字"
                      className="w-full h-[46px] px-3 border border-[#E5E5E7] rounded-md bg-[#F8F9FB] text-[#999] font-inter text-[15px] leading-[22px] focus:outline-none focus:border-brand-green"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="您的公司"
                      className="w-full h-[46px] px-3 border border-[#E5E5E7] rounded-md bg-[#F8F9FB] text-[#999] font-inter text-[15px] leading-[22px] focus:outline-none focus:border-brand-green"
                    />
                  </div>
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="您的联系方式"
                    className="w-full h-[46px] px-3 border border-[#E5E5E7] rounded-md bg-[#F8F9FB] text-[#999] font-inter text-[15px] leading-[22px] focus:outline-none focus:border-brand-green"
                  />
                </div>

                <div>
                  <textarea
                    placeholder="您的问题"
                    rows={4}
                    className="w-full p-4 border border-[#E5E5E7] rounded-md bg-[#F8F9FB] text-[#999] font-inter text-[15px] leading-[22px] resize-none focus:outline-none focus:border-brand-green"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-green text-white font-inter text-[15px] font-semibold leading-[22px] py-3 px-5 rounded-full shadow-sm hover:bg-brand-green/90 transition-colors"
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
