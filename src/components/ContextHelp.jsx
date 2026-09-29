import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Clock, Info, ShieldCheck, AlertCircle } from 'lucide-react';
import { I18N } from '../data/i18n';

/**
 * Accessible inline contextual help icon with interactive tooltip.
 */
export function ContextHelp({ text, lang = 'en', title = null }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block ml-1.5 align-middle">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="text-slate-400 hover:text-blue-600 focus:outline-none transition-colors p-0.5 rounded-full hover:bg-blue-50"
        aria-label="Help information"
      >
        <HelpCircle className="w-3.5 h-3.5" />
      </button>

      {isOpen && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-3 bg-slate-900 text-white text-xs rounded-xl shadow-2xl border border-slate-700 z-50 animate-in fade-in-0 zoom-in-95 pointer-events-none">
          {title && <div className="font-bold text-blue-300 mb-1 flex items-center gap-1.5"><Info className="w-3 h-3" />{title}</div>}
          <div className="leading-relaxed text-slate-200">{text}</div>
          <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-slate-900" />
        </div>
      )}
    </div>
  );
}

/**
 * Plain-Language "What happens next?" collapsible explainer for application stages.
 */
export function WhatHappensNextCard({ status = 'DRAFT', lang = 'en', defaultOpen = true }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const dict = I18N[lang]?.whatHappensNext || I18N.en.whatHappensNext;
  const explanation = dict[status] || dict.SUBMITTED;

  const getStatusColor = (st) => {
    switch (st) {
      case 'DRAFT': return 'bg-slate-50 border-slate-200 text-slate-700';
      case 'SUBMITTED':
      case 'AI_PRESCRUTINY': return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'DEFICIENT': return 'bg-amber-50 border-amber-200 text-amber-800';
      case 'READY_FOR_REVIEW':
      case 'UNDER_SCRUTINY': return 'bg-purple-50 border-purple-200 text-purple-800';
      case 'APPROVED': return 'bg-emerald-50 border-emerald-200 text-emerald-800';
      case 'AWARDED':
      case 'QPR_ACTIVE': return 'bg-teal-50 border-teal-200 text-teal-800';
      case 'REJECTED': return 'bg-rose-50 border-rose-200 text-rose-800';
      default: return 'bg-slate-50 border-slate-200 text-slate-700';
    }
  };

  return (
    <div className={`rounded-xl border transition-all ${getStatusColor(status)} p-3 text-xs`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between font-bold text-left focus:outline-none"
      >
        <span className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 shrink-0" />
          <span>{lang === 'hi' ? 'अगला कदम क्या होगा? (Next Steps)' : 'What happens next?'}</span>
        </span>
        {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
      </button>

      {isOpen && (
        <div className="mt-2 pt-2 border-t border-current/15 leading-relaxed text-current opacity-95 animate-in fade-in duration-150">
          {explanation}
        </div>
      )}
    </div>
  );
}
