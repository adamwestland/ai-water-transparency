# Competitive Analysis: AI Water/Environmental Trackers

*Compiled: March 15, 2026 | Based on live web research*

---

## Executive Summary

There are **6 browser extensions** and **2 web tools** in this space. All are small (4-200 users), early-stage, and narrowly focused on AI-only tracking. **None provide the full-life water context that WaterLens proposes.** The space is nascent but getting crowded fast — we need to move with some urgency if we want to differentiate.

### The Competitive Landscape at a Glance

| Product | Type | Water? | Carbon? | Energy? | Services Supported | Users | Broader Context? |
|---------|------|--------|---------|---------|-------------------|-------|-----------------|
| **AI Impact Tracker** | Chrome + Firefox | No (energy only) | Yes | Yes | ChatGPT only | Unknown | No |
| **DropSense** | Firefox | **Yes** | No | No | ChatGPT, Claude, Gemini, Meta, Mistral, DeepSeek | 4 | No |
| **LLM Water Tracker** | Chrome | **Yes** | No | No | ChatGPT, Claude, Gemini | ~0 | No |
| **Ecomind** | Chrome | **Yes** | Yes | Yes | 12+ providers (OpenAI, Anthropic, Google, xAI, Perplexity) | 11 | No |
| **OffsetAI Enviro-Tracker** | Chrome + Firefox | **Yes** | Yes | Yes | ChatGPT, Claude, Gemini, Perplexity | Unknown | No — but has offset integration |
| **OmniCalculator** | Web calculator | **Yes** | No | Yes | Multiple models | N/A | No |
| **AI Impact Tracker (GitHub)** | Chrome (open source) | No | Yes | Yes | ChatGPT only | Pre-store | No |
| **WaterLens (proposed)** | Chrome + Firefox + macOS | **Yes** | Later | Yes | All major + custom | — | **YES — full life water footprint** |

---

## Detailed Competitor Profiles

### 1. AI Impact Tracker

