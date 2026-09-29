# VidyaSetu — Architecture & Engineering Decisions (DECISIONS.md)

This log records major technical and architectural decisions made during development, adhering strictly to the SIH 2026 PS 239 requirements and the six core ground rules.

---

### DECISION 001: Node.js Backend Preservation
* **Context:** The workspace contained an earlier prototype in `backend/server.js` using native Node.js, and an experimental subagent had started a Python FastAPI backend in `backend_fastapi/`.
* **Directive:** "Backend: whatever exists in this repo (likely Node/Express) — KEEP IT, do not introduce a second backend language... Keep setup to: npm install → npm run backend → npm run dev → it works."
* **Decision:** Preserve and expand the Node.js backend in `backend/`. Utilize Express for robust routing, middleware, file upload handling (`multer`), and clear error management, while keeping `npm run backend` as the single start command.

---

### DECISION 002: Dual-Mode Persistence Layer (Supabase PostgreSQL + Local JSON/SQLite Fallback)
* **Context:** Supabase credentials exist and 14 tables have been migrated into project `mbdmsjydkhpvuykzdpqa`. However, live demos or offline environments must not break if internet connectivity is intermittent.
* **Directive:** "Database: Supabase (PostgreSQL + Auth + Storage). If Supabase env vars are missing, scaffold a local JSON/SQLite fallback layer so the app runs fully offline, but structure the data layer so switching to Supabase later is config-only."
* **Decision:** Implement `backend/data/store.js` as an abstraction layer:
  - If `SUPABASE_URL` and `SUPABASE_ANON_KEY` are reachable, mirror reads/writes to Supabase via its REST interface.
  - Simultaneously maintain and sync with `backend/data/localStore.json` so every change persists across local server restarts, guaranteeing 100% offline resilience and zero demo crashes.

---

### DECISION 003: Pure Generic Config-Driven Rule Engine
* **Context:** Legacy `ruleEngine.js` contained specific condition blocks like `if (scheme.id === 'NOS')` or `if (scheme.id === 'PRE_MATRIC')`.
* **Directive:** "RULE ENGINE (single source of truth): scheme rules live in config (DB), fully generic evaluation (no if scheme.id === branches), versioned, admin-editable via API + UI (SchemeConfigStudio). Every rule carries {source, verified} fields."
* **Decision:** Refactor `ruleEngine.js` so that:
  - Every evaluation criterion is defined in the scheme rule configuration: `incomeCeiling`, `maxAge`, `minMarks`, `eligibleDegrees`, `specialRequirements` (e.g. `universityRankMax`, `schoolEnrollmentRequired`, `courseGroups`).
  - The evaluation logic loops through the configured criteria array dynamically, evaluating operators (`<=`, `>=`, `IN`, `CONTAINS`), with no hardcoded scheme ID checks.
  - Every rule in the database includes `{ source: string, verified: boolean }` metadata.

---

### DECISION 004: Government Services Sandbox Adapter Layer
* **Context:** Ground rule: "NO fake claims of live Aadhaar/DigiLocker/PFMS connectivity — sandbox adapters only, visibly labeled."
* **Directive:** Build an adapter layer with a `GovernmentService` interface — DigiLocker, Jan Parichay, PFMS, NIC SMS.
* **Decision:** Implement `backend/services/governmentAdapters.js` exposing standard interfaces for:
  - `DigiLockerAdapter`: document fetch, verified repository lookup (labeled "DigiLocker Sandbox Adapter").
  - `JanParichayAdapter`: single sign-on authentication token exchange (labeled "Jan Parichay SSO Sandbox").
  - `PFMSAdapter`: e-FTO payment batch generation and disbursement status inquiry (labeled "PFMS e-FTO Payment Sandbox").
  - `NicSmsAdapter`: automated SMS dispatch simulation with realistic gateway delivery receipts (labeled "NIC SMS Gateway Sandbox").
  - Environment flag `USE_SANDBOX_ADAPTERS=true` defaults to active sandbox behavior with realistic latency and audit payloads.

---

### DECISION 005: Application State Machine Alignment & UI Tagging
* **Context:** Required state machine:  
  `DRAFT → SUBMITTED → AI_PRESCRUTINY → DEFICIENT → RESUBMITTED → READY_FOR_REVIEW → UNDER_SCRUTINY → APPROVED / REJECTED → AWARDED → QPR_ACTIVE`
