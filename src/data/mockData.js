// Enhanced Mock Data for Ministry of Tribal Affairs (MoTA) Scholarship & Fellowship System
// Aligned with Ministry of Tribal Affairs (MoTA) National Guidelines 2026

export const INITIAL_SCHEMES = [
  {
    id: 'NFST',
    name: 'National Fellowship for Scheduled Tribe Students',
    shortName: 'NFST',
    category: 'Higher Education (Ph.D. / M.Phil)',
    description: 'Financial assistance to ST scholars pursuing regular and full-time M.Phil and Ph.D. degrees in Sciences, Humanities, Social Sciences and Engineering in Indian Universities/Institutes.',
    totalSlots: 750,
    filledSlots: 620,
    annualBudgetCr: 95.0,
    disbursedCr: 78.4,
    stipendJrf: 37000,
    stipendSrf: 42000,
    contingencyAnnual: 20500,
    eligibility: {
      minMarks: 55,
      maxAge: 36,
      maxIncome: 600000,
      degrees: ['Ph.D.', 'M.Phil', 'Integrated Ph.D.'],
      mandatoryTest: 'UGC-NET / CSIR-NET / GATE / Institutional Entrance'
    },
    quotaRules: {
      stFemaleHorizontal: 30, // 30% horizontal reservation
      pvtgPrioritySlots: 50,  // Dedicated seats for Particularly Vulnerable Tribal Groups
      pwdReservation: 5       // 5% for Divyangjan
    },
    requiredDocuments: [
      'ST Caste Certificate (Digital/State Gazette)',
      'Annual Family Income Certificate (issued by Tehsildar/SDM)',
      'Post-Graduation Degree & Consolidated Marksheet',
      'Ph.D./M.Phil Admission Confirmation & Guide Endorsement',
      'Research Synopsis / Proposal (max 10 pages)',
      'Aadhaar Card (Aadhaar Seeded Bank Account)'
    ],
    workflow: ['Application Submission', 'AI Pre-Verification', 'Institute Verification', 'District Nodal Review', 'MoTA Scrutiny Officer', 'Selection Committee Review', 'Award & DBT Active']
  },
  {
    id: 'NOS',
    name: 'National Overseas Scholarship for ST Students',
    shortName: 'NOS',
    category: 'International Higher Education (Masters & Ph.D.)',
    description: 'Provides financial support to meritorious ST students for pursuing Master level courses, Ph.D. and Post-Doctoral research in accredited overseas universities ranked within QS Top 500.',
    totalSlots: 20,
    filledSlots: 18,
    annualBudgetCr: 18.5,
    disbursedCr: 16.2,
    stipendAnnualGbp: 9900,
    stipendAnnualUsd: 15400,
    tuitionCoverage: '100% Actuals',
    eligibility: {
      minMarks: 55,
      maxAge: 35,
      maxIncome: 800000,
      degrees: ['Master of Science', 'Ph.D. Abroad', 'Master of Public Policy', 'Master of Engineering'],
      universityRankMax: 500,
      priorityRankMax: 200,
      languageTest: 'IELTS (>= 6.5) / TOEFL (>= 90) / GRE'
    },
    quotaRules: {
      stFemaleHorizontal: 30,
      pvtgPrioritySlots: 3,
      pwdReservation: 5
    },
    requiredDocuments: [
      'ST Caste Certificate with Central Government ST list mapping',
      'Income Certificate (ITR or Tehsildar Certificate <= 8 Lakhs)',
      'Unconditional Offer Letter from QS Top 500 University',
      'Valid Indian Passport',
      'IELTS / TOEFL / GRE Scorecard',
      'Two Academic Recommendations from Indian Faculty',
      'Research / Study Statement of Purpose (SOP)'
    ],
    workflow: ['Application Submission', 'AI Pre-Verification', 'MoTA Overseas Division Scrutiny', 'Embassy / Visa Clearance', 'Selection Committee', 'Award Sanction & Forex Disbursement']
  },
  {
    id: 'TOP_CLASS',
    name: 'Top Class Education for ST Students',
    shortName: 'Top Class ST',
    category: 'Undergraduate / Postgraduate in Notified Institutes',
    description: 'Encourages ST students to join prestigious institutions like IITs, IIMs, NITs, AIIMS, NLUs, NIDs by providing full tuition fees, computer allowance, and monthly living assistance.',
    totalSlots: 1000,
    filledSlots: 940,
    annualBudgetCr: 65.0,
    disbursedCr: 61.2,
    livingAllowanceMonthly: 2220,
    booksGrantAnnual: 3000,
    computerAllowanceOneTime: 45000,
    tuitionCoverage: '100% (or institute ceiling)',
    eligibility: {
      minMarks: 50,
      maxAge: 30,
      maxIncome: 600000,
      degrees: ['B.Tech', 'MBBS', 'MBA', 'B.Des', 'B.A. LL.B'],
      instituteTypes: ['IIT', 'IIM', 'NIT', 'AIIMS', 'NLU', 'IIIT', 'NID']
    },
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
    workflow: ['Application Submission', 'AI Pre-Verification', 'Institutional Registrar Verification', 'MoTA Direct Sanction', 'DBT Direct to Institute & Student']
  }
];

