# Existing Tools & Landscape Analysis

*Compiled: March 2026 | Last updated with live web research: March 15, 2026*

---

## 1. Water Footprint Calculators (General)

### 1.1 Web-Based Calculators

| Tool | URL | Type | Tracks Water? | Notes |
|------|-----|------|--------------|-------|
| **Water Footprint Network Calculator** | waterfootprint.org/en/resources/interactive-tools/ | Web | Yes — household & product | Gold standard for virtual water methodology. Based on Hoekstra's research. |
| **USGS Water Use Calculator** | water.usgs.gov | Web | Yes — household | US-focused, good benchmarks for daily domestic use |
| **Water Calculator (GRACE)** | watercalculator.org | Web | Yes — personal daily use | Excellent UX, estimates household water footprint with regional data |
| **WWF Water Risk Filter** | waterriskfilter.org | Web | Yes — corporate/basin-level | Designed for business water risk assessment, not consumer-facing |
| **Waterstat** | waterfootprint.org/en/resources/waterstat/ | Data | Yes — national water footprint data | Database, not a calculator — useful as a data source |

### 1.2 Mobile Apps

| App | Platform | Focus | Notes |
|-----|----------|-------|-------|
| **Water Footprint Calculator** (various) | iOS/Android | Household water | Multiple apps with this name; quality varies |
| **Dropcountr** | iOS/Android | Utility-connected household tracking | Integrates with water utilities for real usage data |
| **Flume** | iOS/Android | Smart water meter companion | Hardware sensor + app, actual measured usage |

### 1.3 Gap Analysis: Water Calculators

**What exists:** Household/agricultural water calculators are well-established.

**What's missing:** No existing calculator connects digital activities (AI usage, streaming, cloud computing) to water consumption. This is the gap our project would fill.

---

## 2. AI & Computing Environmental Trackers

### 2.1 Carbon/Energy Trackers (Most Do NOT Track Water)

| Tool | GitHub | Language | Tracks Carbon? | Tracks Water? | Notes |
|------|--------|----------|---------------|--------------|-------|
| **CodeCarbon** | mlco2/codecarbon | Python | Yes | **No** | Most popular ML carbon tracker. Measures GPU/CPU energy, converts to CO2 using grid carbon intensity. ~3k GitHub stars. |
| **Carbontracker** | lfwa/carbontracker | Python | Yes | **No** | Tracks energy and carbon for DL training. Simpler than CodeCarbon. |
| **Green Algorithms** | GreenAlgorithms/green-algorithms-tool | Web + Python | Yes | **Partial** | Web calculator for estimating computing carbon. Has some water discussion but not a core output. |
| **ML CO2 Impact** | mlco2/impact | Web | Yes | **No** | Simple web form to estimate ML training carbon. By Lacoste et al. |
| **experiment-impact-tracker** | Breakend/experiment-impact-tracker | Python | Yes | **No** | Tracks energy, carbon, compute for ML experiments. |
| **Eco2AI** | sb-ai-lab/Eco2AI | Python | Yes | **No** | Russian-developed, tracks equivalent CO2 for training. |
| **Zeus** | ml-energy/zeus | Python | Yes (energy) | **No** | Fine-grained GPU energy measurement framework. |

### 2.2 Key Finding: The Water Gap

**None of the major ML environmental tracking tools measure water consumption.** They all focus on energy → carbon conversion. This is a significant gap and a key opportunity for this project.

The chain they implement: `GPU energy (kWh) → Grid carbon intensity (gCO2/kWh) → Total carbon`

What's needed to add water: `GPU energy (kWh) → Grid water intensity (L/kWh) + DC cooling water (WUE × kWh) → Total water`

### 2.3 How CodeCarbon Works (Architecture Reference)

CodeCarbon is the most mature tool and a good architecture reference:

1. **Energy measurement:** Uses Intel RAPL (Running Average Power Limit) for CPU, NVIDIA SMI for GPU, estimates for RAM
2. **Location detection:** Uses IP geolocation to determine grid region
3. **Carbon intensity data:** Embeds carbon intensity factors per grid region (from electricityMap, EPA eGRID, etc.)
4. **Tracking modes:** Decorator-based (`@track_emissions`) or context manager for Python code
5. **Output:** CSV logs, optional dashboard, optional API reporting

**To add water tracking, you'd need:**
- Water intensity factors per energy source/grid region (L/kWh) — this data exists but isn't aggregated in a usable format
- Data center WUE by cloud provider and region — partially available
- A model for cooling water that accounts for climate/season

### 2.4 Boavizta API

- **URL:** https://github.com/Boavizta/boaviztapi
- **What:** API for evaluating environmental impacts of ICT (servers, cloud, etc.)
- **Tracks:** Carbon, energy, and has some water-related metrics
- **Notable:** One of the few tools that attempts to include water in computing lifecycle assessment
- **Architecture:** REST API, can estimate impact of cloud instances by provider/region
- **Limitation:** Water estimates are rough and based on averages, not real-time

---

## 3. Browser Extensions for Sustainability

### 3.1 Existing Extensions

