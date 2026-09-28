import React, { useState } from 'react';
import { 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Search, 
  Eye, 
  UserCheck, 
  Clock, 
  FileText, 
  Filter,
  Send,
  XCircle,
  HelpCircle
} from 'lucide-react';

export function ApplicationTriage({ 
  applicants, 
  onInspectDoc, 
  onApproveApplication, 
  onRaiseDeficiency,
  onOpenAuditTrail 
}) {
  const [activeCategory, setActiveCategory] = useState('ALL'); // 'ALL', 'READY', 'REVIEW', 'DEFICIENT'
  const [search, setSearch] = useState('');

  const readyApps = applicants.filter(a => a.triageCategory === 'READY' || a.status === 'Selected' || a.status === 'AI Verified');
  const reviewApps = applicants.filter(a => a.triageCategory === 'REVIEW' || a.aiRiskLevel === 'MEDIUM');
  const deficientApps = applicants.filter(a => a.triageCategory === 'DEFICIENT' || a.status === 'Deficiency Pending' || a.anomalyFlags?.length > 0);

  const displayedApps = applicants.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(search.toLowerCase()) || 
                          a.id.toLowerCase().includes(search.toLowerCase()) ||
                          a.tribe.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;

    if (activeCategory === 'READY') return readyApps.includes(a);
    if (activeCategory === 'REVIEW') return reviewApps.includes(a);
    if (activeCategory === 'DEFICIENT') return deficientApps.includes(a);
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-black text-slate-900 font-serif">AI Application Triage & Priority Desk</h2>
            <span className="text-xs bg-blue-100 text-blue-900 px-2.5 py-0.5 rounded-full font-bold border border-blue-200">
              Assisted Human-in-the-Loop Review
            </span>
          </div>
          <p className="text-xs text-slate-600">
            Automated multi-factor risk categorization classifies intake into actionable queues to prevent processing bottlenecks.
          </p>
        </div>

        {/* Human in the loop reassurance badge */}
        <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center space-x-2">
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
          <span>
            <strong>Statutory Safeguard:</strong> AI assists scrutiny triage; final approval remains with designated Ministry Officers.
          </span>
        </div>
      </div>

      {/* Triage Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
        <button
          onClick={() => setActiveCategory('ALL')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            activeCategory === 'ALL' ? 'bg-blue-900 text-white shadow-md' : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <div className="font-semibold text-[11px] opacity-80">Total Application Intake</div>
          <div className="text-2xl font-black font-mono mt-1">{applicants.length}</div>
          <div className="text-[10px] mt-1 opacity-70">Centralized MoTA intake</div>
        </button>

        <button
          onClick={() => setActiveCategory('READY')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            activeCategory === 'READY' ? 'bg-emerald-700 text-white shadow-md' : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <div className="font-semibold text-[11px] opacity-80 flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>🟢 Ready for Review</span>
          </div>
          <div className="text-2xl font-black font-mono mt-1">{readyApps.length}</div>
          <div className="text-[10px] mt-1 opacity-80">All documents OCR verified (95%+ confidence)</div>
        </button>

        <button
          onClick={() => setActiveCategory('REVIEW')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            activeCategory === 'REVIEW' ? 'bg-amber-600 text-white shadow-md' : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <div className="font-semibold text-[11px] opacity-80 flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span>🟡 Needs Attention</span>
          </div>
          <div className="text-2xl font-black font-mono mt-1">{reviewApps.length}</div>
          <div className="text-[10px] mt-1 opacity-80">Minor mismatch / borderline criteria</div>
        </button>

        <button
          onClick={() => setActiveCategory('DEFICIENT')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            activeCategory === 'DEFICIENT' ? 'bg-rose-700 text-white shadow-md' : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <div className="font-semibold text-[11px] opacity-80 flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-300 animate-pulse"></span>
            <span>🔴 Deficient / Anomaly Flag</span>
          </div>
          <div className="text-2xl font-black font-mono mt-1">{deficientApps.length}</div>
          <div className="text-[10px] mt-1 opacity-80">Expired doc, missing file, or duplicate</div>
        </button>
      </div>

      {/* Applications Triage Roster */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="font-bold text-slate-900 uppercase tracking-wide flex items-center space-x-2">
            <span>Prioritized Scrutiny Worklist ({displayedApps.length} Records)</span>
          </div>

          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Filter by Name, ID, Tribe..."
                className="pl-8 pr-3 py-1 bg-white border rounded-lg text-xs focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {displayedApps.map((app) => {
            const hasAnomaly = app.anomalyFlags && app.anomalyFlags.length > 0;
            const isReady = app.triageCategory === 'READY';
            const isDeficient = app.triageCategory === 'DEFICIENT' || app.status === 'Deficiency Pending';

            return (
              <div key={app.id} className="p-4 hover:bg-slate-50/80 transition flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1 max-w-xl">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold font-mono text-slate-900">{app.id}</span>
                    <span className="font-semibold text-blue-950 bg-blue-50 px-2 py-0.5 rounded text-[11px]">
                      {app.schemeId}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isReady ? 'bg-emerald-100 text-emerald-800' :
                      isDeficient ? 'bg-rose-100 text-rose-800 animate-pulse' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {isReady ? '🟢 READY FOR REVIEW' : isDeficient ? '🔴 DEFICIENT / ACTION REQD' : '🟡 REVIEW REQUIRED'}
                    </span>
                    {app.pvtg && (
                      <span className="text-[10px] font-bold bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
                        PVTG
                      </span>
                    )}
                  </div>

                  <div className="font-bold text-slate-900 text-sm">{app.name}</div>
                  <div className="text-[11px] text-slate-500">
                    {app.tribe} • {app.state} • {app.institution} ({app.degree})
                  </div>

                  {/* AI Verdict summary */}
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-700">
                    <strong className="text-blue-950">AI Triage Finding: </strong>
                    {app.aiVerdict}
                  </div>

                  {/* Cross-Application Anomaly Callout if present */}
                  {hasAnomaly && (
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-[11px] text-amber-950 space-y-2">
                      <div className="font-bold flex items-center justify-between">
                        <span className="flex items-center space-x-1.5 text-amber-900">
                          <AlertTriangle className="w-4 h-4 text-amber-700" />
                          <span>Cross-Application Anomaly Detected:</span>
                        </span>
                        <span className="bg-amber-200 text-amber-900 text-[10px] px-2 py-0.2 rounded font-mono font-bold">
                          Shared Identifier Cluster
                        </span>
                      </div>
                      {app.anomalyFlags.map((flag, idx) => (
                        <div key={idx} className="text-amber-900 space-y-0.5">
                          <div className="font-semibold">• {flag.label}</div>
                          {flag.explanation && (
                            <p className="text-[10px] text-amber-800 italic pl-2">
                              {flag.explanation}
                            </p>
                          )}
                        </div>
                      ))}
                      <div className="p-2 bg-white/80 rounded border border-amber-200 text-[10px] text-slate-600">
                        <strong>Statutory Protocol:</strong> The system flags potential duplicate identifiers for human scrutiny. Officers must confirm whether this represents a family account or an administrative duplication.
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Action buttons */}
                <div className="flex flex-col sm:flex-row items-end sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 shrink-0">
                  <div className="text-right mr-2">
                    <div className="font-mono font-bold text-slate-900">Score: {app.aiScore}%</div>
                    <div className="text-[10px] text-slate-400">Risk: {app.aiRiskLevel}</div>
                  </div>

                  <button
                    onClick={() => onOpenAuditTrail(app)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition"
                    title="View immutable blockchain-style audit trail"
                  >
                    Audit Trail
                  </button>

                  <button
                    onClick={() => onInspectDoc(app.documents[0], app)}
                    className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 rounded-lg text-xs font-semibold transition flex items-center space-x-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Inspect OCR</span>
                  </button>

                  {app.status !== 'Selected' && (
                    <button
                      onClick={() => onApproveApplication(app.id)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold shadow-xs transition"
                    >
                      Clear & Forward
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
