import { PRDDocument, PromptStyle, TargetAiModel } from '../types/prd.js';

export interface GeneratedPromptPayload {
  style: PromptStyle;
  targetModel: TargetAiModel;
  title: string;
  charCount: number;
  wordCount: number;
  content: string;
  copyableMarkdown: string;
}

export function generateAIPrompt(doc: PRDDocument): GeneratedPromptPayload {
  const { promptStyle, targetModel, includeAntiPatterns, includeXmlTags, language } = doc.aiPromptSettings;
  const isIndo = language === 'id';

  let content = '';

  switch (promptStyle) {
    case 'cursor_rules':
      content = buildCursorRulesPrompt(doc, isIndo);
      break;
    case 'phased_sprints':
      content = buildPhasedSprintsPrompt(doc, isIndo);
      break;
    case 'senior_architect_rfc':
      content = buildSeniorArchitectRfcPrompt(doc, isIndo);
      break;
    case 'xml_mega_prompt':
    default:
      content = buildXmlMegaPrompt(doc, isIndo, includeAntiPatterns, includeXmlTags);
      break;
  }

  const charCount = content.length;
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;

  let title = 'Structured AI Coding Prompt';
  if (promptStyle === 'xml_mega_prompt') title = 'XML-Tagged Mega Prompt (Zero-Shot Production)';
  else if (promptStyle === 'cursor_rules') title = 'Cursor / Windsurf System Rules (.cursorrules)';
  else if (promptStyle === 'phased_sprints') title = '4-Phase Sprint Prompts (Incremental Build)';
  else if (promptStyle === 'senior_architect_rfc') title = 'Senior Technical RFC & Design Critique';

  return {
    style: promptStyle,
    targetModel,
    title,
    charCount,
    wordCount,
    content,
    copyableMarkdown: content,
  };
}

