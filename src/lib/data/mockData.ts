import {
  FieldConfig,
  UserProfile,
  ReadinessBreakdown,
  RoadmapMilestone,
  CourseRecommendation,
  GovernmentOpportunity,
  JobOpportunity,
  ResumeEnhancementItem,
  MockInterviewMessage
} from "@/types";

export const CAREER_FIELDS: Record<string, FieldConfig> = {
  "Data Science": {
    id: "Data Science",
    name: "Data Science & AI",
    targetRole: "Data Scientist / AI Engineer",
    description: "Architect intelligent pipelines, train ML & Deep Learning models, and uncover actionable insights from enterprise data.",
    defaultRequiredSkills: [
      "Python",
      "SQL",
      "Machine Learning",
      "Data Visualization",
      "Deep Learning",
      "MLOps",
      "Statistics",
      "Generative AI & LLMs"
    ],
    availableSkills: [
      {
        category: "Programming & Data",
        skills: ["Python", "SQL", "R", "Pandas", "NumPy", "Apache Spark"]
      },
      {
        category: "Core AI / ML",
        skills: ["Machine Learning", "Deep Learning", "Statistics", "Data Visualization", "Scikit-Learn"]
      },
      {
        category: "Advanced & Production",
        skills: ["Generative AI & LLMs", "MLOps", "Docker", "PyTorch", "Hugging Face", "Vector Databases"]
      },
      {
        category: "Professional & Soft Skills",
        skills: ["Analytical Thinking", "Stakeholder Communication", "Problem Solving", "Technical Writing"]
      }
    ],
    sampleBullets: [
      "Worked on a machine learning project for customer churn using python.",
      "Created dashboards in Tableau and wrote SQL queries for team reports.",
      "Fine-tuned a transformer model on customer queries to answer questions automatically."
    ],
    interviewPresets: [
      {
        question: "Explain the Bias-Variance tradeoff in Machine Learning. How do regularization techniques like L1 and L2 affect this tradeoff?",
        category: "Technical",
        idealAnswerOverview: "Addresses high bias (underfitting) vs high variance (overfitting), defines L1 (Lasso, sparsity) and L2 (Ridge, weight shrinkage), and mentions validation loss tuning."
      },
      {
        question: "Describe a real-world scenario where you had to deal with severe class imbalance in a dataset. What evaluation metrics and sampling strategies did you use?",
        category: "Technical",
        idealAnswerOverview: "Discusses pitfalls of standard accuracy, justifies using PR-AUC, F1-Score, and techniques like SMOTE, focal loss, or weighted loss."
      },
      {
        question: "Tell me about a time you had to explain a complex ML model (like a Random Forest or Neural Net) to a non-technical stakeholder who was skeptical of the predictions.",
        category: "Behavioral",
        idealAnswerOverview: "Utilizes the STAR method, focuses on business impact, uses analogies or SHAP/LIME interpretability without overwhelming technical jargon."
      }
    ]
  },

  "Technology": {
    id: "Technology",
    name: "Software & Web Engineering",
    targetRole: "Full Stack Software Engineer",
    description: "Develop responsive, scalable web applications and distributed backend architectures with modern cloud ecosystems.",
    defaultRequiredSkills: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "REST & GraphQL APIs",
      "System Design & Git"
    ],
    availableSkills: [
      {
        category: "Frontend",
        skills: ["JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "HTML5/CSS3"]
      },
      {
        category: "Backend & Systems",
        skills: ["Node.js", "Express", "PostgreSQL", "MongoDB", "Redis", "REST & GraphQL APIs"]
      },
      {
        category: "DevOps & Cloud",
        skills: ["Git & GitHub", "Docker", "CI/CD Pipelines", "AWS", "System Design"]
      },
      {
        category: "Engineering Practices",
        skills: ["Agile/Scrum", "Code Review", "Unit Testing", "Microservices"]
      }
    ],
    sampleBullets: [
      "Built a web app using React and Node.js for student notes.",
      "Fixed bugs in the backend and improved database performance.",
      "Collaborated with 3 teammates using Git to ship the final semester project."
    ],
    interviewPresets: [
      {
        question: "How does the React 18 Concurrent Rendering model work, and when should you use Server Components vs Client Components in Next.js App Router?",
        category: "Technical",
        idealAnswerOverview: "Covers non-blocking renders, streaming SSR, bundle size reduction for RSCs, and client interactivity boundaries."
      },
      {
        question: "Walk me through how you would architect a real-time collaborative document editor like Google Docs with high availability.",
        category: "System Design",
        idealAnswerOverview: "Covers WebSockets, CRDTs or Operational Transformation (OT), state persistence, Redis pub/sub, and optimistic updates."
      },
      {
        question: "Tell me about a critical production bug you introduced or encountered under tight deadlines. How did you diagnose, resolve, and prevent it?",
        category: "Behavioral",
        idealAnswerOverview: "STAR method demonstrating blameless post-mortem, observability (logs/APM), rollback strategy, and test automation fixes."
      }
    ]
  },

  "Business": {
    id: "Business",
    name: "Business & Product Analytics",
    targetRole: "Product Analyst / Strategy Consultant",
    description: "Bridge business requirements with quantitative analysis, customer journey mapping, and ROI optimization.",
    defaultRequiredSkills: [
      "SQL",
      "Advanced Excel",
      "Power BI / Tableau",
      "Financial Modeling",
      "A/B Testing",
      "Business Communication",
      "Product Metrics",
      "Market Research"
    ],
    availableSkills: [
      {
        category: "Analytics & Tools",
        skills: ["Advanced Excel", "SQL", "Power BI / Tableau", "Google Analytics", "Python for Analytics"]
      },
      {
        category: "Product & Strategy",
        skills: ["A/B Testing", "Financial Modeling", "Product Metrics", "Market Research", "Cohort Analysis"]
      },
      {
        category: "Leadership & Communication",
        skills: ["Business Communication", "Cross-Functional Collaboration", "Presentation Skills", "Agile"]
      }
    ],
    sampleBullets: [
      "Analyzed customer sales data in Excel to find drop-offs.",
      "Created monthly Power BI reports for management.",
      "Helped test two landing page designs to see which converted more users."
    ],
    interviewPresets: [
      {
        question: "If user retention drops by 15% immediately following a new mobile app release, walk me through your root-cause investigation framework.",
        category: "Technical",
        idealAnswerOverview: "Segments users (OS, version, region), checks telemetry/crash logs, analyzes funnel churn points, and checks cohorts."
      },
      {
        question: "How do you decide between statistical significance and practical business significance when interpreting A/B test results?",
        category: "Domain Fit",
        idealAnswerOverview: "Balances p-values/sample sizes with lift magnitude, implementation costs, cannibalization, and long-term customer lifetime value."
      }
    ]
  },

  "Design": {
    id: "Design",
    name: "UI/UX & Product Design",
    targetRole: "Product Designer / UX Researcher",
    description: "Craft intuitive, accessible digital experiences through human-centered design, iterative prototyping, and design systems.",
    defaultRequiredSkills: [
      "Figma",
      "Design Systems",
      "User Research",
      "Wireframing & Prototyping",
      "Usability Testing",
      "Information Architecture",
      "Interaction Design",
      "WCAG Accessibility"
    ],
    availableSkills: [
      {
        category: "Design Tools",
        skills: ["Figma", "Auto Layout & Components", "Design Systems", "Prototyping", "Adobe Suite"]
      },
      {
        category: "UX & Research",
        skills: ["User Research", "Wireframing & Prototyping", "Usability Testing", "Information Architecture", "Journey Mapping"]
      },
      {
        category: "Standards & Implementation",
        skills: ["WCAG Accessibility", "Design Handoff", "Responsive Design", "Micro-interactions"]
      }
    ],
    sampleBullets: [
      "Redesigned the onboarding screen on Figma for an internship app.",
      "Conducted interviews with 5 users to find navigation issues.",
      "Created a basic design component system for the web development team."
    ],
    interviewPresets: [
      {
        question: "How do you handle a situation where engineering says a proposed UX interaction is too complex or costly to build before a launch?",
        category: "Behavioral",
        idealAnswerOverview: "Emphasizes collaborative compromise, identifying core user goals, phasing iterations (MVP vs V2), and maintaining user trust."
      }
    ]
  },

  "Government Jobs": {
    id: "Government Jobs",
    name: "Public Sector & PSU Engineering",
    targetRole: "Scientist/Engineer 'SC' & PSU Officer",
    description: "Prepare for high-impact technical roles across central ministries, PSUs, research labs (ISRO, DRDO, NIC, CDAC, BARC).",
    defaultRequiredSkills: [
      "Core Engineering Fundamentals",
      "Quantitative Aptitude",
      "Reasoning & Logical Ability",
      "General Awareness & Current Affairs",
      "Technical Subject Specialization",
      "Public Sector Governance",
      "GATE Exam Preparedness"
    ],
    availableSkills: [
      {
        category: "Exam & Aptitude",
        skills: ["Quantitative Aptitude", "Reasoning & Logical Ability", "English Comprehension", "General Awareness & Current Affairs"]
      },
      {
        category: "Technical Specialization",
        skills: ["Core Engineering Fundamentals", "GATE Exam Preparedness", "Data Structures & OS", "Computer Networks"]
      },
      {
        category: "Institutional Knowledge",
        skills: ["Public Sector Governance", "Technical Writing", "National Apprenticeship Framework", "Ethics in Public Service"]
      }
    ],
    sampleBullets: [
      "Prepared for technical GATE syllabus covering engineering mathematics and core computer science.",
      "Scored in top 5% in national quantitative and logical aptitude mock exams.",
      "Completed undergraduate research project aligned with DRDO defence tech themes."
    ],
    interviewPresets: [
      {
        question: "Why do you want to join a public research laboratory like DRDO/ISRO instead of a private multi-national corporation?",
        category: "Domain Fit",
        idealAnswerOverview: "Articulates nation-building mission, long-term strategic technological autonomy, public accountability, and scientific rigor."
      }
    ]
  }
};