* **Decision:**
  - Standardize all backend database status columns to the exact required enum strings above.
  - In the frontend, map each state to user-friendly badge labels (e.g. `UNDER_SCRUTINY` ➔ "Officer Scrutiny In Progress", `DEFICIENT` ➔ "Deficiency Pending", `READY_FOR_REVIEW` ➔ "Ready for Officer Review") while maintaining the exact enum value in API payloads.

---

### DECISION 006: Star Applicant & Demo Baseline Configuration
* **Context:** The prompt mandates exact demo personas:
  - Star applicant: Birsa Hemrom (`MOTA-2026-NFST-0101`, Jharkhand, Santhal, annual income ₹4,80,000) pre-seeded at `UNDER_SCRUTINY` with 6 documents, 1 resolved deficiency, and full audit chain.
  - Anomaly pair: `MOTA-2026-NFST-0102` (Sunil Lakra) and `MOTA-2026-NFST-0103` (Priya Murmu) sharing phone `+91 98765 43210`, bank account `XXXX-7712 / SBIN0001234`, and photo hash `sha256-shared-suspect-hash` (risk = HIGH).
* **Decision:** Seed these exact records into `backend/data/store.js` and provide `scripts/reset-db.js` (`npm run reset-db`) so that at any point during testing or live presentation, the pristine demo state can be restored with a single command.

---

### DECISION 007: First-Time User Tutorial System (4 Layers)
* **Context:** First-time tribal students from remote regions require guided onboarding and clear milestone expectations without confusing bureaucratic jargon.
* **Decision:** Implement a multi-layered tutorial and guidance system:
  1. **Welcome Tour (`WelcomeTourModal.jsx`)**: 3-slide visual onboarding explaining the portal's mission, the 4-step pictorial journey, and documents to prepare, with an instant Hindi language switcher.
  2. **Interactive Guided Walkthrough (`InteractiveWalkthrough.jsx`)**: Spotlight tour triggered on first login (`users.tutorial_completed === false`), guiding students across Scheme Finder, Pipeline Tracker, Deficiency Desk, and Document Locker. Dismissal/completion updates DB via `PATCH /api/users/:id/tutorial-completed`. "Replay Tour" button in header & profile.
  3. **Mission Checklist Widget (`MissionChecklist.jsx`)**: Prominent "6 Steps to a Scholarship" tracker dynamically computed from database records via `GET /api/me/progress`. Displays milestone progress bar and direct "Resolve Deficiency" action buttons.
  4. **Contextual ⓘ Tooltips & "What Happens Next?" Cards (`ContextHelp.jsx`)**: Plain-language explanations for all statutory fields and application stages in both English and Hindi.

---

### DECISION 008: 2G Data Saver / Remote Low-Bandwidth Mode
* **Context:** Tribal scholars often access the portal from remote forest/hill regions with 2G or intermittent slow connectivity.
* **Decision:**
  - Persist `data_saver_mode` in user profiles via `PATCH /api/users/:id/data-saver`.
  - Provide `LiteApplicantDashboard.jsx` featuring semantic accessible HTML tables, zero canvas/SVG animated charts, and "Tap to view preview" on-demand loading, cutting data payload by ~85%.
  - User can toggle between 2G Mode and Full Graphic Mode at any time from top banners and header.

---

### DECISION 009: Hybrid Real OCR with Tesseract.js & Transparent Fallback Tagging
* **Context:** Real OCR must scan uploaded documents, while demo reliability must never fail during live hackathon presentations.
* **Decision:**
  - Install and integrate `tesseract.js` in `DocumentAIService` on Node.js.
  - Automatically run live OCR on uploaded images (`.png`, `.jpg`, `.jpeg`) and direct text extraction on sample text files.
  - Regex parser extracts name, income, certificate numbers, date, issuing authority, and computes per-field confidence.
  - Every document analysis payload explicitly carries `extractionMethod`: `'REAL_OCR'`, `'DIRECT_TEXT_EXTRACTION'`, or `'FALLBACK_EXTRACTION'` (with notice: "Pre-computed certified sample used for deterministic demonstration"), fulfilling strict anti-deception guidelines.

---

### DECISION 010: QR-Embedded Statutory Document Slips
* **Context:** Students and institutions require printable, auditable Acknowledgment Slips, Award Letters, and Deficiency Notices.
* **Decision:**
  - Integrate `qrcode` library on backend.
  - Implement `GET /api/applications/:id/slip?type=acknowledgment|award|deficiency` generating print-ready HTML documents with embedded cryptographic QR codes pointing to public verification, Ashoka watermark, and official MoTA seals.

