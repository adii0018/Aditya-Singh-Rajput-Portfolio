# Aditya Singh Rajput | AI/ML Engineer & Full-Stack Developer

> Building intelligent, scalable, and high-performance digital experiences with AI, machine learning, and modern web technologies.

<p align="center">
  <a href="https://adityasinghrajput.me">
    <img src="https://img.shields.io/badge/Portfolio-Visit%20Website-D9FF5C?style=for-the-badge&logo=googlechrome&logoColor=111110" alt="Visit Portfolio" />
  </a>
  <a href="https://github.com/adii0018">
    <img src="https://img.shields.io/badge/GitHub-Explore%20Projects-111110?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Profile" />
  </a>
  <a href="https://www.linkedin.com/in/adii001n/">
    <img src="https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn Profile" />
  </a>
</p>

---

## 👋 About Me

I'm **Aditya Singh Rajput**, a Computer Science Engineering student focused on Artificial Intelligence, Machine Learning, and Full-Stack Development.

I enjoy turning complex problems into practical, well-engineered products by combining intelligent systems, modern web technologies, and thoughtful user experiences.

My work focuses on building applications that are not only visually polished but also performant, secure, maintainable, and scalable.

**Areas of Interest**

* Artificial Intelligence and Machine Learning
* Full-Stack Web Development
* AI-Powered Applications and Intelligent Automation
* Software Engineering and System Design
* Web Performance, Security, and Technical SEO

