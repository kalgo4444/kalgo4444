import { SITE_URL } from "@/shared/config/site";
import { profile } from "./profile";

// schema.org Person: lets search engines tie the name, role and profiles together.
export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  givenName: profile.firstName,
  familyName: profile.lastName,
  alternateName: profile.username,
  jobTitle: profile.role,
  description: profile.bio[0],
  url: SITE_URL,
  email: profile.contacts.email.href,
  address: {
    "@type": "PostalAddress",
    addressLocality: profile.city,
    addressCountry: profile.country,
  },
  knowsAbout: [
    ...profile.skills,
    ...profile.stack.flatMap(({ items }) => items),
  ],
  sameAs: [
    profile.contacts.github.href,
    profile.contacts.linkedin.href,
    profile.contacts.telegram.href,
  ],
};
