// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	site: 'https://abdulaziz-abdugafurov.vercel.app',
	// Preload links on hover/focus so ClientRouter navigations feel instant.
	prefetch: { prefetchAll: true },
	// Self-hosted JetBrains Mono: the open substitute DESIGN.md names for Berkeley Mono.
	fonts: [
		{
			provider: fontProviders.fontsource(),
			name: 'JetBrains Mono',
			cssVariable: '--font-jetbrains',
			weights: [400, 500, 700],
			subsets: ['latin'],
			fallbacks: ['monospace'],
		},
	],
	vite: {
		plugins: [tailwindcss()],
	},
});
