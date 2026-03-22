# Water Measurement Methodologies for Computing

*Compiled: March 2026 | Status: Draft — URLs should be verified*

---

## 1. Key Metrics

### 1.1 Water Usage Effectiveness (WUE)

**Definition:** Annual site water usage divided by IT equipment energy consumption.

```
WUE = Annual Water Usage (liters) / IT Equipment Energy (kWh)
```

**Units:** Liters per kilowatt-hour (L/kWh)

**Published by:** The Green Grid (now part of iMasons)

**Industry benchmarks:**

| Provider/Facility | WUE (L/kWh) | Notes |
|-------------------|-------------|-------|
| Google (fleet avg) | ~1.10 | Among the best; some facilities near 0 |
| Meta (fleet avg) | ~0.26 | Industry-leading; several zero-water facilities |
| Equinix (avg) | ~1.55 | Large colocation provider |
| Microsoft | ~1.0-1.8 | Varies by facility; less granular reporting |
| Industry average | ~1.8 | The Green Grid / Uptime Institute estimate |
| Best-in-class | ~0.0-0.3 | Air-cooled or cold-climate facilities |
| Worst-case | ~3.0-5.0+ | Older facilities in hot, dry climates |

**Limitations of WUE:**
- Only measures **on-site** water (cooling, humidification)
- Does **not** include **off-site** water used in electricity generation
- Doesn't account for water quality degradation
- Can be gamed (e.g., using potable water vs reclaimed water)
- Seasonal variation is significant but annual reporting masks this

### 1.2 Power Usage Effectiveness (PUE)

**Definition:** Total facility energy / IT equipment energy.

```
PUE = Total Facility Energy / IT Equipment Energy
```

**Why it matters for water:** PUE tells you the overhead energy for cooling and other facility operations. Higher PUE = more cooling energy = typically more cooling water.

| Provider | PUE | Notes |
|----------|-----|-------|
| Google | ~1.10 | Industry-leading |
| Meta | ~1.10 | Industry-leading |
| Microsoft | ~1.12-1.20 | Very good |
| AWS | ~1.15-1.20 | Good (limited disclosure) |
| Industry average | ~1.55-1.60 | Uptime Institute survey |
| Hyperscale average | ~1.10-1.30 | Large cloud providers |
| Older facilities | ~1.8-2.5 | Legacy enterprise data centers |

### 1.3 Source PUE & Source WUE

Some researchers advocate for **source-based** metrics that include upstream impacts:

```
Source WUE = (On-site water + Off-site water from electricity generation) / IT Energy
```

This is the more complete picture and what Li et al. (2023) use. Off-site water often exceeds on-site water.

---

## 2. The Full Water Chain for an AI Query

### 2.1 End-to-End Model

```
Total Water = On-Site Water + Off-Site Water

On-Site Water = Energy_IT × PUE × WUE_cooling
             = kWh consumed × cooling overhead × liters per kWh cooling

Off-Site Water = Energy_total × Water_intensity_of_electricity
              = kWh consumed × PUE × L/kWh (varies by energy source)
```

### 2.2 Step-by-Step Breakdown

#### Step 1: Energy Consumed by the AI Query

| Activity | Estimated Energy (kWh) | Source |
|----------|----------------------|--------|
| Single Google search | 0.0003 | Google (2009, likely lower now) |
| Single ChatGPT query (GPT-3.5) | 0.001-0.005 | de Vries 2023, IEA estimates |
| Single ChatGPT query (GPT-4) | 0.005-0.02 | Community estimates, inference benchmarks |
| Single Claude query (large model) | 0.005-0.02 | Estimated, similar to GPT-4 class |
| Single image generation (DALL-E 3/SD) | 0.01-0.05 | Luccioni et al. 2023 |
| Single code completion (Copilot) | 0.001-0.005 | Estimated |
| 1 hour video streaming (Netflix) | 0.08-0.15 | IEA / Shift Project (revised) |
| 1 hour video call (Zoom) | 0.05-0.10 | Estimated |

**Important:** These are *server-side* energy estimates. Client-side energy (your laptop/phone) is additional but doesn't contribute to data center water.

#### Step 2: On-Site Cooling Water

```
On-site water (L) = Energy_IT (kWh) × WUE (L/kWh)
```