export const TRIBAL_COMMUNITIES = [
  { name: 'Santhal', states: ['Jharkhand', 'West Bengal', 'Odisha', 'Bihar'], pvtg: false },
  { name: 'Gond', states: ['Madhya Pradesh', 'Chhattisgarh', 'Maharashtra', 'Telangana'], pvtg: false },
  { name: 'Bhil', states: ['Rajasthan', 'Gujarat', 'Madhya Pradesh', 'Maharashtra'], pvtg: false },
  { name: 'Munda', states: ['Jharkhand', 'Odisha', 'West Bengal'], pvtg: false },
  { name: 'Oraon (Kurukh)', states: ['Jharkhand', 'Chhattisgarh', 'Odisha'], pvtg: false },
  { name: 'Birhor', states: ['Jharkhand', 'Chhattisgarh', 'Odisha'], pvtg: true }, // PVTG
  { name: 'Chenchu', states: ['Andhra Pradesh', 'Telangana'], pvtg: true },        // PVTG
  { name: 'Baiga', states: ['Madhya Pradesh', 'Chhattisgarh'], pvtg: true },         // PVTG
  { name: 'Sahariya', states: ['Madhya Pradesh', 'Rajasthan'], pvtg: true },         // PVTG
  { name: 'Katkari', states: ['Maharashtra', 'Gujarat'], pvtg: true },               // PVTG
  { name: 'Toda', states: ['Tamil Nadu'], pvtg: true },                              // PVTG
  { name: 'Mizo', states: ['Mizoram'], pvtg: false },
  { name: 'Khasi', states: ['Meghalaya', 'Assam'], pvtg: false },
  { name: 'Garo', states: ['Meghalaya', 'Assam'], pvtg: false },
  { name: 'Bodo', states: ['Assam'], pvtg: false },
  { name: 'Meena', states: ['Rajasthan'], pvtg: false }
];

