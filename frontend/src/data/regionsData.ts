import { GLOBAL_GAZETTEER, type RegionInfo } from "./gazetteerData.ts";

export type { RegionInfo };

export const REGIONS_DATA: RegionInfo[] = GLOBAL_GAZETTEER;

/**
 * Normalizes a string for robust, accent-insensitive and case-insensitive comparison.
 * e.g. "São Paulo" -> "sao paulo", "Köln" -> "koln"
 */
function normalizeText(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

/**
 * Searches the global gazetteer using a multi-tiered ranking algorithm:
 * 1. Exact match on name
 * 2. Exact match on alias
 * 3. Name starts with query
 * 4. Alias starts with query
 * 5. Word boundary in name starts with query
 * 6. Word boundary in alias starts with query
 * 7. Name contains query
 * 8. Alias contains query
 * 9. AdminRegion (State/Province) matches query
 * 10. Country matches query
 *
 * Supports disambiguation (e.g. Hyderabad India vs Pakistan, Cambridge UK vs US, Melbourne Australia vs US)
 * by ranking identical matches together and returning detailed administrative context.
 */
export function searchRegions(query: string, maxResults: number = 15): RegionInfo[] {
  const clean = normalizeText(query);
  if (!clean) return [];

  const scoredMatches: { region: RegionInfo; score: number }[] = [];

  for (const region of GLOBAL_GAZETTEER) {
    const normName = normalizeText(region.name);
    const normCountry = normalizeText(region.country);
    const normAdmin = region.adminRegion ? normalizeText(region.adminRegion) : "";
    const normAliases = (region.aliases || []).map(normalizeText);

    let score = 0;

    // 1. Exact match on primary name
    if (normName === clean) {
      score = 100;
    }
    // 2. Exact match on alias
    else if (normAliases.some((a) => a === clean)) {
      score = 95;
    }
    // 3. Name starts with query
    else if (normName.startsWith(clean)) {
      score = 85;
    }
    // 4. Any alias starts with query
    else if (normAliases.some((a) => a.startsWith(clean))) {
      score = 80;
    }
    // 5. Word boundary in name starts with query (e.g. "Pradesh" in "Andhra Pradesh")
    else if (normName.split(/\s+/).some((w) => w.startsWith(clean))) {
      score = 70;
    }
    // 6. Word boundary in alias starts with query
    else if (normAliases.some((a) => a.split(/\s+/).some((w) => w.startsWith(clean)))) {
      score = 65;
    }
    // 7. Substring in name
    else if (normName.includes(clean)) {
      score = 50;
    }
    // 8. Substring in alias
    else if (normAliases.some((a) => a.includes(clean))) {
      score = 45;
    }
    // 9. Admin region match (e.g. searching "Telangana" surfaces Hyderabad)
    else if (normAdmin.startsWith(clean)) {
      score = 35;
    } else if (normAdmin.includes(clean)) {
      score = 30;
    }
    // 10. Country match
    else if (normCountry.startsWith(clean)) {
      score = 25;
    } else if (normCountry.includes(clean)) {
      score = 20;
    }

    if (score > 0) {
      // Prioritize Country / State / City slightly as a tiebreaker
      let tiebreaker = 0;
      if (region.category === "Country") tiebreaker = 3;
      else if (region.category === "State") tiebreaker = 2;
      else if (region.category === "City") tiebreaker = 1;

      scoredMatches.push({
        region,
        score: score * 10 + tiebreaker,
      });
    }
  }

  // Sort descending by score; for ties, shorter names first
  scoredMatches.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return a.region.name.length - b.region.name.length;
  });

  return scoredMatches.slice(0, maxResults).map((m) => m.region);
}
