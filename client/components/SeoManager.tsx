import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_NAME = "浙东环境能源交易所";
const SITE_URL = "https://www.zdeaee.com";
const DEFAULT_DESCRIPTION =
  "浙东环境能源交易所提供碳交易、碳咨询、碳资产管理、零碳园区、零碳工厂及碳培训等一站式双碳服务。";

const pageMeta: Record<string, { title: string; description: string }> = {
  "/": { title: SITE_NAME, description: DEFAULT_DESCRIPTION },
  "/about": {
    title: `关于我们 - ${SITE_NAME}`,
    description: "了解浙东环境能源交易所的发展历程、专业能力与服务体系。",
  },
  "/solution": {
    title: `双碳解决方案 - ${SITE_NAME}`,
    description:
      "面向政府、园区和企业提供碳核算、能碳管理、零碳建设与碳普惠解决方案。",
  },
  "/zero-carbon-park": {
    title: `零碳园区解决方案 - ${SITE_NAME}`,
    description: "提供园区碳核算、能源优化、减排路径规划及零碳园区建设服务。",
  },
  "/zero-carbon-factory": {
    title: `零碳工厂解决方案 - ${SITE_NAME}`,
    description: "帮助制造企业开展碳排放管理、节能降碳与零碳工厂创建。",
  },
  "/corporate-carbon-management": {
    title: `企业碳管理 - ${SITE_NAME}`,
    description: "覆盖碳核算、碳资产、履约与减排规划的企业碳管理服务。",
  },
  "/carbon-footprint": {
    title: `产品碳足迹 - ${SITE_NAME}`,
    description: "提供产品全生命周期碳足迹核算、认证辅导和供应链减碳服务。",
  },
  "/local-carbon-trading": {
    title: `地方碳普惠交易 - ${SITE_NAME}`,
    description: "提供碳普惠机制设计、平台建设、减排量开发与交易服务。",
  },
  "/green-certificate-trading": {
    title: `绿证绿电交易 - ${SITE_NAME}`,
    description: "提供绿色电力与绿色电力证书交易咨询及采购服务。",
  },
  "/enterprise-carbon-asset-management": {
    title: `企业碳资产管理 - ${SITE_NAME}`,
    description: "帮助企业开展碳配额、CCER及其他环境权益资产管理。",
  },
  "/ceav-carbon-accounting": {
    title: `CEA碳核算与履约 - ${SITE_NAME}`,
    description: "为全国碳市场重点排放单位提供碳核算、报告与履约支持。",
  },
  "/carbon-neutrality-planning": {
    title: `碳达峰碳中和规划 - ${SITE_NAME}`,
    description: "提供区域、园区和企业碳达峰碳中和路径研究与规划编制。",
  },
  "/esg-disclosure": {
    title: `ESG信息披露 - ${SITE_NAME}`,
    description: "提供ESG报告编制、信息披露、评级提升和管理体系建设服务。",
  },
  "/carbon-standard-development": {
    title: `双碳标准编制 - ${SITE_NAME}`,
    description: "提供双碳领域标准研究、编制、评审及应用推广服务。",
  },
  "/carbon-research": {
    title: `双碳课题研究 - ${SITE_NAME}`,
    description: "开展碳市场、绿色低碳与能源转型相关政策和课题研究。",
  },
  "/carbon-finance-solution": {
    title: `碳金融解决方案 - ${SITE_NAME}`,
    description: "围绕碳资产提供融资、交易和绿色金融创新服务。",
  },
  "/news-center": {
    title: `资讯中心 - ${SITE_NAME}`,
    description:
      "获取双碳政策、碳市场动态、行业资讯及浙东环境能源交易所最新消息。",
  },
  "/success-cases": {
    title: `成功案例 - ${SITE_NAME}`,
    description:
      "查看浙东环境能源交易所在碳管理、零碳建设和绿色交易领域的实践案例。",
  },
  "/advanced-carbon-training": {
    title: `双碳战略规划高级研修班 - ${SITE_NAME}`,
    description:
      "面向企业管理者及双碳从业人员提供碳达峰碳中和战略规划高级研修课程。",
  },
  "/carbon-trader-training": {
    title: `碳排放交易员培训 - ${SITE_NAME}`,
    description: "提供碳市场政策、配额管理、碳资产交易及实务操作培训。",
  },
  "/carbon-admin-training": {
    title: `碳排放管理员培训 - ${SITE_NAME}`,
    description: "提供企业碳核算、碳排放管理、履约及减排实践培训。",
  },
  "/industry-seminars-forums": {
    title: `双碳行业专题讲座与论坛 - ${SITE_NAME}`,
    description: "承办双碳、绿色能源与碳市场主题讲座、研讨会及行业论坛。",
  },
  "/custom-training": {
    title: `双碳定制培训 - ${SITE_NAME}`,
    description: "根据企业行业、岗位和业务场景提供定制化双碳培训服务。",
  },
};

