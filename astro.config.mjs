import { defineConfig } from 'astro/config';
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";


// https://astro.build/config
export default defineConfig({
  site: "https://kapatos.com",
  prefetch: true,
  trailingSlash: "always",
  markdown: {
    remarkRehype: {
      footnoteLabelTagName: "h4"
    }
  },
  integrations: [sitemap(), icon()],
  devToolbar: {
    enabled: false
  },
});