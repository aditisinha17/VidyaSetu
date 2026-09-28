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
  GraduationCap
} from 'lucide-react';

const STAGES = [
  { id: 1, label: 'Application Submitted', desc: 'DigiLocker KYC & Form Completed' },
  { id: 2, label: 'AI Pre-Verification', desc: 'OCR, Caste Gazette & Ceiling Audit' },
  { id: 3, label: 'District Scrutiny Desk', desc: 'Revenue Authority Verification' },
  { id: 4, label: 'Ministry Scrutiny Officer', desc: 'MoTA Level-1 Scrutiny Approval' },
  { id: 5, label: 'Selection Committee', desc: 'Merit List & Quota Evaluation' },
  { id: 6, label: 'Award & DBT Active', desc: 'Sanction Order & Monthly Stipend' }
];

export function ApplicationTracker({ applicant, onViewDoc, onViewAwardLetter, onOpenDeficiency }) {
  if (!applicant) return null;

  const currentStage = applicant.stage || 1;
  const isSelected = applicant.status === 'Selected';
  const hasDeficiency = applicant.status === 'Deficiency Pending';

  return (
    <div className="space-y-6">
      {/* Top Application Summary Banner */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-blue-100 text-blue-900 border border-blue-200">
              {applicant.id}
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
                PVTG Candidate
              </span>
            )}
          </div>

          <h2 className="text-lg font-bold text-slate-900 mt-2 font-serif">{applicant.schemeName}</h2>
          <p className="text-xs text-slate-600">
            Enrolled for: <strong className="text-slate-800">{applicant.degree}</strong> at <strong className="text-blue-900">{applicant.institution}</strong>
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {hasDeficiency && (
            <button
              onClick={() => onOpenDeficiency(applicant)}
              className="flex items-center space-x-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl shadow transition"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Resolve Deficiency Notice</span>
            </button>
          )}

          {isSelected && (
            <button
              onClick={() => onViewAwardLetter(applicant)}
              className="flex items-center space-x-1.5 px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold rounded-xl shadow-md transition"
            >
              <Download className="w-4 h-4 text-amber-300" />
              <span>Download Award Letter</span>
            </button>
          )}
        </div>
      </div>

      {/* Visual Interactive Pipeline */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
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
                className={`p-3.5 rounded-xl border flex flex-col justify-between transition-all ${
                  isCompleted
                    ? 'bg-emerald-50/60 border-emerald-300 text-emerald-950'
                    : isCurrent
                      ? hasDeficiency
                        ? 'bg-rose-50 border-rose-400 text-rose-950 shadow-md ring-2 ring-rose-300'
                        : 'bg-blue-50 border-blue-400 text-blue-950 shadow-md ring-2 ring-blue-300'
                      : 'bg-slate-50 border-slate-200 text-slate-400 opacity-75'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold font-mono">Stage 0{s.id}</span>
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : isCurrent ? (
                      hasDeficiency ? (
                        <AlertTriangle className="w-4 h-4 text-rose-600 animate-bounce" />
                      ) : (
                        <div className="w-3 h-3 rounded-full bg-blue-600 animate-ping"></div>
                      )
                    ) : (
                      <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                    )}
                  </div>
                  <div className="text-xs font-bold leading-tight">{s.label}</div>
                </div>
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
            <p className="text-slate-600 mt-0.5">{applicant.aiVerdict}</p>
            <div className="mt-2 flex items-center space-x-4 text-[11px] text-slate-500 font-mono">
              <span>AI Confidence: <strong className="text-slate-800">{applicant.aiScore}%</strong></span>
              <span>•</span>
              <span>Risk Tier: <strong className="text-emerald-700">{applicant.aiRiskLevel}</strong></span>
              <span>•</span>
              <span>Last Audit: <strong>{applicant.submissionDate}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Submitted Documents & AI Extraction View */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
        <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center space-x-2">
          <FileText className="w-4 h-4 text-blue-900" />
          <span>Submitted Verification Documents (Click to inspect AI OCR overlay)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {applicant.documents.map((doc, idx) => (
            <div
              key={idx}
              onClick={() => onViewDoc(doc, applicant)}
              className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-400 bg-white hover:bg-blue-50/30 cursor-pointer transition flex items-center justify-between group shadow-2xs"
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${doc.status === 'VERIFIED' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-blue-900">{doc.name}</div>
                  <div className="text-[11px] text-slate-500">Ref: {doc.fileNumber} • {doc.issuingAuthority}</div>
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
    </div>
  );
}
