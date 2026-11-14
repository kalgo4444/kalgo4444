import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Seconds to wait before rising in; use it to stagger siblings. */
  delay?: number;
  as?: "div" | "li";
  className?: string;
};

// Pure CSS (see .animate-rise in globals.css): it plays on first paint without waiting for JavaScript,
// replays on every navigation, and turns into a scroll reveal on phone/tablet where supported.
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: RevealProps) {
  return (
    <Tag
      className={`animate-rise ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </Tag>
  );
}
