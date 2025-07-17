import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Solution() {
  const [isScrolled, setIsScrolled] = useState(false);

  return (
    <div className="min-h-screen bg-white font-inter">
      {/* Sticky Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <Header isScrolled={isScrolled} />
      </div>

      {/* Hero Section */}
      <section className="relative w-full flex flex-col justify-center items-center bg-white pt-[88px]">
        {/* Background with gradient overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://api.builder.io/api/v1/image/assets/TEMP/8a78814ba839293dd723ad68882b975c1a9dfbf2?width=2880')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#155B75] to-[#088AB2] opacity-90" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-[1280px] py-20 px-8 flex flex-col justify-center items-center">
          <div className="w-[640px] flex flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-12 w-full">
              <div className="flex flex-col items-center gap-6 w-full">
                <h1 className="text-white text-center font-inter text-[52px] font-bold leading-[60px] tracking-[-0.52px] w-full">
                  绿色工厂从这里开始
                </h1>
                <h2 className="text-white text-center font-inter text-[30px] font-semibold leading-[26px] tracking-[-0.1px] w-full">
                  打造零碳、智能、透明的能碳管理系统
                </h2>
                <p className="text-white text-center font-inter text-lg font-normal leading-[26px] tracking-[-0.1px] w-full">
                  全面赋能工厂实现能碳精益管理，助力双碳目标落地
                </p>
              </div>
              <div className="flex items-start gap-4">
                <button className="flex w-[142px] py-3 px-[18px] justify-center items-center gap-1.5 rounded-full bg-[#058A65] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.04)]">
                  <span className="text-white font-inter text-[15px] font-semibold leading-[22px]">
                    立即了解系统
                  </span>
                </button>
                <button className="flex py-3 px-[18px] justify-center items-center gap-1.5 rounded-full bg-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.04)]">
                  <span className="text-[#058A65] font-inter text-[15px] font-semibold leading-[22px]">
                    获取解决方案
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is Energy Carbon Management System */}
      <section className="w-full h-[560px] py-[100px] px-28 flex flex-col justify-center items-center gap-16 bg-white">
        <div className="flex h-[520px] items-center gap-12 w-full">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/ad33659c33381eac40061641b81f19d65a13ad9f?width=1040"
            alt="Energy Carbon Management System"
            className="w-[520px] h-[560px] rounded-[20px] border-2 border-[#E5E5E7] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.04)]"
          />
          <div className="w-[528px] flex flex-col items-start gap-10">
            <div className="flex flex-col items-start gap-6 w-full">
              <div className="flex flex-col items-start gap-3 w-full">
                <div className="flex flex-col items-start gap-[30px] w-full">
                  <h2 className="text-[#333] font-inter text-[32px] font-bold leading-10 tracking-[-0.48px] w-full">
                    什么是能碳精益管理系统？
                  </h2>
                  <div className="flex flex-col items-start gap-3 w-full">
                    <div className="flex flex-col items-start gap-1.5 w-full">
                      <p className="text-[#666] font-inter text-base font-normal leading-6 tracking-[-0.16px] w-full">
                        能碳精益管理系统是集能源监测、碳排管控、设备运维、能效分析、
                        碳足迹核算为一体的综合管理平台，
                        帮助工厂实现节能降碳、数据透明、
                        管理高效的目标，满足绿色工厂与碳中和的高质量发展要求。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/0e424b9275c5b7045d9db2a849a30d1ab0838de4?width=840"
            alt="System Diagram"
            className="absolute w-[420px] h-[420px] right-[50px] top-[50px]"
          />
        </div>
      </section>

      {/* Core Functions */}
      <section className="w-full py-[88px] px-28 flex flex-col justify-center items-center gap-16 bg-[#058A65]">
        <div className="flex max-w-[1280px] flex-col justify-center items-center gap-3 w-full">
          <div className="flex w-[800px] flex-col justify-center items-center gap-2">
            <div className="flex flex-col items-center gap-4 w-full">
              <h2 className="text-white text-center font-inter text-[32px] font-bold leading-10 tracking-[-0.48px] w-full">
                核心功能
              </h2>
              <div className="text-white text-center font-inter text-lg font-normal leading-6 tracking-[-0.16px] w-full">
                <span className="text-lg">能源实时监测</span>
                <br />
                <span className="text-base">
                  多级用能结构数据采集，秒级更新，远程抄表
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-15 w-full">
          <div className="flex h-[372px] flex-col items-start gap-10 w-full">
            <div className="grid h-[373px] pb-px gap-[22px] w-full grid-cols-5 grid-rows-1">
              <div className="flex w-[226px] h-[372px] p-[30px_24px] flex-col items-start gap-24 rounded-[10px] bg-white">
                <div className="flex flex-col items-start gap-[22px] w-full">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/d2db6ad5d0da395d99bab47f4c2bec87655a8f5e?width=96"
                    alt="Carbon Accounting Icon"
                    className="flex w-12 h-12 justify-center items-center rounded-[10px]"
                  />
                  <div className="flex flex-col items-start gap-4 w-full">
                    <h3 className="h-[30px] text-[#333] font-inter text-[22px] font-bold leading-[30px] tracking-[-0.22px] w-full">
                      碳排放核算与盘查
                    </h3>
                    <p className="text-[#666] font-inter text-base font-normal leading-6 tracking-[-0.16px] w-full">
                      自动汇总企业各类能源消耗并换算为CO₂排放，形成碳排放清单
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex w-[226px] h-[372px] p-[30px_24px] flex-col items-start gap-12 rounded-[10px] bg-white">
                <div className="flex flex-col items-start gap-[22px] w-full">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/2187b3725cf410bfbd1b1a2417ed91588441dc76?width=96"
                    alt="Energy Analysis Icon"
                    className="flex w-12 h-12 justify-center items-center rounded-[10px]"
                  />
                  <div className="flex flex-col items-start gap-4 w-full">
                    <h3 className="w-[133px] h-7 text-[#333] font-inter text-[22px] font-bold leading-[30px] tracking-[-0.22px]">
                      能耗数据分析
                    </h3>
                    <p className="text-[#666] font-inter text-base font-normal leading-6 tracking-[-0.16px] w-full">
                      对水、电、气等能耗进行多维度统计与对比分析，找出高耗能环节；帮助优化用能结构
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex w-[226px] h-[372px] p-[30px_24px] flex-col items-start gap-6 rounded-[10px] bg-white">
                <div className="flex flex-col items-start gap-[22px] w-full">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/ec1efe7d297c441e1f1e2354f7f955f54315c38a?width=96"
                    alt="Prediction Icon"
                    className="flex justify-center items-center rounded-[10px]"
                  />
                  <div className="flex flex-col items-start gap-2.5 w-full">
                    <h3 className="w-[133px] h-7 text-[#333] font-inter text-[22px] font-bold leading-[30px] tracking-[-0.22px]">
                      预测与预警
                    </h3>
                    <p className="text-[#666] font-inter text-base font-normal leading-6 tracking-[-0.16px] w-full">
                      通过模型预测未来一定周期内的能耗与碳排放趋势；设置阈值生成异常告警，及时发现峰值、泄漏等能源浪费情况
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex w-[226px] h-[372px] p-[30px_24px] flex-col items-start gap-[70px]">
                <div className="flex flex-col items-start gap-[22px] w-full">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/fd5b7d429082bff85f67b02a47c93ee026ceb8f7?width=96"
                    alt="Emission Reduction Icon"
                    className="flex justify-center items-center rounded-[10px]"
                  />
                  <div className="flex flex-col items-start gap-4 w-full">
                    <h3 className="h-7 text-[#333] font-inter text-[22px] font-bold leading-[30px] tracking-[-0.22px] w-full">
                      减排模拟与规划
                    </h3>
                    <p className="text-[#666] font-inter text-base font-normal leading-6 tracking-[-0.16px] w-full">
                      基于能源碳排放数据，模拟不同减排策略效果(如设备更新、工艺改进、能效提升等)，制定科学的技能减排路径规划
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex w-[226px] h-[372px] p-[30px_26px] flex-col items-start gap-[70px] rounded-[10px] bg-white">
                <div className="flex flex-col items-start gap-[22px] w-full">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/3c11cc0a703f330b6e83b64266d790d9df22147a?width=96"
                    alt="Decision Support Icon"
                    className="flex justify-center items-center rounded-[10px]"
                  />
                  <div className="flex flex-col items-start gap-4 w-full">
                    <h3 className="w-[174px] h-7 text-[#333] font-inter text-[22px] font-bold leading-[30px] tracking-[-0.22px]">
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
        </div>
      </section>

      {/* Platform System Architecture */}
      <section className="w-full h-[840px] bg-white relative">
        <div className="w-[1216px] max-w-[1280px] flex flex-col justify-center items-center gap-3 absolute left-28 top-[88px] h-[108px]">
          <div className="flex w-[800px] flex-col justify-center items-center gap-2">
            <div className="flex flex-col items-center gap-4 w-full">
              <h2 className="text-[#333] text-center font-inter text-[32px] font-bold leading-10 tracking-[-0.48px] w-full">
                平台系统架构
              </h2>
              <p className="text-[#858C95] text-center font-inter text-lg font-normal leading-[26px] tracking-[-0.18px] w-full">
                系统兼容MES、ERP、PLC等主流工业系统，通过智能网关实现多能源类型数据融合，
                打造稳定、安全、高效的数据流通链。
              </p>
            </div>
          </div>
        </div>

        {/* System Architecture Diagram */}
        <div className="w-[1210px] h-[466px] absolute left-[115px] top-[286px]">
          {/* Left side labels */}
          <div className="absolute left-0 top-0 space-y-8">
            <div className="flex w-[120px] h-[54px] py-3.5 px-5 justify-center items-center rounded-md bg-[#058A65]">
              <span className="text-white text-center font-inter text-[15px] font-semibold leading-[26px] tracking-[-0.15px]">
                SaaS展示层
              </span>
            </div>
            <div className="flex w-[120px] h-[146px] py-3.5 px-5 justify-center items-center rounded-md bg-[#058A65]">
              <span className="text-white text-center font-inter text-[15px] font-semibold leading-[26px] tracking-[-0.15px]">
                业务应用平台
              </span>
            </div>
            <div className="flex w-[120px] h-[86px] py-3.5 px-5 justify-center items-center rounded-md bg-[#058A65]">
              <span className="text-white text-center font-inter text-[15px] font-semibold leading-[26px] tracking-[-0.15px]">
                数据与模型层
              </span>
            </div>
            <div className="flex w-[120px] h-[86px] py-3.5 px-5 justify-center items-center rounded-md bg-[#058A65]">
              <span className="text-white text-center font-inter text-[15px] font-semibold leading-[26px] tracking-[-0.15px]">
                loT基础设置
              </span>
            </div>
            <div className="flex w-[120px] h-[54px] py-3.5 px-5 justify-center items-center rounded-md bg-[#058A65]">
              <span className="text-white text-center font-inter text-[15px] font-semibold leading-[26px] tracking-[-0.15px]">
                数据采集
              </span>
            </div>
          </div>

          {/* Right side security */}
          <div className="absolute right-0 top-0 w-[50px] h-[466px] flex flex-col justify-center items-center gap-2.5 rounded-md bg-[rgba(217,237,232,0.63)]">
            <span className="text-[#058A65] text-center font-inter text-base font-semibold leading-[26px] tracking-[-0.16px]">
              安<br />全<br />保<br />障<br />体<br />系
            </span>
          </div>

          {/* Center content areas */}
          <div className="absolute left-[130px] top-0 w-[958px]">
            {/* Top applications */}
            <div className="flex items-center gap-2.5 h-[54px]">
              <div className="flex w-[148px] py-3.5 px-12 justify-center items-center gap-2.5 rounded-md bg-[#5BAE97]">
                <span className="text-white text-center font-inter text-sm font-normal leading-[26px] tracking-[-0.14px]">
                  工业企业
                </span>
              </div>
              <div className="flex w-[148px] py-3.5 px-12 justify-center items-center gap-2.5 rounded-md bg-[#5BAE97]">
                <span className="text-white text-center font-inter text-sm font-normal leading-[26px] tracking-[-0.14px]">
                  产业园区
                </span>
              </div>
              <div className="flex w-[149px] py-3.5 px-12 justify-center items-center gap-2.5 rounded-md bg-[#5BAE97]">
                <span className="text-white text-center font-inter text-sm font-normal leading-[26px] tracking-[-0.14px]">
                  商业建筑
                </span>
              </div>
              <div className="flex w-[148px] py-3.5 px-12 justify-center items-center gap-2.5 rounded-md bg-[#5BAE97]">
                <span className="text-white text-center font-inter text-sm font-normal leading-[26px] tracking-[-0.14px]">
                  政府机构
                </span>
              </div>
              <div className="flex w-[153px] py-3.5 px-12 justify-center items-center gap-2.5 rounded-md bg-[#5BAE97]">
                <span className="text-white text-center font-inter text-sm font-normal leading-[26px] tracking-[-0.14px]">
                  学校/医疗
                </span>
              </div>
              <div className="flex w-[162px] py-3.5 px-12 justify-center items-center gap-2.5 rounded-md bg-[#5BAE97]">
                <span className="text-white text-center font-inter text-sm font-normal leading-[26px] tracking-[-0.14px]">
                  设备供应商
                </span>
              </div>
            </div>

            {/* Platform layer */}
            <div className="mt-2 flex py-3.5 px-2.5 justify-center items-center gap-2.5 rounded-t-md bg-[rgba(5,138,101,0.15)] h-[54px]">
              <span className="text-[#058A65] text-center font-inter text-base font-semibold leading-[26px] tracking-[-0.16px]">
                能碳管理平台
              </span>
            </div>

            {/* Business applications */}
            <div className="flex items-center gap-3 h-[50px] mt-2">
              <div className="flex w-[122px] h-[50px] py-4 px-2.5 justify-center items-center gap-1.5 rounded-md bg-white">
                <span className="text-[#333] text-center font-inter text-sm font-normal leading-[26px] tracking-[-0.14px]">
                  全能源数据采集
                </span>
              </div>
              <div className="flex w-[124px] h-[50px] py-4 px-2.5 justify-center items-center gap-1.5 rounded-md bg-white">
                <span className="text-[#333] text-center font-inter text-sm font-normal leading-[26px] tracking-[-0.14px]">
                  能源数据分析
                </span>
              </div>
              <div className="flex w-[122px] h-[50px] py-4 px-2.5 justify-center items-center gap-1.5 rounded-md bg-white">
                <span className="text-[#333] text-center font-inter text-sm font-normal leading-[26px] tracking-[-0.14px]">
                  预测与预警
                </span>
              </div>
              <div className="flex w-[122px] h-[50px] py-4 px-2.5 justify-center items-center gap-1.5 rounded-md bg-white">
                <span className="text-[#333] text-center font-inter text-sm font-normal leading-[26px] tracking-[-0.14px]">
                  减排模拟与规划
                </span>
              </div>
              <div className="flex w-[122px] h-[50px] py-4 px-2.5 justify-center items-center gap-1.5 rounded-md bg-white">
                <span className="text-[#333] text-center font-inter text-sm font-normal leading-[26px] tracking-[-0.14px]">
                  决策支持与报告
                </span>
              </div>
              <div className="flex w-[123px] h-[50px] py-4 px-2.5 justify-center items-center gap-1.5 rounded-md bg-white">
                <span className="text-[#333] text-center font-inter text-sm font-normal leading-[26px] tracking-[-0.14px]">
                  碳排放核算与盘查
                </span>
              </div>
              <div className="flex w-[122px] py-4 px-2.5 justify-center items-center gap-1.5 rounded-md bg-white">
                <span className="text-[#333] text-center font-inter text-sm font-normal leading-[26px] tracking-[-0.14px]">
                  设备运维管理
                </span>
              </div>
            </div>

            {/* Data layer */}
            <div className="flex items-center gap-3 mt-4">
              <div className="flex w-[121px] py-2 px-2.5 justify-center items-center gap-2.5 rounded-md bg-white">
                <span className="text-[#333] text-center font-inter text-sm font-normal leading-[26px] tracking-[-0.14px]">
                  AI算法引擎
                </span>
              </div>
              <div className="flex w-[121px] py-2 px-2.5 justify-center items-center gap-2.5 rounded-md bg-white">
                <span className="text-[#333] text-center font-inter text-sm font-normal leading-[26px] tracking-[-0.14px]">
                  大数据分析引擎
                </span>
              </div>
              <div className="flex w-[121px] py-2 px-2.5 justify-center items-center gap-2.5 rounded-md bg-white">
                <span className="text-[#333] text-center font-inter text-sm font-normal leading-[26px] tracking-[-0.14px]">
                  数字孪生引擎
                </span>
              </div>
              <div className="flex w-[122px] py-2 px-2.5 justify-center items-center gap-2.5 rounded-md bg-white">
                <span className="text-[#333] text-center font-inter text-sm font-normal leading-[26px] tracking-[-0.14px]">
                  超级API
                </span>
              </div>
              <div className="flex w-[121px] py-2 px-2.5 justify-center items-center gap-2.5 rounded-md bg-white">
                <span className="text-[#333] text-center font-inter text-sm font-normal leading-[26px] tracking-[-0.14px]">
                  物模型管理
                </span>
              </div>
              <div className="flex w-[256px] py-2 px-2.5 justify-center items-center gap-2.5 rounded-md bg-white">
                <span className="text-[#333] text-center font-inter text-sm font-normal leading-[26px] tracking-[-0.14px]">
                  物联网IoT平台(采集、计算、存储)
                </span>
              </div>
            </div>

            {/* IoT layer */}
            <div className="flex items-center gap-3 mt-4">
              <div className="flex w-[162px] py-2 px-2.5 justify-center items-center gap-2.5 rounded-md bg-white">
                <span className="text-[#333] text-center font-inter text-sm font-normal leading-[26px] tracking-[-0.14px]">
                  工业网关
                </span>
              </div>
              <div className="flex w-[163px] py-2 px-2.5 justify-center items-center gap-2.5 rounded-md bg-white">
                <span className="text-[#333] text-center font-inter text-sm font-normal leading-[26px] tracking-[-0.14px]">
                  工业A一体机
                </span>
              </div>
              <div className="flex w-[162px] py-2 px-2.5 justify-center items-center gap-2.5 rounded-md bg-white">
                <span className="text-[#333] text-center font-inter text-sm font-normal leading-[26px] tracking-[-0.14px]">
                  各类传感器
                </span>
              </div>
              <div className="flex w-[161px] py-2 px-2.5 justify-center items-center gap-2.5 rounded-md bg-white">
                <span className="text-[#333] text-center font-inter text-sm font-normal leading-[26px] tracking-[-0.14px]">
                  智能开关
                </span>
              </div>
              <div className="flex w-[225px] py-2 px-2.5 justify-center items-center gap-2.5 rounded-md bg-white">
                <span className="text-[#333] text-center font-inter text-sm font-normal leading-[26px] tracking-[-0.14px]">
                  MES/ERP/其他系统
                </span>
              </div>
            </div>

            {/* Data collection layer */}
            <div className="flex items-center gap-3 mt-4">
              <div className="flex w-[232px] py-3.5 px-12 justify-center items-center gap-2.5 rounded-md bg-[#EAF9F6] h-[54px]">
                <span className="text-[#333] text-center font-inter text-sm font-normal leading-[26px] tracking-[-0.14px]">
                  电表
                </span>
              </div>
              <div className="flex w-[232px] py-3.5 px-12 justify-center items-center gap-2.5 rounded-md bg-[#EAF9F6] h-[54px]">
                <span className="text-[#333] text-center font-inter text-sm font-normal leading-[26px] tracking-[-0.14px]">
                  水表
                </span>
              </div>
              <div className="flex w-[232px] py-3.5 px-12 justify-center items-center gap-2.5 rounded-md bg-[#EAF9F6] h-[54px]">
                <span className="text-[#333] text-center font-inter text-sm font-normal leading-[26px] tracking-[-0.14px]">
                  气表
                </span>
              </div>
              <div className="flex w-[232px] py-3.5 px-12 justify-center items-center gap-2.5 rounded-md bg-[#EAF9F6] h-[54px]">
                <span className="text-[#333] text-center font-inter text-sm font-normal leading-[26px] tracking-[-0.14px]">
                  冷/热量表
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Success Practices */}
      <section className="w-full py-[88px] px-28 flex flex-col justify-center items-center gap-16 bg-white">
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
            <span className="text-[#333] text-center font-inter text-lg font-medium leading-6 tracking-[-0.1px]">
              实现零碳工厂三阶段：
            </span>
            <span className="font-inter text-lg font-medium leading-6 tracking-[-0.1px]">
              <span className="text-[#058A65]">① </span>
              <span className="text-[#333]">数字化建设</span>
            </span>
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
            <span className="font-inter text-lg font-medium leading-6 tracking-[-0.1px]">
              <span className="text-[#058A65]">②</span>
              <span className="text-[#333]"> 优化改造 </span>
            </span>
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
            <span className="font-inter text-lg font-medium leading-6 tracking-[-0.1px]">
              <span className="text-[#058A65]">③</span>
              <span className="text-[#333]"> 全力降碳</span>
            </span>
          </div>

          <div className="flex flex-col items-start gap-2.5 w-full">
            <div className="flex items-start gap-12 w-full">
              <div className="flex min-w-[280px] py-[30px] px-0 flex-col justify-center items-center gap-4 flex-1 rounded-[10px] bg-[#F7F8FA]">
                <div className="flex flex-col justify-center items-center gap-3 w-full">
                  <h3 className="w-[373px] text-[#058A65] text-center font-inter text-[30px] font-bold leading-10 tracking-[-0.45px]">
                    六个月
                  </h3>
                  <p className="text-[#333] text-center font-inter text-base font-normal leading-6 tracking-[-0.16px] w-full">
                    成本回收期
                  </p>
                </div>
              </div>

              <div className="flex min-w-[280px] py-[30px] px-0 justify-center items-center gap-4 flex-1 rounded-[10px] bg-[#F7F8FA]">
                <div className="flex flex-col items-start gap-3 flex-1">
                  <h3 className="text-[#058A65] text-center font-inter text-[30px] font-bold leading-10 tracking-[-0.45px] w-full">
                    超百万
                  </h3>
                  <p className="text-[#333] text-center font-inter text-base font-normal leading-6 tracking-[-0.16px] w-full">
                    年节省费用
                  </p>
                </div>
              </div>

              <div className="flex min-w-[280px] py-[30px] px-0 justify-center items-center gap-4 flex-1 rounded-[10px] bg-[#F7F8FA]">
                <div className="flex flex-col justify-center items-center gap-3 flex-1">
                  <h3 className="text-[#058A65] text-center font-inter text-[30px] font-bold leading-10 tracking-[-0.45px] w-full">
                    符合ISO50001
                  </h3>
                  <p className="text-[#333] text-center font-inter text-base font-normal leading-6 tracking-[-0.16px] w-full">
                    符合认证，申报国家级绿色工厂
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Advantages */}
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
            <div className="flex p-8 flex-col items-center gap-4 flex-1 rounded-[5px] border border-[#EAEBF0] bg-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.04)]">
              <div className="flex p-2 justify-center items-center rounded-[30px] bg-[#058A65]">
                <svg
                  className="w-8 h-8"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.3333 7.99967C13.3333 6.52692 14.5272 5.33301 16 5.33301C17.4727 5.33301 18.6666 6.52692 18.6666 7.99967V23.9997C18.6666 25.4724 17.4727 26.6663 16 26.6663C14.5272 26.6663 13.3333 25.4724 13.3333 23.9997V7.99967Z"
                    fill="white"
                  />
                  <path
                    d="M2.66663 18.6663C2.66663 17.1936 3.86053 15.9997 5.33329 15.9997C6.80605 15.9997 7.99996 17.1936 7.99996 18.6663V23.9997C7.99996 25.4724 6.80605 26.6663 5.33329 26.6663C3.86053 26.6663 2.66663 25.4724 2.66663 23.9997V18.6663Z"
                    fill="white"
                  />
                  <path
                    d="M26.6666 10.6663C25.1939 10.6663 24 11.8602 24 13.333V23.9997C24 25.4724 25.1939 26.6663 26.6666 26.6663C28.1394 26.6663 29.3333 25.4724 29.3333 23.9997V13.333C29.3333 11.8602 28.1394 10.6663 26.6666 10.6663Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div className="flex flex-col items-start gap-4 w-full">
                <h3 className="text-[#333] text-center font-inter text-[22px] font-semibold leading-[30px] tracking-[-0.22px] w-full">
                  经验丰富
                </h3>
                <p className="text-[#666] text-center font-inter text-base font-normal leading-6 tracking-[-0.1px] w-full">
                  深耕碳交易与节能服务超10年
                </p>
              </div>
            </div>

            <div className="flex p-8 flex-col items-center gap-4 flex-1 rounded-[5px] border border-[#EAEBF0] bg-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.04)]">
              <div className="flex p-2 justify-center items-center rounded-[30px] bg-[#058A65]">
                <svg
                  className="w-8 h-8"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M20.1394 1.98732C20.4671 1.32788 21.2673 1.05897 21.9268 1.38668C25.4612 3.14316 28.1068 6.42229 29.003 10.3716C29.1659 11.0897 28.7159 11.804 27.9977 11.967C27.2796 12.1299 26.5654 11.6798 26.4024 10.9617C25.6869 7.80851 23.5708 5.18151 20.74 3.77472C20.0806 3.447 19.8117 2.64676 20.1394 1.98732Z"
                    fill="white"
                  />
                  <path
                    d="M16.0001 4.00012C10.8605 4.00012 6.6219 7.98894 6.6219 13.3335V17.5458C6.6219 18.0517 6.54303 18.5537 6.38881 19.0322L5.40419 22.0876C5.11932 22.9715 5.73932 23.9999 6.79175 23.9999H25.151C26.1456 23.9999 26.8516 23.0307 26.5465 22.084L25.5552 19.0079C25.406 18.5448 25.33 18.0611 25.33 17.5745V13.3335C25.33 8.16812 21.1669 4.00012 16.0001 4.00012Z"
                    fill="white"
                  />
                  <path
                    d="M11.6226 26.3311C12.8295 27.3768 14.349 28 16 28C17.6511 28 19.1706 27.3768 20.3775 26.3311C20.7996 25.9655 20.5082 25.3333 19.9497 25.3333H12.0503C11.4919 25.3333 11.2005 25.9655 11.6226 26.3311Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div className="flex flex-col items-start gap-4 w-full">
                <h3 className="text-[#333] text-center font-inter text-[22px] font-semibold leading-[30px] tracking-[-0.22px] w-full">
                  技术领先
                </h3>
                <p className="text-[#666] text-center font-inter text-base font-normal leading-6 tracking-[-0.1px] w-full">
                  AI驱动的智能分析与预测技术
                </p>
              </div>
            </div>

            <div className="flex p-8 flex-col items-center gap-4 flex-1 rounded-[5px] border border-[#EAEBF0] bg-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.04)]">
              <div className="flex p-2 justify-center items-center rounded-[30px] bg-[#058A65]">
                <svg
                  className="w-8 h-8"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M25.0667 6.66699H6.93341C5.43994 6.66699 4.6932 6.66699 4.12277 6.95764C3.62101 7.2133 3.21306 7.62125 2.9574 8.12302C2.66675 8.69345 2.66675 9.44019 2.66675 10.9337V26.2744C2.66675 26.8459 2.66675 27.1316 2.78711 27.3037C2.89221 27.454 3.05457 27.5543 3.23597 27.5811C3.44372 27.6118 3.69931 27.484 4.21044 27.2285L7.09919 25.7841C7.43518 25.6161 7.60317 25.5321 7.77923 25.4729C7.93559 25.4203 8.0965 25.3823 8.25987 25.3594C8.44384 25.3337 8.63166 25.3337 9.00731 25.3337H25.0667C26.5602 25.3337 27.307 25.3337 27.8774 25.043C28.3792 24.7873 28.7871 24.3794 29.0428 23.8776C29.3334 23.3072 29.3334 22.5605 29.3334 21.067V10.9337C29.3334 9.44019 29.3334 8.69345 29.0428 8.12302C28.7871 7.62125 28.3792 7.2133 27.8774 6.95764C27.307 6.66699 26.5602 6.66699 25.0667 6.66699Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div className="flex flex-col items-start gap-4 w-full">
                <h3 className="text-[#333] text-center font-inter text-[22px] font-semibold leading-[30px] tracking-[-0.22px] w-full">
                  服务完善
                </h3>
                <p className="text-[#666] text-center font-inter text-base font-normal leading-6 tracking-[-0.1px] w-full">
                  7x24小时技术支持与运维保障
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="w-full h-[598px] bg-white relative">
        <div className="w-[1216px] px-8 flex flex-col justify-center items-center gap-3 absolute left-28 top-[88px] h-20">
          <div className="flex w-[800px] flex-col justify-center items-center gap-2">
            <div className="flex flex-col items-center gap-4 w-full">
              <h2 className="text-[#333] text-center font-inter text-[32px] font-bold leading-10 tracking-[-0.64px] w-full">
                案例标题文案
              </h2>
              <p className="text-[#858C95] text-center font-inter text-base font-normal leading-6 tracking-[-0.1px] w-full">
                已成功实施的案例文案文案文案文案
              </p>
            </div>
          </div>
        </div>

        <div className="absolute left-28 top-[239px] w-[388px] h-[224px] rounded-[10px] bg-[#D9D9D9]">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/a5a7491bf957bd8ca480e57dd9c04f41bc90e824?width=798"
            alt="Case Study 1"
            className="w-[399px] h-[224px] absolute -left-1.5 top-0 rounded-[10px]"
          />
        </div>
        <p className="absolute left-[181px] top-[481px] w-[250px] h-6 text-[#333] text-center font-inter text-xl font-medium leading-normal tracking-[-0.4px]">
          xxxxx案例文案文案文案文案
        </p>

        <div className="absolute left-[526px] top-[239px] w-[388px] h-[224px] rounded-[10px] bg-[#D9D9D9]">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/4ba9d16fece065f0fbcc28a076415af2bb1b4bfb?width=798"
            alt="Case Study 2"
            className="w-[399px] h-[225px] absolute -left-1 top-0 rounded-[10px]"
          />
        </div>
        <p className="absolute left-[605px] top-[481px] w-[230px] h-6 text-[#333] font-inter text-xl font-medium leading-normal tracking-[-0.4px]">
          xxxxx案例文案文案文案文
        </p>

        <div className="absolute left-[940px] top-[239px] w-[388px] h-[224px] rounded-[10px] bg-[#D9D9D9]">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/c83347a96312ed3c58ce15679a8db6ac1c1cf473?width=790"
            alt="Case Study 3"
            className="w-[395px] h-[224px] absolute -left-1 top-0 rounded-[10px]"
          />
        </div>
        <p className="absolute left-[1019px] top-[481px] w-[230px] h-6 text-[#333] text-center font-inter text-xl font-medium leading-normal tracking-[-0.4px]">
          xxxxx���例文案文案文案文
        </p>
      </section>

      {/* Call to Action */}
      <section className="w-full h-[240px] relative">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/c3d8bbdfb00719bc52fa3a75698c8e12e1c784dc?width=2880"
          alt="CTA Background"
          className="w-full h-[240px] absolute inset-0"
        />
        <div className="w-[600px] flex flex-col items-center gap-2 absolute left-[420px] top-[46px] h-[148px]">
          <div className="h-[148px] w-full relative">
            <div className="w-[600px] h-[148px] absolute left-0 top-0">
              <div className="flex w-[600px] flex-col items-start gap-[30px] absolute left-0 top-0 h-[148px]">
                <div className="flex flex-col justify-center items-center gap-1.5 w-full">
                  <h2 className="text-[#333] text-center font-inter text-[32px] font-semibold leading-[42px] tracking-[-0.32px] w-full">
                    打造绿色工厂从现在开始
                  </h2>
                  <p className="text-[#666] text-center font-inter text-base font-normal leading-6 tracking-[-0.1px] w-full">
                    欢迎预约系统演示，获取专属能碳管理解决方案
                  </p>
                </div>
                <div className="flex justify-center items-center gap-4 w-full">
                  <button className="flex w-[120px] py-3 px-[18px] justify-center items-center gap-1.5 rounded-full bg-white">
                    <span className="text-[#058A65] text-center font-inter text-[15px] font-semibold leading-[22px]">
                      联系我们
                    </span>
                  </button>
                  <button className="flex w-[120px] py-3 px-[18px] justify-center items-center gap-1.5 rounded-full bg-[#058A65] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.04)]">
                    <span className="text-white text-center font-inter text-[15px] font-semibold leading-[22px]">
                      立即预约
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
