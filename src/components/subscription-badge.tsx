import React from 'react';

interface SubscriptionBadgeProps {
  total: number;
  retail?: number;
  nii?: number;
  qib?: number;
  compact?: boolean;
}

export function SubscriptionBadge({ total, retail, nii, qib, compact = false }: SubscriptionBadgeProps) {
  const getSubColor = (multiple: number) => {
    if (multiple >= 50) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
    if (multiple >= 10) return 'text-sky-400 bg-sky-500/10 border-sky-500/30';
    if (multiple >= 1) return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    return 'text-slate-400 bg-slate-500/10 border-slate-500/30';
  };

  if (compact) {
    return (
      <div className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold border ${getSubColor(total)}`}>
        {total}x Subscribed
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 p-3 rounded-lg bg-slate-900/60 border border-slate-800">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-400">Total Subscription</span>
        <span className={`text-sm font-bold px-2 py-0.5 rounded border ${getSubColor(total)}`}>
          {total}x
        </span>
      </div>
      {(retail !== undefined || nii !== undefined || qib !== undefined) && (
        <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-800/80 text-center">
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">Retail</div>
            <div className="text-xs font-semibold text-slate-200">{retail ?? 'N/A'}x</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">NII (HNI)</div>
            <div className="text-xs font-semibold text-slate-200">{nii ?? 'N/A'}x</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">QIB</div>
            <div className="text-xs font-semibold text-slate-200">{qib ?? 'N/A'}x</div>
          </div>
        </div>
      )}
    </div>
  );
}
