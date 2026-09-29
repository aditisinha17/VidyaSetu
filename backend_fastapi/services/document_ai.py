def analyze_document(doc_data: dict) -> dict:
    # Simulated AI Prescrutiny
    doc_type = doc_data.get("type", "unknown")
    text = doc_data.get("text", "")
    
    findings = []
    confidence = 0.95
    status = "VERIFIED"

    if "income" in doc_type.lower():
        if "Rs." not in text:
            findings.append({"issue": "No currency found", "recommendation": "Check image clarity"})
            status = "DEFICIENT"
            confidence = 0.6
        else:
            findings.append({"issue": "None", "evidence": "Income matched", "recommendation": "Proceed"})
    
    return {
        "status": status,
        "confidence": confidence,
        "findings": findings
    }
