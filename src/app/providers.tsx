"use client";

import { LazyMotion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";

const loadMotionFeatures = () =>
  import("@/shared/lib/motion-features").then((module) => module.default);

export function Providers({ children }: { children: ReactNode }) {
  return (
    // strict: any full `motion.*` import (which would bundle every feature up front) throws in dev.
    <LazyMotion features={loadMotionFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
