# Data Changelog

## 2026-10-30

Refreshed all 10 providers against reports published since March 2026. Every provider's `last_updated` is now 2026-10-30.

Status changes:
- Google `per_facility_reporting`: partial → yes. The 2026 Environmental Report publishes water withdrawal, discharge and consumption for each data center location, plus PUE per facility — [source](https://sustainability.google/reports/google-2026-environmental-report/)
- Amazon `water_usage`: partial → yes. The 2025 AWS Summary reports total AWS data center withdrawal (9.4B liters) and global WUE (0.12 L/kWh) — [source](https://sustainability.aboutamazon.com/2025-aws-summary.pdf)
- Amazon `per_facility_reporting`: no → partial. AWS location fact sheets publish water withdrawal, PUE and WUE by location, not by facility — [source](https://sustainability.aboutamazon.com/aws-sustainability-fact-sheets/aws-fact-sheet-virginia.pdf)
- Meta `ai_specific_data`: no → partial. Llama model cards report training GPU hours, power and emissions; no water or inference data — [source](https://github.com/meta-llama/llama-models/blob/main/models/llama4/MODEL_CARD.md)

Figure and source updates (no status change):
- Google: 2025 water consumption (10.9B gallons), energy (44.0M MWh), PUE (1.09), replenishment (7.7B gallons, ~78%) — [source](https://sustainability.google/reports/google-2026-environmental-report/)
- Microsoft: FY25 water withdrawal/consumption (13,266 / 8,170 ML), energy (37.5M MWh), PUE (1.17), WUE (0.27), replenishment (14.2M m³) — [fact sheet](https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/microsoft/msc/documents/presentations/CSR/2026-Microsoft-Environmental-Data-Fact-Sheet-PDF.pdf), [report](https://www.microsoft.com/en-us/corporate-responsibility/topics/sustainability/report/), [regional efficiency](https://datacenters.microsoft.com/sustainability/efficiency/)
- Amazon: AWS PUE now published (1.14), so the energy detail no longer says PUE is unreported; water positive progress 75% — [source](https://sustainability.aboutamazon.com/2025-aws-summary.pdf), [water page](https://sustainability.aboutamazon.com/natural-resources/water)
- Meta: 2024 figures from the Environmental Data Index (no 2026 report yet). Corrected WUE (0.19, previously listed as ~0.26) and the water pledge detail, which previously described an emissions goal — [source](https://sustainability.atmeta.com/wp-content/uploads/2025/10/Meta_2025-Environmental-Data-Index.pdf), [water goal](https://sustainability.atmeta.com/water/)
- OpenAI: per-query figures now cite the original statement instead of news coverage; water pledge detail rewritten to match the Stargate Community page — [source](https://blog.samaltman.com/the-gentle-singularity)
- xAI: Memphis wastewater plant paused April 2026; company says construction resumes by Q1 2027 — [source](https://www.datacenterdynamics.com/en/news/spacexai-to-restart-work-on-wastewater-treatment-facility-to-serve-memphis-data-centers-by-q1-2027/)
- Anthropic, Perplexity, Cohere, Mistral: re-checked, no new disclosures found

## 2026-03-22 (update)

- Added 4 new providers: OpenAI, xAI, Mistral, Cohere
- OpenAI: partial disclosures via CEO statement (per-query energy/water) — [source](https://www.datacenterdynamics.com/en/news/sam-altman-chatgpt-queries-consume-034-watt-hours-of-electricity-and-0000085-gallons-of-water/)
- xAI: no voluntary disclosures; partial water pledge via Memphis recycling plant — [source](https://www.governing.com/resilience/wastewater-will-cool-this-memphis-data-center)
- Mistral: published ISO 14040/44-compliant lifecycle analysis with per-query water data — [source](https://mistral.ai/news/our-contribution-to-a-global-environmental-standard-for-ai)
- Cohere: no disclosures found
- Dataset now covers 10 providers

## 2026-03-22

- Initial dataset: 6 providers ported from waterlens research
- Providers: Google, Microsoft, Amazon, Meta, Anthropic, Perplexity
- All disclosure statuses verified against published sustainability reports
- Sources: See each provider's source_url fields in providers.json
