"use client";

import React, { useState } from "react";
import {
  Compass,
  Sparkles,
  Key,
  UserCheck,
  Menu,
  X,
  Layers,
  Award,
  BookOpen,
  Briefcase,
  FileText,
  MessageSquare
} from "lucide-react";

interface HeaderProps {
  onOpenOnboarding: () => void;
  onOpenApiKeyModal: () => void;
  hasCustomKey: boolean;
  selectedField: string;
  onSelectField: (field: string) => void;
  activeSection: string;
}

export default function Header({
  onOpenOnboarding,
  onOpenApiKeyModal,
  hasCustomKey,
  selectedField,
  onSelectField,
  activeSection
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Dashboard", href: "#dashboard", icon: Layers },
    { label: "Roadmap", href: "#roadmap", icon: Award },
    { label: "Courses", href: "#courses", icon: BookOpen },
    { label: "Govt Opportunities", href: "#govt-feed", icon: Briefcase },
    { label: "AI Resume", href: "#resume-enhancer", icon: FileText },
    { label: "AI Mock Interview", href: "#mock-interviewer", icon: MessageSquare },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#070b14]/85 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1.5px] shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Compass className="w-5 h-5 text-indigo-400 group-hover:rotate-45 transition-transform duration-300" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-outfit font-bold text-lg text-white tracking-tight">
                Career<span className="text-gradient">Compass</span>
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 rounded-full flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
                2.5 Flash
              </span>
            </div>
            <span className="text-[11px] text-slate-400 -mt-0.5 hidden sm:inline">
              Employability & Readiness Engine
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-300">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.label}
                href={link.href}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs transition-colors ${
                  isActive
                    ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/30"
                    : "hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <Icon className="w-3.5 h-3.5 opacity-70" />
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* Preset Track Selector for quick live judging */}
          <div className="hidden md:flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 px-2.5 py-1 rounded-lg text-xs">
            <span className="text-slate-400">Track:</span>
            <select
              value={selectedField}
              onChange={(e) => onSelectField(e.target.value)}
              className="bg-transparent text-indigo-300 font-medium focus:outline-none cursor-pointer"
            >
              <option value="Data Science" className="bg-slate-900 text-slate-200">Data Science & AI</option>
              <option value="Technology" className="bg-slate-900 text-slate-200">Full Stack Web</option>
              <option value="Business" className="bg-slate-900 text-slate-200">Business Analytics</option>
              <option value="Design" className="bg-slate-900 text-slate-200">UI/UX Design</option>
              <option value="Government Jobs" className="bg-slate-900 text-slate-200">PSU & Govt Jobs</option>
            </select>
          </div>

          {/* API Key Modal Button */}
          <button
            onClick={onOpenApiKeyModal}
            title={hasCustomKey ? "Gemini Custom API Key Connected" : "Running Intelligent Simulation Fallback (Click to configure API Key)"}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              hasCustomKey
                ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/20"
                : "bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700/80"
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${hasCustomKey ? "bg-emerald-400 animate-ping" : "bg-purple-400"}`} />
            <Key className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">
              {hasCustomKey ? "Gemini 2.5 Live" : "API Config"}
            </span>
          </button>

          {/* Register / Login CTA Button */}
          <button
            onClick={onOpenOnboarding}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white shadow-md shadow-indigo-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Register / Login</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-slate-950/95 px-4 pt-2 pb-4 space-y-2">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-800">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-md text-xs text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  <Icon className="w-3.5 h-3.5 text-indigo-400" />
                  {link.label}
                </a>
              );
            })}
          </div>
          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs text-slate-400">Target Track:</span>
            <select
              value={selectedField}
              onChange={(e) => {
                onSelectField(e.target.value);
                setMobileMenuOpen(false);
              }}
              className="bg-slate-900 border border-slate-700 text-indigo-300 text-xs rounded px-2 py-1"
            >
              <option value="Data Science">Data Science & AI</option>
              <option value="Technology">Full Stack Web</option>
              <option value="Business">Business Analytics</option>
              <option value="Design">UI/UX Design</option>
              <option value="Government Jobs">PSU & Govt Jobs</option>
            </select>
          </div>
        </div>
      )}
    </header>
  );
}
