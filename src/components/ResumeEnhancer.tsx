"use client";

import React, { useState } from "react";
import {
  FileText,
  Sparkles,
  Copy,
  Check,
  ArrowRight,
  TrendingUp,
  Tag,
  AlertCircle,
  Plus,
  RefreshCw,
  Lightbulb
} from "lucide-react";
import { ResumeEnhancementItem } from "@/types";

interface ResumeEnhancerProps {
  initialItems: ResumeEnhancementItem[];
  targetRole: string;
  userApiKey?: string;
}

export default function ResumeEnhancer({
  initialItems,
  targetRole,
  userApiKey
}: ResumeEnhancerProps) {
  const [items, setItems] = useState<ResumeEnhancementItem[]>(initialItems);
  const [rawBullets, setRawBullets] = useState<string[]>(
    initialItems.map((i) => i.originalBullet)
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [apiProvider, setApiProvider] = useState<string>("Gemini 2.5 Flash");
  const [newBulletText, setNewBulletText] = useState<string>("");

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleAddBullet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBulletText.trim()) return;
    setRawBullets([...rawBullets, newBulletText.trim()]);
    setNewBulletText("");
  };

  const handleUpdateRawBullet = (index: number, val: string) => {
    const updated = [...rawBullets];
    updated[index] = val;
    setRawBullets(updated);
  };

  const handleEnhance = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/gemini/resume-enhance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(userApiKey ? { "x-gemini-key": userApiKey } : {})
        },
        body: JSON.stringify({
          bullets: rawBullets,
          targetRole,
          userApiKey
        })
      });

      if (!response.ok) {
        throw new Error("Failed to enhance bullets");
      }

      const data = await response.json();
      if (data.items) {
        setItems(data.items);
        setApiProvider(data.provider || "Gemini 2.5 Flash");
      }
    } catch (err) {
      console.warn("API route error, applying local transformer:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="resume-enhancer" className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <FileText className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-bold text-white font-outfit">
              AI Resume Optimizer
            </h2>
            <span className="px-2 py-0.5 text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
              Gemini 2.5 Flash
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Side-by-side editor converting raw resume bullet points into quantified STAR-format statements with recruiter metrics.
          </p>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleEnhance}
            disabled={isLoading}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white shadow-lg shadow-indigo-600/25 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <Sparkles className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : "text-cyan-300"}`} />
            <span>{isLoading ? "Enhancing with Gemini..." : "Enhance with Gemini 2.5 Flash"}</span>
          </button>
        </div>
      </div>

      {/* Side-by-Side Comparison Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Raw User Bullet Points */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-500" />
              Raw User Bullet Points (Input)
            </h3>
            <span className="text-[11px] text-slate-500">Editable</span>
          </div>

          <div className="space-y-3">
            {rawBullets.map((bullet, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 focus-within:border-slate-600 transition-colors"
              >
                <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1.5">
                  <span className="font-mono">Bullet #{idx + 1}</span>
                  <span className="text-[10px] text-slate-500">Draft</span>
                </div>
                <textarea
                  rows={3}
                  value={bullet}
                  onChange={(e) => handleUpdateRawBullet(idx, e.target.value)}
                  className="w-full bg-transparent text-xs text-slate-300 placeholder-slate-600 focus:outline-none resize-none leading-relaxed"
                />
              </div>
            ))}

            {/* Add New Raw Bullet */}
            <form onSubmit={handleAddBullet} className="flex gap-2">
              <input
                type="text"
                value={newBulletText}
                onChange={(e) => setNewBulletText(e.target.value)}
                placeholder="Add another project bullet point..."
                className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-xl text-xs font-medium flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </form>
          </div>
        </div>

        {/* Middle Arrow Indicator on Desktop */}
        <div className="hidden lg:flex lg:col-span-1 flex-col items-center justify-center pt-24 text-slate-600">
          <ArrowRight className="w-6 h-6 text-indigo-400/80 animate-pulse" />
          <span className="text-[10px] font-mono text-indigo-400/80 mt-1">STAR</span>
        </div>

        {/* Right Column: AI-Optimized, Metrics-Driven Bullet Points */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              AI-Optimized & Metrics-Driven (Output)
            </h3>
            <span className="text-[11px] text-cyan-400 font-medium">ATS High-Score Ready</span>
          </div>

          <div className="space-y-4">
            {items.map((item, idx) => (
              <div
                key={item.id || idx}
                className="glass-card p-4 rounded-xl border border-indigo-500/30 hover:border-indigo-500/60 shadow-lg shadow-indigo-950/20 space-y-3 relative overflow-hidden transition-all group"
              >
                {/* Metric Highlight Badge */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-950/50 border border-emerald-800/60 px-2.5 py-0.5 rounded-full">
                    <TrendingUp className="w-3 h-3 text-emerald-400" />
                    <span>{item.metricHighlight}</span>
                  </div>

                  <button
                    onClick={() => handleCopy(item.enhancedBullet, idx)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700"
                    title="Copy enhanced bullet to clipboard"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-slate-400" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Enhanced Bullet Text */}
                <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed">
                  {item.enhancedBullet}
                </p>

                {/* ATS Keywords Added */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-1">
                    <Tag className="w-2.5 h-2.5 text-indigo-400" />
                    Keywords:
                  </span>
                  {item.keywordsAdded.map((kw) => (
                    <span
                      key={kw}
                      className="text-[10px] font-medium px-2 py-0.5 rounded bg-indigo-950/60 text-indigo-300 border border-indigo-800/50"
                    >
                      {kw}
                    </span>
                  ))}
                </div>

                {/* Why this works / Reasoning */}
                <div className="pt-2 border-t border-slate-800/60 flex items-start gap-2 text-[11px] text-slate-400">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>{item.reasoning}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
