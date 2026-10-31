import {
  PersonalInfo,
  Skill,
  SkillCategory,
  Project,
  ExperienceItem,
  Certification,
  NavLink,
} from "@/types/portfolio";
import { NAME, NICKNAME, ROLE, SOCIAL_LINKS } from "@/lib/site";

// Portfolio Data — Sourced directly from Aditya Singh Rajput's Official Resume

export const personal: PersonalInfo = {
  name: NAME,
  nickname: NICKNAME,
  role: ROLE,
  badge: "AI/ML ENGINEER · FULL-STACK DEVELOPER · INNOVATOR",
  heroLine1: "Know your code.",
  heroLine2: "Plan with AI.",
  subtitle:
    "Final-year CS student who builds and ships AI products end to end. Deployed 4+ live applications spanning LLMs, RAG, computer vision, and full-stack development using Python, LangChain, and Hugging Face.",
  ctaExplore: {
    label: "Explore My Work",
    targetId: "projects",
  },
  email: "singhrajputaditya982@gmail.com",
  github: SOCIAL_LINKS.github,
  linkedin: SOCIAL_LINKS.linkedin,
  githubUsername: "adii0018",
  location: "Indore, Madhya Pradesh, India",
};

export const skills: Skill[] = [
  // 1. AI / ML & GenAI
  { name: "Python", category: "AI / ML", icon: "python", level: "Expert", desc: "Core language for ML, GenAI & deep learning systems" },
  { name: "LangChain", category: "AI / ML", icon: "langchain", level: "Advanced", desc: "RAG pipelines, agents & LLM orchestration" },
  { name: "TensorFlow", category: "AI / ML", icon: "tensorflow", level: "Advanced", desc: "Deep learning & neural network architectures" },
  { name: "PyTorch", category: "AI / ML", icon: "pytorch", level: "Advanced", desc: "Dynamic neural networks & computer vision" },
  { name: "scikit-learn", category: "AI / ML", icon: "scikit-learn", level: "Advanced", desc: "Classical machine learning & price prediction" },
  { name: "OpenCV", category: "AI / ML", icon: "opencv", level: "Advanced", desc: "Real-time computer vision & facial biometric tracking" },
  { name: "NumPy", category: "AI / ML", icon: "numpy", level: "Advanced", desc: "Scientific computing & multi-dimensional tensor arrays" },
  { name: "Pandas", category: "AI / ML", icon: "pandas", level: "Advanced", desc: "Data manipulation & analytical ETL pipelines" },
  { name: "Matplotlib", category: "AI / ML", icon: "matplotlib", level: "Advanced", desc: "Exploratory data analysis & model visualization" },

  // 2. Web & Backend
  { name: "FastAPI", category: "Web & Backend", icon: "fastapi", level: "Advanced", desc: "High-performance async REST APIs & AI inference" },
  { name: "Django", category: "Web & Backend", icon: "django", level: "Advanced", desc: "Full-stack Python web framework & secure ORM" },
  { name: "React", category: "Web & Backend", icon: "react", level: "Advanced", desc: "Component-driven interactive UI & client state" },
  { name: "JavaScript", category: "Web & Backend", icon: "javascript", level: "Advanced", desc: "Modern dynamic web logic & asynchronous scripting" },
  { name: "Tailwind CSS", category: "Web & Backend", icon: "tailwindcss", level: "Expert", desc: "Utility-first modern responsive interfaces" },
  { name: "PostgreSQL", category: "Web & Backend", icon: "postgresql", level: "Advanced", desc: "Relational database modeling, indexing & ACID transactions" },
  { name: "MongoDB", category: "Web & Backend", icon: "mongodb", level: "Advanced", desc: "NoSQL document database for scalable distributed applications" },
  { name: "SQL", category: "Web & Backend", icon: "sql", level: "Advanced", desc: "Complex relational queries & database optimization" },

  // 3. Cloud & DevOps
  { name: "Google Cloud", category: "Cloud & DevOps", icon: "gcp", level: "Intermediate", desc: "Cloud infrastructure, Vertex AI & Hands-on Labs" },
  { name: "AWS", category: "Cloud & DevOps", icon: "aws", level: "Intermediate", desc: "EC2, S3, cloud deployments & serverless workloads" },
  { name: "Linux", category: "Cloud & DevOps", icon: "linux", level: "Advanced", desc: "CLI, bash scripting & production server administration" },
  { name: "Docker", category: "Cloud & DevOps", icon: "docker", level: "Advanced", desc: "Containerization & reproducible microservices" },

  // 4. Core & Systems
  { name: "C++", category: "Core & Systems", icon: "cpp", level: "Advanced", desc: "High-performance systems & algorithmic DSA on LeetCode" },
  { name: "Git", category: "Core & Systems", icon: "git", level: "Expert", desc: "Distributed version control, branches & CI/CD workflows" },
];