**Example for a GPT-4 query (0.01 kWh):**
- Google data center (WUE 1.1): 0.01 × 1.1 = **0.011 L** (11 ml)
- Industry average (WUE 1.8): 0.01 × 1.8 = **0.018 L** (18 ml)
- Meta data center (WUE 0.26): 0.01 × 0.26 = **0.0026 L** (2.6 ml)
- Zero-water facility: **0 L**

#### Step 3: Off-Site Water (Electricity Generation)

```
Off-site water (L) = Energy_total (kWh) × PUE × Water_intensity_grid (L/kWh)
```

Water intensity of electricity generation varies dramatically by source (see Section 3 below).

**Example for a GPT-4 query (0.01 kWh, PUE 1.1):**
- US average grid (~0.5 L/kWh): 0.01 × 1.1 × 0.5 = **0.0055 L** (5.5 ml)
- Coal-heavy grid (~1.8 L/kWh): 0.01 × 1.1 × 1.8 = **0.020 L** (20 ml)
- Wind/solar grid (~0.02 L/kWh): 0.01 × 1.1 × 0.02 = **0.0002 L** (0.2 ml)
- Nuclear grid (~2.0 L/kWh): 0.01 × 1.1 × 2.0 = **0.022 L** (22 ml)

#### Step 4: Total Water Per Query

| Scenario | On-Site | Off-Site | Total | Notes |
|----------|---------|----------|-------|-------|
| **Best case** (Meta DC, wind/solar) | 2.6 ml | 0.2 ml | **~3 ml** | Zero-water cooling + renewables |
| **Average case** (Typical DC, US grid) | 11-18 ml | 5.5 ml | **~15-25 ml** | Most common scenario |
| **Worst case** (Old DC, coal grid) | 30-50 ml | 20 ml | **~50-70 ml** | Hot climate, coal-heavy grid |

**Context:** A single query is roughly 3-70 ml. The "500ml per conversation" figure from Li et al. assumes 20-50 queries in a conversation, at average conditions.

---

## 3. Water Intensity by Energy Source

### 3.1 Water Consumption per kWh by Generation Type

Water use in power generation is categorized as:
- **Withdrawal:** Water taken from a source (may be returned)
- **Consumption:** Water that is evaporated or incorporated into products (not returned)

**Consumption is the relevant metric** for water footprint, as withdrawn water that is returned is still available.

| Energy Source | Water Consumption (L/kWh) | Water Withdrawal (L/kWh) | Notes |
|--------------|--------------------------|-------------------------|-------|
| **Coal (once-through cooling)** | 0.5-1.1 | 75-190 | High withdrawal, moderate consumption |
| **Coal (cooling tower)** | 1.5-2.6 | 1.9-3.4 | Most US coal plants |
| **Natural Gas (combined cycle, tower)** | 0.6-1.0 | 0.8-1.5 | More efficient than coal |
| **Natural Gas (once-through)** | 0.3-0.5 | 28-75 | High withdrawal |
| **Nuclear (cooling tower)** | 1.5-2.7 | 2.3-4.2 | Comparable to coal |
| **Nuclear (once-through)** | 0.5-1.0 | 95-227 | Very high withdrawal |
| **Concentrated Solar (CSP)** | 2.8-3.5 | 2.9-3.6 | Uses steam turbines |
| **Solar PV** | 0.02-0.1 | 0.02-0.1 | Panel washing only |
| **Wind (onshore)** | 0.001-0.004 | 0.001-0.004 | Essentially zero |
| **Wind (offshore)** | ~0.001 | ~0.001 | Essentially zero |
| **Hydroelectric** | 5.4-68.0 | 5.4-68.0 | Reservoir evaporation (highly variable) |
| **Geothermal** | 1.0-6.8 | 1.0-6.8 | Varies by plant type |
| **Biomass** | 1.5-2.5 | 1.9-3.4 | Similar to coal |

**Sources:** NREL (National Renewable Energy Laboratory), Macknick et al. (2012) "Operational water consumption and withdrawal factors for electricity generating technologies," *Environmental Research Letters*.

### 3.2 Key Insight: Hydro Is Surprisingly Water-Intensive

Counter-intuitively, **hydroelectric power has the highest water consumption** per kWh due to reservoir evaporation. This means data centers in hydro-heavy regions (e.g., Quebec, Pacific Northwest, Nordics) may have lower *carbon* but not necessarily lower *water* footprints.

