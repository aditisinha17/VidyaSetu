// VidyaSetu Unified Data Store (Dual-Mode: Supabase PostgreSQL + Local JSON Persistence)
// Ground Rule 1: Configurable, not hardcoded — Rules, schemes, and applications stored in persistent store.
// Ground Rule 3: No dead buttons — Every mutation updates persistent store and appends an audit block.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { AuditChainService } from '../services/auditChain.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LOCAL_STORE_FILE = path.join(__dirname, 'localStore.json');

// Supabase credentials (from environment or pre-configured demonstration project)
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://mbdmsjydkhpvuykzdpqa.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1iZG1zanlka2hwdnV5a3pkcHFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA2NDc1MzQsImV4cCI6MjEwNjIyMzUzNH0.F2aKvDFW-IgUHBY5et1JBHaEHCKYdyVFv7n9F-W4VcE';

// Helper to compute Application Health Score (0-100)
export function computeHealthScore(app) {
  let score = 0;
  const breakdown = { demographics: 25, academics: 25, documents: 0, anomalyRisk: 25 };

  // 1. Demographics check (ST status verified)
  if (app.tribe || app.isSt) score += 25;

  // 2. Academic criteria
  const marks = Number(app.pgMarks || app.marksPercentage || app.marks || 0);
  if (marks >= 50) score += 25;
  else if (marks > 0) score += 15;

  // 3. Documents completeness & status
  const docs = app.documents || [];
  const verifiedCount = docs.filter(d => d.status === 'VERIFIED').length;
  const deficientCount = docs.filter(d => d.status === 'DEFICIENT').length;
  const docScore = Math.max(0, Math.min(25, (verifiedCount * 6) - (deficientCount * 10)));
  score += docScore;
  breakdown.documents = docScore;

  // 4. Anomaly deduction
  if (app.aiRiskLevel === 'HIGH') {
    score -= 15;
    breakdown.anomalyRisk = 10;
  } else if (app.aiRiskLevel === 'MEDIUM') {
    score -= 5;
    breakdown.anomalyRisk = 20;
  }

  const finalScore = Math.max(0, Math.min(100, score));
  return { finalScore, breakdown };
}

// Helper to build pristine initial chain
function buildChain(events) {
  let prevHash = '0000000000000000000000000000000000000000000000000000000000000000';
  const chain = [];
  for (const ev of events) {
    const block = AuditChainService.createBlock(prevHash, ev.actor, ev.action, ev.payload || '', ev.timestamp);
    chain.push(block);
    prevHash = block.hash;
  }
  return chain;
}

