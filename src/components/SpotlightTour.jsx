import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  X, 
  Languages, 
  Lightbulb, 
  CheckCircle2, 
  Zap, 
  HelpCircle,
  Eye,
  ListOrdered
} from 'lucide-react';
import { PAGE_TOURS } from '../data/tourSteps';

export function SpotlightTour({
  pageKey,
  isOpen,
  onClose,
  onComplete,
  lang = 'en',
  setLang,
  lowBandwidth = false,
  setLowBandwidth
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState(null);
  const [isTargetVisible, setIsTargetVisible] = useState(false);
  const [viewMode, setViewMode] = useState(lowBandwidth ? 'list' : 'spotlight'); // 'spotlight' | 'list'
  const tooltipRef = useRef(null);

  const tourData = PAGE_TOURS[pageKey];
  const steps = tourData?.steps || [];
  const currentStepData = steps[currentStep] || null;

  // Sync viewMode if lowBandwidth changes
  useEffect(() => {
    if (lowBandwidth) {
      setViewMode('list');
    }
  }, [lowBandwidth]);

  // Reset step counter when pageKey changes
  useEffect(() => {
    setCurrentStep(0);
  }, [pageKey]);

  // Measure and scroll to target DOM element
  const updateTargetBounds = useCallback(() => {
    if (!isOpen || !currentStepData) return;

    const targetEl = document.querySelector(currentStepData.target);
    if (targetEl) {
      // Smoothly bring target into view if needed
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
      const rect = targetEl.getBoundingClientRect();
      setTargetRect({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        bottom: rect.bottom,
        right: rect.right
      });
      setIsTargetVisible(true);
    } else {
      // Element not found in current DOM state - fallback to center modal
      setTargetRect(null);
      setIsTargetVisible(false);
    }
  }, [isOpen, currentStepData]);

  // Recalculate on step change, resize, and scroll
  useEffect(() => {
    if (!isOpen) return;

    // Small delay to allow DOM transitions to settle
    const timer = setTimeout(updateTargetBounds, 120);

    const handleResizeOrScroll = () => {
      updateTargetBounds();
    };

    window.addEventListener('resize', handleResizeOrScroll, { passive: true });
    window.addEventListener('scroll', handleResizeOrScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResizeOrScroll);
      window.removeEventListener('scroll', handleResizeOrScroll);
    };
  }, [isOpen, currentStep, updateTargetBounds]);

  // Keyboard navigation (Escape, ArrowRight, ArrowLeft)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleSkip();
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handleBack();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentStep, steps.length]);

  if (!isOpen || !tourData || steps.length === 0) return null;

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

  const handleSkip = () => {
    if (onComplete) onComplete(pageKey);
    if (onClose) onClose();
  };

  const handleFinish = () => {
    if (onComplete) onComplete(pageKey);
    if (onClose) onClose();
  };

  const isHindi = lang === 'hi';
  const pageLabel = isHindi ? tourData.pageTitle.hi : tourData.pageTitle.en;
  const stepTitle = isHindi ? currentStepData.titleHi : currentStepData.titleEn;
  const stepDesc = isHindi ? currentStepData.descHi : currentStepData.descEn;
  const stepTip = isHindi ? currentStepData.tipHi : currentStepData.tipEn;

  // -------------------------------------------------------------
  // 1. 2G DATA SAVER LIST / ACCESSIBILITY VIEW
  // -------------------------------------------------------------
  if (viewMode === 'list' || lowBandwidth) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-4 animate-in fade-in duration-200">
        <div className="bg-white rounded-3xl shadow-2xl border-2 border-amber-400 max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <span className="text-amber-400 font-bold text-xs bg-amber-400/20 px-2 py-0.5 rounded-full border border-amber-400/30">
                ⚡ 2G Lite Guide
              </span>
              <h2 className="font-bold text-sm tracking-wide text-white">
                {pageLabel} — {isHindi ? 'पेज मार्गदर्शिका' : 'Page Tour'}
              </h2>
            </div>

            <div className="flex items-center space-x-2">
              {setLang && (
                <button
                  type="button"
                  onClick={() => setLang(isHindi ? 'en' : 'hi')}
                  className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-lg text-amber-300 border border-slate-700 flex items-center space-x-1"
                >
                  <Languages className="w-3.5 h-3.5" />
                  <span>{isHindi ? 'English' : 'हिन्दी'}</span>
                </button>
              )}
              {!lowBandwidth && (
                <button
                  type="button"
                  onClick={() => setViewMode('spotlight')}
                  className="px-2 py-1 bg-blue-600 hover:bg-blue-500 text-xs font-bold rounded-lg text-white"
                >
                  {isHindi ? 'स्पॉटलाइट मोड' : 'Spotlight Mode'}
                </button>
              )}
              <button
                type="button"
                onClick={handleSkip}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* List of Steps */}
          <div className="p-6 overflow-y-auto space-y-4 flex-1">
            <p className="text-xs text-slate-600">
              {isHindi 
                ? 'धीमी कनेक्टिविटी और स्क्रीन रीडर के लिए अनुकूलित सभी प्रमुख तत्वों की सूची:' 
                : 'Accessible summary of all key controls and verification checkpoints on this page:'}
            </p>

            <div className="space-y-3">
              {steps.map((st, idx) => {
                const title = isHindi ? st.titleHi : st.titleEn;
                const desc = isHindi ? st.descHi : st.descEn;
                const tip = isHindi ? st.tipHi : st.tipEn;
                return (
                  <div 
                    key={idx} 
                    className="p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-amber-50/50 hover:border-amber-300 transition-colors"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-slate-900 text-amber-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-sm text-slate-900">{title}</h3>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">{desc}</p>
                        {tip && (
                          <div className="mt-2 text-[11px] bg-white p-2 rounded-xl border border-slate-200 text-amber-900 font-medium flex items-center space-x-1.5">
                            <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            <span><strong>Pro-Tip:</strong> {tip}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="bg-slate-100 px-6 py-4 flex items-center justify-between border-t border-slate-200">
            <span className="text-xs text-slate-500 font-medium">
              {steps.length} {isHindi ? 'मार्गदर्शन चरण' : 'Checkpoints Covered'}
            </span>
            <button
              type="button"
              onClick={handleFinish}
              className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition shadow-sm"
            >
              {isHindi ? 'पूर्ण समझ लिया (बंद करें)' : 'Got it (Complete Guide)'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 2. INTERACTIVE SPOTLIGHT OVERLAY VIEW
  // -------------------------------------------------------------
  // Calculate tooltip position with collision detection & clamping
  const tooltipWidth = 380;
  const padding = 12;

  let bubbleTop = 100;
  let bubbleLeft = 50;

  if (targetRect && isTargetVisible) {
    const isBottomPreferred = (currentStepData.placement === 'bottom') || (targetRect.top < 240);
    
    if (isBottomPreferred) {
      bubbleTop = targetRect.bottom + padding;
      // If bottom overflows viewport, place above
      if (bubbleTop + 240 > window.innerHeight) {
        bubbleTop = Math.max(16, targetRect.top - 240 - padding);
      }
    } else {
      bubbleTop = targetRect.top - 240 - padding;
      if (bubbleTop < 16) {
        bubbleTop = targetRect.bottom + padding;
      }
    }

    // Horizontal centering over target, clamped to window
    const targetCenterX = targetRect.left + (targetRect.width / 2);
    bubbleLeft = targetCenterX - (tooltipWidth / 2);
    bubbleLeft = Math.max(16, Math.min(window.innerWidth - tooltipWidth - 16, bubbleLeft));
  } else {
    // Graceful fallback: center of screen if target is hidden or in another tab
    bubbleTop = Math.max(30, (window.innerHeight / 2) - 130);
    bubbleLeft = Math.max(16, (window.innerWidth / 2) - (tooltipWidth / 2));
  }

  return (
    <div className="fixed inset-0 z-[9990] overflow-hidden pointer-events-auto">
      {/* Semi-transparent SVG Mask with cutout hole */}
      <svg 
        className="fixed inset-0 w-full h-full pointer-events-none transition-all duration-300 ease-out"
        style={{ width: '100vw', height: '100vh' }}
      >
        <defs>
          <mask id="spotlight-mask">
            {/* White covers entire screen (opaque) */}
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            {/* Black cutout creates the transparent spotlight hole */}
            {targetRect && isTargetVisible && (
              <rect
                x={Math.max(0, targetRect.left - 6)}
                y={Math.max(0, targetRect.top - 6)}
                width={targetRect.width + 12}
                height={targetRect.height + 12}
                rx="10"
                ry="10"
                fill="black"
              />
            )}
          </mask>
        </defs>

        {/* The backdrop overlay masked by the hole */}
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="rgba(15, 23, 42, 0.78)"
          mask="url(#spotlight-mask)"
        />
      </svg>

      {/* Pulsing Highlight Box around target element */}
      {targetRect && isTargetVisible && (
        <div
          className="fixed pointer-events-none rounded-xl border-2 border-amber-400 shadow-[0_0_25px_rgba(251,191,36,0.6)] animate-pulse transition-all duration-300 ease-out"
          style={{
            top: targetRect.top - 6,
            left: targetRect.left - 6,
            width: targetRect.width + 12,
            height: targetRect.height + 12,
            zIndex: 9991
          }}
        />
      )}

      {/* Floating Explanation Bubble */}
      <div
        ref={tooltipRef}
        role="dialog"
        aria-modal="true"
        className="fixed z-[9995] bg-white rounded-3xl shadow-2xl border-2 border-slate-900 overflow-hidden flex flex-col transition-all duration-200 animate-in fade-in zoom-in-95"
        style={{
          top: `${bubbleTop}px`,
          left: `${bubbleLeft}px`,
          width: `${tooltipWidth}px`,
          maxWidth: 'calc(100vw - 32px)'
        }}
      >
        {/* Top Header Strip */}
        <div className="bg-slate-900 text-white px-5 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            <span className="font-bold text-xs uppercase tracking-wider text-amber-300">
              {pageLabel}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {/* Mid-Tour Bilingual Switch */}
            {setLang && (
              <button
                type="button"
                onClick={() => setLang(isHindi ? 'en' : 'hi')}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold border border-slate-700 flex items-center space-x-1"
                title="Toggle Language"
              >
                <Languages className="w-3 h-3 text-amber-400" />
                <span>{isHindi ? 'English' : 'हिन्दी'}</span>
              </button>
            )}

            {/* Switch to 2G list mode */}
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 text-[11px]"
              title={isHindi ? '2G सूची मोड' : 'List Mode'}
            >
              <ListOrdered className="w-3.5 h-3.5" />
            </button>

            {/* Skip / Close */}
            <button
              type="button"
              onClick={handleSkip}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition"
              aria-label="Skip Tour"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold">
            <span>
              {isHindi ? `चरण ${currentStep + 1} / ${steps.length}` : `Step ${currentStep + 1} of ${steps.length}`}
            </span>
            <div className="flex space-x-1">
              {steps.map((_, idx) => (
                <span
                  key={idx}
                  className={`w-2 h-1.5 rounded-full transition-all ${
                    idx === currentStep ? 'bg-amber-500 w-4' : (idx < currentStep ? 'bg-emerald-500' : 'bg-slate-200')
                  }`}
                />
              ))}
            </div>
          </div>

          <h3 className="text-base font-bold text-slate-900 leading-snug">
            {stepTitle}
          </h3>

          <p className="text-xs text-slate-600 leading-relaxed">
            {stepDesc}
          </p>

          {/* Pro-Tip Box */}
          {stepTip && (
            <div className="bg-amber-50/80 border border-amber-200 p-3 rounded-2xl flex items-start space-x-2 text-[11px] text-amber-950">
              <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="leading-tight">
                <strong className="font-bold text-amber-900">{isHindi ? 'सलाह: ' : 'Pro-Tip: '}</strong>
                <span>{stepTip}</span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Navigation Buttons */}
        <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={handleSkip}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 underline underline-offset-2"
          >
            {isHindi ? 'टूर छोड़ें' : 'Skip Tour'}
          </button>

          <div className="flex items-center space-x-2">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={handleBack}
                className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-white flex items-center space-x-1 transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{isHindi ? 'पीछे' : 'Back'}</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-1.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold shadow-md flex items-center space-x-1.5 transition active:scale-95"
            >
              <span>
                {currentStep === steps.length - 1
                  ? (isHindi ? 'पूर्ण करें' : 'Finish Tour')
                  : (isHindi ? 'आगे बढ़ें' : 'Next')}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
