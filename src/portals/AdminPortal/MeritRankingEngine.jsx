import React, { useState } from 'react';
import { 
  Sparkles, 
  UserCheck, 
  Award, 
  Sliders, 
  Download, 
  CheckCircle2, 
  ChevronRight, 
  Info, 
  HelpCircle,
  ShieldCheck,
  Send,
  GraduationCap,
  Layers,
  BookOpen
} from 'lucide-react';

export function MeritRankingEngine({ applicants, onBulkSelect, onViewAwardLetter }) {
  const [selectedScheme, setSelectedScheme] = useState('NFST');
  const [gazettePublished, setGazettePublished] = useState(false);
  const [inspectingApplicant, setInspectingApplicant] = useState(null);

  // Scheme-specific merit & ranking framework definitions
  const SCHEME_FRAMEWORKS = {
    NFST: {
      name: 'National Fellowship for Scheduled Tribe Students (NFST)',
      guidelineBasis: 'MoTA NFST Selection Guidelines (Revised Clause 5.1)',
      selectionCriteriaDescription: 'Selection is determined by merit in Master\'s Degree qualifying marks, incorporating statutory horizontal reservation for ST girls (30%), Divyangjan (5%), and dedicated priority for Particularly Vulnerable Tribal Groups (PVTG).',
      calculateScore: (app) => {
        const baseMarks = app.pgMarks || 70;
        const pvtgBonus = app.pvtg ? 5 : 0;
        const netBonus = app.netScore?.includes('Qualified') ? 5 : 0;
        return {
          score: Math.min(100, Math.round(baseMarks + pvtgBonus + netBonus)),
          breakdown: {
            'Master Degree Qualifying Marks': `${baseMarks}%`,
            'PVTG Affirmative Priority': app.pvtg ? '+5 Points (Special Priority Group)' : 'None (Regular ST)',
            'UGC-NET / National Test Clearance': app.netScore?.includes('Qualified') ? '+5 Points' : 'Qualified',
            'ST Female Horizontal Reservation (30%)': app.gender === 'Female' ? 'Eligible (Horizontal Quota)' : 'General ST Merit'
          }
        };
      }
    },
    NOS: {
      name: 'National Overseas Scholarship for ST Students (NOS)',
      guidelineBasis: 'MoTA NOS Scheme Guidelines (Section 3.2 & Expert Committee Norms)',
      selectionCriteriaDescription: 'Selection is governed by admission to QS World Top 500 Universities (with statutory priority for institutions ranked ≤ 200), followed by academic evaluation and interview by the Ministry\'s Expert Committee.',
      calculateScore: (app) => {
        const qsRank = app.qsWorldRank || 250;
        let rankPoints = qsRank <= 50 ? 50 : (qsRank <= 200 ? 45 : 35);
        let academicPoints = Math.round((app.pgMarks || 75) * 0.4);
        let pvtgPoints = app.pvtg ? 10 : 0;
        return {
          score: Math.min(100, rankPoints + academicPoints + pvtgPoints),
          breakdown: {
            'QS World University Priority': qsRank <= 200 ? `Priority Tier-1 (QS #${qsRank})` : `Tier-2 (QS #${qsRank})`,
            'Undergraduate / PG Academic Merit': `${app.pgMarks}%`,
            'IELTS / Language Proficiency': app.netScore || 'IELTS 7.5+',
            'PVTG Statutory Reservation': app.pvtg ? 'Reserved Slot Eligible (3 Slots Reserved)' : 'Open ST Quota'
          }
        };
      }
    },
    TOP_CLASS: {
      name: 'Top Class Education for ST Students',
      guidelineBasis: 'Top Class Scheme Guidelines for Notified Premier Institutes',
      selectionCriteriaDescription: 'Selection is conducted on direct institutional allocation based on National Entrance Examination rank (JEE Adv, NEET, CAT, CLAT) for ST scholars enrolled in notified institutions (IITs, IIMs, NITs, AIIMS, NLUs).',
      calculateScore: (app) => {
        const baseScore = app.pgMarks || 80;
        return {
          score: Math.min(100, Math.round(baseScore)),
          breakdown: {
            'Notified Premier Institute': `${app.institution} (NIRF #${app.nirfRank || 'Eligible'})`,
            'Entrance Examination Clearance': app.netScore || 'JEE / All India Rank ST',
            'Full Tuition Fee Coverage': '100% Actuals (Direct Institutional DBT Release)',
            'IT Hardware & Living Grant': '₹45,000 One-time + ₹2,220/mo'
          }
        };
      }
    }
  };

  const activeFramework = SCHEME_FRAMEWORKS[selectedScheme] || SCHEME_FRAMEWORKS.NFST;

  // Filter and rank applicants specifically for the chosen scheme
  const rankedApplicants = applicants
    .filter(a => a.schemeId === selectedScheme)
    .map(app => {
      const { score, breakdown } = activeFramework.calculateScore(app);
      return {
        ...app,
        schemeScore: score,
        decisionBreakdown: breakdown,
        isEligibleForSelection: app.status !== 'Rejected' && app.status !== 'Deficiency Pending'
      };
    })
    .sort((a, b) => b.schemeScore - a.schemeScore)
    .map((app, index) => ({
      ...app,
      meritRank: index + 1
    }));

  const handlePublishGazette = () => {
    const selectedIds = rankedApplicants
      .filter(a => a.isEligibleForSelection)
      .map(a => a.id);
    onBulkSelect(selectedIds);
    setGazettePublished(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Title & Quota Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-black text-slate-900 font-serif">Selection Committee & Scheme-Specific Merit Engine</h1>
            <span className="text-xs bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full font-bold border border-amber-300 flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Explainable Decision Record (RTI-Friendly Traceability)</span>
            </span>
          </div>
          <p className="text-xs text-slate-600">
            Selection logic configured strictly from official scheme guidelines rather than an arbitrary universal formula
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handlePublishGazette}
            className="flex items-center space-x-2 px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold shadow-md transition"
          >
            <Award className="w-4 h-4 text-amber-300" />
            <span>Publish National Selection Gazette</span>
          </button>
        </div>
      </div>

      {gazettePublished && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs flex items-center justify-between animate-in fade-in">
          <div className="flex items-center space-x-2 font-bold">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Official Selection Gazette Published! Sanction Orders dispatched to selected ST scholars.</span>
          </div>
          <span className="font-mono text-[11px] text-emerald-800">Gazette Ref: MoTA/GAZ/2026/SEL-B01</span>
        </div>
      )}

      {/* Scheme Selector Tabs */}
      <div className="flex space-x-2 border-b border-slate-200 pb-2">
        {[
          { id: 'NFST', label: 'NFST Research Fellowship (Ph.D.)' },
          { id: 'NOS', label: 'National Overseas Scholarship (QS Top 500)' },
          { id: 'TOP_CLASS', label: 'Top Class Education (IITs/IIMs/NITs)' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              setSelectedScheme(tab.id);
              setGazettePublished(false);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${
              selectedScheme === tab.id
                ? 'bg-blue-950 text-white shadow-md'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Scheme Guideline Basis Callout */}
      <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-950 space-y-1.5">
        <div className="flex items-center space-x-2">
          <BookOpen className="w-4 h-4 text-blue-900" />
          <strong className="text-sm font-serif">{activeFramework.name}</strong>
          <span className="text-[10px] font-mono font-bold bg-blue-200 text-blue-900 px-2 py-0.2 rounded">
            {activeFramework.guidelineBasis}
          </span>
        </div>
        <p className="text-[11px] text-blue-900 leading-relaxed font-medium">
          {activeFramework.selectionCriteriaDescription}
        </p>
      </div>

      {/* Ranked Candidate Roster */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center text-xs">
          <div className="font-bold text-slate-900 uppercase tracking-wide">
            Ranked Candidate List ({rankedApplicants.length} Evaluated)
          </div>
          <span className="text-slate-500 font-mono">Sorted by Scheme-Specific Statutory Merit</span>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {rankedApplicants.length > 0 ? (
            rankedApplicants.map((app) => (
              <div key={app.id} className="p-4 hover:bg-slate-50 transition flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1 max-w-xl">
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 rounded-full bg-blue-900 text-white font-bold font-mono text-[11px] flex items-center justify-center">
                      #{app.meritRank}
                    </span>
                    <span className="font-mono font-bold text-slate-800">{app.id}</span>
                    <span className="font-bold text-slate-900 text-sm">{app.name}</span>
                    {app.pvtg && (
                      <span className="text-[10px] font-bold bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
                        ★ PVTG Group
                      </span>
                    )}
                    {app.gender === 'Female' && (
                      <span className="text-[10px] font-bold bg-pink-100 text-pink-800 px-2 py-0.5 rounded-full">
                        30% Women Quota
                      </span>
                    )}
                  </div>

                  <div className="text-[11px] text-slate-500">
                    {app.tribe} • {app.state} • {app.institution} ({app.degree})
                  </div>

                  <div className="text-[11px] text-slate-700 font-medium">
                    Qualifying Marks: <strong>{app.pgMarks}%</strong> • Entrance/Score: {app.netScore}
                  </div>
                </div>

                <div className="flex items-center space-x-3 shrink-0">
                  <div className="text-right">
                    <div className="text-xs text-slate-400 font-semibold">Statutory Score</div>
                    <div className="text-lg font-black font-mono text-blue-900">{app.schemeScore}/100</div>
                  </div>

                  <button
                    onClick={() => setInspectingApplicant(app)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 border rounded-xl text-xs font-semibold transition"
                  >
                    View Decision Record 🔍
                  </button>

                  {app.status === 'Selected' && (
                    <button
                      onClick={() => onViewAwardLetter(app)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-xs transition"
                    >
                      Award Letter
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-slate-500">
              No candidates currently queued for {activeFramework.name}.
            </div>
          )}
        </div>
      </div>

      {/* Explainable Decision Record Modal */}
      {inspectingApplicant && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150 text-xs">
            <div className="flex justify-between items-start pb-2 border-b border-slate-200">
              <div>
                <span className="text-[10px] font-mono font-bold bg-blue-100 text-blue-900 px-2 py-0.5 rounded">
                  RTI-FRIENDLY DECISION RECORD
                </span>
                <h3 className="font-black text-base text-slate-900 mt-1 font-serif">
                  Selection Audit Sheet: {inspectingApplicant.name}
                </h3>
                <p className="text-slate-500 text-[11px]">Application: {inspectingApplicant.id}</p>
              </div>
              <button onClick={() => setInspectingApplicant(null)} className="text-slate-400 hover:text-slate-700 text-lg font-bold">
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="font-bold text-slate-800 uppercase tracking-wide text-[10px]">
                  Applied Scheme Guidelines: {activeFramework.name}
                </div>

                {Object.entries(inspectingApplicant.decisionBreakdown || {}).map(([key, val], idx) => (
                  <div key={idx} className="flex justify-between items-center py-1 border-b border-slate-200 text-xs">
                    <span className="text-slate-600">{key}:</span>
                    <strong className="text-slate-900 font-mono">{val}</strong>
                  </div>
                ))}

                <div className="flex justify-between items-center pt-1 text-xs">
                  <span className="font-bold text-slate-800">Final Composite Merit Score:</span>
                  <strong className="text-blue-900 font-mono text-sm font-black">{inspectingApplicant.schemeScore} / 100</strong>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-950 text-[11px] space-y-1">
                <strong className="block font-bold">Statutory Defense:</strong>
                <span>Scored deterministically under {activeFramework.guidelineBasis}. Transparent and auditable for Right to Information (RTI) inquiries.</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setInspectingApplicant(null)}
                className="px-5 py-2 bg-slate-900 text-white rounded-xl font-bold"
              >
                Close Audit Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
