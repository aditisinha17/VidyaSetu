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
  Award,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { ApplicationTracker } from './ApplicationTracker';
import { DeficiencyDesk } from './DeficiencyDesk';
import { FellowshipLifecycle } from './FellowshipLifecycle';
import { AiSchemeMatcher } from './AiSchemeMatcher';
import { MissionChecklist } from '../../components/MissionChecklist';
import { ContextHelp, WhatHappensNextCard } from '../../components/ContextHelp';
import { LiteApplicantDashboard } from './LiteApplicantDashboard';
import { ApiClient } from '../../services/apiClient';
import { I18N } from '../../data/i18n';

export function ApplicantDashboard({ 
  applicants = [], 
  schemes = [],
  selectedApplicantId, 
  setSelectedApplicantId,
  onStartNewApplication,
  onViewDoc,
  onViewAwardLetter,
  onResolveDeficiency,
  onOpenGrievances,
  onOpenAuditTrail,
  onSwitchToOfficer,
  lang = 'en',
  lowBandwidth = false,
  setLowBandwidth,
  onReplayTour,
  authUser,
  activeTab: controlledActiveTab,
  onTabChange
}) {
  const [internalActiveTab, setInternalActiveTab] = useState('overview');
  const activeTab = controlledActiveTab !== undefined ? controlledActiveTab : internalActiveTab;
  const setActiveTab = (tab) => {
    setInternalActiveTab(tab);
    if (onTabChange) onTabChange(tab);
  };

  const currentApplicant = applicants.find(a => a.id === selectedApplicantId) || applicants[0] || null;
  const userName = currentApplicant?.name || authUser?.user?.name || (lang === 'hi' ? 'नागरिक आवेदक' : 'CITIZEN APPLICANT');
  const appIdDisplay = currentApplicant?.id || (lang === 'hi' ? 'नया खाता (आवेदन लंबित)' : 'NEW WORKSPACE (NO APPLICATION)');
  const userTribe = currentApplicant?.tribe || authUser?.user?.tribe || 'Scheduled Tribe (Art. 342)';
  const userState = currentApplicant?.state || authUser?.user?.state || 'Jharkhand';
  const profileCompletionPercent = currentApplicant ? (['AWARDED', 'QPR_ACTIVE'].includes(currentApplicant.status) ? 100 : 92) : (authUser?.user ? 25 : 0);

  if (lowBandwidth) {
    return (
      <LiteApplicantDashboard
        applicants={applicants}
        schemes={schemes}
        selectedApplicantId={selectedApplicantId}
        setSelectedApplicantId={setSelectedApplicantId}
        onStartNewApplication={onStartNewApplication}
        onViewDoc={onViewDoc}
        onViewAwardLetter={onViewAwardLetter}
        onResolveDeficiency={onResolveDeficiency}
        onOpenGrievances={onOpenGrievances}
        onSwitchToStandard={() => setLowBandwidth && setLowBandwidth(false)}
        lang={lang}
      />
    );
  }

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
              ST Domicile: {userState} ({userTribe})
            </span>
          </div>
          <h1 className="text-2xl font-black font-serif mt-2">
            {lang === 'hi' ? 'स्वागत है' : 'WELCOME'}, {userName.toUpperCase()}
          </h1>
          <p className="text-xs text-blue-200">
            {lang === 'hi' ? 'एआई-सक्षम छात्रवृत्ति पोर्टल' : 'AI-Powered Fellowship Portal'} • {lang === 'hi' ? 'आवेदन आईडी:' : 'Application ID:'} <strong className="text-white font-mono">{appIdDisplay}</strong>
          </p>
        </div>

        {/* Profile Completion Dial */}
        <div className="flex items-center space-x-4 bg-white/10 p-3 rounded-2xl border border-white/10">
          <div className="text-right">
            <div className="text-xs text-blue-200 font-semibold">{lang === 'hi' ? 'प्रोफ़ाइल पूर्णता' : 'Profile Completion'}</div>
            <div className="text-2xl font-black font-mono text-amber-300">{profileCompletionPercent}%</div>
            <div className="text-[10px] text-emerald-300">
              {currentApplicant ? (lang === 'hi' ? 'आधार एवं जाति सत्यापित' : 'Aadhaar & Caste Seeded') : (lang === 'hi' ? 'केवाईसी पूर्ण' : 'Account Created')}
            </div>
          </div>
          <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center font-black text-xs ${
            profileCompletionPercent >= 80 ? 'border-amber-400 border-t-emerald-400 text-emerald-300' : 'border-slate-400 border-t-amber-400 text-amber-300'
          }`}>
            {profileCompletionPercent >= 80 ? '✓' : `${profileCompletionPercent}%`}
          </div>
        </div>
      </div>

      {/* Quick Action Strip: Tour, 2G Data Saver, Official Slips */}
      <div data-tour="quick-actions" className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            data-tour="check-eligibility"
            onClick={() => setActiveTab('matcher')}
            className="px-3 py-1.5 bg-blue-900 text-white rounded-xl font-bold hover:bg-blue-800 flex items-center space-x-1.5 shadow-xs transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{lang === 'hi' ? 'पात्रता जांचें' : 'Check Eligibility'}</span>
          </button>

          {onReplayTour && (
            <button
              type="button"
              onClick={onReplayTour}
              className="px-3 py-1.5 bg-blue-50 text-blue-900 border border-blue-200 rounded-xl font-bold hover:bg-blue-100 flex items-center space-x-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>{lang === 'hi' ? 'गाइडेड टूर देखें' : 'Replay Guided Tour'}</span>
            </button>
          )}

          {setLowBandwidth && (
            <button
              type="button"
              onClick={() => setLowBandwidth(true)}
              className="px-3 py-1.5 bg-amber-50 text-amber-900 border border-amber-200 rounded-xl font-bold hover:bg-amber-100 flex items-center space-x-1.5 transition-colors"
            >
              <Zap className="w-3.5 h-3.5 text-amber-600" />
              <span>{lang === 'hi' ? '⚡ 2G डेटा सेवर मोड' : '⚡ 2G Data Saver Mode'}</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={ApiClient.getApplicationSlipUrl(currentApplicant?.id, 'acknowledgment')}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 flex items-center space-x-1.5 shadow-xs transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>{lang === 'hi' ? 'पावती पर्ची (QR Code)' : 'Official Slip (QR Code)'}</span>
          </a>
        </div>
      </div>

      {/* Mission Checklist Widget: 6 Steps to a Scholarship */}
      <div data-tour="mission-checklist">
        <MissionChecklist
          applicant={currentApplicant}
          lang={lang}
          onResolveDeficiency={() => setActiveTab('deficiency')}
          onViewAwardLetter={onViewAwardLetter}
        />
      </div>

      {/* Empty State Banner (Principle 7: Empty-by-default for fresh citizens) */}
      {applicants.length === 0 && (
        <div data-tour="empty-state-notice" className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-dashed border-blue-300 rounded-3xl p-8 text-center space-y-4 shadow-xs">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-900 text-amber-400 flex items-center justify-center text-3xl shadow-md">
            🎓
          </div>
          <div className="max-w-md mx-auto">
            <h2 className="text-xl font-black text-slate-900 font-serif">
              {lang === 'hi' ? 'कोई सक्रिय आवेदन नहीं मिला' : 'No Applications Submitted Yet'}
            </h2>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              {lang === 'hi'
                ? 'आपका नागरिक कार्यक्षेत्र पूरी तरह नया और सुरक्षित है। नीचे अपनी पात्रता जांचें या 5 मंत्रालय छात्रवृत्ति योजनाओं में से किसी एक के लिए नया आवेदन शुरू करें।'
                : 'Your citizen workspace is pristine and empty. Start by checking your statutory eligibility across all 5 MoTA schemes or launch a fresh application.'}
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              data-tour="check-eligibility"
              onClick={() => setActiveTab('matcher')}
              className="px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold shadow-md flex items-center space-x-2 transition"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{lang === 'hi' ? 'वैधानिक पात्रता जांचें' : 'Check Scheme Eligibility'}</span>
            </button>
            <button
              type="button"
              onClick={onStartNewApplication}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md flex items-center space-x-2 transition"
            >
              <Plus className="w-4 h-4" />
              <span>{lang === 'hi' ? 'नया आवेदन शुरू करें' : 'Start Fresh Application'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Demo Profile Selector Switcher (Visible ONLY during multi-record demo evaluation) */}
      {applicants.length > 1 && (
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
      )}

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

                  {/* End-to-End Visual Stepper Pipeline */}
                  <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      End-to-End Application Lifecycle Tracker
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-semibold text-slate-600 overflow-x-auto no-scrollbar gap-1 pt-0.5">
                      {[
                        { label: 'Submitted', stageNum: 1 },
                        { label: 'AI Pre-Check', stageNum: 2 },
                        { label: 'Verification', stageNum: 3 },
                        { label: 'Ministry Scrutiny', stageNum: 4 },
                        { label: 'Merit Selection', stageNum: 5 },
                        { label: 'DBT Disbursal', stageNum: 6 }
                      ].map((step, idx) => {
                        const isDone = (currentApplicant?.stage || 1) > step.stageNum || currentApplicant?.status === 'Selected';
                        const isCurrent = (currentApplicant?.stage || 1) === step.stageNum && currentApplicant?.status !== 'Selected';
                        return (
                          <div key={idx} className="flex items-center space-x-1 shrink-0">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold ${
                              isDone ? 'bg-emerald-600 text-white' :
                              isCurrent ? (currentApplicant?.status === 'Deficiency Pending' ? 'bg-rose-600 text-white animate-pulse' : 'bg-blue-900 text-white ring-2 ring-blue-300') :
                              'bg-slate-200 text-slate-500'
                            }`}>
                              {isDone ? '✓' : isCurrent ? '●' : '○'}
                            </div>
                            <span className={isCurrent ? 'font-bold text-blue-950' : isDone ? 'text-emerald-800' : 'text-slate-400'}>
                              {step.label}
                            </span>
                            {idx < 5 && <span className="text-slate-300 px-0.5">➔</span>}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Plain-Language What Happens Next Card */}
                  <WhatHappensNextCard status={currentApplicant?.status} lang={lang} />

                  {/* Statutory Clause & Eligibility Breakdown Card */}
                  <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl text-xs space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-blue-950 flex items-center space-x-1.5 text-[11px]">
                        <ShieldCheck className="w-3.5 h-3.5 text-blue-900" />
                        <span>Statutory Rules Compliance (Article 342 & MoTA Guidelines)</span>
                      </span>
                      <span className="text-[10px] bg-blue-100 text-blue-900 font-bold px-2 py-0.5 rounded">
                        RTI Auditable
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                      <div className="p-2 bg-white rounded border border-blue-100 flex items-center justify-between">
                        <span className="text-slate-600 flex items-center">
                          ST Category
                          <ContextHelp text={I18N[lang]?.tooltips?.tribe || I18N.en.tooltips.tribe} lang={lang} />:
                        </span>
                        <strong className="text-emerald-700">✓ Article 342 Pass</strong>
                      </div>
                      <div className="p-2 bg-white rounded border border-blue-100 flex items-center justify-between">
                        <span className="text-slate-600 flex items-center">
                          Income Ceiling
                          <ContextHelp text={I18N[lang]?.tooltips?.income || I18N.en.tooltips.income} lang={lang} />:
                        </span>
                        <strong className="text-emerald-700">✓ ₹{(currentApplicant?.annualIncome || 0).toLocaleString()} (Pass)</strong>
                      </div>
                      <div className="p-2 bg-white rounded border border-blue-100 flex items-center justify-between">
                        <span className="text-slate-600 flex items-center">
                          Age Eligibility
                          <ContextHelp text="Maximum age limits derived dynamically from statutory scheme rules version in database." lang={lang} />:
                        </span>
                        <strong className="text-emerald-700">✓ {currentApplicant?.age || 26} Yrs (Pass)</strong>
                      </div>
                      <div className="p-2 bg-white rounded border border-blue-100 flex items-center justify-between">
                        <span className="text-slate-600 flex items-center">
                          Academic Score
                          <ContextHelp text={I18N[lang]?.tooltips?.marks || I18N.en.tooltips.marks} lang={lang} />:
                        </span>
                        <strong className="text-blue-950 font-bold">✓ {currentApplicant?.pgMarks || 78}% (Pass)</strong>
                      </div>
                    </div>

                    {currentApplicant?.deterministicRuleAudit?.details && (
                      <p className="text-[10px] text-slate-600 italic">
                        "{currentApplicant.deterministicRuleAudit.details}"
                      </p>
                    )}
                  </div>

                  {/* Application Health Score (0-100) with visible breakdown */}
                  <div className="p-3 bg-indigo-50/70 border border-indigo-200 rounded-xl text-xs space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-indigo-950 flex items-center space-x-1.5 text-[11px]">
                        <Award className="w-3.5 h-3.5 text-indigo-700" />
                        <span>Application Health Score</span>
                      </span>
                      <span className="text-xs font-mono font-black text-indigo-900 bg-indigo-100 px-2.5 py-0.5 rounded-full border border-indigo-300">
                        {currentApplicant?.healthScore?.finalScore || 92} / 100
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-1 text-[10px] text-center font-medium text-slate-600">
                      <div className="p-1 bg-white rounded border border-indigo-100">
                        <div>Demographics</div>
                        <div className="font-bold text-emerald-700">{currentApplicant?.healthScore?.breakdown?.demographics ?? 25}/25</div>
                      </div>
                      <div className="p-1 bg-white rounded border border-indigo-100">
                        <div>Academics</div>
                        <div className="font-bold text-blue-700">{currentApplicant?.healthScore?.breakdown?.academics ?? 25}/25</div>
                      </div>
                      <div className="p-1 bg-white rounded border border-indigo-100">
                        <div>Documents</div>
                        <div className="font-bold text-amber-700">{currentApplicant?.healthScore?.breakdown?.documents ?? 22}/25</div>
                      </div>
                      <div className="p-1 bg-white rounded border border-indigo-100">
                        <div>Integrity</div>
                        <div className="font-bold text-purple-700">{currentApplicant?.healthScore?.breakdown?.anomalyRisk ?? 20}/25</div>
                      </div>
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
