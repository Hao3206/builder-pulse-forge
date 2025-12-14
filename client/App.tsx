import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import QueryProvider from "./providers/QueryProvider";
import { LanguageProvider } from "./hooks/useLanguage";
import Index from "./pages/Index";
import About from "./pages/About";
import Solution from "./pages/Solution";
import ZeroCarbonPark from "./pages/ZeroCarbonPark";
import ZeroCarbonFactory from "./pages/ZeroCarbonFactory";
import CorporateCarbonManagement from "./pages/CorporateCarbonManagement";
import CarbonFootprint from "./pages/CarbonFootprint";
import LocalCarbonTrading from "./pages/LocalCarbonTrading";
import GreenCertificateTrading from "./pages/GreenCertificateTrading";
import EnterpriseCarbonAssetManagement from "./pages/EnterpriseCarbonAssetManagement";
import CEAVCarbonAccounting from "./pages/CEAVCarbonAccounting";
import CarbonNeutralityPlanning from "./pages/CarbonNeutralityPlanning";
import ESGDisclosure from "./pages/ESGDisclosure";
import CarbonStandardDevelopment from "./pages/CarbonStandardDevelopment";
import CarbonResearch from "./pages/CarbonResearch";
import CarbonFinanceSolution from "./pages/CarbonFinanceSolution";
import AdvancedCarbonTraining from "./pages/AdvancedCarbonTraining";
import CarbonTraderTraining from "./pages/CarbonTraderTraining";
import CarbonAdminTraining from "./pages/CarbonAdminTraining";
import IndustrySeminarsForums from "./pages/IndustrySeminarsForums";
import CustomTraining from "./pages/CustomTraining";
import NewsCenter from "./pages/NewsCenter";
import NewsDetail from "./pages/NewsDetail";
import SuccessCases from "./pages/SuccessCases";
import SuccessCaseDetail from "./pages/SuccessCaseDetail";
import ProductService from "./pages/ProductService";
import SearchResults from "./pages/SearchResults";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

// 管理后台页面
import AdminLogin from "./pages/AdminLogin";
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminNewsList from "./pages/AdminNewsList";
import AdminNewsEditor from "./pages/AdminNewsEditor";
import AdminContactMessages from "./pages/AdminContactMessages";
import AdminWechatConfig from "./pages/AdminWechatConfig";
import AdminWechatSync from "./pages/AdminWechatSync";

const App = () => (
  <LanguageProvider>
    <QueryProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
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
            <Route path="/success-cases/:id" element={<SuccessCaseDetail />} />
            <Route
              path="/product-service/:serviceId"
              element={<ProductService />}
            />

            {/* 管理后台路由 */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/contact-messages"
              element={<AdminContactMessages />}
            />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="news" element={<AdminNewsList />} />
              <Route path="news/create" element={<AdminNewsEditor />} />
              <Route path="news/edit/:id" element={<AdminNewsEditor />} />
              <Route path="wechat-config" element={<AdminWechatConfig />} />
              <Route path="wechat-sync" element={<AdminWechatSync />} />
            </Route>

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryProvider>
  </LanguageProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
