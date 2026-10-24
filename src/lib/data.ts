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

// Portfolio Data — All content in one place

export const personal: PersonalInfo = {
  name: NAME,
  nickname: NICKNAME,
  role: ROLE,
  badge: "AI/ML ENGINEER · FULL-STACK DEVELOPER · INNOVATOR",
  heroLine1: "AI Engineer.",
  heroLine2: "Building systems that see, understand, and decide.",
  subtitle:
    "Specializing in computer vision, NLP, and scalable architectures. 4 shipped products, zero buzzwords.",
  email: "singhrajputaditya982@gmail.com",
  github: SOCIAL_LINKS.github,
  linkedin: SOCIAL_LINKS.linkedin,
  githubUsername: "adii0018",
  location: "India",
};

export const skills: Skill[] = [
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

export const skillCategories: SkillCategory[] = ["AI / ML", "Web & Backend", "Cloud & DevOps", "Core & Systems"];

export const projects: Project[] = [
  {
    id: 1,
    title: "Alice Exam Proctor",
    subtitle: "AI-Powered Exam Proctoring",
    description:
      "Automated exam integrity monitoring detecting gaze deviation, multiple faces, and acoustic anomalies in real-time without human supervision.",
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
    subtitle: "AI Governance Assistant",
    description:
      "Conversational welfare scheme assistant processing 12 regional dialects via retrieval-augmented LLM architecture and speech-to-text models.",
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
      "High-concurrency fantasy sports arena featuring live matchday data feeds, predictive AI lineup suggestions, and competitive leagues.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "AI", "TypeScript"],
    github: "https://github.com/adii0018/FFZONE",
    live: null,
    featured: true,
    size: "small",
    tag: "Full-Stack",
    color: "#d9ff5c",
  },
];

export const experience: ExperienceItem[] = [
  {
    title: "AI/ML Engineer Intern",
    company: "AI Innovations Lab (TODO: update company/lab name)",
    period: "2024 — Present",
    description:
      "Developing computer vision models and deploying low-latency machine learning inference endpoints for client applications.",
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
    company: "National Hackathons (TODO: specify event names)",
    period: "2023 — 2024",
    description:
      "Placed top 3 across multiple national-level competitions building AI-driven govtech and social impact prototypes.",
    tech: ["AI", "ML", "Problem Solving"],
    type: "achievement",
  },
  {
    title: "B.Tech Computer Science",
    company: "University (TODO: specify University Name)",
    period: "2022 — 2026",
    description:
      "Specializing in Artificial Intelligence and Machine Learning with coursework in Algorithms, Data Structures, and Systems.",
    tech: ["AI/ML", "DSA", "Systems"],
    type: "education",
  },
];

export const certifications: Certification[] = [
  {
    name: "Machine Learning Specialization",
    issuer: "Coursera / Stanford",
    year: "2024",
    icon: "stanford",
    color: "#d9ff5c",
    credentialUrl: "https://www.coursera.org/specializations/machine-learning-introduction", // TODO: add your individual verification URL
  },
  {
    name: "Deep Learning Specialization",
    issuer: "Coursera / DeepLearning.AI",
    year: "2024",
    icon: "deeplearning",
    color: "#c0adff",
    credentialUrl: "https://www.coursera.org/specializations/deep-learning", // TODO: add your individual verification URL
  },
  {
    name: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    year: "2023",
    icon: "aws",
    color: "#b8deff",
    credentialUrl: "https://aws.amazon.com/certification/certified-cloud-practitioner/", // TODO: add your individual verification URL
  },
  {
    name: "Python for Data Science",
    issuer: "IBM / Coursera",
    year: "2023",
    icon: "ibm",
    color: "#d9ff5c",
    credentialUrl: "https://www.coursera.org/professional-certificates/ibm-data-science", // TODO: add your individual verification URL
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