**Links:** [Chrome Web Store](https://chromewebstore.google.com/detail/ai-impact-tracker/lbeceglchgnhaaidddcdgapnacdjofpf) | [Firefox](https://addons.mozilla.org/en-US/firefox/addon/ai-impact-tracker/) | [GitHub](https://github.com/simonaszilinskas/ai-impact-tracker)

**What it does:** Estimates energy and environmental impact of ChatGPT conversations. Provides relatable comparisons ("This conversation = 20 minutes of Netflix").

**Technical details:**
- Vanilla JavaScript (86.6% JS, 13.4% HTML)
- Chrome Extension Manifest V3
- Implements "EcoLogits v0.9.x Methodology"
- Estimates based on token counts derived from response character length
- 100 commits on main branch, GPL-3.0 license
- Developer: Simon Zilinskas (simon@tortue.studio)

**Strengths:**
- Well-polished UI — users say "it looks like a native ChatGPT feature"
- Cross-browser (Chrome + Firefox)
- Open source with documented methodology
- Active development (100 commits)

**Weaknesses:**
- **ChatGPT only** — no Claude, Gemini, etc.
- **No water tracking** — energy and carbon only
- No broader life context
- Small user base
- 8 open issues

**Key learning:** Good UX matters. Users praised the polish. Our extension needs to feel native to each AI service.

---

### 2. DropSense AI Water Tracker

**Links:** [Firefox Add-on](https://addons.mozilla.org/en-US/firefox/addon/dropsense-ai-water-tracker/)

**What it does:** Educational extension showing estimated water usage for AI conversations. Dashboard with charts, service comparison, everyday equivalents.

**Technical details:**
- Firefox only (109.0+)
- Version 1.0.1, last updated April 8, 2025
- 198 KB file size
- Mozilla Public License 2.0
- Developer: djflem (smeejdota@gmail.com)
- Ko-fi donation link

**Supported services:** ChatGPT, OpenAI, Claude, Anthropic, Google Gemini, Meta AI, Llama, Mistral, DeepSeek — **broadest service coverage of any competitor**

**Strengths:**
- Water-specific focus (not diluted by carbon/energy)
- Broad service coverage (8+ AI services)
- Everyday comparisons (water bottles, shower minutes, toilet flushes)
- Privacy-focused (all local)

**Weaknesses:**
- **4 users, 0 reviews** — essentially no traction
- Firefox only — misses the vast majority of users
- No methodology transparency (vague "based on research")
- No geographic awareness
- No broader life context
- Appears abandoned (no updates since April 2025)

**Key learning:** Broad service coverage and everyday comparisons are good ideas. But Firefox-only and vague methodology killed adoption.

---

### 3. LLM Water Tracker

**Links:** [GitHub](https://github.com/abdjiber/llm-water-tracker)

**What it does:** Chrome extension tracking water consumption of LLM interactions with country-specific calculations.

**Technical details:**
- Chrome only, Manifest V3
- Vanilla JS (55.5%), CSS (26.7%), HTML (17.8%)
- Built with Cursor (AI-assisted development)
- DOM Mutation Observer for interaction detection
- Chrome Storage Sync API
- MIT License
- 1 star, 0 forks, 10 commits
- Last updated: January 5, 2025

**Supported services:** ChatGPT, Claude, Gemini

**Unique feature:** Country-specific water calculations — user selects country during setup for localized estimates. Uses data from arXiv:2304.03271 (Li et al. "Making AI Less Thirsty").

**Strengths:**
- **Country-specific estimates** — closest to geographic awareness
- Cites actual research paper (Li et al.)
- Usage limits with visual progress indicators
- Pause/resume/stop controls
- MIT license (very permissive)

**Weaknesses:**
- Essentially zero adoption (1 star)
- Only 10 commits — likely a side project/prototype
- Limited to 3 services
- No broader context
- No visualization beyond basic stats

**Key learning:** Country-specific localization is a good idea we should adopt. Using published research (Li et al.) as the basis is the right approach. But this is clearly a weekend project — not serious competition.

---

### 4. Ecomind — AI Sustainability Tracker

**Links:** [Chrome Web Store](https://chromewebstore.google.com/detail/ecomind-ai-sustainability/hllhaieflnkbfenbknbdomgjnmngjcci) | [Extpose](https://extpose.com/ext/hllhaieflnkbfenbknbdomgjnmngjcci)

**What it does:** Tracks energy, water, AND carbon for AI API calls across 12+ providers. Zero-config — works immediately.

**Technical details:**
- Chrome only
- Version 1.0.0, last updated October 19, 2025
- Uses Chrome webRequest API to monitor network traffic
- All computation local
- Developer: EcoMind (contact@getmirai.app)

**Supported services:** 12+ providers including OpenAI, Anthropic, Google Gemini, xAI (Grok), Perplexity — **most providers tracked**

**Strengths:**
- **Broadest provider coverage** (12+)
- **Tracks all three metrics** (energy, water, carbon)
- Zero configuration needed
- Uses webRequest API (network-level monitoring, not DOM scraping)
- Provider/model breakdowns
- Daily tracking with auto-reset

**Weaknesses:**
- 11 users, 0 ratings
- Chrome only
- "Industry averages" — no geographic awareness or per-model precision
- No broader life context
- No comparisons to everyday activities
- Minimal UI from what's described

**Key learning:** The webRequest API approach is technically superior to DOM scraping — it catches actual API calls rather than guessing from page content. We should consider this approach. Also, 12+ providers shows what's achievable.

---

### 5. OffsetAI Enviro-Tracker

**Links:** [Website](https://www.offsetai.app/) | [Chrome](https://chromewebstore.google.com/detail/offsetai-enviro-tracker/oaleiaiblmnilbkghbfefnhcbhfmeake) | [Firefox](https://addons.mozilla.org/en-US/firefox/addon/ai-enviro-tracker-by-offsetai/)

**What it does:** Tracks AI environmental impact AND lets users purchase carbon/water offsets. The only product with a clear business model.

**Technical details:**
- Cross-browser (Chrome + Firefox)
- Built by Ecolytics Inc.
- Three tiers: Personal (free), Business (paid), Developers (coming soon)
- Partners with verified offset providers: Native, ClimeCo, We Are Neutral

**Supported services:** ChatGPT, Claude, Gemini, Perplexity

**Strengths:**
- **Only product with a business model** (offset sales, business tier)
- Cross-browser
- Real enterprise customers listed (AriseHealth, Highrring, etc.)
- Professional/commercial quality
- Full stack: track → understand → offset

**Weaknesses:**
- Offset model may be perceived as greenwashing (our user noted this concern)
- "Industry-standard methods" — vague methodology
- No broader life context
- Business focus may not appeal to individual environmentally-conscious users like Mara
- No open source

**Key learning:** This is the most commercially mature competitor. Their business model (free tracking → paid offsets/enterprise) is viable but our user explicitly called offsets "greenwashing." We should position differently — education and context over offset purchasing. But their enterprise angle (team dashboards, reports) is smart for Phase 3.

---

### 6. OmniCalculator AI Water Footprint

**Links:** [Calculator](https://www.omnicalculator.com/ecology/ai-water-footprint)

**What it does:** Web-based calculator for one-off AI water footprint estimation.

**Methodology:** Based on "How Hungry is AI?" dashboard by Nidhal Jegham (University of Rhode Island). Factors in:
- Model parameters (size)
- Model efficiency (batching)
- Water Usage Effectiveness (WUE)
- Power Usage Effectiveness (PUE)
- Task type (text, image, video)

**Strengths:**
- Clean, accessible UX (OmniCalculator is a well-known brand)
- Research-backed methodology
- Distinguishes between text/image/video
- Considers model size

**Weaknesses:**
- One-time calculator, not continuous tracking
- No browser integration
- No personalization
- No life context comparisons

**Key learning:** Their methodology reference ("How Hungry is AI?" by Jegham) is worth investigating — it may be more current than Li et al. alone.

---

## 7. MAJOR FINDING: Google Published Official Per-Query Data

In August 2025, **Google became the first AI company to publish official per-query environmental impact data** for Gemini:

| Metric | Median Gemini Text Prompt | Notes |
|--------|--------------------------|-------|
| **Energy** | 0.24 Wh (0.00024 kWh) | Point-in-time analysis from May 2025 |
| **Carbon** | 0.03 gCO2e (market-based) | 0.09 gCO2e location-based |
| **Water** | 0.26 ml (~5 drops) | Based on fleet-wide WUE |

**Methodology details:**
- Used data from May 2025
- Accounts for "all critical elements of serving AI globally" (not just GPU time)
- Emissions based on Google's 2024 average fleetwide grid carbon intensity
- Water based on Google's 2024 average fleetwide WUE
- Market-based carbon (includes renewable energy purchases) — critics note location-based would be 3x higher

**Why this matters for WaterLens:**
- This is **ground truth data** from a provider — first of its kind
- 0.26 ml per text prompt is dramatically lower than Li et al.'s estimates (~10-25 ml)
- The discrepancy is likely because Google has industry-leading WUE (~1.1) and high renewable energy
- Validates that provider-specific data matters enormously — one number doesn't fit all
- Other providers may follow Google's lead, giving us better data over time
- We should use Google's official data for Gemini and note it's likely a best-case scenario

Sources:
- [Data Center Dynamics](https://www.datacenterdynamics.com/en/news/google-median-gemini-prompt-uses-024-watt-hours-of-power-and-consumes-026ml-of-water/)
- [MIT Technology Review](https://www.technologyreview.com/2025/08/21/1122288/google-gemini-ai-energy/)
- [Google Cloud Blog](https://cloud.google.com/blog/products/infrastructure/measuring-the-environmental-impact-of-ai-inference/)
- [Towards Data Science Analysis](https://towardsdatascience.com/is-googles-reveal-of-geminis-impact-progress-or-greenwashing/)
- [Carbon Credits Analysis](https://carboncredits.com/google-reveals-the-environmental-cost-of-gemini-ai-query/)

---

## Competitive Positioning Map

```
                    AI-Only ←————————————————→ Full Life Water Context
                        |                              |
Narrow (1-3 services)   |  AI Impact Tracker           |
                        |  LLM Water Tracker           |
                        |                              |
                        |                              |
Broad (5+ services)     |  Ecomind                     |
                        |  DropSense                   |
                        |  OffsetAI                    |
                        |                              |
                        |                              |  ★ WaterLens
                        |                              |  (only player here)
                        |                              |
```

**WaterLens occupies an entirely uncontested position:** broad AI tracking WITH full-life water context. Every competitor is clustered in the "AI-only" column.

---

## Key Competitive Insights

### 1. The Market Is Tiny But Growing Fast
- Largest competitor has ~11 users
- All launched in 2024-2025
- Google's official disclosure (Aug 2025) legitimized the space
- EU AI Act will require energy/water reporting — regulatory tailwind

### 2. Nobody Does Context
Every competitor shows "your AI used X ml of water" in isolation. None show it next to your coffee, shower, or food. **This is our entire differentiation.**

### 3. Technical Approaches Vary

| Approach | Used By | Pros | Cons |
|----------|---------|------|------|
| DOM scraping (read message text) | AI Impact Tracker, LLM Water Tracker | Simple, works without special permissions | Fragile if UI changes, misses hidden tokens |
| webRequest API (monitor network) | Ecomind | Catches actual API calls, more accurate | Requires more permissions, may not work on all services |
| Character/token counting | Most | Easy to implement | Rough proxy for actual compute |

### 4. Nobody Has Good Methodology
- AI Impact Tracker: "EcoLogits v0.9.x" (documented but limited)
- DropSense: "based on research" (vague)
- LLM Water Tracker: Cites Li et al. (good but only one source)
- Ecomind: "industry averages" (vague)
- OffsetAI: "industry-standard methods" (vague)
- **Google Gemini: Published actual data** (gold standard but only for Gemini)

WaterLens should have the most transparent, well-documented methodology of any tool. Cite specific papers, show the math, explain uncertainty.

### 5. Potential Partnerships / Data Sources
- **Google's official data** — 0.26 ml per Gemini text prompt is citable ground truth
- **"How Hungry is AI?" by Nidhal Jegham** — methodology used by OmniCalculator, worth investigating
- **Li et al. (UC Riverside)** — GitHub repo with code: https://github.com/Ren-Research/Making-AI-Less-Thirsty
- **EcoLogits** — methodology library used by AI Impact Tracker

### 6. Regulatory Tailwind
- **EU AI Act** — will require large AI systems to report energy, water, resource consumption
- **US Executive Order (Jan 2025)** — directed DOE to draft reporting requirements for AI data centers covering water usage
- **ISO** — preparing "sustainable AI" standards for energy, water, and materials
- This means more data will become available over time, and tools like ours will become more relevant

---

## What We Should Steal (Respectfully)

| From | What | Why |
|------|------|-----|
| **AI Impact Tracker** | Polished, native-feeling UI | Users praised it as looking like a ChatGPT feature |
| **DropSense** | Everyday comparisons (water bottles, showers, flushes) | Exactly what Mara needs |
| **LLM Water Tracker** | Country-specific setup, Li et al. as basis | Geographic awareness is our principle |
| **Ecomind** | webRequest API approach, 12+ provider coverage | More robust than DOM scraping |
| **OffsetAI** | Business tier / team dashboards (for Phase 3) | Enterprise is a viable market |
| **OmniCalculator** | Clean UX, task-type distinction (text/image/video) | Different activities = different water |
| **Google Gemini data** | Official per-query numbers as calibration | Ground truth for at least one provider |

---

## What Nobody Does (Our Opportunity)

1. **Full-life water context** — comparisons to food, household, clothing, transport
2. **Personalized onboarding** — "Are you vegan? Do you drive?" → tailored basket
3. **Uncertainty ranges** — honest about what we don't know
4. **Model comparison** — "Opus used 25ml, Haiku would have used 1ml"
5. **macOS menu bar app** — always-on, system-level
6. **Training water amortization** — transparent about the full picture
7. **Open methodology** — fully documented, citable, peer-reviewable
8. **Multi-platform from day 1** — Chrome + Firefox
