'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { getAllIPOs } from '@/lib/ipo-service';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { TrendingUp, BarChart3, Award, ArrowLeft } from 'lucide-react';

export default function AnalyticsPage() {
  const allIPOs = useMemo(() => getAllIPOs(), []);

  // Capital by Sector Data
  const sectorData = useMemo(() => {
    const map: Record<string, { totalSize: number; count: number }> = {};
    allIPOs.forEach((ipo) => {
      if (!map[ipo.sector]) {
        map[ipo.sector] = { totalSize: 0, count: 0 };
      }
      map[ipo.sector].totalSize += ipo.totalIssueSize;
      map[ipo.sector].count += 1;
    });

    return Object.keys(map).map((sector) => ({
      name: sector,
      CapitalRaised: Math.round(map[sector].totalSize),
      IPOCount: map[sector].count,
    }));
  }, [allIPOs]);

  // Top Gainers Data
  const gainersData = useMemo(() => {
    return allIPOs
      .filter((ipo) => ipo.status === 'LISTED' && ipo.listingGain !== undefined)
      .sort((a, b) => (b.listingGain || 0) - (a.listingGain || 0))
      .map((ipo) => ({
        name: ipo.companyName.split(' ')[0],
        fullName: ipo.companyName,
        ListingGain: ipo.listingGain || 0,
        CurrentGain: ipo.postListingPerformance?.currentReturn || ipo.listingGain || 0,
      }));
  }, [allIPOs]);

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Top Back Navigation */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>
      </div>

      {/* Header Banner */}
      <section className="flex flex-col gap-3 p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Indian IPO Market Analytics & Trends
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Aggregated capital distribution, sectoral issue sizes, and post-listing performance trends from SEBI filings.
            </p>
          </div>
        </div>
      </section>

      {/* Grid Row 1: Capital Raised by Sector */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col gap-4 shadow-xl">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            <span>Capital Raised by Sector (₹ Crore)</span>
          </h2>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectorData} margin={{ top: 10, right: 10, left: 0, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis
                  dataKey="name"
                  stroke="#64748b"
                  fontSize={11}
                  tickLine={false}
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#090d16',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    color: '#f8fafc',
                    fontSize: '12px',
                  }}
                  formatter={(val) => [`₹${Number(val || 0).toLocaleString('en-IN')} Cr`, 'Capital Raised']}
                />
                <Bar dataKey="CapitalRaised" fill="#10b981" radius={[4, 4, 0, 0]} name="Capital Raised (₹ Cr)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Listing Gain Leaderboard */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col gap-4 shadow-xl">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-400" />
            <span>Top Listing Day Performers (%)</span>
          </h2>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={gainersData} margin={{ top: 10, right: 10, left: 0, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis
                  dataKey="name"
                  stroke="#64748b"
                  fontSize={11}
                  tickLine={false}
                  interval={0}
                />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#090d16',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    color: '#f8fafc',
                    fontSize: '12px',
                  }}
                  formatter={(val) => [`+${val}%`, 'Listing Day Return']}
                />
                <Bar dataKey="ListingGain" fill="#0ea5e9" radius={[4, 4, 0, 0]} name="Listing Gain %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
