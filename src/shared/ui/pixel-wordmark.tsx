import type { SVGProps } from "react";

const GLYPH_HEIGHT = 5;

// "#" ink pixel, "o" counter pixel (drawn faint), "." empty
const GLYPHS: Record<string, string[]> = {
  A: ["####", "#oo#", "####", "#..#", "#..#"],
  B: ["###.", "#o#.", "####", "#oo#", "####"],
  D: ["###.", "#oo#", "#oo#", "#oo#", "###."],
  I: ["#", "#", "#", "#", "#"],
  L: ["#...", "#...", "#...", "#...", "####"],
  U: ["#..#", "#..#", "#..#", "#..#", "####"],
  Z: ["####", "...#", ".##.", "#...", "####"],
};

type PixelWordmarkProps = { text: string } & SVGProps<SVGSVGElement>;

export function PixelWordmark({ text, ...svgProps }: PixelWordmarkProps) {
  let ink = "";
  let counters = "";
  let offset = 0;

  for (const char of text.toUpperCase()) {
    const rows = GLYPHS[char];
    if (!rows) continue;

    for (const [y, row] of rows.entries()) {
      for (const [x, cell] of [...row].entries()) {
        const pixel = `M${offset + x} ${y}h1v1h-1z`;
        if (cell === "#") ink += pixel;
        if (cell === "o") counters += pixel;
      }
    }
    offset += rows[0].length + 1;
  }

  return (
    <svg
      viewBox={`0 0 ${Math.max(offset - 1, 1)} ${GLYPH_HEIGHT}`}
      fill="currentColor"
      shapeRendering="crispEdges"
      role="img"
      aria-label={text}
      {...svgProps}
    >
      <path d={ink} />
      <path d={counters} fillOpacity={0.35} />
    </svg>
  );
}