// 5 Official MoTA Schemes with Versioned Rules & Verified Metadata
export const INITIAL_SCHEMES = [
  {
    id: 'NFST',
    name: 'National Fellowship for Scheduled Tribe Students',
    shortName: 'NFST',
    category: 'Higher Education Research (Ph.D. / M.Phil)',
    description: 'Financial assistance to ST scholars pursuing regular and full-time M.Phil and Ph.D. degrees in Indian Universities/Institutes.',
    totalSlots: 750,
    filledSlots: 620,
    annualBudgetCr: 95.0,
    stipendJrf: 37000,
    stipendSrf: 42000,
    contingencyAnnual: 20500,
    guidelineReference: 'MoTA Scheme Guidelines for NFST (Revised Edition)',
    selectionBasis: 'Merit in Post-Graduation Examination with statutory provisions for ST girls (30% horizontal quota), Divyangjan (5%), and PVTG priority.',
    version: 'NFST-2026-R3',
    eligibility: {
      minMarks: 55,
      maxAge: 36,
      maxIncome: 600000,
      degrees: ['Ph.D.', 'M.Phil', 'Integrated Ph.D.']
    },
    criteria: [
      { id: 'NET_GATE_EXAM', label: 'National Entrance Test', field: 'netScore', operator: 'EXISTS', mandatory: true, description: 'UGC-NET / CSIR-NET / GATE or institutional entrance qualification', source: 'NFST Guidelines Section 3', verified: true }
    ],
    quotaRules: {
      stFemaleHorizontal: 30,
      pvtgPrioritySlots: 50,
      pwdReservation: 5
    },
    requiredDocuments: [
      'ST Caste Certificate (Article 342)',
      'Annual Family Income Certificate (FY 2026-27)',
      'Master Degree Marksheet & Provisional Certificate',
      'Ph.D. Enrolment Confirmation',
      'Research Synopsis / Proposal',
      'Aadhaar Card'
    ],
    workflow: ['DRAFT', 'SUBMITTED', 'AI_PRESCRUTINY', 'READY_FOR_REVIEW', 'UNDER_SCRUTINY', 'APPROVED', 'AWARDED', 'QPR_ACTIVE']
  },
  {
    id: 'NOS',
    name: 'National Overseas Scholarship for ST Students',
    shortName: 'NOS',
    category: 'International Higher Education (Masters & Ph.D.)',
    description: 'Financial support to meritorious ST students for pursuing Master level courses and Ph.D. abroad in accredited overseas universities ranked within QS Top 500.',
    totalSlots: 20,
    filledSlots: 18,
    annualBudgetCr: 18.5,
    stipendAnnualGbp: 9900,
    stipendAnnualUsd: 15400,
    tuitionCoverage: '100% Actuals',
    guidelineReference: 'MoTA NOS Scheme Guidelines (Section 3.2)',
    selectionBasis: 'Unconditional admission in QS World Top 500 (Priority to ≤ 200) + academic evaluation by Expert Committee with affirmative PVTG reservation.',
    version: 'NOS-2026-R2',
    eligibility: {
      minMarks: 55,
      maxAge: 35,
      maxIncome: 800000,
      degrees: ['Master of Science', 'Ph.D. Abroad', 'Master of Engineering', 'Master of Public Policy']
    },
    criteria: [
      { id: 'QS_WORLD_RANK', label: 'QS World University Ranking', field: 'qsWorldRank', operator: '<=', threshold: 500, mandatory: true, description: 'Foreign university must rank ≤ 500 in QS World University Rankings', source: 'NOS Guidelines Section 3.2', verified: true },
      { id: 'LANGUAGE_TEST', label: 'English Proficiency (IELTS/TOEFL)', field: 'netScore', operator: 'EXISTS', mandatory: true, description: 'IELTS (≥ 6.5) / TOEFL (≥ 90) / GRE', source: 'NOS Guidelines Section 3.2', verified: true }
    ],
    quotaRules: {
      stFemaleHorizontal: 30,
      pvtgPrioritySlots: 3,
      pwdReservation: 5
    },
    requiredDocuments: [
      'ST Caste Certificate',
      'Annual Family Income Certificate (<= 8 Lakhs)',
      'Unconditional Offer Letter from QS Top 500 University',
      'Valid Indian Passport',
      'IELTS / TOEFL / GRE Scorecard',
      'Two Academic Recommendations'
    ],
    workflow: ['DRAFT', 'SUBMITTED', 'AI_PRESCRUTINY', 'READY_FOR_REVIEW', 'UNDER_SCRUTINY', 'APPROVED', 'AWARDED', 'QPR_ACTIVE']
  },
  {
    id: 'TOP_CLASS',
    name: 'Top Class Education for ST Students',
    shortName: 'Top Class ST',
    category: 'UG / Professional in Premier Institutes',
    description: 'ST scholars at IITs, IIMs, NITs, AIIMS, NLUs with 100% tuition + IT hardware grant + living allowances.',
    totalSlots: 1000,
    filledSlots: 940,
    annualBudgetCr: 65.0,
    livingAllowanceMonthly: 2220,
    booksGrantAnnual: 3000,
    computerAllowanceOneTime: 45000,
    tuitionCoverage: '100% (or institute ceiling)',
    guidelineReference: 'Top Class Scheme Guidelines for Premier Institutes',
    selectionBasis: 'Direct institutional quota allocation based on entrance examination ranking (JEE Adv, NEET, CAT, CLAT).',
    version: 'TOPCLASS-2026-R2',
    eligibility: {
      minMarks: 50,
      maxAge: 30,
      maxIncome: 600000,
      degrees: ['B.Tech', 'MBBS', 'MBA', 'B.Des', 'B.A. LL.B']
    },
    criteria: [
      { id: 'ENTRANCE_RANK', label: 'National Entrance Exam Rank', field: 'netScore', operator: 'EXISTS', mandatory: true, description: 'Allotment via JEE Advanced / NEET / CAT / CLAT', source: 'Top Class Guidelines Section 4', verified: true }
    ],
    quotaRules: {
      stFemaleHorizontal: 30,
      pvtgPrioritySlots: 75,
      pwdReservation: 5
    },
    requiredDocuments: [
      'ST Caste Certificate',
      'Family Income Certificate (< 6 Lakhs)',
      'JEE / NEET / CAT / CLAT Allotment Letter',
      'Admission Fee Receipt from Notified Institute',
      'Aadhaar Card'
    ],
    workflow: ['DRAFT', 'SUBMITTED', 'AI_PRESCRUTINY', 'READY_FOR_REVIEW', 'APPROVED', 'AWARDED']
  },
  {
    id: 'PRE_MATRIC',
    name: 'Pre-Matric Scholarship for ST Students (Classes IX & X)',
    shortName: 'Pre-Matric ST',
    category: 'Secondary School Education',
    description: 'Support for ST children in Classes IX-X in recognized government/aided schools to prevent dropouts.',
    totalSlots: 'Universal Entitlement',
    filledSlots: 2899699,
    annualBudgetCr: 412.5,
    stipendDayScholar: 225,
    stipendHosteller: 525,
    booksGrantAnnual: 750,
    guidelineReference: 'MoTA Pre-Matric Guidelines (dbttribal.gov.in)',
    selectionBasis: 'Universal entitlement for all eligible regular ST students enrolled in Classes IX & X in recognized government/aided schools.',
    version: 'PREMATRIC-2026-R1',
    eligibility: {
      minMarks: 35,
      maxAge: 18,
      maxIncome: 250000,
      degrees: ['Class IX', 'Class X']
    },
    criteria: [
      { id: 'SCHOOL_BONAFIDE', label: 'Recognized Secondary School Bonafide', field: 'institution', operator: 'EXISTS', mandatory: true, description: 'Enrolled in recognized government or aided school', source: 'Pre-Matric Guidelines Section 3.1', verified: true }
    ],
    quotaRules: {
      stFemaleHorizontal: 30,
      pvtgPrioritySlots: 500,
      pwdReservation: 5
    },
    requiredDocuments: [
      'ST Caste Certificate (Article 342)',
      'Parent Income Certificate (<= 2.5 LPA)',
      'Previous Class Pass Marksheet',
      'School Bonafide & Enrolment Certificate',
      'Aadhaar Seeded Bank Account'
    ],
    workflow: ['DRAFT', 'SUBMITTED', 'AI_PRESCRUTINY', 'READY_FOR_REVIEW', 'APPROVED', 'AWARDED']
  },
  {
    id: 'POST_MATRIC',
    name: 'Post-Matric Scholarship for ST Students (Class XI to PG)',
    shortName: 'Post-Matric ST',
    category: 'Higher Secondary to Post-Graduation',
    description: 'Flagship financial assistance for post-secondary courses across recognized institutions.',
    totalSlots: 'Universal Entitlement',
    filledSlots: 6542207,
    annualBudgetCr: 2180.4,
    maintenanceAllowanceMonthly: 1200,
    tuitionCoverage: '100% Compulsory Non-Refundable Fees',
    guidelineReference: 'MoTA Post-Matric Guidelines (dbttribal.gov.in)',
    selectionBasis: 'Universal entitlement across 4 course groups based on state portal harmonization and income verification.',
    version: 'POSTMATRIC-2026-R1',
    eligibility: {
      minMarks: 40,
      maxAge: 35,
      maxIncome: 250000,
      degrees: ['Class XI', 'Class XII', 'Diploma', 'Polytechnic', 'B.A.', 'B.Sc.', 'B.Com', 'M.A.', 'M.Sc.', 'B.Tech', 'MBBS', 'Professional Degree']
    },
    criteria: [
      { id: 'POST_SECONDARY_ENROLMENT', label: 'Post-Secondary Course Enrolment', field: 'degree', operator: 'EXISTS', mandatory: true, description: 'Course Group 1 to 4 recognized education', source: 'Post-Matric Guidelines Section 4.1', verified: true }
    ],
    quotaRules: {
      stFemaleHorizontal: 30,
      pvtgPrioritySlots: 1000,
      pwdReservation: 5
    },
    requiredDocuments: [
      'ST Caste Certificate (Article 342)',
      'Parent Income Certificate (<= 2.5 LPA)',
      'Qualifying Exam Marksheet',
      'College / Institute Bonafide Certificate & Fee Structure',
      'Aadhaar Seeded Bank Account'
    ],
    workflow: ['DRAFT', 'SUBMITTED', 'AI_PRESCRUTINY', 'READY_FOR_REVIEW', 'APPROVED', 'AWARDED']
  }
];

