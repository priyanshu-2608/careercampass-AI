"use client";

import React, { useState } from "react";
import {
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Sparkles,
  BookOpen,
  Plus,
  ShieldCheck,
  Check,
  Zap,
  Info
} from "lucide-react";
import { UserProfile } from "@/types";
import { CAREER_FIELDS } from "@/lib/data/mockData";

interface SkillGapDiagnosticsProps {
  profile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
  onNavigateToCourses: (skill: string) => void;
}

export default function SkillGapDiagnostics({
  profile,
  onUpdateProfile,
  onNavigateToCourses
}: SkillGapDiagnosticsProps) {
  const [filterSeverity, setFilterSeverity] = useState<string>("all");

  const fieldConfig = CAREER_FIELDS[profile.field] || CAREER_FIELDS["Data Science"];
  const requiredSkills = fieldConfig.defaultRequiredSkills;

  // Mastered vs Missing Gaps
  const masteredSkills = requiredSkills.filter((req) =>
    profile.skills.some((s) => s.toLowerCase().trim() === req.toLowerCase().trim())
  );

  const missingSkills = requiredSkills.filter(
    (req) => !profile.skills.some((s) => s.toLowerCase().trim() === req.toLowerCase().trim())
  );

  // Skill benchmarks for comparison
  const benchmarkData = [
    { skill: "Python", student: 92, industry: 85, status: "Mastered" },
    { skill: "SQL & Databases", student: 88, industry: 80, status: "Mastered" },
    { skill: "Machine Learning (Scikit-Learn)", student: 82, industry: 78, status: "Mastered" },
    { skill: "Data Visualization & Tableau", student: 80, industry: 75, status: "Mastered" },
    { skill: "Deep Learning (PyTorch)", student: 42, industry: 75, status: "Gap" },
    { skill: "MLOps & Model Deployment", student: 28, industry: 70, status: "Critical Gap" },
    { skill: "Statistics & Probability", student: 55, industry: 72, status: "Gap" },
    { skill: "Generative AI & LLMs", student: 38, industry: 70, status: "Critical Gap" }
  ];

  const handleMarkSkillAcquired = (skill: string) => {
    if (!profile.skills.includes(skill)) {
      const updatedProfile = {
        ...profile,
        skills: [...profile.skills, skill]
      };
      onUpdateProfile(updatedProfile);
    }
  };

  const handleRemoveMasteredSkill = (skill: string) => {
    const updatedProfile = {
      ...profile,
      skills: profile.skills.filter((s) => s !== skill)
    };
    onUpdateProfile(updatedProfile);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <BarChart3 className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-bold text-white font-outfit">
              Skill Gap Diagnostics & Employability Matrix
            </h2>
            <span className="px-2 py-0.5 text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full">
              {profile.targetRole}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Visual dashboard highlighting Mastered Skills (green badges) vs Identified Skill Gaps (amber badges).
          </p>
        </div>

        {/* Quick Ratio Counter */}
        <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-800 p-2 rounded-xl text-xs">
          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>{masteredSkills.length} Mastered</span>
          </div>
          <div className="h-4 w-[1px] bg-slate-700" />
          <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
            <AlertTriangle className="w-4 h-4" />
            <span>{missingSkills.length} Gaps</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Mastered vs Gaps */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ================= Mastered Skills (Green Badges) ================= */}
        <div className="glass-card p-5 sm:p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-white font-outfit">
                Mastered Skills
              </h3>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
              {masteredSkills.length} Verified
            </span>
          </div>

          <p className="text-xs text-slate-400">
            These competencies exceed minimum candidate baseline requirements for{" "}
            <strong className="text-slate-200">{profile.targetRole}</strong>.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {masteredSkills.map((skill) => (
              <div
                key={skill}
                className="p-3 rounded-xl bg-slate-900/90 border border-emerald-500/30 hover:border-emerald-500/60 transition-all flex flex-col justify-between group"
              >
                <div className="flex items-start justify-between">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-emerald-400" />
                    {skill}
                  </span>
                  <button
                    onClick={() => handleRemoveMasteredSkill(skill)}
                    className="text-[10px] text-slate-500 hover:text-rose-400 transition-colors opacity-0 group-hover:opacity-100"
                    title="Toggle off to test gap"
                  >
                    Reset
                  </button>
                </div>

                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                  <span>ATS Match: Strong</span>
                  <span className="text-emerald-400 font-semibold">90%+ Fit</span>
                </div>
              </div>
            ))}
          </div>

          {masteredSkills.length === 0 && (
            <div className="p-6 text-center text-slate-400 text-xs border border-dashed border-slate-800 rounded-xl">
              No skills currently matched. Check your profile skills list.
            </div>
          )}
        </div>

        {/* ================= Identified Skill Gaps (Amber Badges) ================= */}
        <div className="glass-card p-5 sm:p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-white font-outfit">
                Identified Skill Gaps
              </h3>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
              {missingSkills.length} Action Items
            </span>
          </div>

          <p className="text-xs text-slate-400">
            Critical high-demand competencies missing from your profile. Closing these gaps will elevate your Employability Index from 78 to 92+.
          </p>

          <div className="space-y-3">
            {missingSkills.map((gap) => (
              <div
                key={gap}
                className="p-3.5 rounded-xl bg-slate-900/90 border border-amber-500/30 hover:border-amber-500/60 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
                      <AlertTriangle className="w-3 h-3 text-amber-400" />
                      {gap}
                    </span>
                    <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded font-semibold border border-amber-500/20">
                      High Priority Gap
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 block">
                    Direct impact: +5.5% Employability Index boost
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {/* Mark as Learned Toggle for Live Demo */}
                  <button
                    onClick={() => handleMarkSkillAcquired(gap)}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-emerald-600/30 text-slate-300 hover:text-emerald-300 border border-slate-700 transition-colors flex items-center gap-1"
                    title="Simulate acquiring this skill"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Acquired</span>
                  </button>

                  {/* 1-Click CTA to Course Finder */}
                  <button
                    onClick={() => onNavigateToCourses(gap)}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 flex items-center gap-1.5 transition-all hover:scale-[1.02]"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Bridge via Course</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}

            {missingSkills.length === 0 && (
              <div className="p-6 text-center text-emerald-400 text-xs border border-emerald-500/30 rounded-xl bg-emerald-500/10 font-semibold">
                Congratulations! You have mastered 100% of the core competencies for this track.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Industry Benchmark Comparison Bar Matrix */}
      <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2 font-outfit">
              <TrendingUp className="w-4 h-4 text-indigo-400" />
              <span>Skill Depth vs Industry Hire Benchmark</span>
            </h3>
            <p className="text-xs text-slate-400">
              Evaluated against 12,000+ top technical applicant profiles on premier recruiting engines.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-3 h-3 rounded bg-indigo-500" />
              Your Proficiency
            </span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <span className="w-3 h-3 rounded bg-slate-700" />
              Hiring Threshold
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {benchmarkData.map((item) => {
            const isMastered = item.status === "Mastered";
            return (
              <div
                key={item.skill}
                className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2"
              >
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-200">{item.skill}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full border ${
                      isMastered
                        ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                        : "bg-amber-500/15 text-amber-300 border-amber-500/30"
                    }`}
                  >
                    {item.status} ({item.student}%)
                  </span>
                </div>

                {/* Dual Bar */}
                <div className="space-y-1">
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden relative">
                    <div
                      className={`h-2 rounded-full transition-all duration-700 ${
                        isMastered ? "bg-emerald-400" : "bg-amber-400"
                      }`}
                      style={{ width: `${item.student}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <span>Target: {item.industry}%</span>
                    <span>
                      {item.student >= item.industry
                        ? `+${item.student - item.industry}% over benchmark`
                        : `${item.student - item.industry}% gap to close`}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