export const INITIAL_USER_PROFILE: UserProfile = {
  name: "Priyanshu Gangwar",
  education: "B.Tech in Data Science & Artificial Intelligence",
  gpa: "8.8 / 10.0",
  university: "Indian Institute of Information Technology (IIIT)",
  gradYear: "2026",
  field: "Data Science",
  targetRole: "Data Scientist / AI Engineer",
  skills: [
    "Python",
    "SQL",
    "Machine Learning",
    "Data Visualization",
    "Pandas",
    "Analytical Thinking"
  ],
  resumeFile: {
    name: "Priyanshu_Gangwar_Resume_2026.pdf",
    size: "248 KB",
    uploadedAt: "Just now"
  },
  resumeBullets: [
    "Built a machine learning model to predict customer churn using Python and Scikit-Learn with 82% accuracy.",
    "Wrote SQL queries to extract data from PostgreSQL databases and made Tableau dashboards for weekly team reviews.",
    "Experimented with fine-tuning an open-source LLM for question answering on company internal documentation."
  ]
};

export function calculateReadinessIndex(
  profileSkills: string[],
  fieldKey: string,
  gpaString: string
): ReadinessBreakdown {
  const fieldConfig = CAREER_FIELDS[fieldKey] || CAREER_FIELDS["Data Science"];
  const required = fieldConfig.defaultRequiredSkills;

  // Calculate matched count
  const matched = required.filter(req =>
    profileSkills.some(s => s.toLowerCase().trim() === req.toLowerCase().trim())
  );

  const rawTech = Math.min(100, Math.round((matched.length / required.length) * 100));
  
  // Parse GPA weight
  let gpaNum = 8.0;
  const matchGpa = gpaString.match(/(\d+(\.\d+)?)/);
  if (matchGpa) {
    gpaNum = parseFloat(matchGpa[1]);
  }
  const academicFactor = gpaNum > 10 ? Math.min(100, gpaNum) : Math.min(100, Math.round(gpaNum * 10));

  const technicalFit = Math.min(96, Math.max(45, Math.round(rawTech * 0.75 + academicFactor * 0.25)));
  const resumeStrength = Math.min(94, Math.max(50, Math.round(rawTech * 0.65 + 28)));
  const softSkills = 82; // Default baseline

  const overallScore = Math.round(technicalFit * 0.5 + resumeStrength * 0.3 + softSkills * 0.2);
  const percentile = Math.min(99, Math.round(overallScore * 1.08));

  let verdict = "Competitive Contender";
  let summary = "Strong foundational technical competencies with high academic performance. Closing identified gaps in MLOps and production LLMs will place you in the top 5% of campus and PSU applicants.";

  if (overallScore >= 85) {
    verdict = "Interview Ready & High Potential";
    summary = "Exceptional readiness profile! Your technical stack directly matches tier-1 product companies and premier public sector research institutions.";
  } else if (overallScore < 65) {
    verdict = "Skill Development Phase";
    summary = "Solid starting baseline. Focus on the curated course certifications below to bridge the core engineering gaps and elevate your resume strength.";
  }

  return {
    overallScore,
    technicalFit,
    resumeStrength,
    softSkills,
    percentile,
    verdict,
    summary
  };
}

