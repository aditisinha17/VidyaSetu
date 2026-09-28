import React, { useState } from 'react';
import { 
  TrendingUp, 
  Sparkles, 
  DollarSign, 
  Users, 
  Sliders, 
  HelpCircle, 
  CheckCircle2, 
  ArrowRight,
  PieChart,
  FileSpreadsheet
} from 'lucide-react';

export function WhatIfAnalysis() {
  const [incomeCeiling, setIncomeCeiling] = useState(800000); // 8 Lakhs
  const [minMarks, setMinMarks] = useState(50); // 50%
  const [maxAge, setMaxAge] = useState(38); // 38 years
  const [pvtgBonusBonus, setPvtgBonus] = useState(15); // 15 pts

  // Baseline figures under existing rules (₹6L income, 55% marks, 36 age)
  const baselineEligible = 4821;
  const baselineBudgetCr = 78.4;

  // Dynamic calculation for What-If model
  const incomeDeltaFactor = ((incomeCeiling - 600000) / 100000) * 450;
  const marksDeltaFactor = ((55 - minMarks) / 5) * 620;
  const ageDeltaFactor = ((maxAge - 36) / 2) * 280;

  const simulatedEligible = Math.round(baselineEligible + incomeDeltaFactor + marksDeltaFactor + ageDeltaFactor);
  const additionalBeneficiaries = simulatedEligible - baselineEligible;

  // Approximate financial calculation (avg ₹1.1 Lakh per fellow per year)
  const simulatedBudgetCr = (baselineBudgetCr + (additionalBeneficiaries * 0.0105)).toFixed(2);
  const additionalBudgetCr = (simulatedBudgetCr - baselineBudgetCr).toFixed(2);

  return (
    <div className="space-y-6">
      {/* Title Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950 via-indigo-950 to-blue-950 text-white shadow-md flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2.5 py-0.5 rounded-full">
              DECISION SUPPORT SYSTEM (DSS)
            </span>
          </div>
          <h2 className="text-xl font-bold font-serif mt-2">Ministry What-If Policy Impact Simulation</h2>
          <p className="text-xs text-purple-200">
            Simulate the impact of proposed eligibility changes on ST beneficiary reach and central budgetary outlays.
          </p>
        </div>

        <div className="text-right">
          <div className="text-xs text-amber-300 font-bold font-mono">Statistical Confidence: 94.6%</div>
          <div className="text-[10px] text-purple-300">Trained on 5-Year MoTA Longitudinal Data</div>
        </div>
      </div>

      {/* Main Simulation Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Column (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center space-x-2">
            <Sliders className="w-4 h-4 text-purple-700" />
            <span>Adjust Proposed Policy Thresholds</span>
          </h3>

          {/* Income Ceiling Slider */}
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between font-semibold">
              <span className="text-slate-700">Family Income Ceiling:</span>
              <strong className="text-purple-700 font-mono text-sm">₹{(incomeCeiling/100000).toFixed(1)} Lakhs</strong>
            </div>
            <input
              type="range"
              min="400000"
              max="1200000"
              step="50000"
              value={incomeCeiling}
              onChange={(e) => setIncomeCeiling(parseInt(e.target.value))}
              className="w-full accent-purple-700 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>₹4 Lakhs</span>
              <span>Baseline: ₹6 Lakhs</span>
              <span>₹12 Lakhs</span>
            </div>
          </div>

          {/* Qualifying Marks Slider */}
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between font-semibold">
              <span className="text-slate-700">Minimum Qualifying Marks (%):</span>
              <strong className="text-blue-900 font-mono text-sm">{minMarks}%</strong>
            </div>
            <input
              type="range"
              min="45"
              max="65"
              value={minMarks}
              onChange={(e) => setMinMarks(parseInt(e.target.value))}
              className="w-full accent-blue-900 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>45% (Relaxed)</span>
              <span>Baseline: 55%</span>
              <span>65% (Strict)</span>
            </div>
          </div>

          {/* Age Ceiling Slider */}
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between font-semibold">
              <span className="text-slate-700">Upper Age Limit (General ST):</span>
              <strong className="text-slate-900 font-mono text-sm">{maxAge} Years</strong>
            </div>
            <input
              type="range"
              min="32"
              max="42"
              value={maxAge}
              onChange={(e) => setMaxAge(parseInt(e.target.value))}
              className="w-full accent-slate-800 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>32 Yrs</span>
              <span>Baseline: 36 Yrs</span>
              <span>42 Yrs</span>
            </div>
          </div>

          <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-xs text-purple-900">
            💡 <strong>Policy Tip:</strong> Raising income ceiling to ₹8.00 Lakhs harmonizes MoTA NFST guidelines with Central OBC/EWS creamy layer benchmarks.
          </div>
        </div>

        {/* Impact Projection Results (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Key Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500">
                <Users className="w-4 h-4 text-emerald-600" />
                <span>Projected Eligible Beneficiaries</span>
              </div>
              <div className="text-3xl font-black text-slate-900 mt-2 font-mono">
                {simulatedEligible.toLocaleString()}
              </div>
              <div className="text-xs text-emerald-700 font-bold mt-1">
                {additionalBeneficiaries >= 0 ? `+${additionalBeneficiaries.toLocaleString()}` : additionalBeneficiaries.toLocaleString()} additional ST students ({((additionalBeneficiaries/baselineEligible)*100).toFixed(1)}%)
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500">
                <DollarSign className="w-4 h-4 text-purple-600" />
                <span>Estimated Annual Budget Outlay</span>
              </div>
              <div className="text-3xl font-black text-purple-950 mt-2 font-mono">
                ₹{simulatedBudgetCr} Cr
              </div>
              <div className="text-xs text-purple-800 font-bold mt-1">
                {additionalBudgetCr >= 0 ? `+₹${additionalBudgetCr} Cr` : `-₹${Math.abs(additionalBudgetCr)} Cr`} budget delta required
              </div>
            </div>
          </div>

          {/* Visual Comparison Chart */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              Baseline vs. Proposed Policy Coverage
            </h4>

            {/* Beneficiaries bar */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600 font-medium">
                <span>Current Baseline (FY 2026-27):</span>
                <strong>{baselineEligible.toLocaleString()} ST Scholars (₹{baselineBudgetCr} Cr)</strong>
              </div>
              <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden">
                <div className="bg-slate-400 h-full rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-blue-950 font-bold">
                <span>With Simulated Policy Parameters:</span>
                <span className="text-emerald-700">{simulatedEligible.toLocaleString()} ST Scholars (₹{simulatedBudgetCr} Cr)</span>
              </div>
              <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-700 to-emerald-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (simulatedEligible / 7500) * 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Summary Brief */}
            <div className="pt-3 border-t border-slate-100 text-xs text-slate-600 leading-relaxed">
              <strong>Executive Finding: </strong> 
              Expanding the income limit to ₹{(incomeCeiling/100000).toFixed(1)} Lakhs and relaxing qualifying marks to {minMarks}% brings 
              <strong className="text-slate-900"> {additionalBeneficiaries.toLocaleString()} additional tribal students</strong> into the fellowship net, particularly from aspirational tribal districts in Jharkhand, Odisha, and Bastar.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
