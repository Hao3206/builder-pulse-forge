import { useState, useEffect } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import BusinessServices from "../components/BusinessServices";
import Solutions from "../components/Solutions";
import DataTransparency from "../components/DataTransparency";
import NewsResources from "../components/NewsResources";
import TrainingServices from "../components/TrainingServices";
import SuccessCases from "../components/SuccessCases";
import Partners from "../components/Partners";
import Footer from "../components/Footer";

export default function Index() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white font-inter">
      {/* Header */}
      <Header isScrolled={isScrolled} />

      {/* Hero Section */}
      <Hero />

      {/* Main Content Sections */}
      <BusinessServices />
      <Solutions />
      <DataTransparency />
      <NewsResources />
      <TrainingServices />
      <SuccessCases />
      <Partners />
      <Footer />
    </div>
  );
}
