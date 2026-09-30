export interface UserProfile {
  name: string;
  education: string;
  gpa: string;
  field: string;
  targetRole: string;
  skills: string[];
  resumeFile?: {
    name: string;
    size: string;
    uploadedAt: string;
  };
  resumeBullets: string[];
  university?: string;
  gradYear?: string;
}

export interface ReadinessBreakdown {
  overallScore: number;
  technicalFit: number;
  resumeStrength: number;
  softSkills: number;
  percentile: number;
  verdict: string;
  summary: string;
}

export interface RoadmapMilestone {
  id: string;
  phase: string;
  title: string;
  targetRole: string;
  duration: string;
  status: "completed" | "in-progress" | "upcoming";
  masteredSkills: string[];
  skillGaps: string[];
  description: string;
  actionItems: string[];
}

export interface CourseRecommendation {
  id: string;
  title: string;
  provider: "Coursera" | "edX" | "NPTEL" | "Kaggle";
  skillTied: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  rating: number;
  reviewsCount: string;
  institution: string;
  url: string;
  freeAuditAvailable: boolean;
  tags: string[];
}

export interface GovernmentOpportunity {
  id: string;
  title: string;
  organization: string;
  portal: "NATS" | "AICTE" | "DRDO" | "ISRO" | "NIC" | "CDAC";
  stipendOrSalary: string;
  location: string;
  deadline: string;
  eligibility: {
    degrees: string[];
    minCgpa: number;
    branches: string[];
  };
  status: "Open" | "Closing Soon" | "Featured";
  url: string;
  tags: string[];
  description: string;
}

export interface JobOpportunity {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  type: "Full-Time" | "Internship" | "Remote" | "Hybrid";
  stipendOrSalary: string;
  matchScore: number; // e.g. 92, 85, 78
  matchRationale: string;
  matchedSkills: string[];
  missingSkills: string[];
  postedTime: string;
  applicantsCount: number;
  featured?: boolean;
  tags: string[];
}

export interface ResumeEnhancementItem {
  id: string;
  category: string;
  originalBullet: string;
  enhancedBullet: string;
  metricHighlight: string;
  keywordsAdded: string[];
  reasoning: string;
}

export interface MockInterviewMessage {
  id: string;
  sender: "ai" | "user";
  text: string;
  timestamp: string;
  questionNumber?: number;
  category?: "Technical" | "Behavioral" | "System Design" | "Domain Fit";
  score?: number; // 1 to 10
  feedback?: {
    ratingCategory: "Outstanding (9-10)" | "Good Fit (7-8)" | "Needs Practice (4-6)" | "Incomplete (1-3)";
    strengths: string[];
    improvements: string[];
    idealKeyPoints: string[];
    aiAnalysis: string;
  };
}

export interface FieldConfig {
  id: string;
  name: string;
  targetRole: string;
  description: string;
  defaultRequiredSkills: string[];
  availableSkills: {
    category: string;
    skills: string[];
  }[];
  sampleBullets: string[];
  interviewPresets: {
    question: string;
    category: "Technical" | "Behavioral" | "System Design" | "Domain Fit";
    idealAnswerOverview: string;
  }[];
}

