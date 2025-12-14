import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

export type Language = "zh" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

// 翻译对象类型
interface Translations {
  [key: string]: {
    zh: string;
    en: string;
  };
}

// 翻译内容
const translations: Translations = {
  // Header navigation
  "nav.products": {
    zh: "产品服务",
    en: "Products & Services",
  },
  "nav.solutions": {
    zh: "解决方案",
    en: "Solutions",
  },
  "nav.cases": {
    zh: "成功案例",
    en: "Success Cases",
  },
  "nav.news": {
    zh: "资讯中心",
    en: "News Center",
  },
  "nav.about": {
    zh: "关于我们",
    en: "About Us",
  },

  // Search
  "search.placeholder": {
    zh: "搜索产品、解决方案、资讯...",
    en: "Search products, solutions, news...",
  },
  "search.button": {
    zh: "搜索",
    en: "Search",
  },
  "search.cancel": {
    zh: "取消",
    en: "Cancel",
  },

  // Common
  "common.phone": {
    zh: "18606624246",
    en: "18606624246",
  },
  "common.language.zh": {
    zh: "中文",
    en: "Chinese",
  },
  "common.language.en": {
    zh: "English",
    en: "English",
  },

  // Footer (expand as needed)
  "footer.contact": {
    zh: "联系我们",
    en: "Contact Us",
  },
  "footer.address": {
    zh: "地址",
    en: "Address",
  },

  // Product Services Dropdown
  "products.carbon.trading": {
    zh: "碳交易",
    en: "Carbon Trading",
  },
  "products.carbon.consulting": {
    zh: "碳咨询",
    en: "Carbon Consulting",
  },
  "products.carbon.finance": {
    zh: "碳金融",
    en: "Carbon Finance",
  },
  "products.carbon.tech": {
    zh: "碳信息化",
    en: "Carbon Technology",
  },
  "products.carbon.footprint": {
    zh: "碳足迹",
    en: "Carbon Footprint",
  },
  "products.carbon.training": {
    zh: "碳培训",
    en: "Carbon Training",
  },
  "products.zero.carbon.park": {
    zh: "零碳园区",
    en: "Zero Carbon Park",
  },
  "products.zero.carbon.factory": {
    zh: "零碳工厂",
    en: "Zero Carbon Factory",
  },

  // Product Services Details
  "products.local.carbon.trading": {
    zh: "地方碳普惠交易",
    en: "Local Carbon Inclusive Trading",
  },
  "products.ccer.development": {
    zh: "CCER资产开发与交易",
    en: "CCER Asset Development & Trading",
  },
  "products.green.certificate": {
    zh: "绿证交易",
    en: "Green Certificate Trading",
  },
  "products.enterprise.carbon.management": {
    zh: "企业碳资产管理",
    en: "Enterprise Carbon Asset Management",
  },
  "products.green.factory": {
    zh: "绿色/低碳工厂创建",
    en: "Low-Carbon Factory",
  },
  "products.ceav.accounting": {
    zh: "CBAM碳边境调节机制应对服务",
    en: "CBAM Compliance & Reporting Service",
  },
  "products.carbon.neutral.planning": {
    zh: "碳达峰碳中和路径规划",
    en: "Neutrality Planning",
  },
  "products.esg.disclosure": {
    zh: "ESG信息披露",
    en: "ESG Information Disclosure",
  },
  "products.carbon.standard": {
    zh: "双碳标准编制",
    en: "Carbon Standard Development",
  },
  "products.carbon.research": {
    zh: "双碳课题研究",
    en: "Carbon Research Projects",
  },
  "products.carbon.finance.solutions": {
    zh: "碳金融解决方案",
    en: "Carbon Finance Solutions",
  },
  "products.enterprise.platform": {
    zh: "企业碳管理平台",
    en: "Enterprise Carbon Management Platform",
  },
  "products.regional.brain": {
    zh: "区域双碳大脑",
    en: "Regional Carbon Intelligence",
  },
  "products.personal.account": {
    zh: "个人碳账户建设",
    en: "Personal Carbon Account Development",
  },
  "products.green.trade.platform": {
    zh: "绿色贸易服务平台",
    en: "Green Trade Service Platform",
  },
  "products.carbon.accounting": {
    zh: "碳盘查/碳足迹核算",
    en: "Carbon Inventory/Footprint Accounting",
  },
  "products.trader.training": {
    zh: "碳排放交易员培训",
    en: "Carbon Trader Training",
  },
  "products.manager.training": {
    zh: "碳排放管理员培训",
    en: "Carbon Manager Training",
  },
  "products.industry.seminar": {
    zh: "行业专题讲座/论坛",
    en: "Industry Seminars/Forums",
  },
  "products.custom.training": {
    zh: "其他定制化培训",
    en: "Other Customized Training",
  },
  "products.advanced.training": {
    zh: "碳达峰碳中和战略规划高级研修班",
    en: "Advanced Carbon Strategy Planning Course",
  },
  "products.zero.carbon.solutions": {
    zh: "零碳园区解决方案",
    en: "Zero Carbon Park Solutions",
  },
  "products.low.carbon.solutions": {
    zh: "其他低/零碳解决方案",
    en: "Other Low/Zero Carbon Solutions",
  },

  // News categories
  "news.policy": {
    zh: "政策解读",
    en: "Policy Interpretation",
  },
  "news.dynamics": {
    zh: "本所动态",
    en: "Institute News",
  },
  "news.announcement": {
    zh: "通知公告",
    en: "Announcements",
  },
  "news.general": {
    zh: "新闻资讯",
    en: "News & Information",
  },
  "news.knowledge": {
    zh: "知识专栏",
    en: "Knowledge Column",
  },

  // Solutions
  "solutions.energy.carbon.management": {
    zh: "能碳管理系统(园区/工厂)解决方案",
    en: "Energy-Carbon Management System Solutions",
  },
  "solutions.enterprise.carbon.management": {
    zh: "企业碳管理一站式解决方案",
    en: "Enterprise Carbon Management One-Stop Solutions",
  },
  "solutions.zero.carbon.park": {
    zh: "零碳园区解决方案",
    en: "Zero Carbon Park Solutions",
  },
  "solutions.zero.carbon.factory": {
    zh: "零碳工厂解决方案",
    en: "Zero Carbon Factory Solutions",
  },
  "solutions.carbon.footprint": {
    zh: "碳核算/碳足迹解决方案",
    en: "Carbon Accounting/Footprint Solutions",
  },

  // About sections
  "about.company.intro": {
    zh: "公司介绍",
    en: "Company Introduction",
  },
  "about.company.profile": {
    zh: "企业简介",
    en: "Company Profile",
  },
  "about.development.history": {
    zh: "发展历程",
    en: "Development History",
  },
  "about.corporate.culture": {
    zh: "企业文化",
    en: "Corporate Culture",
  },
  "about.success.cases": {
    zh: "成功案例",
    en: "Success Cases",
  },
  "about.typical.cases": {
    zh: "典型案例",
    en: "Typical Cases",
  },
  "about.customer.testimonials": {
    zh: "客户见证",
    en: "Customer Testimonials",
  },
  "about.contact.us": {
    zh: "联系我们",
    en: "Contact Us",
  },
  "about.contact.info": {
    zh: "联系方式",
    en: "Contact Information",
  },
  "about.address.info": {
    zh: "地址信息",
    en: "Address Information",
  },

  // Common descriptions and buttons
  "common.more.content": {
    zh: "更多内容",
    en: "More Content",
  },
  "common.description.placeholder": {
    zh: "专业的碳管理服务，涵盖碳交易、碳咨询、碳金融等全方位业务，助力企业实现绿色低碳发展目标。",
    en: "Professional carbon management services covering carbon trading, carbon consulting, carbon finance and other comprehensive businesses to help enterprises achieve green and low-carbon development goals.",
  },
  "common.solution.description": {
    zh: "融合行业经验、数字化平台与标准化方法，为企业提供可量化、可复制、可持续的低碳解决方案。",
    en: "Combine industry expertise, digital platforms, and proven methodologies to deliver measurable, repeatable, and sustainable low-carbon solutions.",
  },
  "common.learn.more": {
    zh: "了解更多",
    en: "Learn More",
  },
  "common.select.service": {
    zh: "选择服务",
    en: "Select Service",
  },

  // Hero Section
  "hero.slide1.title": {
    zh: "绿色工厂从这里开始",
    en: "Green Factory Starts Here",
  },
  "hero.slide1.subtitle": {
    zh: "打造零碳、智能、透明的能碳管理系统",
    en: "Building Zero-Carbon, Smart, and Transparent Energy-Carbon Management System",
  },
  "hero.slide2.title": {
    zh: "智慧能源管理平台助力企业降本增效",
    en: "Smart Energy Management Platform Helps Enterprises Reduce Costs and Increase Efficiency",
  },
  "hero.slide2.subtitle": {
    zh: "通过数字化手段实现能源监测与优化管理",
    en: "Achieving Energy Monitoring and Optimization Management Through Digital Means",
  },
  "hero.slide3.title": {
    zh: "碳资产管理系统引领绿色发展新时代",
    en: "Carbon Asset Management System Leads the New Era of Green Development",
  },
  "hero.slide3.subtitle": {
    zh: "专业的碳排放监测与交易管理解决方案",
    en: "Professional Carbon Emission Monitoring and Trading Management Solutions",
  },
  "hero.slide4.title": {
    zh: "构建零碳园区生态系统",
    en: "Building Zero-Carbon Park Ecosystem",
  },
  "hero.slide4.subtitle": {
    zh: "打造可持续发展的智慧园区管理平台",
    en: "Creating Sustainable Smart Park Management Platform",
  },

  // Business Services
  "business.services.title": {
    zh: "细分、垂直的七大业务体系",
    en: "Seven Specialized and Vertical Business Systems",
  },
  "business.carbon.consulting.title": {
    zh: "碳咨询",
    en: "Consulting",
  },
  "business.carbon.consulting.subtitle": {
    zh: "专业的碳咨询服务，提供绿色工厂创建、碳达峰碳中和路径规划、ESG信息披露等全方位咨询支持，助力企业制定科学的双碳发展战略。",
    en: "Professional carbon consulting for green factories, carbon neutrality planning, and ESG disclosure.",
  },
  "business.carbon.trading.title": {
    zh: "碳交易",
    en: "Trading",
  },
  "business.carbon.trading.subtitle": {
    zh: "专业的碳交易服务，助力企业实现碳资产价值最大化，提供地方碳普惠交易、CCER资产开发与交易、绿证交易等多元化交易服务。",
    en: "Professional carbon trading services for CCER assets, green certificates, and local carbon markets.",
  },
  "business.carbon.finance.title": {
    zh: "碳金融",
    en: "Finance",
  },
  "business.carbon.finance.subtitle": {
    zh: "创新的碳金融产品和服务，为企业提供绿色融资解决方案和碳资产管理，通过金融工具助力企业实现碳资产价值变现和风险管控。",
    en: "Innovative carbon finance products and green financing solutions for carbon asset management.",
  },
  "business.carbon.tech.title": {
    zh: "碳信息化",
    en: "Technology",
  },
  "business.carbon.tech.subtitle": {
    zh: "数字化碳管理平台，实现碳数据的智能监测、分析和报告，提供企业碳管理平台、区域双碳大脑、个人碳账户等信息化解决方案。",
    en: "Digital carbon management platform with intelligent monitoring and reporting solutions.",
  },
  "business.carbon.footprint.title": {
    zh: "碳足迹",
    en: "Footprint",
  },
  "business.carbon.footprint.subtitle": {
    zh: "全面的产品碳足迹评估和认证服务，提供碳盘查、碳足迹核算等专业服务，帮助企业了解和优化产品生命周期碳排放。",
    en: "Comprehensive carbon footprint assessment and certification services for product lifecycle optimization.",
  },
  "business.carbon.training.title": {
    zh: "碳培训",
    en: "Training",
  },
  "business.carbon.training.subtitle": {
    zh: "专业的碳管理培训课程，提供碳排放交易员培训、管理员培训、行业专题讲座等，提升企业团队的双碳管理能力和专业水平。",
    en: "Professional carbon management training courses for traders, managers, and industry professionals.",
  },
  "business.zero.carbon.park.title": {
    zh: "零碳园区",
    en: "0-Carbon Park",
  },
  "business.zero.carbon.park.subtitle": {
    zh: "零碳园区规划和建设解决方案，提供零碳园区和零碳工厂的完整解决方案，打造绿色低碳的产业园区生态系统。",
    en: "Zero-carbon park and factory planning solutions for green industrial ecosystems.",
  },

  // Footer content
  "footer.address.info": {
    zh: "浙江省宁波市鄞州区汇海路26号环领未来大楼",
    en: "No. 26 Huihai Road, Yinzhou District, Ningbo, Zhejiang Province, Huanling Future Building",
  },
  "footer.follow.subscription": {
    zh: "关注订阅号",
    en: "Follow Subscription",
  },
  "footer.product.carbon.footprint": {
    zh: "产品碳足迹",
    en: "Product Carbon Footprint",
  },
  "footer.cbam.accounting": {
    zh: "CBAM核算与申报",
    en: "CBAM Accounting & Declaration",
  },
  "footer.esg.disclosure": {
    zh: "ESG信息披露",
    en: "ESG Information Disclosure",
  },
  "footer.local.carbon.trading": {
    zh: "地方碳普惠交易",
    en: "Local Carbon Inclusive Trading",
  },
  "footer.enterprise.carbon.management": {
    zh: "企业碳资产管理",
    en: "Enterprise Carbon Asset Management",
  },
  "footer.energy.carbon.management.solution": {
    zh: "能碳管理系统解决方案",
    en: "Energy-Carbon Management System Solutions",
  },
  "footer.enterprise.carbon.management.solution": {
    zh: "企业碳管理一站式解决方案",
    en: "Enterprise Carbon Management One-Stop Solutions",
  },
  "footer.zero.carbon.park.solution": {
    zh: "零碳园区解决方案",
    en: "Zero Carbon Park Solutions",
  },
  "footer.zero.carbon.factory.solution": {
    zh: "零碳工厂解决方案",
    en: "Zero Carbon Factory Solutions",
  },
  "footer.dual.carbon.detection.solution": {
    zh: "双碳检测解决方案",
    en: "Dual-Carbon Detection Solutions",
  },
  "footer.carbon.accounting.solution": {
    zh: "碳核算解决方案",
    en: "Carbon Accounting Solutions",
  },
  "footer.policy.interpretation": {
    zh: "政策解读",
    en: "Policy Interpretation",
  },
  "footer.news.information": {
    zh: "新闻资讯",
    en: "News & Information",
  },
  "footer.institute.news": {
    zh: "本所动态",
    en: "Institute News",
  },
  "footer.announcements": {
    zh: "通知公告",
    en: "Announcements",
  },
  "footer.success.cases": {
    zh: "成功案例",
    en: "Success Cases",
  },
  "footer.institute.introduction": {
    zh: "本所介绍",
    en: "Institute Introduction",
  },
  "footer.cooperation.platform": {
    zh: "共建平台",
    en: "Cooperation Platform",
  },
  "footer.contact.us": {
    zh: "联系我们",
    en: "Contact Us",
  },
  "footer.friendship.links": {
    zh: "友情链接： 生态环境部",
    en: "Friendship Links: Ministry of Ecology and Environment",
  },
  "footer.copyright": {
    zh: "© 2025 ningbozhedong. All Rights Reserved.",
    en: "© 2025 ningbozhedong. All Rights Reserved.",
  },
  "footer.icp.record": {
    zh: "公安网备42010602001482号 ICP备13012389号-1",
    en: "Public Security Network Record 42010602001482 ICP Record 13012389-1",
  },
  "footer.logo.alt": {
    zh: "浙东 Logo",
    en: "Zhedong Logo",
  },

  // Solutions descriptions
  "solutions.energy.carbon.management.desc": {
    zh: "一体化能源和碳管理解决方案，实现能源利用效率最大化和碳排放最小化",
    en: "Integrated energy and carbon management solutions to maximize energy efficiency and minimize carbon emissions",
  },
  "solutions.zero.carbon.park.desc": {
    zh: "通过智能监测和碳排放优化，助力园区实现碳中和目标",
    en: "Through intelligent monitoring and carbon emission optimization, helping parks achieve carbon neutrality goals",
  },
  "solutions.zero.carbon.factory.desc": {
    zh: "智慧驱动零碳制造，打造绿色工厂转型一站式解决方案",
    en: "Intelligence-driven zero-carbon manufacturing, creating one-stop solutions for green factory transformation",
  },
  "solutions.enterprise.carbon.management.desc": {
    zh: "提供从碳核算、碳监测到碳交易的全流程服务，助力企业绿色转型",
    en: "Providing full-process services from carbon accounting, carbon monitoring to carbon trading, helping enterprises achieve green transformation",
  },
  "solutions.carbon.footprint.desc": {
    zh: "精确的碳排放计算和碳足迹追踪，实现碳数据透明化管理",
    en: "Accurate carbon emission calculation and carbon footprint tracking, achieving transparent carbon data management",
  },

  // Solutions titles
  "solutions.energy.carbon.management.title": {
    zh: "能碳管理系统(园区/工厂)解决方案",
    en: "Energy-Carbon Management System",
  },
  "solutions.zero.carbon.park.title": {
    zh: "零碳园区解决方案",
    en: "Zero Carbon Park Solutions",
  },
  "solutions.zero.carbon.factory.title": {
    zh: "零碳工厂解决方案",
    en: "Zero Carbon Factory Solutions",
  },
  "solutions.enterprise.carbon.management.title": {
    zh: "企业碳管理一站式解决方案",
    en: "Enterprise One-Stop Solutions",
  },
  "solutions.carbon.footprint.title": {
    zh: "碳核算/碳足迹解决方案",
    en: "Carbon Accounting/Footprint Solutions",
  },

  // News descriptions
  "news.policy.interpretation.desc": {
    zh: "深入解读国家及地方碳达峰碳中和相关政策法规，为企业提供政策指引",
    en: "Policy guidance for carbon peak and neutrality",
  },
  "news.institute.news.desc": {
    zh: "及时发布本所重要活动、业务进展及重大事项信息",
    en: "Latest institute activities and updates",
  },
  "news.announcements.desc": {
    zh: "发布本所各类通知公告，确保信息及时传达",
    en: "Official notices and announcements",
  },
  "news.news.information.desc": {
    zh: "汇集国内外碳市场最新动态，掌握行业发展趋势",
    en: "Latest carbon market news and trends",
  },
  "news.knowledge.column.desc": {
    zh: "分享碳市场专业知识，普及碳交易相关概念",
    en: "Carbon trading knowledge and insights",
  },

  // Solutions sidebar content
  "solutions.sidebar.title": {
    zh: "解决方案",
    en: "Solutions",
  },
  "solutions.sidebar.description": {
    zh: "全行业的解决方案，助力用户快速增长。",
    en: "Industry-wide solutions for rapid growth.",
  },

  // News sidebar content
  "news.sidebar.title": {
    zh: "资讯中心",
    en: "News Center",
  },
  "news.sidebar.description": {
    zh: "获取深度内容，了解最新动态。",
    en: "Get in-depth content and latest updates.",
  },
};

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(() => {
    // 从localStorage获取保存的语言设置，默认为中文
    const saved = localStorage.getItem("language") as Language;
    return saved || "zh";
  });

  // 翻译函数
  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key; // 如果没找到翻译，返回key本身
    }
    return translation[language];
  };

  // 设置语言并保存到localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  // 监听语言变化，可以在这里触发其他副作用
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// Hook for using language context
export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

// Hook for translation only (convenience hook)
export function useTranslation() {
  const { t } = useLanguage();
  return { t };
}
