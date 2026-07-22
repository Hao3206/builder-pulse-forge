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
      image: "/banner-green-factory.jpg",
      title: t("hero.slide1.title"),
      subtitle: t("hero.slide1.subtitle"),
    },
    {
      id: 2,
      image: "/assets/remote/unsplash-75b46f3ec0b75463.webp",
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
      image: "/banner-renewable-energy.webp",
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
      className="relative h-[680px] w-full overflow-hidden sm:h-[760px] xl:h-[min(820px,calc(100vh-24px))]"
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
              alt={slide.title}
              decoding="async"
              fetchPriority={index === 0 ? "high" : "low"}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        <h1 className="mb-4 max-w-[838px] font-inter text-[34px] font-black leading-[44px] text-neutral-200 transition-all duration-500 sm:text-[44px] sm:leading-[60px]">
          {carouselData[currentSlide].title}
        </h1>

        <p className="max-w-[502px] font-inter text-lg font-medium leading-8 text-neutral-200 transition-all duration-500 sm:text-[23px] sm:leading-[60px]">
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
              aria-label={`切换到第 ${index + 1} 张轮播图`}
              aria-current={index === currentSlide ? "true" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
