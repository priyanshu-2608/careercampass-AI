"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Star,
  Clock,
  ExternalLink,
  Sparkles,
  Award,
  CheckCircle2,
  GraduationCap
} from "lucide-react";
import { DomainInfo } from "@/lib/data/beginnerData";

interface CoursesCertificationsViewProps {
  domain: DomainInfo;
}

export default function CoursesCertificationsView({
  domain
}: CoursesCertificationsViewProps) {
  const [filterType, setFilterType] = useState<string>("All");

  const filteredCourses = domain.courses.filter((course) => {
    if (filterType === "All") return true;
    if (filterType === "Free") return course.isFree;
    if (filterType === "Govt") return course.provider.includes("NPTEL");
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                  Feature (C)
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  Courses & Certifications: {domain.name}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Curated learning feeds linking your domain and skill gaps directly to Coursera, edX, NPTEL/SWAYAM, and freeCodeCamp.
              </p>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs shrink-0">
            {["All", "Free", "Govt (NPTEL)"].map((f) => (
              <button
                key={f}
                onClick={() => setFilterType(f)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  filterType === f
                    ? "bg-white text-blue-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Courses Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredCourses.map((course, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              {/* Header Badges */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  {course.provider}
                </span>

                <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{course.rating}</span>
                </div>
              </div>

              {/* Title & Institution */}
              <div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                  {course.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-blue-600" />
                  <span>{course.institution}</span>
                </p>
              </div>

              {/* Duration & Free Tag */}
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {course.duration}
                </span>
                <span>•</span>
                <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[11px]">
                  {course.isFree ? "Free to Audit / Learn" : "Certificate Option"}
                </span>
              </div>

              {/* Skills Taught */}
              <div className="pt-2 border-t border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block mb-1">
                  Key Skills Covered:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {course.keySkills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 text-slate-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Link */}
            <div className="pt-3 border-t border-slate-100">
              <a
                href={course.url}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-xl bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all group"
              >
                <span>Enroll / Start Free on {course.provider}</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
