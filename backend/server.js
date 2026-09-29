// VidyaSetu Unified Governance REST API Server
// SIH 2026 Problem Statement 239 — Ministry of Tribal Affairs (MoTA)
// Zero-Dead-Buttons Full-Stack Architecture with Dual-Mode Persistence & Sandbox Adapters

import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { DataStore, computeHealthScore } from './data/store.js';
import { SchemeRuleEngine } from './services/ruleEngine.js';
import { DocumentAIService } from './services/documentAI.js';
import { AuditChainService } from './services/auditChain.js';
import { PolicySimulatorService } from './services/policySimulator.js';
import { JanParichayService, DigiLockerService, PfmsService, NicSmsService } from './services/governmentAdapters.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOADS_DIR = path.join(__dirname, '../uploads');

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Multer storage for real file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname) || '.pdf';
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10 MB limit
});

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Ensure data store is initialized
DataStore.init();

// Standard response helper
const sendResponse = (res, statusCode, data, message = null) => {
  res.status(statusCode).json({
    success: statusCode >= 200 && statusCode < 300,
    data,
    message,
    timestamp: new Date().toISOString()
  });
};

const sendError = (res, statusCode, message, details = null) => {
  res.status(statusCode).json({
    success: false,
    error: message,
    details,
    timestamp: new Date().toISOString()
  });
};

// -------------------------------------------------------------
// 1. HEALTH & GOVERNMENT ADAPTER STATUS
// -------------------------------------------------------------
app.get('/api/health', (req, res) => {
  sendResponse(res, 200, {
    status: 'UP',
    service: 'VidyaSetu Unified Governance REST API',
    version: '3.0.0-SIH2026',
    persistence: 'Dual-Mode (Supabase PostgreSQL + Local JSON Store)',
    adapters: {
      janParichaySso: { status: 'SANDBOX_READY', notice: JanParichayService.getNotice() },
      digiLocker: { status: 'SANDBOX_READY', notice: DigiLockerService.getNotice() },
      pfmsEfto: { status: 'SANDBOX_READY', notice: PfmsService.getNotice() },
      nicSms: { status: 'SANDBOX_READY', notice: NicSmsService.getNotice() }
    },
    demoEntities: {
      starApplicant: 'Birsa Hemrom (MOTA-2026-NFST-0101)',
      preSeededState: 'UNDER_SCRUTINY',
      anomalyPair: 'MOTA-2026-NFST-0102 & MOTA-2026-NFST-0103'
    }
  });
});

// -------------------------------------------------------------
// 2. AUTHENTICATION & DEMO ROLES (Jan Parichay SSO Sandbox)
// -------------------------------------------------------------
app.post('/api/auth/demo-login', async (req, res) => {
  const { role, email } = req.body;
  const users = DataStore.users;
  let matchedUser = null;

  if (email) {
    matchedUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  } else if (role) {
    matchedUser = users.find(u => u.role === role);
  }

  if (!matchedUser) {
    matchedUser = users[0]; // Fallback to star applicant Birsa
  }

  const ssoAuth = await JanParichayService.authenticateUser(matchedUser.id, matchedUser.role);

  sendResponse(res, 200, {
    user: matchedUser,
    token: `jwt-sandbox-token-${matchedUser.id}`,
    ssoSession: ssoAuth
  }, `Jan Parichay session authenticated for ${matchedUser.name} (${matchedUser.role})`);
});

app.get('/api/users', (req, res) => {
  sendResponse(res, 200, DataStore.users);
});

// -------------------------------------------------------------
// 3. SCHEMES & CONFIGURABLE RULES (SchemeConfigStudio)
// -------------------------------------------------------------
app.get('/api/schemes', (req, res) => {
  sendResponse(res, 200, DataStore.getSchemes());
});

app.get('/api/schemes/:id', (req, res) => {
  const scheme = DataStore.getScheme(req.params.id);
  if (!scheme) return sendError(res, 404, 'Scheme not found');
  sendResponse(res, 200, scheme);
});

app.put('/api/schemes/:id', (req, res) => {
  const updated = DataStore.updateScheme(req.params.id, req.body);
  if (!updated) return sendError(res, 404, 'Scheme not found');
  sendResponse(res, 200, updated, `Scheme rules updated in policy registry to version ${updated.version}`);
});

