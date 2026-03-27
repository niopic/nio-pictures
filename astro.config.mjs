import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://niopictures.com",
  trailingSlash: "never",
  build: {
    format: "file",
  },
});
