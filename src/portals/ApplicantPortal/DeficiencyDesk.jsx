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
  Send
} from 'lucide-react';

export function DeficiencyDesk({ applicant, onResolveDeficiency }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isReScanning, setIsReScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [applicantRemarks, setApplicantRemarks] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!applicant || !applicant.deficiency) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 shadow-sm">
        <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
        <h3 className="text-base font-bold text-slate-900">No Pending Deficiencies</h3>
        <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
          Your application credentials have passed all initial AI checks and Scrutiny Officer verifications without queries.
        </p>
      </div>
    );
  }

  const def = applicant.deficiency;

  const handleSimulateUpload = (e) => {
    const file = e.target.files?.[0] || { name: 'Fresh_Income_Certificate_FY2026_27_Tahasildar.pdf' };
    setSelectedFile(file);
    setIsReScanning(true);

    setTimeout(() => {
      setIsReScanning(false);
      setScanResult({
        success: true,
        confidence: 99.4,
        dateDetected: '18-09-2026 (Valid FY 2026-27)',
        authority: 'Tahasildar, Baripada (Digital Barcode Verified)',
        incomeAmount: '₹3,10,000'
      });
    }, 1200);
  };

  const handleSendResponse = () => {
    onResolveDeficiency(applicant.id, applicantRemarks);
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Deficiency Alert Banner */}
      <div className="p-6 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-start space-x-3.5">
          <div className="p-2.5 rounded-xl bg-rose-600 text-white shrink-0 mt-0.5 shadow-sm">
            <AlertTriangle className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold bg-rose-200 text-rose-900 px-2 py-0.5 rounded">
                {def.code}
              </span>
              <h2 className="text-base font-bold text-rose-900">{def.title}</h2>
            </div>
            <p className="text-xs text-rose-800 mt-1 max-w-2xl">{def.description}</p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-[11px] text-rose-700 font-semibold flex items-center space-x-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Resolution Deadline: <strong>{def.deadline}</strong></span>
          </div>
          <span className="text-[10px] text-rose-600">Action required within 15 days to retain seniority</span>
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
            <span>Upload Corrected Document with Instant AI Validation</span>
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
        <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
          <h3 className="text-base font-bold text-slate-900">Deficiency Rectification Submitted Successfully!</h3>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            Your fresh certificate and explanation have been queued in the MoTA Central Scrutiny Officer priority inbox. The verification officer has been notified via SMS & Portal alert.
          </p>
        </div>
      )}
    </div>
  );
}