export const skillCategories: SkillCategory[] = ["AI / ML", "Web & Backend", "Cloud & DevOps", "Core & Systems"];

export const projects: Project[] = [
  {
    id: 1,
    title: "Alice Exam Proctor",
    subtitle: "AI Proctoring Platform",
    description:
      "AI-powered proctoring system with real-time face detection, gaze tracking, acoustic anomaly analysis, and role-based instructor dashboards.",
    tech: ["React", "Django", "WebSockets", "MongoDB", "OpenCV"],
    github: "https://github.com/adii0018/Alice-exam-proctor",
    live: null,
    featured: true,
    size: "large",
    tag: "Computer Vision",
    color: "#d9ff5c",
    image: "/alice-exam-proctor.jpg",
  },
  {
    id: 2,
    title: "Alice Mandi",
    subtitle: "AI Agricultural Marketplace",
    description:
      "Direct farmer-to-buyer marketplace featuring ML price forecasting on regional mandi data and smart harvest logistics optimization.",
    tech: ["Python", "Django", "React", "ML", "PostgreSQL"],
    github: "https://github.com/adii0018/Alice-mandi",
    live: null,
    featured: true,
    size: "medium",
    tag: "ML · AgriTech",
    color: "#c0adff",
  },
  {
    id: 3,
    title: "JanSetu AI",
    subtitle: "Governance Intelligence Platform",
    description:
      "Multilingual AI platform for citizen-request classification and explainable infrastructure prioritization combining RAG, NLP, and geospatial analysis.",
    tech: ["React", "FastAPI", "NLP", "LangChain", "Hugging Face"],
    github: "https://github.com/adii0018/JanSetu-AI",
    live: null,
    featured: true,
    size: "medium",
    tag: "NLP · GovTech",
    color: "#b8deff",
    image: "/jansetu-ai-bg.png",
  },
  {
    id: 4,
    title: "FFZONE",
    subtitle: "Esports Tournament Platform",
    description:
      "High-concurrency esports tournament platform featuring team registration, live bracket management, interactive leaderboards, and Razorpay payment workflows.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "Razorpay", "TypeScript"],
    github: "https://github.com/adii0018/FFZONE",
    live: null,
    featured: true,
    size: "small",
    tag: "Full-Stack",
    color: "#d9ff5c",
    image: "/ffzone-bg.png",
  },
];

export const experience: ExperienceItem[] = [
  {
    title: "AI/ML Engineer & Full-Stack Developer",
    company: "AI & Web Innovations",
    period: "2024 — Present",
    description:
      "Building and shipping end-to-end AI applications spanning LLMs, RAG pipelines, computer vision models, and low-latency inference endpoints.",
    tech: ["Python", "LangChain", "FastAPI", "React", "Docker"],
    type: "work",
  },
  {
    title: "Full-Stack Developer",
    company: "Freelance & Open Source",
    period: "2023 — Present",
    description:
      "Developing high-concurrency web platforms, database-backed REST APIs, and real-time WebSocket architectures across Next.js, Django, and PostgreSQL.",
    tech: ["Next.js", "Django", "PostgreSQL", "WebSockets", "Razorpay"],
    type: "work",
  },
  {
    title: "Hackathon Winner & Problem Solver",
    company: "College & Regional Hackathons",
    period: "2023 — 2026",
    description:
      "Won college-level hackathons developing innovative AI and full-stack technical solutions. Participated in 10+ hackathons and solved 50+ LeetCode problems strengthening DSA & core algorithms.",
    tech: ["Algorithms", "Problem Solving", "Rapid Prototyping"],
    type: "achievement",
  },
  {
    title: "B.Tech in Computer Science & Engineering",
    company: "Swami Vivekanand College of Engineering (SVCE), Indore | Affiliated with RGPV, Bhopal",
    period: "2023 — 2027",
    description:
      "CGPA: 7.56. Core coursework in Data Structures & Algorithms, Machine Learning, Computer Vision, Operating Systems, DBMS, and Computer Networks.",
    tech: ["DSA", "AI/ML", "DBMS", "Operating Systems"],
    type: "education",
  },
];

export const certifications: Certification[] = [
  {
    name: "Google Cloud Skills Boost",
    issuer: "Google · Arcade & Hands-on Labs",
    year: "2024",
    icon: "gcp",
    color: "#4285f4",
    credentialUrl: "https://www.cloudskillsboost.google/",
  },
  {
    name: "Build with AI Bootcamp",
    issuer: "Google",
    year: "2024",
    icon: "google",
    color: "#34a853",
    credentialUrl: "https://developers.google.com/",
  },
  {
    name: "Machine Learning Specialization",
    issuer: "DeepLearning.AI / Stanford",
    year: "2024",
    icon: "stanford",
    color: "#d9ff5c",
    credentialUrl: "https://www.coursera.org/specializations/machine-learning-introduction",
  },
];

export const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];
