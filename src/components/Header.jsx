import React from 'react';
import { 
  Building2, 
  Languages, 
  Volume2, 
  Eye, 
  Bell, 
  UserCheck, 
  Sparkles,
  FileCheck2,
  SlidersHorizontal,
  BarChart3,
  Landmark,
  BadgeAlert,
  GraduationCap
} from 'lucide-react';
import { I18N } from '../data/i18n';

export function Header({ 
  currentRole, 
  setRole, 
  lang, 
  setLang, 
  contrast, 
  setContrast,
  textSize,
  setTextSize,
  deficiencyCount = 1,
  onOpenDeficiency
}) {
  const t = I18N[lang] || I18N.en;

  const roles = [
    { id: 'applicant', label: t.applicantPortal, icon: GraduationCap, badge: null },
    { id: 'scrutiny', label: t.scrutinyDesk, icon: FileCheck2, badge: 'AI Dual-Pane' },
    { id: 'merit', label: t.meritEngine, icon: UserCheck, badge: 'Explainable AI' },
    { id: 'dbt', label: t.dbtDisbursal, icon: Landmark, badge: 'PFMS/NPCI' },
    { id: 'config', label: t.schemeConfig, icon: SlidersHorizontal, badge: 'Dynamic' },
    { id: 'analytics', label: t.analytics, icon: BarChart3, badge: 'GIS Heatmap' },
  ];

  return (
    <header className={`border-b transition-colors ${contrast ? 'bg-black text-yellow-300 border-yellow-500' : 'bg-white text-slate-800 border-slate-200'} sticky top-0 z-50 shadow-sm`}>
      {/* Top Tricolor Banner */}
      <div className="h-1.5 w-full bg-gradient-to-r from-orange-500 via-white to-green-600"></div>

      {/* Top Gov Bar */}
      <div className={`text-xs border-b px-4 py-1.5 flex flex-wrap items-center justify-between ${contrast ? 'bg-zinc-900 border-zinc-800 text-yellow-400' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>
        <div className="flex items-center space-x-3">
          <span className="font-semibold tracking-wide">भारत सरकार | Government of India</span>
          <span className="hidden md:inline text-slate-400">|</span>
          <span className="hidden md:inline font-medium text-blue-900 font-serif">Ministry of Tribal Affairs (जनजातीय कार्य मंत्रालय)</span>
        </div>

        <div className="flex items-center space-x-3 mt-1 sm:mt-0">
          {/* Accessibility Font Size */}
          <div className="flex items-center space-x-1 border rounded px-1 bg-white/50">
            <span className="text-[10px] text-slate-500">A</span>
            <button 
              onClick={() => setTextSize('normal')} 
              className={`px-1 rounded text-xs ${textSize === 'normal' ? 'bg-blue-900 text-white' : ''}`}
              title="Normal font size"
            >
              A
            </button>
            <button 
              onClick={() => setTextSize('large')} 
              className={`px-1 rounded font-bold text-xs ${textSize === 'large' ? 'bg-blue-900 text-white' : ''}`}
              title="Larger font size"
            >
              A+
            </button>
          </div>

          {/* Contrast Mode Toggle */}
          <button 
            onClick={() => setContrast(!contrast)}
            className={`flex items-center space-x-1 px-2 py-0.5 rounded border text-xs ${contrast ? 'bg-yellow-400 text-black border-yellow-300' : 'bg-white text-slate-700 hover:bg-slate-50'}`}
            title="Toggle High Contrast for Accessibility"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.highContrast}</span>
          </button>

          {/* Language Selector */}
          <div className="flex items-center space-x-1 border rounded px-1.5 py-0.5 bg-white/60">
            <Languages className="w-3.5 h-3.5 text-blue-800" />
            <select 
              value={lang} 
              onChange={(e) => setLang(e.target.value)}
              className="bg-transparent font-medium text-xs focus:outline-none cursor-pointer"
            >
              <option value="en">English (EN)</option>
              <option value="hi">हिन्दी (Hindi)</option>
              <option value="or">ଓଡ଼ିଆ (Odia)</option>
              <option value="sat">संताली / ᱥᱟᱱᱛᱟᱲᱤ (Santhali)</option>
              <option value="te">తెలుగు (Telugu)</option>
              <option value="mr">मराठी (Marathi)</option>
            </select>
          </div>

          {/* DigiLocker Verified Pill */}
          <div className="hidden lg:flex items-center space-x-1 bg-emerald-50 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full text-[11px] font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            <span>DigiLocker & Jan Parichay Integrated</span>
          </div>
        </div>
      </div>

      {/* Main Brand Section */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          {/* Emblem & Ashoka Chakra Simulation */}
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-900 to-indigo-950 text-white flex flex-col items-center justify-center shadow-md p-1 border-2 border-amber-400">
            <div className="text-[9px] font-serif font-black tracking-tighter text-amber-300 uppercase">सत्यमेव</div>
            <div className="text-[8px] font-serif font-black tracking-tighter text-amber-300 uppercase">जयते</div>
            <div className="w-4 h-0.5 bg-amber-400 my-0.5"></div>
            <div className="text-[7px] text-blue-200">MoTA</div>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <h1 className={`text-2xl font-black tracking-tight ${contrast ? 'text-yellow-300' : 'text-blue-950 font-serif'}`}>
                {t.portalTitle}
              </h1>
              <span className="bg-amber-100 text-amber-900 text-xs px-2 py-0.5 rounded-full border border-amber-300 font-semibold flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-amber-600" />
                <span>AI 2.0 Enabled</span>
              </span>
            </div>
            <p className={`text-xs ${contrast ? 'text-yellow-200' : 'text-slate-600'} font-medium`}>
              {t.portalSubtitle} • <span className="text-orange-600 font-semibold">NFST | NOS | Top-Class ST</span>
            </p>
          </div>
        </div>

        {/* User / Officer Status Badge */}
        <div className="flex items-center space-x-3">
          {deficiencyCount > 0 && (
            <button 
              onClick={onOpenDeficiency}
              className="relative p-2 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition flex items-center space-x-1.5 text-xs font-semibold"
              title="Active Deficiencies"
            >
              <BadgeAlert className="w-4 h-4 text-rose-600" />
              <span>{deficiencyCount} Deficiency Flagged</span>
            </button>
          )}

          <div className={`p-2 rounded-xl border flex items-center space-x-2 ${contrast ? 'bg-zinc-900 border-yellow-500' : 'bg-blue-50/70 border-blue-200'}`}>
            <div className="w-8 h-8 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-xs shadow-inner">
              {currentRole === 'applicant' ? 'SH' : 'MO'}
            </div>
            <div className="text-left text-xs leading-tight pr-1">
              <div className="font-bold text-blue-950">
                {currentRole === 'applicant' ? 'Shanti Madkam (Scholar)' : 'Dr. R. K. Murmu (Scrutiny Dir)'}
              </div>
              <div className="text-[10px] text-slate-500 flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>{currentRole === 'applicant' ? 'NOS Scholar 2026' : 'MoTA Fellowship Div, New Delhi'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs - Role & Feature Switcher */}
      <div className={`border-t overflow-x-auto ${contrast ? 'bg-black border-zinc-800' : 'bg-slate-50/90 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 flex space-x-1 py-1.5">
          {roles.map((r) => {
            const Icon = r.icon;
            const isActive = currentRole === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setRole(r.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? contrast 
                      ? 'bg-yellow-400 text-black shadow-sm font-bold'
                      : 'bg-blue-900 text-white shadow-sm ring-1 ring-blue-950'
                    : contrast
                      ? 'text-yellow-300 hover:bg-zinc-800'
                      : 'text-slate-700 hover:bg-slate-200/70 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? (contrast ? 'text-black' : 'text-amber-300') : 'text-slate-500'}`} />
                <span>{r.label}</span>
                {r.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-medium ${
                    isActive 
                      ? 'bg-blue-800 text-amber-200 border border-blue-700' 
                      : 'bg-slate-200 text-slate-700'
                  }`}>
                    {r.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
