"use client";

import React from "react";
import {
  Sparkles,
  UserCheck,
  Compass,
  BarChart3,
  BookOpen,
  Briefcase,
  FileEdit,
  Mic,
  Building2,
  Award,
  GraduationCap
} from "lucide-react";

export interface CategoryPill {
  id: string;
  label: string;
  icon: React.ElementType;
}

export const CATEGORY_PILLS: CategoryPill[] = [
  { id: "profile", label: "Profile Analysis", icon: UserCheck },
  { id: "roadmap", label: "Career Paths", icon: Compass },
  { id: "skill-gaps", label: "Skill Gaps", icon: BarChart3 },
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "jobs", label: "Jobs & Internships", icon: Briefcase },
  { id: "resume-optimizer", label: "AI Resume", icon: FileEdit },
  { id: "mock-interview", label: "Mock Interview", icon: Mic },
  { id: "govt-feed", label: "Govt Schemes", icon: Building2 }
];

interface WorkspaceHeroHeaderProps {
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  targetRole: string;
  gpa: string;
  overallScore: number;
}

export default function WorkspaceHeroHeader({
  activeTab,
  onSelectTab,
  targetRole,
  gpa,
  overallScore
}: WorkspaceHeroHeaderProps) {
  return (
    <div className="relative glass-card p-6 sm:p-8 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl space-y-6">
      {/* Decorative gradient flare */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-gradient-to-br from-indigo-600/20 via-cyan-500/15 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Titles */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
        <div className="space-y-2">
          {/* Unstop style badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-xs font-semibold text-indigo-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI-Powered Career Readiness & Employability Engine</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-outfit tracking-tight">
            Unlock Your Career Readiness!
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            AI-Powered Diagnostics, Skill Gap Roadmaps & Employability Engine tailored for{" "}
            <strong className="text-indigo-300">{targetRole}</strong>.
          </p>
        </div>

        {/* Quick Snapshot Metrics */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 shrink-0">
          <div className="px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-center shadow-sm">
            <span className="text-[10px] text-slate-400 block font-medium">Readiness Index</span>
            <span className="text-sm sm:text-base font-extrabold text-indigo-400 font-outfit">
              {overallScore}/100
            </span>
          </div>

          <div className="px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-center shadow-sm">
            <span className="text-[10px] text-slate-400 block font-medium">Academic CGPA</span>
            <span className="text-sm sm:text-base font-extrabold text-emerald-400 font-outfit">
              {gpa.split(" ")[0]}
            </span>
          </div>

          <div className="px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-center shadow-sm">
            <span className="text-[10px] text-slate-400 block font-medium">Peer Percentile</span>
            <span className="text-sm sm:text-base font-extrabold text-cyan-400 font-outfit">
              Top 12%
            </span>
          </div>
        </div>
      </div>

      {/* Top Horizontal Category Pills */}
      <div className="relative z-10 pt-2 border-t border-slate-800/80">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {/* Home / Overview pill */}
          <button
            onClick={() => onSelectTab("dashboard")}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === "dashboard"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 scale-[1.02]"
                : "bg-slate-900/90 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
            }`}
          >
            <span>Overview</span>
          </button>

          {/* Exact 8 Category Pills specified by user */}
          {CATEGORY_PILLS.map((pill) => {
            const Icon = pill.icon;
            const isActive = activeTab === pill.id;

            return (
              <button
                key={pill.id}
                onClick={() => onSelectTab(pill.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 scale-[1.02]"
                    : "bg-slate-900/90 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-cyan-300" : "text-slate-400"}`} />
                <span>{pill.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
