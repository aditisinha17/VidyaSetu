import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Award, 
  Layers, 
  FileCheck2, 
  HelpCircle,
  ExternalLink,
  Table,
  Building,
  ShieldCheck,
  BookOpen
} from 'lucide-react';
import { AI_TECH_MAPPING, MOTA_MANDATE_MAPPING } from '../data/mockData';

const GOVERNANCE_STAGES = [
  { step: 1, actor: 'Applicant Registration', title: 'Identity & Tribal Profile Onboarding', desc: 'ST candidates authenticate via MeriPehchaan (Jan Parichay) and DigiLocker single-sign on, establishing verified demographic identity.' },
  { step: 2, actor: 'AI Eligibility Gate', title: 'Statutory Rule Screening & Policy Audit', desc: 'VidyaSetu checks candidate profile against configured scheme guidelines (income ceiling, qualifying percentage, age ceiling, Central ST Gazette).' },
  { step: 3, actor: 'Digital Application', title: '5-Step Smart Wizard Submission', desc: 'Applicant enters academic admissions, research synopsis, and supervisor details, linking Aadhaar Payment Bridge (APB) bank accounts.' },
  { step: 4, actor: 'Document Intelligence', title: 'Automated OCR & Gazette Validation', desc: 'MoTA-Vision ST v2.4 extracts certificate number, issuing authority seal, and validates Scheduled Tribe status against Schedule VI gazette.' },
  { step: 5, actor: 'Deficiency Detection', title: 'Automated Anomaly & Lapse Flagging', desc: 'The system flags lapsed income certificates (>1 year old) or smudged seals before the application reaches the selection committee.' },
  { step: 6, actor: 'Notification Engine', title: 'Automated SMS / Email Notice Dispatch', desc: 'Student receives an automated deficiency alert with a statutory 15-day resolution window, retaining application seniority.' },
  { step: 7, actor: '1-Click Resubmission', title: 'AI Re-Scan & Pre-Clearance', desc: 'Applicant uploads the fresh certificate; AI confirms validity in real time (99.4% confidence) and returns it to the officer inbox.' },
  { step: 8, actor: 'Officer Scrutiny Desk', title: 'Dual-Pane Officer Workstation', desc: 'The designated Scrutiny Officer inspects side-by-side OCR bounding boxes, verifies issuing authority, and approves the record.' },
  { step: 9, actor: 'Merit Ranking Engine', title: 'Explainable AI Scoring & Quota Balancing', desc: 'Composite merit score calculated with PVTG (+10 pts) and ST Women (30% horizontal quota) affirmative bonuses.' },
  { step: 10, actor: 'Selection Committee', title: 'Statutory Decision & Gazette Notification', desc: 'The National Selection Committee confirms merit ranks and publishes the official National Selection Gazette.' },
  { step: 11, actor: 'Award Sanction', title: 'Digital Cryptographic Sanction Order', desc: 'The scholar receives an official Government of India Sanction Order signed by the Joint Secretary with verifiable QR code.' },
  { step: 12, actor: 'Fellowship Lifecycle', title: 'Post-Selection DBT & QPR Monitoring', desc: 'Platform tracks monthly stipends via PFMS, releases funds upon guide QPR endorsement, and manages contingency grants.' }
];

