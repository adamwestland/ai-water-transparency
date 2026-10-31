import type { APIRoute } from 'astro';
import { providers } from '../lib/providers';

// Every .astro page in src/pages, so new pages land in the sitemap automatically.
const pageFiles = Object.keys(import.meta.glob('./**/*.astro'));

const lastUpdated = providers.map((p) => p.last_updated).sort().reverse()[0];

// Pages whose content comes from the dataset get its last_updated as lastmod.
const DATA_PAGES = new Set(['/', '/data/']);

const toPath = (file: string) => {
  const route = file.replace(/^\.\//, '').replace(/\.astro$/, '').replace(/(^|\/)index$/, '');
  return route ? `/${route}/` : '/';
};

export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL('https://waterlens.ai');
  const urls = pageFiles
    .filter((file) => !file.includes('[') && !/\/404\.astro$/.test(file))
    .map(toPath)
    .sort()
    .map((path) => {
      const lastmod = DATA_PAGES.has(path) ? `\n    <lastmod>${lastUpdated}</lastmod>` : '';
      return `  <url>\n    <loc>${new URL(path, base).href}</loc>${lastmod}\n  </url>`;
    });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