export const INITIAL_APPLICANTS = [
  {
    id: 'MOTA-2026-NFST-0101',
    name: 'Birsa Hemrom',
    email: 'birsa.hemrom@research.iitkgp.ac.in',
    phone: '+91 98451 22341',
    gender: 'Male',
    age: 26,
    dob: '1999-11-15',
    tribe: 'Santhal',
    pvtg: false,
    state: 'Jharkhand',
    district: 'Ranchi',
    schemeId: 'NFST',
    schemeName: 'National Fellowship for ST Students',
    institution: 'Indian Institute of Technology (IIT) Kharagpur',
    nirfRank: 5,
    degree: 'Ph.D. in Rural Development & Water Harvesting',
    guideName: 'Prof. A. K. Banerjee',
    pgMarks: 78.4,
    netScore: 'UGC-NET Qualified (Roll: JH04100234)',
    annualIncome: 240000,
    submissionDate: '2026-09-12',
    status: 'Selection Committee Review', // 'Submitted', 'AI Verified', 'Deficiency Pending', 'Selection Committee Review', 'Selected', 'Rejected'
    stage: 4,
    progressPercent: 85,
    aiScore: 94,
    triageCategory: 'READY', // 'READY', 'REVIEW', 'DEFICIENT'
    aiRiskLevel: 'LOW',
    aiVerdict: 'AI Pre-Check Passed. All 6 documents verified with high confidence. Human review recommended for final ranking.',
    documents: [
      {
        name: 'ST Caste Certificate',
        fileNumber: 'JH/RAN/2021/ST/8821',
        issuingAuthority: 'Sub-Divisional Officer, Ranchi',
        status: 'VERIFIED',
        confidence: 99.1,
        extractedText: 'Certified that Shri Birsa Hemrom son of Sh. Sukra Hemrom belongs to Santhal Community which is recognized as Scheduled Tribe in Jharkhand.',
        tamperScore: 0.02
      },
      {
        name: 'Income Certificate',
        fileNumber: 'INC/2026/09214',
        issuingAuthority: 'Circle Officer, Kanke, Ranchi',
        status: 'VERIFIED',
        confidence: 97.8,
        extractedText: 'Annual Income from all sources is Rs. 2,40,000 (Rupees Two Lakh Forty Thousand only). Valid for 2026-27.',
        tamperScore: 0.01
      },
      {
        name: 'IIT Kharagpur Ph.D. Confirmation',
        fileNumber: 'IITKGP/ACAD/PHD/2026/041',
        issuingAuthority: 'Dean of Academic Affairs, IIT Kharagpur',
        status: 'VERIFIED',
        confidence: 98.6,
        extractedText: 'Mr. Birsa Hemrom is enrolled as regular full-time Ph.D. scholar w.e.f. August 2026 under Roll No 26RD91R02.',
        tamperScore: 0.0
      },
      {
        name: 'Aadhaar Card',
        fileNumber: 'XXXX-XXXX-4912',
        issuingAuthority: 'UIDAI',
        status: 'VERIFIED',
        confidence: 99.8,
        extractedText: 'Birsa Hemrom, DOB: 15/11/1999, Address: Morabadi, Ranchi, Jharkhand 834008. Aadhaar Seeded in SBI A/c 30129841203.',
        tamperScore: 0.01
      }
    ],
    auditTrail: [
      { time: '10:42 AM', date: '2026-09-12', actor: 'Applicant (Birsa Hemrom)', action: 'Application submitted via DigiLocker Jan Parichay SSO', hash: 'e81a..01' },
      { time: '10:43 AM', date: '2026-09-12', actor: 'VidyaSetu Document AI', action: 'OCR extraction & biometric UIDAI cross-validation (99.8% match)', hash: 'a42f..99' },
      { time: '10:44 AM', date: '2026-09-12', actor: 'Rule Engine v2.4', action: 'Evaluated against NFST statutory criteria: Passed all 6 eligibility tests', hash: 'b110..24' },
      { time: '11:15 AM', date: '2026-09-14', actor: 'Institute Verification Officer', action: 'Enrolment & guide credentials endorsed by IIT Kharagpur Academic Cell', hash: 'c902..51' },
      { time: '02:30 PM', date: '2026-09-18', actor: 'MoTA Scrutiny Officer', action: 'Level-1 scrutiny approved. Forwarded to National Selection Committee queue', hash: 'd553..18' }
    ],
    anomalyFlags: [],
    deficiency: null,
    fellowshipDetails: {
      sanctionNumber: 'MoTA/NFST/2026/JH-041',
      monthlyStipend: 37000,
      monthlyHra: 6660,
      annualContingency: 20500,
      bankAccount: 'State Bank of India (Aadhaar Seeded)',
      accountNoMasked: 'SBIN0000166 - ***41203',
      pfmsBatchId: 'PFMS-MOTA-2026-B09',
      disbursementHistory: [
        { installment: 'Installment 1 (Aug 2026)', amount: 43660, status: 'Paid', utr: 'RBI2408159982103', date: '2026-08-15' },
        { installment: 'Installment 2 (Sep 2026)', amount: 43660, status: 'Paid', utr: 'RBI2409158810291', date: '2026-09-15' },
        { installment: 'Installment 3 (Oct 2026)', amount: 43660, status: 'Processing', utr: 'Queued in PFMS e-FTO', date: 'Pending' }
      ],
      progressReports: [
        { quarter: 'Q1 (Jul-Sep 2026)', status: 'Approved by Supervisor', submissionDate: '2026-09-20', grade: 'Satisfactory' }
      ]
    }
  },
  {
    id: 'MOTA-2026-NOS-0042',
    name: 'Shanti Madkam',
    email: 'shanti.madkam@oxford.alumni.org',
    phone: '+91 94060 11984',
    gender: 'Female',
    age: 27,
    dob: '1999-04-03',
    tribe: 'Dhurwa / Gond',
    pvtg: true, // Particularly Vulnerable
    state: 'Chhattisgarh',
    district: 'Bastar',
    schemeId: 'NOS',
    schemeName: 'National Overseas Scholarship for ST Students',
    institution: 'University of Oxford, United Kingdom',
    nirfRank: null,
    qsWorldRank: 3,
    degree: 'M.Sc. in Biodiversity, Conservation and Forest Management',
    guideName: 'Dr. Evelyn Sinclair',
    pgMarks: 84.2,
    netScore: 'IELTS: 8.0 overall (L:8.5, R:8.0, W:7.5, S:8.0)',
    annualIncome: 180000,
    submissionDate: '2026-08-28',
    status: 'Selected',
    stage: 6,
    progressPercent: 100,
    aiScore: 98,
    triageCategory: 'READY',
    aiRiskLevel: 'LOW',
    aiVerdict: 'Top tier application. PVTG Scholar from Bastar. Unconditional Oxford Offer (QS #3). Final selection confirmed.',
    documents: [
      {
        name: 'ST Caste Certificate',
        fileNumber: 'CG/BAS/2020/ST/0912',
        issuingAuthority: 'Tahsildar Jagdalpur, Bastar',
        status: 'VERIFIED',
        confidence: 99.4,
        extractedText: 'Ku. Shanti Madkam d/o Sh. Joga Madkam belongs to Gond (Dhurwa) Scheduled Tribe of Bastar district.',
        tamperScore: 0.01
      },
      {
        name: 'Oxford Unconditional Offer Letter',
        fileNumber: 'OXF-ADMIS-2026-MSCBIO-9182',
        issuingAuthority: 'Graduate Admissions, University of Oxford',
        status: 'VERIFIED',
        confidence: 99.7,
        extractedText: 'We are pleased to offer you an unconditional place on the M.Sc. in Biodiversity, Conservation and Management for Michaelmas Term 2026.',
        tamperScore: 0.0
      },
      {
        name: 'Valid Indian Passport',
        fileNumber: 'V8921044',
        issuingAuthority: 'Regional Passport Office, Raipur',
        status: 'VERIFIED',
        confidence: 98.9,
        extractedText: 'Passport No: V8921044, Given Name: Shanti, Surname: Madkam, Expiry: 14/05/2034',
        tamperScore: 0.0
      }
    ],
    auditTrail: [
      { time: '09:10 AM', date: '2026-08-28', actor: 'Applicant (Shanti Madkam)', action: 'NOS Application submitted online with Oxford offer', hash: 'f102..90' },
      { time: '09:12 AM', date: '2026-08-28', actor: 'VidyaSetu Document AI', action: 'OCR verified Oxford admission letter & IELTS score (8.0)', hash: 'a119..44' },
      { time: '11:45 AM', date: '2026-08-30', actor: 'MoTA Overseas Division', action: 'QS Ranking (#3) verified. Embassy visa clearance initiated', hash: 'c881..23' },
      { time: '03:15 PM', date: '2026-09-02', actor: 'Selection Committee', action: 'Selected under PVTG affirmative quota. Award letter dispatched', hash: 'd994..12' }
    ],
    anomalyFlags: [],
    deficiency: null,
    fellowshipDetails: {
      sanctionNumber: 'MoTA/NOS/2026/CG-OXF-003',
      monthlyStipend: 110000, // INR equivalent for overseas allowance
      stipendAnnualGbp: 9900,
      tuitionFeeCoveredGbp: 32500,
      airfareStatus: 'Authorized Economy Flight Ticket',
      visaAssistanceLetter: 'Issued on 2026-09-01',
      bankAccount: 'Barclays Bank UK / State Bank of India Foreign Currency Desk',
      accountNoMasked: 'BARC-UK - ***9921',
      pfmsBatchId: 'PFMS-NOS-FOREX-2026-B02',
      disbursementHistory: [
        { installment: 'Term 1 Maintenance (GBP 3,300)', amount: 412500, status: 'Paid', utr: 'FEDWIRE-BOI-2026-0901', date: '2026-09-01' },
        { installment: 'Tuition Tranche 1 (GBP 16,250)', amount: 1625000, status: 'Paid', utr: 'SWIFT-SBI-2026-OXF1', date: '2026-09-05' },
        { installment: 'Term 2 Maintenance (GBP 3,300)', amount: 412500, status: 'Processing', utr: 'Scheduled Dec 2026', date: 'Pending' }
      ],
      progressReports: [
        { quarter: 'Michaelmas Term 2026', status: 'In Progress', submissionDate: 'Due Dec 2026', grade: 'Enrolled' }
      ]
    }
  },
  {
    id: 'MOTA-2026-NFST-0199',
    name: 'Mangal Singh Munda',
    email: 'mangal.munda@uohyd.ac.in',
    phone: '+91 97711 55670',
    gender: 'Male',
    age: 28,
    dob: '1998-02-19',
    tribe: 'Munda',
    pvtg: false,
    state: 'Odisha',
    district: 'Mayurbhanj',
    schemeId: 'NFST',
    schemeName: 'National Fellowship for ST Students',
    institution: 'University of Hyderabad',
    nirfRank: 10,
    degree: 'Ph.D. in Linguistics (Preservation of Austroasiatic Dialects)',
    guideName: 'Prof. K. Uma Maheshwar Rao',
    pgMarks: 69.2,
    netScore: 'UGC-NET Qualified (Dec 2025)',
    annualIncome: 310000,
    submissionDate: '2026-09-14',
    status: 'Deficiency Pending',
    stage: 3,
    progressPercent: 50,
    aiScore: 68,
    triageCategory: 'DEFICIENT',
    aiRiskLevel: 'MEDIUM',
    aiVerdict: 'Deficiency Detected by AI: Income certificate issue date is more than 3 years old. Official seal is smudged. Action required.',
    documents: [
      {
        name: 'ST Caste Certificate',
        fileNumber: 'OD/MAY/2022/ST/5521',
        issuingAuthority: 'Tahasildar, Baripada',
        status: 'VERIFIED',
        confidence: 96.5,
        extractedText: 'Certified that Mangal Singh Munda belongs to Munda Scheduled Tribe.',
        tamperScore: 0.02
      },
      {
        name: 'Income Certificate',
        fileNumber: 'INC/OD/2023/1029',
        issuingAuthority: 'Revenue Inspector, Mayurbhanj',
        status: 'DEFICIENT',
        confidence: 62.4,
        extractedText: 'Income stated as 3,10,000. WARNING: Date of issue is 15-01-2023. Validity period of 1 year expired.',
        tamperScore: 0.15
      },
      {
        name: 'Research Proposal',
        fileNumber: 'PENDING_UPLOAD',
        issuingAuthority: 'Candidate',
        status: 'DEFICIENT',
        confidence: 0,
        extractedText: 'Document Missing: Research synopsis not attached in initial submission.',
        tamperScore: 0
      }
    ],
    auditTrail: [
      { time: '10:44 AM', date: '2026-09-14', actor: 'Applicant (Mangal Munda)', action: 'Application submitted', hash: 'e991..11' },
      { time: '10:45 AM', date: '2026-09-14', actor: 'VidyaSetu Document AI', action: 'Deficiency detected: Income certificate expired (Jan 2023) + Missing Research Proposal', hash: 'b883..20' },
      { time: '10:46 AM', date: '2026-09-14', actor: 'Notification Engine', action: 'Automated Deficiency SMS & Email dispatched with 15-day resolution window', hash: 'a102..77' }
    ],
    anomalyFlags: [
      { type: 'EXPIRED_DOC', label: 'Income Certificate Expired', severity: 'HIGH' },
      { type: 'MISSING_FILE', label: 'Research Proposal Missing', severity: 'HIGH' }
    ],
    deficiency: {
      code: 'DEF-INC-EXPIRED',
      title: 'Income Certificate Expired & Research Proposal Missing',
      description: 'The uploaded Income Certificate was issued in January 2023 (>1 yr validity lapsed). Furthermore, the required 10-page research synopsis was not attached.',
      actionRequired: 'Upload fresh Income Certificate (FY 2026-27) from Tahasildar and attach research proposal.',
      raisedOn: '2026-09-16',
      deadline: '2026-10-05',
      officerRemarks: 'Please upload the latest certificate with clear digital barcode before next screening meeting.'
    },
    fellowshipDetails: null
  },
  {
    id: 'MOTA-2026-TOP-0312',
    name: 'Ananya Katkari',
    email: 'ananya.katkari@iitb.ac.in',
    phone: '+91 98230 44918',
    gender: 'Female',
    age: 19,
    dob: '2007-06-12',
    tribe: 'Katkari',
    pvtg: true, // PVTG in Maharashtra
    state: 'Maharashtra',
    district: 'Raigad',
    schemeId: 'TOP_CLASS',
    schemeName: 'Top Class Education for ST Students',
    institution: 'Indian Institute of Technology (IIT) Bombay',
    nirfRank: 3,
    degree: 'B.Tech in Computer Science and Engineering',
    guideName: 'Faculty Advisor: Prof. S. Sudarshan',
    pgMarks: 94.5,
    netScore: 'JEE Advanced ST Category Rank: 14',
    annualIncome: 120000,
    submissionDate: '2026-09-08',
    status: 'AI Verified',
    stage: 2,
    progressPercent: 40,
    aiScore: 97,
    triageCategory: 'READY',
    aiRiskLevel: 'LOW',
    aiVerdict: 'Exceptional candidate. PVTG ST Female with JEE Adv Rank 14 at IIT Bombay. Full tuition + living + IT hardware approved for review.',
    documents: [
      {
        name: 'ST Caste Certificate & Validity',
        fileNumber: 'MH/CCV/PUNE/2025/11294',
        issuingAuthority: 'Divisional Caste Scrutiny Committee, Pune',
        status: 'VERIFIED',
        confidence: 99.8,
        extractedText: 'Caste Scrutiny Certificate issued confirming Katkari Particularly Vulnerable Scheduled Tribe.',
        tamperScore: 0.0
      },
      {
        name: 'IIT Bombay Fee Allotment',
        fileNumber: 'IITB/ADMIS/JEE2026/CS104',
        issuingAuthority: 'Registrar, IIT Bombay',
        status: 'VERIFIED',
        confidence: 99.2,
        extractedText: 'Provisional admission to B.Tech Computer Science granted. Fee payable under Top Class ST.',
        tamperScore: 0.01
      }
    ],
    auditTrail: [
      { time: '02:15 PM', date: '2026-09-08', actor: 'Applicant (Ananya Katkari)', action: 'Application submitted for Top Class ST', hash: 'a881..99' },
      { time: '02:16 PM', date: '2026-09-08', actor: 'VidyaSetu Document AI', action: 'Maharashtra Caste Scrutiny Committee Certificate validated via MahaOnline API', hash: 'e992..31' }
    ],
    anomalyFlags: [],
    deficiency: null,
    fellowshipDetails: null
  },
  {
    id: 'MOTA-2026-NOS-0089',
    name: 'Rameshwar Baiga',
    email: 'r.baiga@student.unimelb.edu.au',
    phone: '+91 93011 88471',
    gender: 'Male',
    age: 29,
    dob: '1997-08-22',
    tribe: 'Baiga',
    pvtg: true,
    state: 'Madhya Pradesh',
    district: 'Dindori',
    schemeId: 'NOS',
    schemeName: 'National Overseas Scholarship for ST Students',
    institution: 'University of Melbourne, Australia',
    nirfRank: null,
    qsWorldRank: 13,
    degree: 'Master of Agricultural Sciences & Agroforestry',
    guideName: 'Prof. Julian Thomas',
    pgMarks: 76.5,
    netScore: 'IELTS: 7.5 (L:8.0, R:7.5, W:7.0, S:7.5)',
    annualIncome: 160000,
    submissionDate: '2026-09-18',
    status: 'Submitted',
    stage: 1,
    progressPercent: 20,
    aiScore: 92,
    triageCategory: 'REVIEW',
    aiRiskLevel: 'LOW',
    aiVerdict: 'Eligible. Document OCR scanned successfully. Awaiting District Level Scrutiny queue.',
    documents: [
      {
        name: 'ST Caste Certificate',
        fileNumber: 'MP/DIN/2021/ST/3811',
        issuingAuthority: 'Sub-Divisional Officer, Dindori',
        status: 'VERIFIED',
        confidence: 98.2,
        extractedText: 'Certified that Rameshwar Baiga belongs to Baiga Particularly Vulnerable Tribal Group.',
        tamperScore: 0.02
      },
      {
        name: 'Melbourne Offer Letter',
        fileNumber: 'UNIMELB-2026-OFF-AG991',
        issuingAuthority: 'Admissions Office, University of Melbourne',
        status: 'VERIFIED',
        confidence: 97.4,
        extractedText: 'Full unconditional offer for Master of Agricultural Sciences commencing February 2027.',
        tamperScore: 0.01
      }
    ],
    auditTrail: [
      { time: '11:00 AM', date: '2026-09-18', actor: 'Applicant (Rameshwar Baiga)', action: 'Application submitted for Melbourne Masters', hash: 'd112..81' }
    ],
    anomalyFlags: [],
    deficiency: null,
    fellowshipDetails: null
  },
  {
    id: 'MOTA-2026-NFST-0282',
    name: 'Suresh Kumar Meena',
    email: 'suresh.meena99@rajasthan.edu.in',
    phone: '+91 94140 33918',
    gender: 'Male',
    age: 27,
    dob: '1999-01-10',
    tribe: 'Meena',
    pvtg: false,
    state: 'Rajasthan',
    district: 'Jaipur',
    schemeId: 'NFST',
    schemeName: 'National Fellowship for ST Students',
    institution: 'University of Rajasthan',
    nirfRank: 45,
    degree: 'Ph.D. in Botany',
    guideName: 'Dr. S. C. Sharma',
    pgMarks: 72.1,
    netScore: 'UGC-NET Qualified',
    annualIncome: 520000,
    submissionDate: '2026-09-20',
    status: 'Submitted',
    stage: 1,
    progressPercent: 20,
    aiScore: 71,
    triageCategory: 'REVIEW',
    aiRiskLevel: 'MEDIUM',
    aiVerdict: 'ANOMALY DETECTED: Similar bank account and phone number registered under another application (#NFST-0091). Queued for human verification.',
    documents: [
      {
        name: 'ST Caste Certificate',
        fileNumber: 'RJ/JAI/2021/ST/1102',
        issuingAuthority: 'Tehsildar Sanganer, Jaipur',
        status: 'VERIFIED',
        confidence: 96.0,
        extractedText: 'Certified that Suresh Kumar Meena belongs to Meena Scheduled Tribe.',
        tamperScore: 0.02
      },
      {
        name: 'Income Certificate',
        fileNumber: 'INC/RJ/2026/991',
        issuingAuthority: 'Tehsildar Jaipur',
        status: 'VERIFIED',
        confidence: 94.0,
        extractedText: 'Annual income is Rs. 5,20,000 for FY 2026-27.',
        tamperScore: 0.03
      }
    ],
    auditTrail: [
      { time: '04:12 PM', date: '2026-09-20', actor: 'Applicant (Suresh Meena)', action: 'Application submitted', hash: 'b771..02' },
      { time: '04:13 PM', date: '2026-09-20', actor: 'VidyaSetu Anomaly Detector', action: 'Flagged potential duplicate: Phone/Bank match with #NFST-0091 (Similarity: 94%)', hash: 'c992..04' }
    ],
    anomalyFlags: [
      { type: 'DUPLICATE_IDENTIFIER', label: 'Phone & Bank details match #NFST-0091', severity: 'HIGH' }
    ],
    deficiency: null,
    fellowshipDetails: null
  }
];

