import React, { useState, useEffect, useMemo } from 'react';
import { PRDDocument } from './types/prd.js';
import { PRD_TEMPLATES, EMPTY_PRD } from './data/templates.js';
import { evaluatePromptSharpness } from './utils/sharpnessAudit.js';
import { generateAIPrompt } from './utils/promptArchitect.js';
import { exportPRDToMarkdown } from './utils/markdownExporter.js';

import { Navbar } from './components/Navbar.js';
import { PromptSharpnessWidget } from './components/PromptSharpnessWidget.js';
import { TemplateSelectorModal } from './components/TemplateSelectorModal.js';
import { AiEnhanceModal } from './components/AiEnhanceModal.js';
import { PromptArchitectView } from './components/PromptArchitectView.js';
import { PRDPreviewView } from './components/PRDPreviewView.js';

// Tabs
import { OverviewTab } from './components/tabs/OverviewTab.js';
import { FeaturesTab } from './components/tabs/FeaturesTab.js';
import { TechStackTab } from './components/tabs/TechStackTab.js';
import { DataModelsTab } from './components/tabs/DataModelsTab.js';
import { EdgeCasesTab } from './components/tabs/EdgeCasesTab.js';
import { SuccessMetricsTab } from './components/tabs/SuccessMetricsTab.js';

import {
  FileText,
  ListTodo,
  Layers,
  Database,
  ShieldAlert,
  Trophy,
  Cpu,
  Eye,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Info
} from 'lucide-react';

const STORAGE_KEY = 'todo_listo_prd_v2';

