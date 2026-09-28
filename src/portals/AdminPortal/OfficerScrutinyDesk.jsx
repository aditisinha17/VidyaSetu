import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  FileText, 
  Sparkles, 
  Search, 
  Filter, 
  Scan, 
  Eye, 
  Send, 
  ShieldCheck, 
  ChevronRight,
  UserCheck,
  Building,
  GraduationCap,
  Clock,
  ShieldAlert,
  HelpCircle,
  RotateCcw
} from 'lucide-react';

export function OfficerScrutinyDesk({ 
  applicants, 
  onApproveApplication, 
  onRaiseDeficiency, 
  onRejectApplication,
  onInspectDoc 
}) {
  const [selectedId, setSelectedId] = useState(applicants[0]?.id || null);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDocIndex, setSelectedDocIndex] = useState(0);
  
  // Deficiency modal state
  const [isDeficiencyModalOpen, setIsDeficiencyModalOpen] = useState(false);
  const [defTitle, setDefTitle] = useState('Income Certificate Re-Verification Required');
  const [defRemarks, setDefRemarks] = useState('Please furnish recent income certificate valid for FY 2026-27 issued by Tahasildar with clear QR code.');

  // Human Officer Override modal state
  const [isOverrideModalOpen, setIsOverrideModalOpen] = useState(false);
  const [overrideReason, setOverrideReason] = useState('VERIFIED_STATE_PORTAL');
  const [overrideRemarks, setOverrideRemarks] = useState('Certificate manually cross-checked with State Land & Revenue Portal. Authentic digital seal confirmed.');

  // Statutory Rejection modal state
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('INCOME_CEILING_EXCEEDED');
  const [rejectClause, setRejectClause] = useState('NFST Guidelines Section 4.2');
  const [rejectRemarks, setRejectRemarks] = useState('Family income exceeds statutory maximum ceiling of ₹6,00,000 per annum.');

  const selectedApp = applicants.find(a => a.id === selectedId) || applicants[0];

  const filteredList = applicants.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.tribe.toLowerCase().includes(searchQuery.toLowerCase());
    if (filterStatus === 'ALL') return matchesSearch;
    if (filterStatus === 'READY') return matchesSearch && (app.triageCategory === 'READY' || app.status === 'AI Verified');
    if (filterStatus === 'FLAGGED') return matchesSearch && (app.aiRiskLevel === 'MEDIUM' || app.status === 'Deficiency Pending' || app.triageCategory === 'DEFICIENT');
    if (filterStatus === 'REVIEW') return matchesSearch && (app.status === 'Submitted' || app.status === 'Selection Committee Review');
    if (filterStatus === 'APPROVED') return matchesSearch && (app.status === 'Selected');
    return matchesSearch;
  });

  const handleDeficiencySubmit = () => {
    onRaiseDeficiency(selectedApp.id, {
      code: 'DEF-OFFICER-SCRUTINY',
      title: defTitle,
      description: defRemarks,
      actionRequired: 'Re-upload valid document on VidyaSetu portal within 14 days.',
      raisedOn: new Date().toISOString().split('T')[0],
      deadline: '2026-10-15',
      officerRemarks: defRemarks
    });
    setIsDeficiencyModalOpen(false);
  };

  const handleOverrideSubmit = () => {
    onApproveApplication(selectedApp.id);
    setIsOverrideModalOpen(false);
  };

  const handleRejectSubmit = () => {
    onRejectApplication(selectedApp.id);
    setIsRejectModalOpen(false);
  };

  const activeDoc = selectedApp?.documents?.[selectedDocIndex] || selectedApp?.documents?.[0];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Title & Quick Statistics */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-black text-slate-900 font-serif">Ministry Officer Scrutiny Desk (Application X-Ray)</h1>
            <span className="text-xs bg-blue-100 text-blue-900 px-2.5 py-0.5 rounded-full font-bold border border-blue-200">
              Level-1 & Level-2 Scrutiny Workstation
            </span>
          </div>
          <p className="text-xs text-slate-600">
            Deterministic Statutory Audits + AI Document Intelligence + Human-in-the-Loop Officer Decision Gateway
          </p>
        </div>

        {/* Human-in-the-loop statutory safeguard badge */}
        <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center space-x-2">
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
          <span>
            <strong>Statutory Rule:</strong> AI assists extraction & flags anomalies; designated Ministry Officers hold sole statutory decision authority.
          </span>
        </div>
      </div>

      {/* Main Dual-Pane Scrutiny Workstation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Prioritized Applications Queue (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[820px] overflow-hidden">
          {/* Search & Filter Bar */}
          <div className="p-3.5 border-b border-slate-200 space-y-2.5 bg-slate-50">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Name, App ID, Tribe..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div className="flex space-x-1 overflow-x-auto text-[11px] no-scrollbar">
              {[
                { id: 'ALL', label: `All (${applicants.length})` },
                { id: 'READY', label: `🟢 Ready (${applicants.filter(a => a.triageCategory === 'READY' || a.status === 'AI Verified').length})` },
                { id: 'FLAGGED', label: `🔴 Deficient (${applicants.filter(a => a.status === 'Deficiency Pending' || a.triageCategory === 'DEFICIENT').length})` },
                { id: 'APPROVED', label: `Selected (${applicants.filter(a => a.status === 'Selected').length})` }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setFilterStatus(f.id)}
                  className={`px-2.5 py-1 rounded-lg font-semibold whitespace-nowrap transition ${
                    filterStatus === f.id
                      ? 'bg-blue-900 text-white'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Queue List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {filteredList.map((app) => {
              const isSelected = app.id === selectedApp?.id;
              const isDeficient = app.status === 'Deficiency Pending' || app.triageCategory === 'DEFICIENT';
              const isReady = app.triageCategory === 'READY' || app.status === 'AI Verified';

              return (
                <div
                  key={app.id}
                  onClick={() => {
                    setSelectedId(app.id);
                    setSelectedDocIndex(0);
                  }}
                  className={`p-3.5 cursor-pointer transition-all ${
                    isSelected 
                      ? 'bg-blue-50/95 border-l-4 border-blue-900 shadow-2xs' 
                      : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-slate-600">{app.id}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      app.status === 'Selected' ? 'bg-emerald-100 text-emerald-800' :
                      isDeficient ? 'bg-rose-100 text-rose-800 animate-pulse' :
                      isReady ? 'bg-emerald-100 text-emerald-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {isDeficient ? '🔴 DEFICIENT' : isReady ? '🟢 READY' : app.status}
                    </span>
                  </div>

                  <div className="font-bold text-xs text-slate-900 mt-1">{app.name}</div>
                  <div className="text-[11px] text-slate-500 flex items-center space-x-1.5 mt-0.5">
                    <span>{app.tribe}</span>
                    <span>•</span>
                    <span>{app.state}</span>
                    {app.pvtg && (
                      <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-1 rounded">
                        PVTG
                      </span>
                    )}
                  </div>

                  <div className="mt-2 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 font-medium">{app.schemeId}</span>
                    <span className={`font-mono font-bold ${isDeficient ? 'text-rose-600' : 'text-emerald-700'}`}>
                      {isDeficient ? 'Deficiency Raised' : `AI Score: ${app.aiScore}%`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Dual-Pane Application X-Ray (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          {selectedApp ? (
            <>
              {/* Top Action & Verification Control Bar */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-base font-bold text-slate-900">{selectedApp.name}</h2>
                    <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                      {selectedApp.id}
                    </span>
                    <span className="text-xs bg-blue-100 text-blue-900 font-semibold px-2 py-0.5 rounded">
                      {selectedApp.schemeName}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Domicile: <strong className="text-slate-700">{selectedApp.district}, {selectedApp.state}</strong> • 
                    Tribe: <strong className="text-blue-900">{selectedApp.tribe}</strong> {selectedApp.pvtg ? '(PVTG Priority)' : ''}
                  </p>
                </div>

                {/* Scrutiny Action Buttons with Officer Override */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsOverrideModalOpen(true)}
                    className="flex items-center space-x-1.5 px-3 py-2 bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 rounded-xl text-xs font-bold transition"
                    title="Override AI recommendation with statutory justification"
                  >
                    <UserCheck className="w-3.5 h-3.5 text-purple-700" />
                    <span>Officer Override</span>
                  </button>

                  <button
                    onClick={() => setIsDeficiencyModalOpen(true)}
                    className="flex items-center space-x-1.5 px-3 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-xl text-xs font-bold transition"
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                    <span>Raise Deficiency</span>
                  </button>

                  <button
                    onClick={() => setIsRejectModalOpen(true)}
                    className="flex items-center space-x-1.5 px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 rounded-xl text-xs font-bold transition"
                  >
                    <XCircle className="w-3.5 h-3.5 text-rose-600" />
                    <span>Reject</span>
                  </button>

                  <button
                    onClick={() => onApproveApplication(selectedApp.id)}
                    className="flex items-center space-x-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 transition"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve & Forward</span>
                  </button>
                </div>
              </div>

              {/* Application X-Ray: Deterministic Statutory Audits + AI Findings */}
              <div className="bg-gradient-to-r from-slate-900 to-blue-950 rounded-2xl p-5 text-white shadow-md space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <span className="font-bold text-sm">Application X-Ray: Statutory Rules + Evidence Pack</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs font-mono">
                    <span className="text-slate-300">AI Triage Status:</span>
                    <span className={`font-bold px-2 py-0.5 rounded ${
                      selectedApp.status === 'Deficiency Pending' ? 'bg-rose-500/30 text-rose-300' : 'bg-emerald-500/30 text-emerald-300'
                    }`}>
                      {selectedApp.status === 'Deficiency Pending' ? 'DEFICIENCY DETECTED' : 'READY FOR HUMAN REVIEW'}
                    </span>
                  </div>
                </div>

                {/* Deterministic statutory checklist */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                  <div className="p-2.5 rounded-xl bg-white/10 border border-white/10 space-y-0.5">
                    <div className="text-[10px] text-slate-400 uppercase">ST Caste Status</div>
                    <div className="font-bold text-emerald-400 flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>PASS (Article 342)</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/10 border border-white/10 space-y-0.5">
                    <div className="text-[10px] text-slate-400 uppercase">Annual Income Audit</div>
                    <div className="font-bold text-emerald-400 flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>₹{(selectedApp.annualIncome).toLocaleString()} (≤ ₹6L)</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/10 border border-white/10 space-y-0.5">
                    <div className="text-[10px] text-slate-400 uppercase">Age Criterion</div>
                    <div className="font-bold text-emerald-400 flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{selectedApp.age} Yrs (≤ 36 Yrs)</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/10 border border-white/10 space-y-0.5">
                    <div className="text-[10px] text-slate-400 uppercase">Academic Marks</div>
                    <div className="font-bold text-emerald-400 flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{selectedApp.pgMarks}% (≥ 55%)</span>
                    </div>
                  </div>
                </div>

                {/* AI Scrutiny Findings Explanation */}
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-xs space-y-1">
                  <div className="flex items-center space-x-1.5 text-amber-300 font-bold">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Why was this flagged / recommended?</span>
                  </div>
                  <p className="text-slate-200 text-xs leading-relaxed">
                    {selectedApp.aiVerdict}
                  </p>
                </div>
              </div>

              {/* Dual-Pane Document Workspace */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                      <Scan className="w-4 h-4 text-blue-900" />
                      <span>Document Intelligence & OCR Canvas</span>
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Select document to cross-examine extracted fields against application particulars
                    </p>
                  </div>

                  {/* Document Switcher Tabs */}
                  <div className="flex space-x-1 overflow-x-auto text-xs no-scrollbar">
                    {selectedApp.documents.map((d, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedDocIndex(idx)}
                        className={`px-3 py-1 rounded-lg font-semibold transition ${
                          selectedDocIndex === idx
                            ? 'bg-blue-900 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {d.name.includes('ST') ? 'Caste Cert' : d.name.includes('Income') ? 'Income Cert' : 'Degree / Proof'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Side-by-Side Comparison Panes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Left Comparison Pane: Extracted Entities vs Rules */}
                  <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
                    <div className="font-bold text-slate-800 uppercase tracking-wide text-[11px]">
                      Entity Cross-Check: {activeDoc.name}
                    </div>

                    <div className="space-y-2">
                      <div className="p-2.5 bg-white rounded-lg border border-slate-200 flex justify-between items-center">
                        <span className="text-slate-500">Applicant Name:</span>
                        <strong className="text-slate-900">{selectedApp.name}</strong>
                      </div>

                      <div className="p-2.5 bg-white rounded-lg border border-slate-200 flex justify-between items-center">
                        <span className="text-slate-500">Certificate Reference:</span>
                        <strong className="text-blue-900 font-mono">{activeDoc.fileNumber}</strong>
                      </div>

                      <div className="p-2.5 bg-white rounded-lg border border-slate-200 flex justify-between items-center">
                        <span className="text-slate-500">Issuing Authority:</span>
                        <strong className="text-slate-900">{activeDoc.issuingAuthority}</strong>
                      </div>

                      <div className="p-2.5 bg-white rounded-lg border border-slate-200 flex justify-between items-center">
                        <span className="text-slate-500">Issue Date / Validity:</span>
                        <strong className={activeDoc.status === 'DEFICIENT' ? 'text-rose-600' : 'text-emerald-700'}>
                          {activeDoc.issueDate || 'Valid 2026-27'}
                        </strong>
                      </div>

                      <div className="p-2.5 bg-white rounded-lg border border-slate-200 flex justify-between items-center">
                        <span className="text-slate-500">OCR Confidence:</span>
                        <strong className="text-emerald-700 font-mono">{activeDoc.confidence}%</strong>
                      </div>
                    </div>

                    <button
                      onClick={() => onInspectDoc(activeDoc, selectedApp)}
                      className="w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 rounded-lg font-bold text-xs flex items-center justify-center space-x-1.5 transition"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Open Fullscreen Interactive Document Canvas</span>
                    </button>
                  </div>

                  {/* Right Comparison Pane: Simulated Document Preview with Highlighted Bounding Boxes */}
                  <div className="bg-amber-50/70 border-2 border-dashed border-amber-300 p-4 rounded-xl font-serif text-slate-800 text-xs relative space-y-2">
                    <div className="text-center pb-2 border-b border-amber-300/60">
                      <div className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Competent Revenue Authority</div>
                      <div className="text-xs font-black uppercase text-slate-900">{activeDoc.issuingAuthority}</div>
                    </div>

                    <div className="p-2 bg-white/80 rounded border border-amber-200 font-sans text-[11px] leading-relaxed">
                      "{activeDoc.extractedText}"
                    </div>

                    {/* Highlighted Bounding Box */}
                    <div className="relative border-2 border-emerald-500 bg-emerald-500/10 p-2 rounded text-[11px] font-sans">
                      <span className="absolute -top-2 left-2 bg-emerald-600 text-white text-[8px] px-1 rounded font-bold font-mono">
                        DETECTED ENTITY
                      </span>
                      <div className="font-bold text-slate-900">{selectedApp.name}</div>
                      <div className="text-slate-600 text-[10px]">Tribe: {selectedApp.tribe} • Ref: {activeDoc.fileNumber}</div>
                    </div>

                    {/* Seal Stamp simulation */}
                    <div className="pt-2 flex justify-between items-end text-[9px]">
                      <div className="w-12 h-12 rounded-full border border-blue-900/60 flex flex-col items-center justify-center p-0.5 text-center text-[6px] text-blue-900 font-bold rotate-[-10deg]">
                        <span>OFFICIAL SEAL</span>
                        <span>{selectedApp.district}</span>
                      </div>
                      <div className="text-right font-sans">
                        <div className="italic text-slate-700">Digitally Verified</div>
                        <div className="text-[8px] text-slate-500">Revenue Authority</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
              <p className="text-xs text-slate-500">Select an application from the queue to start scrutiny.</p>
            </div>
          )}
        </div>
      </div>

      {/* Human Officer Override Modal */}
      {isOverrideModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-300 max-w-lg w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200">
              <div className="flex items-center space-x-2">
                <UserCheck className="w-5 h-5 text-purple-700" />
                <h3 className="font-bold text-sm text-slate-900">Execute Statutory Officer Override</h3>
              </div>
              <button onClick={() => setIsOverrideModalOpen(false)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <p className="text-slate-600">
              Officer overrides allow designated authorities to approve applications despite minor algorithmic flags. All overrides are cryptographically logged to the tamper-evident audit trail for RTI traceability.
            </p>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Statutory Override Reason</label>
              <select
                value={overrideReason}
                onChange={(e) => setOverrideReason(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl font-medium focus:ring-1 focus:ring-blue-600"
              >
                <option value="VERIFIED_STATE_PORTAL">Manually verified via State Land & Revenue Portal</option>
                <option value="OCR_ALIAS_RECONCILED">Phonetic OCR alias reconciled against Aadhaar biometric proof</option>
                <option value="PVTG_AFFIRMATIVE_ACTION">Exceptional affirmative relaxation under PVTG Special Provisions</option>
                <option value="SUPERVISOR_CREDENTIALS">Research guide credentials confirmed directly with University Registrar</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Officer Justification & Audit Remarks</label>
              <textarea
                rows={3}
                value={overrideRemarks}
                onChange={(e) => setOverrideRemarks(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl focus:ring-1 focus:ring-blue-600 font-medium"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setIsOverrideModalOpen(false)}
                className="px-4 py-2 border rounded-xl text-slate-600 hover:bg-slate-50 font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleOverrideSubmit}
                className="px-5 py-2 bg-purple-700 hover:bg-purple-600 text-white rounded-xl font-bold shadow transition"
              >
                Confirm Override & Approve
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Statutory Rejection Modal */}
      {isRejectModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-300 max-w-lg w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200">
              <div className="flex items-center space-x-2">
                <XCircle className="w-5 h-5 text-rose-600" />
                <h3 className="font-bold text-sm text-slate-900">Statutory Application Rejection</h3>
              </div>
              <button onClick={() => setIsRejectModalOpen(false)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-950 text-xs">
              <strong>Mandatory Compliance:</strong> Rejections cannot be arbitrary. Officers must record the statutory clause under which the application was disallowed.
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Primary Statutory Reason</label>
              <select
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl font-medium"
              >
                <option value="INCOME_CEILING_EXCEEDED">Annual Family Income exceeds Scheme Statutory Ceiling</option>
                <option value="NON_ST_CATEGORY">Applicant Community not notified under Central ST List (Article 342)</option>
                <option value="COURSE_INELIGIBLE">Course / Degree not recognized under Scheme Guidelines</option>
                <option value="AGE_CEILING_EXCEEDED">Applicant exceeds Maximum Permissible Age Limit</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Applicable Scheme Guideline Clause</label>
              <input
                type="text"
                value={rejectClause}
                onChange={(e) => setRejectClause(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Detailed Remarks for Candidate</label>
              <textarea
                rows={2}
                value={rejectRemarks}
                onChange={(e) => setRejectRemarks(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl font-medium"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setIsRejectModalOpen(false)}
                className="px-4 py-2 border rounded-xl text-slate-600 hover:bg-slate-50 font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleRejectSubmit}
                className="px-5 py-2 bg-rose-700 hover:bg-rose-600 text-white rounded-xl font-bold shadow"
              >
                Record Statutory Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Deficiency Generation Modal */}
      {isDeficiencyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-300 max-w-lg w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <h3 className="font-bold text-sm text-slate-900">Issue Official Deficiency Notice</h3>
              </div>
              <button onClick={() => setIsDeficiencyModalOpen(false)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <p className="text-slate-600">
              This notice will be immediately dispatched to <strong>{selectedApp.name}</strong> ({selectedApp.phone}, {selectedApp.email}) via SMS, Email, and the VidyaSetu applicant portal.
            </p>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Deficiency Subject / Category</label>
              <input
                type="text"
                value={defTitle}
                onChange={(e) => setDefTitle(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl focus:ring-1 focus:ring-blue-600 font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Detailed Remarks & Instructions for Candidate</label>
              <textarea
                rows={3}
                value={defRemarks}
                onChange={(e) => setDefRemarks(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl focus:ring-1 focus:ring-blue-600 font-medium"
              />
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900">
              Candidate will be granted a standard <strong>14-day resolution window</strong> with no loss of application queue seniority.
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setIsDeficiencyModalOpen(false)}
                className="px-4 py-2 border rounded-xl text-slate-600 hover:bg-slate-50 font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleDeficiencySubmit}
                className="flex items-center space-x-1.5 px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-bold shadow"
              >
                <Send className="w-4 h-4" />
                <span>Dispatch Deficiency Notice</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
