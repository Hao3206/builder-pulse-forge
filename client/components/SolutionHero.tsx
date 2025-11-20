import React from "react";

interface SolutionHeroProps {
  tag: string;
  title: string;
  description: string;
  primaryText?: string;
  primaryHref?: string;
  secondaryText?: string;
  secondaryHref?: string;
  backgroundImage?: string;
  heightClass?: string;
}

const SolutionHero: React.FC<SolutionHeroProps> = ({
  tag,
  title,
  description,
  primaryText = "立即咨询",
  primaryHref = "#contact",
  secondaryText,
  secondaryHref,
  backgroundImage = "/banner-1.jpg",
  heightClass = "h-[520px]",
}) => {
  return (
    <section className={`relative w-full ${heightClass} bg-white`}>
      <div className="absolute inset-0">
        <div className="w-full h-full bg-gradient-to-r from-[#155B75] to-[#088AB2]" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${backgroundImage}')`,
            backgroundBlendMode: "multiply",
          }}
        />
      </div>
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 flex items-center justify-center h-full pt-[88px] px-4">
        <div className="max-w-[720px] text-center px-4">
          <div className="inline-block px-4 py-2 bg-[#058A65] rounded-full text-sm font-medium text-white mb-4">
            {tag}
          </div>
          <h1 className="text-[52px] font-bold leading-[60px] text-white mb-6 tracking-[-0.52px]">
            {title}
          </h1>
          <p className="text-lg text-white/90 mb-10 tracking-[-0.1px]">{description}</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href={primaryHref}
              className="bg-[#058A65] text-white px-6 py-3 rounded-full font-semibold text-[15px] shadow-sm transition-colors hover:bg-[#046B52]"
            >
              {primaryText}
            </a>
            {secondaryText && secondaryHref ? (
              <a
                href={secondaryHref}
                className="bg-white/10 backdrop-blur text-white px-6 py-3 rounded-full font-semibold text-[15px] border border-white/30 transition-colors hover:bg-white/20"
              >
                {secondaryText}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionHero;


