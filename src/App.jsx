import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { DocumentViewerModal } from './components/DocumentViewerModal';
import { AwardLetterModal } from './components/AwardLetterModal';
import { VidyaMitraChatbot } from './components/VidyaMitraChatbot';

// Portals
import { ApplicantDashboard } from './portals/ApplicantPortal/ApplicantDashboard';
import { ApplicationWizard } from './portals/ApplicantPortal/ApplicationWizard';
import { OfficerScrutinyDesk } from './portals/AdminPortal/OfficerScrutinyDesk';
import { MeritRankingEngine } from './portals/AdminPortal/MeritRankingEngine';
import { PostSelectionDBTHub } from './portals/AdminPortal/PostSelectionDBTHub';
import { SchemeConfigStudio } from './portals/AdminPortal/SchemeConfigStudio';
import { NationalAnalytics } from './portals/AdminPortal/NationalAnalytics';

// Initial Mock Data
import { INITIAL_APPLICANTS, INITIAL_SCHEMES } from './data/mockData';

export function App() {
  const [currentRole, setRole] = useState('applicant'); // 'applicant', 'scrutiny', 'merit', 'dbt', 'config', 'analytics'
  const [lang, setLang] = useState('en');
  const [contrast, setContrast] = useState(false);
  const [textSize, setTextSize] = useState('normal');

  // Core application state
  const [applicants, setApplicants] = useState(INITIAL_APPLICANTS);
  const [schemes, setSchemes] = useState(INITIAL_SCHEMES);
  const [selectedApplicantId, setSelectedApplicantId] = useState(INITIAL_APPLICANTS[0].id);

  // Wizard state
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  // Modals state
  const [activeDocView, setActiveDocView] = useState(null); // { doc, applicant }
  const [awardLetterApp, setAwardLetterApp] = useState(null);

  // Success toast/banner
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // HANDLERS
  const handleApplicationSubmit = (newApp) => {
    setApplicants(prev => [newApp, ...prev]);
    setSelectedApplicantId(newApp.id);
    setIsWizardOpen(false);
    showToast(`Application ${newApp.id} submitted successfully to MoTA! AI pre-verification passed.`);
  };

  const handleApproveApplication = (appId) => {
    setApplicants(prev => prev.map(a => {
      if (a.id === appId) {
        return {
          ...a,
          status: 'Selection Committee Review',
          stage: 4,
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
          fellowshipDetails: a.fellowshipDetails || {
            sanctionNumber: `MoTA/${a.schemeId}/2026/AWARD-${a.id.split('-').pop()}`,
            monthlyStipend: a.schemeId === 'NOS' ? 110000 : 37000,
            annualContingency: 20500,
            bankAccount: 'State Bank of India (Aadhaar Seeded)',
            accountNoMasked: 'SBIN0000166 - ***8192',
            pfmsBatchId: 'PFMS-MOTA-2026-AUTOBATCH',
            disbursementHistory: [
              { month: 'First Month Sanction', amount: a.schemeId === 'NOS' ? 110000 : 37000, status: 'Processing DBT', utr: 'Pending RBI clearance' }
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

  return (
    <div className={`min-h-screen flex flex-col font-sans ${textSize === 'large' ? 'text-base' : 'text-sm'} ${contrast ? 'bg-black text-yellow-300' : 'bg-slate-50 text-slate-900'}`}>
      {/* Header */}
      <Header
        currentRole={currentRole}
        setRole={setRole}
        lang={lang}
        setLang={setLang}
        contrast={contrast}
        setContrast={setContrast}
        textSize={textSize}
        setTextSize={setTextSize}
        deficiencyCount={activeDeficiencyCount}
        onOpenDeficiency={() => {
          setRole('applicant');
        }}
      />

      {/* Global Action Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center space-x-3 text-xs animate-in slide-in-from-top-4 duration-200">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></div>
          <span className="font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Main Content Area Based on Active Role */}
      <main className="flex-1">
        {isWizardOpen ? (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <ApplicationWizard
              schemes={schemes}
              onApplicationSubmit={handleApplicationSubmit}
              onCancel={() => setIsWizardOpen(false)}
            />
          </div>
        ) : (
          <>
            {currentRole === 'applicant' && (
              <ApplicantDashboard
                applicants={applicants}
                selectedApplicantId={selectedApplicantId}
                setSelectedApplicantId={setSelectedApplicantId}
                onStartNewApplication={() => setIsWizardOpen(true)}
                onViewDoc={(doc, app) => setActiveDocView({ doc, applicant: app })}
                onViewAwardLetter={(app) => setAwardLetterApp(app)}
                onResolveDeficiency={handleResolveDeficiency}
              />
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
                onTriggerDbtBatch={() => showToast('Monthly DBT Batch Executed via PFMS!')}
              />
            )}

            {currentRole === 'config' && (
              <SchemeConfigStudio
                schemes={schemes}
                onUpdateScheme={handleUpdateScheme}
              />
            )}

            {currentRole === 'analytics' && (
              <NationalAnalytics />
            )}
          </>
        )}
      </main>

      {/* AI Assistant Chatbot */}
      <VidyaMitraChatbot />

      {/* Document Viewer Modal */}
      {activeDocView && (
        <DocumentViewerModal
          doc={activeDocView.doc}
          applicant={activeDocView.applicant}
          onClose={() => setActiveDocView(null)}
        />
      )}

      {/* Official Award Letter Modal */}
      {awardLetterApp && (
        <AwardLetterModal
          applicant={awardLetterApp}
          onClose={() => setAwardLetterApp(null)}
        />
      )}

      {/* Footer */}
      <Footer contrast={contrast} />
    </div>
  );
}

export default App;
