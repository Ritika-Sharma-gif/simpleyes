"use client";

import { useEffect, useRef } from "react";

/**
 * One rAF-driven interaction controller for cursor presence, spotlight cards
 * and soft hero parallax. Always preserves the native cursor and DOM semantics.
 * Completely inactive on touch and when the visitor requests reduced motion.
 */
export function ExperienceMotion() {
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const cursor = cursorRef.current;
    const scene = document.getElementById("simplyes-hero-scene");
    if (!cursor) return;
    let frame = 0;
    let last: PointerEvent | null = null;
    let highlighted: HTMLElement | null = null;

    const clear = () => {
      cancelAnimationFrame(frame);
      cursor.dataset.visible = "false";
      cursor.dataset.active = "false";
      if (highlighted) {
        highlighted.style.removeProperty("--spot-x");
        highlighted.style.removeProperty("--spot-y");
        highlighted = null;
      }
      scene?.style.setProperty("--scene-x", "0px");
      scene?.style.setProperty("--scene-y", "0px");
    };

    const paint = () => {
      frame = 0;
      const e = last;
      if (!e || !fine.matches || reduced.matches) return;

      cursor.dataset.visible = "true";
      cursor.style.transform = "translate3d(" + e.clientX + "px, " + e.clientY + "px, 0) translate(-50%, -50%)";
      const node = e.target instanceof Element ? e.target : null;
      const actionable = node?.closest("a, button, summary");
      cursor.dataset.active = actionable ? "true" : "false";

      const spotlight = node?.closest<HTMLElement>("[data-spotlight]") ?? null;
      if (highlighted && highlighted !== spotlight) {
        highlighted.style.removeProperty("--spot-x");
        highlighted.style.removeProperty("--spot-y");
      }
      highlighted = spotlight;
      if (spotlight) {
        const bounds = spotlight.getBoundingClientRect();
        spotlight.style.setProperty("--spot-x", e.clientX - bounds.left + "px");
        spotlight.style.setProperty("--spot-y", e.clientY - bounds.top + "px");
      }

      if (scene) {
        const bounds = scene.getBoundingClientRect();
        const isNear = e.clientX >= bounds.left && e.clientX <= bounds.right && e.clientY >= bounds.top && e.clientY <= bounds.bottom;
        if (isNear) {
          const x = (e.clientX - bounds.left - bounds.width / 2) / (bounds.width / 2);
          const y = (e.clientY - bounds.top - bounds.height / 2) / (bounds.height / 2);
          scene.style.setProperty("--scene-x", (x * 13).toFixed(1) + "px");
          scene.style.setProperty("--scene-y", (y * 10).toFixed(1) + "px");
        } else {
          scene.style.setProperty("--scene-x", "0px");
          scene.style.setProperty("--scene-y", "0px");
        }
      }
    };

    const onMove = (event: PointerEvent) => {
      if (!fine.matches || reduced.matches) return;
      last = event;
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const onPreferenceChange = () => clear();
    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", clear);
    window.addEventListener("blur", clear);
    fine.addEventListener("change", onPreferenceChange);
    reduced.addEventListener("change", onPreferenceChange);

    return () => {
      clear();
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", clear);
      window.removeEventListener("blur", clear);
      fine.removeEventListener("change", onPreferenceChange);
      reduced.removeEventListener("change", onPreferenceChange);
    };
  }, []);

  return <span className="sy-cursor" aria-hidden="true" ref={cursorRef} data-visible="false" data-active="false" />;
}
