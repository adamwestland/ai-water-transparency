# Review Policy

How automated review (and any reviewer) should read a pull request in this repo. The rules come from `CLAUDE.md` and `CONTRIBUTING.md`; this file says how to check them.

## Pass 1: Sourcing (any change under `data/` or `src/content/methodology.mdx`)

For every changed status, detail, or figure:

- The cited `source_url` is an acceptable source type per `CONTRIBUTING.md` (sustainability or environmental report, SEC filing, official page that contains data, peer-reviewed paper). Press coverage is acceptable only when no primary source exists, and the PR says so.
- Open the source and confirm it supports the claim: the number, the year it covers, and the scope (company-wide vs. data centers, withdrawal vs. consumption). If you can't open it, say so. Don't assume it supports the claim.
- A status was not upgraded (`no` to `partial`, `partial` to `yes`) without evidence in the source. When in doubt, the status is `no`.
- `yes` or `partial` has a source; `no` has a `last_updated` date that reflects the check.
- `data/CHANGELOG.md` has an entry for the change with a source link.
- Each status change has a `data/history.json` entry whose note is factual and whose source supports the new status. Existing history entries are unchanged (CI enforces this).

## Pass 2: Neutrality

- No scores, ratings, or rankings.
- Detail text describes what is published, in one or two factual present-tense sentences. Flag judgments such as "industry-leading", "limited", "only", "fails to", or "less than peers".
- No comparison between providers in detail text.
- The same standard is applied to every provider, including Anthropic. Flag any status that looks more lenient or stricter than an equivalent disclosure elsewhere in the dataset.

## Pass 3: Code and build (any non-data change)

- Bugs and logic errors, broken links or routes, accessibility regressions.
- Security: secrets in the diff, unsafe workflow triggers, overly broad workflow permissions.
- Changes to `data/schema.json`, `.github/workflows/`, or `scripts/check-data.mjs` that weaken a check.

## Reporting

- Mark each finding **Important** (wrong data, unsourced claim, broken build or security issue) or **Nit** (wording, style).
- Report at most five nits per review.
- Put findings inline on the line they concern where possible, with one summary comment.
- If nothing is wrong, say so in one line. Don't restate the PR.

## Skip

- `package-lock.json`, `dist/`, `research-snapshot/`.
- Dependency-only bumps get Pass 3 only.
