import providers from '../../../data/providers.json';

// Built from data/providers.json so the download always matches the site.
export const GET = () =>
  new Response(JSON.stringify(providers, null, 2) + '\n', {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
