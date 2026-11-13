import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

/** Empty until NEXT_PUBLIC_SITE_URL is configured, so no placeholder domain is ever published. */
export default function sitemap(): MetadataRoute.Sitemap {
  const home = absoluteUrl("/");
  if (!home) return [];
  return [{ url: home, changeFrequency: "monthly", priority: 1 }];
}
