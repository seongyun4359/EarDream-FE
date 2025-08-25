import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  // 개발 환경에서만 프록시 설정 사용
  const isDev = mode === "development";

  return {
    plugins: [react(), tailwindcss()],
    server: isDev
      ? {
          port: 4000,
          proxy: {
            "/api": {
              target: env.VITE_API_BASE_URL,
              changeOrigin: true,
              secure: false,
              rewrite: (path) => path,
              configure: (proxy: any) => {
                proxy.on("error", (err: any) => {
                  console.log("프록시 에러:", err);
                });
                proxy.on("proxyReq", (proxyReq: any, req: any) => {
                  // CORS 문제 해결을 위해 Origin 헤더 제거
                  proxyReq.removeHeader("origin");
                  console.log(
                    "프록시 요청:",
                    req.method,
                    req.url,
                    "->",
                    env.VITE_API_BASE_URL + req.url
                  );
                });
                proxy.on("proxyRes", (proxyRes: any, req: any) => {
                  console.log("프록시 응답:", proxyRes.statusCode, req.url);
                });
              },
            },
            "/auth": {
              target: env.VITE_API_BASE_URL,
              changeOrigin: true,
              secure: false,
              rewrite: (path) => path,
              configure: (proxy: any) => {
                proxy.on("error", (err: any) => {
                  console.log("인증 프록시 에러:", err);
                });
                proxy.on("proxyReq", (proxyReq: any, req: any) => {
                  // CORS 문제 해결을 위해 Origin 헤더 제거
                  proxyReq.removeHeader("origin");
                  console.log(
                    "인증 프록시 요청:",
                    req.method,
                    req.url,
                    "->",
                    env.VITE_API_BASE_URL + req.url
                  );
                });
                proxy.on("proxyRes", (proxyRes: any, req: any) => {
                  console.log(
                    "인증 프록시 응답:",
                    proxyRes.statusCode,
                    req.url
                  );
                });
              },
            },
          },
        }
      : undefined,
  };
});