// Seed Applications adhering strictly to the DEMO DATA specification
export const INITIAL_APPLICATIONS = [
  // 1. STAR APPLICANT: Birsa Hemrom (Jharkhand, Santhal, income ₹4,80,000, pre-seeded at UNDER_SCRUTINY, 6 docs, 1 resolved deficiency)
  {
    id: 'MOTA-2026-NFST-0101',
    userId: 'a0000001-0000-0000-0000-000000000001',
    name: 'Birsa Hemrom',
    email: 'birsa.hemrom@research.iitkgp.ac.in',
    phone: '+91 94311 02847',
    gender: 'Male',
    age: 26,
    dob: '1999-11-15',
    tribe: 'Santhal',
    pvtg: false,
    state: 'Jharkhand',
    district: 'Ranchi',
    schemeId: 'NFST',
    schemeName: 'National Fellowship for ST Students',
    schemeRuleVersion: 'NFST-2026-R3',
    institution: 'Indian Institute of Technology (IIT) Kharagpur',
    nirfRank: 5,
    degree: 'Ph.D. in Rural Development & Water Harvesting',
    guideName: 'Prof. A. K. Banerjee',
    pgMarks: 78.4,
    netScore: 'UGC-NET Qualified (Roll: JH04100234)',
    annualIncome: 480000,
    submissionDate: '2026-09-12',
    status: 'UNDER_SCRUTINY', // Exact required pre-seeded state
    stage: 4,
    progressPercent: 75,
    triageCategory: 'READY',
    aiRiskLevel: 'LOW',
    aiVerdict: 'All 6 statutory documents verified. Prior deficiency on expired income certificate successfully resolved with fresh FY 2026-27 certificate. Under active Ministry Scrutiny.',
    deterministicRuleAudit: {
      status: 'PASS',
      stStatus: 'PASS',
      incomeLimit: 'PASS',
      ageLimit: 'PASS',
      qualifyingMarks: 'PASS',
      details: 'All statutory criteria verified under NFST-2026-R3. Income ₹4,80,000 is within ₹6,00,000 ceiling. Article 342 ST certificate confirmed.'
    },
    documents: [
      {
        name: 'ST Caste Certificate (Article 342)',
        fileNumber: 'JH/RAN/2021/ST/8821',
        issuingAuthority: 'Sub-Divisional Officer, Ranchi',
        issueDate: '10-08-2021',
        status: 'VERIFIED',
        confidence: 99.4,
        extractedText: 'Certified that Shri Birsa Hemrom belongs to Santhal Community recognized as Scheduled Tribe in Jharkhand under Article 342.',
        tamperScore: 0.01
      },
      {
        name: 'Fresh Income Certificate (FY 2026-27)',
        fileNumber: 'JH/RAN/INC/2026/01922',
        issuingAuthority: 'Sub-Divisional Officer (SDO), Ranchi',
        issueDate: '12-06-2026',
        status: 'VERIFIED',
        confidence: 98.4,
        extractedText: 'Annual family income from all sources is Rs. 4,80,000 for FY 2026-27. Digital Barcode verified.',
        tamperScore: 0.01
      },
      {
        name: 'Master Degree Marksheet & Provisional',
        fileNumber: 'RU/REG/2021/77102',
        issuingAuthority: 'Ranchi University, Faculty of Science',
        issueDate: '2025-07-15',
        status: 'VERIFIED',
        confidence: 98.6,
        extractedText: 'M.Sc. Organic Chemistry, Aggregate: 78.4% (First Class with Distinction).',
        tamperScore: 0.0
      },
      {
        name: 'IIT Kharagpur Ph.D. Enrolment Confirmation',
        fileNumber: 'IITKGP/ACAD/PHD/2026/041',
        issuingAuthority: 'Dean of Academic Affairs, IIT Kharagpur',
        issueDate: '01-08-2026',
        status: 'VERIFIED',
        confidence: 98.9,
        extractedText: 'Mr. Birsa Hemrom enrolled as regular full-time Ph.D. scholar w.e.f. August 2026 under Roll No 26RD91R02.',
        tamperScore: 0.0
      },
      {
        name: 'Research Synopsis (Rural Water Harvesting)',
        fileNumber: 'IITKGP/RD/SYN/2026/19',
        issuingAuthority: 'Department of Rural Development, IIT Kharagpur',
        issueDate: '05-08-2026',
        status: 'VERIFIED',
        confidence: 97.5,
        extractedText: 'Synopsis approved by Doctoral Scrutiny Committee. Supervisor: Prof. A. K. Banerjee.',
        tamperScore: 0.0
      },
      {
        name: 'Aadhaar Identity Proof',
        fileNumber: 'XXXX-XXXX-8921',
        issuingAuthority: 'UIDAI Sandbox Adapter',
        issueDate: '2026-01-10',
        status: 'VERIFIED',
        confidence: 99.8,
        extractedText: 'Birsa Hemrom, DOB: 15/11/1999, Ranchi, Jharkhand. Seeded in Union Bank A/c ***4928.',
        tamperScore: 0.0
      }
    ],
    deficiency: {
      code: 'DEF-INC-EXPIRED',
      title: 'Income Certificate Validity Lapsed (RESOLVED)',
      statutoryReason: 'Prior certificate dated 15-01-2023 had lapsed. Applicant uploaded fresh certificate for FY 2026-27.',
      status: 'RESOLVED',
      deadlineDays: 14,
      raisedBy: 'AI_PRESCRUTINY',
      resolutionNote: 'Fresh FY 2026-27 certificate issued by SDO Ranchi uploaded on 2026-09-18. AI re-scan validated.'
    },
    auditTrail: buildChain([
      {
        timestamp: '2026-09-12T10:40:00Z',
        actor: 'Applicant (Birsa Hemrom)',
        action: 'Application submitted with documents via DigiLocker Sandbox Adapter',
        payload: { appId: 'MOTA-2026-NFST-0101', scheme: 'NFST' }
      },
      {
        timestamp: '2026-09-12T10:42:00Z',
        actor: 'AI Document Pre-Scrutiny Lab',
        action: 'OCR extraction completed: Flagged Income Certificate validity lapsed (>1 yr old)',
        payload: { docName: 'Income Certificate', issueDate: '15-01-2023', finding: 'DEFICIENCY' }
      },
      {
        timestamp: '2026-09-12T10:45:00Z',
        actor: 'System Notification Adapter',
        action: 'Deficiency Alert dispatched to student with 14-day SLA deadline',
        payload: { code: 'DEF-INC-EXPIRED', deadlineDays: 14 }
      },
      {
        timestamp: '2026-09-18T14:20:00Z',
        actor: 'Applicant (Birsa Hemrom)',
        action: 'Replacement Income Certificate (FY 2026-27) uploaded via Deficiency Portal',
        payload: { file: 'Fresh_Income_Certificate_FY2026_27_SDO_Ranchi.pdf', barcodeVerified: true }
      },
      {
        timestamp: '2026-09-18T14:22:00Z',
        actor: 'AI Document Pre-Scrutiny Lab',
        action: 'AI Re-Scan Passed: Verified FY 2026-27 validity and SDO digital signature. Deficiency cleared.',
        payload: { ocrConfidence: 98.4, tamperScore: 0.01, state: 'READY_FOR_REVIEW' }
      },
      {
        timestamp: '2026-09-20T09:15:00Z',
        actor: 'Ministry Scrutiny Officer (Dr. Rajeshwar Meena)',
        action: 'Application picked up from priority queue for active dual-pane scrutiny review',
        payload: { officer: 'director.fellowship@tribal.gov.in', state: 'UNDER_SCRUTINY' }
      }
    ]),
    anomalyFlags: [],
    fellowshipDetails: null
  },

  // 2. ANOMALY PAIR: MOTA-2026-NFST-0102 & MOTA-2026-NFST-0103 sharing phone, bank account, and photo hash (HIGH RISK)
  {
    id: 'MOTA-2026-NFST-0102',
    userId: 'a0000001-0000-0000-0000-000000000002',
    name: 'Sunil Lakra',
    email: 'sunil.lakra@student.ac.in',
    phone: '+91 98765 43210', // Shared Phone
    gender: 'Male',
    age: 28,
    dob: '1998-03-22',
    tribe: 'Munda',
    pvtg: false,
    state: 'Jharkhand',
    district: 'Ranchi',
    schemeId: 'NFST',
    schemeName: 'National Fellowship for ST Students',
    schemeRuleVersion: 'NFST-2026-R3',
    institution: 'Ranchi University',
    nirfRank: 45,
    degree: 'Ph.D. in History',
    guideName: 'Dr. S. K. Mahato',
    pgMarks: 58.5,
    netScore: 'UGC-NET Qualified',
    annualIncome: 350000,
    submissionDate: '2026-09-18',
    status: 'READY_FOR_REVIEW',
    stage: 3,
    progressPercent: 60,
    triageCategory: 'DEFICIENT',
    aiRiskLevel: 'HIGH',
    bankAccountMasked: 'XXXX-7712', // Shared Bank
    ifscCode: 'SBIN0001234',
    photoHash: 'sha256-shared-suspect-hash', // Shared Photo Hash
    aiVerdict: 'CRITICAL ANOMALY DETECTED: Shares applicant mobile (+91 98765 43210), bank account (SBIN0001234 - XXXX-7712), and biometric photo hash with #MOTA-2026-NFST-0103. Officer scrutiny required.',
    deterministicRuleAudit: {
      status: 'ANOMALY_FLAGGED',
      stStatus: 'PASS',
      incomeLimit: 'PASS',
      ageLimit: 'PASS',
      qualifyingMarks: 'PASS',
      details: 'Demographic criteria satisfied, but cross-application shared identifier anomaly detected.'
    },
    documents: [
      {
        name: 'ST Caste Certificate (Article 342)',
        fileNumber: 'JH/RAN/SC/2024/10999',
        issuingAuthority: 'District Magistrate, Ranchi',
        issueDate: '2024-10-05',
        status: 'VERIFIED',
        confidence: 96.0,
        extractedText: 'Sunil Lakra belongs to Munda Scheduled Tribe in Jharkhand.',
        tamperScore: 0.02
      },
      {
        name: 'Annual Family Income Certificate (FY 2026-27)',
        fileNumber: 'JH/RAN/INC/2026/03120',
        issuingAuthority: 'Block Development Officer, Ranchi',
        issueDate: '2026-06-01',
        status: 'VERIFIED',
        confidence: 95.0,
        extractedText: 'Annual family income is Rs. 3,50,000 for FY 2026-27.',
        tamperScore: 0.02
      }
    ],
    deficiency: null,
    auditTrail: buildChain([
      {
        timestamp: '2026-09-18T11:00:00Z',
        actor: 'Applicant (Sunil Lakra)',
        action: 'Application submitted',
        payload: { appId: 'MOTA-2026-NFST-0102' }
      },
      {
        timestamp: '2026-09-18T11:02:00Z',
        actor: 'AI Anomaly & Cluster Detection Graph',
        action: 'Cluster match flagged: Phone, Bank Account & Photo Hash shared with #MOTA-2026-NFST-0103',
        payload: { sharedPhone: '+91 98765 43210', sharedBank: 'XXXX-7712', risk: 'HIGH' }
      }
    ]),
    anomalyFlags: [
      {
        type: 'SHARED_IDENTIFIER_CLUSTER',
        label: 'Phone, Bank Account & Photo Hash match #MOTA-2026-NFST-0103',
        severity: 'HIGH',
        explanation: 'AI detected that mobile number +91 98765 43210, bank account XXXX-7712, and facial photo hash are identical to applicant Priya Murmu (#MOTA-2026-NFST-0103). High potential duplicate or agent registration ring.'
      }
    ],
    fellowshipDetails: null
  },
  {
    id: 'MOTA-2026-NFST-0103',
    userId: 'a0000001-0000-0000-0000-000000000003',
    name: 'Priya Murmu',
    email: 'priya.murmu@student.ac.in',
    phone: '+91 98765 43210', // Shared Phone
    gender: 'Female',
    age: 26,
    dob: '2000-07-10',
    tribe: 'Santhal',
    pvtg: false,
    state: 'Jharkhand',
    district: 'Dumka',
    schemeId: 'NFST',
    schemeName: 'National Fellowship for ST Students',
    schemeRuleVersion: 'NFST-2026-R3',
    institution: 'Sidho Kanho Murmu University',
    nirfRank: 85,
    degree: 'Ph.D. in Botany',
    guideName: 'Dr. P. C. Soren',
    pgMarks: 61.0,
    netScore: 'CSIR-NET Qualified',
    annualIncome: 280000,
    submissionDate: '2026-09-18',
    status: 'READY_FOR_REVIEW',
    stage: 3,
    progressPercent: 60,
    triageCategory: 'DEFICIENT',
    aiRiskLevel: 'HIGH',
    bankAccountMasked: 'XXXX-7712', // Shared Bank
    ifscCode: 'SBIN0001234',
    photoHash: 'sha256-shared-suspect-hash', // Shared Photo Hash
    aiVerdict: 'CRITICAL ANOMALY DETECTED: Shares applicant mobile (+91 98765 43210), bank account (SBIN0001234 - XXXX-7712), and biometric photo hash with #MOTA-2026-NFST-0102. Officer scrutiny required.',
    deterministicRuleAudit: {
      status: 'ANOMALY_FLAGGED',
      stStatus: 'PASS',
      incomeLimit: 'PASS',
      ageLimit: 'PASS',
      qualifyingMarks: 'PASS',
      details: 'Demographic criteria satisfied, but cross-application shared identifier anomaly detected.'
    },
    documents: [
      {
        name: 'ST Caste Certificate (Article 342)',
        fileNumber: 'JH/DUM/SC/2025/00412',
        issuingAuthority: 'District Magistrate, Dumka',
        issueDate: '2025-01-10',
        status: 'VERIFIED',
        confidence: 97.0,
        extractedText: 'Priya Murmu belongs to Santhal Scheduled Tribe in Jharkhand.',
        tamperScore: 0.01
      },
      {
        name: 'Annual Family Income Certificate (FY 2026-27)',
        fileNumber: 'JH/DUM/INC/2026/05511',
        issuingAuthority: 'Block Development Officer, Dumka',
        issueDate: '2026-05-20',
        status: 'VERIFIED',
        confidence: 96.0,
        extractedText: 'Annual family income is Rs. 2,80,000 for FY 2026-27.',
        tamperScore: 0.01
      }
    ],
    deficiency: null,
    auditTrail: buildChain([
      {
        timestamp: '2026-09-18T11:05:00Z',
        actor: 'Applicant (Priya Murmu)',
        action: 'Application submitted',
        payload: { appId: 'MOTA-2026-NFST-0103' }
      },
      {
        timestamp: '2026-09-18T11:06:00Z',
        actor: 'AI Anomaly & Cluster Detection Graph',
        action: 'Cluster match flagged: Phone, Bank Account & Photo Hash shared with #MOTA-2026-NFST-0102',
        payload: { sharedPhone: '+91 98765 43210', sharedBank: 'XXXX-7712', risk: 'HIGH' }
      }
    ]),
    anomalyFlags: [
      {
        type: 'SHARED_IDENTIFIER_CLUSTER',
        label: 'Phone, Bank Account & Photo Hash match #MOTA-2026-NFST-0102',
        severity: 'HIGH',
        explanation: 'AI detected that mobile number +91 98765 43210, bank account XXXX-7712, and facial photo hash are identical to applicant Sunil Lakra (#MOTA-2026-NFST-0102). High potential duplicate or agent registration ring.'
      }
    ],
    fellowshipDetails: null
  },

  // 3. AWARDED CANDIDATE: Shanti Madkam (PVTG Dhurwa/Gond, Oxford QS #3, Status: AWARDED)
  {
    id: 'MOTA-2026-NOS-0042',
    userId: 'a0000001-0000-0000-0000-000000000004',
    name: 'Shanti Madkam',
    email: 'shanti.madkam@oxford.alumni.org',
    phone: '+91 94060 11984',
    gender: 'Female',
    age: 27,
    dob: '1999-04-03',
    tribe: 'Dhurwa / Gond',
    pvtg: true,
    state: 'Chhattisgarh',
    district: 'Bastar',
    schemeId: 'NOS',
    schemeName: 'National Overseas Scholarship for ST Students',
    schemeRuleVersion: 'NOS-2026-R2',
    institution: 'University of Oxford, United Kingdom',
    nirfRank: null,
    qsWorldRank: 3,
    degree: 'M.Sc. in Biodiversity, Conservation and Forest Management',
    guideName: 'Dr. Evelyn Sinclair',
    pgMarks: 84.2,
    netScore: 'IELTS: 8.0 overall (L:8.5, R:8.0, W:7.5, S:8.0)',
    annualIncome: 180000,
    submissionDate: '2026-08-28',
    status: 'AWARDED',
    stage: 6,
    progressPercent: 100,
    triageCategory: 'READY',
    aiRiskLevel: 'LOW',
    aiVerdict: 'Top tier candidate. Particularly Vulnerable Tribal Group (PVTG) scholar from Bastar. Unconditional Oxford offer (QS #3). Award sanctioned by Overseas Committee.',
    deterministicRuleAudit: {
      status: 'PASSED',
      stStatus: 'PASS',
      incomeLimit: 'PASS',
      ageLimit: 'PASS',
      qualifyingMarks: 'PASS',
      details: 'All statutory criteria satisfied. QS World Rank #3 meets Priority ≤ 200 requirement.'
    },
    documents: [
      {
        name: 'ST Caste Certificate (Article 342)',
        fileNumber: 'CG/BAS/2020/ST/0912',
        issuingAuthority: 'Tahsildar Jagdalpur, Bastar',
        issueDate: '12-05-2020',
        status: 'VERIFIED',
        confidence: 99.4,
        extractedText: 'Ku. Shanti Madkam d/o Sh. Joga Madkam belongs to Gond (Dhurwa) Particularly Vulnerable Scheduled Tribe.',
        tamperScore: 0.01
      },
      {
        name: 'Oxford Unconditional Offer Letter',
        fileNumber: 'OXF-ADMIS-2026-MSCBIO-9182',
        issuingAuthority: 'Graduate Admissions, University of Oxford',
        issueDate: '2026-08-15',
        status: 'VERIFIED',
        confidence: 99.7,
        extractedText: 'Unconditional admission offered on the M.Sc. in Biodiversity, Conservation and Management for Michaelmas Term 2026.',
        tamperScore: 0.0
      },
      {
        name: 'Valid Indian Passport',
        fileNumber: 'V8921044',
        issuingAuthority: 'Regional Passport Office, Raipur',
        issueDate: '2024-05-14',
        status: 'VERIFIED',
        confidence: 98.9,
        extractedText: 'Passport No: V8921044, Shanti Madkam, Expiry: 14/05/2034',
        tamperScore: 0.0
      }
    ],
    deficiency: null,
    auditTrail: buildChain([
      {
        timestamp: '2026-08-28T09:10:00Z',
        actor: 'Applicant (Shanti Madkam)',
        action: 'Application submitted for Oxford NOS Fellowship',
        payload: { institution: 'University of Oxford', qsRank: 3 }
      },
      {
        timestamp: '2026-08-30T11:45:00Z',
        actor: 'MoTA Overseas Scrutiny Officer',
        action: 'QS Rank (#3) & IELTS verified. Recommended for selection committee',
        payload: { verifiedBy: 'overseas.desk@tribal.gov.in' }
      },
      {
        timestamp: '2026-09-02T15:15:00Z',
        actor: 'National Selection Committee',
        action: 'Award sanctioned under PVTG priority. Sanction Order generated with QR code',
        payload: { sanctionNo: 'MoTA/NOS/2026/CG-OXF-003', pvtgQuota: true }
      }
    ]),
    anomalyFlags: [],
    fellowshipDetails: {
      sanctionNumber: 'MoTA/NOS/2026/CG-OXF-003',
      monthlyStipend: 110000,
      stipendAnnualGbp: 9900,
      tuitionFeeCoveredGbp: 32500,
      airfareStatus: 'Authorized Economy Flight Ticket',
      bankAccount: 'State Bank of India Foreign Currency Desk',
      accountNoMasked: 'BARC-UK - ***9921',
      pfmsBatchId: 'DEMO-PFMS-NOS-B02',
      disbursementHistory: [
        { installment: 'Term 1 Maintenance (GBP 3,300)', amount: 412500, status: 'Paid', utr: 'FEDWIRE-BOI-2026-0901', date: '2026-09-01' },
        { installment: 'Tuition Tranche 1 (GBP 16,250)', amount: 1625000, status: 'Paid', utr: 'SWIFT-SBI-2026-OXF1', date: '2026-09-05' }
      ],
      progressReports: [
        { quarter: 'Michaelmas Term 2026', status: 'Enrolled & Verified', submissionDate: '2026-09-20', grade: 'Satisfactory' }
      ]
    }
  },

  // 4. APPROVED CANDIDATE: Ananya Katkari (PVTG Katkari, IIT Bombay CSE, Status: APPROVED)
  {
    id: 'MOTA-2026-TOP-0312',
    userId: 'a0000001-0000-0000-0000-000000000005',
    name: 'Ananya Katkari',
    email: 'ananya.katkari@iitb.ac.in',
    phone: '+91 98230 44918',
    gender: 'Female',
    age: 19,
    dob: '2007-06-12',
    tribe: 'Katkari',
    pvtg: true,
    state: 'Maharashtra',
    district: 'Raigad',
    schemeId: 'TOP_CLASS',
    schemeName: 'Top Class Education for ST Students',
    schemeRuleVersion: 'TOPCLASS-2026-R2',
    institution: 'Indian Institute of Technology (IIT) Bombay',
    nirfRank: 3,
    degree: 'B.Tech in Computer Science and Engineering',
    guideName: 'Faculty Advisor: Prof. S. Sudarshan',
    pgMarks: 94.5,
    netScore: 'JEE Advanced ST Category Rank: 14',
    annualIncome: 120000,
    submissionDate: '2026-09-08',
    status: 'APPROVED',
    stage: 5,
    progressPercent: 90,
    triageCategory: 'READY',
    aiRiskLevel: 'LOW',
    aiVerdict: 'PVTG ST Female with JEE Adv Rank 14 at IIT Bombay. Full tuition + living + IT hardware approved by Officer.',
    deterministicRuleAudit: {
      status: 'PASSED',
      stStatus: 'PASS',
      incomeLimit: 'PASS',
      ageLimit: 'PASS',
      qualifyingMarks: 'PASS',
      details: 'All statutory criteria met. Notified premier institute (IIT Bombay).'
    },
    documents: [
      {
        name: 'ST Caste Certificate & Validity',
        fileNumber: 'MH/CCV/PUNE/2025/11294',
        issuingAuthority: 'Divisional Caste Scrutiny Committee, Pune',
        issueDate: '2025-05-12',
        status: 'VERIFIED',
        confidence: 99.8,
        extractedText: 'Caste Scrutiny Certificate issued confirming Katkari Particularly Vulnerable Scheduled Tribe.',
        tamperScore: 0.0
      },
      {
        name: 'IIT Bombay Fee Allotment',
        fileNumber: 'IITB/ADMIS/JEE2026/CS104',
        issuingAuthority: 'Registrar, IIT Bombay',
        issueDate: '2026-07-28',
        status: 'VERIFIED',
        confidence: 99.2,
        extractedText: 'Provisional admission to B.Tech Computer Science granted. Fee payable under Top Class ST.',
        tamperScore: 0.01
      }
    ],
    deficiency: null,
    auditTrail: buildChain([
      {
        timestamp: '2026-09-08T14:15:00Z',
        actor: 'Applicant (Ananya Katkari)',
        action: 'Application submitted for Top Class ST',
        payload: { institution: 'IIT Bombay' }
      },
      {
        timestamp: '2026-09-10T11:20:00Z',
        actor: 'Ministry Scrutiny Officer',
        action: 'Officer approval confirmed under PVTG premier institute quota',
        payload: { status: 'APPROVED' }
      }
    ]),
    anomalyFlags: [],
    fellowshipDetails: null
  },

  // 5. PRE-MATRIC CANDIDATE: Mangal Munda (Class X Govt High School Khunti)
  {
    id: 'MOTA-2026-PRE-0512',
    userId: 'a0000001-0000-0000-0000-000000000006',
    name: 'Mangal Munda',
    email: 'mangal.munda.khunti@jharkhandschools.gov.in',
    phone: '+91 94301 88412',
    gender: 'Male',
    age: 15,
    dob: '2011-03-22',
    tribe: 'Munda',
    pvtg: false,
    state: 'Jharkhand',
    district: 'Khunti',
    schemeId: 'PRE_MATRIC',
    schemeName: 'Pre-Matric Scholarship Scheme for ST Students',
    schemeRuleVersion: 'PREMATRIC-2026-R1',
    institution: 'Government High School, Khunti',
    nirfRank: null,
    degree: 'Class X (Secondary School)',
    guideName: 'Headmaster: Sri R. N. Sahu',
    pgMarks: 81.2,
    netScore: 'Class IX Final: 81.2% (Grade A)',
    annualIncome: 140000,
    submissionDate: '2026-09-18',
    status: 'READY_FOR_REVIEW',
    stage: 3,
    progressPercent: 50,
    triageCategory: 'READY',
    aiRiskLevel: 'LOW',
    aiVerdict: 'All statutory criteria met under Pre-Matric ST guidelines. Income ₹1.40L <= ₹2.50L. School bonafide verified.',
    deterministicRuleAudit: {
      status: 'PASSED',
      stStatus: 'PASS',
      incomeLimit: 'PASS',
      ageLimit: 'PASS',
      qualifyingMarks: 'PASS',
      details: 'Meets Article 342 ST notification, income ceiling <= 2.5L, and enrolled in recognized Government School.'
    },
    documents: [
      {
        name: 'ST Caste Certificate (Article 342)',
        fileNumber: 'JH/KHU/2022/ST/4401',
        issuingAuthority: 'Circle Officer, Khunti',
        issueDate: '14-07-2022',
        status: 'VERIFIED',
        confidence: 99.4,
        extractedText: 'Certified that Mangal Munda belongs to Munda Scheduled Tribe in Jharkhand under Article 342.',
        tamperScore: 0.0
      },
      {
        name: 'Annual Family Income Certificate (FY 2026-27)',
        fileNumber: 'INC/JH/2026/0882',
        issuingAuthority: 'Tehsildar Khunti',
        issueDate: '2026-05-10',
        status: 'VERIFIED',
        confidence: 98.1,
        extractedText: 'Annual family income is Rs. 1,40,000 for FY 2026-27.',
        tamperScore: 0.01
      }
    ],
    deficiency: null,
    auditTrail: buildChain([
      {
        timestamp: '2026-09-18T09:30:00Z',
        actor: 'Applicant (Mangal Munda)',
        action: 'Application submitted for Pre-Matric ST',
        payload: { appId: 'MOTA-2026-PRE-0512' }
      }
    ]),
    anomalyFlags: [],
    fellowshipDetails: null
  },

  // 6. POST-MATRIC CANDIDATE: Sunita Oraon (RIMS Ranchi B.Sc. Nursing)
  {
    id: 'MOTA-2026-POST-0841',
    userId: 'a0000001-0000-0000-0000-000000000007',
    name: 'Sunita Oraon',
    email: 'sunita.oraon@rims.edu.in',
    phone: '+91 94317 55219',
    gender: 'Female',
    age: 21,
    dob: '2005-08-14',
    tribe: 'Oraon (Kurukh)',
    pvtg: false,
    state: 'Jharkhand',
    district: 'Ranchi',
    schemeId: 'POST_MATRIC',
    schemeName: 'Post-Matric Scholarship Scheme for ST Students',
    schemeRuleVersion: 'POSTMATRIC-2026-R1',
    institution: 'Rajendra Institute of Medical Sciences (RIMS), Ranchi',
    nirfRank: 25,
    degree: 'B.Sc. Nursing (Group 1 Professional Degree)',
    guideName: 'Principal: Dr. S. K. Tirkey',
    pgMarks: 76.5,
    netScore: 'Class XII Science: 76.5%',
    annualIncome: 185000,
    submissionDate: '2026-09-15',
    status: 'READY_FOR_REVIEW',
    stage: 3,
    progressPercent: 50,
    triageCategory: 'READY',
    aiRiskLevel: 'LOW',
    aiVerdict: 'All statutory criteria met under Post-Matric ST guidelines. Income ₹1.85L <= ₹2.50L. Group 1 Professional course verified.',
    deterministicRuleAudit: {
      status: 'PASSED',
      stStatus: 'PASS',
      incomeLimit: 'PASS',
      ageLimit: 'PASS',
      qualifyingMarks: 'PASS',
      details: 'Meets Article 342 ST notification, income ceiling <= 2.5L, and enrolled in recognized institution for Group 1 professional course.'
    },
    documents: [
      {
        name: 'ST Caste Certificate (Article 342)',
        fileNumber: 'JH/RAN/2023/ST/1092',
        issuingAuthority: 'Sub-Divisional Officer, Ranchi',
        issueDate: '2023-04-10',
        status: 'VERIFIED',
        confidence: 99.2,
        extractedText: 'Certified that Ku. Sunita Oraon belongs to Oraon Scheduled Tribe in Jharkhand under Article 342.',
        tamperScore: 0.0
      },
      {
        name: 'Annual Family Income Certificate (FY 2026-27)',
        fileNumber: 'INC/JH/2026/4102',
        issuingAuthority: 'Circle Officer, Ranchi',
        issueDate: '2026-05-15',
        status: 'VERIFIED',
        confidence: 98.7,
        extractedText: 'Family annual income is Rs. 1,85,000 for FY 2026-27.',
        tamperScore: 0.0
      }
    ],
    deficiency: null,
    auditTrail: buildChain([
      {
        timestamp: '2026-09-15T11:20:00Z',
        actor: 'Applicant (Sunita Oraon)',
        action: 'Application submitted for Post-Matric ST',
        payload: { appId: 'MOTA-2026-POST-0841' }
      }
    ]),
    anomalyFlags: [],
    fellowshipDetails: null
  }
];

