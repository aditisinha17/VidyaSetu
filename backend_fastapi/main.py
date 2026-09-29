"""
VidyaSetu FastAPI Governance REST Service (SIH 2026 Problem Statement 239)
Full-featured Python backend with 14 core database tables, deterministic rule engine,
simulated AI document intelligence, SHA-256 chained audit logs, and post-selection lifecycle.
"""

import os
import json
from datetime import datetime, timedelta
from typing import List, Optional, Dict, Any
from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from .database import get_db, engine, Base
from .models import (
    User, Scheme, SchemeRule, Application, Document, DocumentAnalysis,
    Deficiency, WorkflowEvent, OfficerReview, AuditLog, Notification,
    QPRReport, Disbursement, Grievance
)
from .schemas import (
    CandidateEligibilityInput, EligibilityResponse, SchemeEvaluationResult,
    SchemeRuleConfigUpdate, DocumentReplaceRequest, OfficerReviewRequest,
    PolicySimulationRequest, PolicySimulationResult, QPRSubmitRequest,
    GrievanceCreateRequest
)
from .services.rule_engine import StatutoryRuleEngine
from .services.document_ai import DocumentAIService
from .services.audit_service import AuditService
from .services.policy_simulator import PolicySimulatorService
from .services.anomaly_service import AnomalyService
from .seed import seed_database

# Ensure tables exist and seed initial demo data
Base.metadata.create_all(bind=engine)
try:
    seed_database()
except Exception as e:
    print(f"Startup seed notice: {e}")

app = FastAPI(
    title="VidyaSetu Governance API",
    description="Unified AI-Assisted Scholarship & Fellowship Governance Platform (Ministry of Tribal Affairs)",
    version="2.0.0"
)

# Enable CORS for Vite frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------------------------------------
# 1. Health & Integration Adapters (Section L)
# -------------------------------------------------------------
@app.get("/api/health")
def health_check():
    return {
        "status": "UP",
        "service": "VidyaSetu Governance API (FastAPI)",
        "environment": "SIH 2026 Demonstration Sandbox",
        "framework": "FastAPI + SQLAlchemy (SQLite/PostgreSQL)",
        "adapters": {
            "digiLocker": {"status": "SANDBOX_READY", "mode": "Certified Document Pull/Push Adapter"},
            "uidaiKyc": {"status": "MOCK_READY", "mode": "Demographic & OTP Validation Simulator"},
            "pfmsDbt": {"status": "SANDBOX_READY", "mode": "e-FTO Direct Benefit Transfer Simulator"},
            "npciApb": {"status": "SANDBOX_READY", "mode": "Aadhaar Payment Bridge Account Seeding Mock"},
            "nicSms": {"status": "SIMULATED", "mode": "High-Priority Notification Gateway"}
        },
        "timestamp": datetime.utcnow().isoformat() + "Z"
    }

# -------------------------------------------------------------
# 2. Scheme Configuration Studio & Rule Management (Section E)
# -------------------------------------------------------------
@app.get("/api/schemes")
def get_schemes(db: Session = Depends(get_db)):
    schemes = db.query(Scheme).all()
    result = []
    for s in schemes:
        active_rule = db.query(SchemeRule).filter(SchemeRule.scheme_id == s.id, SchemeRule.is_active == True).first()
        elig = {
            "incomeCeiling": active_rule.income_ceiling if active_rule else 600000,
            "maxAge": active_rule.max_age if active_rule else 36,
            "minMarks": active_rule.min_marks if active_rule else 55,
            "degrees": json.loads(active_rule.eligible_degrees) if (active_rule and active_rule.eligible_degrees) else [],
            "mandatoryTest": active_rule.mandatory_test if active_rule else ""
        }
        quotas = {
            "stFemaleHorizontal": active_rule.st_female_horizontal_quota if active_rule else 30.0,
            "pvtgPrioritySlots": active_rule.pvtg_reservation_slots if active_rule else 50,
            "pwdReservation": active_rule.pwd_reservation_quota if active_rule else 5.0
        }
        req_docs = json.loads(active_rule.required_documents) if (active_rule and active_rule.required_documents) else []

        result.append({
            "id": s.id,
            "name": s.name,
            "shortName": s.short_name,
            "category": s.category,
            "description": s.description,
            "totalSlots": s.total_slots,
            "filledSlots": s.filled_slots,
            "annualBudgetCr": s.annual_budget_cr,
            "stipendDetails": s.stipend_details,
            "guidelineReference": s.guideline_reference,
            "selectionBasis": s.selection_basis,
            "eligibility": elig,
            "quotaRules": quotas,
            "requiredDocuments": req_docs,
            "version": active_rule.version if active_rule else "R1"
        })
    return result

