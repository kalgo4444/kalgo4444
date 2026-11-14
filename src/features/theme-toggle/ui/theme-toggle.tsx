"use client";

import { THEME_STORAGE_KEY } from "../config";

type ThemeToggleProps = {
  /** Label shown in light mode, offering to switch to dark. */
  toDark: string;
  /** Label shown in dark mode, offering to switch back. */
  toLight: string;
  /** Optional list-style marker rendered before the label. */
  marker?: string;
  className?: string;
};

export function ThemeToggle({
  toDark,
  toLight,
  marker,
  className,
}: ThemeToggleProps) {
  const handleToggle = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem(THEME_STORAGE_KEY, isDark ? "dark" : "light");
    } catch {
      // Storage is blocked (private mode); the theme still switches, it just won't persist.
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label="Toggle dark mode"
      className={`cursor-pointer ${className}`}
    >
      {marker && <span aria-hidden="true">{marker}</span>}
      {/* Label swaps with CSS on the html.dark class, so there is no state to hydrate. */}
      <span className="dark:hidden">{toDark}</span>
      <span className="hidden dark:inline">{toLight}</span>
    </button>
  );
}
