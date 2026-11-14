export const NAV_ITEMS = [
  {
    href: "/",
    label: "Home",
    title: undefined,
    description:
      "Software engineer in Tashkent, Uzbekistan, building web apps with React, Next.js and NestJS and teaching web development.",
  },
  {
    href: "/about",
    label: "About",
    title: "About",
    description:
      "How I learned software engineering through internships and teaching, and how I think about building with AI.",
  },
  {
    href: "/stack",
    label: "Stack",
    title: "Stack",
    description:
      "The languages, frameworks, databases and AI tools I work with: TypeScript, React, Next.js, NestJS, PostgreSQL, Ollama and MCP.",
  },
  {
    href: "/contact",
    label: "Contact",
    title: "Contact",
    description:
      "Reach me on GitHub, LinkedIn, Telegram or by email to talk about web development, teaching or AI.",
  },
] as const;

export type NavHref = (typeof NAV_ITEMS)[number]["href"];
