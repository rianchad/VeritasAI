// Outlet credibility lookup table. Keyed by normalized outlet name (lowercase,
// trimmed). lean matches the labels the API returns. tier: 1 = major wire
// services / flagship public broadcasters, 2 = major national outlets,
// 3 = regional / partisan / lower-traffic / aggregator.

const OUTLET_DATA = new Map([
  [
    "ap",
    {
      lean: "Center",
      tier: 1,
      allSides: "Center",
      description:
        "International wire service, founded 1846; widely syndicated across US and global media.",
    },
  ],
  [
    "associated press",
    {
      lean: "Center",
      tier: 1,
      allSides: "Center",
      description:
        "International wire service, founded 1846; widely syndicated across US and global media.",
    },
  ],
  [
    "reuters",
    {
      lean: "Center",
      tier: 1,
      allSides: "Center",
      description:
        "Global wire service headquartered in London; known for financial and breaking news coverage.",
    },
  ],
  [
    "bbc",
    {
      lean: "Center",
      tier: 1,
      allSides: "Center",
      description:
        "UK public broadcaster, founded 1927; one of the world's largest news organizations.",
    },
  ],
  [
    "bbc news",
    {
      lean: "Center",
      tier: 1,
      allSides: "Center",
      description:
        "UK public broadcaster, founded 1927; one of the world's largest news organizations.",
    },
  ],
  [
    "npr",
    {
      lean: "Lean Left",
      tier: 1,
      allSides: "Lean Left",
      description:
        "US nonprofit public radio network; flagship programs include Morning Edition and All Things Considered.",
    },
  ],
  [
    "pbs",
    {
      lean: "Center",
      tier: 1,
      allSides: "Center",
      description:
        "US public television broadcaster; NewsHour is its flagship nightly news program.",
    },
  ],
  [
    "pbs newshour",
    {
      lean: "Center",
      tier: 1,
      allSides: "Center",
      description:
        "US public television broadcaster; NewsHour is its flagship nightly news program.",
    },
  ],
  [
    "cnn",
    {
      lean: "Left",
      tier: 2,
      allSides: "Left",
      description: "US 24-hour cable news network, founded 1980; headquartered in Atlanta.",
    },
  ],
  [
    "fox news",
    {
      lean: "Right",
      tier: 2,
      allSides: "Right",
      description:
        "US 24-hour cable news network, founded 1996; leading cable news outlet by viewership.",
    },
  ],
  [
    "msnbc",
    {
      lean: "Left",
      tier: 2,
      allSides: "Left",
      description:
        "US cable news network with progressive commentary programming; sister channel to NBC News.",
    },
  ],
  [
    "nyt",
    {
      lean: "Lean Left",
      tier: 2,
      allSides: "Lean Left",
      description:
        "US daily newspaper, founded 1851; Pulitzer Prize-winning national and international coverage.",
    },
  ],
  [
    "new york times",
    {
      lean: "Lean Left",
      tier: 2,
      allSides: "Lean Left",
      description:
        "US daily newspaper, founded 1851; Pulitzer Prize-winning national and international coverage.",
    },
  ],
  [
    "wsj",
    {
      lean: "Lean Right",
      tier: 2,
      allSides: "Lean Right",
      description: "US business and financial daily newspaper, founded 1889; owned by News Corp.",
    },
  ],
  [
    "wall street journal",
    {
      lean: "Lean Right",
      tier: 2,
      allSides: "Lean Right",
      description: "US business and financial daily newspaper, founded 1889; owned by News Corp.",
    },
  ],
  [
    "washington post",
    {
      lean: "Lean Left",
      tier: 2,
      allSides: "Lean Left",
      description:
        "US daily newspaper based in DC, founded 1877; known for investigative and political reporting.",
    },
  ],
  [
    "the guardian",
    {
      lean: "Left",
      tier: 2,
      allSides: "Left",
      description:
        "UK-based progressive daily newspaper, founded 1821; global English-language readership.",
    },
  ],
  [
    "guardian",
    {
      lean: "Left",
      tier: 2,
      allSides: "Left",
      description:
        "UK-based progressive daily newspaper, founded 1821; global English-language readership.",
    },
  ],
  [
    "politico",
    {
      lean: "Center",
      tier: 2,
      allSides: "Center",
      description:
        "US politics and policy news outlet, founded 2007; known for insider DC coverage.",
    },
  ],
  [
    "the hill",
    {
      lean: "Center",
      tier: 2,
      allSides: "Center",
      description: "US political newspaper covering Congress and the White House; launched 1994.",
    },
  ],
  [
    "axios",
    {
      lean: "Center",
      tier: 2,
      allSides: "Center",
      description: "US digital news outlet founded 2017; known for brief 'smart brevity' format.",
    },
  ],
  [
    "breitbart",
    {
      lean: "Right",
      tier: 3,
      allSides: "Right",
      description: "US far-right news and opinion website, founded 2007 by Andrew Breitbart.",
    },
  ],
  [
    "breitbart news",
    {
      lean: "Right",
      tier: 3,
      allSides: "Right",
      description: "US far-right news and opinion website, founded 2007 by Andrew Breitbart.",
    },
  ],
  [
    "huffpost",
    {
      lean: "Left",
      tier: 2,
      allSides: "Left",
      description:
        "US progressive digital outlet, founded 2005 as The Huffington Post; owned by BuzzFeed.",
    },
  ],
  [
    "huffington post",
    {
      lean: "Left",
      tier: 2,
      allSides: "Left",
      description:
        "US progressive digital outlet, founded 2005 as The Huffington Post; owned by BuzzFeed.",
    },
  ],
  [
    "daily wire",
    {
      lean: "Right",
      tier: 3,
      allSides: "Right",
      description:
        "US conservative media company founded 2015 by Ben Shapiro; commentary-heavy output.",
    },
  ],
  [
    "the daily wire",
    {
      lean: "Right",
      tier: 3,
      allSides: "Right",
      description:
        "US conservative media company founded 2015 by Ben Shapiro; commentary-heavy output.",
    },
  ],
  [
    "newsweek",
    {
      lean: "Center",
      tier: 2,
      allSides: "Center",
      description: "US weekly news magazine, founded 1933; now primarily a digital outlet.",
    },
  ],
  [
    "time",
    {
      lean: "Center",
      tier: 2,
      allSides: "Center",
      description:
        "US weekly news magazine, founded 1923; known for Person of the Year and long-form features.",
    },
  ],
  [
    "time magazine",
    {
      lean: "Center",
      tier: 2,
      allSides: "Center",
      description:
        "US weekly news magazine, founded 1923; known for Person of the Year and long-form features.",
    },
  ],
  [
    "bloomberg",
    {
      lean: "Center",
      tier: 2,
      allSides: "Center",
      description:
        "US financial and business news organization, founded 1981; also operates a global TV network.",
    },
  ],
  [
    "bloomberg news",
    {
      lean: "Center",
      tier: 2,
      allSides: "Center",
      description:
        "US financial and business news organization, founded 1981; also operates a global TV network.",
    },
  ],
  [
    "the atlantic",
    {
      lean: "Lean Left",
      tier: 2,
      allSides: "Lean Left",
      description:
        "US monthly magazine, founded 1857; known for long-form essays on politics and culture.",
    },
  ],
  [
    "atlantic",
    {
      lean: "Lean Left",
      tier: 2,
      allSides: "Lean Left",
      description:
        "US monthly magazine, founded 1857; known for long-form essays on politics and culture.",
    },
  ],
  [
    "new yorker",
    {
      lean: "Left",
      tier: 2,
      allSides: "Left",
      description:
        "US magazine, founded 1925; noted for investigative journalism, fiction, and cultural criticism.",
    },
  ],
  [
    "the new yorker",
    {
      lean: "Left",
      tier: 2,
      allSides: "Left",
      description:
        "US magazine, founded 1925; noted for investigative journalism, fiction, and cultural criticism.",
    },
  ],
  [
    "vox",
    {
      lean: "Left",
      tier: 2,
      allSides: "Left",
      description: "US explanatory journalism outlet, founded 2014; part of Vox Media.",
    },
  ],
  [
    "vice",
    {
      lean: "Left",
      tier: 2,
      allSides: "Left",
      description:
        "US digital media company founded 1994; known for youth-focused news and documentary content.",
    },
  ],
  [
    "vice news",
    {
      lean: "Left",
      tier: 2,
      allSides: "Left",
      description:
        "US digital media company founded 1994; known for youth-focused news and documentary content.",
    },
  ],
  [
    "buzzfeed news",
    {
      lean: "Left",
      tier: 3,
      allSides: "Left",
      description:
        "US digital news division of BuzzFeed, closed in 2023; known for breaking investigations.",
    },
  ],
  [
    "abc news",
    {
      lean: "Lean Left",
      tier: 2,
      allSides: "Lean Left",
      description: "US broadcast television news division of ABC, a Disney subsidiary.",
    },
  ],
  [
    "cbs news",
    {
      lean: "Lean Left",
      tier: 2,
      allSides: "Lean Left",
      description: "US broadcast television news division of CBS, part of Paramount Global.",
    },
  ],
  [
    "nbc news",
    {
      lean: "Lean Left",
      tier: 2,
      allSides: "Lean Left",
      description: "US broadcast television news division of NBC, part of NBCUniversal.",
    },
  ],
  [
    "usa today",
    {
      lean: "Center",
      tier: 2,
      allSides: "Center",
      description:
        "US national daily newspaper, founded 1982; largest print circulation in the US.",
    },
  ],
  [
    "new york post",
    {
      lean: "Right",
      tier: 2,
      allSides: "Right",
      description:
        "US tabloid newspaper, founded 1801; owned by News Corp; conservative editorial stance.",
    },
  ],
  [
    "ny post",
    {
      lean: "Right",
      tier: 2,
      allSides: "Right",
      description:
        "US tabloid newspaper, founded 1801; owned by News Corp; conservative editorial stance.",
    },
  ],
  [
    "daily mail",
    {
      lean: "Right",
      tier: 3,
      allSides: "Right",
      description:
        "UK tabloid newspaper, founded 1896; one of the world's most-visited English news sites.",
    },
  ],
  [
    "al jazeera",
    {
      lean: "Center",
      tier: 2,
      allSides: "Center",
      description:
        "Qatar-based international news network, founded 1996; broad Middle East and global coverage.",
    },
  ],
  [
    "al jazeera english",
    {
      lean: "Center",
      tier: 2,
      allSides: "Center",
      description:
        "Qatar-based international news network, founded 1996; broad Middle East and global coverage.",
    },
  ],
  [
    "der spiegel",
    {
      lean: "Center",
      tier: 2,
      allSides: null,
      description:
        "Germany's largest weekly news magazine, founded 1947; known for investigative reporting.",
    },
  ],
  [
    "spiegel",
    {
      lean: "Center",
      tier: 2,
      allSides: null,
      description:
        "Germany's largest weekly news magazine, founded 1947; known for investigative reporting.",
    },
  ],
  [
    "financial times",
    {
      lean: "Center",
      tier: 1,
      allSides: "Center",
      description:
        "UK international business newspaper, founded 1888; known for its distinctive pink pages.",
    },
  ],
  [
    "ft",
    {
      lean: "Center",
      tier: 1,
      allSides: "Center",
      description:
        "UK international business newspaper, founded 1888; known for its distinctive pink pages.",
    },
  ],
  [
    "the economist",
    {
      lean: "Center",
      tier: 1,
      allSides: "Center",
      description:
        "UK weekly magazine, founded 1843; covers economics, politics, and international affairs.",
    },
  ],
  [
    "economist",
    {
      lean: "Center",
      tier: 1,
      allSides: "Center",
      description:
        "UK weekly magazine, founded 1843; covers economics, politics, and international affairs.",
    },
  ],
  [
    "propublica",
    {
      lean: "Lean Left",
      tier: 2,
      allSides: "Lean Left",
      description:
        "US nonprofit investigative newsroom, founded 2007; Pulitzer Prize-winning accountability journalism.",
    },
  ],
  [
    "the intercept",
    {
      lean: "Left",
      tier: 3,
      allSides: "Left",
      description:
        "US nonprofit digital outlet, founded 2014; known for national security and civil liberties reporting.",
    },
  ],
  [
    "intercept",
    {
      lean: "Left",
      tier: 3,
      allSides: "Left",
      description:
        "US nonprofit digital outlet, founded 2014; known for national security and civil liberties reporting.",
    },
  ],
  [
    "mother jones",
    {
      lean: "Left",
      tier: 3,
      allSides: "Left",
      description:
        "US progressive nonprofit magazine, founded 1976; known for investigative and political journalism.",
    },
  ],
  [
    "national review",
    {
      lean: "Right",
      tier: 3,
      allSides: "Right",
      description:
        "US conservative magazine, founded 1955 by William F. Buckley Jr.; influential in conservative thought.",
    },
  ],
  [
    "the federalist",
    {
      lean: "Right",
      tier: 3,
      allSides: "Right",
      description:
        "US conservative online magazine, founded 2013; focused on culture, politics, and religion.",
    },
  ],
  [
    "federalist",
    {
      lean: "Right",
      tier: 3,
      allSides: "Right",
      description:
        "US conservative online magazine, founded 2013; focused on culture, politics, and religion.",
    },
  ],
  [
    "reason",
    {
      lean: "Center",
      tier: 3,
      allSides: "Center",
      description:
        "US libertarian magazine and website, founded 1968; published by the Reason Foundation.",
    },
  ],
  [
    "slate",
    {
      lean: "Left",
      tier: 2,
      allSides: "Left",
      description:
        "US online magazine, founded 1996; known for analysis, commentary, and cultural criticism.",
    },
  ],
  [
    "salon",
    {
      lean: "Left",
      tier: 3,
      allSides: "Left",
      description:
        "US progressive online magazine, founded 1995; heavy commentary on politics and culture.",
    },
  ],
  [
    "daily beast",
    {
      lean: "Left",
      tier: 3,
      allSides: "Left",
      description:
        "US digital news outlet, founded 2008; known for political scoops and entertainment coverage.",
    },
  ],
  [
    "the daily beast",
    {
      lean: "Left",
      tier: 3,
      allSides: "Left",
      description:
        "US digital news outlet, founded 2008; known for political scoops and entertainment coverage.",
    },
  ],
  [
    "mediaite",
    {
      lean: "Center",
      tier: 3,
      allSides: null,
      description:
        "US media criticism and news outlet, founded 2009; focuses on media and politics.",
    },
  ],
  [
    "realclearpolitics",
    {
      lean: "Lean Right",
      tier: 3,
      allSides: "Lean Right",
      description: "US political news aggregator and polling average site, founded 2000.",
    },
  ],
  [
    "real clear politics",
    {
      lean: "Lean Right",
      tier: 3,
      allSides: "Lean Right",
      description: "US political news aggregator and polling average site, founded 2000.",
    },
  ],
  [
    "the dispatch",
    {
      lean: "Lean Right",
      tier: 3,
      allSides: null,
      description:
        "US center-right newsletter and podcast network, founded 2019 by Jonah Goldberg and Steve Hayes.",
    },
  ],
  [
    "dispatch",
    {
      lean: "Lean Right",
      tier: 3,
      allSides: null,
      description:
        "US center-right newsletter and podcast network, founded 2019 by Jonah Goldberg and Steve Hayes.",
    },
  ],
  [
    "ground news",
    {
      lean: "Center",
      tier: 3,
      allSides: null,
      description:
        "Canadian-based news aggregator that surfaces media bias and blindspot data across outlets.",
    },
  ],
  [
    "iran international",
    {
      lean: "Center",
      tier: 3,
      allSides: null,
      description:
        "London-based Persian-language satellite news channel; critical coverage of the Iranian government.",
    },
  ],
]);

