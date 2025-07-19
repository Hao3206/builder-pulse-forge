import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface QueryProviderProps {
  children: ReactNode;
}

export default function QueryProvider({ children }: QueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // 默认5分钟过期
            staleTime: 5 * 60 * 1000,
            // 10分钟垃圾回收
            gcTime: 10 * 60 * 1000,
            // 失败重试3次
            retry: 3,
            // 重试延迟
            retryDelay: (attemptIndex) =>
              Math.min(1000 * 2 ** attemptIndex, 30000),
            // 窗口聚焦时重新获取
            refetchOnWindowFocus: false,
            // 网络重连时重新获取
            refetchOnReconnect: true,
          },
          mutations: {
            // 失败重试1次
            retry: 1,
            // 重试延迟
            retryDelay: 1000,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
