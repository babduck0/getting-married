import vue from "@vitejs/plugin-vue";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
// @ts-expect-error: type issues with vite-plugin-eslint
import eslint from "vite-plugin-eslint";

// https://vite.dev/config/
export default defineConfig({
  base: "/getting-married/",
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag.includes("-"),
        },
      },
    }),
    eslint(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@/assets/css/reset.scss";
          @import "@/assets/css/variables.scss";
          @import "@/assets/css/common.scss";
        `,
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
