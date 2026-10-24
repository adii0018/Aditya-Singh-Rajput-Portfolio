export interface PersonalInfo {
  name: string;
  nickname: string;
  role: string;
  badge: string;
  heroLine1: string;
  heroLine2: string;
  subtitle: string;
  email: string;
  github: string;
  linkedin: string;
  githubUsername: string;
  location: string;
}

export type SkillCategory = "AI / ML" | "Web & Backend" | "Cloud & DevOps" | "Core & Systems";

export interface Skill {
  name: string;
  category: SkillCategory;
  icon: string;
  level: "Intermediate" | "Advanced" | "Expert";
  desc: string;
}

export interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  github: string;
  live: string | null;
  featured: boolean;
  size: "small" | "medium" | "large";
  tag: string;
  color: string;
  image?: string;
  // Architecture/HUD metadata for distinctive project presentation
  metrics?: { label: string; value: string }[];
  highlight?: string;
}

export interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string;
  tech: string[];
  type: "work" | "achievement" | "education";
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  icon: string;
  color: string;
  credentialUrl: string;
}

export interface NavLink {
  label: string;
  href: string;
}
