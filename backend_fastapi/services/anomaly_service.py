from backend_fastapi.database import supabase_get

async def detect_anomalies():
    apps = await supabase_get("applications", params={"select": "id,applicant_name,phone,bank_account,photo_hash"})
    
    shared_phones = {}
    shared_banks = {}
    
    anomalies = []
    
    for app in apps:
        phone = app.get("phone")
        bank = app.get("bank_account")
        
        if phone:
            if phone in shared_phones:
                anomalies.append({"type": "shared_phone", "apps": [shared_phones[phone], app["id"]]})
            else:
                shared_phones[phone] = app["id"]
                
        if bank:
            if bank in shared_banks:
                anomalies.append({"type": "shared_bank", "apps": [shared_banks[bank], app["id"]]})
            else:
                shared_banks[bank] = app["id"]

    return anomalies
