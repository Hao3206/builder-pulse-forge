import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Solution() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white font-inter">
      {/* Sticky Header */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-lg" : "bg-transparent"
        }`}
      >
        <Header isScrolled={isScrolled} />
      </div>

      {/* Hero Section */}
      <section className="relative w-full h-[518px] bg-white">
        {/* Background Layers */}
        <div className="absolute inset-0">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#155B75] to-[#088AB2]" />
          {/* Background Image with multiply blend */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://api.builder.io/api/v1/image/assets/TEMP/8a78814ba839293dd723ad68882b975c1a9dfbf2?width=2880')",
              mixBlendMode: "multiply",
            }}
          />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 flex flex-col justify-center items-center w-full h-full px-[30px] pt-20 pb-[92px]">
          <div className="flex w-[640px] flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-12 w-full">
              <div className="flex flex-col items-center gap-6 w-full">
                <h1 className="text-[#F9F9F9] text-center font-inter text-[52px] font-bold leading-[60px] tracking-[-0.52px] w-full">
                  绿色工厂从这里开始
                </h1>
                <h2 className="text-[#F9F9F9] text-center font-inter text-[30px] font-bold leading-[26px] tracking-[-0.1px] w-full">
                  打造零碳、智能、透明的能碳管理系统
                </h2>
                <p className="text-[#F9F9F9] text-center font-inter text-lg font-normal leading-[26px] tracking-[-0.1px] w-full">
                  全面赋能工厂实现能碳精益管理，助力双碳目标落地
                </p>
              </div>
              <div className="flex items-start gap-4">
                <button className="flex w-[142px] py-3 px-[18px] justify-center items-center gap-1.5 rounded-full bg-[#058A65] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.04)]">
                  <span className="text-white font-inter text-[15px] font-bold leading-[22px]">
                    立即了解系统
                  </span>
                </button>
                <button className="flex py-3 px-[18px] justify-center items-center gap-1.5 rounded-full bg-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.04)]">
                  <span className="text-[#058A65] font-inter text-[15px] font-bold leading-[22px]">
                    获取解决方案
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* System Introduction Section */}
      <section className="w-full h-[560px] py-[100px] px-[112px] flex flex-col justify-center items-center gap-16 bg-white">
        <div className="flex h-[520px] items-center gap-12 w-full">
          <img
            src="/system-interface.png"
            className="w-[520px] h-[560px] rounded-[20px] border-2 border-[#E5E5E7] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.04)]"
            alt="系统界面展示"
          />
          <div className="flex w-[528px] flex-col items-start gap-10">
            <div className="flex flex-col items-start gap-6 w-full">
              <div className="flex flex-col items-start gap-3 w-full">
                <div className="flex flex-col items-start gap-[30px] w-full">
                  <h2 className="text-[#333] font-inter text-[32px] font-bold leading-10 tracking-[-0.48px] w-full">
                    什么是能碳精益管理系统？
                  </h2>
                  <div className="flex flex-col items-start gap-3 w-full">
                    <p className="text-[#666] font-inter text-base font-normal leading-6 tracking-[-0.16px] w-full">
                      能碳精益管理系统是集能源监测、碳排管控、设备运维、能效分析、
                      <br />
                      碳足迹核算为一体的综合管理平台，
                      帮助工厂实现节能降碳、数据透明、
                      <br />
                      管理高效的目标，满足绿色工厂与碳中和的高质量发展要求。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/0e424b9275c5b7045d9db2a849a30d1ab0838de4?width=840"
            className="w-[420px] h-[420px] absolute right-[50px] top-[50px]"
            alt="系统功能图示"
          /> */}
        </div>
      </section>

      {/* Core Functions Section */}
      <section className="w-full py-[88px] px-[112px] flex flex-col justify-center items-center gap-16 bg-[#058A65]">
        <div className="flex max-w-[1280px] flex-col justify-center items-center gap-3 w-full">
          <div className="flex w-[800px] flex-col justify-center items-center gap-2">
            <div className="flex flex-col items-center gap-4 w-full">
              <h2 className="text-white text-center font-inter text-[32px] font-bold leading-10 tracking-[-0.48px] w-full">
                核心功能
              </h2>
              <p className="text-white text-center font-inter text-lg font-normal leading-6 tracking-[-0.16px] w-full">
                能源实时监测
                <br />
                <span className="text-base">
                  多级用能结构数据采集，秒级更新，远程抄表
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-[60px] w-full">
          <div className="grid grid-cols-5 gap-[22px] w-full h-[372px]">
            {/* Function Card 1 */}
            <div className="flex w-[226px] h-[372px] py-[30px] px-6 flex-col items-start gap-24 rounded-[10px] bg-white">
              <div className="flex flex-col items-start gap-[22px] w-full">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/d2db6ad5d0da395d99bab47f4c2bec87655a8f5e?width=96"
                  className="w-12 h-12 rounded-[10px]"
                  alt="碳排放核算图标"
                />
                <div className="flex flex-col items-start gap-4 w-full">
                  <h3 className="text-[#333] font-inter text-[22px] font-bold leading-[30px] tracking-[-0.22px] w-full">
                    碳排放核算与盘查
                  </h3>
                  <p className="text-[#666] font-inter text-base font-normal leading-6 tracking-[-0.16px] w-full">
                    自动汇总企业各类能源消耗并换算为CO₂排放，形成碳排放清单
                  </p>
                </div>
              </div>
            </div>

            {/* Function Card 2 */}
            <div className="flex w-[226px] h-[372px] py-[30px] px-6 flex-col items-start gap-12 rounded-[10px] bg-white">
              <div className="flex flex-col items-start gap-[22px] w-full">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/2187b3725cf410bfbd1b1a2417ed91588441dc76?width=96"
                  className="w-12 h-12 rounded-[10px]"
                  alt="能耗数据分析图标"
                />
                <div className="flex flex-col items-start gap-4 w-full">
                  <h3 className="text-[#333] font-inter text-[22px] font-bold leading-[30px] tracking-[-0.22px] w-[133px]">
                    能耗数据分析
                  </h3>
                  <p className="text-[#666] font-inter text-base font-normal leading-6 tracking-[-0.16px] w-full">
                    对水、电、气等能耗进行多维度统计与对比分析，找出高耗能环节；帮助优化用能结构
                  </p>
                </div>
              </div>
            </div>

            {/* Function Card 3 */}
            <div className="flex w-[226px] h-[372px] py-[30px] px-6 flex-col items-start gap-6 rounded-[10px] bg-white">
              <div className="flex flex-col items-start gap-[22px] w-full">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/ec1efe7d297c441e1f1e2354f7f955f54315c38a?width=96"
                  className="w-12 h-12 rounded-[10px]"
                  alt="预测与预警图���"
                />
                <div className="flex flex-col items-start gap-2.5 w-full">
                  <h3 className="text-[#333] font-inter text-[22px] font-bold leading-[30px] tracking-[-0.22px] w-[133px]">
                    预测与预警
                  </h3>
                  <p className="text-[#666] font-inter text-base font-normal leading-6 tracking-[-0.16px] w-full">
                    通过模型预测未来一定周期内的能耗与碳排放趋势；设置阈值生成异常告警，及时发现峰值、泄漏等能源浪费情况
                  </p>
                </div>
              </div>
            </div>

            {/* Function Card 4 */}
            <div className="flex w-[226px] h-[372px] py-[30px] px-6 flex-col items-start gap-[70px] rounded-[10px] bg-white">
              <div className="flex flex-col items-start gap-[22px] w-full">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/fd5b7d429082bff85f67b02a47c93ee026ceb8f7?width=96"
                  className="w-12 h-12 rounded-[10px]"
                  alt="减排模拟图标"
                />
                <div className="flex flex-col items-start gap-4 w-full">
                  <h3 className="text-[#333] font-inter text-[22px] font-bold leading-[30px] tracking-[-0.22px] w-full">
                    减排模拟与规划
                  </h3>
                  <p className="text-[#666] font-inter text-base font-normal leading-6 tracking-[-0.16px] w-full">
                    基于能源碳排放数据，模拟不同减排策略效果(如设备更新、工艺改进、能效提升等)，制定科学的技能减排路径规划
                  </p>
                </div>
              </div>
            </div>

            {/* Function Card 5 */}
            <div className="flex w-[226px] h-[372px] py-[30px] px-[26px] flex-col items-start gap-[70px] rounded-[10px] bg-white">
              <div className="flex flex-col items-start gap-[22px] w-full">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/3c11cc0a703f330b6e83b64266d790d9df22147a?width=96"
                  className="w-12 h-12 rounded-[10px]"
                  alt="决策支持图标"
                />
                <div className="flex flex-col items-start gap-4 w-full">
                  <h3 className="text-[#333] font-inter text-[22px] font-bold leading-[30px] tracking-[-0.22px] w-[174px]">
                    决策支持与报告
                  </h3>
                  <p className="text-[#666] font-inter text-base font-normal leading-6 tracking-[-0.16px] w-full">
                    生成可视化报表和仪表盘，直观展示节能降碳关键指标；内置碳足迹分析模型，支持碳排放方案论证；平台可对接政府策系统或碳交易平台，实现碳交易配额管理等服务
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* System Architecture Section */}
      <section className="w-full h-auto bg-white relative py-[88px]">
        <div className="flex max-w-[1280px] flex-col justify-center items-center gap-3 mx-auto px-[112px]">
          <div className="flex w-[800px] flex-col justify-center items-center gap-2">
            <div className="flex flex-col items-center gap-4 w-full">
              <h2 className="text-[#333] text-center font-inter text-[32px] font-bold leading-10 tracking-[-0.48px] w-full">
                平台系统架构
              </h2>
              <p className="text-[#858C95] text-center font-inter text-lg font-normal leading-[26px] tracking-[-0.18px] w-full">
                系统兼容MES、ERP、PLC等主流工业系统，通过智能网关实现多能源型数据融合，
                打造稳定、安全、高效的数据流通链。
              </p>
            </div>
          </div>
        </div>
        <div className="mt-16 flex justify-center">
          <img
            src="/system-architecture.png"
            alt="平台系统架构"
            className="max-w-full h-auto"
          />
        </div>
      </section>

      {/* Customer Success Section */}
      <section className="w-full py-[88px] px-[112px] flex flex-col justify-center items-center gap-16 bg-white">
        <div className="flex flex-col items-center gap-10 w-full">
          <div className="flex max-w-[1280px] flex-col justify-center items-center gap-3 w-full">
            <div className="flex w-[800px] flex-col justify-center items-center gap-2">
              <div className="flex flex-col items-center gap-4 w-full">
                <h2 className="text-[#333] text-center font-inter text-[32px] font-bold leading-10 tracking-[-0.48px] w-full">
                  客户成功实践
                </h2>
                <p className="text-[#858C95] text-center font-inter text-lg font-normal leading-[26px] tracking-[-0.18px] w-full">
                  某上市公司绿色工厂建设全过程
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-[22px] w-full">
          <div className="flex py-5 px-[90px] justify-center items-center gap-2.5 w-full rounded-[10px]">
            <div className="text-[#333] text-center font-inter text-lg font-medium leading-6 tracking-[-0.1px]">
              实现零碳工厂三阶段：
            </div>
            <div className="text-[#058A65] font-inter text-lg font-medium leading-6 tracking-[-0.1px]">
              ①
            </div>
            <div className="text-[#333] text-center font-inter text-lg font-medium leading-6 tracking-[-0.1px]">
              数字化建设
            </div>
            <svg
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.16675 10H15.0001M10.8334 5L15.2442 9.41074C15.5696 9.73618 15.5696 10.2638 15.2442 10.5893L10.8334 15"
                stroke="#058A65"
                strokeWidth="1.67"
                strokeLinecap="round"
              />
            </svg>
            <div className="text-[#058A65] font-inter text-lg font-medium leading-6 tracking-[-0.1px]">
              ②
            </div>
            <div className="text-[#333] text-center font-inter text-lg font-medium leading-6 tracking-[-0.1px]">
              优化改造
            </div>
            <svg
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.16675 10H15.0001M10.8334 5L15.2442 9.41074C15.5696 9.73618 15.5696 10.2638 15.2442 10.5893L10.8334 15"
                stroke="#058A65"
                strokeWidth="1.67"
                strokeLinecap="round"
              />
            </svg>
            <div className="text-[#058A65] font-inter text-lg font-medium leading-6 tracking-[-0.1px]">
              ③
            </div>
            <div className="text-[#333] text-center font-inter text-lg font-medium leading-6 tracking-[-0.1px]">
              全力降碳
            </div>
          </div>

          <div className="flex flex-col items-start gap-2.5 w-full">
            <div className="flex items-start gap-12 w-full">
              <div className="flex min-w-[280px] py-[30px] px-0 flex-col justify-center items-center gap-4 flex-1 rounded-[10px] bg-[#F7F8FA]">
                <div className="flex flex-col justify-center items-center gap-3 w-full">
                  <div className="text-[#058A65] text-center font-inter text-[30px] font-bold leading-10 tracking-[-0.45px] w-[373px]">
                    六个月
                  </div>
                  <div className="text-[#333] text-center font-inter text-base font-normal leading-6 tracking-[-0.16px] w-full">
                    成本回收期
                  </div>
                </div>
              </div>

              <div className="flex min-w-[280px] py-[30px] px-0 justify-center items-center gap-4 flex-1 rounded-[10px] bg-[#F7F8FA]">
                <div className="flex flex-col items-start gap-3 flex-1">
                  <div className="text-[#058A65] text-center font-inter text-[30px] font-bold leading-10 tracking-[-0.45px] w-full">
                    超百万
                  </div>
                  <div className="text-[#333] text-center font-inter text-base font-normal leading-6 tracking-[-0.16px] w-full">
                    年节省费用
                  </div>
                </div>
              </div>

              <div className="flex min-w-[280px] py-[30px] px-0 justify-center items-center gap-4 flex-1 rounded-[10px] bg-[#F7F8FA]">
                <div className="flex flex-col justify-center items-center gap-3 flex-1">
                  <div className="text-[#058A65] text-center font-inter text-[30px] font-bold leading-10 tracking-[-0.45px] w-full">
                    符合ISO50001
                  </div>
                  <div className="text-[#333] text-center font-inter text-base font-normal leading-6 tracking-[-0.16px] w-full">
                    符合认证，申报国家级绿色工厂
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="w-full py-[88px] flex flex-col justify-center items-center gap-16 bg-white">
        <div className="w-[1216px] px-8 flex flex-col justify-center items-center gap-3">
          <div className="flex w-[800px] flex-col justify-center items-center gap-2">
            <div className="flex flex-col items-center gap-4 w-full">
              <h2 className="text-[#333] text-center font-inter text-[32px] font-bold leading-10 tracking-[-0.64px] w-full">
                我们的优势
              </h2>
              <p className="text-[#858C95] text-center font-inter text-base font-normal leading-6 tracking-[-0.1px] w-full">
                优势的文案文字优势的文案文字优势的文案文字
              </p>
            </div>
          </div>
        </div>

        <div className="w-[1216px] flex flex-col items-start gap-8">
          <div className="flex items-start gap-8 w-full">
            {[
              {
                icon: "📊",
                title: "经验丰富",
                description: "深耕碳交易与节能服务超10年",
              },
              {
                icon: "🔔",
                title: "经验丰富",
                description: "深耕碳交易与节能服务超10年",
              },
              {
                icon: "💬",
                title: "经验丰富",
                description: "深耕碳交易与节能服务超10年",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex py-8 px-8 flex-col items-center gap-4 flex-1 rounded-md border border-[#EAEBF0] bg-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.04)]"
              >
                <div className="flex p-2 justify-center items-center rounded-[30px] bg-[#058A65]">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <div className="flex flex-col items-start gap-4 w-full">
                  <h3 className="text-[#333] text-center font-inter text-[22px] font-bold leading-[30px] tracking-[-0.22px] w-full">
                    {item.title}
                  </h3>
                  <p className="text-[#666] text-center font-inter text-base font-normal leading-6 tracking-[-0.1px] w-full">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="w-full h-[598px] bg-white relative">
        <div className="w-[1216px] px-8 flex flex-col justify-center items-center gap-3 absolute left-[112px] top-[88px] h-20">
          <div className="flex w-[800px] flex-col justify-center items-center gap-2">
            <div className="flex flex-col items-center gap-4 w-full">
              <h2 className="text-[#333] text-center font-inter text-[32px] font-bold leading-10 tracking-[-0.64px] w-full">
                案例标题文案
              </h2>
              <p className="text-[#858C95] text-center font-inter text-base font-normal leading-6 tracking-[-0.1px] w-full">
                ���成功实施的案例文案文案文案文案
              </p>
            </div>
          </div>
        </div>

        {/* Case Study Images */}
        <div className="w-[388px] h-[224px] absolute left-[112px] top-[239px]">
          <div className="w-[388px] h-[224px] rounded-[10px] bg-[#D9D9D9] absolute"></div>
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/a5a7491bf957bd8ca480e57dd9c04f41bc90e824?width=798"
            className="w-[399px] h-[224px] absolute left-[-6px] top-0"
            alt="案例图片1"
          />
        </div>

        <div className="w-[388px] h-[224px] absolute left-[526px] top-[239px]">
          <div className="w-[388px] h-[224px] rounded-[10px] bg-[#D9D9D9] absolute"></div>
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/4ba9d16fece065f0fbcc28a076415af2bb1b4bfb?width=798"
            className="w-[399px] h-[225px] absolute left-[-4px] top-0"
            alt="案例图片2"
          />
        </div>

        <div className="w-[388px] h-[224px] absolute left-[940px] top-[239px]">
          <div className="w-[388px] h-[224px] rounded-[10px] bg-[#D9D9D9] absolute"></div>
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/c83347a96312ed3c58ce15679a8db6ac1c1cf473?width=790"
            className="w-[395px] h-[224px] absolute left-[-4px] top-0"
            alt="案例图片3"
          />
        </div>

        {/* Case Study Titles */}
        <div className="text-[#333] text-center font-inter text-xl font-medium leading-normal tracking-[-0.4px] absolute left-[181px] top-[481px] w-[250px] h-6">
          xxxxx案例文案文案文案文案
        </div>
        <div className="text-[#333] font-inter text-xl font-medium leading-normal tracking-[-0.4px] absolute left-[605px] top-[481px] w-[230px] h-6">
          xxxxx案例文案文案文案文
        </div>
        <div className="text-[#333] text-center font-inter text-xl font-medium leading-normal tracking-[-0.4px] absolute left-[1019px] top-[481px] w-[230px] h-6">
          xxxxx案例文案文案文案文
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full h-[240px] relative">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/c3d8bbdfb00719bc52fa3a75698c8e12e1c784dc?width=2880"
          className="w-full h-[240px] object-cover"
          style={{ backgroundBlendMode: "multiply" }}
          alt="背景图"
        />
        <div className="flex w-[600px] flex-col items-center gap-2 absolute left-[420px] top-[46px] h-[148px]">
          <div className="h-[148px] w-full relative">
            <div className="flex w-[600px] flex-col items-start gap-[30px] absolute left-0 top-0 h-[148px]">
              <div className="flex flex-col justify-center items-center gap-1.5 w-full">
                <h2 className="text-[#333] text-center font-inter text-[32px] font-bold leading-[42px] tracking-[-0.32px] w-full">
                  打造绿色工厂从现在开始
                </h2>
                <p className="text-[#666] text-center font-inter text-base font-normal leading-6 tracking-[-0.1px] w-full">
                  欢迎预约系统演示，获取专属能碳管理解决方案
                </p>
              </div>
              <div className="flex justify-center items-center gap-4 w-full">
                <button className="flex w-[120px] py-3 px-[18px] justify-center items-center gap-1.5 rounded-full bg-white">
                  <span className="text-[#058A65] text-center font-inter text-[15px] font-bold leading-[22px]">
                    联系我们
                  </span>
                </button>
                <button className="flex w-[120px] py-3 px-[18px] justify-center items-center gap-1.5 rounded-full bg-[#058A65] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.04)]">
                  <span className="text-white text-center font-inter text-[15px] font-bold leading-[22px]">
                    立即预约
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
