// Portfolio Data — All content in one place

export const personal = {
  name: "Aditya Singh Rajput",
  nickname: "Adii",
  role: "AI/ML Engineer & Full-Stack Developer",
  badge: "AI/ML ENGINEER · FULL-STACK DEVELOPER · INNOVATOR",
  heroLine1: "Building Intelligence.",
  heroLine2: "Shaping Tomorrow.",
  subtitle:
    "I build AI-powered products that transform complex ideas into intelligent, real-world solutions.",
  email: "singhrajputaditya982@gmail.com",
  github: "https://github.com/adii0018",
  linkedin: "https://www.linkedin.com/in/adii001n/",
  githubUsername: "adii0018",
  location: "India",
};

export const skills = [
  // 1. AI / ML (9 tools)
  { name: "Python", category: "AI / ML", icon: "python", level: "Expert", desc: "Core language for ML & data science" },
  { name: "NumPy", category: "AI / ML", icon: "numpy", level: "Advanced", desc: "Scientific computing & multi-dimensional arrays" },
  { name: "Pandas", category: "AI / ML", icon: "pandas", level: "Advanced", desc: "Data manipulation & analytical pipelines" },
  { name: "Matplotlib", category: "AI / ML", icon: "matplotlib", level: "Advanced", desc: "Data visualization & publication charts" },
  { name: "Seaborn", category: "AI / ML", icon: "seaborn", level: "Advanced", desc: "Statistical data visualization" },
  { name: "Pygame", category: "AI / ML", icon: "pygame", level: "Intermediate", desc: "Game simulation & reinforcement environments" },
  { name: "TensorFlow", category: "AI / ML", icon: "tensorflow", level: "Advanced", desc: "Deep learning & neural network architectures" },
  { name: "PyTorch", category: "AI / ML", icon: "pytorch", level: "Advanced", desc: "Dynamic neural networks & AI research" },
  { name: "scikit-learn", category: "AI / ML", icon: "scikit-learn", level: "Advanced", desc: "Classical machine learning algorithms" },

  // 2. Web & Backend (6 tools)
  { name: "JavaScript", category: "Web & Backend", icon: "javascript", level: "Advanced", desc: "Modern dynamic web logic & scripting" },
  { name: "Django", category: "Web & Backend", icon: "django", level: "Advanced", desc: "Robust Python web framework & ORM" },
  { name: "React", category: "Web & Backend", icon: "react", level: "Advanced", desc: "Component-driven interactive UI development" },
  { name: "Tailwind CSS", category: "Web & Backend", icon: "tailwindcss", level: "Expert", desc: "Utility-first modern responsive styling" },
  { name: "MongoDB", category: "Web & Backend", icon: "mongodb", level: "Advanced", desc: "NoSQL document database for scalable apps" },
  { name: "SQL", category: "Web & Backend", icon: "sql", level: "Advanced", desc: "Relational queries, modeling & optimization" },

  // 3. Cloud & DevOps (4 tools)
  { name: "Google Cloud", category: "Cloud & DevOps", icon: "gcp", level: "Intermediate", desc: "Cloud infrastructure & Vertex AI services" },
  { name: "AWS", category: "Cloud & DevOps", icon: "aws", level: "Intermediate", desc: "EC2, S3, Lambda & cloud deployments" },
  { name: "Azure", category: "Cloud & DevOps", icon: "azure", level: "Intermediate", desc: "Enterprise cloud & cognitive services" },
  { name: "Linux", category: "Cloud & DevOps", icon: "linux", level: "Advanced", desc: "CLI, bash scripting & server administration" },

  // 4. Core & Systems (3 tools)
  { name: "C++", category: "Core & Systems", icon: "cpp", level: "Advanced", desc: "High-performance systems & algorithmic DSA" },
  { name: "Git", category: "Core & Systems", icon: "git", level: "Expert", desc: "Distributed version control & team workflows" },
  { name: "Docker", category: "Core & Systems", icon: "docker", level: "Advanced", desc: "Containerization & reproducible environments" },
];

