"use client";

import { useEffect, useRef } from "react";

/**
 * Decorative hero atmosphere, without images, WebGL or animation libraries.
 * Only the background reacts to a fine pointer: copy, buttons and links stay
 * static, sharp, and accessible. Reduced-motion devices stay still.
 */
export function HeroAtmosphere() {
  const atmosphereRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const atmosphere = atmosphereRef.current;
    const hero = atmosphere?.closest<HTMLElement>("section");
    if (!atmosphere || !hero) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const reset = () => {
      cancelAnimationFrame(frame);
      atmosphere.style.setProperty("--hero-shift-x", "0px");
      atmosphere.style.setProperty("--hero-shift-y", "0px");
    };

    const move = (event: PointerEvent) => {
      if (!finePointer.matches || reducedMotion.matches) return;

      const rect = hero.getBoundingClientRect();
      const nx = Math.max(-1, Math.min(1, (event.clientX - rect.left - rect.width / 2) / (rect.width / 2)));
      const ny = Math.max(-1, Math.min(1, (event.clientY - rect.top - rect.height / 2) / (rect.height / 2)));
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        atmosphere.style.setProperty("--hero-shift-x", (nx * 13).toFixed(2) + "px");
        atmosphere.style.setProperty("--hero-shift-y", (ny * 11).toFixed(2) + "px");
      });
    };

    hero.addEventListener("pointermove", move, { passive: true });
    hero.addEventListener("pointerleave", reset);
    reducedMotion.addEventListener("change", reset);
    return () => {
      cancelAnimationFrame(frame);
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("pointerleave", reset);
      reducedMotion.removeEventListener("change", reset);
    };
  }, []);

  return (
    <div ref={atmosphereRef} aria-hidden="true" className="hero-atmosphere">
      <div className="hero-atmosphere__light" />
      <div className="hero-atmosphere__orbit hero-atmosphere__orbit--outer" />
      <div className="hero-atmosphere__orbit hero-atmosphere__orbit--inner" />
      <div className="hero-atmosphere__spark hero-atmosphere__spark--one" />
      <div className="hero-atmosphere__spark hero-atmosphere__spark--two" />
      <div className="hero-atmosphere__chip hero-atmosphere__chip--left">
        <span className="hero-atmosphere__chip-mark">01 / DOCUMENTS</span>
        <span className="hero-atmosphere__chip-text">Understand the details</span>
      </div>
      <div className="hero-atmosphere__chip hero-atmosphere__chip--right">
        <span className="hero-atmosphere__chip-mark">02 / GUIDANCE</span>
        <span className="hero-atmosphere__chip-text">Move forward clearly</span>
      </div>
    </div>
  );
}