export function generateRoadmap(fieldKey: string, userSkills: string[]): RoadmapMilestone[] {
  const lowerUserSkills = userSkills.map(s => s.toLowerCase());

  if (fieldKey === "Data Science") {
    return [
      {
        id: "m1",
        phase: "Phase 1: Foundations",
        title: "Mathematical Foundations & Core Analytics",
        targetRole: "Junior Data Analyst",
        duration: "Weeks 1 - 4",
        status: "completed",
        masteredSkills: ["Python", "SQL", "Pandas", "Analytical Thinking"].filter(s =>
          lowerUserSkills.includes(s.toLowerCase())
        ),
        skillGaps: ["Statistics"].filter(s => !lowerUserSkills.includes(s.toLowerCase())),
        description: "Master vector operations, exploratory data analysis (EDA), and relational database querying with complex aggregations.",
        actionItems: [
          "Complete hands-on SQL window functions and subqueries",
          "Conduct EDA on real-world Kaggle datasets with Pandas & Seaborn",
          "Solidify inferential statistics and hypothesis testing"
        ]
      },
      {
        id: "m2",
        phase: "Phase 2: Applied Machine Learning",
        title: "Predictive Modeling & Feature Engineering",
        targetRole: "Associate Data Scientist",
        duration: "Weeks 5 - 10",
        status: "in-progress",
        masteredSkills: ["Machine Learning", "Data Visualization"].filter(s =>
          lowerUserSkills.includes(s.toLowerCase())
        ),
        skillGaps: ["Deep Learning", "Statistics"].filter(s =>
          !lowerUserSkills.includes(s.toLowerCase())
        ),
        description: "Construct end-to-end regression, classification, and ensemble pipelines with cross-validation and hyperparameter optimization.",
        actionItems: [
          "Implement Scikit-Learn pipelines with ColumnTransformers",
          "Benchmark XGBoost vs LightGBM on tabular datasets",
          "Analyze model performance via ROC-AUC, PR Curves, and SHAP explainability"
        ]
      },
      {
        id: "m3",
        phase: "Phase 3: Production & Deep Learning",
        title: "Neural Networks, LLMs & MLOps Pipelines",
        targetRole: "AI Engineer / Applied Scientist",
        duration: "Weeks 11 - 16",
        status: "upcoming",
        masteredSkills: (["PyTorch", "Docker"] as string[]).filter(s =>
          lowerUserSkills.includes(s.toLowerCase())
        ),
        skillGaps: ["Deep Learning", "Generative AI & LLMs", "MLOps", "Docker"].filter(s =>
          !lowerUserSkills.includes(s.toLowerCase())
        ),
        description: "Deploy PyTorch models to production, build RAG applications with Vector DBs, and set up automated model CI/CD pipelines.",
        actionItems: [
          "Build a Retrieval-Augmented Generation (RAG) agent using Gemini 2.5 Flash API",
          "Containerize inference endpoints using Docker and FastAPI",
          "Integrate MLflow / Weights & Biases for experiment tracking"
        ]
      },
      {
        id: "m4",
        phase: "Phase 4: Capstone & Employability",
        title: "Industry Capstone, Mock Interviews & PSU Portals",
        targetRole: "Full Career Readiness & Placement",
        duration: "Weeks 17 - 20",
        status: "upcoming",
        masteredSkills: ["Stakeholder Communication"].filter(s =>
          lowerUserSkills.includes(s.toLowerCase())
        ),
        skillGaps: ["System Design", "GATE Exam Preparedness"].filter(s =>
          !lowerUserSkills.includes(s.toLowerCase())
        ),
        description: "Finalize STAR-format resume, execute mock technical interviews, and apply to AICTE/NATS enterprise internships.",
        actionItems: [
          "Complete 5 domain AI mock interviews on CareerCompass",
          "Publish live interactive web demo and GitHub technical documentation",
          "Submit verified portfolio to NATS and AICTE national portals"
        ]
      }
    ];
  }

  // Default fallback roadmap for Technology & other fields
  return [
    {
      id: "m1",
      phase: "Phase 1: Core Architecture",
      title: "Full-Stack Programming & State Management",
      targetRole: "Junior Software Engineer",
      duration: "Weeks 1 - 4",
      status: "completed",
      masteredSkills: userSkills.slice(0, 3),
      skillGaps: ["TypeScript", "Next.js"].filter(s => !lowerUserSkills.includes(s.toLowerCase())),
      description: "Master modern component architecture, TypeScript interfaces, and asynchronous data flows.",
      actionItems: ["Build full stack CRUD app", "Implement type-safe schema validation", "Integrate automated unit tests"]
    },
    {
      id: "m2",
      phase: "Phase 2: Backend & Distributed Data",
      title: "Relational DBs, REST/GraphQL & Auth",
      targetRole: "Backend / Full Stack Developer",
      duration: "Weeks 5 - 10",
      status: "in-progress",
      masteredSkills: userSkills.slice(3, 5),
      skillGaps: ["PostgreSQL", "System Design", "Docker"].filter(s => !lowerUserSkills.includes(s.toLowerCase())),
      description: "Design relational schemas, optimize query plans, implement secure JWT/OAuth flows, and containerize services.",
      actionItems: ["Write indexed PostgreSQL schemas", "Build REST & GraphQL endpoints", "Set up Docker development environment"]
    },
    {
      id: "m3",
      phase: "Phase 3: Production Cloud & Scalability",
      title: "Cloud Infrastructure, Microservices & CI/CD",
      targetRole: "Senior Associate Engineer",
      duration: "Weeks 11 - 16",
      status: "upcoming",
      masteredSkills: [],
      skillGaps: ["AWS", "CI/CD Pipelines", "System Design"].filter(s => !lowerUserSkills.includes(s.toLowerCase())),
      description: "Deploy fault-tolerant web applications with automated GitHub Actions, load balancing, and Redis caching.",
      actionItems: ["Configure GitHub Actions CI/CD", "Benchmark latency with k6 load testing", "Architect caching tier with Redis"]
    }
  ];
}

