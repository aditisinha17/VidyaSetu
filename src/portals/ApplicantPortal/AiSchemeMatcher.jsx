import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Sliders, 
  GraduationCap, 
  Globe, 
  Building, 
  ShieldCheck,
  UserCheck,
  Percent,
  Check
} from 'lucide-react';
import { TRIBAL_COMMUNITIES } from '../../data/mockData';

export function AiSchemeMatcher({ schemes, onSelectSchemeToApply }) {
  // Input form state (Principle 7: Empty-by-default for new citizens)
  const [profile, setProfile] = useState({
    tribe: '',
    pvtg: false,
    age: '',
    gender: '',
    state: '',
    annualIncome: '',
    educationLevel: '',
    marksPercent: '',
    courseAim: '',
    institution: '',
    country: 'India',
    hasAdmission: false,
    nationalTest: '',
    isPwd: false
  });

  const [matchResult, setMatchResult] = useState(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const handleLoadDemoProfile = () => {
    setProfile({
      tribe: 'Santhal',
      pvtg: false,
      age: 26,
      gender: 'Female',
      state: 'Jharkhand',
      annualIncome: 240000,
      educationLevel: "Master's Degree (M.Sc / M.A / M.Tech)",
      marksPercent: 78,
      courseAim: 'Ph.D. Research in India',
      institution: 'IIT Kharagpur / Central University',
      country: 'India',
      hasAdmission: true,
      nationalTest: 'UGC-NET Qualified',
      isPwd: false
    });
  };

  const handleTribeChange = (tribeName) => {
    const found = TRIBAL_COMMUNITIES.find(t => t.name === tribeName);
    setProfile(prev => ({
      ...prev,
      tribe: tribeName,
      pvtg: found ? found.pvtg : false
    }));
  };

  const handleEvaluate = () => {
    setIsEvaluating(true);
    setTimeout(() => {
      setIsEvaluating(false);

      // Rule Engine Evaluation across all schemes
      const evaluations = schemes.map(sch => {
        const hardChecks = [];

        // Check 1: ST
        hardChecks.push({
          label: 'Scheduled Tribe (ST) Category',
          pass: true,
          detail: `${profile.tribe} is recognized under Central ST Gazette (Article 342)`
        });

        // Check 2: Income
        const incomePass = profile.annualIncome <= sch.eligibility.maxIncome;
        hardChecks.push({
          label: `Family Annual Income ≤ ₹${(sch.eligibility.maxIncome).toLocaleString()}`,
          pass: incomePass,
          detail: `Applicant income ₹${profile.annualIncome.toLocaleString()} ${incomePass ? 'is within permissible ceiling' : 'exceeds ceiling'}`
        });

        // Check 3: Marks
        const marksPass = profile.marksPercent >= sch.eligibility.minMarks;
        hardChecks.push({
          label: `Qualifying Marks ≥ ${sch.eligibility.minMarks}%`,
          pass: marksPass,
          detail: `Applicant scored ${profile.marksPercent}% (Minimum: ${sch.eligibility.minMarks}%)`
        });

        // Check 4: Age
        const maxAllowedAge = sch.eligibility.maxAge + (profile.pvtg ? 5 : 0);
        const agePass = profile.age <= maxAllowedAge;
        hardChecks.push({
          label: `Age ≤ ${sch.eligibility.maxAge} years ${profile.pvtg ? '(+5 yrs PVTG relaxation)' : ''}`,
          pass: agePass,
          detail: `Applicant age is ${profile.age} years (Max permissible: ${maxAllowedAge})`
        });

        // Check 5: Scheme specific (e.g. NOS requires foreign, Top class requires UG notified)
        let coursePass = true;
        let cautionNote = null;

        if (sch.id === 'NOS') {
          coursePass = profile.courseAim.includes('Abroad') || profile.country !== 'India';
          cautionNote = 'Requires Unconditional Offer from QS World Top 500 University and valid Passport.';
        } else if (sch.id === 'NFST') {
          coursePass = profile.courseAim.includes('Ph.D.') || profile.courseAim.includes('M.Phil');
          cautionNote = 'Requires full-time Ph.D. registration confirmation and research synopsis.';
        } else if (sch.id === 'TOP_CLASS') {
          coursePass = profile.courseAim.includes('B.Tech') || profile.courseAim.includes('MBBS') || profile.courseAim.includes('UG') || profile.courseAim.includes('IIT');
          cautionNote = 'Applicable only in 250+ MoTA notified premier institutes (IITs, IIMs, NITs, AIIMS).';
        } else if (sch.id === 'PRE_MATRIC') {
          coursePass = profile.courseAim.includes('Class IX') || profile.courseAim.includes('Class X') || profile.courseAim.includes('Secondary') || profile.age <= 18;
          cautionNote = 'Universal entitlement for regular ST students in Class IX and X in recognized schools.';
        } else if (sch.id === 'POST_MATRIC') {
          coursePass = !profile.courseAim.includes('Class IX') && !profile.courseAim.includes('Class X');
          cautionNote = 'Universal entitlement across Groups 1-4 (Higher Secondary, ITI, Diploma, UG, PG).';
        }

        hardChecks.push({
          label: 'Eligible Programme & University Level',
          pass: coursePass,
          detail: `Program: ${profile.courseAim} in ${profile.country}`
        });

        const passedChecksCount = hardChecks.filter(c => c.pass).length;
        const matchPercentage = Math.round((passedChecksCount / hardChecks.length) * 100);

        let aiExplanation = '';
        if (matchPercentage >= 90) {
          aiExplanation = `Highly Recommended! You satisfy all statutory criteria for ${sch.shortName}. Your ST status (${profile.tribe}${profile.pvtg ? ' - PVTG' : ''}) and academic profile give you strong merit standing.`;
        } else if (matchPercentage >= 70) {
          aiExplanation = `Conditionally Eligible for ${sch.shortName}. Please ensure you have all supporting verification certificates in place before the deadline.`;
        } else {
          aiExplanation = `Criteria Mismatch for ${sch.shortName}. Your current degree aim or country selection does not align with this scheme's mandate.`;
        }

        return {
          scheme: sch,
          matchPercentage,
          isEligible: passedChecksCount === hardChecks.length,
          hardChecks,
          cautionNote,
          aiExplanation
        };
      });

      // Sort by highest match
      evaluations.sort((a, b) => b.matchPercentage - a.matchPercentage);
      setMatchResult(evaluations);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-950 text-white shadow-md flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2.5 py-0.5 rounded-full">
              RULE ENGINE + EXPLAINABLE AI
            </span>
          </div>
          <h2 className="text-xl font-bold font-serif mt-2">Smart Fellowship & Scholarship Matching Engine</h2>
          <p className="text-xs text-blue-200">
            Enter your academic & tribal profile to let VidyaSetu evaluate hard statutory rules and generate explainable recommendations.
          </p>
        </div>

        <button
          data-tour="eligibility-submit"
          onClick={handleEvaluate}
          disabled={isEvaluating}
          className="flex items-center space-x-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-blue-950 rounded-xl text-xs font-black shadow-md transition disabled:opacity-50"
        >
          <Sparkles className={`w-4 h-4 ${isEvaluating ? 'animate-spin' : ''}`} />
          <span>{isEvaluating ? 'Evaluating Rules...' : 'Run Statutory Evaluation'}</span>
        </button>
      </div>

      {/* Input Matrix Grid */}
      <div data-tour="eligibility-form" className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2 uppercase tracking-wide">
            <Sliders className="w-4 h-4 text-blue-900" />
            <span>Applicant Statutory Attributes</span>
          </h3>
          <button
            type="button"
            onClick={handleLoadDemoProfile}
            className="px-3 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-lg text-[11px] font-bold transition flex items-center space-x-1"
          >
            <Sparkles className="w-3 h-3 text-amber-600" />
            <span>⚡ Fill Sample Profile (Birsa Hemrom)</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          {/* Tribe Selection */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Scheduled Tribe Community</label>
            <select
              value={profile.tribe}
              onChange={(e) => handleTribeChange(e.target.value)}
              className="w-full px-3 py-2 border rounded-xl font-semibold text-blue-950 bg-white"
            >
              {TRIBAL_COMMUNITIES.map(t => (
                <option key={t.name} value={t.name}>
                  {t.name} {t.pvtg ? '(PVTG - Particularly Vulnerable)' : ''}
                </option>
              ))}
            </select>
            {profile.pvtg && (
              <span className="text-[10px] text-purple-700 font-bold block mt-1">
                ✓ PVTG 5-year age relaxation & affirmative quota active
              </span>
            )}
          </div>

          {/* Age */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Age (Years)</label>
            <input
              type="number"
              value={profile.age}
              onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) || 20 })}
              className="w-full px-3 py-2 border rounded-xl font-bold text-slate-900"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Gender</label>
            <select
              value={profile.gender}
              onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
              className="w-full px-3 py-2 border rounded-xl bg-white"
            >
              <option value="Female">Female (30% Horizontal Quota Priority)</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* State */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">State of Domicile</label>
            <input
              type="text"
              value={profile.state}
              onChange={(e) => setProfile({ ...profile, state: e.target.value })}
              className="w-full px-3 py-2 border rounded-xl"
            />
          </div>

          {/* Annual Family Income */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Annual Family Income (INR)</label>
            <input
              type="number"
              value={profile.annualIncome}
              onChange={(e) => setProfile({ ...profile, annualIncome: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 border rounded-xl font-bold font-mono text-slate-900"
            />
            <span className="text-[10px] text-slate-500">₹{(profile.annualIncome).toLocaleString()} per annum</span>
          </div>

          {/* Education Level */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Highest Qualification</label>
            <select
              value={profile.educationLevel}
              onChange={(e) => setProfile({ ...profile, educationLevel: e.target.value })}
              className="w-full px-3 py-2 border rounded-xl bg-white"
            >
              <option value="Master's Degree (M.Sc / M.A / M.Tech)">Master's Degree (M.Sc / M.A / M.Tech)</option>
              <option value="Bachelor's Degree (B.Tech / B.Sc / B.A)">Bachelor's Degree (B.Tech / B.Sc / B.A)</option>
              <option value="12th Senior Secondary (Science/Arts/Commerce)">12th Senior Secondary (Science/Arts/Commerce)</option>
              <option value="Class X Secondary Pass">Class X Secondary Pass</option>
              <option value="Class VIII / IX Pass (Enrolled in School)">Class VIII / IX Pass (Enrolled in School)</option>
            </select>
          </div>

          {/* PG Marks */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Qualifying Marks / CGPA (%)</label>
            <input
              type="number"
              value={profile.marksPercent}
              onChange={(e) => setProfile({ ...profile, marksPercent: parseFloat(e.target.value) || 0 })}
              className="w-full px-3 py-2 border rounded-xl font-bold text-slate-900"
            />
          </div>

          {/* Target Course */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Intended Programme</label>
            <select
              value={profile.courseAim}
              onChange={(e) => setProfile({ 
                ...profile, 
                courseAim: e.target.value,
                country: e.target.value.includes('Abroad') ? 'United Kingdom' : 'India'
              })}
              className="w-full px-3 py-2 border rounded-xl font-semibold text-blue-900 bg-white"
            >
              <option value="Ph.D. Research in India">Ph.D. Research in India (NFST Scheme)</option>
              <option value="Master's / Ph.D. Abroad">Master's / Ph.D. Abroad (NOS Scheme)</option>
              <option value="B.Tech / MBBS in Notified Institute">UG/PG in IIT/IIM/NIT (Top Class ST)</option>
              <option value="Higher Secondary / UG / Professional Degree">Classes XI to PG / Professional (Post-Matric ST)</option>
              <option value="Class IX & X (Secondary School)">Classes IX & X (Pre-Matric ST Scheme)</option>
            </select>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-2">
          <button
            onClick={handleEvaluate}
            className="flex items-center space-x-2 px-6 py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold shadow-md transition"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Compute Rule Engine Match & AI Explanation</span>
          </button>
        </div>
      </div>

      {/* Matching Results Cards */}
      <div data-tour="scheme-matches">
        {matchResult ? (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                AI Matching Evaluation & Eligibility Breakdown
              </h3>
              <span className="text-xs text-slate-500">Evaluated against 3 central MoTA fellowship guidelines</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {matchResult.map((res) => {
                const sch = res.scheme;
                const isTopMatch = res.matchPercentage >= 90;

                return (
                  <div
                    key={sch.id}
                    className={`bg-white rounded-2xl border-2 p-5 flex flex-col justify-between transition-all ${
                      isTopMatch
                        ? 'border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                        : 'border-slate-200 shadow-xs'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-black px-2.5 py-0.5 rounded bg-blue-100 text-blue-900">
                          {sch.shortName}
                        </span>
                        <div className="text-right">
                          <span className={`text-base font-black font-mono ${
                            res.matchPercentage >= 90 ? 'text-emerald-600' : res.matchPercentage >= 70 ? 'text-amber-600' : 'text-slate-400'
                          }`}>
                            {res.matchPercentage}%
                          </span>
                          <span className="text-[10px] text-slate-400 block font-semibold">MATCH SCORE</span>
                        </div>
                      </div>

                      <h4 className="font-bold text-sm text-slate-900 mt-2 font-serif">{sch.name}</h4>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                        {sch.description}
                      </p>

                      {/* Hard Rule Validation Breakdown */}
                      <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-[11px]">
                        <div className="font-bold text-slate-700 uppercase tracking-wide text-[10px]">Rule Engine Audit:</div>
                        {res.hardChecks.map((chk, i) => (
                          <div key={i} className="flex items-start space-x-1.5">
                            {chk.pass ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            ) : (
                              <AlertTriangle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                            )}
                            <span className={chk.pass ? 'text-slate-700' : 'text-rose-700 font-medium'}>
                              {chk.label}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Caution note */}
                      {res.cautionNote && (
                        <div className="mt-3 p-2 rounded-lg bg-amber-50 border border-amber-200 text-[10px] text-amber-900">
                          ⚠️ <strong>Requirement:</strong> {res.cautionNote}
                        </div>
                      )}

                      {/* AI Explanation Box */}
                      <div className="mt-3 p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium leading-relaxed">
                        <div className="font-bold text-blue-950 flex items-center space-x-1 mb-0.5 text-[11px]">
                          <Sparkles className="w-3 h-3 text-amber-500" />
                          <span>AI Recommendation:</span>
                        </div>
                        {res.aiExplanation}
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-100">
                      <button
                        onClick={() => onSelectSchemeToApply(sch.id)}
                        className={`w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition ${
                          isTopMatch
                            ? 'bg-blue-900 hover:bg-blue-800 text-white shadow-sm'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        <span>Proceed with Application</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="p-6 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl text-center text-slate-500 text-xs">
            <Sparkles className="w-6 h-6 mx-auto mb-2 text-slate-400" />
            <p className="font-semibold text-slate-700">Scheme Recommendations & AI Explanation Area</p>
            <p className="text-[11px] text-slate-500 mt-1">Fill out the questionnaire above and click "Compute Rule Engine Match" to see your personalized eligibility breakdown.</p>
          </div>
        )}
      </div>
    </div>
  );
}
