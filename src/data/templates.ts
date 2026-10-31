import { PRDDocument } from '../types/prd.js';

export interface TemplateDefinition {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  data: Omit<PRDDocument, 'id' | 'createdAt' | 'updatedAt'>;
}

export const PRD_TEMPLATES: TemplateDefinition[] = [
  {
    id: 'todo-listo-app',
    name: 'ToDo App (todo.listo.id)',
    description: 'Aplikasi manajemen tugas harian modern, cepat, dan berkinerja tinggi yang siap dideploy di https://todo.listo.id.',
    category: 'Productivity & Task Management',
    icon: 'CheckSquare',
    data: {
      appName: 'ToDo',
      tagline: 'Manajemen Tugas Cerdas & Pelacak Produktivitas Harian Super Cepat',
      category: 'Web & Mobile Task Application',
      version: '1.0.0',
      deployUrl: 'https://todo.listo.id',
      targetAudience: 'Profesional, freelancer, pelajar, dan tim kecil yang membutuhkan pelacak to-do list bersih, responsif, dan bebas gangguan.',
      problemStatement: 'Aplikasi manajemen tugas yang ada di pasaran seringkali lambat, sarat fitur berlebih (bloated), memerlukan login berbelit-belit, dan tidak ramah keyboard sehingga menghambat alur kerja cepat.',
      valueProposition: 'Input tugas kilat dalam hitungan detik, navigasi keyboard instan, visualisasi prioritas (Tinggi, Sedang, Rendah), checklist subtugas, dan kemampuan offline-first yang andal di https://todo.listo.id.',
      coreFeatures: [
        {
          id: 'todo-feat-1',
          title: 'Quick Task Capture & Inline Creation',
          priority: 'P0',
          description: 'Input pembuatan tugas cepat dengan deadline waktu, label kategori, dan prioritas tanpa perlu berpindah halaman.',
          userStory: 'Sebagai pengguna, saya ingin mengetik tugas dan menekan Enter agar langsung tersimpan dalam daftar hari ini.',
          acceptanceCriteria: [
            'Input langsung aktif (auto-focus) dan memproses tombol Enter untuk simpan instan.',
            'Tersedia tombol pemilih prioritas (Tinggi, Sedang, Rendah) dan tanggal jatuh tempo (due date).',
            'Tugas baru muncul seketika di urutan teratas tanpa refresh halaman.'
          ],
        },
        {
          id: 'todo-feat-2',
          title: 'Multi-View & Filter (Today, Upcoming, Completed, Kanban)',
          priority: 'P0',
          description: 'Pengelompokan tampilan tugas berdasarkan tanggal (Hari Ini, Mendatang, Selesai) serta papan Kanban visual.',
          userStory: 'Sebagai pengguna, saya ingin memfilter tugas hari ini agar fokus pada prioritas utama tanpa terdistraksi tugas masa depan.',
          acceptanceCriteria: [
            'Filter instan antar tab (Semua, Hari Ini, Mendatang, Selesai) dalam waktu < 30ms.',
            'Perhitungan counter jumlah tugas aktif dan tugas selesai terupdate secara real-time.'
          ],
        },
        {
          id: 'todo-feat-3',
          title: 'Checklist Subtugas & Progress Tracker',
          priority: 'P0',
          description: 'Kemampuan memecah tugas besar menjadi subtugas terperinci dengan progress bar persentase penyelesaian.',
          userStory: 'Sebagai pengguna, saya ingin menandai checklist subtugas agar melihat progres pengerjaan secara bertahap.',
          acceptanceCriteria: [
            'Setiap subtugas memiliki checkbox interaktif yang memperbarui persentase progress tugas utama.',
            'Menandai selesai seluruh subtugas otomatis memberi rekomendasi untuk menyelesaikan tugas induk.'
          ],
        },
        {
          id: 'todo-feat-4',
          title: 'Offline-First Sync & Data Backup',
          priority: 'P1',
          description: 'Aplikasi tetap dapat digunakan secara penuh saat koneksi internet terputus di https://todo.listo.id dan otomatis sinkron saat online kembali.',
          userStory: 'Sebagai pekerja remote, saya ingin tetap bisa mencatat to-do saat berada di area tanpa sinyal.',
          acceptanceCriteria: [
            'Data tersimpan di penyimpanan lokal (IndexedDB / LocalStorage) dengan aman.',
            'Tersedia tombol Ekspor & Impor JSON cadangan untuk memindahkan data antar perangkat.'
          ],
        },
        {
          id: 'todo-feat-5',
          title: 'Quick Search & Keyboard Shortcuts (Cmd+K)',
          priority: 'P1',
          description: 'Modal pencarian instan dan shortcut keyboard untuk navigasi cepat tanpa mouse.',
          userStory: 'Sebagai power user, saya ingin menekan shortcut keyboard untuk menandai tugas selesai atau mencari tugas lama.',
          acceptanceCriteria: [
            'Menekan "/" atau "Cmd+K" langsung membuka kotak pencarian tugas.',
            'Pencarian teks memfilter judul dan deskripsi tugas secara instan.'
          ]
        }
      ],
      outOfScope: [
        'Tidak mencakup fitur video conference atau panggilan suara internal pada rilis v1.',
        'Tidak mencakup sistem integrasi pembayaran langganan kartu kredit berbayar pada fase MVP.'
      ],
      techStack: {
        frontend: 'React 19 + TypeScript (Vite PWA)',
        styling: 'Tailwind CSS v4 (Modern Minimalist)',
        backend: 'Node.js / Express API Proxy',
        database: 'PostgreSQL / IndexedDB Local Cache',
        auth: 'OAuth 2.0 / Local Session Passcode',
        stateManagement: 'React State + Custom Storage Hooks',
        thirdPartyApis: ['Lucide Icons', 'Web Notification API'],
      },
      nonFunctional: [
        {
          id: 'todo-nfr-1',
          category: 'Performance',
          requirement: 'Aksi toggle selesai tugas harus merespon secara instan (< 16ms optimistic UI update).',
          metric: '< 16ms response'
        },
        {
          id: 'todo-nfr-2',
          category: 'Security',
          requirement: 'Dukungan HTTPS penuh di domain produksi https://todo.listo.id dengan enkripsi data pengguna.',
          metric: '100% SSL HTTPS'
        },
        {
          id: 'todo-nfr-3',
          category: 'UX/Accessibility',
          requirement: 'Kontras warna tinggi untuk status tugas dan dukungan navigasi keyboard penuh (tabbing & enter).',
          metric: 'WCAG 2.1 AA Compliant'
        }
      ],
      dataModels: [
        {
          id: 'model-todo-1',
          entityName: 'Task',
          description: 'Entitas utama rekaman tugas pengguna.',
          fields: [
            { name: 'id', type: 'string (UUID)', isRequired: true, description: 'ID unik tugas' },
            { name: 'title', type: 'string', isRequired: true, description: 'Judul tugas to-do' },
            { name: 'description', type: 'string', isRequired: false, description: 'Catatan detail tambahan' },
            { name: 'isCompleted', type: 'boolean', isRequired: true, description: 'Status selesai/aktif' },
            { name: 'priority', type: 'enum (low, medium, high)', isRequired: true, description: 'Tingkat urgensi' },
            { name: 'dueDate', type: 'string (ISO date)', isRequired: false, description: 'Batas waktu pengerjaan' },
            { name: 'category', type: 'string', isRequired: false, description: 'Label atau proyek (Kerja, Pribadi, dll)' },
            { name: 'createdAt', type: 'timestamp', isRequired: true, description: 'Waktu pembuatan tugas' },
          ]
        },
        {
          id: 'model-todo-2',
          entityName: 'Subtask',
          description: 'Pecahan subtugas dari tugas utama.',
          fields: [
            { name: 'id', type: 'string (UUID)', isRequired: true, description: 'ID subtugas' },
            { name: 'taskId', type: 'string (UUID)', isRequired: true, description: 'Foreign key merujuk ke Task' },
            { name: 'title', type: 'string', isRequired: true, description: 'Judul subtugas' },
            { name: 'isCompleted', type: 'boolean', isRequired: true, description: 'Status checklist' },
          ]
        }
      ],
      edgeCases: [
        {
          id: 'todo-ec-1',
          scenario: 'Pengguna menandai tugas selesai saat koneksi internet terputus di https://todo.listo.id.',
          expectedBehavior: 'Status tugas langsung berubah di UI secara instan (optimistic UI), tersimpan di cache lokal, dan disinkronkan ke server saat online.',
          fallbackOrRecovery: 'Tampilkan badge indikator "Tersimpan Lokal" dan otomatis sync saat event "online" terpicu.'
        },
        {
          id: 'todo-ec-2',
          scenario: 'Pengguna tidak sengaja mengklik tombol Hapus pada tugas penting.',
          expectedBehavior: 'Tampilkan snackbar/toast "Tugas telah dihapus" dengan tombol "Undo (Urungkan)" selama 5 detik sebelum benar-benar terhapus permanen.',
          fallbackOrRecovery: 'Simpan tugas di memori recycle bin sementara.'
        },
        {
          id: 'todo-ec-3',
          scenario: 'Pengguna memasukkan teks judul tugas kosong atau hanya spasi.',
          expectedBehavior: 'Sistem menolak penyimpanan, memberikan shake animation halus pada input, dan tidak membuat tugas kosong.',
          fallbackOrRecovery: 'Nonaktifkan tombol submit jika input kosong.'
        }
      ],
      successMetrics: [
        { id: 'todo-sm-1', metric: 'Waktu input tugas dari membuka aplikasi', targetGoal: '< 3 detik' },
        { id: 'todo-sm-2', metric: 'Kelancaran navigasi keyboard (shortcut adoption)', targetGoal: '> 50% power users' },
        { id: 'todo-sm-3', metric: 'Tingkat penyelesaian tugas harian (Task completion rate)', targetGoal: '> 75%' },
      ],
      aiPromptSettings: {
        targetModel: 'claude-3-7-sonnet',
        promptStyle: 'xml_mega_prompt',
        includeAntiPatterns: true,
        includeXmlTags: true,
        emphasizeVerification: true,
        language: 'id',
      }
    }
  },
  {
    id: 'b2b-saas-workflow',
    name: 'B2B Task & Workflow Management SaaS',
    description: 'Sistem manajemen proyek kolaboratif untuk tim engineering dengan Kanban board, sprint planning, dan pelacakan issue otomatis.',
    category: 'Enterprise SaaS',
    icon: 'Layers',
    data: {
      appName: 'SprintFlow',
      tagline: 'Platform Manajemen Sprint & Pelacak Tugas untuk Tim Engineering Cepat',
      category: 'B2B Workflow SaaS',
      version: '1.0.0',
      targetAudience: 'Tim rekayasa perangkat lunak (5-50 orang), Engineering Manager, dan Scrum Master.',
      problemStatement: 'Alat manajemen proyek yang ada terlalu berat, rumit dikonfigurasi, dan lambat saat memindahkan tiket sprint harian.',
      valueProposition: 'Kanban board instan yang sangat cepat, keyboard-shortcut-driven, dengan sinkronisasi status real-time.',
      coreFeatures: [
        {
          id: 'bf-1',
          title: 'Interactive Kanban Board with Drag & Drop',
          priority: 'P0',
          description: 'Papan kartu status (Backlog, In Progress, Code Review, Done) yang dapat digeser mulus.',
          userStory: 'Sebagai developer, saya ingin menggeser tiket tugas antar kolom untuk memperbarui status pekerjaan saya.',
          acceptanceCriteria: [
            'Transisi drag-and-drop mulus tanpa lag (<16ms frame rate).',
            'Urutan prioritas kartu tersimpan otomatis.'
          ]
        },
        {
          id: 'bf-2',
          title: 'Sprint Planning & Velocity Dashboard',
          priority: 'P0',
          description: 'Halaman untuk mengelompokkan backlog ke dalam sprint 2 mingguan dan menghitung total story points.',
          userStory: 'Sebagai Scrum Master, saya ingin melihat kapasitas tim dalam story point sebelum memulai sprint.',
          acceptanceCriteria: [
            'Kalkulator otomatis total story point per sprint.',
            'Peringatan kapasitas jika melebihi batas rata-rata velocity tim.'
          ]
        },
        {
          id: 'bf-3',
          title: 'Tagging, Filtering & Quick Search',
          priority: 'P1',
          description: 'Filter instan berdasarkan assignee, label, prioritas bug/feature, dan pencarian teks cepat.',
          userStory: 'Sebagai engineer, saya ingin mencari tiket saya dengan menekan tombol shortcut "Cmd+K".',
          acceptanceCriteria: [
            'Modal pencarian instan terbuka dengan shortcut Cmd+K / Ctrl+K.',
            'Hasil pencarian terfilter dalam waktu <100ms.'
          ]
        }
      ],
      outOfScope: [
        'Tidak mencakup integrasi penagihan multi-currency Stripe pada versi MVP.',
        'Tidak mencakup time-tracking timer otomatis pada v1.'
      ],
      techStack: {
        frontend: 'Next.js 15 / React 19 + TypeScript',
        styling: 'Tailwind CSS + Lucide Icons',
        backend: 'Node.js REST API with Drizzle ORM',
        database: 'PostgreSQL (Cloud SQL / Supabase)',
        auth: 'OAuth 2.0 (Google & GitHub Workspaces)',
        stateManagement: 'TanStack React Query + Zustand',
        thirdPartyApis: ['GitHub API Webhooks', 'Slack Notification Bot'],
      },
      nonFunctional: [
        { id: 'nf-1', category: 'Performance', requirement: 'Interaksi memindahkan kartu di Kanban harus instan (optimistic UI update).', metric: '< 30ms visual response' },
        { id: 'nf-2', category: 'Security', requirement: 'Multi-tenant data isolation: pengguna hanya bisa melihat data workspace organisasinya.', metric: 'Zero data leakage' },
      ],
      dataModels: [
        {
          id: 'dm-1',
          entityName: 'TaskTicket',
          description: 'Data tiket tugas dalam sebuah sprint.',
          fields: [
            { name: 'id', type: 'UUID', isRequired: true, description: 'ID Tiket' },
            { name: 'title', type: 'string', isRequired: true, description: 'Judul tugas' },
            { name: 'status', type: 'enum (backlog, in_progress, review, done)', isRequired: true, description: 'Kolom status' },
            { name: 'storyPoints', type: 'number', isRequired: false, description: 'Estimasi beban kerja' },
            { name: 'assigneeId', type: 'UUID', isRequired: false, description: 'User yang bertanggung jawab' },
          ]
        }
      ],
      edgeCases: [
        {
          id: 'ec-1',
          scenario: 'Dua pengguna memindahkan kartu yang sama secara bersamaan.',
          expectedBehavior: 'Gunakan timestamp atau optimistic locking untuk menerapkan perubahan terakhir tanpa crash.',
          fallbackOrRecovery: 'Tampilkan notifikasi kecil bahwa kartu telah diperbarui oleh rekan tim.'
        }
      ],
      successMetrics: [
        { id: 'sm-1', metric: 'Daily Active Users (DAU) retention', targetGoal: '> 60%' },
        { id: 'sm-2', metric: 'Waktu pembuatan tiket baru', targetGoal: '< 15 detik' }
      ],
      aiPromptSettings: {
        targetModel: 'claude-3-7-sonnet',
        promptStyle: 'xml_mega_prompt',
        includeAntiPatterns: true,
        includeXmlTags: true,
        emphasizeVerification: true,
        language: 'id',
      }
    }
  },
  {
    id: 'mobile-fintech-expense',
    name: 'FinTech Expense & Budget Tracker',
    description: 'Aplikasi pencatatan keuangan pribadi dan analitik pengeluaran harian dengan visualisasi grafik dan kalkulasi otomatis.',
    category: 'Finance & Mobile',
    icon: 'Wallet',
    data: {
      appName: 'DuitKita',
      tagline: 'Pencatat Keuangan Cerdas & Pelacak Anggaran Harian Tanpa Ribet',
      category: 'FinTech Mobile Web App',
      version: '1.0.0',
      targetAudience: 'Mahasiswa, pekerja lepas, dan keluarga muda yang ingin melacak arus kas bulanan secara disiplin.',
      problemStatement: 'Mencatat transaksi harian sering kali terlupakan karena form input aplikasi keuangan terlalu rumit dan lambat.',
      valueProposition: 'Input pengeluaran 3 detik, kategori otomatis pintar, visualisasi grafik visual jernih, dan 100% privasi terjaga.',
      coreFeatures: [
        {
          id: 'ff-1',
          title: 'Quick 3-Second Transaction Input',
          priority: 'P0',
          description: 'Keyboard angka besar khusus untuk memasukkan nominal, memilih kategori instan, dan tanggal.',
          userStory: 'Sebagai pengguna, saya ingin mencatat pengeluaran dalam waktu kurang dari 5 detik setelah membeli kopi.',
          acceptanceCriteria: [
            'Halaman input langsung memfokuskan kursor ke input nominal saat dibuka.',
            'Format rupiah (Rp) terformat otomatis dengan pemisah titik ribuan.'
          ]
        },
        {
          id: 'ff-2',
          title: 'Monthly Budget & Visual Analytics',
          priority: 'P0',
          description: 'Diagram lingkaran proporsi pengeluaran berdasarkan kategori (Makanan, Transport, Hiburan, Tagihan).',
          userStory: 'Sebagai pengguna, saya ingin mengetahui kategori mana yang paling banyak menghabiskan anggaran saya.',
          acceptanceCriteria: [
            'Grafik interaktif yang menampilkan persentase dan total rupiah.',
            'Indikator progress bar peringatan jika anggaran kategori tertentu sudah melampaui 80%.'
          ]
        }
      ],
      outOfScope: [
        'Tidak mencakup integrasi open banking API perbankan langsung pada MVP.',
        'Tidak mencakup perdagangan saham atau kripto.'
      ],
      techStack: {
        frontend: 'React + TypeScript + Vite PWA',
        styling: 'Tailwind CSS (Mobile Viewport Optimized)',
        backend: 'Express.js lightweight API or Client Offline First',
        database: 'IndexedDB / LocalStorage with JSON Export/Import',
        auth: 'Biometric / PIN Passcode Local Lock',
        stateManagement: 'React Context + Hooks',
        thirdPartyApis: ['Canvas / SVG Charts', 'Web Share API'],
      },
      nonFunctional: [
        { id: 'fnf-1', category: 'Security', requirement: 'Data keuangan tidak dikirim ke server pihak ketiga tanpa izin pengguna.', metric: '100% Client-side privacy' },
        { id: 'fnf-2', category: 'Performance', requirement: 'Aplikasi dapat dibuka dan digunakan saat offline di kereta bawah tanah.', metric: 'Offline PWA Ready' }
      ],
      dataModels: [
        {
          id: 'fdm-1',
          entityName: 'Transaction',
          description: 'Data rekaman transaksi pengeluaran atau pemasukan.',
          fields: [
            { name: 'id', type: 'string', isRequired: true, description: 'ID unik transaksi' },
            { name: 'amount', type: 'number', isRequired: true, description: 'Nominal dalam rupiah' },
            { name: 'type', type: 'expense | income', isRequired: true, description: 'Jenis arus kas' },
            { name: 'category', type: 'string', isRequired: true, description: 'Label kategori' },
            { name: 'date', type: 'string (ISO)', isRequired: true, description: 'Waktu transaksi' }
          ]
        }
      ],
      edgeCases: [
        {
          id: 'fec-1',
          scenario: 'Pengguna memasukkan nominal angka negatif atau nol.',
          expectedBehavior: 'Sistem menolak dan menampilkan pesan peringatan ramah bahwa nominal harus lebih dari Rp 0.',
          fallbackOrRecovery: 'Nonaktifkan tombol Simpan jika nominal 0.'
        }
      ],
      successMetrics: [
        { id: 'fsm-1', metric: 'Rata-rata waktu input per transaksi', targetGoal: '< 4 detik' },
        { id: 'fsm-2', metric: 'Retensi pencatatan 30 hari berturut-turut', targetGoal: '> 45%' }
      ],
      aiPromptSettings: {
        targetModel: 'gemini-3.8-flash',
        promptStyle: 'xml_mega_prompt',
        includeAntiPatterns: true,
        includeXmlTags: true,
        emphasizeVerification: true,
        language: 'id',
      }
    }
  }
];

