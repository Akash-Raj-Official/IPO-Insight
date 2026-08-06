'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { getAllIPOs, getMarketStats, getUniqueSectors } from '@/lib/ipo-service';
import { IPOCard } from '@/components/ipo-card';
import { SuitabilityBadge } from '@/components/suitability-badge';
import {
  Search,
  Building2,
  Sparkles,
  ArrowUpDown,
  LayoutGrid,
  List,
  ExternalLink,
  FileText,
} from 'lucide-react';

export default function DashboardPage() {
  const allIPOs = useMemo(() => getAllIPOs(), []);
  const stats = useMemo(() => getMarketStats(), []);
  const sectors = useMemo(() => getUniqueSectors(), []);

  // Filter States
  const [activeTab, setActiveTab] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedExchange, setSelectedExchange] = useState<string>('ALL');
  const [selectedSector, setSelectedSector] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'date' | 'size' | 'gain' | 'score' | 'name'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Filter & Sort Logic
  const filteredIPOs = useMemo(() => {
    let list = [...allIPOs];

    if (activeTab !== 'ALL') {
      list = list.filter((ipo) => ipo.status.toUpperCase() === activeTab);
    }

    if (selectedExchange !== 'ALL') {
      list = list.filter((ipo) => ipo.exchangeType === selectedExchange);
    }

    if (selectedSector !== 'ALL') {
      list = list.filter((ipo) => ipo.sector === selectedSector);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (ipo) =>
          ipo.companyName.toLowerCase().includes(q) ||
          ipo.sector.toLowerCase().includes(q) ||
          ipo.industry.toLowerCase().includes(q) ||
          ipo.registrar.toLowerCase().includes(q)
      );
    }

    list.sort((a, b) => {
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

    return list;
  }, [allIPOs, activeTab, selectedExchange, selectedSector, searchQuery, sortBy, sortOrder]);

  return (
    <div className="flex flex-col gap-8">
      {/* Hero Header & Key Statistics Banner */}
      <section className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="flex flex-col gap-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold self-start">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SEBI & Exchange Data Verified</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Indian IPO Intelligence & Analysis
            </h1>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Real public data compiled from SEBI Red Herring Prospectuses (RHPs), BSE, and NSE. 
              Track financial health, valuation ratios, oversubscription rates, and risk scores.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/compare"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 transition-all"
            >
              <span>Compare IPOs</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
            <Link
              href="/analytics"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm border border-slate-700 transition-all"
            >
              <span>Market Trends</span>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-6 border-t border-slate-800/80">
          <div className="p-3 sm:p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">
              Total Capital Raised
            </div>
            <div className="text-lg sm:text-2xl font-extrabold text-white mt-1">
              ₹{stats.totalCapitalRaised.toLocaleString('en-IN')}{' '}
              <span className="text-xs font-normal text-slate-400">Cr</span>
            </div>
            <div className="text-[10px] text-emerald-400 mt-0.5">Across Mainboard & SME</div>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">
              Avg Listing Gain
            </div>
            <div className="text-lg sm:text-2xl font-extrabold text-emerald-400 mt-1">
              +{stats.avgListingGain}%
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Based on {stats.listedCount} listed issues</div>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">
              Top Performer
            </div>
            <div className="text-sm sm:text-base font-bold text-white mt-1 truncate">
              {stats.topGainer.companyName}
            </div>
            <div className="text-[10px] text-emerald-400 font-semibold mt-0.5">
              +{stats.topGainer.gain}% Listing Day Return
            </div>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">
              Market Division
            </div>
            <div className="text-base sm:text-lg font-bold text-slate-200 mt-1">
              {stats.mainboardCount} <span className="text-xs text-slate-400 font-normal">Mainboard</span> / {stats.smeCount}{' '}
              <span className="text-xs text-slate-400 font-normal">SME</span>
            </div>
            <div className="text-[10px] text-sky-400 mt-0.5">Direct SEBI/BSE filings</div>
          </div>
        </div>
      </section>

      {/* Main Filter & Navigation Section */}
      <section className="flex flex-col gap-5">
        {/* Status Tabs Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-1 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {[
              { label: 'All IPOs', value: 'ALL', count: allIPOs.length },
              { label: 'Recently Listed', value: 'LISTED', count: stats.listedCount },
              { label: 'Open / Active', value: 'OPEN', count: stats.openCount },
              { label: 'Upcoming', value: 'UPCOMING', count: stats.upcomingCount },
              { label: 'Closed', value: 'CLOSED', count: allIPOs.filter(i => i.status === 'CLOSED').length },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab.value
                    ? 'bg-emerald-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                    activeTab === tab.value ? 'bg-slate-950/20 text-slate-950 font-extrabold' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs transition-all ${
                viewMode === 'grid' ? 'bg-slate-800 text-emerald-400' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Grid Card View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs transition-all ${
                viewMode === 'table' ? 'bg-slate-800 text-emerald-400' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Detailed Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search & Select Controls Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          {/* Search */}
          <div className="relative lg:col-span-2">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search by company name, sector, or registrar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* Sector Filter */}
          <div>
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
            >
              <option value="ALL">All Sectors</option>
              {sectors.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Exchange Filter */}
          <div>
            <select
              value={selectedExchange}
              onChange={(e) => setSelectedExchange(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
            >
              <option value="ALL">All Exchanges</option>
              <option value="MAINBOARD">Mainboard Only</option>
              <option value="SME">SME Only</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-1">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'size' | 'gain' | 'score' | 'name')}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
            >
              <option value="date">Sort by Bidding Date</option>
              <option value="size">Sort by Issue Size</option>
              <option value="gain">Sort by Listing Gain</option>
              <option value="score">Sort by Suitability Score</option>
              <option value="name">Sort by Name</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-emerald-400 transition-colors"
              title="Toggle Sort Direction"
            >
              <ArrowUpDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span>
            Showing <strong className="text-slate-200">{filteredIPOs.length}</strong> IPOs
          </span>
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedSector('ALL');
                setSelectedExchange('ALL');
              }}
              className="text-emerald-400 hover:underline text-[11px]"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Main Content Display */}
        {filteredIPOs.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800/60 my-6">
            <Building2 className="w-12 h-12 text-slate-600 mb-3" />
            <h3 className="text-lg font-bold text-slate-300">No IPOs Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mt-1">
              No matching IPO entries were found for your selected filters. Try searching for another sector or clearing filter options.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedSector('ALL');
                setSelectedExchange('ALL');
                setActiveTab('ALL');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-all"
            >
              Reset All Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIPOs.map((ipo) => (
              <IPOCard key={ipo.id} ipo={ipo} />
            ))}
          </div>
        ) : (
          /* Table View */
          <div className="overflow-x-auto rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-950 text-slate-400 border-b border-slate-800">
                  <th className="p-4 font-semibold">Company & Sector</th>
                  <th className="p-4 font-semibold">Exchange</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold">Price Band</th>
                  <th className="p-4 font-semibold">Issue Size</th>
                  <th className="p-4 font-semibold">Subscribed</th>
                  <th className="p-4 font-semibold">Listing Gain</th>
                  <th className="p-4 font-semibold">Suitability</th>
                  <th className="p-4 font-semibold text-right">Official Links</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                {filteredIPOs.map((ipo) => (
                  <tr key={ipo.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4">
                      <Link
                        href={`/ipo/${ipo.id}`}
                        className="font-bold text-sm text-slate-100 hover:text-emerald-400 transition-colors block"
                      >
                        {ipo.companyName}
                      </Link>
                      <span className="text-[11px] text-slate-400">{ipo.sector}</span>
                    </td>
                    <td className="p-4 font-medium">{ipo.exchangeType}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                        {ipo.status}
                      </span>
                    </td>
                    <td className="p-4 font-mono">₹{ipo.priceBandLow} - ₹{ipo.priceBandHigh}</td>
                    <td className="p-4 font-mono font-medium">₹{ipo.totalIssueSize} Cr</td>
                    <td className="p-4 font-mono text-sky-400 font-semibold">
                      {ipo.subscriptionTotal ? `${ipo.subscriptionTotal}x` : 'N/A'}
                    </td>
                    <td className="p-4 font-mono font-bold">
                      {ipo.listingGain !== undefined ? (
                        <span className={ipo.listingGain >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                          {ipo.listingGain >= 0 ? `+${ipo.listingGain}%` : `${ipo.listingGain}%`}
                        </span>
                      ) : (
                        <span className="text-slate-500">N/A</span>
                      )}
                    </td>
                    <td className="p-4">
                      <SuitabilityBadge
                        score={ipo.suitabilityScore}
                        label={ipo.suitabilityLabel}
                        color={ipo.suitabilityColor}
                        size="sm"
                      />
                    </td>
                    <td className="p-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <a
                          href={ipo.rhpUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Direct SEBI RHP Document Link"
                          className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-emerald-400 transition-colors"
                        >
                          <FileText className="w-3.5 h-3.5" />
                        </a>
                        <Link
                          href={`/ipo/${ipo.id}`}
                          className="px-2.5 py-1 rounded bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-[11px] transition-colors"
                        >
                          View
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