export const RECOMMENDED_COURSES: CourseRecommendation[] = [
  {
    id: "c1",
    title: "Machine Learning Specialization",
    provider: "Coursera",
    institution: "DeepLearning.AI & Stanford University (Andrew Ng)",
    skillTied: "Machine Learning",
    duration: "3 Months (7 hrs/week)",
    level: "Intermediate",
    rating: 4.9,
    reviewsCount: "82,400+ reviews",
    url: "https://www.coursera.org/specializations/machine-learning-introduction",
    freeAuditAvailable: true,
    tags: ["Supervised ML", "Neural Networks", "Decision Trees", "Unsupervised Learning"]
  },
  {
    id: "c2",
    title: "Deep Learning with PyTorch: Zero to GANs",
    provider: "Coursera",
    institution: "DeepLearning.AI",
    skillTied: "Deep Learning",
    duration: "6 Weeks (5 hrs/week)",
    level: "Intermediate",
    rating: 4.8,
    reviewsCount: "14,200+ reviews",
    url: "https://www.coursera.org/specializations/deep-learning",
    freeAuditAvailable: true,
    tags: ["PyTorch", "CNNs", "RNNs & LSTMs", "Transformers"]
  },
  {
    id: "c3",
    title: "CS50's Introduction to Artificial Intelligence with Python",
    provider: "edX",
    institution: "Harvard University",
    skillTied: "Generative AI & LLMs",
    duration: "7 Weeks (10 hrs/week)",
    level: "Advanced",
    rating: 4.9,
    reviewsCount: "29,000+ reviews",
    url: "https://www.edx.org/learn/artificial-intelligence/harvard-university-cs50-s-introduction-to-artificial-intelligence-with-python",
    freeAuditAvailable: true,
    tags: ["Search Algorithms", "Knowledge Representation", "Probability", "NLP"]
  },
  {
    id: "c4",
    title: "Data Science for Engineers & Deep Learning",
    provider: "NPTEL",
    institution: "IIT Madras & SWAYAM",
    skillTied: "Statistics",
    duration: "12 Weeks (Approved by AICTE)",
    level: "Intermediate",
    rating: 4.8,
    reviewsCount: "Govt Certified",
    url: "https://nptel.ac.in/courses/106106179",
    freeAuditAvailable: true,
    tags: ["Linear Algebra", "Optimization", "R & Python", "AICTE Recognized"]
  },
  {
    id: "c5",
    title: "Machine Learning Operations (MLOps) Fundamentals",
    provider: "Coursera",
    institution: "Google Cloud Training",
    skillTied: "MLOps",
    duration: "4 Weeks (4 hrs/week)",
    level: "Advanced",
    rating: 4.7,
    reviewsCount: "9,800+ reviews",
    url: "https://www.coursera.org/learn/mlops-fundamentals",
    freeAuditAvailable: true,
    tags: ["Model Serving", "Continuous Training", "Feature Store", "Kubeflow"]
  },
  {
    id: "c6",
    title: "Cloud Computing & Distributed Systems",
    provider: "NPTEL",
    institution: "IIT Kharagpur & Ministry of Education",
    skillTied: "Docker",
    duration: "8 Weeks (Govt AICTE Credit)",
    level: "Intermediate",
    rating: 4.7,
    reviewsCount: "Govt Certified",
    url: "https://nptel.ac.in/courses/106105167",
    freeAuditAvailable: true,
    tags: ["Virtualization", "Cloud Storage", "MapReduce", "Microservices"]
  }
];

