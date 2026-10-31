import React, { useState } from 'react';
import { PRD_TEMPLATES, TemplateDefinition } from '../data/templates.js';
import { PRDDocument } from '../types/prd.js';
import { BookOpen, Sparkles, X, Check, ArrowRight, Layers, Wallet } from 'lucide-react';

interface TemplateSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (templateData: TemplateDefinition['data']) => void;
}

export const TemplateSelectorModal: React.FC<TemplateSelectorModalProps> = ({
  isOpen,
  onClose,
  onSelectTemplate,
}) => {
  const [selectedId, setSelectedId] = useState<string>(PRD_TEMPLATES[0].id);

  if (!isOpen) return null;

  const currentTemplate = PRD_TEMPLATES.find((t) => t.id === selectedId) || PRD_TEMPLATES[0];

  const handleApply = () => {
    onSelectTemplate(currentTemplate.data);
    onClose();
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layers':
        return <Layers className="w-5 h-5 text-sky-400" />;
      case 'Wallet':
        return <Wallet className="w-5 h-5 text-emerald-400" />;
      case 'Sparkles':
      default:
        return <Sparkles className="w-5 h-5 text-indigo-400" />;
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="template-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
    >
      <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 id="template-modal-title" className="text-base font-bold text-white">
                Pilih Template Spesifikasi Produk
              </h2>
              <p className="text-xs text-slate-400">
                Mulai cepat dengan blueprint PRD siap pakai yang sudah dioptimasi untuk AI.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
            aria-label="Tutup modal template"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Left Column: Template Cards List */}
          <div className="space-y-3">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Koleksi Template Industri
            </label>
            {PRD_TEMPLATES.map((tmpl) => {
              const isSelected = tmpl.id === selectedId;
              return (
                <button
                  key={tmpl.id}
                  onClick={() => setSelectedId(tmpl.id)}
                  className={`w-full p-4 rounded-xl border text-left transition flex items-start gap-3 ${
                    isSelected
                      ? 'bg-indigo-600/15 border-indigo-500/60 ring-1 ring-indigo-500/30'
                      : 'bg-slate-950/50 border-slate-800/80 hover:bg-slate-950 hover:border-slate-700'
                  }`}
                >
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 shrink-0">
                    {getIcon(tmpl.icon)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-white">{tmpl.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                        {tmpl.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {tmpl.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Template Preview Details */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between space-y-4">
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-slate-400 font-semibold">Detail Blueprint:</span>
                <span className="font-bold text-indigo-400">{currentTemplate.data.appName}</span>
              </div>

              <div>
                <span className="text-slate-400 block text-[11px] mb-0.5">Tagline & Solusi:</span>
                <p className="text-slate-200 font-medium italic">"{currentTemplate.data.tagline}"</p>
              </div>

              <div>
                <span className="text-slate-400 block text-[11px] mb-0.5">Tech Stack Terpilih:</span>
                <div className="font-mono text-[11px] text-sky-300 space-y-0.5">
                  <p>• {currentTemplate.data.techStack.frontend}</p>
                  <p>• {currentTemplate.data.techStack.styling}</p>
                  <p>• {currentTemplate.data.techStack.backend}</p>
                  <p>• {currentTemplate.data.techStack.database}</p>
                </div>
              </div>

              <div>
                <span className="text-slate-400 block text-[11px] mb-0.5">Fitur Bawaan:</span>
                <ul className="list-disc list-inside text-slate-300 text-[11px] space-y-0.5">
                  {currentTemplate.data.coreFeatures.map((f, i) => (
                    <li key={i}>
                      [{f.priority}] {f.title}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="text-slate-400 block text-[11px] mb-0.5">Edge Cases Terdefinisi:</span>
                <p className="text-amber-300 text-[11px]">
                  {currentTemplate.data.edgeCases.length} skenario kegagalan & penanganan error siap pakai.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800">
              <button
                onClick={handleApply}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition"
              >
                <span>Gunakan Template Ini</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
