// react-router.config.ts
import type { Config } from "@react-router/dev/config";

const config: Config = {
  // SPA mode – no SSR needed for your marketing site
  ssr: false,

  // (optional) you can be explicit, but "app" is the default:
  appDirectory: "app",
};

export default config;
