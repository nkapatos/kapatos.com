import { defineConfig } from 'astro/config';
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon"

import expressiveCode from 'astro-expressive-code'
import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections'
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'

import {SITE_ROUTING} from "./src/site.config";
import { expressiveCodeConfig } from './expressive-code.config';

// https://astro.build/config
export default defineConfig({
  site: "https://kapatos.com",
  prefetch: true,
  markdown: {
    remarkRehype: {
      footnoteLabelTagName: "h4",
    }
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes(`${SITE_ROUTING.notes.path}/tags`)
    }), icon({
    }),
    expressiveCode({
      ...expressiveCodeConfig,
      defaultProps: {
        ...expressiveCodeConfig.defaultProps,
        collapseStyle: 'collapsible-auto'
      }
    }),
  ],
  devToolbar: {
    enabled: false
  },
});