| Extension | Browser | What It Tracks | Water? | Notes |
|-----------|---------|---------------|--------|-------|
| **Carbonalyser** (The Shift Project) | Firefox | Data transferred → energy → CO2 | **No** | Estimates carbon of web browsing based on data volume. French research project. |
| **Website Carbon** | Web tool (not extension) | Page load → CO2 per visit | **No** | websitecarbon.com — checks if hosting is green, estimates CO2 per page view |
| **The Green Web Foundation** | Browser check | Whether a site uses green hosting | **No** | thegreenwebfoundation.org — database of green-hosted sites |
| **Digital Carbon Footprint** | Chrome | Browsing carbon footprint | **No** | Less maintained, basic data-transfer-based estimates |
| **Greenhouse** | Chrome | Estimates CO2 from electricity used while browsing | **No** | Research prototype |

### 3.2 !! CRITICAL FINDING: Direct Competitors Already Exist !!

**The web search revealed that browser extensions tracking AI water usage ALREADY EXIST:**

#### AI Impact Tracker (Chrome + Firefox)
- **Chrome:** https://chromewebstore.google.com/detail/ai-impact-tracker/lbeceglchgnhaaidddcdgapnacdjofpf
- **Firefox:** https://addons.mozilla.org/en-US/firefox/addon/ai-impact-tracker/
- **What it does:** Estimates energy and water footprint of AI interactions with ChatGPT, Claude, and Gemini
- **How:** Calculates based on message length and reply length, using GPT-4o characteristics as baseline
- **Privacy:** Operates entirely within browser — data never leaves device
- **Features:** Relatable comparisons like "This conversation = 20 minutes of Netflix"
- **Limitation:** Based on message length heuristic, not actual compute data

#### DropSense AI Water Tracker (Firefox)
- **Firefox:** https://addons.mozilla.org/en-US/firefox/addon/dropsense-ai-water-tracker/
- **What it does:** Educational extension revealing estimated water usage behind AI services
- **Features:** Real-time estimates, intuitive dashboard with charts, comparisons, and insights
- **Focus:** Specifically water (not carbon), with visualization emphasis

#### OmniCalculator AI Water Footprint Calculator (Web)
- **URL:** https://www.omnicalculator.com/ecology/ai-water-footprint
- **What it does:** Web-based calculator for estimating AI water footprint
- **Type:** One-time calculation, not continuous tracking

### 3.3 Gap Analysis: What Existing Extensions Don't Do Well

Despite competitors existing, there are clear gaps:

1. **Limited service coverage** — AI Impact Tracker focuses on ChatGPT/Claude/Gemini but misses Copilot, Midjourney, Stable Diffusion, Perplexity, etc.
2. **Crude estimation** — Using message length as a proxy for compute is very rough; doesn't account for model size, reasoning tokens, image generation, etc.
3. **No geographic awareness** — Don't factor in data center location, grid energy mix, or seasonal variation
4. **No broader water context** — Don't connect AI water use to household water, food water, etc. for full picture
5. **No macOS native app** — All browser-only; no always-on system-level tracking
6. **No API/developer tool** — No way to integrate water tracking into CI/CD, ML pipelines, etc.
7. **No historical data/trends** — Limited long-term tracking and analysis
8. **Chrome-only or Firefox-only** — Not cross-browser

**Our opportunity is to build something more comprehensive, scientifically rigorous, and multi-platform.**

---

## 4. macOS Menu Bar Apps (Architecture Inspiration)

### 4.1 exelban/stats

- **GitHub:** https://github.com/exelban/stats
- **Stars:** ~25k
- **Language:** Swift
- **License:** MIT
- **Architecture:**
  - Pure Swift, no external dependencies
  - Uses macOS system APIs: `IOKit`, `SystemConfiguration`, `SMC` (System Management Controller)
  - Modular: each sensor type (CPU, GPU, RAM, Disk, Network, Battery) is a separate module
  - Menu bar shows real-time mini-graphs
  - Click to expand detailed view
  - Very low resource usage

**Relevance to our project:**
- Good model for displaying real-time tracking data in menu bar
- Could show: water consumed today, running total, per-app breakdown
- Challenge: Stats reads local hardware sensors. Our app would need to *estimate* based on network activity to AI services, not read hardware directly.

### 4.2 Other Menu Bar Apps for Reference

| App | Focus | Architecture Notes |
|-----|-------|-------------------|
| **iStat Menus** | System monitoring | Commercial, very polished UI, good design reference |
| **MenuMeters** | CPU/Memory/Network | Open source, simpler than Stats |
| **Hand Mirror** | Camera check | Example of minimal menu bar app |
| **Lungo** | Prevent sleep | Example of simple toggle menu bar app |

### 4.3 Menu Bar App Technical Approach

A macOS menu bar app for water tracking could:
1. **Monitor network traffic** to known AI service domains (api.openai.com, claude.ai, etc.)
2. **Classify request types** (chat query, image generation, code completion)
3. **Estimate compute** based on request type and model
4. **Calculate water** using energy × (grid water intensity + WUE)
5. **Display** in menu bar with running total and breakdown

