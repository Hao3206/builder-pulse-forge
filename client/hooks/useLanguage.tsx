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
    zh: "搜索资讯内容...",
    en: "Search news content...",
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
    zh: "0574-87310818",
    en: "0574-87310818",
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
    en: "Green/Low-Carbon Factory Creation",
  },
  "products.ceav.accounting": {
    zh: "CEAV产品碳排放核算与申报",
    en: "CEAV Product Carbon Emission Accounting & Declaration",
  },
  "products.carbon.neutral.planning": {
    zh: "碳达峰碳中和路径规划",
    en: "Carbon Peak & Neutrality Planning",
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
    en: "Energy-Carbon Management System (Park/Factory) Solutions",
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
    zh: "描述性小文字阐述文字文字描述性小文字阐述。",
    en: "Descriptive text content placeholder description.",
  },
  "common.solution.description": {
    zh: "解决方案描述性文字文案文案文案文案文案文案文案文案",
    en: "Solution description text content placeholder description.",
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
