import React from 'react';
import Link from 'next/link';
import { IPO } from '@/types/ipo';
import { SuitabilityBadge } from './suitability-badge';
import { ExternalLink, FileText, TrendingUp, Calendar, Building2 } from 'lucide-react';

interface IPOCardProps {
  ipo: IPO;
}

export function IPOCard({ ipo }: IPOCardProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'OPEN':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 animate-pulse';
      case 'UPCOMING':
        return 'bg-sky-500/10 text-sky-400 border-sky-500/30';
      case 'CLOSED':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'LISTED':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'N/A';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="group relative flex flex-col justify-between p-5 rounded-2xl bg-slate-900/80 border border-slate-800/90 hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-500/5 transition-all duration-300">
      <div className="flex flex-col gap-4">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-800 to-slate-950 border border-slate-700/80 flex items-center justify-center font-bold text-lg text-emerald-400 shadow-inner group-hover:scale-105 transition-transform">
              {ipo.logoInitials}
            </div>
            <div>
              <Link
                href={`/ipo/${ipo.id}`}
                className="font-bold text-base text-slate-100 hover:text-emerald-400 transition-colors line-clamp-1"
              >
                {ipo.companyName}
              </Link>
              <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-slate-500" />
                  {ipo.sector}
                </span>
                <span>•</span>
                <span className="font-medium text-slate-300">{ipo.exchangeType}</span>
              </div>
            </div>
          </div>

          <span
            className={`text-[11px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-wider ${getStatusBadge(
              ipo.status
            )}`}
          >
            {ipo.status}
          </span>
        </div>

        {/* Suitability Score Banner */}
        <div className="pt-1">
          <SuitabilityBadge
            score={ipo.suitabilityScore}
            label={ipo.suitabilityLabel}
            color={ipo.suitabilityColor}
            showBar
            size="sm"
          />
        </div>

        {/* Essential Financial & Issue Grid */}
        <div className="grid grid-cols-2 gap-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs">
          <div>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block">
              Price Band
            </span>
            <span className="font-semibold text-slate-200">
              ₹{ipo.priceBandLow} - ₹{ipo.priceBandHigh}
            </span>
          </div>

          <div>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block">
              Min Investment
            </span>
            <span className="font-semibold text-slate-200">
              ₹{ipo.minInvestment.toLocaleString('en-IN')} ({ipo.lotSize} shares)
            </span>
          </div>

          <div>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block">
              Issue Size
            </span>
            <span className="font-semibold text-slate-200">
              ₹{ipo.totalIssueSize.toLocaleString('en-IN')} Cr
            </span>
          </div>

          <div>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block">
              Subscription
            </span>
            <span className="font-bold text-sky-400">
              {ipo.subscriptionTotal ? `${ipo.subscriptionTotal}x` : 'N/A'}
            </span>
          </div>
        </div>

        {/* Listing Gain Highlight (If Listed) */}
        {ipo.status === 'LISTED' && ipo.listingGain !== undefined && (
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
            <span className="text-xs text-slate-400 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              Listing Gain
            </span>
            <span
              className={`text-sm font-bold ${
                ipo.listingGain >= 0 ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {ipo.listingGain >= 0 ? `+${ipo.listingGain}%` : `${ipo.listingGain}%`}
            </span>
          </div>
        )}

        {/* Date Row */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
          <span className="flex items-center gap-1 text-[11px]">
            <Calendar className="w-3 h-3 text-slate-500" />
            {ipo.status === 'LISTED'
              ? `Listed on ${formatDate(ipo.listingDate)}`
              : `Bidding: ${formatDate(ipo.openDate)} - ${formatDate(ipo.closeDate)}`}
          </span>
        </div>
      </div>

      {/* Footer / Actions */}
      <div className="flex items-center justify-between gap-2 pt-4 mt-4 border-t border-slate-800/80">
        <div className="flex items-center gap-2">
          {/* Direct link to SEBI Public Issues */}
          <a
            href={ipo.rhpUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Direct SEBI RHP Prospectus Link"
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-emerald-400 border border-slate-700/60 transition-colors flex items-center gap-1 text-[11px]"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">SEBI RHP</span>
          </a>

          {/* BSE Link */}
          <a
            href={ipo.bseUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="BSE India Official Page"
            className="px-2 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-sky-400 border border-slate-700/60 transition-colors text-[10px] font-bold"
          >
            BSE
          </a>
        </div>

        <Link
          href={`/ipo/${ipo.id}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all"
        >
          <span>View Analysis</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
