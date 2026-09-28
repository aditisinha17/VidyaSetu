import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Sparkles, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  GraduationCap, 
  Landmark, 
  Clock, 
  ChevronRight,
  Filter
} from 'lucide-react';
import { ApplicationTracker } from './ApplicationTracker';
import { DeficiencyDesk } from './DeficiencyDesk';
import { FellowshipLifecycle } from './FellowshipLifecycle';

export function ApplicantDashboard({ 
  applicants, 
  selectedApplicantId, 
  setSelectedApplicantId,
  onStartNewApplication,
  onViewDoc,
  onViewAwardLetter,
  onResolveDeficiency
}) {
  const [activeTab, setActiveTab] = useState('tracker'); // 'tracker', 'deficiency', 'lifecycle'
  const [filterScheme, setFilterScheme] = useState('ALL');

  const currentApplicant = applicants.find(a => a.id === selectedApplicantId) || applicants[0];

  const filteredApplicants = applicants.filter(a => {
    if (filterScheme === 'ALL') return true;
    return a.schemeId === filterScheme;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Top Banner & Quick Application Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-slate-900 font-serif">Applicant & Scholar Governance Desk</h1>
          <p className="text-xs text-slate-600">
            End-to-End Tracking for Ministry of Tribal Affairs (MoTA) Fellowships & Scholarships
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onStartNewApplication}
            className="flex items-center space-x-2 px-4 py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-900/20 transition"
          >
            <Plus className="w-4 h-4 text-amber-300" />
            <span>Apply for New Fellowship</span>
          </button>
        </div>
      </div>

      {/* Candidate Profile Selector Strip (Demo Multi-Applicant Switching) */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Switch Demo Applicant Profile (Test different scenarios):
          </span>
          <span className="text-[11px] text-slate-400">{applicants.length} Active Records</span>
        </div>

        <div className="flex space-x-2 overflow-x-auto pb-1 no-scrollbar">
          {applicants.map((app) => {
            const isSelected = app.id === currentApplicant?.id;
            return (
              <button
                key={app.id}
                onClick={() => setSelectedApplicantId(app.id)}
                className={`p-2.5 rounded-xl border text-left shrink-0 transition-all ${
                  isSelected 
                    ? 'border-blue-900 bg-blue-50/80 shadow-xs ring-1 ring-blue-900/20' 
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-slate-900">{app.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                    app.status === 'Selected' ? 'bg-emerald-100 text-emerald-800' :
                    app.status === 'Deficiency Pending' ? 'bg-rose-100 text-rose-800 font-bold' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {app.schemeId}
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 mt-1 flex items-center space-x-1">
                  <span>{app.status}</span>
                  {app.pvtg && <span className="text-purple-700 font-bold">• PVTG</span>}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Navigation Subtabs */}
      <div className="flex space-x-3 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('tracker')}
          className={`flex items-center space-x-2 pb-3 px-2 text-xs font-bold border-b-2 transition ${
            activeTab === 'tracker'
              ? 'border-blue-900 text-blue-900'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Stage-by-Stage Application Pipeline</span>
        </button>

        <button
          onClick={() => setActiveTab('deficiency')}
          className={`flex items-center space-x-2 pb-3 px-2 text-xs font-bold border-b-2 transition ${
            activeTab === 'deficiency'
              ? 'border-rose-600 text-rose-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>Deficiency Redressal Desk</span>
          {currentApplicant?.deficiency && (
            <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping"></span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('lifecycle')}
          className={`flex items-center space-x-2 pb-3 px-2 text-xs font-bold border-b-2 transition ${
            activeTab === 'lifecycle'
              ? 'border-emerald-600 text-emerald-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Landmark className="w-4 h-4" />
          <span>Post-Selection & Fellowship Hub</span>
          {currentApplicant?.status === 'Selected' && (
            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold">
              Active
            </span>
          )}
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'tracker' && (
        <ApplicationTracker
          applicant={currentApplicant}
          onViewDoc={onViewDoc}
          onViewAwardLetter={onViewAwardLetter}
          onOpenDeficiency={() => setActiveTab('deficiency')}
        />
      )}

      {activeTab === 'deficiency' && (
        <DeficiencyDesk
          applicant={currentApplicant}
          onResolveDeficiency={onResolveDeficiency}
        />
      )}

      {activeTab === 'lifecycle' && (
        <FellowshipLifecycle
          applicant={currentApplicant}
          onViewAwardLetter={onViewAwardLetter}
        />
      )}
    </div>
  );
}
