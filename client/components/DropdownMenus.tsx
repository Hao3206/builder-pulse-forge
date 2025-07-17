import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

interface DropdownProps {
  title: string;
  isActive?: boolean;
  children: React.ReactNode;
}

function Dropdown({ title, isActive = false, children }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="flex items-center justify-center gap-1.5 rounded-md cursor-pointer">
        <span
          className={`font-inter text-[15px] font-medium leading-[22px] ${
            isActive ? "text-brand-green" : "text-white"
          }`}
        >
          {title}
        </span>
        <ChevronDown
          className={`w-5 h-5 ${
            isActive ? "text-brand-green" : "text-neutral-200"
          } ${isOpen ? "rotate-180" : ""} transition-transform duration-200`}
        />
      </div>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="absolute top-full left-0 pt-2 z-50">
          <div className="bg-white shadow-[0px_13px_11.7px_rgba(0,0,0,0.11)] overflow-hidden w-[1440px] h-[506px]">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

export function ProductServicesDropdown() {
  return (
    <Dropdown title="产品服务" isActive>
      <div className="flex h-full">
        {/* Left Sidebar */}
        <div className="w-[340px] h-[506px] bg-[#EBF8F6] flex flex-col justify-center px-[30px]">
          <h3 className="text-[#333] font-inter text-[18px] font-bold leading-[20px] tracking-[-0.1px] mb-4">
            产品服务
          </h3>
          <p className="text-[#666] font-inter text-[14px] font-normal leading-normal tracking-[-0.1px] mb-6 w-[163px]">
            描述性小文字阐述文字文字描述性小文字阐.。
          </p>
          <button className="flex items-center gap-2 text-brand-green font-inter text-[15px] font-normal leading-6 tracking-[-0.1px]">
            更多内容
            <ChevronRight className="w-5 h-5 -rotate-90" />
          </button>
        </div>

        {/* Main Content */}
        <div className="w-[1100px] h-[506px] bg-white px-8 py-[30px] grid grid-cols-3 gap-8">
          {/* Column 1 */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-1 mb-4">
                <span className="text-brand-green font-inter text-base font-semibold leading-6 tracking-[-0.16px]">
                  碳交易
                </span>
                <ChevronRight className="w-5 h-5 text-brand-green -rotate-90" />
              </div>
              <div className="space-y-3">
                <div className="text-[#999] font-inter text-sm leading-5 tracking-[-0.1px]">
                  地方碳普惠交易
                </div>
                <div className="text-brand-green font-inter text-sm leading-5 tracking-[-0.1px] bg-brand-green-50 rounded px-3 py-1">
                  CCER资产开发与交易
                </div>
                <div className="text-[#999] font-inter text-sm leading-5 tracking-[-0.1px]">
                  绿证交易
                </div>
                <div className="text-[#999] font-inter text-sm leading-5 tracking-[-0.1px]">
                  企���碳资产管理
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1 mb-4">
                <span className="text-brand-green font-inter text-base font-semibold leading-6 tracking-[-0.16px]">
                  碳足迹
                </span>
                <ChevronRight className="w-5 h-5 text-brand-green -rotate-90" />
              </div>
              <div className="text-[#999] font-inter text-sm leading-5 tracking-[-0.1px]">
                碳盘查/碳足迹核算
              </div>
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-1 mb-4">
                <span className="text-brand-green font-inter text-base font-semibold leading-6 tracking-[-0.16px]">
                  碳咨询
                </span>
                <ChevronRight className="w-5 h-5 text-brand-green -rotate-90" />
              </div>
              <div className="space-y-3">
                <div className="text-[#999] font-inter text-sm leading-5 tracking-[-0.1px]">
                  绿色/零碳工厂创建
                </div>
                <div className="text-[#999] font-inter text-sm leading-5 tracking-[-0.1px]">
                  CEAV产品碳排放核算与申报
                </div>
                <div className="text-[#999] font-inter text-sm leading-5 tracking-[-0.1px]">
                  碳达峰碳中和路径规划
                </div>
                <div className="text-[#999] font-inter text-sm leading-5 tracking-[-0.1px]">
                  ESG信息披露
                </div>
                <div className="text-[#999] font-inter text-sm leading-5 tracking-[-0.1px]">
                  双碳标准编生
                </div>
                <div className="text-[#999] font-inter text-sm leading-5 tracking-[-0.1px]">
                  双碳课题研究
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1 mb-4">
                <span className="text-brand-green font-inter text-base font-semibold leading-6 tracking-[-0.16px]">
                  碳培训
                </span>
                <ChevronRight className="w-5 h-5 text-brand-green -rotate-90" />
              </div>
              <div className="space-y-3">
                <div className="text-[#999] font-inter text-sm leading-5 tracking-[-0.1px]">
                  碳排放交易员培��
                </div>
                <div className="text-[#999] font-inter text-sm leading-5 tracking-[-0.1px]">
                  碳排放管理员培训
                </div>
                <div className="text-[#999] font-inter text-sm leading-5 tracking-[-0.1px]">
                  行业专题讲座/论坛
                </div>
                <div className="text-[#999] font-inter text-sm leading-5 tracking-[-0.1px]">
                  其他定制化培训
                </div>
                <div className="text-[#999] font-inter text-sm leading-5 tracking-[-0.1px]">
                  碳达峰碳中和战略规划高级研修班
                </div>
              </div>
            </div>
          </div>

          {/* Column 3 */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-1 mb-4">
                <span className="text-brand-green font-inter text-base font-semibold leading-6 tracking-[-0.16px]">
                  碳金融
                </span>
                <ChevronRight className="w-5 h-5 text-brand-green -rotate-90" />
              </div>
              <div className="text-[#999] font-inter text-sm leading-5 tracking-[-0.1px]">
                碳金融解次方案
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1 mb-4">
                <span className="text-brand-green font-inter text-base font-semibold leading-6 tracking-[-0.16px]">
                  零碳园区
                </span>
                <ChevronRight className="w-5 h-5 text-brand-green -rotate-90" />
              </div>
              <div className="space-y-3">
                <div className="text-[#999] font-inter text-sm leading-5 tracking-[-0.1px]">
                  零碳园区解决方案
                </div>
                <div className="text-[#999] font-inter text-sm leading-5 tracking-[-0.1px]">
                  其他低/零碳解决方案
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1 mb-4">
                <span className="text-brand-green font-inter text-base font-semibold leading-6 tracking-[-0.16px]">
                  碳信息化
                </span>
                <ChevronRight className="w-5 h-5 text-brand-green -rotate-90" />
              </div>
              <div className="space-y-3">
                <div className="text-[#999] font-inter text-sm leading-5 tracking-[-0.1px]">
                  企业碳���理平台
                </div>
                <div className="text-[#999] font-inter text-sm leading-5 tracking-[-0.1px]">
                  区域双碳大脑
                </div>
                <div className="text-[#999] font-inter text-sm leading-5 tracking-[-0.1px]">
                  企业碳管理平台
                </div>
                <div className="text-[#999] font-inter text-sm leading-5 tracking-[-0.1px]">
                  个人碳账户建设
                </div>
                <div className="text-[#999] font-inter text-sm leading-5 tracking-[-0.1px]">
                  绿色贸易服务平台
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dropdown>
  );
}

export function SolutionsDropdown() {
  return (
    <Dropdown title="解决方案" isActive>
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-[340px] bg-brand-green-50 p-8">
          <h3 className="text-[#333] font-inter text-lg font-bold leading-5 tracking-[-0.1px] mb-4">
            解决方案
          </h3>
          <p className="text-[#666] font-inter text-sm font-normal leading-normal tracking-[-0.1px] mb-6">
            全行业的解决方案，助力用户快速增长。
          </p>
          <button className="flex items-center gap-2 text-brand-green font-inter text-[15px] font-normal leading-6 tracking-[-0.1px]">
            更多内容
            <ChevronRight className="w-5 h-5 -rotate-90" />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="grid grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-1 mb-2">
                  <span className="text-brand-green font-inter text-base font-medium leading-6 tracking-[-0.16px]">
                    能碳管理系统(园区/工厂)解决方案
                  </span>
                  <ChevronRight className="w-5 h-5 text-brand-green -rotate-90" />
                </div>
                <p className="text-[#999] font-inter text-sm leading-5 tracking-[-0.1px]">
                  解决方案描述性文字文案文案文案文案文案文案文案文案
                </p>
              </div>

              <div>
                <div className="flex items-center gap-1 mb-2">
                  <span className="text-brand-green font-inter text-base font-medium leading-6 tracking-[-0.16px]">
                    企业碳管理一站式解决方案
                  </span>
                  <ChevronRight className="w-5 h-5 text-brand-green -rotate-90" />
                </div>
                <p className="text-[#999] font-inter text-sm leading-5 tracking-[-0.1px]">
                  解决方案描述性文字文案文案文案文案文案文案文案文案
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-1 mb-2">
                  <span className="text-brand-green font-inter text-base font-medium leading-6 tracking-[-0.16px]">
                    零碳园区解决方案
                  </span>
                  <ChevronRight className="w-5 h-5 text-brand-green -rotate-90" />
                </div>
                <p className="text-[#999] font-inter text-sm leading-5 tracking-[-0.1px]">
                  解决方案描述性文字文案文案文案文案文案文案文案文案
                </p>
              </div>

              <div>
                <div className="flex items-center gap-1 mb-2">
                  <span className="text-brand-green font-inter text-base font-medium leading-6 tracking-[-0.16px]">
                    碳核算/碳足迹解决方案
                  </span>
                  <ChevronRight className="w-5 h-5 text-brand-green -rotate-90" />
                </div>
                <p className="text-[#999] font-inter text-sm leading-5 tracking-[-0.1px]">
                  解决方案描述性文字文案文案文案文案文案文案文案文案
                </p>
              </div>
            </div>
          </div>

          {/* Apps Section */}
          <div className="mt-8 flex items-center gap-8">
            <div className="flex flex-col items-center">
              <div className="w-[90px] h-[90px] bg-gray-200 rounded-lg mb-2 flex items-center justify-center">
                <span className="text-xs text-gray-500">甬城低碳</span>
              </div>
              <span className="text-[#666] font-inter text-sm font-medium leading-6 tracking-[-0.14px]">
                甬城低碳
              </span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-[90px] h-[90px] bg-gray-200 rounded-lg mb-2 flex items-center justify-center">
                <span className="text-xs text-gray-500">足迹计算</span>
              </div>
              <span className="text-[#666] font-inter text-sm font-medium leading-6 tracking-[-0.14px]">
                个人碳足迹计算
              </span>
            </div>
          </div>
        </div>
      </div>
    </Dropdown>
  );
}

export function NewsDropdown() {
  return (
    <Dropdown title="资讯中心">
      <div className="p-8">
        <div className="grid grid-cols-4 gap-8">
          <div>
            <h4 className="text-brand-green font-inter text-base font-semibold mb-4">
              政策解读
            </h4>
            <div className="space-y-2">
              <div className="text-[#999] font-inter text-sm">最新政策解读</div>
              <div className="text-[#999] font-inter text-sm">行业政策分析</div>
            </div>
          </div>

          <div>
            <h4 className="text-brand-green font-inter text-base font-semibold mb-4">
              新闻资讯
            </h4>
            <div className="space-y-2">
              <div className="text-[#999] font-inter text-sm">行业动态</div>
              <div className="text-[#999] font-inter text-sm">企业新闻</div>
            </div>
          </div>

          <div>
            <h4 className="text-brand-green font-inter text-base font-semibold mb-4">
              本所动态
            </h4>
            <div className="space-y-2">
              <div className="text-[#999] font-inter text-sm">最新动态</div>
              <div className="text-[#999] font-inter text-sm">活动��讯</div>
            </div>
          </div>

          <div>
            <h4 className="text-brand-green font-inter text-base font-semibold mb-4">
              通知广告
            </h4>
            <div className="space-y-2">
              <div className="text-[#999] font-inter text-sm">重要通知</div>
              <div className="text-[#999] font-inter text-sm">公告信息</div>
            </div>
          </div>
        </div>
      </div>
    </Dropdown>
  );
}

export function AboutDropdown() {
  return (
    <Dropdown title="关于我们">
      <div className="p-8">
        <div className="grid grid-cols-3 gap-8">
          <div>
            <h4 className="text-brand-green font-inter text-base font-semibold mb-4">
              公司介绍
            </h4>
            <div className="space-y-2">
              <div className="text-[#999] font-inter text-sm">企业简介</div>
              <div className="text-[#999] font-inter text-sm">发展历程</div>
              <div className="text-[#999] font-inter text-sm">企业文化</div>
            </div>
          </div>

          <div>
            <h4 className="text-brand-green font-inter text-base font-semibold mb-4">
              成功案例
            </h4>
            <div className="space-y-2">
              <div className="text-[#999] font-inter text-sm">典型案例</div>
              <div className="text-[#999] font-inter text-sm">客户见证</div>
            </div>
          </div>

          <div>
            <h4 className="text-brand-green font-inter text-base font-semibold mb-4">
              联系我们
            </h4>
            <div className="space-y-2">
              <div className="text-[#999] font-inter text-sm">联系方式</div>
              <div className="text-[#999] font-inter text-sm">地址信息</div>
            </div>
          </div>
        </div>
      </div>
    </Dropdown>
  );
}
