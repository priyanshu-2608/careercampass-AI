"use client";

import React, { useState } from "react";
import {
  UserCheck,
  UploadCloud,
  FileText,
  CheckCircle2,
  Sparkles,
  GraduationCap,
  Award,
  BookOpen,
  Plus,
  X,
  RefreshCw,
  AlertCircle,
  ShieldCheck,
  Check
} from "lucide-react";
import { UserProfile } from "@/types";
import { CAREER_FIELDS } from "@/lib/data/mockData";

interface ProfileAcademicAnalyzerProps {
  profile: UserProfile;
  onUpdateProfile: (updatedProfile: UserProfile) => void;
  isLoading: boolean;
}

export default function ProfileAcademicAnalyzer({
  profile,
  onUpdateProfile,
  isLoading
}: ProfileAcademicAnalyzerProps) {
  const [formData, setFormData] = useState<UserProfile>(profile);
  const [newSkillInput, setNewSkillInput] = useState<string>("");
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success">("idle");
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // Parse GPA to float
  const gpaMatch = formData.gpa.match(/(\d+(\.\d+)?)/);
  const currentGpa = gpaMatch ? parseFloat(gpaMatch[1]) : 8.8;

  const handleInputChange = (field: keyof UserProfile, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newSkillInput.trim();
    if (!trimmed) return;
    if (!formData.skills.includes(trimmed)) {
      const updatedSkills = [...formData.skills, trimmed];
      handleInputChange("skills", updatedSkills);
    }
    setNewSkillInput("");
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const updatedSkills = formData.skills.filter((s) => s !== skillToRemove);
    handleInputChange("skills", updatedSkills);
  };

  const handleSimulateResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadStatus("uploading");
    setTimeout(() => {
      setUploadStatus("success");
      const updatedResume = {
        name: file.name,
        size: `${Math.round(file.size / 1024)} KB`,
        uploadedAt: "Just now"
      };
      setFormData((prev) => ({
        ...prev,
        resumeFile: updatedResume
      }));
    }, 1200);
  };

  const handleSaveAndAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <UserCheck className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-bold text-white font-outfit">
              Profile & Academic Record Analyzer
            </h2>
            <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full">
              Automated Parsing Active
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Upload PDF resume or edit academic credentials to parse structured skills and compute real-time employability.
          </p>
        </div>

        {saveSuccess && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold animate-pulse">
            <Check className="w-4 h-4" />
            <span>Profile & Readiness Updated!</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: PDF Resume Uploader & Extracted Metadata */}
        <div className="lg:col-span-5 space-y-6">
          {/* PDF Resume Upload Card */}
          <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-400" />
                <span>PDF Resume Parser</span>
              </h3>
              <span className="text-[10px] text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                Gemini OCR
              </span>
            </div>

            {formData.resumeFile ? (
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 font-bold text-xs">
                      PDF
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-white truncate max-w-[180px]">
                        {formData.resumeFile.name}
                      </h4>
                      <p className="text-[10px] text-slate-400">
                        {formData.resumeFile.size} • {formData.resumeFile.uploadedAt}
                      </p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3" />
                    Parsed
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-center text-[11px]">
                  <div className="p-2 rounded-lg bg-slate-950/60">
                    <span className="text-slate-400 block text-[10px]">Extracted Skills</span>
                    <strong className="text-white text-xs">{formData.skills.length} Skills</strong>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950/60">
                    <span className="text-slate-400 block text-[10px]">ATS Score</span>
                    <strong className="text-emerald-400 text-xs">88 / 100</strong>
                  </div>
                </div>

                <label className="block w-full text-center py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer transition-colors">
                  Upload Replacement PDF
                  <input
                    type="file"
                    accept=".pdf,.docx"
                    className="hidden"
                    onChange={handleSimulateResumeUpload}
                  />
                </label>
              </div>
            ) : (
              <label className="border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all bg-slate-900/40 hover:bg-indigo-500/5 group">
                <UploadCloud className="w-10 h-10 text-slate-400 group-hover:text-indigo-400 mb-2 transition-colors" />
                <span className="text-xs font-bold text-white group-hover:text-indigo-300">
                  Drop your resume PDF here
                </span>
                <span className="text-[11px] text-slate-400 mt-0.5">
                  or click to browse (.pdf, .docx up to 10MB)
                </span>
                <input
                  type="file"
                  accept=".pdf,.docx"
                  className="hidden"
                  onChange={handleSimulateResumeUpload}
                />
              </label>
            )}

            {uploadStatus === "uploading" && (
              <div className="p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center gap-2 text-xs text-indigo-300">
                <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
                <span>Extracting academic credentials with Gemini OCR...</span>
              </div>
            )}
          </div>

          {/* Academic Eligibility Quick Gauge */}
          <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold text-white flex items-center gap-2 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Govt & PSU Academic Eligibility</span>
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/80">
                <span className="text-slate-300">ISRO / DRDO Minimum (65% / 6.84 CGPA):</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Eligible (8.8)
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/80">
                <span className="text-slate-300">NATS Central Apprenticeship:</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified Tier-1
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/80">
                <span className="text-slate-300">Tier-1 Tech Campus Threshold (8.0):</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Qualified (+0.8 buffer)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Academic Records & Structured Skills Form */}
        <div className="lg:col-span-7 glass-card p-6 rounded-2xl border border-slate-800 space-y-6">
          <form onSubmit={handleSaveAndAnalyze} className="space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-indigo-400" />
                <span>Academic Records & Specialization</span>
              </h3>
              <span className="text-[10px] text-slate-400">Class of {formData.gradYear || "2026"}</span>
            </div>

            {/* Inputs: Name & Degree */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Candidate Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full bg-slate-900 text-xs text-white rounded-xl px-3.5 py-2.5 border border-slate-800 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Current Degree / Program
                </label>
                <input
                  type="text"
                  value={formData.education}
                  onChange={(e) => handleInputChange("education", e.target.value)}
                  className="w-full bg-slate-900 text-xs text-white rounded-xl px-3.5 py-2.5 border border-slate-800 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            {/* Inputs: CGPA & University */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-300">
                    CGPA / Academic Score
                  </label>
                  <span className="text-xs font-bold text-indigo-400">{formData.gpa}</span>
                </div>
                <input
                  type="text"
                  value={formData.gpa}
                  onChange={(e) => handleInputChange("gpa", e.target.value)}
                  className="w-full bg-slate-900 text-xs text-white rounded-xl px-3.5 py-2.5 border border-slate-800 focus:outline-none focus:border-indigo-500"
                  placeholder="e.g. 8.8 / 10.0"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  University / College Institution
                </label>
                <input
                  type="text"
                  value={formData.university || "Indian Institute of Information Technology (IIIT)"}
                  onChange={(e) => handleInputChange("university", e.target.value)}
                  className="w-full bg-slate-900 text-xs text-white rounded-xl px-3.5 py-2.5 border border-slate-800 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            {/* Target Role & Career Track */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Target Employability Field
              </label>
              <select
                value={formData.field}
                onChange={(e) => {
                  const fieldKey = e.target.value;
                  const config = CAREER_FIELDS[fieldKey];
                  setFormData((prev) => ({
                    ...prev,
                    field: fieldKey,
                    targetRole: config ? config.targetRole : prev.targetRole
                  }));
                }}
                className="w-full bg-slate-900 text-xs text-indigo-300 font-semibold rounded-xl px-3.5 py-2.5 border border-slate-800 focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                {Object.keys(CAREER_FIELDS).map((key) => (
                  <option key={key} value={key} className="bg-slate-900 text-slate-200">
                    {CAREER_FIELDS[key].name} ({CAREER_FIELDS[key].targetRole})
                  </option>
                ))}
              </select>
            </div>

            {/* Extracted Structured Skills Tag Box */}
            <div className="space-y-2 pt-2">
              <label className="block text-xs font-semibold text-slate-300">
                Verified Structured Skills ({formData.skills.length} active)
              </label>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-wrap gap-2 min-h-[90px]">
                {formData.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-indigo-500/15 text-indigo-200 border border-indigo-500/30"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-slate-400 hover:text-rose-400 transition-colors"
                      title={`Remove ${skill}`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>

              {/* Add Custom Skill Form */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkillInput}
                  onChange={(e) => setNewSkillInput(e.target.value)}
                  placeholder="Type a skill (e.g. PyTorch, MLOps, Docker)..."
                  className="flex-1 bg-slate-900 text-xs text-white rounded-xl px-3.5 py-2 border border-slate-800 focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-1 border border-slate-700 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Skill</span>
                </button>
              </div>
            </div>

            {/* Submit Action Button */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all hover:scale-[1.02] disabled:opacity-50"
              >
                <Sparkles className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
                <span>
                  {isLoading ? "Running Autonomous AI Diagnostic..." : "Save & Run AI Diagnostics"}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
