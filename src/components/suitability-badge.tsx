import React from 'react';

interface SuitabilityBadgeProps {
  score: number;
  label: string;
  color: 'green' | 'yellow' | 'orange' | 'red';
  showBar?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function SuitabilityBadge({
  score,
  label,
  color,
  showBar = false,
  size = 'md',
}: SuitabilityBadgeProps) {
  const getColorClasses = (c: string) => {
    switch (c) {
      case 'green':
        return {
          bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
          bar: 'bg-emerald-500',
          dot: 'bg-emerald-400',
        };
      case 'yellow':
        return {
          bg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
          bar: 'bg-amber-500',
          dot: 'bg-amber-400',
        };
      case 'orange':
        return {
          bg: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
          bar: 'bg-orange-500',
          dot: 'bg-orange-400',
        };
      case 'red':
        return {
          bg: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
          bar: 'bg-rose-500',
          dot: 'bg-rose-400',
        };
      default:
        return {
          bg: 'bg-slate-500/10 text-slate-400 border-slate-500/30',
          bar: 'bg-slate-500',
          dot: 'bg-slate-400',
        };
    }
  };

  const style = getColorClasses(color);

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1.5',
    md: 'text-xs px-2.5 py-1 gap-2 font-medium',
    lg: 'text-sm px-3 py-1.5 gap-2.5 font-semibold',
  }[size];

  return (
    <div className="flex flex-col gap-1.5 inline-block">
      <div
        className={`inline-flex items-center rounded-full border ${style.bg} ${sizeClasses}`}
      >
        <span className={`w-2 h-2 rounded-full ${style.dot} animate-pulse`} />
        <span>{score}/100</span>
        <span className="opacity-40">•</span>
        <span className="truncate">{label}</span>
      </div>
      {showBar && (
        <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
          <div
            className={`h-full ${style.bar} transition-all duration-500`}
            style={{ width: `${Math.min(100, Math.max(0, score))}%` }}
          />
        </div>
      )}
    </div>
  );
}
