import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  FileText, 
  Sparkles, 
  Download, 
  ShieldCheck, 
  ChevronRight,
  UserCheck,
  Building,
  GraduationCap,
  Landmark,
  ArrowRight
} from 'lucide-react';

const STAGES = [
  { id: 1, label: 'Application Submitted', desc: 'DigiLocker KYC & Form Completed' },
  { id: 2, label: 'AI Pre-Verification', desc: 'OCR, Caste Gazette & Ceiling Audit' },
  { id: 3, label: 'District Scrutiny Desk', desc: 'Revenue Authority Verification' },
  { id: 4, label: 'Ministry Scrutiny Officer', desc: 'MoTA Level-1 Scrutiny Approval' },
  { id: 5, label: 'Selection Committee', desc: 'Merit List & Quota Evaluation' },
  { id: 6, label: 'Award & DBT Active', desc: 'Sanction Order & Monthly Stipend' }
];

export function ApplicationTracker({ applicant, onViewDoc, onViewAwardLetter, onOpenDeficiency, onStartApplication }) {
  if (!applicant) {
    return (
      <div className="space-y-6">
        <div data-tour="seniority-badge" className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm text-center space-y-3">
          <Clock className="w-10 h-10 text-blue-900 mx-auto" />
          <h2 className="text-base font-bold text-slate-900">No Application Currently in Pipeline</h2>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Once you submit an application, you will be assigned a permanent Queue Seniority timestamp protected under MoTA guidelines Section 4.1.
          </p>
        </div>

        <div data-tour="tracker-timeline" className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 mb-6 flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-blue-900" />
            <span>Standard 6-Stage MoTA Verification Pipeline</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            {STAGES.map((s) => (
              <div key={s.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-600">
                <div className="text-[10px] font-mono font-bold text-slate-400">STAGE {s.id}</div>
                <div className="font-bold text-xs mt-1 text-slate-800">{s.label}</div>
                <div className="text-[10px] mt-2 text-slate-500">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div data-tour="disbursal-status" className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center space-x-2">
            <Landmark className="w-4 h-4 text-blue-900" />
            <span>PFMS Direct Benefit Transfer (DBT) Status</span>
          </h3>
          <p className="text-xs text-slate-500">
            Aadhaar Payment Bridge (APB) mandate will automatically activate upon Selection Committee approval and Sanction Order issuance.
          </p>
        </div>
      </div>
    );
  }

  const currentStage = applicant.stage || 1;
  const isSelected = applicant.status === 'Selected' || applicant.status === 'AWARDED';
  const hasDeficiency = applicant.status === 'Deficiency Pending' || applicant.status === 'DEFICIENT';

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Application Summary Banner */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div data-tour="seniority-badge" className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-blue-100 text-blue-900 border border-blue-200">
              {applicant.id}
            </span>
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-900 border border-emerald-300 flex items-center space-x-1">
              <span>Queue Seniority:</span>
              <strong className="text-emerald-700">{applicant.submissionDate || '2026-09-01'} (Protected)</strong>
            </span>
            <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold flex items-center space-x-1 ${
              isSelected 
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                : hasDeficiency 
                  ? 'bg-rose-100 text-rose-800 border border-rose-300 animate-pulse'
                  : 'bg-amber-100 text-amber-800 border border-amber-300'
            }`}>
              {isSelected ? <CheckCircle2 className="w-3.5 h-3.5" /> : hasDeficiency ? <AlertTriangle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
              <span>{applicant.status}</span>
            </span>
            {applicant.pvtg && (
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 font-bold border border-purple-200">
                PVTG Priority Candidate
              </span>
            )}
          </div>

          <h2 className="text-lg font-bold text-slate-900 mt-2 font-serif">{applicant.schemeName}</h2>
          <p className="text-xs text-slate-600">
            Enrolled for: <strong className="text-slate-800">{applicant.degree}</strong> at <strong className="text-blue-900">{applicant.institution}</strong>
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {hasDeficiency && onOpenDeficiency && (
            <button
              onClick={() => onOpenDeficiency(applicant)}
              className="flex items-center space-x-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl shadow transition"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Resolve Deficiency Notice</span>
            </button>
          )}

          {isSelected && onViewAwardLetter && (
            <button
              onClick={() => onViewAwardLetter(applicant)}
              className="flex items-center space-x-1.5 px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold rounded-xl shadow-md transition"
            >
              <Download className="w-4 h-4 text-amber-300" />
              <span>Download Official Award Letter</span>
            </button>
          )}
        </div>
      </div>

      {/* Visual Interactive Pipeline */}
      <div data-tour="tracker-timeline" className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
        <h3 className="text-sm font-bold text-slate-900 mb-6 flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-blue-900" />
          <span>Real-Time Multi-Stage Scrutiny & Award Pipeline</span>
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {STAGES.map((s) => {
            const isCompleted = currentStage > s.id;
            const isCurrent = currentStage === s.id;
            const isPending = currentStage < s.id;

            return (
              <div
                key={s.id}
                className={`p-3.5 rounded-xl border transition-all ${
                  isCompleted
                    ? 'border-emerald-500 bg-emerald-50/50 text-emerald-900'
                    : isCurrent
                      ? hasDeficiency
                        ? 'border-rose-500 bg-rose-50/50 text-rose-900 ring-2 ring-rose-500/20'
                        : 'border-blue-900 bg-blue-50/50 text-blue-900 ring-2 ring-blue-900/20'
                      : 'border-slate-200 bg-slate-50 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono font-bold">
                  <span>STAGE {s.id}</span>
                  {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                  {isCurrent && (
                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
                  )}
                </div>
                <div className="font-bold text-xs mt-1 text-slate-900">{s.label}</div>
                <div className="text-[10px] mt-2 opacity-80">{s.desc}</div>
              </div>
            );
          })}
        </div>

        {/* AI Insight Box for Current Stage */}
        <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start space-x-3 text-xs">
          <div className="p-2 rounded-lg bg-blue-900 text-white shrink-0">
            <Sparkles className="w-4 h-4 text-amber-300" />
          </div>
          <div>
            <div className="font-bold text-slate-900">AI Scrutiny & Governance Log:</div>
            <p className="text-slate-600 mt-0.5">{applicant.aiVerdict || 'Application in active MoTA verification pipeline.'}</p>
            <div className="mt-2 flex items-center space-x-4 text-[11px] text-slate-500 font-mono">
              <span>AI Health Score: <strong className="text-slate-800">{applicant.healthScore?.finalScore || applicant.aiScore || 92}%</strong></span>
              <span>•</span>
              <span>Risk Tier: <strong className="text-emerald-700">{applicant.aiRiskLevel || 'LOW'}</strong></span>
              <span>•</span>
              <span>Submission Date: <strong>{applicant.submissionDate || '2026-09-01'}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* PFMS DBT Disbursal Card */}
      <div data-tour="disbursal-status" className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
            <Landmark className="w-4 h-4 text-blue-900" />
            <span>PFMS DBT Disbursal & Bank Verification</span>
          </h3>
          <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-0.5 rounded-full">
            Aadhaar Payment Bridge Seeded
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[11px] text-slate-500">Bank Account & IFSC</span>
            <div className="font-bold text-slate-900 mt-0.5">State Bank of India (SBI)</div>
            <div className="font-mono text-[11px] text-slate-600">SBIN0000166 • ****8192</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[11px] text-slate-500">Monthly Entitlement</span>
            <div className="font-bold text-emerald-700 mt-0.5">₹37,000 / Month (JRF)</div>
            <div className="text-[11px] text-slate-500">+ Annual Contingency ₹20,500</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[11px] text-slate-500">Next Disbursement Batch</span>
            <div className="font-bold text-blue-900 mt-0.5">PFMS e-FTO Active</div>
            <div className="text-[11px] text-slate-500">Subject to quarterly progress report (QPR)</div>
          </div>
        </div>
      </div>

      {/* Submitted Documents & AI Extraction View */}
      {applicant.documents && applicant.documents.length > 0 && (
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center space-x-2">
            <FileText className="w-4 h-4 text-blue-900" />
            <span>Submitted Verification Documents (Click to inspect AI OCR overlay)</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {applicant.documents.map((doc, idx) => (
              <div
                key={idx}
                onClick={() => onViewDoc && onViewDoc(doc, applicant)}
                className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-400 bg-white hover:bg-blue-50/30 cursor-pointer transition flex items-center justify-between group shadow-2xs"
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${doc.status === 'VERIFIED' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-blue-900">{doc.name}</div>
                    <div className="text-[11px] text-slate-500">Ref: {doc.fileNumber || 'DOC-REG'} • {doc.issuingAuthority}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    doc.status === 'VERIFIED' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {doc.status}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-900" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
