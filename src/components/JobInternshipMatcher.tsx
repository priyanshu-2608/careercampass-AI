"use client";

import React, { useState } from "react";
import {
  Briefcase,
  Sparkles,
  MapPin,
  Calendar,
  Building2,
  CheckCircle2,
  AlertTriangle,
  Bookmark,
  ExternalLink,
  Search,
  Filter,
  Users,
  Check
} from "lucide-react";
import { JobOpportunity, UserProfile } from "@/types";

interface JobInternshipMatcherProps {
  opportunities: JobOpportunity[];
  userProfile: UserProfile;
}

export default function JobInternshipMatcher({
  opportunities,
  userProfile
}: JobInternshipMatcherProps) {
  const [filterType, setFilterType] = useState<string>("All");
  const [minMatchScore, setMinMatchScore] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleApply = (jobId: string, title: string) => {
    if (!appliedJobs.includes(jobId)) {
      setAppliedJobs([...appliedJobs, jobId]);
      setToastMessage(`Application submitted for ${title}!`);
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  const handleToggleSave = (jobId: string) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter((id) => id !== jobId));
    } else {
      setSavedJobs([...savedJobs, jobId]);
    }
  };

  const filteredOpportunities = opportunities.filter((job) => {
    // Type filter
    if (filterType !== "All" && job.type !== filterType) {
      if (filterType === "Remote" && !job.location.toLowerCase().includes("remote")) {
        return false;
      }
      if (filterType !== "Remote") {
        return false;
      }
    }

    // Match score filter
    if (job.matchScore < minMatchScore) {
      return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = job.title.toLowerCase().includes(q);
      const matchCompany = job.company.toLowerCase().includes(q);
      const matchLocation = job.location.toLowerCase().includes(q);
      const matchSkill =
        job.matchedSkills.some((s) => s.toLowerCase().includes(q)) ||
        job.missingSkills.some((s) => s.toLowerCase().includes(q));

      if (!matchTitle && !matchCompany && !matchLocation && !matchSkill) {
        return false;
      }
    }

    return true;
  });

  const getScoreBadgeColor = (score: number) => {
    if (score >= 90)
      return "bg-emerald-500/15 text-emerald-300 border-emerald-500/40 ring-1 ring-emerald-500/30";
    if (score >= 80)
      return "bg-indigo-500/15 text-indigo-300 border-indigo-500/40 ring-1 ring-indigo-500/30";
    return "bg-amber-500/15 text-amber-300 border-amber-500/40";
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Briefcase className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-bold text-white font-outfit">
              Job & Internship Matcher
            </h2>
            <span className="px-2 py-0.5 text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full">
              Live AI Matching
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time candidate-to-job matching computed from your verified skills, GPA ({userProfile.gpa}), and target role.
          </p>
        </div>

        {/* Toast confirmation */}
        {toastMessage && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold animate-pulse">
            <Check className="w-4 h-4" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>

      {/* Filter Toolbar */}
      <div className="glass-card p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter by company, title, or required skill..."
            className="w-full bg-slate-900/90 text-xs text-slate-200 placeholder:text-slate-500 pl-9 pr-3 py-2 rounded-lg border border-slate-800 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Opportunity Type Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {["All", "Internship", "Full-Time", "Remote"].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 ${
                filterType === type
                  ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/30"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:bg-slate-800"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Match Score Threshold */}
        <div className="flex items-center gap-2 text-xs text-slate-400 shrink-0">
          <span>Min Match:</span>
          <select
            value={minMatchScore}
            onChange={(e) => setMinMatchScore(Number(e.target.value))}
            className="bg-slate-900 text-slate-200 text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-800 focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value={0}>All Scores</option>
            <option value={80}>80%+ Match</option>
            <option value={90}>90%+ Top Match</option>
          </select>
        </div>
      </div>

      {/* Opportunity Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredOpportunities.map((job) => {
          const isApplied = appliedJobs.includes(job.id);
          const isSaved = savedJobs.includes(job.id);

          return (
            <div
              key={job.id}
              className="glass-card-hover p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 flex flex-col justify-between space-y-4 relative overflow-hidden"
            >
              {/* Top Row: Company + AI Match Score Percentage */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1.5px] shadow-sm shrink-0">
                    <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-extrabold text-white text-base">
                      {job.logo}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-white text-sm line-clamp-1">
                      {job.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                      <span className="font-semibold text-slate-300">{job.company}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-[11px]">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        {job.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* AI Match Score Percentage Badge */}
                <div className="flex flex-col items-end shrink-0">
                  <div
                    className={`px-2.5 py-1 rounded-full text-xs font-extrabold flex items-center gap-1 border shadow-sm ${getScoreBadgeColor(
                      job.matchScore
                    )}`}
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>{job.matchScore}% Match</span>
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1">AI Verified Fit</span>
                </div>
              </div>

              {/* Match Rationale / Explanation */}
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs space-y-1.5">
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  <strong className="text-indigo-300">Why you match: </strong>
                  {job.matchRationale}
                </p>

                {/* Skills tags breakdown: green vs amber */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {job.matchedSkills.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1"
                    >
                      <Check className="w-2.5 h-2.5" />
                      {s}
                    </span>
                  ))}
                  {job.missingSkills.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1"
                      title="Recommended skill gap to bridge"
                    >
                      <AlertTriangle className="w-2.5 h-2.5" />
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer: Stipend, Time, and Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                <div>
                  <span className="text-xs font-bold text-emerald-400 block">
                    {job.stipendOrSalary}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    {job.postedTime} • {job.applicantsCount} applicants
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleSave(job.id)}
                    className={`p-2 rounded-lg border transition-colors ${
                      isSaved
                        ? "bg-indigo-600/20 border-indigo-500/40 text-indigo-300"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                    title={isSaved ? "Saved" : "Save opportunity"}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleApply(job.id, job.title)}
                    disabled={isApplied}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isApplied
                        ? "bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 cursor-default"
                        : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/25 hover:scale-[1.02]"
                    }`}
                  >
                    {isApplied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Applied</span>
                      </>
                    ) : (
                      <>
                        <span>1-Click Apply</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredOpportunities.length === 0 && (
        <div className="glass-card p-12 text-center rounded-2xl border border-slate-800 text-slate-400 text-xs">
          No opportunities match your current filters. Try lowering the match threshold or clearing the search bar.
        </div>
      )}
    </div>
  );
}
