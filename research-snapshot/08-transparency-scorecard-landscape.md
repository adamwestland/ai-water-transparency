# Transparency Scorecard: Competitive Landscape

*Compiled: March 22, 2026*

---

## 1. The Gap

No public tool or website currently compares AI providers specifically on **water transparency**. This was confirmed through web research on March 22, 2026. The closest tools either focus on energy/carbon (not water), compare models (not providers), or are dormant.

---

## 2. What Exists

### 2.1 AI Energy Score (Hugging Face)

- **URL:** https://huggingface.github.io/AIEnergyScore/
- **What it does:** Standardized benchmarking framework and public leaderboard rating AI model energy efficiency. Measures GPU power consumption during inference, assigns 1-5 star ratings.
- **Covers water?** Mentions WUE in documentation for calculating water from energy, but does not track or display water data.
- **Compares provider transparency?** No — compares *models* on energy efficiency, not *providers* on what they disclose.
- **Format:** Public web leaderboard on Hugging Face, open-source, Docker containers for reproducible testing.
- **Scope:** 10 AI tasks, both open-source and proprietary models, standardized on NVIDIA H100 GPUs.
- **Status:** Active, maintained.

### 2.2 SDxCentral Hyperscaler Sustainability Scorecard

- **URL:** https://www.sdxcentral.com/analysis/hyperscaler-sustainability-scorecard-rating-googles-microsofts-and-aws-environmental-strategies/
- **What it does:** One-time editorial rating of Google (4/5), Microsoft (3/5), AWS (2/5) on sustainability.
- **Covers water?** Barely — mentions water pledges but focuses on carbon, emissions, PUE, renewable energy.
- **Compares provider transparency?** Partially — rates based on publicly reported data, but carbon-focused.
- **Format:** Single article (July 2023), not a living tool or database.
- **Scope:** Google, Microsoft, AWS only. No Anthropic, Meta, or Perplexity.
- **Status:** Published once, not updated since. Pre-dates AI boom.

### 2.3 CDP (Carbon Disclosure Project)

- **URL:** https://www.cdp.net/en/data/scores
- **What it does:** Scores 23,100+ companies on climate change, water security, and forests. Companies get A through F grades.
- **Covers water?** Yes — water security is a separate scoring category. 263 companies got "A" on water in 2025.
- **Compares provider transparency?** Yes, but generic corporate disclosure — not AI-specific. Amazon and Meta had no public score in 2025.
- **Format:** Searchable database, annual scoring cycle.
- **Scope:** All industries. Tech companies are a small fraction.
- **Status:** Active, annual. But not designed for end users of AI — designed for institutional investors and ESG analysts.

### 2.4 Greenpeace Clicking Clean

- **URL:** https://www.greenpeace.org/usa/fighting-climate-chaos/click-clean/
- **What it does:** Rated cloud providers and major websites on renewable energy use, transparency, and advocacy. Letter grades A-F.
- **Covers water?** No — focused on energy and carbon.
- **Compares provider transparency?** Yes, but last major global edition was 2017.
- **Format:** Report + website with interactive scorecard.
- **Scope:** Cloud providers, major websites.
- **Status:** Effectively dormant for Western providers. China-focused "Clean Cloud" report still active (2024).

### 2.5 EcoAppraise

- **URL:** https://www.ecoappraise.com/
- **What it does:** AI tool that scans sustainability claims for greenwashing risk before publication. Pre-publication compliance quality assurance.
- **Covers water?** No — checks marketing language, not actual environmental data.
- **Compares provider transparency?** No.
- **Format:** SaaS tool for communications teams.
- **Status:** Active.

### 2.6 Other Tools

- **websitecarbon.com** — Rates website carbon per page view. No water, no provider comparison.
- **Microsoft Sustainability Calculator** — Estimates carbon for Azure workloads. No water, no cross-provider comparison.
- **ML CO2 Impact Calculator / CodeCarbon** — Estimates carbon emissions from ML training. No water.
- **IBM Envizi** — Enterprise ESG platform. Generic, not AI-specific.

---

## 3. Competitive Positioning

| Dimension | AI Energy Score | SDxCentral | CDP | Greenpeace | **WaterLens Scorecard** |
|---|---|---|---|---|---|
| **Focus** | Model energy efficiency | Corporate sustainability | Corporate disclosure | Renewable energy | **AI provider water transparency** |
| **Water coverage** | Mentioned in docs | Barely | Yes (generic) | No | **Primary focus** |
| **Compares providers** | No (models) | Yes (one-time) | Yes (generic) | Yes (dormant) | **Yes (AI-specific, living)** |
| **Audience** | ML engineers | IT decision-makers | Investors/ESG | Activists | **AI end users** |
| **AI-specific** | Yes | Partially | No | No | **Yes** |
| **Format** | Web leaderboard | Article | Database | Report | **Website + extension** |
| **Updated** | Continuously | 2023 (once) | Annually | 2017 (global) | **Maintained** |
| **Sources cited** | Benchmarks | Public reports | Company disclosure | Public reports | **Published research + reports** |

### The Whitespace

What doesn't exist anywhere:
1. A **living, maintained comparison** of what AI providers disclose about water specifically
2. A tool that surfaces this to **end users** of ChatGPT/Claude/Gemini — not just ESG analysts
3. A site that **cites every claim** to a published source so it can't be dismissed as advocacy
4. A comparison that covers **all major AI providers** including Anthropic and Perplexity (who publish nothing)

---

## 4. Potential Approach for Standalone Website

### What it would be
- Simple static site (single page, could be GitHub Pages)
- Same data as `data/provider-transparency.json`
- Methodology section explaining columns and citing sources
- "Last updated" date showing it's maintained
- Link to WaterLens extension for personal tracking

### What it would NOT be
- A scoring or rating system (no made-up numbers)
- An advocacy site (factual only)
- A complex web app (no accounts, no backend)

### Why it could matter
- Journalists covering AI/water stories need a go-to reference (NAACP, AGU, Fast Company angles are all active)
- $162 billion in data center projects faced community opposition in 2024-2025 — communities need accessible information
- Investors controlling $10 trillion in assets are demanding water transparency
- The contrast between providers (Google mostly green, Anthropic all red) tells a story without editorializing

---

## Sources

- [AI Energy Score — Hugging Face](https://huggingface.github.io/AIEnergyScore/)
- [SDxCentral — Hyperscaler Sustainability Scorecard](https://www.sdxcentral.com/analysis/hyperscaler-sustainability-scorecard-rating-googles-microsofts-and-aws-environmental-strategies/)
- [CDP — Scores and A Lists](https://www.cdp.net/en/data/scores)
- [Greenpeace — Clicking Clean](https://www.greenpeace.org/usa/fighting-climate-chaos/click-clean/)
- [EcoAppraise](https://www.ecoappraise.com/)
- [TRENDS Research — Water Implications of AI](https://trendsresearch.org/insight/water-implications-of-ai-driven-digital-infrastructure-expansion/)
