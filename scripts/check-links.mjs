#!/usr/bin/env node
// Checks that every source link in data/providers.json still resolves.
//
// Usage: node scripts/check-links.mjs [--report <file>]
//   Writes a Markdown report to <file> (and to stdout).
//   Exit code 1 only when at least one link is definitely broken
//   (404/410, DNS failure, or redirected to a site's home page).
//   Blocked or flaky responses (401/403/429/5xx, timeouts) are listed as
//   "could not verify" and don't fail the run: several providers' sites
//   refuse automated requests even though the page is up.

import { readFileSync, writeFileSync } from 'node:fs';

const PROVIDERS = 'data/providers.json';
const TIMEOUT_MS = 30_000;
const ATTEMPTS = 3;
const CONCURRENCY = 6;
const USER_AGENT =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36 waterlens-link-check';

const reportArg = process.argv.indexOf('--report');
const reportFile = reportArg > -1 ? process.argv[reportArg + 1] : null;

// --- Collect every URL, remembering where each one is cited ---

const providers = JSON.parse(readFileSync(PROVIDERS, 'utf8'));
const citations = new Map(); // url -> ["google.water_usage", ...]
const cite = (url, where) => {
  if (!url) return;
  if (!citations.has(url)) citations.set(url, []);
  citations.get(url).push(where);
};
for (const p of providers) {
  cite(p.sustainability_report_url, `${p.id}.sustainability_report_url`);
  for (const [dim, item] of Object.entries(p.disclosures)) cite(item.source_url, `${p.id}.${dim}`);
}

// --- Check one URL ---

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function request(url) {
  const res = await fetch(url, {
    method: 'GET',
    redirect: 'follow',
    signal: AbortSignal.timeout(TIMEOUT_MS),
    headers: {
      'User-Agent': USER_AGENT,
      Accept: 'text/html,application/xhtml+xml,application/pdf;q=0.9,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
    },
  });
  // Don't download whole report PDFs; the status line is all we need.
  res.body?.cancel().catch(() => {});
  return res;
}

// A deep link that now lands on a site's root usually means the page was removed.
const droppedToHome = (from, to) => {
  const a = new URL(from);
  const b = new URL(to);
  return a.pathname.replace(/\/$/, '') !== '' && b.pathname.replace(/\/$/, '') === '';
};

async function check(url) {
  let last;
  for (let i = 1; i <= ATTEMPTS; i++) {
    try {
      const res = await request(url);
      const s = res.status;
      if (s >= 200 && s < 300) {
        if (res.redirected && droppedToHome(url, res.url)) {
          return { result: 'broken', note: `redirects to home page (${res.url})` };
        }
        return { result: 'ok', note: res.redirected ? `redirects to ${res.url}` : `${s}` };
      }
      if (s === 404 || s === 410) return { result: 'broken', note: `HTTP ${s}` };
      last = { result: 'unverified', note: `HTTP ${s}` };
      if (s === 401 || s === 403) return last; // bot protection; retrying won't help
    } catch (e) {
      const code = e.cause?.code ?? e.name;
      // A dead domain is broken, but only if every attempt fails to resolve (DNS can hiccup).
      if (code === 'ENOTFOUND') last = { result: 'broken', note: 'domain does not resolve (ENOTFOUND)' };
      else last = { result: 'unverified', note: code === 'TimeoutError' ? 'timed out' : `${code}: ${e.cause?.message ?? e.message}` };
    }
    if (i < ATTEMPTS) await sleep(2000 * i);
  }
  return last;
}

// --- Run with limited concurrency ---

const urls = [...citations.keys()];
const results = new Map();
let next = 0;
await Promise.all(
  Array.from({ length: CONCURRENCY }, async () => {
    while (next < urls.length) {
      const url = urls[next++];
      results.set(url, await check(url));
    }
  }),
);

// --- Report ---

const rows = (kind) =>
  urls
    .filter((u) => results.get(u).result === kind)
    .map((u) => `| ${u} | ${results.get(u).note} | ${citations.get(u).map((c) => `\`${c}\``).join(', ')} |`);

const broken = rows('broken');
const unverified = rows('unverified');
const okCount = urls.length - broken.length - unverified.length;
const header = '| URL | Result | Cited in |\n| --- | --- | --- |';

let report = `Checked ${urls.length} unique source URLs from \`${PROVIDERS}\` on ${new Date().toISOString().slice(0, 10)}: `;
report += `${okCount} OK, ${broken.length} broken, ${unverified.length} could not be verified.\n`;
if (broken.length) {
  report += `\n### Broken\n\nThese links return "not found", no longer resolve, or redirect to a home page. `;
  report += `Find the document's new location (or an archived copy) and update the source in a PR with a CHANGELOG entry.\n\n`;
  report += `${header}\n${broken.join('\n')}\n`;
}
if (unverified.length) {
  report += `\n### Could not verify\n\nThese sites blocked the automated request or didn't respond. They are often fine in a browser; `;
  report += `check them by hand if they keep showing up.\n\n${header}\n${unverified.join('\n')}\n`;
}

console.log(report);
if (reportFile) writeFileSync(reportFile, report);
process.exit(broken.length ? 1 : 0);