However, this is debated — some researchers argue reservoir evaporation would occur regardless of hydroelectric generation and shouldn't be fully attributed to electricity production.

### 3.3 US Grid Average

The average US grid water consumption for electricity is approximately **0.5-0.7 L/kWh** (consumption, not withdrawal), but this varies dramatically by region:

| US Region | Approximate Water Intensity (L/kWh consumption) | Primary Sources |
|-----------|------------------------------------------------|-----------------|
| Pacific Northwest (WA, OR) | 0.3-1.0 | Hydro (evaporation debate) |
| California | 0.2-0.5 | Solar, gas, some nuclear |
| Texas (ERCOT) | 0.5-0.8 | Gas, wind, some coal |
| Midwest (MISO) | 0.8-1.5 | Coal, nuclear, wind |
| Southeast (SERC) | 0.6-1.0 | Nuclear, gas, coal |
| Northeast (ISO-NE) | 0.4-0.6 | Gas, nuclear, some renewables |
| Nordics (for comparison) | 0.1-0.3 | Hydro, wind, nuclear |

---

## 4. Geographic Variation in Data Center Water Use

### 4.1 Climate Impact on Cooling Water

Data center cooling approach depends heavily on climate:

| Climate Zone | Typical Cooling | Water Impact |
|-------------|----------------|--------------|
| **Hot & Dry** (Phoenix, Dallas) | Evaporative cooling | HIGH — ~1.5-3.0 L/kWh WUE |
| **Hot & Humid** (Singapore, Houston) | Mechanical chilling | MODERATE — less evaporative, more energy |
| **Temperate** (Virginia, Netherlands) | Mixed / partial free cooling | MODERATE — ~0.5-1.5 L/kWh WUE |
| **Cold** (Sweden, Finland, Quebec) | Free air cooling most of year | LOW — ~0.0-0.3 L/kWh WUE |
| **Marine** (Ireland, UK) | Free air cooling | LOW — ~0.0-0.5 L/kWh WUE |

### 4.2 Notable Data Center Locations & Water Profiles

| Location | Major Tenants | Climate | Grid | Water Profile |
|----------|--------------|---------|------|--------------|
| **The Dalles, OR** | Google | Semi-arid | Hydro (BPA) | Low-carbon but moderate water stress; local controversy |
| **Northern Virginia** | AWS, Azure, Google, Meta | Humid subtropical | Mixed (gas, nuclear) | High demand area; moderate water |
| **Phoenix/Mesa, AZ** | Apple, Google, Meta | Desert | Gas, solar | Very high water stress; evaporative cooling challenging |
| **Dublin, Ireland** | Google, AWS, Microsoft | Marine | Wind, gas | Low cooling water; grid is moderating carbon |
| **Luleå, Sweden** | Meta, others | Subarctic | Hydro, wind | Near-zero cooling water; very green grid |
| **Singapore** | Google, AWS, Equinix | Tropical | Gas | High energy for cooling, moderate water |

### 4.3 Seasonal Variation

Li et al. (2023) found water consumption can vary **3-5x** between winter and summer at the same facility:
- **Winter:** Free cooling often possible; minimal water needed
- **Summer:** Peak evaporative cooling demand; maximum water consumption
- **Implication:** A query made in July at a Phoenix data center uses dramatically more water than the same query in January at the same facility

---

## 5. Everyday Water Benchmarks

### 5.1 Household Direct Water Use

| Activity | Water (Liters) | Notes |
|----------|---------------|-------|
| Glass of drinking water | 0.25 | 8 oz glass |
| Flushing toilet (standard) | 6-13 | Older: 13L; low-flow: 6L |
| Flushing toilet (dual-flush, half) | 3-4.5 | Low flush option |
| Brushing teeth (tap running) | 6-8 | 2 minutes |
| Brushing teeth (tap off) | 0.5-1 | Just rinse |
| Shower (8 minutes) | 60-80 | Standard showerhead ~8 L/min |
| Shower (5 min, low-flow) | 25-40 | Low-flow ~5-7 L/min |
| Bath | 150-300 | Full bath |
| Dishwasher (modern, full load) | 10-15 | More efficient than hand-washing |
| Hand-washing dishes | 20-60 | Depends on method |
| Washing machine load | 50-100 | Front-load: 50L; top-load: 100L |
| Watering garden (10 min hose) | 100-170 | Standard hose ~10-17 L/min |
| Filling a swimming pool | 30,000-75,000 | Average residential pool |