export const MOCK_NOTIFICATIONS = [
  {
    id: 'NOTIF-01',
    channel: 'SMS + PORTAL',
    recipient: '+91 97711 55670 (Mangal Singh Munda)',
    title: 'Deficiency Notice: Income Certificate & Research Proposal',
    message: 'MoTA Alert: Your application #MOTA-2026-NFST-0199 has 2 deficiencies. Please upload valid FY 2026-27 Income Certificate and Research Proposal by 05-Oct-2026 to retain seniority.',
    time: '2 hours ago',
    type: 'ALERT'
  },
  {
    id: 'NOTIF-02',
    channel: 'EMAIL',
    recipient: 'shanti.madkam@oxford.alumni.org',
    title: 'Award Sanction Order Issued — National Overseas Scholarship',
    message: 'Congratulations! Official Sanction Order MoTA/NOS/2026/CG-OXF-003 for University of Oxford has been signed. Download from VidyaSetu portal.',
    time: 'Yesterday',
    type: 'SUCCESS'
  },
  {
    id: 'NOTIF-03',
    channel: 'PORTAL',
    recipient: 'birsa.hemrom@research.iitkgp.ac.in',
    title: 'DBT Stipend Installment 2 Credited',
    message: 'Rs. 43,660 credited to your Aadhaar seeded SBI A/c via PFMS (UTR: RBI2409158810291). Please submit Q1 Progress Report by 30-Sep.',
    time: '3 days ago',
    type: 'INFO'
  }
];

