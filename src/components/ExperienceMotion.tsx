"use client";

import { useEffect, useRef } from "react";

/**
 * One shared, rAF-throttled motion controller for hover-only enhancements.
 * The native pointer, click targets, focus order and page scroll are unchanged.
 * Nothing runs for touch/coarse pointers or reduced-motion preferences.
 */
export function ExperienceMotion() {
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const cursor = cursorRef.current;
    if (!cursor) return;

    let frame = 0;
    let last: PointerEvent | null = null;
    let highlighted: HTMLElement | null = null;
    let magnetic: HTMLElement | null = null;

    const clearMagnetic = () => {
      if (!magnetic) return;
      magnetic.style.removeProperty("--magnet-x");
      magnetic.style.removeProperty("--magnet-y");
      magnetic = null;
    };

    const reset = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      cursor.dataset.visible = "false";
      cursor.dataset.active = "false";
      if (highlighted) {
        highlighted.style.removeProperty("--spot-x");
        highlighted.style.removeProperty("--spot-y");
        highlighted = null;
      }
      clearMagnetic();
      const scene = document.getElementById("simplyes-hero-scene");
      scene?.style.setProperty("--scene-x", "0px");
      scene?.style.setProperty("--scene-y", "0px");
    };

    const paint = () => {
      frame = 0;
      const event = last;
      if (!event || !fine.matches || reduced.matches) return;
      const node = event.target instanceof Element ? event.target : null;

      cursor.dataset.visible = "true";
      cursor.dataset.active = node?.closest("a, button, summary") ? "true" : "false";
      cursor.style.transform =
        "translate3d(" + event.clientX + "px, " + event.clientY + "px, 0) translate(-50%, -50%)";

      const nextSpot = node?.closest<HTMLElement>("[data-spotlight]") ?? null;
      if (highlighted && highlighted !== nextSpot) {
        highlighted.style.removeProperty("--spot-x");
        highlighted.style.removeProperty("--spot-y");
      }
      highlighted = nextSpot;
      if (nextSpot) {
        const rect = nextSpot.getBoundingClientRect();
        nextSpot.style.setProperty("--spot-x", event.clientX - rect.left + "px");
        nextSpot.style.setProperty("--spot-y", event.clientY - rect.top + "px");
      }

      const nextMagnet = node?.closest<HTMLElement>("[data-magnetic]") ?? null;
      if (magnetic && magnetic !== nextMagnet) clearMagnetic();
      magnetic = nextMagnet;
      if (nextMagnet) {
        const rect = nextMagnet.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width / 2) / Math.max(rect.width / 2, 1);
        const y = (event.clientY - rect.top - rect.height / 2) / Math.max(rect.height / 2, 1);
        // Inner face only; the accessible link's hit area never moves.
        nextMagnet.style.setProperty("--magnet-x", (Math.max(-1, Math.min(1, x)) * 3).toFixed(1) + "px");
        nextMagnet.style.setProperty("--magnet-y", (Math.max(-1, Math.min(1, y)) * 2).toFixed(1) + "px");
      }

      const scene = document.getElementById("simplyes-hero-scene");
      if (scene) {
        const rect = scene.getBoundingClientRect();
        const within = event.clientX >= rect.left && event.clientX <= rect.right &&
          event.clientY >= rect.top && event.clientY <= rect.bottom;
        if (within) {
          const x = (event.clientX - rect.left - rect.width / 2) / (rect.width / 2);
          const y = (event.clientY - rect.top - rect.height / 2) / (rect.height / 2);
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
    const onChange = () => reset();

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", reset);
    window.addEventListener("blur", reset);
    fine.addEventListener("change", onChange);
    reduced.addEventListener("change", onChange);

    return () => {
      reset();
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", reset);
      window.removeEventListener("blur", reset);
      fine.removeEventListener("change", onChange);
      reduced.removeEventListener("change", onChange);
    };
  }, []);

  return <span className="sy-cursor" aria-hidden="true" ref={cursorRef} data-visible="false" data-active="false" />;
}
