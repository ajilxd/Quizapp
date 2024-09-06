import { createProxyMiddleware } from "http-proxy-middleware";
export const userProxy = createProxyMiddleware({
  target: "http://user_service:8001",
  changeOrigin: true,
});

export const quizProxy = createProxyMiddleware({
  target: "http://quiz_service:8002",
  changeOrigin: true,
});
