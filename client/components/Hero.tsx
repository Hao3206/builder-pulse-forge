import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { t } = useLanguage();

  const carouselData = [
    {
      id: 1,
      image: "/banner-3.jpg",
      title: t("hero.slide1.title"),
      subtitle: t("hero.slide1.subtitle"),
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1920&h=1080&fit=crop",
      title: t("hero.slide2.title"),
      subtitle: t("hero.slide2.subtitle"),
    },
    {
      id: 3,
      image: "/banner-1.jpg",
      title: t("hero.slide3.title"),
      subtitle: t("hero.slide3.subtitle"),
    },
    {
      id: 4,
      image: "/banner-4.jpg",
      title: t("hero.slide4.title"),
      subtitle: t("hero.slide4.subtitle"),
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselData.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselData.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselData.length) % carouselData.length,
    );
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section
      className="relative w-full h-[950px] overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Carousel Images */}
      <div className="absolute inset-0">
        {carouselData.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        <h1 className="text-neutral-200 font-inter text-[44px] font-black leading-[60px] tracking-[-0.44px] mb-4 max-w-[838px] transition-all duration-500">
          {carouselData[currentSlide].title}
        </h1>

        <p className="text-neutral-200 font-inter text-[23px] font-medium leading-[60px] tracking-[-0.23px] max-w-[502px] transition-all duration-500">
          {carouselData[currentSlide].subtitle}
        </p>

        {/* Pagination Dots */}
        <div className="flex items-center gap-2 mt-16">
          {carouselData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-5 h-1 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white"
                  : "bg-white/30 hover:bg-white/50 border border-white/40"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
