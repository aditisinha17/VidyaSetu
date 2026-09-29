import React, { useState, useEffect } from 'react';
import { CheckCircle2, Clock, AlertTriangle, ArrowRight, ShieldCheck, ChevronRight, Sparkles, RefreshCw } from 'lucide-react';
import { I18N } from '../data/i18n';
import { ApiClient } from '../services/apiClient';

export function MissionChecklist({
  applicant,
  lang = 'en',
  onResolveDeficiency,
  onStartEligibility,
  onViewAwardLetter
}) {
  const [progressData, setProgressData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const t = I18N[lang]?.missionChecklist || I18N.en.missionChecklist;

  const fetchProgress = async () => {
    if (!applicant) return;
    setIsLoading(true);
    const res = await ApiClient.getProgress(applicant.userId || applicant.id, applicant.id);
    if (res && res.success && res.data) {
      setProgressData(res.data);
    } else {
      // Fallback calculation directly from applicant object
      const st = applicant.status || 'DRAFT';
      const steps = [
        { id: 1, name: t.step1, status: 'COMPLETED' },
        { id: 2, name: t.step2, status: 'COMPLETED' },
        { id: 3, name: t.step3, status: st !== 'DRAFT' ? 'COMPLETED' : 'IN_PROGRESS' },
        {
          id: 4,
          name: t.step4,
          status: st === 'DEFICIENT' ? 'WARNING' : (['RESUBMITTED', 'READY_FOR_REVIEW', 'UNDER_SCRUTINY', 'APPROVED', 'AWARDED', 'QPR_ACTIVE'].includes(st) ? 'COMPLETED' : (st === 'AI_PRESCRUTINY' ? 'IN_PROGRESS' : 'PENDING')),
          actionRequired: st === 'DEFICIENT' ? (applicant.deficiency?.title || 'Deficiency resolution required') : null
        },
        {
          id: 5,
          name: t.step5,
          status: ['APPROVED', 'AWARDED', 'QPR_ACTIVE'].includes(st) ? 'COMPLETED' : (['READY_FOR_REVIEW', 'UNDER_SCRUTINY'].includes(st) ? 'IN_PROGRESS' : 'PENDING')
        },
        {
          id: 6,
          name: t.step6,
          status: ['AWARDED', 'QPR_ACTIVE'].includes(st) ? 'COMPLETED' : 'PENDING'
        }
      ];
      const completed = steps.filter(s => s.status === 'COMPLETED').length;
      setProgressData({
        completedSteps: completed,
        totalSteps: 6,
        progressPercent: Math.round((completed / 6) * 100),
        steps
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProgress();
  }, [applicant?.status, applicant?.id]);

  if (!progressData) return null;

  const { completedSteps, totalSteps, progressPercent, steps } = progressData;

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
      {/* Top Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-lg">🎯</span>
            <h3 className="font-black text-slate-900 text-base">{t.title}</h3>
            <span className="bg-blue-100 text-blue-800 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
              {lang === 'hi' ? 'वैधानिक चेकलिस्ट' : 'Statutory Track'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">{t.subtitle}</p>
        </div>

        {/* Progress Bar & Percentage */}
        <div className="flex items-center space-x-3 shrink-0">
          <div className="text-right">
            <div className="text-xs font-black text-slate-900">
              {lang === 'hi'
                ? `चरण ${completedSteps}/${totalSteps} पूर्ण (${progressPercent}%)`
                : `Step ${completedSteps} of ${totalSteps} completed (${progressPercent}%)`}
            </div>
            <div className="w-36 bg-slate-100 h-2 rounded-full overflow-hidden mt-1 border border-slate-200">
              <div
                className="bg-gradient-to-r from-blue-600 to-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={fetchProgress}
            className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-slate-100 transition-colors"
            title="Refresh progress from ledger"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-blue-600' : ''}`} />
          </button>
        </div>
      </div>

      {/* 6 Steps List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-5">
        {steps.map((step, idx) => {
          const isDone = step.status === 'COMPLETED';
          const isWarning = step.status === 'WARNING';
          const isInProgress = step.status === 'IN_PROGRESS';
          const isPending = step.status === 'PENDING';

          const title = lang === 'hi' ? (step.nameHi || t[`step${idx + 1}`] || step.name) : (step.name || t[`step${idx + 1}`]);

          return (
            <div
              key={step.id || idx}
              className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between ${
                isDone
                  ? 'bg-emerald-50/50 border-emerald-200'
                  : isWarning
                  ? 'bg-amber-50 border-amber-300 shadow-sm shadow-amber-200/50 animate-pulse'
                  : isInProgress
                  ? 'bg-blue-50/60 border-blue-200 shadow-sm'
                  : 'bg-slate-50/50 border-slate-200 opacity-60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-black text-slate-400">0{idx + 1}</span>
                    <span className="text-xs font-bold text-slate-800">{title}</span>
                  </div>

                  {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                  {isWarning && <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />}
                  {isInProgress && <Clock className="w-4 h-4 text-blue-600 animate-spin shrink-0" />}
                </div>

                <div className="text-[11px] text-slate-500 leading-snug">
                  {lang === 'hi' ? (step.descriptionHi || 'वैधानिक नियम सत्यापन') : (step.description || 'Statutory criteria evaluated')}
                </div>
              </div>

              {/* Action Buttons if Warning or Special State */}
              {isWarning && (
                <div className="mt-3 pt-2 border-t border-amber-200">
                  <button
                    type="button"
                    onClick={() => onResolveDeficiency && onResolveDeficiency(applicant?.id)}
                    className="w-full py-1.5 px-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-black text-[11px] flex items-center justify-center space-x-1.5 shadow-sm transition-all"
                  >
                    <span>{t.resolveBtn}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              )}

              {isDone && idx === 5 && (
                <div className="mt-3 pt-2 border-t border-emerald-200">
                  <button
                    type="button"
                    onClick={() => onViewAwardLetter && onViewAwardLetter(applicant)}
                    className="w-full py-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black text-[11px] flex items-center justify-center space-x-1.5 shadow-sm transition-all"
                  >
                    <span>{lang === 'hi' ? 'स्वीकृति पत्र देखें' : 'View Award Letter'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
