# VidyaSetu — System & Codebase Inventory

**Audit Date:** 2026-09-29  
**Specification:** SIH 2026 Problem Statement 239 (Ministry of Tribal Affairs)  
**Standard:** Autonomous Production Prototype Verification

---

## 1. Executive Summary Table

| Category | Component / Module | Status | Current Reality | Required Action |
| :--- | :--- | :--- | :--- | :--- |
| **Frontend UI** | Public Home Page (`PublicHomePage.jsx`) | **EXISTS & WORKS** | Hero, 30-sec pre-checker, why eligible modal, 5 schemes, FAQs, GIGW accessibility | Keep, wire pre-checker directly to backend rule engine |
| **Frontend UI** | Login Panel (`LoginPanel.jsx`) | **EXISTS & WORKS** | Citizen, Officer, Registration tabs, demo role quick-launch | Enhance with Jan Parichay sandbox adapter calls |
| **Frontend UI** | Scholar Dashboard (`ApplicantDashboard.jsx`) | **EXISTS & WORKS** | 6-stage lifecycle stepper, document list, deficiency notice, compliance card | Wire to real API state transitions and live backend sync |
| **Frontend UI** | Application Wizard (`ApplicationWizard.jsx`) | **EXISTS (PARTIAL MOCK)** | 5-step form, mocked document upload | Add real file upload (multipart), instant AI pre-scan analysis display |
| **Frontend UI** | Deficiency Desk (`DeficiencyDesk.jsx`) | **EXISTS (PARTIAL MOCK)** | Shows expired income cert, simulated replacement upload | Wire to real file re-upload API, live re-scan, 14-day countdown |
| **Frontend UI** | Officer Scrutiny Desk (`OfficerScrutinyDesk.jsx`) | **EXISTS & WORKS** | Dual-pane application X-ray, OCR bounding box canvas, approve/reject/override modals | Wire approve/reject/override buttons to backend APIs with forced reasons |
| **Frontend UI** | Application Triage (`ApplicationTriage.jsx`) | **EXISTS & WORKS** | Priority queues (READY, DEFICIENT, REVIEW), search & filter | Wire to computed triageCategory, aiRiskLevel & Health Score from backend |
| **Frontend UI** | Merit Ranking Engine (`MeritRankingEngine.jsx`) | **EXISTS & WORKS** | Scheme-specific selection allocation, gazette generation, horizontal quotas | Wire selection actions to DB state changes and award generation |
| **Frontend UI** | Post-Selection & DBT Hub (`PostSelectionDBTHub.jsx`) | **EXISTS & WORKS** | QPR compliance table, PFMS e-FTO batch release | Wire QPR submission and PFMS sandbox batch creation to backend |
| **Frontend UI** | Scheme Config Studio (`SchemeConfigStudio.jsx`) | **EXISTS (PARTIAL MOCK)** | 5 schemes config editor, 10k simulator tab | Wire rule saving to versioned DB rules API, ensure generic evaluation |
| **Frontend UI** | What-If Policy DSS (`WhatIfAnalysis.jsx`) | **EXISTS & WORKS** | Interactive sliders, calls `POST /api/policy/simulate` | Maintain backend API connection, ensure "synthetic data" labeling |
| **Frontend UI** | National Analytics (`NationalAnalytics.jsx`) | **EXISTS & WORKS** | KPI counters, state heatmap, TAT tracking, scheme budget charts | Compute KPIs dynamically from backend applications store |
| **Frontend UI** | Modals (Award, DocViewer, Audit, Grievance, Notif) | **EXISTS & WORKS** | Render well, audit verification modal tests hash integrity | Add public QR verification page, wire grievances and notifications to backend |
| **Backend** | Native Node.js Server (`backend/server.js`) | **EXISTS & WORKS** | Zero-dependency native HTTP server on port 5001 | Expand into comprehensive Express-based API server with full REST coverage |
| **Backend** | Rule Engine (`backend/services/ruleEngine.js`) | **EXISTS (HARDCODED BRANCHES)** | Deterministic evaluation of age, income, marks, degree | Refactor to 100% generic config-driven evaluation (no `scheme.id ===` branches) |
| **Backend** | Document AI (`backend/services/documentAI.js`) | **EXISTS (SIMULATED)** | Heuristic text extraction and deficiency notice | Add real file upload parser, Jaro-Winkler name similarity, pre-computed sample fallback |
| **Backend** | Audit Chain (`backend/services/auditChain.js`) | **EXISTS & WORKS** | SHA-256 block chaining and `verifyChain()` integrity walk | Reuse and ensure every single state mutation appends an audit block |
| **Backend** | Policy Simulator (`backend/services/policySimulator.js`) | **EXISTS & WORKS** | 10k synthetic pool simulation with budget/beneficiary delta | Keep and ensure verified:false / synthetic labels |
| **Data Layer** | Backend Store (`backend/data/db.js`) | **EXISTS (IN-MEMORY ONLY)** | Static JS arrays, resets on server restart | Upgrade to hybrid data store: Supabase PostgreSQL + local JSON/SQLite persistence fallback |
| **Demo Data** | Star Applicant & Anomaly Pair | **EXISTS (PARTIAL MISMATCH)** | Birsa at Deficiency Pending, wrong anomaly pair IDs | Update to Birsa at UNDER_SCRUTINY, anomaly pair MOTA-2026-NFST-0102 & -0103 |
| **Samples** | Test Sample Files (`/samples`) | **MISSING** | No dedicated samples folder with realistic certs and outcome mapping | Create `/samples` with valid, expired, mismatch, and blurred test documents + mapping |
| **Scripts** | Reset DB Script (`scripts/reset-db.js`) | **MISSING** | No one-command state restoration | Create `scripts/reset-db.js` and add `npm run reset-db` script |
| **Adapters** | Government Integration Layer | **EXISTS (STATIC JSON)** | `/api/health` returns static simulator status | Implement GovernmentService sandbox adapter (DigiLocker, Jan Parichay, PFMS, NIC SMS) |