export default function App() {
  // Initialize PRD from localStorage or ToDo template
  const [doc, setDoc] = useState<PRDDocument>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.appName && parsed.appName !== 'SpecCraft Pro') {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to load saved PRD:', e);
    }
    // Default to ToDo template at https://todo.listo.id
    const initialTmpl = PRD_TEMPLATES[0];
    return {
      ...initialTmpl.data,
      id: `prd-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  });

  const [activeView, setActiveView] = useState<'editor' | 'prompt' | 'preview'>('editor');
  const [activeEditorTab, setActiveEditorTab] = useState<
    'overview' | 'features' | 'tech' | 'data' | 'edge' | 'metrics'
  >('overview');

  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isAiEnhanceModalOpen, setIsAiEnhanceModalOpen] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  // Auto-save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(doc));
    } catch (e) {
      console.warn('Failed to persist PRD to localStorage:', e);
    }
  }, [doc]);

  // Evaluate prompt sharpness score in real-time
  const audit = useMemo(() => evaluatePromptSharpness(doc), [doc]);

  // Update PRD handler
  const handleUpdateDoc = (updates: Partial<PRDDocument>) => {
    setDoc((prev) => ({
      ...prev,
      ...updates,
      updatedAt: new Date().toISOString(),
    }));
  };

  // Select template
  const handleSelectTemplate = (templateData: any) => {
    setDoc({
      ...templateData,
      id: `prd-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  };

  // Reset to empty PRD
  const handleReset = () => {
    if (window.confirm('Mulai draf PRD baru yang bersih? Perubahan yang belum disimpan akan direset.')) {
      setDoc({
        ...EMPTY_PRD,
        id: `prd-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      setActiveEditorTab('overview');
      setActiveView('editor');
    }
  };

  // 1-Click Copy Prompt from anywhere
  const handleCopyPrompt = () => {
    const prompt = generateAIPrompt(doc);
    navigator.clipboard.writeText(prompt.content);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2500);
  };

  // Export Markdown download
  const handleExportMarkdown = () => {
    const md = exportPRDToMarkdown(doc);
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${doc.appName || 'product'}-prd.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Apply AI enhancements from modal
  const handleApplyAiEnhancements = (enhancements: any) => {
    setDoc((prev) => {
      let updatedDoc = { ...prev };

      if (enhancements.improvedTagline) {
        updatedDoc.tagline = enhancements.improvedTagline;
      }

      if (enhancements.missingEdgeCases?.length) {
        const newCases = enhancements.missingEdgeCases.map((ecText: string, i: number) => ({
          id: `ec-ai-${Date.now()}-${i}`,
          scenario: ecText,
          expectedBehavior: 'Sistem menampilkan pesan ramah dan menjaga stabilitas state.',
          fallbackOrRecovery: 'Retry otomatis atau fallback ke penyimpanan memori lokal.',
        }));
        updatedDoc.edgeCases = [...updatedDoc.edgeCases, ...newCases];
      }

      if (enhancements.antiPatternsToAvoid?.length) {
        updatedDoc.outOfScope = [
          ...(updatedDoc.outOfScope || []),
          ...enhancements.antiPatternsToAvoid,
        ];
      }

      if (enhancements.suggestedAcceptanceCriteria?.length && updatedDoc.coreFeatures.length > 0) {
        // Append to the first P0 feature
        const updatedFeatures = [...updatedDoc.coreFeatures];
        const p0Idx = updatedFeatures.findIndex((f) => f.priority === 'P0');
        if (p0Idx !== -1) {
          updatedFeatures[p0Idx] = {
            ...updatedFeatures[p0Idx],
            acceptanceCriteria: [
              ...(updatedFeatures[p0Idx].acceptanceCriteria || []),
              ...enhancements.suggestedAcceptanceCriteria,
            ],
          };
          updatedDoc.coreFeatures = updatedFeatures;
        }
      }

      updatedDoc.updatedAt = new Date().toISOString();
      return updatedDoc;
    });
  };

  const editorTabs = [
    { id: 'overview', label: '1. Visi & Masalah', icon: FileText, count: null },
    {
      id: 'features',
      label: '2. Fitur & MoSCoW',
      icon: ListTodo,
      count: doc.coreFeatures.length,
    },
    { id: 'tech', label: '3. Tech Stack', icon: Layers, count: null },
    {
      id: 'data',
      label: '4. Model Data',
      icon: Database,
      count: (doc.dataModels || []).length,
    },
    {
      id: 'edge',
      label: '5. Edge Cases',
      icon: ShieldAlert,
      count: (doc.edgeCases || []).length,
    },
    {
      id: 'metrics',
      label: '6. Metrik Sukses',
      icon: Trophy,
      count: (doc.successMetrics || []).length,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30">
      {/* Top Navbar */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        audit={audit}
        doc={doc}
        onOpenTemplates={() => setIsTemplateModalOpen(true)}
        onOpenAiEnhance={() => setIsAiEnhanceModalOpen(true)}
        onReset={handleReset}
        onExportMarkdown={handleExportMarkdown}
        onCopyPrompt={handleCopyPrompt}
        copiedPrompt={copiedPrompt}
      />

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Real-time Sharpness Audit Score Widget */}
        <PromptSharpnessWidget
          audit={audit}
          onNavigateTab={(tab) => {
            setActiveView('editor');
            setActiveEditorTab(tab as any);
          }}
        />

        {/* VIEW 1: PRD FORM BUILDER & EDITOR */}
        {activeView === 'editor' && (
          <div className="space-y-6">
            {/* Editor Sub-Tabs Navigation */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-800 scrollbar-none">
              {editorTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeEditorTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveEditorTab(tab.id as any)}
                    className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                    {tab.count !== null && (
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                          isActive
                            ? 'bg-indigo-800 text-indigo-100'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Active Tab Panel */}
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 sm:p-7 shadow-sm">
              {activeEditorTab === 'overview' && (
                <OverviewTab doc={doc} onChange={handleUpdateDoc} />
              )}
              {activeEditorTab === 'features' && (
                <FeaturesTab doc={doc} onChange={handleUpdateDoc} />
              )}
              {activeEditorTab === 'tech' && (
                <TechStackTab doc={doc} onChange={handleUpdateDoc} />
              )}
              {activeEditorTab === 'data' && (
                <DataModelsTab doc={doc} onChange={handleUpdateDoc} />
              )}
              {activeEditorTab === 'edge' && (
                <EdgeCasesTab doc={doc} onChange={handleUpdateDoc} />
              )}
              {activeEditorTab === 'metrics' && (
                <SuccessMetricsTab doc={doc} onChange={handleUpdateDoc} />
              )}
            </div>

            {/* Step advancement footer */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-500">
                Data disimpan otomatis secara instan di peramban Anda.
              </span>
              <button
                onClick={() => setActiveView('prompt')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-md shadow-sky-600/20 transition"
              >
                <span>Lanjut ke Generator Prompt AI</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* VIEW 2: AI PROMPT ARCHITECT */}
        {activeView === 'prompt' && (
          <PromptArchitectView
            doc={doc}
            onChange={handleUpdateDoc}
            audit={audit}
            onOpenAiEnhance={() => setIsAiEnhanceModalOpen(true)}
          />
        )}

        {/* VIEW 3: FULL PRD DOCUMENT PREVIEW */}
        {activeView === 'preview' && <PRDPreviewView doc={doc} />}
      </main>

      {/* Modals */}
      <TemplateSelectorModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        onSelectTemplate={handleSelectTemplate}
      />

      <AiEnhanceModal
        isOpen={isAiEnhanceModalOpen}
        onClose={() => setIsAiEnhanceModalOpen(false)}
        doc={doc}
        onApplyEnhancements={handleApplyAiEnhancements}
      />
    </div>
  );
}
