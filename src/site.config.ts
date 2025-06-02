import type { SiteConfigDataType } from "./interfaces/site-config-data.type.ts";
import type { RoutingDataType } from "./interfaces/routing-data.type.ts";

export const SITE_CONFIG: SiteConfigDataType = {
  author: {
    name: "Nikolaos Kapatos",
    url: "kapatos.com",
    photo: "photo.png"
  },
  description: "Personal site and digital corner of Nikolaos Kapatos",
  title: "Nikolaos Kapatos",
}

export const SITE_ROUTING: RoutingDataType = {
  home: {
    title: "Home",
    path: "/"
  },
  about: {
    title: "About",
    path: "/about"
  },
  notes: {
    title: "Notes",
    path: "/notes"
  }, projects: {
    title: "Projects",
    path: "/projects",
    enabled: false
  }, contact: {
    title: "Contact",
    path: "/contact",
    enabled: false
  }
}

export enum SITE_COLLECTIONS {
  NOTES = "notes",
  PROJECTS = "projects",
}


