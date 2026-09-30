"use client";

import React, { useState, useEffect } from "react";
import LandingLoginPage from "@/components/beginner/LandingLoginPage";
import SimpleNavbar from "@/components/beginner/SimpleNavbar";
import FiveFeatureTabs, { FeatureTabId } from "@/components/beginner/FiveFeatureTabs";
import DomainAnalysisView from "@/components/beginner/DomainAnalysisView";
import CareerSkillGapView from "@/components/beginner/CareerSkillGapView";
import CoursesCertificationsView from "@/components/beginner/CoursesCertificationsView";
import ResumeAnalyserAiView from "@/components/beginner/ResumeAnalyserAiView";
import JobsInternshipsView from "@/components/beginner/JobsInternshipsView";
import ApiKeyModal from "@/components/ApiKeyModal";
import { DOMAINS_DATA } from "@/lib/data/beginnerData";
import { Sparkles, ArrowRight } from "lucide-react";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true); // Logged in by default for instant evaluation, toggleable
  const [userName, setUserName] = useState<string>("Priyanshu Gangwar");
  const [education, setEducation] = useState<string>("B.Tech Computer Science (3rd Year)");
  const [selectedDomainId, setSelectedDomainId] = useState<string>("web-development");
  const [activeFeatureTab, setActiveFeatureTab] = useState<FeatureTabId>("a-domain-analysis");
  const [customApiKey, setCustomApiKey] = useState<string>("");
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState<boolean>(false);

  // Load saved API key from localStorage if present
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedKey = localStorage.getItem("gemini_user_api_key");
      if (storedKey) {
        setCustomApiKey(storedKey);
      }
    }
  }, []);

  const handleSaveApiKey = (key: string) => {
    setCustomApiKey(key);
    if (typeof window !== "undefined") {
      if (key) {
        localStorage.setItem("gemini_user_api_key", key);
      } else {
        localStorage.removeItem("gemini_user_api_key");
      }
    }
  };

  const handleLogin = (userData: {
    name: string;
    education: string;
    domainId: string;
    apiKey?: string;
  }) => {
    setUserName(userData.name);
    setEducation(userData.education);
    setSelectedDomainId(userData.domainId);
    if (userData.apiKey) {
      handleSaveApiKey(userData.apiKey);
    }
    setIsLoggedIn(true);
    setActiveFeatureTab("a-domain-analysis");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentDomain = DOMAINS_DATA[selectedDomainId] || DOMAINS_DATA["web-development"];

  // Screen 1: Simple Landing & Login Page
  if (!isLoggedIn) {
    return <LandingLoginPage onLogin={handleLogin} />;
  }

  // Screen 2: Clean, Beginner-Friendly Dashboard
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between font-sans">
      {/* Clean White & Blue Navbar */}
      <SimpleNavbar
        userName={userName}
        education={education}
        selectedDomainId={selectedDomainId}
        onSelectDomain={(id) => setSelectedDomainId(id)}
        onLogout={handleLogout}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        hasCustomKey={!!customApiKey}
      />

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 w-full flex-1 space-y-8">
        {/* Welcome Student Banner */}
        <div className="bg-white p-6 sm:p-7 rounded-2xl border border-blue-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-slate-500">Student Workspace</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Hello, {userName}!
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Your personalized AI career roadmap for{" "}
              <strong className="text-blue-700 font-bold">{currentDomain.name}</strong> • {education}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsApiKeyModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200 flex items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>{customApiKey ? "Gemini Key Active" : "Gemini AI Config"}</span>
            </button>
          </div>
        </div>

        {/* 5 Core Feature Icons / Navigation Cards */}
        <FiveFeatureTabs
          activeTab={activeFeatureTab}
          onSelectTab={(tabId) => setActiveFeatureTab(tabId)}
          domainName={currentDomain.name}
        />

        {/* Active Feature Workspace View */}
        <div className="transition-all duration-300">
          {/* Feature {a}: Domain Analysis */}
          {activeFeatureTab === "a-domain-analysis" && (
            <DomainAnalysisView
              domain={currentDomain}
              userApiKey={customApiKey}
              onNavigateToTab={(tabId) => setActiveFeatureTab(tabId as FeatureTabId)}
            />
          )}

          {/* Feature {b}: Career & Skill Gap Guide */}
          {activeFeatureTab === "b-skill-gap" && (
            <CareerSkillGapView
              domain={currentDomain}
              onNavigateToCourses={() => setActiveFeatureTab("c-courses")}
            />
          )}

          {/* Feature {c}: Courses & Certifications */}
          {activeFeatureTab === "c-courses" && (
            <CoursesCertificationsView domain={currentDomain} />
          )}

          {/* Feature {d}: AI Resume Analyser */}
          {activeFeatureTab === "d-resume-analyser" && (
            <ResumeAnalyserAiView
              domain={currentDomain}
              userApiKey={customApiKey}
              userName={userName}
            />
          )}

          {/* Feature {e}: Internships & Jobs */}
          {activeFeatureTab === "e-jobs" && (
            <JobsInternshipsView domain={currentDomain} />
          )}
        </div>
      </main>

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        apiKey={customApiKey}
        onSaveKey={handleSaveApiKey}
      />

      {/* Clean Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            CareerCompass AI • Clean Beginner Prototype • Theme: White & Light Blue
          </p>
          <div className="flex items-center gap-3 text-blue-600 font-semibold">
            <button
              onClick={() => setActiveFeatureTab("a-domain-analysis")}
              className="hover:underline"
            >
              Domain Analysis
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveFeatureTab("b-skill-gap")}
              className="hover:underline"
            >
              Skill Gaps
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveFeatureTab("d-resume-analyser")}
              className="hover:underline"
            >
              AI Resume
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
