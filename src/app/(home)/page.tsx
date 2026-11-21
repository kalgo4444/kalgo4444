import {
  AtSign,
  BriefcaseBusiness,
  GitBranch,
  Mail,
  Send,
  type LucideIcon,
} from "lucide-react"

const links: { label: string; href: string; icon: LucideIcon }[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/abdulaziz-abdugafurov/",
    icon: BriefcaseBusiness,
  },
  { label: "Twitter", href: "https://x.com/kalgo4444", icon: AtSign },
  { label: "GitHub", href: "https://github.com/kalgo4444/", icon: GitBranch },
  { label: "Telegram", href: "https://t.me/abdulaziz_abdugafurov", icon: Send },
  { label: "Email", href: "mailto:abuxyziabd@gmail.com", icon: Mail },
];

export default function Page() {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-8 px-6 text-center">
      <h1 className="text-4xl font-medium tracking-tight sm:text-5xl">
        Abdulaziz Abdugafurov
      </h1>
      <ul className="flex flex-wrap items-center justify-center gap-4">
        {links.map(({ label, href, icon: Icon }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-current/20 px-5 py-3 transition hover:scale-105 hover:border-current/60"
            >
              <Icon className="size-5" />
              <span>{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
