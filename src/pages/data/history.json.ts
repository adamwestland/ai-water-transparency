import history from '../../../data/history.json';

export const GET = () =>
  new Response(JSON.stringify(history, null, 2) + '\n', {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
