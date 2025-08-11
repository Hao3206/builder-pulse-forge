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
import NewsCenter from "./pages/NewsCenter";
import NewsDetail from "./pages/NewsDetail";
import SuccessCases from "./pages/SuccessCases";
import SuccessCaseDetail from "./pages/SuccessCaseDetail";
import ProductService from "./pages/ProductService";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

// 管理后台页面
import AdminLogin from "./pages/AdminLogin";
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminNewsList from "./pages/AdminNewsList";
import AdminNewsEditor from "./pages/AdminNewsEditor";
import AdminContactMessages from "./pages/AdminContactMessages";

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
              path="/corporate-carbon-management"
              element={<CorporateCarbonManagement />}
            />
            <Route path="/carbon-footprint" element={<CarbonFootprint />} />
            <Route path="/news-center" element={<NewsCenter />} />
            <Route path="/news-detail/:id" element={<NewsDetail />} />
            <Route path="/success-cases" element={<SuccessCases />} />
            <Route path="/success-cases/:id" element={<SuccessCaseDetail />} />
            <Route
              path="/product-service/:serviceId"
              element={<ProductService />}
            />

            {/* 管理后台路由 */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/contact-messages" element={<AdminContactMessages />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="news" element={<AdminNewsList />} />
              <Route path="news/create" element={<AdminNewsEditor />} />
              <Route path="news/edit/:id" element={<AdminNewsEditor />} />
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
