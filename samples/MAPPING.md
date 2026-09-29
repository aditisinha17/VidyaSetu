# VidyaSetu — Sample Test Documents & Outcome Mapping Guide

This directory contains test documents designed to exercise every branch of the **VidyaSetu AI Document Pre-Scrutiny & OCR Pipeline**. These samples ensure that live demonstrations and automated verification tests never rely on external OCR latency or network availability.

---

## Sample Documents & Expected AI Pipeline Outcomes

| File Name | Document Type | Intentional Defect / Characteristic | Expected AI Analysis Status | Deficiency Code | Triggered Workflow Outcome |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `valid_income_cert_FY2026_27.txt` | Annual Income Certificate | Valid for current FY (2026-27), issued by SDO Ranchi, income ₹4,80,000 | **`VERIFIED`** (Confidence: 98.4%) | *None* | Advances application to `READY_FOR_REVIEW`. Resolves any open income deficiency. |
| `expired_income_cert_2023.txt` | Annual Income Certificate | Issued on 15-01-2023 (> 1 fiscal year old, expired under statutory rule) | **`DEFICIENT`** (Confidence: 96.4%) | `DEF-INC-EXPIRED` | Application transitions to `DEFICIENT`. Dispatches 14-day SMS/Portal notice. Seniority preserved. |
| `name_mismatch_income_cert.txt` | Annual Income Certificate | Name on cert is "Rameshwar Hemrom" instead of "Birsa Hemrom" (Jaro-Winkler similarity < 70%) | **`DEFICIENT`** (Confidence: 92.1%) | `DEF-NAME-MISMATCH` | Application flagged for identity mismatch. Requires legal affidavit or corrected certificate. |
| `blurred_unreadable_cert.txt` | Supporting Document | Low resolution / degraded scan with tamper score 0.88 and OCR confidence < 40% | **`DEFICIENT`** (Confidence: 34.0%) | `DEF-DOC-ILLEGIBLE` | Deficiency raised requesting a clear 300 DPI high-contrast scan. |
| `st_caste_cert_article342.txt` | ST Caste Certificate | Issued under Article 342, Santhal community, permanent statutory validity | **`VERIFIED`** (Confidence: 99.4%) | *None* | Confirms constitutional eligibility under MoTA ST gazette list. |
| `master_marksheet_63percent.txt` | Qualifying Marksheet | M.Sc. Chemistry, 78.4% marks, Ranchi University / IIT Kharagpur | **`VERIFIED`** (Confidence: 98.6%) | *None* | Verifies academic requirement (≥ 55% for NFST / NOS). |

---

## How to Test in the Live UI
1. **Deficiency Resolution Test:** Log in as Birsa Hemrom (`MOTA-2026-NFST-0101`). In the Deficiency Desk, upload `valid_income_cert_FY2026_27.txt`. Observe instant AI re-scan clearance and transition to `READY_FOR_REVIEW`.
2. **Deficiency Trigger Test:** In the Application Wizard, upload `expired_income_cert_2023.txt` as the Income Certificate. Observe automated deficiency generation with a 14-day SLA deadline.
3. **Identity Mismatch Test:** Upload `name_mismatch_income_cert.txt` to observe Jaro-Winkler phonetic similarity warning.