const TIER_LABELS = {
  1: "Tier 1 · Wire service / public broadcaster",
  2: "Tier 2 · Major national outlet",
  3: "Tier 3 · Regional / partisan / specialty",
};

/**
 * Looks up credibility metadata for a news outlet by display name.
 * @param {string} outletName - Outlet name as returned by the server (e.g. "AP", "Reuters").
 * @returns {{lean: string, tier: number, allSides?: string, description?: string}|null} Metadata or null if unknown.
 */
function getOutletData(outletName) {
  if (!outletName) return null;
  return OUTLET_DATA.get(outletName.trim().toLowerCase()) || null;
}

/**
 * Collapses an outlet's fine-grained lean label (e.g. "Lean Left") into its
 * broad category, mirroring server/sourceLean.js's getLeanCategory.
 * @param {string} outletName - Outlet name as returned by the server.
 * @returns {"Left"|"Right"|"Center"|"Unrated"}
 */
/**
 * Returns a human-readable label for an outlet's credibility tier, falling
 * back to a generic "Tier N" string if the tier isn't in TIER_LABELS.
 * @param {string} outletName - Outlet name as returned by the server.
 * @returns {string|null} Tier label, or null if the outlet is unknown.
 */
function getTierLabel(outletName) {
  const data = getOutletData(outletName);
  if (!data) return null;
  return TIER_LABELS[data.tier] || `Tier ${data.tier}`;
}

