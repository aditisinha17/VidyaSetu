import React, { useState } from 'react';
import { 
  Landmark, 
  FileCheck, 
  Calendar, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  Download, 
  DollarSign, 
  Plane, 
  BookOpen, 
  FileText,
  AlertCircle
} from 'lucide-react';

export function FellowshipLifecycle({ applicant, onViewAwardLetter }) {
  const [activeTab, setActiveTab] = useState('dbt'); // 'dbt', 'qpr', 'contingency'
  const [qprFile, setQprFile] = useState(null);
  const [qprSubmitted, setQprSubmitted] = useState(false);
  const [contingencyAmount, setContingencyAmount] = useState('15000');
  const [contingencyReason, setContingencyReason] = useState('Purchase of Specialized Tribal Ethnography Books and Field Work Travel in Bastar Forest Reserve');
  const [contingencySubmitted, setContingencySubmitted] = useState(false);

  if (!applicant || !applicant.fellowshipDetails) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 shadow-sm">
        <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
        <h3 className="text-base font-bold text-slate-900">Post-Selection Lifecycle Not Yet Active</h3>
        <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
          Fellowship management, DBT stipend tracking, and Quarterly Progress Report (QPR) submissions will activate upon official award notification from the Selection Committee.
        </p>
      </div>
    );
  }

  const f = applicant.fellowshipDetails;
  const isNos = applicant.schemeId === 'NOS';

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-950 text-white shadow-md flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2.5 py-0.5 rounded-full">
              SANCTIONED SCHOLAR
            </span>
            <span className="text-xs text-blue-200">
              Sanction Ref: {f.sanctionNumber}
            </span>
          </div>
          <h2 className="text-xl font-bold font-serif mt-2">{applicant.name} • {applicant.schemeName}</h2>
          <p className="text-xs text-blue-200">
            {applicant.institution} ({applicant.degree})
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => onViewAwardLetter(applicant)}
            className="flex items-center space-x-1.5 px-4 py-2 bg-amber-400 hover:bg-amber-300 text-blue-950 text-xs font-bold rounded-xl shadow transition"
          >
            <Download className="w-4 h-4" />
            <span>Download Award Order</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-slate-200">
        {[
          { id: 'dbt', label: 'DBT & Stipend Ledger', icon: Landmark },
          { id: 'qpr', label: 'Quarterly Progress Reports (QPR)', icon: FileCheck },
          { id: 'contingency', label: 'Contingency & Travel Claims', icon: isNos ? Plane : BookOpen }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2.5 text-xs font-bold border-b-2 transition ${
                activeTab === tab.id
                  ? 'border-blue-900 text-blue-900 bg-blue-50/50 rounded-t-lg'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: DBT & Stipend Ledger */}
      {activeTab === 'dbt' && (
        <div className="space-y-6">
          {/* Key Rates Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <div className="text-[11px] text-slate-500 font-semibold">Monthly Fellowship / Allowance</div>
              <div className="text-xl font-black text-blue-950 mt-1">
                {isNos ? `GBP 9,900 / yr (~₹${f.monthlyStipend.toLocaleString()}/mo)` : `₹${f.monthlyStipend.toLocaleString()}`}
              </div>
              <div className="text-[10px] text-emerald-700 mt-1 flex items-center space-x-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Credited directly via PFMS</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <div className="text-[11px] text-slate-500 font-semibold">Annual Contingency Grant</div>
              <div className="text-xl font-black text-slate-900 mt-1">
                ₹{f.annualContingency ? f.annualContingency.toLocaleString() : '20,500'}
              </div>
              <div className="text-[10px] text-slate-500 mt-1">For books, fieldwork & equipment</div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <div className="text-[11px] text-slate-500 font-semibold">Aadhaar Payment Bridge Account</div>
              <div className="text-sm font-bold text-slate-800 mt-1 font-mono">
                {f.bankAccount}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">{f.accountNoMasked}</div>
            </div>
          </div>

          {/* Disbursement Transaction History */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                Direct Benefit Transfer (DBT) Disbursal History
              </h3>
              <span className="text-[11px] text-slate-500 font-mono">Batch: {f.pfmsBatchId}</span>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {f.disbursementHistory.map((d, i) => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 transition">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800">
                      <Landmark className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">{d.month}</div>
                      <div className="text-[11px] text-slate-500 font-mono">UTR / Ref: {d.utr}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-bold text-sm text-slate-900">₹{d.amount.toLocaleString()}</div>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      d.status === 'Credited' || d.status.includes('Paid')
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-amber-100 text-amber-800 animate-pulse'
                    }`}>
                      {d.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Quarterly Progress Report */}
      {activeTab === 'qpr' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">Submit Quarterly Progress Report (QPR)</h3>
            <p className="text-xs text-slate-500">
              Timely submission and supervisor endorsement is mandatory for continuous release of fellowship stipends.
            </p>
          </div>

          {/* Past Submissions */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-700 uppercase">Past Report Records</div>
            {f.progressReports.map((r, idx) => (
              <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900">{r.quarter}</div>
                  <div className="text-[11px] text-slate-500">Submitted on: {r.submissionDate}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-[11px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                    {r.status}
                  </span>
                  <span className="text-[11px] font-bold text-blue-900">Grade: {r.grade}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Submission Form */}
          {!qprSubmitted ? (
            <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-200 space-y-4">
              <div className="text-xs font-bold text-blue-950">Upload Next Quarter Progress Report</div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Current Research Quarter</label>
                  <input type="text" readOnly value="Q2 (Oct-Dec 2026)" className="w-full px-3 py-2 border rounded-lg bg-white" />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Supervisor Digital Endorsement Status</label>
                  <input type="text" readOnly value="Endorsed & Signed by Prof. A. K. Banerjee" className="w-full px-3 py-2 border rounded-lg bg-emerald-50 text-emerald-800 font-medium" />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Key Research Milestones Accomplished</label>
                <textarea rows={3} placeholder="Field samples gathered from 14 tribal blocks in Jharkhand. Lab spectrum analysis completed..." className="w-full px-3 py-2 text-xs border rounded-lg bg-white" />
              </div>

              <div className="border border-dashed border-blue-300 rounded-xl p-4 text-center bg-white cursor-pointer relative">
                <input type="file" onChange={(e) => setQprFile(e.target.files?.[0] || { name: 'Q2_Progress_Report_Signed.pdf' })} className="absolute inset-0 opacity-0 cursor-pointer" />
                <Upload className="w-6 h-6 text-blue-900 mx-auto mb-1" />
                <span className="text-xs font-bold text-slate-800">{qprFile ? qprFile.name : 'Upload Signed QPR PDF'}</span>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setQprSubmitted(true)}
                  className="px-5 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-bold transition shadow"
                >
                  Submit QPR to MoTA Fellowship Desk
                </button>
              </div>
            </div>
          ) : (
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs flex items-center space-x-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <strong className="block font-bold">Quarterly Report Submitted Successfully!</strong>
                <span>Your Q2 report has been verified and registered. Next stipend release scheduled without hold.</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: Contingency Claim */}
      {activeTab === 'contingency' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">Claim Annual Contingency / Travel Allowance</h3>
            <p className="text-xs text-slate-500">
              Reimbursement for research monographs, field surveys, journal publications, and overseas air travel.
            </p>
          </div>

          {!contingencySubmitted ? (
            <div className="space-y-4 max-w-xl text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Claim Amount (INR)</label>
                <input
                  type="number"
                  value={contingencyAmount}
                  onChange={(e) => setContingencyAmount(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-600 font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Expenditure Justification / Utilization Details</label>
                <textarea
                  rows={3}
                  value={contingencyReason}
                  onChange={(e) => setContingencyReason(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div className="border border-dashed border-slate-300 rounded-xl p-4 text-center bg-slate-50">
                <Upload className="w-6 h-6 text-blue-900 mx-auto mb-1" />
                <span className="text-xs font-semibold text-slate-700">Attach Invoices / Receipts / Air Ticket Bills</span>
              </div>

              <button
                onClick={() => setContingencySubmitted(true)}
                className="px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold shadow transition"
              >
                Submit Contingency Claim
              </button>
            </div>
          ) : (
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs flex items-center space-x-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <strong className="block font-bold">Claim Registered in PFMS Pre-Audit Queue!</strong>
                <span>Amount ₹{parseInt(contingencyAmount).toLocaleString()} will be disbursed following DDO sanction.</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