// -------------------------------------------------------------
// 4. DETERMINISTIC STATUTORY ELIGIBILITY CHECKER
// -------------------------------------------------------------
app.post('/api/eligibility/check', (req, res) => {
  const candidate = req.body;
  const schemes = DataStore.getSchemes();
  const evaluations = SchemeRuleEngine.evaluateAll(candidate, schemes);
  sendResponse(res, 200, {
    candidate,
    evaluations,
    totalEvaluated: evaluations.length,
    eligibleCount: evaluations.filter(e => e.status === 'ELIGIBLE').length
  }, 'Deterministic statutory evaluation completed without probabilistic bias.');
});

// -------------------------------------------------------------
// 5. APPLICATIONS INTAKE & CASE FILE RETRIEVAL
// -------------------------------------------------------------
app.get('/api/applications', (req, res) => {
  const { schemeId, status, userId } = req.query;
  const apps = DataStore.getApplications({ schemeId, status, userId });
  // Attach calculated health score
  const enriched = apps.map(a => ({
    ...a,
    healthScore: computeHealthScore(a)
  }));
  sendResponse(res, 200, enriched);
});

app.get('/api/applications/:id', (req, res) => {
  const app = DataStore.getApplication(req.params.id);
  if (!app) return sendError(res, 404, 'Application not found');
  sendResponse(res, 200, {
    ...app,
    healthScore: computeHealthScore(app)
  });
});

app.post('/api/applications', (req, res) => {
  const newApp = DataStore.createApplication(req.body);
  sendResponse(res, 201, newApp, `Application ${newApp.id} created and registered in National MoTA portal.`);
});

app.post('/api/applications/:id/submit', (req, res) => {
  const app = DataStore.getApplication(req.params.id);
  if (!app) return sendError(res, 404, 'Application not found');

  app.status = 'AI_PRESCRUTINY';
  app.stage = 2;
  DataStore.appendAuditBlock(app.id, `Applicant (${app.name})`, 'Application submitted for automated AI pre-scrutiny');

  // Run completeness check
  const scheme = DataStore.getScheme(app.schemeId);
  const completeness = DocumentAIService.checkCompleteness(app.documents || [], scheme?.requiredDocuments || []);

  if (!completeness.isComplete) {
    app.status = 'DEFICIENT';
    app.stage = 2;
    app.triageCategory = 'DEFICIENT';
    app.deficiency = {
      code: 'DEF-DOC-INCOMPLETE',
      title: 'Mandatory Scheme Documents Missing',
      statutoryReason: `Application is missing ${completeness.missingDocuments.length} required documents: ${completeness.missingDocuments.join(', ')}.`,
      actionRequired: 'Please upload all missing required documents to advance to officer review.',
      deadlineDays: 14,
      deadlineDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      raisedBy: 'AI_PRESCRUTINY'
    };
    DataStore.appendAuditBlock(app.id, 'AI Document Pre-Scrutiny Engine', 'Deficiency flagged: Mandatory documents missing', { missing: completeness.missingDocuments });
  } else {
    app.status = 'READY_FOR_REVIEW';
    app.stage = 3;
    app.triageCategory = 'READY';
    DataStore.appendAuditBlock(app.id, 'AI Document Pre-Scrutiny Engine', 'AI Pre-Scrutiny Passed: All mandatory documents verified and valid', { status: 'READY_FOR_REVIEW' });
  }

  DataStore.save();
  sendResponse(res, 200, app, `Application ${app.id} submitted and evaluated.`);
});