export const skillCategories = ["AI / ML", "Web & Backend", "Cloud & DevOps", "Core & Systems"];

export type ProjectHud = {
  eyebrow: string;
  meta: string;
  bodyKind: "rows" | "quote";
  rows?: { label: string; value: string }[];
  quote?: string;
  quoteNote?: string;
  footerLeft: string;
  footerRight: string;
};

export type Project = {
  id: number;
  title: string;
  accentLine: string;
  subtitle: string;
  description: string;
  shortDescription: string;
  tech: string[];
  github: string;
  live: string | null;
  featured: boolean;
  size: "large" | "medium" | "small";
  tag: string;
  color: string;
  theme: "light" | "dark";
  kicker: string;
  headerMeta: string;
  image?: string;
  hud?: ProjectHud;
};

export const projects: Project[] = [
  {
    id: 1,
    title: "Alice Exam",
    accentLine: "Proctor",
    subtitle: "AI-Powered Real-Time Integrity & Autonomous Proctoring",
    description:
      "AI-powered exam proctoring system using computer vision & NLP to detect cheating in real-time. Features face detection, eye-tracking, audio monitoring, and automated flagging with detailed reports.",
    shortDescription:
      "Detects cheating in real-time with automated gaze tracking, face recognition, and audio monitoring.",
    tech: ["Python", "OpenCV", "FastAPI", "React", "TensorFlow"],
    github: "https://github.com/adii0018/Alice-exam-proctor",
    live: null,
    featured: true,
    size: "large",
    tag: "Computer Vision · AI",
    color: "#10b981",
    theme: "light",
    kicker: "with real-time computer vision",
    headerMeta: "Autonomous Proctoring",
    image: "/alice-exam-proctor.jpg",
  },
  {
    id: 2,
    title: "Alice",
    accentLine: "Mandi",
    subtitle: "AI-Powered Agricultural Marketplace & Logistics Optimization",
    description:
      "AI-powered agricultural marketplace connecting farmers directly to buyers with ML-based price prediction, crop demand forecasting, and smart logistics optimization.",
    shortDescription:
      "Connecting farmers directly to buyers with ML price prediction and smart logistics optimization.",
    tech: ["Python", "Django", "React", "ML", "PostgreSQL"],
    github: "https://github.com/adii0018/Alice-mandi",
    live: null,
    featured: true,
    size: "medium",
    tag: "Machine Learning · AgriTech",
    color: "#c0adff",
    theme: "dark",
    kicker: "with ML price forecasting",
    headerMeta: "Price Prediction Engine",
    hud: {
      eyebrow: "MANDI TICKER",
      meta: "MODEL R² FOCUS",
      bodyKind: "rows",
      rows: [
        { label: "Wheat (Indore)", value: "Demand + harvest window" },
        { label: "Soybean (Ujjain)", value: "Logistics route score" },
      ],
      footerLeft: "PIPELINE: FORECAST",
      footerRight: "STATUS: IN BUILD",
    },
  },
  {
    id: 3,
    title: "JanSetu",
    accentLine: "AI",
    subtitle: "Multilingual Citizen Governance & Welfare Scheme Assistant",
    description:
      "Conversational AI assistant for rural citizens to access government schemes, file complaints, and get real-time updates in regional languages using NLP and LLMs.",
    shortDescription:
      "Conversational AI assistant for rural citizens to access government schemes and file complaints in regional languages.",
    tech: ["LangChain", "Hugging Face", "FastAPI", "NLP", "React"],
    github: "https://github.com/adii0018/JanSetu-AI",
    live: null,
    featured: true,
    size: "medium",
    tag: "NLP · GovTech · Social Impact",
    color: "#0284c7",
    theme: "light",
    kicker: "with regional-language NLP",
    headerMeta: "GovTech Prototype",
    hud: {
      eyebrow: "LLM PIPELINE",
      meta: "LANGCHAIN",
      bodyKind: "quote",
      quote: "किसान क्रेडिट कार्ड की पात्रता क्या है?",
      quoteNote: "Intent parse → scheme lookup in regional language.",
      footerLeft: "SPEECH-TO-TEXT",
      footerRight: "MULTI-DIALECT",
    },
  },
  {
    id: 4,
    title: "FFZone",
    accentLine: "Arena",
    subtitle: "Full-Stack Fantasy Football with Live Analytics & AI Tactics",
    description:
      "Full-stack fantasy football platform with real-time match data, AI-based team suggestions, player performance analytics, and competitive leagues with live scoring.",
    shortDescription:
      "Full-stack fantasy platform with real-time match data, AI team suggestions, and competitive leagues with live scoring.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "AI", "TypeScript"],
    github: "https://github.com/adii0018/FFZONE",
    live: null,
    featured: true,
    size: "small",
    tag: "Full-Stack · Real-Time AI",
    color: "#d9ff5c",
    theme: "dark",
    kicker: "with AI lineup suggestions",
    headerMeta: "Competitive Leagues",
    hud: {
      eyebrow: "MATCHDAY",
      meta: "AI OPTIMIZED",
      bodyKind: "rows",
      rows: [
        { label: "AI Captain Pick", value: "Form + fixture model" },
        { label: "League Engine", value: "Live scoring pipeline" },
      ],
      footerLeft: "LIVE SCORING",
      footerRight: "IN DEVELOPMENT",
    },
  },
];

