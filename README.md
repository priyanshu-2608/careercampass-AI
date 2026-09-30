# CareerCompass AI — AI-Powered Career Readiness & Employability Platform

A modern, production-ready prototype built with **Next.js (App Router)**, **React**, **Tailwind CSS**, and **Google Gemini API (`gemini-2.5-flash`)**.

This platform connects academic credentials with employment realities through real-time readiness scoring, gap analysis, STAR-method resume transformation, and interactive mock interviewing.

---

## 👥 Team — Neural Ninjas

**Team Leader:** Uma Nath

**Team Members:**
- Uma Nath — Team Leader
- Priyanshu Gangwar
- Sahil
- Saksham Richhariya

---


## 🌟 Key Architectural Features Across All 3 Stages

### 1. Landing Page & Onboarding Flow
- **Hero Section**:
  - Exact headline: *"Welcome to Career Readiness Platform"*
  - Subtitle: *"Ready to discover your career path?"*
  - Dynamic live animation banner with particle glow & status badges
  - 3 Feature highlight cards:
    1. **Job Role Exploration**
    2. **Career Insights & Gap Analysis**
    3. **Personalized Recommendation**
- **Multi-Step Onboarding Modal** triggered by prominent `[Register / Login]` button:
  - **Step 1**: Inputs for Full Name, Education Level (e.g., B.Tech Data Science), Past Academic Record / GPA, and Field of Interest.
  - **Step 2**: Interactive skill selector with tag checkboxes + Drag-and-drop resume PDF upload box with realistic parse animation and confetti celebration.

### 2. Student Dashboard
- **Employability Readiness Index**:
  - Circular SVG gauge displaying overall readiness score (e.g., **78/100**) with percentile ranking.
  - Granular sub-breakdowns with animated progress bars:
    - **Technical Fit**
    - **Resume Strength**
    - **Soft Skills**
  - Strategic Gemini mentoring synthesis.
- **Interactive Career Path Roadmap**:
  - Step-by-step milestone progression mapped to target roles (*Data Scientist / AI Engineer*).
  - Explicit visual badges differentiating **Mastered Skills** (green check) vs. **Identified Skill Gaps** (amber alert).
  - Clicking on any skill gap jumps directly to accredited courses bridging that exact gap.
- **Course & Certification Grid**:
  - Cards linking skill gaps directly to accredited online courses from **Coursera** (DeepLearning.AI), **edX** (Harvard CS50 AI), and **NPTEL / SWAYAM** (IIT Madras, AICTE recognized).
- **Government Opportunities Feed**:
  - Real-time public sector schemes, apprenticeships, and PSU job notifications from:
    - **NATS** (National Apprenticeship Training Scheme — Ministry of Education)
    - **AICTE Internship Portal** (Digital India)
    - **DRDO & ISRO ICRB** Scientist/Engineer recruitments
    - **CDAC & NIC** High-Performance Computing & Cloud
  - Interactive eligibility filters matching student GPA and degree.

### 3. Integrated AI Features (Gemini API Powered)
- **Resume Enhancement Module**:
  - Side-by-side view showing raw user bullet points on the left and AI-optimized, action-oriented, metrics-driven bullet points on the right.
  - Highlighting quantified metrics (`+82% F1-score`, `$450K churn identified`, `65% latency reduction`), ATS keywords, and recruiter reasoning.
  - One-click copy with visual feedback.
- **Live AI Mock Interviewer Widget**:
  - Conversational chat panel where Gemini 2.5 Flash conducts domain-specific technical and behavioral interviews.
  - Instant **1–10 scoring rubric** with detailed breakdowns of **Key Strengths**, **Improvement Areas**, and **Concepts Top Candidates Mention**.
  - Includes quick test answers (Exemplary, Average, Brief) for instant demonstration during live judging.

### 4. Zero-Downtime Live Judging Resilience
- Full **mock fallback state data** is packaged within the application. If an active `GEMINI_API_KEY` is not present, the system runs an autonomous high-fidelity simulation engine that never fails or times out during evaluations.
- Header modal allows judges to input their own Gemini API Key at runtime or toggle simulation mode with one click.

---

## 🛠️ Technology Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, CSS Custom Properties, Glassmorphism, Micro-animations
- **AI Engine**: Google Gemini API (`gemini-2.5-flash`) via Next.js server route handlers
- **Icons**: Lucide React
- **Celebration Effects**: Canvas Confetti

---

## 🚀 Running Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **(Optional) Configure Gemini API Key**:
   Create a `.env.local` file:
   ```env
   GEMINI_API_KEY="your_api_key_here"
   ```
   *Note: An API key is optional! The prototype works completely out-of-the-box with built-in fallback data.*

4. **Production Build**:
   ```bash
   npm run build
   npm run start
   ```