function getLeanCategory(outletName) {
  const data = getOutletData(outletName);
  const lean = data ? data.lean : null;
  if (!lean) return "Unrated";
  if (lean.endsWith("Left")) return "Left";
  if (lean.endsWith("Right")) return "Right";
  if (lean === "Center") return "Center";
  return "Unrated";
}

/**
 * Maps a lean category to the CSS class used for its colored badge/dot in
 * the credibility hover card, so callers don't need to hardcode the mapping.
 * @param {string} outletName - Outlet name as returned by the server.
 * @returns {"lean-badge--left"|"lean-badge--right"|"lean-badge--center"|"lean-badge--unrated"}
 */
function getLeanBadgeClass(outletName) {
  const category = getLeanCategory(outletName);
  return `lean-badge--${category.toLowerCase()}`;
}

/**
 * Returns a short list of all known outlet display-name aliases that share
 * the given tier, useful for building tier-filtered outlet pickers.
 * @param {number} tier - Tier number (1, 2, or 3).
 * @returns {string[]} Outlet names (as stored, lowercase) belonging to that tier.
 */
function getOutletsByTier(tier) {
  const names = [];
  for (const [name, data] of OUTLET_DATA) {
    if (data.tier === tier) names.push(name);
  }
  return names;
}

/**
 * Returns every known outlet display-name alias whose coarse lean category
 * matches the given bucket, mirroring getOutletsByTier above and
 * server/sourceLean.js's getDomainsByLean. Useful for building lean-filtered
 * outlet pickers in the sidebar.
 * @param {"Left"|"Center"|"Right"|"Unrated"} category - Coarse lean bucket to filter by.
 * @returns {string[]} Outlet names (as stored, lowercase) whose getLeanCategory matches.
 */
