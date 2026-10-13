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
  // AI/ML
  { name: "Python", category: "AI/ML", icon: "🐍" },
  { name: "TensorFlow", category: "AI/ML", icon: "🤖" },
  { name: "PyTorch", category: "AI/ML", icon: "🔥" },
  { name: "scikit-learn", category: "AI/ML", icon: "📊" },
  { name: "OpenCV", category: "AI/ML", icon: "👁️" },
  { name: "NLP", category: "AI/ML", icon: "💬" },
  { name: "LangChain", category: "AI/ML", icon: "🔗" },
  { name: "Hugging Face", category: "AI/ML", icon: "🤗" },
  // Full-Stack
  { name: "React", category: "Frontend", icon: "⚛️" },
  { name: "Next.js", category: "Frontend", icon: "▲" },
  { name: "TypeScript", category: "Frontend", icon: "📘" },
  { name: "Tailwind CSS", category: "Frontend", icon: "🎨" },
  // Backend
  { name: "FastAPI", category: "Backend", icon: "⚡" },
  { name: "Django", category: "Backend", icon: "🎸" },
  { name: "Node.js", category: "Backend", icon: "🟢" },
  { name: "PostgreSQL", category: "Backend", icon: "🐘" },
  // Tools
  { name: "Docker", category: "Tools", icon: "🐳" },
  { name: "Git", category: "Tools", icon: "📦" },
  { name: "AWS", category: "Tools", icon: "☁️" },
  { name: "Linux", category: "Tools", icon: "🐧" },
];

export const skillCategories = ["AI/ML", "Frontend", "Backend", "Tools"];

export const projects = [
  {
    id: 1,
    title: "Alice Exam Proctor",
    subtitle: "AI-Powered Exam Proctoring",
    description:
      "AI-powered exam proctoring system using computer vision & NLP to detect cheating in real-time. Features face detection, eye-tracking, audio monitoring, and automated flagging with detailed reports.",
    tech: ["Python", "OpenCV", "NLP", "FastAPI", "React", "TensorFlow"],
    github: "https://github.com/adii0018",
    live: null,
    featured: true,
    size: "large", // for bento grid
    tag: "Computer Vision",
    color: "#d9ff5c",
  },
  {
    id: 2,
    title: "Alice Mandi",
    subtitle: "AI Agricultural Marketplace",
    description:
      "AI-powered agricultural marketplace connecting farmers directly to buyers with ML-based price prediction, crop demand forecasting, and smart logistics optimization.",
    tech: ["Python", "Django", "React", "ML", "PostgreSQL"],
    github: "https://github.com/adii0018",
    live: null,
    featured: true,
    size: "medium",
    tag: "ML · AgriTech",
    color: "#c0adff",
  },
  {
    id: 3,
    title: "JanSetu AI",
    subtitle: "AI Governance Assistant",
    description:
      "Conversational AI assistant for rural citizens to access government schemes, file complaints, and get real-time updates in regional languages using NLP and LLMs.",
    tech: ["LangChain", "Hugging Face", "FastAPI", "NLP", "React"],
    github: "https://github.com/adii0018",
    live: null,
    featured: true,
    size: "medium",
    tag: "NLP · GovTech",
    color: "#b8deff",
  },
  {
    id: 4,
    title: "FFZone",
    subtitle: "Fantasy Football Platform",
    description:
      "Full-stack fantasy football platform with real-time match data, AI-based team suggestions, player performance analytics, and competitive leagues with live scoring.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "AI", "TypeScript"],
    github: "https://github.com/adii0018",
    live: null,
    featured: true,
    size: "small",
    tag: "Full-Stack",
    color: "#d9ff5c",
  },
];

export const experience = [
  {
    title: "AI/ML Engineer Intern",
    company: "Coming Soon",
    period: "2024 — Present",
    description:
      "Working on cutting-edge AI/ML projects, building intelligent systems and deploying production-ready machine learning models.",
    tech: ["Python", "TensorFlow", "FastAPI"],
    type: "work",
  },
  {
    title: "Full-Stack Developer",
    company: "Freelance",
    period: "2023 — Present",
    description:
      "Building scalable web applications and AI-integrated products for clients across various domains.",
    tech: ["React", "Next.js", "Django", "PostgreSQL"],
    type: "work",
  },
  {
    title: "Hackathon Winner",
    company: "Multiple Events",
    period: "2023 — 2024",
    description:
      "Won and placed top 3 in multiple national-level hackathons focused on AI/ML, govtech, and social impact solutions.",
    tech: ["AI", "ML", "Problem Solving"],
    type: "achievement",
  },
  {
    title: "B.Tech Computer Science",
    company: "University",
    period: "2022 — 2026",
    description:
      "Specializing in Artificial Intelligence and Machine Learning with focus on real-world application development.",
    tech: ["AI/ML", "DSA", "Systems"],
    type: "education",
  },
];

export const certifications = [
  {
    name: "Machine Learning Specialization",
    issuer: "Coursera / Stanford",
    year: "2024",
    icon: "🏆",
    color: "#d9ff5c",
  },
  {
    name: "Deep Learning Specialization",
    issuer: "Coursera / DeepLearning.AI",
    year: "2024",
    icon: "🧠",
    color: "#c0adff",
  },
  {
    name: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    year: "2023",
    icon: "☁️",
    color: "#b8deff",
  },
  {
    name: "Python for Data Science",
    issuer: "IBM / Coursera",
    year: "2023",
    icon: "📊",
    color: "#d9ff5c",
  },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];
