"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import * as m from "motion/react-m";
import Link from "next/link";
import { useState } from "react";
import { profile } from "@/entities/profile";
import { ThemeToggle } from "@/features/theme-toggle";
import { ButtonLink, buttonClass } from "@/shared/ui/button-link";
import { PixelWordmark } from "@/shared/ui/pixel-wordmark";
import { NavTabs } from "./nav-tabs";

const HIDE_AFTER_PX = 80;
const EASE = [0.22, 1, 0.36, 1] as const;

// Below lg the page links live in the MobileDock widget; the header keeps only the wordmark and actions.
export function SiteHeader() {
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setIsScrollingDown(latest > previous && latest > HIDE_AFTER_PX);
  });

  return (
    <m.header
      className="sticky top-0 z-20 border-b border-hairline bg-canvas"
      animate={{ y: isScrollingDown ? "-100%" : "0%" }}
      transition={{ duration: 0.3, ease: EASE }}
    >
      <div className="frame flex h-14 items-center justify-between gap-4">
        <Link
          href="/"
          aria-label={`${profile.name}, home`}
          className="flex h-14 items-center"
        >
          <PixelWordmark text={profile.firstName} className="h-4 w-auto" />
        </Link>
        <NavTabs className="hidden lg:ml-auto lg:flex" />
        <div className="flex items-center gap-3">
          <ButtonLink href={profile.contacts.github.href}>GitHub</ButtonLink>
          <ThemeToggle
            toDark="[dark]"
            toLight="[light]"
            className={buttonClass("secondary")}
          />
        </div>
      </div>
    </m.header>
  );
}
