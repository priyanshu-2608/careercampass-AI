"use client";

import React, { useState } from "react";
import {
  MessageSquare,
  Sparkles,
  Send,
  Award,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  RotateCcw,
  Bot,
  User,
  ArrowRight,
  TrendingUp,
  BrainCircuit,
  Lightbulb
} from "lucide-react";
import { MockInterviewMessage } from "@/types";
import { CAREER_FIELDS } from "@/lib/data/mockData";

interface MockInterviewerProps {
  initialMessages: MockInterviewMessage[];
  targetRole: string;
  fieldKey: string;
  userApiKey?: string;
}

export default function MockInterviewer({
  initialMessages,
  targetRole,
  fieldKey,
  userApiKey
}: MockInterviewerProps) {
  const [messages, setMessages] = useState<MockInterviewMessage[]>(initialMessages);
  const [currentAnswer, setCurrentAnswer] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [questionCount, setQuestionCount] = useState<number>(1);

  const fieldConfig = CAREER_FIELDS[fieldKey] || CAREER_FIELDS["Data Science"];
  const currentQuestionText =
    messages.filter((m) => m.sender === "ai" && m.questionNumber).slice(-1)[0]?.text ||
    "Tell me about your technical background.";

  // Quick preset answers for live judging convenience
  const sampleAnswers = [
    {
      label: "⭐ Exemplary Answer (Score ~9)",
      text: "The bias-variance tradeoff represents the conflict between minimizing underfitting and overfitting. High bias occurs when the model makes oversimplified assumptions, leading to high training error. High variance occurs when the model is overly sensitive to training noise, leading to poor generalization. Regularization mitigates this: L1 (Lasso) adds an absolute penalty ||w||_1 that drives less informative weights exactly to zero for feature selection. L2 (Ridge) adds a squared penalty ||w||_2^2 that shrinks weights proportionally, preventing any single feature from dominating. In production, we tune the lambda hyperparameter via cross-validation to minimize validation loss."
    },
    {
      label: "👍 Average Answer (Score ~7)",
      text: "Bias is when the model is too simple and underfits the data, while variance is when it overfits and memorizes noise. To balance this, we use regularization. L1 regularization drops useless features, while L2 regularization shrinks the weights so coefficients don't get too big. This helps the model generalize better on test sets."
    },
    {
      label: "⚠️ Brief Answer (Score ~4)",
      text: "Bias is underfitting and variance is overfitting. L1 and L2 help make weights smaller so it doesn't overfit."
    }
  ];

  const handleSendAnswer = async (answerTextToSend?: string) => {
    const textToSend = answerTextToSend || currentAnswer;
    if (!textToSend.trim() || isSubmitting) return;

    const userMsgId = `usr-${Date.now()}`;
    const userMessage: MockInterviewMessage = {
      id: userMsgId,
      sender: "user",
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMessage]);
    setCurrentAnswer("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/gemini/mock-interview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(userApiKey ? { "x-gemini-key": userApiKey } : {})
        },
        body: JSON.stringify({
          question: currentQuestionText,
          answer: textToSend.trim(),
          targetRole,
          questionNumber: questionCount,
          userApiKey
        })
      });

      if (!response.ok) {
        throw new Error("Failed to evaluate interview response");
      }

      const evalData = await response.json();

      // Append evaluation message from AI
      const evalMsgId = `eval-${Date.now()}`;
      const evalMessage: MockInterviewMessage = {
        id: evalMsgId,
        sender: "ai",
        text: `### Immediate Interview Evaluation\n**Score:** ${evalData.score}/10 (${evalData.ratingCategory})\n\n${evalData.aiAnalysis}`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        score: evalData.score,
        feedback: {
          ratingCategory: evalData.ratingCategory,
          strengths: evalData.strengths,
          improvements: evalData.improvements,
          idealKeyPoints: evalData.idealKeyPoints,
          aiAnalysis: evalData.aiAnalysis
        }
      };

      // Follow-up question from AI
      const nextQMsgId = `q-${Date.now() + 1}`;
      const nextQuestion =
        evalData.nextQuestion ||
        `Next technical question for ${targetRole}: Walk me through how you would architect a resilient inference pipeline when handling 10,000 requests/sec with low latency.`;

      const nextQMessage: MockInterviewMessage = {
        id: nextQMsgId,
        sender: "ai",
        text: nextQuestion,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        questionNumber: questionCount + 1,
        category: evalData.nextCategory || "Technical"
      };

      setMessages((prev) => [...prev, evalMessage, nextQMessage]);
      setQuestionCount((prev) => prev + 1);
    } catch (err) {
      console.warn("Interview evaluation error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetInterview = () => {
    setMessages(initialMessages);
    setQuestionCount(1);
    setCurrentAnswer("");
  };

  const getScoreBadgeColor = (score?: number) => {
    if (!score) return "bg-slate-800 text-slate-300";
    if (score >= 8) return "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";
    if (score >= 6) return "bg-amber-500/20 text-amber-300 border-amber-500/40";
    return "bg-rose-500/20 text-rose-300 border-rose-500/40";
  };

  return (
    <div id="mock-interviewer" className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <MessageSquare className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-bold text-white font-outfit">
              AI Mock Interviewer
            </h2>
            <span className="px-2 py-0.5 text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
              1–10 Real-Time Scoring
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Interactive chat simulator providing real-time 1–10 scoring, strengths, and feedback per answer powered by Gemini 2.5 Flash.
          </p>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 font-mono">
            Role: <strong className="text-indigo-300">{targetRole}</strong>
          </span>

          <button
            onClick={handleResetInterview}
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Reset Interview"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Interview Chat Container */}
      <div className="glass-card rounded-2xl border border-slate-800/90 shadow-2xl overflow-hidden flex flex-col h-[640px]">
        {/* Chat Stream Header */}
        <div className="px-6 py-3.5 bg-slate-950/70 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-cyan-500 p-[1px]">
              <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>Principal Technical Interviewer</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="text-[10px] text-slate-400">Gemini 2.5 Flash Autonomous Agent</div>
            </div>
          </div>

          <div className="text-xs text-slate-400 font-mono bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-800">
            Round: Technical & Behavioral
          </div>
        </div>

        {/* Message History List */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-5">
          {messages.map((msg) => {
            const isAi = msg.sender === "ai";

            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-3xl ${
                  isAi ? "mr-auto" : "ml-auto flex-row-reverse"
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs ${
                    isAi
                      ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30"
                      : "bg-cyan-600/20 text-cyan-300 border border-cyan-500/30"
                  }`}
                >
                  {isAi ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                {/* Message Body */}
                <div className="space-y-2">
                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed border ${
                      isAi
                        ? "bg-slate-900/90 text-slate-100 border-slate-800"
                        : "bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/20"
                    }`}
                  >
                    {/* Render score badge if present */}
                    {msg.score !== undefined && (
                      <div className="mb-3 pb-3 border-b border-slate-800/80 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs font-bold px-3 py-1 rounded-full border ${getScoreBadgeColor(
                              msg.score
                            )}`}
                          >
                            Score: {msg.score}/10
                          </span>
                          <span className="text-xs font-semibold text-slate-300">
                            {msg.feedback?.ratingCategory}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400">Gemini Rubric</span>
                      </div>
                    )}

                    <div className="whitespace-pre-line">{msg.text}</div>

                    {/* Detailed Rubric Feedback Card */}
                    {msg.feedback && (
                      <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-3">
                        {/* Strengths */}
                        {msg.feedback.strengths.length > 0 && (
                          <div className="space-y-1">
                            <div className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Key Strengths</span>
                            </div>
                            <ul className="space-y-1 pl-4 list-disc text-slate-300 text-xs">
                              {msg.feedback.strengths.map((s, i) => (
                                <li key={i}>{s}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Improvements */}
                        {msg.feedback.improvements.length > 0 && (
                          <div className="space-y-1">
                            <div className="text-[11px] font-bold text-amber-400 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              <span>Improvement Areas</span>
                            </div>
                            <ul className="space-y-1 pl-4 list-disc text-slate-300 text-xs">
                              {msg.feedback.improvements.map((imp, i) => (
                                <li key={i}>{imp}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Ideal Key Points */}
                        {msg.feedback.idealKeyPoints.length > 0 && (
                          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1 text-[11px]">
                            <div className="font-bold text-indigo-300 flex items-center gap-1">
                              <Lightbulb className="w-3 h-3 text-cyan-400" />
                              <span>Concepts Top Candidates Mention:</span>
                            </div>
                            <ul className="space-y-0.5 pl-3 list-disc text-slate-400">
                              {msg.feedback.idealKeyPoints.map((pt, i) => (
                                <li key={i}>{pt}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="text-[10px] text-slate-500 px-1">{msg.timestamp}</div>
                </div>
              </div>
            );
          })}

          {isSubmitting && (
            <div className="flex gap-3 mr-auto items-center">
              <div className="w-8 h-8 rounded-full bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
                <Bot className="w-4 h-4 animate-bounce" />
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-indigo-300 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                <span>Gemini 2.5 Flash evaluating response against grading rubric...</span>
              </div>
            </div>
          )}
        </div>

        {/* Preset Answers (Quick Testing for Judges) */}
        <div className="px-4 py-2 bg-slate-950/90 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto">
          <span className="text-[11px] text-slate-400 shrink-0 flex items-center gap-1 font-semibold">
            <BrainCircuit className="w-3.5 h-3.5 text-indigo-400" />
            Quick Test Answers:
          </span>
          {sampleAnswers.map((s, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendAnswer(s.text)}
              disabled={isSubmitting}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 shrink-0 transition-colors disabled:opacity-50"
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
          <textarea
            rows={2}
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendAnswer();
              }
            }}
            placeholder="Type your technical response here (or click a quick test answer above)..."
            className="flex-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
          />

          <button
            onClick={() => handleSendAnswer()}
            disabled={!currentAnswer.trim() || isSubmitting}
            className="px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-lg shadow-indigo-600/25 transition-all disabled:opacity-50"
          >
            <span>Submit</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
