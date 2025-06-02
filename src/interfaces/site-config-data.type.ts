import type {AuthorConfigDataType} from "./author-config-data.type.ts";
import type {RoutingDataType} from "./routing-data.type.ts";

export type SiteConfigDataType = {
  author: AuthorConfigDataType;
  title: string;
  description: string;
}

