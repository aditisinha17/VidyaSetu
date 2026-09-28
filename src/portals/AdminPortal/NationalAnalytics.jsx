import React, { useState } from 'react';
import { 
  BarChart3, 
  MapPin, 
  TrendingUp, 
  Clock, 
  Users, 
  Landmark, 
  Sparkles, 
  ShieldAlert, 
  PieChart,
  Download,
  AlertTriangle,
  Lightbulb,
  FileCheck2,
  CheckCircle2
} from 'lucide-react';
import { NATIONAL_ANALYTICS_DATA } from '../../data/mockData';

export function NationalAnalytics() {
  const data = NATIONAL_ANALYTICS_DATA;
  const [selectedState, setSelectedState] = useState(data.statePerformance[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 animate-in fade-in">
      {/* Title */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-black text-slate-900 font-serif">Ministry Executive Intelligence & Analytics</h1>
            <span className="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold border border-emerald-300">
              Live National MoTA Portal
            </span>
          </div>
          <p className="text-xs text-slate-600">
            Real-time Monitoring of Turnaround Times, PVTG Inclusion, and Scheme Performance
          </p>
        </div>

        <button 
          onClick={() => window.print()}
          className="flex items-center space-x-2 px-4 py-2 border border-slate-300 rounded-xl text-xs font-bold hover:bg-slate-50 transition shadow-xs"
        >
          <Download className="w-4 h-4 text-slate-600" />
          <span>Export Ministry PDF Report</span>
        </button>
      </div>

      {/* Primary 5 Key KPIs (Exact numbers from PS recommendation) */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5 text-xs">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="text-slate-500 font-semibold">Total Applications</div>
          <div className="text-2xl font-black text-slate-900 mt-1 font-mono">
            {data.totalApplications.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Across 3 central schemes</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="text-slate-500 font-semibold">Under Verification</div>
          <div className="text-2xl font-black text-blue-900 mt-1 font-mono">
            {data.underVerification.toLocaleString()}
          </div>
          <div className="text-[10px] text-blue-700 mt-1">In scrutiny & screening</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="text-slate-500 font-semibold">Deficient Flagged</div>
          <div className="text-2xl font-black text-rose-600 mt-1 font-mono">
            {data.deficienciesIdentified.toLocaleString()}
          </div>
          <div className="text-[10px] text-rose-600 mt-1">15-day resolution window</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="text-slate-500 font-semibold">Total Selected</div>
          <div className="text-2xl font-black text-emerald-700 mt-1 font-mono">
            {data.totalSelected.toLocaleString()}
          </div>
          <div className="text-[10px] text-emerald-700 mt-1">Sanction orders dispatched</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="text-slate-500 font-semibold">Pending Disbursement</div>
          <div className="text-2xl font-black text-amber-700 mt-1 font-mono">
            {data.pendingDisbursement.toLocaleString()}
          </div>
          <div className="text-[10px] text-amber-700 mt-1">Awaiting guide QPR approval</div>
        </div>
      </div>

      {/* Scheme Performance Breakdown Strip */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center space-x-2">
          <BarChart3 className="w-4 h-4 text-blue-900" />
          <span>Scheme Performance Breakdown (NFST vs NOS vs Top-Class ST)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {data.schemeBreakdown.map((s) => (
            <div key={s.scheme} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm text-blue-950">{s.scheme}</span>
                <span className="font-mono font-bold text-emerald-700">₹{s.fundsCr} Cr</span>
              </div>
              <div className="space-y-1 text-slate-600 font-medium">
                <div className="flex justify-between">
                  <span>Applications Intake:</span>
                  <strong className="text-slate-900 font-mono">{s.applications.toLocaleString()}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Verified Clean:</span>
                  <strong className="text-slate-900 font-mono">{s.verified.toLocaleString()}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Awarded Scholars:</span>
                  <strong className="text-emerald-700 font-mono">{s.selected.toLocaleString()}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Actionable Insights Banner */}
      <div className="bg-gradient-to-r from-purple-950 to-indigo-950 text-white rounded-2xl p-5 shadow-md space-y-3">
        <div className="flex items-center space-x-2 text-xs font-bold text-amber-300">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>AI Ministry Actionable Intelligence</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {data.aiInsights.map((insight, i) => (
            <div key={i} className="p-3.5 bg-white/10 rounded-xl border border-white/10 space-y-1.5">
              <div className="font-bold text-white flex items-center space-x-1.5">
                <Lightbulb className="w-4 h-4 text-amber-300" />
                <span>{insight.title}</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                {insight.description}
              </p>
              <div className="text-[11px] text-amber-300 font-semibold pt-1 border-t border-white/10">
                Action: {insight.suggestedAction}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid: Heatmap & State Drill-Down + TAT Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* State Performance Breakdown (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-blue-900" />
                <span>State & District Geographic Intelligence Map</span>
              </h3>
              <p className="text-xs text-slate-500">Click any state to drill down into tribal district coverage</p>
            </div>
          </div>

          <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
            {data.statePerformance.map((st) => {
              const isSelected = selectedState.state === st.state;
              const percentOfMax = (st.applications / 4000) * 100;

              return (
                <div
                  key={st.state}
                  onClick={() => setSelectedState(st)}
                  className={`p-3 rounded-xl border cursor-pointer transition ${
                    isSelected
                      ? 'bg-blue-50/80 border-blue-900 shadow-xs ring-1 ring-blue-900/30'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-900">{st.state}</span>
                    <span className="font-mono font-bold text-blue-950">{st.applications.toLocaleString()} Apps</span>
                  </div>

                  {/* Progress visualization */}
                  <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden">
                    <div
                      className="bg-blue-900 h-full rounded-full transition-all"
                      style={{ width: `${percentOfMax}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center text-[11px] text-slate-500 mt-1.5 font-medium">
                    <span>Selected: <strong className="text-emerald-700">{st.selected} Scholars</strong></span>
                    <span>DBT: <strong className="text-slate-800">₹{st.fundsCr} Cr</strong></span>
                    <span>PVTG: <strong className="text-purple-700">{st.pvtgCount}</strong></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected State Deep-Dive & TAT Comparison (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Selected State Detail Card */}
          <div className="bg-gradient-to-br from-blue-950 to-indigo-900 text-white rounded-2xl p-5 shadow-md space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400">State Snapshot</span>
                <h4 className="text-lg font-bold font-serif">{selectedState.state}</h4>
              </div>
              <span className="text-xs bg-white/10 px-2 py-0.5 rounded font-mono">
                ₹{selectedState.fundsCr} Cr Disbursed
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white/10 rounded-xl">
                <div className="text-[10px] text-slate-300">Total Applicants</div>
                <div className="text-xl font-bold font-mono text-white mt-1">
                  {selectedState.applications.toLocaleString()}
                </div>
              </div>

              <div className="p-3 bg-white/10 rounded-xl">
                <div className="text-[10px] text-slate-300">Awarded Scholars</div>
                <div className="text-xl font-bold font-mono text-amber-300 mt-1">
                  {selectedState.selected}
                </div>
              </div>
            </div>

            <div className="text-xs text-blue-200">
              PVTG Beneficiaries in {selectedState.state}: <strong className="text-white">{selectedState.pvtgCount} scholars</strong>
            </div>
          </div>

          {/* Turnaround Time (TAT) Comparison Graph */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center space-x-1.5">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>Turnaround Time: Manual Paper Era vs AI VidyaSetu</span>
            </h4>

            <div className="space-y-3 pt-2 text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-600">Manual Paper Scrutiny (Pre-2026):</span>
                  <span className="font-bold text-rose-600">124 Days Avg</span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-900 font-semibold">VidyaSetu AI-Enabled Scrutiny:</span>
                  <span className="font-bold text-emerald-600">14 Days Avg (88% drop)</span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full" style={{ width: '11.3%' }}></div>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 pt-1">
              Automated OCR & gazette cross-referencing resolves 74% of clean applications within 48 hours without repeated manual paperwork.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
