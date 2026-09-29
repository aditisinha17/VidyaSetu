import React, { useState } from 'react';
import { Sparkles, CheckCircle2, FileText, ArrowRight, ArrowLeft, X, Languages, Shield, Award, Users, BookOpen, Clock } from 'lucide-react';
import { I18N } from '../data/i18n';

export function WelcomeTourModal({ isOpen, onClose, lang = 'en', setLang }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  if (!isOpen) return null;

  const t = I18N[lang]?.welcomeTour || I18N.en.welcomeTour;

  const totalSlides = 3;

  const handleNext = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    if (dontShowAgain) {
      localStorage.setItem('vidyasetu_welcome_dismissed', 'true');
    }
    onClose(dontShowAgain);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Header Strip with Language Switcher & Close */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl">🏛️</span>
            <div>
              <div className="font-black text-sm tracking-wide text-amber-400 uppercase">VidyaSetu • विद्यासेतु</div>
              <div className="text-[10px] text-slate-400">Ministry of Tribal Affairs • Government of India</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Quick Language Switcher */}
            {setLang && (
              <div className="flex items-center bg-slate-800 rounded-lg p-1 border border-slate-700 text-xs">
                <Languages className="w-3.5 h-3.5 text-slate-400 mr-1 ml-0.5" />
                <button
                  type="button"
                  onClick={() => setLang('en')}
                  className={`px-2 py-0.5 rounded font-bold transition-colors ${lang === 'en' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'}`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setLang('hi')}
                  className={`px-2 py-0.5 rounded font-bold transition-colors ${lang === 'hi' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'}`}
                >
                  हिन्दी
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={handleComplete}
              className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Slide Content Area */}
        <div className="p-6 md:p-8 flex-1 overflow-y-auto">
          {/* SLIDE 1: What is VidyaSetu */}
          {currentSlide === 0 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-200">
              <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-800 border border-blue-200 px-3 py-1 rounded-full text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>{t.badge}</span>
              </div>

              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">{t.slide1Title}</h2>
                <p className="text-slate-600 text-sm mt-2 leading-relaxed">{t.slide1Desc}</p>
              </div>

              {/* 5 Schemes Mini Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start space-x-3">
                  <div className="p-2 bg-blue-100 text-blue-800 rounded-xl font-bold text-xs">NFST</div>
                  <div>
                    <div className="font-bold text-xs text-slate-900">National Fellowship for ST</div>
                    <div className="text-[11px] text-slate-500">M.Phil & Ph.D. research fellowships (₹37k - ₹42k/mo)</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start space-x-3">
                  <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl font-bold text-xs">NOS</div>
                  <div>
                    <div className="font-bold text-xs text-slate-900">National Overseas Scholarship</div>
                    <div className="text-[11px] text-slate-500">Master's & Ph.D. abroad (Full tuition + £9.9k/yr)</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start space-x-3">
                  <div className="p-2 bg-purple-100 text-purple-800 rounded-xl font-bold text-xs">TOP CLASS</div>
                  <div>
                    <div className="font-bold text-xs text-slate-900">Top Class Education</div>
                    <div className="text-[11px] text-slate-500">IITs, NITs, IIMs & AIIMS full tuition coverage</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start space-x-3">
                  <div className="p-2 bg-amber-100 text-amber-800 rounded-xl font-bold text-xs">MATRIC</div>
                  <div>
                    <div className="font-bold text-xs text-slate-900">Pre & Post-Matric ST</div>
                    <div className="text-[11px] text-slate-500">Classes IX to PG universal entitlement support</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 2: 4-Step Pictorial Journey */}
          {currentSlide === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-200">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">{t.slide2Title}</h2>
                <p className="text-slate-600 text-sm mt-1">{t.slide2Desc}</p>
              </div>

              <div className="space-y-3.5 pt-2">
                <div className="flex items-start space-x-3.5 p-3.5 rounded-2xl bg-blue-50/60 border border-blue-100">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xs shrink-0">1</div>
                  <div>
                    <div className="font-bold text-xs text-blue-950">{t.step1.split('—')[0]}</div>
                    <div className="text-[11px] text-slate-600 mt-0.5">{t.step1.split('—')[1] || 'Check eligibility against statutory rules'}</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5 p-3.5 rounded-2xl bg-purple-50/60 border border-purple-100">
                  <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center font-black text-xs shrink-0">2</div>
                  <div>
                    <div className="font-bold text-xs text-purple-950">{t.step2.split('—')[0]}</div>
                    <div className="text-[11px] text-slate-600 mt-0.5">{t.step2.split('—')[1] || 'Upload certificates via DigiLocker or scan'}</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5 p-3.5 rounded-2xl bg-amber-50/60 border border-amber-100">
                  <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center font-black text-xs shrink-0">3</div>
                  <div>
                    <div className="font-bold text-xs text-amber-950">{t.step3.split('—')[0]}</div>
                    <div className="text-[11px] text-slate-600 mt-0.5">{t.step3.split('—')[1] || 'Real OCR validation with 14-day defect resolution'}</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5 p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100">
                  <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-xs shrink-0">4</div>
                  <div>
                    <div className="font-bold text-xs text-emerald-950">{t.step4.split('—')[0]}</div>
                    <div className="text-[11px] text-slate-600 mt-0.5">{t.step4.split('—')[1] || 'Merit ranking & monthly stipend release via PFMS'}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 3: What to prepare before you start */}
          {currentSlide === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-200">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">{t.slide3Title}</h2>
                <p className="text-slate-600 text-sm mt-1">{t.slide3Desc}</p>
              </div>

              <div className="space-y-2.5 pt-2">
                {[t.doc1, t.doc2, t.doc3, t.doc4, t.doc5].map((doc, idx) => (
                  <div key={idx} className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="text-xs font-semibold text-slate-800">{doc}</span>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs flex items-center space-x-2">
                <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                <span><strong>PVTG Priority:</strong> Scholars from Particularly Vulnerable Tribal Groups receive statutory fee exemptions and queue priority.</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer with Step Indicators & Actions */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-between">
          {/* Progress Dots */}
          <div className="flex items-center space-x-2">
            {[0, 1, 2].map((idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                className={`h-2.5 rounded-full transition-all ${currentSlide === idx ? 'w-8 bg-blue-600' : 'w-2.5 bg-slate-300'}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Don't show again checkbox */}
          <label className="hidden sm:flex items-center space-x-2 text-xs text-slate-600 cursor-pointer">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <span>{t.dontShowAgain}</span>
          </label>

          {/* Navigation Controls */}
          <div className="flex items-center space-x-2">
            {currentSlide > 0 && (
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-100 transition-colors flex items-center space-x-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{t.back}</span>
              </button>
            )}

            {currentSlide < totalSlides - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-5 py-2 text-xs font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all flex items-center space-x-1"
              >
                <span>{t.next}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleComplete}
                className="px-6 py-2 text-xs font-black text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 shadow-lg shadow-emerald-600/30 transition-all flex items-center space-x-1.5"
              >
                <span>{t.start}</span>
                <Sparkles className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
