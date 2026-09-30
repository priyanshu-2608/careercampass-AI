"use client";

import React, { useState } from "react";
import {
  MapPin,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  ArrowRight,
  Target,
  ExternalLink,
  ChevronRight,
  BookOpen
} from "lucide-react";
import { RoadmapMilestone } from "@/types";

interface CareerRoadmapProps {
  targetRole: string;
  milestones: RoadmapMilestone[];
  onSkillGapClick?: (skill: string) => void;
  onSkillToggled?: (skill: string) => void;
}

export default function CareerRoadmap({
  targetRole,
  milestones,
  onSkillGapClick,
  onSkillToggled
}: CareerRoadmapProps) {
  const [activeMilestoneId, setActiveMilestoneId] = useState<string>(
    milestones[1]?.id || milestones[0]?.id || "m1"
  );

  return (
    <div id="roadmap" className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Target className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-bold text-white font-outfit">
              Career Path Recommender
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Interactive roadmap mapping current student profiles against target job roles with explicit Mastered vs Gap skills.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs bg-slate-900/80 px-3.5 py-1.5 rounded-xl border border-slate-800">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="text-slate-300 font-medium">Mastered Skills</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-slate-300 font-medium">Identified Skill Gaps</span>
          </div>
        </div>
      </div>

      {/* Visual Step-by-Step Roadmap Cards */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-indigo-500/30 space-y-8">
        {milestones.map((m, idx) => {
          const isSelected = activeMilestoneId === m.id;
          const isCompleted = m.status === "completed";
          const isInProgress = m.status === "in-progress";

          return (
            <div
              key={m.id}
              className={`relative transition-all duration-300 ${
                isSelected ? "scale-[1.01]" : "opacity-90"
              }`}
            >
              {/* Timeline Node Dot */}
              <div
                className={`absolute -left-[31px] sm:-left-[39px] top-4 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  isCompleted
                    ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30 ring-4 ring-slate-950"
                    : isInProgress
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/40 ring-4 ring-slate-950 animate-pulse"
                    : "bg-slate-800 text-slate-400 border border-slate-700 ring-4 ring-slate-950"
                }`}
              >
                {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
              </div>

              {/* Milestone Card */}
              <div
                onClick={() => setActiveMilestoneId(m.id)}
                className={`glass-card p-5 sm:p-6 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? "border-indigo-500/60 shadow-xl shadow-indigo-500/10 bg-slate-900/90"
                    : "border-slate-800/80 hover:border-slate-700 bg-slate-950/60"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800/60">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-indigo-400 tracking-wider uppercase font-mono">
                      {m.phase}
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {m.duration}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-medium text-slate-300 bg-slate-800/90 px-2.5 py-0.5 rounded-full border border-slate-700/60">
                      Target Level: {m.targetRole}
                    </span>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        isCompleted
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                          : isInProgress
                          ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/40"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {m.status.replace("-", " ")}
                    </span>
                  </div>
                </div>

                <div className="mt-3">
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-indigo-300">
                    {m.title}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {m.description}
                  </p>
                </div>

                {/* Explicit Skill Badges (Mastered vs Identified Skill Gaps) */}
                <div className="mt-4 pt-4 border-t border-slate-800/60 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Mastered Skills List */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Mastered Skills ({m.masteredSkills.length})</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {m.masteredSkills.length > 0 ? (
                        m.masteredSkills.map((skill) => (
                          <span
                            key={skill}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-950/40 text-emerald-300 border border-emerald-800/60"
                          >
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            {skill}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-slate-500 italic">
                          No mastered skills in this phase yet.
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Identified Skill Gaps List */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Identified Skill Gaps ({m.skillGaps.length})</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {m.skillGaps.length > 0 ? (
                        m.skillGaps.map((skill) => (
                          <button
                            key={skill}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSkillGapClick?.(skill);
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-950/40 hover:bg-amber-900/60 text-amber-300 border border-amber-800/60 transition-colors group/gap"
                            title="Click to jump to accredited courses for this skill"
                          >
                            <Sparkles className="w-3 h-3 text-amber-400" />
                            <span>{skill}</span>
                            <ChevronRight className="w-2.5 h-2.5 text-amber-400 group-hover/gap:translate-x-0.5 transition-transform" />
                          </button>
                        ))
                      ) : (
                        <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Zero gaps! Fully cleared this milestone.
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Action Items */}
                {isSelected && (
                  <div className="mt-4 pt-4 border-t border-slate-800/60 space-y-2 bg-slate-950/40 p-3.5 rounded-xl border border-slate-800">
                    <div className="text-xs font-semibold text-indigo-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Milestone Verification Checklist</span>
                    </div>
                    <ul className="space-y-1.5">
                      {m.actionItems.map((item, aIdx) => (
                        <li key={aIdx} className="flex items-start gap-2 text-xs text-slate-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
