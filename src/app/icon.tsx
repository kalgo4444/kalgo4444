import { ImageResponse } from "next/og";
import { PixelWordmark } from "@/shared/ui/pixel-wordmark";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Tab icon: the pixel "A" from the site's wordmark on the dark brand surface (reads in light and dark browser tabs).
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#201d1d",
        color: "#fdfcfc",
        borderRadius: 8,
      }}
    >
      <PixelWordmark text="A" width={36} height={45} />
    </div>,
    size,
  );
}
