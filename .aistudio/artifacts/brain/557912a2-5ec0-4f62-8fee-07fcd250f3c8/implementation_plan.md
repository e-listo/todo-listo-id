# Dokumentasi Repository README.md untuk ToDo (todo.listo.id)

Dokumentasi profesional, berstandar open-source, dan bilingual (Bahasa Indonesia & English) untuk repository GitHub aplikasi **ToDo - PRD Maker & AI Prompt Architect**, mencakup arsitektur teknis, panduan instalasi, live production demo di https://todo.listo.id, serta instruksi AI prompt engineering.

## User Review & Critical Decisions

> [!IMPORTANT]
> Berdasarkan konfirmasi pada sesi tanya jawab sebelumnya:
> - **Format Bahasa**: Bilingual (Bahasa Indonesia & English) dengan navigasi lompat cepat di bagian atas dokumen.
> - **Cakupan Konten**: Lengkap dan mendalam — mencakup Visi Produk, Arsitektur Sistem, Fitur Unggulan (PRD Builder & Multi-Format AI Prompt Architect), Tech Stack, Panduan Instalasi Lokal, Deployment ke `https://todo.listo.id`, serta Kontribusi & Lisensi.
> - **Live Demo & Badges**: Menampilkan badge status (Build Passing, Version 1.0.0, License Apache-2.0, Tech Stack) serta tautan langsung ke produksi di [https://todo.listo.id](https://todo.listo.id).

---

## 1. Overview & Core Concept

- **What It Does**: Memberikan dokumentasi teknis yang jelas bagi developer, contributor, dan product manager yang membuka repository GitHub ToDo. Menjelaskan cara menjalankan aplikasi secara lokal, cara mengonfigurasi API Gemini, serta cara memanfaatkan generator prompt XML dan audit ketajaman prompt untuk membangun aplikasi akurat dengan model AI coding.
- **Target Audience**: Software Engineers, Open-Source Contributors, Product Managers, dan Technical Architects.
- **Key Value**: Mempermudah onboarding tim, standarisasi kontribusi kode, dan memberikan referensi arsitektur yang solid untuk deployment custom domain di `https://todo.listo.id`.

---

## 2. Struktur Konten README.md

Dokumen `README.md` akan disusun dengan struktur berikut:

1. **Header & Badges**:
   - Logo / Title: **ToDo — PRD Maker & AI Prompt Architect**
   - Badges: `Live Demo: todo.listo.id`, `TypeScript: 5+`, `React: 19`, `Tailwind: v4`, `License: Apache 2.0`, `Build: Passing`.
   - Live Demo URL callout box: [https://todo.listo.id](https://todo.listo.id).

2. **Daftar Isi (Table of Contents)**:
   - Navigasi cepat untuk versi Bahasa Indonesia dan English.

3. **Tentang Aplikasi (About the Project)**:
   - Latar belakang masalah (halusinasi AI koding karena prompt yang samar).
   - Solusi: PRD terstruktur MoSCoW + Generator Mega-Prompt XML dengan guardrails ketat.

4. **Fitur Utama (Key Features)**:
   - 🎯 **Audit Skor Ketajaman Prompt (0-100)**: Evaluasi kelengkapan spesifikasi secara real-time.
   - ⚡ **AI Prompt Architect Multi-Format**:
     - *XML-Tagged Mega Prompt* (Claude 3.7 / Gemini 3.8 / GPT-4o)
     - *.cursorrules* untuk Cursor dan Windsurf
     - *4-Phase Incremental Sprints* untuk menghindari token cutoff
     - *Senior Technical RFC & Review*
   - 📋 **PRD Form Builder & MoSCoW Prioritization** (P0, P1, P2 + Out of Scope guardrails).
   - 🗄️ **Model Data & Entitas Builder** (TypeScript & SQL types generator).
   - 🛡️ **Edge Cases & Non-Functional Requirements Matrix**.
   - ✨ **One-Click AI Enhancement** (Integrasi Gemini 3.8 Flash + mesin fallback lokal).
   - 📄 **Executive Markdown & PDF Export**.

5. **Arsitektur Teknis & Tech Stack (System Architecture)**:
   - Diagram alur sistem (ASCII diagram).
   - Rincian dependensi (React 19, Vite, Tailwind CSS v4, Express.js proxy, `@google/genai`).

6. **Panduan Memulai Cepat (Getting Started & Setup)**:
   - Prasyarat (Node.js >= 18, npm).
   - Langkah clone dan instalasi dependensi (`npm install`).
   - Konfigurasi environment variable (`.env` dengan `GEMINI_API_KEY` dan `APP_URL`).
   - Menjalankan server pengembangan (`npm run dev`).
   - Menjalankan unit tests (`npm test` / `npx tsx --test`).
   - Membangun untuk produksi (`npm run build`).

7. **Panduan Deployment ke Custom Domain (Deploy to todo.listo.id)**:
   - Langkah konfigurasi reverse proxy (Nginx / Cloudflare / Cloud Run) untuk mengarahkan traffic domain `https://todo.listo.id` ke container/server port 3000.
   - Konfigurasi SSL HTTPS otomatis.

8. **Panduan Kontribusi & Lisensi (Contributing & License)**:
   - Standar branching dan pull request.
   - Lisensi Apache 2.0.

---

## 3. Diagram Arsitektur Teknis

```
┌──────────────────────────────────────────────────────────┐
│                   User Browser Client                    │
│   (https://todo.listo.id or http://localhost:3000)       │
└────────────────────────────┬─────────────────────────────┘
                             │
            ┌────────────────┴────────────────┐
            ▼                                 ▼
┌───────────────────────────────┐ ┌────────────────────────┐
│     React 19 + Vite SPA       │ │    Storage & Cache     │
│  - PRD Form Editor (MoSCoW)   │ │  - localStorage        │
│  - Prompt Sharpness Scorer    │ │  - JSON Backup Export  │
│  - Multi-Format Prompt Engine │ │  - Markdown Exporter   │
│  - Live Document Preview      │ └────────────────────────┘
└───────────────┬───────────────┘
                │ /api/ai/enhance
                ▼
┌──────────────────────────────────────────────────────────┐
│              Express.js Backend API Proxy                │
│  - Secure API Key Handling (GEMINI_API_KEY)              │
│  - Request Validation & Fallback Synthesizer             │
└───────────────────────────────┬──────────────────────────┘
                                │
                                ▼
┌──────────────────────────────────────────────────────────┐
│              Google Gemini 3.8 Flash SDK                 │
│  - Architectural audit & edge case extraction            │
│  - Acceptance criteria generation                        │
└──────────────────────────────────────────────────────────┘
```

---

## 4. Rencana Eksekusi

1. **Pembuatan File `README.md`**:
   - Menulis file `/README.md` dengan format Markdown yang rapi, tipografi bersih, badge interaktif, dan konten lengkap bilingual.
2. **Penambahan Script Test pada `package.json`**:
   - Menambahkan script `"test": "tsx --test src/utils/prdLogic.test.ts"` agar developer dapat menjalankan pengujian unit dengan `npm test`.
3. **Verifikasi Build & Dokumentasi**:
   - Memastikan tidak ada link rusak atau format yang cacat.
   - Menjalankan tes dan kompilasi untuk memverifikasi keutuhan aplikasi.
