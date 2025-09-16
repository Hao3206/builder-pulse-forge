import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Target,
  Users,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { successCases, SuccessCase } from "@/data/successCases";

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

  const numericId = Number(id);
  const caseData: SuccessCase | undefined = successCases.find(
    (c) => c.id === numericId,
  );

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

  const heroImage = caseData.heroImage ?? caseData.image;

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
        <img src={heroImage} alt={caseData.title} className="w-full h-full object-cover" />
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
                <div className="font-semibold text-[#333]">{caseData.location}</div>
              </div>
            </div>
            {caseData.client && (
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-[#058A65]" />
                <div>
                  <div className="text-sm text-[#666]">客户</div>
                  <div className="font-semibold text-[#333]">{caseData.client}</div>
                </div>
              </div>
            )}
            {caseData.duration && (
              <div className="flex items-center gap-3">
                <Target className="w-6 h-6 text-[#058A65]" />
                <div>
                  <div className="text-sm text-[#666]">项目周期</div>
                  <div className="font-semibold text-[#333]">{caseData.duration}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Results Section */}
      {caseData.results && (() => {
        const items = [
          { value: caseData.results.carbonReduction, label: "碳排放减少" },
          { value: caseData.results.energySaving, label: "能源节约" },
          { value: caseData.results.costSaving, label: "成本节约" },
        ] as { value: string; label: string }[];
        if (caseData.results.renewableEnergy) {
          items.push({ value: caseData.results.renewableEnergy, label: "清洁能源占比" });
        }
        const gridCols = items.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4";
        return (
          <div className="bg-[#F8F9FB] py-16">
            <div className="max-w-screen-2xl mx-auto px-4 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-[32px] font-bold text-[#333] mb-4">项目成果</h2>
                <p className="text-lg text-[#666]">通过专业的解决方案，实现了显著的改善效果</p>
              </div>
              <div className={`grid grid-cols-1 md:grid-cols-2 ${gridCols} gap-8 justify-items-center`}>
                {items.map((it, idx) => (
                  <div key={idx} className="text-center bg-white p-8 rounded-xl w-full">
                    <div className="text-[48px] font-bold text-[#058A65] mb-2">{it.value}</div>
                    <div className="text-[#666] font-medium">{it.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })()}

      {/* Project Scale */}
      {caseData.projectScale && (
        <div className="bg-white py-16">
          <div className="max-w-screen-2xl mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-[32px] font-bold text-[#333] mb-4">项目规模</h2>
              <p className="text-lg text-[#666] max-w-3xl mx-auto">{caseData.projectScale}</p>
            </div>
          </div>
        </div>
      )}

      {/* Challenges & Solutions */}
      {(caseData.challenges?.length || caseData.solutions?.length) && (
        <div className="bg-[#F8F9FB] py-16">
          <div className="max-w-screen-2xl mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {caseData.challenges?.length ? (
                <div>
                  <h2 className="text-[32px] font-bold text-[#333] mb-8">面临挑战</h2>
                  <div className="space-y-6">
                    {caseData.challenges.map((challenge, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="w-6 h-6 bg-[#FF6B6B] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-white text-sm font-bold">{index + 1}</span>
                        </div>
                        <p className="text-[#666] leading-relaxed">{challenge}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div />
              )}

              {caseData.solutions?.length ? (
                <div>
                  <h2 className="text-[32px] font-bold text-[#333] mb-8">解决方案</h2>
                  <div className="grid grid-cols-1 gap-6">
                    {caseData.solutions.map((solution, index) => (
                      <div key={index} className="bg-white p-6 rounded-xl border border-[#E5E5E7]">
                        <div className="flex items-start gap-4">
                          <img
                            src={solution.image}
                            alt={solution.title}
                            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                          />
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-[#333] mb-2">{solution.title}</h3>
                            <p className="text-[#666] text-sm leading-relaxed">{solution.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Timeline Section */}
      {caseData.timeline?.length ? (
        <div className="bg-white py-16">
          <div className="max-w-screen-2xl mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-[32px] font-bold text-[#333] mb-4">项目时间线</h2>
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
                    <div className={`flex-1 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
                      <div className="bg-white p-6 rounded-xl border border-[#E5E5E7] inline-block max-w-md">
                        <h3 className="text-lg font-bold text-[#333] mb-2">{phase.phase}</h3>
                        <div className="text-[#058A65] font-medium mb-3">{phase.period}</div>
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
      ) : null}

      {/* Testimonial Section */}
      {caseData.testimonial && (
        <div className="bg-[#058A65] py-16">
          <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-[32px] font-bold text-white mb-8">客户评价</h2>
              <blockquote className="text-xl leading-relaxed text-white/90 mb-8">
                "{caseData.testimonial.content}"
              </blockquote>
              <div className="text-white">
                <div className="font-bold text-lg">{caseData.testimonial.author}</div>
                <div className="text-white/70">{caseData.testimonial.position}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Project Images */}
      {caseData.images?.length ? (
        <div className="bg-white py-16">
          <div className="max-w-screen-2xl mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-[32px] font-bold text-[#333] mb-4">项目图片</h2>
              <p className="text-lg text-[#666]">记录项目实施过程的精彩瞬间</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {caseData.images.map((image, index) => (
                <div key={index} className="aspect-square overflow-hidden rounded-xl">
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
      ) : null}

      {/* CTA Section */}
      <div className="bg-[#F8F9FB] py-16">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-[32px] font-bold text-[#333] mb-4">想了解更多案例详情？</h2>
          <p className="text-lg text-[#666] mb-8 max-w-2xl mx-auto">
            我们有更多成功案例等您了解，欢迎联系我们获取详细的项目资料和解决方案
          </p>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => navigate("/success-cases")}
              className="px-8 py-3 border border-[#058A65] text-[#058A65] font-semibold rounded-md hover:bg-[#058A65]/5 transition-colors"
            >
              查���更多案例
            </button>
            <button
              className="px-8 py-3 bg-[#058A65] text-white font-semibold rounded-md hover:bg-[#046B52] transition-colors"
              onClick={() => navigate("/about#contact")}
            >
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
