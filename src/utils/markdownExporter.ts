import { PRDDocument } from '../types/prd.js';

export function exportPRDToMarkdown(doc: PRDDocument): string {
  const dateFormatted = new Date(doc.updatedAt || doc.createdAt).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const p0Features = doc.coreFeatures.filter((f) => f.priority === 'P0');
  const p1Features = doc.coreFeatures.filter((f) => f.priority === 'P1');
  const p2Features = doc.coreFeatures.filter((f) => f.priority === 'P2');

  const p0Rendered = p0Features.length
    ? p0Features
        .map(
          (f, i) => `#### ${i + 1}. ${f.title}
- **Deskripsi:** ${f.description}
${f.userStory ? `- **User Story:** *${f.userStory}*\n` : ''}- **Acceptance Criteria:**
${f.acceptanceCriteria?.map((c) => `  - [ ] ${c}`).join('\n') || '  - [ ] Berjalan stabil tanpa error.'}`
        )
        .join('\n\n')
    : '_Belum ada fitur prioritas P0._';

  const p1Rendered = p1Features.length
    ? p1Features
        .map(
          (f, i) => `#### ${i + 1}. ${f.title}
- **Deskripsi:** ${f.description}
- **Acceptance Criteria:**
${f.acceptanceCriteria?.map((c) => `  - [ ] ${c}`).join('\n') || '  - [ ] Berjalan stabil.'}`
        )
        .join('\n\n')
    : '_Belum ada fitur prioritas P1._';

  const p2Rendered = p2Features.length
    ? p2Features
        .map(
          (f, i) => `#### ${i + 1}. ${f.title}
- **Deskripsi:** ${f.description}`
        )
        .join('\n\n')
    : '_Belum ada fitur prioritas P2._';

  const dataModelsRendered = doc.dataModels?.length
    ? doc.dataModels
        .map((m) => {
          const fieldsTable = m.fields
            .map((f) => `| \`${f.name}\` | \`${f.type}\` | ${f.isRequired ? '✅ Ya' : '❌ Tidak'} | ${f.description} |`)
            .join('\n');
          return `### ${m.entityName}
*${m.description}*

| Nama Kolom | Tipe Data | Wajib | Keterangan |
| :--- | :--- | :---: | :--- |
${fieldsTable}`;
        })
        .join('\n\n')
    : '_Belum ada model data didefinisikan._';

  const edgeCasesRendered = doc.edgeCases?.length
    ? `| No | Skenario Ekstrem / Error | Perilaku yang Diharapkan | Mitigasi / Fallback |
| :---: | :--- | :--- | :--- |
` +
      doc.edgeCases
        .map(
          (e, idx) =>
            `| ${idx + 1} | **${e.scenario}** | ${e.expectedBehavior} | ${e.fallbackOrRecovery} |`
        )
        .join('\n')
    : '_Belum ada edge case terdefinisi._';

  const nonFunctionalRendered = doc.nonFunctional?.length
    ? `| Kategori | Persyaratan Teknis | Target Metrik |
| :--- | :--- | :--- |
` +
      doc.nonFunctional
        .map((nf) => `| **${nf.category}** | ${nf.requirement} | \`${nf.metric}\` |`)
        .join('\n')
    : '_Belum ada persyaratan non-fungsional._';

  const outOfScopeRendered = doc.outOfScope?.length
    ? doc.outOfScope.map((s) => `- ⛔ ${s}`).join('\n')
    : '- Tidak ada pembatasan khusus.';

  const metricsRendered = doc.successMetrics?.length
    ? doc.successMetrics.map((sm) => `- 🎯 **${sm.metric}**: ${sm.targetGoal}`).join('\n')
    : '- MVP selesai tepat waktu dan bebas blocker kritis.';

  return `# Product Requirement Document (PRD)
## ${doc.appName || 'ToDo'}
> *${doc.tagline || 'Manajemen Tugas Cerdas'}*

---
- **Kategori:** ${doc.category || 'Web Application'}
- **Versi Dokumen:** v${doc.version || '1.0.0'}
- **Target Deployment URL:** [${doc.deployUrl || 'https://todo.listo.id'}](${doc.deployUrl || 'https://todo.listo.id'})
- **Terakhir Diperbarui:** ${dateFormatted}
- **Status Dokumen:** Ready for Engineering & AI Generation

---

## Daftar Isi
1. [Ringkasan Eksekutif & Visi](#1-ringkasan-eksekutif--visi)
2. [Target Pengguna & Persona](#2-target-pengguna--persona)
3. [Arsitektur Teknis & Tech Stack](#3-arsitektur-teknis--tech-stack)
4. [Spesifikasi Fitur (MoSCoW Prioritization)](#4-spesifikasi-fitur-moscow-prioritization)
5. [Skema Data & Entitas Utama](#5-skema-data--entitas-utama)
6. [Persyaratan Non-Fungsional (NFR)](#6-persyaratan-non-fungsional-nfr)
7. [Penanganan Kasus Ekstrem (Edge Cases)](#7-penanganan-kasus-ekstrem-edge-cases)
8. [Batasan Ruang Lingkup (Out of Scope)](#8-batasan-ruang-lingkup-out-of-scope)
9. [Metrik Keberhasilan (Success KPIs)](#9-metrik-keberhasilan-success-kpis)

---

## 1. Ringkasan Eksekutif & Visi
### 1.1 Masalah (Problem Statement)
${doc.problemStatement || 'Masalah belum dijabarkan.'}

### 1.2 Solusi & Proposisi Nilai (Value Proposition)
${doc.valueProposition || 'Solusi belum dijabarkan.'}

---

## 2. Target Pengguna & Persona
${doc.targetAudience || 'Pengguna umum.'}

---

## 3. Arsitektur Teknis & Tech Stack

| Layer Arsitektur | Teknologi / Library Terpilih | Catatan Implementasi |
| :--- | :--- | :--- |
| **Frontend Framework** | \`${doc.techStack.frontend}\` | Komponen modular dan reaktif |
| **Styling & Design System** | \`${doc.techStack.styling}\` | Utility-first, zero custom runtime CSS |
| **Backend & API** | \`${doc.techStack.backend}\` | RESTful / Server Actions / Microservices |
| **Database & Cache** | \`${doc.techStack.database}\` | Persistent schema storage |
| **Autentikasi & Keamanan** | \`${doc.techStack.auth}\` | Role-based Access Control (RBAC) |
| **State Management** | \`${doc.techStack.stateManagement}\` | Client state cache |
| **Integrasi Eksternal** | \`${doc.techStack.thirdPartyApis?.join(', ') || 'N/A'}\` | Third-party APIs & SDKs |

---

## 4. Spesifikasi Fitur (MoSCoW Prioritization)

### 4.1 Must-Have (P0 - Critical for MVP)
${p0Rendered}

### 4.2 Should-Have (P1 - High Priority)
${p1Rendered}

### 4.3 Could-Have (P2 - Nice to Have)
${p2Rendered}

---

## 5. Skema Data & Entitas Utama
${dataModelsRendered}

---

## 6. Persyaratan Non-Fungsional (NFR)
${nonFunctionalRendered}

---

## 7. Penanganan Kasus Ekstrem (Edge Cases)
${edgeCasesRendered}

---

## 8. Batasan Ruang Lingkup (Out of Scope)
Berikut adalah hal-hal yang secara sengaja **TIDAK** dikerjakan pada iterasi saat ini untuk menjaga fokus dan kecepatan rilis:
${outOfScopeRendered}

---

## 9. Metrik Keberhasilan (Success KPIs)
${metricsRendered}

---
*Dokumen ini dibuat secara terstruktur dengan SpecCraft PRD Maker untuk memberikan arahan prompt presisi tinggi kepada AI coding models.*
`;
}
