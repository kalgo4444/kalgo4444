import { profile } from "@/entities/profile";
import { ButtonLink } from "@/shared/ui/button-link";
import { PixelWordmark } from "@/shared/ui/pixel-wordmark";
import { Reveal } from "@/shared/ui/reveal";

export function HomePage() {
  return (
    <div className="flex flex-col items-start justify-center gap-8 py-16 md:gap-10 md:py-24 lg:py-0">
      <h1 className="w-full max-w-[560px]">
        <span className="sr-only">{profile.name}</span>
        <PixelWordmark
          text={profile.firstName}
          aria-hidden="true"
          className="w-full animate-wipe"
        />
      </h1>
      <Reveal delay={0.8} className="flex flex-col items-start gap-6">
        <div className="flex flex-col gap-2">
          <p className="max-w-[28ch] text-display">{profile.tagline}</p>
          <p className="text-mute">
            {profile.role} in {profile.location}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/contact">Get in touch</ButtonLink>
          <ButtonLink href="/about" variant="secondary">
            About me
          </ButtonLink>
        </div>
      </Reveal>
    </div>
  );
}
