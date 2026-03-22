# Training vs Inference & How to Measure Usage

*Compiled: March 15, 2026 | Supplemented with live web research*

---

## 1. Training vs Inference: Two Very Different Water Costs

### The Analogy

Think of it like a car:
- **Training** = manufacturing the car in a factory (massive one-time cost)
- **Inference** = driving the car (ongoing per-use cost)

When Mara uses ChatGPT, she's "driving" — that's inference. But the model was "manufactured" (trained) at enormous cost before she ever touched it. The question: should her water tracker show both?

### The Numbers

| Activity | Water Estimate | Type | Notes |
|----------|---------------|------|-------|
| Training GPT-3 (175B params) | 700K liters (direct cooling) | One-time | Li et al. 2023 |
| Training GPT-3 (full lifecycle) | 5.4 million liters | One-time | Li et al. 2025 revision |
| Training GPT-4 (est.) | 2-10 million liters | One-time | Community estimates |
| Training Llama 2 70B | ~300K-500K liters | One-time | Estimated |
| **All inference globally (ongoing)** | **90%+ of total energy/water** | Continuous | Industry reports |

### The Critical Insight: Inference Dominates

> "Industry reports show that inference, not training, accounts for more than 90% of total power consumption." — [CloudZero](https://www.cloudzero.com/blog/inference-cost/)

This is counterintuitive. Training gets the headlines ("GPT-3 used 700,000 liters!"), but ChatGPT answering billions of queries per day dwarfs that training cost. Training happens once (or periodically); inference happens every single second.

### How to Think About Training Water: Amortization

Training water is like the "embodied water" in a product. Just as a cotton t-shirt's 2,700L of water is spread across its useful life, training water gets amortized across all queries the model ever serves.

**Example amortization:**

```
GPT-3 training water: 5,400,000 liters (full lifecycle)
Estimated total queries served over model lifetime: ~100 billion+ (conservative)

Amortized training water per query: 5,400,000 / 100,000,000,000 = 0.000054 liters
                                   = 0.054 ml per query
                                   = essentially zero
```

Even with generous assumptions (fewer total queries, higher training cost), amortized training water per query is **<1 ml** — negligible compared to the 10-50 ml of inference water per query.

### Recommendation for the Tool

| Component | Show in tool? | How? |
|-----------|--------------|------|
| **Inference water** (per-query) | **Yes — primary metric** | Calculated from tokens × energy × water intensity |
| **Amortized training water** | **Yes — as a small add-on** | Shown as a line item, but clearly tiny |
| **Total training water** | **Yes — as educational context** | "This model cost X liters to train, shared across all users" |

**Why show training at all if it's negligible per-query?** Because Mara has heard the scary training numbers. The tool should acknowledge them, show the amortization math, and let her see that her share is essentially zero. Hiding it would feel dishonest. Showing it in context is empowering.

---

## 2. How to Measure Usage: Tokens Are the Key

### What Is a Token?

A token is the fundamental unit LLMs process. Roughly:
- **1 token ≈ 4 characters ≈ 0.75 words** (English)
- "Hello, how are you?" = ~6 tokens
- A typical ChatGPT question = ~50-200 tokens
- A typical ChatGPT answer = ~200-1,000 tokens
- A long conversation = ~5,000-50,000 tokens total

### Why Tokens Matter for Water

The chain from usage to water:

```
Tokens generated → Compute (FLOPs) → Energy (kWh) → Water (liters)
```

Each step:

1. **Tokens → Compute:** Each token requires ~2 × [active parameters] FLOPs to generate. A 70B model needs ~140 billion FLOPs per token. Larger models = more compute per token.

2. **Compute → Energy:** Depends on hardware efficiency. Modern GPUs (H100) are much more efficient than older ones.

3. **Energy → Water:** Our existing formula: `Energy × PUE × (WUE + WI_grid)`

### Per-Token Energy: What the Research Says

Recent benchmarks give us actual measurements:

| Model/Size | Energy per Token | Source |
|-----------|-----------------|--------|
| Llama-3.3-70B (H100, FP8) | ~0.39 joules/token | [TokenPowerBench, Dec 2025](https://arxiv.org/html/2512.03024v1) |
| LLaMA-65B (older hardware) | ~3-4 joules/token | Earlier benchmarks |
| GPT-4o (estimated, short query) | ~0.42 Wh/query (~0.00042 kWh) | [Epoch AI](https://epoch.ai/gradient-updates/how-much-energy-does-chatgpt-use) |
| GPT-4.1 nano (long prompt ~8K words) | 0.000454 kWh/query | [Academic study, 2025](https://arxiv.org/html/2505.09598v5) |
| o3 reasoning model (long prompt) | 0.0039 kWh/query | Same study |
| GPT-4.5 (long prompt) | 0.030 kWh/query | Same study — **70x more than nano!** |

### Key Insight: Model Size Matters Enormously

The difference between a small model and a large one is **not 2x — it's 70x or more:**

| Model Tier | Approx Energy/Query | Water/Query (avg conditions) | Example |
|-----------|--------------------|-----------------------------|---------|
| Small/fast (GPT-4o mini, Haiku) | 0.0003-0.001 kWh | 1-3 ml | Quick questions |
| Medium (GPT-4o, Claude Sonnet) | 0.001-0.005 kWh | 3-15 ml | Normal conversations |
| Large (GPT-4.5, Claude Opus) | 0.01-0.03 kWh | 25-80 ml | Complex reasoning |
| Reasoning (o3, deep thinking) | 0.003-0.01 kWh | 8-25 ml | Chain-of-thought tasks |
| Image generation (DALL-E 3, Midjourney) | 0.01-0.05 kWh | 25-130 ml | Per image |
| Video generation (Sora, etc.) | 0.1-1.0+ kWh | 250-2,500+ ml | Per short clip |

**This is important for Mara:** if she uses a fast/small model for simple questions, her water footprint is dramatically lower than using the largest model for everything.

---

## 3. How to Measure Tokens From the Browser

### The Measurement Challenge

We're on the **client side** (browser) trying to estimate **server-side** compute. We can't directly measure GPU usage. But we can count tokens.

### Approach 1: Count Tokens Directly (Best)

Several services expose or allow estimation of token counts:

| Service | Token Visibility | How to Get It |
|---------|-----------------|---------------|
| **ChatGPT** | Not shown in UI by default | Existing Chrome extensions count them (TokenScope, ChatGPT Token Counter). Use tiktoken tokenizer. |
| **Claude** | Not shown in UI | Can estimate from character count using Claude's tokenizer |
| **Gemini** | Not shown in UI | Estimate from text length |
| **API usage** (all providers) | **Exact token counts returned** | API responses include `usage.prompt_tokens` + `usage.completion_tokens` |
| **Copilot** | Not visible | Estimate from code suggestion length |
| **Perplexity** | Not shown | Estimate from response length |

### Approach 2: Estimate Tokens From Text Length (Fallback)

When exact tokens aren't available:

```
Estimated tokens ≈ character_count / 4     (English)
Estimated tokens ≈ word_count × 1.33       (English)
```

This is a rough heuristic but consistent enough for water estimation (we're already dealing with uncertainty ranges).

### Approach 3: Intercept API Responses (Advanced)

For users who interact via API (developers), the response JSON includes exact token counts. A browser extension or proxy could read these.

### What Existing Token Counter Extensions Do

There are already Chrome/Firefox extensions that count ChatGPT tokens:
- **[ChatGPT Token Counter](https://chromewebstore.google.com/detail/chatgpt-token-counter/fjmnelakmikojjladjfdhdlfpanhcban)** — uses OpenAI's tokenizer
- **[TokenScope](https://chromewebstore.google.com/detail/tokenscope-chatgpt-token/jmamemehccobdhelfbfkghbcjomceiha)** — auto-detects model, adjusts tokenizer

We could either build on this approach or integrate with these extensions.

### What We Need to Detect Per Interaction

| Data Point | How to Get It | Why It Matters |
|-----------|---------------|----------------|
| **Which service** (ChatGPT, Claude, etc.) | URL matching (chat.openai.com, claude.ai, etc.) | Different infrastructure = different water |
| **Which model** | DOM scraping (model selector in UI) | GPT-4.5 uses 70x more energy than GPT-4o mini |
| **Input tokens** | Text length of user message → tokenizer estimate | Input is processed but cheaper than output |
| **Output tokens** | Text length of AI response → tokenizer estimate | Output generation is the expensive part |
| **Interaction type** | Classify: text chat, image gen, code, etc. | Image/video gen uses dramatically more |
| **Reasoning tokens** (if applicable) | Detect if reasoning model (o3, extended thinking) | Reasoning = many hidden tokens |

### The Reasoning Token Problem

Modern reasoning models (o3, Claude with extended thinking) generate thousands of "thinking" tokens that the user never sees. These consume real compute and real water but are invisible in the UI.

| Scenario | Visible Tokens | Actual Tokens (with reasoning) | Multiplier |
|----------|---------------|-------------------------------|------------|
| Simple GPT-4o query | 500 | 500 | 1x |
| o3 reasoning query | 500 visible | 5,000-50,000 total | 10-100x |
| Claude extended thinking | 500 visible | 2,000-20,000 total | 4-40x |

**This is a significant measurement challenge.** We can't see reasoning tokens from the browser. Options:
1. Apply a multiplier when reasoning model is detected (rough but honest about uncertainty)
2. Note "actual water may be higher due to hidden reasoning" with a range
3. Monitor response latency as a proxy (longer response time ≈ more compute)

---

## 4. Proposed Measurement Architecture

### Token-Based Water Estimation Formula

```
Water (liters) = Total_Tokens × Energy_Per_Token × PUE × (WUE + WI_grid)
```

With model-specific energy per token:

```
Water = (Input_Tokens × E_input + Output_Tokens × E_output) × PUE × (WUE + WI_grid)
```

Note: Input tokens are cheaper (parallel processing) while output tokens are expensive (sequential generation). Ratio is roughly:
- E_input ≈ 0.1-0.3 × E_output (for large models)
- For simplicity in v1, we could use a blended rate per token

### Model Profiles (Configurable Database)

```json
{
  "gpt-4o": {
    "provider": "openai",
    "energy_per_output_token_joules": 0.005,
    "energy_per_input_token_joules": 0.001,
    "reasoning_multiplier": 1.0,
    "category": "medium"
  },
  "gpt-4.5": {
    "provider": "openai",
    "energy_per_output_token_joules": 0.05,
    "energy_per_input_token_joules": 0.01,
    "reasoning_multiplier": 1.0,
    "category": "large"
  },
  "o3": {
    "provider": "openai",
    "energy_per_output_token_joules": 0.005,
    "energy_per_input_token_joules": 0.001,
    "reasoning_multiplier": 15.0,
    "category": "reasoning"
  },
  "claude-sonnet": {
    "provider": "anthropic",
    "energy_per_output_token_joules": 0.005,
    "energy_per_input_token_joules": 0.001,
    "reasoning_multiplier": 1.0,
    "category": "medium"
  },
  "claude-opus": {
    "provider": "anthropic",
    "energy_per_output_token_joules": 0.03,
    "energy_per_input_token_joules": 0.006,
    "reasoning_multiplier": 1.0,
    "category": "large"
  }
}
```

These values are **estimates** based on published benchmarks and would be updated as better data becomes available. The tool should make clear these are approximations.

### Measurement Pipeline

```
Browser detects AI service interaction
  ↓
Content script extracts:
  - Service (URL matching)
  - Model (DOM scraping)
  - Input text (user message)
  - Output text (AI response)
  ↓
Tokenizer estimates token counts
  (tiktoken for OpenAI, Claude tokenizer for Anthropic, etc.)
  ↓
Lookup model profile → energy per token
  ↓
Apply reasoning multiplier if applicable
  ↓
Calculate: tokens × energy × PUE × (WUE + WI_grid)
  ↓
Store in local IndexedDB with timestamp
  ↓
Display in dashboard with:
  - Point estimate (best guess)
  - Uncertainty range (min-max)
  - Comparison basket items
```

---

## 5. Accuracy & Honesty

### What We Can Measure Well
- Which service and model (from URL + UI scraping)
- Approximate token count (from text length)
- Relative differences between models/query types

### What We're Estimating
- Energy per token (based on published benchmarks, not actual server data)
- Data center location and WUE (using provider defaults)
- Grid energy mix and water intensity (using regional averages)
- Reasoning tokens (hidden, multiplier-based guess)

### Honest Uncertainty Ranges

For any given query, our estimate might be off by **2-5x** in either direction. The tool should always show:

```
Estimated water: ~25 ml (range: 8-80 ml)

Why the range?
• We don't know which data center served you
• We don't know the exact energy per token for this model
• Water intensity varies by season, time of day, and cooling tech
```

This honesty IS the product differentiator. Competitors show false precision. We show honest ranges.

---

## Sources

- [How Hungry is AI? Benchmarking Energy, Water, and Carbon Footprint of LLM Inference (2025)](https://arxiv.org/html/2505.09598v5)
- [TokenPowerBench: Benchmarking Power Consumption of LLM Inference (Dec 2025)](https://arxiv.org/html/2512.03024v1)
- [Epoch AI: How Much Energy Does ChatGPT Use?](https://epoch.ai/gradient-updates/how-much-energy-does-chatgpt-use)
- [Per-Query Energy Consumption of LLMs — Muxup (2026)](https://muxup.com/2026q1/per-query-energy-consumption-of-llms)
- [CloudZero: Guide to Inference Cost](https://www.cloudzero.com/blog/inference-cost/)
- [LLM Tracker: Power Usage and Energy Efficiency](https://llm-tracker.info/_TOORG/Power-Usage-and-Energy-Efficiency)
- [ChatGPT Token Counter Extension](https://chromewebstore.google.com/detail/chatgpt-token-counter/fjmnelakmikojjladjfdhdlfpanhcban)
- [TokenScope Extension](https://chromewebstore.google.com/detail/tokenscope-chatgpt-token/jmamemehccobdhelfbfkghbcjomceiha)
