import ipoData from '@/data/ipos.json';
import { IPO, IPOFilters, MarketStats } from '@/types/ipo';

function deriveScore(ipo: IPO): IPO {
  // Compute total score as the sum of all breakdown pillars
  const computedScore = Object.values(ipo.scoreBreakdown).reduce((a, b) => a + b, 0);

  // Derive label and colour bands from the computed total
  let suitabilityColor: IPO['suitabilityColor'];
  if (computedScore >= 80) suitabilityColor = 'green';
  else if (computedScore >= 65) suitabilityColor = 'yellow';
  else if (computedScore >= 50) suitabilityColor = 'orange';
  else suitabilityColor = 'red';

  return { ...ipo, suitabilityScore: computedScore, suitabilityColor };
}

const typedIPOs: IPO[] = (ipoData as unknown as IPO[]).map(deriveScore);

export function getAllIPOs(): IPO[] {
  return typedIPOs;
}

export function getIPOById(id: string): IPO | undefined {
  return typedIPOs.find((ipo) => ipo.id.toLowerCase() === id.toLowerCase());
}

export function getIPOsByStatus(status: string): IPO[] {
  if (status === 'ALL') return typedIPOs;
  return typedIPOs.filter((ipo) => ipo.status.toUpperCase() === status.toUpperCase());
}

export function getFilteredIPOs(filters: IPOFilters): IPO[] {
  let result = [...typedIPOs];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (ipo) =>
        ipo.companyName.toLowerCase().includes(q) ||
        ipo.sector.toLowerCase().includes(q) ||
        ipo.industry.toLowerCase().includes(q) ||
        ipo.registrar.toLowerCase().includes(q)
    );
  }

  if (filters.status && filters.status !== 'ALL') {
    result = result.filter((ipo) => ipo.status.toUpperCase() === filters.status?.toUpperCase());
  }

  if (filters.exchangeType && filters.exchangeType !== 'ALL') {
    result = result.filter((ipo) => ipo.exchangeType.toUpperCase() === filters.exchangeType?.toUpperCase());
  }

  if (filters.sector && filters.sector !== 'ALL') {
    result = result.filter((ipo) => ipo.sector.toLowerCase() === filters.sector?.toLowerCase());
  }

  if (filters.minScore) {
    result = result.filter((ipo) => ipo.suitabilityScore >= (filters.minScore || 0));
  }

  // Sorting
  const sortBy = filters.sortBy || 'date';
  const sortOrder = filters.sortOrder || 'desc';

  result.sort((a, b) => {
    let diff = 0;
    if (sortBy === 'date') {
      diff = new Date(b.openDate).getTime() - new Date(a.openDate).getTime();
    } else if (sortBy === 'size') {
      diff = b.totalIssueSize - a.totalIssueSize;
    } else if (sortBy === 'gain') {
      diff = (b.listingGain || 0) - (a.listingGain || 0);
    } else if (sortBy === 'score') {
      diff = b.suitabilityScore - a.suitabilityScore;
    } else if (sortBy === 'name') {
      diff = a.companyName.localeCompare(b.companyName);
    }

    return sortOrder === 'asc' ? -diff : diff;
  });

  return result;
}

export function getMarketStats(): MarketStats {
  const listedIPOs = typedIPOs.filter((ipo) => ipo.status === 'LISTED' && ipo.listingGain !== undefined);
  
  const totalCapitalRaised = typedIPOs.reduce((acc, ipo) => acc + (ipo.totalIssueSize || 0), 0);
  const avgListingGain = listedIPOs.length > 0
    ? listedIPOs.reduce((acc, ipo) => acc + (ipo.listingGain || 0), 0) / listedIPOs.length
    : 0;

  let topGainer = { companyName: 'N/A', gain: 0, id: '' };
  if (listedIPOs.length > 0) {
    const top = [...listedIPOs].sort((a, b) => (b.listingGain || 0) - (a.listingGain || 0))[0];
    topGainer = {
      companyName: top.companyName,
      gain: top.listingGain || 0,
      id: top.id,
    };
  }

  return {
    totalIPOs: typedIPOs.length,
    mainboardCount: typedIPOs.filter((ipo) => ipo.exchangeType === 'MAINBOARD').length,
    smeCount: typedIPOs.filter((ipo) => ipo.exchangeType === 'SME').length,
    listedCount: typedIPOs.filter((ipo) => ipo.status === 'LISTED').length,
    upcomingCount: typedIPOs.filter((ipo) => ipo.status === 'UPCOMING').length,
    openCount: typedIPOs.filter((ipo) => ipo.status === 'OPEN').length,
    totalCapitalRaised: Math.round(totalCapitalRaised),
    avgListingGain: Number(avgListingGain.toFixed(2)),
    topGainer,
  };
}

export function getUniqueSectors(): string[] {
  const sectors = new Set<string>();
  typedIPOs.forEach((ipo) => sectors.add(ipo.sector));
  return Array.from(sectors).sort();
}

export function compareIPOs(ids: string[]): IPO[] {
  return typedIPOs.filter((ipo) => ids.map((id) => id.toLowerCase()).includes(ipo.id.toLowerCase()));
}
