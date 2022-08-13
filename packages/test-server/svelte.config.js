import adapter from "@sveltejs/adapter-auto";
import preprocess from "svelte-preprocess";
import { resolve } from "path";
import { fileURLToPath } from "url";

// @ts-ignore
const __dirname = fileURLToPath(new URL(".", import.meta.url));

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    preprocess({
      postcss: true,
    }),
  ],

  kit: {
    adapter: adapter(),
    alias: {
      $stores: resolve(__dirname, "src/stores"),
    },
  },
};

export default config;
