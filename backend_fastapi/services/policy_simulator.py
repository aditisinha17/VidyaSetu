def simulate_policy(synthetic_data: list, new_rules: dict) -> dict:
    impact = {"new_eligible": 0, "new_ineligible": 0, "total": len(synthetic_data)}
    
    # Simple simulator logic
    for data in synthetic_data:
        income = data.get("annual_income", 0)
        threshold = new_rules.get("annual_income_threshold", float('inf'))
        
        if income <= threshold:
            impact["new_eligible"] += 1
        else:
            impact["new_ineligible"] += 1
            
    return impact
