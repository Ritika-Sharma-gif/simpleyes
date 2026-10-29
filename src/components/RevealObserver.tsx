"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * One shared IntersectionObserver for all `[data-reveal]` elements.
 * Pure progressive enhancement: content is always visible, sharp and opaque.
 * Marks elements early so a subtle translation finishes as they enter view.
 * Re-scans on client-side navigation.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-revealed)"));
    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px 12% 0px", threshold: 0.01 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