export function GovernanceManualModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('stages'); // 'stages', 'before_after', 'ai_matrix', 'mota_mandate'
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  if (!isOpen) return null;

  const currentStep = GOVERNANCE_STAGES[currentStepIndex];

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-300 max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-blue-950 font-black text-xs flex flex-col items-center justify-center shadow-md border border-amber-300">
              <span className="text-[9px]">MoTA</span>
              <span className="text-[7px]">GOI</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-base text-white">VidyaSetu (विद्यासेतु) — National Governance Framework</h3>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono">
                  Official MoTA Architecture
                </span>
              </div>
              <p className="text-xs text-blue-200">
                End-to-End AI-Enabled Management System • Ministry of Tribal Affairs, Government of India
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Subtabs */}
        <div className="flex space-x-2 px-6 pt-3 border-b border-slate-200 bg-slate-50 text-xs font-bold">
          {[
            { id: 'stages', label: '12-Stage National Scheme Lifecycle' },
            { id: 'before_after', label: 'Digital Transformation (Before vs After)' },
            { id: 'ai_matrix', label: 'AI Technology & Governance Matrix' },
            { id: 'mota_mandate', label: 'Ministry of Tribal Affairs Statutory Mandates' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`pb-2.5 px-2 border-b-2 transition ${
                activeTab === t.id ? 'border-blue-900 text-blue-900' : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* TAB 1: 12-Stage National Lifecycle */}
          {activeTab === 'stages' && (
            <div className="space-y-6">
              {/* Stage Highlight Box */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/50 border-2 border-blue-200 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black uppercase tracking-wider text-blue-900 bg-blue-100 px-3 py-1 rounded-full">
                    Stage {currentStep.step} of 12: {currentStep.actor}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-500">
                    Governance Pipeline
                  </span>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-slate-900 font-serif">{currentStep.title}</h4>
                  <p className="text-xs text-slate-700 mt-2 leading-relaxed">
                    {currentStep.desc}
                  </p>
                </div>

                <div className="pt-2 flex justify-between items-center">
                  <button
                    disabled={currentStepIndex === 0}
                    onClick={() => setCurrentStepIndex(currentStepIndex - 1)}
                    className="flex items-center space-x-1.5 px-4 py-2 border rounded-xl text-xs font-bold text-slate-700 hover:bg-white disabled:opacity-30"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Previous Stage</span>
                  </button>

                  <button
                    disabled={currentStepIndex === GOVERNANCE_STAGES.length - 1}
                    onClick={() => setCurrentStepIndex(currentStepIndex + 1)}
                    className="flex items-center space-x-1.5 px-5 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold shadow disabled:opacity-30"
                  >
                    <span>Next Stage</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Stage Pipeline Thumbnails */}
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 text-[11px]">
                {GOVERNANCE_STAGES.map((s, idx) => (
                  <button
                    key={s.step}
                    onClick={() => setCurrentStepIndex(idx)}
                    className={`p-2 rounded-xl border text-left transition ${
                      currentStepIndex === idx 
                        ? 'border-blue-900 bg-blue-900 text-white font-bold shadow-xs' 
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="font-mono text-[9px] opacity-75">Stage {s.step}</div>
                    <div className="line-clamp-1">{s.title}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Before vs After */}
          {activeTab === 'before_after' && (
            <div className="space-y-6">
              {/* Hero Callout */}
              <div className="p-4 bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl text-center shadow-md">
                <span className="text-xs uppercase font-bold text-amber-400 tracking-widest block mb-1">
                  National Administrative Reform
                </span>
                <p className="text-sm font-bold font-serif max-w-xl mx-auto">
                  "From fragmented manual processing to one intelligent, transparent, end-to-end ecosystem."
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                {/* Without VidyaSetu */}
                <div className="p-5 rounded-2xl bg-rose-50/50 border-2 border-rose-200 space-y-4">
                  <div className="flex items-center space-x-2 font-bold text-rose-900 text-sm">
                    <span className="w-3 h-3 rounded-full bg-rose-600"></span>
                    <span>MANUAL PAPER-BASED ADMINISTRATION (LEGACY)</span>
                  </div>

                  <div className="space-y-2 font-mono text-[11px] text-rose-950">
                    <div className="p-2 bg-white rounded border border-rose-200">1. Physical paper application forms submitted across desks</div>
                    <div className="p-2 bg-white rounded border border-rose-200">2. Manual file movement with high risk of document loss</div>
                    <div className="p-2 bg-white rounded border border-rose-200">3. Repeated postal correspondence for minor seal/format deficiencies</div>
                    <div className="p-2 bg-white rounded border border-rose-200">4. Prolonged processing delay (4 to 6 months per batch)</div>
                    <div className="p-2 bg-white rounded border border-rose-200">5. Manual merit compilation lacking mathematical audit trails</div>
                    <div className="p-2 bg-white rounded border border-rose-200">6. Disbursal delays due to unverified paper bank accounts</div>
                  </div>

                  <div className="pt-2 text-rose-800 font-bold">
                    Average Processing Time: ~124 Days • High Backlog & Redundancy
                  </div>
                </div>

                {/* With VidyaSetu */}
                <div className="p-5 rounded-2xl bg-emerald-50/50 border-2 border-emerald-300 space-y-4">
                  <div className="flex items-center space-x-2 font-bold text-emerald-900 text-sm">
                    <span className="w-3 h-3 rounded-full bg-emerald-600"></span>
                    <span>VIDYASETU AI-POWERED GOVERNANCE (MODERN)</span>
                  </div>

                  <div className="space-y-2 font-mono text-[11px] text-emerald-950">
                    <div className="p-2 bg-white rounded border border-emerald-200">1. DigiLocker & Jan Parichay single-click verified e-KYC</div>
                    <div className="p-2 bg-white rounded border border-emerald-200">2. Real-time OCR document intelligence & Central ST Gazette lookup</div>
                    <div className="p-2 bg-white rounded border border-emerald-200">3. Instant deficiency detection with statutory 15-day rectification window</div>
                    <div className="p-2 bg-white rounded border border-emerald-200">4. Dual-Pane Scrutiny Workstation with human-in-the-loop audit oversight</div>
                    <div className="p-2 bg-white rounded border border-emerald-200">5. Explainable AI composite merit formula (100% RTI compliant)</div>
                    <div className="p-2 bg-white rounded border border-emerald-200">6. Direct Benefit Transfer (DBT) via NPCI Aadhaar Payment Bridge</div>
                  </div>

                  <div className="pt-2 text-emerald-800 font-bold">
                    Average Processing Time: ~14 Days (88% Reduction) • 100% Aadhaar Seeded
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Where is AI Used? */}
          {activeTab === 'ai_matrix' && (
            <div className="space-y-4 text-xs">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-slate-900 uppercase tracking-wide">
                  Where AI is Employed in the VidyaSetu Architecture
                </h4>
                <span className="text-[11px] text-slate-500">Legal, Auditable, and Defensible AI Stack</span>
              </div>

              <div className="border border-slate-200 rounded-2xl overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Functional Module</th>
                      <th className="p-3">AI / Technology Stack</th>
                      <th className="p-3">Governance Purpose & Impact</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-sans">
                    {AI_TECH_MAPPING.map((m, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-blue-950">{m.module}</td>
                        <td className="p-3 font-mono text-[11px] text-purple-800 font-semibold">{m.tech}</td>
                        <td className="p-3 text-slate-600">{m.purpose}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: MoTA Mandates */}
          {activeTab === 'mota_mandate' && (
            <div className="space-y-4 text-xs">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-slate-900 uppercase tracking-wide">
                  Ministry of Tribal Affairs Statutory Mandates Traceability
                </h4>
                <span className="text-[11px] text-emerald-700 font-bold">✓ 100% Compliance Achieved</span>
              </div>

              <div className="border border-slate-200 rounded-2xl overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Statutory Ministry Mandate</th>
                      <th className="p-3">VidyaSetu Platform Implementation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-sans">
                    {MOTA_MANDATE_MAPPING.map((s, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-800">{s.motaMandate}</td>
                        <td className="p-3 text-blue-900 font-semibold">{s.vidyaSetuFeature}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
          >
            Close Framework Manual
          </button>
        </div>
      </div>
    </div>
  );
}
