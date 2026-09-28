# VidyaSetu (विद्यासेतु) — Technical System Architecture Specification
### Ministry of Tribal Affairs (MoTA), Government of India (जनजातीय कार्य मंत्रालय, भारत सरकार)

---

## 1. High-Level Architecture (HLA)

VidyaSetu is architected as an **Event-Driven, Service-Oriented Web Application** conforming to the **National e-Governance Division (NeGD)** standards, **Guidelines for Indian Government Websites (GIGW 2.0)**, and **WCAG 2.1 AA Accessibility Standards**.

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
|   |  - Real-Time National Impact Counters (₹178.4 Cr DBT Disbursed, 12,842 Scholars, 14d Turn) |   |
|   |  - Official Circulars Ticker & Central ST Schedule VI Gazette Notices                      |   |
|   |  - 6-Stage Governance Roadmap Infographic & Citizen FAQ Redressal Matrix                   |   |
|   +----------------------------------------------+---------------------------------------------+   |
|                                                  |                                                 |
|                   +------------------------------+------------------------------+                  |
|                   v                                                             v                  |
|   +---------------------------------------------+   +------------------------------------------+   |
|   |     NEW REGISTRATION & SCHOLAR WORKSPACE    |   |      MINISTRY ADMINISTRATIVE WORKSPACE   |   |
|   |  - New Student Registration (Sign-Up Flow)  |   |  - Executive Analytics & National Heatmap|   |
|   |  - Aadhaar e-KYC (NPCI Seeded Bank Check)   |   |  - Dual-Pane OCR Scrutiny Workstation    |   |
|   |  - Mobile + NIC SMS OTP Verification        |   |  - AI Triage & Fraud/Anomaly Detection   |   |
|   |  - 5-Step Application Wizard & Digilocker   |   |  - Selection Committee & Merit Engine    |   |
|   |  - Rule + AI Scheme Matching Engine         |   |  - Post-Selection & PFMS Disbursal Hub   |   |
|   |  - 6-Stage Visual Verification Pipeline     |   |  - No-Code Scheme Config & 10k Simulator |   |
|   |  - Deficiency Redressal Desk (15-Day SLA)   |   |  - What-If Policy Decision Support (DSS) |   |
|   |  - Post-Selection Fellowship (QPR / DBT)    |   |  - High-Security 2FA e-Pramaan Auth      |   |
|   |  - AI Grievance Redressal Assistant         |   +------------------------------------------+   |
|   |  - VidyaMitra Multilingual Audio Copilot    |                                                  |
|   +---------------------------------------------+                                                  |
|                                                                                                    |
+--------------------------------------------------+-------------------------------------------------+
                                                   |
                                                   v
+----------------------------------------------------------------------------------------------------+
|                                 APPLICATION & LOGIC SERVICES LAYER                                 |
|                                                                                                    |
|   +-------------------------+   +-------------------------+   +--------------------------------+   |
|   |  MoTA-VISION OCR ENGINE |   | STATUTORY RULE ENGINE   |   | EXPLAINABLE AI MERIT ENGINE    |   |
|   |  - Entity Extraction    |   | - AST Deterministic     |   | - Multi-Criteria MCDA Scoring  |   |
|   |  - Bounding Box Tagger  |   | - Hard Ceiling Audits   |   | - PVTG Dedicated Priority      |   |
|   |  - Digital Seal Auth    |   | - Gazette Cross-Lookup  |   | - 30% ST Female Horizontal     |   |
|   |  - Tamper Risk Detector |   | - 10k Pool Simulator    |   | - RTI Audit Math Inspector     |   |
|   +-------------------------+   +-------------------------+   +--------------------------------+   |
|                                                                                                    |
|   +-------------------------+   +-------------------------+   +--------------------------------+   |
|   |  ANOMALY & FRAUD GRAPH  |   | QPR & COMPLIANCE GATE   |   | NOTIFICATION & DISPATCH ENGINE |   |
|   |  - Cross-Entity Match   |   | - Supervisor Endorse    |   | - NIC SMS Webhooks             |   |
|   |  - Duplicate Identifiers|   | - Milestone Compliance  |   | - Official Email Gateway       |   |
|   |  - Photo/IFSC Variance  |   | - Stipend Hold/Release  |   | - In-App Deficiency Notices    |   |
|   +-------------------------+   +-------------------------+   +--------------------------------+   |
|                                                                                                    |
|   +-------------------------------------------------------+   +--------------------------------+   |
|   |  CITIZEN PRE-CHECKER & LOCALIZATION ENGINE            |   | POLICY SIMULATOR DSS           |   |
|   |  - 30-Second Dynamic Qualification Matrix             |   | - What-If Delta Calculator     |   |
|   |  - Multilingual Dictionary (6 Official Languages)     |   | - Beneficiary Budget Modeling  |   |
|   +-------------------------------------------------------+   +--------------------------------+   |
+--------------------------------------------------+-------------------------------------------------+
                                                   |
                                                   v