function getOutletsByLean(category) {
  const names = [];
  for (const [name] of OUTLET_DATA) {
    if (getLeanCategory(name) === category) names.push(name);
  }
  return names;
}

/**
 * Tallies how many outlets in a list fall into each coarse lean category,
 * using getLeanCategory for the classification. Useful for summarizing the
 * political balance of a set of sources shown to the user (e.g. all sources
 * cited for a story).
 * @param {string[]} outletNames - Outlet display names as returned by the server.
 * @returns {{Left: number, Center: number, Right: number, Unrated: number}} Counts per category.
 */
function getLeanBreakdown(outletNames) {
  const counts = { Left: 0, Center: 0, Right: 0, Unrated: 0 };
  if (!Array.isArray(outletNames)) return counts;
  for (const name of outletNames) {
    const category = getLeanCategory(name);
    counts[category] = (counts[category] || 0) + 1;
  }
  return counts;
}

/**
 * Scores how balanced a list of outlets is across the political spectrum,
 * based on getLeanBreakdown. A score of 1 means an even split between rated
 * Left/Center/Right sources; a score of 0 means all rated sources share a
 * single lean. Unrated outlets are excluded from the calculation since they
 * carry no lean information.
 * @param {string[]} outletNames - Outlet display names as returned by the server.
 * @returns {number} Balance score between 0 (one-sided) and 1 (evenly balanced).
 */
