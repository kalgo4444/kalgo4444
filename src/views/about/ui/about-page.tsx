import { profile } from "@/entities/profile";
import { ListRow } from "@/shared/ui/list-row";
import { Reveal } from "@/shared/ui/reveal";
import { SectionLabel } from "@/shared/ui/section-label";
import { SplitLayout } from "@/shared/ui/split-layout";

export function AboutPage() {
  return (
    <SplitLayout>
      <Reveal className="flex flex-col gap-4">
        <h1 className="text-display">
          I explain complex concepts in simple terms.
        </h1>
        {profile.bio.map((paragraph) => (
          <p key={paragraph} className="text-body">
            {paragraph}
          </p>
        ))}
      </Reveal>
      <Reveal delay={0.1}>
        <SectionLabel>What I do</SectionLabel>
        <ul className="pt-2">
          {profile.highlights.map(({ label, text }) => (
            <ListRow key={label} label={label}>
              {text}
            </ListRow>
          ))}
        </ul>
      </Reveal>
    </SplitLayout>
  );
}
