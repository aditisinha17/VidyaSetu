import httpx
import os

SUPABASE_URL = os.getenv("SUPABASE_URL", "https://mbdmsjydkhpvuykzdpqa.supabase.co")
SUPABASE_ANON_KEY = os.getenv("SUPABASE_ANON_KEY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1iZG1zanlka2hwdnV5a3pkcHFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA2NDc1MzQsImV4cCI6MjEwNjIyMzUzNH0.F2aKvDFW-IgUHBY5et1JBHaEHCKYdyVFv7n9F-W4VcE")
REST_URL = f"{SUPABASE_URL}/rest/v1"

def get_headers(prefer_return=False):
    headers = {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": f"Bearer {SUPABASE_ANON_KEY}",
        "Content-Type": "application/json"
    }
    if prefer_return:
        headers["Prefer"] = "return=representation"
    return headers

async def supabase_get(table, params=None):
    async with httpx.AsyncClient() as client:
        res = await client.get(f"{REST_URL}/{table}", headers=get_headers(), params=params)
        res.raise_for_status()
        return res.json()

async def supabase_post(table, data):
    async with httpx.AsyncClient() as client:
        res = await client.post(f"{REST_URL}/{table}", headers=get_headers(True), json=data)
        res.raise_for_status()
        return res.json()

async def supabase_patch(table, data, params):
    async with httpx.AsyncClient() as client:
        res = await client.patch(f"{REST_URL}/{table}", headers=get_headers(True), json=data, params=params)
        res.raise_for_status()
        return res.json()

async def supabase_delete(table, params):
    async with httpx.AsyncClient() as client:
        res = await client.delete(f"{REST_URL}/{table}", headers=get_headers(True), params=params)
        res.raise_for_status()
        return res.json()
