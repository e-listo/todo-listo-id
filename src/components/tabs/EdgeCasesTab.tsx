import React from 'react';
import { PRDDocument, EdgeCaseScenario, NonFunctionalReq } from '../../types/prd.js';
import { ShieldAlert, Plus, Trash2, Gauge, AlertTriangle } from 'lucide-react';

interface EdgeCasesTabProps {
  doc: PRDDocument;
  onChange: (updates: Partial<PRDDocument>) => void;
}

export const EdgeCasesTab: React.FC<EdgeCasesTabProps> = ({ doc, onChange }) => {
  // Edge cases handlers
  const addEdgeCase = () => {
    const newEc: EdgeCaseScenario = {
      id: `ec-${Date.now()}`,
      scenario: 'Pengguna melakukan aksi tidak wajar atau kehilangan jaringan',
      expectedBehavior: 'Sistem menampilkan pesan error ramah dan mempertahankan data lokal',
      fallbackOrRecovery: 'Otomatis retry atau simpan sementara',
    };
    onChange({ edgeCases: [...(doc.edgeCases || []), newEc] });
  };

  const updateEdgeCase = (id: string, updates: Partial<EdgeCaseScenario>) => {
    const updated = (doc.edgeCases || []).map((e) => (e.id === id ? { ...e, ...updates } : e));
    onChange({ edgeCases: updated });
  };

  const removeEdgeCase = (id: string) => {
    onChange({ edgeCases: (doc.edgeCases || []).filter((e) => e.id !== id) });
  };

  // NFR handlers
  const addNfr = () => {
    const newNfr: NonFunctionalReq = {
      id: `nfr-${Date.now()}`,
      category: 'Performance',
      requirement: 'Waktu load awal di bawah batas tertentu',
      metric: '< 1.5 detik',
    };
    onChange({ nonFunctional: [...(doc.nonFunctional || []), newNfr] });
  };

  const updateNfr = (id: string, updates: Partial<NonFunctionalReq>) => {
    const updated = (doc.nonFunctional || []).map((n) => (n.id === id ? { ...n, ...updates } : n));
    onChange({ nonFunctional: updated });
  };

  const removeNfr = (id: string) => {
    onChange({ nonFunctional: (doc.nonFunctional || []).filter((n) => n.id !== id) });
  };

  return (
    <div className="space-y-8">
      {/* Edge Cases Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>Skenario Ekstrem & Penanganan Error (Edge Cases)</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                {(doc.edgeCases || []).length} Skenario
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Instruksi eksplisit pada skenario gagal mencegah AI mengabaikan try/catch, validasi formulir, dan race conditions.
            </p>
          </div>

          <button
            onClick={addEdgeCase}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-600 hover:bg-amber-500 text-white shadow-sm transition"
            aria-label="Tambah Skenario Edge Case"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Edge Case</span>
          </button>
        </div>

        <div className="space-y-3">
          {(doc.edgeCases || []).length === 0 ? (
            <div className="text-center py-8 border border-dashed border-slate-800 rounded-2xl bg-slate-900/30">
              <AlertTriangle className="w-6 h-6 text-amber-500/50 mx-auto mb-2" />
              <p className="text-xs text-slate-400">Belum ada edge case didefinisikan.</p>
              <button
                onClick={addEdgeCase}
                className="mt-2 text-xs text-amber-400 hover:text-amber-300 font-semibold"
              >
                + Tambah Skenario Ekstrem (misal: Jaringan putus, input kosong)
              </button>
            </div>
          ) : (
            doc.edgeCases.map((ec, idx) => (
              <div
                key={ec.id}
                className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 flex-1">
                    <span className="font-mono text-xs text-amber-400 font-bold">#{idx + 1}</span>
                    <input
                      type="text"
                      value={ec.scenario}
                      onChange={(e) => updateEdgeCase(ec.id, { scenario: e.target.value })}
                      placeholder="Skenario (misal: Pengguna mengklik tombol submit berkali-kali dengan cepat)"
                      className="font-semibold text-slate-200 text-xs bg-transparent border-b border-transparent hover:border-slate-700 focus:border-amber-500 focus:outline-none transition px-1 py-0.5 w-full"
                    />
                  </div>

                  <button
                    onClick={() => removeEdgeCase(ec.id)}
                    className="p-1 text-slate-500 hover:text-rose-400 rounded transition"
                    aria-label={`Hapus edge case ${idx + 1}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                      Perilaku Sistem yang Diharapkan
                    </label>
                    <textarea
                      rows={2}
                      value={ec.expectedBehavior}
                      onChange={(e) => updateEdgeCase(ec.id, { expectedBehavior: e.target.value })}
                      placeholder="Apa yang seharusnya terjadi pada UI dan state..."
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                      Mitigasi / Mekanisme Fallback
                    </label>
                    <textarea
                      rows={2}
                      value={ec.fallbackOrRecovery}
                      onChange={(e) => updateEdgeCase(ec.id, { fallbackOrRecovery: e.target.value })}
                      placeholder="Cara sistem memulihkan diri jika kegagalan terjadi..."
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Non-Functional Requirements Section */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Gauge className="w-4 h-4 text-sky-400" />
              <span>Persyaratan Non-Fungsional (Kualitas & Performa)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Standar baku seperti latensi interaksi, aksesibilitas screen reader, dan keamanan data.
            </p>
          </div>

          <button
            onClick={addNfr}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-sky-600 hover:bg-sky-500 text-white shadow-sm transition"
            aria-label="Tambah Persyaratan Non-Fungsional"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah NFR</span>
          </button>
        </div>

        <div className="space-y-3">
          {(doc.nonFunctional || []).map((nfr) => (
            <div
              key={nfr.id}
              className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center gap-3"
            >
              <select
                value={nfr.category}
                onChange={(e) => updateNfr(nfr.id, { category: e.target.value as any })}
                className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-sky-300 text-xs font-semibold focus:outline-none focus:border-sky-500"
              >
                <option value="Performance">⚡ Performa</option>
                <option value="Security">🔒 Keamanan</option>
                <option value="UX/Accessibility">♿ Aksesibilitas / UX</option>
                <option value="Reliability">🛡️ Keandalan</option>
              </select>

              <input
                type="text"
                value={nfr.requirement}
                onChange={(e) => updateNfr(nfr.id, { requirement: e.target.value })}
                placeholder="Persyaratan teknis..."
                className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-sky-500"
              />

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <input
                  type="text"
                  value={nfr.metric}
                  onChange={(e) => updateNfr(nfr.id, { metric: e.target.value })}
                  placeholder="Target Metrik (< 100ms)"
                  className="w-32 px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-emerald-300 text-xs focus:outline-none focus:border-sky-500"
                />
                <button
                  onClick={() => removeNfr(nfr.id)}
                  className="p-1.5 text-slate-500 hover:text-rose-400 rounded"
                  aria-label="Hapus NFR ini"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
