import React from 'react';
import Link from 'next/link';
import { ShieldCheck, FileText, Info, ArrowLeft, CheckCircle } from 'lucide-react';

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
              Data Sources, Methodology & Governance
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Transparent static site architecture built on publicly available SEBI, BSE, and NSE filings.
            </p>
          </div>
        </div>
      </section>

      {/* Main Principles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col gap-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>Public Data Integrity & Direct Links</span>
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            All data presented on IPO Insight India is sourced directly from publicly accessible documents filed by issuing companies with regulatory bodies in India.
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
                <strong className="text-slate-200">BSE & NSE Portals:</strong> Bidding timelines, real-time retail/NII/QIB oversubscription multiples, allotment status dates, and post-listing trading quotes.
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
            The 0–100 Analytical Suitability Score is calculated using an objective, multi-factor rubric based on 7 core financial pillars:
          </p>

          <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="font-bold text-slate-200 block">1. Business Quality</span>
              <span className="text-slate-400">Market leadership & moat</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="font-bold text-slate-200 block">2. Financial Growth</span>
              <span className="text-slate-400">Revenue & PAT CAGR</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="font-bold text-slate-200 block">3. Cash Flow Quality</span>
              <span className="text-slate-400">Operating Cash Flow / PAT</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="font-bold text-slate-200 block">4. Balance Sheet Strength</span>
              <span className="text-slate-400">Leverage & Debt/Equity</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
