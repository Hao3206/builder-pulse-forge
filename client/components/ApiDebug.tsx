import { useEffect, useState } from "react";

export default function ApiDebug() {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    // 拦截fetch请求以调试
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const [url, options] = args;
      const logEntry = `FETCH: ${url} ${options?.method || "GET"}`;
      console.log(logEntry);
      setLogs((prev) => [...prev, logEntry]);

      try {
        const response = await originalFetch(...args);
        const successLog = `SUCCESS: ${url} - ${response.status}`;
        console.log(successLog);
        setLogs((prev) => [...prev, successLog]);
        return response;
      } catch (error) {
        const errorLog = `ERROR: ${url} - ${error}`;
        console.error(errorLog);
        setLogs((prev) => [...prev, errorLog]);
        throw error;
      }
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg max-w-md max-h-64 overflow-y-auto z-50">
      <h3 className="font-bold mb-2">API调试日志</h3>
      <div className="text-xs space-y-1">
        {logs.map((log, index) => (
          <div
            key={index}
            className={
              log.includes("ERROR")
                ? "text-red-400"
                : log.includes("SUCCESS")
                  ? "text-green-400"
                  : "text-blue-400"
            }
          >
            {log}
          </div>
        ))}
        {logs.length === 0 && <div className="text-gray-400">暂无API调用</div>}
      </div>
    </div>
  );
}
