import React, { useState } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, Check, X, Compass, Search, FileCheck, Award, AlertTriangle, Layers } from 'lucide-react';
import { I18N } from '../data/i18n';
import { ApiClient } from '../services/apiClient';

export function InteractiveWalkthrough({
  isOpen,
  onClose,
  user,
  lang = 'en'
}) {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const t = I18N[lang]?.walkthrough || I18N.en.walkthrough;

  const steps = [
    {
      id: 'schemeFinder',
      title: t.step1Title,
      text: t.step1Text,
      icon: Search,
      badge: 'Step 1 of 4',
      badgeColor: 'bg-blue-100 text-blue-800',
      tip: lang === 'hi' ? 'सुझाव: 30 सेकंड में पात्रता जांचें' : 'Tip: Test eligibility in 30 seconds'
    },
    {
      id: 'tracker',
      title: t.step2Title,
      text: t.step2Text,
      icon: Layers,
      badge: 'Step 2 of 4',
      badgeColor: 'bg-purple-100 text-purple-800',
      tip: lang === 'hi' ? 'सभी 6 चरणों की प्रगति वास्तविक समय में दिखती है' : 'All 6 stages track live in real-time'
    },
    {
      id: 'deficiency',
      title: t.step3Title,
      text: t.step3Text,
      icon: AlertTriangle,
      badge: 'Step 3 of 4',
      badgeColor: 'bg-amber-100 text-amber-800',
      tip: lang === 'hi' ? '14 दिनों के भीतर प्रतिस्थापन अपलोड करें' : '14 days statutory resolution window'
    },
    {
      id: 'documents',
      title: t.step4Title,
      text: t.step4Text,
      icon: Award,
      badge: 'Step 4 of 4',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      tip: lang === 'hi' ? 'क्यूआर कोड युक्त पावती पर्ची एवं स्वीकृति पत्र' : 'Official QR-verified certificates & slips'
    }
  ];

  const current = steps[currentStep];
  const IconComponent = current.icon;

  const handleFinish = async () => {
    if (user?.id) {
      await ApiClient.updateTutorialCompleted(user.id);
    }
    onClose();
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleFinish();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border-2 border-blue-600 max-w-lg w-full p-6 sm:p-7 relative overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Decorative Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-500" />

        {/* Header Strip */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${current.badgeColor}`}>
              {current.badge}
            </span>
            <span className="text-xs text-slate-400 font-bold">• Guided Walkthrough</span>
          </div>

          <button
            type="button"
            onClick={handleFinish}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-100 transition-colors"
            title={t.skip}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Body */}
        <div className="py-5 space-y-4">
          <div className="flex items-start space-x-4">
            <div className="p-3.5 bg-blue-50 text-blue-600 rounded-2xl shrink-0 border border-blue-100 shadow-sm">
              <IconComponent className="w-7 h-7" />
            </div>

            <div>
              <h4 className="text-lg font-black text-slate-900 tracking-tight">{current.title}</h4>
              <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">{current.text}</p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs flex items-center space-x-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span className="font-semibold">{current.tip}</span>
          </div>
        </div>

        {/* Step Indicator & Controls */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-1.5">
            {steps.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 rounded-full transition-all ${currentStep === idx ? 'w-6 bg-blue-600' : 'w-2 bg-slate-200'}`}
              />
            ))}
          </div>

          <div className="flex items-center space-x-2">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={handleBack}
                className="px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center space-x-1"
              >
                <ArrowLeft className="w-3 h-3" />
                <span>{lang === 'hi' ? 'पीछे' : 'Back'}</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleNext}
              className={`px-4 py-2 text-xs font-black rounded-xl transition-all flex items-center space-x-1.5 shadow-md ${
                currentStep === steps.length - 1
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20'
              }`}
            >
              <span>{currentStep === steps.length - 1 ? t.finish : (lang === 'hi' ? 'अगला कदम' : 'Next Step')}</span>
              {currentStep === steps.length - 1 ? <Check className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
