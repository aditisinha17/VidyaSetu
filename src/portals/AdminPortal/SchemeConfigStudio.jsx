import React, { useState } from 'react';
import { 
  SlidersHorizontal, 
  Plus, 
  Save, 
  Sparkles, 
  CheckCircle2, 
  FileText, 
  ShieldCheck, 
  HelpCircle,
  Play,
  RotateCcw,
  Sliders
} from 'lucide-react';

export function SchemeConfigStudio({ schemes, onUpdateScheme }) {
  const [selectedSchemeId, setSelectedSchemeId] = useState(schemes[0]?.id || 'NFST');
  const [activeTab, setActiveTab] = useState('rules'); // 'rules', 'documents', 'sandbox'
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Editable scheme state
  const currentScheme = schemes.find(s => s.id === selectedSchemeId) || schemes[0];
  const [formData, setFormData] = useState({ ...currentScheme });

  // Update when selected scheme changes
  const handleSelectScheme = (id) => {
    setSelectedSchemeId(id);
    const target = schemes.find(s => s.id === id);
    if (target) setFormData({ ...target });
    setSaveSuccess(false);
  };

  // Sandbox testing state
  const [sandboxIncome, setSandboxIncome] = useState(550000);
  const [sandboxMarks, setSandboxMarks] = useState(62);
  const [sandboxAge, setSandboxAge] = useState(28);
  const [sandboxPvtg, setSandboxPvtg] = useState(false);
  const [sandboxResult, setSandboxResult] = useState(null);

  const handleSave = () => {
    onUpdateScheme(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleRunSandbox = () => {
    const isIncomeOk = sandboxIncome <= formData.eligibility.maxIncome;
    const isMarksOk = sandboxMarks >= formData.eligibility.minMarks;
    const isAgeOk = sandboxAge <= (formData.eligibility.maxAge + (sandboxPvtg ? 5 : 0));

    const overallPass = isIncomeOk && isMarksOk && isAgeOk;

    setSandboxResult({
      passed: overallPass,
      checks: [
        { label: `Income ≤ ₹${formData.eligibility.maxIncome.toLocaleString()}`, pass: isIncomeOk, value: `₹${sandboxIncome.toLocaleString()}` },
        { label: `Academic Marks ≥ ${formData.eligibility.minMarks}%`, pass: isMarksOk, value: `${sandboxMarks}%` },
        { label: `Age ≤ ${formData.eligibility.maxAge} yrs (with ${sandboxPvtg ? '+5 yrs PVTG relaxation' : 'no relaxation'})`, pass: isAgeOk, value: `${sandboxAge} yrs` }
      ]
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Title */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-black text-slate-900 font-serif">Scheme Rule & Policy Configuration Studio</h1>
            <span className="text-xs bg-purple-100 text-purple-900 px-2.5 py-0.5 rounded-full font-bold border border-purple-200">
              No-Code Policy Engine
            </span>
          </div>
          <p className="text-xs text-slate-600">
            Define and reconfigure scheme eligibility, document requirements, and quotas without redeploying code
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold shadow-md transition"
          >
            <Save className="w-4 h-4 text-amber-300" />
            <span>Publish Policy Rules to Production</span>
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs flex items-center space-x-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="font-bold">
            Policy configuration saved and activated! AI scrutiny rules updated across all application intake queues.
          </span>
        </div>
      )}

      {/* Scheme Selector Pills */}
      <div className="flex space-x-2 overflow-x-auto pb-1">
        {schemes.map(sch => (
          <button
            key={sch.id}
            onClick={() => handleSelectScheme(sch.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${
              selectedSchemeId === sch.id
                ? 'bg-blue-900 text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span>{sch.shortName}</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
              selectedSchemeId === sch.id ? 'bg-blue-800 text-amber-200' : 'bg-slate-100 text-slate-500'
            }`}>
              {sch.totalSlots} Slots
            </span>
          </button>
        ))}
      </div>

      {/* Subtabs: Rules, Documents, Sandbox */}
      <div className="flex space-x-3 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('rules')}
          className={`pb-3 px-2 text-xs font-bold border-b-2 transition flex items-center space-x-1.5 ${
            activeTab === 'rules' ? 'border-blue-900 text-blue-900' : 'border-transparent text-slate-500'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Eligibility, Slots & Budget</span>
        </button>

        <button
          onClick={() => setActiveTab('documents')}
          className={`pb-3 px-2 text-xs font-bold border-b-2 transition flex items-center space-x-1.5 ${
            activeTab === 'documents' ? 'border-blue-900 text-blue-900' : 'border-transparent text-slate-500'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Document Checklist & OCR Requirements</span>
        </button>

        <button
          onClick={() => setActiveTab('sandbox')}
          className={`pb-3 px-2 text-xs font-bold border-b-2 transition flex items-center space-x-1.5 ${
            activeTab === 'sandbox' ? 'border-purple-700 text-purple-700' : 'border-transparent text-slate-500'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Live Policy Simulation Sandbox</span>
        </button>
      </div>

      {/* TAB 1: Eligibility, Slots & Budget */}
      {activeTab === 'rules' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Scheme Display Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Total Annual Slots</label>
              <input
                type="number"
                value={formData.totalSlots}
                onChange={(e) => setFormData({ ...formData, totalSlots: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-600 font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Annual Budget Allocation (₹ Crores)</label>
              <input
                type="number"
                step="0.1"
                value={formData.annualBudgetCr}
                onChange={(e) => setFormData({ ...formData, annualBudgetCr: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-600 font-bold text-blue-900"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Annual Family Income Ceiling (INR)</label>
              <input
                type="number"
                value={formData.eligibility.maxIncome}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  eligibility: { ...formData.eligibility, maxIncome: parseInt(e.target.value) } 
                })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-600 font-mono font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Minimum Qualifying Marks (%)</label>
              <input
                type="number"
                value={formData.eligibility.minMarks}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  eligibility: { ...formData.eligibility, minMarks: parseFloat(e.target.value) } 
                })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-600 font-mono font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Maximum Age Limit (Years)</label>
              <input
                type="number"
                value={formData.eligibility.maxAge}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  eligibility: { ...formData.eligibility, maxAge: parseInt(e.target.value) } 
                })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-600 font-mono font-bold"
              />
            </div>
          </div>

          {/* Quota Rules Section */}
          <div className="pt-4 border-t border-slate-200 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              Affirmative Action & Inclusion Quotas
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200">
                <label className="block font-bold text-purple-950 mb-1">PVTG Dedicated Priority Slots</label>
                <input
                  type="number"
                  value={formData.quotaRules.pvtgPrioritySlots}
                  onChange={(e) => setFormData({
                    ...formData,
                    quotaRules: { ...formData.quotaRules, pvtgPrioritySlots: parseInt(e.target.value) }
                  })}
                  className="w-full px-3 py-1.5 border rounded-lg bg-white font-bold text-purple-900"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200">
                <label className="block font-bold text-amber-950 mb-1">ST Female Horizontal Reservation (%)</label>
                <input
                  type="number"
                  value={formData.quotaRules.stFemaleHorizontal}
                  onChange={(e) => setFormData({
                    ...formData,
                    quotaRules: { ...formData.quotaRules, stFemaleHorizontal: parseInt(e.target.value) }
                  })}
                  className="w-full px-3 py-1.5 border rounded-lg bg-white font-bold text-amber-900"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200">
                <label className="block font-bold text-blue-950 mb-1">Divyangjan PwD Reservation (%)</label>
                <input
                  type="number"
                  value={formData.quotaRules.pwdReservation}
                  onChange={(e) => setFormData({
                    ...formData,
                    quotaRules: { ...formData.quotaRules, pwdReservation: parseInt(e.target.value) }
                  })}
                  className="w-full px-3 py-1.5 border rounded-lg bg-white font-bold text-blue-900"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Documents */}
      {activeTab === 'documents' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Configured Mandatory Verification Documents</h3>
              <p className="text-xs text-slate-500">Documents required for AI automated OCR scrutiny</p>
            </div>
          </div>

          <div className="space-y-2">
            {formData.requiredDocuments.map((doc, idx) => (
              <div key={idx} className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-3">
                  <FileText className="w-4 h-4 text-blue-900" />
                  <span className="font-semibold text-slate-800">{doc}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                    OCR Scan Required
                  </span>
                  <span className="text-[10px] bg-blue-100 text-blue-900 px-2 py-0.5 rounded font-bold">
                    Mandatory
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Policy Sandbox Simulator */}
      {activeTab === 'sandbox' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-purple-700" />
              <span>Simulate Applicant Verification Against Configured Rules</span>
            </h3>
            <p className="text-xs text-slate-500">
              Input hypothetical candidate attributes to test how the AI eligibility gate will classify them.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Family Income (INR)</label>
              <input
                type="number"
                value={sandboxIncome}
                onChange={(e) => setSandboxIncome(parseInt(e.target.value))}
                className="w-full px-3 py-2 border rounded-lg font-mono font-bold"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">PG Qualifying Marks (%)</label>
              <input
                type="number"
                value={sandboxMarks}
                onChange={(e) => setSandboxMarks(parseFloat(e.target.value))}
                className="w-full px-3 py-2 border rounded-lg font-mono font-bold"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Applicant Age (Years)</label>
              <input
                type="number"
                value={sandboxAge}
                onChange={(e) => setSandboxAge(parseInt(e.target.value))}
                className="w-full px-3 py-2 border rounded-lg font-mono font-bold"
              />
            </div>

            <div className="flex flex-col justify-end">
              <label className="flex items-center space-x-2 text-slate-700 font-semibold mb-2">
                <input
                  type="checkbox"
                  checked={sandboxPvtg}
                  onChange={(e) => setSandboxPvtg(e.target.checked)}
                  className="rounded text-purple-700"
                />
                <span>PVTG Group Candidate</span>
              </label>
            </div>
          </div>

          <div className="flex justify-start">
            <button
              onClick={handleRunSandbox}
              className="flex items-center space-x-2 px-5 py-2.5 bg-purple-700 hover:bg-purple-600 text-white rounded-xl text-xs font-bold shadow transition"
            >
              <Play className="w-4 h-4" />
              <span>Evaluate Eligibility Sandbox</span>
            </button>
          </div>

          {sandboxResult && (
            <div className={`p-4 rounded-xl border text-xs space-y-3 animate-in fade-in ${
              sandboxResult.passed ? 'bg-emerald-50 border-emerald-300 text-emerald-950' : 'bg-rose-50 border-rose-300 text-rose-950'
            }`}>
              <div className="flex items-center space-x-2 font-bold text-sm">
                {sandboxResult.passed ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <ShieldCheck className="w-5 h-5 text-rose-600" />}
                <span>
                  {sandboxResult.passed ? 'Candidate Is ELIGIBLE under current rules!' : 'Candidate is INELIGIBLE / Rejected by AI Gate'}
                </span>
              </div>

              <div className="space-y-1 font-mono text-[11px]">
                {sandboxResult.checks.map((chk, i) => (
                  <div key={i} className="flex justify-between py-1 border-b border-black/5">
                    <span>{chk.label} (Input: {chk.value})</span>
                    <strong className={chk.pass ? 'text-emerald-700' : 'text-rose-700'}>
                      {chk.pass ? '✓ PASS' : '✗ FAIL'}
                    </strong>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