@app.get("/api/schemes/{scheme_id}")
def get_scheme_by_id(scheme_id: str, db: Session = Depends(get_db)):
    s = db.query(Scheme).filter(Scheme.id == scheme_id).first()
    if not s:
        raise HTTPException(status_code=404, detail="Scheme not found")
    return s

@app.post("/api/schemes/{scheme_id}/rules")
def update_scheme_rules(scheme_id: str, update_data: SchemeRuleConfigUpdate, db: Session = Depends(get_db)):
    """
    On-stage demo moment (E3 & E5): Publishes new versioned rule config live without redeploy.
    """
    s = db.query(Scheme).filter(Scheme.id == scheme_id).first()
    if not s:
        raise HTTPException(status_code=404, detail="Scheme not found")

    # Deactivate previous active rules
    db.query(SchemeRule).filter(SchemeRule.scheme_id == scheme_id).update({"is_active": False})

    new_rule = SchemeRule(
        id=f"rule_{scheme_id.lower()}_{update_data.version.replace('-', '_').lower()}",
        scheme_id=scheme_id,
        version=update_data.version,
        is_active=True,
        income_ceiling=update_data.income_ceiling,
        max_age=update_data.max_age,
        min_marks=update_data.min_marks,
        eligible_degrees=json.dumps(update_data.eligible_degrees),
        pvtg_reservation_slots=update_data.pvtg_reservation_slots,
        st_female_horizontal_quota=update_data.st_female_horizontal_quota,
        pwd_reservation_quota=update_data.pwd_reservation_quota,
        mandatory_test=update_data.mandatory_test,
        source_guideline_section=update_data.source_guideline_section
    )
    db.add(new_rule)
    db.commit()

    return {
        "success": True,
        "message": f"New statutory rule version {update_data.version} published for scheme {scheme_id}.",
        "ruleId": new_rule.id,
        "effectiveDate": datetime.utcnow().strftime("%Y-%m-%d")
    }

# -------------------------------------------------------------
# 3. Deterministic Eligibility Pre-Checker (B2, B3, B4)
# -------------------------------------------------------------
@app.post("/api/eligibility/check")
def check_eligibility(candidate: CandidateEligibilityInput, db: Session = Depends(get_db)):
    """
    Evaluates applicant across all 5 MoTA schemes via pure deterministic statutory logic.
    Outputs ONLY ELIGIBLE / NOT_ELIGIBLE / NEEDS_VERIFICATION with statutory reasons.
    """
    schemes = db.query(Scheme).filter(Scheme.is_active == True).all()
    evaluations = []

    for s in schemes:
        active_rule = db.query(SchemeRule).filter(SchemeRule.scheme_id == s.id, SchemeRule.is_active == True).first()
        rule_dict = {
            "scheme_name": s.name,
            "income_ceiling": active_rule.income_ceiling if active_rule else 600000,
            "max_age": active_rule.max_age if active_rule else 36,
            "min_marks": active_rule.min_marks if active_rule else 50,
            "source_guideline_section": active_rule.source_guideline_section if active_rule else s.guideline_reference
        }
        res = StatutoryRuleEngine.evaluate(candidate.dict(), s.id, rule_dict)
        evaluations.append(res)

    return {
        "candidate": candidate.dict(),
        "evaluations": evaluations,
        "timestamp": datetime.utcnow().isoformat() + "Z"
    }

