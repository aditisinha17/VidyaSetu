# VidyaSetu (विद्यासेतु) — Technical System Architecture Specification
### Ministry of Tribal Affairs (MoTA), Government of India

---

## 1. High-Level Architecture (HLA)

VidyaSetu is architected as an **Event-Driven, Service-Oriented Web Application** conforming to the **National e-Governance Division (NeGD)** standards and **Guidelines for Indian Government Websites (GIGW 2.0)**.

```
+----------------------------------------------------------------------------------------------------+
|                                    PRESENTATION LAYER (CLIENT-SIDE)                                 |
|                                                                                                    |
|   +---------------------------------------------+   +------------------------------------------+   |
|   |         SCHOLAR / STUDENT WORKSPACE         |   |      MINISTRY ADMINISTRATIVE WORKSPACE   |   |
|   |  - 5-Step Application Wizard & Digilocker   |   |  - Executive Analytics & National Heatmap|   |
|   |  - Rule + AI Scheme Matching Engine         |   |  - Dual-Pane OCR Scrutiny Workstation    |   |
|   |  - 6-Stage Visual Verification Pipeline     |   |  - AI Triage & Fraud/Anomaly Detection   |   |
|   |  - Deficiency Redressal Desk (15-Day)       |   |  - Selection Committee & Merit Engine    |   |
|   |  - Post-Selection Fellowship (QPR / DBT)    |   |  - Post-Selection & PFMS Disbursal Hub   |   |
|   |  - AI Grievance Redressal Assistant         |   |  - No-Code Scheme Config & 10k Simulator |   |
|   |  - VidyaMitra Multilingual Audio Copilot    |   |  - What-If Policy Decision Support (DSS) |   |
|   +---------------------------------------------+   +------------------------------------------+   |
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

## 2. End-to-End Data Flow Architecture (DFD Level 1)

```
[ST Student]
     │
     ▼ (1) Authenticate via MeriPehchaan / Aadhaar e-KYC
[Auth Gateway]
     │
     ▼ (2) Auto-populate Demographics & Caste Certificate
[5-Step Application Wizard]
     │
     ▼ (3) Upload Academic & Financial Documents
[MoTA-Vision OCR Engine] ───► Extract: Name, Certificate No, Authority, Date, QR Hash
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
[MoTA Officer Dual-Pane Scrutiny] ◄───────────────────────────┘
     │
     ▼ (4) Officer Approval with Human Oversight
[Selection Committee & Merit Engine]
     │
     ▼ (5) Compute Composite Merit Score (MCDA)
[National Selection Gazette Released]
     │
     ▼ (6) Official Award Letter Dispatched with QR Code
[Post-Selection Fellowship Hub]
     │
     ▼ (7) Quarterly Progress Report (QPR) Endorsed by Research Supervisor
[PFMS & NPCI Aadhaar Bridge] ───► Monthly Stipend Released into Beneficiary Account
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

## 4. Entity Schema & Data Contracts

### 4.1 Applicant Entity
```json
{
  "id": "MOTA-2026-NFST-0101",
  "name": "Birsa Hemrom",
  "tribe": "Santhal",
  "pvtg": false,
  "state": "Jharkhand",
  "district": "Ranchi",
  "schemeId": "NFST",
  "institution": "IIT Kharagpur",
  "degree": "Ph.D. in Rural Development",
  "pgMarks": 78.4,
  "annualIncome": 240000,
  "status": "Selection Committee Review",
  "stage": 4,
  "progressPercent": 85,
  "aiScore": 94,
  "triageCategory": "READY",
  "aiRiskLevel": "LOW",
  "documents": [
    {
      "name": "ST Caste Certificate",
      "fileNumber": "JH/RAN/2021/ST/8821",
      "issuingAuthority": "Sub-Divisional Officer, Ranchi",
      "status": "VERIFIED",
      "confidence": 99.1,
      "tamperScore": 0.02
    }
  ]
}
```

### 4.2 Scheme Entity
```json
{
  "id": "NFST",
  "name": "National Fellowship for Scheduled Tribe Students",
  "totalSlots": 750,
  "annualBudgetCr": 95.0,
  "stipendJrf": 37000,
  "stipendSrf": 42000,
  "contingencyAnnual": 20500,
  "eligibility": {
    "minMarks": 55,
    "maxAge": 36,
    "maxIncome": 600000,
    "degrees": ["Ph.D.", "M.Phil"]
  },
  "quotaRules": {
    "stFemaleHorizontal": 30,
    "pvtgPrioritySlots": 50,
    "pwdReservation": 5
  }
}
```

---

## 5. Security, Access Control (RBAC), and Audit Trail

1. **Role-Based Access Control (RBAC)**:
   * **Student**: Restricted to own profile, application wizard, deficiency responses, and fellowship claims.
   * **Institute Officer**: Limited to institutional enrolment verification and supervisor endorsement.
   * **District Officer**: Access to district-level caste validation and state quota tracking.
   * **MoTA Central Scrutiny Officer**: Full access to dual-pane OCR scrutiny, triage, and merit evaluation.
   * **PFMS DDO**: Financial sanction order generation and electronic Fund Transfer Order (e-FTO) batch execution.
2. **SHA-256 Chained Audit Trail**:
   * Every document upload, AI confidence score calculation, officer review, deficiency notice, and DBT transaction generates an immutable cryptographic hash record:
   $$\text{Hash}_k = \text{SHA-256}\left(\text{Hash}_{k-1} \,\|\, \text{Timestamp} \,\|\, \text{Actor} \,\|\, \text{ActionPayload}\right)$$
   * Protects against retroactive record modification.
