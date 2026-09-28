import React from 'react';
import { 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  Scan, 
  ShieldCheck, 
  FileText, 
  Sparkles, 
  Maximize2, 
  Hash, 
  Calendar, 
  MapPin, 
  UserCheck 
} from 'lucide-react';

export function DocumentViewerModal({ doc, applicant, onClose }) {
  if (!doc) return null;

  const isVerified = doc.status === 'VERIFIED';

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-300 max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-blue-600/30 text-blue-400 border border-blue-500/30">
              <Scan className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-lg text-white">{doc.name}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                  isVerified ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                }`}>
                  {isVerified ? 'AI VERIFIED' : 'DEFICIENT / FLAGGED'}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Applicant: <strong className="text-slate-200">{applicant?.name}</strong> • Scheme: {applicant?.schemeId} • File Ref: {doc.fileNumber}
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Dual-Pane Document View & AI Extraction */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 overflow-y-auto">
          {/* Left Pane: Document Canvas Simulation */}
          <div className="p-6 bg-slate-100 flex flex-col items-center justify-center">
            <div className="w-full max-w-sm bg-amber-50/70 border-2 border-dashed border-amber-300 p-6 rounded-lg shadow-md relative font-serif text-slate-800 text-xs">
              {/* Scan Overlay Effect */}
              <div className="absolute inset-0 bg-blue-500/5 pointer-events-none border border-blue-400/30 rounded-lg">
                <div className="absolute left-0 right-0 h-0.5 bg-blue-500/60 shadow-lg shadow-blue-500 animate-scan"></div>
              </div>

              {/* Watermark / Header */}
              <div className="text-center pb-3 border-b border-amber-300/60">
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Government of India / State Gazette</div>
                <div className="text-xs font-black uppercase text-slate-900 mt-0.5">Competent Revenue Authority</div>
                <div className="text-[10px] text-slate-600">{doc.issuingAuthority}</div>
              </div>

              {/* Certificate Body */}
              <div className="py-4 space-y-3">
                <div className="flex justify-between items-center text-[10px] text-slate-500">
                  <span>Ref: {doc.fileNumber}</span>
                  <span>Date: {doc.status === 'DEFICIENT' ? '15-01-2023 (EXPIRED)' : '14-06-2026'}</span>
                </div>

                <div className="p-2.5 bg-white/80 rounded border border-amber-200 text-slate-800 leading-relaxed font-sans text-xs">
                  {doc.extractedText}
                </div>

                {/* Simulated Bounding Box */}
                <div className="relative border-2 border-emerald-500 bg-emerald-500/10 p-2 rounded text-[11px] font-sans">
                  <div className="absolute -top-2.5 left-2 bg-emerald-600 text-white text-[9px] px-1.5 py-0.2 rounded font-bold">
                    OCR MATCH: 99.4%
                  </div>
                  <div>Applicant Name: <strong className="text-slate-900">{applicant?.name}</strong></div>
                  <div>Tribe: <strong className="text-blue-900">{applicant?.tribe}</strong> (Recognized ST)</div>
                </div>

                {/* Seal & Signature stamp simulation */}
                <div className="pt-4 flex justify-between items-end text-[10px]">
                  <div className="w-14 h-14 rounded-full border-2 border-blue-800/60 flex flex-col items-center justify-center p-1 text-center text-[7px] text-blue-900 font-bold rotate-[-12deg]">
                    <span>OFFICIAL SEAL</span>
                    <span className="text-[6px]">{applicant?.district || 'DISTRICT'}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-serif italic font-semibold text-slate-700">Digitally Signed</div>
                    <div className="text-[9px] text-slate-500 font-sans">Revenue Officer / SDO</div>
                  </div>
                </div>
              </div>

              {/* QR Code Hash simulation */}
              <div className="pt-2 border-t border-amber-200 flex items-center justify-between text-[9px] text-slate-400 font-mono">
                <span>SHA-256: 8a4f91...c3e0</span>
                <span className="text-emerald-700 font-sans font-semibold">✓ Digital Signature Valid</span>
              </div>
            </div>

            <div className="mt-3 text-xs text-slate-500 flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Cryptographically cross-verified with State Land & Caste Repositories</span>
            </div>
          </div>

          {/* Right Pane: AI Intelligence Insights & Fraud Analysis */}
          <div className="p-6 flex flex-col justify-between space-y-5 bg-white">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-slate-900 flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>AI Document Intelligence Report</span>
                </h4>
                <span className="text-xs text-slate-500">Engine: MoTA-Vision-ST v2.4</span>
              </div>

              {/* Confidence & Tamper Metric Cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[11px] text-slate-500 font-medium">OCR Confidence</div>
                  <div className="text-xl font-black text-slate-900 mt-1 flex items-baseline space-x-1">
                    <span>{doc.confidence}%</span>
                    <span className={`text-[10px] font-bold ${doc.confidence > 90 ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {doc.confidence > 90 ? 'HIGH' : 'MED'}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[11px] text-slate-500 font-medium">Forgery / Tamper Risk</div>
                  <div className="text-xl font-black mt-1 flex items-baseline space-x-1">
                    <span className={doc.tamperScore < 0.05 ? 'text-emerald-600' : 'text-rose-600'}>
                      {(doc.tamperScore * 100).toFixed(1)}%
                    </span>
                    <span className={`text-[10px] font-bold ${doc.tamperScore < 0.05 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {doc.tamperScore < 0.05 ? 'NO TAMPERING' : 'FLAGGED'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Cross Verification Checks */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wide">Automated Checklist</div>

                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs flex items-start space-x-2 text-emerald-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-semibold">Tribe & Gazette Validation</strong>
                    <span>Candidate tribe <strong>{applicant?.tribe}</strong> maps to Central ST List (Gazette of India Schedule VI).</span>
                  </div>
                </div>

                <div className={`p-2.5 rounded-lg border text-xs flex items-start space-x-2 ${
                  isVerified ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'
                }`}>
                  {isVerified ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <strong className="block font-semibold">Validity Period & Authority Check</strong>
                    <span>
                      {isVerified 
                        ? 'Certificate is within validity threshold. Issuing officer authorized.'
                        : 'Certificate validity has lapsed. Revenue seal clarity below 70% threshold.'}
                    </span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200 text-xs flex items-start space-x-2 text-blue-900">
                  <UserCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-semibold">Name & DOB Phonetic Similarity</strong>
                    <span>Aadhaar match: 98.6% phonetic similarity. No alias conflict found.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-200 flex justify-end space-x-2">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow transition"
              >
                Close Document Preview
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
