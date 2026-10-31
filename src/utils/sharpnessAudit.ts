import { PRDDocument } from '../types/prd.js';

export interface AuditCriterion {
  id: string;
  category: string;
  name: string;
  score: number;
  maxScore: number;
  passed: boolean;
  advice: string;
}

export interface SharpnessResult {
  totalScore: number; // 0 to 100
  ratingLabel: 'Draft / Kurang Tajam' | 'Cukup Tajam' | 'Tajam & Terstruktur' | 'Ultra Presisi / Production Ready';
  badgeColor: string;
  summary: string;
  criteria: AuditCriterion[];
  actionableImprovements: string[];
}

export function evaluatePromptSharpness(doc: PRDDocument): SharpnessResult {
  const criteria: AuditCriterion[] = [];
  const improvements: string[] = [];

  // 1. Role & Identity Context (Max: 15)
  const hasAppDetails = Boolean(doc.appName?.trim() && doc.tagline?.trim());
  const hasAudience = Boolean(doc.targetAudience?.trim() && doc.problemStatement?.trim());
  let roleScore = 0;
  if (hasAppDetails) roleScore += 8;
  if (hasAudience) roleScore += 7;

  criteria.push({
    id: 'role_context',
    category: 'Konteks & Visi',
    name: 'Definisi Produk, Persona, dan Masalah',
    score: roleScore,
    maxScore: 15,
    passed: roleScore >= 12,
    advice: roleScore < 12 
      ? 'Lengkapi Problem Statement dan Target Pengguna agar AI memahami konteks bisnis aplikasi.' 
      : 'Konteks produk dan persona sudah sangat jelas.'
  });
  if (roleScore < 12) improvements.push('Perjelas Problem Statement & Target Persona di Tab Gambaran Umum.');

  // 2. Concrete Tech Stack (Max: 15)
  let techScore = 0;
  if (doc.techStack.frontend?.trim()) techScore += 4;
  if (doc.techStack.styling?.trim()) techScore += 3;
  if (doc.techStack.backend?.trim() || doc.techStack.database?.trim()) techScore += 5;
  if (doc.techStack.auth?.trim() || doc.techStack.stateManagement?.trim()) techScore += 3;

  criteria.push({
    id: 'tech_stack',
    category: 'Arsitektur Teknis',
    name: 'Spesifikasi Tech Stack & Library',
    score: techScore,
    maxScore: 15,
    passed: techScore >= 12,
    advice: techScore < 12
      ? 'Sebutkan versi atau kombinasi library yang spesifik (misal React 19 + Tailwind v4 + Express) untuk mencegah AI memilih library usang.'
      : 'Tech stack spesifik dan mengunci dependensi dengan baik.'
  });
  if (techScore < 12) improvements.push('Lengkapi pilihan Framework, Styling, dan Database pada Tab Tech Stack.');

  // 3. Features & Acceptance Criteria (Max: 20)
  const featuresCount = doc.coreFeatures.length;
  const featuresWithCriteria = doc.coreFeatures.filter(f => f.acceptanceCriteria && f.acceptanceCriteria.length > 0).length;
  let featScore = 0;
  if (featuresCount >= 3) featScore += 8;
  else if (featuresCount > 0) featScore += 4;

  if (featuresWithCriteria >= 3) featScore += 12;
  else if (featuresWithCriteria > 0) featScore += Math.round((featuresWithCriteria / Math.max(featuresCount, 1)) * 12);

  criteria.push({
    id: 'features_criteria',
    category: 'Fitur & Kriteria Penerimaan',
    name: 'Fitur Utama & Acceptance Criteria (Given/When/Then)',
    score: featScore,
    maxScore: 20,
    passed: featScore >= 15,
    advice: featScore < 15
      ? 'Tambahkan minimal 1-2 kriteria penerimaan spesifik untuk setiap fitur P0 agar AI menghasilkan kode yang dapat diverifikasi.'
      : 'Fitur dilengkapi dengan kriteria penerimaan terukur.'
  });
  if (featScore < 15) improvements.push('Tambahkan kriteria penerimaan spesifik pada fitur utama (P0) untuk meminimalkan halusinasi.');

  // 4. Edge Cases & Error Boundaries (Max: 15)
  const edgeCasesCount = doc.edgeCases.length;
  let edgeScore = 0;
  if (edgeCasesCount >= 3) edgeScore = 15;
  else if (edgeCasesCount === 2) edgeScore = 10;
  else if (edgeCasesCount === 1) edgeScore = 5;

  criteria.push({
    id: 'edge_cases',
    category: 'Robustness & Skenario Gagal',
    name: 'Penanganan Kasus Ekstrem (Edge Cases)',
    score: edgeScore,
    maxScore: 15,
    passed: edgeScore >= 10,
    advice: edgeScore < 10
      ? 'AI sering mengabaikan error handling jika tidak dipandu. Definisikan kondisi offline, input kosong, atau limit data.'
      : 'Skenario error dan mitigasi sudah terdefinisi dengan rapi.'
  });
  if (edgeScore < 10) improvements.push('Definisikan minimal 2-3 Edge Cases pada Tab Skenario Ekstrem.');

  // 5. Anti-Patterns & Guardrails (Max: 15)
  let guardrailScore = 0;
  if (doc.outOfScope && doc.outOfScope.length > 0) guardrailScore += 7;
  if (doc.aiPromptSettings.includeAntiPatterns) guardrailScore += 8;

  criteria.push({
    id: 'anti_patterns',
    category: 'Batasan & Guardrails',
    name: 'Batasan Lingkup (Out of Scope) & Anti-Patterns',
    score: guardrailScore,
    maxScore: 15,
    passed: guardrailScore >= 10,
    advice: guardrailScore < 10
      ? 'AI model bekerja jauh lebih akurat jika diberi aturan negatif "JANGAN LAKUKAN X" dan daftar Out of Scope yang tegas.'
      : 'Guardrails dan batasan out-of-scope sudah aktif.'
  });
  if (guardrailScore < 10) improvements.push('Aktifkan aturan Anti-Patterns dan isi daftar Out of Scope.');

  // 6. Data Models & Schemas (Max: 10)
  const modelsCount = doc.dataModels.length;
  let modelScore = 0;
  if (modelsCount >= 2) modelScore = 10;
  else if (modelsCount === 1) modelScore = 6;

  criteria.push({
    id: 'data_models',
    category: 'Skema Data',
    name: 'Definisi Entitas & Tipe Data',
    score: modelScore,
    maxScore: 10,
    passed: modelScore >= 6,
    advice: modelScore < 6
      ? 'Sediakan struktur entitas data utama agar AI tidak mengarang skema database yang tidak kompatibel.'
      : 'Struktur entitas data telah terdokumentasi.'
  });

  // 7. Non-Functional & Quality Constraints (Max: 10)
  const nfrCount = doc.nonFunctional.length;
  let nfrScore = 0;
  if (nfrCount >= 3) nfrScore = 10;
  else if (nfrCount > 0) nfrScore = 5;

  criteria.push({
    id: 'non_functional',
    category: 'Kualitas & Standar Non-Fungsional',
    name: 'Performa, Aksesibilitas, dan Keamanan',
    score: nfrScore,
    maxScore: 10,
    passed: nfrScore >= 8,
    advice: nfrScore < 8
      ? 'Tambahkan batasan performa (misal: load time < 1s, zero external CSS dependencies).'
      : 'Standar non-fungsional lengkap.'
  });

  const totalScore = roleScore + techScore + featScore + edgeScore + guardrailScore + modelScore + nfrScore;

  let ratingLabel: SharpnessResult['ratingLabel'] = 'Draft / Kurang Tajam';
  let badgeColor = 'bg-rose-500/10 text-rose-400 border-rose-500/20';
  let summary = 'Prompt masih terlalu umum. AI rentan berhalusinasi dan menghasilkan kode template mentah.';

  if (totalScore >= 88) {
    ratingLabel = 'Ultra Presisi / Production Ready';
    badgeColor = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    summary = 'Luar biasa! Spesifikasi dan prompt sangat tajam, terstruktur dengan guardrails kokoh. Hasil kode AI akan sangat akurat.';
  } else if (totalScore >= 70) {
    ratingLabel = 'Tajam & Terstruktur';
    badgeColor = 'bg-sky-500/10 text-sky-400 border-sky-500/20';
    summary = 'Bagus! Spesifikasi sudah terarah dengan baik. Tambahkan sedikit detail pada acceptance criteria atau edge cases untuk hasil optimal.';
  } else if (totalScore >= 50) {
    ratingLabel = 'Cukup Tajam';
    badgeColor = 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    summary = 'Spesifikasi dasar sudah ada, namun AI masih berpotensi salah mengasumsikan logika bisnis penting.';
  }

  return {
    totalScore,
    ratingLabel,
    badgeColor,
    summary,
    criteria,
    actionableImprovements: improvements,
  };
}
