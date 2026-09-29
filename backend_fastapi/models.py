"""
VidyaSetu Core Database Models (14 Core Tables as specified in SIH PS 239 Brief)
1. users
2. schemes
3. scheme_rules
4. applications
5. documents
6. document_analysis
7. deficiencies
8. workflow_events
9. officer_reviews
10. audit_logs
11. notifications
12. qpr_reports
13. disbursements
14. grievances
"""

from datetime import datetime
from sqlalchemy import (
    Column, String, Integer, Float, Boolean, Text, DateTime, ForeignKey
)
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    role = Column(String, default="APPLICANT")  # APPLICANT, OFFICER, ADMIN, INSTITUTE
    mobile = Column(String)
    aadhaar_masked = Column(String)
    state = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

    applications = relationship("Application", back_populates="user")


class Scheme(Base):
    __tablename__ = "schemes"

    id = Column(String, primary_key=True, index=True)  # PRE_MATRIC, POST_MATRIC, TOP_CLASS, NFST, NOS
    name = Column(String, nullable=False)
    short_name = Column(String, nullable=False)
    category = Column(String)
    description = Column(Text)
    total_slots = Column(Integer, default=0)
    filled_slots = Column(Integer, default=0)
    annual_budget_cr = Column(Float, default=0.0)
    stipend_details = Column(Text)  # JSON string or description
    guideline_reference = Column(String)
    selection_basis = Column(Text)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    rules = relationship("SchemeRule", back_populates="scheme")
    applications = relationship("Application", back_populates="scheme")


class SchemeRule(Base):
    __tablename__ = "scheme_rules"

    id = Column(String, primary_key=True, index=True)
    scheme_id = Column(String, ForeignKey("schemes.id"), nullable=False)
    version = Column(String, nullable=False)  # e.g. NFST-2026-R3
    is_active = Column(Boolean, default=True)
    income_ceiling = Column(Float, nullable=False)
    max_age = Column(Integer, nullable=False)
    min_marks = Column(Float, nullable=False)
    eligible_degrees = Column(Text)  # JSON serialized list of degrees
    pvtg_reservation_slots = Column(Integer, default=0)
    st_female_horizontal_quota = Column(Float, default=30.0)
    pwd_reservation_quota = Column(Float, default=5.0)
    mandatory_test = Column(String)
    required_documents = Column(Text)  # JSON serialized list of documents
    source_guideline_section = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

    scheme = relationship("Scheme", back_populates="rules")


class Application(Base):
    __tablename__ = "applications"

    id = Column(String, primary_key=True, index=True)  # MOTA-2026-NFST-0101
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    scheme_id = Column(String, ForeignKey("schemes.id"), nullable=False)

    applicant_name = Column(String, nullable=False)
    state = Column(String, nullable=False)
    district = Column(String)
    tribe_community = Column(String, nullable=False)
    is_pvtg = Column(Boolean, default=False)
    pvtg_community = Column(String, nullable=True)
    gender = Column(String)
    dob = Column(String)
    annual_family_income = Column(Float, nullable=False)
    highest_qualification = Column(String)
    marks_percentage = Column(Float)
    institution_name = Column(String)
    course_enrolled = Column(String)
    phone = Column(String)
    bank_account_masked = Column(String)
    ifsc_code = Column(String)

    # Workflow & Lifecycle
    stage = Column(Integer, default=1)  # 1: Submitted, 2: AI Pre-Scrutiny, 3: Verification, 4: Scrutiny, 5: Selection, 6: Award/DBT
    status = Column(String, default="Submitted")
    progress_percent = Column(Integer, default=20)
    triage_category = Column(String, default="READY")  # READY, DEFICIENCY, ANOMALY, MANUAL_REVIEW
    ai_risk_level = Column(String, default="LOW")  # LOW, MEDIUM, HIGH
    ai_verdict = Column(Text)
    seniority_timestamp = Column(DateTime, default=datetime.utcnow)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Shared identifier anomaly flagging
    anomaly_flags = Column(Text)  # JSON array of anomalies if any

    # Relationships
    user = relationship("User", back_populates="applications")
    scheme = relationship("Scheme", back_populates="applications")
    documents = relationship("Document", back_populates="application", cascade="all, delete-orphan")
    deficiencies = relationship("Deficiency", back_populates="application", cascade="all, delete-orphan")
    workflow_events = relationship("WorkflowEvent", back_populates="application", cascade="all, delete-orphan")
    officer_reviews = relationship("OfficerReview", back_populates="application", cascade="all, delete-orphan")
    audit_logs = relationship("AuditLog", back_populates="application", cascade="all, delete-orphan")
    notifications = relationship("Notification", back_populates="application", cascade="all, delete-orphan")
    qpr_reports = relationship("QPRReport", back_populates="application", cascade="all, delete-orphan")
    disbursements = relationship("Disbursement", back_populates="application", cascade="all, delete-orphan")
    grievances = relationship("Grievance", back_populates="application", cascade="all, delete-orphan")


class Document(Base):
    __tablename__ = "documents"

    id = Column(String, primary_key=True, index=True)
    application_id = Column(String, ForeignKey("applications.id"), nullable=False)
    document_type = Column(String, nullable=False)  # CASTE_CERTIFICATE, INCOME_CERTIFICATE, MARKSHEET, etc.
    file_name = Column(String, nullable=False)
    file_url = Column(String)
    file_number = Column(String)
    issuing_authority = Column(String)
    issue_date = Column(String)
    status = Column(String, default="PENDING")  # PENDING, VERIFIED, DEFICIENT, REPLACED
    is_replacement = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    application = relationship("Application", back_populates="documents")
    analyses = relationship("DocumentAnalysis", back_populates="document", cascade="all, delete-orphan")


