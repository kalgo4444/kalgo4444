import Link from "next/link";
import { contactList } from "@/entities/profile";
import { externalLinkProps } from "@/shared/lib/external-link";
import { Reveal } from "@/shared/ui/reveal";
import { SectionLabel } from "@/shared/ui/section-label";
import { SplitLayout } from "@/shared/ui/split-layout";

export function ContactPage() {
  return (
    <SplitLayout>
      <Reveal className="flex flex-col gap-4">
        <h1 className="text-display">Say hello.</h1>
        <p className="max-w-[60ch] text-body">
          Want to talk about web development, teaching, or building with AI?
          Pick whichever platform suits you.
        </p>
      </Reveal>
      <div>
        <SectionLabel>Find me on</SectionLabel>
        <ul>
          {contactList.map(({ label, handle, href }, index) => (
            <Reveal
              key={label}
              as="li"
              delay={0.15 + index * 0.07}
              className="border-b border-hairline"
            >
              <Link
                href={href}
                className="group flex justify-between gap-4 py-4"
                {...externalLinkProps(href)}
              >
                <span className="font-medium">{label}</span>
                <span className="min-w-0 truncate text-mute transition-transform duration-200 group-hover:-translate-x-1 group-hover:text-ink">
                  {handle}
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </SplitLayout>
  );
}