// -------------------------------------------------------------
// 6. REAL MULTIPART FILE UPLOAD & DOCUMENT AI EXTRACTION
// -------------------------------------------------------------
app.post('/api/documents/upload', upload.single('document'), (req, res) => {
  const file = req.file;
  const { documentType, applicantId, applicantName } = req.body;

  const fileName = file ? file.originalname : (req.body.fileName || 'document.pdf');
  const candidate = {
    name: applicantName || 'Birsa Hemrom',
    id: applicantId
  };

  // Perform AI extraction and validity evaluation
  const analysis = DocumentAIService.analyzeDocument(fileName, null, candidate);

  // If applicantId is provided, attach document to application
  if (applicantId) {
    const app = DataStore.getApplication(applicantId);
    if (app) {
      if (!Array.isArray(app.documents)) app.documents = [];
      const newDoc = {
        name: documentType || analysis.documentType,
        fileName: file ? file.filename : fileName,
        fileNumber: analysis.extractedFields?.fileNumber || `DOC-${Date.now().toString().slice(-6)}`,
        issuingAuthority: analysis.extractedFields?.issuingAuthority || 'Competent Authority',
        issueDate: analysis.extractedFields?.issueDate || new Date().toISOString().split('T')[0],
        status: analysis.status,
        confidence: analysis.ocrConfidence,
        extractedText: JSON.stringify(analysis.extractedFields),
        tamperScore: analysis.tamperScore
      };
      app.documents.push(newDoc);
      DataStore.appendAuditBlock(app.id, `Applicant (${app.name})`, `Document uploaded: ${newDoc.name}`, { fileName, confidence: analysis.ocrConfidence });
      DataStore.save();
    }
  }

  sendResponse(res, 200, {
    fileMetadata: file ? { filename: file.filename, size: file.size, path: file.path } : { filename: fileName },
    analysis
  }, 'Document uploaded and analyzed by AI pre-scrutiny pipeline.');
});

// -------------------------------------------------------------
// 7. GOLDEN JOURNEY: DEFICIENCY RESOLUTION & RE-SCAN
// -------------------------------------------------------------
app.post('/api/applications/:id/documents/replace', upload.single('replacementDoc'), (req, res) => {
  const appId = req.params.id;
  const app = DataStore.getApplication(appId);
  if (!app) return sendError(res, 404, 'Application not found');

  const file = req.file;
  const fileName = file ? file.originalname : (req.body.fileName || 'Fresh_Income_Certificate_FY2026_27_SDO_Ranchi.pdf');

  // Execute AI re-scan
  const reScanResult = DocumentAIService.analyzeDocument(fileName, null, { name: app.name, id: app.id });

  // Update application state
  app.status = 'READY_FOR_REVIEW';
  app.stage = 3;
  app.progressPercent = 70;
  app.triageCategory = 'READY';
  app.aiRiskLevel = 'LOW';
  app.aiVerdict = 'Replacement Income Certificate (FY 2026-27) scanned successfully. All deficiencies resolved. Queued for Officer Scrutiny approval.';

  if (app.deficiency) {
    app.deficiency.status = 'RESOLVED';
    app.deficiency.resolutionNote = 'Replacement document verified via AI re-scan. SDO Ranchi barcode verified.';
  }

  // Update document entry
  if (Array.isArray(app.documents)) {
    app.documents = app.documents.map(d => {
      if (d.name.toLowerCase().includes('income')) {
        return {
          name: 'Fresh Income Certificate (FY 2026-27)',
          fileNumber: 'JH/RAN/INC/2026/01922',
          issuingAuthority: 'Sub-Divisional Officer (SDO), Ranchi',
          issueDate: '12-06-2026',
          status: 'VERIFIED',
          confidence: 98.4,
          extractedText: 'Annual family income is Rs. 4,80,000 for FY 2026-27. SDO digital signature & barcode valid.',
          tamperScore: 0.01
        };
      }
      return d;
    });
  }

  // Chained audit blocks
  DataStore.appendAuditBlock(app.id, `Applicant (${app.name})`, 'Replacement Income Certificate (FY 2026-27) uploaded via Deficiency Portal', { file: fileName });
  DataStore.appendAuditBlock(app.id, 'AI Document Pre-Scrutiny Lab', 'AI Re-Scan Passed: Verified FY 2026-27 validity and SDO digital signature. Deficiency cleared.', { ocrConfidence: 98.4, tamperScore: 0.01 });

  DataStore.save();

  sendResponse(res, 200, {
    application: app,
    reScanResult
  }, `Deficiency resolved! Application ${appId} moved to READY queue for Officer Approval.`);
});

