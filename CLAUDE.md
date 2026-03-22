# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working in this repository.

## Project Mission

The AI Water Transparency Report tracks what AI providers publicly disclose about water usage. Every claim is sourced. No scores, no ratings, no opinions -- just factual disclosure status with evidence.

This project was built with Claude Code (Opus 4.6). We disclose our tools for the same reason we expect AI providers to disclose their water usage.

## Core Principle: Every Claim Must Be Sourced

**If it's in the dataset, it must link to a published source. No exceptions.**

- Status of `yes` or `partial` requires a `source_url` pointing to a public document
- Status of `no` means we checked and found nothing, with `last_updated` recording when we checked
- Detail text must describe what is actually published, not what we think or infer
- When in doubt, the status is `no`. Don't upgrade to `partial` without evidence.
- Never fabricate, round up, or infer a provider's disclosure status

Acceptable sources: sustainability reports, environmental reports, SEC filings, official blog posts, peer-reviewed papers. NOT acceptable: press releases without data, leaked documents, social media posts, unnamed sources.

## What NOT to Do

- **Don't add scores or ratings.** The table shows yes/no/partial. That's it.
- **Don't editorialize.** Detail text should describe what the provider publishes, not whether it's good enough.
- **Don't compare providers in prose.** The table does that implicitly. Let the data speak.
- **Don't add unsourced claims.** If you find information that seems relevant but can't find a citable public source, note it in an issue -- don't add it to the dataset.
- **Don't soften results for any provider.** Apply the same standard uniformly. If Anthropic publishes nothing, that's "no" across the board. If Google publishes everything, that's "yes." The methodology doesn't bend for any company, including the one whose model built this site.

## Commands

```bash
npm run dev          # Astro dev server
npm run build        # Production build (output: dist/)
npm run preview      # Preview production build locally
npm run validate     # Validate providers.json against schema
```

## Tech Stack

- Astro (static output) with TypeScript
- Tailwind CSS for styling
- MDX for methodology content
- `data/providers.json` is imported at build time (fully static)
- Cloudflare Pages deploys the `dist/` directory
- GitHub Actions validates JSON schema on PR

## Repo Structure

- `data/providers.json` -- The core dataset. Schema-validated via `data/schema.json`.
- `data/schema.json` -- JSON Schema (draft 2020-12) for validation.
- `data/CHANGELOG.md` -- Every dataset update: what changed, when, why, source link.
- `data/build-water-log.json` -- Water footprint of building this site.
- `src/content/methodology.mdx` -- What we track, how we verify, source bibliography.
- `src/lib/providers.ts` -- TypeScript types and typed data export.
- `src/lib/disclosure-labels.ts` -- Display labels and ordering for disclosure dimensions.
- `src/components/` -- Astro components (table, badges, layout).
- `src/pages/` -- Astro pages.
- `TRANSPARENCY.md` -- AI tool disclosure.
- `CONTRIBUTING.md` -- How to submit updates (source URL required).

## Updating the Dataset

When updating `data/providers.json`:

1. Change the relevant field(s)
2. Update or add `source_url` for every changed field
3. Update `last_updated` to today's date (ISO format: YYYY-MM-DD)
4. Add an entry to `data/CHANGELOG.md` with: date, what changed, source link
5. Run `npm run validate` to check JSON schema

## Adding a New Provider

1. Add a new entry to `data/providers.json` following the existing schema
2. Set every disclosure dimension -- check their website, sustainability reports, SEC filings
3. For each `yes` or `partial`, include a `source_url`
4. For each `no`, the `last_updated` date serves as "we checked as of this date"
5. Add a CHANGELOG entry

## Conventions

- Dates are ISO format: YYYY-MM-DD
- Provider IDs are lowercase kebab-case: `google`, `openai`, `xai`
- Status values are exactly one of: `yes`, `no`, `partial`
- Source URLs must be HTTPS and point to a publicly accessible page
- Detail text is a single sentence or two, factual, present tense
