import type { ReactNode } from "react";

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <h2 className="border-b border-hairline pb-2 font-bold">{children}</h2>
  );
}
