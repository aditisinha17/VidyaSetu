import React, { useState } from 'react';
import { 
  X, 
  HelpCircle, 
  AlertCircle, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  ShieldCheck,
  Building,
  UserCheck
} from 'lucide-react';
import { MOCK_GRIEVANCES } from '../data/mockData';

export function GrievanceManagementModal({ applicant, isAdminView = false, onClose }) {
  const [grievances, setGrievances] = useState(MOCK_GRIEVANCES);
  const [category, setCategory] = useState('Payment / Disbursement');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleLodgeGrievance = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    // AI Intent & Routing Classifier
    let aiCategory = 'Finance & DBT Division';
    let aiPriority = 'MEDIUM';
    if (description.toLowerCase().includes('income') || description.toLowerCase().includes('document') || description.toLowerCase().includes('deficiency')) {
      aiCategory = 'Scrutiny & Document Verification Cell';
      aiPriority = 'HIGH';
    } else if (description.toLowerCase().includes('login') || description.toLowerCase().includes('otp') || description.toLowerCase().includes('error')) {
      aiCategory = 'NIC / Portal Technical Cell';
      aiPriority = 'LOW';
    }

    const newGr = {
      id: `GR-${Math.floor(1000 + Math.random() * 9000)}`,
      applicantId: applicant?.id || 'MOTA-2026-NFST-0101',
      applicantName: applicant?.name || 'Applicant',
      category,
      title,
      description,
      aiCategory,
      aiPriority,
      status: 'Pending Review',
      submittedOn: new Date().toISOString().split('T')[0],
      officerResponse: null
    };

    setGrievances([newGr, ...grievances]);
    setTitle('');
    setDescription('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleResolveGrievance = (id, reply) => {
    setGrievances(prev => prev.map(g => {
      if (g.id === id) {
        return {
          ...g,
          status: 'Resolved',
          officerResponse: reply || 'Action taken and resolved by competent MoTA division.'
        };
      }
      return g;
    }));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-300 max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-blue-600/30 text-blue-400 border border-blue-500/30">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">MoTA Tribal Welfare Grievance Redressal Desk</h3>
              <p className="text-xs text-slate-400">
                AI Automated Complaint Classification & Fast-Track Routing
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs">
          {/* Lodge Grievance Form (Student View) */}
          <form onSubmit={handleLodgeGrievance} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
            <div className="font-bold text-slate-900 uppercase tracking-wide text-[11px] flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-900" />
              <span>Raise a New Grievance / Query (AI Will Auto-Route to Ministry Division)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Grievance Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-1.5 border rounded-lg bg-white"
                >
                  <option value="Payment / Disbursement">Payment / Disbursement (Stipend/HRA/Contingency)</option>
                  <option value="Document Verification">Document Verification / Deficiency Extension</option>
                  <option value="Scheme Eligibility">Scheme Eligibility / Quota Clarification</option>
                  <option value="Technical / Portal">Technical / DigiLocker / Jan Parichay Login Issue</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Subject / Summary</label>
                <input
                  type="text"
                  placeholder="e.g. HRA allowance delay for September"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-1.5 border rounded-lg bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Detailed Description & Reference</label>
              <textarea
                rows={2}
                placeholder="Explain your grievance with relevant details..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-1.5 border rounded-lg bg-white"
              />
            </div>

            <div className="flex justify-between items-center pt-1">
              <div className="text-[11px] text-slate-500">
                Average resolution time: <strong className="text-emerald-700">48 Hours</strong>
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg font-bold flex items-center space-x-1.5 shadow"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Grievance</span>
              </button>
            </div>
          </form>

          {submitted && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-950 rounded-xl flex items-center space-x-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Grievance lodged! AI Classifier assigned ticket to designated officer.</span>
            </div>
          )}

          {/* Active Grievances List */}
          <div className="space-y-3">
            <div className="font-bold text-slate-900 uppercase tracking-wide text-[11px]">
              Grievance Register ({grievances.length} Active Records)
            </div>

            {grievances.map((g) => (
              <div key={g.id} className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 hover:shadow-xs transition">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-bold text-slate-800">{g.id}</span>
                      <span className="font-bold text-slate-900">{g.title}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        g.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800 animate-pulse'
                      }`}>
                        {g.status}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Scholar: <strong>{g.applicantName}</strong> ({g.applicantId}) • Submitted: {g.submittedOn}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-bold bg-purple-50 text-purple-800 border border-purple-200 px-2 py-0.5 rounded">
                      Routed to: {g.aiCategory}
                    </span>
                  </div>
                </div>

                <p className="text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100 leading-relaxed">
                  {g.description}
                </p>

                {g.officerResponse ? (
                  <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-950">
                    <strong className="block text-[11px] text-emerald-800 font-bold">Official Ministry Resolution:</strong>
                    <span>"{g.officerResponse}"</span>
                  </div>
                ) : (
                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => handleResolveGrievance(g.id, 'Verified with PFMS cell. Difference amount adjusted in current billing cycle.')}
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[11px] font-bold"
                    >
                      Resolve as Officer
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
