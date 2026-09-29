"""
Policy Decision Support System (DSS) — What-If Simulator (Section F)
Evaluates prospective scheme guideline changes across synthetic application cohorts.
Mandate: Every output is explicitly stamped 'Simulation on synthetic data'.
"""

from typing import Dict, Any

class PolicySimulatorService:
    @staticmethod
    def run_simulation(scheme_id: str, baseline_config: Dict[str, Any], proposed_config: Dict[str, Any]) -> Dict[str, Any]:
        """
        Runs what-if simulation across synthetic applicant pool (10,000 synthetic records modeled).
        """
        total_synthetic = 10000

        # Baseline parameters
        base_income = float(baseline_config.get("income_ceiling", 600000))
        base_marks = float(baseline_config.get("min_marks", 55))

        # Proposed parameters
        prop_income = float(proposed_config.get("income_ceiling", 800000))
        prop_marks = float(proposed_config.get("min_marks", 50))

        # Baseline eligibility rate estimate
        # Synthetic distribution model for ST higher-ed cohort
        base_income_pass_rate = min(0.85, 0.45 + (base_income / 1000000) * 0.40)
        base_marks_pass_rate = max(0.40, 1.0 - ((base_marks - 45) / 100) * 1.8)
        base_eligible = int(total_synthetic * base_income_pass_rate * base_marks_pass_rate)

        # Proposed eligibility rate
        prop_income_pass_rate = min(0.95, 0.45 + (prop_income / 1000000) * 0.40)
        prop_marks_pass_rate = max(0.40, 1.0 - ((prop_marks - 45) / 100) * 1.8)
        prop_eligible = int(total_synthetic * prop_income_pass_rate * prop_marks_pass_rate)

        delta_beneficiaries = prop_eligible - base_eligible

        # Stipend rate per beneficiary
        annual_stipend_rate = 444000 if scheme_id == "NFST" else 200000
        base_budget_cr = round((base_eligible * annual_stipend_rate) / 10000000, 2)
        prop_budget_cr = round((prop_eligible * annual_stipend_rate) / 10000000, 2)
        delta_budget_cr = round(prop_budget_cr - base_budget_cr, 2)

        pvtg_impact = int(delta_beneficiaries * 0.08)  # ~8% PVTG representation in expansion
        female_impact = int(delta_beneficiaries * 0.35)  # 35% female representation

        return {
            "scheme_id": scheme_id,
            "total_synthetic_applicants_evaluated": total_synthetic,
            "baseline_eligible": base_eligible,
            "proposed_eligible": prop_eligible,
            "delta_beneficiaries": delta_beneficiaries,
            "baseline_budget_cr": base_budget_cr,
            "proposed_budget_cr": prop_budget_cr,
            "delta_budget_cr": delta_budget_cr,
            "pvtg_beneficiaries_impact": pvtg_impact,
            "female_beneficiaries_impact": female_impact,
            "disclaimer": "Simulation executed on 10,000 synthetic applications for policy scenario analysis. Output is demonstrative and does not represent official Ministry of Tribal Affairs census or statutory sanction commitments."
        }
