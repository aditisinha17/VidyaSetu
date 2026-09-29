"""
Shared Identifier & Anomaly Detection Service (Section G)
Detects duplicate phone numbers, bank accounts, or applicant entities across applications.
Mandate: Flags are non-adverse and require human investigation rather than auto-rejection.
"""

from typing import List, Dict, Any

class AnomalyService:
    @staticmethod
    def detect_shared_identifiers(applications: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Scans applications and detects cross-application identifier overlaps.
        """
        phone_map = {}
        bank_map = {}
        flagged_clusters = []

        for app in applications:
            phone = app.get("phone")
            bank = app.get("bank_account_masked")

            if phone:
                if phone in phone_map:
                    phone_map[phone].append(app)
                else:
                    phone_map[phone] = [app]

            if bank:
                if bank in bank_map:
                    bank_map[bank].append(app)
                else:
                    bank_map[bank] = [app]

        # Collect clusters with > 1 application
        processed_pairs = set()
        for phone, apps in phone_map.items():
            if len(apps) > 1:
                ids = tuple(sorted([a["id"] for a in apps]))
                if ids not in processed_pairs:
                    processed_pairs.add(ids)
                    flagged_clusters.append({
                        "anomaly_type": "SHARED_PHONE_IDENTIFIER",
                        "risk_level": "MEDIUM",
                        "identifier_value": phone,
                        "linked_applications": [
                            {"id": a["id"], "name": a["applicant_name"], "scheme_id": a["scheme_id"]}
                            for a in apps
                        ],
                        "explanation": f"Applications share identical primary mobile contact ({phone}). Requires scrutiny to confirm sibling status vs proxy submission."
                    })

        for bank, apps in bank_map.items():
            if len(apps) > 1:
                ids = tuple(sorted([a["id"] for a in apps]))
                if ids not in processed_pairs:
                    processed_pairs.add(ids)
                    flagged_clusters.append({
                        "anomaly_type": "SHARED_BANK_ACCOUNT",
                        "risk_level": "HIGH",
                        "identifier_value": bank,
                        "linked_applications": [
                            {"id": a["id"], "name": a["applicant_name"], "scheme_id": a["scheme_id"]}
                            for a in apps
                        ],
                        "explanation": f"Applications share identical bank account ({bank}). MoTA Direct Benefit Transfer guidelines require distinct student-seeded accounts."
                    })

        return flagged_clusters
