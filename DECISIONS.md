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
