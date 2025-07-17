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
  return (
    <div className="min-h-screen bg-white font-inter">
      {/* Header with transparent overlay on hero */}
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 z-20">
          <Header />
        </div>
        <Hero />
      </div>

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
