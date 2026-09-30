"use client";

import React, { useState } from "react";
import {
  Briefcase,
  MapPin,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  Check,
  Building
} from "lucide-react";
import { DomainInfo } from "@/lib/data/beginnerData";

interface JobsInternshipsViewProps {
  domain: DomainInfo;
}

export default function JobsInternshipsView({ domain }: JobsInternshipsViewProps) {
  const [filterType, setFilterType] = useState<string>("All");
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const handleApply = (jobTitle: string) => {
    if (!appliedJobs.includes(jobTitle)) {
      setAppliedJobs([...appliedJobs, jobTitle]);
      setSuccessToast(`Application submitted for "${jobTitle}"!`);
      setTimeout(() => setSuccessToast(null), 3000);
    }
  };

  const filteredJobs = domain.jobs.filter((job) => {
    if (filterType === "All") return true;
    if (filterType === "Internship") return job.type === "Internship";
    if (filterType === "Jobs") return job.type !== "Internship";
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                  Feature (E)
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  Internships & Job Openings: {domain.name}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Verified entry-level opportunities tailored specifically to your chosen domain.
              </p>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs shrink-0">
            {["All", "Internship", "Jobs"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterType(tab)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  filterType === tab
                    ? "bg-white text-blue-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {tab === "Jobs" ? "Full-Time Jobs" : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Success Toast */}
        {successToast && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-pulse">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{successToast} Your profile has been sent to the recruiter.</span>
          </div>
        )}
      </div>

      {/* Jobs Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredJobs.map((job, idx) => {
          const isApplied = appliedJobs.includes(job.title);

          return (
            <div
              key={idx}
              className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Header: Company & AI Match % */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center font-bold text-blue-700 text-sm">
                      {job.company.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">{job.company}</h4>
                      <p className="text-[11px] text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {job.location}
                      </p>
                    </div>
                  </div>

                  <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1 shrink-0">
                    <Sparkles className="w-3 h-3 text-emerald-600" />
                    {job.matchPercentage}% Fit
                  </span>
                </div>

                {/* Role Title & Type */}
                <div>
                  <h3 className="font-bold text-slate-900 text-sm line-clamp-1">{job.title}</h3>
                  <span className="inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    {job.type}
                  </span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {job.description}
                </p>

                {/* Stipend / Salary */}
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 text-[11px]">Compensation:</span>
                  <strong className="text-blue-700 font-extrabold">{job.stipendOrSalary}</strong>
                </div>

                {/* Skills Required */}
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                    Required Skills:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {job.skillsRequired.map((s) => (
                      <span
                        key={s}
                        className="text-[10px] px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={() => handleApply(job.title)}
                  disabled={isApplied}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    isApplied
                      ? "bg-emerald-100 text-emerald-800 cursor-default"
                      : "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 hover:scale-[1.02]"
                  }`}
                >
                  {isApplied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Applied Successfully</span>
                    </>
                  ) : (
                    <>
                      <span>1-Click Apply with AI Profile</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
