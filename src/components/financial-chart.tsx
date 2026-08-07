'use client';

import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  AreaChart,
  Area,
} from 'recharts';
import { FinancialData } from '@/types/ipo';

interface FinancialChartProps {
  financials: FinancialData;
}

export function FinancialChart({ financials }: FinancialChartProps) {
  const [metric, setMetric] = useState<'revenue' | 'pat' | 'ebitda' | 'all'>('all');

  const chartData = financials.years.map((year, index) => ({
    year,
    Revenue: financials.revenue[index] ?? 0,
    EBITDA: financials.ebitda[index] ?? 0,
    PAT: financials.pat[index] ?? 0,
    NetWorth: financials.netWorth[index] ?? 0,
  }));

  return (
    <div className="flex flex-col gap-4 p-5 rounded-xl bg-slate-900/80 border border-slate-800 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-slate-100 flex items-center gap-2">
            <span>Financial Growth & Profitability</span>
            <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono">
              {financials.isRestated ? 'Restated' : 'Audited'} ({financials.revenueUnit})
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Multi-year trend analysis compiled from SEBI RHP filings
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setMetric('all')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
              metric === 'all'
                ? 'bg-emerald-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Comparison
          </button>
          <button
            onClick={() => setMetric('revenue')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
              metric === 'revenue'
                ? 'bg-sky-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Revenue
          </button>
          <button
            onClick={() => setMetric('pat')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
              metric === 'pat'
                ? 'bg-indigo-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            PAT (Net Profit)
          </button>
        </div>
      </div>

      <div className="h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          {metric === 'all' ? (
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="year" stroke="#64748b" fontSize={12} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} tickFormatter={(v) => `${v}`} />
              <Tooltip
                cursor={{ fill: 'transparent' }}
                contentStyle={{
                  backgroundColor: '#090d16',
                  borderColor: '#334155',
                  borderRadius: '8px',
                  color: '#f8fafc',
                  fontSize: '12px',
                }}
                formatter={(value) => [`₹${Number(value || 0).toLocaleString('en-IN')} Cr`, '']}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Bar dataKey="Revenue" fill="#0ea5e9" radius={[4, 4, 0, 0]} name="Total Revenue" />
              <Bar dataKey="EBITDA" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="EBITDA" />
              <Bar dataKey="PAT" fill="#10b981" radius={[4, 4, 0, 0]} name="Net Profit (PAT)" />
            </BarChart>
          ) : metric === 'revenue' ? (
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="year" stroke="#64748b" fontSize={12} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
              <Tooltip
                cursor={{ stroke: 'rgba(255, 255, 255, 0.2)', strokeWidth: 1, strokeDasharray: '3 3' }}
                contentStyle={{
                  backgroundColor: '#090d16',
                  borderColor: '#334155',
                  borderRadius: '8px',
                  color: '#f8fafc',
                  fontSize: '12px',
                }}
                formatter={(value) => [`₹${Number(value || 0).toLocaleString('en-IN')} Cr`, 'Revenue']}
              />
              <Area
                type="monotone"
                dataKey="Revenue"
                stroke="#0ea5e9"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          ) : (
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPat" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="year" stroke="#64748b" fontSize={12} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
              <Tooltip
                cursor={{ stroke: 'rgba(255, 255, 255, 0.2)', strokeWidth: 1, strokeDasharray: '3 3' }}
                contentStyle={{
                  backgroundColor: '#090d16',
                  borderColor: '#334155',
                  borderRadius: '8px',
                  color: '#f8fafc',
                  fontSize: '12px',
                }}
                formatter={(value) => [`₹${Number(value || 0).toLocaleString('en-IN')} Cr`, 'Net Profit']}
              />
              <Area
                type="monotone"
                dataKey="PAT"
                stroke="#10b981"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorPat)"
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Financial Table Summary */}
      <div className="overflow-x-auto mt-2 pt-3 border-t border-slate-800">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="text-slate-400 border-b border-slate-800">
              <th className="pb-2 font-medium">Metric</th>
              {financials.years.map((y) => (
                <th key={y} className="pb-2 font-medium text-right">
                  {y}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-200">
            <tr>
              <td className="py-2 text-slate-400 font-medium">Total Revenue</td>
              {financials.revenue.map((val, i) => (
                <td key={i} className="py-2 text-right font-mono text-sky-400">
                  ₹{val.toLocaleString('en-IN')} Cr
                </td>
              ))}
            </tr>
            <tr>
              <td className="py-2 text-slate-400 font-medium">EBITDA</td>
              {financials.ebitda.map((val, i) => (
                <td key={i} className="py-2 text-right font-mono text-purple-400">
                  ₹{val.toLocaleString('en-IN')} Cr
                </td>
              ))}
            </tr>
            <tr>
              <td className="py-2 text-slate-400 font-medium">Profit After Tax (PAT)</td>
              {financials.pat.map((val, i) => (
                <td key={i} className={`py-2 text-right font-mono font-semibold ${val >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  ₹{val.toLocaleString('en-IN')} Cr
                </td>
              ))}
            </tr>
            <tr>
              <td className="py-2 text-slate-400 font-medium">Net Worth</td>
              {financials.netWorth.map((val, i) => (
                <td key={i} className="py-2 text-right font-mono text-slate-300">
                  ₹{val.toLocaleString('en-IN')} Cr
                </td>
              ))}
            </tr>
            <tr>
              <td className="py-2 text-slate-400 font-medium">Operating Cash Flow</td>
              {financials.operatingCashFlow.map((val, i) => (
                <td key={i} className={`py-2 text-right font-mono ${val >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  ₹{val.toLocaleString('en-IN')} Cr
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
