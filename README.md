# AI Water Transparency Report

An open-source dataset and website tracking what AI providers publicly disclose about their water usage. Every claim is sourced. No scores, no ratings -- just factual disclosure status with evidence.

**Live at [waterlens.ai](https://waterlens.ai)**

## Why This Exists

I work in AI. People ask me about AI's water usage all the time. I see posts on Instagram and Twitter with alarming numbers but no context -- no sources, no comparisons, no way to tell what's real. So I went looking for the truth. When I started digging into what AI companies actually disclose about water usage, I found two things:

First, the information is scattered and hard to verify. Some providers publish detailed sustainability reports. Others publish nothing. Finding out which is which means reading hundreds of pages of corporate reports, and even then the picture is incomplete. Meanwhile, headlines swing between "AI will drain our aquifers" and "it's fine, don't worry" -- neither of which is grounded in what's actually published.

Second, no one had assembled the disclosure data into a single, maintained, citable reference. Carbon tracking has tools, dashboards, and standards. Water transparency has... scattered sustainability reports and paywalled research.

AI can be a net benefit to the world. But that case is stronger when the industry is open about its resource consumption. Transparency isn't an attack -- it's the foundation for trust. And right now, the gap between what providers know and what they publish is wide.

This project addresses that gap. Not by calculating water usage, not by assigning scores, but by documenting what each provider actually discloses -- with a source link for every claim.

## What This Is

- An **open-source dataset** (`data/providers.json`) tracking disclosure status across 5 dimensions for 6 major AI providers
- A **static website** that renders the data into a readable, linkable reference
- **Schema-validated** and **version-controlled** -- every change is logged with a source
- Licensed under **CC BY 4.0** (data) so researchers, journalists, and developers can use it freely

## What This Is Not

- Not a scoring system -- we don't assign grades or rankings
- Not an advocacy site -- the data is factual, not editorial
- Not marketing -- this project stands alone as an independent dataset

## Quick Start

```bash
npm install
npm run dev        # Start dev server at localhost:4321
npm run build      # Production build to dist/
npm run validate   # Validate providers.json against schema
```

## Data Format

`data/providers.json` contains an array of provider objects:

```json
{
  "id": "google",
  "name": "Google (Gemini)",
  "sustainability_report_url": "https://...",
  "disclosures": {
    "water_usage": {
      "status": "yes",
      "detail": "Reports total water consumption annually...",
      "source_url": "https://..."
    }
  },
  "last_updated": "2026-03-22"
}
```

Each disclosure has a `status` (`yes`, `no`, or `partial`), a `detail` describing what is or isn't published, and a `source_url` linking to the evidence. The schema is enforced by `data/schema.json` and validated in CI.

## Contributing

If you spot an error, notice a provider has published new data, or want to add a provider, see [CONTRIBUTING.md](CONTRIBUTING.md). Every PR requires a source URL for each claim.

## Built With

- [Astro](https://astro.build) -- static site generation
- [Tailwind CSS](https://tailwindcss.com) -- styling
- [Claude Code](https://claude.ai/code) -- AI-assisted research and development (see [TRANSPARENCY.md](TRANSPARENCY.md))

## License

- **Data** (everything under `data/`): [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
- **Code** (everything else): [MIT](LICENSE)