**Challenges:**
- Network monitoring requires elevated permissions or a VPN/proxy approach
- Can't measure actual server-side compute from client side
- Would need to maintain a database of AI service endpoints
- Estimations would be rough by nature

---

## 5. APIs & Data Sources

### 5.1 Energy/Grid Data (Foundation for Water Estimates)

| API/Source | What | Free? | URL |
|-----------|------|-------|-----|
| **Electricity Maps** | Real-time grid carbon intensity by region | Freemium (limited free tier) | electricitymap.org |
| **WattTime** | Marginal emissions rate by grid region | Free for research | watttime.org |
| **EPA eGRID** | US power plant emissions and generation data | Free | epa.gov/egrid |
| **EIA Open Data** | US energy generation, consumption, fuel mix | Free API | api.eia.gov |
| **ENTSO-E** | European grid data | Free with registration | transparency.entsoe.eu |

### 5.2 Water-Specific Data Sources

| Source | What | Access | Notes |
|--------|------|--------|-------|
| **USGS Water Use Data** | US water withdrawal by sector, state, facility | Free | 5-year reports, not real-time |
| **Aqueduct Water Risk Atlas** (WRI) | Global water stress by basin | Free | wri.org/aqueduct — good for understanding regional water stress |
| **CDP Water Disclosures** | Corporate water reporting | Partial free | Companies self-report water data to CDP |
| **Water Footprint Network Data** | Water footprint of products/processes | Free | Academic reference data |
| **DOE Data Center Water Data** | US data center water benchmarks | Free | Via Lawrence Berkeley National Lab |

### 5.3 Cloud Provider Data

| Provider | Sustainability Data Available | Water Data Quality |
|----------|------------------------------|-------------------|
| **Google Cloud** | Region-level carbon data, sustainability reports | Some WUE data published, not API-accessible |
| **Azure** | Sustainability calculator, emissions data | Limited water data, some in sustainability reports |
| **AWS** | Customer Carbon Footprint Tool | Minimal water data publicly available |
| **Oracle Cloud** | Some sustainability reporting | Limited |

### 5.4 Key Missing API: Water Intensity per kWh by Grid Region

**The single biggest data gap** for building this tool is a real-time API that provides water consumption intensity (liters/kWh) by electricity grid region, accounting for the current generation mix.

Electricity Maps provides *carbon* intensity by region. A similar service for *water* intensity doesn't exist yet. This could be derived by:
1. Getting the generation mix by region (from EIA, ENTSO-E, etc.)
2. Applying water intensity factors per generation type (from NREL/DOE data)
3. Summing to get aggregate water intensity

This derivation could be a core component of our tool.

---

## 6. Open Source Projects of Note

### 6.1 Directly Relevant

| Project | Description | Stars | Language |
|---------|-------------|-------|----------|
| **Boavizta API** | Environmental impact of ICT, includes some water | ~200 | Python |
| **Cloud Carbon Footprint** (Thoughtworks) | Multi-cloud carbon estimation | ~1k | TypeScript |
| **Scaphandre** | Energy consumption metrology agent | ~1.5k | Rust |
| **Green Metrics Tool** (Green Software Foundation) | Measure software carbon footprint | ~200 | Python |

### 6.2 Architecture References

| Project | Why Relevant |
|---------|-------------|
| **exelban/stats** | Menu bar app architecture in Swift |
| **nicklockwood/iVersion** | Example of checking external data from menu bar |
| **nicehash/NiceHashQuickMiner** | Monitors GPU usage, network calls — similar pattern to what we'd need |

---

## 7. Key Takeaways for Our Project

### 7.1 The Opportunity

**Basic AI water tracking extensions already exist** (AI Impact Tracker, DropSense), but they are early-stage, limited in scope, and use crude estimation methods. The opportunity is to build something **more scientifically rigorous, comprehensive, and multi-platform.**

### 7.2 What's Feasible Today

1. **Estimation-based tracking** — We can estimate water per AI query using published research (Li et al. figures) combined with grid energy data and WUE benchmarks
2. **Per-service tracking** — Different AI services (ChatGPT, Claude, Gemini, etc.) can be tracked separately
3. **Chrome extension is more feasible than menu bar app** — Can intercept/observe requests to AI services without network-level monitoring
4. **Comparison engine** — "Your AI usage today = X toilet flushes" makes the data tangible

### 7.3 What's Hard

1. **Precision** — All numbers will be estimates with significant uncertainty
2. **Server-side compute is opaque** — We can't know exactly how much GPU time a query consumed
3. **Real-time water data doesn't exist** — No API provides water intensity per grid region in real-time
4. **Provider-specific data is limited** — We don't know which data center served a specific request

### 7.4 Recommended Approach

1. **Start with a Chrome extension** — Lower barrier, can detect AI service usage directly
2. **Use conservative, research-backed estimates** — Based on Li et al. and published WUE data
3. **Be transparent about uncertainty** — Show ranges, not false precision
4. **Consider also building a CLI tool or API** — For developers who want to track their AI usage programmatically
5. **Eventually, consider a menu bar companion** — For always-on tracking across all apps (not just browser)
