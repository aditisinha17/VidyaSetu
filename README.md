# VidyaSetu (विद्यासेतु)
### National AI-Enabled Unified Scholarship and Fellowship Governance Ecosystem
**Ministry of Tribal Affairs (MoTA), Government of India (जनजातीय कार्य मंत्रालय, भारत सरकार)**

[![Government of India](https://img.shields.io/badge/Government_of_India-Ministry_of_Tribal_Affairs-1e3a8a.svg)](#)
[![National Portals Integrated](https://img.shields.io/badge/SSO-Jan_Parichay_%7C_DigiLocker-emerald.svg)](#)
[![DBT Integration](https://img.shields.io/badge/Payments-PFMS_%7C_NPCI_Aadhaar_Bridge-orange.svg)](#)
[![Accessibility](https://img.shields.io/badge/Accessibility-WCAG_2.1_AA-blue.svg)](#)
[![License](https://img.shields.io/badge/License-Government_Open_Standard-slate.svg)](#)

---

## 🏛️ Executive Summary & Vision

The **Ministry of Tribal Affairs (MoTA)** implements flagship scholarship and fellowship programs to empower Scheduled Tribe (ST) students pursuing higher education across premier Indian institutions and world-class overseas universities:

1. **National Fellowship for Scheduled Tribe Students (NFST)**: M.Phil and Ph.D. research fellowships across UGC/CSIR/NIRF-recognized institutions with monthly JRF/SRF stipends (₹37,000–₹42,000/mo), HRA, and annual contingency (₹20,500/yr).
2. **National Overseas Scholarship (NOS)**: 100% actual tuition fee reimbursement, international economy return airfare, and annual maintenance allowance (GBP 9,900 / USD 15,400) for Master's and Ph.D. programs at **QS World Top 500** universities (priority ranking ≤ 200).
3. **Top Class Education for ST Students**: 100% tuition coverage, living allowance, and one-time IT equipment grants for ST scholars in notified institutions (IITs, IIMs, NITs, AIIMS, NLUs).
4. **Centrally Co-funded Pre-Matric & Post-Matric Schemes**.

### The Core Problem Addressed
* **Manual Scrutiny Delays**: Applications historically required 4 to 6 months of multi-tier verification across university, state, and central desks.
* **Repetitive Correspondence**: Minor document deficiencies (lapsed annual income certificates, smudged revenue seals) led to prolonged delays and rejections.
* **Hardcoded Eligibility Engines**: Legacy portals could not accommodate annual quota modifications or affirmative action adjustments without code redeployments.
* **Post-Selection Bottlenecks**: Absence of automated tracking for supervisor-endorsed Quarterly Progress Reports (QPR) and timely Direct Benefit Transfer (DBT) release through PFMS.

**VidyaSetu (विद्यासेतु)** unites all stages of scholarship governance into an intelligent, transparent, and auditable digital ecosystem:  
**Discover ➔ Apply ➔ Verify ➔ Scrutinize ➔ Select ➔ Communicate ➔ Disburse ➔ Monitor**

---

## 🌐 System Architecture & Component Topology

```
                                  ┌────────────────────────────────────────────────────────┐
                                  │                  VIDYASETU PLATFORM                    │
                                  │     Ministry of Tribal Affairs, Govt. of India         │
                                  └──────────────────────────┬─────────────────────────────┘
                                                             │
                  ┌──────────────────────────────────────────┴──────────────────────────────────────────┐
                  ▼                                                                                     ▼
     ┌─────────────────────────┐                                                           ┌─────────────────────────┐
     │ 👨🎓 SCHOLAR WORKSPACE   │                                                           │ 👨💼 MINISTRY WORKSPACE │
     │ • 5-Step Smart Wizard   │                                                           │ • Executive KPIs & Heatmap
     │ • Profile Dial (92%)    │                                                           │ • Dual-Pane OCR Desk    │
     │ • Rule + AI Matcher     │                                                           │ • AI Triage & Anomalies │
     │ • 6-Stage Pipeline      │                                                           │ • Merit Ranking Engine  │
     │ • Deficiency Desk (15d) │                                                           │ • DBT / PFMS Disbursal  │
     │ • QPR & Contingency Hub │                                                           │ • Scheme Config Studio  │
     │ • Grievance Redressal   │                                                           │ • What-If Policy DSS    │
     └────────────┬────────────┘                                                           └────────────┬────────────┘
                  │                                                                                     │
                  └──────────────────────────────────────────┬──────────────────────────────────────────┘
                                                             ▼
                                     ┌───────────────────────────────────────────────┐
                                     │            INTELLIGENT AI ENGINE              │
                                     ├───────────────────────────────────────────────┤
                                     │ • MoTA-Vision ST v2.4 (OCR & Bounding Boxes)  │
                                     │ • Deterministic Statutory Rule Engine         │
                                     │ • Cross-Entity Fraud & Anomaly Detector       │
                                     │ • Explainable AI Merit Ranking (RTI-Compliant)│
                                     │ • VidyaMitra Multilingual Speech Copilot      │
                                     └───────────────────────┬───────────────────────┘
                                                             │
                  ┌──────────────────────────────────────────┼──────────────────────────────────────────┐
                  ▼                                          ▼                                          ▼
     ┌─────────────────────────┐                ┌─────────────────────────┐                ┌─────────────────────────┐
     │   IDENTITY & DOCUMENTS  │                │      PAYMENTS & DBT     │                │   LEGAL & TRANSPARENCY  │
     │ • MeriPehchaan (Jan P.) │                │ • PFMS Gateway (e-FTO)  │                │ • SHA-256 Audit Trail   │
     │ • DigiLocker Repository │                │ • NPCI Aadhaar Bridge   │                │ • Official QR Gazette   │
     │ • UIDAI Aadhaar e-KYC   │                │ • RBI Direct Bank Sync  │                │ • Grievance SLA Router  │
     └─────────────────────────┘                └─────────────────────────┘                └─────────────────────────┘
```

---

## 🚀 Key Modules & Functional Capabilities

### 1. 🏛️ Public Citizen Portal & Scheme Directory (No Login Required)
* **Flagship Scheme Directory**:
  * **NFST (National Fellowship for Scheduled Tribe Students)**: Detailed stipend guidelines (₹37,000–₹42,000/mo), ₹20,500 annual contingency, eligibility rules, and mandatory documents.
  * **NOS (National Overseas Scholarship)**: Master's and Ph.D. abroad in QS Top 500 universities, 100% actual tuition fee reimbursement, £9,900 / $15,400 maintenance allowance, and annual airfare.
  * **Top Class Education for ST Students**: 100% tuition fees, ₹45,000 IT equipment grant, and monthly living allowance in notified premier institutes (IITs, IIMs, NITs, AIIMS, NLUs).
* **Interactive 30-Second Quick Eligibility Pre-Checker**:
  * Public calculator allowing prospective applicants to input qualification, annual family income, age, target institution, and tribal community to immediately discover which fellowships they qualify for.
* **National Impact & Disbursal Metrics**:
  * Live counters showcasing ₹178.4+ Cr disbursed via PFMS, 12,842 active scholars, 14-day turnaround time, and 75 PVTG communities covered.
* **Official Notification & Gazette Ticker**:
  * Real-time official circulars, Schedule VI Gazette references, and deadline announcements.
* **6-Stage Governance Roadmap**:
  * Transparent step-by-step citizen infographic explaining the end-to-end journey from registration to DBT disbursals.
* **Citizen FAQ Accordion & Official Ministry Helpdesk**:
  * Contact addresses, toll-free helpline (`1800-11-7777`), and official division emails.

---

### 2. 📝 New Student Registration & Dual-Panel Authentication Gateway
* **New Student Registration (Sign-Up Flow)**:
  * Full Legal Name, 12-Digit Aadhaar Number with simulated NPCI Bank Seeding validation.
  * Mobile Number with NIC SMS Gateway OTP verification simulation.
  * Scheduled Tribe Community selector mapped to Central ST Gazette (with automatic PVTG affirmative priority detection).
  * State of Domicile, Target Scheme selection, and automated DigiLocker document sync.
  * **Instant 1-Click Profile Onboarding**: Automatically initializes application profile and logs the student directly into their new personal dashboard.
* **Scholar Authentication**:
  * **MeriPehchaan (National SSO) & DigiLocker**: Direct integration pulling digitally verified Caste Certificates, Class X/XII certificates, and Domicile documents.
  * **Registered Mobile + OTP**: Automated 6-digit OTP delivery through the NIC SMS gateway.
  * **Aadhaar UIDAI e-KYC**: Direct demographic & biometric verification confirming **NPCI Aadhaar-Seeded bank accounts**.
* **Administrative Authentication**:
  * Role-based credentials with mandatory **2-Factor Authentication (e-Pramaan Token)**:
    * `director.fellowship@tribal.gov.in` — Joint Secretary / Central Scrutiny Director
    * `registrar@iitkgp.ac.in` — Institute Verification Officer
    * `dwo.mayurbhanj@odisha.gov.in` — District Welfare Officer
    * `ddo.pfms@tribal.gov.in` — Drawing & Disbursing Officer (PFMS / DBT)
    * `admin.nic@tribal.gov.in` — Systems Administrator (NIC)
* **Public Navigation**: Includes a **"← Back to Public Portal"** button for seamless citizen exploration.

---

### 3. 👨🎓 Dedicated Scholar / Student Workspace
* **Profile Completion Status (92%)**: Displays Aadhaar link, caste gazette status, and bank seeding.
* **AI Scheme Matching Engine**:
  * Hard Statutory Rule Engine evaluates 14 candidate attributes:
    * *NFST Match: 94%* (Statutory criteria verified, all 6 documents uploaded).
    * *NOS Match: 87%* (Income ≤ ₹8L ✓, Age ≤ 35 yrs ✓, passport & unconditional offer letter pending).
* **6-Stage Interactive Verification Pipeline**:
  `Submitted ➔ AI Pre-Verification ➔ District Verification ➔ Ministry Scrutiny ➔ Selection Committee ➔ Award & DBT Active`
* **Deficiency Redressal Desk**:
  * Highlights specific scrutiny observations (e.g. *Income Certificate issued Jan 2023 is expired*).
  * Statutory **15-day resolution countdown** to preserve application seniority.
  * **1-Click Re-Upload with Live AI Re-Scan**: Evaluates replacement document in real time (99.4% confidence) and returns it to the scrutiny queue.
* **Post-Selection Fellowship & DBT Hub**:
  * Disbursal transaction ledger with RBI UTR numbers and PFMS batch IDs.
  * Quarterly Progress Report (QPR) submission portal with guide endorsement gate.
  * Annual contingency grant claims and NOS international travel allowances.
  * Official cryptographically verifiable **Sanction Order & Award Letter** with QR code.
* **Grievance Redressal Desk**:
  * AI intent classifier routes complaints automatically to the responsible division (*Finance & DBT*, *Scrutiny Cell*, or *Technical Portal Support*).

---

### 3. 👨💼 Ministry Administrator Workspace
* **Executive Overview & Performance KPIs**:
  * Total Applications: **12,842**
  * Under Verification: **3,241**
  * Deficient / Flagged: **842**
  * Total Selected: **1,204**
  * Pending Disbursement: **328**
  * Average Processing Turnaround: **14 Days** (reduced from **124 Days** — **88% reduction**).
* **Dual-Pane OCR Scrutiny Desk**:
  * Side-by-side verification: Form inputs on the left, interactive document canvas with highlighted OCR bounding boxes on the right.
  * Verifies Schedule VI Central ST Gazette status, issuing authority seals, and tamper/forgery risk scores.
  * 1-Click approval, rejection with statutory reason, or deficiency dispatch.
* **AI Application Triage & Priority Desk**:
  * Classifies intake into actionable queues: 🟢 **Ready for Review**, 🟡 **Needs Attention**, 🔴 **Deficient / Anomaly Flag**.
  * **Anomaly & Fraud Detector**: Flags duplicate applications sharing phone numbers, bank details, or photo hashes with 94%+ similarity.
* **Selection Committee & Explainable Merit Engine**:
  $$\text{Composite Merit Score} = \text{Qualifying PG Marks (50\%)} + \text{Institution Tier (20\%)} + \text{National Test (15\%)} + \text{Social Equity Bonus (15\%) }$$
  * Affirmative action quotas: **PVTG Dedicated Priority (+10 pts)** and **ST Women Horizontal Reservation (30% statutory minimum)**.
  * **RTI-Compliant Formula Inspector**: Displays exact mathematical point breakdown for every applicant.
  * **1-Click Gazette Publisher**: Generates official selection notifications.
* **Post-Selection & DBT/PFMS Disbursal Hub**:
  * Integrated Public Financial Management System (PFMS) & NPCI Aadhaar Bridge simulator.
  * Automated compliance gate: Stipend batches are released only after guide-endorsed QPR verification.
* **No-Code Scheme Configuration Studio & 10,000 Application Pool Simulator**:
  * Reconfigure scheme quotas, budgets, and eligibility thresholds without software deployment.
  * **10,000 Application Pool Stress-Test**: Evaluates newly drafted rules against 10,000 historical records to forecast Eligible vs Ineligible ratios.
* **"What-If" Policy Decision Support System (DSS)**:
  * Simulates the budgetary and beneficiary impact of policy revisions:
  * *E.g., Raising the income ceiling from ₹6.00L ➔ ₹8.00L brings **+1,521 additional ST beneficiaries** with an estimated budget delta of **+₹14.25 Crores**.*
* **National ST Geographic Intelligence Heatmap**:
  * State and district coverage breakdown across demographic hubs (Jharkhand, Odisha, MP, Chhattisgarh, Maharashtra, Assam, Rajasthan, Gujarat).

---

## 🛠️ Technology Stack Breakdown

| Layer | Technologies Used | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | **React 19** + **Vite 8** | High-performance single-page web architecture |
| **Styling & Design System**| **Tailwind CSS v4** + GoI Design Tokens | Authentic Government of India typography, Tricolor accents, and responsive layout |
| **Iconography** | **Lucide React** | Lightweight accessible iconography |
| **Document Vision & OCR** | **MoTA-Vision ST (Simulated OCR Engine)** | Document boundary detection, text extraction, seal validation, tamper scoring |
| **Rule & Policy Engine** | **Deterministic AST Evaluator** | Hard rule checks for income, age, marks, and ST gazette |
| **Explainable AI Engine**| **Multi-Criteria Decision Analysis (MCDA)** | Transparent scoring formula ensuring 100% RTI compliance |
| **Audit Ledger** | **SHA-256 State Hashing** | Cryptographically chained chronological audit trails |
| **Multilingual Copilot** | **NLP Knowledge Base + Web Speech API** | Voice-enabled assistant supporting 6 languages (EN, HI, OR, SAT, TE, MR) |
| **Accessibility** | **WCAG 2.1 AA Standards** | High-contrast toggle, scalable text, and Low-Bandwidth 2G mode |

---

## 📊 Where is AI Employed in the Governance Layer?

| Module | AI / Algorithmic Technology | Purpose & Legal Defensibility |
| :--- | :--- | :--- |
| **Scheme Matching** | Hybrid Rule Engine + Recommendation NLP | Pre-screens 14 criteria before applicant submits |
| **Eligibility Determination** | Deterministic Rules + Explainable Scoring | RTI-compliant, legally defensible point-by-point qualification score |
| **Document Intelligence** | OCR + Vision ST Entity Parsing | Extracts names, dates, seals, certificate IDs with confidence scores |
| **Deficiency Detection** | NLP Semantic Validation + Expiry Rules | Detects expired dates, missing synopsis, blurred revenue stamps |
| **Application Triage** | Multi-Factor Risk Classifier | Classifies intake into Ready 🟢, Review 🟡, Deficient 🔴 |
| **Fraud & Anomaly Check** | Cross-Entity Graph Matching | Flags duplicate bank details, identical photo hashes, and multi-identity claims |
| **Grievance Redressal** | NLP Intent Classifier & Smart Router | Auto-categorizes complaints and assigns priority to DDO / Scrutiny officers |
| **VidyaMitra Copilot** | Multilingual LLM + Web Speech Synthesis | Answers scheme rules in natural language with voice audio assistance |
| **Executive Analytics** | Predictive What-If Modeling & GIS Heatmap | Simulates budgetary & beneficiary impact of rule and quota adjustments |

---

## ⚡ Quick Start & Local Setup

### Prerequisites
* **Node.js**: v18.0.0 or higher (v24.x recommended)
* **npm**: v9.0.0 or higher

### Installation Steps

```bash
# 1. Clone repository
git clone https://github.com/your-org/VidyaSetu.git
cd VidyaSetu

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

The portal will be accessible at:  
👉 **`http://localhost:5173/`**

---

## ☁️ Live Cloud Deployment Guide

VidyaSetu is pre-configured with `vercel.json` and `public/_redirects` for single-command deployment to any cloud hosting provider:

### Option 1: Deploy on Vercel (Recommended)
```bash
# Install Vercel CLI (if not installed)
npm install -g vercel

# Deploy directly from repository root
vercel
```
* Or link your GitHub repository to [Vercel](https://vercel.com) for automatic CI/CD deployment on push.

### Option 2: Deploy on Netlify
```bash
# Build the production bundle
npm run build

# Deploy using Netlify CLI
npx netlify-cli deploy --prod --dir=dist
```
* Or drag-and-drop the generated `dist/` folder directly onto the [Netlify Drop](https://app.netlify.com/drop) dashboard.

### Option 3: Production Docker Container
A production Dockerfile is included:
```bash
# Build Docker image
docker build -t vidyasetu:latest .

# Run container on port 80
docker run -p 80:80 vidyasetu:latest
```

---

## 📜 Statutory Compliance & Standards

* **RTI Act, 2005**: All merit scores and selection criteria feature point-by-point explainability.
* **Information Technology Act, 2000**: Digital certificates, electronic signatures, and SHA-256 audit trails.
* **Direct Benefit Transfer (DBT) Mandate**: 100% Aadhaar Payment Bridge (APB) account verification via NPCI.
* **Guidelines for Indian Government Websites (GIGW 2.0)**: Compliant with national accessibility and bilingual presentation standards.

---

## 👥 Contributors & Acknowledgements

Developed for the **Ministry of Tribal Affairs (MoTA), Government of India**.  
*Theme: Smart Education | Category: Software*
