// Central Site Configuration & SEO Metadata Source of Truth
// All canonical metadata, URLs, social links, and structured data reference this file.

export const SITE_URL = "https://www.adityasinghrajput.me" as const;

export const NAME = "Aditya Singh Rajput" as const;
export const NICKNAME = "Adii" as const;
export const ROLE = "AI/ML Engineer and Full-Stack Developer" as const;

// Under 160 characters, plain, specific, zero buzzwords
export const DESCRIPTION =
  "AI/ML engineer and full-stack developer specializing in computer vision, NLP, and scalable architectures. 4 shipped products, based in India." as const;

export const SOCIAL_LINKS = {
  github: "https://github.com/adii0018",
  linkedin: "https://www.linkedin.com/in/adii001n/",
  instagram: "https://www.instagram.com/http._.adiix/",
} as const;

export interface SiteProject {
  title: string;
  description: string;
  github: string;
  tag: string;
}

export const SITE_PROJECTS: readonly SiteProject[] = [
  {
    title: "Alice Exam Proctor",
    description:
      "Automated exam integrity monitoring detecting gaze deviation, multiple faces, and acoustic anomalies in real-time without human supervision.",
    github: "https://github.com/adii0018/Alice-exam-proctor",
    tag: "Computer Vision",
  },
  {
    title: "Alice Mandi",
    description:
      "Direct farmer-to-buyer marketplace featuring ML price forecasting on regional mandi data and smart harvest logistics optimization.",
    github: "https://github.com/adii0018/Alice-mandi",
    tag: "ML · AgriTech",
  },
  {
    title: "JanSetu AI",
    description:
      "Conversational welfare scheme assistant processing 12 regional dialects via retrieval-augmented LLM architecture and speech-to-text models.",
    github: "https://github.com/adii0018/JanSetu-AI",
    tag: "NLP · GovTech",
  },
  {
    title: "FFZone Arena",
    description:
      "High-concurrency fantasy sports arena featuring live matchday data feeds, predictive AI lineup suggestions, and competitive leagues.",
    github: "https://github.com/adii0018/FFZONE",
    tag: "Full-Stack",
  },
] as const;

// Core technologies explicitly showcased across projects on the site (used for knowsAbout in JSON-LD)
export const SITE_TECHNOLOGIES: readonly string[] = [
  "Artificial Intelligence",
  "Machine Learning",
  "Computer Vision",
  "Natural Language Processing",
  "Large Language Models",
  "Python",
  "PyTorch",
  "TensorFlow",
  "OpenCV",
  "FastAPI",
  "Django",
  "React",
  "Next.js",
  "TypeScript",
  "PostgreSQL",
  "Docker",
] as const;