### 5.2 Virtual Water (Embedded in Products)

| Product | Virtual Water (Liters) | Source |
|---------|----------------------|--------|
| 1 cup of coffee | 130-140 | Growing, processing beans |
| 1 apple | 70 | Growing |
| 1 kg rice | 2,500 | Paddy irrigation |
| 1 kg wheat | 1,350 | Growing |
| 1 kg beef | 15,400 | Feed, drinking, processing |
| 1 kg chicken | 4,300 | Feed, drinking, processing |
| 1 kg cheese | 5,000 | Milk production + processing |
| 1 liter of milk | 1,000 | Feed, drinking water for cow |
| 1 cotton t-shirt | 2,700 | Growing cotton |
| 1 pair of jeans | 8,000-10,000 | Cotton + processing |
| 1 car (manufacturing) | 150,000 | Materials + assembly |
| 1 smartphone | 12,000-13,000 | Mining, fabrication, assembly |
| 1 sheet of A4 paper | 10 | Pulp processing |
| 1 egg | 196 | Feed, drinking for hen |
| 1 liter of beer | 300 | Grain growing + brewing |
| 1 kg chocolate | 17,000 | Cocoa farming + processing |

**Source:** Water Footprint Network / Mekonnen & Hoekstra (2011)

### 5.3 Putting AI Water in Context

| Comparison | Water |
|-----------|-------|
| One ChatGPT conversation (20-50 queries) | ~500 ml |
| One glass of drinking water | 250 ml |
| One toilet flush | 6,000-13,000 ml |
| One 8-minute shower | 60,000-80,000 ml |
| Daily drinking water (recommended) | 2,000-3,000 ml |
| Growing the coffee beans for one cup | 130,000-140,000 ml |
| One year of heavy AI use (200 queries/day, GPT-4o) | ~122 liters |
| One year of heavy AI use (200 queries/day, GPT-4.5) | ~1,618 liters |
| One pair of jeans (virtual water) | 8,000-10,000 liters |
| One kg of beef (virtual water) | 15,400 liters |

**Key insight:** A year of heavy GPT-4o use (~122L) is less water than a single hamburger (2,400L). Even the most energy-intensive model (GPT-4.5 at ~1,618L/year) is still less than one hamburger. Model choice matters enormously — GPT-4.5 uses ~13× more water per query than GPT-4o (both from published data: arXiv 2505.09598v5, Epoch AI). See `research/07-model-energy-derivations.md` for full calculation.

---

## 6. Standards & Frameworks

### 6.1 ISO 14046: Water Footprint Assessment

- **Published:** 2014
- **Scope:** Principles, requirements, and guidelines for water footprint assessment of products, processes, and organizations
- **Key concepts:**
  - Water scarcity footprint (consumptive use weighted by local scarcity)
  - Water degradation footprint (quality changes)
  - Lifecycle-based assessment
- **Relevance:** Provides the formal framework for how to count water. Our tool should align with these principles even if not formally certified.

### 6.2 Water Footprint Network Methodology

- **Developer:** Prof. Arjen Hoekstra (University of Twente, deceased 2019)
- **Components:**
  - **Blue water:** Surface and groundwater consumed
  - **Green water:** Rainwater consumed (mainly agriculture)
  - **Grey water:** Volume needed to dilute pollutants to acceptable levels
- **For computing:** Primarily blue water (cooling, electricity generation)

### 6.3 GHG Protocol — Water Analog

The GHG Protocol defines Scope 1, 2, 3 for carbon emissions. An analog framework for water:

| Scope | Carbon Equivalent | Water Equivalent |
|-------|------------------|-----------------|
| **Scope 1** | Direct emissions | **On-site water** — cooling, humidification at data center |
| **Scope 2** | Electricity emissions | **Electricity generation water** — water consumed at power plants to generate the electricity used |
| **Scope 3** | Value chain emissions | **Embodied water** — manufacturing hardware, construction, supply chain |

Most water footprint estimates for AI cover **Scope 1 + Scope 2** only. Scope 3 (embodied water in GPUs, servers, buildings) is rarely included and would significantly increase the total.

---

## 7. Scope & Boundary Considerations

### 7.1 What to Include in Our Tool

**Recommended scope for v1 (practical, defensible):**

