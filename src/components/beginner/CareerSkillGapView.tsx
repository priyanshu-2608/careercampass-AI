"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Calendar,
  CheckSquare,
  Square,
  Sparkles,
  Award
} from "lucide-react";
import { DomainInfo } from "@/lib/data/beginnerData";

interface CareerSkillGapViewProps {
  domain: DomainInfo;
  onNavigateToCourses: () => void;
}

export default function CareerSkillGapView({
  domain,
  onNavigateToCourses
}: CareerSkillGapViewProps) {
  // Let student check which skills they currently know
  const [knownSkills, setKnownSkills] = useState<string[]>([
    domain.coreSkills[0]?.name || "",
    domain.coreSkills[1]?.name || ""
  ]);

  const toggleSkill = (skillName: string) => {
    if (knownSkills.includes(skillName)) {
      setKnownSkills(knownSkills.filter((s) => s !== skillName));
    } else {
      setKnownSkills([...knownSkills, skillName]);
    }
  };

  const allSkills = domain.coreSkills.map((s) => s.name);
  const masteredList = allSkills.filter((s) => knownSkills.includes(s));
  const missingGapList = allSkills.filter((s) => !knownSkills.includes(s));
  const readinessPercent = Math.round((masteredList.length / allSkills.length) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                  Feature (B)
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  Career Recommendation & Skill Gap Guide
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Targeting <strong className="text-blue-700">{domain.name}</strong> • Check off the skills you know to uncover your exact gaps.
              </p>
            </div>
          </div>

          {/* Readiness Index Gauge */}
          <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 flex items-center gap-3 shrink-0">
            <div>
              <span className="text-[10px] text-blue-600 uppercase font-bold block">
                Your Readiness
              </span>
              <span className="text-2xl font-extrabold text-blue-700">{readinessPercent}%</span>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-blue-200 border-t-blue-600 flex items-center justify-center text-[10px] font-bold text-blue-700">
              {masteredList.length}/{allSkills.length}
            </div>
          </div>
        </div>

        {/* Readiness Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${Math.max(readinessPercent, 8)}%` }}
          />
        </div>
      </div>

      {/* Interactive Skill Gap Checker: Mastered vs Gaps */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Interactive Checklist */}
        <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900">
              Check Your Skills ({masteredList.length} Known)
            </h3>
            <span className="text-xs text-slate-500">Click to toggle</span>
          </div>

          <p className="text-xs text-slate-600">
            Select the skills you already have experience with:
          </p>

          <div className="space-y-2">
            {domain.coreSkills.map((skill) => {
              const isChecked = knownSkills.includes(skill.name);
              return (
                <div
                  key={skill.name}
                  onClick={() => toggleSkill(skill.name)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isChecked
                      ? "bg-blue-50/70 border-blue-300 text-slate-900 font-semibold"
                      : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {isChecked ? (
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                    <span className="text-xs">{skill.name}</span>
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full ${
                      isChecked
                        ? "bg-blue-600 text-white font-bold"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {isChecked ? "Mastered" : "Need to Learn"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Identified Skill Gaps & Action */}
        <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-blue-600" />
                <span>Your Identified Skill Gaps ({missingGapList.length})</span>
              </h3>
              <span className="text-xs text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-full">
                High Priority
              </span>
            </div>

            <p className="text-xs text-slate-600">
              To land an entry-level role in <strong className="text-slate-900">{domain.name}</strong>, these are your current missing competencies:
            </p>

            <div className="flex flex-wrap gap-2">
              {missingGapList.map((gap) => (
                <span
                  key={gap}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1.5 shadow-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  {gap}
                </span>
              ))}

              {missingGapList.length === 0 && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 w-full">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Amazing! You have marked all core skills as mastered!</span>
                </div>
              )}
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
              <strong className="text-slate-800 block">AI Recommended Strategy:</strong>
              <p>
                Dedicate 2–3 weeks to resolve your top gaps:{" "}
                <span className="text-blue-600 font-bold">
                  {missingGapList.slice(0, 2).join(" & ") || "Advanced topics"}
                </span>.
                We have curated free accredited courses below to help you bridge them.
              </p>
            </div>
          </div>

          <button
            onClick={onNavigateToCourses}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all hover:scale-[1.01]"
          >
            <BookOpen className="w-4 h-4" />
            <span>Bridge These Gaps with Free Courses (C)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Step-by-Step 4-Phase Roadmap */}
      <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Step-by-Step Guided Roadmap for {domain.name}
            </h3>
            <p className="text-xs text-slate-500">
              Clear 16-week milestone breakdown from beginner to job-ready
            </p>
          </div>
          <span className="text-xs text-blue-600 font-bold bg-blue-50 px-2.5 py-1 rounded-full">
            4 Structured Phases
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {domain.roadmapSteps.map((step) => (
            <div
              key={step.stepNumber}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                    {step.stepNumber}
                  </span>
                  <span className="text-[10px] text-blue-700 font-bold bg-blue-100 px-2 py-0.5 rounded-full">
                    {step.duration}
                  </span>
                </div>

                <h4 className="font-bold text-slate-900 text-xs">{step.title}</h4>

                <div className="flex flex-wrap gap-1">
                  {step.skillsToLearn.map((s) => (
                    <span
                      key={s}
                      className="text-[10px] px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200">
                <span className="text-[10px] font-bold text-blue-700 block">Milestone Goal:</span>
                <p className="text-[11px] text-slate-600 leading-snug">{step.actionItem}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
