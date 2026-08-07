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
import { TrendingUp, BarChart3, Award, ArrowLeft, PieChart } from 'lucide-react';

const sectorShortNames: Record<string, string> = {
  'Industrial Engineering': 'Ind. Engg',
  'Supply Chain & Logistics': 'Supply Chain',
  'Healthcare & MedTech': 'Healthcare',
  'FMCG & Consumer Goods': 'FMCG & Goods',
  'Auto Components': 'Auto Comp',
  'Financial Services': 'Fin Services',
  'Renewable Energy': 'Renewable',
  'Pharmaceuticals': 'Pharma',
  'Consumer Services': 'Consumer',
};

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

    return Object.keys(map)
      .map((sector) => {
        const total = Math.round(map[sector].totalSize);
        const count = map[sector].count;
        return {
          name: sector,
          shortName: sectorShortNames[sector] || sector,
          CapitalRaised: total,
          IPOCount: count,
          avgSize: Math.round(total / count),
        };
      })
      .sort((a, b) => b.CapitalRaised - a.CapitalRaised);
  }, [allIPOs]);

  const totalMarketCapital = useMemo(() => {
    return sectorData.reduce((acc, curr) => acc + curr.CapitalRaised, 0);
  }, [sectorData]);

  // Top Gainers Data
  const gainersData = useMemo(() => {
    return allIPOs
      .filter((ipo) => ipo.status === 'LISTED' && ipo.listingGain !== undefined)
      .sort((a, b) => (b.listingGain || 0) - (a.listingGain || 0))
      .map((ipo) => ({
        name: ipo.companyName.split(' ')[0],
        fullName: ipo.companyName,
        sector: ipo.sector,
        exchange: ipo.exchangeType,
        issueSize: ipo.totalIssueSize,
        subscription: ipo.subscriptionTotal,
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

      {/* Grid Row 1: Capital Raised by Sector & Top Gainers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col gap-4 shadow-xl">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            <span>Capital Raised by Sector (₹ Crore)</span>
          </h2>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectorData} margin={{ top: 10, right: 10, left: 0, bottom: 45 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis
                  dataKey="shortName"
                  stroke="#64748b"
                  fontSize={10}
                  tickLine={false}
                  interval={0}
                  angle={-25}
                  textAnchor="end"
                  height={50}
                />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{
                    backgroundColor: '#090d16',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    color: '#f8fafc',
                    fontSize: '12px',
                  }}
                  labelFormatter={(label, payload) => payload?.[0]?.payload?.name || label}
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
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{
                    backgroundColor: '#090d16',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    color: '#f8fafc',
                    fontSize: '12px',
                  }}
                  labelFormatter={(label, payload) => payload?.[0]?.payload?.fullName || label}
                  formatter={(val) => [`+${val}%`, 'Listing Day Return']}
                />
                <Bar dataKey="ListingGain" fill="#0ea5e9" radius={[4, 4, 0, 0]} name="Listing Gain %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detailed Sector-Wise Breakdown Representation Table */}
      <section className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <PieChart className="w-4 h-4 text-emerald-400" />
              <span>Department & Sector-Wise Complete Representation</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Detailed breakdown of total capital raised, active IPO count, average issue size, and sector market share.
            </p>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-mono self-start sm:self-auto">
            Total Capital: ₹{totalMarketCapital.toLocaleString('en-IN')} Cr
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-950 text-slate-400 border-b border-slate-800">
                <th className="p-3 font-semibold">Department / Sector Name</th>
                <th className="p-3 font-semibold text-center">Abbreviated Form</th>
                <th className="p-3 font-semibold text-center">IPOs Count</th>
                <th className="p-3 font-semibold text-right">Capital Raised (₹ Cr)</th>
                <th className="p-3 font-semibold text-right">Avg Issue Size (₹ Cr)</th>
                <th className="p-3 font-semibold">Market Share (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {sectorData.map((sec) => {
                const sharePct = totalMarketCapital > 0 ? (sec.CapitalRaised / totalMarketCapital) * 100 : 0;
                return (
                  <tr key={sec.name} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-semibold text-slate-100">{sec.name}</td>
                    <td className="p-3 text-center">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[11px]">
                        {sec.shortName}
                      </span>
                    </td>
                    <td className="p-3 text-center font-bold text-emerald-400">{sec.IPOCount}</td>
                    <td className="p-3 text-right font-mono font-bold text-sky-400">
                      ₹{sec.CapitalRaised.toLocaleString('en-IN')} Cr
                    </td>
                    <td className="p-3 text-right font-mono text-slate-300">
                      ₹{sec.avgSize.toLocaleString('en-IN')} Cr
                    </td>
                    <td className="p-3 w-48">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-500 to-sky-400 rounded-full"
                            style={{ width: `${Math.min(100, sharePct)}%` }}
                          />
                        </div>
                        <span className="font-mono text-[11px] text-slate-300 w-10 text-right">
                          {sharePct.toFixed(1)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Listed IPO Gainers Complete Representation Table */}
      <section className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl flex flex-col gap-4">
        <div className="border-b border-slate-800 pb-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-400" />
            <span>Listing Day & Post-Listing Return Representation</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Full details for top listed IPOs including listing gain and current stock performance.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-950 text-slate-400 border-b border-slate-800">
                <th className="p-3 font-semibold">Company Name</th>
                <th className="p-3 font-semibold">Sector</th>
                <th className="p-3 font-semibold">Exchange</th>
                <th className="p-3 font-semibold text-right">Issue Size (₹ Cr)</th>
                <th className="p-3 font-semibold text-right">Subscription</th>
                <th className="p-3 font-semibold text-right">Listing Gain (%)</th>
                <th className="p-3 font-semibold text-right">Current Return (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {gainersData.map((gainer) => (
                <tr key={gainer.fullName} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-bold text-slate-100">{gainer.fullName}</td>
                  <td className="p-3 text-slate-400">{gainer.sector}</td>
                  <td className="p-3 font-medium text-slate-300">{gainer.exchange}</td>
                  <td className="p-3 text-right font-mono">₹{gainer.issueSize.toLocaleString('en-IN')} Cr</td>
                  <td className="p-3 text-right font-mono text-sky-400 font-semibold">
                    {gainer.subscription ? `${gainer.subscription}x` : 'N/A'}
                  </td>
                  <td className="p-3 text-right font-mono font-bold text-emerald-400">
                    +{gainer.ListingGain}%
                  </td>
                  <td className="p-3 text-right font-mono font-bold text-emerald-300">
                    +{gainer.CurrentGain}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
