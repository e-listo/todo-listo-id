import React, { useState } from 'react';
import { PRDDocument, FeatureItem, PriorityLevel } from '../../types/prd.js';
import { Plus, Trash2, CheckSquare, Ban, Star, Sparkles } from 'lucide-react';

interface FeaturesTabProps {
  doc: PRDDocument;
  onChange: (updates: Partial<PRDDocument>) => void;
}

export const FeaturesTab: React.FC<FeaturesTabProps> = ({ doc, onChange }) => {
  const [newOutScope, setNewOutScope] = useState('');
  const [filterPriority, setFilterPriority] = useState<string>('all');

  const addFeature = () => {
    const newFeat: FeatureItem = {
      id: `feat-${Date.now()}`,
      title: 'Fitur Baru',
      priority: 'P0',
      description: 'Deskripsi lengkap perilaku fitur dan interaksi pengguna.',
      acceptanceCriteria: ['Pengguna dapat menggunakan fitur ini secara mulus.'],
    };
    onChange({ coreFeatures: [...doc.coreFeatures, newFeat] });
  };

  const updateFeature = (id: string, updates: Partial<FeatureItem>) => {
    const updated = doc.coreFeatures.map((f) => (f.id === id ? { ...f, ...updates } : f));
    onChange({ coreFeatures: updated });
  };

  const removeFeature = (id: string) => {
    onChange({ coreFeatures: doc.coreFeatures.filter((f) => f.id !== id) });
  };

  const addCriterion = (featId: string) => {
    const feat = doc.coreFeatures.find((f) => f.id === featId);
    if (!feat) return;
    const updatedCriteria = [...(feat.acceptanceCriteria || []), 'Kriteria penerimaan baru (Given/When/Then)'];
    updateFeature(featId, { acceptanceCriteria: updatedCriteria });
  };

  const updateCriterion = (featId: string, index: number, value: string) => {
    const feat = doc.coreFeatures.find((f) => f.id === featId);
    if (!feat) return;
    const updatedCriteria = [...feat.acceptanceCriteria];
    updatedCriteria[index] = value;
    updateFeature(featId, { acceptanceCriteria: updatedCriteria });
  };

  const removeCriterion = (featId: string, index: number) => {
    const feat = doc.coreFeatures.find((f) => f.id === featId);
    if (!feat) return;
    const updatedCriteria = feat.acceptanceCriteria.filter((_, i) => i !== index);
    updateFeature(featId, { acceptanceCriteria: updatedCriteria });
  };

  const addOutOfScope = () => {
    if (!newOutScope.trim()) return;
    onChange({ outOfScope: [...(doc.outOfScope || []), newOutScope.trim()] });
    setNewOutScope('');
  };

  const removeOutOfScope = (index: number) => {
    const updated = (doc.outOfScope || []).filter((_, i) => i !== index);
    onChange({ outOfScope: updated });
  };

  const filteredFeatures = doc.coreFeatures.filter((f) => {
    if (filterPriority === 'all') return true;
    return f.priority === filterPriority;
  });

  return (
    <div className="space-y-8">
      {/* Top action & Priority stats */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <span>Daftar Fitur & Spesifikasi MoSCoW</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
              {doc.coreFeatures.length} Fitur
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            P0 = Wajib untuk MVP, P1 = Sangat Penting, P2 = Tambahan opsional
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Priority Filter */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs">
            {['all', 'P0', 'P1', 'P2'].map((p) => (
              <button
                key={p}
                onClick={() => setFilterPriority(p)}
                className={`px-2.5 py-1 rounded-md transition ${
                  filterPriority === p ? 'bg-indigo-600 text-white font-medium' : 'text-slate-400 hover:text-white'
                }`}
              >
                {p === 'all' ? 'Semua' : p}
              </button>
            ))}
          </div>

          <button
            onClick={addFeature}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm transition"
            aria-label="Tambah Fitur Baru"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Fitur</span>
          </button>
        </div>
      </div>

      {/* Feature Cards List */}
      <div className="space-y-4">
        {filteredFeatures.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-slate-800 rounded-2xl bg-slate-900/30">
            <CheckSquare className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-400">Belum ada fitur untuk filter ini.</p>
            <button
              onClick={addFeature}
              className="mt-3 text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
            >
              + Buat Fitur Pertama
            </button>
          </div>
        ) : (
          filteredFeatures.map((feat, index) => (
            <div
              key={feat.id}
              className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700/80 transition space-y-4 shadow-sm"
            >
              {/* Card Header: Title & Priority Pill */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3 w-full sm:w-auto flex-1">
                  <span className="font-mono text-xs text-slate-500">#{index + 1}</span>
                  <input
                    type="text"
                    value={feat.title}
                    onChange={(e) => updateFeature(feat.id, { title: e.target.value })}
                    placeholder="Judul Fitur..."
                    className="font-bold text-white text-sm bg-transparent border-b border-transparent hover:border-slate-700 focus:border-indigo-500 focus:outline-none transition px-1 py-0.5 w-full"
                  />
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  {/* Priority selector */}
                  <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-0.5 text-xs">
                    {(['P0', 'P1', 'P2'] as PriorityLevel[]).map((p) => {
                      const isActive = feat.priority === p;
                      const colors =
                        p === 'P0'
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                          : p === 'P1'
                          ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                          : 'bg-slate-700/50 text-slate-300 border-slate-600';
                      return (
                        <button
                          key={p}
                          onClick={() => updateFeature(feat.id, { priority: p })}
                          className={`px-2 py-0.5 rounded text-[11px] font-bold border transition ${
                            isActive ? colors : 'border-transparent text-slate-500 hover:text-slate-300'
                          }`}
                        >
                          {p}
                        </button>
                      );
                    })}
                  </div>

                  {/* Remove Feature */}
                  <button
                    onClick={() => removeFeature(feat.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition"
                    aria-label={`Hapus fitur ${feat.title}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  Deskripsi Fungsional & Cara Kerja
                </label>
                <textarea
                  rows={2}
                  value={feat.description}
                  onChange={(e) => updateFeature(feat.id, { description: e.target.value })}
                  placeholder="Jelaskan apa yang dapat dilakukan pengguna dengan fitur ini..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-indigo-500 transition"
                />
              </div>

              {/* User Story (Optional) */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  User Story (Sebagai... saya ingin... sehingga...)
                </label>
                <input
                  type="text"
                  value={feat.userStory || ''}
                  onChange={(e) => updateFeature(feat.id, { userStory: e.target.value })}
                  placeholder="Sebagai [pengguna], saya ingin [tindakan] sehingga [manfaat]"
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 text-xs focus:outline-none focus:border-indigo-500 transition"
                />
              </div>

              {/* Acceptance Criteria (Crucial for AI Precision!) */}
              <div className="pt-2 border-t border-slate-800/80">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1">
                    <CheckSquare className="w-3.5 h-3.5" />
                    <span>Kriteria Penerimaan (Acceptance Criteria)</span>
                  </span>
                  <button
                    onClick={() => addCriterion(feat.id)}
                    className="text-[11px] text-indigo-400 hover:text-indigo-300 font-semibold"
                  >
                    + Tambah Kriteria
                  </button>
                </div>

                <div className="space-y-1.5">
                  {(feat.acceptanceCriteria || []).map((crit, cIdx) => (
                    <div key={cIdx} className="flex items-center gap-2">
                      <span className="text-[10px] text-indigo-400 font-mono">✓</span>
                      <input
                        type="text"
                        value={crit}
                        onChange={(e) => updateCriterion(feat.id, cIdx, e.target.value)}
                        placeholder="Contoh: Input memvalidasi format email dan tombol disabled saat loading..."
                        className="flex-1 px-2.5 py-1 rounded bg-slate-950/80 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
                      />
                      <button
                        onClick={() => removeCriterion(feat.id, cIdx)}
                        className="text-slate-500 hover:text-rose-400 p-1"
                        aria-label="Hapus kriteria ini"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Out of Scope / Negative Constraints Section (CRITICAL FOR AI!) */}
      <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-900/30 space-y-3">
        <div className="flex items-center gap-2 text-rose-300 font-semibold text-xs">
          <Ban className="w-4 h-4 text-rose-400" />
          <span>Batasan Lingkup yang Sengaja Dikecualikan (Out of Scope Guardrails)</span>
        </div>
        <p className="text-xs text-slate-400">
          AI coding models cenderung membuat fitur berlebihan jika tidak dilarang secara eksplisit. Tentukan batasan apa yang TIDAK boleh dikerjakan sekarang:
        </p>

        {/* Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newOutScope}
            onChange={(e) => setNewOutScope(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addOutOfScope();
              }
            }}
            placeholder="Contoh: Tidak ada pembayaran kartu kredit, tidak ada multi-bahasa pada v1..."
            className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-rose-500"
          />
          <button
            onClick={addOutOfScope}
            className="px-3.5 py-2 rounded-xl bg-rose-600/80 hover:bg-rose-600 text-white text-xs font-semibold transition"
          >
            Tambah Larangan
          </button>
        </div>

        {/* Tag pills */}
        <div className="flex flex-wrap gap-2 pt-1">
          {(doc.outOfScope || []).map((item, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs"
            >
              <span>⛔ {item}</span>
              <button
                onClick={() => removeOutOfScope(idx)}
                className="text-rose-400 hover:text-white ml-1"
                aria-label={`Hapus batasan ${item}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