export const GOVERNMENT_OPPORTUNITIES: GovernmentOpportunity[] = [
  {
    id: "gov-1",
    title: "Graduate Apprentice Trainee (Data & AI Systems)",
    organization: "Defence Research and Development Organisation (DRDO)",
    portal: "NATS",
    stipendOrSalary: "₹12,000 - ₹15,000 / month",
    location: "Bengaluru / Hyderabad Labs",
    deadline: "15 Oct 2026",
    eligibility: {
      degrees: ["B.Tech", "B.E.", "MCA", "M.Sc Computer Science"],
      minCgpa: 7.0,
      branches: ["Computer Science", "Data Science", "Information Technology", "AI"]
    },
    status: "Featured",
    url: "https://nats.education.gov.in/",
    tags: ["Govt Scheme", "1 Year Apprenticeship", "Certificate of Proficiency"],
    description: "Hands-on national apprenticeship at DRDO technical laboratories. Gain exposure to secure defence data analytics, embedded AI systems, and national mission platforms under senior scientists."
  },
  {
    id: "gov-2",
    title: "National Digital Mission AI & Cloud Intern",
    organization: "AICTE Internship Portal / Digital India Corporation",
    portal: "AICTE",
    stipendOrSalary: "₹15,000 / month + Official AICTE Badge",
    location: "New Delhi / Remote Hybrid",
    deadline: "22 Oct 2026",
    eligibility: {
      degrees: ["B.Tech", "B.E.", "BCA", "Undergraduate"],
      minCgpa: 6.5,
      branches: ["All Engineering Branches", "Data Science", "Electronics"]
    },
    status: "Closing Soon",
    url: "https://internship.aicte-india.org/",
    tags: ["AICTE Approved", "Digital India", "Public Policy Tech"],
    description: "Official 6-month internship on national digital public infrastructure (DPI). Work on citizen-scale dashboards, automated translation pipelines, and open data portals."
  },
  {
    id: "gov-3",
    title: "Scientist / Engineer 'SC' - Artificial Intelligence",
    organization: "Indian Space Research Organisation (ISRO - ICRB)",
    portal: "ISRO",
    stipendOrSalary: "Level 10 Pay Matrix (₹56,100 - ₹1,77,500)",
    location: "URSC Bengaluru / VSSC Thiruvananthapuram",
    deadline: "05 Nov 2026",
    eligibility: {
      degrees: ["B.Tech", "B.E."],
      minCgpa: 6.84, // 65% aggregate
      branches: ["Computer Science", "Information Technology"]
    },
    status: "Open",
    url: "https://www.isro.gov.in/Careers.html",
    tags: ["Central Govt Gazetted", "ISRO Scientist", "Permanent Post"],
    description: "Prestigious direct recruitment for Scientist/Engineer 'SC' via ISRO Centralised Recruitment Board. Responsibilities include satellite telemetry ML, orbital mission tracking, and autonomous spacecraft vision systems."
  },
  {
    id: "gov-4",
    title: "Project Engineer (Generative AI & HPC)",
    organization: "Centre for Development of Advanced Computing (C-DAC)",
    portal: "CDAC",
    stipendOrSalary: "₹4.50 - ₹6.80 Lakhs / annum",
    location: "Pune / Noida / Chennai",
    deadline: "18 Oct 2026",
    eligibility: {
      degrees: ["B.Tech", "M.Tech", "MCA"],
      minCgpa: 6.5,
      branches: ["Computer Science", "AI & ML", "Data Science"]
    },
    status: "Open",
    url: "https://www.cdac.in/index.aspx?id=career",
    tags: ["Supercomputing", "PARAM Ananta", "Govt PSU R&D"],
    description: "Contribute to India's National Supercomputing Mission (NSM). Train indigenous multilingual foundational models and high-performance computing numerical simulations on PARAM supercomputers."
  },
  {
    id: "gov-5",
    title: "Scientific / Technical Assistant 'B' (NIC Cloud)",
    organization: "National Informatics Centre (NIC / MeitY)",
    portal: "NIC",
    stipendOrSalary: "Level 6 Pay Matrix (₹35,400 - ₹1,12,400)",
    location: "Pan-India District Informatics Centres",
    deadline: "12 Nov 2026",
    eligibility: {
      degrees: ["B.Tech", "B.E.", "MCA", "B.Sc (Comp Science)"],
      minCgpa: 6.0,
      branches: ["Computer Science", "Electronics & Communication", "IT"]
    },
    status: "Open",
    url: "https://www.nic.in/recruitment/",
    tags: ["Govt Cloud", "NIC e-Governance", "Ministry of Electronics & IT"],
    description: "Support national mission applications including DigiLocker, Aadhaar authentication gateways, and national tax architectures. High job stability with pension and healthcare benefits."
  }
];