# -------------------------------------------------------------
# 4. Applications Intake & Lifecycle (Sections A & B)
# -------------------------------------------------------------
@app.get("/api/applications")
def list_applications(db: Session = Depends(get_db)):
    apps = db.query(Application).all()
    result = []
    for a in apps:
        docs = db.query(Document).filter(Document.application_id == a.id).all()
        defs = db.query(Deficiency).filter(Deficiency.application_id == a.id, Deficiency.status == "OPEN").first()
        audits = db.query(AuditLog).filter(AuditLog.application_id == a.id).order_by(AuditLog.block_index.asc()).all()

        result.append({
            "id": a.id,
            "userId": a.user_id,
            "schemeId": a.scheme_id,
            "name": a.applicant_name,
            "state": a.state,
            "district": a.district,
            "community": a.tribe_community,
            "isPvtg": a.is_pvtg,
            "pvtgCommunity": a.pvtg_community,
            "gender": a.gender,
            "dob": a.dob,
            "annualIncome": a.annual_family_income,
            "highestQualification": a.highest_qualification,
            "marks": a.marks_percentage,
            "institution": a.institution_name,
            "course": a.course_enrolled,
            "phone": a.phone,
            "bankAccount": a.bank_account_masked,
            "stage": a.stage,
            "status": a.status,
            "progressPercent": a.progress_percent,
            "triageCategory": a.triage_category,
            "aiRiskLevel": a.ai_risk_level,
            "aiVerdict": a.ai_verdict,
            "seniorityTimestamp": a.seniority_timestamp.isoformat() if a.seniority_timestamp else None,
            "deficiency": {
                "id": defs.id,
                "code": defs.deficiency_code,
                "title": defs.title,
                "reason": defs.statutory_reason,
                "deadlineDays": defs.deadline_days,
                "deadlineDate": defs.deadline_date.strftime("%Y-%m-%d") if defs.deadline_date else None
            } if defs else None,
            "documents": [
                {
                    "name": d.file_name,
                    "fileNumber": d.file_number,
                    "issuingAuthority": d.issuing_authority,
                    "issueDate": d.issue_date,
                    "status": d.status,
                    "isReplacement": d.is_replacement
                } for d in docs
            ],
            "auditTrail": [
                {
                    "blockIndex": al.block_index,
                    "prevHash": al.prev_hash,
                    "actor": al.actor,
                    "action": al.action,
                    "hash": al.hash,
                    "shortHash": al.short_hash,
                    "timestamp": al.timestamp.isoformat() + "Z"
                } for al in audits
            ],
            "anomalyFlags": json.loads(a.anomaly_flags) if a.anomaly_flags else []
        })
    return result

@app.get("/api/applications/{app_id}")
def get_application(app_id: str, db: Session = Depends(get_db)):
    a = db.query(Application).filter(Application.id == app_id).first()
    if not a:
        raise HTTPException(status_code=404, detail="Application not found")

    docs = db.query(Document).filter(Document.application_id == a.id).all()
    defs = db.query(Deficiency).filter(Deficiency.application_id == a.id, Deficiency.status == "OPEN").first()
    audits = db.query(AuditLog).filter(AuditLog.application_id == a.id).order_by(AuditLog.block_index.asc()).all()

    return {
        "id": a.id,
        "name": a.applicant_name,
        "schemeId": a.scheme_id,
        "state": a.state,
        "district": a.district,
        "community": a.tribe_community,
        "isPvtg": a.is_pvtg,
        "gender": a.gender,
        "dob": a.dob,
        "annualIncome": a.annual_family_income,
        "highestQualification": a.highest_qualification,
        "marks": a.marks_percentage,
        "institution": a.institution_name,
        "course": a.course_enrolled,
        "phone": a.phone,
        "bankAccount": a.bank_account_masked,
        "stage": a.stage,
        "status": a.status,
        "progressPercent": a.progress_percent,
        "triageCategory": a.triage_category,
        "aiRiskLevel": a.ai_risk_level,
        "aiVerdict": a.ai_verdict,
        "seniorityTimestamp": a.seniority_timestamp.isoformat() if a.seniority_timestamp else None,
        "deficiency": {
            "id": defs.id,
            "code": defs.deficiency_code,
            "title": defs.title,
            "reason": defs.statutory_reason,
            "deadlineDays": defs.deadline_days,
            "deadlineDate": defs.deadline_date.strftime("%Y-%m-%d") if defs.deadline_date else None
        } if defs else None,
        "documents": [
            {
                "id": d.id,
                "name": d.file_name,
                "fileNumber": d.file_number,
                "issuingAuthority": d.issuing_authority,
                "issueDate": d.issue_date,
                "status": d.status,
                "isReplacement": d.is_replacement
            } for d in docs
        ],
        "auditTrail": [
            {
                "blockIndex": al.block_index,
                "prevHash": al.prev_hash,
                "actor": al.actor,
                "action": al.action,
                "hash": al.hash,
                "shortHash": al.short_hash,
                "timestamp": al.timestamp.isoformat() + "Z"
            } for al in audits
        ],
        "anomalyFlags": json.loads(a.anomaly_flags) if a.anomaly_flags else []
    }

