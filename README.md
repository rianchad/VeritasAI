# VeritasAI

A Chrome extension that fact-checks the news article you're reading — in real time, without telling you what to think.

![VeritasAI sidebar showing fact-check results](landing/images/screenshot1_new.png)

---

**[Try it on the Chrome Web Store](https://chromewebstore.google.com/detail/veritasai/meihgjpilbhddfjoloampanbgmbmmnjj)**

---

## Features

### Claim Extraction

VeritasAI reads the article text and pulls out 5-8 discrete, checkable factual claims — statistics, attributed quotes, stated events, specific numbers. It skips vague assertions and opinion language. "The unemployment rate rose to 4.2% in September" is a claim. "Republicans have failed to address the crisis" is not.

Before extraction runs, the article gets classified as News, Opinion/Editorial, or Analysis/Commentary. Opinion and analysis pieces get a banner at the top of the sidebar so you know what you're reading before the claims load.

### Per-Claim Verification

Each claim runs through an agentic verification loop backed by live Brave Search results. The agent decides what to search for, reads the results, and decides whether it has enough evidence or needs to refine the query and search again. It loops up to 3 times per claim.

Confidence levels come out as High, Medium, or Low, each with a one-sentence rationale:

- **High** — 3 or more independent sources confirm the claim, or a primary source directly confirms it with no credible contradictions
- **Medium** — partial support, indirect evidence, mixed signals, or one credible contradiction in the results
- **Low** — no sources confirm the claim, active contradictions found, or search results don't address it at all

Claims that return zero supporting sources and zero primary sources get a distinct "No sources found" badge rather than a plain Low confidence label. The tooltip reads: "This claim may be unverifiable or newly reported."

### Primary Source Priority

Government data, AP and Reuters wire dispatches, academic studies, court records, WHO, UN, World Bank reports, and SEC filings are identified and surfaced separately from media coverage. They appear in their own section on each claim card, above the list of news sources.

Media outlets — even highly reputable ones — are never categorized as primary sources. A Reuters article about a BLS report and the BLS report itself are different things, and the sidebar treats them differently.

### Political Lean Labels

Every source card shows the outlet's political lean: Left, Lean Left, Center, Lean Right, or Right. Ratings come from Ad Fontes Media and AllSides public data, covering 100+ outlets.

The labels aren't there to editorialize. They're there so you can see whether support for a claim comes from across the spectrum or from one side of it. A claim confirmed by outlets across the full lean range reads differently than one where all the supporting sources share the same label.

### Divergence Analysis

A second agent runs in parallel with the verification agent for each claim. It finds how outlets with different political leans cover the same underlying fact and extracts their specific framing. The output isn't "they disagree" — it's "CNN says X, Fox says Y, primary BLS data says Z."

Outlet positions are listed individually when notable divergence exists. When outlets are citing the same underlying statistic and framing it in meaningfully different directions, that shows up clearly.

### Bias Blindspot Detection

After sources get lean-labeled, each claim card checks whether all the supporting sources share the same political lean. If 3 or more supporting sources are all Left/Lean Left, or all Right/Lean Right, a warning surfaces on the card: "Warning: all supporting sources are [Left/Right]-leaning — no opposing perspective found."

The 3-source threshold prevents false positives on claims that only returned one or two results. Center and Unrated sources are excluded from the check — a claim supported entirely by center-rated outlets won't trigger it.

### Volatility Classification

Before fact-checking starts, the article headline and opening paragraphs get classified as Breaking, Developing, or Stable.

Breaking and Developing stories show a banner at the top of the sidebar. Sources older than 12 hours in a breaking story trigger a confidence downgrade — one notch down from whatever the agent scored — with an explanation added to the rationale. Sources older than 24 hours in a breaking or developing story are visually muted on the card so stale sources are distinguishable at a glance.

Every source card shows a relative timestamp (5 hours ago, 2 days ago) pulled from the search API. When publication dates aren't available, recency adjustments are skipped entirely — unknown freshness is never penalized.

### Text Selection Fact-Checking

Highlight any sentence in the article and a popup appears in the sidebar offering to fact-check that specific text. The selected claim runs through the same verification pipeline in isolation and gets inserted at the top of the claims list. The article's current volatility classification applies automatically.

### Claim Highlighting

Hover over any claim card in the sidebar and the matching paragraph in the article highlights on the page. It uses keyword-overlap scoring to find the best-matching paragraph and scrolls it into view if needed.

### Article Credibility Score

After the first claim resolves, a live credibility bar appears at the top of the results panel. It updates in real time as each claim streams in — not after all claims finish. The formula: High = 1.0, Medium = 0.5, Low = 0.0, averaged across all resolved claims, shown as a percentage bar with a color-coded fill. Green at 75%+, yellow at 40%+, orange below that.

Summary text shows how many claims have resolved so far (e.g., "3 of 7 claims resolved · 67% avg confidence") and finalizes when everything is done. Claims that error out are excluded from the average.

### Streaming Results

Claims stream into the sidebar as each one finishes. The first result appears within a few seconds of opening the sidebar. A progress bar tracks how many claims have been checked. The sidebar moves through Idle, Loading, Streaming, and Done states with clear messaging at each step.

### Shareable Fact-Check Links

After analysis completes, a "Copy share link" button appears at the bottom of the results panel. Clicking it generates a unique link to a read-only fact-check page — no extension required to view it. The page shows the credibility score, all claim cards with confidence badges, source lists, bias blindspot warnings, and divergence summaries.

Links expire after 7 days. Expired links return a clear expiration page rather than a silent 404.

### Edge Case Handling

- **Paywalled articles** — fact-checks the visible text only; no errors thrown on partial content
- **Opinion and editorial pieces** — flagged prominently at the top of the sidebar; the rationale notes when a claim reflects the author's argument rather than an established fact
- **Contradictions** — time zone differences, unit differences, and rounding differences are not treated as contradictions
- **Empty search results** — returns Low confidence with a citation_needed flag rather than silently failing

---

## How It Works

VeritasAI runs an agentic pipeline on a Node.js/Express backend. Two agents run concurrently per claim over Server-Sent Events: a verification agent that loops through Brave Search queries until it finds sufficient evidence, and a divergence agent that fetches coverage from outlets across the political lean spectrum and extracts their specific framing. Results stream back to the sidebar as each claim resolves.

The no-verdict design is intentional. Hard TRUE/FALSE labels on politically sensitive claims create liability and put the tool in the position of arbiter. Confidence levels plus cited sources puts the reader in that position instead, which is where it belongs.

```mermaid
flowchart LR
    classDef ext fill:#7c3aed,stroke:#a78bfa,color:#fff
    classDef srv fill:#0f766e,stroke:#5eead4,color:#fff
    classDef api fill:#b45309,stroke:#fcd34d,color:#fff

    subgraph chrome["🧩 Chrome Extension"]
        direction TB
        content(["content.js\nextract article"]):::ext
        sidebar(["sidebar.js\nrender results"]):::ext
    end

    subgraph backend["⚙️ Express Backend"]
        direction TB
        vol(["① Volatility\nClassifier"]):::srv
        ext(["② Claim\nExtractor"]):::srv

        subgraph par["③ Per Claim — Parallel"]
            direction LR
            verify(["Verification\nAgent"]):::srv
            diverge(["Divergence\nAgent"]):::srv
        end

        sse(["SSE\nStream"]):::srv
    end

    subgraph apis["🌐 External APIs"]
        direction TB
        claude[["Claude API"]]:::api
        brave[["Brave Search"]]:::api
    end

    content -->|article text| sidebar
    sidebar -->|POST /api/analyze| vol
    vol --> ext
    ext --> verify
    ext --> diverge
    verify --> sse
    diverge --> sse
    sse -->|streams claim results| sidebar

    backend -->|AI inference| claude
    backend -->|web search| brave
```

---

## Credits

- AI: [Anthropic Claude](https://anthropic.com) (`claude-sonnet-4-20250514`)
- Web search: [Brave Search API](https://brave.com/search/api/)
- Source bias ratings: [Ad Fontes Media](https://adfontesmedia.com) and [AllSides](https://allsides.com)
