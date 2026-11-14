import type { Metadata } from "next";
import { NAV_ITEMS, type NavHref } from "@/shared/config/routes";
import { SITE_URL } from "@/shared/config/site";
import { profile } from "./profile";

// Short tab titles: "Abdulaziz Abdugafurov" on home, "About | Abdulaziz" elsewhere.
const DEFAULT_TITLE = profile.name;
const TITLE_SUFFIX = profile.firstName;

// Next.js replaces (not merges) nested objects like openGraph, so every page repeats this base.
const openGraphBase = {
  type: "profile",
  siteName: profile.name,
  locale: "en_US",
  firstName: profile.firstName,
  lastName: profile.lastName,
  username: profile.username,
} as const;

export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: DEFAULT_TITLE, template: `%s | ${TITLE_SUFFIX}` },
  applicationName: profile.name,
  authors: [{ name: profile.name, url: profile.contacts.github.href }],
  creator: profile.name,
  keywords: [
    profile.name,
    profile.username,
    `${profile.role} ${profile.city}`,
    `Full-stack developer ${profile.country}`,
    ...profile.stack.flatMap(({ items }) => items),
  ],
  robots: { index: true, follow: true },
  openGraph: openGraphBase,
  twitter: { card: "summary_large_image" },
};

export function pageMetadata(href: NavHref): Metadata {
  const page = NAV_ITEMS.find((item) => item.href === href);
  if (!page) throw new Error(`No route config for ${href}`);

  const fullTitle = page.title
    ? `${page.title} | ${TITLE_SUFFIX}`
    : DEFAULT_TITLE;
  const social = { title: fullTitle, description: page.description };

  return {
    ...(page.title && { title: page.title }),
    description: page.description,
    alternates: { canonical: page.href },
    openGraph: { ...openGraphBase, ...social, url: page.href },
    twitter: { card: "summary_large_image", ...social },
  };
}
