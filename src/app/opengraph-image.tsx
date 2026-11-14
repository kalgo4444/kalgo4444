import { ImageResponse } from "next/og";
import { profile } from "@/entities/profile";
import { PixelWordmark } from "@/shared/ui/pixel-wordmark";

export const alt = `${profile.name}, ${profile.role} in ${profile.location}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Social preview card, generated once at build time. Colors are the light-theme tokens from globals.css.
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 40,
        padding: 80,
        background: "#fdfcfc",
        color: "#201d1d",
      }}
    >
      <PixelWordmark text={profile.firstName} width={720} height={100} />
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ fontSize: 56, fontWeight: 700 }}>{profile.name}</div>
        <div style={{ fontSize: 32, color: "#646262" }}>
          {`${profile.role} in ${profile.location}`}
        </div>
      </div>
    </div>,
    size,
  );
}
