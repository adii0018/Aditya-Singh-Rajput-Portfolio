import type { CSSProperties } from "react";
import type { SimpleIcon } from "simple-icons";
import {
  siCplusplus,
  siDjango,
  siDocker,
  siGit,
  siGooglecloud,
  siJavascript,
  siLinux,
  siMongodb,
  siNumpy,
  siPandas,
  siPython,
  siPytorch,
  siReact,
  siScikitlearn,
  siTailwindcss,
  siTensorflow,
} from "simple-icons";

interface TechIconProps {
  name: string;
  size?: number;
  className?: string;
}

const BRAND_ICONS: Record<string, SimpleIcon> = {
  python: siPython,
  numpy: siNumpy,
  pandas: siPandas,
  tensorflow: siTensorflow,
  pytorch: siPytorch,
  "scikit-learn": siScikitlearn,
  javascript: siJavascript,
  django: siDjango,
  react: siReact,
  "tailwind css": siTailwindcss,
  mongodb: siMongodb,
  "google cloud": siGooglecloud,
  gcp: siGooglecloud,
  linux: siLinux,
  "c++": siCplusplus,
  cpp: siCplusplus,
  git: siGit,
  docker: siDocker,
};

const BRAND_COLORS: Record<string, string> = {
  numpy: "#4DABCF",
  pandas: "#FDCB00",
  django: "#44B78B",
};

export default function TechIcon({ name, size = 28, className = "" }: TechIconProps) {
  const norm = name.toLowerCase().trim();
  const brandIcon = BRAND_ICONS[norm];

  if (brandIcon) {
    const color = BRAND_COLORS[norm] || `#${brandIcon.hex}`;
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        role="img"
        aria-label={brandIcon.title}
        className={className}
        style={{ color } as CSSProperties}
      >
        <path d={brandIcon.path} />
      </svg>
    );
  }

  if (norm === "aws") {
    return (
      <svg width={size} height={size} viewBox="0 0 128 96" role="img" aria-label="Amazon Web Services" className={className}>
        <text x="64" y="61" fill="#FFFFFF" fontFamily="Arial, sans-serif" fontSize="58" fontWeight="700" letterSpacing="-2" textAnchor="middle">
          AWS
        </text>
        <path d="M22 71c27 19 60 19 86 0" fill="none" stroke="#FF9900" strokeWidth="7" strokeLinecap="round" />
        <path d="m100 67 12 1-6 10" fill="none" stroke="#FF9900" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (norm.includes("azure")) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" role="img" aria-label="Microsoft Azure" className={className}>
        <path fill="#0078D4" d="M44 12h31L39 104H12z" />
        <path fill="#50E6FF" d="M75 12 116 104H55l19-22h14L66 54z" />
        <path fill="#0078D4" d="M47 104 65 81h23l18 23z" />
      </svg>
    );
  }

  if (norm.includes("matplotlib")) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" role="img" aria-label="Matplotlib" className={className}>
        <circle cx="64" cy="64" r="55" fill="#11557C" />
        <path d="M64 64 105 38a49 49 0 0 1 12 31z" fill="#F3C623" />
        <path d="M64 64 44 12a56 56 0 0 1 49 5z" fill="#B7D333" />
        <path d="M64 64 14 42a55 55 0 0 1 30-30z" fill="#F57C00" />
        <path d="M64 64 13 82a54 54 0 0 1 1-40z" fill="#3C8DAD" />
        <path d="M64 64 49 117a55 55 0 0 1-36-35z" fill="#C7D9E5" />
        <circle cx="64" cy="64" r="11" fill="#FFFFFF" />
      </svg>
    );
  }

  if (norm.includes("seaborn")) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" role="img" aria-label="Seaborn" className={className}>
        <rect x="9" y="9" width="110" height="110" rx="28" fill="#1D3557" />
        <path d="M23 86c12 0 12-44 25-44s12 44 25 44 12-44 25-44 12 44 18 44" fill="none" stroke="#8FC7E8" strokeWidth="8" strokeLinecap="round" />
        <path d="M23 101h82" stroke="#FFFFFF" strokeOpacity=".55" strokeWidth="5" strokeLinecap="round" />
      </svg>
    );
  }

  if (norm.includes("pygame")) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" role="img" aria-label="Pygame" className={className}>
        <rect x="8" y="8" width="112" height="112" rx="28" fill="#2ECC71" />
        <path d="M38 42h52c12 0 20 9 20 21v10c0 13-10 23-23 23H41c-13 0-23-10-23-23V63c0-12 8-21 20-21z" fill="#202125" />
        <path d="M43 56v26M30 69h26" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />
        <circle cx="82" cy="62" r="5" fill="#F7DF1E" />
        <circle cx="96" cy="76" r="5" fill="#F7DF1E" />
      </svg>
    );
  }

  if (norm === "sql") {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" role="img" aria-label="SQL database" className={className}>
        <path d="M18 28v70c0 12 20.6 22 46 22s46-10 46-22V28" fill="#00758F" />
        <ellipse cx="64" cy="28" rx="46" ry="18" fill="#00A6A6" />
        <path d="M19 62c0 11 20 20 45 20s45-9 45-20" fill="none" stroke="#FFFFFF" strokeOpacity=".85" strokeWidth="5" />
        <text x="64" y="70" fill="#FFFFFF" fontFamily="Arial, sans-serif" fontSize="23" fontWeight="700" textAnchor="middle">SQL</text>
      </svg>
    );
  }

  return (
    <div
      role="img"
      aria-label={name}
      style={{ width: size, height: size }}
      className={`flex items-center justify-center rounded-lg bg-[#242426]/10 text-xs font-bold ${className}`}
    >
      {name.slice(0, 2).toUpperCase()}
    </div>
  );
}