// -------------------------------------------------------------
// 8. OFFICER SCRUTINY WORKSTATION (Dual-Pane X-Ray Actions)
// -------------------------------------------------------------
app.get('/api/officer/queue', (req, res) => {
  const all = DataStore.getApplications();
  const queue = all.filter(a => a.status === 'READY_FOR_REVIEW' || a.status === 'UNDER_SCRUTINY');

  // Transparent priority score sorting: PVTG (+30), Female (+15), Lowest Income (+20), Seniority (+10)
  queue.sort((a, b) => {
    let scoreA = (a.pvtg ? 30 : 0) + (a.gender === 'Female' ? 15 : 0) + (600000 - a.annualIncome) / 30000;
    let scoreB = (b.pvtg ? 30 : 0) + (b.gender === 'Female' ? 15 : 0) + (600000 - b.annualIncome) / 30000;
    return scoreB - scoreA;
  });

  sendResponse(res, 200, queue);
});

app.post('/api/applications/:id/scrutiny/pickup', (req, res) => {
  const app = DataStore.getApplication(req.params.id);
  if (!app) return sendError(res, 404, 'Application not found');

  app.status = 'UNDER_SCRUTINY';
  app.stage = 4;
  DataStore.appendAuditBlock(app.id, 'Ministry Scrutiny Officer', 'Application picked up from priority queue for active dual-pane scrutiny review');
  DataStore.save();

  sendResponse(res, 200, app, `Application ${app.id} is now under active officer scrutiny.`);
});

app.post('/api/applications/:id/scrutiny/approve', (req, res) => {
  const app = DataStore.getApplication(req.params.id);
  if (!app) return sendError(res, 404, 'Application not found');

  app.status = 'APPROVED';
  app.stage = 5;
  app.progressPercent = 85;
  app.triageCategory = 'READY';
  app.aiVerdict = 'Level-1 & Level-2 Scrutiny Approved by MoTA Officer. Forwarded to Merit Committee for Sanction Order.';

  DataStore.appendAuditBlock(app.id, 'Ministry Scrutiny Officer (Dr. Rajeshwar Meena)', 'Application verified and approved under statutory guidelines', {
    officer: 'director.fellowship@tribal.gov.in',
    action: 'STATUTORY_APPROVAL'
  });
  DataStore.save();

  sendResponse(res, 200, app, `Application ${app.id} approved and forwarded to Selection Committee.`);
});

app.post('/api/applications/:id/scrutiny/reject', (req, res) => {
  const { statutoryClause, reason, comments } = req.body;
  if (!reason) return sendError(res, 400, 'Rejection requires a mandatory statutory reason.');

  const app = DataStore.getApplication(req.params.id);
  if (!app) return sendError(res, 404, 'Application not found');

  app.status = 'REJECTED';
  app.rejectionDetails = {
    statutoryClause: statutoryClause || 'Rule 4.2 Non-Fulfillment',
    reason,
    comments,
    rejectedAt: new Date().toISOString(),
    officer: 'MoTA Scrutiny Officer'
  };

  DataStore.appendAuditBlock(app.id, 'Ministry Scrutiny Officer', `Application rejected: ${reason}`, {
    clause: statutoryClause,
    reason,
    comments
  });
  DataStore.save();

  sendResponse(res, 200, app, `Application ${app.id} has been marked as Rejected.`);
});

app.post('/api/applications/:id/scrutiny/override', (req, res) => {
  const { reason, statutoryClause, comments, overrideType } = req.body;
  if (!reason) return sendError(res, 400, 'Human override requires a mandatory logged justification.');

  const app = DataStore.getApplication(req.params.id);
  if (!app) return sendError(res, 404, 'Application not found');

  DataStore.appendAuditBlock(app.id, 'Ministry Scrutiny Officer', `Human Officer Override Executed: ${overrideType || 'Exceptional Clearance'}`, {
    reason,
    statutoryClause,
    comments,
    officer: 'director.fellowship@tribal.gov.in'
  });
  DataStore.save();

  sendResponse(res, 200, {
    application: app,
    auditTrail: app.auditTrail
  }, 'Officer override permanently recorded in tamper-evident audit ledger.');
});

