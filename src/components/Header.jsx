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
  GraduationCap, 
  Wifi, 
  WifiOff, 
  Layers, 
  HelpCircle,
  ShieldAlert,
  Sliders,
  Award,
  LogOut,
  User,
  BookOpen
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
  lowBandwidth,
  setLowBandwidth,
  deficiencyCount = 0,
  authUser,
  onLogout,
  onOpenDeficiency,
  onOpenNotifications,
  onOpenGrievances,
  onOpenManual
}) {
  const t = I18N[lang] || I18N.en;

  const isStudent = authUser?.type === 'student';
  const isAdmin = authUser?.type === 'admin';

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
          <span className="hidden lg:inline text-xs font-mono font-bold bg-blue-100 text-blue-900 border border-blue-200 px-2 py-0.2 rounded">
            National Scholarship & Fellowship Division
          </span>
        </div>

        <div className="flex items-center space-x-3 mt-1 sm:mt-0">
          {/* Low Bandwidth / Data Saver Mode Toggle */}
          <button
            onClick={() => setLowBandwidth(!lowBandwidth)}
            className={`flex items-center space-x-1 px-2 py-0.5 rounded border text-xs font-medium transition ${
              lowBandwidth ? 'bg-amber-100 text-amber-900 border-amber-300' : 'bg-white text-slate-600 hover:bg-slate-50'
            }`}
            title="Toggle Low Connectivity / 2G Remote Area Mode"
          >
            {lowBandwidth ? <WifiOff className="w-3.5 h-3.5 text-amber-700" /> : <Wifi className="w-3.5 h-3.5 text-slate-500" />}
            <span className="hidden sm:inline">{lowBandwidth ? 'Low-Bandwidth (Active)' : 'Data Saver'}</span>
          </button>

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
        </div>
      </div>

      {/* Main Brand Section */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          {/* Emblem & Ashoka Chakra Simulation */}
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-900 to-indigo-950 text-white flex flex-col items-center justify-center shadow-md p-1 border-2 border-amber-400 shrink-0">
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
              <span className={`text-xs px-2.5 py-0.5 rounded-full border font-bold flex items-center space-x-1 ${
                isStudent ? 'bg-blue-100 text-blue-950 border-blue-300' : 'bg-purple-100 text-purple-950 border-purple-300'
              }`}>
                {isStudent ? <GraduationCap className="w-3.5 h-3.5 text-blue-700" /> : <ShieldAlert className="w-3.5 h-3.5 text-purple-700" />}
                <span>{isStudent ? 'Scholar & Applicant Desk' : 'Ministry Administrative Workspace'}</span>
              </span>
            </div>
            <p className={`text-xs ${contrast ? 'text-yellow-200' : 'text-slate-600'} font-medium`}>
              AI-Powered End-to-End Scholarship & Fellowship Governance Ecosystem • <span className="text-orange-600 font-semibold">NFST | NOS | Top-Class ST</span>
            </p>
          </div>
        </div>

        {/* Action Controls & Authenticated User Status */}
        <div className="flex items-center space-x-2.5">
          {/* Official Governance Manual Button */}
          <button
            onClick={onOpenManual}
            className="flex items-center space-x-1.5 px-3 py-2 bg-gradient-to-r from-blue-900 to-indigo-900 hover:from-blue-800 hover:to-indigo-800 text-white rounded-xl text-xs font-bold shadow-md transition"
            title="Open National Portal Architecture & Governance Framework"
          >
            <BookOpen className="w-4 h-4 text-amber-300" />
            <span className="hidden sm:inline">Governance Manual</span>
          </button>

          {/* Grievance Desk Button (Student mode) */}
          {isStudent && (
            <button
              onClick={onOpenGrievances}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
              title="MoTA Grievance Redressal Desk"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          )}

          {/* Notification Bell */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
            title="Multi-Channel Notifications (SMS/Email/Portal)"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-600 animate-ping"></span>
          </button>

          {/* Deficiency Badge if any (Student mode) */}
          {isStudent && deficiencyCount > 0 && (
            <button 
              onClick={onOpenDeficiency}
              className="relative p-2 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition flex items-center space-x-1.5 text-xs font-semibold"
              title="Active Deficiencies"
            >
              <BadgeAlert className="w-4 h-4 text-rose-600" />
              <span className="hidden sm:inline">{deficiencyCount} Deficiency</span>
            </button>
          )}

          {/* Authenticated User Card */}
          <div className={`p-2 rounded-xl border flex items-center space-x-2.5 ${contrast ? 'bg-zinc-900 border-yellow-500' : 'bg-slate-50 border-slate-300'}`}>
            <div className={`w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-xs shadow-inner ${
              isStudent ? 'bg-blue-900' : 'bg-purple-950'
            }`}>
              {isStudent ? 'ST' : 'OFF'}
            </div>
            <div className="text-left text-xs leading-tight pr-1">
              <div className="font-bold text-slate-900 line-clamp-1 max-w-[150px]">
                {authUser?.user?.name || 'Authenticated User'}
              </div>
              <div className="text-[10px] text-slate-500 flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span className="line-clamp-1 max-w-[140px]">
                  {isStudent ? `ID: ${authUser?.user?.id || 'Scholar'}` : authUser?.user?.roleLabel || 'Official'}
                </span>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition ml-1"
              title="Sign Out to Login Portal"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Role-Specific Navigation Bar */}
      {/* 1. If Administrator: Show Admin Workspace Navigation */}
      {isAdmin && (
        <div className="bg-slate-900 text-white px-4 py-1.5 border-t border-slate-800">
          <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto text-xs">
            <div className="flex items-center space-x-1">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wide mr-2">
                Administrative Workspace:
              </span>
              {[
                { id: 'analytics', label: 'Executive Analytics & GIS', icon: BarChart3 },
                { id: 'scrutiny', label: 'AI Scrutiny Desk (Dual-Pane)', icon: FileCheck2 },
                { id: 'triage', label: 'AI Triage & Anomalies', icon: ShieldAlert },
                { id: 'merit', label: 'Merit & Quota Engine', icon: Award },
                { id: 'dbt', label: 'Post-Selection & DBT Hub', icon: Landmark },
                { id: 'config', label: 'Scheme Config & 10k Simulator', icon: SlidersHorizontal },
                { id: 'whatif', label: 'What-If Policy DSS', icon: Sliders }
              ].map(sub => {
                const isSubActive = currentRole === sub.id;
                const Icon = sub.icon;
                return (
                  <button
                    key={sub.id}
                    onClick={() => setRole(sub.id)}
                    className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
                      isSubActive 
                        ? 'bg-blue-600 text-white font-bold shadow-xs' 
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{sub.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 2. If Student: Show clean breadcrumb or indicator */}
      {isStudent && (
        <div className="bg-blue-50/60 px-4 py-1.5 border-t border-blue-200">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-blue-950 font-medium">
            <div className="flex items-center space-x-2">
              <span className="font-bold">Applicant Dashboard</span>
              <span>•</span>
              <span>Scheme: <strong className="text-blue-900">{authUser?.user?.schemeId || 'NFST'}</strong></span>
              <span>•</span>
              <span>Tribe: <strong>{authUser?.user?.tribe}</strong> {authUser?.user?.pvtg ? '(PVTG Affirmative Action Active)' : ''}</span>
            </div>
            <div className="text-[11px] text-emerald-700 font-semibold flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Session Authenticated via Jan Parichay DigiLocker</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
