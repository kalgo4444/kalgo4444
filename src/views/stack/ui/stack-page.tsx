import { profile } from "@/entities/profile";
import { ListRow } from "@/shared/ui/list-row";
import { Reveal } from "@/shared/ui/reveal";

const CELLS = [...profile.stack, { group: "Skills", items: profile.skills }];

export function StackPage() {
  return (
    <div className="flex flex-col gap-8 py-12 md:py-16 lg:py-8">
      <Reveal className="flex flex-col gap-4">
        <h1 className="text-display">The stack I work with.</h1>
        <p className="max-w-[60ch] text-body">
          Languages, frameworks, databases and the AI tooling I build with.
        </p>
      </Reveal>
      <div className="grid border-t border-l border-hairline sm:grid-cols-2 lg:flex-1 lg:grid-cols-3">
        {CELLS.map(({ group, items }, index) => (
          <Reveal
            key={group}
            delay={index * 0.06}
            className="border-r border-b border-hairline p-4"
          >
            <h2 className="font-bold">{group}</h2>
            <ul className="pt-2">
              {items.map((item) => (
                <ListRow key={item}>{item}</ListRow>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
