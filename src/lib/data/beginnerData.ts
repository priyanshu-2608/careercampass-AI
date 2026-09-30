export interface DomainInfo {
  id: string;
  name: string;
  badge: string;
  iconName: string;
  tagline: string;
  description: string;
  marketDemand: number; // percentage (e.g. 94)
  avgSalary: string;
  difficulty: "Beginner Friendly" | "Intermediate" | "Challenging";
  entryRoles: string[];
  coreSkills: {
    name: string;
    level: "Essential" | "Recommended" | "Advanced";
    description: string;
  }[];
  roadmapSteps: {
    stepNumber: number;
    title: string;
    duration: string;
    skillsToLearn: string[];
    actionItem: string;
  }[];
  courses: {
    title: string;
    provider: "Coursera" | "edX" | "NPTEL / SWAYAM" | "freeCodeCamp";
    institution: string;
    duration: string;
    isFree: boolean;
    rating: number;
    url: string;
    keySkills: string[];
  }[];
  jobs: {
    title: string;
    company: string;
    location: string;
    stipendOrSalary: string;
    type: "Internship" | "Entry Level Job" | "Full-Time";
    matchPercentage: number;
    skillsRequired: string[];
    description: string;
  }[];
}

export const DOMAINS_DATA: Record<string, DomainInfo> = {
  "web-development": {
    id: "web-development",
    name: "Web Development",
    badge: "Most Popular",
    iconName: "Code",
    tagline: "Build responsive websites, interactive web applications, and backend systems.",
    description:
      "Web development involves creating visual websites and scalable web services using HTML, CSS, JavaScript, React, and modern backend databases.",
    marketDemand: 95,
    avgSalary: "₹6 - 14 LPA",
    difficulty: "Beginner Friendly",
    entryRoles: [
      "Frontend Web Developer",
      "React.js Developer",
      "Full Stack Junior Engineer",
      "Backend Developer"
    ],
    coreSkills: [
      { name: "HTML & CSS", level: "Essential", description: "Structure, flexbox, grid, and responsive styling" },
      { name: "JavaScript (ES6+)", level: "Essential", description: "DOM manipulation, fetch API, promises, and events" },
      { name: "React.js", level: "Essential", description: "Components, hooks (useState/useEffect), and routing" },
      { name: "Git & GitHub", level: "Essential", description: "Branching, commits, pull requests, and collaboration" },
      { name: "Node.js & Express", level: "Recommended", description: "REST APIs, routing, and backend servers" },
      { name: "SQL & Databases", level: "Recommended", description: "PostgreSQL, MongoDB, and basic query handling" },
      { name: "Tailwind CSS", level: "Recommended", description: "Rapid utility-first UI design" },
      { name: "TypeScript", level: "Advanced", description: "Type safety and scalable large codebase engineering" }
    ],
    roadmapSteps: [
      {
        stepNumber: 1,
        title: "Web Foundations (HTML, CSS & UI)",
        duration: "Weeks 1 - 3",
        skillsToLearn: ["HTML5", "CSS3", "Flexbox & Grid", "Responsive Design"],
        actionItem: "Build 2 responsive static websites (e.g. a personal portfolio and product landing page)."
      },
      {
        stepNumber: 2,
        title: "JavaScript & Interactive Logic",
        duration: "Weeks 4 - 7",
        skillsToLearn: ["JavaScript ES6", "DOM Events", "Async/Await", "Fetch APIs"],
        actionItem: "Create an interactive Weather App or Task Tracker fetching data from real public APIs."
      },
      {
        stepNumber: 3,
        title: "Frontend Framework (React.js)",
        duration: "Weeks 8 - 12",
        skillsToLearn: ["React Components", "Hooks", "Tailwind CSS", "State Management"],
        actionItem: "Develop a modern responsive E-Commerce store or Social Feed with search and filters."
      },
      {
        stepNumber: 4,
        title: "Full-Stack Backend & Deployment",
        duration: "Weeks 13 - 16",
        skillsToLearn: ["Node.js", "Express", "MongoDB / PostgreSQL", "Vercel / Render"],
        actionItem: "Deploy a full-stack CRUD application with authentication and live production URLs."
      }
    ],
    courses: [
      {
        title: "Meta Front-End Developer Professional Certificate",
        provider: "Coursera",
        institution: "Meta (Facebook)",
        duration: "3 - 5 Months (Self-paced)",
        isFree: true,
        rating: 4.8,
        url: "https://www.coursera.org/professional-certificates/meta-front-end-developer",
        keySkills: ["HTML/CSS", "JavaScript", "React", "UI Design"]
      },
      {
        title: "Responsive Web Design Certification",
        provider: "freeCodeCamp",
        institution: "freeCodeCamp.org",
        duration: "300 Hours (Free)",
        isFree: true,
        rating: 4.9,
        url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/",
        keySkills: ["HTML5", "CSS3", "Flexbox", "Web Accessibility"]
      },
      {
        title: "Web Technologies & Systems",
        provider: "NPTEL / SWAYAM",
        institution: "IIT Kharagpur (Govt Recognized)",
        duration: "8 Weeks",
        isFree: true,
        rating: 4.7,
        url: "https://nptel.ac.in/",
        keySkills: ["Client-Server Architecture", "JavaScript", "Database Integration"]
      },
      {
        title: "CS50's Web Programming with Python and JavaScript",
        provider: "edX",
        institution: "Harvard University",
        duration: "12 Weeks",
        isFree: true,
        rating: 4.9,
        url: "https://www.edx.org/learn/web-development/harvard-university-cs50-s-web-programming-with-python-and-javascript",
        keySkills: ["Django", "JavaScript", "SQL", "Git"]
      }
    ],
    jobs: [
      {
        title: "Frontend Developer Graduate Intern",
        company: "Zomato",
        location: "Gurugram / Remote",
        stipendOrSalary: "₹25,000 - ₹35,000 / month",
        type: "Internship",
        matchPercentage: 92,
        skillsRequired: ["HTML/CSS", "JavaScript", "React.js", "Git"],
        description: "Build delightful customer-facing mobile and web screens for real-time delivery tracking."
      },
      {
        title: "Associate React & Web Developer",
        company: "Swiggy",
        location: "Bengaluru, Karnataka",
        stipendOrSalary: "₹7.5 - ₹10 LPA",
        type: "Entry Level Job",
        matchPercentage: 88,
        skillsRequired: ["JavaScript", "React", "Tailwind CSS", "REST APIs"],
        description: "Collaborate with UI designers to ship fast, accessible web interfaces."
      },
      {
        title: "Junior Full Stack Engineer Trainee",
        company: "Tata Consultancy Services (TCS)",
        location: "Pan-India (Hybrid)",
        stipendOrSalary: "₹4.5 - ₹6.5 LPA",
        type: "Full-Time",
        matchPercentage: 85,
        skillsRequired: ["JavaScript", "Node.js", "SQL", "Git"],
        description: "Contribute to enterprise web portals and backend services under senior architects."
      }
    ]
  },

  "data-science": {
    id: "data-science",
    name: "Data Science & AI",
    badge: "Highest Growth",
    iconName: "BarChart2",
    tagline: "Uncover insights from data and build intelligent AI models.",
    description:
      "Data Science & AI focuses on analyzing large datasets, training Machine Learning algorithms, and automating smart decisions using Python and AI tools.",
    marketDemand: 92,
    avgSalary: "₹8 - 18 LPA",
    difficulty: "Intermediate",
    entryRoles: [
      "Junior Data Scientist",
      "Data Analyst",
      "Machine Learning Trainee",
      "Business Intelligence Associate"
    ],
    coreSkills: [
      { name: "Python Programming", level: "Essential", description: "Data types, loops, functions, and OOP" },
      { name: "SQL & Relational DBs", level: "Essential", description: "Writing queries, joins, and aggregating data" },
      { name: "Pandas & NumPy", level: "Essential", description: "Data manipulation, cleaning, and matrix computations" },
      { name: "Data Visualization", level: "Essential", description: "Matplotlib, Seaborn, and Tableau dashboards" },
      { name: "Machine Learning Basics", level: "Recommended", description: "Regression, classification, and Scikit-Learn" },
      { name: "Statistics & Probability", level: "Recommended", description: "Hypothesis testing, distributions, and variance" },
      { name: "Deep Learning (PyTorch)", level: "Advanced", description: "Neural networks and computer vision" },
      { name: "Generative AI & LLMs", level: "Advanced", description: "Prompt engineering, Gemini API, and RAG pipelines" }
    ],
    roadmapSteps: [
      {
        stepNumber: 1,
        title: "Python & Data Foundations",
        duration: "Weeks 1 - 3",
        skillsToLearn: ["Python Syntax", "NumPy", "Pandas", "Basic Math"],
        actionItem: "Clean and explore a real dataset from Kaggle to find hidden customer trends."
      },
      {
        stepNumber: 2,
        title: "SQL & Exploratory Visualizations",
        duration: "Weeks 4 - 7",
        skillsToLearn: ["SQL Joins", "Aggregations", "Seaborn", "Tableau"],
        actionItem: "Build an interactive sales and user retention dashboard with graphs."
      },
      {
        stepNumber: 3,
        title: "Supervised Machine Learning",
        duration: "Weeks 8 - 12",
        skillsToLearn: ["Scikit-Learn", "Linear Regression", "Decision Trees", "Model Evaluation"],
        actionItem: "Train a predictive model for customer churn or house price predictions."
      },
      {
        stepNumber: 4,
        title: "AI Project & Deployment",
        duration: "Weeks 13 - 16",
        skillsToLearn: ["FastAPI", "Gemini API", "Model Testing", "Streamlit"],
        actionItem: "Publish a live Streamlit AI web app demonstrating your trained model."
      }
    ],
    courses: [
      {
        title: "Machine Learning Specialization",
        provider: "Coursera",
        institution: "DeepLearning.AI & Stanford (Andrew Ng)",
        duration: "3 Months (7 hrs/week)",
        isFree: true,
        rating: 4.9,
        url: "https://www.coursera.org/specializations/machine-learning-introduction",
        keySkills: ["Supervised ML", "Neural Networks", "Logistic Regression"]
      },
      {
        title: "Google Data Analytics Professional Certificate",
        provider: "Coursera",
        institution: "Google",
        duration: "6 Months",
        isFree: true,
        rating: 4.8,
        url: "https://www.coursera.org/professional-certificates/google-data-analytics",
        keySkills: ["Spreadsheets", "SQL", "Tableau", "R Programming"]
      },
      {
        title: "Data Science for Engineers",
        provider: "NPTEL / SWAYAM",
        institution: "IIT Madras (Govt Certified)",
        duration: "8 Weeks",
        isFree: true,
        rating: 4.8,
        url: "https://nptel.ac.in/",
        keySkills: ["Linear Algebra", "Python", "Statistical Inference"]
      }
    ],
    jobs: [
      {
        title: "AI & Machine Learning Graduate Intern",
        company: "Google India",
        location: "Bengaluru, Karnataka (Hybrid)",
        stipendOrSalary: "₹65,000 / month",
        type: "Internship",
        matchPercentage: 94,
        skillsRequired: ["Python", "SQL", "Machine Learning", "Pandas"],
        description: "Assist senior researchers in training classification models and testing datasets."
      },
      {
        title: "Associate Data Scientist",
        company: "Razorpay",
        location: "Bengaluru, Karnataka",
        stipendOrSalary: "₹12 - ₹16 LPA",
        type: "Entry Level Job",
        matchPercentage: 86,
        skillsRequired: ["Python", "SQL", "Statistics", "Machine Learning"],
        description: "Analyze financial transaction patterns and construct fraud detection heuristics."
      },
      {
        title: "Data Analytics Intern",
        company: "Deloitte India",
        location: "Hyderabad / Remote",
        stipendOrSalary: "₹30,000 / month",
        type: "Internship",
        matchPercentage: 90,
        skillsRequired: ["SQL", "Excel", "Tableau", "Analytical Thinking"],
        description: "Prepare client reports and optimize executive business dashboards."
      }
    ]
  },

  "cloud-devops": {
    id: "cloud-devops",
    name: "Cloud & DevOps",
    badge: "High Stability",
    iconName: "Cloud",
    tagline: "Deploy scalable cloud servers and automate software delivery pipelines.",
    description:
      "Cloud and DevOps engineers maintain cloud infrastructure on AWS, Google Cloud, and containerize software using Docker and CI/CD automation tools.",
    marketDemand: 89,
    avgSalary: "₹7 - 16 LPA",
    difficulty: "Intermediate",
    entryRoles: [
      "Cloud Support Associate",
      "Junior DevOps Engineer",
      "Site Reliability Trainee",
      "System Administrator"
    ],
    coreSkills: [
      { name: "Linux Administration", level: "Essential", description: "Command line, permissions, process management, and SSH" },
      { name: "Git Version Control", level: "Essential", description: "Repositories, merging, and collaboration" },
      { name: "AWS Cloud Fundamentals", level: "Essential", description: "EC2, S3, IAM, VPC, and CloudWatch" },
      { name: "Docker & Containers", level: "Essential", description: "Images, containers, Dockerfiles, and compose" },
      { name: "CI/CD Pipelines", level: "Recommended", description: "GitHub Actions and automated testing" },
      { name: "Networking Basics", level: "Recommended", description: "IP addressing, DNS, ports, and protocols" },
      { name: "Kubernetes", level: "Advanced", description: "Cluster orchestration and deployments" },
      { name: "Infrastructure as Code (Terraform)", level: "Advanced", description: "Automated cloud provisioning" }
    ],
    roadmapSteps: [
      {
        stepNumber: 1,
        title: "Linux & Computer Networking",
        duration: "Weeks 1 - 3",
        skillsToLearn: ["Linux CLI", "Bash Scripting", "TCP/IP & DNS", "SSH Keys"],
        actionItem: "Configure a local Linux server and write a bash backup script."
      },
      {
        stepNumber: 2,
        title: "Docker Containerization",
        duration: "Weeks 4 - 7",
        skillsToLearn: ["Dockerfiles", "Docker Compose", "Multi-stage builds"],
        actionItem: "Containerize a full-stack web application with frontend, backend, and database."
      },
      {
        stepNumber: 3,
        title: "AWS Cloud Fundamentals",
        duration: "Weeks 8 - 12",
        skillsToLearn: ["AWS EC2", "AWS S3", "IAM Security", "Load Balancers"],
        actionItem: "Host a containerized application on an AWS EC2 instance with custom domain."
      },
      {
        stepNumber: 4,
        title: "CI/CD Automation",
        duration: "Weeks 13 - 16",
        skillsToLearn: ["GitHub Actions", "Automated Testing", "Zero Downtime Deploy"],
        actionItem: "Set up a pipeline that automatically tests and deploys code on every git push."
      }
    ],
    courses: [
      {
        title: "AWS Cloud Practitioner Essentials",
        provider: "Coursera",
        institution: "Amazon Web Services (AWS)",
        duration: "4 Weeks",
        isFree: true,
        rating: 4.8,
        url: "https://www.coursera.org/learn/aws-cloud-practitioner-essentials",
        keySkills: ["Cloud Security", "AWS Architecture", "Compute & Storage"]
      },
      {
        title: "Cloud Computing & Distributed Systems",
        provider: "NPTEL / SWAYAM",
        institution: "IIT Kharagpur (Govt Certified)",
        duration: "8 Weeks",
        isFree: true,
        rating: 4.7,
        url: "https://nptel.ac.in/",
        keySkills: ["Virtualization", "Cloud Storage", "Distributed Systems"]
      }
    ],
    jobs: [
      {
        title: "Cloud Support Associate Intern",
        company: "Amazon (AWS)",
        location: "Bengaluru / Hyderabad",
        stipendOrSalary: "₹45,000 / month",
        type: "Internship",
        matchPercentage: 90,
        skillsRequired: ["Linux", "Networking", "AWS Basics", "Troubleshooting"],
        description: "Help customers deploy and troubleshoot cloud workloads on AWS."
      },
      {
        title: "DevOps Engineer Trainee",
        company: "Infosys",
        location: "Pune / Bengaluru",
        stipendOrSalary: "₹5.5 - ₹8 LPA",
        type: "Entry Level Job",
        matchPercentage: 84,
        skillsRequired: ["Linux", "Git", "Docker", "CI/CD"],
        description: "Maintain build pipelines and support test deployments for client projects."
      }
    ]
  },

  "ui-ux-design": {
    id: "ui-ux-design",
    name: "UI/UX & Product Design",
    badge: "Creative & Tech",
    iconName: "Layout",
    tagline: "Design intuitive interfaces, interactive wireframes, and delightful experiences.",
    description:
      "UI/UX Designers conduct user interviews, create wireframes, test usability, and build interactive design systems in Figma before developers write code.",
    marketDemand: 87,
    avgSalary: "₹5.5 - 13 LPA",
    difficulty: "Beginner Friendly",
    entryRoles: [
      "Junior UI Designer",
      "Product Design Intern",
      "UX Researcher Associate",
      "Design Systems Specialist"
    ],
    coreSkills: [
      { name: "Figma Mastery", level: "Essential", description: "Auto-layout, reusable components, and interactive prototypes" },
      { name: "UI Design Principles", level: "Essential", description: "Typography, color theory, spacing, and hierarchy" },
      { name: "Wireframing & Prototyping", level: "Essential", description: "Low-fidelity sketches to clickable prototypes" },
      { name: "User Research & Personas", level: "Essential", description: "Interviewing users and mapping pain points" },
      { name: "Usability Testing", level: "Recommended", description: "Testing navigation flows with real users" },
      { name: "Design Systems", level: "Recommended", description: "Creating style guides, tokens, and asset libraries" },
      { name: "Web Accessibility (WCAG)", level: "Recommended", description: "Color contrast and accessible design" },
      { name: "Design to Code Handoff", level: "Advanced", description: "Collaborating with React & frontend engineers" }
    ],
    roadmapSteps: [
      {
        stepNumber: 1,
        title: "Visual Design & Figma Basics",
        duration: "Weeks 1 - 3",
        skillsToLearn: ["Figma UI", "Auto Layout", "Colors & Typography", "Spacing Rules"],
        actionItem: "Recreate 3 popular mobile app screens (e.g. Spotify, Instagram, Airbnb) in Figma."
      },
      {
        stepNumber: 2,
        title: "UX Research & Wireframing",
        duration: "Weeks 4 - 7",
        skillsToLearn: ["User Personas", "Journey Mapping", "Low-Fi Wireframing"],
        actionItem: "Interview 3 college students and design a student campus event app wireframe."
      },
      {
        stepNumber: 3,
        title: "Interactive Prototyping & Design Systems",
        duration: "Weeks 8 - 12",
        skillsToLearn: ["Smart Animate", "Interactive Components", "Variables & Tokens"],
        actionItem: "Build a clickable mobile app prototype with interactive bottom navigation."
      },
      {
        stepNumber: 4,
        title: "Portfolio Case Studies",
        duration: "Weeks 13 - 16",
        skillsToLearn: ["Case Study Writing", "Problem-Solving Narrative", "Behance / Notion"],
        actionItem: "Publish 2 in-depth case studies detailing problem statement, user research, and final designs."
      }
    ],
    courses: [
      {
        title: "Google UX Design Professional Certificate",
        provider: "Coursera",
        institution: "Google",
        duration: "6 Months (Self-paced)",
        isFree: true,
        rating: 4.8,
        url: "https://www.coursera.org/professional-certificates/google-ux-design",
        keySkills: ["Figma", "User Research", "Wireframing", "Portfolio Creation"]
      },
      {
        title: "Interaction Design Specialization",
        provider: "Coursera",
        institution: "UC San Diego",
        duration: "4 Months",
        isFree: true,
        rating: 4.7,
        url: "https://www.coursera.org/specializations/interaction-design",
        keySkills: ["Usability Testing", "Prototyping", "Design Heuristics"]
      }
    ],
    jobs: [
      {
        title: "Product Design Intern",
        company: "Zepto",
        location: "Mumbai / Bengaluru",
        stipendOrSalary: "₹30,000 / month",
        type: "Internship",
        matchPercentage: 91,
        skillsRequired: ["Figma", "Visual Design", "Prototyping", "Wireframing"],
        description: "Help design swift grocery checkout flows and delivery driver interfaces."
      },
      {
        title: "Associate UI/UX Designer",
        company: "CRED",
        location: "Bengaluru, Karnataka",
        stipendOrSalary: "₹10 - ₹14 LPA",
        type: "Entry Level Job",
        matchPercentage: 85,
        skillsRequired: ["Figma", "Micro-interactions", "Design Systems"],
        description: "Craft premium user interfaces and micro-animations for mobile credit apps."
      }
    ]
  },

  "cyber-security": {
    id: "cyber-security",
    name: "Cyber Security",
    badge: "High Demand",
    iconName: "Shield",
    tagline: "Protect systems, safeguard networks, and defend against cyber threats.",
    description:
      "Cyber security specialists analyze security vulnerabilities, defend networks from intrusion, and conduct ethical hacking evaluations.",
    marketDemand: 91,
    avgSalary: "₹6 - 15 LPA",
    difficulty: "Challenging",
    entryRoles: [
      "SOC Security Analyst",
      "Junior Penetration Tester",
      "Information Security Associate",
      "Network Security Trainee"
    ],
    coreSkills: [
      { name: "Computer Networking", level: "Essential", description: "OSI model, TCP/IP, subnets, DNS, and firewalls" },
      { name: "Linux Security", level: "Essential", description: "Permissions, logging, iptables, and system hardening" },
      { name: "Security Fundamentals", level: "Essential", description: "Confidentiality, Integrity, Availability (CIA triad)" },
      { name: "Vulnerability Scanning", level: "Essential", description: "Nmap, Wireshark, and Nessus tools" },
      { name: "Web App Security", level: "Recommended", description: "OWASP Top 10 vulnerabilities (SQLi, XSS, CSRF)" },
      { name: "Incident Response", level: "Recommended", description: "Analyzing log files and threat containment" },
      { name: "Cryptography", level: "Advanced", description: "Symmetric, asymmetric encryption, and PKI" },
      { name: "Ethical Hacking Tools", level: "Advanced", description: "Burp Suite, Metasploit, and Kali Linux" }
    ],
    roadmapSteps: [
      {
        stepNumber: 1,
        title: "Networking & Linux Fundamentals",
        duration: "Weeks 1 - 3",
        skillsToLearn: ["Wireshark", "Packet Analysis", "Linux Commands", "Firewalls"],
        actionItem: "Capture network packets in Wireshark and inspect HTTP headers and DNS handshakes."
      },
      {
        stepNumber: 2,
        title: "Security Tooling & Scans",
        duration: "Weeks 4 - 7",
        skillsToLearn: ["Nmap", "Port Scanning", "Network Mapping", "Vulnerability Assessment"],
        actionItem: "Run safe vulnerability scans on practice virtual machines like TryHackMe."
      },
      {
        stepNumber: 3,
        title: "Web Application Security (OWASP)",
        duration: "Weeks 8 - 12",
        skillsToLearn: ["Burp Suite", "SQL Injection", "Cross-Site Scripting (XSS)"],
        actionItem: "Solve beginner lab challenges on PortSwigger Web Security Academy."
      },
      {
        stepNumber: 4,
        title: "Defensive Operations & Certification Prep",
        duration: "Weeks 13 - 16",
        skillsToLearn: ["SIEM Tools", "Log Analysis", "CompTIA Security+ concepts"],
        actionItem: "Set up a home SOC lab with open-source SIEM to detect simulated cyber attacks."
      }
    ],
    courses: [
      {
        title: "Google Cybersecurity Professional Certificate",
        provider: "Coursera",
        institution: "Google",
        duration: "6 Months",
        isFree: true,
        rating: 4.8,
        url: "https://www.coursera.org/professional-certificates/google-cybersecurity",
        keySkills: ["SIEM Tools", "Python for Security", "Linux", "SQL"]
      },
      {
        title: "Information Security & Cyber Forensics",
        provider: "NPTEL / SWAYAM",
        institution: "IIT Madras (Govt Certified)",
        duration: "8 Weeks",
        isFree: true,
        rating: 4.7,
        url: "https://nptel.ac.in/",
        keySkills: ["Network Security", "Cryptography", "Digital Forensics"]
      }
    ],
    jobs: [
      {
        title: "SOC Security Analyst Trainee",
        company: "Wipro Cyber Defense",
        location: "Bengaluru / Hyderabad",
        stipendOrSalary: "₹5.0 - ₹7.5 LPA",
        type: "Entry Level Job",
        matchPercentage: 88,
        skillsRequired: ["Networking", "Log Analysis", "Linux", "Security Basics"],
        description: "Monitor security alert feeds and escalate potential network intrusions."
      },
      {
        title: "Cyber Security Research Intern",
        company: "Quick Heal Technologies",
        location: "Pune / Remote",
        stipendOrSalary: "₹25,000 / month",
        type: "Internship",
        matchPercentage: 85,
        skillsRequired: ["Malware Analysis", "Python", "Linux", "Networking"],
        description: "Analyze newly identified telemetry threats and write signature detection rules."
      }
    ]
  }
};
