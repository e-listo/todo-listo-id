import test from 'node:test';
import assert from 'node:assert/strict';
import { PRD_TEMPLATES, EMPTY_PRD } from '../data/templates.js';
import { evaluatePromptSharpness } from './sharpnessAudit.js';
import { generateAIPrompt } from './promptArchitect.js';
import { exportPRDToMarkdown } from './markdownExporter.js';
import { PRDDocument } from '../types/prd.js';

test('evaluatePromptSharpness: scores template PRD highly', () => {
  const template = PRD_TEMPLATES[0];
  const fullDoc: PRDDocument = {
    ...template.data,
    id: 'test-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const audit = evaluatePromptSharpness(fullDoc);
  assert.ok(audit.totalScore >= 80, `Expected score >= 80, got ${audit.totalScore}`);
  assert.equal(audit.ratingLabel, 'Ultra Presisi / Production Ready');
  assert.ok(audit.criteria.length >= 6);
});

test('evaluatePromptSharpness: gives lower score and actionable advice on empty PRD', () => {
  const emptyDoc: PRDDocument = {
    ...EMPTY_PRD,
    id: 'test-empty',
    appName: '',
    tagline: '',
    targetAudience: '',
    problemStatement: '',
    edgeCases: [],
    coreFeatures: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const audit = evaluatePromptSharpness(emptyDoc);
  assert.ok(audit.totalScore < 50, `Expected score < 50, got ${audit.totalScore}`);
  assert.equal(audit.ratingLabel, 'Draft / Kurang Tajam');
  assert.ok(audit.actionableImprovements.length > 0);
});

test('generateAIPrompt: outputs valid XML tags for xml_mega_prompt style', () => {
  const template = PRD_TEMPLATES[0];
  const doc: PRDDocument = {
    ...template.data,
    id: 'test-xml',
    aiPromptSettings: {
      ...template.data.aiPromptSettings,
      promptStyle: 'xml_mega_prompt',
      includeXmlTags: true,
      includeAntiPatterns: true,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const result = generateAIPrompt(doc);
  assert.ok(result.content.includes('<system_instruction>'), 'Missing <system_instruction>');
  assert.ok(result.content.includes('<product_context>'), 'Missing <product_context>');
  assert.ok(result.content.includes('<tech_stack_and_constraints>'), 'Missing <tech_stack_and_constraints>');
  assert.ok(result.content.includes('<functional_specifications>'), 'Missing <functional_specifications>');
  assert.ok(result.content.includes('<guardrails_and_anti_patterns>'), 'Missing guardrails');
  assert.ok(result.wordCount > 50, `Word count should be substantial, got ${result.wordCount}`);
});

test('generateAIPrompt: outputs .cursorrules format when selected', () => {
  const template = PRD_TEMPLATES[0];
  const doc: PRDDocument = {
    ...template.data,
    id: 'test-cursor',
    aiPromptSettings: {
      ...template.data.aiPromptSettings,
      promptStyle: 'cursor_rules',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const result = generateAIPrompt(doc);
  assert.ok(result.content.includes('# .cursorrules for ToDo'));
  assert.ok(result.content.includes('todo.listo.id'));
  assert.ok(result.content.includes('## Core Architectural Rules'));
});

test('generateAIPrompt: outputs phased sprints format', () => {
  const template = PRD_TEMPLATES[0];
  const doc: PRDDocument = {
    ...template.data,
    id: 'test-sprints',
    aiPromptSettings: {
      ...template.data.aiPromptSettings,
      promptStyle: 'phased_sprints',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const result = generateAIPrompt(doc);
  assert.ok(result.content.includes('SPRINT 1: Scaffolding'));
  assert.ok(result.content.includes('SPRINT 2: Business Logic'));
  assert.ok(result.content.includes('SPRINT 3: Interactive UI'));
  assert.ok(result.content.includes('SPRINT 4: Edge Cases'));
});

test('exportPRDToMarkdown: produces structured document with MoSCoW headings', () => {
  const template = PRD_TEMPLATES[0];
  const doc: PRDDocument = {
    ...template.data,
    id: 'test-md',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const markdown = exportPRDToMarkdown(doc);
  assert.ok(markdown.includes('# Product Requirement Document (PRD)'));
  assert.ok(markdown.includes('## 4. Spesifikasi Fitur (MoSCoW Prioritization)'));
  assert.ok(markdown.includes('### 4.1 Must-Have (P0 - Critical for MVP)'));
  assert.ok(markdown.includes('## 7. Penanganan Kasus Ekstrem (Edge Cases)'));
});
