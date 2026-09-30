"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Star,
  Clock,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  CheckCircle,
  GraduationCap,
  Filter
} from "lucide-react";
import { CourseRecommendation } from "@/types";

interface CourseGridProps {
  courses: CourseRecommendation[];
  highlightSkill?: string | null;
}

export default function CourseGrid({ courses, highlightSkill }: CourseGridProps) {
  const [selectedProvider, setSelectedProvider] = useState<string>("All");
  const [selectedSkillFilter, setSelectedSkillFilter] = useState<string>(highlightSkill || "All");
  const [courseSearch, setCourseSearch] = useState<string>("");

  // Sync if highlightSkill changes
  React.useEffect(() => {
    if (highlightSkill) {
      setSelectedSkillFilter(highlightSkill);
    }
  }, [highlightSkill]);

  const skillOptions = ["All", "Machine Learning", "Deep Learning", "Generative AI & LLMs", "Statistics", "MLOps", "Docker"];

  const filteredCourses = courses.filter((course) => {
    // Provider filter
    if (selectedProvider !== "All") {
      if (selectedProvider === "FreeAudit" && !course.freeAuditAvailable) return false;
      if (selectedProvider !== "FreeAudit" && course.provider !== selectedProvider) return false;
    }

    // Skill filter
    if (selectedSkillFilter !== "All") {
      if (course.skillTied.toLowerCase() !== selectedSkillFilter.toLowerCase()) {
        const matchesTag = course.tags.some(t => t.toLowerCase().includes(selectedSkillFilter.toLowerCase()));
        if (!matchesTag) return false;
      }
    }

    // Search query
    if (courseSearch.trim()) {
      const q = courseSearch.toLowerCase();
      const matchTitle = course.title.toLowerCase().includes(q);
      const matchInst = course.institution.toLowerCase().includes(q);
      const matchSkill = course.skillTied.toLowerCase().includes(q);
      if (!matchTitle && !matchInst && !matchSkill) return false;
    }

    return true;
  });

  const getProviderColor = (provider: CourseRecommendation["provider"]) => {
    switch (provider) {
      case "Coursera":
        return "bg-blue-600/20 text-blue-300 border-blue-500/30";
      case "edX":
        return "bg-rose-600/20 text-rose-300 border-rose-500/30";
      case "NPTEL":
        return "bg-amber-600/20 text-amber-300 border-amber-500/30";
      default:
        return "bg-indigo-600/20 text-indigo-300 border-indigo-500/30";
    }
  };

  return (
    <div id="courses" className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-bold text-white font-outfit">
              Course & Certification Finder
            </h2>
            <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full">
              Linking Missing Skill Gaps
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Curated learning feeds linking missing skill gaps directly to{" "}
            <strong className="text-slate-200">Coursera</strong>,{" "}
            <strong className="text-slate-200">edX</strong>, and{" "}
            <strong className="text-slate-200">NPTEL / SWAYAM (Govt AICTE Recognized)</strong>.
          </p>
        </div>

        {/* Provider Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {["All", "Coursera", "edX", "NPTEL", "FreeAudit"].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedProvider(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedProvider === tab
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                  : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              {tab === "FreeAudit" ? "Free Audit Available" : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Missing Skill Gap Filter Row */}
      <div className="glass-card p-3 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          <span className="text-slate-400 font-semibold text-[11px] shrink-0">Filter by Skill Gap:</span>
          {skillOptions.map((skill) => (
            <button
              key={skill}
              onClick={() => setSelectedSkillFilter(skill)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors ${
                selectedSkillFilter === skill
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                  : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              {skill}
            </button>
          ))}
        </div>

        <input
          type="text"
          value={courseSearch}
          onChange={(e) => setCourseSearch(e.target.value)}
          placeholder="Search courses or topics..."
          className="bg-slate-900 text-slate-200 text-xs px-3 py-1.5 rounded-lg border border-slate-800 focus:outline-none focus:border-indigo-500 max-w-xs"
        />
      </div>

      {highlightSkill && selectedSkillFilter === highlightSkill && (
        <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800/60 flex items-center justify-between text-xs text-amber-200">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>
              Curated course feed specifically resolving your gap in:{" "}
              <strong>{highlightSkill}</strong>
            </span>
          </div>
          <button
            onClick={() => setSelectedSkillFilter("All")}
            className="text-[11px] text-amber-400 underline hover:text-amber-300"
          >
            Clear skill filter
          </button>
        </div>
      )}

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCourses.map((course) => {
          const isTiedMatch =
            highlightSkill &&
            course.skillTied.toLowerCase() === highlightSkill.toLowerCase();

          return (
            <div
              key={course.id}
              className={`glass-card p-5 rounded-2xl border flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                isTiedMatch
                  ? "border-amber-500/80 shadow-xl shadow-amber-500/10 ring-2 ring-amber-500/30"
                  : "border-slate-800/80 hover:border-slate-700 shadow-lg shadow-black/20"
              }`}
            >
              <div className="space-y-3">
                {/* Header: Provider & Skill Tag */}
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${getProviderColor(
                      course.provider
                    )}`}
                  >
                    {course.provider}
                  </span>

                  <span className="text-[11px] font-semibold text-amber-300 bg-amber-950/50 border border-amber-800/50 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    Bridges: {course.skillTied}
                  </span>
                </div>

                {/* Institution */}
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                  <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="line-clamp-1">{course.institution}</span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-white leading-snug line-clamp-2 hover:text-indigo-300 transition-colors">
                  {course.title}
                </h3>

                {/* Rating & Stats */}
                <div className="flex items-center gap-3 text-xs text-slate-300 pt-1">
                  <div className="flex items-center gap-1 text-amber-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{course.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-400 text-[11px]">{course.reviewsCount}</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-400 text-[11px]">{course.level}</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {course.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-1 text-[11px] text-slate-400">
                  <Clock className="w-3 h-3 text-slate-500" />
                  <span>{course.duration}</span>
                </div>

                <a
                  href={course.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/40 hover:border-indigo-500 flex items-center gap-1.5 transition-all shadow-sm group"
                >
                  <span>Explore Course</span>
                  <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
