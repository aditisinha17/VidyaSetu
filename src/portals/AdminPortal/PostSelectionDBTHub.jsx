import React, { useState } from 'react';
import { 
  Landmark, 
  CheckCircle2, 
  Clock, 
  Send, 
  ShieldCheck, 
  AlertTriangle, 
  Download, 
  FileText,
  DollarSign,
  Calendar,
  Sparkles,
  RefreshCw
} from 'lucide-react';

export function PostSelectionDBTHub({ applicants, onTriggerDbtBatch }) {
  const [selectedBatch, setSelectedBatch] = useState('OCT_2026');
  const [isProcessing, setIsProcessing] = useState(false);
  const [batchDisbursed, setBatchDisbursed] = useState(false);

  // Scholars who have been awarded fellowships
  const selectedScholars = applicants.filter(a => a.status === 'Selected' || a.fellowshipDetails !== null);

  const totalMonthlySanction = selectedScholars.reduce((acc, curr) => {
    return acc + (curr.fellowshipDetails?.monthlyStipend || 37000);
  }, 0);

  const handleRunBatch = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setBatchDisbursed(true);
      if (onTriggerDbtBatch) onTriggerDbtBatch();
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Title & Overview Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-black text-slate-900 font-serif">Post-Selection & DBT/PFMS Disbursal Hub</h1>
            <span className="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold border border-emerald-300">
              NPCI Aadhaar Payment Bridge (APB)
            </span>
          </div>
          <p className="text-xs text-slate-600">
            Public Financial Management System (PFMS) Gateway for Monthly Stipends, HRA, and Contingency Grants
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleRunBatch}
            disabled={isProcessing}
            className="flex items-center space-x-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-md transition disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isProcessing ? 'animate-spin' : ''}`} />
            <span>{isProcessing ? 'Processing PFMS Transmission...' : 'Execute Monthly DBT Stipend Batch'}</span>
          </button>
        </div>
      </div>

      {batchDisbursed && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs flex items-center justify-between animate-in fade-in">
          <div className="flex items-center space-x-2 font-bold">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>DBT Batch Executed! Electronic Fund Transfer Orders (e-FTO) routed via RBI/NPCI Aadhaar Bridge.</span>
          </div>
          <span className="text-[11px] font-mono text-emerald-800">Batch Ref: PFMS-MOTA-2026-OCT-B01</span>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="text-slate-500 font-semibold">Active Sanctioned Scholars</div>
          <div className="text-2xl font-black text-blue-950 mt-1 font-mono">{selectedScholars.length}</div>
          <div className="text-[11px] text-emerald-700 mt-1 flex items-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>100% Aadhaar Seeded Accounts</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="text-slate-500 font-semibold">Monthly Stipend Outlay</div>
          <div className="text-2xl font-black text-slate-900 mt-1 font-mono">
            ₹{(totalMonthlySanction).toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Disbursed on 1st of every month</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="text-slate-500 font-semibold">QPR Compliance Gate</div>
          <div className="text-2xl font-black text-emerald-700 mt-1 font-mono">96.4%</div>
          <div className="text-[11px] text-slate-500 mt-1">Quarterly reports endorsed by guide</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="text-slate-500 font-semibold">PFMS Integration Health</div>
          <div className="text-2xl font-black text-blue-900 mt-1 font-mono">Active (200 OK)</div>
          <div className="text-[11px] text-slate-500 mt-1">Direct Bank Gateway Latency 140ms</div>
        </div>
      </div>

      {/* Active Scholars DBT Roster */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center text-xs">
          <div className="font-bold text-slate-900 uppercase tracking-wide">
            Scholar DBT Compliance & Payment Roster
          </div>
          <div className="text-slate-500">
            Automated verification prevents ghost beneficiaries & duplicate claims
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 border-b border-slate-200">
              <tr>
                <th className="p-3 font-bold">Scholar Name & ID</th>
                <th className="p-3 font-bold">Scheme</th>
                <th className="p-3 font-bold">Institution</th>
                <th className="p-3 font-bold">Monthly Sanction</th>
                <th className="p-3 font-bold">Aadhaar Bank APB</th>
                <th className="p-3 font-bold">QPR Status</th>
                <th className="p-3 font-bold text-center">DBT Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {selectedScholars.map((sch) => {
                const f = sch.fellowshipDetails;
                const monthly = f?.monthlyStipend || 37000;
                return (
                  <tr key={sch.id} className="hover:bg-slate-50 transition">
                    <td className="p-3">
                      <div className="font-bold text-slate-900">{sch.name}</div>
                      <div className="text-[11px] text-slate-500 font-mono">{sch.id}</div>
                    </td>
                    <td className="p-3 font-semibold text-blue-950">
                      {sch.schemeId}
                    </td>
                    <td className="p-3">
                      <div className="font-medium text-slate-800">{sch.institution}</div>
                      <div className="text-[11px] text-slate-500">{sch.degree}</div>
                    </td>
                    <td className="p-3 font-mono font-bold text-slate-900">
                      ₹{monthly.toLocaleString()}
                    </td>
                    <td className="p-3 font-mono text-[11px] text-slate-600">
                      <div>{f?.bankAccount || 'State Bank of India'}</div>
                      <div className="text-emerald-700 font-semibold">✓ Aadhaar Linked</div>
                    </td>
                    <td className="p-3">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        {f?.progressReports?.[0]?.status || 'Verified by Guide'}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        batchDisbursed 
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                          : 'bg-blue-100 text-blue-900'
                      }`}>
                        {batchDisbursed ? 'CREDITED (UTR GENERATED)' : 'QUEUED IN PFMS'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
