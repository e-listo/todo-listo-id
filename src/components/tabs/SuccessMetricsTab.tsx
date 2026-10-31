import React from 'react';
import { PRDDocument, SuccessMetric } from '../../types/prd.js';
import { Target, Plus, Trash2, Trophy } from 'lucide-react';

interface SuccessMetricsTabProps {
  doc: PRDDocument;
  onChange: (updates: Partial<PRDDocument>) => void;
}

export const SuccessMetricsTab: React.FC<SuccessMetricsTabProps> = ({ doc, onChange }) => {
  const addMetric = () => {
    const newMetric: SuccessMetric = {
      id: `sm-${Date.now()}`,
      metric: 'Metrik kesuksesan produk baru',
      targetGoal: 'Target yang dapat diukur (misal: > 80% kepuasan pengguna)',
    };
    onChange({ successMetrics: [...(doc.successMetrics || []), newMetric] });
  };

  const updateMetric = (id: string, updates: Partial<SuccessMetric>) => {
    const updated = (doc.successMetrics || []).map((m) => (m.id === id ? { ...m, ...updates } : m));
    onChange({ successMetrics: updated });
  };

  const removeMetric = (id: string) => {
    onChange({ successMetrics: (doc.successMetrics || []).filter((m) => m.id !== id) });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Metrik Keberhasilan & Indikator Kunci (KPIs)</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Definisikan tolak ukur keberhasilan rilis MVP agar tim fokus pada hasil konkret.
          </p>
        </div>

        <button
          onClick={addMetric}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-600 hover:bg-amber-500 text-white shadow-sm transition"
          aria-label="Tambah Metrik Keberhasilan"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Metrik</span>
        </button>
      </div>

      <div className="space-y-3">
        {(doc.successMetrics || []).map((metric, idx) => (
          <div
            key={metric.id}
            className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center gap-3"
          >
            <div className="flex items-center gap-2 flex-1 w-full">
              <span className="font-mono text-xs text-amber-400 font-bold">#{idx + 1}</span>
              <input
                type="text"
                value={metric.metric}
                onChange={(e) => updateMetric(metric.id, { metric: e.target.value })}
                placeholder="Metrik (misal: Kecepatan pengerjaan tugas oleh pengguna)"
                className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="text"
                value={metric.targetGoal}
                onChange={(e) => updateMetric(metric.id, { targetGoal: e.target.value })}
                placeholder="Target Goal (< 1 menit per sesi)"
                className="w-full sm:w-64 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-emerald-300 text-xs focus:outline-none focus:border-amber-500"
              />
              <button
                onClick={() => removeMetric(metric.id)}
                className="p-1.5 text-slate-500 hover:text-rose-400 rounded transition"
                aria-label={`Hapus metrik ${metric.metric}`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