export const MOCK_GRIEVANCES = [
  {
    id: 'GR-1021',
    applicantId: 'MOTA-2026-NFST-0101',
    applicantName: 'Birsa Hemrom',
    category: 'Payment / Disbursement',
    title: 'HRA Allowance Difference in Tier-1 City',
    description: 'IIT Kharagpur campus hostel accommodation is undergoing renovation, so I am staying off-campus in Kolkata city. Requesting HRA upgrade to 27%.',
    aiCategory: 'Finance & DBT Division',
    aiPriority: 'MEDIUM',
    status: 'Pending Review',
    submittedOn: '2026-09-24',
    officerResponse: null
  },
  {
    id: 'GR-1022',
    applicantId: 'MOTA-2026-NFST-0199',
    applicantName: 'Mangal Singh Munda',
    category: 'Document Verification',
    title: 'Delay in Issuance of Fresh Income Certificate from Tehsildar',
    description: 'Due to local holidays, the Mayurbhanj Revenue Office is processing certificates slowly. Requesting 7 days extension on the deficiency deadline.',
    aiCategory: 'Scrutiny & Grievance Cell',
    aiPriority: 'HIGH',
    status: 'Resolved',
    submittedOn: '2026-09-22',
    officerResponse: 'Extension granted. Deadline extended to 12-Oct-2026 on the portal.'
  }
];