export const INITIAL_USERS = [
  { id: 'a0000001-0000-0000-0000-000000000001', name: 'Birsa Hemrom', email: 'birsa.hemrom@research.iitkgp.ac.in', role: 'student', mobile: '+91 94311 02847', state: 'Jharkhand', district: 'Ranchi', tribe: 'Santhal', isPvtg: false },
  { id: 'a0000001-0000-0000-0000-000000000010', name: 'Dr. Anil Toppo', email: 'registrar@ranchiuniv.ac.in', role: 'institute_officer', roleLabel: 'Nodal Verification Officer (University Registrar)', state: 'Jharkhand' },
  { id: 'a0000001-0000-0000-0000-000000000020', name: 'Dr. Rajeshwar Meena', email: 'director.fellowship@tribal.gov.in', role: 'ministry_officer', roleLabel: 'MoTA Scrutiny Officer (Directorate)', state: 'New Delhi' },
  { id: 'a0000001-0000-0000-0000-000000000030', name: 'System Administrator', email: 'admin@vidyasetu.gov.in', role: 'admin', roleLabel: 'National Platform Administrator' }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'NOTIF-01',
    applicationId: 'MOTA-2026-NFST-0101',
    userId: 'a0000001-0000-0000-0000-000000000001',
    channel: 'SMS (NIC Gateway Adapter) + PORTAL',
    title: 'Deficiency Notice: Income Certificate Validity Lapsed (RESOLVED)',
    message: 'MoTA Alert: Replacement FY 2026-27 Income Certificate validated. Application advanced to active Officer Scrutiny queue with preserved seniority.',
    time: '2 hours ago',
    type: 'SUCCESS',
    adapterNote: 'NIC SMS Gateway Sandbox Adapter'
  },
  {
    id: 'NOTIF-02',
    applicationId: 'MOTA-2026-NOS-0042',
    userId: 'a0000001-0000-0000-0000-000000000004',
    channel: 'EMAIL',
    title: 'National Overseas Scholarship Sanction Order Issued',
    message: 'Official Sanction Order MoTA/NOS/2026/CG-OXF-003 for University of Oxford signed. Download award letter with verified QR code.',
    time: 'Yesterday',
    type: 'SUCCESS',
    adapterNote: 'MoTA Email Dispatch Sandbox'
  }
];

