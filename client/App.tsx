import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import QueryProvider from "./providers/QueryProvider";
import Index from "./pages/Index";
import About from "./pages/About";
import Solution from "./pages/Solution";
import CarbonFootprint from "./pages/CarbonFootprint";
import NewsCenter from "./pages/NewsCenter";
import NewsDetail from "./pages/NewsDetail";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

const App = () => (
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
          <Route path="/carbon-footprint" element={<CarbonFootprint />} />
          <Route path="/news-center" element={<NewsCenter />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
