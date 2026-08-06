import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllIPOs, getIPOById } from '@/lib/ipo-service';
import { SuitabilityBadge } from '@/components/suitability-badge';
import { SubscriptionBadge } from '@/components/subscription-badge';
import { TimelineProgress } from '@/components/timeline-progress';
import { FinancialChart } from '@/components/financial-chart';
import { RiskAnalysis } from '@/components/risk-analysis';
import {
  Building2,
  ExternalLink,
  FileText,
  TrendingUp,
  Calendar,
  DollarSign,
  ArrowLeft,
  Users,
  PieChart,
  Award,
} from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const ipos = getAllIPOs();
  return ipos.map((ipo) => ({
    id: ipo.id,
  }));
}

export default async function IPODetailPage({ params }: PageProps) {
  const { id } = await params;
  const ipo = getIPOById(id);

  if (!ipo) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Top Back Navigation */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All IPOs</span>
        </Link>
      </div>

      {/* Main Header Card */}
      <section className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl flex flex-col gap-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 border border-slate-700/80 flex items-center justify-center text-2xl font-extrabold text-emerald-400 shadow-inner flex-shrink-0">
              {ipo.logoInitials}
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {ipo.companyName}
                </h1>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-slate-800 text-slate-300 border border-slate-700">
                  {ipo.exchangeType}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  {ipo.status}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400 flex-wrap mt-1">
                <span className="flex items-center gap-1 text-slate-300">
                  <Building2 className="w-3.5 h-3.5 text-slate-500" />
                  {ipo.sector} ({ipo.industry})
                </span>
                <span>•</span>
                <span>CIN: {ipo.cin}</span>
                <span>•</span>
                <span>Est. {ipo.foundingYear}</span>
              </div>
            </div>
          </div>

          {/* Official Document Direct Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <a
              href={ipo.rhpUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Official SEBI RHP</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>

            <a
              href={ipo.bseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-sky-400" />
              <span>BSE Page</span>
            </a>

            <a
              href={ipo.nseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-indigo-400" />
              <span>NSE Quote</span>
            </a>
          </div>
        </div>

        {/* Company Description */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800 pt-4">
          {ipo.companyDescription}
        </p>

        {/* Suitability Score Summary */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
          <div>
            <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block">
              Analytical Suitability Score
            </span>
            <div className="mt-1">
              <SuitabilityBadge
                score={ipo.suitabilityScore}
                label={ipo.suitabilityLabel}
                color={ipo.suitabilityColor}
                showBar
                size="lg"
              />
            </div>
          </div>

          <div className="text-xs text-slate-400 max-w-md">
            SEBI Observation Status:{' '}
            <strong className="text-emerald-400">{ipo.sebiStatus}</strong>. Score compiled from 7
            financial health factors: profitability, cash flow consistency, leverage, and valuation metrics.
          </div>
        </div>
      </section>

      {/* Grid Row: Essential Issue Details & Subscription Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Issue Details Card */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col gap-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <span>Issue Structure & Investment Terms</span>
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Price Band</span>
              <span className="text-sm font-bold text-slate-100">₹{ipo.priceBandLow} - ₹{ipo.priceBandHigh}</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Face Value: ₹{ipo.faceValue}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Minimum Lot Size</span>
              <span className="text-sm font-bold text-slate-100">{ipo.lotSize} Shares</span>
              <span className="text-[10px] text-emerald-400 block mt-0.5">Min Investment: ₹{ipo.minInvestment.toLocaleString('en-IN')}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Total Issue Size</span>
              <span className="text-sm font-bold text-slate-100">₹{ipo.totalIssueSize.toLocaleString('en-IN')} Cr</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Fresh: ₹{ipo.freshIssue}Cr | OFS: ₹{ipo.ofsAmount}Cr</span>
            </div>
          </div>

          {/* Key Management & Lead Managers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/80">
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">Registrar</span>
              <span className="font-semibold text-slate-200">{ipo.registrar}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/80">
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">Lead Managers</span>
              <span className="text-slate-300 truncate block">{ipo.leadManagers.join(', ')}</span>
            </div>
          </div>
        </div>

        {/* Subscription & Timeline Card */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between gap-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-sky-400" />
            <span>Timeline & Oversubscription</span>
          </h2>

          <TimelineProgress
            openDate={ipo.openDate}
            closeDate={ipo.closeDate}
            allotmentDate={ipo.allotmentDate}
            listingDate={ipo.listingDate}
            status={ipo.status}
          />

          <SubscriptionBadge
            total={ipo.subscriptionTotal}
            retail={ipo.subscriptionRetail}
            nii={ipo.subscriptionNII}
            qib={ipo.subscriptionQIB}
          />
        </div>
      </div>

      {/* Financial Growth & Statements Section */}
      <section className="flex flex-col gap-4">
        <FinancialChart financials={ipo.financials} />
      </section>

      {/* Key Ratios Grid */}
      <section className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col gap-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <PieChart className="w-4 h-4 text-emerald-400" />
          <span>Valuation & Financial Ratios</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block">P/E Ratio</span>
            <span className="text-base font-bold text-emerald-400">{ipo.ratios.pe}x</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Price to Earnings</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block">P/B Ratio</span>
            <span className="text-base font-bold text-sky-400">{ipo.ratios.pb}x</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Price to Book</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Return on Equity (ROE)</span>
            <span className="text-base font-bold text-indigo-400">{ipo.ratios.roe}%</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Annualized Return</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Debt / Equity</span>
            <span className="text-base font-bold text-amber-400">{ipo.ratios.debtToEquity}x</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Financial Leverage</span>
          </div>
        </div>
      </section>

      {/* Risk Analysis & SEBI Disclosures */}
      <section className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col gap-4">
        <RiskAnalysis risks={ipo.risks} />
      </section>

      {/* Promoters & Use of Proceeds */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Promoters Table */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col gap-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-sky-400" />
            <span>Promoter Holding Pattern</span>
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-400 border-b border-slate-800">
                  <th className="pb-2 font-medium">Promoter Name</th>
                  <th className="pb-2 font-medium text-right">Pre-IPO</th>
                  <th className="pb-2 font-medium text-right">Post-IPO</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                {ipo.promoters.map((p, idx) => (
                  <tr key={idx}>
                    <td className="py-2.5 font-medium flex items-center gap-1.5">
                      <span>{p.name}</span>
                      {p.isSelling && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                          Selling (OFS)
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 text-right font-mono text-slate-300">{p.holdingPre}%</td>
                    <td className="py-2.5 text-right font-mono text-emerald-400 font-bold">{p.holdingPost}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Use of Proceeds */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col gap-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-400" />
            <span>Use of Fresh Issue Proceeds</span>
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-400 border-b border-slate-800">
                  <th className="pb-2 font-medium">Category</th>
                  <th className="pb-2 font-medium text-right">Amount (₹ Cr)</th>
                  <th className="pb-2 font-medium text-right">Allocation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                {ipo.useOfProceeds.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-2.5 font-medium">{item.category}</td>
                    <td className="py-2.5 text-right font-mono text-slate-300">₹{item.amount} Cr</td>
                    <td className="py-2.5 text-right font-mono text-sky-400 font-bold">{item.percentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Post Listing Performance Track (If Listed) */}
      {ipo.status === 'LISTED' && ipo.postListingPerformance && (
        <section className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col gap-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>Post-Listing Stock Returns Track</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 text-xs text-center">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Listing Day</span>
              <span className={`text-base font-bold ${ipo.postListingPerformance.listingDayReturn >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                +{ipo.postListingPerformance.listingDayReturn}%
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">1 Week</span>
              <span className="text-base font-bold text-slate-200">
                +{ipo.postListingPerformance.oneWeekReturn}%
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">1 Month</span>
              <span className="text-base font-bold text-slate-200">
                +{ipo.postListingPerformance.oneMonthReturn}%
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">3 Months</span>
              <span className="text-base font-bold text-slate-200">
                +{ipo.postListingPerformance.threeMonthReturn}%
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">6 Months</span>
              <span className="text-base font-bold text-slate-200">
                +{ipo.postListingPerformance.sixMonthReturn}%
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Current Price Return</span>
              <span className={`text-base font-bold ${ipo.postListingPerformance.currentReturn >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                +{ipo.postListingPerformance.currentReturn}%
              </span>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
