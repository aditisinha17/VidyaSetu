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
  Clock
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
  
  // Deficiency modal state
  const [isDeficiencyModalOpen, setIsDeficiencyModalOpen] = useState(false);
  const [defTitle, setDefTitle] = useState('Income Certificate Re-Verification Required');
  const [defRemarks, setDefRemarks] = useState('Please furnish recent income certificate valid for FY 2026-27 issued by Tahasildar with clear QR code.');

  const selectedApp = applicants.find(a => a.id === selectedId) || applicants[0];

  const filteredList = applicants.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.tribe.toLowerCase().includes(searchQuery.toLowerCase());
    if (filterStatus === 'ALL') return matchesSearch;
    if (filterStatus === 'FLAGGED') return matchesSearch && (app.aiRiskLevel === 'MEDIUM' || app.status === 'Deficiency Pending');
    if (filterStatus === 'REVIEW') return matchesSearch && (app.status === 'Submitted' || app.status === 'Selection Committee Review');
    if (filterStatus === 'APPROVED') return matchesSearch && (app.status === 'Selected' || app.status === 'AI Verified');
    return matchesSearch;
  });

  const handleDeficiencySubmit = () => {
    onRaiseDeficiency(selectedApp.id, {
      code: 'DEF-OFFICER-SCRUTINY',
      title: defTitle,
      description: defRemarks,
      actionRequired: 'Re-upload valid document on VidyaSetu portal within 15 days.',
      raisedOn: new Date().toISOString().split('T')[0],
      deadline: '2026-10-15',
      officerRemarks: defRemarks
    });
    setIsDeficiencyModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Title & Quick Statistics */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-black text-slate-900 font-serif">Ministry Scrutiny & Verification Desk</h1>
            <span className="text-xs bg-blue-100 text-blue-900 px-2.5 py-0.5 rounded-full font-bold border border-blue-200">
              Level-1 & Level-2 Scrutiny
            </span>
          </div>
          <p className="text-xs text-slate-600">
            AI-Assisted Cross-Verification against Central ST Gazette, UIDAI, and Academic Repositories
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <div className="text-right text-xs">
            <div className="font-bold text-slate-900">{applicants.length} Total in Queue</div>
            <div className="text-[11px] text-emerald-700 font-medium">Avg Verification Time: 2.4 mins (AI-assisted)</div>
          </div>
        </div>
      </div>

      {/* Main Dual-Pane Scrutiny Workstation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Applications Queue (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[750px] overflow-hidden">
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

            <div className="flex space-x-1 overflow-x-auto text-[11px]">
              {[
                { id: 'ALL', label: 'All' },
                { id: 'REVIEW', label: 'In Review' },
                { id: 'FLAGGED', label: 'Flagged / Deficient' },
                { id: 'APPROVED', label: 'Approved' }
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
              const isRiskHigh = app.aiRiskLevel === 'HIGH' || app.status === 'Deficiency Pending';

              return (
                <div
                  key={app.id}
                  onClick={() => setSelectedId(app.id)}
                  className={`p-3.5 cursor-pointer transition-all ${
                    isSelected 
                      ? 'bg-blue-50/90 border-l-4 border-blue-900 shadow-2xs' 
                      : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-slate-600">{app.id}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      app.status === 'Selected' ? 'bg-emerald-100 text-emerald-800' :
                      app.status === 'Deficiency Pending' ? 'bg-rose-100 text-rose-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {app.status}
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
                    <span className={`font-mono font-bold ${isRiskHigh ? 'text-rose-600' : 'text-emerald-700'}`}>
                      AI Match: {app.aiScore}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Dual-Pane Scrutiny Workstation (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          {selectedApp ? (
            <>
              {/* Top Action & Verification Bar */}
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
                    Tribe: <strong className="text-blue-900">{selectedApp.tribe}</strong> {selectedApp.pvtg ? '(PVTG Group)' : ''}
                  </p>
                </div>

                {/* Scrutiny Action Buttons */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsDeficiencyModalOpen(true)}
                    className="flex items-center space-x-1.5 px-3.5 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-xl text-xs font-bold transition"
                  >
                    <AlertTriangle className="w-4 h-4 text-amber-700" />
                    <span>Raise Deficiency</span>
                  </button>

                  <button
                    onClick={() => onRejectApplication(selectedApp.id)}
                    className="flex items-center space-x-1.5 px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 rounded-xl text-xs font-bold transition"
                  >
                    <XCircle className="w-4 h-4 text-rose-600" />
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

              {/* AI Verification Intelligence Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-blue-950 text-white shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <span className="font-bold text-sm">MoTA AI Scrutiny Intelligence Summary</span>
                  </div>
                  <div className="flex items-center space-x-3 text-xs font-mono">
                    <span>Overall Score: <strong className="text-amber-300">{selectedApp.aiScore}/100</strong></span>
                    <span>Risk: <strong className={selectedApp.aiRiskLevel === 'LOW' ? 'text-emerald-400' : 'text-amber-400'}>{selectedApp.aiRiskLevel}</strong></span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/10">
                  {selectedApp.aiVerdict}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3 text-xs">
                  <div className="p-2.5 rounded-lg bg-white/10 border border-white/10">
                    <div className="text-[10px] text-slate-400">Gazette ST Verification</div>
                    <div className="font-bold text-emerald-400 flex items-center space-x-1 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>100% Match (Schedule VI)</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white/10 border border-white/10">
                    <div className="text-[10px] text-slate-400">Income Limit Audit</div>
                    <div className="font-bold text-emerald-400 flex items-center space-x-1 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>₹{(selectedApp.annualIncome).toLocaleString()} (Under Limit)</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white/10 border border-white/10">
                    <div className="text-[10px] text-slate-400">Aadhaar KYC Match</div>
                    <div className="font-bold text-emerald-400 flex items-center space-x-1 mt-0.5">
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>98.8% Phonetic Match</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Applicant Submitted Documents for Inspection */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-blue-900" />
                    <span>Submitted Documents & OCR Extractions (Click to Inspect Full Canvas)</span>
                  </h3>
                  <span className="text-xs text-slate-500">{selectedApp.documents.length} Files Uploaded</span>
                </div>

                <div className="space-y-3">
                  {selectedApp.documents.map((doc, idx) => (
                    <div
                      key={idx}
                      onClick={() => onInspectDoc(doc, selectedApp)}
                      className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 transition cursor-pointer flex flex-wrap items-center justify-between gap-3 group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${doc.status === 'VERIFIED' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                          <Scan className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 group-hover:text-blue-900">{doc.name}</div>
                          <div className="text-[11px] text-slate-500 font-mono">Ref: {doc.fileNumber} • {doc.issuingAuthority}</div>
                          <div className="text-[11px] text-slate-600 mt-1 italic max-w-lg line-clamp-1">
                            "{doc.extractedText}"
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 text-right">
                        <div>
                          <div className="text-[11px] font-bold font-mono text-slate-700">OCR: {doc.confidence}%</div>
                          <div className="text-[10px] text-slate-400">Tamper: {(doc.tamperScore * 100).toFixed(0)}%</div>
                        </div>
                        <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                          doc.status === 'VERIFIED' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {doc.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Academic & Financial Credential Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200 p-4 text-xs space-y-2">
                  <div className="font-bold text-slate-800 uppercase tracking-wide text-[11px]">Academic Track Record</div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Degree / Course:</span>
                    <strong className="text-slate-900 text-right">{selectedApp.degree}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Institution:</span>
                    <strong className="text-blue-900 text-right">{selectedApp.institution}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Ranking:</span>
                    <strong className="text-slate-900">{selectedApp.qsWorldRank ? `QS #${selectedApp.qsWorldRank}` : `NIRF #${selectedApp.nirfRank || 'Eligible'}`}</strong>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Qualifying Score:</span>
                    <strong className="text-slate-900">{selectedApp.netScore} ({selectedApp.pgMarks}%)</strong>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-4 text-xs space-y-2">
                  <div className="font-bold text-slate-800 uppercase tracking-wide text-[11px]">Social & Financial Background</div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Tribe Classification:</span>
                    <strong className="text-slate-900">{selectedApp.tribe}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">PVTG Priority Status:</span>
                    <strong className={selectedApp.pvtg ? 'text-purple-700 font-bold' : 'text-slate-600'}>
                      {selectedApp.pvtg ? 'Yes (Particularly Vulnerable)' : 'Regular ST'}
                    </strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Annual Family Income:</span>
                    <strong className="text-slate-900">₹{(selectedApp.annualIncome).toLocaleString()}</strong>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">DBT Bank Seeded:</span>
                    <strong className="text-emerald-700">✓ NPCI Aadhaar Bridge Active</strong>
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
              This notice will be immediately sent to <strong>{selectedApp.name}</strong> ({selectedApp.phone}, {selectedApp.email}) via SMS, Email, and the VidyaSetu applicant portal.
            </p>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Deficiency Subject / Category</label>
              <input
                type="text"
                value={defTitle}
                onChange={(e) => setDefTitle(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Detailed Remarks & Instructions for Candidate</label>
              <textarea
                rows={3}
                value={defRemarks}
                onChange={(e) => setDefRemarks(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-900">
              Candidate will be granted a standard <strong>15-day resolution window</strong> with no loss of application seniority.
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setIsDeficiencyModalOpen(false)}
                className="px-4 py-2 border rounded-lg text-slate-600 hover:bg-slate-50 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleDeficiencySubmit}
                className="flex items-center space-x-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-bold shadow"
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