# -------------------------------------------------------------
# 5. Golden Journey Hero Action: Document Replacement (B10, B11, C9)
# -------------------------------------------------------------
@app.post("/api/applications/{app_id}/documents/replace")
def replace_document(app_id: str, req: DocumentReplaceRequest, db: Session = Depends(get_db)):
    """
    Applicant uploads replacement document in response to statutory deficiency.
    Triggers AI re-scan, closes deficiency, appends SHA-256 block,
    and transitions application to READY_FOR_REVIEW while preserving intake seniority.
    """
    a = db.query(Application).filter(Application.id == app_id).first()
    if not a:
        raise HTTPException(status_code=404, detail="Application not found")

    # 1. Run AI Re-Scan
    analysis = DocumentAIService.analyze_document(
        doc_type="INCOME_CERTIFICATE",
        file_name=req.file_name,
        applicant_data={"applicant_name": a.applicant_name, "annual_family_income": a.annual_family_income}
    )

    # 2. Update deficient documents
    old_doc = db.query(Document).filter(
        Document.application_id == a.id,
        Document.document_type == "INCOME_CERTIFICATE"
    ).first()

    if old_doc:
        old_doc.status = "REPLACED"

    new_doc = Document(
        id=f"doc_{a.id.lower()}_inc_rep_{int(datetime.utcnow().timestamp())}",
        application_id=a.id,
        document_type="INCOME_CERTIFICATE",
        file_name=req.file_name,
        file_number=req.file_number or "JH/INC/2026/01922",
        issuing_authority=req.issuing_authority or "Sub-Divisional Officer (SDO), Ranchi",
        issue_date=req.issue_date or "12-06-2026",
        status="VERIFIED",
        is_replacement=True
    )
    db.add(new_doc)
    db.flush()

    # Save document analysis
    db.add(DocumentAnalysis(
        id=f"analysis_{new_doc.id}",
        document_id=new_doc.id,
        application_id=a.id,
        ocr_confidence=analysis["ocr_confidence"],
        extracted_entities=json.dumps(analysis["extracted_entities"]),
        identity_match_score=analysis["identity_match_score"],
        date_validity_status=analysis["date_validity_status"],
        tamper_score=analysis["tamper_score"],
        duplicate_file_hash=analysis["duplicate_file_hash"],
        findings=json.dumps(analysis["findings"])
    ))

    # 3. Resolve Open Deficiency
    open_def = db.query(Deficiency).filter(Deficiency.application_id == a.id, Deficiency.status == "OPEN").first()
    if open_def:
        open_def.status = "RESOLVED"
        open_def.resolved_at = datetime.utcnow()

    # 4. State transition
    a.status = "AI Verified"
    a.stage = 3
    a.progress_percent = 65
    a.triage_category = "READY"
    a.ai_risk_level = "LOW"
    a.ai_verdict = "Replacement Income Certificate (FY 2026-27) scanned successfully. Deficiency resolved. Queued for Officer Scrutiny approval."

    # 5. Append chained SHA-256 blocks (Applicant upload + AI re-scan pass)
    last_audit = db.query(AuditLog).filter(AuditLog.application_id == a.id).order_by(AuditLog.block_index.desc()).first()
    prev_hash = last_audit.hash if last_audit else AuditService.GENESIS_HASH
    curr_index = (last_audit.block_index + 1) if last_audit else 0

    block_upload = AuditService.create_block(
        prev_hash,
        f"Applicant ({a.applicant_name})",
        "Replacement Income Certificate for FY 2026-27 uploaded via Deficiency Portal",
        {"file": req.file_name, "barcodeVerified": True},
        index=curr_index
    )
    block_rescan = AuditService.create_block(
        block_upload["hash"],
        "AI Document Pre-Scrutiny Lab",
        "AI Re-Scan Passed: Verified FY 2026-27 validity and SDO digital signature. Deficiency cleared.",
        {"ocrConfidence": analysis["ocr_confidence"], "tamperScore": analysis["tamper_score"]},
        index=curr_index + 1
    )

    db.add(AuditLog(
        id=f"audit_{a.id}_{block_upload['block_index']}",
        application_id=a.id,
        block_index=block_upload["block_index"],
        prev_hash=block_upload["prev_hash"],
        actor=block_upload["actor"],
        action=block_upload["action"],
        payload_hash=block_upload["payload_hash"],
        payload_data=block_upload["payload_data"],
        hash=block_upload["hash"],
        short_hash=block_upload["short_hash"],
        timestamp=datetime.fromisoformat(block_upload["timestamp"].replace("Z", ""))
    ))
    db.add(AuditLog(
        id=f"audit_{a.id}_{block_rescan['block_index']}",
        application_id=a.id,
        block_index=block_rescan["block_index"],
        prev_hash=block_rescan["prev_hash"],
        actor=block_rescan["actor"],
        action=block_rescan["action"],
        payload_hash=block_rescan["payload_hash"],
        payload_data=block_rescan["payload_data"],
        hash=block_rescan["hash"],
        short_hash=block_rescan["short_hash"],
        timestamp=datetime.fromisoformat(block_rescan["timestamp"].replace("Z", ""))
    ))

    # Add notification record
    db.add(Notification(
        id=f"notif_{a.id}_{int(datetime.utcnow().timestamp())}",
        application_id=a.id,
        recipient=a.phone or "+91 94311 02847",
        channel="SMS",
        title="Deficiency Resolved",
        message=f"MoTA Alert: Replacement document for {a.id} verified by AI. Queue seniority retained.",
        status="DELIVERED"
    ))

    db.commit()

    return {
        "success": True,
        "message": "Replacement document verified and accepted. Application queued for Ministry Scrutiny.",
        "analysis": analysis,
        "status": a.status,
        "stage": a.stage,
        "triageCategory": a.triage_category
    }

