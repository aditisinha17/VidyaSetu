import hashlib
import json
from datetime import datetime, timezone
from backend_fastapi.database import supabase_get, supabase_post

async def create_audit_log(app_id: str, actor: str, action: str, payload: dict):
    # Fetch previous hash
    prev_logs = await supabase_get("audit_logs", params={"application_id": f"eq.{app_id}", "order": "created_at.desc", "limit": "1"})
    prev_hash = prev_logs[0]["hash"] if prev_logs else "0" * 64

    timestamp = datetime.now(timezone.utc).isoformat()
    data_str = json.dumps(payload, sort_keys=True)
    
    hash_input = f"{prev_hash}{timestamp}{actor}{action}{data_str}"
    new_hash = hashlib.sha256(hash_input.encode('utf-8')).hexdigest()

    log_entry = {
        "application_id": app_id,
        "actor": actor,
        "action": action,
        "payload": payload,
        "prev_hash": prev_hash,
        "hash": new_hash,
        "created_at": timestamp
    }
    
    return await supabase_post("audit_logs", log_entry)

async def verify_chain(app_id: str) -> dict:
    logs = await supabase_get("audit_logs", params={"application_id": f"eq.{app_id}", "order": "created_at.asc"})
    if not logs:
        return {"valid": True, "message": "No logs found"}
    
    prev_hash = "0" * 64
    for log in logs:
        data_str = json.dumps(log["payload"], sort_keys=True)
        hash_input = f"{prev_hash}{log['created_at']}{log['actor']}{log['action']}{data_str}"
        computed = hashlib.sha256(hash_input.encode('utf-8')).hexdigest()
        
        if log["hash"] != computed or log["prev_hash"] != prev_hash:
            return {"valid": False, "broken_at": log["id"]}
        prev_hash = log["hash"]
        
    return {"valid": True, "message": "Chain is verified"}