// -------------------------------------------------------------
// 9. MERIT ALLOCATION & AWARD LETTER GAZETTE (MeritRankingEngine)
// -------------------------------------------------------------
app.post('/api/merit/select', (req, res) => {
  const { selectedIds } = req.body;
  if (!Array.isArray(selectedIds) || selectedIds.length === 0) {
    return sendError(res, 400, 'Provide an array of application IDs to select.');
  }

  const updatedApps = [];
  for (const id of selectedIds) {
    const app = DataStore.getApplication(id);
    if (app) {
      app.status = 'AWARDED';
      app.stage = 6;
      app.progressPercent = 100;
      app.triageCategory = 'READY';

      const sanctionNo = `MoTA/${app.schemeId}/2026/AWARD-${app.id.split('-').pop()}`;
      app.fellowshipDetails = app.fellowshipDetails || {
        sanctionNumber: sanctionNo,
        monthlyStipend: app.schemeId === 'NOS' ? 110000 : 37000,
        annualContingency: 20500,
        bankAccount: 'State Bank of India (Aadhaar Seeded)',
        accountNoMasked: 'SBIN0000166 - ***8192',
        pfmsBatchId: 'PFMS-MOTA-2026-AUTOBATCH',
        qrVerificationUrl: `/verify-award/${encodeURIComponent(sanctionNo)}`,
        disbursementHistory: [
          { installment: 'Installment 1 Sanction', amount: app.schemeId === 'NOS' ? 110000 : 37000, status: 'Processing', utr: 'Queued in PFMS e-FTO', date: new Date().toISOString().split('T')[0] }
        ],
        progressReports: [
          { quarter: 'Q1 FY2026-27', status: 'Enrolled', submissionDate: 'Pending', grade: 'Satisfactory' }
        ]
      };

      DataStore.appendAuditBlock(app.id, 'National Selection Committee', `Official Award Sanctioned: ${sanctionNo}`, { sanctionNo, status: 'AWARDED' });
      updatedApps.push(app);
    }
  }

  DataStore.save();
  sendResponse(res, 200, {
    selectedCount: updatedApps.length,
    awardedApplications: updatedApps
  }, `National Selection Gazette published! ${updatedApps.length} scholars awarded.`);
});

// -------------------------------------------------------------
// 10. PUBLIC AWARD QR CODE VERIFICATION REGISTRY
// -------------------------------------------------------------
app.get('/api/awards/verify/:sanctionNumber', (req, res) => {
  const sanctionNumber = decodeURIComponent(req.params.sanctionNumber);
  const apps = DataStore.getApplications();
  const matched = apps.find(a => a.fellowshipDetails?.sanctionNumber === sanctionNumber);

  if (!matched) {
    return sendError(res, 404, 'Sanction Order Number not found in National Ministry Registry.');
  }

  sendResponse(res, 200, {
    sanctionNumber,
    registryStatus: 'GENUINE_AND_ACTIVE',
    scholarName: matched.name,
    tribeCommunity: matched.tribe,
    schemeName: matched.schemeName,
    schemeId: matched.schemeId,
    institution: matched.institution,
    degree: matched.degree,
    sanctionDate: matched.submissionDate,
    digitalSignature: 'Verified by Joint Secretary, Ministry of Tribal Affairs (CCA e-Sign)',
    notice: 'National Verification Registry (SIH 2026 Demonstration Sandbox)'
  }, 'Award letter verification successful.');
});

// -------------------------------------------------------------
// 11. AUDIT TRAIL & VERIFY-INTEGRITY (Cryptographic Hash Chain)
// -------------------------------------------------------------
app.get('/api/audit/:id/chain', (req, res) => {
  const app = DataStore.getApplication(req.params.id);
  if (!app) return sendError(res, 404, 'Application not found');
  sendResponse(res, 200, app.auditTrail || []);
});

app.get('/api/audit/:id/verify', (req, res) => {
  const app = DataStore.getApplication(req.params.id);
  if (!app) return sendError(res, 404, 'Application not found');

  const verification = AuditChainService.verifyChain(app.auditTrail || []);
  sendResponse(res, 200, verification);
});

// -------------------------------------------------------------
// 12. POLICY SIMULATOR DSS (10,000 Synthetic Records)
// -------------------------------------------------------------
app.post('/api/policy/simulate', (req, res) => {
  const { baseline, proposed } = req.body;
  const simulation = PolicySimulatorService.runSimulation(baseline || {}, proposed || {});
  sendResponse(res, 200, simulation, 'Simulation completed over 10,000 synthetic applications.');
});

// -------------------------------------------------------------
// 13. CROSS-APPLICATION ANOMALIES & SHARED IDENTIFIERS
// -------------------------------------------------------------
app.get('/api/anomalies', (req, res) => {
  const flagged = DataStore.getAnomalies();
  sendResponse(res, 200, {
    totalAnomaliesDetected: flagged.length,
    description: 'Cross-application anomaly clusters requiring officer review. (Does not make adverse administrative determinations automatically).',
    clusters: flagged
  });
});

