import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
  ],
  server: {
    // When VITE_PROXY_TARGET is set (e.g. in Docker dev), proxy /api to the backend
    // container so the browser only needs to reach the Vite dev server.
    ...(process.env.VITE_PROXY_TARGET
      ? {
          proxy: {
            "/api": {
              target: process.env.VITE_PROXY_TARGET,
              changeOrigin: true,
            },
          },
        }
      : {}),
  },
});