export const JOB_OPPORTUNITIES: JobOpportunity[] = [
  {
    id: "job-1",
    title: "AI & Machine Learning Graduate Intern",
    company: "Google India",
    logo: "G",
    location: "Bengaluru, Karnataka (Hybrid)",
    type: "Internship",
    stipendOrSalary: "₹75,000 / month",
    matchScore: 94,
    matchRationale: "Exceptional alignment with your Python, Machine Learning, and SQL proficiency. Academic CGPA 8.8 exceeds the 8.0 threshold.",
    matchedSkills: ["Python", "Machine Learning", "SQL", "Pandas", "Analytical Thinking"],
    missingSkills: ["PyTorch", "MLOps"],
    postedTime: "2 days ago",
    applicantsCount: 142,
    featured: true,
    tags: ["Tier 1 Tech", "Autonomous AI", "Mentorship Included"]
  },
  {
    id: "job-2",
    title: "Associate Data Scientist",
    company: "Razorpay",
    logo: "R",
    location: "Bengaluru, Karnataka",
    type: "Full-Time",
    stipendOrSalary: "₹14 - ₹18 LPA",
    matchScore: 88,
    matchRationale: "Strong core skills in SQL and exploratory data analysis. High match with fintech risk modeling teams.",
    matchedSkills: ["Python", "SQL", "Data Visualization", "Machine Learning"],
    missingSkills: ["Statistics", "Docker"],
    postedTime: "1 day ago",
    applicantsCount: 89,
    featured: true,
    tags: ["Fintech", "Predictive Modeling", "High Growth"]
  },
  {
    id: "job-3",
    title: "Generative AI Research Fellow",
    company: "Microsoft Research India",
    logo: "M",
    location: "Bengaluru (Hybrid)",
    type: "Internship",
    stipendOrSalary: "₹80,000 / month",
    matchScore: 85,
    matchRationale: "Strong academic foundation and ML algorithms knowledge. Closing gaps in Vector DBs and LLM fine-tuning recommended.",
    matchedSkills: ["Python", "Machine Learning", "Analytical Thinking"],
    missingSkills: ["Generative AI & LLMs", "Deep Learning"],
    postedTime: "3 days ago",
    applicantsCount: 210,
    featured: false,
    tags: ["Research Fellowship", "LLMs", "Publication Opportunity"]
  },
  {
    id: "job-4",
    title: "Full Stack ML Application Engineer",
    company: "Zomato",
    logo: "Z",
    location: "Gurugram, Haryana",
    type: "Full-Time",
    stipendOrSalary: "₹12 - ₹16 LPA",
    matchScore: 82,
    matchRationale: "Good match with real-time analytics data pipelines. Missing production deployment experience with FastAPI/Docker.",
    matchedSkills: ["Python", "SQL", "Data Visualization"],
    missingSkills: ["Docker", "MLOps"],
    postedTime: "Just now",
    applicantsCount: 45,
    featured: false,
    tags: ["Consumer Tech", "Real-Time Ranking", "Fast Paced"]
  },
  {
    id: "job-5",
    title: "Junior Data Analyst & BI Developer",
    company: "Swiggy",
    logo: "S",
    location: "Remote (India)",
    type: "Full-Time",
    stipendOrSalary: "₹8.5 - ₹11 LPA",
    matchScore: 91,
    matchRationale: "Your SQL data extraction and Tableau visualization skills make you an immediate top-tier candidate for this BI opening.",
    matchedSkills: ["SQL", "Pandas", "Data Visualization", "Analytical Thinking"],
    missingSkills: ["Statistics"],
    postedTime: "4 days ago",
    applicantsCount: 167,
    featured: false,
    tags: ["100% Remote", "Executive Dashboards", "E-Commerce"]
  },
  {
    id: "job-6",
    title: "AI Systems Engineer (Defence Systems)",
    company: "Tata Advanced Systems",
    logo: "T",
    location: "Hyderabad, Telangana",
    type: "Full-Time",
    stipendOrSalary: "₹9 - ₹13 LPA",
    matchScore: 78,
    matchRationale: "Aligns with your computer vision and autonomous analytics profile. High synergy with Indian defence innovation projects.",
    matchedSkills: ["Python", "Machine Learning", "Analytical Thinking"],
    missingSkills: ["Deep Learning", "Statistics"],
    postedTime: "5 days ago",
    applicantsCount: 52,
    featured: false,
    tags: ["Aerospace & Defence", "High Security", "National Missions"]
  }
];

