import React from 'react';
import { PRDDocument } from '../../types/prd.js';
import { Lightbulb, Info, Target, HelpCircle } from 'lucide-react';

interface OverviewTabProps {
  doc: PRDDocument;
  onChange: (updates: Partial<PRDDocument>) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ doc, onChange }) => {
  return (
    <div className="space-y-6">
      {/* Header Info Banner */}
      <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-start gap-3 text-indigo-300 text-xs">
        <Lightbulb className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-indigo-200">
            Mengapa Visi & Problem Statement Sangat Krusial untuk AI?
          </p>
          <p className="text-slate-300 leading-relaxed">
            AI coding models (seperti Claude, Gemini, atau GPT) sering membuat asumsi salah tentang alur bisnis jika tidak diberikan masalah nyata dan persona pengguna. Menjelaskan secara spesifik "Siapa yang menggunakan" dan "Rasa sakit apa yang diselesaikan" mengunci fokus model ke solusi yang tepat.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* App Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Nama Aplikasi / Proyek <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            value={doc.appName}
            onChange={(e) => onChange({ appName: e.target.value })}
            placeholder="Contoh: SpecCraft, TaskPulse, PocketVault"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500 transition"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Kategori / Tipe Produk
          </label>
          <input
            type="text"
            value={doc.category}
            onChange={(e) => onChange({ category: e.target.value })}
            placeholder="Contoh: Productivity, Task Management, SaaS"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500 transition"
          />
        </div>

        {/* Target Deployment URL */}
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-sky-400">
              <span>Target URL Deployment (Alamat Web Produksi)</span>
            </span>
            <span className="text-[11px] font-mono text-slate-500">contoh: https://todo.listo.id</span>
          </label>
          <input
            type="url"
            value={doc.deployUrl || ''}
            onChange={(e) => onChange({ deployUrl: e.target.value })}
            placeholder="https://todo.listo.id"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sky-300 text-sm focus:outline-none focus:border-sky-500 transition"
          />
        </div>

        {/* Tagline */}
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Tagline & Proposisi Singkat <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            value={doc.tagline}
            onChange={(e) => onChange({ tagline: e.target.value })}
            placeholder="Satu kalimat tajam yang merangkum apa yang dilakukan aplikasi ini"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500 transition"
          />
        </div>

        {/* Target Audience */}
        <div className="md:col-span-2">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-indigo-400" />
              <span>Target Pengguna & Karakteristik Persona</span>
            </label>
            <span className="text-[11px] text-slate-500">Membantu AI menyelaraskan UX tone</span>
          </div>
          <textarea
            rows={2}
            value={doc.targetAudience}
            onChange={(e) => onChange({ targetAudience: e.target.value })}
            placeholder="Contoh: Product Manager, Software Engineer, Solo Founder, atau pengguna awam yang memerlukan kemudahan satu klik..."
            className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500 transition"
          />
        </div>

        {/* Problem Statement */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-slate-300">
              Masalah Nyata (Problem Statement) <span className="text-rose-400">*</span>
            </label>
          </div>
          <textarea
            rows={4}
            value={doc.problemStatement}
            onChange={(e) => onChange({ problemStatement: e.target.value })}
            placeholder="Jelaskan secara spesifik friksi atau kesulitan yang dialami target pengguna saat ini tanpa aplikasi Anda..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500 transition"
          />
        </div>

        {/* Value Proposition */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-slate-300">
              Solusi & Nilai Tambah (Value Proposition) <span className="text-rose-400">*</span>
            </label>
          </div>
          <textarea
            rows={4}
            value={doc.valueProposition}
            onChange={(e) => onChange({ valueProposition: e.target.value })}
            placeholder="Bagaimana aplikasi ini memecahkan masalah tersebut dengan cara yang lebih cepat, hemat, atau elegan..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500 transition"
          />
        </div>
      </div>
    </div>
  );
};
