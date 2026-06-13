import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    resolve: {
      conditions: ["browser"],
    },
    test: {
      environment: "jsdom",
      setupFiles: ["./src/setup-vitest.ts"],
      include: ["src/**/*.{test,spec}.{js,ts}"],
    },
  }),
);
