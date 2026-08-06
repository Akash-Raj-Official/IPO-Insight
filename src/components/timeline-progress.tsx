import React from 'react';

interface TimelineProps {
  openDate: string;
  closeDate: string;
  allotmentDate?: string;
  listingDate: string;
  status: 'UPCOMING' | 'OPEN' | 'CLOSED' | 'LISTED';
}

export function TimelineProgress({
  openDate,
  closeDate,
  allotmentDate,
  listingDate,
  status,
}: TimelineProps) {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'TBD';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  const steps = [
    { label: 'Issue Opens', date: openDate, activeStatus: ['OPEN', 'CLOSED', 'LISTED'] },
    { label: 'Issue Closes', date: closeDate, activeStatus: ['CLOSED', 'LISTED'] },
    { label: 'Basis of Allotment', date: allotmentDate || 'TBD', activeStatus: ['LISTED'] },
    { label: 'Listing Date', date: listingDate, activeStatus: ['LISTED'] },
  ];

  return (
    <div className="w-full py-2">
      <div className="grid grid-cols-4 gap-2 relative">
        {/* Connecting line */}
        <div className="absolute top-3 left-[12%] right-[12%] h-0.5 bg-slate-800 -z-0" />
        
        {steps.map((step, idx) => {
          const isDone = step.activeStatus.includes(status);
          const isCurrent =
            (status === 'OPEN' && idx === 0) ||
            (status === 'CLOSED' && idx === 1) ||
            (status === 'LISTED' && idx === 3);

          return (
            <div key={idx} className="flex flex-col items-center text-center relative z-10">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  isCurrent
                    ? 'bg-emerald-500 text-slate-950 ring-4 ring-emerald-500/20'
                    : isDone
                    ? 'bg-emerald-600/80 text-white'
                    : 'bg-slate-800 text-slate-500 border border-slate-700'
                }`}
              >
                {isDone ? '✓' : idx + 1}
              </div>
              <span className="text-[11px] font-medium text-slate-300 mt-2 truncate w-full">
                {step.label}
              </span>
              <span className="text-[10px] text-slate-500 mt-0.5">{formatDate(step.date)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
