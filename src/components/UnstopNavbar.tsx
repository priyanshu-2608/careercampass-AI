"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Compass,
  Sparkles,
  Search,
  Bell,
  ChevronDown,
  Building,
  Key,
  CheckCircle,
  ExternalLink,
  X,
  User,
  GraduationCap,
  ShieldCheck,
  Briefcase,
  BookOpen,
  Sun,
  Moon
} from "lucide-react";
import { UserProfile } from "@/types";

interface UnstopNavbarProps {
  userProfile: UserProfile;
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  onOpenApiKeyModal: () => void;
  onOpenOnboarding: () => void;
  hasCustomKey: boolean;
  selectedField: string;
  onSelectField: (field: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onGlobalSearchSelect?: (tabId: string, itemQuery?: string) => void;
}

export default function UnstopNavbar({
  userProfile,
  activeTab,
  onSelectTab,
  onOpenApiKeyModal,
  onOpenOnboarding,
  hasCustomKey,
  selectedField,
  onSelectField,
  searchQuery,
  onSearchChange,
  onGlobalSearchSelect
}: UnstopNavbarProps) {
  const [selectedPersona, setSelectedPersona] = useState<string>("Talent / Student");
  const [isPersonaOpen, setIsPersonaOpen] = useState<boolean>(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setIsNotificationOpen(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard shortcut Ctrl+K / Cmd+K to focus search
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const notifications = [
    {
      id: "n1",
      title: "DRDO Graduate Apprenticeship closing in 3 days",
      time: "10 mins ago",
      type: "govt",
      tab: "govt-feed",
      read: false
    },
    {
      id: "n2",
      title: "Google India AI & ML Intern: 94% Match found for your profile",
      time: "1 hour ago",
      type: "job",
      tab: "jobs",
      read: false
    },
    {
      id: "n3",
      title: "Employability Index updated to 78/100 by Gemini 2.5 Flash",
      time: "2 hours ago",
      type: "system",
      tab: "dashboard",
      read: true
    },
    {
      id: "n4",
      title: "New AICTE-approved Deep Learning course added by IIT Madras",
      time: "Yesterday",
      type: "course",
      tab: "courses",
      read: true
    }
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  const quickSearchSuggestions = [
    { label: "Data Science & AI Roadmap", tab: "roadmap", icon: Compass },
    { label: "MLOps & Docker Skill Gaps", tab: "skill-gaps", icon: ShieldCheck },
    { label: "DRDO & ISRO Govt Schemes", tab: "govt-feed", icon: Building },
    { label: "Google AI Intern (94% Match)", tab: "jobs", icon: Briefcase },
    { label: "Coursera & NPTEL Deep Learning", tab: "courses", icon: BookOpen }
  ];

  const filteredSuggestions = searchQuery.trim()
    ? quickSearchSuggestions.filter((item) =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : quickSearchSuggestions;

  const handleSuggestionClick = (tabId: string) => {
    onSelectTab(tabId);
    setIsSearchFocused(false);
    onSearchChange("");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-[#070b14]/90 backdrop-blur-xl transition-all">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-5 lg:px-6 h-16 flex items-center justify-between gap-3 sm:gap-6">
        {/* ================= LEFT SECTION: App Title + Talent Selector ================= */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Logo & Brand */}
          <div
            onClick={() => onSelectTab("dashboard")}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1.5px] shadow-md shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Compass className="w-5 h-5 text-indigo-400 group-hover:rotate-45 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-outfit font-extrabold text-base sm:text-lg text-white tracking-tight">
                  Career<span className="text-gradient">Compass</span>
                  <span className="text-xs font-semibold text-cyan-400 ml-1">AI</span>
                </span>
                <span className="hidden xl:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[9px] font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 rounded-full">
                  <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
                  2.5 Flash
                </span>
              </div>
              <span className="text-[10px] text-slate-400 -mt-0.5 hidden md:inline">
                Employability & Readiness Engine
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-6 w-[1px] bg-slate-800 hidden sm:block" />

          {/* Talent / Student View Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsPersonaOpen(!isPersonaOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-900/90 hover:bg-slate-800/90 text-slate-200 border border-slate-700/80 transition-all shadow-sm"
              title="Switch user perspective"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="hidden xs:inline">{selectedPersona}</span>
              <span className="xs:hidden">Talent</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isPersonaOpen && (
              <div className="absolute top-full left-0 mt-1.5 w-52 bg-slate-900 border border-slate-700/90 rounded-xl shadow-2xl py-1 z-50 text-xs">
                <div className="px-3 py-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                  Switch Portal View
                </div>
                {[
                  { name: "Talent / Student", desc: "For job seekers & undergrads", active: true },
                  { name: "For Recruiters", desc: "Talent pipeline & ATS search", active: false },
                  { name: "University Admin", desc: "College placement analytics", active: false }
                ].map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      setSelectedPersona(item.name);
                      setIsPersonaOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex flex-col transition-colors hover:bg-slate-800/80 ${
                      selectedPersona === item.name
                        ? "bg-indigo-600/15 text-indigo-300 font-medium"
                        : "text-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{item.name}</span>
                      {selectedPersona === item.name && (
                        <CheckCircle className="w-3.5 h-3.5 text-indigo-400" />
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400">{item.desc}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ================= CENTER SECTION: Large Global Search Bar ================= */}
        <div className="flex-1 max-w-2xl relative mx-1 sm:mx-4">
          <div
            className={`flex items-center w-full bg-slate-900/90 border rounded-xl px-3 sm:px-3.5 py-1.5 sm:py-2 text-xs transition-all shadow-inner ${
              isSearchFocused
                ? "border-indigo-500 ring-2 ring-indigo-500/20 bg-slate-900"
                : "border-slate-800 hover:border-slate-700"
            }`}
          >
            <Search className="w-4 h-4 text-slate-400 shrink-0 mr-2.5" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              placeholder="Search job roles, skill gaps, courses, government schemes..."
              className="bg-transparent text-slate-200 placeholder:text-slate-500 focus:outline-none w-full text-xs font-normal"
            />
            {searchQuery ? (
              <button
                onClick={() => onSearchChange("")}
                className="text-slate-400 hover:text-white p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-800 border border-slate-700 rounded shadow-sm">
                Ctrl K
              </kbd>
            )}
          </div>

          {/* Search suggestions dropdown */}
          {isSearchFocused && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 z-50 text-xs">
              <div className="flex items-center justify-between px-2.5 py-1 text-[11px] text-slate-400 font-medium">
                <span>{searchQuery ? "Matching Results" : "Quick Jumps & In-Demand Search"}</span>
                <span className="text-[10px] text-indigo-400">Click to navigate</span>
              </div>
              <div className="space-y-1 mt-1">
                {filteredSuggestions.length > 0 ? (
                  filteredSuggestions.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={idx}
                        onMouseDown={() => handleSuggestionClick(item.tab)}
                        className="w-full text-left flex items-center justify-between px-2.5 py-2 rounded-lg hover:bg-slate-800 text-slate-200 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-md bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <span>{item.label}</span>
                        </div>
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                          {item.tab}
                        </span>
                      </button>
                    );
                  })
                ) : (
                  <div className="px-3 py-3 text-center text-slate-400 text-xs">
                    No immediate match for &ldquo;{searchQuery}&rdquo;. Try &quot;Python&quot;, &quot;DRDO&quot;, or &quot;Google&quot;.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ================= RIGHT SECTION: Business CTA, Bell, Profile Avatar ================= */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* For Business / Universities CTA Button */}
          <button
            onClick={() => onSelectTab("dashboard")}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-indigo-500/50 transition-all shadow-sm group"
          >
            <Building className="w-3.5 h-3.5 text-indigo-400 group-hover:text-cyan-400 transition-colors" />
            <span>For Business / Universities</span>
            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 ml-0.5">
              Hire
            </span>
          </button>

          {/* Gemini API Key indicator / Config */}
          <button
            onClick={onOpenApiKeyModal}
            title={
              hasCustomKey
                ? "Gemini 2.5 Flash Live API key connected"
                : "Gemini 2.5 Flash Autonomous Simulation (Click to add custom key)"
            }
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              hasCustomKey
                ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/20"
                : "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800"
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                hasCustomKey ? "bg-emerald-400 animate-ping" : "bg-cyan-400"
              }`}
            />
            <Key className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden md:inline">
              {hasCustomKey ? "Gemini Live" : "API Config"}
            </span>
          </button>

          {/* Notification Bell with Badge and Flyout */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-indigo-600 text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-[#070b14]">
                  {unreadCount}
                </span>
              )}
            </button>

            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-3 z-50 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-1.5 font-bold text-white">
                    <Bell className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Notifications & Alerts</span>
                  </div>
                  <span className="text-[10px] text-indigo-300 bg-indigo-500/20 px-2 py-0.5 rounded-full font-medium">
                    {unreadCount} Unread
                  </span>
                </div>

                <div className="divide-y divide-slate-800/80 max-h-72 overflow-y-auto mt-1">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        onSelectTab(n.tab);
                        setIsNotificationOpen(false);
                      }}
                      className={`py-2.5 px-2 rounded-lg cursor-pointer transition-colors flex items-start gap-2.5 ${
                        !n.read
                          ? "bg-indigo-600/10 hover:bg-indigo-600/20"
                          : "hover:bg-slate-800/60"
                      }`}
                    >
                      <div className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                      <div className="flex-1">
                        <p className="text-slate-200 text-xs leading-snug">{n.title}</p>
                        <span className="text-[10px] text-slate-500 mt-1 block">
                          {n.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-800 text-center">
                  <button
                    onClick={() => {
                      onSelectTab("govt-feed");
                      setIsNotificationOpen(false);
                    }}
                    className="text-[11px] text-indigo-400 hover:text-indigo-300 font-medium"
                  >
                    View all opportunities & alerts →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Student Profile Avatar & Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer"
            >
              <div className="relative w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-cyan-500 p-[1.5px] shadow-sm">
                <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center font-bold text-xs text-white">
                  {userProfile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-slate-950" />
              </div>

              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-semibold text-white leading-tight">
                  {userProfile.name.split(" ")[0]}
                </span>
                <span className="text-[10px] text-indigo-300 font-medium leading-none">
                  CGPA: {userProfile.gpa.split(" ")[0]}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-3 z-50 text-xs">
                {/* Profile Card */}
                <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 p-[1.5px]">
                    <div className="w-full h-full bg-slate-950 rounded-[9px] flex items-center justify-center font-bold text-sm text-white">
                      {userProfile.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs">{userProfile.name}</h4>
                    <p className="text-[11px] text-slate-400 line-clamp-1">
                      {userProfile.targetRole}
                    </p>
                    <span className="inline-block mt-0.5 px-2 py-0.2 text-[9px] font-semibold bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/30">
                      Verified Student Profile
                    </span>
                  </div>
                </div>

                <div className="py-2 space-y-1">
                  <button
                    onClick={() => {
                      onSelectTab("profile");
                      setIsProfileOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white flex items-center gap-2"
                  >
                    <User className="w-3.5 h-3.5 text-indigo-400" />
                    <span>View & Edit Academic Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      onOpenApiKeyModal();
                      setIsProfileOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white flex items-center gap-2"
                  >
                    <Key className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Gemini 2.5 Flash API Key</span>
                  </button>
                  <button
                    onClick={() => {
                      onOpenOnboarding();
                      setIsProfileOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white flex items-center gap-2"
                  >
                    <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Restart Onboarding Wizard</span>
                  </button>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Track:</span>
                  <span className="text-indigo-300 font-medium">{selectedField}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
