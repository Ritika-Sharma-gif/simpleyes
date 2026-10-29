"use client";

import { Component, type ErrorInfo, type ReactNode, type RefObject } from "react";
import { Canvas } from "@react-three/fiber";
import { DocumentWorld } from "./DocumentWorld";

type Props = {
  kind: "hero" | "process";
  progressRef: RefObject<number>;
  active: boolean;
  onReady: () => void;
  onFailure: () => void;
};

class SceneBoundary extends Component<{ children: ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(_error: Error, _info: ErrorInfo) { this.props.onFailure(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export function DocumentCanvas({ kind, progressRef, active, onReady, onFailure }: Props) {
  return (
    <SceneBoundary onFailure={onFailure}>
      <Canvas
        aria-hidden="true"
        className="sy-three-canvas"
        frameloop={active ? "always" : "never"}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6.45], fov: 38, near: 0.1, far: 30 }}
        gl={{ antialias: true, alpha: false, powerPreference: "low-power" }}
        onCreated={onReady}
        onPointerMissed={() => undefined}
      >
        <DocumentWorld kind={kind} progressRef={progressRef} />
      </Canvas>
    </SceneBoundary>
  );
}
