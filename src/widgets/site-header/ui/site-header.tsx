"use client";

import { AnimatePresence, useMotionValueEvent, useScroll } from "motion/react";
import * as m from "motion/react-m";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { profile } from "@/entities/profile";
import { ThemeToggle } from "@/features/theme-toggle";
import { NAV_ITEMS } from "@/shared/config/routes";
import { externalLinkProps } from "@/shared/lib/external-link";
import { ButtonLink, buttonClass } from "@/shared/ui/button-link";
import { PixelWordmark } from "@/shared/ui/pixel-wordmark";
import { Reveal } from "@/shared/ui/reveal";
import { NavTabs } from "./nav-tabs";

const HIDE_AFTER_PX = 80;
const EASE = [0.22, 1, 0.36, 1] as const;
const DRAWER_ROW = "flex w-full gap-3 py-3 font-medium";
const DRAWER_LINKS = [
  ...NAV_ITEMS,
  { href: profile.contacts.github.href, label: profile.contacts.github.label },
];

export function SiteHeader() {
  const pathname = usePathname();
  // Storing the path the menu was opened on closes it on any navigation, including browser back.
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const { scrollY } = useScroll();

  const isMenuOpen = menuPath === pathname;
  const closeMenu = () => setMenuPath(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setIsScrollingDown(latest > previous && latest > HIDE_AFTER_PX);
  });

  return (
    <m.header
      className="sticky top-0 z-20 border-b border-hairline bg-canvas"
      animate={{ y: isScrollingDown && !isMenuOpen ? "-100%" : "0%" }}
      transition={{ duration: 0.3, ease: EASE }}
      onKeyDown={(event) => event.key === "Escape" && closeMenu()}
    >
      <div className="frame flex h-14 items-center justify-between gap-4">
        <Link
          href="/"
          aria-label={`${profile.name}, home`}
          className="flex h-14 items-center"
          onClick={closeMenu}
        >
          <PixelWordmark text={profile.firstName} className="h-4 w-auto" />
        </Link>
        <NavTabs className="hidden md:ml-auto md:flex" />
        <div className="hidden items-center gap-3 md:flex">
          <ButtonLink href={profile.contacts.github.href}>GitHub</ButtonLink>
          <ThemeToggle
            toDark="[dark]"
            toLight="[light]"
            className={buttonClass("secondary")}
          />
        </div>
        <button
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuPath(isMenuOpen ? null : pathname)}
          className="-mr-2 h-11 cursor-pointer rounded-sm px-2 font-medium active:text-mute md:hidden"
        >
          {isMenuOpen ? "[close]" : "[menu]"}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <m.div
            id="mobile-menu"
            className="absolute inset-x-0 top-full overflow-hidden border-b border-hairline bg-canvas md:hidden"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <nav aria-label="Mobile" className="frame flex flex-col py-2">
              {DRAWER_LINKS.map(({ href, label }, index) => {
                const isActive = pathname === href;

                return (
                  <Reveal key={href} delay={0.08 + index * 0.05}>
                    <Link
                      href={href}
                      onClick={closeMenu}
                      aria-current={isActive ? "page" : undefined}
                      className={`${DRAWER_ROW} ${isActive ? "text-ink" : "text-mute"}`}
                      {...externalLinkProps(href)}
                    >
                      <span aria-hidden="true">{isActive ? "[x]" : "[+]"}</span>
                      {label}
                    </Link>
                  </Reveal>
                );
              })}
              <Reveal delay={0.08 + DRAWER_LINKS.length * 0.05}>
                <ThemeToggle
                  marker="[+]"
                  toDark="Dark mode"
                  toLight="Light mode"
                  className={`${DRAWER_ROW} text-mute`}
                />
              </Reveal>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </m.header>
  );
}
