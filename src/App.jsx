import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LoginPanel } from './components/LoginPanel';
import { DocumentViewerModal } from './components/DocumentViewerModal';
import { AwardLetterModal } from './components/AwardLetterModal';
import { VidyaMitraChatbot } from './components/VidyaMitraChatbot';
import { GovernanceManualModal } from './components/GovernanceManualModal';
import { GrievanceManagementModal } from './components/GrievanceManagementModal';
import { AuditTrailModal } from './components/AuditTrailModal';
import { NotificationDrawer } from './components/NotificationDrawer';

// Student Portal Components
import { ApplicantDashboard } from './portals/ApplicantPortal/ApplicantDashboard';
import { ApplicationWizard } from './portals/ApplicantPortal/ApplicationWizard';

// Admin Portal Components
import { OfficerScrutinyDesk } from './portals/AdminPortal/OfficerScrutinyDesk';
import { ApplicationTriage } from './portals/AdminPortal/ApplicationTriage';
import { MeritRankingEngine } from './portals/AdminPortal/MeritRankingEngine';
import { PostSelectionDBTHub } from './portals/AdminPortal/PostSelectionDBTHub';
import { SchemeConfigStudio } from './portals/AdminPortal/SchemeConfigStudio';
import { WhatIfAnalysis } from './portals/AdminPortal/WhatIfAnalysis';
import { NationalAnalytics } from './portals/AdminPortal/NationalAnalytics';

// Initial Data
import { INITIAL_APPLICANTS, INITIAL_SCHEMES } from './data/mockData';

