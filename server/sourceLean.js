// Static outlet → political-lean lookup, derived from AllSides / Ad Fontes
// public ratings. Used to label sources so the sidebar can show spectrum
// diversity. Outlets not in this table fall back to "Unrated".

const LEAN_BY_DOMAIN = {
  // Wire services
  "apnews.com": "Center",
  "reuters.com": "Center",
  "afp.com": "Center",
  "upi.com": "Center",

  // Broadcast / radio
  "abcnews.go.com": "Lean Left",
  "cbsnews.com": "Lean Left",
  "nbcnews.com": "Lean Left",
  "today.com": "Lean Left",
  "cnn.com": "Lean Left",
  "msnbc.com": "Left",
  "foxnews.com": "Right",
  "foxbusiness.com": "Lean Right",
  "oann.com": "Right",
  "newsmax.com": "Right",
  "pbs.org": "Center",
  "npr.org": "Lean Left",
  "cspan.org": "Center",
  "bbc.com": "Center",
  "bbc.co.uk": "Center",
  "sky.com": "Center",
  "aljazeera.com": "Lean Left",
  "dw.com": "Center",

  // Major national print / digital
  "nytimes.com": "Lean Left",
  "washingtonpost.com": "Lean Left",
  "wsj.com": "Lean Right",
  "usatoday.com": "Center",
  "nypost.com": "Lean Right",
  "washingtontimes.com": "Lean Right",

  // Digital-native news
  "axios.com": "Center",
  "thehill.com": "Center",
  "politico.com": "Lean Left",
  "bloomberg.com": "Lean Left",
  "time.com": "Lean Left",
  "newsweek.com": "Center",
  "businessinsider.com": "Lean Left",
  "cnbc.com": "Center",
  "marketwatch.com": "Center",
  "realclearpolitics.com": "Lean Right",

  // Center / investigative
  "propublica.org": "Center",
  "csmonitor.com": "Center",
  "economist.com": "Center",
  "ft.com": "Center",
  "militarytimes.com": "Center",
  "stateline.org": "Center",

  // Lean Left
  "theguardian.com": "Lean Left",
  "theatlantic.com": "Lean Left",
  "newyorker.com": "Lean Left",
  "latimes.com": "Lean Left",
  "slate.com": "Lean Left",
  "vice.com": "Lean Left",
  "buzzfeednews.com": "Lean Left",
  "rollingstone.com": "Lean Left",
  "vanityfair.com": "Lean Left",
  "wired.com": "Lean Left",
  "huffpost.com": "Left",
  "miamiherald.com": "Lean Left",
  "bostonglobe.com": "Lean Left",
  "seattletimes.com": "Lean Left",
  "startribune.com": "Lean Left",
  "baltimoresun.com": "Lean Left",
  "sfgate.com": "Lean Left",
  "oregonlive.com": "Lean Left",
  "tampabay.com": "Center",
  "dallasnews.com": "Center",
  "chicagotribune.com": "Center",
  "denverpost.com": "Center",

  // Left
  "vox.com": "Left",
  "salon.com": "Left",
  "motherjones.com": "Left",
  "thenation.com": "Left",
  "theintercept.com": "Left",
  "dailykos.com": "Left",
  "commondreams.org": "Left",
  "truthout.org": "Left",
  "democracynow.org": "Left",
  "jacobinmag.com": "Left",
  "alternet.org": "Left",

  // Lean Right
  "nationalreview.com": "Lean Right",
  "forbes.com": "Lean Right",
  "washingtonexaminer.com": "Lean Right",
  "reason.com": "Lean Right",
  "thedispatch.com": "Lean Right",
  "spectator.org": "Lean Right",
  "americanthinker.com": "Lean Right",
  "hotair.com": "Lean Right",
  "pjmedia.com": "Lean Right",
  "theepochtimes.com": "Lean Right",

  // Right
  "breitbart.com": "Right",
  "dailywire.com": "Right",
  "thefederalist.com": "Right",
  "townhall.com": "Right",
  "redstate.com": "Right",
  "westernjournal.com": "Right",
  "gatewaypundit.com": "Right",
  "wnd.com": "Right",
  "twitchy.com": "Right",

  // Sports (lean labels reflect political bias in non-sports coverage; sports
  // outlets are rated Center as they have no meaningful political lean)
  "espn.com": "Center",
  "nba.com": "Center",
  "nfl.com": "Center",
  "mlb.com": "Center",
  "nhl.com": "Center",
  "sports.yahoo.com": "Center",
  "sportingnews.com": "Center",
  "bleacherreport.com": "Center",
  "theathletic.com": "Lean Left",
  "cbssports.com": "Center",
  "nbcsports.com": "Center",
  "foxsports.com": "Center",
  "si.com": "Center",
  "mysanantonio.com": "Center",
  "statesman.com": "Center",
  "expressnews.com": "Center",

  // International
  "spiegel.de": "Lean Left",
  "lemonde.fr": "Lean Left",
  "telegraph.co.uk": "Lean Right",
  "dailymail.co.uk": "Right",
  "independent.co.uk": "Lean Left",
  "thesun.co.uk": "Right",
};

