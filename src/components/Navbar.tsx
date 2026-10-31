import React from 'react';
import {
  FileText,
  Sparkles,
  Terminal,
  Eye,
  Download,
  Copy,
  RotateCcw,
  BookOpen,
  Check,
  Cpu
} from 'lucide-react';
import { PRDDocument } from '../types/prd.js';
import { SharpnessResult } from '../utils/sharpnessAudit.js';

interface NavbarProps {
  activeView: 'editor' | 'prompt' | 'preview';
  setActiveView: (view: 'editor' | 'prompt' | 'preview') => void;
  audit: SharpnessResult;
  doc: PRDDocument;
  onOpenTemplates: () => void;
  onOpenAiEnhance: () => void;
  onReset: () => void;
  onExportMarkdown: () => void;
  onCopyPrompt: () => void;
  copiedPrompt: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  setActiveView,
  audit,
  doc,
  onOpenTemplates,
  onOpenAiEnhance,
  onReset,
  onExportMarkdown,
  onCopyPrompt,
  copiedPrompt,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand & App Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-sky-500 to-emerald-400 p-0.5 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Terminal className="w-5 h-5 text-sky-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-white tracking-tight">ToDo</span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                PRD & AI Architect
              </span>
              <a
                href={doc.deployUrl || 'https://todo.listo.id'}
                target="_blank"
                rel="noreferrer"
                className="hidden lg:inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-300 border border-sky-500/20 hover:bg-sky-500/20 transition"
                title="Target URL Deployment"
              >
                <span>todo.listo.id</span>
              </a>
            </div>
            <p className="text-xs text-slate-400 truncate max-w-[200px] sm:max-w-xs">
              {doc.appName ? `${doc.appName} • v${doc.version}` : 'ToDo PRD & AI Prompt Architect'}
            </p>
          </div>
        </div>

        {/* View Switcher Navigation */}
        <nav className="hidden md:flex items-center p-1 bg-slate-900 border border-slate-800 rounded-xl">
          <button
            onClick={() => setActiveView('editor')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
              activeView === 'editor'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
            aria-label="Buka Editor Spesifikasi PRD"
          >
            <FileText className="w-4 h-4" />
            <span>1. PRD Editor</span>
          </button>

          <button
            onClick={() => setActiveView('prompt')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
              activeView === 'prompt'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
            aria-label="Buka AI Prompt Generator"
          >
            <Cpu className="w-4 h-4" />
            <span>2. AI Prompt Tajam</span>
            <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-sky-950 text-sky-300 font-bold border border-sky-700/50">
              {audit.totalScore}
            </span>
          </button>

          <button
            onClick={() => setActiveView('preview')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
              activeView === 'preview'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
            aria-label="Lihat Preview Dokumen PRD"
          >
            <Eye className="w-4 h-4" />
            <span>3. Dokumen PRD</span>
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Templates Picker */}
          <button
            onClick={onOpenTemplates}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition"
            aria-label="Pilih Template PRD"
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Template</span>
          </button>

          {/* AI Enhance Button */}
          <button
            onClick={onOpenAiEnhance}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-gradient-to-r from-indigo-500 to-sky-500 hover:from-indigo-600 hover:to-sky-600 text-white shadow-sm shadow-indigo-500/20 transition"
            aria-label="Pertajam Dokumen dengan AI"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Pertajam AI</span>
          </button>

          {/* Quick Copy Prompt */}
          <button
            onClick={onCopyPrompt}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition ${
              copiedPrompt
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
            }`}
            aria-label="Salin Prompt AI Siap Pakai"
            title="Salin Prompt Siap Pakai ke Clipboard"
          >
            {copiedPrompt ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-sky-400" />
                <span className="hidden sm:inline">Salin Prompt</span>
              </>
            )}
          </button>

          {/* Download Markdown */}
          <button
            onClick={onExportMarkdown}
            className="p-1.5 sm:px-3 sm:py-1.5 text-xs font-medium rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition"
            aria-label="Unduh Dokumen PRD Markdown"
            title="Unduh File Markdown PRD"
          >
            <Download className="w-4 h-4 text-emerald-400 sm:inline" />
            <span className="hidden sm:inline sm:ml-1.5">.MD</span>
          </button>

          {/* Reset */}
          <button
            onClick={onReset}
            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-900 rounded-lg transition"
            aria-label="Reset Formulir Spesifikasi"
            title="Mulai Ulang / Buat PRD Baru"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Nav sub-bar */}
      <div className="flex md:hidden border-t border-slate-800 bg-slate-900/90 px-3 py-1.5 justify-around">
        <button
          onClick={() => setActiveView('editor')}
          className={`flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-md ${
            activeView === 'editor' ? 'bg-indigo-600 text-white' : 'text-slate-400'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Editor</span>
        </button>
        <button
          onClick={() => setActiveView('prompt')}
          className={`flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-md ${
            activeView === 'prompt' ? 'bg-sky-600 text-white' : 'text-slate-400'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>Prompt ({audit.totalScore})</span>
        </button>
        <button
          onClick={() => setActiveView('preview')}
          className={`flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-md ${
            activeView === 'preview' ? 'bg-emerald-600 text-white' : 'text-slate-400'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>PRD</span>
        </button>
      </div>
    </header>
  );
};
