# VidyaSetu (विद्यासेतु)
### AI-Enabled Scholarship and Fellowship Governance System for Scheduled Tribes
**Ministry of Tribal Affairs (MoTA), Government of India**  
*Theme: Smart Education | Category: Software*

---

## 🏛️ Executive Summary & Problem Context

The **Ministry of Tribal Affairs (MoTA)** implements flagship scholarship and fellowship schemes to empower Scheduled Tribe (ST) students pursuing higher education across India and globally:
1. **National Fellowship for Scheduled Tribe Students (NFST)**: Supporting M.Phil and Ph.D. scholars in UGC/CSIR/NIRF-recognized premier institutions with monthly JRF/SRF stipends (₹37,000 to ₹42,000/mo), HRA, and annual contingency grants.
2. **National Overseas Scholarship (NOS)**: Providing 100% tuition coverage, international airfare, and annual maintenance allowance (GBP 9,900 / USD 15,400) for Master's and Ph.D. programs at top world universities ranked within **QS Top 500** (priority ≤ 200).
3. **Top Class Education for ST Students**: Reimbursing full tuition fees and monthly allowances for ST students in notified institutions (IITs, IIMs, NITs, AIIMS, NLUs).
4. **Centrally Co-funded Pre-Matric & Post-Matric Schemes**.

### The Core Challenges Addressed:
* **Manual Scrutiny Delays**: Applications previously required 4-6 months across multiple desks.
* **Repetitive Correspondence for Minor Deficiencies**: Expired income certificates or blurred stamps caused prolonged rejections.
* **Lack of Configurable Rules**: Hardcoded eligibility systems failed to accommodate annual quota or cutoff adjustments.
* **Post-Selection Bottlenecks**: Tracking quarterly progress reports (QPR), supervisor endorsements, and timely Direct Benefit Transfer (DBT) through PFMS.

**VidyaSetu** addresses these challenges through an end-to-end, transparent, and intelligent governance platform powered by AI document intelligence, explainable merit ranking, and seamless DBT integration.

---

## 🚀 Key Modules & Capabilities

### 1. 🎓 Applicant & Scholar Governance Desk
* **Smart 5-Step Application Wizard**: Auto-filling via DigiLocker / Jan Parichay SSO mockup, ST sub-tribe gazette mapping, and academic credentials.
* **Live AI Pre-Scrutiny & OCR Assistant**: Scans uploaded certificates before submission, detecting expired dates, blurred seals, or name mismatches in real time to prevent scrutiny rejection.
* **Interactive 6-Stage Application Pipeline**:
  `Submitted ➔ AI Pre-Verification ➔ District Scrutiny Desk ➔ Ministry Officer ➔ Selection Committee ➔ Award & DBT Active`
* **Deficiency Resolution Desk**: Receive specific officer observations, re-upload documents with instant AI validation, and retain application seniority within a 15-day resolution window.
* **Post-Selection Fellowship Hub**:
  * Track monthly DBT stipend credits, PFMS batch references, and RBI UTR numbers.
  * Submit Quarterly Progress Reports (QPR) with supervisor endorsements.
  * Claim annual contingency funds and NOS overseas travel grants.
  * Download official cryptographically verified **Award Letters / Sanction Orders** with verifiable QR codes.

### 2. 🔍 MoTA Officer Scrutiny Workstation (Dual-Pane Reviewer)
* **Real-time Queue**: Filter by In-Review, Flagged/Deficient, and Approved.
* **Side-by-Side Dual-Pane Inspector**:
  * **Left Pane**: Applicant profile, Gazette Schedule VI validation status, Aadhaar phonetic similarity (98.8%), and tamper/forgery risk score.
  * **Right Pane**: Interactive document canvas with highlighted OCR bounding boxes, seal recognition, and digital signature checks.
* **1-Click Actions**: Approve & forward to Selection Committee, raise structured deficiency notices (with pre-filled SMS/Email dispatches), or reject with statutory reasons.

### 3. ⚖️ Transparent Merit & Selection Engine (Explainable AI)
* **Multi-Criteria Scoring Formula**:
  $$\text{Composite Merit Score} = \text{Academic PG Marks (50\%)} + \text{Inst. QS/NIRF Tier (20\%)} + \text{NET/GATE (15\%)} + \text{Social Equity Bonus (15\%) }$$
* **Affirmative Action & Quota Optimization**:
  * Dedicated reservation for **Particularly Vulnerable Tribal Groups (PVTG)** (+10 pts bonus).
  * Horizontal quota compliance for **ST Women** (30% statutory minimum).
  * Divyangjan (PwD) reservation compliance (5%).
* **Interactive Cutoff & Parameter Slider**: Live simulation of selection cutoffs.
* **RTI-Compliant Mathematical Audit**: Inspect the exact formula breakdown for any applicant to guarantee complete legal and constitutional transparency.
* **Bulk Gazette Notification Generator**: 1-click publication of the National Selection Gazette.

