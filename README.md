# Aditya Singh Rajput — Engineering Portfolio

> Production portfolio for Aditya Singh Rajput — AI/ML Engineer and Full-Stack Developer. Designed with high craft, fast load, zero layout shift, and clean maintainable code.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: Next.js 16 (App Router) + React 19
- **Language**: Strict TypeScript 5 (zero `any`, fully typed models)
- **Styling**: Tailwind CSS v4 + Design Tokens in CSS Variables
- **Typography**: `Geist` (primary sans), `Geist_Mono` (tech labels), `Instrument_Serif` (editorial signature) loaded via `next/font/google`
- **Motion & Scroll**: GSAP 3 + `@gsap/react` + `ScrollTrigger` with `gsap.ticker.lagSmoothing(0)`
- **Testing**: Node.js built-in native test runner (`node:test`) + assertions (`node:assert`)
- **CI/CD**: GitHub Actions pipeline checking lint, typecheck, tests, and build on every push

---

## 📁 Folder Structure

```
├── .github/workflows/    # CI automation (lint, typecheck, test, build)
├── public/               # Static assets (images, profile photo, favicons)
├── src/
│   ├── app/              # Next.js App Router (layout, page, metadata, globals.css)
│   ├── components/
│   │   ├── layout/       # Global layout components (Navbar, Footer, StackedSections)
│   │   ├── sections/     # Core content sections (Hero, About, Skills, Projects, Experience, Certifications, Contact)
│   │   └── ui/           # Reusable atomic UI components (ProjectCard, Badge, CommandPalette, Loaders)
│   ├── lib/              # Core libraries (motion constants, GSAP registration, data, validation)
│   └── types/            # Strict TypeScript interface definitions (portfolio.ts)
├── tests/                # Automated unit tests for validation & sanitization
└── next.config.ts        # Next.js config with Content Security Policy & HTTP security headers
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js >= 20.x
- npm >= 10.x

### 2. Installation
```bash
git clone https://github.com/adii0018/Portfolio.git
cd Portfolio
npm install
```

### 3. Environment Variables
Copy the example environment configuration:
```bash
cp .env.example .env.local
```
Add your Formspree ID:
```env
NEXT_PUBLIC_FORMSPREE_ID=your_formspree_id_here
```

### 4. Available Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Starts local Next.js development server at `http://localhost:3000` |
| `npm run lint` | Runs ESLint across all source files |
| `npm run typecheck` | Strict TypeScript verification (`tsc --noEmit`) |
| `npm run test` | Executes unit tests via native Node test runner |
| `npm run build` | Compiles optimized production bundle |
| `npm run start` | Serves compiled production build |

---

## 🎨 Design System — "The Operative"

The UI follows **Direction B: "The Operative"**, inspired by the precision design ethos of Linear and Raycast:
- **Palette**:
  - `--surface`: `#F2F2F0` (warm linen background)
  - `--surface-card`: `#FAFAF8` (crisp paper card)
  - `--ink`: `#111110` (obsidian deep contrast text)
  - `--muted`: `#78716C` (stone secondary text)
  - `--accent`: `#D9FF5C` (electric lime, applied with strict restraint on active pills and primary actions)
  - `--surface-dark`: `#111110` (deep contrast cards)
- **Wayfinding**: Clean `/ about`, `/ projects`, `/ tech-stack` tags replacing generic all-caps badges.
- **Micro-elevation**: Smooth 250ms cubic-bezier card hover states without muddy drop shadows.

---

## ⚡ Animation & Motion Architecture

- **Centralized Constants (`src/lib/motion.ts`)**:
  - `DURATION`: `fast` (0.3s), `base` (0.6s), `slow` (0.95s), `cinematic` (1.2s)
  - `EASE`: `out` (power3.out), `outExtreme` (power4.out), `inOut`, `smooth`
- **Zero Scroll Lag**:
  - `gsap.ticker.lagSmoothing(0)` prevents artificial slowdown on lag spikes.
  - Deduped scroll callbacks prevent continuous `setState` re-renders.
  - Removed CSS `scroll-behavior: smooth` to eliminate animation stutter.
- **Resource Conservation**:
  - Marquee and animated HUD components use `IntersectionObserver` to automatically pause when scrolled offscreen.
  - Background videos use `preload="none"` to preserve initial load bandwidth.
- **Hero Session Guard**:
  - Hero intro plays once per session (`sessionStorage`), providing instant access on return visits.

---

## 🔒 Security Practices

- **HTTP Security Headers**: Implemented in `next.config.ts` including strict `Content-Security-Policy`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and `Referrer-Policy`.
- **Input Sanitization & Bot Defense**: Contact form verifies inputs via `src/lib/validation.ts`, strips script tags, enforces field length caps, and includes a hidden honeypot trap.
- **Safe External Links**: All external hyperlinks utilize `rel="noopener noreferrer"`.
- **Zero Exposed Secrets**: Sensitive IDs isolated in environment variables.

---

## 📄 License
Private repository — © Aditya Singh Rajput. All rights reserved.
