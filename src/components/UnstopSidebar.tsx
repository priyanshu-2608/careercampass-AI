"use client";

import React from "react";
import {
  Home,
  UserCheck,
  Compass,
  BarChart3,
  BookOpen,
  Briefcase,
  FileEdit,
  Mic,
  Building2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Zap,
  GraduationCap
} from "lucide-react";
import { CAREER_FIELDS } from "@/lib/data/mockData";

export interface NavItem {
  id: string;
  label: string;
  shortLabel: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: string;
  description: string;
}

export const SIDEBAR_NAV_ITEMS: NavItem[] = [
  {
    id: "dashboard",
    label: "Home / Dashboard",
    shortLabel: "Dashboard",
    icon: Home,
    badge: "78/100",
    badgeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
    description: "Readiness score & quick action widgets"
  },
  {
    id: "profile",
    label: "Profile & Academic Analyzer",
    shortLabel: "Academic Analyzer",
    icon: UserCheck,
    badge: "CGPA 8.8",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    description: "Resume PDF & academic records extraction"
  },
  {
    id: "roadmap",
    label: "Career Path Recommender",
    shortLabel: "Career Roadmap",
    icon: Compass,
    badge: "Phase 2",
    badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    description: "Target job role milestone pathway"
  },
  {
    id: "skill-gaps",
    label: "Skill Gap Diagnostics",
    shortLabel: "Skill Gaps",
    icon: BarChart3,
    badge: "4 Gaps",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    description: "Mastered skills vs identified skill gaps"
  },
  {
    id: "courses",
    label: "Course & Certification Finder",
    shortLabel: "Courses",
    icon: BookOpen,
    badge: "6 Curated",
    badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    description: "Coursera, edX, NPTEL & SWAYAM feeds"
  },
  {
    id: "jobs",
    label: "Job & Internship Matcher",
    shortLabel: "Jobs & Interns",
    icon: Briefcase,
    badge: "94% Match",
    badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    description: "Live opportunity cards with AI match score"
  },
  {
    id: "resume-optimizer",
    label: "AI Resume Optimizer",
    shortLabel: "AI Resume",
    icon: FileEdit,
    badge: "STAR AI",
    badgeColor: "bg-pink-500/20 text-pink-300 border-pink-500/30",
    description: "Quantified bullet point enhancer"
  },
  {
    id: "mock-interview",
    label: "AI Mock Interviewer",
    shortLabel: "Mock Interview",
    icon: Mic,
    badge: "1-10 Live",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    description: "Interactive scoring & answers feedback"
  },
  {
    id: "govt-feed",
    label: "Government Opportunities Feed",
    shortLabel: "Govt Schemes",
    icon: Building2,
    badge: "5 Schemes",
    badgeColor: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    description: "NATS, AICTE, DRDO, ISRO portals"
  }
];

interface UnstopSidebarProps {
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  selectedField: string;
  onSelectField: (field: string) => void;
}

export default function UnstopSidebar({
  activeTab,
  onSelectTab,
  isCollapsed,
  onToggleCollapse,
  selectedField,
  onSelectField
}: UnstopSidebarProps) {
  return (
    <aside
      className={`relative shrink-0 flex flex-col justify-between border-r border-slate-800 bg-[#070b14]/95 backdrop-blur-md transition-all duration-300 z-30 select-none ${
        isCollapsed ? "w-20" : "w-64 sm:w-72"
      }`}
    >
      {/* Top Header inside Sidebar: Collapse/Expand Control */}
      <div className="p-3 border-b border-slate-800/80 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center gap-2 pl-2">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Navigation Menu
            </span>
          </div>
        )}
        <button
          onClick={onToggleCollapse}
          className={`p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-all ${
            isCollapsed ? "mx-auto" : "ml-auto"
          }`}
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-indigo-400" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-slate-400" />
          )}
        </button>
      </div>

      {/* Main 9 Nav Items */}
      <div className="flex-1 py-3 px-2 space-y-1 overflow-y-auto">
        {SIDEBAR_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              title={isCollapsed ? `${item.label} — ${item.description}` : undefined}
              className={`w-full group relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left ${
                isActive
                  ? "bg-indigo-600/15 text-white font-semibold border border-indigo-500/30 shadow-sm shadow-indigo-500/10"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent"
              } ${isCollapsed ? "justify-center px-0 py-3" : ""}`}
            >
              {/* Left active accent bar */}
              {isActive && (
                <div className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r bg-indigo-500 shadow-sm shadow-indigo-400" />
              )}

              {/* Icon */}
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform ${
                  isActive
                    ? "bg-indigo-600/25 text-indigo-300 shadow-sm"
                    : "bg-slate-900/80 text-slate-400 group-hover:text-indigo-300 group-hover:scale-105"
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>

              {/* Label and Badge (Visible only when expanded) */}
              {!isCollapsed && (
                <div className="flex-1 min-w-0 flex items-center justify-between">
                  <div className="truncate">
                    <span className="text-xs truncate block">{item.label}</span>
                    <span className="text-[10px] text-slate-400 font-normal truncate block leading-tight">
                      {item.description}
                    </span>
                  </div>
                  {item.badge && (
                    <span
                      className={`ml-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full border shrink-0 ${item.badgeColor}`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Sidebar Footer: Fast Track Switcher & Gemini Status */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/60 space-y-2">
        {!isCollapsed ? (
          <>
            {/* Target Role Selector */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 flex items-center gap-1">
                <GraduationCap className="w-3 h-3 text-indigo-400" />
                Target Track:
              </label>
              <select
                value={selectedField}
                onChange={(e) => onSelectField(e.target.value)}
                className="w-full bg-slate-900 text-xs text-indigo-300 font-medium rounded-lg px-2.5 py-1.5 border border-slate-700/80 focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                {Object.keys(CAREER_FIELDS).map((key) => (
                  <option key={key} value={key} className="bg-slate-900 text-slate-200">
                    {CAREER_FIELDS[key].name}
                  </option>
                ))}
              </select>
            </div>

            {/* AI Status Badge */}
            <div className="flex items-center justify-between p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-[10px]">
              <div className="flex items-center gap-1.5 text-indigo-300 font-medium">
                <Sparkles className="w-3 h-3 text-cyan-400 animate-spin" />
                <span>Gemini 2.5 Flash</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2" title={`Target: ${selectedField}`}>
            <div className="w-7 h-7 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>
        )}
      </div>
    </aside>
  );
}
