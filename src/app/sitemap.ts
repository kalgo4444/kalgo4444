import type { MetadataRoute } from "next";
import { NAV_ITEMS } from "@/shared/config/routes";
import { SITE_URL } from "@/shared/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return NAV_ITEMS.map(({ href }) => ({
    url: `${SITE_URL}${href === "/" ? "" : href}`,
    priority: href === "/" ? 1 : 0.8,
  }));
}
