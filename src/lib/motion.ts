// Unified Motion System Constants (Batch D)
// No magic numbers in components

export const DURATION = {
  instant: 0.15,
  fast: 0.3,
  base: 0.6,
  slow: 0.95,
  cinematic: 1.2,
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
