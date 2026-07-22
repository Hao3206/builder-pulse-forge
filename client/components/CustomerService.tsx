import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ClipboardPenLine,
  Headphones,
  MessageCircle,
  Phone,
  QrCode,
  X,
} from "lucide-react";

const CONTACT_PHONE = "18969889828";

export default function CustomerService() {
  const [isOpen, setIsOpen] = useState(false);
  const [showWechatQr, setShowWechatQr] = useState(false);
  const [wechatQrCodeUrl, setWechatQrCodeUrl] = useState("");
  const [loadingQr, setLoadingQr] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/site-settings/customer-service", {
      signal: controller.signal,
    })
      .then(async (response) => {
        const result = await response.json().catch(() => ({}));
        if (response.ok && result.success) {
          setWechatQrCodeUrl(result.data?.wechatQrCodeUrl || "");
        }
      })
      .catch(() => undefined)
      .finally(() => setLoadingQr(false));
    return () => controller.abort();
  }, []);

  const closePopup = () => {
    setIsOpen(false);
    setShowWechatQr(false);
  };

  const openPopup = () => {
    setIsOpen(true);
    setShowWechatQr(false);
  };

  return (
    <>
      <div className="fixed bottom-5 right-4 z-50 sm:bottom-auto sm:right-6 sm:top-3/4 sm:-translate-y-1/2">
        <button
          type="button"
          onClick={isOpen ? closePopup : openPopup}
          aria-label={isOpen ? "关闭客服窗口" : "联系客服"}
          aria-expanded={isOpen}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#058A65] text-white shadow-lg transition hover:bg-[#046B52] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#058A65] focus-visible:ring-offset-2 sm:h-[140px] sm:w-[50px] sm:flex-col sm:gap-2"
        >
          <Headphones className="h-6 w-6" />
          <span className="hidden text-sm font-medium leading-4 sm:block">
            联系
            <br />
            客服
          </span>
        </button>
      </div>

      {isOpen && (
        <>
          <button
            type="button"
            aria-label="关闭客服窗口"
            onClick={closePopup}
            className="fixed inset-0 z-40 bg-black/45"
          />

          <section
            role="dialog"
            aria-modal="true"
            aria-label={showWechatQr ? "微信客服二维码" : "客服联系方式"}
            className="fixed bottom-20 left-4 right-4 z-50 overflow-hidden rounded-md border border-gray-200 bg-white shadow-xl sm:bottom-auto sm:left-auto sm:right-[86px] sm:top-1/2 sm:w-[320px] sm:-translate-y-1/2"
          >
            <header className="flex h-14 items-center justify-between border-b border-gray-100 px-4">
              <div className="flex items-center gap-2">
                {showWechatQr && (
                  <button
                    type="button"
                    onClick={() => setShowWechatQr(false)}
                    aria-label="返回客服方式"
                    className="flex h-9 w-9 items-center justify-center text-gray-500 hover:text-[#058A65]"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                )}
                <h2 className="font-semibold text-[#333]">
                  {showWechatQr ? "微信客服" : "联系我们"}
                </h2>
              </div>
              <button
                type="button"
                onClick={closePopup}
                aria-label="关闭客服窗口"
                className="flex h-9 w-9 items-center justify-center text-gray-400 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            {showWechatQr ? (
              <div className="flex min-h-72 flex-col items-center justify-center p-6 text-center">
                {loadingQr ? (
                  <div className="text-sm text-gray-500">正在读取客服信息</div>
                ) : wechatQrCodeUrl ? (
                  <>
                    <div className="h-48 w-48 overflow-hidden rounded-md border border-gray-200 bg-white p-2">
                      <img
                        src={wechatQrCodeUrl}
                        alt="微信客服二维码"
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <p className="mt-4 text-sm text-gray-600">
                      使用微信扫描二维码联系客服
                    </p>
                  </>
                ) : (
                  <>
                    <QrCode className="h-12 w-12 text-gray-300" />
                    <p className="mt-4 text-sm font-medium text-gray-700">
                      微信客服暂未配置
                    </p>
                    <a
                      href={`tel:${CONTACT_PHONE}`}
                      className="mt-3 text-sm font-semibold text-[#058A65]"
                    >
                      电话咨询 {CONTACT_PHONE}
                    </a>
                  </>
                )}
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                <a
                  href={`tel:${CONTACT_PHONE}`}
                  className="flex min-h-[72px] items-center gap-3 px-5 transition hover:bg-gray-50 focus-visible:bg-gray-50 focus-visible:outline-none"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F1F3F5] text-[#058A65]">
                    <Phone className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-[#333]">
                      咨询电话
                    </span>
                    <span className="mt-1 block text-xs font-medium text-[#058A65]">
                      {CONTACT_PHONE}
                    </span>
                  </span>
                </a>

                <button
                  type="button"
                  onClick={() => setShowWechatQr(true)}
                  className="flex min-h-[72px] w-full items-center gap-3 px-5 text-left transition hover:bg-gray-50 focus-visible:bg-gray-50 focus-visible:outline-none"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F1F3F5] text-[#058A65]">
                    <MessageCircle className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-[#333]">
                      微信客服
                    </span>
                    <span className="mt-1 block text-xs text-gray-500">
                      扫描二维码，在线沟通
                    </span>
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    closePopup();
                    navigate("/about#contact");
                  }}
                  className="flex min-h-[72px] w-full items-center gap-3 px-5 text-left transition hover:bg-gray-50 focus-visible:bg-gray-50 focus-visible:outline-none"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F1F3F5] text-[#058A65]">
                    <ClipboardPenLine className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-[#333]">
                      业务咨询
                    </span>
                    <span className="mt-1 block text-xs text-gray-500">
                      提交需求，我们会尽快联系您
                    </span>
                  </span>
                </button>
              </div>
            )}
          </section>
        </>
      )}
    </>
  );
}