const productTitles: Record<string, string> = {
  "green-low-carbon-factory": "绿色低碳工厂",
  "regional-carbon-brain": "区域双碳大脑",
  "personal-carbon-account": "个人碳账户",
  "green-trade-platform": "绿色贸易平台",
  "carbon-footprint-accounting": "产品碳足迹核算",
  "carbon-trader-training": "碳排放交易员培训",
  "carbon-admin-training": "碳排放管理员培训",
  "industry-seminars-forums": "行业专题讲座与论坛",
  "custom-training": "定制化培训",
  "advanced-carbon-training": "双碳高级研修",
};

const adminTitles: Record<string, string> = {
  "/admin": "管理仪表板",
  "/admin/dashboard": "管理仪表板",
  "/admin/news": "资讯管理",
  "/admin/news/create": "新建资讯",
  "/admin/contact-messages": "留言管理",
  "/admin/wechat-config": "微信配置",
  "/admin/wechat-sync": "公众号采集",
  "/admin/login": "管理后台登录",
};

function setMeta(name: string, content: string, property = false) {
  const selector = property
    ? `meta[property="${name}"]`
    : `meta[name="${name}"]`;
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(property ? "property" : "name", name);
    document.head.appendChild(element);
  }
  element.content = content;
}

export default function SeoManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    const isPrivate = pathname.startsWith("/admin") || pathname === "/search";
    const isNewsDetail = pathname.startsWith("/news-detail/");
    const isCaseDetail = pathname.startsWith("/success-cases/");
    const productId = pathname.startsWith("/product-service/")
      ? pathname.split("/")[2]
      : "";
    const productTitle = productTitles[productId];
    const adminTitle = pathname.startsWith("/admin/news/edit/")
      ? "编辑资讯"
      : adminTitles[pathname];
    const meta = pageMeta[pathname] || {
      title: adminTitle
        ? `${adminTitle} - ${SITE_NAME}`
        : productTitle
          ? `${productTitle} - ${SITE_NAME}`
          : isNewsDetail
            ? `资讯详情 - ${SITE_NAME}`
            : isCaseDetail
              ? `案例详情 - ${SITE_NAME}`
              : SITE_NAME,
      description: DEFAULT_DESCRIPTION,
    };
    const canonicalUrl = `${SITE_URL}${pathname === "/" ? "" : pathname}`;

    document.title = meta.title;
    document.documentElement.lang = "zh-CN";
    setMeta("description", meta.description);
    setMeta("robots", isPrivate ? "noindex,nofollow" : "index,follow");
    setMeta("og:title", meta.title, true);
    setMeta("og:description", meta.description, true);
    setMeta("og:type", isNewsDetail ? "article" : "website", true);
    setMeta("og:url", canonicalUrl, true);
    setMeta("og:image", `${SITE_URL}/banner-1.jpg`, true);
    setMeta("og:site_name", SITE_NAME, true);
    setMeta("og:locale", "zh_CN", true);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", meta.title);
    setMeta("twitter:description", meta.description);
    setMeta("twitter:image", `${SITE_URL}/banner-1.jpg`);

    let canonical = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    let structuredData = document.head.querySelector<HTMLScriptElement>(
      'script[data-seo-structured-data="organization"]',
    );
    if (!structuredData) {
      structuredData = document.createElement("script");
      structuredData.type = "application/ld+json";
      structuredData.dataset.seoStructuredData = "organization";
      document.head.appendChild(structuredData);
    }
    structuredData.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.png`,
      telephone: "18969889828",
    });
  }, [pathname]);

  return null;
}
