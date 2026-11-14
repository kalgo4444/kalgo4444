import type { ReactNode } from "react";

// Text on the left, details on the right from lg; stacked on tablet and phone.
export function SplitLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 content-start gap-10 py-10 md:gap-12 md:py-16 lg:grid-cols-2 lg:content-center lg:items-center lg:gap-16 lg:py-8">
      {children}
    </div>
  );
}
