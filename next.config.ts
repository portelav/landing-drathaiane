import type { NextConfig } from "next";
import { SITE_URL } from "./src/lib/site";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const nextConfig: NextConfig = {
  images: {
    // The contact map is a Mapbox static image, fetched and cached by the
    // server so the visitor's browser never talks to Mapbox. Pinned to the
    // styles path and to this exact token, so the optimizer cannot be pointed
    // at anything else. No token, no pattern, and the section shows its
    // fallback.
    remotePatterns: MAPBOX_TOKEN
      ? [
          {
            protocol: "https",
            hostname: "api.mapbox.com",
            pathname: "/styles/v1/mapbox/**",
            search: `?access_token=${MAPBOX_TOKEN}`,
          },
        ]
      : [],
  },
  // The old production address leads to the domain, so search engines see one
  // site (PRD, D53). Matched by exact host: preview deployments have their own
  // and keep working.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "drathaianelessa\\.vercel\\.app" }],
        destination: `${SITE_URL}/:path*`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
