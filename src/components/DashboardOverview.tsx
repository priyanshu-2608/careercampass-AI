"use client";

import React from "react";
import {
  Award,
  Zap,
  TrendingUp,
  FileCheck,
  Brain,
  Users,
  Sparkles,
  ArrowRight,
  UserCheck,
  BarChart3,
  BookOpen,
  Briefcase,
  FileEdit,
  Mic,
  Building2,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  ExternalLink
} from "lucide-react";
import { UserProfile, ReadinessBreakdown } from "@/types";

interface DashboardOverviewProps {
  profile: UserProfile;
  readiness: ReadinessBreakdown;
  onRefreshAssessment: () => void;
  isLoading: boolean;
  provider: string;
  onNavigateTab: (tabId: string) => void;
}

export default function DashboardOverview({
  profile,
  readiness,
  onRefreshAssessment,
  isLoading,
  provider,
  onNavigateTab
}: DashboardOverviewProps) {
  // Circular gauge calculations (Baseline score is 78 or dynamic from readiness)
  const score = readiness.overallScore || 78;
  const radius = 72;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const quickActionWidgets = [
    {
      id: "profile",
      title: "Upload & Parse Resume PDF",
      desc: "Extract structured skills & verify CGPA 8.8",
      icon: UserCheck,
      badge: "Academic Check",
      color: "from-blue-600/20 to-indigo-600/20 border-blue-500/30 text-blue-400"
    },
    {
      id: "skill-gaps",
      title: "Diagnose 4 Skill Gaps",
      desc: "Green mastered skills vs Amber gaps (MLOps, Docker)",
      icon: BarChart3,
      badge: "High Priority",
      color: "from-amber-600/20 to-orange-600/20 border-amber-500/30 text-amber-400"
    },
    {
      id: "jobs",
      title: "Top AI Matched Jobs",
      desc: "Google AI Intern (94% Match) & Razorpay",
      icon: Briefcase,
      badge: "6 New Matches",
      color: "from-purple-600/20 to-pink-600/20 border-purple-500/30 text-purple-400"
    },
    {
      id: "mock-interview",
      title: "Launch AI Mock Interview",
      desc: "1-10 real-time scoring with Gemini 2.5 Flash",
      icon: Mic,
      badge: "Live Simulator",
      color: "from-emerald-600/20 to-teal-600/20 border-emerald-500/30 text-emerald-400"
    },
    {
      id: "govt-feed",
      title: "Check Eligible Govt Schemes",
      desc: "DRDO, ISRO, AICTE & NATS portals matched",
      icon: Building2,
      badge: "5 Schemes Open",
      color: "from-cyan-600/20 to-blue-600/20 border-cyan-500/30 text-cyan-400"
    },
    {
      id: "resume-optimizer",
      title: "Optimize Bullet Points",
      desc: "Transform into quantified STAR-format statements",
      icon: FileEdit,
      badge: "ATS Ready",
      color: "from-pink-600/20 to-rose-600/20 border-pink-500/30 text-pink-400"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Welcome & Quick Profile Banner */}
      <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1.5px] shadow-lg shadow-indigo-500/20 shrink-0">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center font-bold text-white text-lg">
              {profile.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-white font-outfit">
                Welcome back, {profile.name}!
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {profile.targetRole}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>{profile.education}</span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold">CGPA: {profile.gpa}</span>
              <span>•</span>
              <span className="text-slate-300">
                {profile.university || "IIIT"} (Class of {profile.gradYear || "2026"})
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onNavigateTab("profile")}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 flex items-center gap-2 transition-all hover:scale-[1.02]"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Update Profile & GPA</span>
          </button>
        </div>
      </div>

      {/* Main Employability Readiness Index (78/100 Circular Gauge) */}
      <div className="glass-card p-6 md:p-8 rounded-2xl border border-slate-800 relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <Award className="w-4 h-4" />
              </div>
              <h2 className="text-xl font-bold text-white font-outfit">
                Employability Readiness Index
              </h2>
              <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full">
                78/100 Gauge
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Real-time multi-dimensional scoring evaluating technical stack, resume ATS strength, and peer benchmarks.
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
              title="Recalculate Readiness Index"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-indigo-400" : ""}`} />
            </button>
          </div>
        </div>

        {/* Gauge & Submetrics Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: 78/100 Circular Gauge */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-4">
            <div className="relative w-56 h-56 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 180 180">
                <circle
                  cx="90"
                  cy="90"
                  r={radius}
                  className="text-slate-800/80"
                  strokeWidth="14"
                  stroke="currentColor"
                  fill="transparent"
                />
                <circle
                  cx="90"
                  cy="90"
                  r={radius}
                  stroke="url(#readinessGradient)"
                  strokeWidth="14"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="readinessGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="50%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-4xl sm:text-5xl font-extrabold text-white font-outfit tracking-tight">
                  {score}
                </span>
                <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">
                  out of 100
                </span>
                <span className="mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {readiness.verdict || "Interview Ready"}
                </span>
              </div>
            </div>

            <div className="mt-4 text-center max-w-sm">
              <p className="text-xs text-slate-300 leading-relaxed">
                {readiness.summary ||
                  "Strong foundational technical competencies with high academic performance (CGPA 8.8). Closing gaps in MLOps will elevate you to the 90th percentile."}
              </p>
            </div>
          </div>

          {/* Right: Detailed 4-Pillar Breakdown */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Pillar 1: Technical Fit */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-indigo-500/15 flex items-center justify-center text-indigo-400">
                    <Brain className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-slate-200">Technical Skill Fit</span>
                </div>
                <span className="text-sm font-bold text-indigo-400">
                  {readiness.technicalFit || 84}%
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 mt-3 overflow-hidden">
                <div
                  className="bg-indigo-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${readiness.technicalFit || 84}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-400 mt-2 block">
                Python, SQL, ML mastered; MLOps & Docker pending
              </span>
            </div>

            {/* Pillar 2: Resume ATS Depth */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/15 flex items-center justify-center text-cyan-400">
                    <FileCheck className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-slate-200">Resume ATS Strength</span>
                </div>
                <span className="text-sm font-bold text-cyan-400">
                  {readiness.resumeStrength || 78}%
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 mt-3 overflow-hidden">
                <div
                  className="bg-cyan-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${readiness.resumeStrength || 78}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-400 mt-2 block">
                Quantified STAR format with $450K metric highlights
              </span>
            </div>

            {/* Pillar 3: Soft Skills & Interview */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-400">
                    <Users className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-slate-200">
                    Behavioral & Domain Fit
                  </span>
                </div>
                <span className="text-sm font-bold text-emerald-400">
                  {readiness.softSkills || 82}%
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 mt-3 overflow-hidden">
                <div
                  className="bg-emerald-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${readiness.softSkills || 82}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-400 mt-2 block">
                Bias-variance & stakeholder communication tested
              </span>
            </div>

            {/* Pillar 4: Peer Benchmark */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-purple-500/15 flex items-center justify-center text-purple-400">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-slate-200">Peer Percentile</span>
                </div>
                <span className="text-sm font-bold text-purple-400">
                  Top {100 - (readiness.percentile || 88)}%
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 mt-3 overflow-hidden">
                <div
                  className="bg-purple-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${readiness.percentile || 88}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-400 mt-2 block">
                Ahead of 88% of B.Tech 2026 CS/AI applicants
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Widgets Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-outfit">
            Quick Action Workspaces
          </h3>
          <span className="text-xs text-slate-500">Jump directly to any tab</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActionWidgets.map((widget) => {
            const Icon = widget.icon;
            return (
              <div
                key={widget.id}
                onClick={() => onNavigateTab(widget.id)}
                className="glass-card-hover p-4 rounded-xl bg-slate-900/70 border border-slate-800 cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <div
                      className={`w-9 h-9 rounded-xl bg-gradient-to-br flex items-center justify-center border ${widget.color}`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {widget.badge}
                    </span>
                  </div>
                  <h4 className="font-bold text-white text-sm group-hover:text-indigo-300 transition-colors">
                    {widget.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 leading-snug">{widget.desc}</p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-indigo-400 font-semibold group-hover:translate-x-1 transition-transform">
                  <span>Open workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
