"use client";

import React, { useState, useRef } from "react";
import {
  X,
  User,
  GraduationCap,
  Award,
  Briefcase,
  UploadCloud,
  Check,
  Plus,
  FileText,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Trash2
} from "lucide-react";
import { UserProfile } from "@/types";
import { CAREER_FIELDS } from "@/lib/data/mockData";
import { triggerCelebrationConfetti } from "@/lib/confetti";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: UserProfile;
  onSaveProfile: (profile: UserProfile) => void;
}

export default function OnboardingModal({
  isOpen,
  onClose,
  currentProfile,
  onSaveProfile
}: OnboardingModalProps) {
  const [step, setStep] = useState<1 | 2>(1);

  // Step 1 states
  const [name, setName] = useState(currentProfile.name);
  const [education, setEducation] = useState(currentProfile.education);
  const [gpa, setGpa] = useState(currentProfile.gpa);
  const [field, setField] = useState(currentProfile.field);

  // Step 2 states
  const [selectedSkills, setSelectedSkills] = useState<string[]>(currentProfile.skills);
  const [customSkillInput, setCustomSkillInput] = useState("");
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string } | null>(
    currentProfile.resumeFile ? { name: currentProfile.resumeFile.name, size: currentProfile.resumeFile.size } : null
  );
  const [isDragging, setIsDragging] = useState(false);
  const [isParsingPdf, setIsParsingPdf] = useState(false);
  const [parseSuccessMsg, setParseSuccessMsg] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const currentFieldConfig = CAREER_FIELDS[field] || CAREER_FIELDS["Data Science"];

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleAddCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customSkillInput.trim()) return;
    const clean = customSkillInput.trim();
    if (!selectedSkills.includes(clean)) {
      setSelectedSkills([...selectedSkills, clean]);
    }
    setCustomSkillInput("");
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processResumeFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processResumeFile(e.target.files[0]);
    }
  };

  const processResumeFile = (file: File) => {
    const sizeKb = Math.round(file.size / 1024);
    setUploadedFile({
      name: file.name,
      size: `${sizeKb} KB`
    });

    setIsParsingPdf(true);
    setParseSuccessMsg("");

    // Simulate AI parsing of PDF
    setTimeout(() => {
      setIsParsingPdf(false);
      setParseSuccessMsg("AI parsed resume: 6 skills verified & synced!");
      // Automatically add relevant skills if not already selected
      const autoDiscovered = currentFieldConfig.defaultRequiredSkills.slice(0, 4);
      setSelectedSkills(prev => Array.from(new Set([...prev, ...autoDiscovered])));
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedProfile: UserProfile = {
      name: name.trim() || "Priyanshu Gangwar",
      education: education.trim() || "B.Tech Data Science",
      gpa: gpa.trim() || "8.8 / 10.0",
      field: field,
      targetRole: currentFieldConfig.targetRole,
      skills: selectedSkills.length > 0 ? selectedSkills : currentFieldConfig.defaultRequiredSkills.slice(0, 4),
      resumeFile: uploadedFile ? {
        name: uploadedFile.name,
        size: uploadedFile.size,
        uploadedAt: "Just now"
      } : undefined,
      resumeBullets: currentProfile.resumeBullets
    };

    onSaveProfile(updatedProfile);
    triggerCelebrationConfetti();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header with Progress Steps */}
        <div className="p-6 border-b border-slate-800 bg-slate-950/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold">
              {step === 1 ? "1" : "2"}
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-outfit">
                {step === 1 ? "Step 1: Academic & Profile Details" : "Step 2: Interactive Skills & Resume Upload"}
              </h2>
              <p className="text-xs text-slate-400">
                {step === 1
                  ? "Enter your academic credentials and primary domain of interest"
                  : "Select verified skills and upload your resume for automated parsing"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Pills */}
        <div className="px-6 py-2.5 bg-slate-950/30 border-b border-slate-800/60 flex items-center gap-2">
          <button
            onClick={() => setStep(1)}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              step === 1
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "bg-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>1. Profile & GPA</span>
          </button>

          <button
            onClick={() => setStep(2)}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              step === 2
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "bg-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>2. Skills & PDF Resume</span>
          </button>
        </div>

        {/* Modal Form Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {step === 1 ? (
            <div className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-indigo-400" />
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Priyanshu Gangwar"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              {/* Education Level */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
                  Education Level
                </label>
                <select
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                >
                  <option value="B.Tech in Data Science & Artificial Intelligence">
                    B.Tech in Data Science & Artificial Intelligence
                  </option>
                  <option value="B.Tech in Computer Science & Engineering">
                    B.Tech in Computer Science & Engineering
                  </option>
                  <option value="B.Tech in Information Technology">
                    B.Tech in Information Technology
                  </option>
                  <option value="BCA / MCA (Computer Applications)">
                    BCA / MCA (Computer Applications)
                  </option>
                  <option value="B.Sc / M.Sc in Data Science / Mathematics">
                    B.Sc / M.Sc in Data Science / Mathematics
                  </option>
                  <option value="Diploma in Engineering / PolyTech">
                    Diploma in Engineering / PolyTech
                  </option>
                  <option value="Class 12 / Senior Secondary">
                    Class 12 / Senior Secondary
                  </option>
                  <option value="Postgraduate / Master's Degree">
                    Postgraduate / Master's Degree
                  </option>
                </select>
              </div>

              {/* Past Academic Record / GPA */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-indigo-400" />
                  Past Academic Record / GPA (or % marks)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={gpa}
                    onChange={(e) => setGpa(e.target.value)}
                    placeholder="e.g. 8.8 / 10.0 or 85%"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-500">CGPA / %</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Used by the Employability Engine to compute eligibility for PSUs, NATS, and top tech recruiters.
                </p>
              </div>

              {/* Field of Interest */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
                  Field of Interest
                </label>
                <select
                  value={field}
                  onChange={(e) => {
                    const newField = e.target.value;
                    setField(newField);
                    // update default skills for that field
                    const config = CAREER_FIELDS[newField];
                    if (config) {
                      setSelectedSkills(config.defaultRequiredSkills.slice(0, 4));
                    }
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                >
                  <option value="Data Science">Data Science & AI (Machine Learning, Deep Learning, MLOps)</option>
                  <option value="Technology">Technology & Software (Full Stack, React, Node.js)</option>
                  <option value="Business">Business & Product (Analytics, Product Strategy, BI)</option>
                  <option value="Design">UI/UX & Product Design (Figma, Systems, Research)</option>
                  <option value="Government Jobs">Government Jobs & PSUs (DRDO, ISRO, NIC, CDAC)</option>
                </select>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Interactive Skill Selector */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    Your Skills (Interactive Tag Selector)
                  </label>
                  <span className="text-xs text-indigo-400 font-medium">
                    {selectedSkills.length} selected
                  </span>
                </div>

                <div className="space-y-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                  {currentFieldConfig.availableSkills.map((cat) => (
                    <div key={cat.category} className="space-y-1.5">
                      <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                        {cat.category}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.skills.map((skill) => {
                          const isSelected = selectedSkills.some(
                            s => s.toLowerCase() === skill.toLowerCase()
                          );
                          return (
                            <button
                              key={skill}
                              type="button"
                              onClick={() => toggleSkill(skill)}
                              className={`px-2.5 py-1 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-all ${
                                isSelected
                                  ? "bg-indigo-600/30 border-indigo-500 text-indigo-200 shadow-sm shadow-indigo-500/20"
                                  : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                              }`}
                            >
                              <div
                                className={`w-3.5 h-3.5 rounded flex items-center justify-center border text-[9px] ${
                                  isSelected
                                    ? "bg-indigo-600 border-indigo-400 text-white"
                                    : "border-slate-700 bg-slate-950 text-transparent"
                                }`}
                              >
                                <Check className="w-2.5 h-2.5" />
                              </div>
                              <span>{skill}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}

                  {/* Add Custom Skill Tag Input */}
                  <form onSubmit={handleAddCustomSkill} className="pt-2 flex items-center gap-2">
                    <input
                      type="text"
                      value={customSkillInput}
                      onChange={(e) => setCustomSkillInput(e.target.value)}
                      placeholder="Add custom skill (e.g. LangChain, Kubernetes)..."
                      className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium flex items-center gap-1 border border-slate-700"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add</span>
                    </button>
                  </form>
                </div>
              </div>

              {/* Drag-and-Drop Resume PDF Upload Box */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                  <UploadCloud className="w-3.5 h-3.5 text-cyan-400" />
                  Drag-and-Drop Resume PDF Upload Box
                </label>

                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleFileDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                    isDragging
                      ? "border-cyan-400 bg-cyan-500/10"
                      : uploadedFile
                      ? "border-emerald-500/50 bg-emerald-500/5"
                      : "border-slate-700 bg-slate-950 hover:border-slate-600 hover:bg-slate-950/80"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.docx"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />

                  {uploadedFile ? (
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div className="text-sm font-semibold text-white">
                        {uploadedFile.name}
                      </div>
                      <div className="text-xs text-slate-400">
                        {uploadedFile.size} • PDF Document
                      </div>

                      {isParsingPdf && (
                        <div className="flex items-center gap-2 text-xs text-indigo-400 font-medium">
                          <Sparkles className="w-3.5 h-3.5 animate-spin" />
                          <span>Gemini 2.5 Flash analyzing resume syntax...</span>
                        </div>
                      )}

                      {parseSuccessMsg && (
                        <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-800/60">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{parseSuccessMsg}</span>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setUploadedFile(null);
                          setParseSuccessMsg("");
                        }}
                        className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 pt-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Remove and re-upload</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                        <UploadCloud className="w-6 h-6" />
                      </div>
                      <div className="text-sm font-semibold text-white">
                        Drop your Resume PDF here, or <span className="text-indigo-400 underline">browse files</span>
                      </div>
                      <div className="text-xs text-slate-400 max-w-xs">
                        Supports PDF up to 10MB. AI automatically parses skills, experience, and project metrics.
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-slate-800 bg-slate-950/70 flex items-center justify-between gap-3">
          {step === 1 ? (
            <div className="flex items-center justify-between w-full">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-2 shadow-lg shadow-indigo-600/25 transition-all"
              >
                <span>Continue to Step 2: Skills & Resume</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Step 1</span>
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Complete Onboarding & View Dashboard</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