export function App() {
  // Authentication State
  const [auth, setAuth] = useState({
    isAuthenticated: false, // Starts at Login Panel
    type: null, // 'student' | 'admin'
    user: null
  });

  const [currentRole, setRole] = useState('analytics'); // for admin: 'analytics', 'scrutiny', 'triage', 'merit', 'dbt', 'config', 'whatif'
  const [lang, setLang] = useState('en');
  const [contrast, setContrast] = useState(false);
  const [textSize, setTextSize] = useState('normal');
  const [lowBandwidth, setLowBandwidth] = useState(false);

  // Core application state
  const [applicants, setApplicants] = useState(INITIAL_APPLICANTS);
  const [schemes, setSchemes] = useState(INITIAL_SCHEMES);
  const [selectedApplicantId, setSelectedApplicantId] = useState(INITIAL_APPLICANTS[0].id);

  // Modal states
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [activeDocView, setActiveDocView] = useState(null); // { doc, applicant }
  const [awardLetterApp, setAwardLetterApp] = useState(null);
  const [auditApp, setAuditApp] = useState(null);
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [isGrievanceModalOpen, setIsGrievanceModalOpen] = useState(false);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);

  // Toast
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // AUTHENTICATION HANDLERS
  const handleLoginSuccess = (loginData) => {
    setAuth({
      isAuthenticated: true,
      type: loginData.type,
      user: loginData.user
    });

    if (loginData.type === 'student') {
      setSelectedApplicantId(loginData.user.id);
      showToast(`Welcome back, ${loginData.user.name}! Jan Parichay session authenticated.`);
    } else {
      setRole('analytics');
      showToast(`Officer session active: ${loginData.user.name} (${loginData.user.roleLabel})`);
    }
  };

  const handleLogout = () => {
    setAuth({
      isAuthenticated: false,
      type: null,
      user: null
    });
    setIsWizardOpen(false);
    showToast('You have been securely signed out.');
  };

  // APPLICATION WORKFLOW HANDLERS
  const handleApplicationSubmit = (newApp) => {
    setApplicants(prev => [newApp, ...prev]);
    setSelectedApplicantId(newApp.id);
    setIsWizardOpen(false);
    showToast(`Application ${newApp.id} submitted! DigiLocker KYC & AI pre-check passed.`);
  };

  const handleApproveApplication = (appId) => {
    setApplicants(prev => prev.map(a => {
      if (a.id === appId) {
        return {
          ...a,
          status: 'Selection Committee Review',
          stage: 4,
          progressPercent: 85,
          triageCategory: 'READY',
          aiVerdict: 'Level-1 & Level-2 Scrutiny Approved by MoTA Officer. Forwarded to Merit Committee.'
        };
      }
      return a;
    }));
    showToast(`Application ${appId} approved and forwarded to Selection Committee!`);
  };

  const handleRaiseDeficiency = (appId, deficiencyData) => {
    setApplicants(prev => prev.map(a => {
      if (a.id === appId) {
        return {
          ...a,
          status: 'Deficiency Pending',
          stage: 3,
          progressPercent: 50,
          triageCategory: 'DEFICIENT',
          deficiency: deficiencyData,
          aiVerdict: `Deficiency Raised by Scrutiny Officer: ${deficiencyData.title}. Candidate notified via SMS/Portal.`
        };
      }
      return a;
    }));
    showToast(`Official deficiency notice dispatched to candidate ${appId}.`);
  };

  const handleRejectApplication = (appId) => {
    setApplicants(prev => prev.map(a => {
      if (a.id === appId) {
        return {
          ...a,
          status: 'Rejected',
          aiVerdict: 'Application rejected during scrutiny due to non-fulfillment of statutory scheme criteria.'
        };
      }
      return a;
    }));
    showToast(`Application ${appId} marked as Rejected.`);
  };

  const handleResolveDeficiency = (appId, remarks) => {
    setApplicants(prev => prev.map(a => {
      if (a.id === appId) {
        return {
          ...a,
          status: 'AI Verified',
          stage: 3,
          progressPercent: 65,
          triageCategory: 'READY',
          deficiency: null,
          aiVerdict: 'Deficiency rectified by candidate with verified replacement certificate. Re-queued for Officer approval.'
        };
      }
      return a;
    }));
    showToast(`Deficiency rectified! Application ${appId} returned to Scrutiny Officer inbox.`);
  };

  const handleBulkSelect = (selectedIds) => {
    setApplicants(prev => prev.map(a => {
      if (selectedIds.includes(a.id)) {
        return {
          ...a,
          status: 'Selected',
          stage: 6,
          progressPercent: 100,
          triageCategory: 'READY',
          fellowshipDetails: a.fellowshipDetails || {
            sanctionNumber: `MoTA/${a.schemeId}/2026/AWARD-${a.id.split('-').pop()}`,
            monthlyStipend: a.schemeId === 'NOS' ? 110000 : 37000,
            annualContingency: 20500,
            bankAccount: 'State Bank of India (Aadhaar Seeded)',
            accountNoMasked: 'SBIN0000166 - ***8192',
            pfmsBatchId: 'PFMS-MOTA-2026-AUTOBATCH',
            disbursementHistory: [
              { installment: 'Installment 1 Sanction', amount: a.schemeId === 'NOS' ? 110000 : 37000, status: 'Processing', utr: 'Queued in PFMS e-FTO', date: '2026-10-01' }
            ],
            progressReports: [
              { quarter: 'Q1 2026', status: 'Enrolled', submissionDate: 'Pending', grade: 'Good' }
            ]
          }
        };
      }
      return a;
    }));
    showToast(`Official National Selection Gazette Published! ${selectedIds.length} scholars awarded.`);
  };

  const handleUpdateScheme = (updatedScheme) => {
    setSchemes(prev => prev.map(s => s.id === updatedScheme.id ? updatedScheme : s));
    showToast(`Policy for ${updatedScheme.shortName} updated in production!`);
  };

  const activeDeficiencyCount = applicants.filter(a => a.status === 'Deficiency Pending').length;

  // IF NOT AUTHENTICATED: RENDER LOGIN PANEL
  if (!auth.isAuthenticated) {
    return <LoginPanel onLoginSuccess={handleLoginSuccess} />;
  }

  // IF AUTHENTICATED: RENDER ROLE-SPECIFIC WORKSPACE
  return (
    <div className={`min-h-screen flex flex-col font-sans ${textSize === 'large' ? 'text-base' : 'text-sm'} ${contrast ? 'bg-black text-yellow-300' : 'bg-slate-50 text-slate-900'}`}>
      {/* Low-Bandwidth Mode Active Strip */}
      {lowBandwidth && (
        <div className="bg-amber-500 text-blue-950 font-bold text-xs py-1 px-4 text-center">
          ⚡ Low-Bandwidth Mode Active: Minimal animations & compressed assets enabled for remote tribal connectivity.
        </div>
      )}

      {/* Header with Authenticated Session & Logout */}
      <Header
        currentRole={currentRole}
        setRole={setRole}
        lang={lang}
        setLang={setLang}
        contrast={contrast}
        setContrast={setContrast}
        textSize={textSize}
        setTextSize={setTextSize}
        lowBandwidth={lowBandwidth}
        setLowBandwidth={setLowBandwidth}
        deficiencyCount={activeDeficiencyCount}
        authUser={auth}
        onLogout={handleLogout}
        onOpenDeficiency={() => {}}
        onOpenNotifications={() => setIsNotificationDrawerOpen(true)}
        onOpenGrievances={() => setIsGrievanceModalOpen(true)}
        onOpenManual={() => setIsManualModalOpen(true)}
      />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center space-x-3 text-xs animate-in slide-in-from-top-4 duration-200">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></div>
          <span className="font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Main Content Area: STRICTLY DIVIDED BY USER TYPE */}
      <main className="flex-1">
        {/* 1. STUDENT AUTHENTICATED SESSION */}
        {auth.type === 'student' && (
          <>
            {isWizardOpen ? (
              <div className="max-w-7xl mx-auto px-4 py-8">
                <ApplicationWizard
                  schemes={schemes}
                  onApplicationSubmit={handleApplicationSubmit}
                  onCancel={() => setIsWizardOpen(false)}
                />
              </div>
            ) : (
              <ApplicantDashboard
                applicants={applicants}
                schemes={schemes}
                selectedApplicantId={selectedApplicantId}
                setSelectedApplicantId={setSelectedApplicantId}
                onStartNewApplication={() => setIsWizardOpen(true)}
                onViewDoc={(doc, app) => setActiveDocView({ doc, applicant: app })}
                onViewAwardLetter={(app) => setAwardLetterApp(app)}
                onResolveDeficiency={handleResolveDeficiency}
                onOpenGrievances={() => setIsGrievanceModalOpen(true)}
                onOpenAuditTrail={(app) => setAuditApp(app)}
              />
            )}
          </>
        )}

        {/* 2. ADMINISTRATOR AUTHENTICATED SESSION */}
        {auth.type === 'admin' && (
          <>
            {currentRole === 'analytics' && (
              <NationalAnalytics />
            )}

            {currentRole === 'scrutiny' && (
              <OfficerScrutinyDesk
                applicants={applicants}
                onApproveApplication={handleApproveApplication}
                onRaiseDeficiency={handleRaiseDeficiency}
                onRejectApplication={handleRejectApplication}
                onInspectDoc={(doc, app) => setActiveDocView({ doc, applicant: app })}
              />
            )}

            {currentRole === 'triage' && (
              <div className="max-w-7xl mx-auto px-4 py-6">
                <ApplicationTriage
                  applicants={applicants}
                  onInspectDoc={(doc, app) => setActiveDocView({ doc, applicant: app })}
                  onApproveApplication={handleApproveApplication}
                  onRaiseDeficiency={handleRaiseDeficiency}
                  onOpenAuditTrail={(app) => setAuditApp(app)}
                />
              </div>
            )}

            {currentRole === 'merit' && (
              <MeritRankingEngine
                applicants={applicants}
                onBulkSelect={handleBulkSelect}
                onViewAwardLetter={(app) => setAwardLetterApp(app)}
              />
            )}

            {currentRole === 'dbt' && (
              <PostSelectionDBTHub
                applicants={applicants}
                onTriggerDbtBatch={() => showToast('Monthly DBT Stipend Batch Executed via PFMS!')}
              />
            )}

            {currentRole === 'config' && (
              <SchemeConfigStudio
                schemes={schemes}
                onUpdateScheme={handleUpdateScheme}
              />
            )}

            {currentRole === 'whatif' && (
              <div className="max-w-7xl mx-auto px-4 py-6">
                <WhatIfAnalysis />
              </div>
            )}
          </>
        )}
      </main>

      {/* Floating AI Copilot */}
      <VidyaMitraChatbot />

      {/* Modals & Drawers */}
      {activeDocView && (
        <DocumentViewerModal
          doc={activeDocView.doc}
          applicant={activeDocView.applicant}
          onClose={() => setActiveDocView(null)}
        />
      )}

      {awardLetterApp && (
        <AwardLetterModal
          applicant={awardLetterApp}
          onClose={() => setAwardLetterApp(null)}
        />
      )}

      {auditApp && (
        <AuditTrailModal
          applicant={auditApp}
          onClose={() => setAuditApp(null)}
        />
      )}

      {isManualModalOpen && (
        <GovernanceManualModal
          isOpen={isManualModalOpen}
          onClose={() => setIsManualModalOpen(false)}
        />
      )}

      {isGrievanceModalOpen && (
        <GrievanceManagementModal
          applicant={applicants.find(a => a.id === selectedApplicantId)}
          onClose={() => setIsGrievanceModalOpen(false)}
        />
      )}

      <NotificationDrawer
        isOpen={isNotificationDrawerOpen}
        onClose={() => setIsNotificationDrawerOpen(false)}
      />

      {/* Footer */}
      <Footer contrast={contrast} />
    </div>
  );
}

export default App;
