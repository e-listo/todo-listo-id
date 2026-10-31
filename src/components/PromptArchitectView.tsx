import React, { useState } from 'react';
import {
  PRDDocument,
  PromptStyle,
  TargetAiModel
} from '../types/prd.js';
import {
  generateAIPrompt,
  GeneratedPromptPayload
} from '../utils/promptArchitect.js';
import { SharpnessResult } from '../utils/sharpnessAudit.js';
import {
  Copy,
  Check,
  Download,
  Terminal,
  Settings2,
  Sparkles,
  ShieldCheck,
  Cpu,
  Layers,
  FileCode,
  Flame,
  HelpCircle,
  Code
} from 'lucide-react';

interface PromptArchitectViewProps {
  doc: PRDDocument;
  onChange: (updates: Partial<PRDDocument>) => void;
  audit: SharpnessResult;
  onOpenAiEnhance: () => void;
}

const MODEL_OPTIONS: { id: TargetAiModel; name: string; tag: string }[] = [
  { id: 'claude-3-7-sonnet', name: 'Claude 3.7 Sonnet', tag: 'Hybrid Thinking & Architecture' },
  { id: 'gemini-3.8-flash', name: 'Google Gemini 3.8 Flash', tag: 'Fast, Large Context, Accurate' },
  { id: 'gpt-4o', name: 'OpenAI GPT-4o', tag: 'Balanced Reasoning & Coding' },
  { id: 'cursor-windsurf', name: 'Cursor / Windsurf Agent', tag: 'Direct in-IDE Workspace Rules' },
  { id: 'deepseek-r1', name: 'DeepSeek R1 / V3', tag: 'Chain-of-Thought Reasoning' },
];

const STYLE_OPTIONS: { id: PromptStyle; title: string; desc: string; icon: any }[] = [
  {
    id: 'xml_mega_prompt',
    title: 'XML-Tagged Mega Prompt',
    desc: 'Format standar industri dengan tag <system_instruction>, <specifications>, dan <guardrails>. Hasil nol-halusinasi.',
    icon: Terminal,
  },
  {
    id: 'cursor_rules',
    title: '.cursorrules (IDE Assistant)',
    desc: 'Aturan arsitektur siap pakai untuk disimpan di root file .cursorrules pada Cursor atau Windsurf.',
    icon: FileCode,
  },
  {
    id: 'phased_sprints',
    title: '4-Phase Sprint Prompts',
    desc: 'Dipecah menjadi 4 tahap: Setup -> Logic -> UI -> Edge Cases agar tidak melampaui token limit.',
    icon: Layers,
  },
  {
    id: 'senior_architect_rfc',
    title: 'Technical RFC & Critique',
    desc: 'Prompt untuk meminta AI mengaudit kelemahan sistem, keamanan, dan skalabilitas sebelum menulis kode.',
    icon: ShieldCheck,
  },
];