+----------------------------------------------------------------------------------------------------+
|                                 INTEGRATION & NATIONAL DATA REPOSITORIES                           |
|                                                                                                    |
|   [MeriPehchaan (Jan Parichay)]  <--->  [DigiLocker Certified Repositories]                        |
|   [UIDAI Aadhaar Authentication] <--->  [NPCI Aadhaar Payment Bridge (APB)]                        |
|   [Public Financial Mgmt (PFMS)] <--->  [Central ST Gazette (Schedule VI)]                         |
|   [NIRF / QS World Rank Dataset] <--->  [SHA-256 Immutable Audit Ledger]                           |
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
     ├───► [30-Second Eligibility Checker] ──► Instant Match Results (e.g. "Eligible for NFST")
     │
     ▼ (2) Clicks "New Registration" or "Student Login"
[Registration & Authentication Gateway]
     │
     ├───► New Student: Signs Up with Aadhaar e-KYC + NPCI Bank Check + Mobile OTP
     │
     └───► Existing Scholar: Jan Parichay SSO / DigiLocker / Aadhaar Authenticated
     │
     ▼ (3) System Creates/Syncs Verified Applicant Record
[5-Step Application Wizard / Scholar Dashboard]
     │
     ▼ (4) Auto-Populates Verified Caste Certificate & Domicile from DigiLocker
[MoTA-Vision ST OCR Engine] ───► Extract: Name, Certificate No, Seal, Date, QR Hash
     │
     ├───► Pass (Confidence > 95%) ──► [Central Scrutiny Queue]
     │
     └───► Deficiency Flagged (< 70% or Expired) ──► [Deficiency Desk (15d SLA)]
                                                               │
                                                      [Automated SMS Alert]
                                                               │
                                                      [Applicant Re-Uploads]
                                                               │
                                                      [AI Pre-Clearance (99%)]
                                                               │
                                                               ▼
[MoTA Officer Dual-Pane Scrutiny Desk] ◄──────────────────────┘
     │
     ▼ (5) Officer Approval with Human-in-the-Loop Oversight
[Selection Committee & Explainable Merit Engine]
     │
     ▼ (6) Compute Composite Merit Score (MCDA with PVTG + Women Horizontal Quotas)
[National Selection Gazette Released]
     │
     ▼ (7) Cryptographically Signed Sanction Order with QR Code Dispatched
[Post-Selection Fellowship Hub]
     │
     ▼ (8) Quarterly Progress Report (QPR) Endorsed by Research Guide
