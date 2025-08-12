import { 
  MessageCircleMore, 
  TrendingUp, 
  DollarSign, 
  Monitor, 
  Footprints, 
  GraduationCap, 
  Building2 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function BusinessServices() {
  const navigate = useNavigate();
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const services = [
    {
      title: "碳咨询",
      subtitle:
        "专业的碳咨询服务，提供绿色工厂创建、碳达峰碳中和路径规划、ESG信息披露等全方位咨询支持，助力企业制定科学的双碳发展战略。",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/7bb1fe9f262a0519faa5ffb370502b8d01792d9d?width=349",
      icon: MessageCircleMore,
      path: "/product-service/carbon-consulting",
      submenu: [
        { title: "绿色/低碳工厂创建", path: "/product-service/green-low-carbon-factory" },
        { title: "CEAV产品碳排放核算与申报", path: "/ceav-carbon-accounting" },
        { title: "碳达峰碳中和路径规划", path: "/carbon-neutrality-planning" },
        { title: "ESG信息披露", path: "/esg-disclosure" },
        { title: "双碳标准编制", path: "/carbon-standard-development" },
        { title: "双碳课题研究", path: "/carbon-research" },
      ],
    },
    {
      title: "碳交易",
      subtitle:
        "专业的碳交易服务，助力企业实现碳资产价值最大化，提供地方碳普惠交易、CCER资产开发与交易、绿证交易等多元化交易服务。",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/016820fd6b8a92264e45eec769581861a334348a?width=546",
      icon: TrendingUp,
      path: "/local-carbon-trading",
      submenu: [
        { title: "地方碳普惠交易", path: "/local-carbon-trading" },
        { title: "绿证交易", path: "/green-certificate-trading" },
        { title: "企业碳资产管理", path: "/enterprise-carbon-asset-management" },
      ],
    },
    {
      title: "碳金融",
      subtitle:
        "创新的碳金融产品和服务，为企业提供绿色融资解决方案和碳资产管理，通过金融工具助力企业实现碳资产价值变现和风险管控。",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/ac321a0ee51299b257411524ffab412103ab7b2c?width=1329",
      icon: DollarSign,
      path: "/product-service/carbon-finance",
      submenu: [
        { title: "碳金融解决方案", path: "/carbon-finance-solution" },
      ],
    },
    {
      title: "碳信息化",
      subtitle:
        "数字化碳管理平台，实现碳数据的智能监测、分析和报告，提供企业碳管理平台、区域双碳大脑、个人碳账户等信息化解决方案。",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/6a64cd50e1b9fc8390c4aaf934f7576ecfbaa7f2?width=632",
      icon: Monitor,
      path: "/corporate-carbon-management",
    },
    {
      title: "碳足迹",
      subtitle:
        "全面的产品碳足迹评估和认证服务，提供碳盘查、碳足迹核算等专业服务，帮助企业了解和优化产品生命周期碳排放。",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/681c8a293aa285306001bad46de4183adcf195e3?width=2104",
      icon: Footprints,
      path: "/carbon-footprint",
    },
    {
      title: "碳培训",
      subtitle: "专业的碳管理培训课程，提供碳排放交易员培训、管理员培训、行业专题讲座等，提升企业团队的双碳管理能力和专业水平。",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/0fa5766228890ff20bfed118baf1bbc6c23711f6?width=1338",
      icon: GraduationCap,
      path: "/product-service/carbon-training",
    },
    {
      title: "零碳园区",
      subtitle: "零碳园区规划和建设解决方案，提供零碳园区和零碳工厂的完整解决方案，打造绿色低碳的产业园区生态系统。",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/d900a4c1d4408745c3bae28ab6d14e3468f7d624?width=1406",
      icon: Building2,
      path: "/zero-carbon-park",
    },
  ];

  const handleServiceClick = (path: string) => {
    navigate(path);
  };

  const handleSubmenuClick = (path: string) => {
    navigate(path);
    setActiveSubmenu(null);
  };

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-[#333] font-inter text-[34px] font-bold leading-[40px] tracking-[-0.68px] mb-4">
            细分、垂直的七大业务体系
          </h2>
        </div>

        {/* Services Grid */}
        <div className="flex flex-col md:flex-row gap-6 md:h-[446px] relative">
          {/* All Services with Consistent Hover Effects */}
          {services.map((service, index) => {
            const IconComponent = service.icon;
            const hasSubmenu = service.submenu && service.submenu.length > 0;

            return (
              <div
                key={index}
                className="relative w-full md:w-[156px] h-[80px] md:h-full rounded-lg overflow-hidden group cursor-pointer transform transition-all duration-300 hover:scale-105 md:hover:scale-125 hover:z-10 group"
                style={{ transition: 'height 0.3s' }}
                onClick={() => {
                  if (hasSubmenu) {
                    setActiveSubmenu(activeSubmenu === service.title ? null : service.title);
                  } else {
                    handleServiceClick(service.path);
                  }
                }}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/48" />
                <div className="absolute inset-0 bg-brand-green/90 opacity-0 group-hover:opacity-100 transition-all duration-300" />

                {/* Default State - Only Title */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 group-hover:opacity-0 transition-opacity duration-300">
                  <h3 className="text-white text-center text-lg font-medium whitespace-nowrap">
                    {service.title}
                  </h3>
                </div>

                {/* Hover State - Full Content */}
                <div className="absolute inset-0 p-6 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-center items-center">
                  <div className="flex justify-center mb-4">
                    <IconComponent className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-center text-lg font-medium mb-4">
                    {service.title}
                  </h3>
                  <p className="text-sm text-white/70 leading-6 mb-6 text-center">
                    {service.subtitle}
                  </p>
                  
                  {hasSubmenu ? (
                    <div className="w-full">
                      <button 
                        className="bg-white text-brand-green font-semibold py-3 px-6 rounded-full text-sm hover:bg-gray-50 transition-colors mb-3 w-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveSubmenu(activeSubmenu === service.title ? null : service.title);
                        }}
                      >
                        选择服务
                      </button>
                      
                      {/* Submenu */}
                      {activeSubmenu === service.title && (
                        <div className="absolute top-full left-0 right-0 bg-white rounded-lg shadow-lg mt-2 z-20">
                          {service.submenu.map((item, subIndex) => (
                            <button
                              key={subIndex}
                              className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-green transition-colors border-b border-gray-100 last:border-b-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSubmenuClick(item.path);
                              }}
                            >
                              {item.title}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <button 
                      className="bg-white text-brand-green font-semibold py-3 px-6 rounded-full text-sm hover:bg-gray-50 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleServiceClick(service.path);
                      }}
                    >
                      了解更多
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <style>{`
          @media (max-width: 767px) {
            .group {
              height: 80px !important;
              transition: height 0.3s;
            }
            .group:hover, .group:focus-within {
              height: 260px !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
