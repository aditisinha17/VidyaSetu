"""
Pydantic Schemas for VidyaSetu API Request / Response Validation
"""

from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

# 1. Eligibility Wizard (B2 & B3)
class CandidateEligibilityInput(BaseModel):
    state: str = Field(..., example="Jharkhand")
    st_community: str = Field(..., example="Santhal")
    is_pvtg: bool = Field(default=False)
    pvtg_community: Optional[str] = None
    gender: str = Field(..., example="Male")
    age: int = Field(..., example=26)
    family_income: float = Field(..., example=420000)
    highest_qualification: str = Field(..., example="Post-Graduation (Master's)")
    marks_percentage: float = Field(..., example=68.5)
    institution: Optional[str] = "Ranchi University"
    course_level: Optional[str] = "Ph.D."
    destination: Optional[str] = "India"

class StatutoryRuleCheck(BaseModel):
    criterion: str
    passed: bool
    applicant_value: str
    statutory_threshold: str
    clause_reference: str

class SchemeEvaluationResult(BaseModel):
    scheme_id: str
    scheme_name: str
    status: str  # ELIGIBLE / NOT_ELIGIBLE / NEEDS_VERIFICATION
    reason: str
    source_guideline_section: str
    rule_checks: List[StatutoryRuleCheck]

class EligibilityResponse(BaseModel):
    candidate: CandidateEligibilityInput
    evaluations: List[SchemeEvaluationResult]
    timestamp: str

# 2. Scheme Configuration Studio (E1 - E6)
class SchemeRuleConfigUpdate(BaseModel):
    version: str
    income_ceiling: float
    max_age: int
    min_marks: float
    eligible_degrees: List[str]
    pvtg_reservation_slots: int
    st_female_horizontal_quota: float = 30.0
    pwd_reservation_quota: float = 5.0
    mandatory_test: Optional[str] = None
    source_guideline_section: str

# 3. Document Analysis & Replacement (C1 - C11 & B10 - B11)
class DocumentReplaceRequest(BaseModel):
    file_name: str
    file_size_kb: Optional[float] = 450.0
    issuing_authority: Optional[str] = "Sub-Divisional Officer (SDO), Ranchi"
    issue_date: Optional[str] = "12-06-2026"
    file_number: Optional[str] = "JH/INC/2026/01922"
    extracted_text: Optional[str] = "Annual Income from all sources is Rs. 4,20,000 for FY 2026-27."

class OfficerReviewRequest(BaseModel):
    action: str  # APPROVE, RAISE_DEFICIENCY, REJECT, OVERRIDE
    statutory_clause: Optional[str] = None
    override_type: Optional[str] = None
    comments: Optional[str] = None

# 4. Policy Simulation (F1 - F4)
class PolicySimulationRequest(BaseModel):
    scheme_id: str = "NFST"
    baseline: Dict[str, Any]
    proposed: Dict[str, Any]

class PolicySimulationResult(BaseModel):
    scheme_id: str
    total_synthetic_applicants_evaluated: int
    baseline_eligible: int
    proposed_eligible: int
    delta_beneficiaries: int
    baseline_budget_cr: float
    proposed_budget_cr: float
    delta_budget_cr: float
    pvtg_beneficiaries_impact: int
    female_beneficiaries_impact: int
    disclaimer: str

# 5. QPR & Post-Selection (I1 - I6)
class QPRSubmitRequest(BaseModel):
    quarter: str = "Q1 FY2026-27"
    research_progress_summary: str
    guide_name: str
    guide_endorsement: bool = True
    attendance_percent: float = 94.0

class GrievanceCreateRequest(BaseModel):
    applicant_email: str
    category: str
    subject: str
    description: str