export const EMPTY_PRD: Omit<PRDDocument, 'id' | 'createdAt' | 'updatedAt'> = {
  appName: 'ToDo',
  tagline: 'Manajemen Tugas Cerdas & Pelacak Produktivitas Harian Super Cepat',
  category: 'Web & Mobile Task Application',
  version: '1.0.0',
  deployUrl: 'https://todo.listo.id',
  targetAudience: '',
  problemStatement: '',
  valueProposition: '',
  coreFeatures: [
    {
      id: 'feat-new-1',
      title: 'Fitur Utama Aplikasi',
      priority: 'P0',
      description: 'Deskripsi fitur utama yang wajib ada agar aplikasi dapat berfungsi.',
      acceptanceCriteria: ['Pengguna dapat menyelesaikan alur kerja utama tanpa error.'],
    }
  ],
  outOfScope: ['Fitur yang tidak mendesak pada versi MVP'],
  techStack: {
    frontend: 'React 19 + TypeScript',
    styling: 'Tailwind CSS',
    backend: 'Node.js / Express',
    database: 'PostgreSQL or SQLite',
    auth: 'Session / JWT Auth',
    stateManagement: 'React State / Zustand',
    thirdPartyApis: [],
  },
  nonFunctional: [
    {
      id: 'nfr-init-1',
      category: 'Performance',
      requirement: 'Waktu respon antarmuka cepat dan responsif di berbagai perangkat.',
      metric: '< 200ms interaction'
    }
  ],
  dataModels: [
    {
      id: 'dm-init-1',
      entityName: 'Item',
      description: 'Entitas data utama aplikasi',
      fields: [
        { name: 'id', type: 'string', isRequired: true, description: 'ID unik' },
        { name: 'name', type: 'string', isRequired: true, description: 'Nama item' },
        { name: 'createdAt', type: 'timestamp', isRequired: true, description: 'Waktu pembuatan' }
      ]
    }
  ],
  edgeCases: [
    {
      id: 'ec-init-1',
      scenario: 'Jaringan internet terputus saat pengguna melakukan aksi submit.',
      expectedBehavior: 'Aplikasi menampilkan peringatan koneksi terputus dan tidak menghapus data form yang sudah diisi.',
      fallbackOrRecovery: 'Simpan draf sementara di memori lokal.'
    }
  ],
  successMetrics: [
    { id: 'sm-init-1', metric: 'MVP stabil dan siap dirilis', targetGoal: '100% fitur P0 berjalan lancar' }
  ],
  aiPromptSettings: {
    targetModel: 'claude-3-7-sonnet',
    promptStyle: 'xml_mega_prompt',
    includeAntiPatterns: true,
    includeXmlTags: true,
    emphasizeVerification: true,
    language: 'id',
  }
};
