#!/usr/bin/env node
// Data-integrity checks that the JSON schema can't express.
//
// Usage: node scripts/check-data.mjs [base-ref]
//   With a base ref (e.g. origin/main), also checks that changed providers
//   bumped last_updated and are covered by a CHANGELOG entry, that each status
//   change's history entry is dated with the provider's new last_updated, and
//   that existing history entries were not edited or removed.

import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const PROVIDERS = 'data/providers.json';
const CHANGELOG = 'data/CHANGELOG.md';
const HISTORY = 'data/history.json';
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

const errors = [];
const fail = (msg) => errors.push(msg);

const providers = JSON.parse(readFileSync(PROVIDERS, 'utf8'));
const changelog = readFileSync(CHANGELOG, 'utf8');

// Allow one day of slack so a PR opened late in the day UTC-6 isn't "in the future".
const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

const isValidDate = (s) =>
  DATE_RE.test(s) && new Date(`${s}T00:00:00Z`).toISOString().slice(0, 10) === s;

const shortName = (p) => p.name.split(' (')[0];

// --- Checks on the current dataset ---

const seen = new Set();
for (const p of providers) {
  if (seen.has(p.id)) fail(`${p.id}: duplicate provider id`);
  seen.add(p.id);

  if (!isValidDate(p.last_updated)) fail(`${p.id}: last_updated "${p.last_updated}" is not a real date`);
  else if (p.last_updated > tomorrow) fail(`${p.id}: last_updated ${p.last_updated} is in the future`);

  if (p.sustainability_report_url && !p.sustainability_report_url.startsWith('https://')) {
    fail(`${p.id}: sustainability_report_url must be HTTPS`);
  }

  for (const [dim, item] of Object.entries(p.disclosures)) {
    if (item.source_url && !item.source_url.startsWith('https://')) {
      fail(`${p.id}.${dim}: source_url must be HTTPS`);
    }
    if (!item.detail.trim()) fail(`${p.id}.${dim}: detail is empty`);
  }
}

// --- Status history (data/history.json) ---
// Replaying the history for each provider/dimension must end at its current
// status, so a status change can't land without a history entry.

const history = JSON.parse(readFileSync(HISTORY, 'utf8'));
const byCell = new Map();
history.forEach((e, i) => {
  const where = `${HISTORY}[${i}] ${e.provider}.${e.dimension}`;
  if (!isValidDate(e.date)) fail(`${where}: date "${e.date}" is not a real date`);
  else if (e.date > tomorrow) fail(`${where}: date ${e.date} is in the future`);
  if (e.from === e.to) fail(`${where}: from and to are both "${e.to}"`);
  if (e.source_url && !e.source_url.startsWith('https://')) fail(`${where}: source_url must be HTTPS`);
  const key = `${e.provider}.${e.dimension}`;
  if (!byCell.has(key)) byCell.set(key, []);
  byCell.get(key).push({ ...e, where });
});

for (const [key, entries] of byCell) {
  entries.forEach((e, i) => {
    const prev = entries[i - 1];
    if (!prev && e.from !== null) fail(`${e.where}: first entry for ${key} must have from: null`);
    if (prev && e.from === null) fail(`${e.where}: only the first entry for ${key} may have from: null`);
    if (prev && e.from !== null && e.from !== prev.to) {
      fail(`${e.where}: from "${e.from}" doesn't match the previous entry's to "${prev.to}"`);
    }
    if (prev && e.date < prev.date) fail(`${e.where}: entries for ${key} are out of date order`);
  });
}

for (const p of providers) {
  for (const [dim, item] of Object.entries(p.disclosures)) {
    const entries = byCell.get(`${p.id}.${dim}`);
    if (!entries) {
      fail(`${p.id}.${dim}: no entry in ${HISTORY} (add one with from: null for a new provider)`);
      continue;
    }
    const last = entries[entries.length - 1];
    if (last.to !== item.status) {
      fail(`${p.id}.${dim}: status is "${item.status}" but ${HISTORY} ends at "${last.to}"; add an entry for the change`);
    }
    if (last.date > p.last_updated) {
      fail(`${p.id}.${dim}: ${HISTORY} entry dated ${last.date} is after last_updated ${p.last_updated}`);
    }
  }
}

// --- Checks against the base branch ---

const baseRef = process.argv[2];
if (baseRef) {
  let base;
  try {
    base = JSON.parse(execFileSync('git', ['show', `${baseRef}:${PROVIDERS}`], { encoding: 'utf8' }));
  } catch (e) {
    console.error(`Could not read ${PROVIDERS} at ${baseRef}: ${e.message}`);
    process.exit(2);
  }
  const baseById = new Map(base.map((p) => [p.id, p]));

  // Text of the CHANGELOG sections whose heading starts with a given date.
  const sectionsFor = (date) =>
    changelog
      .split(/^(?=## )/m)
      .filter((s) => s.startsWith(`## ${date}`))
      .join('\n');

  for (const p of providers) {
    const old = baseById.get(p.id);
    const { last_updated: newDate, ...newRest } = p;
    if (old) {
      const { last_updated: oldDate, ...oldRest } = old;
      if (newDate < oldDate) fail(`${p.id}: last_updated went backwards (${oldDate} -> ${newDate})`);
      const contentChanged = JSON.stringify(newRest) !== JSON.stringify(oldRest);
      if (contentChanged && newDate === oldDate) {
        fail(`${p.id}: data changed but last_updated was not bumped`);
      }
      if (!contentChanged && newDate === oldDate) continue;
    }

    // Each changed status needs a history entry dated with this update.
    for (const dim of Object.keys(p.disclosures)) {
      if (old && p.disclosures[dim].status === old.disclosures[dim]?.status) continue;
      const entries = byCell.get(`${p.id}.${dim}`) || [];
      const last = entries[entries.length - 1];
      if (last && last.date !== newDate) {
        fail(`${p.id}.${dim}: status changed but the latest ${HISTORY} entry is dated ${last.date}, not ${newDate}`);
      }
    }

    const section = sectionsFor(newDate);
    if (!section) {
      fail(`${p.id}: no "## ${newDate}" entry in ${CHANGELOG}`);
      continue;
    }

    // A status change, or a new provider, must name the provider in that day's entry.
    const statusChanged =
      !old ||
      Object.keys(p.disclosures).some((dim) => p.disclosures[dim].status !== old.disclosures[dim]?.status);
    const mentioned = [p.id, shortName(p)].some((n) => section.toLowerCase().includes(n.toLowerCase()));
    if (statusChanged && !mentioned) {
      fail(`${p.id}: status changed but the ${newDate} CHANGELOG entry doesn't mention ${shortName(p)}`);
    }
  }

  // History is append-only: entries already on the base branch stay as they are.
  let baseHistory = [];
  try {
    baseHistory = JSON.parse(execFileSync('git', ['show', `${baseRef}:${HISTORY}`], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }));
  } catch {
    // The base branch predates history.json.
  }
  baseHistory.forEach((e, i) => {
    if (JSON.stringify(history[i]) !== JSON.stringify(e)) {
      fail(`${HISTORY}[${i}]: existing entry was edited, removed or reordered; append new entries at the end`);
    }
  });

  for (const id of baseById.keys()) {
    if (!seen.has(id) && !changelog.toLowerCase().includes(id)) {
      fail(`${id}: provider removed without a CHANGELOG mention`);
    }
  }
}

if (errors.length) {
  console.error(`check-data: ${errors.length} problem(s)\n`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`check-data: ${providers.length} providers OK${baseRef ? ` (compared with ${baseRef})` : ''}`);