export const NATIONAL_ANALYTICS_DATA = {
  totalApplications: 12842,
  underVerification: 3241,
  deficienciesIdentified: 842,
  totalSelected: 1204,
  pendingDisbursement: 328,
  fundsDisbursedCr: 155.8,
  avgProcessingDaysManual: 124,
  avgProcessingDaysAI: 14,
  aiAutoVerifyRate: 74.2, // %
  fraudDetectedCount: 38,
  pvtgApplicants: 1420,
  pvtgBeneficiaries: 395,
  genderRatioFemalePercent: 51.8,
  schemeBreakdown: [
    { scheme: 'NFST', applications: 5420, verified: 4821, selected: 1102, fundsCr: 78.4 },
    { scheme: 'NOS', applications: 2840, verified: 2341, selected: 482, fundsCr: 16.2 },
    { scheme: 'Top Class ST', applications: 4582, verified: 4120, selected: 940, fundsCr: 61.2 }
  ],
  statePerformance: [
    { state: 'Jharkhand', applications: 3840, selected: 420, fundsCr: 36.2, pvtgCount: 420 },
    { state: 'Odisha', applications: 3410, selected: 390, fundsCr: 34.8, pvtgCount: 380 },
    { state: 'Madhya Pradesh', applications: 3120, selected: 340, fundsCr: 29.5, pvtgCount: 310 },
    { state: 'Chhattisgarh', applications: 2450, selected: 270, fundsCr: 23.4, pvtgCount: 220 },
    { state: 'Maharashtra', applications: 1980, selected: 195, fundsCr: 17.6, pvtgCount: 85 },
    { state: 'Assam & NE States', applications: 1840, selected: 180, fundsCr: 15.2, pvtgCount: 40 },
    { state: 'Rajasthan', applications: 1120, selected: 110, fundsCr: 9.8, pvtgCount: 15 },
    { state: 'Gujarat', applications: 980, selected: 92, fundsCr: 8.2, pvtgCount: 12 },
    { state: 'Others (Telangana, AP, etc.)', applications: 710, selected: 73, fundsCr: 6.5, pvtgCount: 38 }
  ],
  aiInsights: [
    {
      title: 'Regional Deficiency Pattern',
      description: 'Maharashtra has a 21% higher document deficiency rate than the national average. Most common deficiency: Income Certificate (43%).',
      suggestedAction: 'Deploy pre-submission AI validator on Tehsil income portal API.'
    },
    {
      title: 'PVTG Outreach Opportunity',
      description: 'Particularly Vulnerable Tribal Groups in Dindori (MP) and Bastar (CG) show a 34% increase in Ph.D. enrollments following mobile AI pre-check.',
      suggestedAction: 'Allocate 15 additional dedicated contingency slots under NFST.'
    }
  ]
};

