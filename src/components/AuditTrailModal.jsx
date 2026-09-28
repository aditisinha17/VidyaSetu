import React from 'react';
import { X, Clock, ShieldCheck, UserCheck, Bot, FileText, CheckCircle2 } from 'lucide-react';

export function AuditTrailModal({ applicant, onClose }) {
  if (!applicant) return null;

  const logs = applicant.auditTrail || [];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-300 max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">Immutable Application Audit Trail</h3>
              <p className="text-xs text-slate-400">
                Application: <strong className="text-slate-200">{applicant.id}</strong> • Scholar: {applicant.name}
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Audit Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Cryptographic Integrity: All state transitions digitally timestamped and signed.</span>
            </div>
            <span className="font-mono text-[10px] text-emerald-800">SHA-256 Ledger</span>
          </div>

          {/* Timeline */}
          <div className="relative border-l-2 border-slate-200 ml-4 space-y-6">
            {logs.map((log, idx) => {
              const isAi = log.actor.includes('AI') || log.actor.includes('Detector') || log.actor.includes('Engine');
              const isOfficer = log.actor.includes('Officer') || log.actor.includes('Committee');

              return (
                <div key={idx} className="relative pl-6">
                  {/* Bullet */}
                  <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white shadow-xs ${
                    isAi ? 'bg-purple-600' : isOfficer ? 'bg-blue-900' : 'bg-emerald-600'
                  }`}></div>

                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs space-y-1">
                    <div className="flex justify-between items-center">
                      <span className={`font-bold flex items-center space-x-1 ${
                        isAi ? 'text-purple-700' : isOfficer ? 'text-blue-950' : 'text-emerald-700'
                      }`}>
                        {isAi ? <Bot className="w-3.5 h-3.5 inline mr-1" /> : isOfficer ? <UserCheck className="w-3.5 h-3.5 inline mr-1" /> : <FileText className="w-3.5 h-3.5 inline mr-1" />}
                        <span>{log.actor}</span>
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{log.date} at {log.time}</span>
                      </span>
                    </div>

                    <p className="text-slate-800 font-medium pt-0.5">
                      {log.action}
                    </p>

                    <div className="pt-1.5 flex justify-between items-center text-[10px] text-slate-400 font-mono border-t border-slate-200">
                      <span>Hash: {log.hash}</span>
                      <span className="text-emerald-700 font-sans font-semibold">✓ Verified State</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold"
          >
            Close Audit Log
          </button>
        </div>
      </div>
    </div>
  );
}
