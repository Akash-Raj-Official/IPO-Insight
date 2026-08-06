'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { getAllIPOs, compareIPOs } from '@/lib/ipo-service';
import { SuitabilityBadge } from '@/components/suitability-badge';
import { ArrowLeftRight, Check, Plus, Trash2, FileText, ExternalLink, ArrowLeft } from 'lucide-react';

export default function ComparePage() {
  const allIPOs = useMemo(() => getAllIPOs(), []);
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'bajaj-housing-finance',
    'swiggy',
    'hyundai-motor-india',
  ]);

  const selectedIPOs = useMemo(() => compareIPOs(selectedIds), [selectedIds]);

  const handleToggleId = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length <= 2) {
        alert('Please keep at least 2 IPOs selected for side-by-side comparison.');
        return;
      }
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      if (selectedIds.length >= 4) {
        alert('You can compare a maximum of 4 IPOs at a time.');
        return;
      }
      setSelectedIds([...selectedIds, id]);
    }
  };

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
            <ArrowLeftRight className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Side-by-Side IPO Comparison Tool
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Select 2 to 4 IPOs to compare valuation multiples, subscription demand, financial growth, and suitability scores.
            </p>
          </div>
        </div>

        {/* Selection Pills / Selector */}
        <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-800">
          <span className="text-xs font-semibold text-slate-400 mr-2">Select IPOs:</span>
          {allIPOs.map((ipo) => {
            const isSelected = selectedIds.includes(ipo.id);
            return (
              <button
                key={ipo.id}
                onClick={() => handleToggleId(ipo.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-emerald-500 text-slate-950 shadow-md'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {isSelected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                <span>{ipo.companyName}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Comparison Matrix Table */}
      <section className="overflow-x-auto rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-950 text-slate-200 border-b border-slate-800">
              <th className="p-4 w-48 font-bold text-slate-400 uppercase tracking-wider text-[11px] bg-slate-950/90">
                Comparison Metric
              </th>
              {selectedIPOs.map((ipo) => (
                <th key={ipo.id} className="p-4 min-w-[240px] font-bold text-slate-100 border-l border-slate-800">
                  <div className="flex items-center justify-between gap-2">
                    <Link
                      href={`/ipo/${ipo.id}`}
                      className="text-sm font-extrabold text-white hover:text-emerald-400 transition-colors line-clamp-1"
                    >
                      {ipo.companyName}
                    </Link>
                    <button
                      onClick={() => handleToggleId(ipo.id)}
                      className="p-1 rounded text-slate-500 hover:text-rose-400 transition-colors"
                      title="Remove from comparison"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="text-[10px] font-normal text-slate-400 mt-1">
                    {ipo.sector} • {ipo.exchangeType}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {/* Status & Category */}
            <tr>
              <td className="p-4 font-bold text-slate-400 bg-slate-950/40">Status</td>
              {selectedIPOs.map((ipo) => (
                <td key={ipo.id} className="p-4 border-l border-slate-800">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                    {ipo.status}
                  </span>
                </td>
              ))}
            </tr>

            {/* Suitability Score */}
            <tr>
              <td className="p-4 font-bold text-slate-400 bg-slate-950/40">Suitability Score</td>
              {selectedIPOs.map((ipo) => (
                <td key={ipo.id} className="p-4 border-l border-slate-800">
                  <SuitabilityBadge
                    score={ipo.suitabilityScore}
                    label={ipo.suitabilityLabel}
                    color={ipo.suitabilityColor}
                    showBar
                    size="sm"
                  />
                </td>
              ))}
            </tr>

            {/* Price Band */}
            <tr>
              <td className="p-4 font-bold text-slate-400 bg-slate-950/40">Price Band</td>
              {selectedIPOs.map((ipo) => (
                <td key={ipo.id} className="p-4 border-l border-slate-800 font-mono font-semibold text-slate-100">
                  ₹{ipo.priceBandLow} - ₹{ipo.priceBandHigh}
                </td>
              ))}
            </tr>

            {/* Total Issue Size */}
            <tr>
              <td className="p-4 font-bold text-slate-400 bg-slate-950/40">Total Issue Size</td>
              {selectedIPOs.map((ipo) => (
                <td key={ipo.id} className="p-4 border-l border-slate-800 font-mono font-bold text-emerald-400">
                  ₹{ipo.totalIssueSize.toLocaleString('en-IN')} Cr
                </td>
              ))}
            </tr>

            {/* Fresh vs OFS */}
            <tr>
              <td className="p-4 font-bold text-slate-400 bg-slate-950/40">Fresh Issue / OFS</td>
              {selectedIPOs.map((ipo) => (
                <td key={ipo.id} className="p-4 border-l border-slate-800 font-mono text-slate-400">
                  Fresh: ₹{ipo.freshIssue}Cr / OFS: ₹{ipo.ofsAmount}Cr
                </td>
              ))}
            </tr>

            {/* Minimum Investment */}
            <tr>
              <td className="p-4 font-bold text-slate-400 bg-slate-950/40">Min Investment</td>
              {selectedIPOs.map((ipo) => (
                <td key={ipo.id} className="p-4 border-l border-slate-800 font-mono">
                  ₹{ipo.minInvestment.toLocaleString('en-IN')} ({ipo.lotSize} shares)
                </td>
              ))}
            </tr>

            {/* Valuation P/E */}
            <tr>
              <td className="p-4 font-bold text-slate-400 bg-slate-950/40">P/E Ratio</td>
              {selectedIPOs.map((ipo) => (
                <td key={ipo.id} className="p-4 border-l border-slate-800 font-mono font-bold text-sky-400">
                  {ipo.ratios.pe}x
                </td>
              ))}
            </tr>

            {/* Return on Equity ROE */}
            <tr>
              <td className="p-4 font-bold text-slate-400 bg-slate-950/40">Return on Equity (ROE)</td>
              {selectedIPOs.map((ipo) => (
                <td key={ipo.id} className="p-4 border-l border-slate-800 font-mono font-bold text-indigo-400">
                  {ipo.ratios.roe}%
                </td>
              ))}
            </tr>

            {/* Debt to Equity */}
            <tr>
              <td className="p-4 font-bold text-slate-400 bg-slate-950/40">Debt to Equity</td>
              {selectedIPOs.map((ipo) => (
                <td key={ipo.id} className="p-4 border-l border-slate-800 font-mono text-amber-400 font-semibold">
                  {ipo.ratios.debtToEquity}x
                </td>
              ))}
            </tr>

            {/* Latest FY Revenue */}
            <tr>
              <td className="p-4 font-bold text-slate-400 bg-slate-950/40">Latest FY Revenue</td>
              {selectedIPOs.map((ipo) => {
                const latestRev = ipo.financials.revenue[ipo.financials.revenue.length - 1];
                return (
                  <td key={ipo.id} className="p-4 border-l border-slate-800 font-mono font-semibold text-slate-100">
                    ₹{latestRev.toLocaleString('en-IN')} Cr
                  </td>
                );
              })}
            </tr>

            {/* Net Profit (PAT) */}
            <tr>
              <td className="p-4 font-bold text-slate-400 bg-slate-950/40">Latest Net Profit (PAT)</td>
              {selectedIPOs.map((ipo) => {
                const latestPAT = ipo.financials.pat[ipo.financials.pat.length - 1];
                return (
                  <td
                    key={ipo.id}
                    className={`p-4 border-l border-slate-800 font-mono font-bold ${
                      latestPAT >= 0 ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    ₹{latestPAT.toLocaleString('en-IN')} Cr
                  </td>
                );
              })}
            </tr>

            {/* Total Subscription */}
            <tr>
              <td className="p-4 font-bold text-slate-400 bg-slate-950/40">Subscription Demand</td>
              {selectedIPOs.map((ipo) => (
                <td key={ipo.id} className="p-4 border-l border-slate-800 font-mono font-bold text-sky-400">
                  {ipo.subscriptionTotal ? `${ipo.subscriptionTotal}x Subscribed` : 'N/A'}
                </td>
              ))}
            </tr>

            {/* Listing Day Gain */}
            <tr>
              <td className="p-4 font-bold text-slate-400 bg-slate-950/40">Listing Day Return</td>
              {selectedIPOs.map((ipo) => (
                <td key={ipo.id} className="p-4 border-l border-slate-800 font-mono font-bold">
                  {ipo.listingGain !== undefined ? (
                    <span className={ipo.listingGain >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                      +{ipo.listingGain}%
                    </span>
                  ) : (
                    <span className="text-slate-500">N/A</span>
                  )}
                </td>
              ))}
            </tr>

            {/* Direct Document Links */}
            <tr>
              <td className="p-4 font-bold text-slate-400 bg-slate-950/40">SEBI Document Link</td>
              {selectedIPOs.map((ipo) => (
                <td key={ipo.id} className="p-4 border-l border-slate-800">
                  <a
                    href={ipo.rhpUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:underline font-semibold"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Official SEBI RHP</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}