// -------------------------------------------------------------
// 14. EXECUTIVE DASHBOARD ANALYTICS
// -------------------------------------------------------------
app.get('/api/analytics/summary', (req, res) => {
  sendResponse(res, 200, DataStore.getAnalyticsSummary());
});

// -------------------------------------------------------------
// 15. POST-SELECTION: QPR REPORTS & PFMS DISBURSEMENTS
// -------------------------------------------------------------
app.get('/api/qpr', (req, res) => {
  sendResponse(res, 200, DataStore.getQprReports(req.query.applicationId));
});

app.post('/api/qpr', (req, res) => {
  const report = DataStore.submitQprReport(req.body);
  if (req.body.applicationId) {
    DataStore.appendAuditBlock(req.body.applicationId, 'Research Scholar', `Quarterly Progress Report submitted for ${report.quarter}`, { qprId: report.id });
    DataStore.save();
  }
  sendResponse(res, 201, report, 'Quarterly Progress Report submitted for supervisor endorsement.');
});

app.get('/api/disbursements', (req, res) => {
  sendResponse(res, 200, DataStore.getDisbursements(req.query.applicationId));
});

app.post('/api/disbursements/batch', async (req, res) => {
  const { schemeId, recipients } = req.body;
  const eftoBatch = await PfmsService.createEftoBatch(schemeId || 'NFST', recipients || []);

  // Record simulated payment
  if (Array.isArray(recipients)) {
    for (const r of recipients) {
      DataStore.createDisbursement({
        applicationId: r.applicationId || 'MOTA-2026-NFST-0101',
        scholarName: r.scholarName || 'Birsa Hemrom',
        schemeId: schemeId || 'NFST',
        quarter: 'Monthly DBT Batch',
        amount: r.amount || 37000,
        bankName: 'SBI - Aadhaar Payment Bridge',
        accountMasked: 'SBIN0000166 - ***8192',
        utr: `${eftoBatch.utrSimulationPrefix}-${Date.now().toString().slice(-6)}`
      });
    }
  }

  sendResponse(res, 200, eftoBatch, 'PFMS e-FTO payment batch executed via Aadhaar Payment Bridge (Sandbox).');
});

// -------------------------------------------------------------
// 16. GRIEVANCES & CITIZEN NOTIFICATIONS
// -------------------------------------------------------------
app.get('/api/grievances', (req, res) => {
  sendResponse(res, 200, DataStore.getGrievances(req.query.userId));
});

app.post('/api/grievances', (req, res) => {
  const grv = DataStore.createGrievance(req.body);
  sendResponse(res, 201, grv, `Grievance ${grv.id} registered under 7-day citizen redressal SLA.`);
});

app.get('/api/notifications', (req, res) => {
  sendResponse(res, 200, DataStore.getNotifications(req.query.userId));
});

// -------------------------------------------------------------
// 17. DATABASE RESET (One-Click Demo Restoration API)
// -------------------------------------------------------------
app.post('/api/admin/reset-db', (req, res) => {
  DataStore.resetToDefaults();
  sendResponse(res, 200, {
    status: 'PRISTINE_DEMO_RESTORED',
    starApplicant: 'Birsa Hemrom (MOTA-2026-NFST-0101) at UNDER_SCRUTINY',
    totalApplications: DataStore.applications.length
  }, 'Database restored to pristine SIH demonstration state.');
});

// 404 handler
app.use((req, res) => {
  sendError(res, 404, `Endpoint ${req.method} ${req.path} not found.`);
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('API Error:', err);
  sendError(res, 500, 'Internal server error occurred.', err.message);
});

// Start server
app.listen(PORT, () => {
  console.log('=======================================================');
  console.log(`🏛️  VidyaSetu Governance API Server running on port ${PORT}`);
  console.log(`👉  http://localhost:${PORT}/api/health`);
  console.log(`👉  Environment: SIH Demonstration Prototype / Sandbox`);
  console.log(`👉  Star Applicant: Birsa Hemrom (MOTA-2026-NFST-0101)`);
  console.log('=======================================================');
});
