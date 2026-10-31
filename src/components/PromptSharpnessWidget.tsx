import React, { useState } from 'react';
import {
  ShieldAlert,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Flame,
  ArrowRight
} from 'lucide-react';
import { SharpnessResult } from '../utils/sharpnessAudit.js';

interface PromptSharpnessWidgetProps {
  audit: SharpnessResult;
  onNavigateTab?: (tabKey: string) => void;
}

export const PromptSharpnessWidget: React.FC<PromptSharpnessWidgetProps> = ({
  audit,
  onNavigateTab,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getScoreColor = (score: number) => {
    if (score >= 88) return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
    if (score >= 70) return 'text-sky-400 border-sky-500/30 bg-sky-500/10';
    if (score >= 50) return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
    return 'text-rose-400 border-rose-500/30 bg-rose-500/10';
  };

  const getProgressBg = (score: number) => {
    if (score >= 88) return 'bg-emerald-500';
    if (score >= 70) return 'bg-sky-500';
    if (score >= 50) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Left: Score & Verdict */}
        <div className="flex items-center gap-4">
          <div
            className={`w-14 h-14 rounded-2xl border flex flex-col items-center justify-center font-mono shrink-0 shadow-inner ${getScoreColor(
              audit.totalScore
            )}`}
          >
            <span className="text-xl font-black leading-none">{audit.totalScore}</span>
            <span className="text-[10px] font-medium opacity-70">/100</span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Audit Ketajaman Prompt AI
              </span>
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${getScoreColor(
                  audit.totalScore
                )}`}
              >
                {audit.ratingLabel}
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5 line-clamp-1 max-w-xl">
              {audit.summary}
            </p>
          </div>
        </div>

        {/* Right: Progress bar & Expand Toggle */}
        <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-3 self-end sm:self-center">
          <div className="w-32 hidden md:block">
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${getProgressBg(audit.totalScore)}`}
                style={{ width: `${audit.totalScore}%` }}
              />
            </div>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-lg transition"
            aria-expanded={isExpanded}
            aria-label="Tampilkan rincian audit ketajaman prompt"
          >
            <span>{isExpanded ? 'Tutup Rincian' : 'Lihat Analisis Celah'}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Expanded Breakdown */}
      {isExpanded && (
        <div className="mt-5 pt-4 border-t border-slate-800/80 space-y-4">
          {/* Actionable Suggestions */}
          {audit.actionableImprovements.length > 0 && (
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-amber-200">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>Tips Cepat Menaikkan Skor ke 90+ (Bebas Halusinasi AI):</span>
              </div>
              <ul className="list-disc list-inside space-y-1 pl-1 text-slate-300">
                {audit.actionableImprovements.map((tip, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Criteria Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {audit.criteria.map((item) => (
              <div
                key={item.id}
                className={`p-3 rounded-xl border text-xs transition ${
                  item.passed
                    ? 'bg-slate-900/40 border-slate-800 text-slate-300'
                    : 'bg-slate-900/60 border-amber-500/30 text-amber-200/90'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="font-semibold text-slate-200">{item.name}</span>
                  <span
                    className={`font-mono text-[11px] font-bold px-1.5 py-0.5 rounded ${
                      item.passed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                    }`}
                  >
                    {item.score}/{item.maxScore}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">{item.advice}</p>
                <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500">
                  <span>Kategori: {item.category}</span>
                  {item.passed ? (
                    <span className="flex items-center gap-1 text-emerald-400">
                      <CheckCircle2 className="w-3 h-3" /> Lolos
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-amber-400">
                      <ShieldAlert className="w-3 h-3" /> Perlu Detail
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
