export default function Partners() {
  const partners = [
    {
      name: "Partner 1",
      logo: "https://api.builder.io/api/v1/image/assets/TEMP/eef957b9486d49e9c686d9c5a49cb83a46f7a7b1?width=188",
    },
    {
      name: "Partner 2",
      logo: "https://api.builder.io/api/v1/image/assets/TEMP/2e5ad7cbd5dd0b36170c3dbaddfe6635d3c3ee7e?width=392",
    },
    {
      name: "Partner 3",
      logo: "https://api.builder.io/api/v1/image/assets/TEMP/dd72107f2c7f04de16143aebbf428df803828d5b?width=272",
    },
    {
      name: "Partner 4",
      logo: "https://api.builder.io/api/v1/image/assets/TEMP/3c2bc917980d9f0ca8c8feb4aece04e0a2c3dfb9?width=292",
    },
    {
      name: "Partner 5",
      logo: "https://api.builder.io/api/v1/image/assets/TEMP/e961341dd5adba510feb62b820a9a610b61a7517?width=280",
    },
    {
      name: "Partner 6",
      logo: "https://api.builder.io/api/v1/image/assets/TEMP/91fa2a6428fa2408e63fbfa315e71334901b0c76?width=312",
    },
  ];

  const partnersRow2 = [
    {
      name: "Partner 7",
      logo: "https://api.builder.io/api/v1/image/assets/TEMP/d0441d3eaeff4aac8ccb9cd5ceca83aef0dfe3ca?width=164",
    },
    {
      name: "Partner 8",
      logo: "https://api.builder.io/api/v1/image/assets/TEMP/777a4824371d65555d3c1813d665c07088353ec5?width=316",
    },
    {
      name: "Partner 9",
      logo: "https://api.builder.io/api/v1/image/assets/TEMP/f7d66ae42b78d07489b73bb5185c5216848a11b4?width=180",
    },
    {
      name: "Partner 10",
      logo: null, // SVG component will be used
    },
    {
      name: "Partner 11",
      logo: "https://api.builder.io/api/v1/image/assets/TEMP/8dec302d08ea62eea8ece1b9695e8c59ab466212?width=264",
    },
    {
      name: "Partner 12",
      logo: "https://api.builder.io/api/v1/image/assets/TEMP/78db10919a6ed0f4424b14d3415224085c22defb?width=160",
    },
  ];

  return (
    <section className="bg-brand-green-50 py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          {/* Decorative Lines */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex-1 h-px bg-black/14 max-w-[460px]" />
            <h2 className="px-8 text-[#333] text-opacity-86 font-inter text-[28px] font-semibold leading-normal tracking-[-0.1px]">
              更多合作伙伴
            </h2>
            <div className="flex-1 h-px bg-black/14 max-w-[460px]" />
          </div>
        </div>

        {/* Partners Grid */}
        <div className="space-y-2">
          {/* First Row */}
          <div className="flex gap-2">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex-1 h-[120px] bg-white rounded-md flex items-center justify-center p-6"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ))}
          </div>

          {/* Second Row */}
          <div className="flex gap-2">
            {partnersRow2.map((partner, index) => (
              <div
                key={index}
                className="flex-1 h-[120px] bg-white rounded-md flex items-center justify-center p-6"
              >
                {index === 3 ? (
                  // Special SVG for Partner 10
                  <svg
                    width="44"
                    height="28"
                    viewBox="0 0 44 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7"
                  >
                    <g clipPath="url(#clip0_213_1616)">
                      <path
                        d="M8.69474 8.74568C7.01854 8.75466 5.37818 9.25096 3.95906 10.1785V0H0V27.5593H2.33305L2.9729 26.089C4.52773 27.2649 6.3321 28.0017 8.69874 28.0017C13.8583 28.0017 15.7667 24.4001 15.7667 18.3745C15.7667 12.3872 13.8583 8.74735 8.69874 8.74735M7.77976 12.24C11.2429 12.24 11.7732 14.9958 11.7732 18.377C11.7732 21.7948 11.2429 24.5132 7.77976 24.5132C5.9066 24.5132 4.6693 23.8479 3.96306 23.448V13.3027C4.6693 12.8986 5.9066 12.2375 7.77976 12.2375M20.7751 14.4827C20.7751 12.8296 22.082 12.205 24.1671 12.205C26.3938 12.205 28.055 12.6458 29.5746 13.2329V9.66375C28.1965 9.03923 26.4993 8.74901 24.0967 8.74901C18.8979 8.74901 16.9224 11.4308 16.9224 14.5908C16.9224 17.7508 18.2261 19.4747 23.5648 19.9495C25.9331 20.1699 26.4977 20.8684 26.4977 22.2289C26.4977 23.8446 25.1197 24.5065 22.2923 24.5065C20.0665 24.5065 18.1925 23.9186 17.0264 23.4779V27.0054C18.2261 27.5193 20.4192 27.9975 22.8578 27.9975C28.5125 27.9975 30.3856 25.2417 30.3856 22.0817C30.3856 18.6639 29.0075 17.0091 23.7064 16.5326C21.4093 16.3122 20.7735 15.7609 20.7735 14.4752M36.6601 27.8154C36.9208 27.8147 37.1809 27.7905 37.4375 27.743V24.3984C36.3066 24.3984 35.9531 24.0309 35.9531 23.0022V9.18559H31.9956V23.0388C31.9956 26.1988 33.4441 27.8154 36.6601 27.8154ZM31.3942 3.74791C31.3942 4.2785 31.5455 4.79716 31.829 5.23832C32.1125 5.67948 32.5155 6.02333 32.987 6.22637C33.4584 6.42942 33.9772 6.48254 34.4777 6.37903C34.9782 6.27552 35.438 6.02002 35.7988 5.64484C36.1597 5.26967 36.4054 4.79166 36.505 4.27128C36.6045 3.75089 36.5534 3.2115 36.3582 2.7213C36.1629 2.23111 35.8322 1.81213 35.4078 1.51736C34.9835 1.22258 34.4847 1.06525 33.9744 1.06525C33.2912 1.06896 32.637 1.35279 32.1538 1.85509C31.6707 2.35738 31.3978 3.03757 31.3942 3.74791Z"
                        fill="#333333"
                      />
                      <path
                        d="M38.8412 25.3176C38.8411 25.8482 38.9923 26.367 39.2758 26.8083C39.5592 27.2496 39.9622 27.5936 40.4337 27.7967C40.9052 27.9999 41.424 28.0531 41.9246 27.9496C42.4252 27.8461 42.885 27.5906 43.2459 27.2153C43.6068 26.8401 43.8526 26.362 43.9521 25.8416C44.0516 25.3211 44.0005 24.7816 43.8051 24.2914C43.6097 23.8012 43.2788 23.3822 42.8544 23.0875C42.43 22.7928 41.931 22.6356 41.4206 22.6357C40.7378 22.6401 40.0842 22.9241 39.6014 23.4261C39.1185 23.9281 38.8454 24.6077 38.8412 25.3176Z"
                        fill="#D0121B"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_213_1616">
                        <rect width="44" height="28" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                ) : (
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
