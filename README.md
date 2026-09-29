# VidyaSetu (विद्यासेतु)
### National AI-Enabled Unified Scholarship & Fellowship Governance Ecosystem
**Ministry of Tribal Affairs (MoTA), Government of India (जनजातीय कार्य मंत्रालय, भारत सरकार)**  
**Smart India Hackathon (SIH) 2026 — Problem Statement ID: 239 (Software Edition | Theme: Smart Education)**

[![Government of India](https://img.shields.io/badge/Government_of_India-Ministry_of_Tribal_Affairs-1e3a8a.svg)](#)
[![SIH 2026](https://img.shields.io/badge/SIH_2026-Problem_Statement_239-purple.svg)](#)
[![Theme](https://img.shields.io/badge/Theme-Smart_Education-emerald.svg)](#)
[![All 5 MoTA Schemes](https://img.shields.io/badge/Schemes_Covered-All_5_MoTA_DBT_Schemes-blue.svg)](#)
[![National Portals Integrated](https://img.shields.io/badge/SSO_Adapters-Jan_Parichay_%7C_DigiLocker-blue.svg)](#)
[![DBT Sandbox](https://img.shields.io/badge/Payments_Sandbox-PFMS_%7C_NPCI_APB-orange.svg)](#)
[![Audit Ledger](https://img.shields.io/badge/Integrity-SHA--256_Chained_Ledger-emerald.svg)](#)
[![Accessibility](https://img.shields.io/badge/Accessibility-WCAG_2.1_AA_%7C_GIGW_2.0-teal.svg)](#)

---

## 🎯 SIH 2026 Problem Statement 239 — Direct Compliance & Mapping

> **Problem Statement ID:** 239  
> **Ministry / Department:** Ministry of Tribal Affairs (MoTA)  
> **Category:** Software  
> **Theme:** Smart Education  
> **Official Portals & Data Sets:**  
> • [Ministry of Tribal Affairs Scholarship Portal](https://tribal.nic.in/ScholarshiP.aspx)  
> • [MoTA Direct Benefit Transfer (DBT) Portal](https://dbttribal.gov.in/AllScheme.aspx)

### Exact 1-to-1 Mapping Against SIH 2026 PS 239 Specifications:

| SIH PS 239 Required Capability | Specific Problem Statement Mandate | VidyaSetu Implementation & Technical Architecture |
| :--- | :--- | :--- |
| **1. End-to-End Digital Workflow** | Manage complete process: registration, online application, document submission, eligibility verification, scrutiny, screening, selection, communication, and post-selection management. | **8-Stage Unified Digital Lifecycle**: Discover ➔ Apply ➔ Verify ➔ Scrutinize ➔ Select ➔ Communicate ➔ Disburse ➔ Monitor in a single unified platform. |
| **2. Configurable Scheme Rules** | Handle different eligibility criteria, documents, and selection processes applicable to individual schemes through a configurable system. | **Unified 5-Scheme Configuration Studio & Engine** (`SchemeConfigStudio.jsx` & `ruleEngine.js`): Dynamic rule parameters covering all 5 official MoTA schemes (Pre-Matric, Post-Matric, Top Class ST, NFST, and NOS) without code redeployment. |
| **3. AI OCR & Document Intelligence** | Use automation and AI-based tools to reduce manual verification, identify incomplete or deficient applications, and improve accuracy. | **AI Document Pre-Scrutiny Service** (`documentAI.js`): Optical character extraction, bounding-box coordinate mapping, digital barcode verification, and automatic detection of lapsed validity (e.g. Income Certificate > 1 fiscal year old). Real multipart upload with pre-computed demo fallback. |
| **4. Deficiency Resolution Loop** | Provide workflow management for applicants and administrators, including deficiency identification, communication, resubmission, and status tracking. | **Stateful Deficiency Desk** (`DeficiencyDesk.jsx`): Interactive replacement certificate upload (`Fresh_Income_Certificate_FY2026_27_SDO_Ranchi.pdf`) with live AI re-scan, automatically shifting state to `READY FOR HUMAN REVIEW` with preserved seniority. |
| **5. Transparent Selection & Human Oversight** | Support transparent screening and selection by applying approved scheme criteria while retaining appropriate human oversight. | **Application X-Ray Dual-Pane Workstation** (`OfficerScrutinyDesk.jsx`): Left pane displays demographic data and deterministic rule checklist; Right pane displays document canvas with OCR bounding boxes. Includes mandatory **Human Officer Override** and **Statutory Rejection** clause logging. *"AI assists, rules govern, humans decide."* |
| **6. Scheme-Specific Selection Allocation** | Merit-based selection reflecting distinct scheme rules rather than generic formulas. | **Statutory Allocation Engines** (`MeritRankingEngine.jsx`): Pre-Matric & Post-Matric universal entitlements; Top Class institutional rank allocation; NFST PG marks + 30% horizontal female quota + 5% Divyangjan + PVTG slots; NOS QS World Top 500/200 offers + Expert Committee. |
| **7. Separate Applicant & Admin Interfaces** | Provide separate interfaces: applicants track applications and respond to queries; Ministry officials monitor applications, scrutiny, selection, and scheme performance. | **Strictly Isolated Role-Based Workspaces**: <br>• **Scholar Desk**: Visual end-to-end status tracker, document viewer, deficiency redressal desk, and quarterly progress report (QPR) hub.<br>• **Ministry Administrative Workspace**: Executive KPIs, dual-pane scrutiny desk, shared-identifier anomaly triage, scheme config studio, and PFMS DBT hub. |
| **8. Dashboards & National Analytics** | Enable MoTA to monitor applications, verification, selection, and scheme performance across relevant parameters. | **Executive Intelligence & GIS Analytics** (`NationalAnalytics.jsx`): Real-time KPI counters across all 5 schemes, state-wise application heatmaps, turnaround time (TAT) tracking, PVTG inclusion metrics, and downloadable official ministry reports. |

---

## ⚖️ What is Real vs Simulated (Data & Architecture Transparency)

VidyaSetu adheres strictly to absolute truth in engineering and transparent disclosure:

| System / Capability | Real Implementation Details | Simulated / Sandbox Grounding |
| :--- | :--- | :--- |
| **Deterministic Rule Engine** | **100% REAL & GENERIC**: Evaluates criteria arrays dynamically from persistent database configuration. Zero hardcoded scheme branching. All rules carry `{source, verified}`. | None. Pure mathematical logic adhering to Article 342 and MoTA scheme guidelines. |
| **Database & State Persistence** | **100% REAL DUAL-MODE**: Real persistent database store (`backend/data/store.js`) with Supabase PostgreSQL synchronization and local persistent JSON mirror (`localStore.json`). | Local JSON mirror runs automatically offline if external network is unavailable. |
| **Tamper-Evident Audit Ledger** | **100% REAL SHA-256 HASH CHAIN**: Cryptographic hash chaining on every application creation, submission, upload, deficiency, approval, rejection, and override. Full cryptographic integrity verification via `/api/audit/:id/verify`. | Local cryptographic execution using Node.js native `crypto`. |
| **Document Upload & AI Pre-Scrutiny** | **REAL FILE INGESTION + REAL PARSER**: Real multipart upload (`multer`), file size/type validation, Jaro-Winkler phonetic string similarity, certificate validity date computation against FY 2026-27. | Pre-computed fallback for test files in `/samples` guarantees 100% reliable demo execution without external OCR cloud latency. |
| **Government External Integrations** | **STANDARD ADAPTER ARCHITECTURE**: Modular `GovernmentService` interfaces for Jan Parichay (SSO), DigiLocker (Certificates), PFMS (DBT Batches), and NIC SMS (Alerts). | Implemented as **Sandbox Adapters** with realistic payload schemas, latency simulation, and sandbox delivery receipts. Swappable to production via env vars. |
| **Policy Simulator DSS** | **100% REAL SIMULATION LOGIC**: Computes projected beneficiary deltas, fiscal budget impact deltas (in ₹ Crores), and scrutiny workload shifts. | Run on a calibrated **10,000-record synthetic demonstration pool** clearly labeled in UI and responses. |

---

## ⚡ 5-Minute Golden Journey Demonstration Walkthrough

Experience the entire lifecycle of star applicant **Birsa Hemrom** (`MOTA-2026-NFST-0101`):

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  STEP 1:     │     │  STEP 2:     │     │  STEP 3:     │     │  STEP 4:     │
│ 30-Sec Pre-  │ ──► │ Launch Demo  │ ──► │ Rectify      │ ──► │ Dual-Pane    │
│ Checker      │     │ Birsa Hemrom │     │ Deficiency   │     │ Officer Desk │
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
                                                                       │
┌──────────────┐     ┌──────────────┐     ┌──────────────┐             │
│  STEP 7:     │     │  STEP 6:     │     │  STEP 5:     │             │
│ Award Letter │ ◄── │ SHA-256 Chain│ ◄── │ Policy DSS   │ ◄───────────┘
│ & PFMS DBT   │     │ Verification │     │ 10k Simulator│
└──────────────┘     └──────────────┘     └──────────────┘
```

1. **Step 1: Public Pre-Checker (30 Seconds)**
   * On the Public Home Page ([http://localhost:5173/](http://localhost:5173/)), scroll to **"Check Your Eligibility in 30 Seconds"**.
   * Select Post-Graduation, ₹4,80,000 income, 26 yrs, Ph.D. in India, Santhal.
   * Click **"Evaluate My Statutory Eligibility Now"** ➔ click **"Why am I eligible? 🔍"** to view the deterministic statutory rule breakdown citing Article 342.

2. **Step 2: Launch Star Scholar Profile (Birsa Hemrom)**
   * Click the hero button: **"🚀 Run 7-Minute Golden Demo (Birsa Hemrom)"**.
   * You are logged in as Birsa Hemrom (`MOTA-2026-NFST-0101`, Ph.D. at IIT Kharagpur, Santhal tribe).
   * Observe the **Application Health Score (92/100)** breakdown badge, active deficiency history, and 6-stage lifecycle stepper.

3. **Step 3: Resolve Deficiency via Real Document Re-Upload**
   * Navigate to the **Deficiency Desk** tab.
   * Upload `Fresh_Income_Certificate_FY2026_27_SDO_Ranchi.pdf` (or any sample from `/samples`).
   * Watch the AI re-scan validate the SDO barcode, 100% name match, and FY 2026-27 validity.
   * Click **"Submit Rectified Document to MoTA Desk"**.
   * State transitions immediately to: **`STATUS: READY FOR HUMAN REVIEW`** with preserved seniority.

4. **Step 4: Ministry Officer Scrutiny Desk (Application X-Ray)**
   * Click **"Switch to Ministry Officer Scrutiny Desk (Dual-Pane Workstation) ➔"**.
   * Select Birsa Hemrom (`MOTA-2026-NFST-0101`) in the priority review queue.
   * **Left Pane**: Observe all deterministic statutory rules showing **PASS**.
   * **Right Pane**: Inspect the Income Certificate canvas with the green OCR bounding box and extracted entity table.
   * Click **"Approve Application"** to forward to the National Selection Committee (or inspect **Human Officer Override** and **Statutory Rejection** modals).

5. **Step 5: Scheme Configuration Studio & 10,000 Synthetic Applications Simulator**
   * In the top admin bar, click **"Scheme Config & 10k Simulator"**.
   * View all 5 official MoTA schemes with versioned rules.
   * Switch to the **Policy Sandbox** tab.
   * Click **"Simulate on 10,000 Synthetic Applications"** to observe real-time projected beneficiary deltas and budget impact (+₹86.23 Cr).

6. **Step 6: Verify Tamper-Evident SHA-256 Chained Audit Trail**
   * In the admin bar, click **"AI Triage & Priority Desk"** (or click Audit Trail on any student card).
   * Open Birsa Hemrom's **Tamper-Evident Audit Trail**.
   * Click **"Verify Hash Chain Integrity"** ➔ observe cryptographic validation confirming all blocks are linked without tampering.
   * Click **"Simulate Tamper Attack (Test)"** ➔ observe instant detection of altered block hash and broken chain pointer.
   * Click **"Restore Original Audit Chain"** to return to integrity.

7. **Step 7: Award Letter & Public QR Registry Verification**
   * In the admin bar, click **"Merit & Quota Engine"** and click **"Generate Official Gazette & Sanction Award Letters"**.
   * View Birsa's official Award Letter with digitally signed credentials.
   * Click the **QR Code** or **"Verify Online ↗"** to launch the **Public Award Verification Registry** modal confirming genuine status.

---

## 📡 Complete REST API Endpoint Reference

The backend exposes a complete, consistent REST API with `{ success, data, message, error }` envelopes:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Health check, server status & Government Sandbox Adapters overview |
| `POST` | `/api/auth/demo-login` | Authenticate student, officer, or admin via Jan Parichay Sandbox |
| `GET` | `/api/users` | List all registered demo users and roles |
| `GET` | `/api/schemes` | Retrieve all 5 MoTA schemes with active versioned rules |
| `GET` | `/api/schemes/:id` | Retrieve single scheme definition and required documents |
| `PUT` | `/api/schemes/:id` | Update scheme rules and parameters (SchemeConfigStudio) |
| `POST` | `/api/eligibility/check` | Deterministic statutory eligibility evaluation against configured rules |
| `GET` | `/api/applications` | Query applications with filters (`schemeId`, `status`, `userId`) + Health Scores |
| `GET` | `/api/applications/:id` | Retrieve single application case file with documents & audit trail |
| `POST` | `/api/applications` | Create new scholarship/fellowship application (`DRAFT`/`SUBMITTED`) |
| `POST` | `/api/applications/:id/submit` | Submit application and trigger automated AI pre-scrutiny |
| `POST` | `/api/documents/upload` | Multipart file upload with OCR parsing and Jaro-Winkler name similarity |
| `POST` | `/api/applications/:id/documents/replace` | Replace deficient document, execute AI re-scan, advance state to `READY_FOR_REVIEW` |
| `GET` | `/api/officer/queue` | Computed triage priority queue (PVTG first, lowest income, high marks) |
| `POST` | `/api/applications/:id/scrutiny/pickup` | Scrutiny Officer picks up case file (`UNDER_SCRUTINY`) |
| `POST` | `/api/applications/:id/scrutiny/approve` | Scrutiny Officer approves application (`APPROVED`) with chained audit block |
| `POST` | `/api/applications/:id/scrutiny/reject` | Scrutiny Officer rejects application with mandatory statutory clause |
| `POST` | `/api/applications/:id/scrutiny/override` | Scrutiny Officer overrides AI recommendation with logged justification |
| `POST` | `/api/merit/select` | National Selection Committee issues official Sanction Orders (`AWARDED`) |
| `GET` | `/api/awards/verify/:sanctionNumber` | Public prototype registry for verifying Award Letter QR codes |
| `GET` | `/api/audit/:id/chain` | Retrieve full cryptographic audit trail for application |
| `GET` | `/api/audit/:id/verify` | Cryptographically verify SHA-256 hash chain integrity |
| `POST` | `/api/policy/simulate` | Execute what-if policy simulation over 10,000 synthetic records |
| `GET` | `/api/anomalies` | Detect cross-application clusters sharing phone, bank account, or photo hash |
| `GET` | `/api/analytics/summary` | Executive dashboard KPIs computed live from database applications |
| `GET` | `/api/qpr` & `POST /api/qpr` | Query and submit supervisor-endorsed Quarterly Progress Reports |
| `GET` | `/api/disbursements` | Retrieve Direct Benefit Transfer (DBT) disbursement ledger |
| `POST` | `/api/disbursements/batch` | Execute simulated PFMS e-FTO payment batch |
| `GET` | `/api/grievances` & `POST /api/grievances` | 7-day SLA grievance tracking and citizen redressal portal |
| `GET` | `/api/notifications` | Citizen multi-channel notification drawer |
| `POST` | `/api/admin/reset-db` | One-click restoration of pristine SIH demonstration state |

---

## 🚀 Getting Started & Local Installation

### Prerequisites
* **Node.js**: v18.0 or higher (v24.x tested and supported)
* **npm**: v9.0 or higher

### 1. Clone & Install
```bash
git clone https://github.com/aditisinha17/VidyaSetu.git
cd VidyaSetu
npm install
```

### 2. Run the Complete Platform
In separate terminal tabs:

**Terminal 1 — Start the Backend Service:**
```bash
npm run backend
```
*Starts the VidyaSetu Express Governance API server on `http://localhost:5001`.*

**Terminal 2 — Start the Vite Development Server:**
```bash
npm run dev
```
*Opens the VidyaSetu frontend on `http://localhost:5173`.*

### 3. Run Automated End-to-End Audit
Verify all 17 checkpoints across the full Golden Journey:
```bash
node scripts/verify-golden-journey.js
```

### 4. Reset Demo State Anytime
Restore the pristine demo dataset with one command:
```bash
npm run reset-db
```

---

## 👥 Contributors & Acknowledgements

* **Team VidyaSetu** — Smart India Hackathon (SIH) 2026 (Problem Statement 239)
* **Ministry of Tribal Affairs (MoTA)**, Government of India
* Official References: [tribal.nic.in/ScholarshiP.aspx](https://tribal.nic.in/ScholarshiP.aspx) | [dbttribal.gov.in/AllScheme.aspx](https://dbttribal.gov.in/AllScheme.aspx)
