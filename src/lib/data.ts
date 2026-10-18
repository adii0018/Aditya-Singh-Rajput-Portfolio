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

export const projects = [
  {
    id: 1,
    title: "Alice Exam Proctor",
    subtitle: "AI-Powered Exam Proctoring",
    description:
      "AI-powered exam proctoring system using computer vision & NLP to detect cheating in real-time. Features face detection, eye-tracking, audio monitoring, and automated flagging with detailed reports.",
    tech: ["Python", "OpenCV", "NLP", "FastAPI", "React", "TensorFlow"],
    github: "https://github.com/adii0018/Alice-exam-proctor",
    live: null,
    featured: true,
    size: "large", // for bento grid
    tag: "Computer Vision",
    color: "#d9ff5c",
    image: "/alice-exam-proctor.jpg",
  },
  {
    id: 2,
    title: "Alice Mandi",
    subtitle: "AI Agricultural Marketplace",
    description:
      "AI-powered agricultural marketplace connecting farmers directly to buyers with ML-based price prediction, crop demand forecasting, and smart logistics optimization.",
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
    subtitle: "AI Governance Assistant",
    description:
      "Conversational AI assistant for rural citizens to access government schemes, file complaints, and get real-time updates in regional languages using NLP and LLMs.",
    tech: ["LangChain", "Hugging Face", "FastAPI", "NLP", "React"],
    github: "https://github.com/adii0018/JanSetu-AI",
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
    github: "https://github.com/adii0018/FFZONE",
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
    company: "AI Innovations Lab",
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
    icon: "stanford",
    color: "#d9ff5c",
    credentialUrl: "https://coursera.org/verify/specialization/stanford-ml",
  },
  {
    name: "Deep Learning Specialization",
    issuer: "Coursera / DeepLearning.AI",
    year: "2024",
    icon: "deeplearning",
    color: "#c0adff",
    credentialUrl: "https://coursera.org/verify/specialization/deeplearning-ai",
  },
  {
    name: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    year: "2023",
    icon: "aws",
    color: "#b8deff",
    credentialUrl: "https://aws.amazon.com/verification",
  },
  {
    name: "Python for Data Science",
    issuer: "IBM / Coursera",
    year: "2023",
    icon: "ibm",
    color: "#d9ff5c",
    credentialUrl: "https://coursera.org/verify/ibm-python-data-science",
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
