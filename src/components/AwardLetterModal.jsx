import React from 'react';
import { 
  X, 
  Printer, 
  Download, 
  CheckCircle, 
  ShieldCheck, 
  QrCode, 
  Building,
  GraduationCap
} from 'lucide-react';

import { PublicAwardVerificationModal } from './PublicAwardVerificationModal';

export function AwardLetterModal({ applicant, onClose }) {
  const [showVerifyModal, setShowVerifyModal] = React.useState(false);

  if (!applicant) return null;

  const handlePrint = () => {
    window.print();
  };

  const isNos = applicant.schemeId === 'NOS';
  const sanctionNo = applicant.fellowshipDetails?.sanctionNumber || `MoTA/${applicant.schemeId}/2026/${applicant.id.split('-').pop()}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-300 max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Top Action Bar */}
        <div className="px-6 py-3 bg-slate-900 text-white flex items-center justify-between no-print">
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-sm">Official Fellowship Sanction Order / Award Letter</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Award Letter Document Body (Printable Area) */}
        <div className="flex-1 overflow-y-auto p-8 sm:p-12 bg-white text-slate-900 font-serif leading-relaxed text-sm">
          {/* Government of India Header */}
          <div className="text-center border-b-2 border-slate-900 pb-5">
            <div className="text-xs font-black tracking-widest uppercase text-slate-600">भारत सरकार / Government of India</div>
            <div className="text-base font-black uppercase text-blue-950 mt-1">जनजातीय कार्य मंत्रालय / Ministry of Tribal Affairs</div>
            <div className="text-xs text-slate-700 italic">(Scholarship and Fellowship Division)</div>
            <div className="text-xs text-slate-600 mt-1 font-sans">
              Shastri Bhawan, Dr. Rajendra Prasad Road, New Delhi – 110001
            </div>
          </div>

          {/* Letter Meta Details */}
          <div className="flex justify-between items-center text-xs font-sans mt-6 text-slate-700">
            <div>
              <strong>Sanction Order No:</strong> {applicant.fellowshipDetails?.sanctionNumber || `MoTA/${applicant.schemeId}/2026/${applicant.id.split('-').pop()}`}
            </div>
            <div>
              <strong>Date:</strong> 28 September 2026
            </div>
          </div>

          {/* Subject */}
          <div className="mt-6 p-3 bg-slate-50 border border-slate-200 rounded text-xs font-sans">
            <strong>SUBJECT: </strong> 
            Award of Fellowship under <span className="font-bold text-blue-900">{applicant.schemeName} ({applicant.schemeId})</span> for the Academic Session 2026-27 to <span className="font-bold underline">{applicant.name}</span>.
          </div>

          {/* Salutation & Body */}
          <div className="mt-6 text-xs sm:text-sm space-y-4 text-justify font-serif">
            <p>Dear <strong>{applicant.name}</strong>,</p>

            <p>
              I am directed to convey the sanction of the President of India for the award of fellowship/scholarship under the 
              <strong> {applicant.schemeName}</strong> administered by the Ministry of Tribal Affairs, Government of India, 
              for pursuing <strong>{applicant.degree}</strong> at <strong>{applicant.institution}</strong>.
            </p>

            <p>
              Your selection has been processed following automated verification of caste credentials (mapping to recognized Scheduled Tribe: 
              <strong> {applicant.tribe}</strong> of <strong>{applicant.state}</strong>) and rigorous academic scrutiny by the National Selection Committee.
            </p>

            {/* Financial Assistance Table */}
            <div className="my-4 font-sans text-xs">
              <table className="w-full border-collapse border border-slate-300">
                <thead>
                  <tr className="bg-slate-100 text-slate-800">
                    <th className="border border-slate-300 p-2 text-left">Component</th>
                    <th className="border border-slate-300 p-2 text-left">Approved Rate / Entitlement</th>
                    <th className="border border-slate-300 p-2 text-left">Disbursal Frequency</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-300 p-2 font-medium">Fellowship Stipend / Maintenance</td>
                    <td className="border border-slate-300 p-2 text-blue-950 font-bold">
                      {isNos ? `GBP 9,900 / USD 15,400 per annum (~ ₹${(applicant.fellowshipDetails?.monthlyStipend || 110000).toLocaleString()}/mo)` : `₹${(applicant.fellowshipDetails?.monthlyStipend || 37000).toLocaleString()} per month`}
                    </td>
                    <td className="border border-slate-300 p-2">Monthly via DBT / PFMS</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-2 font-medium">Contingency Grant</td>
                    <td className="border border-slate-300 p-2 font-bold">
                      ₹{applicant.fellowshipDetails?.annualContingency?.toLocaleString() || '20,500'} per annum
                    </td>
                    <td className="border border-slate-300 p-2">Annual upon UC / Report</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-2 font-medium">Tuition & Institutional Charges</td>
                    <td className="border border-slate-300 p-2 text-emerald-800 font-bold">
                      {isNos ? '100% of Actual Tuition directly to University' : 'As per Central/NIRF Fee Schedule'}
                    </td>
                    <td className="border border-slate-300 p-2">Per Semester / Term</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-2 font-medium">PFMS Payment Gateway Ref</td>
                    <td className="border border-slate-300 p-2 font-mono text-[11px]">
                      {applicant.fellowshipDetails?.pfmsBatchId || 'PFMS-MOTA-2026-AUTOBATCH'}
                    </td>
                    <td className="border border-slate-300 p-2 text-emerald-700 font-semibold">Aadhaar Bridge Enabled</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              The disbursal of fellowship is subject to submission of Quarterly Progress Reports (QPR) duly endorsed by your research supervisor/department head via the VidyaSetu portal.
            </p>
          </div>

          {/* Signatures & Security Verification */}
          <div className="mt-10 pt-6 border-t border-slate-200 flex justify-between items-end text-xs font-sans">
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setShowVerifyModal(true)}
                className="p-2 border border-slate-300 rounded bg-slate-50 hover:bg-blue-50 hover:border-blue-300 flex flex-col items-center cursor-pointer transition group"
                title="Click to verify cryptographic signature in prototype registry"
              >
                <QrCode className="w-14 h-14 text-slate-800 group-hover:text-blue-900" />
                <span className="text-[9px] text-blue-700 font-mono mt-1 font-bold group-hover:underline">Verify Online ↗</span>
              </button>
              <div className="text-[10px] text-slate-500 leading-tight">
                <div className="font-semibold text-slate-700">Digital Seal of Integrity</div>
                <div>Hash: e82d...91c0</div>
                <div className="text-emerald-700 font-medium">✓ Cryptographically Signed by MoTA</div>
                <button
                  type="button"
                  onClick={() => setShowVerifyModal(true)}
                  className="text-blue-600 hover:underline font-medium text-[10px] mt-0.5 block"
                >
                  View Registry Proof 🔍
                </button>
              </div>
            </div>

            <div className="text-right space-y-1">
              <div className="font-serif italic text-sm font-semibold text-blue-950">Dr. Rajesh Kumar Murmu, IAS</div>
              <div className="text-[11px] text-slate-700">Joint Secretary to the Government of India</div>
              <div className="text-[10px] text-slate-500">Ministry of Tribal Affairs, New Delhi</div>
            </div>
          </div>
        </div>
      </div>

      {showVerifyModal && (
        <PublicAwardVerificationModal
          sanctionNumber={sanctionNo}
          onClose={() => setShowVerifyModal(false)}
        />
      )}
    </div>
  );
}
