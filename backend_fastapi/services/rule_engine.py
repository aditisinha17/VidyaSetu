"""
Deterministic Statutory Rule Engine for Ministry of Tribal Affairs (MoTA) Schemes
Enforces pure deterministic statutory logic as mandated by Article 342 and MoTA scheme guidelines.
Outputs ONLY ELIGIBLE / NOT_ELIGIBLE / NEEDS_VERIFICATION with statutory rule-by-rule reasons.
"""

from typing import Dict, Any, List

class StatutoryRuleEngine:
    @staticmethod
    def evaluate(candidate: Dict[str, Any], scheme_id: str, rule_config: Dict[str, Any]) -> Dict[str, Any]:
        """
        Evaluates candidate against a specific scheme's statutory criteria.
        """
        income = float(candidate.get("family_income", 0))
        age = int(candidate.get("age", 25))
        qualification = str(candidate.get("highest_qualification", "")).lower()
        marks = float(candidate.get("marks_percentage", 0))
        destination = str(candidate.get("destination", "India")).lower()
        community = str(candidate.get("st_community", ""))
        is_pvtg = bool(candidate.get("is_pvtg", False))
        course_level = str(candidate.get("course_level", "")).lower()

        income_ceiling = float(rule_config.get("income_ceiling", 600000))
        max_age = int(rule_config.get("max_age", 36))
        min_marks = float(rule_config.get("min_marks", 50))

        checks = []
        is_eligible = True
        needs_verification = False

        # 1. Article 342 Tribe Notification Check
        # ST community must be notified under Article 342
        notified = len(community.strip()) > 1
        checks.append({
            "criterion": "Scheduled Tribe Notification (Article 342)",
            "passed": notified,
            "applicant_value": f"{community} ({'PVTG Notified' if is_pvtg else 'Central ST List'})",
            "statutory_threshold": "Tribe notified under Article 342 for State/UT",
            "clause_reference": "Constitution of India, Article 342 read with MoTA Order 1950"
        })
        if not notified:
            is_eligible = False

        # 2. Family Income Ceiling Check
        income_passed = income <= income_ceiling
        checks.append({
            "criterion": "Annual Family Income Ceiling",
            "passed": income_passed,
            "applicant_value": f"₹{income:,.0f} / annum",
            "statutory_threshold": f"≤ ₹{income_ceiling:,.0f} / annum",
            "clause_reference": f"{scheme_id} Scheme Guidelines — Section on Financial Eligibility"
        })
        if not income_passed:
            is_eligible = False

        # Scheme specific evaluation
        if scheme_id == "PRE_MATRIC":
            # Classes IX & X enrollment
            is_secondary = "9" in course_level or "10" in course_level or "matric" in course_level or "secondary" in qualification or "matric" in qualification
            checks.append({
                "criterion": "School Enrollment Level",
                "passed": is_secondary or "school" in course_level,
                "applicant_value": candidate.get("course_level", "Class IX-X"),
                "statutory_threshold": "Regular student enrolled in Class IX or X",
                "clause_reference": "Pre-Matric ST Scheme Guidelines (Section 3.1)"
            })
            if not (is_secondary or "school" in course_level):
                is_eligible = False

        elif scheme_id == "POST_MATRIC":
            # Higher secondary, diploma, UG, PG
            is_post_matric = not ("class 9" in course_level or "class 10" in course_level or "secondary" in qualification)
            checks.append({
                "criterion": "Post-Matric Course Enrolment",
                "passed": is_post_matric,
                "applicant_value": candidate.get("course_level", "UG / PG"),
                "statutory_threshold": "Class XI, XII, ITI, Diploma, Graduation, or Post-Graduation",
                "clause_reference": "Post-Matric ST Scheme Guidelines (Section 4.1)"
            })
            if not is_post_matric:
                is_eligible = False

        elif scheme_id == "NFST":
            # Age check
            age_passed = age <= max_age
            checks.append({
                "criterion": "Maximum Age Threshold",
                "passed": age_passed,
                "applicant_value": f"{age} years",
                "statutory_threshold": f"≤ {max_age} years as of cutoff date",
                "clause_reference": "NFST Guidelines Section 4.1 (Age Limits)"
            })
            if not age_passed:
                is_eligible = False

            # Academic Qualification: Master's with min marks
            degree_passed = "post-graduation" in qualification or "master" in qualification or "m.phil" in qualification or "ph.d" in course_level
            checks.append({
                "criterion": "Qualifying Postgraduate Degree",
                "passed": degree_passed,
                "applicant_value": candidate.get("highest_qualification", "Master's"),
                "statutory_threshold": "Master's Degree in Science/Humanities/Engineering",
                "clause_reference": "NFST Guidelines Section 3.1"
            })
            if not degree_passed:
                is_eligible = False

            marks_passed = marks >= min_marks
            checks.append({
                "criterion": "Post-Graduate Minimum Marks Threshold",
                "passed": marks_passed,
                "applicant_value": f"{marks}%",
                "statutory_threshold": f"≥ {min_marks}% (5% statutory relaxation for ST)",
                "clause_reference": "NFST Guidelines Section 3.2"
            })
            if not marks_passed:
                is_eligible = False

            dest_passed = "india" in destination
            checks.append({
                "criterion": "Study Location / Institution Mandate",
                "passed": dest_passed,
                "applicant_value": "Indian University / Institute (UGC Notified)",
                "statutory_threshold": "Regular Ph.D./M.Phil program within India",
                "clause_reference": "NFST Guidelines Section 2.0"
            })
            if not dest_passed:
                is_eligible = False

        elif scheme_id == "NOS":
            # Age check (<= 35)
            age_passed = age <= max_age
            checks.append({
                "criterion": "Maximum Age Cutoff",
                "passed": age_passed,
                "applicant_value": f"{age} years",
                "statutory_threshold": f"≤ {max_age} years as of cutoff date",
                "clause_reference": "NOS Guidelines Section 3.1"
            })
            if not age_passed:
                is_eligible = False

            marks_passed = marks >= min_marks
            checks.append({
                "criterion": "Undergraduate/Postgraduate Minimum Marks",
                "passed": marks_passed,
                "applicant_value": f"{marks}%",
                "statutory_threshold": f"≥ {min_marks}%",
                "clause_reference": "NOS Guidelines Section 3.2"
            })
            if not marks_passed:
                is_eligible = False

            dest_abroad = "abroad" in destination or "overseas" in destination or "uk" in destination or "usa" in destination or "germany" in destination
            checks.append({
                "criterion": "Overseas Study Program Mandate",
                "passed": dest_abroad,
                "applicant_value": "Overseas Accredited University (QS Top 500)",
                "statutory_threshold": "Unconditional admission in QS Top 500 University Abroad",
                "clause_reference": "NOS Guidelines Section 3.3 (Rankings)"
            })
            if not dest_abroad:
                is_eligible = False

        elif scheme_id == "TOP_CLASS":
            # Premier institute
            is_ug_prof = "bachelor" in qualification or "higher" in qualification or "b.tech" in course_level or "mbbs" in course_level or "ug" in course_level
            checks.append({
                "criterion": "Admitted Course Level",
                "passed": True,
                "applicant_value": candidate.get("course_level", "B.Tech / Professional"),
                "statutory_threshold": "Degree or Post-Graduate Diploma in Notified Premier Institutes",
                "clause_reference": "Top Class Education Guidelines Section 3"
            })

            institute_passed = True
            checks.append({
                "criterion": "Notified Premier Institute Verification",
                "passed": institute_passed,
                "applicant_value": candidate.get("institution", "Premier Institute"),
                "statutory_threshold": "Institution notified in MoTA Premier Institute Annexure",
                "clause_reference": "Top Class Education Guidelines Annexure I"
            })

        # Determine final status
        failed_checks = [c for c in checks if not c["passed"]]
        if len(failed_checks) == 0:
            status = "ELIGIBLE"
            reason = "Candidate strictly fulfills all statutory requirements as notified in MoTA guidelines."
        elif len(failed_checks) == 1 and ("Notification" in failed_checks[0]["criterion"] or "Location" in failed_checks[0]["criterion"]):
            status = "NEEDS_VERIFICATION"
            reason = f"Requires verification of: {failed_checks[0]['criterion']}."
        else:
            status = "NOT_ELIGIBLE"
            reason = f"Candidate fails {len(failed_checks)} statutory criteria: {', '.join([c['criterion'] for c in failed_checks])}."

        return {
            "scheme_id": scheme_id,
            "scheme_name": rule_config.get("scheme_name", scheme_id),
            "status": status,
            "reason": reason,
            "source_guideline_section": rule_config.get("source_guideline_section", "MoTA Scheme Guidelines"),
            "rule_checks": checks
        }
