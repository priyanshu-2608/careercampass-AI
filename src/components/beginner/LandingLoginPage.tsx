"use client";

import React, { useState } from "react";
import {
  Compass,
  Code,
  BarChart2,
  Cloud,
  Layout,
  Shield,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  User,
  GraduationCap,
  Key,
  Briefcase
} from "lucide-react";
import { DOMAINS_DATA, DomainInfo } from "@/lib/data/beginnerData";

interface LandingLoginPageProps {
  onLogin: (userData: {
    name: string;
    education: string;
    domainId: string;
    apiKey?: string;
  }) => void;
}

export default function LandingLoginPage({ onLogin }: LandingLoginPageProps) {
  const [name, setName] = useState<string>("Priyanshu Gangwar");
  const [education, setEducation] = useState<string>("B.Tech in Computer Science");
  const [selectedDomainId, setSelectedDomainId] = useState<string>("web-development");
  const [apiKey, setApiKey] = useState<string>("");
  const [showApiKeyInput, setShowApiKeyInput] = useState<boolean>(false);

  const getDomainIcon = (iconName: string) => {
    switch (iconName) {
      case "Code":
        return <Code className="w-6 h-6 text-blue-600" />;
      case "BarChart2":
        return <BarChart2 className="w-6 h-6 text-blue-600" />;
      case "Cloud":
        return <Cloud className="w-6 h-6 text-blue-600" />;
      case "Layout":
        return <Layout className="w-6 h-6 text-blue-600" />;
      case "Shield":
        return <Shield className="w-6 h-6 text-blue-600" />;
      default:
        return <Compass className="w-6 h-6 text-blue-600" />;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onLogin({
      name: name.trim(),
      education: education.trim() || "Undergraduate Student",
      domainId: selectedDomainId,
      apiKey: apiKey.trim()
    });
  };

  const handleQuickDemo = (domainId: string) => {
    onLogin({
      name: "Priyanshu Gangwar",
      education: "B.Tech Computer Science (Final Year)",
      domainId,
      apiKey: apiKey.trim()
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between">
      {/* Top Simple Header */}
      <header className="bg-white border-b border-blue-100 shadow-sm sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/30">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-slate-900 tracking-tight">
                Career<span className="text-blue-600">Compass</span> AI
              </span>
              <span className="text-[10px] text-blue-600 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full font-bold ml-2">
                Beginner Edition
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleQuickDemo("web-development")}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 transition-all hidden sm:flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>1-Click Demo Login</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 w-full flex-1 space-y-12">
        {/* Hero Section */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 text-blue-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Simple & Smart Career Guide for College Students
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Choose Your Domain, <span className="text-blue-600">Bridge Skill Gaps</span> & Get Job-Ready
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            A friendly beginner platform powered by AI. Select what you want to learn, get step-by-step guidance, free courses, AI resume scoring, and live internship matches.
          </p>
        </div>

        {/* Login & Domain Selection Form Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-blue-500/5 border border-blue-100 p-6 sm:p-8 space-y-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Student Profile Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                  <User className="w-4 h-4" />
                </div>
                <h2 className="text-base font-bold text-slate-900">
                  Step 1: Your Student Details
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Priyanshu Gangwar"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Current Degree / College Year
                  </label>
                  <input
                    type="text"
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    placeholder="e.g. B.Tech Computer Science (3rd Year)"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Choose Career Domain */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <h2 className="text-base font-bold text-slate-900">
                    Step 2: Choose Your Target Domain
                  </h2>
                </div>
                <span className="text-xs text-blue-600 font-medium">Click a card to select</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {Object.values(DOMAINS_DATA).map((domain) => {
                  const isSelected = selectedDomainId === domain.id;
                  return (
                    <div
                      key={domain.id}
                      onClick={() => setSelectedDomainId(domain.id)}
                      className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? "bg-blue-50/80 border-blue-600 shadow-md shadow-blue-500/10"
                          : "bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                            {getDomainIcon(domain.iconName)}
                          </div>
                          {isSelected ? (
                            <span className="flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                              Selected
                            </span>
                          ) : (
                            <span className="text-[10px] text-slate-500 font-medium bg-slate-100 px-2 py-0.5 rounded-full">
                              {domain.badge}
                            </span>
                          )}
                        </div>

                        <h3 className="font-bold text-slate-900 text-sm">{domain.name}</h3>
                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {domain.tagline}
                        </p>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                        <span>Avg: <strong className="text-slate-800">{domain.avgSalary}</strong></span>
                        <span className="text-blue-600 font-semibold">{domain.marketDemand}% Demand</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Optional Gemini API Key */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowApiKeyInput(!showApiKeyInput)}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1.5 transition-colors"
              >
                <Key className="w-3.5 h-3.5" />
                <span>
                  {showApiKeyInput ? "Hide API Key field" : "Have a Google Gemini API Key? (Optional)"}
                </span>
              </button>

              {showApiKeyInput && (
                <div className="mt-3 p-3.5 rounded-xl bg-blue-50/60 border border-blue-100 space-y-2">
                  <label className="block text-xs font-semibold text-slate-700">
                    Google Gemini API Key
                  </label>
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Paste AIzaSy... (leave blank to use built-in demo AI mode)"
                    className="w-full bg-white border border-blue-200 focus:border-blue-500 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none"
                  />
                  <p className="text-[11px] text-slate-500">
                    If left blank, CareerCompass AI runs in smart autonomous demo mode with instant results.
                  </p>
                </div>
              )}
            </div>

            {/* Login & Redirect Button */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500">
                Selected: <strong className="text-blue-700 font-semibold">{DOMAINS_DATA[selectedDomainId]?.name}</strong>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Log In & Start Career Analysis</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* 5 Features Preview Cards for Beginners */}
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-bold text-slate-900">What You Get Inside</h3>
            <p className="text-xs text-slate-500">5 simple tools designed specifically for students</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {[
              {
                letter: "A",
                title: "Domain Analysis",
                desc: "Market demand, required skills, and salary expectations."
              },
              {
                letter: "B",
                title: "Career & Skill Gap",
                desc: "Check off skills and discover your exact missing gaps."
              },
              {
                letter: "C",
                title: "Courses & Certificates",
                desc: "Curated free & govt-approved courses (Coursera, NPTEL)."
              },
              {
                letter: "D",
                title: "AI Resume Analyser",
                desc: "Get an instant 1-100 score, keywords, and tips."
              },
              {
                letter: "E",
                title: "Jobs & Internships",
                desc: "Verified student openings matching your chosen domain."
              }
            ].map((f) => (
              <div
                key={f.letter}
                className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm space-y-1.5"
              >
                <div className="w-6 h-6 rounded-md bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                  {f.letter}
                </div>
                <h4 className="font-bold text-slate-900 text-xs">{f.title}</h4>
                <p className="text-[11px] text-slate-500 leading-snug">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <p>CareerCompass AI • Designed for Students & Beginners • Light Theme Edition</p>
      </footer>
    </div>
  );
}
