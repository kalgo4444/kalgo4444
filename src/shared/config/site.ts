// Read at build time: pages are prerendered, so set SITE_URL before `next build`.
export const SITE_URL = (
  process.env.SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");
