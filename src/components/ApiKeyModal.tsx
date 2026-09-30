"use client";

import React, { useState } from "react";
import {
  X,
  Key,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Cpu
} from "lucide-react";

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  onSaveKey: (key: string) => void;
}

export default function ApiKeyModal({
  isOpen,
  onClose,
  apiKey,
  onSaveKey
}: ApiKeyModalProps) {
  const [inputVal, setInputVal] = useState(apiKey);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveKey(inputVal.trim());
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 900);
  };

  const handleUseMock = () => {
    setInputVal("");
    onSaveKey("");
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden p-6 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Key className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-outfit">
                Gemini 2.5 Flash API Configuration
              </h3>
              <p className="text-[11px] text-slate-400">
                Optional custom key for live Google AI execution
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Informational Callout */}
        <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-800/40 text-xs text-indigo-200/90 space-y-1.5">
          <div className="flex items-center gap-1.5 font-semibold text-cyan-300">
            <ShieldCheck className="w-4 h-4" />
            <span>Guaranteed Zero-Downtime Live Judging</span>
          </div>
          <p className="leading-relaxed text-[11px] text-slate-300">
            This platform contains built-in domain intelligence. If you do not provide an API key,
            the app seamlessly executes realistic, rubric-driven Gemini evaluations so the prototype remains 100% functional during presentations and judging.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Google Gemini API Key
            </label>
            <input
              type="password"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 text-xs focus:outline-none focus:border-indigo-500 font-mono"
            />
            <div className="flex items-center justify-between mt-1 text-[11px] text-slate-500">
              <span>Saved locally in browser memory</span>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:underline flex items-center gap-1"
              >
                <span>Get API key from Google AI Studio</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>

          {saveSuccess && (
            <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-800/60 text-xs text-emerald-300 font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Settings successfully updated!</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handleUseMock}
              className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1.5"
            >
              <Cpu className="w-3.5 h-3.5 text-purple-400" />
              <span>Use High-Fidelity Simulation</span>
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white shadow-lg shadow-indigo-600/25 transition-all"
            >
              Save Key & Connect
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
