import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import QueryProvider from "./providers/QueryProvider";
import { LanguageProvider } from "./hooks/useLanguage";
import ScrollToTop from "./components/ScrollToTop";
import SeoManager from "./components/SeoManager";

const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Solution = lazy(() => import("./pages/Solution"));
const ZeroCarbonPark = lazy(() => import("./pages/ZeroCarbonPark"));
const ZeroCarbonFactory = lazy(() => import("./pages/ZeroCarbonFactory"));
const CorporateCarbonManagement = lazy(
  () => import("./pages/CorporateCarbonManagement"),
);
const CarbonFootprint = lazy(() => import("./pages/CarbonFootprint"));
const LocalCarbonTrading = lazy(() => import("./pages/LocalCarbonTrading"));
const GreenCertificateTrading = lazy(
  () => import("./pages/GreenCertificateTrading"),
);
const EnterpriseCarbonAssetManagement = lazy(
  () => import("./pages/EnterpriseCarbonAssetManagement"),
);
const CEAVCarbonAccounting = lazy(() => import("./pages/CEAVCarbonAccounting"));
const CarbonNeutralityPlanning = lazy(
  () => import("./pages/CarbonNeutralityPlanning"),
);
const ESGDisclosure = lazy(() => import("./pages/ESGDisclosure"));
const CarbonStandardDevelopment = lazy(
  () => import("./pages/CarbonStandardDevelopment"),
);
const CarbonResearch = lazy(() => import("./pages/CarbonResearch"));
const CarbonFinanceSolution = lazy(
  () => import("./pages/CarbonFinanceSolution"),
);
const AdvancedCarbonTraining = lazy(
  () => import("./pages/AdvancedCarbonTraining"),
);
const CarbonTraderTraining = lazy(() => import("./pages/CarbonTraderTraining"));
const CarbonAdminTraining = lazy(() => import("./pages/CarbonAdminTraining"));
const IndustrySeminarsForums = lazy(
  () => import("./pages/IndustrySeminarsForums"),
);
const CustomTraining = lazy(() => import("./pages/CustomTraining"));
const NewsCenter = lazy(() => import("./pages/NewsCenter"));
const NewsDetail = lazy(() => import("./pages/NewsDetail"));
const SuccessCases = lazy(() => import("./pages/SuccessCases"));
const SuccessCaseDetail = lazy(() => import("./pages/SuccessCaseDetail"));
const ProductService = lazy(() => import("./pages/ProductService"));
const SearchResults = lazy(() => import("./pages/SearchResults"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminLayout = lazy(() => import("./components/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminNewsList = lazy(() => import("./pages/AdminNewsList"));
const AdminNewsEditor = lazy(() => import("./pages/AdminNewsEditor"));
const AdminContactMessages = lazy(() => import("./pages/AdminContactMessages"));
const AdminWechatConfig = lazy(() => import("./pages/AdminWechatConfig"));
const AdminWechatSync = lazy(() => import("./pages/AdminWechatSync"));

function RouteFallback() {
  return <div className="min-h-screen bg-white" aria-label="页面加载中" />;
}

function App() {
  return (
    <LanguageProvider>
      <QueryProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <SeoManager />
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/solution" element={<Solution />} />
                <Route path="/zero-carbon-park" element={<ZeroCarbonPark />} />
                <Route
                  path="/zero-carbon-factory"
                  element={<ZeroCarbonFactory />}
                />
                <Route
                  path="/corporate-carbon-management"
                  element={<CorporateCarbonManagement />}
                />
                <Route path="/carbon-footprint" element={<CarbonFootprint />} />
                <Route
                  path="/local-carbon-trading"
                  element={<LocalCarbonTrading />}
                />
                <Route
                  path="/green-certificate-trading"
                  element={<GreenCertificateTrading />}
                />
                <Route
                  path="/enterprise-carbon-asset-management"
                  element={<EnterpriseCarbonAssetManagement />}
                />
                <Route
                  path="/ceav-carbon-accounting"
                  element={<CEAVCarbonAccounting />}
                />
                <Route
                  path="/carbon-neutrality-planning"
                  element={<CarbonNeutralityPlanning />}
                />
                <Route path="/esg-disclosure" element={<ESGDisclosure />} />
                <Route
                  path="/carbon-standard-development"
                  element={<CarbonStandardDevelopment />}
                />
                <Route path="/carbon-research" element={<CarbonResearch />} />
                <Route
                  path="/carbon-finance-solution"
                  element={<CarbonFinanceSolution />}
                />
                <Route
                  path="/advanced-carbon-training"
                  element={<AdvancedCarbonTraining />}
                />
                <Route
                  path="/carbon-trader-training"
                  element={<CarbonTraderTraining />}
                />
                <Route
                  path="/carbon-admin-training"
                  element={<CarbonAdminTraining />}
                />
                <Route
                  path="/industry-seminars-forums"
                  element={<IndustrySeminarsForums />}
                />
                <Route path="/custom-training" element={<CustomTraining />} />
                <Route path="/news-center" element={<NewsCenter />} />
                <Route path="/news-detail/:id" element={<NewsDetail />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/success-cases" element={<SuccessCases />} />
                <Route
                  path="/success-cases/:id"
                  element={<SuccessCaseDetail />}
                />
                <Route
                  path="/product-service/:serviceId"
                  element={<ProductService />}
                />

                {/* 管理后台路由 */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="news" element={<AdminNewsList />} />
                  <Route path="news/create" element={<AdminNewsEditor />} />
                  <Route path="news/edit/:id" element={<AdminNewsEditor />} />
                  <Route path="contact-messages" element={<AdminContactMessages />} />
                  <Route path="wechat-config" element={<AdminWechatConfig />} />
                  <Route path="wechat-sync" element={<AdminWechatSync />} />
                </Route>

                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </QueryProvider>
    </LanguageProvider>
  );
}

export default App;

createRoot(document.getElementById("root")!).render(<App />);
