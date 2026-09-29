// VidyaSetu Central API Client Service
// Ground Rule 3: NO DEAD BUTTONS — Every user action performs a real API call.
// Ground Rule 4: Visible "Demo mode: simulated results" banner if backend is unreachable.

const API_BASE = 'http://localhost:5001/api';

export const ApiClient = {
  isBackendConnected: false,

  getToken() {
    try {
      return localStorage.getItem('vidyasetu_token') || '';
    } catch {
      return '';
    }
  },

  setToken(token) {
    try {
      if (token) localStorage.setItem('vidyasetu_token', token);
      else localStorage.removeItem('vidyasetu_token');
    } catch {}
  },

  getAuthHeaders() {
    const token = this.getToken();
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return headers;
  },

  /**
   * Real Auth: Citizen Registration
   */
  async register(userData) {
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
        signal: AbortSignal.timeout(3000)
      });
      const data = await res.json();
      if (data && data.success && data.data?.token) {
        this.setToken(data.data.token);
      }
      return data;
    } catch (e) {
      console.warn('API error register:', e);
      return { success: false, error: e.message };
    }
  },

  /**
   * Real Auth: User Login
   */
  async login(email, password) {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        signal: AbortSignal.timeout(3000)
      });
      const data = await res.json();
      if (data && data.success && data.data?.token) {
        this.setToken(data.data.token);
      }
      return data;
    } catch (e) {
      console.warn('API error login:', e);
      return { success: false, error: e.message };
    }
  },

  /**
   * Real Auth: User Logout
   */
  async logout() {
    try {
      await fetch(`${API_BASE}/auth/logout`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        signal: AbortSignal.timeout(2000)
      });
    } catch {}
    this.setToken('');
    return { success: true };
  },

  /**
   * Health check to probe backend connectivity.
   */
  async checkBackendHealth() {
    try {
      const res = await fetch(`${API_BASE}/health`, { method: 'GET', signal: AbortSignal.timeout(1500) });
      if (res.ok) {
        this.isBackendConnected = true;
        return await res.json();
      }
    } catch {
      this.isBackendConnected = false;
    }
    return null;
  },

  /**
   * Demo Authentication (Jan Parichay Sandbox)
   */
  async demoLogin(roleOrEmail) {
    try {
      const body = roleOrEmail.includes('@') ? { email: roleOrEmail } : { role: roleOrEmail };
      const res = await fetch(`${API_BASE}/auth/demo-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(2000)
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.data?.token) {
          this.setToken(data.data.token);
        }
        return data;
      }
    } catch (e) {
      console.warn('API error demoLogin:', e);
    }
    return null;
  },

  /**
   * Fetch Schemes with Versioned Rules
   */
  async getSchemes() {
    try {
      const res = await fetch(`${API_BASE}/schemes`, { signal: AbortSignal.timeout(2000) });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API error getSchemes:', e);
    }
    return null;
  },

  async updateScheme(schemeId, ruleUpdates) {
    try {
      const res = await fetch(`${API_BASE}/schemes/${schemeId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ruleUpdates),
        signal: AbortSignal.timeout(2000)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API error updateScheme:', e);
    }
    return null;
  },

  /**
   * Deterministic Statutory Eligibility Check
   */
  async checkEligibility(candidate) {
    try {
      const res = await fetch(`${API_BASE}/eligibility/check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(candidate),
        signal: AbortSignal.timeout(2500)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API error checkEligibility:', e);
    }
    return null;
  },

  /**
   * Applications Intake & Case File Retrieval
   */
  async getApplications(query = {}) {
    try {
      const params = new URLSearchParams(query).toString();
      const url = `${API_BASE}/applications${params ? `?${params}` : ''}`;
      const res = await fetch(url, { 
        headers: this.getAuthHeaders(),
        signal: AbortSignal.timeout(2500) 
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API error getApplications:', e);
    }
    return null;
  },

  async getApplication(appId) {
    try {
      const res = await fetch(`${API_BASE}/applications/${appId}`, { 
        headers: this.getAuthHeaders(),
        signal: AbortSignal.timeout(2000) 
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API error getApplication:', e);
    }
    return null;
  },

  async createApplication(applicationData) {
    try {
      const res = await fetch(`${API_BASE}/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(applicationData),
        signal: AbortSignal.timeout(3000)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API error createApplication:', e);
    }
    return null;
  },

  async submitApplication(appId) {
    try {
      const res = await fetch(`${API_BASE}/applications/${appId}/submit`, {
        method: 'POST',
        signal: AbortSignal.timeout(3000)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API error submitApplication:', e);
    }
    return null;
  },

  /**
   * Document Upload with Multipart Support & AI Pre-Scrutiny
   */
  async uploadDocument(formData) {
    try {
      const res = await fetch(`${API_BASE}/documents/upload`, {
        method: 'POST',
        body: formData, // FormData handles Content-Type boundary automatically
        signal: AbortSignal.timeout(5000)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API error uploadDocument:', e);
    }
    return null;
  },

  /**
   * Replace Document & Resolve Deficiency via AI Re-Scan
   */
  async replaceDocument(appId, fileOrData) {
    try {
      let options = { method: 'POST', signal: AbortSignal.timeout(4000) };
      if (fileOrData instanceof FormData) {
        options.body = fileOrData;
      } else {
        options.headers = { 'Content-Type': 'application/json' };
        options.body = JSON.stringify(fileOrData);
      }
      const res = await fetch(`${API_BASE}/applications/${appId}/documents/replace`, options);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API error replaceDocument:', e);
    }
    return null;
  },

  /**
   * Officer Scrutiny Desk Actions
   */
  async getOfficerQueue() {
    try {
      const res = await fetch(`${API_BASE}/officer/queue`, { signal: AbortSignal.timeout(2000) });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API error getOfficerQueue:', e);
    }
    return null;
  },

  async pickupApplication(appId) {
    try {
      const res = await fetch(`${API_BASE}/applications/${appId}/scrutiny/pickup`, {
        method: 'POST',
        signal: AbortSignal.timeout(2000)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API error pickupApplication:', e);
    }
    return null;
  },

  async approveApplication(appId) {
    try {
      const res = await fetch(`${API_BASE}/applications/${appId}/scrutiny/approve`, {
        method: 'POST',
        signal: AbortSignal.timeout(2500)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API error approveApplication:', e);
    }
    return null;
  },

  async rejectApplication(appId, rejectionData) {
    try {
      const res = await fetch(`${API_BASE}/applications/${appId}/scrutiny/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rejectionData),
        signal: AbortSignal.timeout(2500)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API error rejectApplication:', e);
    }
    return null;
  },

  async overrideApplication(appId, overrideData) {
    try {
      const res = await fetch(`${API_BASE}/applications/${appId}/scrutiny/override`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(overrideData),
        signal: AbortSignal.timeout(2500)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API error overrideApplication:', e);
    }
    return null;
  },

  /**
   * Selection Committee Merit Allocation
   */
  async bulkSelectApplications(selectedIds) {
    try {
      const res = await fetch(`${API_BASE}/merit/select`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selectedIds }),
        signal: AbortSignal.timeout(3000)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API error bulkSelectApplications:', e);
    }
    return null;
  },

  /**
   * Award QR Code Verification
   */
  async verifyAward(sanctionNumber) {
    try {
      const res = await fetch(`${API_BASE}/awards/verify/${encodeURIComponent(sanctionNumber)}`, {
        signal: AbortSignal.timeout(2000)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API error verifyAward:', e);
    }
    return null;
  },

  /**
   * Chained Audit Trail & Cryptographic Verification
   */
  async getAuditChain(appId) {
    try {
      const res = await fetch(`${API_BASE}/audit/${appId}/chain`, { signal: AbortSignal.timeout(2000) });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API error getAuditChain:', e);
    }
    return null;
  },

  async verifyAuditChain(appId) {
    try {
      const res = await fetch(`${API_BASE}/audit/${appId}/verify`, { signal: AbortSignal.timeout(2000) });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API error verifyAuditChain:', e);
    }
    return null;
  },

  /**
   * Policy Simulator DSS (10k Synthetic Cohort)
   */
  async simulatePolicy(baseline, proposed) {
    try {
      const res = await fetch(`${API_BASE}/policy/simulate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ baseline, proposed }),
        signal: AbortSignal.timeout(2500)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API error simulatePolicy:', e);
    }
    return null;
  },

  /**
   * Cross-Application Anomalies
   */
  async getAnomalies() {
    try {
      const res = await fetch(`${API_BASE}/anomalies`, { signal: AbortSignal.timeout(2000) });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API error getAnomalies:', e);
    }
    return null;
  },

  /**
   * National Executive Analytics
   */
  async getAnalyticsSummary() {
    try {
      const res = await fetch(`${API_BASE}/analytics/summary`, { signal: AbortSignal.timeout(2000) });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API error getAnalyticsSummary:', e);
    }
    return null;
  },

  /**
   * Post-Selection: QPR & PFMS DBT Batches
   */
  async getQprReports(appId = null) {
    try {
      const url = appId ? `${API_BASE}/qpr?applicationId=${appId}` : `${API_BASE}/qpr`;
      const res = await fetch(url, { signal: AbortSignal.timeout(2000) });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API error getQprReports:', e);
    }
    return null;
  },

  async submitQpr(report) {
    try {
      const res = await fetch(`${API_BASE}/qpr`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(report),
        signal: AbortSignal.timeout(2500)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API error submitQpr:', e);
    }
    return null;
  },

  async getDisbursements(appId = null) {
    try {
      const url = appId ? `${API_BASE}/disbursements?applicationId=${appId}` : `${API_BASE}/disbursements`;
      const res = await fetch(url, { signal: AbortSignal.timeout(2000) });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API error getDisbursements:', e);
    }
    return null;
  },

  async triggerDbtBatch(schemeId, recipients) {
    try {
      const res = await fetch(`${API_BASE}/disbursements/batch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ schemeId, recipients }),
        signal: AbortSignal.timeout(3000)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API error triggerDbtBatch:', e);
    }
    return null;
  },

  /**
   * Grievances & Notifications
   */
  async getGrievances(userId = null) {
    try {
      const url = userId ? `${API_BASE}/grievances?userId=${userId}` : `${API_BASE}/grievances`;
      const res = await fetch(url, { signal: AbortSignal.timeout(2000) });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API error getGrievances:', e);
    }
    return null;
  },

  async submitGrievance(data) {
    try {
      const res = await fetch(`${API_BASE}/grievances`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        signal: AbortSignal.timeout(2500)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API error submitGrievance:', e);
    }
    return null;
  },

  async getNotifications(userId = null) {
    try {
      const url = userId ? `${API_BASE}/notifications?userId=${userId}` : `${API_BASE}/notifications`;
      const res = await fetch(url, { 
        headers: this.getAuthHeaders(),
        signal: AbortSignal.timeout(2000) 
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API error getNotifications:', e);
    }
    return null;
  },

  /**
   * One-Command Reset Database API
   */
  async resetDatabase() {
    try {
      const res = await fetch(`${API_BASE}/admin/reset-db`, {
        method: 'POST',
        signal: AbortSignal.timeout(3000)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API error resetDatabase:', e);
    }
    return null;
  },

  /**
   * 6 Steps Mission Progress
   */
  async getProgress(userId = null, appId = null) {
    try {
      const params = new URLSearchParams();
      if (userId) params.append('userId', userId);
      if (appId) params.append('appId', appId);
      const url = `${API_BASE}/me/progress${params.toString() ? `?${params.toString()}` : ''}`;
      const res = await fetch(url, { 
        headers: this.getAuthHeaders(),
        signal: AbortSignal.timeout(2000) 
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API error getProgress:', e);
    }
    return null;
  },

  /**
   * Update User Tutorial Completion
   */
  async updateTutorialCompleted(userId) {
    try {
      const res = await fetch(`${API_BASE}/users/${userId}/tutorial-completed`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(2000)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API error updateTutorialCompleted:', e);
    }
    return null;
  },

  /**
   * Update User 2G Data Saver Mode
   */
  async updateDataSaver(userId, enabled) {
    try {
      const res = await fetch(`${API_BASE}/users/${userId}/data-saver`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled }),
        signal: AbortSignal.timeout(2000)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API error updateDataSaver:', e);
    }
    return null;
  },

  /**
   * Get per-user, per-page tour progress
   */
  async getUserTourProgress(userId) {
    try {
      const res = await fetch(`${API_BASE}/users/${userId}/tour-progress`, {
        signal: AbortSignal.timeout(2500)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API error getUserTourProgress:', e);
    }
    return { success: false, data: {} };
  },

  /**
   * Save per-user, per-page tour progress
   */
  async setUserTourProgress(userId, pageKey, completed = true) {
    try {
      const res = await fetch(`${API_BASE}/users/${userId}/tour-progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pageKey, completed }),
        signal: AbortSignal.timeout(2500)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API error setUserTourProgress:', e);
    }
    return { success: false, data: {} };
  },

  /**
   * Reset tour progress for a specific page or all pages
   */
  async resetUserTourProgress(userId, pageKey = null) {
    try {
      const res = await fetch(`${API_BASE}/users/${userId}/tour-progress/reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pageKey }),
        signal: AbortSignal.timeout(2500)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API error resetUserTourProgress:', e);
    }
    return { success: false, data: {} };
  },

  /**
   * Get printable slip URL
   */
  getApplicationSlipUrl(appId, type = 'acknowledgment') {
    return `${API_BASE}/applications/${appId}/slip?type=${type}`;
  }
};
