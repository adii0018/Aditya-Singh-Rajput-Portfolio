"use client";

import React from "react";

interface TechIconProps {
  name: string;
  size?: number;
  className?: string;
}

export default function TechIcon({ name, size = 28, className = "" }: TechIconProps) {
  const norm = name.toLowerCase().trim();

  // Python — Official dual-snake vector
  if (norm === "python") {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
        <path
          fill="#3776AB"
          d="M63.3 3c-30.8 0-28.9 13.4-28.9 13.4l.1 13.9h29.4v4.2H20.7S3 32.5 3 63.7c0 31.2 15.5 30.1 15.5 30.1h9.2v-13s-.5-15.5 15.2-15.5h29.1s14.4.2 14.4-14.1V20.4S84.7 3 63.3 3zM49.6 12.3a4.7 4.7 0 1 1 0 9.4 4.7 4.7 0 0 1 0-9.4z"
        />
        <path
          fill="#FFD438"
          d="M64.7 125c30.8 0 28.9-13.4 28.9-13.4l-.1-13.9H64.1v-4.2h43.2s17.7 2 17.7-29.2c0-31.2-15.5-30.1-15.5-30.1h-9.2v13s.5 15.5-15.2 15.5H36.8s-14.4-.2-14.4 14.1v30.8s-1.4 17.4 22.3 17.4zm13.7-9.3a4.7 4.7 0 1 1 0-9.4 4.7 4.7 0 0 1 0 9.4z"
        />
      </svg>
    );
  }

  // NumPy — Official blue isometric cube
  if (norm.includes("numpy")) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
        <path fill="#4DABCF" d="m55.012 26.006-21.38-10.789L10.154 26.93l21.969 11.027Zzm9.808 4.951L87.241 42.28 63.982 53.955l-22-11.043Zm29.948-15.581 23.037 11.552L97.2 37.272 74.735 25.938ZM84.853 10.4 64.113 0 43.598 10.24 64.97 21.014ZM68.64 99.702V128l25.122-12.537-.023-28.31ZM93.727 77.27l-.028-28.012-25.06 12.458V89.74Zm30.158-5.246v28.41l-21.43 10.69-.017-28.279Zzm0-9.935V34.25l-21.47 10.673.016 28.068Z"/>
        <path fill="#4c75cf" d="m59.77 61.716-16.918-8.512V89.97s-20.7-44.033-22.612-47.99c-.246-.513-1.263-1.07-1.522-1.209-3.731-1.947-14.603-7.45-14.603-7.45v64.977l15.04 8.063V72.382s20.478 39.346 20.689 39.78c.214.429 2.257 4.57 4.459 6.028 2.92 1.939 15.458 9.477 15.458 9.477z"/>
      </svg>
    );
  }

  // Pandas — Official violet/yellow/magenta bar chart
  if (norm.includes("pandas")) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
        <path fill="#130754" d="M46.236 7.567h13.99v29.047h-13.99Zm0 59.668h13.99V96.28h-13.99Z"/>
        <path fill="#ffca00" d="M46.236 45.092h13.99v13.705h-13.99Z"/>
        <path fill="#130754" d="M23.763 31.446h13.989V128h-13.99ZM68.245 91.2h13.99v29.046h-13.99Zm0-59.72h13.99v29.047h-13.99Z"/>
        <path fill="#e70488" d="M68.245 69.011h13.99v13.705h-13.99Z"/>
        <path fill="#130754" d="M90.248 0h13.99v96.554h-13.99Z"/>
      </svg>
    );
  }

  // Matplotlib — Official colorful polar projection logo
  if (norm.includes("matplotlib")) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
        <path fill="#fff" d="M64 125c-33.7 0-61-27.3-61-61s27.3-61 61-61 61 27.3 61 61-27.3 61-61 61z"/>
        <circle cx="64" cy="64" r="61" fill="none" stroke="#11557c" strokeWidth="3"/>
        <path fill="#004cff" opacity="0.75" d="M64 64l48-16c-4-12-12-22-22-28L64 64z"/>
        <path fill="#ceff29" opacity="0.75" d="M64 64l14-46c-14-4-28-4-42 2L64 64z"/>
        <path fill="#ff6800" opacity="0.75" d="M64 64l-38-34c-12 10-18 24-18 40L64 64z"/>
        <path fill="#ffc400" opacity="0.75" d="M64 64l-48 16c4 14 14 26 28 32L64 64z"/>
        <path fill="#29ffce" opacity="0.75" d="M64 64l-14 46c14 4 28 3 40-4L64 64z"/>
        <path fill="#7dff7a" opacity="0.75" d="M64 64l40 34c10-12 14-26 12-42L64 64z"/>
        <circle cx="64" cy="64" r="14" fill="#2c2c2c"/>
        <path fill="#FFFFFF" d="M64 56a8 8 0 1 0 8 8 8 8 0 0 0-8-8z"/>
      </svg>
    );
  }

  // Seaborn — Official blue radar/distribution spiral
  if (norm.includes("seaborn")) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
        <path d="M64 64 L64.99 26.01 A38 38 0 0 1 82.13 30.60 Z" fill="#1d3557"/>
        <path d="M64 64 L92.21 17.96 A54 54 0 0 1 110.04 35.79 Z" fill="#2a4d8f"/>
        <path d="M64 64 L104.43 42.05 A46 46 0 0 1 109.98 62.80 Z" fill="#3a64a8"/>
        <path d="M64 64 L123.98 65.57 A60 60 0 0 1 116.73 92.63 Z" fill="#4c72b0"/>
        <path d="M64 64 L98.11 84.90 A40 40 0 0 1 84.90 98.11 Z" fill="#5f86bf"/>
        <path d="M64 64 L90.72 113.21 A56 56 0 0 1 65.47 119.98 Z" fill="#7a9fcf"/>
        <path d="M64 64 L63.11 97.99 A34 34 0 0 1 47.78 93.88 Z" fill="#1d3557"/>
        <path d="M64 64 L33.70 113.45 A58 58 0 0 1 14.55 94.30 Z" fill="#2a4d8f"/>
        <path d="M64 64 L21.82 86.90 A48 48 0 0 1 16.02 65.26 Z" fill="#3a64a8"/>
        <path d="M64 64 L2.02 62.38 A62 62 0 0 1 9.51 34.42 Z" fill="#4c72b0"/>
        <path d="M64 64 L28.19 42.06 A42 42 0 0 1 42.06 28.19 Z" fill="#5f86bf"/>
        <path d="M64 64 L39.19 18.30 A52 52 0 0 1 62.64 12.02 Z" fill="#7a9fcf"/>
        <circle cx="64" cy="64" r="14" fill="#f6f8fa"/>
      </svg>
    );
  }

  // Pygame — Official retro game controller
  if (norm.includes("pygame")) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
        <rect width="128" height="128" rx="28" fill="#1C1C1E"/>
        <path fill="#2ECC71" d="M38 46h52c6.6 0 12 5.4 12 12v18c0 14-11 26-25 26h-2c-3.5 0-6.8-1.5-9-4l-4-5-4 5c-2.2 2.5-5.5 4-9 4h-2c-14 0-25-12-25-26V58c0-6.6 5.4-12 12-12z"/>
        <rect x="36" y="58" width="6" height="16" rx="3" fill="#1C1C1E"/>
        <rect x="31" y="63" width="16" height="6" rx="3" fill="#1C1C1E"/>
        <circle cx="82" cy="62" r="4.5" fill="#E74C3C"/>
        <circle cx="92" cy="72" r="4.5" fill="#F1C40F"/>
        <circle cx="72" cy="72" r="4.5" fill="#3498DB"/>
        <circle cx="82" cy="82" r="4.5" fill="#2ECC71"/>
        <path d="M54 36c4-8 16-8 20 0" stroke="#2ECC71" strokeWidth="4" strokeLinecap="round" fill="none"/>
      </svg>
    );
  }

  // JavaScript — Official yellow JS tile
  if (norm === "javascript" || norm === "js") {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
        <rect width="128" height="128" rx="24" fill="#F7DF1E"/>
        <path fill="#000000" d="M68 84c0 13-8 18-19 18-9 0-15-4-18-9l10-6c2 3 4 5 8 5 4 0 7-2 7-7V48h12v36zm38-1c0 11-7 19-20 19-12 0-20-7-20-17l11-6c2 5 5 8 9 8 4 0 7-2 7-5 0-4-3-5-9-7-13-4-18-9-18-18 0-11 8-18 19-18 10 0 18 5 20 15l-11 5c-2-4-4-6-8-6-4 0-6 2-6 5 0 3 2 4 8 6 13 4 19 8 19 17z"/>
      </svg>
    );
  }

  // MongoDB — Official multi-shade leaf
  if (norm.includes("mongo")) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
        <path fill="#439934" d="M88.038 42.812c1.605 4.643 2.761 9.383 3.141 14.296.472 6.095.256 12.147-1.029 18.142-.035.165-.109.32-.164.48-.403.001-.814-.049-1.208.012-3.329.523-6.655 1.065-9.981 1.604-3.438.557-6.881 1.092-10.313 1.687-1.216.21-2.721-.041-3.212 1.641-.014.046-.154.054-.235.08l.166-10.051-.169-24.252 1.602-.275c2.62-.429 5.24-.864 7.862-1.281 3.129-.497 6.261-.98 9.392-1.465 1.381-.215 2.764-.412 4.148-.618z"/>
        <path fill="#45A538" d="M61.729 110.054c-1.69-1.453-3.439-2.842-5.059-4.37-8.717-8.222-15.093-17.899-18.233-29.566-.865-3.211-1.442-6.474-1.627-9.792-.13-2.322-.318-4.665-.154-6.975.437-6.144 1.325-12.229 3.127-18.147l.099-.138c.175.233.427.439.516.702 1.759 5.18 3.505 10.364 5.242 15.551 5.458 16.3 10.909 32.604 16.376 48.9.107.318.384.579.583.866l-.87 2.969z"/>
        <path fill="#46A037" d="M88.038 42.812c-1.384.206-2.768.403-4.149.616-3.131.485-6.263.968-9.392 1.465-2.622.417-5.242.852-7.862 1.281l-1.602.275-.012-1.045c-.053-.859-.144-1.717-.154-2.576-.069-5.478-.112-10.956-.18-16.434-.042-3.429-.105-6.857-.175-10.285-.043-2.13-.089-4.261-.185-6.388-.052-1.143-.236-2.28-.311-3.423-.042-.657.016-1.319.029-1.979.817 1.583 1.616 3.178 2.456 4.749 1.327 2.484 3.441 4.314 5.344 6.311 7.523 7.892 12.864 17.068 16.193 27.433z"/>
        <path fill="#409433" d="M65.036 80.753c.081-.026.222-.034.235-.08.491-1.682 1.996-1.431 3.212-1.641 3.432-.594 6.875-1.13 10.313-1.687 3.326-.539 6.652-1.081 9.981-1.604.394-.062.805-.011 1.208-.012-.622 2.22-1.112 4.488-1.901 6.647-.896 2.449-1.98 4.839-3.131 7.182a49.142 49.142 0 01-6.353 9.763c-1.919 2.308-4.058 4.441-6.202 6.548-1.185 1.165-2.582 2.114-3.882 3.161l-.337-.23-1.214-1.038-1.256-2.753a41.402 41.402 0 01-1.394-9.838l.023-.561.171-2.426c.057-.828.133-1.655.168-2.485.129-2.982.241-5.964.359-8.946z"/>
        <path fill="#B6B598" d="M62.476 112.621c.196-.246.475-.464.574-.744.731-2.05 1.417-4.115 2.143-6.166.093-.262.341-.469.518-.701l1.255 2.754c-.248.352-.59.669-.728 1.061l-2.404 7.059c-.099.283-.437.483-.663.722l-.695-3.985z"/>
      </svg>
    );
  }

  // SQL — Official relational cylinder / database icon
  if (norm === "sql") {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
        <ellipse cx="64" cy="28" rx="46" ry="18" fill="#00758F"/>
        <path d="M18 28v34c0 10 20.6 18 46 18s46-8 46-18V28" fill="none" stroke="#00758F" strokeWidth="8"/>
        <ellipse cx="64" cy="62" rx="46" ry="18" fill="#F29111" opacity="0.3"/>
        <path d="M18 62v34c0 10 20.6 18 46 18s46-8 46-18V62" fill="none" stroke="#F29111" strokeWidth="8"/>
        <ellipse cx="64" cy="96" rx="46" ry="18" fill="#F29111"/>
        <text x="64" y="69" fontFamily="monospace" fontSize="22" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">SQL</text>
      </svg>
    );
  }

  // Google Cloud — Official 4-color GCP cloud
  if (norm.includes("google") || norm.includes("gcp")) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
        <path fill="#ea4535" d="M80.6 40.3h.4l-.2-.2 14-14v-.3c-11.8-10.4-28.1-14-43.2-9.5C36.5 20.8 24.9 32.8 20.7 48c.2-.1.5-.2.8-.2 5.2-3.4 11.4-5.4 17.9-5.4 2.2 0 4.3.2 6.4.6.1-.1.2-.1.3-.1 9-9.9 24.2-11.1 34.6-2.6h-.1z"/>
        <path fill="#557ebf" d="M108.1 47.8c-2.3-8.5-7.1-16.2-13.8-22.1L80 39.9c6 4.9 9.5 12.3 9.3 20v2.5c16.9 0 16.9 25.2 0 25.2H63.9v20h-.1l.1.2h25.4c14.6.1 27.5-9.3 31.8-23.1 4.3-13.8-1-28.8-13-36.9z"/>
        <path fill="#36a852" d="M39 107.9h26.3V87.7H39c-1.9 0-3.7-.4-5.4-1.1l-15.2 14.6v.2c6 4.3 13.2 6.6 20.7 6.6z"/>
        <path fill="#f9bc15" d="M40.2 41.9c-14.9.1-28.1 9.3-32.9 22.8-4.8 13.6 0 28.5 11.8 37.3l15.6-14.9c-8.6-3.7-10.6-14.5-4-20.8 6.6-6.4 17.8-4.4 21.7 3.8L68 55.2C61.4 46.9 51.1 42 40.2 42.1z"/>
      </svg>
    );
  }

  // Microsoft Azure — Official blue cloud 'A'
  if (norm.includes("azure")) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
        <defs>
          <linearGradient id="azure-grad-a" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#114A8B"/>
            <stop offset="100%" stopColor="#0669BC"/>
          </linearGradient>
          <linearGradient id="azure-grad-c" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3CCBF4"/>
            <stop offset="100%" stopColor="#2892DF"/>
          </linearGradient>
        </defs>
        <path d="M42.8 4h37.4L41.4 119a6 6 0 0 1-5.6 4H6.6a6 6 0 0 1-5.6-7.8L37.2 8a6 6 0 0 1 5.6-4z" fill="url(#azure-grad-a)"/>
        <path d="M89.8 79H35.3a2.5 2.5 0 0 0-1.7 4.3l35 32.7a5.5 5.5 0 0 0 3.7 1.5h30.8z" fill="#0078D4"/>
        <path d="M90.6 8a6 6 0 0 0-5.6-4H43.2a6 6 0 0 1 5.6 4l36.2 107.2a6 6 0 0 1-5.6 7.8h41.7a6 6 0 0 0 5.6-7.8z" fill="url(#azure-grad-c)"/>
      </svg>
    );
  }

  // C++ — Official blue hexagon logo
  if (norm === "c++" || norm === "cpp") {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
        <path fill="#00599C" d="M64 8l48.5 28v56L64 120 15.5 92V36L64 8z"/>
        <path fill="#004482" d="M64 16l41.5 24v48L64 112 22.5 88V40L64 16z"/>
        <path fill="#FFFFFF" d="M60 48c-10 0-16 6-16 16s6 16 16 16c6 0 11-3 13-7l-8-4c-1 3-3 4-5 4-5 0-7-4-7-9s2-9 7-9c2 0 4 1 5 4l8-4c-2-4-7-7-13-7z"/>
        <path fill="#659AD2" d="M82 58h4v6h6v4h-6v6h-4v-6h-6v-4h6v-6zm16 0h4v6h6v4h-6v6h-4v-6h-6v-4h6v-6z"/>
      </svg>
    );
  }

  // TensorFlow — Official isometric TF block
  if (norm.includes("tensorflow")) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
        <path fill="#FF6F00" d="M64 3L14 32v29l21-12.2V112l29 16V3z" />
        <path fill="#FFA800" d="M64 3l50 29v29l-21-12.2V112L64 128V3z" />
        <path fill="#E65100" d="M35 48.8l29 16.8v62.4l-29-16z" />
      </svg>
    );
  }

  // PyTorch — Official flame logo
  if (norm.includes("pytorch")) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
        <path
          fill="#EE4C2C"
          d="M74.8 17.3a44.6 44.6 0 0 0-41 27.2l12.8 5.3a30.8 30.8 0 0 1 28.2-18.7c17.1 0 31 13.9 31 31s-13.9 31-31 31a30.8 30.8 0 0 1-28.1-18.4l-12.8 5.3a44.6 44.6 0 0 0 40.9 27c24.7 0 44.8-20.1 44.8-44.9s-20.1-44.8-44.8-44.8z"
        />
        <path
          fill="#EE4C2C"
          d="M51.8 45.4l-14-14a6.9 6.9 0 0 0-9.8 0l-1.4 1.4a6.9 6.9 0 0 0 0 9.8l14 14 11.2-11.2z"
        />
        <circle cx="89.5" cy="33.5" r="7.5" fill="#EE4C2C" />
      </svg>
    );
  }

  // scikit-learn — Official dual oval logo
  if (norm.includes("scikit")) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
        <ellipse cx="64" cy="64" rx="58" ry="46" fill="#F7931E" />
        <path
          fill="#3499CD"
          d="M64 18c-32 0-58 20.6-58 46s26 46 58 46c10.5 0 20.4-2.2 29-6.2-22-6.5-38-23.5-38-44s16-37.5 38-44c-8.6-4-18.5-6.2-29-6.2z"
        />
        <circle cx="88" cy="64" r="18" fill="#FFFFFF" />
        <path
          fill="#005C8A"
          d="M88 50c-7.7 0-14 6.3-14 14s6.3 14 14 14 14-6.3 14-14-6.3-14-14-14zm0 21c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7z"
        />
      </svg>
    );
  }

  // OpenCV — Official 3-ring Venn clover logo
  if (norm.includes("opencv")) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
        <circle cx="64" cy="40" r="28" fill="none" stroke="#ED1C24" strokeWidth="15" />
        <circle cx="38" cy="84" r="28" fill="none" stroke="#00A651" strokeWidth="15" />
        <circle cx="90" cy="84" r="28" fill="none" stroke="#2B388F" strokeWidth="15" />
      </svg>
    );
  }

  // NLP — Vector AI Language / Neural Waves
  if (norm === "nlp") {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
        <rect x="16" y="24" width="96" height="68" rx="20" fill="#6366F1" />
        <path d="M40 92L28 110V92H40Z" fill="#4F46E5" />
        <rect x="36" y="48" width="8" height="20" rx="4" fill="#FFFFFF" />
        <rect x="52" y="38" width="8" height="40" rx="4" fill="#FFFFFF" />
        <rect x="68" y="44" width="8" height="28" rx="4" fill="#FFFFFF" />
        <rect x="84" y="52" width="8" height="12" rx="4" fill="#FFFFFF" />
        <circle cx="98" cy="30" r="6" fill="#FBBF24" />
      </svg>
    );
  }

  // LangChain — Official green parrot & chain
  if (norm.includes("langchain")) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
        <rect width="128" height="128" rx="28" fill="#1C3C3C" />
        <path
          d="M42 34 C30 34 26 44 26 56 C26 72 38 88 56 94 C68 82 72 68 72 56 C72 44 64 34 52 34 Z"
          fill="#2ECC71"
        />
        <path d="M72 46 C76 38 88 34 98 42 C104 48 100 62 90 66 C78 70 72 58 72 46 Z" fill="#E67E22" />
        <circle cx="48" cy="48" r="6" fill="#FFFFFF" />
        <circle cx="50" cy="48" r="3" fill="#1C3C3C" />
        <path
          d="M82 82 C74 74 74 62 82 54 C90 46 102 46 110 54 C118 62 118 74 110 82 C102 90 90 90 82 82 Z"
          fill="none"
          stroke="#00A884"
          strokeWidth="6"
        />
      </svg>
    );
  }

  // Hugging Face — Official brand mascot
  if (norm.includes("hugging")) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
        <circle cx="64" cy="64" r="54" fill="#FFD21E" />
        <ellipse cx="44" cy="50" rx="8" ry="11" fill="#000000" />
        <ellipse cx="84" cy="50" rx="8" ry="11" fill="#000000" />
        <circle cx="46" cy="48" r="3.5" fill="#FFFFFF" />
        <circle cx="86" cy="48" r="3.5" fill="#FFFFFF" />
        <circle cx="34" cy="66" r="8" fill="#FF8A00" opacity="0.4" />
        <circle cx="94" cy="66" r="8" fill="#FF8A00" opacity="0.4" />
        <path
          d="M44 72 C50 86 78 86 84 72"
          fill="none"
          stroke="#000000"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M18 78 C28 72 36 82 32 94 C26 102 14 98 12 88 C10 80 14 78 18 78 Z"
          fill="#FFB000"
        />
        <path
          d="M110 78 C100 72 92 82 96 94 C102 102 114 98 116 88 C118 80 114 78 110 78 Z"
          fill="#FFB000"
        />
      </svg>
    );
  }

  // React — Official atomic orbital logo
  if (norm === "react") {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
        <ellipse
          cx="64"
          cy="64"
          rx="52"
          ry="20"
          fill="none"
          stroke="#61DAFB"
          strokeWidth="6.5"
        />
        <ellipse
          cx="64"
          cy="64"
          rx="52"
          ry="20"
          fill="none"
          stroke="#61DAFB"
          strokeWidth="6.5"
          transform="rotate(60 64 64)"
        />
        <ellipse
          cx="64"
          cy="64"
          rx="52"
          ry="20"
          fill="none"
          stroke="#61DAFB"
          strokeWidth="6.5"
          transform="rotate(120 64 64)"
        />
        <circle cx="64" cy="64" r="10" fill="#61DAFB" />
      </svg>
    );
  }

  // Next.js — Official black badge
  if (norm.includes("next")) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
        <circle cx="64" cy="64" r="60" fill="#000000" />
        <path
          d="M87.5 94.5L46.2 41.5H38v45h7.6V52.8l38.2 49c1.3-.9 2.5-1.8 3.7-2.8z"
          fill="#FFFFFF"
        />
        <rect x="82" y="41.5" width="7.6" height="28" fill="#FFFFFF" />
      </svg>
    );
  }

  // TypeScript — Official blue TS square
  if (norm.includes("typescript")) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
        <rect width="128" height="128" rx="24" fill="#3178C6" />
        <path
          fill="#FFFFFF"
          d="M34 50h32v8H53v46h-9V58H34v-8zm35 34c2.5 5 7.5 8 13.5 8 6 0 9.5-3 9.5-7 0-4.5-4-6.5-10.5-9-9.5-3.5-15.5-8-15.5-16.5 0-9 7.5-16 18-16 8 0 14 3.5 17.5 9.5l-6.5 5c-2.5-4-5.5-6-11-6-5.5 0-8.5 3-8.5 6.5 0 4 3 5.5 9.5 8 10.5 4 16.5 8 16.5 17.5 0 9.5-8 17-19 17-9.5 0-16.5-4.5-20.5-11.5l7-5z"
        />
      </svg>
    );
  }

  // Tailwind CSS — Official cyan wave
  if (norm.includes("tailwind")) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
        <path
          fill="#06B6D4"
          d="M32 48c5.3-21.3 18.7-29.3 40-24 12.3 3.1 21.1 12 30.9 21.9C118.6 61.9 130.4 72 152 72c-5.3 21.3-18.7 29.3-40 24-12.3-3.1-21.1-12-30.9-21.9C65.4 58.1 53.6 48 32 48zm-32 48c5.3-21.3 18.7-29.3 40-24 12.3 3.1 21.1 12 30.9 21.9C86.6 109.9 98.4 120 120 120c-5.3 21.3-18.7 29.3-40 24-12.3-3.1-21.1-12-30.9-21.9C33.4 106.1 21.6 96 0 96z"
          transform="scale(0.85) translate(4, -12)"
        />
      </svg>
    );
  }

  // FastAPI — Official teal lightning
  if (norm.includes("fastapi")) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
        <circle cx="64" cy="64" r="60" fill="#009688" />
        <path fill="#FFFFFF" d="M68 20L34 72h24l-6 36 42-56H68l10-32z" />
      </svg>
    );
  }

  // Django — Official green brand block
  if (norm.includes("django")) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
        <rect width="128" height="128" rx="24" fill="#092E20" />
        <path
          fill="#44B78B"
          d="M62 30h14v44c0 14-8 22-22 22-5 0-9-1-12-2l3-12c2 1 5 2 8 2 7 0 9-4 9-11V30zm-24 24h14v22c0 8-3 12-8 12-3 0-5-1-6-2l-2 11c3 2 8 3 13 3 13 0 21-8 21-22V54H38v0z"
        />
        <circle cx="70" cy="98" r="5" fill="#44B78B" />
      </svg>
    );
  }

  // Node.js — Official green hexagon
  if (norm.includes("node")) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
        <path fill="#339933" d="M64 8l52 30v60L64 128 12 98V38L64 8z" />
        <path
          fill="#FFFFFF"
          d="M64 36c-15.5 0-20 8.5-20 16 0 13 14 15 22 17 6.5 1.5 9 3.5 9 7 0 4-3.5 7-9 7-7 0-10-3-15-7l-5 8c6 5 12 7.5 20 7.5 14 0 21-8 21-17 0-13-14-16-22-17.5-6.5-1.5-9-3.5-9-6.5 0-4 3.5-6.5 8.5-6.5 6 0 9.5 2.5 13.5 6l5-8c-5.5-4.5-11-6.5-19-6.5z"
        />
      </svg>
    );
  }

  // PostgreSQL — Official blue elephant head
  if (norm.includes("postgres")) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
        <path
          fill="#336791"
          d="M64 8C33.1 8 8 33.1 8 64c0 24.3 15.5 45 37.1 52.6 1.4-4.8 2.2-12.7 2.2-16.7 0-7.2-2.1-13.4-6.4-18.4-5.2-6.1-11.9-9.5-11.9-18.5 0-10.5 8.5-19 19-19 6.2 0 11.8 3 15.3 7.6 3.5-4.6 9.1-7.6 15.3-7.6 10.5 0 19 8.5 19 19 0 9-6.7 12.4-11.9 18.5-4.3 5-6.4 11.2-6.4 18.4 0 4 .8 11.9 2.2 16.7C104.5 109 120 88.3 120 64c0-30.9-25.1-56-56-56z"
        />
        <path
          fill="#FFFFFF"
          d="M50 56c0-3.3 2.7-6 6-6s6 2.7 6 6-2.7 6-6 6-6-2.7-6-6zm22 0c0-3.3 2.7-6 6-6s6 2.7 6 6-2.7 6-6 6-6-2.7-6-6z"
        />
        <circle cx="56" cy="56" r="3" fill="#336791" />
        <circle cx="78" cy="56" r="3" fill="#336791" />
        <path d="M64 70v26M58 84h12" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  }

  // Docker — Official blue cargo whale
  if (norm.includes("docker")) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
        <path
          fill="#2496ED"
          d="M124.6 57.8c-2.4-1.7-8-1.5-12.2.3-.9-7.4-6.4-13.2-14.8-13.2-1.3 0-2.6.2-3.8.5-4.5-9.3-13.8-15.7-24.8-15.7h-3v14.4h-9.8v-9.6H46.4v9.6h-9.8V34H26.8v9.8H17v9.8H7.2V63H2v10.5c0 19.3 15.7 35 35 35 25.5 0 46.8-16 57.6-38.4 10.6.5 22.8-5.3 27-12.3z"
        />
        <g fill="#FFFFFF">
          <rect x="29" y="36" width="7" height="6.5" rx="1" />
          <rect x="39" y="36" width="7" height="6.5" rx="1" />
          <rect x="49" y="36" width="7" height="6.5" rx="1" />
          <rect x="39" y="26" width="7" height="6.5" rx="1" />
          <rect x="49" y="26" width="7" height="6.5" rx="1" />
          <rect x="59" y="26" width="7" height="6.5" rx="1" />
          <rect x="59" y="36" width="7" height="6.5" rx="1" />
          <rect x="69" y="36" width="7" height="6.5" rx="1" />
          <rect x="69" y="26" width="7" height="6.5" rx="1" />
          <circle cx="28" cy="80" r="3" fill="#FFFFFF" />
        </g>
      </svg>
    );
  }

  // Git — Official orange branching diamond
  if (norm === "git") {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
        <rect
          x="18"
          y="18"
          width="92"
          height="92"
          rx="18"
          fill="#F05032"
          transform="rotate(45 64 64)"
        />
        <g stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M42 64h22l20 20" />
          <path d="M64 42v44" />
        </g>
        <circle cx="42" cy="64" r="8" fill="#FFFFFF" />
        <circle cx="64" cy="42" r="8" fill="#FFFFFF" />
        <circle cx="84" cy="84" r="8" fill="#FFFFFF" />
        <circle cx="64" cy="86" r="8" fill="#FFFFFF" />
      </svg>
    );
  }

  // AWS — Official Amazon Web Services smile
  if (norm.includes("aws")) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
        <path
          fill="#232F3E"
          d="M44 48l-8 24h-7l-8-24h7l5 16 5-16h7zm20 0l-9 24h-7l-5-14-5 14h-7l-9-24h7l5 15 5-15h7l5 15 5-15h7zm30 18c0 4-3 6-9 6-4 0-8-1-11-3l2-5c3 2 6 3 9 3 3 0 5-1 5-3 0-2-1-3-5-4l-4-1c-6-2-8-5-8-9 0-5 4-8 10-8 4 0 7 1 10 3l-2 5c-3-1-5-2-8-2-4 0-5 1-5 3 0 2 1 3 5 4l4 1c6 2 9 5 9 10z"
          transform="translate(14, -6)"
        />
        <path
          d="M26 84 C50 100 80 100 104 84"
          fill="none"
          stroke="#FF9900"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path d="M102 80 L110 86 L98 94 Z" fill="#FF9900" />
      </svg>
    );
  }

  // Linux — Official Tux penguin vector
  if (norm.includes("linux")) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
        <ellipse cx="64" cy="74" rx="40" ry="46" fill="#000000" />
        <ellipse cx="64" cy="82" rx="26" ry="32" fill="#FFFFFF" />
        <ellipse cx="64" cy="40" rx="26" ry="28" fill="#000000" />
        <ellipse cx="54" cy="34" rx="7" ry="10" fill="#FFFFFF" />
        <ellipse cx="74" cy="34" rx="7" ry="10" fill="#FFFFFF" />
        <circle cx="56" cy="34" r="4" fill="#000000" />
        <circle cx="72" cy="34" r="4" fill="#000000" />
        <path d="M52 44 Q64 56 76 44 Q64 48 52 44 Z" fill="#FFA500" stroke="#E67E22" strokeWidth="2" />
        <ellipse cx="44" cy="118" rx="16" ry="7" fill="#FFA500" />
        <ellipse cx="84" cy="118" rx="16" ry="7" fill="#FFA500" />
      </svg>
    );
  }

  // Fallback
  return (
    <div
      style={{ width: size, height: size }}
      className={`rounded-lg bg-[#242426]/10 flex items-center justify-center font-bold text-xs ${className}`}
    >
      {name.slice(0, 2).toUpperCase()}
    </div>
  );
}
