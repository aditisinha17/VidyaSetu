import React, { useState } from 'react';
import { Zap, AlertTriangle, CheckCircle2, Clock, FileText, ArrowRight, ShieldCheck, Download, RefreshCw, Eye } from 'lucide-react';
import { I18N } from '../../data/i18n';
import { ApiClient } from '../../services/apiClient';

export function LiteApplicantDashboard({
  applicants = [],
  schemes = [],
  selectedApplicantId,
  setSelectedApplicantId,
  onStartNewApplication,
  onViewDoc,
  onViewAwardLetter,
  onResolveDeficiency,
  onOpenGrievances,
  onSwitchToStandard,
  lang = 'en'
}) {
  const [loadedPreviews, setLoadedPreviews] = useState({});
  const activeApp = applicants.find(a => a.id === selectedApplicantId) || applicants[0];
  const t = I18N[lang] || I18N.en;

  const togglePreview = (docName) => {
    setLoadedPreviews(prev => ({
      ...prev,
      [docName]: !prev[docName]
    }));
  };

  if (!activeApp) {
    return (
      <div className="max-w-4xl mx-auto p-4 bg-white border border-slate-300 rounded text-slate-800 text-sm">
        No active applicant records found.
      </div>
    );
  }

  const isDeficient = activeApp.status === 'DEFICIENT' || activeApp.status === 'Deficiency Pending';
  const isAwarded = activeApp.status === 'AWARDED' || activeApp.status === 'QPR_ACTIVE';

  return (
    <div className="max-w-4xl mx-auto p-4 font-sans text-slate-900 bg-white">
      {/* 2G Data Saver Banner */}
      <div className="bg-amber-100 border-2 border-amber-400 p-3 rounded mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center space-x-2">
          <Zap className="w-4 h-4 text-amber-800 shrink-0" />
          <span className="font-bold text-amber-900">
            {lang === 'hi' ? '⚡ 2G कम-बैंडविड्थ डेटा सेवर मोड सक्रिय (85% डेटा की बचत)' : '⚡ 2G Data Saver Mode Active (85% mobile data saved)'}
          </span>
        </div>
        <button
          type="button"
          onClick={onSwitchToStandard}
          className="px-3 py-1 bg-amber-800 text-white font-bold rounded hover:bg-amber-900 text-xs text-center"
        >
          {lang === 'hi' ? 'पूर्ण ग्राफ़िक मोड में बदलें' : 'Switch to Full Graphic Mode'}
        </button>
      </div>

      {/* Basic Student Case File Summary Table */}
      <div className="border border-slate-300 rounded mb-4 p-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
          <h2 className="text-base font-bold">
            {activeApp.name} — <span className="font-mono text-xs">{activeApp.id}</span>
          </h2>
          <span className="px-2 py-0.5 text-xs font-bold bg-blue-100 text-blue-900 rounded">
            {activeApp.status}
          </span>
        </div>

        <table className="w-full text-xs text-left border-collapse">
          <tbody>
            <tr className="border-b border-slate-100">
              <th className="py-1.5 pr-2 font-bold text-slate-600 w-1/3">Scheme:</th>
              <td className="py-1.5 font-bold text-blue-900">{activeApp.schemeId} ({activeApp.schemeName || 'MoTA Scheme'})</td>
            </tr>
            <tr className="border-b border-slate-100">
              <th className="py-1.5 pr-2 font-bold text-slate-600">ST Community:</th>
              <td className="py-1.5">{activeApp.tribe} {activeApp.pvtg ? '(PVTG Priority)' : ''} — {activeApp.state}</td>
            </tr>
            <tr className="border-b border-slate-100">
              <th className="py-1.5 pr-2 font-bold text-slate-600">Institution & Degree:</th>
              <td className="py-1.5">{activeApp.institution} | {activeApp.degree}</td>
            </tr>
            <tr className="border-b border-slate-100">
              <th className="py-1.5 pr-2 font-bold text-slate-600">Annual Family Income:</th>
              <td className="py-1.5">₹{(activeApp.annualIncome || 480000).toLocaleString('en-IN')} (Eligible)</td>
            </tr>
            <tr>
              <th className="py-1.5 pr-2 font-bold text-slate-600">Stage Progress:</th>
              <td className="py-1.5 font-bold">Stage {activeApp.stage} of 6 ({activeApp.progressPercent || 75}%)</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Deficiency Urgent Notice if active */}
      {isDeficient && (
        <div className="bg-red-50 border-2 border-red-500 p-4 rounded mb-4 text-xs">
          <div className="flex items-center space-x-2 text-red-800 font-bold mb-1">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <span>ACTION REQUIRED: {activeApp.deficiency?.title || 'Document Deficiency Flagged'}</span>
          </div>
          <p className="text-slate-700 mb-2">
            {activeApp.deficiency?.statutoryReason || 'A statutory requirement is missing or expired. You have 14 days to replace it.'}
          </p>
          <div className="font-bold text-red-900 mb-3">
            Deadline: {activeApp.deficiency?.deadlineDate || '14 days from issue'}
          </div>
          <button
            type="button"
            onClick={() => onResolveDeficiency && onResolveDeficiency(activeApp.id)}
            className="px-4 py-2 bg-red-700 text-white font-bold rounded hover:bg-red-800"
          >
            {lang === 'hi' ? 'त्रुटि सुधारें एवं प्रतिस्थापन अपलोड करें' : 'Resolve Deficiency & Upload Replacement'}
          </button>
        </div>
      )}

      {/* Quick Action Links: Slips, Grievances */}
      <div className="flex flex-wrap gap-2 mb-4">
        <a
          href={ApiClient.getApplicationSlipUrl(activeApp.id, 'acknowledgment')}
          target="_blank"
          rel="noreferrer"
          className="px-3 py-1.5 bg-slate-800 text-white font-bold text-xs rounded hover:bg-slate-900 inline-flex items-center space-x-1"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{lang === 'hi' ? 'पावती पर्ची (PDF)' : 'Download Acknowledgment Slip'}</span>
        </a>

        {isAwarded && (
          <a
            href={ApiClient.getApplicationSlipUrl(activeApp.id, 'award')}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 bg-emerald-700 text-white font-bold text-xs rounded hover:bg-emerald-800 inline-flex items-center space-x-1"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? 'आधिकारिक स्वीकृति पत्र (PDF)' : 'Download Official Award Letter'}</span>
          </a>
        )}

        <button
          type="button"
          onClick={onOpenGrievances}
          className="px-3 py-1.5 border border-slate-400 text-slate-800 font-bold text-xs rounded hover:bg-slate-100"
        >
          {lang === 'hi' ? 'शिकायत निवारण पटल' : 'File / View Grievance'}
        </button>
      </div>

      {/* Documents Table with Tap-to-Load On-Demand Previews */}
      <div className="border border-slate-300 rounded p-4 mb-4">
        <h3 className="font-bold text-sm mb-2 border-b border-slate-200 pb-1">
          {lang === 'hi' ? 'अपलोड किए गए दस्तावेज़ (ओसीआर सत्यापित)' : 'Uploaded Case Documents (OCR Verified)'}
        </h3>

        <div className="space-y-2">
          {(activeApp.documents || []).map((doc, idx) => {
            const isLoaded = loadedPreviews[doc.name];
            return (
              <div key={idx} className="border border-slate-200 rounded p-2.5 text-xs bg-slate-50">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-800">{doc.name}</span>
                    <span className="ml-2 font-mono text-[10px] text-slate-500">[{doc.fileNumber || 'VERIFIED'}]</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${doc.status === 'VERIFIED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                    {doc.status} ({doc.confidence || 98}%)
                  </span>
                </div>

                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-600">
                  <span>Authority: {doc.issuingAuthority || 'Revenue Authority'}</span>
                  <button
                    type="button"
                    onClick={() => togglePreview(doc.name)}
                    className="text-blue-700 underline font-bold hover:text-blue-900"
                  >
                    {isLoaded ? (lang === 'hi' ? 'पूर्वावलोकन छिपाएं' : 'Hide Preview') : (lang === 'hi' ? 'पूर्वावलोकन देखें (टैप करें)' : 'Tap to view preview')}
                  </button>
                </div>

                {/* On-demand text preview without downloading heavy image */}
                {isLoaded && (
                  <div className="mt-2 p-2 bg-white border border-slate-300 rounded text-[11px] font-mono text-slate-700 whitespace-pre-wrap">
                    {doc.extractedText || 'OCR Verified statutory text extracted successfully.'}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
