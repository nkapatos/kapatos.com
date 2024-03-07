import { defineConfig } from 'astro/config';

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://kapatos.com",
  prefetch: true,
  markdown: {
    remarkRehype: {
      footnoteLabelTagName: "h4"
    }
  },
  integrations: [sitemap()],
  devToolbar: {
    enabled: false
  }
});