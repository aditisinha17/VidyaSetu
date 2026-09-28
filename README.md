# VidyaSetu (विद्यासेतु)
### National AI-Enabled Unified Scholarship & Fellowship Governance Ecosystem
**Ministry of Tribal Affairs (MoTA), Government of India (जनजातीय कार्य मंत्रालय, भारत सरकार)**  
**Smart India Hackathon (SIH) 2026 — Problem Statement ID: 239 (Software Edition | Theme: Smart Education)**

[![Government of India](https://img.shields.io/badge/Government_of_India-Ministry_of_Tribal_Affairs-1e3a8a.svg)](#)
[![SIH 2026](https://img.shields.io/badge/SIH_2026-Problem_Statement_239-purple.svg)](#)
[![Theme](https://img.shields.io/badge/Theme-Smart_Education-emerald.svg)](#)
[![National Portals Integrated](https://img.shields.io/badge/SSO_Adapters-Jan_Parichay_%7C_DigiLocker-blue.svg)](#)
[![DBT Sandbox](https://img.shields.io/badge/Payments_Sandbox-PFMS_%7C_NPCI_APB-orange.svg)](#)
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
| **2. Configurable Scheme Rules** | Handle different eligibility criteria, documents, and selection processes applicable to individual schemes through a configurable system. | **Scheme Configuration Studio & Engine** (`SchemeConfigStudio.jsx` & `ruleEngine.js`): Scheme-specific rule parameters for NFST (research in India), NOS (overseas studies), and Top Class ST (notified premier institutes) without code redeployment. |
| **3. AI OCR & Document Intelligence** | Use automation and AI-based tools to reduce manual verification, identify incomplete or deficient applications, and improve accuracy. | **AI Document Pre-Scrutiny Lab** (`documentAI.js`): Optical character extraction, bounding-box coordinate mapping, digital barcode verification, and automatic detection of lapsed validity (e.g. Income Certificate > 1 yr old). |
| **4. Deficiency Resolution Loop** | Provide workflow management for applicants and administrators, including deficiency identification, communication, resubmission, and status tracking. | **Stateful Deficiency Desk** (`DeficiencyDesk.jsx`): Interactive replacement certificate upload (`Fresh_Income_Certificate_FY2026_27_SDO_Ranchi.pdf`) with live AI re-scan, automatically shifting state to `READY FOR HUMAN REVIEW` with preserved seniority. |
| **5. Transparent Selection & Human Oversight** | Support transparent screening and selection by applying approved scheme criteria while retaining appropriate human oversight. | **Application X-Ray Dual-Pane Workstation** (`OfficerScrutinyDesk.jsx`): Left pane displays demographic data and deterministic rule checklist; Right pane displays document canvas with OCR bounding boxes. Includes mandatory **Human Officer Override** and **Statutory Rejection** clause logging. |
| **6. Scheme-Specific Selection Allocation** | Merit-based selection reflecting distinct scheme rules rather than generic formulas. | **Statutory Allocation Engines** (`MeritRankingEngine.jsx`): NFST evaluates PG marks + 30% horizontal female quota + 5% Divyangjan + PVTG slots; NOS prioritizes QS World Top 500/200 offers + Expert Committee; Top Class allocates seats based on JEE/NEET/CAT/CLAT ranks. |
| **7. Separate Applicant & Admin Interfaces** | Provide separate interfaces: applicants track applications and respond to queries; Ministry officials monitor applications, scrutiny, selection, and scheme performance. | **Strictly Isolated Role-Based Workspaces**: <br>• **Scholar Desk**: Application tracker, document viewer, deficiency redressal desk, and quarterly progress report (QPR) hub.<br>• **Ministry Administrative Workspace**: Executive KPIs, dual-pane scrutiny desk, shared-identifier anomaly triage, scheme config studio, and PFMS DBT hub. |
| **8. Dashboards & National Analytics** | Enable MoTA to monitor applications, verification, selection, and scheme performance across relevant parameters. | **Executive Intelligence & GIS Analytics** (`NationalAnalytics.jsx`): Real-time KPI counters, state-wise application heatmaps, turnaround time (TAT) tracking, PVTG inclusion metrics, and downloadable official ministry reports. |

---

## 🏛️ Executive Summary & Architectural Vision

The **Ministry of Tribal Affairs (MoTA)** administers flagship higher-education scholarship and fellowship programs to empower Scheduled Tribe (ST) students across premier Indian universities and top global institutions:

1. **National Fellowship for Scheduled Tribe Students (NFST)**: 750 annual research fellowships for regular M.Phil and Ph.D. scholars in Indian universities (₹37,000–₹42,000/mo JRF/SRF stipend, HRA, and ₹20,500 annual contingency).
2. **National Overseas Scholarship (NOS)**: 100% actual tuition fee coverage, economy return airfare, and annual living allowance (GBP 9,900 / USD 15,400) for Master's and Ph.D. studies at **QS World Top 500** universities (priority to ranking ≤ 200).
3. **Top Class Education for ST Students**: 100% tuition coverage, ₹45,000 IT equipment grant, and monthly living assistance in notified premier institutions (IITs, IIMs, NITs, AIIMS, NLUs).
4. **Centrally Co-funded Pre-Matric & Post-Matric Schemes**.

### The Core Problem Addressed
* **Manual Scrutiny Delays**: Applications historically required 4 to 6 months of multi-tier verification across university, state, and ministry desks.
* **Repetitive Correspondence**: Minor document deficiencies (lapsed annual income certificates, smudged revenue seals) led to prolonged delays and rejections.
* **Hardcoded Eligibility Engines**: Legacy portals could not accommodate annual quota modifications or affirmative action adjustments without code redeployments.
* **Post-Selection Bottlenecks**: Absence of automated tracking for supervisor-endorsed Quarterly Progress Reports (QPR) and timely Direct Benefit Transfer (DBT) release through PFMS.

**VidyaSetu (विद्यासेतु)** bridges the existing government scholarship ecosystem (NSP, DigiLocker, PFMS, NPCI) through an intelligent orchestration layer to human scrutiny officers:  
**Discover ➔ Apply ➔ Verify ➔ Scrutinize ➔ Select ➔ Communicate ➔ Disburse ➔ Monitor**

> [!NOTE]
> **Prototype Demonstration & Sandbox Notice:**  
> VidyaSetu is an advanced working prototype developed for Smart India Hackathon 2026. External interfaces (UIDAI Aadhaar e-KYC, DigiLocker repository, PFMS e-FTO, and NPCI Aadhaar Payment Bridge) are implemented as **integration-ready sandbox adapters** that adhere to published government interface schemas. All AI functions assist human officers—final adverse and sanctioning decisions are strictly reserved for authorized government officers.

---

## 📊 Grounded Official Statistics vs Prototype Demonstration Cohort

To maintain absolute credibility and transparent data hygiene, VidyaSetu clearly distinguishes published official MoTA DBT metrics from its synthetic demonstration cohort:

| Metric Category | Metric & Source | Published Value / Scope | Description |
| :--- | :--- | :--- | :--- |
| **Official MoTA DBT** | Pre-Matric ST Scholarship | **28,99,699 Beneficiaries** | Official MoTA published portal figures ([dbttribal.gov.in](https://dbttribal.gov.in/AllScheme.aspx)) |
| **Official MoTA DBT** | Post-Matric ST Scholarship | **65,42,207 Beneficiaries** | Official MoTA published portal figures ([dbttribal.gov.in](https://dbttribal.gov.in/AllScheme.aspx)) |
| **Official MoTA DBT** | Higher Education (NFST, NOS, Top Class) | **56,000+ Cumulative Scholars** | Cumulative fellowships disbursed ([tribal.nic.in](https://tribal.nic.in/ScholarshiP.aspx)) |
| **Official MoTA DBT** | Cumulative Fellowship DBT Transfers | **₹4,300+ Crores** | Total historical transfers via PFMS |
| **Prototype Demo Cohort** | Synthetic Applicant Pool | **12,842 Applications** | Synthetic dataset across 36 States/UTs and 75 PVTG communities |
| **Prototype Demo Cohort** | Demonstration Disbursal Sandbox | **₹178.4 Crores** | Synthetic PFMS batch simulation pool |

---

## 🎯 5 Core Defensible AI & Workflow Innovations

Instead of presenting simulated "black-box" models, VidyaSetu demonstrates 5 hardened, explainable core technical capabilities:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        VIDYASETU CORE TECHNICAL ENGINE                                 │
├──────────────────────────┬──────────────────────────┬──────────────────────────────────┤
│ 1. Deterministic Rule    │ 2. AI Document Scrutiny  │ 3. Application X-Ray             │
│    Engine                │    & Deficiency Loop     │    Dual-Pane Workstation         │
│ • Zero black-box bias    │ • OCR entity extraction  │ • Left: Statutory Checklist      │
│ • Hard statutory limits  │ • Expired doc detection  │ • Right: OCR Canvas + Bounding   │
│ • Gazette Schedule VI    │ • Live re-upload scan    │ • Officer Override & Clause Logs │
├──────────────────────────┼──────────────────────────┼──────────────────────────────────┤
│ 4. Scheme-Specific       │ 5. Tamper-Evident SHA-256│ 6. What-If Policy DSS            │
│    Merit Allocators      │    Chained Audit Trail   │    10,000-Record Simulator       │
│ • NFST: PG Marks + Quotas│ • Hash: H_k = SHA(H_k-1) │ • Real-time rule perturbation    │
│ • NOS: QS Top 500 + Comm.│ • Interactive validator  │ • Instant beneficiary & budget   │
│ • Top Class: Test Ranks  │ • Tamper attack detection│   impact delta calculations      │
└──────────────────────────┴──────────────────────────┴──────────────────────────────────┘
```

### 1. Deterministic Statutory Rule Engine (No Black-Box Rejections)
* Evaluates hard constitutional criteria: ST community notification (Schedule VI lookup), annual family income ceilings (₹6 LPA for NFST, ₹8 LPA for NOS), age limits (≤ 36 yrs for NFST, ≤ 35 yrs for NOS), and qualifying degree requirements.
* Zero arbitrary ML scoring for statutory eligibility: prospective scholars can click **"Why am I eligible / not eligible?"** to inspect exact statutory clause citations.

### 2. AI-Assisted Document Pre-Scrutiny & Live Deficiency Resolution Loop
* Extracts document attributes (issuing authority, certificate serial number, date of issuance, candidate name match percentage).
* Flags defects automatically (e.g. an income certificate issued in 2023 having lapsed beyond the mandatory 1-fiscal-year validity).
* Enables candidate replacement upload with instant AI re-scan, automatically transitioning application status to `READY FOR HUMAN REVIEW` with preserved queue seniority.

### 3. Application X-Ray: Dual-Pane Officer Scrutiny Workstation
* **Left Pane**: Application particulars, demographic profile, and deterministic statutory rule pass/fail checklist.
* **Right Pane**: Interactive document visual canvas with OCR bounding boxes, cross-field verification table, and authority seal confidence.
* **Human-in-the-Loop Governance**: Features mandatory **Officer Override** (with recorded justification) and **Statutory Rejection** (requiring statutory clause citation).

### 4. Configurable Scheme-Specific Selection Engine
Replaced universal arbitrary formulas with official statutory criteria:
* **NFST Selection Engine**: Post-Graduate qualifying marks ranking + mandatory 30% horizontal female quota + 5% Divyangjan + dedicated PVTG slots.
* **NOS Selection Engine**: Prioritizes unconditional admission offers in **QS World Top 500** (priority ≤ 200) + Expert Academic Committee evaluation + 3 reserved PVTG slots.
* **Top Class Education**: Direct allocation based on national entrance ranks (JEE Advanced, NEET, CAT, CLAT) within notified premier institution quotas.
* Every scholar's selection generates an **Explainable Decision Record (RTI-Friendly Traceability)**.

### 5. Tamper-Evident SHA-256 Chained Audit Trail
* Every governance action (submission, AI pre-check, deficiency alert, re-scan, officer approval, PFMS batch creation) is committed as a cryptographically chained block:
  $$H_k = \text{SHA-256}(H_{k-1} + \text{Timestamp} + \text{Actor} + \text{Action} + \text{Payload})$$
* Includes live in-browser **Chain Integrity Verification** and an interactive **Simulate Tamper Attack** test button demonstrating instant tamper detection.

---

## ⚡ 7-Minute Golden End-to-End Walkthrough Guide

Follow this curated walkthrough to experience the entire lifecycle of scholar **Birsa Hemrom** (`MOTA-2026-NFST-0101`):

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
   * Select Post-Graduation, ₹4,50,000 income, 26 yrs, Ph.D. in India, Santhal.
   * Click **"Check Eligibility"** ➔ click **"Why am I eligible? 🔍"** to view the deterministic statutory rule breakdown.

2. **Step 2: Launch Golden Demo Candidate (Birsa Hemrom)**
   * Click the hero button: **"🚀 Run 7-Minute Golden Demo (Birsa Hemrom)"**.
   * You are logged in as Birsa Hemrom (`MOTA-2026-NFST-0101`, Ph.D. at IIT Kharagpur, Santhal tribe).
   * Notice status: **"Deficiency Pending"** with an active alert banner indicating an expired Income Certificate (issued Jan 2023, >1 yr old).

3. **Step 3: Resolve Deficiency via AI Re-Scan**
   * Click the red **"Rectify & Re-Upload"** button (or navigate to the **Deficiency Desk** tab).
   * Review the Scrutiny Officer's observation.
   * Click the upload box to load `Fresh_Income_Certificate_FY2026_27_SDO_Ranchi.pdf`.
   * Watch the AI re-scan validate the SDO barcode, 100% name match, and FY 2026-27 validity.
   * Click **"Submit Rectified Document to MoTA Desk"**.
   * State transitions immediately to: **`STATUS: READY FOR HUMAN REVIEW`**.

4. **Step 4: Ministry Officer Scrutiny Desk (Application X-Ray)**
   * Click **"Switch to Ministry Officer Scrutiny Desk (Dual-Pane Workstation) ➔"** (or click the hero button `🛡️ Ministry Officer Scrutiny Login` / header toggle `Officer Desk ➔`).
   * Select Birsa Hemrom (`MOTA-2026-NFST-0101`) in the queue.
   * **Left Pane**: Observe that all deterministic rules (ST status, income, age, degree) now show **PASS**.
   * **Right Pane**: Inspect the Income Certificate canvas with the green OCR bounding box and extracted entity table.
   * Click **"Approve Application"** to forward to the Selection Committee (or inspect the **Human Officer Override** and **Statutory Rejection** modals).

5. **Step 5: Scheme Configuration Studio & 10,000-Record Policy Simulator**
   * In the top admin bar, click **"Scheme Config & 10k Simulator"**.
   * Select **NFST**. Adjust the Annual Income Ceiling slider (e.g. from ₹6.0L to ₹8.0L) or modify the PVTG Equity Weight.
   * Click **"Run 10k Applicant Policy Simulation"** to observe real-time projected beneficiary deltas (+680 scholars) and budget impact (+₹25.16 Cr).

6. **Step 6: Verify Tamper-Evident SHA-256 Chained Audit Trail**
   * In the admin bar, click **"AI Triage & Anomalies"** (or click Audit Trail on any student card).
   * Open Birsa Hemrom's **Tamper-Evident Audit Trail**.
   * Click **"Verify Hash Chain Integrity"** ➔ observe cryptographic validation confirming all blocks are linked without tampering.
   * Click **"Simulate Tamper Attack (Test)"** ➔ observe instant detection of altered block hash and broken chain pointer.
   * Click **"Restore Original Audit Chain"** to return to integrity.

7. **Step 7: Award Letter & PFMS DBT Sandbox Hub**
   * In the admin bar, click **"Merit & Quota Engine"** and click **"Generate Official Gazette & Sanction Award Letters"**.
   * View Birsa's official Award Letter with digitally signed credentials and prototype QR registry verification.
   * Switch to **"Post-Selection & DBT Hub"** to view quarterly progress report (QPR) compliance and simulated PFMS e-FTO disbursement batches.

---

## 🏗️ Technical Architecture & Repository Structure

VidyaSetu comprises a native Node.js REST API service in `backend/` and a React 19/Vite frontend in `src/`:

```
VidyaSetu/
├── backend/
│   ├── server.js                     # Zero-dependency Node.js HTTP/REST server (Port 5001)
│   ├── services/
│   │   ├── ruleEngine.js             # Pure deterministic statutory evaluation engine
│   │   ├── auditChain.js            # SHA-256 cryptographic block chaining & verification
│   │   ├── documentAI.js            # OCR entity extraction, date check & re-scan service
│   │   └── policySimulator.js       # 10,000-record Monte Carlo policy DSS simulator
│   └── data/
│       └── db.js                     # In-memory database with official MoTA figures & applicants
├── src/
│   ├── components/
│   │   ├── PublicHomePage.jsx        # Citizen home page, 30-sec pre-checker & "Why?" modal
│   │   ├── Header.jsx                # Gov of India header, accessibility & role quick-toggle
│   │   ├── AuditTrailModal.jsx       # Interactive SHA-256 chain integrity validator
│   │   ├── AwardLetterModal.jsx      # Sanction award letter with prototype QR verification
│   │   ├── VidyaMitraChatbot.jsx     # Multilingual voice/text conversational AI copilot
│   │   └── LoginPanel.jsx            # Citizen / Officer Jan Parichay authentication
│   ├── portals/
│   │   ├── ApplicantPortal/          # Scholar dashboard, wizard, deficiency desk, QPR
│   │   └── AdminPortal/              # Scrutiny desk, triage, merit engine, policy simulator
│   ├── services/
│   │   └── apiClient.js              # REST client with automatic fallback for static hosting
│   └── data/
│       ├── mockData.js               # Initial applicants, schemes, and tribal communities
│       └── i18n.js                   # Multilingual dictionary (6 official & tribal languages)
├── SYSTEM_ARCHITECTURE.md            # Comprehensive technical architecture specification
├── DEPLOYMENT.md                     # Production deployment manual (Cloud & Docker)
└── package.json                      # Project dependencies and operational scripts
```

---

## 🚀 Getting Started & Local Installation

### Prerequisites
* **Node.js**: v18.0 or higher (v24.x tested and supported)
* **npm**: v9.0 or higher

### 1. Clone the Repository
```bash
git clone https://github.com/aditisinha17/VidyaSetu.git
cd VidyaSetu
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Complete Platform (Backend + Frontend)

**Terminal 1 — Start the Backend Service:**
```bash
npm run backend
```
*Starts the VidyaSetu Governance API server at `http://localhost:5001`.*

**Terminal 2 — Start the Vite Development Server:**
```bash
npm run dev
```
*Opens the VidyaSetu application at `http://localhost:5173`.*

### 4. Build for Production
```bash
npm run build
```
*Generates optimized production assets in `dist/`.*

---

## 🌐 Multilingual Accessibility & Tribal Inclusion (GIGW 2.0)

VidyaSetu is designed from the ground up for equitable access across remote tribal belts:
* **6 Supported Languages**: English, हिन्दी (Hindi), ଓଡ଼ିଆ (Odia), ᱥᱟᱱᱛᱟᱲᱤ (Santali - Ol Chiki script), తెలుగు (Telugu), and मराठी (Marathi).
* **Low-Bandwidth 2G Mode**: Eliminates heavy graphics and compresses UI payloads for scholars in remote Schedule V/VI regions.
* **Accessibility Controls**: WCAG 2.1 AA compliant high-contrast theme and font size scaling ($A$ / $A+$).
* **Screen Reader & Speech Support**: Multilingual speech recognition and synthesis via the **VidyaMitra** copilot.

---

## 📜 Compliance, Integrity & Legal Framework

* **Constitutional Grounding**: Implements statutory reservation rules under Schedule V and Schedule VI of the Constitution of India.
* **Explainable Decisions**: RTI-friendly decision records with deterministic rule audit trails ensure that administrative discretion is transparent and auditable.
* **Zero Adverse Automated Decisions**: AI performs entity extraction, validation flagging, and triage prioritization; adverse decisions require statutory clause citations by authorized human officers.

---

## 👥 Contributors & Acknowledgements

* **Team VidyaSetu** — Smart India Hackathon (SIH) 2026 (Problem Statement 239)
* **Ministry of Tribal Affairs (MoTA)**, Government of India
* Official References: [tribal.nic.in/ScholarshiP.aspx](https://tribal.nic.in/ScholarshiP.aspx) | [dbttribal.gov.in/AllScheme.aspx](https://dbttribal.gov.in/AllScheme.aspx)