# -------------------------------------------------------------
# 6. Officer Scrutiny Actions (Section D)
# -------------------------------------------------------------
@app.get("/api/officer/queue")
def get_officer_queue(db: Session = Depends(get_db)):
    """
    Returns triaged queue with priority score formula (D2):
    Priority Score = days_pending * 1.5 + risk_factor (READY: 10, DEFICIENCY: 25, ANOMALY: 40)
    """
    apps = db.query(Application).all()
    queue = []
    for a in apps:
        days_pending = (datetime.utcnow() - a.created_at).days + 1
        risk_weight = 40 if a.triage_category == "ANOMALY" else (25 if a.triage_category == "DEFICIENCY" else 10)
        priority_score = int(days_pending * 1.5 + risk_weight)

        queue.append({
            "id": a.id,
            "applicantName": a.applicant_name,
            "schemeId": a.scheme_id,
            "state": a.state,
            "triageCategory": a.triage_category,
            "aiRiskLevel": a.ai_risk_level,
            "daysPending": days_pending,
            "priorityScore": priority_score,
            "status": a.status,
            "aiVerdict": a.ai_verdict
        })
    # Sort by priority score descending
    queue.sort(key=lambda x: x["priorityScore"], reverse=True)
    return queue

@app.post("/api/applications/{app_id}/scrutiny/approve")
def officer_approve(app_id: str, db: Session = Depends(get_db)):
    a = db.query(Application).filter(Application.id == app_id).first()
    if not a:
        raise HTTPException(status_code=404, detail="Application not found")

    a.status = "Selection Committee Review"
    a.stage = 4
    a.progress_percent = 85
    a.triage_category = "READY"
    a.ai_verdict = "Level-1 & Level-2 Scrutiny Approved by MoTA Officer. Forwarded to Merit Committee."

    last_audit = db.query(AuditLog).filter(AuditLog.application_id == a.id).order_by(AuditLog.block_index.desc()).first()
    prev_hash = last_audit.hash if last_audit else AuditService.GENESIS_HASH
    curr_index = (last_audit.block_index + 1) if last_audit else 0

    block_approve = AuditService.create_block(
        prev_hash,
        "MoTA Scrutiny Officer",
        "Level-1 & Level-2 Scrutiny Approved with Human-in-the-Loop clearance",
        {"officer": "director.fellowship@tribal.gov.in", "action": "APPROVE_AND_FORWARD"},
        index=curr_index
    )
    db.add(AuditLog(
        id=f"audit_{a.id}_{block_approve['block_index']}",
        application_id=a.id,
        block_index=block_approve["block_index"],
        prev_hash=block_approve["prev_hash"],
        actor=block_approve["actor"],
        action=block_approve["action"],
        payload_hash=block_approve["payload_hash"],
        payload_data=block_approve["payload_data"],
        hash=block_approve["hash"],
        short_hash=block_approve["short_hash"],
        timestamp=datetime.fromisoformat(block_approve["timestamp"].replace("Z", ""))
    ))
    db.commit()

    return {"success": True, "applicationId": a.id, "newStatus": a.status}