function buildXmlMegaPrompt(
  doc: PRDDocument,
  isIndo: boolean,
  includeAntiPatterns: boolean,
  includeXmlTags: boolean
): string {
  const parts: string[] = [];

  const roleText = isIndo
    ? `Bertindaklah sebagai Senior Full-Stack Software Engineer & Technical Product Architect kelas dunia. Tugas Anda adalah membangun aplikasi berikut dari nol secara modular, bersih (clean code), bebas bug, dan langsung dapat dijalankan tanpa placeholder kosong atau fungsi dummy.`
    : `You are a world-class Senior Full-Stack Software Engineer and Technical Product Architect. Your mission is to build the following production-grade application end-to-end with clean code, modular architecture, robust error boundaries, and zero placeholder dummy functions.`;

  if (includeXmlTags) {
    parts.push(`<system_instruction>\n${roleText}\n</system_instruction>`);
  } else {
    parts.push(`### ROLE & INSTRUCTION\n${roleText}\n`);
  }

  // Product Context
  const productContext = `
Nama Aplikasi: ${doc.appName || 'ToDo'}
Tagline: ${doc.tagline || 'Solusi digital modern'}
Kategori: ${doc.category || 'Web Application'}
Target URL Deployment: ${doc.deployUrl || 'https://todo.listo.id'}
Problem Statement: ${doc.problemStatement || 'Belum diisi'}
Value Proposition: ${doc.valueProposition || 'Belum diisi'}
Target Pengguna: ${doc.targetAudience || 'Pengguna umum'}
`.trim();

  if (includeXmlTags) {
    parts.push(`<product_context>\n${productContext}\n</product_context>`);
  } else {
    parts.push(`### KONTEKS PRODUK\n${productContext}\n`);
  }

  // Tech Stack & Architecture
  const techStackText = `
Frontend: ${doc.techStack.frontend || 'React with TypeScript'}
Styling: ${doc.techStack.styling || 'Tailwind CSS'}
Backend: ${doc.techStack.backend || 'Node.js / Express or Next.js'}
Database & Storage: ${doc.techStack.database || 'PostgreSQL or Firestore'}
Autentikasi: ${doc.techStack.auth || 'Session / JWT / Firebase Auth'}
State Management: ${doc.techStack.stateManagement || 'React Hooks / Zustand'}
Integrasi / API Eksternal: ${doc.techStack.thirdPartyApis?.length ? doc.techStack.thirdPartyApis.join(', ') : 'None / Built-in'}
`.trim();

  if (includeXmlTags) {
    parts.push(`<tech_stack_and_constraints>\n${techStackText}\n</tech_stack_and_constraints>`);
  } else {
    parts.push(`### SPESIFIKASI TECH STACK\n${techStackText}\n`);
  }

  // Core Features
  let featuresText = '';
  if (doc.coreFeatures && doc.coreFeatures.length > 0) {
    featuresText = doc.coreFeatures
      .map((feat, idx) => {
        const criteria = feat.acceptanceCriteria?.length
          ? feat.acceptanceCriteria.map((c) => `    - Acceptance: ${c}`).join('\n')
          : '    - Acceptance: Berfungsi mulus tanpa error state.';
        return `${idx + 1}. [${feat.priority}] ${feat.title}\n  - Deskripsi: ${feat.description}\n${feat.userStory ? `  - User Story: ${feat.userStory}\n` : ''}${criteria}`;
      })
      .join('\n\n');
  } else {
    featuresText = 'Fitur standar aplikasi interaktif.';
  }

  if (includeXmlTags) {
    parts.push(`<functional_specifications>\n${featuresText}\n</functional_specifications>`);
  } else {
    parts.push(`### SPESIFIKASI FITUR FUNGSIONAL\n${featuresText}\n`);
  }

  // Data Models
  if (doc.dataModels && doc.dataModels.length > 0) {
    const modelsText = doc.dataModels
      .map((model) => {
        const fields = model.fields
          .map((f) => `    - ${f.name}: ${f.type} (${f.isRequired ? 'Required' : 'Optional'}) - ${f.description}`)
          .join('\n');
        return `Entitas: ${model.entityName}\nDeskripsi: ${model.description}\nStruktur Field:\n${fields}`;
      })
      .join('\n\n');

    if (includeXmlTags) {
      parts.push(`<data_schema_and_types>\n${modelsText}\n</data_schema_and_types>`);
    } else {
      parts.push(`### SKEMA DATA & ENTITAS\n${modelsText}\n`);
    }
  }

  // Edge cases
  if (doc.edgeCases && doc.edgeCases.length > 0) {
    const edgeText = doc.edgeCases
      .map(
        (ec, i) =>
          `${i + 1}. Skenario: ${ec.scenario}\n   Perilaku Diharapkan: ${ec.expectedBehavior}\n   Fallback/Mitigasi: ${ec.fallbackOrRecovery}`
      )
      .join('\n');

    if (includeXmlTags) {
      parts.push(`<edge_cases_and_error_handling>\n${edgeText}\n</edge_cases_and_error_handling>`);
    } else {
      parts.push(`### PENANGANAN KASUS EKSTREM & ERROR\n${edgeText}\n`);
    }
  }

  // Non-Functional
  if (doc.nonFunctional && doc.nonFunctional.length > 0) {
    const nfrText = doc.nonFunctional
      .map((nf) => `- [${nf.category}] ${nf.requirement} (Target: ${nf.metric})`)
      .join('\n');

    if (includeXmlTags) {
      parts.push(`<non_functional_requirements>\n${nfrText}\n</non_functional_requirements>`);
    } else {
      parts.push(`### PERSYARATAN NON-FUNGSIONAL\n${nfrText}\n`);
    }
  }

  // Anti-patterns and guardrails
  if (includeAntiPatterns) {
    const outOfScopeText = doc.outOfScope?.length
      ? doc.outOfScope.map((item) => `- ${item}`).join('\n')
      : '- Fitur kompleks yang tidak disebutkan dalam PRD';

    const antiPatterns = `
JANGAN LAKUKAN (STRICT ANTI-PATTERNS):
1. JANGAN gunakan 'alert()' atau 'confirm()' bawaan browser. Gunakan modal atau feedback UI modern.
2. JANGAN membuat placeholder kosong atau 'TODO: implement later' pada fungsi inti. Tulis implementasi lengkap.
3. JANGAN mengabaikan validasi input formulir atau state error saat fetch data gagal.
4. JANGAN membuat inline styles sembarangan; patuhi Tailwind CSS secara konsisten.
5. JANGAN menyimpang dari tech stack yang telah ditentukan di atas.

DILUAR RUANG LINGKUP (OUT OF SCOPE):
${outOfScopeText}
`.trim();

    if (includeXmlTags) {
      parts.push(`<guardrails_and_anti_patterns>\n${antiPatterns}\n</guardrails_and_anti_patterns>`);
    } else {
      parts.push(`### ATURAN PEMBATAS (GUARDRAILS & ANTI-PATTERNS)\n${antiPatterns}\n`);
    }
  }

  // Acceptance Checklist
  const checklist = `
Sebelum memberikan hasil akhir, pastikan:
1. Seluruh kode terketik lengkap, ber-tipe kuat TypeScript (tanpa 'any' liar).
2. UI responsif untuk layar desktop dan mobile.
3. Data state terhubung langsung ke tampilan (tidak hanya tampilan statis).
4. Seluruh fitur P0 dapat langsung dicoba dan berfungsi tanpa error di console.
`.trim();

  if (includeXmlTags) {
    parts.push(`<final_acceptance_checklist>\n${checklist}\n</final_acceptance_checklist>`);
  } else {
    parts.push(`### CHECKLIST PENERIMAAN AKHIR\n${checklist}\n`);
  }

  return parts.join('\n\n');
}

