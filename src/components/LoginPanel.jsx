import React, { useState } from 'react';
import { 
  GraduationCap, 
  ShieldCheck, 
  Lock, 
  Smartphone, 
  Mail, 
  ArrowRight, 
  ArrowLeft,
  Sparkles, 
  CheckCircle2, 
  Building2, 
  UserCheck, 
  Key, 
  FileText,
  AlertCircle,
  Eye,
  EyeOff,
  RefreshCw,
  QrCode,
  UserPlus,
  Home
} from 'lucide-react';
import { INITIAL_APPLICANTS, TRIBAL_COMMUNITIES, INITIAL_SCHEMES } from '../data/mockData';

export function LoginPanel({ 
  onLoginSuccess, 
  onRegisterApplicant, 
  onBackToHome, 
  initialTab = 'student' 
}) {
  const [portalType, setPortalType] = useState(initialTab); // 'student' | 'register' | 'admin'

  React.useEffect(() => {
    if (initialTab) {
      setPortalType(initialTab);
    }
  }, [initialTab]);

  // Student Login Tab
  const [studentAuthMethod, setStudentAuthMethod] = useState('digilocker'); // 'digilocker' | 'otp' | 'aadhaar'
  const [mobileNo, setMobileNo] = useState('+91 94311 02931');
  const [aadhaarNo, setAadhaarNo] = useState('5421 8890 9912');
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState('784210');
  const [selectedDemoApplicant, setSelectedDemoApplicant] = useState(INITIAL_APPLICANTS[0].id);

  // New Student Registration Tab
  const [regName, setRegName] = useState('Rohan Marandi');
  const [regAadhaar, setRegAadhaar] = useState('6543 8921 4452');
  const [regMobile, setRegMobile] = useState('+91 97712 34567');
  const [regEmail, setRegEmail] = useState('rohan.marandi@univ.ac.in');
  const [regTribe, setRegTribe] = useState('Santhal');
  const [regState, setRegState] = useState('Jharkhand');
  const [regScheme, setRegScheme] = useState('NFST');
  const [regIncome, setRegIncome] = useState('280000');
  const [regPassword, setRegPassword] = useState('••••••••');
  const [regOtpVerified, setRegOtpVerified] = useState(true);

  // Admin Login Tab
  const [adminRole, setAdminRole] = useState('mota_central'); // 'mota_central' | 'institute' | 'district' | 'pfms_ddo' | 'superadmin'
  const [adminEmail, setAdminEmail] = useState('director.fellowship@tribal.gov.in');
  const [adminPassword, setAdminPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [admin2FA, setAdmin2FA] = useState('482910');

  // Handle Student Login
  const handleStudentLogin = (appId = selectedDemoApplicant) => {
    const applicant = INITIAL_APPLICANTS.find(a => a.id === appId) || INITIAL_APPLICANTS[0];
    onLoginSuccess({
      type: 'student',
      user: {
        id: applicant.id,
        name: applicant.name,
        email: applicant.email,
        phone: applicant.phone,
        tribe: applicant.tribe,
        pvtg: applicant.pvtg,
        state: applicant.state,
        schemeId: applicant.schemeId,
        applicantData: applicant
      }
    });
  };

  // Handle New Registration
  const handleCompleteRegistration = (e) => {
    e.preventDefault();
    const newAppId = `MOTA-2026-${regScheme}-${Math.floor(1000 + Math.random() * 9000)}`;
    const selectedTribeObj = TRIBAL_COMMUNITIES.find(t => t.name === regTribe);
    const isPvtg = selectedTribeObj?.pvtg || false;

    const newApplicant = {
      id: newAppId,
      name: regName,
      email: regEmail,
      phone: regMobile,
      gender: 'Male',
      age: 24,
      dob: '2002-04-12',
      tribe: regTribe,
      pvtg: isPvtg,
      state: regState,
      schemeId: regScheme,
      status: 'Submitted',
      currentStage: 2,
      appliedDate: new Date().toISOString().split('T')[0],
      qualification: 'M.Sc. Physics (First Class)',
      qualifyingMarks: 82.5,
      income: Number(regIncome),
      aadhaarSeeded: true,
      documents: [
        { name: 'ST Caste Certificate', type: 'caste', status: 'Verified', confidence: 99.1, docNumber: 'JH/ST/2026/8912', issueDate: '2024-05-10', gazetteMatched: true },
        { name: 'Income Certificate', type: 'income', status: 'Verified', confidence: 98.4, docNumber: 'REV/INC/2026/4102', issueDate: '2025-08-15', gazetteMatched: true },
        { name: 'Post-Graduation Degree', type: 'degree', status: 'Verified', confidence: 99.0, docNumber: 'PG/CERT/2025/119', issueDate: '2025-06-20', gazetteMatched: true },
        { name: 'Admission / Offer Letter', type: 'admission', status: 'Pending Review', confidence: 95.2, docNumber: 'ADM/2026/901', issueDate: '2026-01-10', gazetteMatched: true },
        { name: 'Research Synopsis', type: 'synopsis', status: 'Pending Review', confidence: 94.0, docNumber: 'SYN/PHYS/2026', issueDate: '2026-01-12', gazetteMatched: true },
        { name: 'Aadhaar Card (APB Seeded)', type: 'aadhaar', status: 'Verified', confidence: 99.8, docNumber: regAadhaar, issueDate: '2023-01-01', gazetteMatched: true }
      ],
      institution: regScheme === 'NOS' ? 'University of Oxford' : 'Central University of Jharkhand',
      supervisor: 'Prof. S. K. Mahato',
      proposedTopic: 'Advanced Quantum Materials & Condensed Matter Physics',
      bankDetails: {
        accountNo: '39482910482',
        ifsc: 'SBIN0001234',
        bankName: 'State Bank of India',
        apbSeeded: true
      },
      aiMatchScore: 92,
      meritScore: {
        composite: 84.5,
        rank: 18,
        breakdown: {
          marksScore: 41.25,
          tierScore: 18.0,
          testScore: 12.0,
          equityScore: isPvtg ? 15.0 : 5.0
        }
      },
      timeline: [
        { stage: 'Application Registered', date: new Date().toISOString().split('T')[0], status: 'completed' },
        { stage: 'AI Document Pre-Verification', date: new Date().toISOString().split('T')[0], status: 'in-progress' },
        { stage: 'Institute Verification', date: 'Pending', status: 'upcoming' },
        { stage: 'MoTA Central Scrutiny', date: 'Pending', status: 'upcoming' },
        { stage: 'Selection Committee Review', date: 'Pending', status: 'upcoming' },
        { stage: 'Award & DBT Active', date: 'Pending', status: 'upcoming' }
      ],
      stipendHistory: [],
      qprReports: []
    };

    if (onRegisterApplicant) {
      onRegisterApplicant(newApplicant);
    }

    onLoginSuccess({
      type: 'student',
      user: {
        id: newApplicant.id,
        name: newApplicant.name,
        email: newApplicant.email,
        phone: newApplicant.phone,
        tribe: newApplicant.tribe,
        pvtg: newApplicant.pvtg,
        state: newApplicant.state,
        schemeId: newApplicant.schemeId,
        applicantData: newApplicant
      }
    });
  };

  // Handle Admin Login
  const handleAdminLogin = (roleType = adminRole) => {
    let officerDetails = {
      name: 'Dr. Rajesh Kumar Murmu, IAS',
      designation: 'Joint Secretary (Scholarships & Fellowships)',
      department: 'Ministry of Tribal Affairs, New Delhi',
      email: 'director.fellowship@tribal.gov.in',
      role: 'mota_central',
      roleLabel: 'MoTA Central Scrutiny Director'
    };

    if (roleType === 'institute') {
      officerDetails = {
        name: 'Prof. A. K. Banerjee',
        designation: 'Registrar & Dean of Academic Affairs',
        department: 'IIT Kharagpur Academic Verification Cell',
        email: 'registrar@iitkgp.ac.in',
        role: 'institute',
        roleLabel: 'Institute Verification Officer'
      };
    } else if (roleType === 'district') {
      officerDetails = {
        name: 'Shri R. P. Singh, OAS',
        designation: 'District Welfare Officer (ST & SC)',
        department: 'Collectorate, Mayurbhanj, Odisha',
        email: 'dwo.mayurbhanj@odisha.gov.in',
        role: 'district',
        roleLabel: 'District / State Nodal Officer'
      };
    } else if (roleType === 'pfms_ddo') {
      officerDetails = {
        name: 'Smt. Preeti Sengupta, ICAS',
        designation: 'Drawing & Disbursing Officer (DDO - DBT)',
        department: 'PFMS Ministry Cell, Shastri Bhawan',
        email: 'ddo.pfms@tribal.gov.in',
        role: 'pfms_ddo',
        roleLabel: 'DDO & PFMS Disbursal Officer'
      };
    } else if (roleType === 'superadmin') {
      officerDetails = {
        name: 'Technical Director (NIC)',
        designation: 'Lead Systems Architect & Security Auditor',
        department: 'National Informatics Centre (NIC), MoTA Unit',
        email: 'admin.nic@tribal.gov.in',
        role: 'superadmin',
        roleLabel: 'System Administrator (NIC)'
      };
    }

    onLoginSuccess({
      type: 'admin',
      user: officerDetails
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between font-sans">
      {/* Top Tricolor Banner */}
      <div className="h-1.5 w-full bg-gradient-to-r from-orange-500 via-white to-green-600"></div>

      {/* Top Gov Header */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-900 to-indigo-950 text-white flex flex-col items-center justify-center shadow-md p-1 border-2 border-amber-400">
              <div className="text-[8px] font-serif font-black tracking-tighter text-amber-300 uppercase">सत्यमेव</div>
              <div className="text-[7px] font-serif font-black tracking-tighter text-amber-300 uppercase">जयते</div>
              <div className="w-3.5 h-0.5 bg-amber-400 my-0.5"></div>
              <div className="text-[6px] text-blue-200">MoTA</div>
            </div>

            <div>
              <div className="text-[10px] sm:text-xs font-semibold text-slate-600 uppercase tracking-wider">
                भारत सरकार | Government of India
              </div>
              <h1 className="text-sm sm:text-base font-black text-blue-950 font-serif leading-tight">
                Ministry of Tribal Affairs (जनजातीय कार्य मंत्रालय)
              </h1>
              <div className="text-[11px] text-orange-600 font-semibold">
                VidyaSetu (विद्यासेतु) • Unified Authentication Gateway
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {onBackToHome && (
              <button
                onClick={onBackToHome}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs border border-slate-300 transition flex items-center space-x-1.5 shadow-2xs"
              >
                <Home className="w-3.5 h-3.5 text-blue-900" />
                <span>Public Portal</span>
              </button>
            )}

            <div className="hidden md:flex items-center space-x-2 text-xs">
              <span className="flex items-center space-x-1.5 bg-emerald-50 text-emerald-800 border border-emerald-300 px-3 py-1 rounded-full font-semibold text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>e-Pramaan & DigiLocker SSO</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Login / Register Centerpiece */}
      <div className="flex-1 flex items-center justify-center p-4 py-8">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          {/* Interface Selector: 3 Clean Tabs */}
          <div className="grid grid-cols-3 bg-slate-100 border-b border-slate-200 text-xs font-bold">
            <button
              onClick={() => setPortalType('student')}
              className={`py-3.5 px-3 flex items-center justify-center space-x-1.5 transition text-center ${
                portalType === 'student'
                  ? 'bg-white text-blue-900 border-t-2 border-blue-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-blue-900 shrink-0" />
              <span>Student Login</span>
            </button>

            <button
              onClick={() => setPortalType('register')}
              className={`py-3.5 px-3 flex items-center justify-center space-x-1.5 transition text-center ${
                portalType === 'register'
                  ? 'bg-white text-emerald-800 border-t-2 border-emerald-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <UserPlus className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>New Registration</span>
            </button>

            <button
              onClick={() => setPortalType('admin')}
              className={`py-3.5 px-3 flex items-center justify-center space-x-1.5 transition text-center ${
                portalType === 'admin'
                  ? 'bg-white text-blue-900 border-t-2 border-blue-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-blue-900 shrink-0" />
              <span>Official Portal</span>
            </button>
          </div>

          {/* Form Content Area */}
          <div className="p-6 sm:p-8 space-y-6">

            {/* TAB 1: STUDENT LOGIN VIEW */}
            {portalType === 'student' && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 font-serif">Scheduled Tribe Applicant Login</h2>
                  <p className="text-xs text-slate-500">
                    Access your fellowship application, upload certificates, resolve deficiencies, and track DBT stipends.
                  </p>
                </div>

                {/* Authentication Method Selector */}
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {[
                    { id: 'digilocker', label: 'Jan Parichay / DigiLocker', icon: Key },
                    { id: 'otp', label: 'Mobile + OTP', icon: Smartphone },
                    { id: 'aadhaar', label: 'Aadhaar UIDAI', icon: UserCheck }
                  ].map(method => (
                    <button
                      key={method.id}
                      onClick={() => setStudentAuthMethod(method.id)}
                      className={`p-2.5 rounded-xl border text-center font-semibold transition ${
                        studentAuthMethod === method.id
                          ? 'bg-blue-50 border-blue-900 text-blue-900 shadow-2xs ring-1 ring-blue-900'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <method.icon className="w-4 h-4 mx-auto mb-1 text-slate-700" />
                      <span className="block text-[11px] leading-tight">{method.label}</span>
                    </button>
                  ))}
                </div>

                {/* Sub-form based on method */}
                {studentAuthMethod === 'digilocker' && (
                  <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-3 text-xs">
                    <div className="flex items-center space-x-2 font-bold text-blue-950">
                      <Key className="w-4 h-4 text-blue-800" />
                      <span>MeriPehchaan (National Single Sign-On)</span>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      Instant KYC verification: Pulls your digitally signed Scheduled Tribe Caste Certificate, Marks, and Domicile directly from DigiLocker repository.
                    </p>
                    <button
                      onClick={() => handleStudentLogin()}
                      className="w-full py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-bold shadow-md transition flex items-center justify-center space-x-2"
                    >
                      <span>Sign In with DigiLocker / Jan Parichay</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {studentAuthMethod === 'otp' && (
                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Registered Mobile Number</label>
                      <input
                        type="text"
                        value={mobileNo}
                        onChange={(e) => setMobileNo(e.target.value)}
                        className="w-full px-3 py-2 border rounded-xl font-mono text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-600"
                      />
                    </div>

                    {!otpSent ? (
                      <button
                        onClick={() => setOtpSent(true)}
                        className="w-full py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-bold shadow transition"
                      >
                        Generate One-Time Password (OTP)
                      </button>
                    ) : (
                      <div className="space-y-3 animate-in fade-in">
                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Enter 6-Digit OTP received on Mobile</label>
                          <input
                            type="text"
                            value={otpInput}
                            onChange={(e) => setOtpInput(e.target.value)}
                            className="w-full px-3 py-2 border rounded-xl font-mono text-center tracking-widest text-base font-bold text-blue-950"
                          />
                          <span className="text-[10px] text-emerald-700 mt-1 block">✓ OTP verified via NIC SMS gateway</span>
                        </div>
                        <button
                          onClick={() => handleStudentLogin()}
                          className="w-full py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-bold shadow transition flex items-center justify-center space-x-2"
                        >
                          <span>Verify OTP & Enter Student Portal</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {studentAuthMethod === 'aadhaar' && (
                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">12-Digit Aadhaar Number</label>
                      <input
                        type="text"
                        value={aadhaarNo}
                        onChange={(e) => setAadhaarNo(e.target.value)}
                        className="w-full px-3 py-2 border rounded-xl font-mono text-slate-800"
                      />
                    </div>
                    <button
                      onClick={() => handleStudentLogin()}
                      className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl font-bold shadow transition flex items-center justify-center space-x-2"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>Authenticate with Aadhaar e-KYC (NPCI Seeded)</span>
                    </button>
                  </div>
                )}

                {/* Quick Demonstration Student Profiles */}
                <div className="pt-4 border-t border-slate-200 space-y-2">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Quick Access Applicant Profiles (1-Click Sign In):</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                    <button
                      onClick={() => handleStudentLogin('MOTA-2026-NFST-0101')}
                      className="p-2 border rounded-lg bg-slate-50 hover:bg-blue-50 hover:border-blue-300 text-left transition"
                    >
                      <div className="font-bold text-slate-800">Birsa Hemrom</div>
                      <div className="text-[10px] text-slate-500">NFST IIT Kharagpur (Stage 4)</div>
                    </button>

                    <button
                      onClick={() => handleStudentLogin('MOTA-2026-NOS-0042')}
                      className="p-2 border rounded-lg bg-slate-50 hover:bg-blue-50 hover:border-blue-300 text-left transition"
                    >
                      <div className="font-bold text-emerald-800">Shanti Madkam</div>
                      <div className="text-[10px] text-slate-500">NOS Oxford Scholar (Awarded)</div>
                    </button>

                    <button
                      onClick={() => handleStudentLogin('MOTA-2026-NFST-0199')}
                      className="p-2 border rounded-lg bg-rose-50 border-rose-200 text-left hover:bg-rose-100 transition"
                    >
                      <div className="font-bold text-rose-800">Mangal S. Munda</div>
                      <div className="text-[10px] text-rose-600">Active Deficiency Case</div>
                    </button>
                  </div>
                </div>

                <div className="text-center pt-2">
                  <span className="text-xs text-slate-500">Don't have an application yet? </span>
                  <button
                    onClick={() => setPortalType('register')}
                    className="text-xs font-bold text-emerald-700 hover:underline"
                  >
                    Register as a New Student
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: NEW STUDENT REGISTRATION / SIGN-UP VIEW */}
            {portalType === 'register' && (
              <form onSubmit={handleCompleteRegistration} className="space-y-4 text-xs">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 font-serif">New ST Scholar Registration 2026-27</h2>
                  <p className="text-xs text-slate-500">
                    Create your permanent National MoTA Fellowship Account with Aadhaar e-KYC and DigiLocker integration.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Full Legal Name (as per Aadhaar)</label>
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      className="w-full px-3 py-2 border rounded-xl font-medium text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">12-Digit Aadhaar Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={regAadhaar}
                        onChange={(e) => setRegAadhaar(e.target.value)}
                        className="w-full px-3 py-2 border rounded-xl font-mono text-slate-900"
                      />
                      <span className="absolute right-2 top-2 text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                        ✓ NPCI Seeded
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Registered Mobile Number</label>
                    <div className="flex space-x-1">
                      <input
                        type="text"
                        required
                        value={regMobile}
                        onChange={(e) => setRegMobile(e.target.value)}
                        className="w-full px-3 py-2 border rounded-xl font-mono text-slate-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="w-full px-3 py-2 border rounded-xl font-mono text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Scheduled Tribe Community</label>
                    <select
                      value={regTribe}
                      onChange={(e) => setRegTribe(e.target.value)}
                      className="w-full px-3 py-2 border rounded-xl font-medium text-slate-900 bg-slate-50"
                    >
                      {TRIBAL_COMMUNITIES.map(tribe => (
                        <option key={tribe.name} value={tribe.name}>
                          {tribe.name} {tribe.pvtg ? '★ (PVTG Prioritized)' : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">State of Domicile</label>
                    <select
                      value={regState}
                      onChange={(e) => setRegState(e.target.value)}
                      className="w-full px-3 py-2 border rounded-xl font-medium text-slate-900 bg-slate-50"
                    >
                      {['Jharkhand', 'Odisha', 'Chhattisgarh', 'Madhya Pradesh', 'Rajasthan', 'Gujarat', 'Maharashtra', 'Assam', 'Telangana', 'Andhra Pradesh'].map(st => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Target Scheme to Apply</label>
                    <select
                      value={regScheme}
                      onChange={(e) => setRegScheme(e.target.value)}
                      className="w-full px-3 py-2 border rounded-xl font-bold text-blue-950 bg-slate-50"
                    >
                      <option value="NFST">NFST — Ph.D./M.Phil in India (₹42,000/mo)</option>
                      <option value="NOS">NOS — Masters/Ph.D. Abroad (QS Top 500)</option>
                      <option value="TOP_CLASS">Top Class Education (IIT/IIM/AIIMS/NIT)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Annual Family Income</label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-slate-500 font-bold">₹</span>
                      <input
                        type="number"
                        required
                        value={regIncome}
                        onChange={(e) => setRegIncome(e.target.value)}
                        className="w-full pl-7 pr-3 py-2 border rounded-xl font-mono text-slate-900"
                      />
                    </div>
                  </div>
                </div>

                {/* DigiLocker Auto-Sync Banner */}
                <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center space-x-2 text-[11px] text-emerald-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    Your ST Caste Certificate & Academic Records will auto-sync from DigiLocker upon submission.
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl font-bold shadow-md transition flex items-center justify-center space-x-2 text-xs"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Complete Registration & Open Scholar Workspace</span>
                </button>

                <div className="text-center pt-1">
                  <span className="text-xs text-slate-500">Already registered? </span>
                  <button
                    type="button"
                    onClick={() => setPortalType('student')}
                    className="text-xs font-bold text-blue-900 hover:underline"
                  >
                    Click to Sign In
                  </button>
                </div>
              </form>
            )}

            {/* TAB 3: ADMINISTRATOR LOGIN VIEW */}
            {portalType === 'admin' && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 font-serif">Ministry & Institutional Officer Login</h2>
                  <p className="text-xs text-slate-500">
                    Restricted official portal for Scheme Scrutiny, Merit Selection, PFMS DBT Disbursals, and Policy Configuration.
                  </p>
                </div>

                {/* Role Switcher */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Administrative Designation / Role</label>
                  <select
                    value={adminRole}
                    onChange={(e) => {
                      setAdminRole(e.target.value);
                      if (e.target.value === 'institute') setAdminEmail('registrar@iitkgp.ac.in');
                      else if (e.target.value === 'district') setAdminEmail('dwo.mayurbhanj@odisha.gov.in');
                      else if (e.target.value === 'pfms_ddo') setAdminEmail('ddo.pfms@tribal.gov.in');
                      else setAdminEmail('director.fellowship@tribal.gov.in');
                    }}
                    className="w-full px-3 py-2 border rounded-xl text-xs font-bold text-blue-950 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  >
                    <option value="mota_central">🛡️ MoTA Central Scrutiny Officer (Directorate, New Delhi)</option>
                    <option value="institute">🏫 Institute Verification Officer (IIT / University Registrar)</option>
                    <option value="district">🏛️ District / State Nodal Officer (District Welfare Officer)</option>
                    <option value="pfms_ddo">💳 Drawing & Disbursing Officer (PFMS / DBT Division)</option>
                    <option value="superadmin">👑 System Administrator / Security Auditor (NIC)</option>
                  </select>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); handleAdminLogin(adminRole); }} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Official Government Email (.gov.in / .ac.in)</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="email"
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 border rounded-xl font-mono text-slate-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">GovPass Password / e-Pramaan Token</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        className="w-full pl-9 pr-9 py-2 border rounded-xl font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-700"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Two-Factor Authentication (2FA Gov OTP)</label>
                    <input
                      type="text"
                      value={admin2FA}
                      onChange={(e) => setAdmin2FA(e.target.value)}
                      className="w-full px-3 py-2 border rounded-xl font-mono text-center font-bold tracking-widest text-blue-900 bg-slate-50"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-blue-950 hover:bg-blue-900 text-white rounded-xl font-bold shadow-md transition flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>Sign In to Ministry Governance Hub</span>
                  </button>
                </form>

                {/* Quick 1-Click Officer Demonstrations */}
                <div className="pt-3 border-t border-slate-200 space-y-2">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Quick Access Administrative Credentials (1-Click Login):</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <button
                      onClick={() => handleAdminLogin('mota_central')}
                      className="p-2 border rounded-lg bg-blue-50 border-blue-200 text-left hover:bg-blue-100 transition"
                    >
                      <div className="font-bold text-blue-950">MoTA Scrutiny Dir.</div>
                      <div className="text-[10px] text-blue-800">Scrutiny & Merit Engine</div>
                    </button>

                    <button
                      onClick={() => handleAdminLogin('pfms_ddo')}
                      className="p-2 border rounded-lg bg-emerald-50 border-emerald-200 text-left hover:bg-emerald-100 transition"
                    >
                      <div className="font-bold text-emerald-950">PFMS / DBT Officer</div>
                      <div className="text-[10px] text-emerald-800">Disbursal & Sanctions</div>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer info banner */}
      <div className="bg-white border-t border-slate-200 py-3 text-center text-xs text-slate-500">
        Ministry of Tribal Affairs, Government of India • National Informatics Centre (NIC) • Secured by e-Pramaan
      </div>
    </div>
  );
}
