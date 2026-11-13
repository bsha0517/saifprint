import type { MetadataRoute } from "next";
import { absoluteUrl, allowIndexing } from "@/lib/site-url";

export const dynamic = "force-static";

/**
 * Production builds (NEXT_PUBLIC_ALLOW_INDEXING=true + NEXT_PUBLIC_SITE_URL set) allow crawling.
 * Every other build — local, preview, staging — blocks all crawlers.
 */
export default function robots(): MetadataRoute.Robots {
  if (!allowIndexing) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
