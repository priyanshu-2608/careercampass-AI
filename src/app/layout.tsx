import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CareerCompass AI - Career Readiness & Employability Platform",
  description: "Discover your career trajectory, analyze skill gaps, explore top Coursera/NPTEL certifications, government apprenticeship schemes, and enhance your resume and interview skills with Gemini 2.5 Flash.",
  keywords: [
    "career readiness",
    "employability index",
    "AI mock interview",
    "resume enhancer",
    "Gemini 2.5 Flash",
    "NATS",
    "AICTE",
    "NPTEL",
    "skill gap analysis"
  ],
  authors: [{ name: "CareerCompass Engineering" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} ${outfit.variable} font-sans bg-[#070b14] text-slate-100 min-h-screen relative overflow-x-hidden`}>
        {/* Subtle ambient background glow */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute top-1/3 -right-40 w-[30rem] h-[30rem] bg-purple-600/15 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "2s" }} />
          <div className="absolute -bottom-40 left-1/3 w-[32rem] h-[32rem] bg-blue-600/15 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "3s" }} />
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
        </div>

        <div className="relative z-10 flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
