import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/** Open to every crawler since her sign-off (PRD, D51). */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
