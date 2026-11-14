"use client";

import * as m from "motion/react-m";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/shared/config/routes";

export function NavTabs({ className = "" }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Main" className={className}>
      {NAV_ITEMS.map(({ href, label }) => {
        const isActive = pathname === href;

        return (
          <Link
            key={href}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={`relative px-4 py-2 font-medium leading-8 transition-colors hover:text-ink ${isActive ? "text-ink" : "text-mute"}`}
          >
            {label}
            {isActive && (
              <m.span
                layoutId="nav-underline"
                className="absolute inset-x-4 bottom-0 h-0.5 bg-ash"
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
