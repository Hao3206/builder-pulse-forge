import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { applyDynamicMeta } from "@/lib/dynamic-meta";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    applyDynamicMeta({
      title: "页面不存在 - 浙东环境能源交易所",
      description: "请求的页面不存在或已被移动。",
      noIndex: true,
    });
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-5">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="mb-4 text-xl text-gray-600">页面不存在或已被移动</p>
        <Link
          to="/"
          className="font-medium text-[#058A65] hover:text-[#046B52] underline"
        >
          返回首页
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
