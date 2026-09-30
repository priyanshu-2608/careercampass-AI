"use client";

import React, { useState } from "react";
import {
  Building2,
  Calendar,
  MapPin,
  IndianRupee,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Filter,
  Sparkles,
  ShieldCheck,
  Check
} from "lucide-react";
import { GovernmentOpportunity, UserProfile } from "@/types";

interface GovernmentFeedProps {
  opportunities: GovernmentOpportunity[];
  userProfile: UserProfile;
}

export default function GovernmentFeed({
  opportunities,
  userProfile
}: GovernmentFeedProps) {
  const [selectedPortal, setSelectedPortal] = useState<string>("All");
  const [onlyEligible, setOnlyEligible] = useState<boolean>(false);

  // Parse user GPA
  const userGpaMatch = userProfile.gpa.match(/(\d+(\.\d+)?)/);
  const userGpaNum = userGpaMatch ? parseFloat(userGpaMatch[1]) : 8.0;

  const filteredOpportunities = opportunities.filter((opp) => {
    // Portal filter
    if (selectedPortal !== "All" && opp.portal !== selectedPortal) {
      return false;
    }

    // Eligibility check
    if (onlyEligible) {
      const gpaPass = userGpaNum >= opp.eligibility.minCgpa;
      return gpaPass;
    }

    return true;
  });

  const getPortalBadge = (portal: GovernmentOpportunity["portal"]) => {
    switch (portal) {
      case "NATS":
        return "bg-amber-600/20 text-amber-300 border-amber-500/40";
      case "AICTE":
        return "bg-cyan-600/20 text-cyan-300 border-cyan-500/40";
      case "ISRO":
        return "bg-orange-600/20 text-orange-300 border-orange-500/40";
      case "DRDO":
        return "bg-emerald-600/20 text-emerald-300 border-emerald-500/40";
      case "CDAC":
        return "bg-purple-600/20 text-purple-300 border-purple-500/40";
      case "NIC":
        return "bg-blue-600/20 text-blue-300 border-blue-500/40";
      default:
        return "bg-slate-700 text-slate-300 border-slate-600";
    }
  };

  return (
    <div id="govt-feed" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Building2 className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-bold text-white font-outfit">
              Government Opportunities Feed
            </h2>
            <span className="px-2 py-0.5 text-[10px] font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-full">
              Verified Public Sector Schemes
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Central ministry schemes, national apprenticeships, and research lab recruitments from{" "}
            <strong className="text-slate-200">NATS</strong>,{" "}
            <strong className="text-slate-200">AICTE Portal</strong>,{" "}
            <strong className="text-slate-200">DRDO</strong>, and{" "}
            <strong className="text-slate-200">ISRO</strong>.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Eligibility Toggle */}
          <button
            onClick={() => setOnlyEligible(!onlyEligible)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              onlyEligible
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30 border border-emerald-500"
                : "bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Eligible for Me ({userProfile.gpa})</span>
          </button>

          {/* Portal Pills */}
          <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-lg border border-slate-800">
            {["All", "NATS", "AICTE", "ISRO", "DRDO"].map((p) => (
              <button
                key={p}
                onClick={() => setSelectedPortal(p)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  selectedPortal === p
                    ? "bg-indigo-600 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Government Opportunities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredOpportunities.map((opp) => {
          const isEligible = userGpaNum >= opp.eligibility.minCgpa;

          return (
            <div
              key={opp.id}
              className="glass-card p-5 sm:p-6 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Header row: Portal badge, status, and deadline */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${getPortalBadge(
                        opp.portal
                      )}`}
                    >
                      {opp.portal} Portal
                    </span>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        opp.status === "Closing Soon"
                          ? "bg-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse"
                          : opp.status === "Featured"
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                          : "bg-slate-800 text-slate-300 border border-slate-700"
                      }`}
                    >
                      {opp.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    <span>Last Date: {opp.deadline}</span>
                  </div>
                </div>

                {/* Organization & Role */}
                <div>
                  <div className="text-xs font-semibold text-indigo-300 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{opp.organization}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white mt-1 leading-snug">
                    {opp.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {opp.description}
                </p>

                {/* Key specs: Stipend & Location */}
                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div className="bg-slate-950/70 p-2 rounded-xl border border-slate-800 flex items-center gap-2">
                    <IndianRupee className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <div>
                      <div className="text-[10px] text-slate-500">Stipend / Scale</div>
                      <div className="font-semibold text-slate-200 line-clamp-1">{opp.stipendOrSalary}</div>
                    </div>
                  </div>

                  <div className="bg-slate-950/70 p-2 rounded-xl border border-slate-800 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <div>
                      <div className="text-[10px] text-slate-500">Location</div>
                      <div className="font-semibold text-slate-200 line-clamp-1">{opp.location}</div>
                    </div>
                  </div>
                </div>

                {/* Eligibility Pill Badge */}
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Min Eligibility Requirement:</span>
                    <span className="font-mono text-indigo-300 font-semibold">
                      Min {opp.eligibility.minCgpa} CGPA / {opp.eligibility.degrees.join(", ")}
                    </span>
                  </div>

                  {isEligible ? (
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-800/60">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>Your CGPA ({userProfile.gpa}) meets the eligibility threshold!</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded-md border border-amber-800/60">
                      <AlertTriangle className="w-3 h-3 text-amber-400" />
                      <span>Requires minimum {opp.eligibility.minCgpa} CGPA</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Action */}
              <div className="pt-2 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {opp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={opp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white flex items-center gap-1.5 shadow-md shadow-indigo-600/20 transition-all hover:scale-105 active:scale-95 group"
                >
                  <span>Apply on Official Portal</span>
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
