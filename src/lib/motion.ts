// Unified Motion System Constants (Batch D)
// No magic numbers in components

export const DURATION = {
  instant: 0.1, fast: 0.18, base: 0.28, slow: 0.38, cinematic: 0.45,
} as const;

export const EASE = {
  out: "power3.out",
  outExtreme: "power4.out",
  inOut: "power4.inOut",
  smooth: "power2.out",
  linear: "none",
  bounce: "back.out(1.7)",
} as const;

export const STAGGER = {
  tight: 0.03,
  base: 0.05,
  loose: 0.08,
} as const;

export const SCROLL_TRIGGER = {
  startStandard: "top 80%",
  startEarly: "top 88%",
  startScrub: "top top",
  anticipatePin: 1,
  invalidateOnRefresh: true,
} as const;

/** Scroll to a page target while honoring the visitor's motion preference. */
export function scrollToTarget(target: string | HTMLElement | null | undefined) {
  if (typeof window === "undefined" || !target) return;

  const element = typeof target === "string" ? document.getElementById(target) : target;
  if (!element) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  element.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
    block: "start",
  });
}
