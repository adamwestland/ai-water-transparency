import type { APIRoute } from 'astro';
import providersData from '../../../data/providers.json';

// Serves the dataset at /data/providers.json, generated from data/providers.json
// at build time so the download can never drift from the published table.
export const GET: APIRoute = () =>
  new Response(JSON.stringify(providersData, null, 2) + '\n', {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
