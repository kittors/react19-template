import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: Number(env.VITE_PORT) || 3000,
      host: env.VITE_HOST || "localhost",
      strictPort: false, // 是否严格检查端口
      open: env.VITE_OPEN === "true", // 是否自动打开浏览器
      logger: {
        browserLogPrefix: false,
      },
    },
  };
});
