import React, { useState } from 'react';
import { 
  Plus, 
  Sparkles, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  GraduationCap, 
  Landmark, 
  Clock, 
  ChevronRight,
  Filter,
  Check,
  Calendar,
  AlertCircle,
  HelpCircle,
  TrendingUp,
  Award
} from 'lucide-react';
import { ApplicationTracker } from './ApplicationTracker';
import { DeficiencyDesk } from './DeficiencyDesk';
import { FellowshipLifecycle } from './FellowshipLifecycle';
import { AiSchemeMatcher } from './AiSchemeMatcher';

export function ApplicantDashboard({ 
  applicants, 
  schemes,
  selectedApplicantId, 
  setSelectedApplicantId,
  onStartNewApplication,
  onViewDoc,
  onViewAwardLetter,
  onResolveDeficiency,
  onOpenGrievances,
  onOpenAuditTrail,
  onSwitchToOfficer
}) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'matcher', 'tracker', 'deficiency', 'lifecycle'

  const currentApplicant = applicants.find(a => a.id === selectedApplicantId) || applicants[0];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Top Welcome Banner with Profile Completion */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-950 text-white shadow-md flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2.5 py-0.5 rounded-full">
              JAN PARICHAY & DIGILOCKER VERIFIED
            </span>
            <span className="text-xs text-blue-200">
              ST Domicile: Jharkhand (Santhal)
            </span>
          </div>
          <h1 className="text-2xl font-black font-serif mt-2">
            WELCOME, {currentApplicant?.name ? currentApplicant.name.toUpperCase() : 'ADITI KUMARI'}
          </h1>
          <p className="text-xs text-blue-200">
            AI-Powered Fellowship Portal • Application ID: <strong className="text-white font-mono">{currentApplicant?.id}</strong>
          </p>
        </div>

        {/* Profile Completion Dial (92%) */}
        <div className="flex items-center space-x-4 bg-white/10 p-3 rounded-2xl border border-white/10">
          <div className="text-right">
            <div className="text-xs text-blue-200 font-semibold">Profile Completion</div>
            <div className="text-2xl font-black font-mono text-amber-300">92%</div>
            <div className="text-[10px] text-emerald-300">Aadhaar & Caste Seeded</div>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-amber-400 border-t-emerald-400 flex items-center justify-center font-black text-xs">
            ✓
          </div>
        </div>
      </div>

      {/* Demo Profile Selector Switcher */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-2 px-1 text-xs">
          <span className="font-bold text-slate-500 uppercase tracking-wider text-[11px]">
            Switch Demo Applicant Profile (Test different scenarios):
          </span>
          <span className="text-slate-400 font-mono">{applicants.length} Records Loaded</span>
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
                    ? 'border-blue-900 bg-blue-50/90 shadow-xs ring-1 ring-blue-900' 
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/60'
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

      {/* Student Navigation Subtabs */}
      <div className="flex space-x-2 border-b border-slate-200 overflow-x-auto">
        {[
          { id: 'overview', label: 'Dashboard Overview', icon: Sparkles },
          { id: 'matcher', label: 'AI Scheme Matcher', icon: Sparkles },
          { id: 'tracker', label: 'Application Pipeline', icon: Clock },
          { id: 'deficiency', label: 'Deficiency Desk', icon: AlertTriangle, alert: currentApplicant?.deficiency },
          { id: 'lifecycle', label: 'Fellowship & DBT Hub', icon: Landmark }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 pb-3 px-3 text-xs font-bold border-b-2 transition whitespace-nowrap ${
                isActive
                  ? 'border-blue-900 text-blue-900'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.alert && (
                <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping"></span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW (The exact Student Dashboard layout requested) */}
      {activeTab === 'overview' && (
        <div className="space-y-6 animate-in fade-in">
          {/* Section 1: AI Recommendations & Active Applications */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* AI Recommendations (6 cols) */}
            <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center space-x-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>AI Scheme Recommendations</span>
                </h3>
                <button 
                  onClick={() => setActiveTab('matcher')} 
                  className="text-xs text-blue-900 font-bold hover:underline"
                >
                  Adjust Profile →
                </button>
              </div>

              <div className="space-y-3">
                {/* NFST Match */}
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-bold text-xs text-slate-900 flex items-center space-x-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>National Fellowship for ST Students (NFST)</span>
                      </div>
                      <div className="text-[11px] text-slate-500">M.Phil & Ph.D. in India (₹37k - ₹42k/mo)</div>
                    </div>
                    <span className="font-mono font-bold text-xs text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-300">
                      ✓ Statutorily Eligible
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 pt-1 border-t border-slate-200 font-medium">
                    <span>✓ ST Category (Gazette)</span>
                    <span>✓ Income ≤ ₹6.00 LPA</span>
                    <span>✓ Age ≤ 36 Yrs</span>
                    <span>✓ Master's Degree Verified</span>
                  </div>

                  <div className="flex justify-between items-center pt-1 text-[11px]">
                    <span className="text-slate-500">Documents Ready: <strong className="text-slate-800">6 of 6 Uploaded</strong></span>
                    <button 
                      onClick={onStartNewApplication}
                      className="px-2.5 py-1 bg-blue-900 text-white rounded-lg font-bold text-[10px]"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>

                {/* NOS Match */}
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-bold text-xs text-slate-900 flex items-center space-x-1.5">
                        <CheckCircle2 className="w-4 h-4 text-blue-600" />
                        <span>National Overseas Scholarship (NOS)</span>
                      </div>
                      <div className="text-[11px] text-slate-500">Masters & Ph.D. Abroad (QS Top 500)</div>
                    </div>
                    <span className="font-mono font-bold text-xs text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full border border-amber-300">
                      ⚠️ Prerequisites Pending
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 pt-1 border-t border-slate-200 font-medium">
                    <span>✓ ST Category (Gazette)</span>
                    <span>✓ Income ≤ ₹8.00 LPA</span>
                    <span>✓ Age ≤ 35 Yrs</span>
                    <span>⚠️ Passport & Offer Ltr Required</span>
                  </div>

                  <div className="flex justify-between items-center pt-1 text-[11px]">
                    <span className="text-slate-500">Documents Ready: <strong className="text-slate-800">5 of 7 Uploaded</strong></span>
                    <button 
                      onClick={onStartNewApplication}
                      className="px-2.5 py-1 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg font-bold text-[10px]"
                    >
                      View Scheme
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Applications with Visual Progress Bars (6 cols) */}
            <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center space-x-1.5">
                  <Clock className="w-4 h-4 text-blue-900" />
                  <span>My Active Applications</span>
                </h3>
                <button 
                  onClick={onStartNewApplication} 
                  className="flex items-center space-x-1 px-3 py-1 bg-blue-900 text-white rounded-lg text-xs font-bold shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Application</span>
                </button>
              </div>

              <div className="space-y-4">
                {/* Current Active App */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-mono font-bold text-[11px] text-slate-500">{currentApplicant?.id}</span>
                      <h4 className="font-bold text-xs text-slate-900">{currentApplicant?.schemeName}</h4>
                      <p className="text-[11px] text-slate-500">{currentApplicant?.institution}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      currentApplicant?.status === 'Selected' ? 'bg-emerald-100 text-emerald-800' :
                      currentApplicant?.status === 'Deficiency Pending' ? 'bg-rose-100 text-rose-800 animate-pulse' :
                      'bg-blue-100 text-blue-900'
                    }`}>
                      {currentApplicant?.status}
                    </span>
                  </div>

                  {/* Graphical Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="font-semibold text-slate-600">Verification Lifecycle:</span>
                      <strong className="font-mono text-blue-950">{currentApplicant?.progressPercent || 70}%</strong>
                    </div>
                    <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-300 ${
                          currentApplicant?.status === 'Deficiency Pending' ? 'bg-rose-600' : 'bg-blue-900'
                        }`}
                        style={{ width: `${currentApplicant?.progressPercent || 70}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-1 text-[11px]">
                    <button 
                      onClick={() => onOpenAuditTrail(currentApplicant)}
                      className="text-slate-600 font-semibold hover:text-blue-900"
                    >
                      Audit Trail →
                    </button>
                    <button 
                      onClick={() => setActiveTab('tracker')}
                      className="px-3 py-1 bg-blue-50 text-blue-900 border border-blue-200 rounded-lg font-bold"
                    >
                      View Stage Pipeline
                    </button>
                  </div>
                </div>

                {/* Deficiency Callout Banner if applicable */}
                {currentApplicant?.deficiency && (
                  <div className="p-3.5 bg-rose-50 border border-rose-300 rounded-xl text-xs space-y-1.5 text-rose-950 animate-pulse">
                    <div className="font-bold flex items-center space-x-1.5 text-rose-900">
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                      <span>Action Required: {currentApplicant.deficiency.title}</span>
                    </div>
                    <p className="text-[11px] text-rose-800">
                      {currentApplicant.deficiency.description}
                    </p>
                    <div className="flex justify-between items-center pt-1">
                      <span className="text-[10px] text-rose-700 font-bold">Deadline: {currentApplicant.deficiency.deadline}</span>
                      <button 
                        onClick={() => setActiveTab('deficiency')}
                        className="px-3 py-1 bg-rose-600 text-white rounded-lg font-bold text-[11px] shadow-xs"
                      >
                        Rectify & Re-Upload
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Important Deadlines, Grievance Tracker & Payment Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Important Deadlines */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
              <h4 className="font-bold text-slate-900 uppercase tracking-wide text-[11px] flex items-center space-x-1.5">
                <Calendar className="w-4 h-4 text-amber-600" />
                <span>Important Deadlines</span>
              </h4>
              <div className="space-y-2">
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="font-bold text-slate-800">NFST 2026-27 Intake Close</div>
                  <div className="text-[11px] text-slate-500">15 October 2026 (Portal Cutoff)</div>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="font-bold text-slate-800">Q2 Progress Report Submission</div>
                  <div className="text-[11px] text-slate-500">31 December 2026 (Fellows)</div>
                </div>
              </div>
            </div>

            {/* Payment & Disbursement Status */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
              <h4 className="font-bold text-slate-900 uppercase tracking-wide text-[11px] flex items-center space-x-1.5">
                <Landmark className="w-4 h-4 text-emerald-600" />
                <span>DBT Payment Status</span>
              </h4>
              <div className="space-y-2">
                <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950">
                  <div className="font-bold">Aadhaar Payment Bridge (APB)</div>
                  <div className="text-[11px] text-emerald-800">State Bank of India (A/c Linked)</div>
                  <div className="text-[10px] text-emerald-700 font-semibold mt-1">✓ NPCI DBT Clearance Active</div>
                </div>
                <button 
                  onClick={() => setActiveTab('lifecycle')}
                  className="w-full py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold text-center"
                >
                  View Installment Ledger →
                </button>
              </div>
            </div>

            {/* Grievance & Helpdesk */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
              <h4 className="font-bold text-slate-900 uppercase tracking-wide text-[11px] flex items-center space-x-1.5">
                <HelpCircle className="w-4 h-4 text-blue-900" />
                <span>Grievance & Redressal</span>
              </h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Facing delays in verification or have a query regarding HRA or city categorization?
              </p>
              <button 
                onClick={onOpenGrievances}
                className="w-full py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg font-bold shadow-xs"
              >
                Lodge Grievance (AI Fast-Track)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: AI Scheme Matcher */}
      {activeTab === 'matcher' && (
        <AiSchemeMatcher
          schemes={schemes}
          onSelectSchemeToApply={() => onStartNewApplication()}
        />
      )}

      {/* TAB 3: Application Tracker */}
      {activeTab === 'tracker' && (
        <ApplicationTracker
          applicant={currentApplicant}
          onViewDoc={onViewDoc}
          onViewAwardLetter={onViewAwardLetter}
          onOpenDeficiency={() => setActiveTab('deficiency')}
        />
      )}

      {/* TAB 4: Deficiency Desk */}
      {activeTab === 'deficiency' && (
        <DeficiencyDesk
          applicant={currentApplicant}
          onResolveDeficiency={onResolveDeficiency}
          onSwitchToOfficer={onSwitchToOfficer}
        />
      )}

      {/* TAB 5: Fellowship & DBT Hub */}
      {activeTab === 'lifecycle' && (
        <FellowshipLifecycle
          applicant={currentApplicant}
          onViewAwardLetter={onViewAwardLetter}
        />
      )}
    </div>
  );
}