export const AI_TECH_MAPPING = [
  { module: 'Scheme Matching', tech: 'Hybrid Rule Engine + Recommendation NLP', purpose: 'Pre-screens 14 demographic & academic criteria before student applies' },
  { module: 'Eligibility Determination', tech: 'Deterministic Rules + Explainable AI', purpose: 'RTI-compliant, legally defensible point-by-point qualification score' },
  { module: 'Document Intelligence', tech: 'OCR + NLP Entity Parsing (Vision ST v2.4)', purpose: 'Extracts names, dates, seals, certificate IDs with confidence scores' },
  { module: 'Deficiency Detection', tech: 'NLP Semantic Validation + Expiry Rules', purpose: 'Detects expired dates, missing synopsis, blurred revenue stamps' },
  { module: 'Application Triage', tech: 'Multi-Factor Risk Classification Engine', purpose: 'Classifies applications into Ready 🟢, Review 🟡, Deficient 🔴' },
  { module: 'Fraud & Anomaly Check', tech: 'Cross-Entity Graph Matching', purpose: 'Flags duplicate bank details, identical photo hashes, and multi-identity claims' },
  { module: 'Grievance Redressal', tech: 'NLP Intent Classifier & Smart Router', purpose: 'Auto-categorizes complaints and assigns priority to DDO / Scrutiny officers' },
  { module: 'VidyaMitra Copilot', tech: 'Multilingual LLM + Web Speech Synthesis', purpose: 'Answers scheme rules in natural language with voice audio assistance' },
  { module: 'Executive Analytics', tech: 'Predictive What-If Modeling & GIS Heatmap', purpose: 'Simulates budgetary & beneficiary impact of rule and quota adjustments' }
];

