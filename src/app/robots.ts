import type { MetadataRoute } from "next";

const SITE = "https://resume-builder-pro-pi-jade.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard", "/resume", "/login", "/register"],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
  };
}
