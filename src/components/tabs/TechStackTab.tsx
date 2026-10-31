import React, { useState } from 'react';
import { PRDDocument, TechStackConfig } from '../../types/prd.js';
import { Layers, Zap, Plus, Trash2, Cpu } from 'lucide-react';

interface TechStackTabProps {
  doc: PRDDocument;
  onChange: (updates: Partial<PRDDocument>) => void;
}

const PRESET_STACKS: { name: string; desc: string; config: TechStackConfig }[] = [
  {
    name: 'AI Studio / Vite Full-Stack',
    desc: 'React 19 + Tailwind v4 + Express backend proxy + Gemini AI SDK',
    config: {
      frontend: 'React 19 + TypeScript (Vite)',
      styling: 'Tailwind CSS v4 (Utility-first)',
      backend: 'Express.js Node API Proxy',
      database: 'Browser LocalStorage / Cloud Firestore',
      auth: 'Local Session / Firebase Auth',
      stateManagement: 'React State + Custom Storage Hooks',
      thirdPartyApis: ['Google Gemini API (@google/genai)', 'Lucide Icons'],
    },
  },
  {
    name: 'Next.js 15 Modern Full-Stack',
    desc: 'Next.js App Router + TypeScript + Tailwind + PostgreSQL (Drizzle ORM)',
    config: {
      frontend: 'Next.js 15 App Router + React 19',
      styling: 'Tailwind CSS + shadcn/ui',
      backend: 'Next.js Server Actions & Route Handlers',
      database: 'PostgreSQL with Drizzle ORM',
      auth: 'NextAuth.js (Auth.js) / Supabase Auth',
      stateManagement: 'TanStack React Query + Zustand',
      thirdPartyApis: ['Resend (Email API)', 'Stripe Payments'],
    },
  },
  {
    name: 'Mobile-First PWA (Offline Ready)',
    desc: 'React + Vite PWA + Tailwind Mobile + IndexedDB Local Storage',
    config: {
      frontend: 'React + TypeScript PWA (Service Worker)',
      styling: 'Tailwind CSS Mobile Viewport Optimized',
      backend: 'Lightweight Node.js or Client Offline-First',
      database: 'IndexedDB with LocalStorage Fallback',
      auth: 'Biometric / PIN Passcode Local Session',
      stateManagement: 'Zustand with LocalStorage Persistence',
      thirdPartyApis: ['Web Share API', 'Canvas Charts'],
    },
  },
];

export const TechStackTab: React.FC<TechStackTabProps> = ({ doc, onChange }) => {
  const [newApi, setNewApi] = useState('');

  const updateStack = (field: keyof TechStackConfig, value: any) => {
    onChange({
      techStack: {
        ...doc.techStack,
        [field]: value,
      },
    });
  };

  const applyPreset = (preset: TechStackConfig) => {
    onChange({ techStack: { ...preset } });
  };

  const addApi = () => {
    if (!newApi.trim()) return;
    const currentApis = doc.techStack.thirdPartyApis || [];
    updateStack('thirdPartyApis', [...currentApis, newApi.trim()]);
    setNewApi('');
  };

  const removeApi = (index: number) => {
    const currentApis = doc.techStack.thirdPartyApis || [];
    updateStack('thirdPartyApis', currentApis.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-8">
      {/* Quick Presets Bar */}
      <div>
        <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>Preset Tumpukan Teknologi Populer (1-Klik Terapkan)</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {PRESET_STACKS.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => applyPreset(preset.config)}
              className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-indigo-500/50 text-left transition group"
            >
              <div className="flex items-center justify-between text-xs font-bold text-white group-hover:text-indigo-400 transition">
                <span>{preset.name}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-300">
                  Terapkan
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{preset.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Detailed Form */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-400" />
          <span>Konfigurasi Arsitektur Spesifik</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Frontend */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Frontend Framework & Bahasa <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              value={doc.techStack.frontend}
              onChange={(e) => updateStack('frontend', e.target.value)}
              placeholder="Contoh: React 19 + TypeScript (Vite)"
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Styling */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Styling & Desain Sistem <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              value={doc.techStack.styling}
              onChange={(e) => updateStack('styling', e.target.value)}
              placeholder="Contoh: Tailwind CSS v4, shadcn/ui"
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Backend */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Backend & Server API <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              value={doc.techStack.backend}
              onChange={(e) => updateStack('backend', e.target.value)}
              placeholder="Contoh: Express.js, Next.js Server Actions, FastAPI"
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Database */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Database & Penyimpanan Data <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              value={doc.techStack.database}
              onChange={(e) => updateStack('database', e.target.value)}
              placeholder="Contoh: PostgreSQL (Drizzle), Firestore, SQLite, LocalStorage"
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Auth */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Strategi Autentikasi
            </label>
            <input
              type="text"
              value={doc.techStack.auth}
              onChange={(e) => updateStack('auth', e.target.value)}
              placeholder="Contoh: Firebase Auth, JWT, OAuth 2.0 Google, Tanpa Auth (MVP)"
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* State Management */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              State Management
            </label>
            <input
              type="text"
              value={doc.techStack.stateManagement}
              onChange={(e) => updateStack('stateManagement', e.target.value)}
              placeholder="Contoh: React useState/useReducer, Zustand, React Query"
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Third party APIs */}
        <div className="pt-3 border-t border-slate-800/80">
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Integrasi Library & API Eksternal
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newApi}
              onChange={(e) => setNewApi(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addApi();
                }
              }}
              placeholder="Contoh: Google Gemini API, Stripe, SendGrid, Lucide Icons..."
              className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
            />
            <button
              onClick={addApi}
              className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition"
            >
              Tambah API
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {(doc.techStack.thirdPartyApis || []).map((api, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 text-xs border border-slate-700"
              >
                <span>📦 {api}</span>
                <button
                  onClick={() => removeApi(idx)}
                  className="text-slate-400 hover:text-rose-400 ml-1"
                  aria-label={`Hapus ${api}`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
