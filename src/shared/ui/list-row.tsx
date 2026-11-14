import type { ReactNode } from "react";

type ListRowProps = {
  label?: string;
  children: ReactNode;
};

export function ListRow({ label, children }: ListRowProps) {
  return (
    <li className="flex gap-3 py-2 text-body">
      <span aria-hidden="true" className="text-ink">
        [+]
      </span>
      <span className="sm:flex sm:gap-3">
        {label && (
          <strong className="block shrink-0 font-medium text-ink sm:w-[10ch]">
            {label}
          </strong>
        )}
        <span>{children}</span>
      </span>
    </li>
  );
}
