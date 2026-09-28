# VidyaSetu (विद्यासेतु) — Technical System Architecture Specification
### Unified AI-Assisted Scholarship & Fellowship Governance Platform
**Ministry of Tribal Affairs (MoTA), Government of India (जनजातीय कार्य मंत्रालय, भारत सरकार)**  
**Smart India Hackathon (SIH) 2026 — Problem Statement ID: 239 (Software Edition | Theme: Smart Education)**

---

## 0. SIH 2026 Problem Statement 239 — System Specification Alignment

### Problem Statement Identity
* **Problem Statement ID**: 239
* **Ministry / Department**: Ministry of Tribal Affairs (MoTA)
* **Category**: Software
* **Theme**: Smart Education
* **Official Data Link Sets**: [tribal.nic.in/ScholarshiP.aspx](https://tribal.nic.in/ScholarshiP.aspx) | [dbttribal.gov.in/AllScheme.aspx](https://dbttribal.gov.in/AllScheme.aspx)

### Architectural Mapping Against Problem Statement Mandates:
1. **End-to-End Integrated System**: Unifies the complete 8-stage lifecycle (applicant registration, online application, document submission, eligibility verification, scrutiny, screening, selection, communication, and post-selection fellowship management).
2. **Configurable Scheme System**: Handles different eligibility criteria, documents, and selection processes applicable to individual schemes (NFST, NOS, Top Class ST) through a configurable schema engine (`SchemeConfigStudio.jsx` & `ruleEngine.js`).
3. **AI & Automation for Scrutiny**: Leverages OCR document intelligence (`documentAI.js`) to reduce manual verification, extract certificate fields, and detect defective/expired credentials.
4. **Deficiency Resubmission Loop**: Provides automated deficiency communication, a 15-day SLA resolution desk, document replacement, AI re-scan, and queue seniority preservation (`DeficiencyDesk.jsx`).
5. **Transparent Screening with Human Oversight**: Delivers an **Application X-Ray Dual-Pane Workstation** (`OfficerScrutinyDesk.jsx`) ensuring that all AI recommendations are audited by authorized human officers, supported by mandatory **Officer Override** and **Statutory Rejection** clauses.
6. **Separate Interfaces**: Fully decoupled citizen/scholar interface (**Scholar Desk**) and ministry administrative workspace (**Ministry Governance Hub**).
7. **Dashboards & Scheme Analytics**: Executive intelligence dashboards monitoring turnaround times (TAT), scheme allocations, state-wise application heatmaps, and PVTG inclusion rates (`NationalAnalytics.jsx`).

---

## 1. Architectural Principles & High-Level Architecture (HLA)

VidyaSetu is architected as an **Event-Driven, Service-Oriented Web Application** conforming to the **National e-Governance Division (NeGD)** standards, **Guidelines for Indian Government Websites (GIGW 2.0)**, and **WCAG 2.1 AA Accessibility Standards**.

### Core Governance Principles
1. **Human-in-the-Loop Supremacy**: AI models assist in document attribute extraction, validity checking, and queue triage. Adverse decisions (rejections) or statutory overrides require affirmative action and clause citations by authorized human officers.
2. **Deterministic Statutory Rule Checking**: Eligibility is evaluated via pure deterministic statutory logic (ST notification, income ceilings, age thresholds, notified institute quotas), eliminating black-box bias.
3. **Integration-Ready Sandbox Adapters**: External systems (UIDAI, DigiLocker, PFMS, NPCI, MeriPehchaan) are decoupled via well-defined adapter interfaces, enabling seamless local simulation or production deployment without hardcoding proprietary dependencies.
4. **Cryptographic Traceability**: All governance lifecycle events are permanently recorded in a SHA-256 chained audit trail, providing immutable proof of non-tampering.

```
+----------------------------------------------------------------------------------------------------+
|                                    PRESENTATION LAYER (CLIENT-SIDE)                                 |
|                                                                                                    |
|   +--------------------------------------------------------------------------------------------+   |
|   |                         CITIZEN PUBLIC PORTAL (NO LOGIN REQUIRED)                          |   |
|   |  - National Ministry Identity & Ashoka Emblem Design System                                |   |
|   |  - Multi-Language Switcher (English, हिन्दी, ଓଡ଼ିଆ, ᱥᱟᱱᱛᱟᱲᱤ [Ol Chiki], తెలుగు, मराठी)         |   |
|   |  - Flagship Scheme Directory (NFST, NOS, Top Class Education Guidelines & Documents)       |   |
|   |  - 30-Second Quick Eligibility Pre-Checker (Degree, Income, Age, Tribe, Destination)       |   |
|   |  - Official MoTA DBT Published Metrics vs 12,842 Synthetic Demo Cohort Labels              |   |
|   |  - "Why am I eligible / not eligible?" Statutory Clause Breakdown Modal                    |   |
|   |  - 6-Stage Governance Roadmap Infographic & Citizen FAQ Redressal Matrix                   |   |
|   +----------------------------------------------+---------------------------------------------+   |
|                                                  |                                                 |
|                   +------------------------------+------------------------------+                  |
|                   v                                                             v                  |
|   +---------------------------------------------+   +------------------------------------------+   |
|   |     NEW REGISTRATION & SCHOLAR WORKSPACE    |   |      MINISTRY ADMINISTRATIVE WORKSPACE   |   |
|   |  - New Student Registration (Sign-Up Flow)  |   |  - Executive Analytics & National Heatmap|   |
|   |  - Jan Parichay / DigiLocker Sandbox Auth   |   |  - Application X-Ray Dual-Pane Workstation|   |
|   |  - 5-Step Application Wizard & Pre-Check    |   |  - AI Triage & Shared Identifier Anomaly |   |
|   |  - Rule + Statutory Scheme Matcher          |   |  - Scheme-Specific Merit & Quota Engine  |   |
|   |  - 6-Stage Visual Verification Pipeline     |   |  - Post-Selection & PFMS Disbursal Hub   |   |
|   |  - Deficiency Redressal Desk (15-Day SLA)   |   |  - Scheme Config Studio & 10k Simulator  |   |
|   |  - Post-Selection Fellowship (QPR / DBT)    |   |  - What-If Policy Decision Support (DSS) |   |
|   |  - Multi-Channel Notification Drawer        |   |  - Tamper-Evident SHA-256 Audit Trail    |   |
|   |  - VidyaMitra Multilingual Audio Copilot    |   |  - Officer Scrutiny Override Mechanism   |   |
|   +---------------------------------------------+   +------------------------------------------+   |
|                                                                                                    |
+--------------------------------------------------+-------------------------------------------------+
                                                   |
                                                   v
+----------------------------------------------------------------------------------------------------+
|                                 APPLICATION & LOGIC SERVICES LAYER (backend/)                       |
|                                                                                                    |
|   +-------------------------+   +-------------------------+   +--------------------------------+   |
|   | DOCUMENT OCR AI SERVICE |   | STATUTORY RULE ENGINE   |   | SCHEME SELECTION ENGINE        |   |
|   | - Entity Extraction     |   | - Pure Deterministic    |   | - NFST: PG Marks + Quotas      |   |
|   | - Bounding Box Tagger   |   | - Income & Age Ceilings |   | - NOS: QS World Top 500/200    |   |
|   | - Barcode & QR Verifier |   | - Gazette Schedule VI   |   | - Top Class: Entrance Ranks    |   |
|   | - Date Validity Check   |   | - Zero Black-Box ML     |   | - RTI-Friendly Traceability    |   |
|   +-------------------------+   +-------------------------+   +--------------------------------+   |
|                                                                                                    |
|   +-------------------------+   +-------------------------+   +--------------------------------+   |
|   | ANOMALY DETECTION GRAPH |   | QPR & COMPLIANCE GATE   |   | TAMPER-EVIDENT AUDIT CHAIN     |   |
|   | - Shared Identifier Hub |   | - Supervisor Endorse    |   | - SHA-256 Hash Chaining        |   |
|   | - Duplicate Bank / Phone|   | - Quarterly Verification|   | - H_k = SHA(H_k-1 + Payload)   |   |
|   | - Non-adverse Flagging  |   | - Stipend Release Gate  |   | - Cryptographic Chain Audit    |   |
|   +-------------------------+   +-------------------------+   +--------------------------------+   |
|                                                                                                    |
|   +-------------------------------------------------------+   +--------------------------------+   |
|   | CITIZEN PRE-CHECKER & LOCALIZATION ENGINE             |   | 10k POLICY SIMULATOR DSS       |   |
|   | - 30-Second Dynamic Qualification Matrix              |   | - What-If Delta Calculator     |   |
|   | - Multilingual Dictionary (6 Official Languages)      |   | - Beneficiary & Budget Impact  |   |
|   +-------------------------------------------------------+   +--------------------------------+   |
+--------------------------------------------------+-------------------------------------------------+
                                                   |
                                                   v
+----------------------------------------------------------------------------------------------------+
|                                 INTEGRATION-READY SANDBOX ADAPTERS                                 |
|                                                                                                    |
|   [MeriPehchaan (Jan Parichay Adapter)] <---> [DigiLocker Certified Repositories Adapter]          |
|   [UIDAI Demographic Validation Mock]   <---> [NPCI Aadhaar Payment Bridge (APB) Adapter]          |
|   [Public Financial Management (PFMS)]  <---> [Central ST Gazette (Schedule VI Data Store)]        |
|   [QS World University Ranking Data]    <---> [SHA-256 Tamper-Evident Chained Ledger]              |
+----------------------------------------------------------------------------------------------------+
```

---

## 2. End-to-End Data Flow Architecture (DFD Level 0 & Level 1)

```
[Citizen / Prospective ST Scholar]
     │
     ▼ (1) Explores Public Scheme Directory & Guidelines (NFST / NOS / Top Class)
[Public Citizen Portal]
     │
     ├───► [Selects Language (EN / HI / OR / SAT / TE / MR)] ──► Real-time UI Localization
     │
     ├───► [30-Second Eligibility Checker] ──► Instant Statutory Breakdown ("Why am I eligible?")
     │
     ▼ (2) Clicks "New Registration" or "Run 7-Minute Golden Demo"
[Registration & Authentication Gateway]
     │
     ├───► New Student: Signs Up with Aadhaar e-KYC (Sandbox) + Mobile OTP
     │
     └───► Golden Demo: Birsa Hemrom Authenticated (MOTA-2026-NFST-0101)
     │
     ▼ (3) Lands on Scholar Dashboard
[Applicant Dashboard]
     │
     ├───► Status: Deficiency Pending (Expired Income Certificate Flagged)
     │
     ├───► Enters Deficiency Desk ➔ Uploads replacement FY 2026-27 SDO Ranchi Certificate
     │
     ├───► AI Re-Scan: Verifies Barcode & 100% Name Match ➔ Appends SHA-256 Block
     │
     └───► Status Transitions to: READY FOR HUMAN REVIEW
     │
     ▼ (4) Transitions to Ministry Scrutiny Officer Desk
[Officer Scrutiny Desk (Application X-Ray Dual-Pane)]
     │
     ├───► Left Pane: Inspects Deterministic Statutory Rule Checklist (ST, Income, Age, Marks)
     │
     ├───► Right Pane: Examines Document Canvas with OCR Bounding Box & Authority Seals
     │
     └───► Officer Actions:
           ├───► [Approve] ───────────────────────► Moves to Selection Committee Review
           ├───► [Human Officer Override] ────────► Overrides rule with mandatory justification log
           └───► [Statutory Rejection] ───────────► Rejects with mandatory cited statutory clause
     │
     ▼ (5) Merit Allocation & Quota Enforcement
[Scheme-Specific Selection Engine]
     │
     ├───► NFST: PG Marks Ranking + 30% Horizontal Girls Quota + 5% Divyang + PVTG Slots
     ├───► NOS: QS World Top 500 Ranking Prioritization + Expert Committee Appraisal
     └───► Top Class: Premier Institute Quotas based on JEE/NEET/CAT/CLAT Scores
     │
     ▼ (6) Selection & Gazette Generation
[National Selection Gazette & Award Modal]
     │
     ├───► Publishes Award Sanction Orders with Prototype QR Verification Registry
     │
     ▼ (7) Post-Selection Governance & Disbursal
[Post-Selection & PFMS DBT Sandbox Hub]
     │
     ├───► Supervisor Endorsement of Quarterly Progress Reports (QPR)
     │
     └───► Automatic Batch Generation for PFMS e-FTO Direct Benefit Transfer to Aadhaar-Seeded Bank
```

---

## 3. Core Subsystems & Technical Specifications

### 3.1. Deterministic Statutory Rule Engine (`backend/services/ruleEngine.js`)
Unlike statistical machine-learning models that can produce variable or discriminatory outcomes, statutory eligibility in government scholarships is governed by legal mandates. The VidyaSetu Rule Engine enforces pure deterministic evaluations:

$$\text{Eligibility}(\text{Applicant}, \text{Scheme}) = \bigwedge_{c \in \text{Criteria}} \text{Evaluate}(c, \text{Applicant})$$

* **ST Notification Check**: Verifies if the applicant's tribe belongs to the Central Schedule VI list.
* **Annual Family Income Ceiling**: Evaluates against scheme ceiling ($\le \text{₹}6.0\text{ LPA}$ for NFST, $\le \text{₹}8.0\text{ LPA}$ for NOS).
* **Age Ceiling**: Evaluates age against cutoff date ($\le 36\text{ yrs}$ for NFST, $\le 35\text{ yrs}$ for NOS).
* **Affirmative Action**: Evaluates Particularly Vulnerable Tribal Group (PVTG) status and applies dedicated reserved slots (50 slots in NFST, 3 slots in NOS).

### 3.2. AI-Assisted Document Pre-Scrutiny & Live Deficiency Loop (`backend/services/documentAI.js`)
* Performs optical character extraction to identify certificate serial numbers, issuing revenue authorities, and issuance dates.
* Detects lapsed certificate validity: Income certificates older than 1 fiscal year are flagged with code `DEF-INC-EXPIRED`.
* Implements the **Deficiency Resolution Loop**:
  1. Student uploads fresh certificate: `Fresh_Income_Certificate_FY2026_27_SDO_Ranchi.pdf`.
  2. OCR engine extracts issuing authority (`Sub-Divisional Officer, Ranchi`), issue date (`12-06-2026`), and candidate name match percentage (100%).
  3. Automatically updates case status from `DEFICIENT` to `READY FOR HUMAN REVIEW`.
  4. Preserves initial submission seniority timestamp in the national intake registry.

### 3.3. Application X-Ray: Dual-Pane Workstation (`src/portals/AdminPortal/OfficerScrutinyDesk.jsx`)
* **Left-Hand Pane**: Displays the candidate's demographic data, academic profile, and the automated rule evaluation pass/fail matrix.
* **Right-Hand Pane**: Interactive document visualizer rendering bounding-box coordinates around extracted entities (Name, Income Amount, SDO Barcode).
* **Officer Override Protocol**: Enables an officer to approve an edge-case applicant if manual physical verification was conducted, requiring a mandatory justification log permanently committed to the audit trail.
* **Statutory Rejection Protocol**: Prohibits generic rejections; officers must cite the exact statutory clause (e.g., *NFST Guidelines Section 4.2: Income Exceeds Ceiling*).

### 3.4. Tamper-Evident SHA-256 Chained Audit Trail (`backend/services/auditChain.js`)
Every state transition computes a cryptographic block hash chained to the predecessor block:

$$H_k = \text{SHA-256}(H_{k-1} \,\|\, \text{Timestamp} \,\|\, \text{Actor} \,\|\, \text{Action} \,\|\, \text{Payload})$$

```javascript
// Cryptographic Block Structure
{
  prevHash: "e81a3f01b9204918acde88102910481239102481029410294810293810293810",
  timestamp: "2026-09-12T10:42:00Z",
  actor: "AI Document Pre-Scrutiny Lab",
  action: "OCR extraction completed: Flagged Income Certificate validity lapsed",
  payload: "docName=Income Certificate;issueDate=15-01-2023",
  hash: "a42f9910c2847102938471029384710293847102938471029384710293847102",
  shortHash: "a42f..7102"
}
```

The system provides live cryptographic integrity verification:
* If any payload, timestamp, or actor field is altered in historical records, recomputed hashes mismatch and the broken chain link is identified immediately.

### 3.5. What-If Policy DSS & 10,000-Record Simulator (`backend/services/policySimulator.js`)
Enables MoTA policy directors to simulate proposed scheme rule revisions across a realistic synthetic cohort of 10,000 applicant records:
* Simulates adjustments to income ceilings (₹6L to ₹8L), minimum marks thresholds (50% to 55%), or quota weightings.
* Calculates exact prospective outcomes:
  $$\Delta \text{Beneficiaries} = N_{\text{new}} - N_{\text{current}}$$
  $$\Delta \text{Budget} = \Delta \text{Beneficiaries} \times \text{Stipend Rate}$$

---

## 4. Integration-Ready Sandbox Adapters

| External System | Target Entity | Adapter Architecture | Implementation Status |
| :--- | :--- | :--- | :--- |
| **MeriPehchaan** | National Single Sign-On | OAuth2 / SAML 2.0 Simulation Adapter | Operational Mock Adapter |
| **DigiLocker** | Ministry of Electronics & IT | XML / JSON Document Push & Fetch Protocol | Sandbox Ready Adapter |
| **UIDAI Aadhaar** | Unique Identification Authority | Demographic matching & OTP e-KYC Mock | Sandbox Ready Adapter |
| **NPCI APB** | National Payments Corporation | Aadhaar Payment Bridge Bank Account Seeding Check | Verification Simulator |
| **PFMS** | Ministry of Finance | e-FTO (Electronic Funds Transfer Order) Batch Engine | Batch Ledger Sandbox |

---

## 5. Security & Regulatory Compliance

1. **GIGW 2.0 & WCAG 2.1 AA Compliance**:
   - Contrast ratio $\ge 4.5:1$ with dedicated High-Contrast mode for visually impaired users.
   - Text magnification support ($A$ and $A+$ controls).
   - Low-Bandwidth 2G operational mode designed for remote tribal areas.
2. **Data Minimization & Privacy**:
   - Aadhaar numbers are masked ($XXXX-XXXX-1234$).
   - Bank account numbers display only the final 4 digits.
3. **Session Integrity**:
   - Role-based access control strictly isolates Scholar Workspace from the Administrative Workstation.
   - Audit trail provides non-repudiation across all administrative actions.