### 4. 💳 Post-Selection & DBT/PFMS Disbursal Hub
* **NPCI Aadhaar Payment Bridge (APB) Integration**: Disburse monthly stipends directly into Aadhaar-seeded accounts.
* **Automated QPR Compliance Gate**: Stipend release is tied to guide-endorsed quarterly progress reports, eliminating duplicate or ghost claims.
* **Batch Disbursal Execution**: Simulate Public Financial Management System (PFMS) electronic Fund Transfer Orders (e-FTO).

### 5. ⚙️ No-Code Scheme Configuration Studio
* **Configurable System Architecture**: Reconfigure scheme parameters without altering application source code:
  * Annual slot quotas, budget in ₹ Crores, stipend/HRA rates.
  * Eligibility criteria: Max income ceilings, minimum marks %, age ceilings, mandatory degrees.
  * Document checklist designer: OCR confidence thresholds and mandatory flags.
* **Live Policy Simulation Sandbox**: Test hypothetical applicant profiles against updated rules to observe pass/fail outcomes before publishing to production.

### 6. 📊 National ST Analytics & GIS Executive Dashboard
* **Processing Turnaround Time (TAT)**: Demonstrates an **88% reduction in cycle time** (from 124 days down to 14 days).
* **State Performance Roster**: Breakdown of applicants, selected scholars, and funds across demographic hubs (Jharkhand, Odisha, MP, Chhattisgarh, Maharashtra, Assam, Rajasthan, Gujarat).
* **PVTG Inclusion Analytics**: Tracking beneficiaries across 75 notified vulnerable tribal communities (Birhor, Baiga, Chenchu, Katkari, Sahariya, Toda).
* **Gender Equity Ratio**: Verifies ST female representation (51.8% achievement).

### 7. 🤖 VidyaMitra AI Copilot & Accessibility Suite
* **Multilingual Assistant**: Interactive natural-language support for rules, eligibility, deficiency guidance, and payment schedules.
* **Speech Synthesis**: Browser text-to-speech audio assistance for rural and tribal applicants.
* **Multi-Language UI**: English, हिन्दी (Hindi), ଓଡ଼ିଆ (Odia), संताली / ᱥᱟᱱᱛᱟᱲᱤ (Santhali), తెలుగు (Telugu), and मराठी (Marathi).
* **Accessibility Controls**: High-contrast mode and dynamic text scaling compliant with **WCAG 2.1 AA** guidelines.

---

## 🛠️ Technology Stack

* **Frontend Framework**: React 19 + Vite 8
* **Styling & Design System**: Tailwind CSS v4 + Government of India Design System (GoI Tricolor & Ashoka accents)
* **Iconography**: Lucide React
* **Typography**: Cinzel, Merriweather Serif, and Inter
* **Document Engine**: Custom CSS Scanline Animation + Bounding Box Canvas + Official MoTA Sanction Order Printable Layout

---

## 💻 Running the Prototype Locally

```bash
# Navigate to the project directory
cd VidyaSetu

# Install dependencies (if not already installed)
npm install

# Start the development server
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 📝 Demo Walkthrough Guide

1. **Test Applicant Flow**:
   * Switch candidate profiles in the top bar (e.g., select *Shanti Madkam* for NOS at Oxford, or *Mangal Singh Munda* for an active deficiency scenario).
   * Click **"Apply for New Fellowship"** to launch the 5-step wizard.
   * On Step 4, click **"Re-Run AI Document Scan"** to observe real-time OCR extraction and eligibility validation.
2. **Test Deficiency Resolution**:
   * Select *Mangal Singh Munda* (`MOTA-2026-NFST-0199`).
   * Switch to the **Deficiency Redressal Desk** tab.
   * Click the upload area to attach a fresh FY 2026-27 Income Certificate.
   * Watch the AI re-scrutiny pass with 99.4% confidence and submit to the ministry.
3. **Test Scrutiny Officer Desk**:
   * Switch role in the navigation bar to **"MoTA Scrutiny Desk"**.
   * Click any document in the list to open the **AI Document Viewer Modal** with OCR bounding boxes and fraud tamper scores.
   * Click **"Approve & Forward"** or **"Raise Deficiency"**.
4. **Test Selection Committee & Merit Engine**:
   * Switch role to **"Selection & Merit Engine"**.
   * Adjust the **Cutoff Score slider** or **PVTG Bonus slider** to see candidates dynamically re-rank.
   * Click **"Formula Breakdown"** on any candidate to inspect the RTI-compliant scoring breakdown.
   * Click **"Publish National Selection Gazette"** to trigger award letters.
5. **Test Post-Selection & DBT Hub**:
   * Switch role to **"Post-Selection & DBT Hub"**.
   * Click **"Execute Monthly DBT Stipend Batch"** to simulate PFMS/NPCI Aadhaar Payment Bridge execution.
6. **Test Scheme Configuration Studio**:
   * Switch role to **"Scheme Config Studio"**.
   * Switch to the **"Live Policy Simulation Sandbox"** tab, enter parameters, and click **"Evaluate Eligibility Sandbox"**.
7. **Test VidyaMitra AI**:
   * Click the **"Ask VidyaMitra AI"** floating button at the bottom right.
   * Click quick chips or type a question (e.g., *"What is the income limit for NOS?"*).
   * Click the speaker icon to hear the answer read aloud.
