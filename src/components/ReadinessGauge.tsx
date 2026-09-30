"use client";

import React from "react";
import {
  Award,
  Zap,
  CheckCircle,
  TrendingUp,
  Brain,
  FileCheck,
  Users,
  Sparkles,
  RefreshCw
} from "lucide-react";
import { ReadinessBreakdown } from "@/types";

interface ReadinessGaugeProps {
  breakdown: ReadinessBreakdown;
  onRefreshAssessment: () => void;
  isLoading: boolean;
  provider: string;
}

export default function ReadinessGauge({
  breakdown,
  onRefreshAssessment,
  isLoading,
  provider
}: ReadinessGaugeProps) {
  // Circular gauge calculations
  const radius = 72;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (breakdown.overallScore / 100) * circumference;

  // Determine color based on score
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-400";
    if (score >= 65) return "text-indigo-400";
    return "text-amber-400";
  };

  return (
    <div className="glass-card p-6 md:p-8 rounded-2xl border border-slate-800 relative overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Title & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Award className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-bold text-white font-outfit">
              Employability Readiness Index
            </h2>
            <span className="px-2 py-0.5 text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full">
              Live Evaluation
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Algorithmic score synthesizing technical skills, resume depth, and peer benchmark percentiles
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{provider}</span>
          </div>

          <button
            onClick={onRefreshAssessment}
            disabled={isLoading}
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors disabled:opacity-50"
            title="Recalculate Employability Index"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-indigo-400" : ""}`} />
          </button>
        </div>
      </div>

      {/* Main Content: Circular Gauge + Sub-breakdowns */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Circular Gauge */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-4">
          <div className="relative w-56 h-56 flex items-center justify-center">
            {/* SVG circular track and fill */}
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 180 180">
              {/* Background circle */}
              <circle
                cx="90"
                cy="90"
                r={radius}
                className="text-slate-800/80"
                strokeWidth="14"
                stroke="currentColor"
                fill="transparent"
              />
              {/* Gradient definition */}
              <defs>
                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="50%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
              {/* Foreground progress circle */}
              <circle
                cx="90"
                cy="90"
                r={radius}
                stroke="url(#scoreGradient)"
                strokeWidth="14"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>

            {/* Inner Content inside circle */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Overall Index
              </span>
              <div className="flex items-baseline justify-center">
                <span className="text-4xl font-extrabold text-white font-outfit tracking-tight">
                  {breakdown.overallScore}
                </span>
                <span className="text-base font-semibold text-slate-500">/100</span>
              </div>
              <div className="mt-1 flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                <TrendingUp className="w-3 h-3 text-cyan-400" />
                <span>Top {100 - breakdown.percentile}% Tier</span>
              </div>
            </div>
          </div>

          <div className="mt-4 text-center">
            <span className="text-sm font-bold text-white tracking-wide">
              {breakdown.verdict}
            </span>
            <div className="text-xs text-slate-400 mt-0.5">
              Ranked in the <strong>{breakdown.percentile}th percentile</strong> of registered candidates
            </div>
          </div>
        </div>

        {/* Right: Sub-breakdowns with explicit progress bars */}
        <div className="lg:col-span-7 space-y-5">
          {/* Sub-breakdown 1: Technical Fit */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <div className="flex items-center gap-2 text-slate-200">
                <div className="p-1.5 rounded-md bg-blue-500/20 text-blue-400">
                  <Brain className="w-3.5 h-3.5" />
                </div>
                <span>Technical Fit (Domain Skills & Academic GPA)</span>
              </div>
              <span className="text-cyan-400 font-bold font-mono">{breakdown.technicalFit}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-700"
                style={{ width: `${breakdown.technicalFit}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400">
              Evaluates core curriculum alignment, data frameworks, and practical project stack coverage.
            </p>
          </div>

          {/* Sub-breakdown 2: Resume Strength */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <div className="flex items-center gap-2 text-slate-200">
                <div className="p-1.5 rounded-md bg-purple-500/20 text-purple-400">
                  <FileCheck className="w-3.5 h-3.5" />
                </div>
                <span>Resume Strength (STAR Metric Optimization)</span>
              </div>
              <span className="text-purple-400 font-bold font-mono">{breakdown.resumeStrength}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-700"
                style={{ width: `${breakdown.resumeStrength}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400">
              Assesses quantified dollar/latency impact, action verb velocity, and ATS parseability.
            </p>
          </div>

          {/* Sub-breakdown 3: Soft Skills */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <div className="flex items-center gap-2 text-slate-200">
                <div className="p-1.5 rounded-md bg-emerald-500/20 text-emerald-400">
                  <Users className="w-3.5 h-3.5" />
                </div>
                <span>Soft Skills & Behavioral Articulation</span>
              </div>
              <span className="text-emerald-400 font-bold font-mono">{breakdown.softSkills}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full transition-all duration-700"
                style={{ width: `${breakdown.softSkills}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400">
              Measures stakeholder communication, cross-functional conflict resolution, and behavioral readiness.
            </p>
          </div>

          {/* AI Synthesis Callout */}
          <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-800/40 flex items-start gap-3">
            <Zap className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <p className="text-xs text-indigo-200/90 leading-relaxed">
              {breakdown.summary}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