export const PromptArchitectView: React.FC<PromptArchitectViewProps> = ({
  doc,
  onChange,
  audit,
  onOpenAiEnhance,
}) => {
  const [copied, setCopied] = useState(false);

  const promptPayload: GeneratedPromptPayload = generateAIPrompt(doc);

  const handleCopy = () => {
    navigator.clipboard.writeText(promptPayload.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const ext = doc.aiPromptSettings.promptStyle === 'cursor_rules' ? '.cursorrules' : '.md';
    const blob = new Blob([promptPayload.content], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${doc.appName || 'app'}-ai-prompt${ext}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const updateSetting = (key: keyof PRDDocument['aiPromptSettings'], value: any) => {
    onChange({
      aiPromptSettings: {
        ...doc.aiPromptSettings,
        [key]: value,
      },
    });
  };

  const estTokens = Math.round(promptPayload.charCount / 4);

  return (
    <div className="space-y-6">
      {/* Top Banner & Control Deck */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-5 shadow-sm">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                <Cpu className="w-4 h-4" />
                <span>AI Prompt Architect Engine</span>
              </span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                Skor Ketajaman: {audit.totalScore}/100
              </span>
            </div>
            <h2 className="text-lg font-bold text-white mt-1">
              Prompt Terstruktur Siap Kirim ke Model AI
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Diformulasikan secara ilmiah agar AI menghasilkan kode yang akurat, modular, dan mematuhi batas arsitektur.
            </p>
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-auto">
            <button
              onClick={onOpenAiEnhance}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 hover:from-indigo-600 hover:to-sky-600 text-white text-xs font-semibold shadow-sm shadow-indigo-500/20 transition"
              aria-label="Pertajam prompt dengan AI Gemini"
            >
              <Sparkles className="w-4 h-4" />
              <span>Pertajam Otomatis dengan AI</span>
            </button>

            <button
              onClick={handleCopy}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white'
              }`}
              aria-label="Salin Prompt ke Clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-200" />
                  <span>Berhasil Disalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Salin Prompt</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
              title="Unduh Prompt sebagai file"
              aria-label="Unduh Prompt sebagai file"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Style Selector Tabs */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2">
            Pilih Format Output Prompt:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {STYLE_OPTIONS.map((style) => {
              const Icon = style.icon;
              const isSelected = doc.aiPromptSettings.promptStyle === style.id;
              return (
                <button
                  key={style.id}
                  onClick={() => updateSetting('promptStyle', style.id)}
                  className={`p-3.5 rounded-xl border text-left transition flex flex-col justify-between ${
                    isSelected
                      ? 'bg-sky-500/10 border-sky-500/50 text-white shadow-sm ring-1 ring-sky-500/20'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2 font-semibold text-xs mb-1 text-slate-200">
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-sky-400' : 'text-slate-500'}`} />
                      <span>{style.title}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{style.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Options & Target AI Model row */}
        <div className="pt-4 border-t border-slate-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs">
          {/* Target Model dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="font-semibold text-slate-300 whitespace-nowrap">Target Model AI:</span>
            <select
              value={doc.aiPromptSettings.targetModel}
              onChange={(e) => updateSetting('targetModel', e.target.value as TargetAiModel)}
              className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs font-medium focus:outline-none focus:border-sky-500 w-full sm:w-auto"
            >
              {MODEL_OPTIONS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.tag})
                </option>
              ))}
            </select>
          </div>

          {/* Quick Toggles */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={doc.aiPromptSettings.includeAntiPatterns}
                onChange={(e) => updateSetting('includeAntiPatterns', e.target.checked)}
                className="rounded bg-slate-950 border-slate-700 text-indigo-500 focus:ring-0"
              />
              <span>Aturan Anti-Patterns & Guardrails</span>
            </label>

            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={doc.aiPromptSettings.includeXmlTags}
                onChange={(e) => updateSetting('includeXmlTags', e.target.checked)}
                className="rounded bg-slate-950 border-slate-700 text-indigo-500 focus:ring-0"
              />
              <span>Tag XML Berstruktur (&lt;rules&gt;)</span>
            </label>

            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={doc.aiPromptSettings.language === 'id'}
                onChange={(e) => updateSetting('language', e.target.checked ? 'id' : 'en')}
                className="rounded bg-slate-950 border-slate-700 text-indigo-500 focus:ring-0"
              />
              <span>Bahasa Indonesia</span>
            </label>
          </div>
        </div>
      </div>

      {/* Prompt Inspector Box */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-xl">
        {/* Box Top Bar */}
        <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <span className="font-mono text-slate-400 ml-2 font-medium">
              prompt-spec.{doc.aiPromptSettings.promptStyle === 'cursor_rules' ? 'cursorrules' : 'md'}
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-400 font-mono text-[11px]">
            <span>{promptPayload.wordCount} kata</span>
            <span>{promptPayload.charCount} karakter</span>
            <span className="text-sky-400">~{estTokens} estimasi token</span>
          </div>
        </div>

        {/* Prompt Content */}
        <div className="relative">
          <pre className="p-5 font-mono text-xs text-slate-200 leading-relaxed overflow-x-auto max-h-[600px] whitespace-pre-wrap select-all selection:bg-indigo-500/40">
            {promptPayload.content}
          </pre>

          {/* Floating Copy Button inside code box */}
          <button
            onClick={handleCopy}
            className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 shadow-md backdrop-blur-sm transition"
            aria-label="Salin isi prompt ini"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Tersalin</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-sky-400" />
                <span>Salin</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Guide Card: How to use with Claude / Cursor / ChatGPT */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 space-y-2">
        <div className="flex items-center gap-2 font-bold text-slate-200">
          <HelpCircle className="w-4 h-4 text-indigo-400" />
          <span>Cara Menggunakan Prompt Ini untuk Hasil Maksimal:</span>
        </div>
        <ol className="list-decimal list-inside space-y-1 pl-1 text-slate-300">
          <li>
            <strong>Untuk Claude 3.7 / Gemini 3.8 / ChatGPT</strong>: Gunakan format <em>XML-Tagged Mega Prompt</em>. Salin langsung ke obrolan pertama sebagai instruksi sistem produk lengkap.
          </li>
          <li>
            <strong>Untuk Cursor / Windsurf</strong>: Pilih format <em>.cursorrules</em>, lalu simpan ke file <code className="text-sky-300 font-mono">.cursorrules</code> di root folder proyek Anda.
          </li>
          <li>
            <strong>Untuk Proyek Skala Menengah/Besar</strong>: Gunakan opsi <em>4-Phase Sprint Prompts</em>. Kirim satu per satu sprint ke AI agar konteks tetap terjaga dan tidak terjadi pemotongan output di tengah jalan.
          </li>
        </ol>
      </div>
    </div>
  );
};
