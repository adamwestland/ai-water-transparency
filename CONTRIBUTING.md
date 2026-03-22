# Contributing

Thank you for helping improve the AI Water Transparency Report. This dataset gets better with more eyes on it.

## How to Update Provider Data

If a provider has published new data (a new sustainability report, an SEC filing, an official blog post with figures), you can update their entry:

1. Edit `data/providers.json` with the updated fields
2. For every changed field, include or update the `source_url` pointing to the published document
3. Update the `last_updated` date to today (ISO format: `YYYY-MM-DD`)
4. Add an entry to `data/CHANGELOG.md`:
   ```markdown
   ## YYYY-MM-DD
   - Updated [provider]: [what changed]. Source: [URL]
   ```
5. Run `npm run validate` to check the JSON schema before submitting
6. Open a pull request

## How to Add a New Provider

1. Check the provider's website, sustainability reports, and SEC filings
2. Add a new entry to `data/providers.json` following the existing structure
3. Set every disclosure dimension:
   - For each `yes` or `partial`: include a `source_url` linking to the published document
   - For each `no`: the `last_updated` date serves as "we checked as of this date"
4. Add a CHANGELOG entry
5. Run `npm run validate`
6. Open a pull request

## Source Requirements

Every factual claim in this dataset must be traceable to a published source. This is non-negotiable.

**Acceptable sources:**
- Published sustainability reports and environmental reports
- SEC filings and annual reports
- Official company blog posts that contain data (not just announcements)
- Peer-reviewed academic papers
- Government filings and regulatory documents

**Not acceptable:**
- Press releases that reference data without publishing it
- Leaked or unverified internal documents
- Social media posts or tweets
- Unnamed sources or secondhand reporting
- Personal communications or private conversations

## Schema Validation

The dataset is validated against `data/schema.json`. Key rules:
- Every provider must have all 5 disclosure dimensions
- Status must be exactly `yes`, `no`, or `partial`
- If status is `yes` or `partial`, `source_url` must be a valid URI (not null)
- `last_updated` must be a valid ISO date (`YYYY-MM-DD`)
- Provider IDs must be lowercase with only letters, numbers, and hyphens

Run validation locally:
```bash
npm run validate
```

## Code Changes

For changes to the website code (components, layout, styling):
- Follow the existing Astro + Tailwind patterns
- Keep it simple -- this is a static site, not a web app
- Test locally with `npm run dev` and `npm run build`

## AI-Assisted Contributions

Contributions made with AI assistance are welcome. The same source requirements apply -- if a claim is in the dataset, it must link to a published document regardless of who (or what) wrote the PR.

## Questions?

Open an issue on GitHub. If you've found data we missed, we want to hear about it.
