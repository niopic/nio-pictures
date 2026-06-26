import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://niopictures.com",
  integrations: [sitemap()],
  trailingSlash: "never",
  devToolbar: {
    enabled: false,
  },
  build: {
    format: "file",
  },
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
      config: {
        formats: ["avif", "webp"],
        densities: [1, 2],
      },
    },
  },
});
