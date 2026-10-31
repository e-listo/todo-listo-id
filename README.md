# ToDo — PRD Maker & AI Prompt Architect

[![Live Demo](https://img.shields.io/badge/Live%20Demo-todo.listo.id-0284c7?style=for-the-badge&logo=googlechrome&logoColor=white)](https://todo.listo.id)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Apache%202.0-emerald?style=for-the-badge)](LICENSE)
[![Tests](https://img.shields.io/badge/Tests-Passing-success?style=for-the-badge&logo=node.js&logoColor=white)](#pengujian--testing)

> **Platform Perancang Product Requirement Document (PRD) Profesional & AI Prompt Architect Tingkat Tinggi.**  
> Membantu engineer, product manager, dan solo founder merancang arsitektur aplikasi secara presisi serta mengonversinya menjadi prompt AI terstruktur bebas halusinasi untuk model coding seperti **Claude 3.7**, **Gemini 3.8 Flash**, **GPT-4o**, **Cursor**, dan **Windsurf**.

🌐 **Alamat Produksi Resmi:** [https://todo.listo.id](https://todo.listo.id)

---

## 📑 Daftar Isi / Table of Contents

- [Bahasa Indonesia](#-bahasa-indonesia)
  - [Latar Belakang & Masalah](#1-latar-belakang--masalah)
  - [Fitur Utama](#2-fitur-utama)
  - [Arsitektur Sistem](#3-arsitektur-sistem)
  - [Tech Stack](#4-tumpukan-teknologi-tech-stack)
  - [Panduan Memulai Cepat (Local Setup)](#5-panduan-memulai-cepat-local-setup)
  - [Pengujian Unit (Testing)](#6-pengujian-unit-testing)
  - [Panduan Deployment ke todo.listo.id](#7-panduan-deployment-ke-todolistoid)
- [English](#-english-documentation)
  - [Overview & Problem Statement](#overview--problem-statement)
  - [Key Capabilities](#key-capabilities)
  - [System Architecture](#system-architecture)
  - [Quick Start](#quick-start)
  - [Production Deployment](#production-deployment)
- [Lisensi & Kontribusi](#-lisensi--license)

---

# 🇮🇩 Bahasa Indonesia

## 1. Latar Belakang & Masalah

Saat membangun aplikasi menggunakan model AI coding (Claude, Gemini, ChatGPT, Cursor, Copilot), masalah terbesar yang sering terjadi adalah **halusinasi arsitektur**, **konflik dependensi**, dan **logika bisnis yang melenceng**. Hal ini terjadi bukan karena model AI kurang pintar, melainkan karena **prompt yang diberikan terlalu samar, tidak memiliki batasan (guardrails), dan minim skenario kegagalan (edge cases)**.

**ToDo PRD Maker & AI Prompt Architect** hadir untuk memecahkan masalah ini dengan:
1. Menyediakan formulir terpandu untuk memetakan visi, fitur prioritas (MoSCoW), skema data, dan kasus ekstrem.
2. Melakukan audit real-time terhadap ketajaman dan kelengkapan spesifikasi (Skor 0–100).
3. Mengonversi spesifikasi menjadi format prompt AI siap pakai yang mengunci model pada standar industri.

---

## 2. Fitur Utama

### 🎯 1. Real-Time Audit Ketajaman Prompt (Score 0–100)
- Menilai 7 parameter kritis:
  - Definisi Konteks & Persona Produk (15 poin)
  - Spesifikasi Tech Stack & Library (15 poin)
  - Fitur Utama & Acceptance Criteria Given/When/Then (20 poin)
  - Penanganan Kasus Ekstrem & Error Boundaries (15 poin)
  - Aturan Anti-Patterns & Out of Scope (15 poin)
  - Definisi Model Data & Skema Tipe (10 poin)
  - Persyaratan Non-Fungsional / Standar Performa (10 poin)
- Dilengkapi saran konkret untuk mencapai skor **90+ (Ultra Presisi / Production Ready)**.

### ⚡ 2. AI Prompt Architect Multi-Format
Menghasilkan prompt teroptimasi berdasarkan target model:
- **XML-Tagged Mega Prompt**: Standar emas untuk Claude 3.7, Gemini 3.8, dan GPT-4o menggunakan tag semantik `<system_instruction>`, `<product_context>`, `<specifications>`, `<edge_cases>`, dan `<guardrails_and_anti_patterns>`.
- **.cursorrules**: File aturan arsitektur siap pakai untuk disimpan di root folder editor Cursor atau Windsurf.
- **4-Phase Sprint Prompts**: Dipecah secara bertahap (*Phase 1: Setup* $\rightarrow$ *Phase 2: Logic* $\rightarrow$ *Phase 3: Interactive UI* $\rightarrow$ *Phase 4: Hardening*) untuk mencegah pemotongan token context window.
- **Technical RFC & Critique**: Prompt untuk meminta AI mengaudit kelemahan skalabilitas dan keamanan sebelum mulai menulis kode.
- Tombol **1-Click Copy** dengan status tersalin instan dan unduh file `.md` / `.cursorrules`.

### 📋 3. PRD Form Builder & MoSCoW Prioritization
- **Visi & Masalah**: Nama aplikasi, problem statement, value proposition, dan persona target.
- **Fitur MoSCoW**: Pengelompokan P0 (Must Have), P1 (Should Have), P2 (Could Have) dengan Acceptance Criteria builder dan daftar *Out of Scope* (batasan negatif).
- **Model Data & Entitas**: Definisi kolom, tipe data TypeScript/SQL, dan status wajib.
- **Kasus Ekstrem (Edge Cases) & NFR**: Penanganan kegagalan koneksi, double-click race condition, dan batasan performa latensi.

### ✨ 4. One-Click AI Enhancement (Gemini Integration)
- Tombol **"Pertajam AI"** menghubungkan aplikasi ke model **Google Gemini 3.8 Flash** via backend proxy aman.
- Mendeteksi skenario kegagalan jaringan tersembunyi, kriteria pengujian Given/When/Then, dan saran perbaikan tagline yang dapat langsung diterapkan ke PRD dengan 1 klik.
- Memiliki fallback mesin sintesis lokal cerdas saat offline atau tanpa API key.

### 📄 5. Dokumen PRD Eksekutif & Ekspor
- Tampilan dokumen Markdown profesional dengan tabel matriks arsitektur, navigasi daftar isi, dan format siap cetak/simpan PDF.
- Tombol unduh file `.md` dan backup data dalam format JSON.

---

## 3. Arsitektur Sistem

Aplikasi dibangun dengan arsitektur modern full-stack TypeScript:

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Browser                          │
│     (https://todo.listo.id  atau  http://localhost:3000)    │
└──────────────────────────────┬──────────────────────────────┘
                               │
            ┌──────────────────┴──────────────────┐
            ▼                                     ▼
┌─────────────────────────────────┐ ┌───────────────────────────┐
│       React 19 + Vite SPA       │ │   Local Client Storage    │
│  - PRD Form Editor (MoSCoW)     │ │  - localStorage Cache     │
│  - Real-time Sharpness Scorer   │ │  - JSON Backup & Restore  │
│  - AI Prompt Architect Engine   │ │  - Markdown Exporter      │
│  - Executive Document Preview   │ └───────────────────────────┘
└───────────────┬─────────────────┘
                │ HTTP POST /api/ai/enhance
                ▼
┌─────────────────────────────────────────────────────────────┐
│                Express.js Server API Proxy                  │
│  - Menjaga kerahasiaan GEMINI_API_KEY di sisi server        │
│  - Validasi schema request & timeout abort handler (6s)     │
│  - Fallback ke offline heuristic engine jika timeout        │
└───────────────────────────────┬─────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│                 Google Gemini 3.8 Flash API                 │
│              (@google/genai TypeScript SDK)                 │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Tumpukan Teknologi (Tech Stack)

| Layer | Teknologi | Alasan Pemilihan |
| :--- | :--- | :--- |
| **Frontend Framework** | React 19 + TypeScript | Reaktivitas cepat, hook modern, dan type-safety penuh. |
| **Build Tool & Bundler** | Vite 8 + esbuild | Cold start kilat, HMR stabil, dan ukuran bundle minimal. |
| **Styling & Design** | Tailwind CSS v4 | Utility-first CSS modern tanpa runtime CSS-in-JS. |
| **Backend API Proxy** | Express.js + tsx | Proxy server-side aman untuk pemanggilan model Gemini. |
| **AI SDK** | `@google/genai` (v2.4+) | SDK resmi Google GenAI untuk Gemini 3.8 Flash. |
| **Icons & Motion** | Lucide React + Motion | Ikon SVG berbobot ringan dan transisi halus. |
| **Test Runner** | Node.js Test Runner (`node:test`) | Unit test native cepat tanpa dependensi Jest berat. |

---

## 5. Panduan Memulai Cepat (Local Setup)

### Prasyarat
- [Node.js](https://nodejs.org/) versi 18.0 atau lebih baru.
- npm atau pnpm.

### 1. Clone Repository
```bash
git clone https://github.com/your-username/todo-prd-maker.git
cd todo-prd-maker
```

### 2. Install Dependensi
```bash
npm install
```

### 3. Konfigurasi Environment Variables
Salin file template `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```
Isi konfigurasi dalam file `.env`:
```env
# API Key Gemini dari Google AI Studio (Opsional, tersedia fallback lokal cerdas jika kosong)
GEMINI_API_KEY="AIzaSy..."

# Target URL aplikasi
APP_URL="https://todo.listo.id"
```

### 4. Jalankan Server Pengembangan
```bash
npm run dev
```
Buka browser di `http://localhost:3000`.

---

## 6. Pengujian Unit (Testing)

Aplikasi dilengkapi unit test otomatis untuk memvalidasi algoritma audit skor ketajaman, generator prompt XML, dan eksportir markdown:

```bash
# Menjalankan seluruh rangkaian tes
npm test
```

Contoh output tes:
```text
✔ evaluatePromptSharpness: scores template PRD highly (2.1ms)
✔ evaluatePromptSharpness: gives lower score and actionable advice on empty PRD (0.2ms)
✔ generateAIPrompt: outputs valid XML tags for xml_mega_prompt style (1.0ms)
✔ generateAIPrompt: outputs .cursorrules format when selected (0.4ms)
✔ generateAIPrompt: outputs phased sprints format (0.5ms)
✔ exportPRDToMarkdown: produces structured document with MoSCoW headings (20.7ms)
1..6
# tests 6
# pass 6
# fail 0
```

---

## 7. Panduan Deployment ke todo.listo.id

Untuk mempublikasikan aplikasi ini ke domain produksi [https://todo.listo.id](https://todo.listo.id):

### 1. Build Aplikasi untuk Produksi
```bash
npm run build
```
Perintah ini akan mengompilasi client SPA ke folder `/dist` dan mem-bundle `server.ts` ke `dist/server.js`.

### 2. Jalankan Server Produksi
```bash
npm start
```
Server akan aktif melayani request pada port 3000 (atau port yang didefinisikan pada variable `PORT`).

### 3. Konfigurasi Reverse Proxy (Nginx) & SSL
Contoh konfigurasi Nginx pada server publik `todo.listo.id`:
```nginx
server {
    listen 80;
    server_name todo.listo.id;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name todo.listo.id;

    ssl_certificate /etc/letsencrypt/live/todo.listo.id/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/todo.listo.id/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
    }
}
```

---

# 🇬🇧 English Documentation

## Overview & Problem Statement

When building software with AI coding models (such as Claude 3.7 Sonnet, Google Gemini 3.8 Flash, or GPT-4o), developer prompts are often ambiguous, lacking explicit boundaries and failure edge cases. This leads to code hallucinations, conflicting architectural dependencies, and costly rework.

**ToDo — PRD Maker & AI Prompt Architect** is an interactive, production-grade tool designed to structure your application requirements and automatically transform them into razor-sharp, zero-hallucination AI system prompts.

🔗 **Live Production URL:** [https://todo.listo.id](https://todo.listo.id)

---

## Key Capabilities

1. **Real-time Prompt Sharpness Audit (0–100 Score)**:
   Evaluates 7 critical software engineering criteria: Role/Context clarity, concrete Tech Stack specifications, Given/When/Then Acceptance Criteria, Edge Cases & Error Boundaries, Negative Anti-Patterns, Data Entities, and Non-Functional Requirements.
2. **Multi-Format AI Prompt Engine**:
   - **XML-Tagged Mega Prompt**: Structured with `<system_instruction>`, `<product_context>`, `<specifications>`, and `<guardrails>` for maximum model adherence.
   - **.cursorrules**: Ready-to-use workspace rules for Cursor and Windsurf IDEs.
   - **4-Phase Incremental Sprints**: Chunked sprint prompts to prevent context window token overflow.
   - **Technical RFC & Critique**: Architectural audit prompts for pre-implementation reviews.
3. **MoSCoW PRD Specification Builder**:
   Easily prioritize requirements into Must-Have (P0), Should-Have (P1), and Could-Have (P2), complete with an explicit **Out-of-Scope** guardrail list.
4. **Gemini 3.8 Flash Integration**:
   One-click AI feature analysis detects missing network failure scenarios, security constraints, and acceptance criteria with seamless local heuristic fallback.
5. **Executive Export**:
   Download clean `.md` documentation, JSON state backups, or print directly to PDF.

---

## System Architecture

```
User (https://todo.listo.id)
       │
       ▼
React 19 + Tailwind v4 SPA (Vite)
 ├── PRD Form Editor & MoSCoW Prioritization
 ├── Sharpness Audit Engine (Real-time 0-100)
 └── Multi-format AI Prompt Generator
       │
       │ HTTP /api/ai/enhance
       ▼
Express.js Backend API
 ├── Server-Side Gemini API Proxy (@google/genai)
 └── Intelligent Heuristic Fallback Engine
```

---

## Quick Start

```bash
# 1. Clone repository
git clone https://github.com/your-username/todo-prd-maker.git
cd todo-prd-maker

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env

# 4. Start development server
npm run dev

# 5. Run automated unit tests
npm test
```

---

## Production Deployment

```bash
# Build production bundle
npm run build

# Start Node production server
npm start
```
Serve via Nginx or Cloudflare reverse proxy pointed to port 3000 with SSL certificates for `https://todo.listo.id`.

---

## 📜 Lisensi / License

Didistribusikan di bawah lisensi **Apache License 2.0**. Silakan lihat file `LICENSE` untuk informasi lebih lengkap.

---
*Dibuat untuk developer dan product builder di [todo.listo.id](https://todo.listo.id).*
