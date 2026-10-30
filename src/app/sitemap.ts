import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/** One page: every section lives on the home. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: SITE_URL }];
}