export const experience = [
  {
    title: "Independent AI/ML Engineer",
    company: "Personal products · Alice / JanSetu",
    period: "2024 — Present",
    description:
      "Building and iterating on shipped AI products: computer-vision exam proctoring, agri price-forecast tooling, and a multilingual citizen-scheme assistant. Focus is end-to-end — model work, APIs, and product UI.",
    tech: ["Python", "TensorFlow", "FastAPI"],
    type: "work",
  },
  {
    title: "Full-Stack Developer",
    company: "Freelance & self-initiated builds",
    period: "2023 — Present",
    description:
      "Designing web apps and AI-integrated product surfaces for client work and personal platforms, including FFZone. Stack centers on React/Next.js with Python backends.",
    tech: ["React", "Next.js", "Django", "PostgreSQL"],
    type: "work",
  },
  {
    title: "Hackathon builder",
    company: "National AI / GovTech events",
    period: "2023 — 2024",
    description:
      "Prototyped social-impact tools around AI/ML and citizen services at national-level hackathons. Happy to walk through specific events and outcomes in conversation.",
    tech: ["AI", "ML", "Problem Solving"],
    type: "achievement",
  },
  {
    title: "B.Tech Computer Science",
    company: "AI/ML specialization · India",
    period: "2022 — 2026",
    description:
      "Undergraduate CS with an AI/ML focus, applied through product work rather than coursework-only demos.",
    tech: ["AI/ML", "DSA", "Systems"],
    type: "education",
  },
];

export const certifications = [
  {
    name: "Machine Learning Specialization",
    issuer: "Coursera / Stanford",
    year: "2024",
    icon: "stanford",
    color: "#d9ff5c",
    credentialUrl: "https://www.coursera.org/specializations/machine-learning-introduction",
    linkLabel: "Course page",
  },
  {
    name: "Deep Learning Specialization",
    issuer: "Coursera / DeepLearning.AI",
    year: "2024",
    icon: "deeplearning",
    color: "#c0adff",
    credentialUrl: "https://www.coursera.org/specializations/deep-learning",
    linkLabel: "Course page",
  },
  {
    name: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    year: "2023",
    icon: "aws",
    color: "#b8deff",
    credentialUrl: "https://aws.amazon.com/certification/certified-cloud-practitioner/",
    linkLabel: "Certification page",
  },
  {
    name: "Python for Data Science",
    issuer: "IBM / Coursera",
    year: "2023",
    icon: "ibm",
    color: "#d9ff5c",
    credentialUrl: "https://www.coursera.org/learn/python-for-applied-data-science-ai",
    linkLabel: "Course page",
  },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "AI Lab", href: "#features" },
  { label: "Contact", href: "#contact" },
];
