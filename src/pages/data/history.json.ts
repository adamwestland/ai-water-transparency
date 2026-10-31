import type { APIRoute } from 'astro';
import historyData from '../../../data/history.json';

// Serves the status history at /data/history.json, generated from data/history.json at build time.
export const GET: APIRoute = () =>
  new Response(JSON.stringify(historyData, null, 2) + '\n', {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
