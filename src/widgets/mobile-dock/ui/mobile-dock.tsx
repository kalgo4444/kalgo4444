"use client";

import { House, Layers, type LucideIcon, Send, User } from "lucide-react";
import * as m from "motion/react-m";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS, type NavHref } from "@/shared/config/routes";

const ICONS: Record<NavHref, LucideIcon> = {
  "/": House,
  "/about": User,
  "/stack": Layers,
  "/contact": Send,
};

// Phone and tablet navigation: the active tab lifts into a bubble that bites a notch out of the bar.
export function MobileDock() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-20 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] lg:hidden"
    >
      <div className="mx-auto grid h-16 max-w-md grid-cols-4 rounded-2xl bg-ink text-canvas">
        {NAV_ITEMS.map(({ href, label }) => {
          const isActive = pathname === href;
          const Icon = ICONS[href];

          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={`relative flex flex-col items-center justify-end gap-0.5 pb-2 text-caption leading-tight ${isActive ? "font-bold" : "text-ash"}`}
            >
              <Icon
                aria-hidden="true"
                className={`size-5 ${isActive ? "invisible" : ""}`}
                strokeWidth={1.5}
              />
              {label}
              {isActive && (
                // The canvas-coloured border is the gap between bubble and bar, so it reads as a cut-out notch.
                <m.span
                  layoutId="dock-bubble"
                  aria-hidden="true"
                  className="absolute inset-x-0 -top-7 mx-auto flex size-15 items-center justify-center rounded-full border-6 border-canvas bg-ink"
                  transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                >
                  <Icon className="size-5" strokeWidth={2} />
                </m.span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
