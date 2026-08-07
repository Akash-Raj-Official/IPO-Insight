/**
 * SCORING_PILLARS — Single source of truth for the 7-pillar IPO suitability scoring system.
 *
 * The `key` maps directly to the `ScoreBreakdown` interface keys.
 * `maxScore` defines the upper ceiling for each pillar; all maxScores sum to 100.
 */
export interface ScoringPillar {
  key: string;
  name: string;
  maxScore: number;
  description: string;
  colour: string; // Tailwind text-colour class for the bar
}

export const SCORING_PILLARS: ScoringPillar[] = [
  {
    key: 'businessQuality',
    name: 'Business Quality',
    maxScore: 20,
    description: 'Market leadership, sector moat, EBITDA margin strength & return on equity',
    colour: 'text-emerald-400',
  },
  {
    key: 'revenueProfitConsistency',
    name: 'Revenue & Profit Growth',
    maxScore: 20,
    description: '3-year revenue CAGR and PAT growth trajectory — consistency rewarded over spikes',
    colour: 'text-sky-400',
  },
  {
    key: 'cashFlowQuality',
    name: 'Cash Flow Quality',
    maxScore: 15,
    description: 'Operating Cash Flow as a % of reported PAT — distinguishes real earnings from accounting profit',
    colour: 'text-indigo-400',
  },
  {
    key: 'balanceSheetStrength',
    name: 'Balance Sheet Strength',
    maxScore: 15,
    description: 'Debt/Equity ratio, net worth growth trend, and total borrowings trajectory',
    colour: 'text-violet-400',
  },
  {
    key: 'valuation',
    name: 'Valuation Attractiveness',
    maxScore: 15,
    description: 'P/E and P/B ratios relative to sector peers — lower multiples score higher',
    colour: 'text-amber-400',
  },
  {
    key: 'proceedsDilution',
    name: 'Proceeds & Dilution Risk',
    maxScore: 8,
    description: 'Fresh Issue % vs OFS %, promoter post-IPO holding, and use of proceeds quality',
    colour: 'text-orange-400',
  },
  {
    key: 'governanceRisk',
    name: 'Governance & Transparency',
    maxScore: 7,
    description: 'QIB subscription demand, SEBI observation status, and number/severity of disclosed risk factors',
    colour: 'text-rose-400',
  },
];

/** Returns total max score (always 100). */
export const TOTAL_MAX_SCORE = SCORING_PILLARS.reduce((sum, p) => sum + p.maxScore, 0);
