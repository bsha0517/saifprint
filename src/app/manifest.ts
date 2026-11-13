import type { MetadataRoute } from "next";
import { business } from "@/config/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: business.name,
    short_name: business.shortName,
    description: business.description,
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#171D3D",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