---

## 2. Gap Analysis vs Goal Specifications

### 2.1 Rule Engine
- **Current:** Contains `if (scheme.id === 'NOS')`, `if (scheme.id === 'PRE_MATRIC')`, `if (scheme.id === 'POST_MATRIC')`.
- **Target:** Schema-driven rule evaluation based strictly on scheme rule configuration fields: `eligibility.incomeCeiling`, `eligibility.maxAge`, `eligibility.minMarks`, `eligibility.eligibleDegrees`, `eligibility.specificCriteria` (e.g. `rankMax`, `institutionTypes`), and each rule carrying `{ source, verified }`.

### 2.2 Document AI Pipeline
- **Current:** In-memory string matching on doc name; no multipart file upload handling.
- **Target:** Real multipart file upload endpoint (`POST /api/documents/upload`), Jaro-Winkler string similarity calculation for name verification, date validity evaluation against current Financial Year (FY 2026-27), automated 14-day deficiency generator, and robust pre-extracted sample fallback so live demo is 100% resilient.

### 2.3 Application State Machine
- **Current:** Ad-hoc status strings (`'Deficiency Pending'`, `'AI Verified'`, `'Selection Committee Review'`, `'Selected'`).
- **Target:** Exact state machine:  
  `DRAFT → SUBMITTED → AI_PRESCRUTINY → DEFICIENT → RESUBMITTED → READY_FOR_REVIEW → UNDER_SCRUTINY → APPROVED / REJECTED → AWARDED → QPR_ACTIVE`  
  (with friendly UI status tags mapping cleanly to each enum state).

### 2.4 Data Persistence & Supabase Integration
- **Current:** In-memory JS arrays in `db.js`.
- **Target:** `backend/data/store.js` that checks for Supabase credentials (already provisioned: `https://mbdmsjydkhpvuykzdpqa.supabase.co`), interacts with Supabase REST when online, and automatically mirrors/falls back to `backend/data/localStore.json` so the app is 100% resilient offline.

### 2.5 Demo Data Hardening
- **Current:** Birsa Hemrom at `DEFICIENT` with 4 docs; anomaly pair has different IDs.
- **Target:**
  - Birsa Hemrom (`MOTA-2026-NFST-0101`): Santhal, Jharkhand, Income ₹4,80,000, pre-seeded at `UNDER_SCRUTINY`, 6 documents (including resolved income certificate), full tamper-evident audit history.
  - Anomaly pair: `MOTA-2026-NFST-0102` (Sunil Lakra) and `MOTA-2026-NFST-0103` (Priya Murmu) sharing phone `+91 98765 43210`, bank account `XXXX-7712 / SBIN0001234`, and photo hash `sha256-shared-suspect-hash` (risk = HIGH).

---

## 3. Execution Roadmap

1. **Phase 1: Persistence & Government Adapters**
   - Create `backend/data/store.js` with Supabase + local JSON persistence.
   - Implement `backend/services/governmentAdapters.js` with DigiLocker, Jan Parichay, PFMS, NIC SMS sandbox adapters.
2. **Phase 2: Generic Rule Engine & Document AI Pipeline**
   - Refactor `ruleEngine.js` to pure config-driven evaluations.
   - Enhance `documentAI.js` with Jaro-Winkler, OCR extraction, and pre-computed demo samples.
   - Set up `/samples` folder with test files and mapping guide.
3. **Phase 3: State Machine & Backend APIs**
   - Implement Express server with complete REST routes: `/api/health`, `/api/auth/*`, `/api/schemes/*`, `/api/eligibility/*`, `/api/applications/*`, `/api/documents/*`, `/api/officer/*`, `/api/qpr/*`, `/api/disbursements/*`, `/api/grievances/*`, `/api/audit/*`, `/api/analytics/*`.
   - Implement `scripts/reset-db.js`.
4. **Phase 4: Frontend API Wiring & UI Polish**
   - Upgrade `src/services/apiClient.js` to cover 100% of endpoints.
   - Wire `App.jsx`, `ApplicationWizard.jsx`, `DeficiencyDesk.jsx`, `OfficerScrutinyDesk.jsx`, `MeritRankingEngine.jsx`, `PostSelectionDBTHub.jsx`, `SchemeConfigStudio.jsx`, `WhatIfAnalysis.jsx`, `NationalAnalytics.jsx` to live API calls.
   - Add Application Health Score breakdown badge and public award verification view.
5. **Phase 5: Verification & Documentation**
   - Run end-to-end golden journey test.
   - Verify audit chain integrity.
   - Update README, DECISIONS.md, PROGRESS.md, and generate FINAL_SUMMARY.md.