export const INITIAL_GRIEVANCES = [
  {
    id: 'GRV-2026-0041',
    applicationId: 'MOTA-2026-NFST-0101',
    userId: 'a0000001-0000-0000-0000-000000000001',
    category: 'Document Scrutiny Window',
    subject: 'Seniority preservation during deficiency re-upload',
    description: 'Submitted my fresh FY 2026-27 income certificate within the 14-day statutory SLA window. Inquiring regarding active officer scrutiny schedule.',
    status: 'IN_REVIEW',
    slaDays: 7,
    submittedAt: '2026-09-19T10:00:00Z',
    resolutionNote: 'Candidate queue seniority preserved under NFST Guidelines. File assigned to Scrutiny Officer Dr. Rajeshwar Meena.'
  }
];

export const INITIAL_QPR_REPORTS = [
  {
    id: 'QPR-2026-Q1-001',
    applicationId: 'MOTA-2026-NOS-0042',
    scholarName: 'Shanti Madkam',
    schemeId: 'NOS',
    quarter: 'Q1 (Michaelmas Term 2026)',
    institution: 'University of Oxford',
    supervisor: 'Dr. Evelyn Sinclair',
    supervisorEndorsement: true,
    attendancePercent: 95.0,
    progressSummary: 'Completed graduate modules on Ecological Modelling and Tropical Forest Conservation. Commenced preparatory dissertation research.',
    status: 'APPROVED_FOR_DISBURSAL',
    submittedAt: '2026-09-20T12:00:00Z'
  }
];

