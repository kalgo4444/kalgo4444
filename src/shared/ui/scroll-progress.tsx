"use client";

import { useScroll } from "motion/react";
import * as m from "motion/react-m";

// Hidden on lg+: the desktop layout is a fixed 100vh and never scrolls.
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <m.div
      aria-hidden="true"
      style={{ scaleX: scrollYProgress }}
      className="fixed inset-x-0 top-0 z-30 h-0.5 origin-left bg-ink lg:hidden"
    />
  );
}
