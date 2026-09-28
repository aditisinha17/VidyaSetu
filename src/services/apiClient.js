// VidyaSetu API Client Service
// Connects to local Node.js backend (http://localhost:5001/api) when available,
// with automatic graceful fallback to local state for static preview / cloud hosting.

const API_BASE = 'http://localhost:5001/api';

export const ApiClient = {
  /**
   * Health check to see if backend server is responsive.
   */
  async checkBackendHealth() {
    try {
      const res = await fetch(`${API_BASE}/health`, { method: 'GET', signal: AbortSignal.timeout(1200) });
      if (res.ok) return await res.json();
    } catch {
      // Backend not running locally
    }
    return null;
  },

  /**
   * Run deterministic eligibility check.
   */
  async checkEligibility(candidate) {
    try {
      const res = await fetch(`${API_BASE}/eligibility/check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(candidate),
        signal: AbortSignal.timeout(1500)
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return null;
  },

  /**
   * Resolve deficiency via document re-scan.
   */
  async replaceDocument(appId, fileData) {
    try {
      const res = await fetch(`${API_BASE}/applications/${appId}/documents/replace`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fileData),
        signal: AbortSignal.timeout(2000)
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return null;
  },

  /**
   * Verify SHA-256 chained audit trail.
   */
  async verifyAuditChain(appId) {
    try {
      const res = await fetch(`${API_BASE}/audit/${appId}/verify`, {
        method: 'GET',
        signal: AbortSignal.timeout(1500)
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return null;
  },

  /**
   * Run policy simulation on synthetic pool.
   */
  async simulatePolicy(baseline, proposed) {
    try {
      const res = await fetch(`${API_BASE}/policy/simulate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ baseline, proposed }),
        signal: AbortSignal.timeout(2000)
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return null;
  }
};
