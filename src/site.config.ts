import type {SiteConfigDataType} from "./interfaces/site-config-data.type.ts";
import type {RoutingDataType} from "./interfaces/routing-data.type.ts";

export const SITE_CONFIG: SiteConfigDataType = {
  author: {
    name: "Nikolaos Kapatos",
    url: "kapatos.com",
    photo: "photo.png"
  },
  description: "Personal site and digital corner of Nikolaos Kapatos",
  title: "Nikolaos Kapatos",
}

export const SITE_ROUTING: RoutingDataType[] = [{
  title: "Home",
  path: "/"
}, {
  title: "About",
  path: "/about/"
}, {
  title: "Posts",
  path: "/posts/"
}
]
