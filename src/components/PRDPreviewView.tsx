import React, { useState } from 'react';
import { PRDDocument } from '../types/prd.js';
import { exportPRDToMarkdown } from '../utils/markdownExporter.js';
import {
  Download,
  Copy,
  Check,
  Printer,
  FileText,
  Code,
  Eye,
  CheckCircle2,
  Layers,
  Database,
  ShieldAlert,
  Target
} from 'lucide-react';

interface PRDPreviewViewProps {
  doc: PRDDocument;
}

export const PRDPreviewView: React.FC<PRDPreviewViewProps> = ({ doc }) => {
  const [viewMode, setViewMode] = useState<'rendered' | 'raw'>('rendered');
  const [copied, setCopied] = useState(false);

  const markdownContent = exportPRDToMarkdown(doc);

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${doc.appName || 'product'}-prd-spec.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Controls Toolbar */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm print:hidden">
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-1 text-xs font-semibold">
            <button
              onClick={() => setViewMode('rendered')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                viewMode === 'rendered'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Tampilan Dokumen Eksekutif</span>
            </button>
            <button
              onClick={() => setViewMode('raw')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                viewMode === 'raw'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Raw Markdown</span>
            </button>
          </div>

          <span className="text-xs text-slate-400 hidden lg:inline">
            Standar PRD siap dibagikan ke stakeholder atau tim engineering.
          </span>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          <button
            onClick={handleCopy}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition ${
              copied
                ? 'bg-emerald-600 text-white border-emerald-500'
                : 'bg-slate-800 border-slate-700 text-slate-200 hover:text-white hover:bg-slate-700'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-200" />
                <span>PRD Disalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-emerald-400" />
                <span>Salin Markdown</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Unduh .MD</span>
          </button>

          <button
            onClick={handlePrint}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
            title="Cetak atau Simpan PDF"
            aria-label="Cetak atau Simpan PDF"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Document Body */}
      {viewMode === 'raw' ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 shadow-xl">
          <pre className="font-mono text-xs text-slate-200 leading-relaxed overflow-x-auto whitespace-pre-wrap select-all">
            {markdownContent}
          </pre>
        </div>
      ) : (
        <div className="p-6 sm:p-10 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-200 shadow-xl space-y-8 max-w-4xl mx-auto print:bg-white print:text-black print:border-none print:shadow-none print:p-0">
          {/* Header Title Banner */}
          <div className="border-b border-slate-800 pb-6 print:border-black">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 print:border-black print:text-black">
                {doc.category || 'Aplikasi Web'}
              </span>
              <span className="text-[11px] font-mono text-slate-400 print:text-black">
                Versi {doc.version || '1.0.0'}
              </span>
              <span className="text-[11px] text-slate-500 print:text-black">• PRD Ready for AI</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight print:text-black">
              {doc.appName || 'ToDo'}
            </h1>
            <p className="text-sm text-slate-400 italic mt-1 print:text-black">
              "{doc.tagline || 'Tagline produk'}"
            </p>
            {doc.deployUrl && (
              <div className="mt-2.5 flex items-center gap-2 text-xs">
                <span className="text-slate-400">Target Deployment:</span>
                <a
                  href={doc.deployUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-sky-400 hover:text-sky-300 font-semibold underline print:text-black"
                >
                  {doc.deployUrl}
                </a>
              </div>
            )}
          </div>

          {/* Section 1: Ringkasan Eksekutif */}
          <section className="space-y-4">
            <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2 print:text-black">
              <Target className="w-4 h-4 text-indigo-400 print:text-black" />
              <span>1. Ringkasan Eksekutif & Visi Produk</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 print:border-gray-300 print:bg-white">
                <h3 className="font-semibold text-rose-400 mb-1 print:text-black">
                  Masalah Nyata (Problem Statement)
                </h3>
                <p className="text-slate-300 leading-relaxed print:text-black">
                  {doc.problemStatement || 'Belum diisi.'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 print:border-gray-300 print:bg-white">
                <h3 className="font-semibold text-emerald-400 mb-1 print:text-black">
                  Solusi & Nilai Tambah (Value Proposition)
                </h3>
                <p className="text-slate-300 leading-relaxed print:text-black">
                  {doc.valueProposition || 'Belum diisi.'}
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs print:border-gray-300 print:bg-white">
              <span className="font-semibold text-slate-300 print:text-black">Target Pengguna: </span>
              <span className="text-slate-400 print:text-black">{doc.targetAudience || 'Pengguna umum.'}</span>
            </div>
          </section>

          {/* Section 2: Tech Stack Matrix */}
          <section className="space-y-3">
            <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2 print:text-black">
              <Layers className="w-4 h-4 text-sky-400 print:text-black" />
              <span>2. Arsitektur Teknis & Tech Stack</span>
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[11px] print:border-black">
                    <th className="py-2 font-semibold">Komponen Arsitektur</th>
                    <th className="py-2 font-semibold">Teknologi / Library Terpilih</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 print:divide-gray-300">
                  <tr>
                    <td className="py-2 font-medium text-slate-300 print:text-black">Frontend Framework</td>
                    <td className="py-2 font-mono text-sky-300 print:text-black">{doc.techStack.frontend}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-slate-300 print:text-black">Styling & UI Kit</td>
                    <td className="py-2 font-mono text-sky-300 print:text-black">{doc.techStack.styling}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-slate-300 print:text-black">Backend API</td>
                    <td className="py-2 font-mono text-sky-300 print:text-black">{doc.techStack.backend}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-slate-300 print:text-black">Database</td>
                    <td className="py-2 font-mono text-sky-300 print:text-black">{doc.techStack.database}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-slate-300 print:text-black">Autentikasi</td>
                    <td className="py-2 font-mono text-sky-300 print:text-black">{doc.techStack.auth}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-slate-300 print:text-black">State Management</td>
                    <td className="py-2 font-mono text-sky-300 print:text-black">{doc.techStack.stateManagement}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-slate-300 print:text-black">Integrasi Eksternal</td>
                    <td className="py-2 font-mono text-slate-300 print:text-black">
                      {doc.techStack.thirdPartyApis?.join(', ') || 'N/A'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 3: Core Features (MoSCoW) */}
          <section className="space-y-4">
            <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2 print:text-black">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 print:text-black" />
              <span>3. Spesifikasi Fitur Utama (MoSCoW)</span>
            </h2>

            <div className="space-y-3">
              {doc.coreFeatures.map((feat, idx) => (
                <div
                  key={feat.id}
                  className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs print:border-gray-300 print:bg-white"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm print:text-black">
                      {idx + 1}. {feat.title}
                    </span>
                    <span
                      className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded border ${
                        feat.priority === 'P0'
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                          : feat.priority === 'P1'
                          ? 'bg-sky-500/20 text-sky-300 border-sky-500/30'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      {feat.priority}
                    </span>
                  </div>
                  <p className="text-slate-300 leading-relaxed print:text-black">{feat.description}</p>
                  {feat.userStory && (
                    <p className="text-slate-400 italic text-[11px] print:text-black">
                      Story: "{feat.userStory}"
                    </p>
                  )}
                  {feat.acceptanceCriteria?.length > 0 && (
                    <div className="pt-2 border-t border-slate-800/80">
                      <span className="font-semibold text-slate-400 text-[11px]">Acceptance Criteria:</span>
                      <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-300 text-[11px]">
                        {feat.acceptanceCriteria.map((c, cIdx) => (
                          <li key={cIdx}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: Data Models */}
          {doc.dataModels && doc.dataModels.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2 print:text-black">
                <Database className="w-4 h-4 text-emerald-400 print:text-black" />
                <span>4. Entitas & Skema Data</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {doc.dataModels.map((m) => (
                  <div
                    key={m.id}
                    className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-2 print:border-gray-300 print:bg-white"
                  >
                    <div className="font-bold text-emerald-400 font-mono print:text-black">
                      {m.entityName}
                    </div>
                    <p className="text-slate-400 text-[11px]">{m.description}</p>
                    <div className="pt-1 border-t border-slate-800/80 space-y-1">
                      {m.fields.map((f, fIdx) => (
                        <div key={fIdx} className="flex items-center justify-between font-mono text-[11px]">
                          <span className="text-slate-300 print:text-black">{f.name}</span>
                          <span className="text-sky-300 print:text-black">{f.type}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section 5: Edge Cases */}
          {doc.edgeCases && doc.edgeCases.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2 print:text-black">
                <ShieldAlert className="w-4 h-4 text-amber-400 print:text-black" />
                <span>5. Penanganan Kasus Ekstrem & Error (Edge Cases)</span>
              </h2>

              <div className="space-y-2 text-xs">
                {doc.edgeCases.map((ec, idx) => (
                  <div
                    key={ec.id}
                    className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1 print:border-gray-300 print:bg-white"
                  >
                    <div className="font-semibold text-amber-300 print:text-black">
                      Skenario #{idx + 1}: {ec.scenario}
                    </div>
                    <p className="text-slate-300 print:text-black">
                      <strong>Ekspektasi:</strong> {ec.expectedBehavior}
                    </p>
                    <p className="text-slate-400 text-[11px] print:text-black">
                      <strong>Mitigasi:</strong> {ec.fallbackOrRecovery}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Footer note */}
          <div className="pt-6 border-t border-slate-800 text-center text-xs text-slate-500 print:text-black">
            Dokumen disusun dengan SpecCraft PRD Maker • Siap untuk Engineering Hand-Off dan AI Coder Prompting.
          </div>
        </div>
      )}
    </div>
  );
};
