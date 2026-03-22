# AI & Data Center Water Consumption: Research Survey

*Compiled: March 2026 | Last updated with live web research: March 15, 2026*

---

## 1. Key Academic Papers & Research

### 1.1 "Making AI Less Thirsty" — Ren & Li (2023)

**The landmark paper in this space.**

- **Authors:** Pengfei Li, Jianyi Yang, Mohammad A. Islam, Shaolei Ren
- **Title:** "Making AI Less 'Thirsty': Uncovering and Addressing the Secret Water Footprint of AI Models"
- **Published:** arXiv preprint, April 2023; later presented at AAAI 2024 workshop
- **Institution:** UC Riverside
- **DOI/URL:** https://arxiv.org/abs/2304.03271

**Key findings:**
- Training GPT-3 in Microsoft's US data centers consumed an estimated **700,000 liters (185,000 gallons)** of fresh water for direct cooling alone — equivalent to producing ~370 BMW cars or ~320 Tesla EVs
- **Updated (March 2025 revision):** When including embodied water and full lifecycle, total water for GPT-3 training revised to **5.4 million liters**
- Each 100-word AI prompt uses roughly **519 ml** (~one bottle of water)
- A conversation of 20-50 questions with ChatGPT (GPT-3.5/4) consumes roughly **500ml (a standard bottle of water)** in direct water footprint
- **Published in Communications of the ACM (2025):** Paper was formally published at https://dl.acm.org/doi/10.1145/3724499
- Water footprint includes both **on-site cooling** (data center) and **off-site** (electricity generation at power plants)
- Off-site water (power generation) often exceeds on-site water, but is invisible
- Water consumption varies 3-5x depending on data center location and time of year
- Summer months can see dramatically higher water usage due to cooling demands

### 1.2 "The Growing Energy Footprint of Artificial Intelligence" — de Vries (2023)

- **Author:** Alex de Vries
- **Title:** "The Growing Energy Footprint of Artificial Intelligence"
- **Published:** Joule, October 2023
- **Institution:** Vrije Universiteit Amsterdam / Digiconomist
- **DOI:** https://doi.org/10.1016/j.joule.2023.09.004

