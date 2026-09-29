from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from datetime import datetime, timezone
import json

from backend_fastapi.database import supabase_get, supabase_post, supabase_patch
from backend_fastapi.services.rule_engine import check_eligibility
from backend_fastapi.services.document_ai import analyze_document
from backend_fastapi.services.audit_service import create_audit_log, verify_chain
from backend_fastapi.services.anomaly_service import detect_anomalies
from backend_fastapi.services.policy_simulator import simulate_policy

app = FastAPI(title="VidyaSetu API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class EligibilityReq(BaseModel):
    name: str
    tribe: str
    state: str
    dob: str
    annual_income: float
    highest_qualification: str
    marks_percentage: float
    institution_name: str
    is_pvtg: bool
    gender: str

@app.get("/api/health")
async def health():
    try:
        await supabase_get("schemes", params={"limit": "1"})
        db_status = "connected"
    except Exception as e:
        db_status = f"error: {str(e)}"
    return {"status": "ok", "supabase": db_status}

@app.get("/api/schemes")
async def get_schemes():
    # In a real app we'd join rules via PostgREST. Doing simple fetch here.
    schemes = await supabase_get("schemes")
    rules = await supabase_get("scheme_rules")
    
    for s in schemes:
        s["rules"] = [r for r in rules if r["scheme_id"] == s["id"]]
    return schemes

@app.get("/api/schemes/{scheme_id}")
async def get_scheme(scheme_id: str):
    schemes = await supabase_get("schemes", params={"id": f"eq.{scheme_id}"})
    if not schemes:
        raise HTTPException(404, "Scheme not found")
    scheme = schemes[0]
    scheme["rules"] = await supabase_get("scheme_rules", params={"scheme_id": f"eq.{scheme_id}"})
    return scheme

@app.patch("/api/schemes/{scheme_id}/rules")
async def update_rules(scheme_id: str, data: dict):
    # Simulated update
    return {"status": "updated"}

@app.post("/api/eligibility/check")
async def check_el(data: EligibilityReq):
    schemes = await get_schemes()
    res = check_eligibility(data.dict(), schemes)
    return res

@app.get("/api/applications")
async def get_apps():
    return await supabase_get("applications")

@app.get("/api/applications/{id}")
async def get_app(id: str):
    apps = await supabase_get("applications", params={"id": f"eq.{id}"})
    if not apps:
        raise HTTPException(404, "Not found")
    return apps[0]

@app.post("/api/applications")
async def create_app(data: dict):
    data["status"] = "DRAFT"
    data["created_at"] = datetime.now(timezone.utc).isoformat()
    res = await supabase_post("applications", data)
    app_data = res[0]
    await create_audit_log(app_data["id"], data.get("applicant_name", "system"), "CREATED", app_data)
    return app_data

@app.post("/api/applications/{id}/submit")
async def submit_app(id: str):
    patch = {"status": "SUBMITTED"}
    res = await supabase_patch("applications", patch, params={"id": f"eq.{id}"})
    app_data = res[0]
    await create_audit_log(id, app_data.get("applicant_name", "system"), "SUBMITTED", app_data)
    
    # Auto-trigger AI_PRESCRUTINY
    patch_ai = {"status": "AI_PRESCRUTINY"}
    res2 = await supabase_patch("applications", patch_ai, params={"id": f"eq.{id}"})
    app_data2 = res2[0]
    await create_audit_log(id, "system", "AI_PRESCRUTINY_STARTED", app_data2)
    
    # Simulated completion
    doc_ai = analyze_document({"type": "income", "text": "Rs. 50000"})
    final_status = "DEFICIENT" if doc_ai["status"] == "DEFICIENT" else "READY_FOR_REVIEW"
    patch_final = {"status": final_status}
    res_f = await supabase_patch("applications", patch_final, params={"id": f"eq.{id}"})
    await create_audit_log(id, "system", f"AI_PRESCRUTINY_FINISHED_{final_status}", res_f[0])
    
    return res_f[0]

@app.post("/api/applications/{id}/documents/replace")
async def replace_doc(id: str, data: dict):
    # DRAFT/DEFICIENT -> RESUBMITTED
    patch = {"status": "RESUBMITTED"}
    res = await supabase_patch("applications", patch, params={"id": f"eq.{id}"})
    await create_audit_log(id, "student", "DOCUMENT_REPLACED", res[0])
    return res[0]

@app.get("/api/officer/queue")
async def officer_queue():
    # Mocking order
    apps = await supabase_get("applications", params={"status": "eq.READY_FOR_REVIEW"})
    return sorted(apps, key=lambda x: x.get("is_pvtg", False), reverse=True)

@app.post("/api/applications/{id}/scrutiny/pickup")
async def pickup_app(id: str):
    patch = {"status": "UNDER_SCRUTINY"}
    res = await supabase_patch("applications", patch, params={"id": f"eq.{id}"})
    await create_audit_log(id, "officer", "PICKED_UP", res[0])
    return res[0]

@app.post("/api/applications/{id}/scrutiny/approve")
async def approve_app(id: str):
    patch = {"status": "APPROVED"}
    res = await supabase_patch("applications", patch, params={"id": f"eq.{id}"})
    await create_audit_log(id, "officer", "APPROVED", res[0])
    return res[0]

@app.post("/api/applications/{id}/scrutiny/reject")
async def reject_app(id: str, data: dict):
    patch = {"status": "REJECTED"}
    res = await supabase_patch("applications", patch, params={"id": f"eq.{id}"})
    await create_audit_log(id, "officer", "REJECTED", {"reason": data.get("reason"), **res[0]})
    return res[0]

@app.post("/api/applications/{id}/scrutiny/override")
async def override_app(id: str, data: dict):
    patch = {"status": "APPROVED"} # or rejected based on override
    res = await supabase_patch("applications", patch, params={"id": f"eq.{id}"})
    await create_audit_log(id, "officer", "AI_OVERRIDE", {"reason": data.get("reason"), **res[0]})
    return res[0]

@app.get("/api/audit/{id}/chain")
async def get_audit_chain(id: str):
    return await supabase_get("audit_logs", params={"application_id": f"eq.{id}", "order": "created_at.asc"})

@app.get("/api/audit/{id}/verify")
async def verify_audit(id: str):
    return await verify_chain(id)

@app.get("/api/analytics/summary")
async def analytics():
    # Return mock/simple stats
    apps = await supabase_get("applications")
    return {
        "total_applications": len(apps),
        "approved": len([a for a in apps if a.get("status") == "APPROVED"])
    }

@app.get("/api/anomalies")
async def get_anomalies():
    return await detect_anomalies()

@app.post("/api/policy/simulate")
async def sim_policy(data: dict):
    # Mock synthetic data
    synth_data = [{"annual_income": 40000}, {"annual_income": 60000}]
    return simulate_policy(synth_data, data)

@app.post("/api/qpr")
async def submit_qpr(data: dict):
    res = await supabase_post("qpr", data)
    if "application_id" in data:
        await create_audit_log(data["application_id"], "institute", "QPR_SUBMITTED", res[0])
    return res[0]

@app.get("/api/qpr/{app_id}")
async def get_qpr(app_id: str):
    return await supabase_get("qpr", params={"application_id": f"eq.{app_id}"})

@app.get("/api/disbursements/{app_id}")
async def get_disb(app_id: str):
    return await supabase_get("disbursements", params={"application_id": f"eq.{app_id}"})

@app.get("/api/notifications/{user_id}")
async def get_notif(user_id: str):
    return await supabase_get("notifications", params={"user_id": f"eq.{user_id}"})

@app.get("/api/grievances/{user_id}")
async def get_grievances(user_id: str):
    return await supabase_get("grievances", params={"user_id": f"eq.{user_id}"})

@app.post("/api/grievances")
async def create_griev(data: dict):
    return await supabase_post("grievances", data)

@app.post("/api/auth/demo-login")
async def login(data: dict):
    # Mock login
    return {"user": data.get("email"), "role": "student", "token": "mock-jwt"}

@app.get("/api/users")
async def users():
    return [{"id": 1, "email": "student@test.com", "role": "student"}]