function buildCursorRulesPrompt(doc: PRDDocument, isIndo: boolean): string {
  return `# .cursorrules for ${doc.appName || 'ToDo'}
# Role & Architecture Guidelines

## Project Context
You are working on **${doc.appName || 'ToDo'}** - ${doc.tagline || 'Modern Task Application'}.
Category: ${doc.category}
Target Deployment URL: ${doc.deployUrl || 'https://todo.listo.id'}
Target Audience: ${doc.targetAudience}

## Technology Stack
- **Frontend**: ${doc.techStack.frontend}
- **Styling**: ${doc.techStack.styling}
- **Backend**: ${doc.techStack.backend}
- **Database**: ${doc.techStack.database}
- **Auth**: ${doc.techStack.auth}
- **State**: ${doc.techStack.stateManagement}

## Core Architectural Rules
1. **Never use dummy placeholders**: Always write real, working logic and functional handlers.
2. **Type Safety**: Strictly TypeScript. Define clear interfaces in \`src/types/\`.
3. **Component Modularity**: Keep components under 150 lines. Extract hooks into \`src/hooks/\` and utility helpers into \`src/utils/\`.
4. **State & Data Flow**: Keep deterministic state flow. Never trigger silent fallbacks that mask errors.
5. **No window.alert**: Always use in-app feedback dialogs or status badges.

## Critical Features (P0)
${doc.coreFeatures
  .filter((f) => f.priority === 'P0')
  .map((f) => `- [P0] ${f.title}: ${f.description}`)
  .join('\n')}

## Out of Scope
${doc.outOfScope?.map((s) => `- ${s}`).join('\n') || '- Unnecessary complex features not in PRD'}

## Edge Cases to Always Handle
${doc.edgeCases.map((e) => `- When ${e.scenario}: ${e.expectedBehavior}`).join('\n')}
`;
}