[PFMS & NPCI Aadhaar Payment Bridge] ───► Monthly Stipend Released into Beneficiary Account
```

---

## 3. Mathematical Model & Explainable Merit Scoring

To eliminate bias, guarantee constitutional reservations, and comply with the **Right to Information (RTI) Act, 2005**, VidyaSetu implements an **Explainable Multi-Criteria Decision Analysis (MCDA)** scoring model:

$$\text{Composite Merit Score } S_i \in [0, 100]$$

$$S_i = W_{\text{acad}} \cdot \left( \frac{M_i}{100} \right) + I_{\text{inst}} + T_{\text{test}} + B_{\text{pvtg}} + B_{\text{female}} + B_{\text{asp}}$$

Where:
* $W_{\text{acad}} = 50$: Qualifying Post-Graduate / Board Marks Weightage ($M_i \in [0, 100]$).
* $I_{\text{inst}} \in [0, 20]$: Institutional Tier Score:
  $$I_{\text{inst}} = \begin{cases} 
  20 & \text{if QS World Rank } \le 50 \text{ or NIRF } \le 5 \\
  18 & \text{if QS World Rank } \le 200 \text{ or NIRF } \le 10 \\
  15 & \text{if QS World Rank } \le 500 \text{ or NIRF } \le 50 \\
  12 & \text{otherwise} 
  \end{cases}$$
* $T_{\text{test}} \in [0, 15]$: National Level Competitive Examination Score (UGC-NET / CSIR-JRF / GATE / IELTS ≥ 7.5).
* $B_{\text{pvtg}} = 10$: Affirmative Action Bonus for **Particularly Vulnerable Tribal Groups (PVTG)**.
* $B_{\text{female}} = 5$: Horizontal Gender Equity Priority Bonus (supporting 30% statutory female quota).
* $B_{\text{asp}} = 5$: Aspirational Tribal District Domicile Bonus (NITI Aayog notified blocks).

---

## 4. Multi-Language & Tribal Inclusion Architecture

VidyaSetu implements client-side dynamic i18n localization tailored for India's major Scheduled Tribe populations:

| Language Key | Script / Language | Target Demographics & Tribal Coverage |
| :--- | :--- | :--- |
| `en` | **English** | National Standard & Official Documentation |
| `hi` | **हिन्दी (Hindi)** | Central India (Madhya Pradesh, Chhattisgarh, Jharkhand, Rajasthan) |
| `or` | **ଓଡ଼ିଆ (Odia)** | Odisha Tribal Belts (Mayurbhanj, Koraput, Rayagada) |
| `sat` | **ᱥᱟᱱᱛᱟᱲᱤ (Santali - Ol Chiki)** | Schedule VI Santhal Communities (Jharkhand, West Bengal, Odisha) |
| `te` | **తెలుగు (Telugu)** | Andhra Pradesh & Telangana (Chenchu [PVTG], Koya, Gond) |
| `mr` | **मराठी (Marathi)** | Maharashtra Tribal Habitations (Katkari [PVTG], Bhil, Madia Gond) |

---

## 5. Security, Access Control (RBAC), and Audit Trail

1. **Role-Based Access Control (RBAC)**:
   * **Citizen / Visitor**: Unauthenticated access to Public Home Page, Scheme Guidelines, Eligibility Pre-Checker, and Notifications.
   * **Student / Scholar**: Authenticated access via Aadhaar e-KYC or Jan Parichay to Application Wizard, Deficiency Redressal, QPR Submissions, and DBT Disbursal Records.
   * **Institute Verification Officer (Dean / Registrar)**: Institutional enrollment verification, research admission clearance, and supervisor endorsement.
   * **District Welfare Officer (DWO)**: District-level caste gazette validation and domicile authentication.
   * **MoTA Central Scrutiny Officer**: Dual-pane OCR scrutiny desk, intake triage queue, and explainable merit inspector.
   * **PFMS DDO (Drawing & Disbursing Officer)**: Financial sanction orders, e-FTO generation, and monthly DBT batch releases.
   * **System Administrator (NIC)**: Audit trail inspection, scheme rule configuration studio, and security compliance.
2. **SHA-256 Chained Cryptographic Audit Trail**:
   * Every state change (application submission, OCR confidence rating, deficiency issuance, officer approval, merit ranking calculation, and PFMS fund transfer) generates an immutable SHA-256 hash linked to the previous state:
   $$\text{Hash}_k = \text{SHA-256}\left(\text{Hash}_{k-1} \,\|\, \text{Timestamp} \,\|\, \text{Actor} \,\|\, \text{ActionPayload}\right)$$
   * Guarantees complete tamper-evidence and legal defensibility under the **Information Technology Act, 2000** and **RTI Act, 2005**.
