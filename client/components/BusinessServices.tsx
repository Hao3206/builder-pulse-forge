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
import { useLanguage } from "../hooks/useLanguage";

export default function BusinessServices() {
  const navigate = useNavigate();
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const { t } = useLanguage();

  const services = [
    {
      title: t("business.carbon.consulting.title"),
      subtitle: t("business.carbon.consulting.subtitle"),
      image:
        "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg",
      icon: MessageCircleMore,
      path: "/carbon-neutrality-planning",
      submenu: [
        { title: t("products.green.factory"), path: "/product-service/green-low-carbon-factory" },
        { title: t("products.ceav.accounting"), path: "/ceav-carbon-accounting" },
        { title: t("products.carbon.neutral.planning"), path: "/carbon-neutrality-planning" },
        { title: t("products.esg.disclosure"), path: "/esg-disclosure" },
        { title: t("products.carbon.standard"), path: "/carbon-standard-development" },
        { title: t("products.carbon.research"), path: "/carbon-research" },
      ],
    },
    {
      title: t("business.carbon.trading.title"),
      subtitle: t("business.carbon.trading.subtitle"),
      image:
        "https://images.pexels.com/photos/5716001/pexels-photo-5716001.jpeg",
      icon: TrendingUp,
      path: "/local-carbon-trading",
      submenu: [
        { title: t("products.local.carbon.trading"), path: "/local-carbon-trading" },
        { title: t("products.green.certificate"), path: "/green-certificate-trading" },
        { title: t("products.enterprise.carbon.management"), path: "/enterprise-carbon-asset-management" },
      ],
    },
    {
      title: t("business.carbon.finance.title"),
      subtitle: t("business.carbon.finance.subtitle"),
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/ac321a0ee51299b257411524ffab412103ab7b2c?width=1329",
      icon: DollarSign,
      path: "/carbon-finance-solution",
      submenu: [],
    },
    {
      title: t("business.carbon.tech.title"),
      subtitle: t("business.carbon.tech.subtitle"),
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/6a64cd50e1b9fc8390c4aaf934f7576ecfbaa7f2?width=632",
      icon: Monitor,
      path: "/corporate-carbon-management",
    },
    {
      title: t("business.carbon.footprint.title"),
      subtitle: t("business.carbon.footprint.subtitle"),
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/681c8a293aa285306001bad46de4183adcf195e3?width=2104",
      icon: Footprints,
      path: "/carbon-footprint",
    },
    {
      title: t("business.carbon.training.title"),
      subtitle: t("business.carbon.training.subtitle"),
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/0fa5766228890ff20bfed118baf1bbc6c23711f6?width=1338",
      icon: GraduationCap,
      path: "/product-service/carbon-trader-training",
    },
    {
      title: t("business.zero.carbon.park.title"),
      subtitle: t("business.zero.carbon.park.subtitle"),
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/d900a4c1d4408745c3bae28ab6d14e3468f7d624?width=1406",
      icon: Building2,
      path: "/zero-carbon-park",
    },
  ];

  const handleServiceClick = (path: string) => {
    setActiveSubmenu(null);
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
            {t("business.services.title")}
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
                onClick={() => handleServiceClick(service.path)}
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
                        {t("common.select.service")}
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
                      {t("common.learn.more")}
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
