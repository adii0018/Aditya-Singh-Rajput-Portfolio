"use client";

import { useEffect, type RefObject } from "react";

export function usePauseOffscreenAnimation<T extends HTMLElement>(
  elementRef: RefObject<T | null>
) {
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    if (!("IntersectionObserver" in window)) {
      element.dataset.motionPaused = "false";
      return;
    }

    element.dataset.motionPaused = "true";
    const observer = new IntersectionObserver(
      ([entry]) => {
        element.dataset.motionPaused = String(!entry?.isIntersecting);
      },
      { threshold: 0.01, rootMargin: "24px" }
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      delete element.dataset.motionPaused;
    };
  }, [elementRef]);
}
