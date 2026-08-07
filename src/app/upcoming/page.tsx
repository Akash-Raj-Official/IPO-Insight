'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { getAllIPOs } from '@/lib/ipo-service';
import { IPOCard } from '@/components/ipo-card';
import {
  Search,
  Building2,
  Calendar,
  ShieldCheck,
  FileText,
  ExternalLink,
  ArrowLeft,
  Filter,
  Sparkles,
  Award,
} from 'lucide-react';

export default function UpcomingIPOsPage() {
  const allIPOs = useMemo(() => getAllIPOs(), []);

  // Filter only UPCOMING issues
  const upcomingIPOs = useMemo(() => {
    return allIPOs.filter((ipo) => ipo.status === 'UPCOMING');
  }, [allIPOs]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSebiStatus, setSelectedSebiStatus] = useState('ALL');
  const [selectedExchange, setSelectedExchange] = useState('ALL');
  const [selectedSector, setSelectedSector] = useState('ALL');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Available unique sectors among upcoming IPOs
  const upcomingSectors = useMemo(() => {
    const set = new Set<string>();
    upcomingIPOs.forEach((ipo) => set.add(ipo.sector));
    return Array.from(set).sort();
  }, [upcomingIPOs]);

  // Statistics calculation for upcoming IPOs
  const stats = useMemo(() => {
    const totalPipeline = upcomingIPOs.reduce((acc, curr) => acc + curr.totalIssueSize, 0);
    const approvedCount = upcomingIPOs.filter(
      (i) => i.sebiStatus === 'Approved' || i.sebiStatus === 'Observation Issued'
    ).length;
    const draftCount = upcomingIPOs.filter((i) => i.sebiStatus === 'Draft Filed').length;
    const mainboardCount = upcomingIPOs.filter((i) => i.exchangeType === 'MAINBOARD').length;
    const smeCount = upcomingIPOs.filter((i) => i.exchangeType === 'SME').length;

    return {
      totalCount: upcomingIPOs.length,
      totalPipeline: Math.round(totalPipeline),
      approvedCount,
      draftCount,
      mainboardCount,
      smeCount,
    };
  }, [upcomingIPOs]);

  // Filtered Upcoming List
  const filteredUpcoming = useMemo(() => {
    let list = [...upcomingIPOs];

    if (selectedSebiStatus !== 'ALL') {
      list = list.filter((ipo) => ipo.sebiStatus === selectedSebiStatus);
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
          ipo.registrar.toLowerCase().includes(q) ||
          ipo.leadManagers.some((m) => m.toLowerCase().includes(q))
      );
    }

    return list;
  }, [upcomingIPOs, searchQuery, selectedSebiStatus, selectedExchange, selectedSector]);

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Back Navigation */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All IPOs</span>
        </Link>
      </div>

      {/* Hero Header */}
      <section className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="flex flex-col gap-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/15 border border-sky-400/40 text-sky-300 text-xs font-bold self-start shadow-md shadow-sky-500/10">
              <Calendar className="w-3.5 h-3.5" />
              <span>Near-Future Listing Pipeline Tracker</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Upcoming SEBI & Exchange IPO Filings
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Search and analyze DRHP & RHP draft filings submitted to SEBI, BSE, and NSE. Track expected price bands, issue sizes, lead managers, and SEBI observation approvals.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://www.sebi.gov.in/filings/public-issues.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-emerald-500/20 transition-all"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Official SEBI Prospectus Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Upcoming Statistics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-6 border-t border-slate-800/80">
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
              Total Upcoming Pipeline
            </div>
            <div className="text-lg sm:text-2xl font-black text-sky-400 mt-1">
              ₹{stats.totalPipeline.toLocaleString('en-IN')}{' '}
              <span className="text-xs font-normal text-slate-400">Cr</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">{stats.totalCount} Companies in queue</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
              SEBI Approved / Observation
            </div>
            <div className="text-lg sm:text-2xl font-black text-emerald-400 mt-1">
              {stats.approvedCount} <span className="text-xs font-normal text-slate-400">Issues</span>
            </div>
            <div className="text-[10px] text-emerald-400/90 mt-0.5">Ready for bidding launch</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
              DRHP Draft Filed
            </div>
            <div className="text-lg sm:text-2xl font-black text-amber-400 mt-1">
              {stats.draftCount} <span className="text-xs font-normal text-slate-400">Issues</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">SEBI observation under review</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
              Exchange Division
            </div>
            <div className="text-base sm:text-lg font-bold text-slate-200 mt-1">
              {stats.mainboardCount} <span className="text-xs text-slate-400 font-normal">Mainboard</span> / {stats.smeCount}{' '}
              <span className="text-xs text-slate-400 font-normal">SME</span>
            </div>
            <div className="text-[10px] text-sky-400 mt-0.5">SEBI RHP Verified</div>
          </div>
        </div>
      </section>

      {/* Search & Filter Controls */}
      <section className="flex flex-col gap-4 p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search upcoming IPOs by company name, sector, lead managers, or registrar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* SEBI Status */}
            <select
              value={selectedSebiStatus}
              onChange={(e) => setSelectedSebiStatus(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-sky-500 transition-colors"
            >
              <option value="ALL">All SEBI Statuses</option>
              <option value="Approved">SEBI Approved</option>
              <option value="Observation Issued">Observation Issued</option>
              <option value="Draft Filed">Draft DRHP Filed</option>
            </select>

            {/* Sector */}
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-sky-500 transition-colors"
            >
              <option value="ALL">All Sectors</option>
              {upcomingSectors.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            {/* Exchange */}
            <select
              value={selectedExchange}
              onChange={(e) => setSelectedExchange(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-sky-500 transition-colors"
            >
              <option value="ALL">All Exchanges</option>
              <option value="MAINBOARD">Mainboard Only</option>
              <option value="SME">SME Platform Only</option>
            </select>

            {/* View Mode */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'grid' ? 'bg-sky-500 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Cards View
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'table' ? 'bg-sky-500 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Full Table
              </button>
            </div>
          </div>
        </div>

        {/* Counter */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
          <span>
            Found <strong className="text-sky-400">{filteredUpcoming.length}</strong> upcoming IPO filings
          </span>
          {(searchQuery || selectedSebiStatus !== 'ALL' || selectedSector !== 'ALL' || selectedExchange !== 'ALL') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedSebiStatus('ALL');
                setSelectedSector('ALL');
                setSelectedExchange('ALL');
              }}
              className="text-sky-400 hover:underline text-[11px] font-semibold"
            >
              Clear filters
            </button>
          )}
        </div>
      </section>

      {/* Main Results Display */}
      {filteredUpcoming.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800/60 my-6">
          <Building2 className="w-12 h-12 text-slate-600 mb-3" />
          <h3 className="text-lg font-bold text-slate-300">No Upcoming IPOs Matched</h3>
          <p className="text-xs text-slate-500 max-w-sm mt-1">
            No upcoming IPO filings were found matching your search query or filter selection.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedSebiStatus('ALL');
              setSelectedSector('ALL');
              setSelectedExchange('ALL');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-sky-500 text-slate-950 font-bold text-xs hover:bg-sky-400 transition-all"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUpcoming.map((ipo) => (
            <IPOCard key={ipo.id} ipo={ipo} />
          ))}
        </div>
      ) : (
        /* Full Data Table representation */
        <div className="overflow-x-auto rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-950 text-slate-400 border-b border-slate-800">
                <th className="p-4 font-semibold">Company Name & Sector</th>
                <th className="p-4 font-semibold">Exchange</th>
                <th className="p-4 font-semibold">SEBI Approval Status</th>
                <th className="p-4 font-semibold">Price Band</th>
                <th className="p-4 font-semibold">Min Investment</th>
                <th className="p-4 font-semibold">Issue Size (₹ Cr)</th>
                <th className="p-4 font-semibold">Lead Managers</th>
                <th className="p-4 font-semibold text-right">Official Filings</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {filteredUpcoming.map((ipo) => (
                <tr key={ipo.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-4">
                    <Link
                      href={`/ipo/${ipo.id}`}
                      className="font-bold text-sm text-slate-100 hover:text-sky-400 transition-colors block"
                    >
                      {ipo.companyName}
                    </Link>
                    <span className="text-[11px] text-slate-400">{ipo.sector} ({ipo.industry})</span>
                  </td>
                  <td className="p-4 font-medium">{ipo.exchangeType}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-sky-500/10 text-sky-300 border border-sky-400/30">
                      {ipo.sebiStatus}
                    </span>
                  </td>
                  <td className="p-4 font-mono font-semibold">₹{ipo.priceBandLow} - ₹{ipo.priceBandHigh}</td>
                  <td className="p-4 font-mono">
                    ₹{ipo.minInvestment.toLocaleString('en-IN')} ({ipo.lotSize} shares)
                  </td>
                  <td className="p-4 font-mono font-bold text-emerald-400">
                    ₹{ipo.totalIssueSize.toLocaleString('en-IN')} Cr
                  </td>
                  <td className="p-4 text-slate-400 max-w-xs truncate">
                    {ipo.leadManagers.join(', ')}
                  </td>
                  <td className="p-4 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <a
                        href={ipo.rhpUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Direct SEBI RHP / DRHP Document Link"
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-emerald-400 transition-colors flex items-center gap-1 text-[11px]"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>SEBI RHP</span>
                      </a>
                      <Link
                        href={`/ipo/${ipo.id}`}
                        className="px-3 py-1 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-[11px] transition-colors"
                      >
                        View Analysis
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
