import type { APIRoute } from 'astro';
import { nav } from '../data/profile';

export const GET: APIRoute = ({ site }) =>
	new Response(
		`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${nav
			.map(({ href }) => `\t<url><loc>${new URL(href, site)}</loc></url>\n`)
			.join('')}</urlset>\n`,
		{ headers: { 'Content-Type': 'application/xml' } },
	);
