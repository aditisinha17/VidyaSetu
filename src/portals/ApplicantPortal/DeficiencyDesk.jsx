import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Upload, 
  CheckCircle2, 
  Clock, 
  FileText, 
  ArrowRight, 
  Sparkles,
  ShieldCheck,
  Send,
  Download,
  ExternalLink,
  QrCode
} from 'lucide-react';
import { ApiClient } from '../../services/apiClient';

export function DeficiencyDesk({ applicant, onResolveDeficiency, onSwitchToOfficer, onViewDoc }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isReScanning, setIsReScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [applicantRemarks, setApplicantRemarks] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const def = applicant?.deficiency || null;
  const docs = applicant?.documents || [];

  const handleSimulateUpload = (e) => {
    const defaultName = applicant?.id === 'MOTA-2026-NFST-0101'
      ? 'Fresh_Income_Certificate_FY2026_27_SDO_Ranchi.pdf'
      : 'Fresh_Income_Certificate_FY2026_27_Tahasildar.pdf';
    const file = e.target.files?.[0] || { name: defaultName };
    setSelectedFile(file);
    setIsReScanning(true);

    setTimeout(() => {
      setIsReScanning(false);
      setScanResult({
        success: true,
        confidence: 98.4,
        dateDetected: '12-06-2026 (Valid FY 2026-27)',
        authority: applicant?.id === 'MOTA-2026-NFST-0101' 
          ? 'Sub-Divisional Officer, Ranchi (SDO Digital Barcode Verified)' 
          : 'Tahasildar (Digital Seal Verified)',
        incomeAmount: applicant?.annualIncome ? `₹${applicant.annualIncome.toLocaleString()}` : '₹4,20,000',
        nameMatch: 100,
        candidateName: applicant?.name || 'Applicant'
      });
    }, 1000);
  };

  const handleSendResponse = () => {
    if (applicant?.id && onResolveDeficiency) {
      onResolveDeficiency(applicant.id, applicantRemarks);
    }
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* 1. DOCUMENT VAULT & VERIFICATION REPOSITORY */}
      <div data-tour="docs-checklist" className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <FileText className="w-4 h-4 text-blue-900" />
              <span>Document Verification Repository</span>
            </h2>
            <p className="text-xs text-slate-500">
              Cryptographic OCR verification and statutory compliance records for application: <strong className="text-slate-800 font-mono">{applicant?.id || 'NO ACTIVE APPLICATION'}</strong>
            </p>
          </div>

          <div data-tour="download-slip" className="flex items-center space-x-2">
            <a
              href={ApiClient.getApplicationSlipUrl(applicant?.id || 'MOTA-2026-NFST-0101', 'acknowledgment')}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-xs flex items-center space-x-1.5 transition"
            >
              <QrCode className="w-3.5 h-3.5 text-amber-400" />
              <span>Download Acknowledgment Slip (QR)</span>
            </a>
          </div>
        </div>

        {docs.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300 space-y-2">
            <p className="text-xs text-slate-500 font-medium">
              No certificates uploaded yet. Complete the Application Wizard to submit certificates for automated OCR scrutiny.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {docs.map((doc, idx) => (
              <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 flex flex-wrap items-center justify-between gap-3 transition">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${doc.status === 'DEFICIENT' ? 'bg-rose-100 text-rose-800' : 'bg-blue-100 text-blue-900'}`}>
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">{doc.name}</div>
                    <div className="text-[11px] text-slate-500">
                      {doc.issuingAuthority} • Issued: {doc.issueDate}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded border ${
                    doc.status === 'DEFICIENT'
                      ? 'bg-rose-100 text-rose-800 border-rose-300'
                      : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                  }`}>
                    {doc.status === 'DEFICIENT' ? '⚠️ DEFICIENT' : '✓ VERIFIED'}
                  </span>
                  {doc.confidence && (
                    <span className="text-[11px] font-mono text-slate-600 bg-white px-2 py-0.5 rounded border">
                      OCR: {doc.confidence}%
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 2. DEFICIENCY RESOLUTION DESK */}
      <div data-tour="deficiency-action" className="space-y-4">
        {!def ? (
          <div className="p-6 text-center bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">Zero Deficiencies Flagged</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              All submitted certificates meet statutory requirements. If an officer issues a query, the 14-day SLA resolution desk will activate here with queue seniority preservation.
            </p>
          </div>
        ) : (
          <>
            {/* Deficiency Alert Banner */}
            <div className="p-6 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-start space-x-3.5">
                <div className="p-2.5 rounded-xl bg-rose-600 text-white shrink-0 mt-0.5 shadow-sm">
                  <AlertTriangle className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold bg-rose-200 text-rose-900 px-2 py-0.5 rounded">
                      {def.code || 'DEF-NOTICE'}
                    </span>
                    <h2 className="text-base font-bold text-rose-900">{def.title}</h2>
                  </div>
                  <p className="text-xs text-rose-800 mt-1 max-w-2xl">{def.description}</p>
                </div>
              </div>

              <div className="text-right">
                <div className="text-[11px] text-rose-700 font-semibold flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Resolution Deadline: <strong>{def.deadline || '14 Days'}</strong></span>
                </div>
                <span className="text-[10px] text-rose-600">Seniority is protected under MoTA guidelines</span>
              </div>
            </div>

            {/* Scrutiny Officer Remarks */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Scrutiny Officer Observation & Official Remark:
              </div>
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 italic">
                "{def.officerRemarks}"
              </div>
              <div className="text-xs font-semibold text-slate-700">
                Required Action: <span className="text-blue-900 font-bold">{def.actionRequired}</span>
              </div>
            </div>

            {/* Resolution & Re-Upload Portal */}
            {!isSubmitted ? (
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5">
                <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-blue-900" />
                  <span>Upload Corrected Document with Real-Time OCR Validation</span>
                </h3>

                {/* File Upload Box */}
                <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-6 text-center bg-slate-50 transition cursor-pointer relative">
                  <input 
                    type="file" 
                    onChange={handleSimulateUpload} 
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <Upload className="w-8 h-8 text-blue-900 mx-auto mb-2" />
                  <div className="text-xs font-bold text-slate-800">
                    {selectedFile ? selectedFile.name : 'Click or drag fresh document here to upload'}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Supports PDF, JPG, PNG up to 10MB. AI will automatically verify seal, date, and digital signatures.
                  </p>
                </div>

                {/* Simulated AI Re-Scan Output */}
                {isReScanning && (
                  <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-center space-x-3">
                    <div className="w-4 h-4 rounded-full border-2 border-blue-900 border-t-transparent animate-spin"></div>
                    <span>VidyaSetu OCR Engine scanning replacement document...</span>
                  </div>
                )}

                {scanResult && (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-950 space-y-2 animate-in fade-in">
                    <div className="flex items-center space-x-2 font-bold text-emerald-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>AI Re-Scrutiny Passed! (Confidence: {scanResult.confidence}%)</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-emerald-900 font-medium">
                      <div>Issue Date: <strong>{scanResult.dateDetected}</strong></div>
                      <div>Authority: <strong>{scanResult.authority}</strong></div>
                      <div>Income Stated: <strong>{scanResult.incomeAmount}</strong></div>
                    </div>
                    <p className="text-[11px] text-emerald-700">
                      This document satisfies the current FY requirement and can now be forwarded to the Scrutiny Officer for immediate re-clearance.
                    </p>
                  </div>
                )}

                {/* Applicant Explanatory Note */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Applicant Remarks / Response Note (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={applicantRemarks}
                    onChange={(e) => setApplicantRemarks(e.target.value)}
                    placeholder="e.g., Respected Officer, I have obtained the fresh income certificate for FY 2026-27 from the Tahasildar with digital QR code and uploaded it."
                    className="w-full px-3 py-2 text-xs border rounded-xl focus:ring-1 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                {/* Submit Response Button */}
                <div className="flex justify-end">
                  <button
                    onClick={handleSendResponse}
                    disabled={!scanResult}
                    className="flex items-center space-x-2 px-6 py-2.5 bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold rounded-xl shadow-md transition disabled:opacity-40"
                  >
                    <Send className="w-4 h-4 text-amber-300" />
                    <span>Submit Rectified Document to MoTA Desk</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 font-serif">
                    Deficiency Rectification Verified & Submitted!
                  </h3>
                  <span className="inline-block mt-1 text-xs font-bold font-mono bg-emerald-100 text-emerald-800 border border-emerald-300 px-3 py-0.5 rounded-full">
                    STATUS: READY FOR HUMAN REVIEW
                  </span>
                </div>

                <div className="max-w-md mx-auto p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-left space-y-1.5 font-medium text-slate-700">
                  <div className="flex justify-between">
                    <span>Previous Document:</span>
                    <strong className="text-rose-600">❌ Deficient (Expired Validity)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Replacement Document:</span>
                    <strong className="text-emerald-700">✓ Valid FY 2026-27 (SDO Ranchi)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Candidate Name Match:</span>
                    <strong className="text-emerald-700">100% ({applicant?.name})</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Audit Chain Link:</span>
                    <strong className="text-blue-900 font-mono text-[11px]">SHA-256 Chained Block Appended</strong>
                  </div>
                </div>

                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Your application <strong>{applicant?.id}</strong> has automatically transitioned out of DEFICIENT status into the Ministry Scrutiny Officer's prioritized <strong>READY</strong> queue.
                </p>

                {onSwitchToOfficer && (
                  <div className="pt-2">
                    <button
                      onClick={onSwitchToOfficer}
                      className="px-6 py-2.5 bg-gradient-to-r from-blue-900 to-indigo-900 hover:from-blue-800 hover:to-indigo-800 text-white font-bold rounded-xl text-xs shadow-md transition"
                    >
                      Switch to Ministry Officer Scrutiny Desk (Dual-Pane Workstation) ➔
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
