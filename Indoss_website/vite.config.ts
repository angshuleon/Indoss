import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths()],
  server: {
    host: true,          // listen on all interfaces (so tunnels / LAN can hit it)
    port: 5173,
    allowedHosts: true,  // ✅ allow ANY host (Cloudflare, ngrok, etc.)
  },
  });
