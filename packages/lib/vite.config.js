import { defineConfig } from "vite";

// noinspection JSUnusedGlobalSymbols
export default defineConfig({
  build: {
    target: "esnext",

    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      fileName: (format) => `index.${format}.js`,
    },

    rollupOptions: {
      external: ["$app/stores"],
    },
  },
});
