import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, CheckCircle2, AlertCircle, Building2, Calendar, User, BookOpen } from 'lucide-react';
import { ApiClient } from '../services/apiClient';

export function PublicAwardVerificationModal({ sanctionNumber, onClose }) {
  const [loading, setLoading] = useState(true);
  const [record, setRecord] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchVerification() {
      setLoading(true);
      setError(null);
      const res = await ApiClient.verifyAward(sanctionNumber);
      if (res && res.success) {
        setRecord(res.data);
      } else {
        setError('Sanction order record not found in the national registry database.');
      }
      setLoading(false);
    }
    fetchVerification();
  }, [sanctionNumber]);

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-300 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-blue-950 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <div>
              <h3 className="font-bold text-sm">National Fellowship & Scholarship Registry</h3>
              <p className="text-[11px] text-blue-200">Ministry of Tribal Affairs — Public Verification Portal</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-blue-900 text-blue-300 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notice badge */}
        <div className="bg-emerald-50 border-b border-emerald-200 px-6 py-2.5 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-xs font-semibold text-emerald-800">
              Official Digital Credential Validated
            </span>
          </div>
          <span className="text-[10px] font-mono bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded font-bold">
            PROTOTYPE REGISTRY
          </span>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="py-8 text-center text-slate-500 text-xs flex flex-col items-center">
              <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mb-2"></div>
              <span>Verifying cryptographic seal against MoTA registry ledger...</span>
            </div>
          ) : error ? (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">Sanction Order Number</div>
                <div className="text-sm font-bold text-blue-950 font-mono mt-0.5">{record.sanctionNumber}</div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-[10px] text-slate-500 font-medium">Beneficiary Scholar</div>
                  <div className="font-bold text-slate-800 mt-0.5 flex items-center space-x-1">
                    <User className="w-3.5 h-3.5 text-blue-600" />
                    <span>{record.scholarName}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1">Community: {record.tribeCommunity} (ST)</div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-[10px] text-slate-500 font-medium">Sanctioned Scheme</div>
                  <div className="font-bold text-blue-900 mt-0.5">{record.schemeName}</div>
                  <div className="text-[10px] text-slate-500 mt-1">Scheme Code: {record.schemeId}</div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <div className="text-[10px] text-slate-500 font-medium">Host Institution & Programme</div>
                <div className="font-semibold text-slate-800 mt-0.5 flex items-center space-x-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                  <span>{record.institution}</span>
                </div>
                <div className="text-[11px] text-slate-600 mt-1 flex items-center space-x-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>{record.degree}</span>
                </div>
              </div>

              <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-xs space-y-1">
                <div className="font-semibold text-blue-950 flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-700" />
                  <span>Digital Cryptographic Signature</span>
                </div>
                <div className="text-[11px] text-blue-900 font-sans">{record.digitalSignature}</div>
                <div className="text-[10px] text-slate-500 italic mt-1">{record.notice}</div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg transition"
          >
            Close Verification Window
          </button>
        </div>
      </div>
    </div>
  );
}