@app.post("/api/applications/{app_id}/scrutiny/override")
def officer_override(app_id: str, req: OfficerReviewRequest, db: Session = Depends(get_db)):
    """
    Mandatory accountability log for Human Officer Overrides (D4 & J3).
    """
    a = db.query(Application).filter(Application.id == app_id).first()
    if not a:
        raise HTTPException(status_code=404, detail="Application not found")

    last_audit = db.query(AuditLog).filter(AuditLog.application_id == a.id).order_by(AuditLog.block_index.desc()).first()
    prev_hash = last_audit.hash if last_audit else AuditService.GENESIS_HASH
    curr_index = (last_audit.block_index + 1) if last_audit else 0

    block_override = AuditService.create_block(
        prev_hash,
        "MoTA Scrutiny Officer",
        f"Human Officer Override Executed: {req.override_type or 'Statutory Discretion'}",
        {
            "statutoryClause": req.statutory_clause,
            "officerComments": req.comments,
            "officerId": "director.fellowship@tribal.gov.in"
        },
        index=curr_index
    )
    db.add(AuditLog(
        id=f"audit_{a.id}_{block_override['block_index']}",
        application_id=a.id,
        block_index=block_override["block_index"],
        prev_hash=block_override["prev_hash"],
        actor=block_override["actor"],
        action=block_override["action"],
        payload_hash=block_override["payload_hash"],
        payload_data=block_override["payload_data"],
        hash=block_override["hash"],
        short_hash=block_override["short_hash"],
        timestamp=datetime.fromisoformat(block_override["timestamp"].replace("Z", ""))
    ))
    db.commit()

    return {"success": True, "message": "Officer override recorded in permanent hash ledger.", "blockHash": block_override["hash"]}

# -------------------------------------------------------------
# 7. Audit Ledger Cryptographic Verification (Section J)
# -------------------------------------------------------------
@app.get("/api/audit/{app_id}/verify")
def verify_audit_trail(app_id: str, db: Session = Depends(get_db)):
    audits = db.query(AuditLog).filter(AuditLog.application_id == app_id).order_by(AuditLog.block_index.asc()).all()
    if not audits:
        raise HTTPException(status_code=404, detail="No audit blocks found for this application")

    blocks = [
        {
            "block_index": a.block_index,
            "prev_hash": a.prev_hash,
            "actor": a.actor,
            "action": a.action,
            "payload_data": a.payload_data,
            "hash": a.hash,
            "timestamp": a.timestamp.isoformat() + "Z"
        } for a in audits
    ]
    verification = AuditService.verify_chain(blocks)
    return verification

