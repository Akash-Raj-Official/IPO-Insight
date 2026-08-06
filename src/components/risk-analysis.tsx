import React from 'react';
import { RiskFactor } from '@/types/ipo';

interface RiskAnalysisProps {
  risks: RiskFactor[];
}

export function RiskAnalysis({ risks }: RiskAnalysisProps) {
  const getSeverityBadge = (sev: 'HIGH' | 'MODERATE' | 'LOW') => {
    switch (sev) {
      case 'HIGH':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      case 'MODERATE':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'LOW':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-100 flex items-center gap-2">
          <span>Key Risk Factors & SEBI Disclosure Audit</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 font-medium">
            {risks.filter((r) => r.severity === 'HIGH').length} High Risks Identified
          </span>
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {risks.map((risk, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {risk.category}
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getSeverityBadge(
                  risk.severity
                )}`}
              >
                {risk.severity} SEVERITY
              </span>
            </div>
            <h4 className="text-sm font-semibold text-slate-200">{risk.title}</h4>
            <p className="text-xs text-slate-400 leading-relaxed">{risk.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