function getBalanceScore(outletNames) {
  const breakdown = getLeanBreakdown(outletNames);
  const rated = [breakdown.Left, breakdown.Center, breakdown.Right];
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
 * Determines which coarse lean category appears most often in a list of
 * outlets, using getLeanBreakdown for the tally. Complements getBalanceScore:
 * where that returns "how skewed" a source list is, this returns "skewed
 * toward what" — useful for labeling a story's overall slant in the sidebar
 * (e.g. "Sources lean Left").
 * @param {string[]} outletNames - Outlet display names as returned by the server.
 * @returns {"Left"|"Center"|"Right"|"Unrated"|null} The most common category,
 *   or null if outletNames is empty. Ties between categories are broken in
 *   Left/Center/Right/Unrated order (the first-checked category wins ties).
 */
function getDominantLean(outletNames) {
  if (!Array.isArray(outletNames) || outletNames.length === 0) return null;

  const breakdown = getLeanBreakdown(outletNames);
  const order = ["Left", "Center", "Right", "Unrated"];
  let dominant = order[0];
  for (const category of order) {
    if (breakdown[category] > breakdown[dominant]) dominant = category;
  }
  return dominant;
}

/**
 * Builds a single display-ready summary object for an outlet, bundling the
 * pieces that are normally fetched separately (getOutletData, getLeanCategory,
 * getTierLabel, getLeanBadgeClass) so callers building a credibility card
 * don't need four lookups for one outlet.
 * @param {string} outletName - Outlet name as returned by the server.
 * @returns {{
 *   name: string,
 *   rated: boolean,
 *   lean: string,
 *   category: "Left"|"Right"|"Center"|"Unrated",
 *   tier: number|null,
 *   tierLabel: string|null,
 *   badgeClass: string,
 *   description: string|null,
 *   allSides: string|null
 * }} Summary of everything known about the outlet.
 */
function getOutletSummary(outletName) {
  const data = getOutletData(outletName);
  return {
    name: outletName,
    rated: Boolean(data),
    lean: data ? data.lean : "Unrated",
    category: getLeanCategory(outletName),
    tier: data ? data.tier : null,
    tierLabel: getTierLabel(outletName),
    badgeClass: getLeanBadgeClass(outletName),
    description: data ? data.description || null : null,
    allSides: data ? data.allSides || null : null,
  };
}

/**
 * Converts a 0-1 balance score (see getBalanceScore) into a short, plain-
 * English label for display in the sidebar, so callers don't need to
 * hardcode their own thresholds.
 * @param {number} score - Balance score as returned by getBalanceScore.
 * @returns {"No rated sources"|"One-sided"|"Skewed"|"Somewhat balanced"|"Well balanced"}
 */
function describeBalanceScore(score) {
  if (typeof score !== "number" || Number.isNaN(score)) return "No rated sources";
  if (score < 0.25) return "One-sided";
  if (score < 0.5) return "Skewed";
  if (score < 0.75) return "Somewhat balanced";
  return "Well balanced";
}

/**
 * Ranks a list of outlets by credibility tier (1 = most authoritative),
 * placing unrated outlets last. Useful for surfacing the most authoritative
 * sources first in a citation list.
 * @param {string[]} outletNames - Outlet display names as returned by the server.
 * @returns {string[]} A new array, sorted by tier ascending (unrated last).
 */
function sortOutletsByTier(outletNames) {
  if (!Array.isArray(outletNames)) return [];
  const UNRATED_TIER = Number.MAX_SAFE_INTEGER;
  return [...outletNames].sort((a, b) => {
    const tierA = getOutletData(a)?.tier ?? UNRATED_TIER;
    const tierB = getOutletData(b)?.tier ?? UNRATED_TIER;
    return tierA - tierB;
  });
}

/**
 * Returns the subset of outlet names that have no entry in OUTLET_DATA,
 * de-duplicated and case/whitespace-normalized the same way getOutletData
 * looks them up. Useful for spotting gaps in the credibility table: run this
 * over the outlets cited across recent stories to see which display names
 * still need a lean/tier entry added.
 * @param {string[]} outletNames - Outlet display names as returned by the server.
 * @returns {string[]} Unique, normalized names with no known rating, in the
 *   order they first appeared.
 */
function getUnratedOutlets(outletNames) {
  if (!Array.isArray(outletNames)) return [];
  const seen = new Set();
  const unrated = [];
  for (const name of outletNames) {
    if (!name) continue;
    const normalized = name.trim().toLowerCase();
    if (seen.has(normalized)) continue;
    seen.add(normalized);
    if (!getOutletData(normalized)) unrated.push(normalized);
  }
  return unrated;
}

/**
 * Reports what fraction of a set of outlet citations are backed by rating
 * data, complementing getUnratedOutlets (which lists the gaps) with a single
 * number suitable for a "data coverage" indicator in the sidebar.
 * @param {string[]} outletNames - Outlet display names as returned by the server.
 * @returns {number} Fraction in [0, 1] of names with a known rating; 0 if
 *   outletNames is empty or not an array.
 */
function getRatingCoverage(outletNames) {
  if (!Array.isArray(outletNames) || outletNames.length === 0) return 0;
  const rated = outletNames.filter((name) => getOutletData(name)).length;
  return rated / outletNames.length;
}
