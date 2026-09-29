import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PublicHomePage } from './components/PublicHomePage';
import { LoginPanel } from './components/LoginPanel';
import { DocumentViewerModal } from './components/DocumentViewerModal';
import { AwardLetterModal } from './components/AwardLetterModal';
import { VidyaMitraChatbot } from './components/VidyaMitraChatbot';
import { GrievanceManagementModal } from './components/GrievanceManagementModal';
import { AuditTrailModal } from './components/AuditTrailModal';
import { NotificationDrawer } from './components/NotificationDrawer';
import { WelcomeTourModal } from './components/WelcomeTourModal';
import { InteractiveWalkthrough } from './components/InteractiveWalkthrough';

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

// Initial Data & Services
import { INITIAL_APPLICANTS, INITIAL_SCHEMES } from './data/mockData';
import { ApiClient } from './services/apiClient';

export function App() {
  // Authentication State
  const [auth, setAuth] = useState({
    isAuthenticated: false, // Starts at Public Portal
    type: null, // 'student' | 'admin'
    user: null
  });

  const [publicViewState, setPublicViewState] = useState('home'); // 'home' | 'login'
  const [authPortalTab, setAuthPortalTab] = useState('student'); // 'student' | 'register' | 'admin'

  const [currentRole, setRole] = useState('analytics'); // for admin: 'analytics', 'scrutiny', 'triage', 'merit', 'dbt', 'config', 'whatif'
  const [lang, setLang] = useState('en');
  const [contrast, setContrast] = useState(false);
  const [textSize, setTextSize] = useState('normal');
  const [lowBandwidth, setLowBandwidth] = useState(false);
  const [isBackendOnline, setIsBackendOnline] = useState(true);

  // Core application state
  const [applicants, setApplicants] = useState(INITIAL_APPLICANTS);
  const [schemes, setSchemes] = useState(INITIAL_SCHEMES);
  const [selectedApplicantId, setSelectedApplicantId] = useState(INITIAL_APPLICANTS[0].id);

  // Modal states
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [activeDocView, setActiveDocView] = useState(null); // { doc, applicant }
  const [awardLetterApp, setAwardLetterApp] = useState(null);
  const [auditApp, setAuditApp] = useState(null);
  const [isGrievanceModalOpen, setIsGrievanceModalOpen] = useState(false);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);
  const [isWelcomeTourOpen, setIsWelcomeTourOpen] = useState(false);
  const [isWalkthroughOpen, setIsWalkthroughOpen] = useState(false);

  // Toast
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Sync with live backend database on mount
  useEffect(() => {
    async function syncWithBackend() {
      const health = await ApiClient.checkBackendHealth();
      if (health && health.success) {
        setIsBackendOnline(true);
        const [appsRes, schemesRes] = await Promise.all([
          ApiClient.getApplications(),
          ApiClient.getSchemes()
        ]);
        if (appsRes && appsRes.success && appsRes.data) {
          setApplicants(appsRes.data);
        }
        if (schemesRes && schemesRes.success && schemesRes.data) {
          setSchemes(schemesRes.data);
        }
      } else {
        setIsBackendOnline(false);
      }
    }
    syncWithBackend();
  }, []);

  const refreshApplications = async () => {
    const appsRes = await ApiClient.getApplications();
    if (appsRes && appsRes.success && appsRes.data) {
      setApplicants(appsRes.data);
    }
  };

  // AUTHENTICATION HANDLERS
  const handleLoginSuccess = async (loginData) => {
    setAuth({
      isAuthenticated: true,
      type: loginData.type,
      user: loginData.user
    });

    try {
      await ApiClient.demoLogin(loginData.type === 'student' ? 'student' : 'ministry_officer');
    } catch (e) {
      console.warn('Demo login API notification failed:', e);
    }

    if (loginData.type === 'student') {
      setSelectedApplicantId(loginData.user.id);
      showToast(`Welcome back, ${loginData.user.name}! Jan Parichay session authenticated.`);
      if (loginData.forceWalkthrough || loginData.user.id === 'MOTA-2026-NFST-0101' || loginData.user.tutorial_completed !== true) {
        setIsWalkthroughOpen(true);
      }
    } else {
      setRole('scrutiny');
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
    setPublicViewState('home');
    showToast('You have been securely signed out. Returned to National Portal.');
  };

  const handleRegisterApplicant = async (newApplicant) => {
    const res = await ApiClient.createApplication(newApplicant);
    if (res && res.success && res.data) {
      await refreshApplications();
      setSelectedApplicantId(res.data.id);
    } else {
      setApplicants(prev => [newApplicant, ...prev]);
      setSelectedApplicantId(newApplicant.id);
    }
    showToast(`Welcome ${newApplicant.name}! Your MoTA registration (${newApplicant.id}) is complete.`);
  };

  // APPLICATION WORKFLOW HANDLERS
  const handleApplicationSubmit = async (newApp) => {
    const res = await ApiClient.createApplication(newApp);
    if (res && res.success && res.data) {
      await ApiClient.submitApplication(res.data.id);
      await refreshApplications();
      setSelectedApplicantId(res.data.id);
    } else {
      setApplicants(prev => [newApp, ...prev]);
      setSelectedApplicantId(newApp.id);
    }
    setIsWizardOpen(false);
    showToast(`Application ${newApp.id} submitted! DigiLocker KYC & AI pre-check passed.`);
  };

  const handleApproveApplication = async (appId) => {
    const res = await ApiClient.approveApplication(appId);
    if (res && res.success) {
      await refreshApplications();
    } else {
      setApplicants(prev => prev.map(a => {
        if (a.id === appId) {
          return {
            ...a,
            status: 'APPROVED',
            stage: 5,
            progressPercent: 85,
            triageCategory: 'READY',
            aiVerdict: 'Level-1 & Level-2 Scrutiny Approved by MoTA Officer. Forwarded to Merit Committee.'
          };
        }
        return a;
      }));
    }
    showToast(`Application ${appId} approved and forwarded to Selection Committee!`);
  };

  const handleRaiseDeficiency = (appId, deficiencyData) => {
    setApplicants(prev => prev.map(a => {
      if (a.id === appId) {
        return {
          ...a,
          status: 'DEFICIENT',
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

  const handleRejectApplication = async (appId, rejectionDetails = {}) => {
    const res = await ApiClient.rejectApplication(appId, rejectionDetails);
    if (res && res.success) {
      await refreshApplications();
    } else {
      setApplicants(prev => prev.map(a => {
        if (a.id === appId) {
          return {
            ...a,
            status: 'REJECTED',
            aiVerdict: 'Application rejected during scrutiny due to non-fulfillment of statutory scheme criteria.'
          };
        }
        return a;
      }));
    }
    showToast(`Application ${appId} marked as Rejected.`);
  };

  const handleOverrideApplication = async (appId, overrideData) => {
    const res = await ApiClient.overrideApplication(appId, overrideData);
    if (res && res.success) {
      await refreshApplications();
      showToast(`Human Officer Override permanently recorded for ${appId}.`);
    } else {
      showToast(`Officer override recorded in tamper-evident ledger.`);
    }
  };

  const handleLaunchGoldenDemo = () => {
    const birsa = applicants.find(a => a.id === 'MOTA-2026-NFST-0101') || applicants[0];
    setAuth({
      isAuthenticated: true,
      type: 'student',
      user: {
        id: birsa.id,
        name: birsa.name,
        email: birsa.email,
        schemeId: birsa.schemeId,
        tribe: birsa.tribe,
        pvtg: birsa.pvtg
      }
    });
    setSelectedApplicantId(birsa.id);
    setIsWalkthroughOpen(true);
    showToast('⚡ Quick Demo Activated: Logged in as Birsa Hemrom (Case MOTA-2026-NFST-0101).');
  };

  const handleLaunchOfficerDemo = () => {
    handleSwitchWorkspace('admin');
  };

  const handleSwitchWorkspace = (targetType) => {
    if (targetType === 'admin') {
      setAuth({
        isAuthenticated: true,
        type: 'admin',
        user: {
          name: 'Dr. Rajeshwar Meena',
          roleLabel: 'MoTA Scrutiny Officer (Directorate)'
        }
      });
      setRole('scrutiny');
      showToast('Switched to Ministry Officer Scrutiny Desk (Dual-Pane Application X-Ray)');
    } else {
      const birsa = applicants.find(a => a.id === 'MOTA-2026-NFST-0101') || applicants[0];
      setAuth({
        isAuthenticated: true,
        type: 'student',
        user: {
          id: birsa.id,
          name: birsa.name,
          email: birsa.email,
          schemeId: birsa.schemeId,
          tribe: birsa.tribe,
          pvtg: birsa.pvtg
        }
      });
      setSelectedApplicantId(birsa.id);
      showToast('Switched to Birsa Hemrom (Scholar Desk)');
    }
  };

  const handleResolveDeficiency = async (appId, remarks) => {
    const res = await ApiClient.replaceDocument(appId, {
      documentType: 'Fresh Income Certificate (FY 2026-27)',
      fileName: 'Fresh_Income_Certificate_FY2026_27_SDO_Ranchi.pdf',
      remarks
    });

    if (res && res.success && res.data?.application) {
      await refreshApplications();
      showToast(`Deficiency rectified! Application ${appId} moved to READY queue for Officer Approval.`);
      return;
    }

    setApplicants(prev => prev.map(a => {
      if (a.id === appId) {
        const updatedDocs = (a.documents || []).map(doc => {
          if (doc.name.includes('Income')) {
            return {
              name: 'Fresh Income Certificate (FY 2026-27)',
              fileNumber: 'JH/RAN/INC/2026/01922',
              issuingAuthority: 'Sub-Divisional Officer (SDO), Ranchi',
              issueDate: '12-06-2026',
              status: 'VERIFIED',
              confidence: 98.4,
              extractedText: 'Annual Income from all sources is Rs. 4,80,000 for FY 2026-27. Digital Barcode verified.',
              tamperScore: 0.01
            };
          }
          return doc;
        });

        return {
          ...a,
          status: 'READY_FOR_REVIEW',
          stage: 3,
          progressPercent: 70,
          triageCategory: 'READY',
          deficiency: null,
          aiVerdict: 'Replacement Income Certificate (FY 2026-27) scanned successfully. All deficiencies resolved. Queued for Officer Scrutiny approval.',
          documents: updatedDocs
        };
      }
      return a;
    }));

    showToast(`Deficiency rectified! Application ${appId} moved to READY queue for Officer Approval.`);
  };

  const handleBulkSelect = async (selectedIds) => {
    const res = await ApiClient.bulkSelectApplications(selectedIds);
    if (res && res.success && res.data?.awardedApplications) {
      await refreshApplications();
      showToast(`Official National Selection Gazette Published! ${selectedIds.length} scholars awarded.`);
      return;
    }

    setApplicants(prev => prev.map(a => {
      if (selectedIds.includes(a.id)) {
        return {
          ...a,
          status: 'AWARDED',
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

  const handleUpdateScheme = async (updatedScheme) => {
    const res = await ApiClient.updateScheme(updatedScheme.id, updatedScheme);
    if (res && res.success && res.data) {
      const schemesRes = await ApiClient.getSchemes();
      if (schemesRes && schemesRes.success) setSchemes(schemesRes.data);
    } else {
      setSchemes(prev => prev.map(s => s.id === updatedScheme.id ? updatedScheme : s));
    }
    showToast(`Policy for ${updatedScheme.shortName} updated in production!`);
  };

  const activeDeficiencyCount = applicants.filter(a => a.status === 'Deficiency Pending' || a.status === 'DEFICIENT').length;

  // IF NOT AUTHENTICATED: RENDER CITIZEN PUBLIC HOME PAGE OR LOGIN/REGISTRATION GATEWAY
  if (!auth.isAuthenticated) {
    if (publicViewState === 'home') {
      return (
        <div className={`min-h-screen flex flex-col font-sans ${textSize === 'large' ? 'text-base' : 'text-sm'} ${contrast ? 'bg-black text-yellow-300' : 'bg-slate-50 text-slate-900'}`}>
          <PublicHomePage
            onOpenLogin={(type = 'student') => {
              setAuthPortalTab(type);
              setPublicViewState('login');
            }}
            onOpenRegister={() => {
              setAuthPortalTab('register');
              setPublicViewState('login');
            }}
            onLaunchGoldenDemo={handleLaunchGoldenDemo}
            onLaunchOfficerDemo={handleLaunchOfficerDemo}
            lang={lang}
            setLang={setLang}
            contrast={contrast}
            setContrast={setContrast}
            textSize={textSize}
            setTextSize={setTextSize}
            lowBandwidth={lowBandwidth}
            setLowBandwidth={setLowBandwidth}
          />
          {/* Multilingual AI Copilot available for citizens on home page */}
          <VidyaMitraChatbot />
        </div>
      );
    }

    return (
      <LoginPanel
        initialTab={authPortalTab}
        onBackToHome={() => setPublicViewState('home')}
        onLoginSuccess={handleLoginSuccess}
        onRegisterApplicant={handleRegisterApplicant}
      />
    );
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
        onSwitchWorkspace={handleSwitchWorkspace}
        onOpenTour={() => setIsWelcomeTourOpen(true)}
      />

      {/* Offline Demo Mode Banner if backend is not reachable */}
      {!isBackendOnline && (
        <div className="bg-amber-500 text-slate-950 font-bold text-xs py-1.5 px-4 text-center border-b border-amber-600 flex items-center justify-center space-x-2">
          <span>⚠️</span>
          <span>Demo mode: simulated results (Backend server unreachable at http://localhost:5001). Changes will persist in browser session.</span>
        </div>
      )}

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
                onSwitchToOfficer={() => handleSwitchWorkspace('admin')}
                lang={lang}
                lowBandwidth={lowBandwidth}
                setLowBandwidth={setLowBandwidth}
                onReplayTour={() => setIsWalkthroughOpen(true)}
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
                onOverrideApplication={handleOverrideApplication}
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

      {/* First-Time User Tutorial: Welcome Tour (3 Slides) */}
      <WelcomeTourModal
        isOpen={isWelcomeTourOpen}
        onClose={(dontShowAgain) => setIsWelcomeTourOpen(false)}
        lang={lang}
        setLang={setLang}
      />

      {/* First-Time User Tutorial: Interactive Guided Walkthrough */}
      <InteractiveWalkthrough
        isOpen={isWalkthroughOpen}
        onClose={() => setIsWalkthroughOpen(false)}
        user={auth?.user}
        lang={lang}
      />

      {/* Footer */}
      <Footer contrast={contrast} />
    </div>
  );
}

export default App;
