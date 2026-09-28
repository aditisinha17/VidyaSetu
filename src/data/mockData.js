// Comprehensive Mock Data for Ministry of Tribal Affairs (MoTA) Scholarship & Fellowship System

export const INITIAL_SCHEMES = [
  {
    id: 'NFST',
    name: 'National Fellowship for Scheduled Tribe Students',
    shortName: 'NFST',
    category: 'Higher Education (Ph.D. / M.Phil)',
    description: 'Financial assistance to ST scholars pursuing regular and full-time M.Phil and Ph.D. degrees in Sciences, Humanities, Social Sciences and Engineering & Technology in Indian Universities/Institutes.',
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
    ]
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
    ]
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
    ]
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
    aiScore: 94,
    aiRiskLevel: 'LOW',
    aiVerdict: 'AI Pre-Check Passed. All 6 documents verified with high confidence.',
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
        { month: 'August 2026', amount: 43660, status: 'Credited', utr: 'RBI2408159982103' },
        { month: 'September 2026', amount: 43660, status: 'Processing DBT', utr: 'Pending NPCI clearance' }
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
    aiScore: 98,
    aiRiskLevel: 'LOW',
    aiVerdict: 'Top tier application. PVTG Scholar from Bastar. Unconditional Oxford Offer (QS #3). High priority for award.',
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
        { month: 'Term 1 Maintenance', amount: 412500, status: 'Credited', utr: 'FEDWIRE-BOI-2026-0901' },
        { month: 'Tuition Fee Tranche 1', amount: 1625000, status: 'Paid to Oxford University', utr: 'SWIFT-SBI-2026-OXF1' }
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
    aiScore: 68,
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
      }
    ],
    deficiency: {
      code: 'DEF-INC-EXPIRED',
      title: 'Income Certificate Expired & Unclear Stamp',
      description: 'The uploaded Income Certificate was issued in January 2023 and has expired. As per MoTA scheme guidelines, income certificate must be valid for financial year 2026-27 or issued within the last 12 months.',
      actionRequired: 'Upload fresh Income Certificate issued by competent Revenue Authority (Tehsildar/SDM) for current FY.',
      raisedOn: '2026-09-16',
      deadline: '2026-10-05',
      officerRemarks: 'Please upload the latest certificate with clear digital barcode or official seal before next screening meeting.'
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
    pgMarks: 94.5, // 12th Board marks
    netScore: 'JEE Advanced ST Category Rank: 14',
    annualIncome: 120000,
    submissionDate: '2026-09-08',
    status: 'AI Verified',
    stage: 2,
    aiScore: 97,
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
    pvtg: true, // PVTG in MP
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
    aiScore: 92,
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
    deficiency: null,
    fellowshipDetails: null
  }
];

export const NATIONAL_ANALYTICS_DATA = {
  totalApplications: 18450,
  verifiedApplications: 14210,
  deficienciesIdentified: 2430,
  deficienciesResolved: 2180,
  totalSelected: 1770,
  fundsDisbursedCr: 155.8,
  avgProcessingDaysManual: 124,
  avgProcessingDaysAI: 14,
  aiAutoVerifyRate: 74.2, // %
  fraudDetectedCount: 38,
  pvtgApplicants: 1420,
  pvtgBeneficiaries: 395,
  genderRatioFemalePercent: 51.8,
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
  ]
};
