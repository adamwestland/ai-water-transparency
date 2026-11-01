---
name: data-refresh
description: Re-check AI providers' water and energy disclosures against their primary sources and open a sourced refresh PR. Used by the monthly scheduled refresh and for manual refreshes.
---

# Data refresh

Read `CLAUDE.md` first. Its sourcing rules apply to every step here, and `REVIEW.md` is what the PR will be reviewed against.

## Modes

- **Change check** (most months): for each provider, look for a primary source published after its `last_updated` date (new annual report, data index, fact sheet, model card, SEC filing, official post with figures). Only edit providers with something new. Leave every other provider untouched, including its `last_updated`.
- **Full re-verification** (January, April, July, October, or when asked): re-open the cited source for all 50 cells, confirm each status, figure and URL, check for newer sources, and set every provider's `last_updated` to today, so a `no` keeps meaning "we checked as of this date".

## Where to look

| Provider | Primary sources | Usual release |
|---|---|---|
| Google | Annual Environmental Report (sustainability.google/reports), Google Cloud blog for per-query figures | June to July |
| Microsoft | Environmental Sustainability Report and Environmental Data Fact Sheet (PDF), datacenters.microsoft.com efficiency pages | May to June |
| Amazon | Sustainability Report and AWS Summary PDF, AWS location fact sheets, water stewardship page | July |
| Meta | Sustainability Report and Environmental Data Index PDF (sustainability.atmeta.com), Llama model cards on GitHub | August to October |
| Anthropic | anthropic.com news, Public Benefit Report, model cards and system cards | Irregular |
| OpenAI | openai.com index posts (Stargate), Sam Altman's blog for per-query figures | Irregular |
| xAI | x.ai, Memphis-area utility and permitting filings | Irregular |
| Mistral | mistral.ai news (lifecycle analysis) | Irregular |
| Perplexity, Cohere | Company blog and research pages | Irregular |

Also search for "<provider> sustainability report <year>", "<provider> water usage data center", and new SEC 10-K climate disclosures.

Known quirks: x.ai, openai.com and perplexity.ai often block automated reads. Use search results and cached copies to find the page, and say in the PR that you couldn't open it directly. Report PDFs are the authority over news coverage of them; read the figure from the PDF. Large report PDFs (Google, Microsoft) can exceed WebFetch's size limit; download them with `curl` and extract text with `pdftotext`.

## Steps

1. Branch from the latest `main`.
   Check that the live site is current: the "Last updated" date on https://waterlens.ai is the newest `last_updated` in `main`'s `data/providers.json`, and the Deploy workflow publishes it on every push to `main`. If the live date is older, the last Deploy run failed or never ran. Say so at the top of the PR (or your report, if there's no PR).
2. Check for an open issue labelled `link-check` (opened by the weekly Link Check workflow). Every broken source it lists is in scope this month, whatever the mode: find the document's new URL or an archived copy and update `source_url`. If the document is gone and nothing replaces it, re-check the claim from scratch.
   Gather sources per the mode. For each candidate change, note the exact figure, the year it covers, its scope (company-wide vs. data centers, withdrawal vs. consumption), and the page or table it came from.
3. Edit `data/providers.json`. Detail text is one or two factual present-tense sentences. No judgments, no comparisons between providers. When in doubt the status is `no`.
4. **Independent verification.** Start a separate verifier subagent. Give it only the diff and the cited URLs, not your reasoning, and ask it to open each source and confirm or reject each changed status and figure. Drop or downgrade anything it can't confirm, and list it under "For review" in the PR body.
5. For every status change, append an entry to the end of `data/history.json` (it powers the public Changes page at /changes):
   ```json
   { "date": "YYYY-MM-DD", "provider": "<id>", "dimension": "<dimension>", "from": "<old>", "to": "<new>", "source_url": "<url>", "note": "<one factual sentence>" }
   ```
   `date` is the provider's new `last_updated`, `from` is the status on `main`, `source_url` is the source for the new status (null only when the new status is `no`), and `note` says in one factual sentence what the source now publishes or no longer publishes. For a new provider, append one entry per dimension with `"from": null` and no `note`. Only append: never edit, reorder or remove existing entries. Figure and source updates with no status change don't get a history entry.
6. Add a `data/CHANGELOG.md` entry under `## YYYY-MM-DD`: status changes first (provider, dimension, before and after, source link), then figure and source updates, then providers re-checked with no change.
7. Update `src/content/methodology.mdx` if an example or bibliography entry now points at an outdated report.
8. Run `npm run validate`, `npm run check-data -- origin/main`, and `npm run build`. Fix failures in the data, never by weakening a check. `check-data` fails if a status changed without a matching `data/history.json` entry.
9. Push to your `claude/` branch and open a PR using `.github/PULL_REQUEST_TEMPLATE.md`. Title: "Data refresh YYYY-MM" (add "(full)" for a full re-verification). Include a before/after table of every status change (it should match the new `data/history.json` entries), the figure updates, a "For review" list, and every source with its publication date.
10. Watch the PR. Fix CI failures and answer review comments. Leave the merge to a human.

If nothing changed in a change check, don't open a PR. Report which sources you checked and the newest report date you found for each provider.

## Never

- Merge a PR, push to `main`, or change repo settings.
- Edit `data/schema.json`, `.github/workflows/`, `scripts/check-data.mjs`, or this skill as part of a data refresh. Propose those in a separate PR.
- Add a claim you couldn't source, or upgrade a status on inference.
