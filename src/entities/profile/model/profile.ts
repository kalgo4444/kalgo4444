// Source of truth: docs/index.md
const firstName = "Abdulaziz";
const lastName = "Abdugafurov";

export const profile = {
  firstName,
  lastName,
  name: `${firstName} ${lastName}`,
  username: "kalgo4444",
  role: "Software Engineer",
  city: "Tashkent",
  country: "Uzbekistan",
  location: "Tashkent, Uzbekistan",
  tagline: "I build for the web and teach others to do the same.",
  bio: [
    "I study software engineering at university, and I gained my core knowledge and practical experience through internships at IT companies and by teaching web development to students. I focus on explaining complex concepts in simple terms. During my classes, I have worked closely with students to build everything from simple projects to large, real-world applications.",
    "I also spend a lot of time thinking about how developers can use AI well. There's a big difference between adding an LLM to an application and building something that developers can actually rely on.",
  ],
  highlights: [
    { label: "Studying", text: "Software engineering at university" },
    { label: "Interning", text: "Practical experience at IT companies" },
    {
      label: "Teaching",
      text: "Web development, from simple projects to large, real-world applications",
    },
    { label: "Exploring", text: "How developers can use AI well" },
  ],
  stack: [
    { group: "Languages", items: ["JavaScript", "TypeScript", "Python"] },
    { group: "Front end", items: ["React.js", "Next.js"] },
    { group: "Back end", items: ["NodeJS", "NestJS"] },
    { group: "Databases", items: ["PostgreSQL", "SQLite"] },
    { group: "Tools", items: ["Local LLMs", "Ollama", "AI agents", "MCP"] },
  ],
  skills: ["Web Development", "Full-Stack Development", "Software Engineer"],
  contacts: {
    github: {
      label: "GitHub",
      handle: "github.com/kalgo4444",
      href: "https://github.com/kalgo4444",
    },
    linkedin: {
      label: "LinkedIn",
      handle: "linkedin.com/in/abdulaziz-abdugafurov",
      href: "https://linkedin.com/in/abdulaziz-abdugafurov",
    },
    telegram: {
      label: "Telegram",
      handle: "t.me/abdulaziz_abdugafurov",
      href: "https://t.me/abdulaziz_abdugafurov",
    },
    email: {
      label: "Email",
      handle: "abuxyziabd@gmail.com",
      href: "mailto:abuxyziabd@gmail.com",
    },
  },
} as const;

export const contactList = Object.values(profile.contacts);