# -------------------------------------------------------------
# 8. Policy Decision Support System (What-If Simulation - Section F)
# -------------------------------------------------------------
@app.post("/api/policy/simulate")
def simulate_policy(req: PolicySimulationRequest):
    return PolicySimulatorService.run_simulation(req.scheme_id, req.baseline, req.proposed)

# -------------------------------------------------------------
# 9. Anomaly Graph & Cross-Application Fraud Hub (Section G)
# -------------------------------------------------------------
@app.get("/api/anomalies")
def get_anomalies(db: Session = Depends(get_db)):
    apps = db.query(Application).all()
    app_dicts = [
        {
            "id": a.id,
            "applicant_name": a.applicant_name,
            "scheme_id": a.scheme_id,
            "phone": a.phone,
            "bank_account_masked": a.bank_account_masked
        } for a in apps
    ]
    clusters = AnomalyService.detect_shared_identifiers(app_dicts)
    return {
        "totalAnomaliesDetected": len(clusters),
        "clusters": clusters,
        "disclaimer": "Shared identifier flags are non-adverse and prompt human officer investigation to verify sibling/co-applicant legitimacy."
    }

# -------------------------------------------------------------
# 10. Post-Award Fellowship Governance (QPR & Disbursements - Section I)
# -------------------------------------------------------------
@app.post("/api/qpr")
def submit_qpr(req: QPRSubmitRequest, app_id: str = Query("MOTA-2026-NFST-0101"), db: Session = Depends(get_db)):
    qpr = QPRReport(
        id=f"qpr_{app_id.lower()}_{int(datetime.utcnow().timestamp())}",
        application_id=app_id,
        quarter=req.quarter,
        research_progress_summary=req.research_progress_summary,
        guide_name=req.guide_name,
        guide_endorsement=req.guide_endorsement,
        attendance_percent=req.attendance_percent,
        status="APPROVED_FOR_DISBURSAL"
    )
    db.add(qpr)
    db.commit()
    return {"success": True, "qprId": qpr.id, "status": qpr.status}

@app.get("/api/disbursements/{app_id}")
def get_disbursements(app_id: str, db: Session = Depends(get_db)):
    disbs = db.query(Disbursement).filter(Disbursement.application_id == app_id).all()
    return {
        "applicationId": app_id,
        "disbursements": [
            {
                "referenceId": d.reference_id,
                "schemeId": d.scheme_id,
                "quarter": d.quarter,
                "amount": d.amount,
                "status": d.status,
                "dbtMode": d.dbt_mode,
                "disbursedAt": d.disbursed_at.strftime("%Y-%m-%d")
            } for d in disbs
        ],
        "disclaimer": "Direct Benefit Transfer records shown are mock adapter transactions for prototype demonstration."
    }

# -------------------------------------------------------------
# 11. National Analytics Dashboard (Section K)
# -------------------------------------------------------------
@app.get("/api/analytics/summary")
def get_analytics(db: Session = Depends(get_db)):
    total_apps = db.query(Application).count()
    verified = db.query(Application).filter(Application.stage >= 3).count()
    deficient = db.query(Application).filter(Application.status.ilike("%defic%")).count()
    approved = db.query(Application).filter(Application.stage >= 4).count()

    return {
        "kpis": {
            "totalApplications": 12842,  # Demo national cohort label
            "verifiedEligible": 10410,
            "disbursedTotalCr": 178.4,
            "averageProcessingDays": 8.4,  # TAT KPI metric
            "deficiencyResolutionRate": "94.2%"
        },
        "funnel": {
            "submitted": total_apps,
            "verified": verified,
            "deficient": deficient,
            "approved": approved
        },
        "schemesCount": db.query(Scheme).count()
    }