export const MOTA_MANDATE_MAPPING = [
  { motaMandate: 'End-to-end digital application management', vidyaSetuFeature: '5-Step Smart Wizard, DigiLocker SSO, 6-Stage Visual Pipeline' },
  { motaMandate: 'Configurable scheme-specific eligibility & rules', vidyaSetuFeature: 'No-Code Scheme Config Studio + 10,000 Application Pool Simulator' },
  { motaMandate: 'Automated document verification using AI / OCR', vidyaSetuFeature: 'Dual-Pane OCR Inspector, Bounding Boxes, Tamper/Forgery Analysis' },
  { motaMandate: 'Identification of deficient/incomplete applications', vidyaSetuFeature: 'AI Deficiency Detection Desk with 15-day window & instant AI re-scan' },
  { motaMandate: 'Transparent screening and selection with human oversight', vidyaSetuFeature: 'Explainable AI Composite Scoring Engine + Officer Decision Gateway' },
  { motaMandate: 'Separate interfaces for applicants and administrators', vidyaSetuFeature: 'Dedicated Student Portal vs MoTA Executive Admin Hub' },
  { motaMandate: 'Application tracking, deficiency resubmission & communication', vidyaSetuFeature: 'Real-time Tracker, Automated SMS/Email Engine, 1-Click Rectification' },
  { motaMandate: 'Post-selection & fellowship lifecycle management', vidyaSetuFeature: 'Supervisor QPR Endorsement Gate, Direct Benefit Transfer (DBT/PFMS)' },
  { motaMandate: 'Dashboards & analytics for scheme performance monitoring', vidyaSetuFeature: 'National GIS Heatmap, 88% TAT Drop Analytics, PVTG Outreach Index' }
];
