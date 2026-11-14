import Link from "next/link";
import type { ReactNode } from "react";
import { externalLinkProps } from "@/shared/lib/external-link";

const VARIANT_CLASSES = {
  primary: "bg-ink text-canvas active:bg-ink-deep",
  secondary: "border border-mute bg-canvas text-ink active:bg-surface-card",
};

type ButtonVariant = keyof typeof VARIANT_CLASSES;

// Shared with <button> elements (theme toggle) so links and buttons look identical.
export const buttonClass = (variant: ButtonVariant = "primary") =>
  `inline-flex h-9 items-center whitespace-nowrap rounded-sm px-5 font-medium leading-8 transition-transform active:scale-[0.97] ${VARIANT_CLASSES[variant]}`;

type ButtonLinkProps = {
  href: string;
  variant?: ButtonVariant;
  children: ReactNode;
};

export function ButtonLink({ href, variant, children }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={buttonClass(variant)}
      {...externalLinkProps(href)}
    >
      {children}
    </Link>
  );
}
