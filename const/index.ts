import { Code2, FileCode, Globe, Layout, Server } from "lucide-react";

import kalgomovie from '@/public/images/kalgomovie.png'
import kaldotodos from '@/public/images/kaldotodos.png'
import kaldodev from '@/public/images/kaldodev.png'
// import mini_ecommerce from '@/public/images/mini-ecommerce.png'


export const projects = [
  {
    title: "KalgoMovie.",
    description:
      "A modern Movie App for search and filter movies and find good movie for night!",
    image: kalgomovie,
    tags: ["Next.js", "TypeScript", "Tailwind", "Tanstack Query", "shadcn/ui"],
    demo: "https://kalgomovie.vercel.app/",
    github: "https://github.com/kalgo4444/kalgomovie",
  },
  {
    title: "KalgoDev.",
    description:
      "A web platform for programming news.Through the platform, users can CRUD and AUTH with Mock API",
    image: kaldodev,
    tags: ["React", "Redux", "React", "Tanstack Query", "Axios", 'Tailwind'],
    demo: "https://kalgo-dev.vercel.app/",
    github: "https://vercel.com/kalgos-projects/kalgo-dev",
  },
  {
    title: "KaldoTodos.",
    description:
      "Simple, fast and Open Source Todo Task menager for everyone",
    image: kaldotodos,
    tags: ["Next.js", "Reract", "Node.Js", "Express.Js", "MondoDB", "shadcn/ui"],
    demo: "#",
    github: "https://github.com/kalgo4444/full-stuck-todos",
  },
];

export const skills = [
  {
    name: "HTML5",
    icon: FileCode,
    description: "Semantic markup & accessibility",
  },
  {
    name: "CSS3",
    icon: Layout,
    description: "Responsive design & animations",
  },
  {
    name: "JavaScript",
    icon: Code2,
    description: "ES6+, DOM manipulation, async",
  },
  {
    name: "React",
    icon: Globe,
    description: "Components, hooks, state management",
  },
  {
    name: "Next.js",
    icon: Server,
    description: "SSR, SSG, API routes, App Router",
  },
  {
    name: "Tailwind CSS",
    icon: Layout,
    description: "Utility-first styling, design systems",
  },
];