| Category | Include? | Rationale |
|----------|---------|-----------|
| On-site cooling water (Scope 1) | **Yes** | Core data center water use, estimable from WUE |
| Electricity generation water (Scope 2) | **Yes** | Often larger than on-site; estimable from grid mix |
| Hardware manufacturing water (Scope 3) | **Not in v1** | Hard to allocate per-query; add later |
| Network infrastructure water | **Not in v1** | Very small relative contribution |
| End-user device water | **No** | Not attributable to the AI service |
| Water for AI researcher offices | **No** | Negligible and unrelated |

### 7.2 Handling Uncertainty

Since all per-query estimates involve significant uncertainty, the tool should:

1. **Show ranges, not point estimates** — "Your query used approximately 10-50 ml of water"
2. **Explain key variables** — Location, energy source, and cooling technology matter most
3. **Use conservative defaults** — If location is unknown, use industry-average WUE and grid water intensity
4. **Allow user customization** — Let users specify their AI provider's known data center locations
5. **Cite sources** — Every estimate should trace back to published research

### 7.3 Attribution Models

How to allocate shared data center water to individual queries:

| Model | Approach | Pros | Cons |
|-------|----------|------|------|
| **Energy-proportional** | Water ∝ energy consumed by query | Simple, defensible | Doesn't account for PUE variation |
| **Time-proportional** | Water ∝ GPU-seconds consumed | Fair allocation | Hard to measure from client |
| **Revenue-proportional** | Water ∝ revenue per query | Economic allocation | Irrelevant to physical reality |
| **Average allocation** | Total water / total queries | Simple | Ignores model size differences |

**Recommendation:** Energy-proportional is the most scientifically defensible and practical approach.

---

## 8. Proposed Calculation Framework for Our Tool

### 8.1 Per-Query Water Estimation Formula

```
Water_total (L) = Water_onsite + Water_offsite

Water_onsite = E_query × PUE × WUE_facility
Water_offsite = E_query × PUE × WI_grid

Where:
  E_query   = Estimated energy per query (kWh) — varies by model/service
  PUE       = Power Usage Effectiveness of facility (default: 1.2)
  WUE       = Water Usage Effectiveness (L/kWh) (default: 1.8, industry avg)
  WI_grid   = Water intensity of local electricity grid (L/kWh) (default: 0.5)
```

### 8.2 Default Values Table (Configurable)

| Parameter | Default | Range | Source |
|-----------|---------|-------|--------|
| E_query (chat, small model) | 0.003 kWh | 0.001-0.005 | de Vries, IEA |
| E_query (chat, large model) | 0.01 kWh | 0.005-0.02 | Community estimates |
| E_query (image generation) | 0.03 kWh | 0.01-0.05 | Luccioni et al. |
| E_query (code completion) | 0.003 kWh | 0.001-0.005 | Estimated |
| PUE | 1.2 | 1.05-2.0 | Uptime Institute |
| WUE | 1.8 L/kWh | 0.0-5.0 | Green Grid |
| WI_grid (US avg) | 0.5 L/kWh | 0.01-2.5 | NREL/EIA |

### 8.3 Example Calculation

**Scenario:** Single GPT-4 query, average US data center

```
E_query = 0.01 kWh
PUE = 1.2
WUE = 1.8 L/kWh
WI_grid = 0.5 L/kWh

Water_onsite = 0.01 × 1.2 × 1.8 = 0.0216 L (21.6 ml)
Water_offsite = 0.01 × 1.2 × 0.5 = 0.006 L (6.0 ml)
Water_total = 0.0216 + 0.006 = 0.0276 L (~28 ml)
```

Compare: Li et al. estimate ~10-25 ml per query. Our framework gives ~28 ml with conservative defaults, which is in the right ballpark.

### 8.4 Sensitivity Analysis

Varying key parameters for a single GPT-4 query:

| Scenario | E_query | WUE | WI_grid | Total Water |
|----------|---------|-----|---------|-------------|
| Best case (Meta, wind) | 0.005 | 0.26 | 0.02 | **1.7 ml** |
| Good case (Google, mixed) | 0.01 | 1.1 | 0.3 | **17 ml** |
| Average case | 0.01 | 1.8 | 0.5 | **28 ml** |
| Worst case (old DC, coal) | 0.02 | 3.0 | 1.8 | **115 ml** |

This 1.7 ml → 115 ml range (67x!) shows why **transparency about assumptions is critical**.
