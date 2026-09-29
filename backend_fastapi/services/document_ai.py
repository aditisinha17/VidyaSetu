"""
AI Document Pre-Scrutiny & Deficiency Intelligence Service
Simulates production OCR (Tesseract / Google Document AI) extraction, bounding box layout,
cross-document consistency validation, and statutory deficiency generation.
Rule: AI recommends, rules govern, humans decide.
"""

from typing import Dict, Any, List
import hashlib

class DocumentAIService:
    @staticmethod
    def analyze_document(doc_type: str, file_name: str, applicant_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Runs document pre-scrutiny pipeline on an uploaded certificate.
        """
        applicant_name = applicant_data.get("applicant_name", "Birsa Hemrom")
        declared_income = float(applicant_data.get("annual_family_income", 420000))

        # Defaults
        confidence = 97.8
        tamper_score = 0.01
        duplicate_hash = hashlib.sha256(f"{file_name}_{applicant_name}".encode()).hexdigest()[:16]

        if "income" in doc_type.lower() or "income" in file_name.lower():
            # Check if this is the defective older file or the replacement
            is_expired = "2023" in file_name or "old" in file_name.lower() or "defective" in file_name.lower()

            if is_expired:
                return {
                    "ocr_confidence": 94.2,
                    "extracted_entities": {
                        "applicant_name": applicant_name,
                        "annual_income": "₹4,20,000",
                        "issuing_authority": "Tahasildar, Ranchi",
                        "issue_date": "15-01-2023",
                        "fiscal_year": "FY 2022-23 (Lapsed)",
                        "certificate_no": "JH/INC/2023/88129",
                        "bounding_boxes": [
                            {"field": "Authority Seal", "box": [80, 120, 220, 260], "confidence": 0.94},
                            {"field": "Applicant Name", "box": [280, 110, 520, 160], "confidence": 0.96},
                            {"field": "Income Amount", "box": [280, 230, 480, 275], "confidence": 0.95},
                            {"field": "Issue Date (EXPIRED)", "box": [580, 110, 750, 160], "confidence": 0.97}
                        ]
                    },
                    "identity_match_score": 100.0,
                    "date_validity_status": "EXPIRED",
                    "tamper_score": 0.02,
                    "duplicate_file_hash": duplicate_hash,
                    "findings": [
                        {"check": "Document Type Authenticity", "status": "PASS", "confidence": 0.97},
                        {"check": "Applicant Name Cross-Verification", "status": "PASS", "confidence": 1.00},
                        {"check": "Declared Income Consistency", "status": "PASS", "confidence": 0.98},
                        {
                            "check": "Fiscal Year Validity Window",
                            "status": "FAIL",
                            "confidence": 0.99,
                            "deficiency_code": "DEF-INC-EXPIRED",
                            "message": "Certificate issued on 15-01-2023 (FY 2022-23). MoTA Guidelines require income certificate valid for the current fiscal year (FY 2026-27)."
                        }
                    ],
                    "deficiency_generated": {
                        "deficiency_code": "DEF-INC-EXPIRED",
                        "title": "Income Certificate Fiscal Year Lapsed",
                        "statutory_reason": "MoTA Guidelines Section 4.2: Income certificate must be issued for FY 2026-27 by an officer not below the rank of Tehsildar/SDO.",
                        "deadline_days": 15
                    }
                }
            else:
                # Valid replacement certificate
                return {
                    "ocr_confidence": 98.4,
                    "extracted_entities": {
                        "applicant_name": applicant_name,
                        "annual_income": "₹4,20,000",
                        "issuing_authority": "Sub-Divisional Officer (SDO), Ranchi",
                        "issue_date": "12-06-2026",
                        "fiscal_year": "FY 2026-27 (Current & Valid)",
                        "certificate_no": "JH/INC/2026/01922",
                        "bounding_boxes": [
                            {"field": "State Emblem & Seal", "box": [90, 110, 240, 270], "confidence": 0.99},
                            {"field": "Digital Barcode", "box": [750, 80, 880, 220], "confidence": 0.99},
                            {"field": "Applicant Name", "box": [290, 115, 530, 165], "confidence": 1.00},
                            {"field": "Certified Income (Rs. 4,20,000)", "box": [290, 235, 520, 280], "confidence": 0.98},
                            {"field": "Issue Date (12-06-2026)", "box": [590, 115, 770, 165], "confidence": 0.99}
                        ]
                    },
                    "identity_match_score": 100.0,
                    "date_validity_status": "VALID",
                    "tamper_score": 0.01,
                    "duplicate_file_hash": duplicate_hash,
                    "findings": [
                        {"check": "Document Type Authenticity", "status": "PASS", "confidence": 0.99},
                        {"check": "Applicant Name Match (100%)", "status": "PASS", "confidence": 1.00},
                        {"check": "Declared Income Cross-Verification", "status": "PASS", "confidence": 0.99},
                        {"check": "Fiscal Year Validity (FY 2026-27)", "status": "PASS", "confidence": 0.99},
                        {"check": "Digital Revenue Signature & Barcode", "status": "PASS", "confidence": 0.98}
                    ],
                    "deficiency_generated": None
                }

        # Default for caste certificate
        return {
            "ocr_confidence": 98.8,
            "extracted_entities": {
                "applicant_name": applicant_name,
                "community": applicant_data.get("tribe_community", "Santhal"),
                "issuing_authority": "Deputy Commissioner, Ranchi",
                "issue_date": "10-04-2021",
                "constitutional_clause": "Article 342 Central ST Notification",
                "certificate_no": "JH/ST/2021/49102",
                "bounding_boxes": [
                    {"field": "Government Emblem", "box": [80, 110, 230, 260], "confidence": 0.99},
                    {"field": "Applicant Name", "box": [280, 120, 510, 170], "confidence": 1.00},
                    {"field": "Tribe Notification (Article 342)", "box": [280, 230, 600, 280], "confidence": 0.99}
                ]
            },
            "identity_match_score": 100.0,
            "date_validity_status": "VALID",
            "tamper_score": 0.01,
            "duplicate_file_hash": duplicate_hash,
            "findings": [
                {"check": "Article 342 Constitutional List Match", "status": "PASS", "confidence": 0.99},
                {"check": "Digital Land/Revenue Signature", "status": "PASS", "confidence": 0.98},
                {"check": "Identity Cross-Check with Application", "status": "PASS", "confidence": 1.00}
            ],
            "deficiency_generated": None
        }
