import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/80 backdrop-blur-md py-6 sm:py-8">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <p className="text-sm font-medium text-foreground">
            &copy; {new Date().getFullYear()} Kalgo4444 Portfolio
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Built with Next.js & Tailwind CSS
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/kalgo4444"
            target="_blank"
            className="p-2 rounded-full bg-secondary/50 text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/abdulaziz-abdugafurov/"
            target="_blank"
            className="p-2 rounded-full bg-secondary/50 text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </Link>
          <Link
            href="mailto:abuxyziabd@gmail.com"
            className="p-2 rounded-full bg-secondary/50 text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
            aria-label="Email"
          >
            <Mail className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
