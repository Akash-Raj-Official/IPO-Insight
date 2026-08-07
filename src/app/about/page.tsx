import React from 'react';
import Link from 'next/link';
import { ShieldCheck, FileText, Info, ArrowLeft, CheckCircle, BarChart2 } from 'lucide-react';
import { SCORING_PILLARS } from '@/lib/scoring-pillars';

export default function AboutPage() {
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

      {/* Header */}
      <section className="flex flex-col gap-3 p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Data Sources, Methodology &amp; Governance
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Transparent static site architecture. Verified entries use actual SEBI/BSE/NSE filing data;
              illustrative entries use representative financial profiles for demonstration.
            </p>
          </div>
        </div>
      </section>

      {/* Main Principles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col gap-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>Public Data Integrity &amp; Direct Links</span>
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Data on IPO Insight India is sourced from publicly accessible documents filed by issuing
            companies with Indian regulatory bodies. Entries marked{' '}
            <span className="font-bold text-emerald-400">Verified</span> use actual filing data;
            entries marked{' '}
            <span className="font-bold text-amber-400">Sample Data</span> are illustrative profiles.
          </p>

          <ul className="flex flex-col gap-3 text-xs text-slate-400 pt-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong className="text-slate-200">SEBI Red Herring Prospectus (RHP):</strong> Primary source for financial statements, issue size, fresh issue vs OFS breakdown, risk disclosures, and lead manager lists.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong className="text-slate-200">BSE &amp; NSE Portals:</strong> Bidding timelines, retail/NII/QIB oversubscription multiples, allotment status dates, and post-listing trading quotes.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong className="text-slate-200">MCA Filings:</strong> Corporate Identification Numbers (CIN), registered offices, and founding history.
              </span>
            </li>
          </ul>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col gap-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-sky-400" />
            <span>Analytical Suitability Scoring Methodology</span>
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            The 0–100 Analytical Suitability Score is calculated using an objective, multi-factor
            rubric across <strong className="text-white">7 financial pillars</strong>. Each pillar
            has a defined maximum contribution to the total, shown below.
          </p>

          <div className="flex flex-col gap-2 text-[11px] pt-1">
            {SCORING_PILLARS.map((pillar, idx) => (
              <div key={pillar.key} className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-bold text-slate-200">
                    {idx + 1}. {pillar.name}
                  </span>
                  <span className={`font-black tabular-nums ${pillar.colour}`}>
                    /{pillar.maxScore} pts
                  </span>
                </div>
                <div className="text-slate-400 leading-relaxed">{pillar.description}</div>
                {/* Weight bar */}
                <div className="mt-1.5 h-1 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-current opacity-60"
                    style={{ width: `${pillar.maxScore}%`, color: pillar.colour.replace('text-', '') }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Score Weighting Summary */}
      <section className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col gap-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-indigo-400" />
          <span>Pillar Weight Distribution (Total = 100 pts)</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          {SCORING_PILLARS.map((pillar) => (
            <div key={pillar.key} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
              <div className={`text-xl font-extrabold tabular-nums ${pillar.colour}`}>
                {pillar.maxScore}
              </div>
              <div className="text-slate-400 mt-0.5 leading-tight">{pillar.name}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