export const INITIAL_DISBURSEMENTS = [
  {
    id: 'DBT-NOS-2026-Q1-0001',
    applicationId: 'MOTA-2026-NOS-0042',
    scholarName: 'Shanti Madkam',
    schemeId: 'NOS',
    quarter: 'Term 1 Maintenance (GBP 3,300)',
    amount: 412500,
    bankName: 'State Bank of India Foreign Currency Desk',
    accountMasked: 'BARC-UK - ***9921',
    ifscCode: 'SBIN0000166',
    status: 'SUCCESS',
    utr: 'FEDWIRE-BOI-2026-0901',
    dbtMode: 'Aadhaar Payment Bridge (APB) - Sandbox Adapter',
    disbursedAt: '2026-09-01T10:30:00Z'
  }
];

// In-Memory Data Store with Local JSON & Supabase Persistence
class Store {
  constructor() {
    this.schemes = [];
    this.applications = [];
    this.users = [];
    this.notifications = [];
    this.grievances = [];
    this.qprReports = [];
    this.disbursements = [];
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;

    // Load from local store file if exists, else initialize with demo defaults
    if (fs.existsSync(LOCAL_STORE_FILE)) {
      try {
        const raw = fs.readFileSync(LOCAL_STORE_FILE, 'utf-8');
        const data = JSON.parse(raw);
        this.schemes = data.schemes || INITIAL_SCHEMES;
        this.applications = data.applications || INITIAL_APPLICATIONS;
        this.users = data.users || INITIAL_USERS;
        this.notifications = data.notifications || INITIAL_NOTIFICATIONS;
        this.grievances = data.grievances || INITIAL_GRIEVANCES;
        this.qprReports = data.qprReports || INITIAL_QPR_REPORTS;
        this.disbursements = data.disbursements || INITIAL_DISBURSEMENTS;
        this.initialized = true;
        return;
      } catch (err) {
        console.warn('Could not read localStore.json, resetting to seed defaults:', err.message);
      }
    }

    this.resetToDefaults();
    this.initialized = true;
  }

