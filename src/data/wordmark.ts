// "ABU" as a 5x5 pixel wordmark (DESIGN.md: the wordmark is always block-pixel).
const glyphs: Record<string, string[]> = {
	A: [' ███ ', '█   █', '█████', '█   █', '█   █'],
	B: ['████ ', '█   █', '████ ', '█   █', '████ '],
	U: ['█   █', '█   █', '█   █', '█   █', ' ███ '],
};

export const cell = 4;
// Top-left corner of every lit pixel, in SVG units; the wordmark is 17 x 5 cells.
export const pixels = [...'ABU'].flatMap((letter, i) =>
	glyphs[letter].flatMap((row, y) =>
		[...row].flatMap((on, x) => (on === '█' ? [{ x: (i * 6 + x) * cell, y: y * cell }] : [])),
	),
);