class DocumentAnalysis(Base):
    __tablename__ = "document_analysis"

    id = Column(String, primary_key=True, index=True)
    document_id = Column(String, ForeignKey("documents.id"), nullable=False)
    application_id = Column(String, ForeignKey("applications.id"), nullable=False)

    ocr_confidence = Column(Float, default=95.0)
    extracted_entities = Column(Text)  # JSON text with extracted fields and coordinates
    identity_match_score = Column(Float, default=100.0)
    date_validity_status = Column(String, default="VALID")  # VALID, EXPIRED, OUT_OF_WINDOW
    tamper_score = Column(Float, default=0.01)
    duplicate_file_hash = Column(String)
    findings = Column(Text)  # JSON text of rule-by-rule pass/fail checklist
    created_at = Column(DateTime, default=datetime.utcnow)

    document = relationship("Document", back_populates="analyses")


class Deficiency(Base):
    __tablename__ = "deficiencies"

    id = Column(String, primary_key=True, index=True)
    application_id = Column(String, ForeignKey("applications.id"), nullable=False)
    document_id = Column(String, ForeignKey("documents.id"), nullable=True)

    deficiency_code = Column(String, nullable=False)  # e.g. DEF-INC-EXPIRED
    title = Column(String, nullable=False)
    statutory_reason = Column(Text, nullable=False)
    status = Column(String, default="OPEN")  # OPEN, RESOLVED, EXPIRED
    deadline_days = Column(Integer, default=15)
    deadline_date = Column(DateTime)
    resolved_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    application = relationship("Application", back_populates="deficiencies")


class WorkflowEvent(Base):
    __tablename__ = "workflow_events"

    id = Column(String, primary_key=True, index=True)
    application_id = Column(String, ForeignKey("applications.id"), nullable=False)
    stage_from = Column(String)
    stage_to = Column(String)
    trigger_type = Column(String)  # USER_ACTION, AI_SCAN, OFFICER_ACTION, SYSTEM_TIMER
    description = Column(Text, nullable=False)
    actor = Column(String, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)

    application = relationship("Application", back_populates="workflow_events")


class OfficerReview(Base):
    __tablename__ = "officer_reviews"

    id = Column(String, primary_key=True, index=True)
    application_id = Column(String, ForeignKey("applications.id"), nullable=False)
    officer_id = Column(String, nullable=False)
    action = Column(String, nullable=False)  # APPROVE, RAISE_DEFICIENCY, REJECT, OVERRIDE
    statutory_clause = Column(String)
    override_type = Column(String, nullable=True)
    comments = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)

    application = relationship("Application", back_populates="officer_reviews")


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(String, primary_key=True, index=True)
    application_id = Column(String, ForeignKey("applications.id"), nullable=False)
    block_index = Column(Integer, nullable=False)
    prev_hash = Column(String, nullable=False)
    actor = Column(String, nullable=False)
    action = Column(String, nullable=False)
    payload_hash = Column(String, nullable=False)
    payload_data = Column(Text)
    hash = Column(String, nullable=False)  # SHA-256
    short_hash = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow)

    application = relationship("Application", back_populates="audit_logs")


class Notification(Base):
    __tablename__ = "notifications"

    id = Column(String, primary_key=True, index=True)
    application_id = Column(String, ForeignKey("applications.id"), nullable=False)
    recipient = Column(String, nullable=False)
    channel = Column(String, default="SMS")  # SMS, EMAIL, IN_APP
    title = Column(String, nullable=False)
    message = Column(Text, nullable=False)
    status = Column(String, default="DELIVERED")
    created_at = Column(DateTime, default=datetime.utcnow)

    application = relationship("Application", back_populates="notifications")


class QPRReport(Base):
    __tablename__ = "qpr_reports"

    id = Column(String, primary_key=True, index=True)
    application_id = Column(String, ForeignKey("applications.id"), nullable=False)
    quarter = Column(String, nullable=False)  # Q1 FY2026-27
    research_progress_summary = Column(Text, nullable=False)
    guide_name = Column(String, nullable=False)
    guide_endorsement = Column(Boolean, default=True)
    attendance_percent = Column(Float, default=92.5)
    status = Column(String, default="SUBMITTED")  # SUBMITTED, ENDORSED, APPROVED_FOR_DISBURSAL
    submitted_at = Column(DateTime, default=datetime.utcnow)

    application = relationship("Application", back_populates="qpr_reports")


class Disbursement(Base):
    __tablename__ = "disbursements"

    id = Column(String, primary_key=True, index=True)
    application_id = Column(String, ForeignKey("applications.id"), nullable=False)
    reference_id = Column(String, nullable=False)  # e.g. PFMS-DBT-2026-0819
    scheme_id = Column(String, nullable=False)
    quarter = Column(String, nullable=False)
    amount = Column(Float, nullable=False)
    bank_name = Column(String)
    account_masked = Column(String)
    ifsc_code = Column(String)
    status = Column(String, default="SUCCESS")  # SUCCESS, PENDING_CLEARANCE
    dbt_mode = Column(String, default="Aadhaar Payment Bridge (APB)")
    disbursed_at = Column(DateTime, default=datetime.utcnow)

    application = relationship("Application", back_populates="disbursements")


class Grievance(Base):
    __tablename__ = "grievances"

    id = Column(String, primary_key=True, index=True)
    application_id = Column(String, ForeignKey("applications.id"), nullable=True)
    applicant_email = Column(String, nullable=False)
    category = Column(String, nullable=False)
    subject = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    sla_days = Column(Integer, default=7)
    status = Column(String, default="OPEN")  # OPEN, INVESTIGATING, RESOLVED
    resolution_note = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)

    application = relationship("Application", back_populates="grievances")
