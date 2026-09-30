"use client";

import React, { useState } from "react";
import {
  Compass,
  TrendingUp,
  Award,
  DollarSign,
  CheckCircle2,
  Sparkles,
  BookOpen,
  ArrowRight,
  BrainCircuit,
  RefreshCw
} from "lucide-react";
import { DomainInfo } from "@/lib/data/beginnerData";

interface DomainAnalysisViewProps {
  domain: DomainInfo;
  userApiKey?: string;
  onNavigateToTab: (tabId: string) => void;
}

export default function DomainAnalysisView({
  domain,
  userApiKey,
  onNavigateToTab
}: DomainAnalysisViewProps) {
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [aiAdvice, setAiAdvice] = useState<string | null>(null);

  const handleGetAiAdvice = async () => {
    setIsAiLoading(true);
    try {
      const response = await fetch("/api/gemini/career-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(userApiKey ? { "x-gemini-key": userApiKey } : {})
        },
        body: JSON.stringify({
          name: "Student",
          education: "Undergraduate",
          gpa: "8.5",
          field: domain.name,
          skills: domain.coreSkills.slice(0, 3).map((s) => s.name),
          userApiKey
        })
      });

      if (response.ok) {
        const data = await response.json();
        setAiAdvice(
          data.readiness?.summary ||
            `For ${domain.name}, industry demand is currently at ${domain.marketDemand}%. Focus on mastering the ${domain.coreSkills[0].name} and building practical portfolio projects to enter at the ${domain.avgSalary} salary bracket.`
        );
      } else {
        setAiAdvice(
          `For ${domain.name}, demand is at ${domain.marketDemand}%. Hiring managers prioritize hands-on projects with ${domain.coreSkills[0].name} and ${domain.coreSkills[1].name}. Start with foundational courses and build 2 real-world projects.`
        );
      }
    } catch {
      setAiAdvice(
        `For ${domain.name}, demand is at ${domain.marketDemand}%. Hiring managers prioritize hands-on projects with ${domain.coreSkills[0].name} and ${domain.coreSkills[1].name}. Start with foundational courses and build 2 real-world projects.`
      );
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title & Introduction */}
      <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                  Feature (A)
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  Domain Analysis: {domain.name}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">{domain.tagline}</p>
            </div>
          </div>

          <button
            onClick={handleGetAiAdvice}
            disabled={isAiLoading}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 flex items-center gap-2 transition-all shrink-0"
          >
            {isAiLoading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4 text-blue-200" />
            )}
            <span>Ask Gemini AI for Career Advice</span>
          </button>
        </div>

        {/* AI Advice Box */}
        {aiAdvice && (
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-950 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-blue-800">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Gemini AI Domain Diagnostic:</span>
            </div>
            <p className="leading-relaxed text-slate-700">{aiAdvice}</p>
          </div>
        )}

        {/* 3 Metric Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Market Demand</span>
              <TrendingUp className="w-4 h-4 text-blue-600" />
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-blue-600">{domain.marketDemand}%</span>
              <span className="text-[11px] text-emerald-600 font-semibold">High Growth</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Strong hiring demand across startups & MNCs</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Average Entry Salary</span>
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="mt-1">
              <span className="text-2xl font-extrabold text-slate-900">{domain.avgSalary}</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">For campus graduates & junior roles</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Learning Curve</span>
              <Award className="w-4 h-4 text-blue-600" />
            </div>
            <div className="mt-1">
              <span className="text-2xl font-extrabold text-slate-900">{domain.difficulty}</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Recommended 3–4 months structured study</p>
          </div>
        </div>
      </div>

      {/* Target Job Roles & Core Skills Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Target Entry Roles */}
        <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900">
              Target Job Roles in this Domain
            </h3>
            <span className="text-xs text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded-full">
              {domain.entryRoles.length} Careers
            </span>
          </div>

          <p className="text-xs text-slate-600">
            When you complete your skill roadmap, you can apply for these exact roles:
          </p>

          <div className="space-y-2.5">
            {domain.entryRoles.map((role, idx) => (
              <div
                key={role}
                className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50/50 border border-slate-200 hover:border-blue-200 transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="text-xs font-bold text-slate-800">{role}</span>
                </div>
                <span className="text-[11px] text-slate-500">Entry Level Available</span>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => onNavigateToTab("b-skill-gap")}
              className="w-full py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>View Career Roadmap & Skill Gap Guide (B)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Core Skills Required */}
        <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900">
              Core Skills You Need to Master
            </h3>
            <span className="text-xs text-slate-500">Skills Matrix</span>
          </div>

          <p className="text-xs text-slate-600">
            Essential skills required by tech companies for <strong className="text-slate-900">{domain.name}</strong>:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[300px] overflow-y-auto pr-1">
            {domain.coreSkills.map((skill) => (
              <div
                key={skill.name}
                className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{skill.name}</span>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                        skill.level === "Essential"
                          ? "bg-blue-100 text-blue-700"
                          : skill.level === "Recommended"
                          ? "bg-slate-200 text-slate-700"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {skill.level}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1 leading-snug">{skill.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => onNavigateToTab("c-courses")}
              className="w-full py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Find Free Courses For These Skills (C)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
