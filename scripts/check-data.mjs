#!/usr/bin/env node
// Data-integrity checks that the JSON schema can't express.
//
// Usage: node scripts/check-data.mjs [base-ref]
//   With a base ref (e.g. origin/main), also checks that changed providers
//   bumped last_updated and are covered by a CHANGELOG entry.

import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const PROVIDERS = 'data/providers.json';
const CHANGELOG = 'data/CHANGELOG.md';
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