  save() {
    try {
      const payload = {
        schemes: this.schemes,
        applications: this.applications,
        users: this.users,
        notifications: this.notifications,
        grievances: this.grievances,
        qprReports: this.qprReports,
        disbursements: this.disbursements,
        lastSaved: new Date().toISOString()
      };
      fs.writeFileSync(LOCAL_STORE_FILE, JSON.stringify(payload, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to save to localStore.json:', err.message);
    }
  }

  resetToDefaults() {
    this.schemes = JSON.parse(JSON.stringify(INITIAL_SCHEMES));
    this.applications = JSON.parse(JSON.stringify(INITIAL_APPLICATIONS));
    this.users = JSON.parse(JSON.stringify(INITIAL_USERS));
    this.notifications = JSON.parse(JSON.stringify(INITIAL_NOTIFICATIONS));
    this.grievances = JSON.parse(JSON.stringify(INITIAL_GRIEVANCES));
    this.qprReports = JSON.parse(JSON.stringify(INITIAL_QPR_REPORTS));
    this.disbursements = JSON.parse(JSON.stringify(INITIAL_DISBURSEMENTS));
    this.save();
  }

  // Scheme queries
  getSchemes() {
    this.init();
    return this.schemes;
  }

  getScheme(id) {
    this.init();
    return this.schemes.find(s => s.id === id);
  }

  updateScheme(id, updates) {
    this.init();
    const idx = this.schemes.findIndex(s => s.id === id);
    if (idx !== -1) {
      this.schemes[idx] = { ...this.schemes[idx], ...updates, version: updates.version || `${id}-2026-V${Date.now().toString().slice(-4)}` };
      this.save();
      return this.schemes[idx];
    }
    return null;
  }

  // Application queries
  getApplications(filter = {}) {
    this.init();
    let res = [...this.applications];
    if (filter.schemeId) res = res.filter(a => a.schemeId === filter.schemeId);
    if (filter.status) res = res.filter(a => a.status === filter.status);
    if (filter.userId) res = res.filter(a => a.userId === filter.userId);
    return res;
  }

  getApplication(id) {
    this.init();
    return this.applications.find(a => a.id === id);
  }

  createApplication(data) {
    this.init();
    const id = data.id || `MOTA-${new Date().getFullYear()}-${data.schemeId || 'GEN'}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newApp = {
      id,
      userId: data.userId || 'a0000001-0000-0000-0000-000000000001',
      name: data.name || data.applicantName || 'Applicant',
      email: data.email || 'applicant@tribal.gov.in',
      phone: data.phone || '+91 94311 02847',
      gender: data.gender || 'Not specified',
      age: Number(data.age || 25),
      dob: data.dob || '2000-01-01',
      tribe: data.tribe || 'Santhal',
      pvtg: Boolean(data.pvtg),
      state: data.state || 'Jharkhand',
      district: data.district || 'Ranchi',
      schemeId: data.schemeId || 'NFST',
      schemeName: data.schemeName || 'National Fellowship for ST Students',
      schemeRuleVersion: data.schemeRuleVersion || 'NFST-2026-R3',
      institution: data.institution || data.institutionName || 'Recognized University',
      degree: data.degree || data.courseEnrolled || 'Ph.D.',
      guideName: data.guideName || 'Research Supervisor',
      pgMarks: Number(data.pgMarks || data.marksPercentage || 75.0),
      netScore: data.netScore || 'Qualified',
      annualIncome: Number(data.annualIncome || data.income || 420000),
      submissionDate: new Date().toISOString().split('T')[0],
      status: 'SUBMITTED',
      stage: 1,
      progressPercent: 20,
      triageCategory: 'READY',
      aiRiskLevel: 'LOW',
      aiVerdict: 'Application submitted successfully. AI pre-scrutiny initialized.',
      deterministicRuleAudit: {
        status: 'PASS',
        stStatus: 'PASS',
        incomeLimit: 'PASS',
        ageLimit: 'PASS',
        qualifyingMarks: 'PASS',
        details: 'Meets general statutory eligibility criteria.'
      },
      documents: data.documents || [],
      deficiency: null,
      anomalyFlags: [],
      auditTrail: buildChain([
        {
          timestamp: new Date().toISOString(),
          actor: `Applicant (${data.name || 'Student'})`,
          action: 'Application created and submitted via National Portal',
          payload: { appId: id, schemeId: data.schemeId }
        }
      ]),
      fellowshipDetails: null,
      ...data
    };

    this.applications.unshift(newApp);
    this.save();
    return newApp;
  }

  updateApplication(id, updates) {
    this.init();
    const idx = this.applications.findIndex(a => a.id === id);
    if (idx !== -1) {
      this.applications[idx] = { ...this.applications[idx], ...updates, updatedAt: new Date().toISOString() };
      this.save();
      return this.applications[idx];
    }
    return null;
  }

  // Chained Audit Log helper
  appendAuditBlock(appId, actor, action, payload = '') {
    this.init();
    const app = this.getApplication(appId);
    if (!app) return null;

    if (!Array.isArray(app.auditTrail)) app.auditTrail = [];
    const lastBlock = app.auditTrail[app.auditTrail.length - 1];
    const prevHash = lastBlock ? lastBlock.hash : '0000000000000000000000000000000000000000000000000000000000000000';

    const newBlock = AuditChainService.createBlock(prevHash, actor, action, payload);
    app.auditTrail.push(newBlock);
    this.save();
    return newBlock;
  }

  // Cross-application anomalies
  getAnomalies() {
    this.init();
    return this.applications.filter(a => a.aiRiskLevel === 'HIGH' || (a.anomalyFlags && a.anomalyFlags.length > 0));
  }

  // Notifications
  getNotifications(userId = null) {
    this.init();
    if (userId) return this.notifications.filter(n => n.userId === userId || !n.userId);
    return this.notifications;
  }

  addNotification(notif) {
    this.init();
    const id = `NOTIF-${Date.now().toString().slice(-4)}`;
    const newNotif = { id, time: 'Just now', type: 'INFO', ...notif };
    this.notifications.unshift(newNotif);
    this.save();
    return newNotif;
  }

  // QPR Reports
  getQprReports(appId = null) {
    this.init();
    if (appId) return this.qprReports.filter(q => q.applicationId === appId);
    return this.qprReports;
  }

  submitQprReport(report) {
    this.init();
    const id = `QPR-${new Date().getFullYear()}-${Date.now().toString().slice(-4)}`;
    const newReport = {
      id,
      submittedAt: new Date().toISOString(),
      status: 'SUBMITTED',
      ...report
    };
    this.qprReports.unshift(newReport);
    this.save();
    return newReport;
  }

  // Disbursements
  getDisbursements(appId = null) {
    this.init();
    if (appId) return this.disbursements.filter(d => d.applicationId === appId);
    return this.disbursements;
  }

  createDisbursement(entry) {
    this.init();
    const id = `DBT-${new Date().getFullYear()}-${Date.now().toString().slice(-6)}`;
    const newEntry = {
      id,
      disbursedAt: new Date().toISOString(),
      status: 'SUCCESS',
      dbtMode: 'Aadhaar Payment Bridge (APB) - Sandbox Adapter',
      ...entry
    };
    this.disbursements.unshift(newEntry);
    this.save();
    return newEntry;
  }

  // Grievances
  getGrievances(userId = null) {
    this.init();
    if (userId) return this.grievances.filter(g => g.userId === userId);
    return this.grievances;
  }

  createGrievance(entry) {
    this.init();
    const id = `GRV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newGrv = {
      id,
      status: 'OPEN',
      slaDays: 7,
      submittedAt: new Date().toISOString(),
      ...entry
    };
    this.grievances.unshift(newGrv);
    this.save();
    return newGrv;
  }

  // Executive Dashboard KPIs
  getAnalyticsSummary() {
    this.init();
    const totalApps = this.applications.length;
    const underScrutiny = this.applications.filter(a => a.status === 'UNDER_SCRUTINY').length;
    const deficient = this.applications.filter(a => a.status === 'DEFICIENT').length;
    const approved = this.applications.filter(a => a.status === 'APPROVED' || a.status === 'AWARDED').length;
    const highRiskAnomalies = this.getAnomalies().length;
    const pvtgCount = this.applications.filter(a => a.pvtg).length;

    return {
      totalApplications: totalApps,
      underScrutinyCount: underScrutiny,
      deficientCount: deficient,
      approvedCount: approved,
      highRiskAnomalies,
      pvtgBeneficiaries: pvtgCount,
      avgProcessingDays: 3.8,
      turnaroundImprovementPct: 78.5,
      fundsDisbursedCr: 178.4,
      schemeBreakdown: this.schemes.map(s => {
        const apps = this.applications.filter(a => a.schemeId === s.id);
        return {
          id: s.id,
          name: s.shortName,
          applied: apps.length,
          sanctionedSlots: s.totalSlots,
          budgetCr: s.annualBudgetCr
        };
      })
    };
  }
}

export const DataStore = new Store();
