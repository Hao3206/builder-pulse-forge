import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const carouselData = [
  {
    id: 1,
    image: "/banner-3.jpg",
    title: "绿色工厂从这里开始",
    subtitle: "打造零碳、智能、透明的能碳管理系统",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1920&h=1080&fit=crop",
    title: "智慧能源管理平台助力企业降本增效",
    subtitle: "通过数字化手段实现能源监测与优化管理",
  },
  {
    id: 3,
    image: "/banner-1.jpg",
    title: "碳资产管理系统引领绿色发展新时代",
    subtitle: "专业的碳排放监测与交易管理解决方案",
  },
  {
    id: 4,
    image: "/banner-4.jpg",
    title: "构建零碳园区生态系统",
    subtitle: "打造可持续发展的智慧园区管理平台",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

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