export const INITIAL_RESUME_ENHANCEMENTS: ResumeEnhancementItem[] = [
  {
    id: "res-1",
    category: "Machine Learning & Performance",
    originalBullet: "Built a machine learning model to predict customer churn using Python and Scikit-Learn with 82% accuracy.",
    enhancedBullet: "Architected an end-to-end customer churn prediction pipeline using Python, Scikit-Learn, and XGBoost; engineered 24+ behavioral features, achieving an 82% F1-score and identifying $450K in preventable quarterly customer churn.",
    metricHighlight: "+82% F1-Score | $450K Churn Identified",
    keywordsAdded: ["XGBoost", "Feature Engineering", "End-to-End Pipeline", "Business Value"],
    reasoning: "Replaced passive phrasing with strong action verb 'Architected', quantified business dollar impact ($450K), and specified technical depth (24+ behavioral features)."
  },
  {
    id: "res-2",
    category: "Data Engineering & Business Intelligence",
    originalBullet: "Wrote SQL queries to extract data from PostgreSQL databases and made Tableau dashboards for weekly team reviews.",
    enhancedBullet: "Optimized complex multi-table SQL aggregations across 2M+ PostgreSQL records; designed automated Tableau executive KPI dashboards reducing weekly reporting latency by 65% for 14 cross-functional stakeholders.",
    metricHighlight: "2M+ Records | 65% Reporting Latency Reduction",
    keywordsAdded: ["Query Optimization", "Multi-table Aggregations", "Executive KPI Dashboards", "Cross-Functional"],
    reasoning: "Highlighted scale (2M+ records), performance optimization (65% latency reduction), and stakeholder leadership impact."
  },
  {
    id: "res-3",
    category: "Generative AI & LLMs",
    originalBullet: "Experimented with fine-tuning an open-source LLM for question answering on company internal documentation.",
    enhancedBullet: "Engineered a Retrieval-Augmented Generation (RAG) assistant leveraging Llama-3, LangChain, and Qdrant vector database; indexed 1,200+ technical SOPs to resolve employee queries in <800ms with a 94% source attribution accuracy.",
    metricHighlight: "<800ms Latency | 94% Attribution Accuracy",
    keywordsAdded: ["RAG Architecture", "LangChain", "Vector Embeddings", "Qdrant", "Sub-second Latency"],
    reasoning: "Transformed vague 'experimented' into modern enterprise terminology (RAG, vector DBs, sub-second latency SLA, and attribution accuracy)."
  }
];

export const INITIAL_INTERVIEW_MESSAGES: MockInterviewMessage[] = [
  {
    id: "int-1",
    sender: "ai",
    text: "Welcome to your AI Mock Interview! I am your Senior Technical Interviewer powered by Gemini 2.5 Flash. I've analyzed your target role as a Data Scientist / AI Engineer and your academic profile.\n\nLet's begin with our first core technical question:\n\n**Could you explain the Bias-Variance tradeoff in supervised Machine Learning, and how techniques like L1 (Lasso) and L2 (Ridge) regularization help you control overfitting?**",
    timestamp: "10:00 AM",
    questionNumber: 1,
    category: "Technical"
  }
];
