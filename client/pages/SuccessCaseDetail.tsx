import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SuccessCaseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mock data - in real app this would come from API
  const successCases = {
    1: {
      id: 1,
      category: "零碳园区",
      title: "某国际生态园区零碳转型示范项目",
      description:
        "通过综合能源管理系统和智慧碳管理平台，该园区实现了碳排放减少60%，成为行业标杆案例。",
      heroImage:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop",
      date: "2024-12",
      location: "浙江宁波",
      client: "某国际生态园区",
      duration: "18个月",
      projectScale: "占地500公顷，入驻企业150家",
      challenges: [
        "园区内企业众多，能源消耗类型复杂多样",
        "缺乏统一的碳排放监测和管理系统",
        "传统能源结构导致碳排放量居高不下",
        "各企业间缺乏有效的节能减排协同机制",
      ],
      solutions: [
        {
          title: "智慧能源管理系统",
          description:
            "部署覆盖全园区的智能电网和能源监测系统，实现能源使用的实时监控和优化调度。",
          image:
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
        },
        {
          title: "碳排放监测平台",
          description:
            "建立统一���碳排放数据采集、分析和报告平台，为园区和企业提供精准的碳排放数据。",
          image:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        },
        {
          title: "清洁能源改造",
          description:
            "大规模部署太阳能、风能等清洁能源设施，构建园区绿色能源供应体系。",
          image:
            "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&h=600&fit=crop",
        },
        {
          title: "数字孪生管理",
          description:
            "构建园区数字孪生模型，实现虚拟仿真和智能决策，提升管理效率。",
          image:
            "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop",
        },
      ],
      results: {
        carbonReduction: "60%",
        energySaving: "45%",
        costSaving: "30%",
        renewableEnergy: "75%",
      },
      timeline: [
        {
          phase: "项目启动",
          period: "2023年6月 - 2023年8月",
          description: "完成项目调研、方案设计和合同签署",
        },
        {
          phase: "基础设施建设",
          period: "2023年9月 - 2024年3月",
          description: "部署智能电网、监测设备和清洁能源设施",
        },
        {
          phase: "系统集成测试",
          period: "2024年4月 - 2024年6月",
          description: "完成各系统集成、测试和优化调试",
        },
        {
          phase: "正式运营",
          period: "2024年7月至今",
          description: "系统正式投入运营，持续监测和优化",
        },
      ],
      testimonial: {
        content:
          "万泽时代为我们提供了全方位的零碳转型解决方案，不仅实现了显著的减排效果，还为园区带来了可观的经济效益。他们的专业团队和先进技术让我们对未来的可持续发展充满信心。",
        author: "李总",
        position: "园区管理委员会主任",
      },
      images: [
        "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop",
      ],
    },
    // Add more cases as needed
  };

  const caseData = successCases[id as keyof typeof successCases];

  if (!caseData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#333] mb-4">案例不存在</h1>
          <button
            onClick={() => navigate("/success-cases")}
            className="px-6 py-3 bg-[#058A65] text-white rounded-md hover:bg-[#046B52] transition-colors"
          >
            返回案例列表
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-lg" : "bg-transparent"
        }`}
      >
        <Header isScrolled={isScrolled} />
      </div>

      {/* Hero Section */}
      <div className="relative h-[500px] overflow-hidden">
        <img
          src={caseData.heroImage}
          alt={caseData.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />

        {/* Back Button */}
        <button
          onClick={() => navigate("/success-cases")}
          className="absolute top-[120px] left-8 z-10 flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          返回案例列表
        </button>

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <div className="inline-block px-4 py-2 bg-[#058A65] rounded-full text-sm font-medium mb-4">
              {caseData.category}
            </div>
            <h1 className="text-[48px] font-bold leading-[60px] mb-6">
              {caseData.title}
            </h1>
            <p className="text-xl leading-[30px] text-white/90 max-w-2xl mx-auto">
              {caseData.description}
            </p>
          </div>
        </div>
      </div>

      {/* Project Info */}
      <div className="bg-white py-12">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-[#058A65]" />
              <div>
                <div className="text-sm text-[#666]">项目时间</div>
                <div className="font-semibold text-[#333]">{caseData.date}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6 text-[#058A65]" />
              <div>
                <div className="text-sm text-[#666]">项目地点</div>
                <div className="font-semibold text-[#333]">
                  {caseData.location}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-[#058A65]" />
              <div>
                <div className="text-sm text-[#666]">客户</div>
                <div className="font-semibold text-[#333]">
                  {caseData.client}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Target className="w-6 h-6 text-[#058A65]" />
              <div>
                <div className="text-sm text-[#666]">项目周期</div>
                <div className="font-semibold text-[#333]">
                  {caseData.duration}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="bg-[#F8F9FB] py-16">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-[32px] font-bold text-[#333] mb-4">项目成果</h2>
            <p className="text-lg text-[#666]">
              通过专业的解决方案，实现了显著的改善效果
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center bg-white p-8 rounded-xl">
              <div className="text-[48px] font-bold text-[#058A65] mb-2">
                {caseData.results.carbonReduction}
              </div>
              <div className="text-[#666] font-medium">碳排放减少</div>
            </div>
            <div className="text-center bg-white p-8 rounded-xl">
              <div className="text-[48px] font-bold text-[#058A65] mb-2">
                {caseData.results.energySaving}
              </div>
              <div className="text-[#666] font-medium">能源节约</div>
            </div>
            <div className="text-center bg-white p-8 rounded-xl">
              <div className="text-[48px] font-bold text-[#058A65] mb-2">
                {caseData.results.costSaving}
              </div>
              <div className="text-[#666] font-medium">成本节约</div>
            </div>
            <div className="text-center bg-white p-8 rounded-xl">
              <div className="text-[48px] font-bold text-[#058A65] mb-2">
                {caseData.results.renewableEnergy}
              </div>
              <div className="text-[#666] font-medium">清洁能源占比</div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Scale */}
      <div className="bg-white py-16">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-[32px] font-bold text-[#333] mb-4">项目规模</h2>
            <p className="text-lg text-[#666] max-w-3xl mx-auto">
              {caseData.projectScale}
            </p>
          </div>
        </div>
      </div>

      {/* Challenges Section */}
      <div className="bg-[#F8F9FB] py-16">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-[32px] font-bold text-[#333] mb-8">
                面临挑战
              </h2>
              <div className="space-y-6">
                {caseData.challenges.map((challenge, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-[#FF6B6B] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">
                        {index + 1}
                      </span>
                    </div>
                    <p className="text-[#666] leading-relaxed">{challenge}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-[32px] font-bold text-[#333] mb-8">
                解决方案
              </h2>
              <div className="grid grid-cols-1 gap-6">
                {caseData.solutions.map((solution, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-xl border border-[#E5E5E7]"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={solution.image}
                        alt={solution.title}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-[#333] mb-2">
                          {solution.title}
                        </h3>
                        <p className="text-[#666] text-sm leading-relaxed">
                          {solution.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="bg-white py-16">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-[32px] font-bold text-[#333] mb-4">
              项目时间线
            </h2>
            <p className="text-lg text-[#666]">从项目启动到成功实施的全过程</p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-[#E5E5E7] h-full"></div>

            <div className="space-y-12">
              {caseData.timeline.map((phase, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-8 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                >
                  <div
                    className={`flex-1 ${index % 2 === 0 ? "text-right" : "text-left"}`}
                  >
                    <div className="bg-white p-6 rounded-xl border border-[#E5E5E7] inline-block max-w-md">
                      <h3 className="text-lg font-bold text-[#333] mb-2">
                        {phase.phase}
                      </h3>
                      <div className="text-[#058A65] font-medium mb-3">
                        {phase.period}
                      </div>
                      <p className="text-[#666] text-sm">{phase.description}</p>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="w-4 h-4 bg-[#058A65] rounded-full border-4 border-white z-10 relative"></div>
                  </div>

                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="bg-[#058A65] py-16">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-[32px] font-bold text-white mb-8">客户评价</h2>
            <blockquote className="text-xl leading-relaxed text-white/90 mb-8">
              "{caseData.testimonial.content}"
            </blockquote>
            <div className="text-white">
              <div className="font-bold text-lg">
                {caseData.testimonial.author}
              </div>
              <div className="text-white/70">
                {caseData.testimonial.position}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Images */}
      <div className="bg-white py-16">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-[32px] font-bold text-[#333] mb-4">项目图片</h2>
            <p className="text-lg text-[#666]">记录项目实施过程的精彩瞬间</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {caseData.images.map((image, index) => (
              <div
                key={index}
                className="aspect-square overflow-hidden rounded-xl"
              >
                <img
                  src={image}
                  alt={`项目图片 ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#F8F9FB] py-16">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-[32px] font-bold text-[#333] mb-4">
            想了解更多案例详情？
          </h2>
          <p className="text-lg text-[#666] mb-8 max-w-2xl mx-auto">
            我们有更多成功案例等您了解，欢迎联系我们获取详细的项目资料和解决方案
          </p>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => navigate("/success-cases")}
              className="px-8 py-3 border border-[#058A65] text-[#058A65] font-semibold rounded-md hover:bg-[#058A65]/5 transition-colors"
            >
              查看更多案例
            </button>
            <button className="px-8 py-3 bg-[#058A65] text-white font-semibold rounded-md hover:bg-[#046B52] transition-colors">
              联系我们
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
