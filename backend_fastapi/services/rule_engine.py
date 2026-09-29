def check_eligibility(applicant_data: dict, scheme_rules: list) -> list:
    results = []
    for scheme in scheme_rules:
        is_eligible = True
        reasons = []

        rules = scheme.get("rules", [])
        if not rules:
            continue

        for rule in rules:
            rule_type = rule.get("rule_type")
            expected_val = rule.get("expected_value")
            operator = rule.get("operator", "==")
            
            applicant_val = applicant_data.get(rule_type)
            
            if operator == "==" and str(applicant_val).lower() != str(expected_val).lower():
                is_eligible = False
                reasons.append(f"{rule_type} must be {expected_val}")
            elif operator == "<=" and float(applicant_val or 0) > float(expected_val):
                is_eligible = False
                reasons.append(f"{rule_type} must be <= {expected_val}")
            elif operator == ">=" and float(applicant_val or 0) < float(expected_val):
                is_eligible = False
                reasons.append(f"{rule_type} must be >= {expected_val}")

        results.append({
            "scheme_id": scheme.get("id"),
            "scheme_name": scheme.get("name"),
            "is_eligible": is_eligible,
            "reasons": reasons
        })
    return results
