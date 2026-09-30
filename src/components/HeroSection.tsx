"use client";

import React from "react";
import {
  Compass,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Target,
  BookOpen,
  Award,
  ShieldCheck,
  Cpu,
  CheckCircle2,
  FileCheck2,
  Building2
} from "lucide-react";

interface HeroSectionProps {
  onOpenOnboarding: () => void;
  onExploreDashboard: () => void;
  targetRole: string;
}

export default function HeroSection({
  onOpenOnboarding,
  onExploreDashboard,
  targetRole
}: HeroSectionProps) {
  const highlights = [
    {
      title: "Job Role Exploration",
      description: "Map your degree and current technical competencies against tier-1 industry job descriptions and high-impact PSU engineering roles.",
      icon: Target,
      badge: "Market Aligned",
      accent: "from-blue-500/20 to-cyan-500/20",
      border: "hover:border-cyan-500/50",
      iconColor: "text-cyan-400"
    },
    {
      title: "Career Insights & Gap Analysis",
      description: "Get a transparent diagnostic of your Employability Readiness Index, with granular breakdowns across Technical Fit, Resume Depth, and Soft Skills.",
      icon: TrendingUp,
      badge: "Diagnostic Score",
      accent: "from-indigo-500/20 to-violet-500/20",
      border: "hover:border-indigo-500/50",
      iconColor: "text-indigo-400"
    },
    {
      title: "Personalized Recommendation",
      description: "Directly bridge your identified skill gaps through accredited Coursera, edX, and AICTE/NPTEL government-certified course pathways.",
      icon: BookOpen,
      badge: "Govt & Global Courses",
      accent: "from-emerald-500/20 to-teal-500/20",
      border: "hover:border-emerald-500/50",
      iconColor: "text-emerald-400"
    }
  ];

  return (
    <section id="hero" className="relative pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dynamic Animation Banner (Live Ticker / Badge Pill Carousel) */}
        <div className="mb-6 flex justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-indigo-500/30 shadow-lg shadow-indigo-500/10 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-medium text-slate-300">
              Powered by <span className="text-indigo-300 font-semibold">Gemini 2.5 Flash</span>
            </span>
            <span className="text-slate-600">•</span>
            <div className="flex items-center gap-1 text-[11px] text-cyan-300 font-medium bg-cyan-950/60 px-2 py-0.5 rounded-full border border-cyan-800/40">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>NATS & AICTE Portal Synced</span>
            </div>
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="text-center max-w-4xl mx-auto space-y-5">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-outfit text-white">
            Welcome to{" "}
            <span className="text-gradient">Career Readiness Platform</span>
          </h1>

          <p className="text-xl sm:text-2xl font-medium text-indigo-200/90 tracking-normal">
            Ready to discover your career path?
          </p>

          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Transition seamlessly from academic study to high-value employment. Calculate your
            real-time readiness index, identify exact curriculum gaps, enhance resume impact with
            quantified metrics, and train with simulated AI mock interviewers.
          </p>

          {/* Call to Actions */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onOpenOnboarding}
              id="cta-register-login-btn"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white shadow-xl shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group"
            >
              <span>Register / Login to Discover Path</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onExploreDashboard}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-medium text-sm text-slate-300 bg-slate-900/80 border border-slate-700/80 hover:bg-slate-800 hover:text-white transition-all flex items-center justify-center gap-2"
            >
              <span>Explore Active Target: {targetRole}</span>
            </button>
          </div>

          {/* Social Proof / Trust Badges */}
          <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
            <div className="glass-panel p-2.5 rounded-xl border border-slate-800 flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <div className="text-xs font-bold text-white">78/100</div>
                <div className="text-[10px] text-slate-400">Avg Candidate Readiness</div>
              </div>
            </div>
            <div className="glass-panel p-2.5 rounded-xl border border-slate-800 flex items-center gap-2.5">
              <FileCheck2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <div>
                <div className="text-xs font-bold text-white">STAR Format</div>
                <div className="text-[10px] text-slate-400">AI Resume Optimizer</div>
              </div>
            </div>
            <div className="glass-panel p-2.5 rounded-xl border border-slate-800 flex items-center gap-2.5">
              <Cpu className="w-4 h-4 text-violet-400 shrink-0" />
              <div>
                <div className="text-xs font-bold text-white">1–10 Rubric</div>
                <div className="text-[10px] text-slate-400">Live Mock Scoring</div>
              </div>
            </div>
            <div className="glass-panel p-2.5 rounded-xl border border-slate-800 flex items-center gap-2.5">
              <Building2 className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <div className="text-xs font-bold text-white">NATS & AICTE</div>
                <div className="text-[10px] text-slate-400">Govt Public Schemes</div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Highlight Cards (Job Role Exploration, Career Insights, Personalized Recommendation) */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`glass-card p-6 rounded-2xl border border-slate-800/90 relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5 ${item.border} group`}
              >
                {/* Glow accent in top-right */}
                <div
                  className={`absolute -top-12 -right-12 w-28 h-28 bg-gradient-to-br ${item.accent} rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500`}
                />

                <div className="relative z-10 flex flex-col h-full justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shadow-inner group-hover:border-slate-700 transition-colors">
                        <Icon className={`w-5 h-5 ${item.iconColor}`} />
                      </div>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700/60">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center gap-1.5 text-xs font-medium text-indigo-400 group-hover:text-indigo-300">
                    <span>Feature 0{idx + 1}</span>
                    <div className="w-8 h-[1px] bg-indigo-500/40" />
                    <span className="text-slate-500">Autonomous</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
