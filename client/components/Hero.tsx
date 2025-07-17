export default function Hero() {
  return (
    <section className="relative w-full h-[810px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/388fe73d1c5aa72a1f2ad99dbc8cdb91c9c0e3ef?width=3872"
          alt="Mountain landscape background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        <h1 className="text-neutral-200 font-inter text-[44px] font-black leading-[60px] tracking-[-0.44px] mb-4 max-w-[838px]">
          万泽时代作为国内新一代创新型数字创新
        </h1>

        <p className="text-neutral-200 font-inter text-[23px] font-medium leading-[60px] tracking-[-0.23px] max-w-[502px]">
          围绕企业双碳数字化转型为能源企业提供解决方案
        </p>

        {/* Pagination Dots */}
        <div className="flex items-center gap-2 mt-16">
          <div className="w-5 h-1 bg-white rounded-full" />
          <div className="w-5 h-1 bg-white/52 rounded-full" />
          <div className="w-5 h-1 bg-white/52 rounded-full" />
          <div className="w-5 h-1 bg-white/52 rounded-full" />
        </div>
      </div>
    </section>
  );
}