function buildPhasedSprintsPrompt(doc: PRDDocument, isIndo: boolean): string {
  return `# INCREMENTAL SPRINT PROMPTS UNTUK ${doc.appName.toUpperCase()}
Gunakan prompt bertahap ini ke model AI secara berurutan agar konteks tidak terpotong dan kualitas kode terjaga maksimal:
Target Deployment: ${doc.deployUrl || 'https://todo.listo.id'}

---
### 🚀 SPRINT 1: Scaffolding, Core Types & Setup
"Hai AI, kita akan membangun ${doc.appName} (${doc.tagline}) yang akan dideploy di ${doc.deployUrl || 'https://todo.listo.id'}.
Stack yang digunakan: ${doc.techStack.frontend}, ${doc.techStack.styling}, ${doc.techStack.backend}.
Pada langkah pertama ini, HANYA fokus untuk:
1. Menyiapkan seluruh TypeScript interfaces dan data types lengkap di \`src/types/\` berdasarkan entitas:
${doc.dataModels.map((m) => `   - ${m.entityName}: ${m.description}`).join('\n')}
2. Membuat seed data deterministik untuk prototyping.
3. Menyiapkan layout utama (header, navigasi, wrapper responsif).
Belum perlu membuat detail form yang rumit. Pastikan kompilasi bersih tanpa error TypeScript."

---
### ⚙️ SPRINT 2: Business Logic & Data Stores
"Langkah kedua:
Implementasikan state management dan fungsi logika inti murni di \`src/utils/\` atau custom hooks.
Fitur inti yang harus aktif logikanya:
${doc.coreFeatures.map((f) => `- [${f.priority}] ${f.title}: ${f.description}`).join('\n')}
Sediakan unit test atau verifikasi logika untuk memastikan kalkulasi dan transisi state akurat."

---
### 🎨 SPRINT 3: Interactive UI Views & User Flows
"Langkah ketiga:
Rakit seluruh antarmuka pengguna interaktif:
1. Hubungkan form input ke state yang telah dibuat di Sprint 2.
2. Sediakan tampilan interaktif dengan transisi halus dan feedback visual yang jelas.
3. Pastikan tidak ada tombol mati (dead clicks) dan setiap aksi pengguna memperbarui tampilan."

---
### 🛡️ SPRINT 4: Edge Cases, Error Handling & Production Audit
"Langkah keempat (Finalisasi & Hardening):
Terapkan penanganan skenario ekstrem berikut:
${doc.edgeCases.map((e) => `- ${e.scenario} => ${e.expectedBehavior} (Mitigasi: ${e.fallbackOrRecovery})`).join('\n')}
Pastikan zero console errors, audit aksesibilitas (aria-labels), dan performa kilat."
`;
}

function buildSeniorArchitectRfcPrompt(doc: PRDDocument, isIndo: boolean): string {
  return `# REQUEST FOR COMMENTS (RFC) & ARCHITECTURAL REVIEW
Tujukan prompt ini ke AI untuk mengaudit desain sistem sebelum mulai coding:

"Sebagai Senior Enterprise Software Architect, tolong review dan beri kritik tajam pada spesifikasi teknis dan PRD aplikasi berikut:

PRODUK: ${doc.appName}
TAGLINE: ${doc.tagline}
STACK: ${doc.techStack.frontend} | ${doc.techStack.backend} | ${doc.techStack.database}
FITUR INTI:
${doc.coreFeatures.map((f) => `- [${f.priority}] ${f.title}`).join('\n')}

Tolong analisis dalam 4 aspek kritis:
1. **Bottleneck & Scalability**: Di mana kemungkinan sistem akan lambat jika pengguna bertambah?
2. **Security & Data Exposure**: Celah keamanan apa yang harus diantisipasi pada autentikasi dan penyimpanan data?
3. **Simplicity vs Overengineering**: Apakah pilihan library dan arsitektur sudah proporsional atau terlalu rumit untuk MVP?
4. **Missing Technical Edge Cases**: Apa skenario kegagalan jaringan atau state race conditions yang belum saya antisipasi?

Beri saran alternatif kode dan pola arsitektur terbaik."
`;
}
