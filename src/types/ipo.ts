export type ExchangeType = 'MAINBOARD' | 'SME';

export type IPOStatus = 'UPCOMING' | 'OPEN' | 'CLOSED' | 'LISTED';

export type SEBIObservationStatus = 'Observation Issued' | 'Draft Filed' | 'Approved' | 'Under Review';

export interface FinancialData {
  years: string[];
  revenue: number[];
  ebitda: number[];
  pat: number[];
  eps: number[];
  netWorth: number[];
  totalAssets: number[];
  totalBorrowings: number[];
  operatingCashFlow: number[];
  revenueUnit: string;
  isConsolidated: boolean;
  isRestated: boolean;
}

export interface FinancialRatios {
  pe: number;
  pb: number;
  roe: number;
  roce: number;
  debtToEquity: number;
  netProfitMargin: number;
  ebitdaMargin: number;
}

export interface RiskFactor {
  category: string;
  severity: 'HIGH' | 'MODERATE' | 'LOW';
  title: string;
  description: string;
}

export interface PromoterInfo {
  name: string;
  holdingPre: number;
  holdingPost: number;
  isSelling: boolean;
}

export interface ProceedsUse {
  category: string;
  amount: number;
  percentage: number;
}

export interface ScoreBreakdown {
  businessQuality: number;
  revenueProfitConsistency: number;
  cashFlowQuality: number;
  balanceSheetStrength: number;
  valuation: number;
  proceedsDilution: number;
  governanceRisk: number;
}

export interface PostListingPerformance {
  listingDayReturn: number;
  oneWeekReturn?: number;
  oneMonthReturn?: number;
  threeMonthReturn?: number;
  sixMonthReturn?: number;
  currentReturn: number;
}

export interface IPO {
  id: string;
  companyName: string;
  logoInitials: string;
  sector: string;
  industry: string;
  exchangeType: ExchangeType;
  status: IPOStatus;
  openDate: string;
  closeDate: string;
  lastDateToInvest: string;
  listingDate: string;
  allotmentDate?: string;
  priceBandLow: number;
  priceBandHigh: number;
  lotSize: number;
  minInvestment: number;
  totalIssueSize: number; // in Cr
  freshIssue: number; // in Cr
  ofsAmount: number; // in Cr
  faceValue: number;
  registrar: string;
  leadManagers: string[];
  listingPrice?: number;
  listingGain?: number;
  currentPrice?: number;
  ceoName: string;
  ceoDesignation: string;
  foundingYear: number;
  establishmentDate: string;
  registeredAddress: string;
  cin: string;
  companyDescription: string;
  employeeCount: number;
  website: string;
  rhpUrl: string; // SEBI Link
  bseUrl: string; // BSE Link
  nseUrl: string; // NSE Link
  sebiStatus: SEBIObservationStatus;
  subscriptionRetail: number;
  subscriptionNII: number;
  subscriptionQIB: number;
  subscriptionTotal: number;
  isProfitable: boolean;
  financials: FinancialData;
  ratios: FinancialRatios;
  dataSource: 'verified' | 'illustrative';
  suitabilityScore: number;
  suitabilityLabel: string;
  suitabilityColor: 'green' | 'yellow' | 'orange' | 'red';
  risks: RiskFactor[];
  promoters: PromoterInfo[];
  useOfProceeds: ProceedsUse[];
  scoreBreakdown: ScoreBreakdown;
  postListingPerformance?: PostListingPerformance;
}

export interface IPOFilters {
  search?: string;
  status?: string;
  exchangeType?: string;
  sector?: string;
  minScore?: number;
  sortBy?: 'date' | 'size' | 'gain' | 'score' | 'name';
  sortOrder?: 'asc' | 'desc';
}

export interface MarketStats {
  totalIPOs: number;
  mainboardCount: number;
  smeCount: number;
  listedCount: number;
  upcomingCount: number;
  openCount: number;
  totalCapitalRaised: number; // in Cr
  avgListingGain: number; // percentage
  topGainer: {
    companyName: string;
    gain: number;
    id: string;
  };
}
