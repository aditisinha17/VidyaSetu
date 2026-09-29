import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  Upload, 
  Sparkles, 
  FileText, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Building, 
  User, 
  GraduationCap, 
  FileSearch,
  ScanLine
} from 'lucide-react';
import { TRIBAL_COMMUNITIES } from '../../data/mockData';

export function ApplicationWizard({ schemes, onApplicationSubmit, onCancel }) {
  const [step, setStep] = useState(1);
  const [selectedSchemeId, setSelectedSchemeId] = useState('NFST');

  // Form states (Principle 7: Empty-by-default for new citizens)
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    dob: '',
    phone: '',
    email: '',
    state: '',
    district: '',
    tribe: '',
    pvtg: false,
    annualIncome: '',
    aadhaarNo: '',
    bankAccountAadhaarSeeded: false,
    // Academic
    institution: '',
    degree: '',
    pgMarks: '',
    netScore: '',
    guideName: '',
    qsWorldRank: ''
  });

  // Uploaded documents state (starts empty)
  const [docUploads, setDocUploads] = useState({
    casteCert: { name: 'ST_Caste_Certificate_Art342.pdf', scanned: true, status: 'VERIFIED', confidence: 99.2, note: 'Tribe verified in Central ST Gazette / Article 342.' },
    incomeCert: { name: 'Income_Certificate_FY26.pdf', scanned: true, status: 'VERIFIED', confidence: 98.4, note: 'Annual family income validated within ceiling limit.' },
    admissionProof: { name: 'Admission_Offer_Letter.pdf', scanned: true, status: 'VERIFIED', confidence: 97.9, note: 'Institution recognition & degree enrollment verified.' },
    synopsis: { name: 'Research_Synopsis_Proposal.pdf', scanned: true, status: 'VERIFIED', confidence: 95.0, note: 'Compliant with UGC statutory doctoral research framework.' }
  });

  const handleLoadSampleData = () => {
    setFormData({
      name: 'Birsa Hemrom',
      gender: 'Male',
      dob: '1998-07-14',
      phone: '+91 94311 02847',
      email: 'birsa.hemrom@research.iitkgp.ac.in',
      state: 'Jharkhand',
      district: 'Ranchi',
      tribe: 'Santhal',
      pvtg: false,
      annualIncome: 420000,
      aadhaarNo: 'XXXX-XXXX-9912',
      bankAccountAadhaarSeeded: true,
      institution: 'Indian Institute of Technology (IIT), Kharagpur',
      degree: 'Ph.D. in Metallurgical & Materials Engineering',
      pgMarks: 78.5,
      netScore: 'UGC-NET Qualified (Roll: JH0410092)',
      guideName: 'Prof. Debabrata Pradhan',
      qsWorldRank: selectedSchemeId === 'NOS' ? 85 : ''
    });
  };

  const [isScanningDoc, setIsScanningDoc] = useState(false);
  const [aiPreCheckSummary, setAiPreCheckSummary] = useState({
    passed: true,
    message: 'All 4 mandatory documents passed AI Pre-Scrutiny with 98% average confidence score.'
  });

  const selectedScheme = schemes.find(s => s.id === selectedSchemeId) || schemes[0];

  const handleTribeChange = (e) => {
    const selectedTribeName = e.target.value;
    const found = TRIBAL_COMMUNITIES.find(t => t.name === selectedTribeName);
    setFormData(prev => ({
      ...prev,
      tribe: selectedTribeName,
      pvtg: found ? found.pvtg : false
    }));
  };

  const handleRunAiOcrScan = () => {
    setIsScanningDoc(true);
    setTimeout(() => {
      setIsScanningDoc(false);
      // Simulate successful AI check
      setAiPreCheckSummary({
        passed: true,
        message: 'AI Pre-Scrutiny Completed: 0 Deficiencies Found. Aadhaar phonetic match 99.1%. Income verified.'
      });
    }, 1200);
  };

  const handleSubmit = () => {
    const newApp = {
      id: `MOTA-2026-${selectedSchemeId}-${Math.floor(1000 + Math.random() * 9000)}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      gender: formData.gender,
      age: 26,
      dob: formData.dob,
      tribe: formData.tribe,
      pvtg: formData.pvtg,
      state: formData.state,
      district: formData.district,
      schemeId: selectedSchemeId,
      schemeName: selectedScheme.name,
      institution: formData.institution,
      nirfRank: selectedSchemeId === 'NFST' ? 2 : null,
      qsWorldRank: selectedSchemeId === 'NOS' ? 85 : null,
      degree: formData.degree,
      guideName: formData.guideName,
      pgMarks: parseFloat(formData.pgMarks),
      netScore: formData.netScore,
      annualIncome: parseInt(formData.annualIncome),
      submissionDate: new Date().toISOString().split('T')[0],
      status: 'Submitted',
      stage: 1,
      aiScore: 95,
      aiRiskLevel: 'LOW',
      aiVerdict: 'Application auto-screened by VidyaSetu AI. All eligibility criteria fulfilled. Ready for District & Ministry Scrutiny.',
      documents: [
        {
          name: 'ST Caste Certificate',
          fileNumber: `JH/DUM/2025/ST/${Math.floor(1000 + Math.random() * 9000)}`,
          issuingAuthority: 'Sub-Divisional Officer, Dumka',
          status: 'VERIFIED',
          confidence: 99.2,
          extractedText: `Certified that Ku. ${formData.name} belongs to ${formData.tribe} Community recognized as ST in ${formData.state}.`,
          tamperScore: 0.01
        },
        {
          name: 'Income Certificate',
          fileNumber: `INC/2026/${Math.floor(10000 + Math.random() * 90000)}`,
          issuingAuthority: 'Circle Officer, Dumka',
          status: 'VERIFIED',
          confidence: 98.4,
          extractedText: `Family annual income is ₹${parseInt(formData.annualIncome).toLocaleString()} for FY 2026-27.`,
          tamperScore: 0.0
        },
        {
          name: 'Institutional Admission Proof',
          fileNumber: `ADM/2026/PHD/${Math.floor(100 + Math.random() * 900)}`,
          issuingAuthority: formData.institution,
          status: 'VERIFIED',
          confidence: 97.9,
          extractedText: `Enrolled full-time for ${formData.degree}. Supervisor: ${formData.guideName}.`,
          tamperScore: 0.01
        }
      ],
      deficiency: null,
      fellowshipDetails: null
    };

    onApplicationSubmit(newApp);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden animate-in fade-in duration-200">
      {/* Wizard Header */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-amber-400/20 text-amber-300 rounded-xl border border-amber-400/30">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-serif">Smart Fellowship Application Wizard</h2>
              <p className="text-xs text-blue-200">AI-Assisted Verification & Digilocker Pre-Fill</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs bg-white/10 px-3 py-1 rounded-full text-blue-100 font-mono">
              Step {step} of 4
            </span>
          </div>
        </div>

        {/* Steps Progress Bar */}
        <div data-tour="wizard-stepper" className="grid grid-cols-4 gap-2 mt-6">
          {[
            { num: 1, label: 'Scheme Select' },
            { num: 2, label: 'Tribal Profile' },
            { num: 3, label: 'Academic & Inst.' },
            { num: 4, label: 'AI Document Scan', tourId: 'wizard-doc-slots' }
          ].map(s => (
            <div key={s.num} data-tour={s.tourId} className="text-center">
              <div className={`h-1.5 rounded-full transition-all ${step >= s.num ? 'bg-amber-400' : 'bg-blue-800'}`}></div>
              <span className={`text-[11px] mt-1.5 block font-medium ${step >= s.num ? 'text-amber-300 font-bold' : 'text-blue-300'}`}>
                {s.num}. {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Wizard Content Body */}
      <div data-tour="wizard-fields" className="p-6 sm:p-8">
        {/* STEP 1: Scheme Selection */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">Select Ministry of Tribal Affairs Fellowship Scheme</h3>
              <p className="text-xs text-slate-500">Choose the scheme that aligns with your educational programme.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {schemes.map(sch => (
                <div
                  key={sch.id}
                  onClick={() => setSelectedSchemeId(sch.id)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedSchemeId === sch.id
                      ? 'border-blue-900 bg-blue-50/50 shadow-md ring-2 ring-blue-900/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-black px-2 py-0.5 rounded bg-blue-100 text-blue-900">
                      {sch.shortName}
                    </span>
                    {selectedSchemeId === sch.id && (
                      <CheckCircle2 className="w-5 h-5 text-blue-900" />
                    )}
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 mt-2">{sch.name}</h4>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-3 leading-relaxed">
                    {sch.description}
                  </p>
                  <div className="mt-3 pt-3 border-t border-slate-200 text-[11px] text-slate-500 space-y-1">
                    <div>Slots: <strong className="text-slate-800">{typeof sch.totalSlots === 'number' ? `${sch.totalSlots} per year` : sch.totalSlots}</strong></div>
                    <div>Income Limit: <strong className="text-slate-800">≤ ₹{(sch.eligibility.maxIncome/100000).toFixed(1)} Lakhs</strong></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Scheme Eligibility Highlights */}
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
              <strong className="block font-bold mb-1">Key Eligibility for {selectedScheme.name}:</strong>
              <ul className="list-disc pl-5 space-y-1 text-slate-700">
                <li>Candidate must belong to a notified Scheduled Tribe (ST) of India under Article 342.</li>
                <li>Minimum {selectedScheme.eligibility.minMarks}% in qualifying examination.</li>
                <li>Family annual income from all sources must not exceed ₹{(selectedScheme.eligibility.maxIncome).toLocaleString()}.</li>
                {selectedSchemeId === 'NOS' && (
                  <li className="font-semibold text-blue-900">Must hold admission in QS World Top 500 accredited institution.</li>
                )}
              </ul>
            </div>
          </div>
        )}

        {/* STEP 2: Personal & Tribal Profile */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Personal & Tribal Identity</h3>
                <p className="text-xs text-slate-500">Provide details as registered in your official Caste & Aadhaar records.</p>
              </div>
              <button
                type="button"
                onClick={handleLoadSampleData}
                className="px-3 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-lg text-[11px] font-bold transition flex items-center space-x-1"
              >
                <Sparkles className="w-3 h-3 text-amber-600" />
                <span>⚡ Fill Sample Data</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Name (As per Aadhaar & 10th Certificate)</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-600 focus:outline-none"
                >
                  <option value="Female">Female (30% Horizontal Quota Priority)</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other / Transgender</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Scheduled Tribe Community</label>
                <select
                  value={formData.tribe}
                  onChange={handleTribeChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-600 focus:outline-none font-semibold text-blue-950"
                >
                  {TRIBAL_COMMUNITIES.map(t => (
                    <option key={t.name} value={t.name}>
                      {t.name} {t.pvtg ? '(PVTG - Particularly Vulnerable)' : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">State of Domicile</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">District</label>
                <input
                  type="text"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Annual Family Income (in INR)</label>
                <input
                  type="number"
                  value={formData.annualIncome}
                  onChange={(e) => setFormData({ ...formData, annualIncome: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Aadhaar Payment Bridge (APB) Status</label>
                <div className="p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span className="font-medium">Bank A/c Seeded with Aadhaar (NPCI Active)</span>
                </div>
              </div>
            </div>

            {formData.pvtg && (
              <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl flex items-center space-x-2 text-xs text-amber-900">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  <strong>Particularly Vulnerable Tribal Group (PVTG) Priority Applied:</strong> Special reservation & +10% merit weightage active.
                </span>
              </div>
            )}
          </div>
        )}

        {/* STEP 3: Academic & Institutional */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">Academic & Admission Details</h3>
              <p className="text-xs text-slate-500">Provide details regarding your enrolled research programme or overseas university.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 mb-1">Enrolled University / Institute</label>
                <input
                  type="text"
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Degree Programme</label>
                <input
                  type="text"
                  value={formData.degree}
                  onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Post-Graduation Marks (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.pgMarks}
                  onChange={(e) => setFormData({ ...formData, pgMarks: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">National Test / Entrance Qualification</label>
                <input
                  type="text"
                  value={formData.netScore}
                  onChange={(e) => setFormData({ ...formData, netScore: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Research Supervisor / Department Head</label>
                <input
                  type="text"
                  value={formData.guideName}
                  onChange={(e) => setFormData({ ...formData, guideName: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              {selectedSchemeId === 'NOS' && (
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">QS World University Rank</label>
                  <input
                    type="number"
                    value={formData.qsWorldRank || 85}
                    onChange={(e) => setFormData({ ...formData, qsWorldRank: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-600 focus:outline-none font-bold text-blue-900"
                  />
                  <span className="text-[10px] text-slate-500">Must be QS Top 500 to qualify for NOS.</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 4: AI Document Scan & Live Pre-Check */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-slate-900">AI Document Pre-Scrutiny Engine</h3>
                <p className="text-xs text-slate-500">
                  VidyaSetu AI scans your documents before submission to eliminate common scrutiny delays and deficiencies.
                </p>
              </div>

              <button
                onClick={handleRunAiOcrScan}
                disabled={isScanningDoc}
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold shadow transition disabled:opacity-50"
              >
                <ScanLine className={`w-4 h-4 ${isScanningDoc ? 'animate-spin' : ''}`} />
                <span>{isScanningDoc ? 'AI Scanning Documents...' : 'Re-Run AI Document Scan'}</span>
              </button>
            </div>

            {/* AI Scan Feedback Box */}
            <div className={`p-4 rounded-xl border text-xs ${aiPreCheckSummary.passed ? 'bg-emerald-50 border-emerald-300 text-emerald-950' : 'bg-amber-50 border-amber-300 text-amber-950'}`}>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-bold">Automated Pre-Submission Audit Result:</span>
              </div>
              <p className="mt-1 font-medium">{aiPreCheckSummary.message}</p>
            </div>

            {/* Document Checklist & Pre-Check Status */}
            <div data-tour="wizard-doc-slots" className="space-y-3">
              {Object.entries(docUploads).map(([key, doc]) => (
                <div key={key} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-blue-100 text-blue-900">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">{doc.name}</div>
                      <div className="text-[11px] text-slate-500">{doc.note}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="text-[11px] font-mono font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      OCR: {doc.confidence}%
                    </span>
                    <span className="text-xs font-bold text-emerald-700 flex items-center space-x-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Ready</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* DigiLocker Consent */}
            <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-xs text-blue-950 flex items-start space-x-2">
              <input type="checkbox" defaultChecked className="mt-0.5 rounded text-blue-900" />
              <span>
                I hereby grant consent under the Information Technology Act to Ministry of Tribal Affairs (MoTA) to verify my caste credentials, academic records, and Aadhaar-seeded account via Jan Parichay and DigiLocker.
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Wizard Footer Navigation */}
      <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
        {step > 1 ? (
          <button
            onClick={() => setStep(step - 1)}
            className="flex items-center space-x-1.5 px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous Step</span>
          </button>
        ) : (
          <button
            onClick={onCancel}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            Cancel Application
          </button>
        )}

        {step < 4 ? (
          <button
            onClick={() => setStep(step + 1)}
            className="flex items-center space-x-1.5 px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-bold shadow-md transition"
          >
            <span>Proceed to Step {step + 1}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            data-tour="wizard-submit"
            onClick={handleSubmit}
            className="flex items-center space-x-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold shadow-lg shadow-emerald-600/20 transition"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Submit Application to MoTA</span>
          </button>
        )}
      </div>
    </div>
  );
}
