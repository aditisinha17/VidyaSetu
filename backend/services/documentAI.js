// VidyaSetu Document Intelligence & Pre-Scrutiny Service
// Performs simulated OCR text extraction, field parsing, seal detection, and validity auditing.

export class DocumentAIService {
  /**
   * Analyzes an uploaded document for candidate verification.
   * @param {Object} document - Document metadata or file details
   * @param {Object} candidate - Applicant details to cross-verify against
   * @returns {Object} Extraction results, confidence, and detected deficiencies
   */
  static analyzeDocument(document, candidate) {
    const docName = (document.name || '').toLowerCase();

    // 1. Income Certificate Analysis
    if (docName.includes('income')) {
      const isDefective = document.isDefective || document.issueYear < 2025 || (document.fileNumber && document.fileNumber.includes('2023'));

      if (isDefective) {
        return {
          documentName: document.name || 'Income Certificate',
          fileNumber: document.fileNumber || 'INC/JH/2023/1029',
          issuingAuthority: 'Circle Officer, Kanke, Ranchi',
          issueDate: '15-01-2023',
          incomeExtracted: '₹4,20,000',
          ocrConfidence: 96.4,
          tamperScore: 0.02,
          quality: 'CLEAR',
          nameMatch: 100,
          status: 'DEFICIENT',
          findings: [
            { check: 'Candidate Name Cross-Check', result: 'PASS', detail: `Name matches "${candidate?.name || 'Birsa Hemrom'}"` },
            { check: 'Revenue Authority Seal', result: 'PASS', detail: 'Circle Officer seal recognized' },
            { check: 'Certificate Validity Window', result: 'FAIL', detail: 'Issued in Jan 2023. Validity period of 1 financial year has lapsed.' },
            { check: 'Annual Income Ceiling', result: 'PASS', detail: '₹4,20,000 is within scheme ceiling' }
          ],
          deficiencyNotice: {
            code: 'DEF-INC-EXPIRED',
            title: 'Income Certificate Validity Lapsed',
            description: 'The uploaded Income Certificate was issued in January 2023. Government guidelines require an Income Certificate valid for the current Financial Year (FY 2026-27).',
            actionRequired: 'Upload a fresh Income Certificate issued by Tehsildar / SDO for FY 2026-27.',
            deadlineDays: 14
          }
        };
      }

      // Valid Income Certificate
      return {
        documentName: document.name || 'Income Certificate (FY 2026-27)',
        fileNumber: document.fileNumber || 'JH/INC/2026/01922',
        issuingAuthority: 'Sub-Divisional Officer (SDO), Ranchi',
        issueDate: '12-06-2026',
        incomeExtracted: '₹4,20,000',
        ocrConfidence: 97.8,
        tamperScore: 0.01,
        quality: 'EXCELLENT',
        nameMatch: 100,
        status: 'VERIFIED',
        findings: [
          { check: 'Candidate Name Cross-Check', result: 'PASS', detail: `Name matches "${candidate?.name || 'Birsa Hemrom'}"` },
          { check: 'Revenue Authority Seal & Barcode', result: 'PASS', detail: 'SDO Ranchi digital signature & barcode valid' },
          { check: 'Certificate Validity Window', result: 'PASS', detail: 'Issued 12-06-2026 for FY 2026-27' },
          { check: 'Annual Income Ceiling', result: 'PASS', detail: '₹4,20,000 satisfies scheme ceiling (≤ ₹6,00,000)' }
        ],
        deficiencyNotice: null
      };
    }

    // 2. ST Caste Certificate Analysis
    if (docName.includes('caste') || docName.includes('st')) {
      return {
        documentName: 'ST Caste Certificate',
        fileNumber: document.fileNumber || 'JH/RAN/2021/ST/8821',
        issuingAuthority: 'Sub-Divisional Officer, Ranchi',
        issueDate: '10-08-2021',
        ocrConfidence: 99.1,
        tamperScore: 0.01,
        quality: 'EXCELLENT',
        nameMatch: 100,
        status: 'VERIFIED',
        findings: [
          { check: 'Tribe Schedule VI Mapping', result: 'PASS', detail: `${candidate?.tribe || 'Santhal'} verified against Central ST Gazette` },
          { check: 'Issuing Officer Competence', result: 'PASS', detail: 'SDO / Sub-Divisional Magistrate is authorized issuing authority' },
          { check: 'Permanent Validity', result: 'PASS', detail: 'Caste certificate holds lifelong statutory validity' }
        ],
        deficiencyNotice: null
      };
    }

    // Default Document Verification
    return {
      documentName: document.name || 'Academic Record',
      fileNumber: document.fileNumber || 'DOC-REF-2026',
      issuingAuthority: document.issuingAuthority || 'Competent Authority',
      issueDate: '2026-06-15',
      ocrConfidence: 98.2,
      tamperScore: 0.01,
      quality: 'GOOD',
      nameMatch: 100,
      status: 'VERIFIED',
      findings: [
        { check: 'Digital Signature / Seal', result: 'PASS', detail: 'Signature verified' },
        { check: 'Candidate Identity Match', result: 'PASS', detail: 'Name and credentials match application' }
      ],
      deficiencyNotice: null
    };
  }

  /**
   * Evaluates a replacement document submitted by the student to resolve a deficiency.
   */
  static processReplacement(documentType, fileData, candidate) {
    return {
      success: true,
      documentType,
      previousStatus: 'DEFICIENT (Expired validity)',
      newStatus: 'VERIFIED (Ready for human review)',
      reScanDetails: {
        candidateName: candidate?.name || 'Birsa Hemrom',
        extractedIncome: '₹4,20,000',
        certificateNo: 'JH/INC/2026/01922',
        issueDate: '12-06-2026 (Valid FY 2026-27)',
        issuingAuthority: 'Sub-Divisional Officer, Ranchi',
        barcodeHash: 'SHA256:7f89..b19a',
        ocrConfidence: 98.4,
        tamperScore: 0.01
      },
      message: 'Document intelligence re-scan successful: All deficiencies cleared. Case file advanced to Ready for Scrutiny Review.'
    };
  }
}
