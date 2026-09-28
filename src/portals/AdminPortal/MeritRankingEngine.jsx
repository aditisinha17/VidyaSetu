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
  GraduationCap
} from 'lucide-react';

export function MeritRankingEngine({ applicants, onBulkSelect, onViewAwardLetter }) {
  const [selectedScheme, setSelectedScheme] = useState('ALL');
  const [cutoffThreshold, setCutoffThreshold] = useState(70);
  const [pvtgBonusWeight, setPvtgBonusWeight] = useState(10);
  const [femaleBonusWeight, setFemaleBonusWeight] = useState(5);
  const [academicWeight, setAcademicWeight] = useState(50);
  const [inspectingApplicant, setInspectingApplicant] = useState(null);
  const [gazettePublished, setGazettePublished] = useState(false);

  // Compute Transparent Composite Merit Score for each applicant
  const rankedApplicants = applicants.map(app => {
    // Academic component (scaled to academicWeight)
    const academicScore = (app.pgMarks / 100) * academicWeight;

    // Institutional ranking bonus (max 20 points)
    let instScore = 12;
    if (app.qsWorldRank && app.qsWorldRank <= 50) instScore = 20;
    else if (app.qsWorldRank && app.qsWorldRank <= 200) instScore = 18;
    else if (app.nirfRank && app.nirfRank <= 10) instScore = 18;
    else if (app.nirfRank && app.nirfRank <= 50) instScore = 15;

    // NET / Entrance component (max 15 points)
    const entranceScore = app.netScore?.includes('Qualified') || app.netScore?.includes('IELTS') ? 14 : 10;

    // Social Equity Bonuses
    const pvtgBonus = app.pvtg ? pvtgBonusWeight : 0;
    const femaleBonus = app.gender === 'Female' ? femaleBonusWeight : 0;

    const totalMerit = Math.min(100, Math.round(academicScore + instScore + entranceScore + pvtgBonus + femaleBonus));

    const isEligibleForAward = totalMerit >= cutoffThreshold;

    return {
      ...app,
      meritBreakdown: {
        academicScore: academicScore.toFixed(1),
        instScore,
        entranceScore,
        pvtgBonus,
        femaleBonus,
        totalMerit
      },
      meritRank: 0,
      isEligibleForAward
    };
  })
  .filter(app => selectedScheme === 'ALL' || app.schemeId === selectedScheme)
  .sort((a, b) => b.meritBreakdown.totalMerit - a.meritBreakdown.totalMerit)
  .map((app, index) => ({
    ...app,
    meritRank: index + 1
  }));

  const handlePublishGazette = () => {
    const selectedIds = rankedApplicants
      .filter(a => a.isEligibleForAward)
      .map(a => a.id);
    onBulkSelect(selectedIds);
    setGazettePublished(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Title & Quota Optimization */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-black text-slate-900 font-serif">Selection Committee & Transparent Merit Engine</h1>
            <span className="text-xs bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full font-bold border border-amber-300 flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Explainable AI (RTI Compliant)</span>
            </span>
          </div>
          <p className="text-xs text-slate-600">
            Multi-Criteria Decision Analysis with PVTG affirmative action and gender equity weightage
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
            <span>Official MoTA Selection Gazette 2026 Published! Digital Award Letters Generated for qualified scholars.</span>
          </div>
          <span className="text-[11px] font-mono text-emerald-800">Gazette No: MoTA/SCHOLAR/2026/GZ-09</span>
        </div>
      )}

      {/* Interactive Simulation Controls */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-xs font-bold text-slate-900 flex items-center space-x-1.5 uppercase tracking-wide">
            <Sliders className="w-4 h-4 text-blue-900" />
            <span>Simulation Parameters & Quota Tuning</span>
          </div>

          <div className="flex space-x-2">
            {['ALL', 'NFST', 'NOS', 'TOP_CLASS'].map(sch => (
              <button
                key={sch}
                onClick={() => setSelectedScheme(sch)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                  selectedScheme === sch 
                    ? 'bg-blue-900 text-white shadow-xs' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {sch}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs pt-2">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex justify-between items-center mb-1">
              <span className="text-slate-600 font-medium">Cutoff Score:</span>
              <strong className="text-blue-900 font-mono">{cutoffThreshold}/100</strong>
            </div>
            <input
              type="range"
              min="50"
              max="95"
              value={cutoffThreshold}
              onChange={(e) => setCutoffThreshold(parseInt(e.target.value))}
              className="w-full cursor-pointer accent-blue-900"
            />
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex justify-between items-center mb-1">
              <span className="text-slate-600 font-medium">PVTG Bonus Weight:</span>
              <strong className="text-purple-700 font-mono">+{pvtgBonusWeight} pts</strong>
            </div>
            <input
              type="range"
              min="0"
              max="20"
              value={pvtgBonusWeight}
              onChange={(e) => setPvtgBonusWeight(parseInt(e.target.value))}
              className="w-full cursor-pointer accent-purple-700"
            />
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex justify-between items-center mb-1">
              <span className="text-slate-600 font-medium">ST Female Priority:</span>
              <strong className="text-amber-700 font-mono">+{femaleBonusWeight} pts</strong>
            </div>
            <input
              type="range"
              min="0"
              max="15"
              value={femaleBonusWeight}
              onChange={(e) => setFemaleBonusWeight(parseInt(e.target.value))}
              className="w-full cursor-pointer accent-amber-700"
            />
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex justify-between items-center mb-1">
              <span className="text-slate-600 font-medium">Academic Marks Weight:</span>
              <strong className="text-slate-900 font-mono">{academicWeight}%</strong>
            </div>
            <input
              type="range"
              min="30"
              max="70"
              value={academicWeight}
              onChange={(e) => setAcademicWeight(parseInt(e.target.value))}
              className="w-full cursor-pointer accent-slate-900"
            />
          </div>
        </div>
      </div>

      {/* Merit Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center text-xs">
          <div className="font-bold text-slate-800 uppercase tracking-wide">
            Ranked Candidate Register ({rankedApplicants.length} Evaluated)
          </div>
          <div className="text-slate-500">
            Showing cutoffs ≥ <strong className="text-blue-900">{cutoffThreshold}</strong>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 border-b border-slate-200">
              <tr>
                <th className="p-3 font-bold">Rank</th>
                <th className="p-3 font-bold">Applicant Details</th>
                <th className="p-3 font-bold">Scheme & Degree</th>
                <th className="p-3 font-bold">Tribe & Category</th>
                <th className="p-3 font-bold">Academic</th>
                <th className="p-3 font-bold">Equity Bonus</th>
                <th className="p-3 font-bold text-center">Composite Score</th>
                <th className="p-3 font-bold text-center">Selection Status</th>
                <th className="p-3 font-bold text-right">Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rankedApplicants.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50 transition">
                  <td className="p-3 font-black text-slate-900 font-mono text-sm">
                    #{app.meritRank}
                  </td>
                  <td className="p-3">
                    <div className="font-bold text-slate-900">{app.name}</div>
                    <div className="text-[11px] text-slate-500 font-mono">{app.id}</div>
                  </td>
                  <td className="p-3">
                    <div className="font-semibold text-blue-950">{app.schemeId}</div>
                    <div className="text-[11px] text-slate-500 line-clamp-1">{app.institution}</div>
                  </td>
                  <td className="p-3">
                    <div className="font-medium text-slate-800">{app.tribe} ({app.gender})</div>
                    {app.pvtg && (
                      <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-1.5 py-0.2 rounded border border-purple-200">
                        PVTG
                      </span>
                    )}
                  </td>
                  <td className="p-3 font-mono font-medium">
                    {app.pgMarks}% ({app.meritBreakdown.academicScore} pts)
                  </td>
                  <td className="p-3">
                    <div className="text-[11px] text-purple-700 font-semibold">
                      +{app.meritBreakdown.pvtgBonus + app.meritBreakdown.femaleBonus} pts
                    </div>
                  </td>
                  <td className="p-3 text-center">
                    <span className="px-2.5 py-1 rounded-full font-black font-mono text-sm bg-blue-100 text-blue-950">
                      {app.meritBreakdown.totalMerit}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      app.status === 'Selected' || app.isEligibleForAward
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {app.status === 'Selected' ? 'AWARD ISSUED' : app.isEligibleForAward ? 'QUALIFIED FOR SELECTION' : 'BELOW CUTOFF'}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => setInspectingApplicant(app)}
                      className="px-2.5 py-1 text-[11px] bg-slate-100 hover:bg-blue-100 hover:text-blue-900 rounded font-semibold transition"
                      title="Inspect Explainable AI formula"
                    >
                      Formula Breakdown
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Explainable AI Formula Breakdown Modal */}
      {inspectingApplicant && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-300 max-w-lg w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-sm text-slate-900">Explainable Merit Score Formula (RTI Audit)</h3>
              </div>
              <button onClick={() => setInspectingApplicant(null)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl">
              <div className="font-bold text-blue-950">{inspectingApplicant.name} (#{inspectingApplicant.meritRank})</div>
              <div className="text-[11px] text-blue-800">{inspectingApplicant.schemeName} • {inspectingApplicant.institution}</div>
            </div>

            {/* Formula Math Box */}
            <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono">
              <div className="flex justify-between text-slate-700">
                <span>1. Academic Marks ({academicWeight}% weight):</span>
                <strong>{inspectingApplicant.meritBreakdown.academicScore} pts</strong>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>2. Institute Tier / QS Rank ({inspectingApplicant.qsWorldRank ? `QS #${inspectingApplicant.qsWorldRank}` : 'NIRF'}):</span>
                <strong>+{inspectingApplicant.meritBreakdown.instScore} pts</strong>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>3. National Test / NET:</span>
                <strong>+{inspectingApplicant.meritBreakdown.entranceScore} pts</strong>
              </div>
              <div className="flex justify-between text-purple-700">
                <span>4. PVTG Affirmative Bonus ({inspectingApplicant.pvtg ? 'Eligible' : 'N/A'}):</span>
                <strong>+{inspectingApplicant.meritBreakdown.pvtgBonus} pts</strong>
              </div>
              <div className="flex justify-between text-amber-700">
                <span>5. ST Female Horizontal Bonus:</span>
                <strong>+{inspectingApplicant.meritBreakdown.femaleBonus} pts</strong>
              </div>
              <div className="border-t border-slate-300 pt-2 flex justify-between text-slate-900 font-bold text-sm">
                <span>Total Composite Score:</span>
                <span className="text-blue-900">{inspectingApplicant.meritBreakdown.totalMerit} / 100</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 italic">
              * This mathematical model has been validated in accordance with the Ministry of Tribal Affairs Selection Guidelines 2026 and UGC regulations.
            </p>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setInspectingApplicant(null)}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg font-bold"
              >
                Close Audit View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