**Key findings:**
- Projected AI could consume 85-134 TWh annually by 2027 (comparable to Netherlands' electricity consumption)
- Each ChatGPT query uses approximately **10x the electricity** of a Google search (~0.001-0.01 kWh vs ~0.0003 kWh)
- Energy projections imply significant water consequences when combined with WUE data
- NVIDIA shipped ~100,000 AI servers in 2023; projected to ship 1.5 million by 2027

### 1.3 IEA Report on Data Centers & AI (2024)

- **Source:** International Energy Agency
- **Title:** "Electricity 2024: Analysis and Forecast to 2026" (data center section)
- **URL:** https://www.iea.org/reports/electricity-2024

**Key findings:**
- Global data center electricity consumption: ~460 TWh in 2022, projected 620-1,050 TWh by 2026
- AI is a primary growth driver
- Data centers accounted for ~1-1.5% of global electricity demand in 2022
- Report notes water stress as a growing concern but focuses primarily on energy

### 1.4 "Chasing Carbon: The Elusive Environmental Footprint of Computing" — Gupta et al. (2022)

- **Authors:** Udit Gupta, Young Geun Kim, Sylvia Lee, et al.
- **Published:** IEEE HPCA 2022
- **Institution:** Harvard / Meta / Arizona State

**Key findings:**
- Operational energy accounts for bulk of carbon (and by extension, water) footprint
- Embodied carbon of hardware is significant (20-50% of lifecycle)
- Called for holistic lifecycle assessment including water

### 1.5 "Measuring the Carbon Intensity of AI in Cloud Instances" — Dodge et al. (2022)

- **Authors:** Jesse Dodge, Taylor Prewitt, Remi Tachet des Combes, et al.
- **Published:** FAccT 2022
- **Institution:** Allen Institute for AI / Microsoft

**Key findings:**
- Carbon (and water) intensity of AI varies dramatically by cloud region
- Choosing the right region can reduce carbon footprint by 5-10x
- Same principle applies to water: training in Quebec (hydro, cool climate) vs Arizona (gas, hot climate) yields vastly different water footprints

### 1.6 "Power Hungry Processing" — Luccioni et al. (2023)

- **Authors:** Alexandra Sasha Luccioni, Sylvain Viguier, Anne-Laure Ligozat
- **Published:** FAccT 2023
- **Institution:** Hugging Face / ENSIIE

**Key findings:**
- Systematic measurement of energy consumption across 88 ML models
- Multi-purpose generative models consume significantly more energy than task-specific models
- Text generation: ~0.002-0.047 kWh per 1,000 queries (varies by model size)
- Image generation: ~0.1-2.9 kWh per 1,000 images

---

## 2. Specific Numbers: Water Per AI Activity

### 2.1 Per-Query Water Consumption

| Activity | Water Estimate | Source |
|----------|---------------|--------|
| ChatGPT conversation (20-50 Qs) | ~500 ml | Li et al. 2023 |
| Single ChatGPT query (GPT-4) | ~10-25 ml | Derived from Li et al. |
| Single Google search | ~3-7 ml | Various estimates |
| Training GPT-3 (175B params) | ~700,000 liters | Li et al. 2023 |
| Training GPT-4 (est. ~1.7T params) | ~2-6 million liters (estimated) | Extrapolation |
| Generating one AI image (DALL-E/SD) | ~50-200 ml | Rough estimate based on energy data |
| 1 hour of video streaming | ~1-3 liters | Based on data center energy + WUE |

**Important caveats:**
- These numbers are highly sensitive to assumptions about location, energy mix, cooling technology, and time of year
- The 500ml figure is the most widely cited but represents a specific set of assumptions
- On-site (cooling) vs off-site (power generation) water split varies dramatically

### 2.2 Training Water Consumption

| Model | Estimated Water (liters) | Notes |
|-------|-------------------------|-------|
| GPT-3 (175B) | 700,000 | Li et al. estimate, Microsoft US DCs |
| GPT-4 | 2,000,000-6,000,000 | Community estimates (unconfirmed) |
| LLaMA 2 70B | ~300,000-500,000 | Estimated from compute hours |
| BLOOM (176B) | ~200,000 | Trained in France (nuclear/low-water grid) |
| Gemini Ultra | Unknown | Google hasn't disclosed |

---

## 3. Corporate Sustainability Data

### 3.1 Google

- **2022 Environmental Report:** Consumed approximately **5.6 billion gallons (21.2 billion liters)** of water across operations
- **2023 Environmental Report:** Water consumption rose to approximately **6.1 billion gallons** — a ~9% year-over-year increase
- **2024 Environmental Report:** Consumed approximately **8.1 billion gallons** of water — up **88% since 2019** ([Source](https://datacentremagazine.com/news/google-environmental-report-2025-the-data-centre-impact))
- **Council Bluffs, Iowa facility alone:** 1 billion gallons in 2024 — the most of any single Google data center
- **72% of freshwater withdrawals** from sources at low risk of water depletion
- **Replenishment:** Water stewardship projects replenished ~4.5 billion gallons in 2024 (~64% of freshwater consumption), targeting 120% by 2030
- **WUE:** Reports average WUE of ~1.1 L/kWh across data center fleet
- **Trend:** Water consumption has increased every year, correlating with AI infrastructure buildout
- **Commitments:** Pledged to replenish 120% of water consumed by 2030; investing in watershed restoration
- **PUE:** Fleet-wide average ~1.10, among the best in industry

### 3.2 Microsoft

- **2022 Environmental Report:** Water consumption rose **34% year-over-year** to approximately **6.4 million cubic meters (~1.7 billion gallons)**
- **2023 Environmental Report:** Continued increase, attributed directly to AI infrastructure buildout
- **Notable:** Microsoft explicitly acknowledged AI growth as a driver of increased water consumption
- **Commitments:** Water positive by 2030 — replenish more water than consumed
- **WUE:** Varies by facility; reporting is less granular than Google

### 3.3 Meta

- **WUE:** Reports ~0.26 L/kWh — among the lowest in industry
- **Strategy:** Heavy investment in evaporative cooling and renewable energy
- **2023:** Consumed **813 million gallons (3.1 billion liters)** globally — **95% (776M gallons) used by data centers** ([Source](https://www.theinvadingsea.com/2025/09/05/data-center-water-consumption-google-meta-amazon-microsoft-digital-realty-equinix-cooling-system/))
- **Prineville, OR facility:** Uses zero water for cooling (outside air cooling)
- **Note:** Meta's AI compute is growing rapidly (LLaMA models, Reels recommendation, etc.)

### 3.4 Amazon (AWS)

- **Least transparent** of the major providers about water specifically
- **2022 Sustainability Report:** Reported water use but with less granularity
- **2023:** Published water-positive commitment — return more water than consumed by 2030
- **AWS regions:** Some use zero-water cooling (e.g., Ireland, Sweden)
- **Total:** Estimated ~1.6 billion gallons in 2022 (community estimates; official figure less clear)

### 3.5 Lawrence Berkeley National Lab Data (2024 Report)

- **US data centers consumed 17 billion gallons (64 billion liters) directly for cooling in 2023**
- **Indirect water from electricity generation was 12x greater** than direct cooling water ([Source](https://www.theinvadingsea.com/2025/09/05/data-center-water-consumption-google-meta-amazon-microsoft-digital-realty-equinix-cooling-system/))
- **By 2028, direct cooling water could double or quadruple**
- US data centers will require **697 million to 1.45 billion gallons of additional daily water** by 2030

### 3.6 Global Projections

- AI systems projected to have water footprint of **312.5–764.6 billion liters in 2025** ([Source](https://www.sciencedirect.com/science/article/pii/S2666389925002788))
- Global AI demand projected at **4.2-6.6 billion cubic meters of water withdrawal by 2027** — more than the annual water withdrawal of 4-6 Denmarks
- **72% of water consumption** associated with data centers will occur at power plants by 2030, not at data centers themselves
- About **1 in 4 existing data centers** may experience more frequent water-scarcity days by 2050

### 3.7 Transparency Gaps (Privette et al. 2026, AGU Advances)

Key findings from the peer-reviewed transparency assessment:

- **97% of water** consumed by major data center operators is drawn from **municipal drinking water systems** — many already at capacity (Bluefield Research, 2025)
- **Fewer than 1/3 of operators** track even basic WUE metrics (WEF, 2024)
- Most companies disclose only **aggregate** water figures — rarely per-facility, rarely distinguishing direct vs indirect
- **Google Council Bluffs, Iowa:** Single facility consumed 980M gallons in 2023 — **21% of the city's total water** — equivalent to adding 4,700 residents to a city of 62,790
- **The Dalles, Oregon:** Data center water use tripled in 5 years to 355M gallons in 2021 — **29% of city water demand**
- **Mesa, Arizona:** Proposed data center projected to use 1.75M gallons/day — **two-thirds of city's daily supply**
- **2/3 of data centers built since 2022** are in high water-stress areas (California, Arizona, Texas)
- Local governments and utilities frequently sign **NDAs** with developers, blocking public access to water use data
- Google's water use in The Dalles was claimed as a **trade secret** exempt from Oregon's public records laws

**Recommendations from the paper:** Standardize facility-level water reporting, integrate water availability into site selection, require disclosure in economic incentive agreements, mandate water risk assessments for new facilities.

Source: Privette, A. P., Barros, A., & Cai, X. (2026). *AGU Advances*, 7, e2025AV002140. https://doi.org/10.1029/2025AV002140

### 3.8 Year-Over-Year Trend (All Major Providers)

**The universal pattern:** Water consumption is rising 20-40%+ year-over-year for major cloud/AI providers, driven primarily by data center expansion for AI workloads. All major providers have simultaneously made "water positive" pledges for 2030. Notably, companies rarely tell the public exactly how much water they use ([Source](https://www.fastcompany.com/91388269/google-meta-water-use-data-centers-research)).

### 3.8 Liquid Cooling Market Surge

The global market for **liquid-cooling systems in data centers reached $5.52 billion in 2025** and is projected to grow to **$15.75 billion by 2030** (CAGR 23.31%). This shift from air/evaporative to liquid cooling has varying water efficiency implications — some liquid cooling is closed-loop (lower water) while some still requires water for heat rejection.

---

## 4. FUD vs Reality

### 4.1 Common Media Claims

| Claim | Accuracy | Nuance |
|-------|----------|--------|
| "One ChatGPT query uses a bottle of water" | **Misleading** | The 500ml figure is for a 20-50 question *conversation*, not a single query. A single query is more like 10-25ml. |
| "AI is draining the world's water supply" | **Exaggerated** | Data centers use ~0.1-0.2% of total US water withdrawal. Agriculture uses ~70% globally. |
| "AI uses more water than [X city]" | **Sometimes accurate but misleading** | Comparing tech company total water use to a city sounds dramatic but ignores that tech companies serve billions of users globally. |
| "Training GPT-3 used enough water for 370 BMW cars" | **Technically accurate** | This is from Li et al. but the comparison is oddly specific and designed for shock value rather than understanding. |
| "Data centers are drying out communities" | **Locally true in some cases** | There are documented cases of water stress conflicts (e.g., The Dalles, Oregon; Mesa, Arizona). |

### 4.2 What the Research Actually Says

**The nuanced reality:**

1. **AI water consumption is real and growing rapidly** — this is not FUD. 20-40% YoY increases are documented.

2. **But it's a small fraction of total water use** — Data centers globally use roughly 1-2 billion cubic meters/year. Global freshwater withdrawal is ~4,000 billion cubic meters/year. Data centers are ~0.025-0.05% of the total.

3. **Local impact matters more than global averages** — A data center in a water-stressed region (Arizona, parts of Texas) has outsized local impact even if globally insignificant.

4. **The trend line is the concern** — Current absolute numbers are small, but exponential growth in AI compute means water demand could grow 4-6x by 2030 without efficiency improvements.

5. **Efficiency is improving, but demand outpaces it** — WUE and PUE are improving, but total consumption still rises because capacity grows faster.

6. **Location and design choices matter enormously** — A data center in Sweden using free cooling and hydro power might use 1/10th the water of one in Arizona using evaporative cooling and gas-fired electricity.

### 4.3 Often-Missing Context

- **Agriculture uses 70% of global freshwater** — AI's share is minuscule by comparison
- **Thermal power plants use vastly more water** than data centers — coal and gas electricity generation is the dominant water consumer in the energy sector
- **A single round of golf (course irrigation) uses ~500,000 liters/day** in a hot climate
- **The water used by AI is not "consumed" in the same way** — evaporative cooling water is lost to atmosphere but re-enters the water cycle
- **Virtual water in food dwarfs digital water** — 1 kg beef = ~15,400 liters; a year of heavy ChatGPT use = ~10-50 liters

---

## 5. Key Researchers & Institutions

| Researcher | Institution | Focus |
|-----------|-------------|-------|
| **Shaolei Ren** | UC Riverside | Water footprint of AI, sustainable computing |
| **Pengfei Li** | UC Riverside | Co-author of "Making AI Less Thirsty" |
| **Alex de Vries** | VU Amsterdam / Digiconomist | Energy footprint of AI and crypto |
| **Sasha Luccioni** | Hugging Face | Measuring ML environmental impact |
| **Jesse Dodge** | Allen Institute for AI | Carbon intensity of cloud AI |
| **Udit Gupta** | Harvard → Cornell | Holistic computing carbon footprint |
| **Anne-Laure Ligozat** | ENSIIE / LISN (France) | Green AI, environmental impact of NLP |
| **David Patterson** | UC Berkeley / Google | Energy-efficient computing |
| **Carole-Jean Wu** | Meta / FAIR | Sustainable AI infrastructure |
| **Emma Strubell** | CMU → Allen AI | Energy & policy costs of NLP (early influential work) |

### Key Institutions & Organizations

- **UC Riverside** — Ren Lab, leading water footprint research
- **The Green Web Foundation** — Web sustainability tools and data
- **The Uptime Institute** — Data center efficiency benchmarking
- **Lawrence Berkeley National Lab** — DOE data center energy research
- **Water Footprint Network** — Water footprint methodology standards
- **IEA** — International Energy Agency, data center energy projections
- **Climate Change AI** — Community connecting AI and climate research

---

## 6. Open Questions for Further Research

1. **Per-model water disclosures:** No AI company publishes water-per-query or water-per-training-run figures. All current numbers are estimates.

2. **Inference vs training split:** As models are deployed at scale, inference energy (and water) dominates training. But exact splits are proprietary.

3. **Efficiency trajectory:** Are hardware efficiency gains (newer GPUs, better cooling) keeping pace with demand growth?

4. **Water quality:** Is discharged cooling water degraded? Thermal pollution in waterways is a separate concern.

5. **Embodied water:** Water used in manufacturing GPUs, servers, and data center construction is rarely accounted for.

6. **Renewable energy doesn't mean zero water:** Solar farms in deserts still need panel washing; hydro dams have massive evaporation. Only wind is near-zero water.

---

## Bibliography

1. Li, P., Yang, J., Islam, M.A., & Ren, S. (2023). "Making AI Less 'Thirsty': Uncovering and Addressing the Secret Water Footprint of AI Models." *arXiv:2304.03271*. https://arxiv.org/abs/2304.03271

2. de Vries, A. (2023). "The Growing Energy Footprint of Artificial Intelligence." *Joule*, 7(10), 2191-2194. https://doi.org/10.1016/j.joule.2023.09.004

3. Gupta, U., Kim, Y.G., Lee, S., et al. (2022). "Chasing Carbon: The Elusive Environmental Footprint of Computing." *IEEE HPCA 2022*.

4. Dodge, J., Prewitt, T., Tachet des Combes, R., et al. (2022). "Measuring the Carbon Intensity of AI in Cloud Instances." *FAccT 2022*. https://doi.org/10.1145/3531146.3533234

5. Luccioni, A.S., Viguier, S., & Ligozat, A.L. (2023). "Power Hungry Processing: Watts Driving the Cost of AI Deployment?" *FAccT 2023*. https://doi.org/10.1145/3593013.3594049

6. Strubell, E., Ganesh, A., & McCallum, A. (2019). "Energy and Policy Considerations for Deep Learning in NLP." *ACL 2019*. https://doi.org/10.18653/v1/P19-1355

7. Patterson, D., Gonzalez, J., Le, Q., et al. (2021). "Carbon Emissions and Large Neural Network Training." *arXiv:2104.10350*.

8. International Energy Agency (2024). "Electricity 2024: Analysis and Forecast to 2026." https://www.iea.org/reports/electricity-2024

9. Google Environmental Report 2023. https://sustainability.google/reports/

10. Microsoft Environmental Sustainability Report 2023. https://www.microsoft.com/en-us/corporate-responsibility/sustainability

11. Meta Sustainability Report 2023. https://sustainability.fb.com/

12. Mytton, D. (2021). "Data centre water consumption." *npj Clean Water*, 4, 11. https://doi.org/10.1038/s41545-021-00101-w

13. Shehabi, A., Smith, S., Sartor, D., et al. (2016). "United States Data Center Energy Usage Report." *Lawrence Berkeley National Laboratory*. LBNL-1005775.

14. Li, P., Yang, J., Islam, M.A., & Ren, S. (2025). "Making AI Less 'Thirsty'." *Communications of the ACM*. https://dl.acm.org/doi/10.1145/3724499

15. "The carbon and water footprints of data centers and what this could mean for artificial intelligence." *ScienceDirect* (2025). https://www.sciencedirect.com/science/article/pii/S2666389925002788

16. Brookings Institution. "AI, data centers, and water." https://www.brookings.edu/articles/ai-data-centers-and-water/

17. Undark Magazine. "How Much Water Do AI Data Centers Really Use?" (Dec 2025). https://undark.org/2025/12/16/ai-data-centers-water/

18. Lincoln Institute of Land Policy. "Data Drain: The Land and Water Impacts of the AI Boom." https://www.lincolninst.edu/publications/land-lines-magazine/articles/land-water-impacts-data-centers/

19. MSCI. "When AI Meets Water Scarcity: Data Centers in a Thirsty World." https://www.msci.com/research-and-insights/blog-post/when-ai-meets-water-scarcity-data-centers-in-a-thirsty-world

20. Stanford. "Thirsty for power and water, AI-crunching data centers sprout across the West." https://andthewest.stanford.edu/2025/thirsty-for-power-and-water-ai-crunching-data-centers-sprout-across-the-west/

21. Ren Research Lab GitHub — water footprint calculator code. https://github.com/Ren-Research/Making-AI-Less-Thirsty

22. Privette, A. P., Barros, A., & Cai, X. (2026). "Data Centers Water Footprint: The Need for More Transparency." *AGU Advances*, 7, e2025AV002140. https://doi.org/10.1029/2025AV002140

23. McCauley, P. & Scanlan, M. (2025). "Tech companies rarely reveal how much water data centers use." *Fast Company* (via The Conversation). https://www.fastcompany.com/91388269/google-meta-water-use-data-centers-research

24. Chervek, E. (2023). "Hyperscaler sustainability scorecard: Rating Google's, Microsoft's and AWS' environmental strategies." *SDxCentral*. https://www.sdxcentral.com/analysis/hyperscaler-sustainability-scorecard-rating-googles-microsofts-and-aws-environmental-strategies/
