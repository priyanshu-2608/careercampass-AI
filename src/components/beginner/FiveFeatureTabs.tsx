"use client";

import React from "react";
import {
  Compass,
  TrendingUp,
  GraduationCap,
  FileText,
  Briefcase
} from "lucide-react";

export type FeatureTabId =
  | "a-domain-analysis"
  | "b-skill-gap"
  | "c-courses"
  | "d-resume-analyser"
  | "e-jobs";

interface FiveFeatureTabsProps {
  activeTab: FeatureTabId;
  onSelectTab: (tabId: FeatureTabId) => void;
  domainName: string;
}

export default function FiveFeatureTabs({
  activeTab,
  onSelectTab,
  domainName
}: FiveFeatureTabsProps) {
  const features = [
    {
      id: "a-domain-analysis" as FeatureTabId,
      letter: "A",
      label: "Domain Analysis",
      subLabel: "Market demand & skills",
      icon: Compass
    },
    {
      id: "b-skill-gap" as FeatureTabId,
      letter: "B",
      label: "Career & Skill Gap",
      subLabel: "Checklist & roadmap",
      icon: TrendingUp
    },
    {
      id: "c-courses" as FeatureTabId,
      letter: "C",
      label: "Courses & Certificates",
      subLabel: "Free & NPTEL feeds",
      icon: GraduationCap
    },
    {
      id: "d-resume-analyser" as FeatureTabId,
      letter: "D",
      label: "AI Resume Analyser",
      subLabel: "1-100 score & keywords",
      icon: FileText
    },
    {
      id: "e-jobs" as FeatureTabId,
      letter: "E",
      label: "Internships & Jobs",
      subLabel: "Live domain openings",
      icon: Briefcase
    }
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between px-1">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          5 Core AI Features for {domainName}
        </span>
        <span className="text-xs text-blue-600 font-semibold">Click any icon below</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {features.map((f) => {
          const Icon = f.icon;
          const isActive = activeTab === f.id;

          return (
            <button
              key={f.id}
              onClick={() => onSelectTab(f.id)}
              className={`p-3.5 rounded-2xl border-2 transition-all flex flex-col items-center text-center group cursor-pointer ${
                isActive
                  ? "bg-blue-50/90 border-blue-600 shadow-md shadow-blue-500/10 scale-[1.02]"
                  : "bg-white border-slate-200/90 hover:border-blue-300 hover:bg-slate-50/80 shadow-sm"
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <span
                  className={`w-5 h-5 rounded-md text-[11px] font-extrabold flex items-center justify-center ${
                    isActive ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {f.letter}
                </span>

                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                )}
              </div>

              {/* Blue Icon inside light blue circle */}
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-2.5 transition-transform group-hover:scale-105 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "bg-blue-50 text-blue-600 group-hover:bg-blue-100"
                }`}
              >
                <Icon className="w-6 h-6" />
              </div>

              <h3
                className={`text-xs font-bold leading-tight ${
                  isActive ? "text-blue-900" : "text-slate-800"
                }`}
              >
                {f.label}
              </h3>

              <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                {f.subLabel}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
