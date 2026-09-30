"use client";

import React, { useState } from "react";
import {
  Compass,
  User,
  Sparkles,
  LogOut,
  ChevronDown,
  Key,
  CheckCircle2,
  Briefcase
} from "lucide-react";
import { DOMAINS_DATA } from "@/lib/data/beginnerData";

interface SimpleNavbarProps {
  userName: string;
  education: string;
  selectedDomainId: string;
  onSelectDomain: (domainId: string) => void;
  onLogout: () => void;
  onOpenApiKeyModal: () => void;
  hasCustomKey: boolean;
}

export default function SimpleNavbar({
  userName,
  education,
  selectedDomainId,
  onSelectDomain,
  onLogout,
  onOpenApiKeyModal,
  hasCustomKey
}: SimpleNavbarProps) {
  const [isDomainDropdownOpen, setIsDomainDropdownOpen] = useState(false);
  const activeDomain = DOMAINS_DATA[selectedDomainId] || DOMAINS_DATA["web-development"];

  return (
    <header className="bg-white border-b border-blue-100 shadow-sm sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base sm:text-lg text-slate-900 tracking-tight">
                Career<span className="text-blue-600">Compass</span> AI
              </span>
              <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 rounded-full">
                <Sparkles className="w-3 h-3 text-blue-600" />
                Gemini 2.5
              </span>
            </div>
            <span className="text-[11px] text-slate-500 hidden sm:inline">
              Student Career & Employability Engine
            </span>
          </div>
        </div>

        {/* Right Section: Domain Switcher + User + Logout */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Domain Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDomainDropdownOpen(!isDomainDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-800 text-xs font-semibold transition-all"
            >
              <Briefcase className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden xs:inline">Domain:</span>
              <strong className="text-blue-700">{activeDomain.name}</strong>
              <ChevronDown className="w-3.5 h-3.5 text-blue-500" />
            </button>

            {isDomainDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-blue-100 rounded-xl shadow-xl py-1.5 z-50 text-xs">
                <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  Switch Active Domain
                </div>
                {Object.values(DOMAINS_DATA).map((d) => (
                  <button
                    key={d.id}
                    onClick={() => {
                      onSelectDomain(d.id);
                      setIsDomainDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-blue-50 transition-colors ${
                      selectedDomainId === d.id
                        ? "bg-blue-50 font-bold text-blue-700"
                        : "text-slate-700"
                    }`}
                  >
                    <span>{d.name}</span>
                    {selectedDomainId === d.id && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Profile Chip */}
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center">
              {userName.charAt(0)}
            </div>
            <span className="font-semibold text-slate-800">{userName}</span>
          </div>

          {/* API Key Config Button */}
          <button
            onClick={onOpenApiKeyModal}
            className={`p-2 rounded-xl text-xs font-semibold border transition-all ${
              hasCustomKey
                ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
            }`}
            title="Configure Gemini API Key"
          >
            <Key className="w-3.5 h-3.5" />
          </button>

          {/* Logout / Switch User */}
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            title="Return to Login / Landing page"
          >
            <LogOut className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden md:inline">Log Out</span>
          </button>
        </div>
      </div>
    </header>
  );
}
