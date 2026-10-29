"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";

const CanvasScene = dynamic(() => import("./DocumentCanvas").then(m => m.DocumentCanvas), {
  ssr: false,
});

type Kind = "hero" | "process";

/**
 * WebGL is an opt-in enhancement: large screens, precise pointers, normal-motion
 * preference and a viable WebGL context. All other visitors see the HTML/CSS
 * document illustration immediately. The scene only renders while nearby.
 */
export function DocumentExperience({ kind }: { kind: Kind }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [eligible, setEligible] = useState(false);
  const [nearby, setNearby] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  const onReady = useCallback(() => setReady(true), []);
  const onFailure = useCallback(() => { setFailed(true); setReady(false); }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const pointer = window.matchMedia("(min-width: 900px) and (hover: hover) and (pointer: fine)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const check = () => {
      if (!pointer.matches || motion.matches) { setEligible(false); return; }
      try {
        const test = document.createElement("canvas");
        const gl = test.getContext("webgl2", { failIfMajorPerformanceCaveat: true })
          || test.getContext("webgl", { failIfMajorPerformanceCaveat: true });
        if (!gl) { setEligible(false); return; }
        gl.getExtension("WEBGL_lose_context")?.loseContext();
        setEligible(true);
      } catch { setEligible(false); }
    };
    check();
    pointer.addEventListener("change", check);
    motion.addEventListener("change", check);

    const observer = new IntersectionObserver(([entry]) => {
      setNearby(Boolean(entry?.isIntersecting));
    }, { rootMargin: "220px 0px", threshold: 0 });
    observer.observe(host);

    const onVisibility = () => {
      if (document.hidden) setNearby(false);
      else {
        const rect = host.getBoundingClientRect();
        setNearby(rect.bottom > -220 && rect.top < window.innerHeight + 220);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      pointer.removeEventListener("change", check);
      motion.removeEventListener("change", check);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => {
    if (kind !== "process" || !eligible) return;
    let disposed = false;
    let disposeTrigger: (() => void) | undefined;
    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      const trigger = ScrollTrigger.create({
        trigger: "#how-it-works",
        start: "top 65%",
        end: "bottom 30%",
        scrub: 0.6,
        onUpdate(self) {
          progressRef.current = self.progress;
          const section = document.getElementById("how-it-works");
          section?.style.setProperty("--process-progress", self.progress.toFixed(3));
        },
      });
      disposeTrigger = () => {
        trigger.kill();
        document.getElementById("how-it-works")?.style.removeProperty("--process-progress");
      };
    })().catch(() => {
      // Scroll-driven animation is progressive enhancement, not navigation.
    });
    return () => {
      disposed = true;
      disposeTrigger?.();
    };
  }, [kind, eligible]);

  const enabled = eligible && !failed;
  const active = enabled && nearby;

  // Mount only while in/near the viewport, guaranteeing the Canvas starts
  // with a running frame loop. When it leaves, CSS art becomes visible again.
  useEffect(() => {
    if (!nearby) setReady(false);
  }, [nearby]);

  return (
    <div
      ref={hostRef}
      data-3d-experience={kind}
      data-3d-ready={ready && active ? "true" : "false"}
      className={kind === "hero" ? "sy-hero-webgl" : "sy-process-webgl"}
      aria-hidden="true"
    >
      {kind === "process" && (
        <div className="sy-process-static-art">
          <span className="sy-process-static-sheet sy-process-static-one" />
          <span className="sy-process-static-sheet sy-process-static-two" />
          <span className="sy-process-static-sheet sy-process-static-three" />
        </div>
      )}
      {active && (
        <div className={ready && active ? "sy-canvas-holder sy-canvas-ready" : "sy-canvas-holder"}>
          <CanvasScene
            kind={kind}
            progressRef={progressRef}
            active={active}
            onReady={onReady}
            onFailure={onFailure}
          />
        </div>
      )}
    </div>
  );
}
