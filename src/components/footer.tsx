import React from 'react';
import Link from 'next/link';
import { ShieldAlert, ExternalLink, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: About */}
          <div className="flex flex-col gap-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-emerald-500 flex items-center justify-center font-bold text-slate-950 text-xs">
                IPO
              </div>
              <span className="font-bold text-slate-100 text-sm">IPO Insight India</span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-lg">
              A pure static intelligence platform for Indian Mainboard & SME Initial Public Offerings (IPOs). 
              All financial statements, valuation metrics, risk factors, and issue timelines are compiled directly 
              from publicly available Red Herring Prospectuses (RHPs) filed with SEBI and stock exchange portals.
            </p>
          </div>

          {/* Col 2: Official Sources */}
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-slate-200 uppercase tracking-wider text-[11px]">
              Official Public Portals
            </span>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href="https://www.sebi.gov.in/filings/public-issues.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                  SEBI Public Issues Filings
                </a>
              </li>
              <li>
                <a
                  href="https://www.bseindia.com/publicissue.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                  BSE India Public Issues
                </a>
              </li>
              <li>
                <a
                  href="https://www.nseindia.com/market-data/all-upcoming-issues-ipo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                  NSE India IPO Center
                </a>
              </li>
              <li>
                <a
                  href="https://www.mca.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                  Ministry of Corporate Affairs (MCA)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation */}
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-slate-200 uppercase tracking-wider text-[11px]">
              Platform Navigation
            </span>
            <ul className="flex flex-col gap-2">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors">
                  IPO Research Dashboard
                </Link>
              </li>
              <li>
                <Link href="/upcoming" className="hover:text-sky-400 transition-colors">
                  Upcoming SEBI Filings
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-emerald-400 transition-colors">
                  Side-by-Side Comparison Tool
                </Link>
              </li>
              <li>
                <Link href="/analytics" className="hover:text-emerald-400 transition-colors">
                  Market Analytics & Trends
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors">
                  Data Methodology & Disclaimers
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory Disclaimer */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row gap-3 items-start">
          <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="text-[11px] text-slate-400 leading-relaxed">
            <span className="font-bold text-slate-200">Legal Disclaimer:</span> IPO Insight India is an educational analytical project and is NOT a SEBI-registered investment advisor or stockbroker. 
            Information displayed on this static site is gathered from public regulatory filings and stock exchange releases. 
            Investments in Initial Public Offerings carry market risks. Always read the complete Red Herring Prospectus (RHP) filed with SEBI before making investment decisions.
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800/80 text-[11px] text-slate-400">
          <div>© {new Date().getFullYear()} IPO Insight India. Open Source & Pure Static Web Architecture.</div>
          <div className="flex items-center gap-1.5">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline-block animate-pulse" />
            <span>by <strong className="text-slate-200 font-bold">Akash</strong></span>
            <span className="mx-1 text-slate-600">•</span>
            <span className="text-slate-400">Auto-deployed via GitHub Actions to GitHub Pages</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