🌐 **Portfolio:** [adityasinghrajput.me](https://adityasinghrajput.me)
💻 **GitHub:** [github.com/adii0018](https://github.com/adii0018)
🤝 **LinkedIn:** [linkedin.com/in/adii001n](https://www.linkedin.com/in/adii001n/)

---

## 🚀 About This Portfolio

This repository contains the source code for my personal engineering portfolio, designed to showcase my technical skills, projects, experience, and development journey.

The portfolio combines an editorial-inspired visual identity with carefully orchestrated animations, reusable components, and a performance-conscious architecture.

### Key Highlights

* **Modern Architecture:** Next.js App Router with React Server Components where appropriate.
* **Type Safety:** Strict TypeScript configuration and strongly typed data models.
* **Motion Design:** GSAP timelines, ScrollTrigger animations, and reusable motion utilities.
* **Performance:** Optimized assets, controlled animation lifecycles, and reduced unnecessary rendering.
* **Security:** HTTP security headers, input validation, and contact-form bot protection.
* **Technical SEO:** Canonical URLs, metadata, structured data, sitemaps, and crawler directives.
* **Maintainability:** Modular components, centralized configuration, and automated quality checks.
* **Responsive Experience:** A portfolio interface designed for different screen sizes.

---

## 🛠️ Tech Stack

| Category          | Technologies                               |
| ----------------- | ------------------------------------------ |
| Framework         | Next.js 16, React 19                       |
| Language          | TypeScript 5                               |
| Styling           | Tailwind CSS v4, CSS Variables             |
| Typography        | Geist, Geist Mono, Instrument Serif        |
| Animation         | GSAP 3, `@gsap/react`, ScrollTrigger       |
| Forms             | Formspree, custom validation               |
| Testing           | Node.js `node:test`, `node:assert`         |
| Quality Assurance | ESLint, TypeScript checks, automated tests |
| CI/CD             | GitHub Actions                             |
| Deployment        | Next.js-compatible hosting platforms       |

### Engineering Principles

* Strict TypeScript and explicit data models
* Reusable, composable UI components
* Centralized design tokens and animation constants
* Separation of content, configuration, and presentation
* Accessible interactions and responsive layouts
* Automated validation before production builds

---

## 🏗️ Project Architecture

The codebase follows a modular structure that separates application routing, UI components, reusable utilities, type definitions, and automated tests.

```text
Portfolio/
├── .github/
│   └── workflows/          # Automated CI quality checks
├── public/
│   ├── assets/             # Static images and other assets
│   ├── favicons/           # Site icons
│   └── llms.txt            # Structured portfolio information
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout and metadata
│   │   ├── page.tsx        # Main portfolio page
│   │   ├── globals.css     # Global styles and design tokens
│   │   ├── sitemap.ts      # Sitemap generation
│   │   ├── robots.ts       # Crawler directives
│   │   ├── opengraph-image.tsx
│   │   └── twitter-image.tsx
│   ├── components/
│   │   ├── layout/         # Navbar, footer, stacked sections
│   │   ├── sections/       # Hero, About, Skills, Projects, etc.
│   │   └── ui/             # Reusable UI components
│   ├── lib/
│   │   ├── motion.ts       # Animation constants
│   │   ├── site.ts         # Centralized site configuration
│   │   └── validation.ts   # Input validation utilities
│   └── types/
│       └── portfolio.ts    # Shared TypeScript definitions
├── tests/                  # Automated unit tests
├── next.config.ts          # Next.js configuration and headers
├── package.json
└── README.md
```

*Note: This structure documents the intended architecture. Individual paths may differ slightly depending on the current repository implementation.*

---

## ⚡ Animation & Motion Engineering

Motion is a core part of the portfolio's visual identity. GSAP and ScrollTrigger are used to create controlled transitions and scroll-driven interactions.

### Centralized Motion Configuration

Reusable animation settings are maintained in `src/lib/motion.ts`.

| Constant    | Duration |
| ----------- | -------: |
| `fast`      |     0.3s |
| `base`      |     0.6s |
| `slow`      |    0.95s |
| `cinematic` |     1.2s |

The animation system uses shared easing curves, including `power3.out`, `power4.out`, and smooth in-out transitions.

### Performance Considerations

* Scroll-driven animations are organized to reduce unnecessary React state updates.
* Off-screen animated components can pause when appropriate.
* Background videos use `preload="none"` where suitable.
* Animation lifecycles are managed to prevent unnecessary work.
* The hero introduction can be guarded with `sessionStorage` to avoid replaying on every navigation.
* Native scrolling is preferred over conflicting combinations of CSS smooth scrolling and JavaScript-driven animation.

The objective is to create a cinematic experience without sacrificing responsiveness or usability.

---

## 🎨 Design System — The Operative

The portfolio uses a design direction called **The Operative**, combining minimalist editorial typography, technical precision, and restrained visual accents.

### Color Palette

| Token            | Color     | Purpose                        |
| ---------------- | --------- | ------------------------------ |
| `--surface`      | `#F2F2F0` | Primary background             |
| `--surface-card` | `#FAFAF8` | Card surfaces                  |
| `--ink`          | `#111110` | Primary text                   |
| `--muted`        | `#78716C` | Secondary text                 |
| `--accent`       | `#D9FF5C` | Highlights and primary actions |
| `--surface-dark` | `#111110` | Dark contrast surfaces         |

### Visual Principles

* Minimal, typography-led layouts
* Generous whitespace and clear visual hierarchy
* Electric-lime accents used selectively
* Consistent spacing and reusable design tokens
* Subtle transitions instead of excessive visual effects
* Clear navigation between portfolio sections
* Responsive layouts that prioritize readability

The goal is a distinctive engineering portfolio rather than a generic developer template.

---

## 🔒 Security & Reliability

Security and maintainability are considered throughout the application.

### HTTP Security Headers

The Next.js configuration can provide security headers such as:

* `Content-Security-Policy`
* `X-Frame-Options: DENY`
* `X-Content-Type-Options: nosniff`
* `Referrer-Policy`

The exact policy should be tested against all production resources, embedded content, and third-party integrations.

### Contact Form Protection

The contact form includes validation and defensive measures intended to reduce invalid submissions and automated spam.

* Input validation and field-length limits
* Hidden honeypot field for basic bot detection
* Sanitization appropriate to the input context
* Environment-based configuration for public integration identifiers

**Important:** Client-side validation is not a substitute for server-side validation. Any security-sensitive checks should also be enforced by the receiving service.

### External Links & Secrets

* External links use `rel="noopener noreferrer"` where appropriate.
* Integration identifiers are configured through environment variables.
* Private API keys and server-side secrets must never be exposed through `NEXT_PUBLIC_` variables.
* Environment files containing secrets should remain excluded from version control.

---

## 🔍 Technical SEO & AI Discoverability

The portfolio is designed to make its public content easier for search engines and compatible AI crawlers to discover, understand, and associate with its author.

### 1. Centralized Website Metadata

`src/lib/site.ts` acts as the central source of truth for website identity and metadata.

It can contain:

* Author name and professional description
* Canonical website URL
* Social profile links
* Project information
* Search and social sharing metadata

Centralization helps keep metadata consistent across the application.

### 2. Structured Data

`src/components/JsonLd.tsx` generates Schema.org JSON-LD structured data.

The intended schema graph includes:

* `Person` — identifies the portfolio owner
* `WebSite` — describes the website
* `sameAs` — connects verified social profiles
* `knowsAbout` — describes relevant technical interests

Structured data should accurately represent visible, verifiable information and should be validated before deployment.

### 3. Search Engine Indexing

The portfolio includes dedicated Next.js routes for:

| Resource           | Purpose                                                     |
| ------------------ | ----------------------------------------------------------- |
| `/sitemap.xml`     | Helps search engines discover public pages                  |
| `/robots.txt`      | Communicates crawler access preferences                     |
| `/llms.txt`        | Provides a structured text overview for compatible AI tools |
| `/opengraph-image` | Generates a social sharing image                            |
| `/twitter-image`   | Generates a social sharing image                            |

Crawler directives communicate preferences but do not guarantee that a crawler will access or index the website.

### 4. Google Search Console

To configure Google site verification, add the verification token to `.env.local`:

```env
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_google_verification_token_here
```

The metadata implementation should output the verification tag only when a valid token is configured.

After deployment, verify the domain through Google Search Console and submit the sitemap.

### 5. Canonical URLs & Redirects

The canonical portfolio domain is configured as:

`https://www.adityasinghrajput.me`

The deployment should consistently redirect supported alternate hosts to the canonical domain and use the same canonical URL across metadata, structured data, and sitemap entries.

### 6. Project Discovery

To keep the portfolio's public project information consistent:

1. Update the relevant project entries in `SITE_PROJECTS` inside `src/lib/site.ts`.
2. Update `public/llms.txt` when its contents need to reflect the new projects.
3. Ensure project names, descriptions, technologies, and repository links are accurate.
4. Confirm that published projects are accessible and linked from the portfolio.
5. Validate the generated metadata and sitemap after deployment.

### 7. SEO Validation

Useful validation resources:

* [Google Search Console](https://search.google.com/search-console/about)
* [Google Rich Results Test](https://search.google.com/test/rich-results)
* [Schema.org Validator](https://validator.schema.org/)

**SEO objective:** Build a clear, crawlable, technically sound online presence for Aditya Singh Rajput and make the portfolio's projects and engineering work easier to discover.

*Technical SEO improves discoverability but cannot guarantee a particular Google ranking, search result, or AI-generated recommendation.*

---

## 🚀 Getting Started

Follow these steps to run the portfolio locally.

### Prerequisites

* Node.js 20 or a compatible version supported by the installed Next.js release
* npm 10 or later
* Git

### 1. Clone the Repository

```bash
git clone https://github.com/adii0018/Portfolio.git
cd Portfolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Add the required integration identifiers:

```env
NEXT_PUBLIC_FORMSPREE_ID=your_formspree_id_here
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_google_verification_token_here
```

Replace the placeholder values with your own values.

If a variable is not used by the application, do not add it unnecessarily. On Windows PowerShell, copy the file with:

```powershell
Copy-Item .env.example .env.local
```

### 4. Start the Development Server

```bash
npm run dev
```

Open the following address in your browser:

`http://localhost:3000`

---

## 📜 Available Scripts

| Command             | Description                       |
| ------------------- | --------------------------------- |
| `npm run dev`       | Starts the development server     |
| `npm run lint`      | Checks source files with ESLint   |
| `npm run typecheck` | Runs TypeScript verification      |
| `npm run test`      | Executes automated tests          |
| `npm run build`     | Builds the production application |
| `npm run start`     | Starts the production server      |

These commands assume the corresponding scripts are defined in `package.json`.

### Production Verification

Before deploying, run:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

This helps catch linting issues, type errors, failing tests, and production build problems before release.

---

## 🔄 Continuous Integration

The repository uses GitHub Actions to automate quality checks on code changes.

The intended pipeline validates:

1. Dependency installation
2. Linting
3. TypeScript correctness
4. Automated tests
5. Production build

This helps identify regressions early and maintain a reliable development workflow.

---

## 📈 Engineering Priorities

The portfolio is built around a few core principles:

* **Performance:** Deliver smooth interactions without unnecessary loading or rendering work.
* **Maintainability:** Keep components modular and configuration centralized.
* **Type Safety:** Use explicit interfaces and avoid untyped application data.
* **Security:** Validate user input, protect secrets, and configure appropriate security headers.
* **Discoverability:** Maintain accurate metadata, structured data, and crawlable public pages.
* **User Experience:** Balance distinctive motion design with accessibility and usability.

---

## 📄 License

This repository is private and intended to showcase the personal engineering work of **Aditya Singh Rajput**.

© 2026 Aditya Singh Rajput. All rights reserved.

---

<p align="center">
  <strong>Designed with intent. Engineered with precision.</strong>
  <br />
  <a href="https://adityasinghrajput.me">Visit My Portfolio ↗</a>
</p>