// Domains that count as primary sources: government data, official wire
// services (origin of record for breaking news), and authoritative
// intergovernmental bodies. Media outlets — even reliable ones — do not
// qualify regardless of reputation.
const PRIMARY_SOURCE_DOMAINS = [
  // Wire services (origin-of-record for news)
  "apnews.com",
  "reuters.com",
  // US government
  ".gov",
  // Academic / research
  ".edu",
  // Intergovernmental bodies
  "who.int",
  "un.org",
  "worldbank.org",
  "imf.org",
  "icrc.org",
  // Legal / regulatory primary documents
  "courtlistener.com",
  "congress.gov",
  "supremecourt.gov",
  "federalregister.gov",
  "sec.gov",
  // Official statistical agencies (also covered by .gov, belt+suspenders)
  "census.gov",
  "bls.gov",
  "cdc.gov",
  "nih.gov",
];

/**
 * Extracts the hostname from a URL, stripping the leading "www." if present.
 * @param {string} url - Absolute URL string.
 * @returns {string} Normalized hostname, or empty string if the URL is invalid.
 */
function getDomain(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

/**
 * Returns the political lean label for the outlet at the given URL.
 * @param {string} url - Absolute URL of a source.
 * @returns {string} Lean label (e.g. "Center", "Lean Left") or "Unrated" if unknown.
 */
function getLean(url) {
  const domain = getDomain(url);
  return LEAN_BY_DOMAIN[domain] || "Unrated";
}

/**
 * Collapses a fine-grained lean label ("Lean Left", "Left", etc.) into a
 * coarse Left/Center/Right bucket, useful for spectrum-diversity scoring
 * where "Lean Left" and "Left" should count as the same side.
 * @param {string} url - Absolute URL of a source.
 * @returns {"Left"|"Center"|"Right"|"Unrated"} Coarse lean bucket.
 */
function getLeanCategory(url) {
  const lean = getLean(url);
  if (lean.endsWith("Left")) return "Left";
  if (lean.endsWith("Right")) return "Right";
  if (lean === "Center") return "Center";
  return "Unrated";
}

/**
 * Returns true if the URL's domain qualifies as a primary source
 * (government, official wire dispatch, or academic institution).
 * @param {string} url - Absolute URL to check.
 * @returns {boolean}
 */
function isPrimarySource(url) {
  const domain = getDomain(url);
  return PRIMARY_SOURCE_DOMAINS.some((suffix) =>
    suffix.startsWith(".") ? domain.endsWith(suffix) : domain === suffix
  );
}

/**
 * Returns true if the URL's domain has a known lean rating, as opposed to
 * falling back to "Unrated". Useful for filtering spectrum-diversity scoring
 * to outlets we actually have data on.
 * @param {string} url - Absolute URL of a source.
 * @returns {boolean}
 */
function isRatedSource(url) {
  return getLean(url) !== "Unrated";
}

/**
 * Returns every domain in LEAN_BY_DOMAIN whose coarse lean category matches
 * the given bucket, e.g. for building a spectrum-diversity test fixture or
 * auditing how many outlets fall on each side. Mirrors the client-side
 * getOutletsByTier helper in sourceLean.js.
 * @param {"Left"|"Center"|"Right"} category - Coarse lean bucket to filter by.
 * @returns {string[]} Domains whose getLeanCategory matches.
 */
function getDomainsByLean(category) {
  return Object.keys(LEAN_BY_DOMAIN).filter((domain) => {
    const lean = LEAN_BY_DOMAIN[domain];
    if (category === "Left") return lean.endsWith("Left");
    if (category === "Right") return lean.endsWith("Right");
    if (category === "Center") return lean === "Center";
    return false;
  });
}

/**
 * Tallies how many of the given URLs fall into each coarse lean category.
 * Useful for building a spectrum-diversity summary (e.g. "3 Left, 2 Center,
 * 1 Right, 0 Unrated") across a set of sources cited in an article.
 * @param {string[]} urls - Absolute URLs of sources to tally.
 * @returns {{Left: number, Center: number, Right: number, Unrated: number}}
 *   Count of URLs in each category.
 */
function getLeanCounts(urls) {
  const counts = { Left: 0, Center: 0, Right: 0, Unrated: 0 };
  for (const url of urls) {
    counts[getLeanCategory(url)] += 1;
  }
  return counts;
}

/**
 * Computes a spectrum-diversity score in [0, 1] for a set of source URLs,
 * based on how evenly the rated sources are spread across Left/Center/Right.
 * A single-sided set of sources scores 0; a perfectly even three-way split
 * scores 1. Unrated sources are excluded from the calculation since they
 * carry no lean signal. Returns 0 if there are no rated sources.
 * @param {string[]} urls - Absolute URLs of sources to evaluate.
 * @returns {number} Diversity score between 0 (one-sided) and 1 (balanced).
 */
function getSpectrumDiversity(urls) {
  const counts = getLeanCounts(urls);
  const rated = counts.Left + counts.Center + counts.Right;
  if (rated === 0) return 0;

  // Normalized entropy across the three buckets: -sum(p*log(p)) / log(3).
  const buckets = [counts.Left, counts.Center, counts.Right];
  const entropy = buckets.reduce((sum, count) => {
    if (count === 0) return sum;
    const p = count / rated;
    return sum - p * Math.log(p);
  }, 0);
  return entropy / Math.log(3);
}

/**
 * Scores how balanced a list of source URLs is across the political
 * spectrum, based on getLeanCounts. A score of 1 means an even split between
 * rated Left/Center/Right sources; a score of 0 means all rated sources
 * share a single lean. Unrated sources are excluded since they carry no
 * lean information. Mirrors the client-side getBalanceScore in sourceLean.js.
 * @param {string[]} urls - Absolute URLs of sources to evaluate.
 * @returns {number} Balance score between 0 (one-sided) and 1 (evenly balanced).
 */
function getBalanceScore(urls) {
  const counts = getLeanCounts(urls);
  const rated = [counts.Left, counts.Center, counts.Right];
  const total = rated.reduce((sum, count) => sum + count, 0);
  if (total === 0) return 0;

  const proportions = rated.map((count) => count / total);
  const evenProportion = 1 / 3;
  const maxDeviation = (1 - evenProportion) * 2;
  const totalDeviation = proportions.reduce(
    (sum, p) => sum + Math.abs(p - evenProportion),
    0
  );
  return 1 - totalDeviation / maxDeviation;
}

/**
 * Determines which coarse lean category appears most often among a list of
 * source URLs, using getLeanCounts for the tally. Complements
 * getBalanceScore: where that returns "how skewed" a source list is, this
 * returns "skewed toward what" — useful for labeling a story's overall
 * slant (e.g. "Sources lean Left"). Mirrors the client-side getDominantLean.
 * @param {string[]} urls - Absolute URLs of sources to evaluate.
 * @returns {"Left"|"Center"|"Right"|"Unrated"|null} The most common
 *   category, or null if urls is empty. Ties between categories are broken
 *   in Left/Center/Right/Unrated order (the first-checked category wins).
 */
function getDominantLean(urls) {
  if (!Array.isArray(urls) || urls.length === 0) return null;

  const counts = getLeanCounts(urls);
  const order = ["Left", "Center", "Right", "Unrated"];
  let dominant = order[0];
  for (const category of order) {
    if (counts[category] > counts[dominant]) dominant = category;
  }
  return dominant;
}

/**
 * Returns the subset of source URLs whose domain has no entry in
 * LEAN_BY_DOMAIN, de-duplicated by domain. Mirrors the client-side
 * getUnratedOutlets helper in sourceLean.js; useful for spotting which
 * domains still need a lean rating added to LEAN_BY_DOMAIN.
 * @param {string[]} urls - Absolute URLs of sources to check.
 * @returns {string[]} Unique domains with no known lean rating, in the order
 *   they first appeared.
 */
function getUnratedDomains(urls) {
  if (!Array.isArray(urls)) return [];
  const seen = new Set();
  const unrated = [];
  for (const url of urls) {
    const domain = getDomain(url);
    if (!domain || seen.has(domain)) continue;
    seen.add(domain);
    if (!isRatedSource(url)) unrated.push(domain);
  }
  return unrated;
}

/**
 * Reports what fraction of a set of source URLs have a known lean rating,
 * complementing getUnratedDomains (which lists the gaps) with a single
 * number suitable for a "data coverage" indicator.
 * @param {string[]} urls - Absolute URLs of sources to check.
 * @returns {number} Fraction in [0, 1] of URLs with a known rating; 0 if
 *   urls is empty or not an array.
 */
function getRatingCoverage(urls) {
  if (!Array.isArray(urls) || urls.length === 0) return 0;
  const rated = urls.filter((url) => isRatedSource(url)).length;
  return rated / urls.length;
}

/**
 * Reports what fraction of a set of source URLs come from primary sources
 * (government, official wire dispatch, academic, or intergovernmental
 * domains), per isPrimarySource. Complements getRatingCoverage — that
 * measures how much of a source list has a lean rating, this measures how
 * much of it is primary-source material, useful for an "evidence quality"
 * indicator alongside the spectrum-diversity score.
 * @param {string[]} urls - Absolute URLs of sources to check.
 * @returns {number} Fraction in [0, 1] of URLs that are primary sources; 0 if
 *   urls is empty or not an array.
 */
function getPrimarySourceRatio(urls) {
  if (!Array.isArray(urls) || urls.length === 0) return 0;
  const primary = urls.filter((url) => isPrimarySource(url)).length;
  return primary / urls.length;
}

/**
 * Returns the subset of source URLs that qualify as primary sources, per
 * isPrimarySource, de-duplicated by domain. Complements
 * getPrimarySourceRatio (which gives a single coverage number) by listing
 * which specific domains contributed primary-source material, e.g. for
 * citing "this story draws on apnews.com and sec.gov directly".
 * @param {string[]} urls - Absolute URLs of sources to check.
 * @returns {string[]} Unique domains that are primary sources, in the order
 *   they first appeared.
 */
function getPrimarySourceDomains(urls) {
  if (!Array.isArray(urls)) return [];
  const seen = new Set();
  const primaryDomains = [];
  for (const url of urls) {
    const domain = getDomain(url);
    if (!domain || seen.has(domain)) continue;
    seen.add(domain);
    if (isPrimarySource(url)) primaryDomains.push(domain);
  }
  return primaryDomains;
}

/**
 * Builds a single combined report on a set of source URLs, bundling the
 * metrics most callers need together (lean counts, spectrum diversity,
 * balance score, dominant lean, rating coverage, and primary-source ratio)
 * so a caller doesn't have to invoke each helper separately and re-derive
 * the same domain lookups multiple times.
 * @param {string[]} urls - Absolute URLs of sources to evaluate.
 * @returns {{
 *   counts: {Left: number, Center: number, Right: number, Unrated: number},
 *   spectrumDiversity: number,
 *   balanceScore: number,
 *   dominantLean: "Left"|"Center"|"Right"|"Unrated"|null,
 *   ratingCoverage: number,
 *   primarySourceRatio: number,
 *   domainBreakdown: Array<{domain: string, lean: string, count: number, share: number}>,
 * }} Combined diversity/quality report for the given URLs.
 */
function getSourceDiversityReport(urls) {
  const safeUrls = Array.isArray(urls) ? urls : [];
  return {
    counts: getLeanCounts(safeUrls),
    spectrumDiversity: getSpectrumDiversity(safeUrls),
    balanceScore: getBalanceScore(safeUrls),
    dominantLean: getDominantLean(safeUrls),
    ratingCoverage: getRatingCoverage(safeUrls),
    primarySourceRatio: getPrimarySourceRatio(safeUrls),
    domainBreakdown: getDomainBreakdown(safeUrls),
  };
}

/**
 * Breaks a set of source URLs down by individual domain rather than coarse
 * lean category, tallying how many times each domain appears and what
 * fraction of the (deduplicated) total it represents. Complements
 * getLeanCounts: that groups by Left/Center/Right, this groups by the actual
 * outlet, which is useful for a "sources cited" UI panel that wants to show
 * e.g. "reuters.com (3x, 30%), nytimes.com (2x, 20%)" alongside the coarse
 * spectrum breakdown.
 * @param {string[]} urls - Absolute URLs of sources to tally.
 * @returns {Array<{domain: string, lean: string, count: number, share: number}>}
 *   One entry per distinct domain, sorted by count descending (ties broken by
 *   first appearance order). `share` is count / urls.length, in [0, 1].
 */
function getDomainBreakdown(urls) {
  if (!Array.isArray(urls) || urls.length === 0) return [];

  const order = [];
  const countByDomain = new Map();
  for (const url of urls) {
    const domain = getDomain(url);
    if (!domain) continue;
    if (!countByDomain.has(domain)) {
      countByDomain.set(domain, 0);
      order.push(domain);
    }
    countByDomain.set(domain, countByDomain.get(domain) + 1);
  }

  return order
    .map((domain) => ({
      domain,
      lean: LEAN_BY_DOMAIN[domain] || "Unrated",
      count: countByDomain.get(domain),
      share: countByDomain.get(domain) / urls.length,
    }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Returns the N most-cited domains from a set of source URLs, built on top
 * of getDomainBreakdown. Useful for a "top sources" UI panel that only wants
 * to surface the handful of outlets that dominate a story's citations rather
 * than the full per-domain breakdown.
 * @param {string[]} urls - Absolute URLs of sources to tally.
 * @param {number} [limit=3] - Maximum number of domains to return.
 * @returns {Array<{domain: string, lean: string, count: number, share: number}>}
 *   Up to `limit` entries from getDomainBreakdown, already sorted by count
 *   descending.
 */
function getTopDomains(urls, limit = 3) {
  if (!Number.isFinite(limit) || limit <= 0) return [];
  return getDomainBreakdown(urls).slice(0, limit);
}

/**
 * Builds a short, human-readable summary of a set of source URLs' political
 * balance, e.g. "Balanced across the spectrum (3 Left, 2 Center, 3 Right)" or
 * "Leans Left (4 Left, 1 Center, 0 Right)". Intended for a one-line label
 * next to the numeric getBalanceScore/getDominantLean values, so callers
 * don't have to hand-roll the same phrasing in multiple places.
 * @param {string[]} urls - Absolute URLs of sources to evaluate.
 * @param {number} [balancedThreshold=0.85] - Minimum getBalanceScore for the
 *   summary to read as "Balanced" rather than "Leans <category>".
 * @returns {string} Human-readable balance summary. Returns "No rated
 *   sources" if there are no Left/Center/Right sources to evaluate.
 */
function getLeanSummary(urls, balancedThreshold = 0.85) {
  const counts = getLeanCounts(Array.isArray(urls) ? urls : []);
  const rated = counts.Left + counts.Center + counts.Right;
  const tally = `${counts.Left} Left, ${counts.Center} Center, ${counts.Right} Right`;

  if (rated === 0) return "No rated sources";

  const balanceScore = getBalanceScore(urls);
  if (balanceScore >= balancedThreshold) {
    return `Balanced across the spectrum (${tally})`;
  }

  const dominant = getDominantLean(urls);
  return `Leans ${dominant} (${tally})`;
}

/**
 * Computes a single composite "source quality" score in [0, 1] for a set of
 * source URLs, blending three signals that each capture a different facet of
 * citation quality: how politically balanced the sources are
 * (spectrumDiversity), how much of the citation list is primary-source
 * material (primarySourceRatio), and how much of the list has a known lean
 * rating at all (ratingCoverage). Complements getSourceDiversityReport, which
 * exposes these signals separately, by giving callers a single number for
 * e.g. sorting or flagging stories that need better sourcing.
 * @param {string[]} urls - Absolute URLs of sources to evaluate.
 * @param {{diversity?: number, primary?: number, coverage?: number}} [weights]
 *   Relative weights for each signal. Defaults favor diversity slightly over
 *   primary-source ratio and coverage. Weights are normalized internally, so
 *   they don't need to sum to 1.
 * @returns {number} Composite quality score in [0, 1]; 0 if urls is empty.
 */
function getSourceQualityScore(
  urls,
  weights = { diversity: 0.4, primary: 0.3, coverage: 0.3 }
) {
  const safeUrls = Array.isArray(urls) ? urls : [];
  if (safeUrls.length === 0) return 0;

  const { diversity = 0.4, primary = 0.3, coverage = 0.3 } = weights;
  const totalWeight = diversity + primary + coverage;
  if (totalWeight <= 0) return 0;

  const diversityScore = getSpectrumDiversity(safeUrls);
  const primaryScore = getPrimarySourceRatio(safeUrls);
  const coverageScore = getRatingCoverage(safeUrls);

  return (
    (diversity * diversityScore +
      primary * primaryScore +
      coverage * coverageScore) /
    totalWeight
  );
}

/**
 * Returns the subset of source URLs whose coarse lean category matches the
 * given bucket, per getLeanCategory. Complements getLeanCounts (which only
 * tallies) and getDomainsByLean (which operates on the static table rather
 * than an actual citation list) by letting a caller pull out, say, just the
 * Left-leaning URLs cited in a story for closer inspection.
 * @param {string[]} urls - Absolute URLs of sources to filter.
 * @param {"Left"|"Center"|"Right"|"Unrated"} category - Coarse lean bucket to
 *   filter by.
 * @returns {string[]} URLs whose getLeanCategory matches, in original order.
 */
function filterByLean(urls, category) {
  if (!Array.isArray(urls)) return [];
  return urls.filter((url) => getLeanCategory(url) === category);
}

/**
 * Converts a numeric getSourceQualityScore into a short human-readable label,
 * mirroring how getLeanSummary turns getBalanceScore into prose. Intended for
 * a UI badge (e.g. "Strong sourcing") next to the raw score, so callers don't
 * have to hand-roll the same thresholds in multiple places.
 * @param {string[]} urls - Absolute URLs of sources to evaluate.
 * @param {{diversity?: number, primary?: number, coverage?: number}} [weights]
 *   Forwarded to getSourceQualityScore.
 * @returns {"No rated sources"|"Weak sourcing"|"Fair sourcing"|"Strong sourcing"|"Excellent sourcing"}
 *   Label for the resulting score. Returns "No rated sources" if there are no
 *   rated sources at all, distinguishing "no signal" from "low score".
 */
function getSourceQualityLabel(urls, weights) {
  const safeUrls = Array.isArray(urls) ? urls : [];
  if (getRatingCoverage(safeUrls) === 0) return "No rated sources";

  const score = getSourceQualityScore(safeUrls, weights);
  if (score >= 0.85) return "Excellent sourcing";
  if (score >= 0.65) return "Strong sourcing";
  if (score >= 0.4) return "Fair sourcing";
  return "Weak sourcing";
}

module.exports = {
  getDomain,
  getLean,
  getLeanCategory,
  isPrimarySource,
  isRatedSource,
  getDomainsByLean,
  getLeanCounts,
  getSpectrumDiversity,
  getBalanceScore,
  getDominantLean,
  getUnratedDomains,
  getRatingCoverage,
  getPrimarySourceRatio,
  getPrimarySourceDomains,
  getSourceDiversityReport,
  getDomainBreakdown,
  getTopDomains,
  getLeanSummary,
  getSourceQualityScore,
  filterByLean,
  getSourceQualityLabel,
};
