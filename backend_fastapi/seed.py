"""
Database Seeding Script for VidyaSetu
Seeds all 5 MoTA schemes, versioned rules, star applicant Birsa Hemrom,
anomaly applicant pair, and post-selection records.
"""

from datetime import datetime, timedelta
import json
from .database import engine, Base, SessionLocal
from .models import (
    User, Scheme, SchemeRule, Application, Document, DocumentAnalysis,
    Deficiency, WorkflowEvent, OfficerReview, AuditLog, Notification,
    QPRReport, Disbursement, Grievance
)
from .services.audit_service import AuditService

def seed_database():
    # Create all tables
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
        # Check if already seeded
        if db.query(Scheme).first():
            print("Database already contains data. Skipping re-seed.")
            return

        print("Seeding VidyaSetu 14 Core Tables...")

        # 1. Seed Users
        birsa_user = User(
            id="usr_birsa_01",
            email="birsa.hemrom@student.ac.in",
            name="Birsa Hemrom",
            role="APPLICANT",
            mobile="+91 94311 02847",
            aadhaar_masked="XXXX-XXXX-8921",
            state="Jharkhand"
        )
        officer_user = User(
            id="usr_officer_mota",
            email="director.fellowship@tribal.gov.in",
            name="Dr. Rajeshwar Meena",
            role="OFFICER",
            mobile="+91 11 2338 4125",
            aadhaar_masked="XXXX-XXXX-1002",
            state="New Delhi"
        )
        amit_user = User(
            id="usr_amit_02",
            email="amit.soren@overseas.edu",
            name="Amit Soren",
            role="APPLICANT",
            mobile="+91 98765 43210",
            aadhaar_masked="XXXX-XXXX-4411",
            state="Odisha"
        )
        rahul_user = User(
            id="usr_rahul_03",
            email="rahul.soren@iitb.ac.in",
            name="Rahul Soren",
            role="APPLICANT",
            mobile="+91 98765 43210",  # Shared phone
            aadhaar_masked="XXXX-XXXX-9932",
            state="Odisha"
        )
        mangal_user = User(
            id="usr_mangal_04",
            email="mangal.munda@jharkhand.edu.in",
            name="Mangal Munda",
            role="APPLICANT",
            mobile="+91 94311 55210",
            aadhaar_masked="XXXX-XXXX-3341",
            state="Jharkhand"
        )
        sunita_user = User(
            id="usr_sunita_05",
            email="sunita.oraon@univ.ac.in",
            name="Sunita Oraon",
            role="APPLICANT",
            mobile="+91 98351 77123",
            aadhaar_masked="XXXX-XXXX-6612",
            state="Chhattisgarh"
        )
        db.add_all([birsa_user, officer_user, amit_user, rahul_user, mangal_user, sunita_user])
        db.flush()

        # 2. Seed All 5 MoTA Schemes
        schemes_data = [
            Scheme(
                id="NFST",
                name="National Fellowship for Scheduled Tribe Students",
                short_name="NFST",
                category="Higher Education Research (Ph.D. / M.Phil)",
                description="Financial assistance to ST scholars pursuing regular and full-time M.Phil and Ph.D. degrees in Science, Humanities, Social Science, and Engineering within India.",
                total_slots=750,
                filled_slots=620,
                annual_budget_cr=95.0,
                stipend_details="JRF: ₹37,000/mo, SRF: ₹42,000/mo, Contingency: ₹20,500/yr",
                guideline_reference="MoTA Scheme Guidelines for NFST (Revised Edition)",
                selection_basis="Merit in Post-Graduation Examination with statutory provisions for PVTG and horizontal gender quota.",
                is_active=True
            ),
            Scheme(
                id="NOS",
                name="National Overseas Scholarship for ST Students",
                short_name="NOS",
                category="International Higher Education (Masters & Ph.D.)",
                description="Financial support to meritorious ST students for pursuing Master level courses and Ph.D. abroad in accredited overseas universities ranked within QS Top 500 (priority ranking ≤ 200).",
                total_slots=20,
                filled_slots=18,
                annual_budget_cr=18.5,
                stipend_details="Annual allowance: £9,900 (UK) / $15,400 (USA), 100% Tuition actuals",
                guideline_reference="MoTA NOS Scheme Guidelines (Section 3.2)",
                selection_basis="Unconditional admission in QS World Top 500 + academic evaluation by Expert Committee with affirmative PVTG reservation.",
                is_active=True
            ),
            Scheme(
                id="TOP_CLASS",
                name="Top Class Education for ST Students",
                short_name="Top Class ST",
                category="Undergraduate / Professional Courses in Notified Institutes",
                description="Encourages ST scholars to join premier institutions (IITs, IIMs, NITs, AIIMS, NLUs, NIDs) by providing 100% tuition fees, living allowances, and IT grants.",
                total_slots=1000,
                filled_slots=940,
                annual_budget_cr=65.0,
                stipend_details="Living: ₹2,220/mo, Books: ₹3,000/yr, Computer: ₹45,000 one-time, 100% Tuition",
                guideline_reference="Top Class Scheme Guidelines for Notified Premier Institutes",
                selection_basis="Direct institutional quota allocation based on entrance examination ranking (JEE Adv, NEET, CAT, CLAT).",
                is_active=True
            ),
            Scheme(
                id="PRE_MATRIC",
                name="Pre-Matric Scholarship for ST Students (Classes IX & X)",
                short_name="Pre-Matric ST",
                category="Secondary School Education",
                description="Centrally sponsored scheme implemented through State Governments/UT Administrations to support ST parents in sending children to secondary school (Classes IX and X) and prevent dropouts.",
                total_slots=250000,
                filled_slots=218400,
                annual_budget_cr=450.0,
                stipend_details="Day Scholars: ₹3,500/yr, Hostellers: ₹7,000/yr + Divyang allowances",
                guideline_reference="MoTA Pre-Matric Scholarship Guidelines (dbttribal.gov.in)",
                selection_basis="Enrollment in recognized secondary school with income ceiling <= 2.5 LPA and Article 342 ST certificate.",
                is_active=True
            ),
            Scheme(
                id="POST_MATRIC",
                name="Post-Matric Scholarship for ST Students (Class XI to PG)",
                short_name="Post-Matric ST",
                category="Higher Secondary, Undergraduate & Postgraduate Studies",
                description="Flagsip financial assistance covering all recognized post-matriculation or post-secondary courses pursued in recognized institutions across India.",
                total_slots=500000,
                filled_slots=442100,
                annual_budget_cr=850.0,
                stipend_details="Course Group I to IV: ₹2,500 to ₹13,500/yr maintenance + compulsory fees",
                guideline_reference="MoTA Post-Matric Scholarship Guidelines (dbttribal.gov.in)",
                selection_basis="Direct Benefit Transfer based on State portal harmonization, valid enrollment, and income <= 2.5 LPA.",
                is_active=True
            )
        ]
        db.add_all(schemes_data)
        db.flush()

        # 3. Seed Scheme Rules (Versioned as requested in E3)
        rules_data = [
            SchemeRule(
                id="rule_nfst_v3",
                scheme_id="NFST",
                version="NFST-2026-R3",
                is_active=True,
                income_ceiling=600000.0,
                max_age=36,
                min_marks=55.0,
                eligible_degrees=json.dumps(["Ph.D.", "M.Phil", "Integrated Ph.D."]),
                pvtg_reservation_slots=50,
                st_female_horizontal_quota=30.0,
                pwd_reservation_quota=5.0,
                mandatory_test="UGC-NET / CSIR-NET / GATE or Institutional Entrance",
                required_documents=json.dumps([
                    "ST Caste Certificate (Digital State Land/Caste Authority)",
                    "Annual Family Income Certificate (Issued for FY 2026-27 by Tahasildar/SDO)",
                    "Master Degree Marksheet & Provisional Certificate",
                    "Ph.D. Enrolment Confirmation & Research Guide Endorsement",
                    "Research Synopsis / Proposal (max 10 pages)",
                    "Aadhaar Card (Aadhaar Seeded Bank Account)"
                ]),
                source_guideline_section="NFST Guidelines Section 3 & 4 (dbttribal.gov.in)"
            ),
            SchemeRule(
                id="rule_nos_v2",
                scheme_id="NOS",
                version="NOS-2026-R2",
                is_active=True,
                income_ceiling=800000.0,
                max_age=35,
                min_marks=55.0,
                eligible_degrees=json.dumps(["Master of Science", "Ph.D. Abroad", "Master of Engineering", "Master of Public Policy"]),
                pvtg_reservation_slots=3,
                st_female_horizontal_quota=30.0,
                pwd_reservation_quota=5.0,
                mandatory_test="IELTS (>= 6.5) / TOEFL (>= 90) / GRE",
                required_documents=json.dumps([
                    "ST Caste Certificate (Central Government ST List mapping)",
                    "Income Certificate (ITR or Tehsildar Certificate <= 8 Lakhs)",
                    "Unconditional Offer Letter from QS Top 500 University",
                    "Valid Indian Passport",
                    "IELTS / TOEFL / GRE Scorecard",
                    "Two Academic Recommendations from Indian Faculty"
                ]),
                source_guideline_section="NOS Guidelines Section 3.2"
            ),
            SchemeRule(
                id="rule_top_class_v2",
                scheme_id="TOP_CLASS",
                version="TOPCLASS-2026-R2",
                is_active=True,
                income_ceiling=600000.0,
                max_age=30,
                min_marks=50.0,
                eligible_degrees=json.dumps(["B.Tech", "MBBS", "MBA", "B.Des", "B.A. LL.B"]),
                pvtg_reservation_slots=75,
                st_female_horizontal_quota=30.0,
                pwd_reservation_quota=5.0,
                mandatory_test="JEE Advanced / NEET / CAT / CLAT Allotment",
                required_documents=json.dumps([
                    "ST Caste Certificate",
                    "Family Income Certificate (< 6 Lakhs)",
                    "JEE / NEET / CAT / CLAT Allotment Letter",
                    "Admission Fee Receipt from Notified Institute",
                    "Aadhaar Card"
                ]),
                source_guideline_section="Top Class Scheme Guidelines Section 4"
            ),
            SchemeRule(
                id="rule_pre_matric_v1",
                scheme_id="PRE_MATRIC",
                version="PREMATRIC-2026-R1",
                is_active=True,
                income_ceiling=250000.0,
                max_age=18,
                min_marks=40.0,
                eligible_degrees=json.dumps(["Class IX", "Class X"]),
                pvtg_reservation_slots=500,
                st_female_horizontal_quota=30.0,
                pwd_reservation_quota=5.0,
                mandatory_test="Regular School Enrollment",
                required_documents=json.dumps([
                    "ST Caste Certificate (Article 342)",
                    "Parent Income Certificate (<= 2.5 LPA)",
                    "Headmaster School Enrollment Attestation",
                    "Student Aadhaar Card"
                ]),
                source_guideline_section="Pre-Matric ST Scheme Guidelines Section 3.1"
            ),
            SchemeRule(
                id="rule_post_matric_v1",
                scheme_id="POST_MATRIC",
                version="POSTMATRIC-2026-R1",
                is_active=True,
                income_ceiling=250000.0,
                max_age=30,
                min_marks=40.0,
                eligible_degrees=json.dumps(["Class XI", "Class XII", "Diploma", "UG", "PG"]),
                pvtg_reservation_slots=1000,
                st_female_horizontal_quota=30.0,
                pwd_reservation_quota=5.0,
                mandatory_test="Recognized Post-Secondary Enrollment",
                required_documents=json.dumps([
                    "ST Caste Certificate (Article 342)",
                    "Parent Income Certificate (<= 2.5 LPA)",
                    "Previous Qualifying Examination Marksheet",
                    "College / Institute Admission Fee Receipt",
                    "Bank Passbook (Aadhaar Seeded)"
                ]),
                source_guideline_section="Post-Matric ST Scheme Guidelines Section 4.1"
            )
        ]
        db.add_all(rules_data)
        db.flush()

        # 4. Seed Star Applicant: Birsa Hemrom (MOTA-2026-NFST-0101)
        # Seeded in DEFICIENCY state for Golden Demo Scene 2 -> Scene 3 transition
        birsa_app = Application(
            id="MOTA-2026-NFST-0101",
            user_id="usr_birsa_01",
            scheme_id="NFST",
            applicant_name="Birsa Hemrom",
            state="Jharkhand",
            district="Ranchi",
            tribe_community="Santhal",
            is_pvtg=False,
            pvtg_community=None,
            gender="Male",
            dob="1999-11-15",
            annual_family_income=420000.0,
            highest_qualification="Master of Science (Anthropology)",
            marks_percentage=68.5,
            institution_name="Ranchi University, Jharkhand",
            course_enrolled="Ph.D. in Tribal Culture & Governance",
            phone="+91 94311 02847",
            bank_account_masked="SBI-XXXX-XXXX-4102",
            ifsc_code="SBIN0000167",
            stage=2,
            status="Deficiency Pending",
            progress_percent=45,
            triage_category="DEFICIENCY",
            ai_risk_level="MEDIUM",
            ai_verdict="Deficiency detected: Income Certificate issued for FY 2022-23 is expired. Current FY 2026-27 certificate required under MoTA Section 4.2.",
            seniority_timestamp=datetime.utcnow() - timedelta(days=5),
            anomaly_flags=None
        )
        db.add(birsa_app)
        db.flush()

        # Birsa's initial documents (including defective income cert)
        birsa_doc_caste = Document(
            id="doc_birsa_caste",
            application_id=birsa_app.id,
            document_type="CASTE_CERTIFICATE",
            file_name="Caste_Certificate_Ranchi_DC.pdf",
            file_number="JH/ST/2021/49102",
            issuing_authority="Deputy Commissioner, Ranchi",
            issue_date="10-04-2021",
            status="VERIFIED",
            is_replacement=False
        )
        birsa_doc_income_expired = Document(
            id="doc_birsa_income_expired",
            application_id=birsa_app.id,
            document_type="INCOME_CERTIFICATE",
            file_name="Income_Certificate_Old_2023.pdf",
            file_number="JH/INC/2023/88129",
            issuing_authority="Tahasildar, Ranchi",
            issue_date="15-01-2023",
            status="DEFICIENT",
            is_replacement=False
        )
        birsa_doc_marksheet = Document(
            id="doc_birsa_marksheet",
            application_id=birsa_app.id,
            document_type="MARKSHEET",
            file_name="MSc_Anthropology_Marksheet.pdf",
            file_number="RU/MSC/2024/0912",
            issuing_authority="Ranchi University Examination Board",
            issue_date="20-07-2024",
            status="VERIFIED",
            is_replacement=False
        )
        birsa_doc_phd = Document(
            id="doc_birsa_phd",
            application_id=birsa_app.id,
            document_type="ENROLLMENT_PROOF",
            file_name="PhD_Admission_Letter_RU.pdf",
            file_number="RU/PHD/ANTH/2025/11",
            issuing_authority="Dean, Faculty of Social Sciences",
            issue_date="12-08-2025",
            status="VERIFIED",
            is_replacement=False
        )
        db.add_all([birsa_doc_caste, birsa_doc_income_expired, birsa_doc_marksheet, birsa_doc_phd])
        db.flush()

        # Birsa's Deficiency
        birsa_deficiency = Deficiency(
            id="def_birsa_01",
            application_id=birsa_app.id,
            document_id=birsa_doc_income_expired.id,
            deficiency_code="DEF-INC-EXPIRED",
            title="Income Certificate Validity Lapsed (Requires FY 2026-27)",
            statutory_reason="MoTA Guidelines Section 4.2: Income certificate submitted was issued on 15-01-2023 (FY 2022-23). An income certificate issued for current FY 2026-27 by Tahasildar/SDO is mandatory.",
            status="OPEN",
            deadline_days=15,
            deadline_date=datetime.utcnow() + timedelta(days=10)
        )
        db.add(birsa_deficiency)

        # Birsa's Cryptographic Hash Chain
        b0 = AuditService.create_block(
            AuditService.GENESIS_HASH,
            "Applicant (Birsa Hemrom)",
            "Application submitted online via Jan Parichay Single Sign-On",
            {"scheme": "NFST", "degree": "Ph.D. Anthropology", "institute": "Ranchi University"},
            index=0
        )
        b1 = AuditService.create_block(
            b0["hash"],
            "AI Document Pre-Scrutiny Lab",
            "OCR extraction completed: Flagged Income Certificate validity lapsed (Issued FY 2022-23)",
            {"docName": "Income Certificate", "issueDate": "15-01-2023", "code": "DEF-INC-EXPIRED"},
            index=1
        )
        b2 = AuditService.create_block(
            b1["hash"],
            "System Automation Engine",
            "Deficiency notice DEF-INC-EXPIRED dispatched with 15-day resolution window",
            {"deadlineDays": 15, "seniorityPreserved": True},
            index=2
        )
        for b in [b0, b1, b2]:
            db.add(AuditLog(
                id=f"audit_birsa_{b['block_index']}",
                application_id=birsa_app.id,
                block_index=b["block_index"],
                prev_hash=b["prev_hash"],
                actor=b["actor"],
                action=b["action"],
                payload_hash=b["payload_hash"],
                payload_data=b["payload_data"],
                hash=b["hash"],
                short_hash=b["short_hash"],
                timestamp=datetime.fromisoformat(b["timestamp"].replace("Z", ""))
            ))

        # Birsa's Notifications
        db.add_all([
            Notification(
                id="notif_birsa_01",
                application_id=birsa_app.id,
                recipient=birsa_app.phone,
                channel="SMS",
                title="Application Registered",
                message="MoTA Alert: Your NFST application MOTA-2026-NFST-0101 has been registered. AI Pre-scrutiny initiated.",
                status="DELIVERED"
            ),
            Notification(
                id="notif_birsa_02",
                application_id=birsa_app.id,
                recipient=birsa_app.phone,
                channel="SMS",
                title="Deficiency Notice Issued",
                message="MoTA Alert: Deficiency raised on MOTA-2026-NFST-0101. Replace expired Income Certificate within 15 days to retain seniority.",
                status="DELIVERED"
            )
        ])

        # Birsa's QPR and Disbursement (For Scene 11 & 12 Demo)
        db.add(QPRReport(
            id="qpr_birsa_q1",
            application_id=birsa_app.id,
            quarter="Q1 FY2026-27",
            research_progress_summary="Completed fieldwork across 8 Santhal village councils in Santhal Parganas; compiled oral customary law archives.",
            guide_name="Prof. Nirmal Minz, Dept of Anthropology",
            guide_endorsement=True,
            attendance_percent=94.5,
            status="APPROVED_FOR_DISBURSAL"
        ))
        db.add(Disbursement(
            id="dbt_birsa_01",
            application_id=birsa_app.id,
            reference_id="PFMS-DBT-2026-0819",
            scheme_id="NFST",
            quarter="Q1 FY2026-27",
            amount=111000.0,  # 3 months JRF @ ₹37,000
            bank_name="State Bank of India",
            account_masked="SBI-XXXX-XXXX-4102",
            ifsc_code="SBIN0000167",
            status="SUCCESS",
            dbt_mode="Aadhaar Payment Bridge (APB)"
        ))

        # 5. Seed Anomaly Applicant Pair (Section G & N3)
        # Shared Phone (+91 98765 43210) and Shared Bank Account
        amit_app = Application(
            id="MOTA-2026-NOS-0204",
            user_id="usr_amit_02",
            scheme_id="NOS",
            applicant_name="Amit Soren",
            state="Odisha",
            district="Mayurbhanj",
            tribe_community="Santhal",
            is_pvtg=False,
            gender="Male",
            dob="1998-05-10",
            annual_family_income=540000.0,
            highest_qualification="B.Tech (Computer Science)",
            marks_percentage=74.2,
            institution_name="Imperial College London (QS #6)",
            course_enrolled="M.Sc. Advanced Computing",
            phone="+91 98765 43210",  # Shared phone
            bank_account_masked="HDFC-XXXX-XXXX-9901",  # Shared bank
            ifsc_code="HDFC0000240",
            stage=4,
            status="Officer Scrutiny Pending",
            progress_percent=70,
            triage_category="ANOMALY",
            ai_risk_level="HIGH",
            ai_verdict="Anomaly Detected: Shared phone and bank account with application MOTA-2026-TOP-0309. Sibling or proxy application check required.",
            anomaly_flags=json.dumps([
                "SHARED_PHONE_IDENTIFIER: +91 98765 43210 (Linked with MOTA-2026-TOP-0309)",
                "SHARED_BANK_ACCOUNT: HDFC-XXXX-XXXX-9901 (Linked with MOTA-2026-TOP-0309)"
            ])
        )
        rahul_app = Application(
            id="MOTA-2026-TOP-0309",
            user_id="usr_rahul_03",
            scheme_id="TOP_CLASS",
            applicant_name="Rahul Soren",
            state="Odisha",
            district="Mayurbhanj",
            tribe_community="Santhal",
            is_pvtg=False,
            gender="Male",
            dob="2003-08-19",
            annual_family_income=540000.0,
            highest_qualification="Higher Secondary (Class XII)",
            marks_percentage=91.4,
            institution_name="IIT Bombay (Notified Premier Institute)",
            course_enrolled="B.Tech Computer Science & Engineering",
            phone="+91 98765 43210",  # Shared phone
            bank_account_masked="HDFC-XXXX-XXXX-9901",  # Shared bank
            ifsc_code="HDFC0000240",
            stage=4,
            status="Officer Scrutiny Pending",
            progress_percent=70,
            triage_category="ANOMALY",
            ai_risk_level="HIGH",
            ai_verdict="Anomaly Detected: Shared phone and bank account with application MOTA-2026-NOS-0204. Cross-file verification initiated.",
            anomaly_flags=json.dumps([
                "SHARED_PHONE_IDENTIFIER: +91 98765 43210 (Linked with MOTA-2026-NOS-0204)",
                "SHARED_BANK_ACCOUNT: HDFC-XXXX-XXXX-9901 (Linked with MOTA-2026-NOS-0204)"
            ])
        )

        # 6. Seed Pre-Matric and Post-Matric Applicants
        mangal_app = Application(
            id="MOTA-2026-PRE-0512",
            user_id="usr_mangal_04",
            scheme_id="PRE_MATRIC",
            applicant_name="Mangal Munda",
            state="Jharkhand",
            district="Khunti",
            tribe_community="Munda",
            is_pvtg=False,
            gender="Male",
            dob="2010-04-12",
            annual_family_income=140000.0,
            highest_qualification="Class VIII",
            marks_percentage=72.0,
            institution_name="Government High School, Torpa, Khunti",
            course_enrolled="Class IX (Secondary)",
            phone="+91 94311 55210",
            bank_account_masked="PNB-XXXX-XXXX-1934",
            ifsc_code="PUNB0123400",
            stage=4,
            status="Officer Scrutiny Pending",
            progress_percent=70,
            triage_category="READY",
            ai_risk_level="LOW",
            ai_verdict="Pre-Matric eligibility verified: Enrolled in Class IX, income <= 2.5 LPA, Munda community notified under Article 342."
        )
        sunita_app = Application(
            id="MOTA-2026-POST-0841",
            user_id="usr_sunita_05",
            scheme_id="POST_MATRIC",
            applicant_name="Sunita Oraon",
            state="Chhattisgarh",
            district="Jashpur",
            tribe_community="Oraon",
            is_pvtg=False,
            gender="Female",
            dob="2005-09-22",
            annual_family_income=180000.0,
            highest_qualification="Class XII (Science)",
            marks_percentage=79.4,
            institution_name="Guru Ghasidas Vishwavidyalaya, Bilaspur",
            course_enrolled="B.Sc. Nursing (Undergraduate)",
            phone="+91 98351 77123",
            bank_account_masked="BOI-XXXX-XXXX-8821",
            ifsc_code="BKID0004910",
            stage=5,
            status="Selection Committee Review",
            progress_percent=85,
            triage_category="READY",
            ai_risk_level="LOW",
            ai_verdict="Post-Matric eligibility verified: B.Sc Nursing recognized course, income <= 2.5 LPA, 30% horizontal female quota priority."
        )
        db.add_all([amit_app, rahul_app, mangal_app, sunita_app])

        # 7. Seed Grievance
        db.add(Grievance(
            id="grv_01",
            application_id=birsa_app.id,
            applicant_email=birsa_app.user.email if birsa_app.user else "birsa.hemrom@student.ac.in",
            category="Deficiency Query",
            subject="Clarification regarding Tehsildar vs SDO Income Certificate validity",
            description="Is a digital SDO certificate from e-District portal acceptable for FY 2026-27?",
            sla_days=7,
            status="RESOLVED",
            resolution_note="Yes, digital certificates signed by an SDO are completely valid under MoTA guidelines."
        ))

        db.commit()
        print("[OK] Database successfully seeded with 5 Schemes, Rules, Star Applicant, Anomaly Pair, and Seed Records!")

    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
        raise e
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
