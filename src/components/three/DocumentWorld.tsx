"use client";

import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { useRef, type RefObject } from "react";
import { Group, MathUtils } from "three";

/** Original geometry: no stock models, document textures, or official insignia. */
type Kind = "hero" | "process";
type Pose = { x: number; y: number; z: number; rot: number };

const stack: Pose[] = [
  { x: -0.6, y: 0.05, z: -0.65, rot: -0.23 },
  { x: 0.48, y: 0.15, z: -0.35, rot: 0.17 },
  { x: 0.02, y: -0.15, z: 0.04, rot: -0.06 },
  { x: 0.58, y: -0.32, z: -0.13, rot: 0.16 },
];

const sequence: Pose[][] = [
  [
    { x: -0.14, y: 0.04, z: -0.45, rot: -0.12 },
    { x: 0.03, y: -0.02, z: -0.28, rot: 0.08 },
    { x: 0.13, y: 0.00, z: -0.12, rot: -0.07 },
    { x: 0.04, y: -0.08, z: 0.08, rot: 0.03 },
  ],
  [
    { x: -1.10, y: -0.10, z: -0.45, rot: -0.26 },
    { x: 0.05, y: 0.20, z: -0.18, rot: 0.03 },
    { x: 1.06, y: 0.05, z: 0.10, rot: 0.24 },
    { x: 0.0, y: -0.12, z: 0.24, rot: 0 },
  ],
  [
    { x: -1.04, y: 0.55, z: -0.40, rot: -0.10 },
    { x: 0.92, y: 0.55, z: -0.28, rot: 0.08 },
    { x: -0.98, y: -0.60, z: -0.12, rot: 0.08 },
    { x: 0.88, y: -0.60, z: 0.15, rot: -0.11 },
  ],
  [
    { x: -0.54, y: 0.07, z: -0.58, rot: -0.15 },
    { x: 0.42, y: 0.07, z: -0.36, rot: 0.08 },
    { x: -0.13, y: -0.10, z: -0.17, rot: -0.035 },
    { x: 0.0, y: -0.08, z: 0.10, rot: 0 },
  ],
];

function poseFor(index: number, progress: number, kind: Kind): Pose {
  if (kind === "hero") return stack[index] ?? stack[0]!;
  const key = Math.max(0, Math.min(2.99999, progress * 3));
  const a = Math.floor(key);
  const t = MathUtils.smoothstep(key - a, 0, 1);
  const p = sequence[a]?.[index] ?? stack[index] ?? stack[0]!;
  const q = sequence[a + 1]?.[index] ?? stack[index] ?? stack[0]!;
  return {
    x: MathUtils.lerp(p.x, q.x, t),
    y: MathUtils.lerp(p.y, q.y, t),
    z: MathUtils.lerp(p.z, q.z, t),
    rot: MathUtils.lerp(p.rot, q.rot, t),
  };
}

function DocumentSheet({ index, groupRef }: { index: number; groupRef: (node: Group | null) => void }) {
  const green = index === 3;
  return (
    <group ref={groupRef}>
      <RoundedBox args={[1.58, 2.16, 0.07]} radius={0.065} smoothness={3}>
        <meshStandardMaterial color={green ? "#d7eba5" : "#fffdf4"} roughness={0.79} metalness={0.0}/>
      </RoundedBox>
      <mesh position={[-0.46, 0.77, 0.052]}>
        <boxGeometry args={[0.34, 0.057, 0.006]} />
        <meshStandardMaterial color={green ? "#49765c" : "#658a6e"} />
      </mesh>
      <mesh position={[-0.43, 0.39, 0.054]}>
        <boxGeometry args={[0.42, 0.035, 0.006]} />
        <meshStandardMaterial color="#bdcabb" />
      </mesh>
      {[0, 1, 2, 3].map((line) => (
        <mesh key={line} position={[-0.05, 0.13 - line * 0.18, 0.053]}>
          <boxGeometry args={[line === 3 ? 0.78 : 1.02, 0.022, 0.006]} />
          <meshStandardMaterial color={green ? "#83a884" : "#d1d9cf"} />
        </mesh>
      ))}
      <mesh position={[0.45, -0.73, 0.055]}>
        <circleGeometry args={[0.115, 24]} />
        <meshStandardMaterial color={green ? "#285f49" : "#c9dfb8"} roughness={0.8}/>
      </mesh>
      <mesh position={[-0.42, -0.76, 0.051]}>
        <boxGeometry args={[0.34, 0.027, 0.006]} />
        <meshStandardMaterial color="#a5bba6" />
      </mesh>
    </group>
  );
}

export function DocumentWorld({ progressRef, kind }: { progressRef: RefObject<number>; kind: Kind }) {
  const root = useRef<Group>(null);
  const sheets = useRef<Array<Group | null>>([]);

  useFrame((state, delta) => {
    const group = root.current;
    if (!group) return;
    const dt = Math.min(delta, 0.08);
    const pointerX = Math.max(-1, Math.min(1, state.pointer.x));
    const pointerY = Math.max(-1, Math.min(1, state.pointer.y));
    group.rotation.y = MathUtils.damp(group.rotation.y, kind === "hero" ? pointerX * 0.12 : -0.13, 3.6, dt);
    group.rotation.x = MathUtils.damp(group.rotation.x, kind === "hero" ? -pointerY * 0.07 : 0.06, 3.6, dt);
    group.position.y = MathUtils.damp(group.position.y, kind === "hero" ? Math.sin(state.clock.elapsedTime * 0.6) * 0.035 : 0, 2.8, dt);

    for (let i = 0; i < sheets.current.length; i++) {
      const sheet = sheets.current[i];
      if (!sheet) continue;
      const pose = poseFor(i, progressRef.current, kind);
      sheet.position.x = MathUtils.damp(sheet.position.x, pose.x, 4.1, dt);
      sheet.position.y = MathUtils.damp(sheet.position.y, pose.y, 4.1, dt);
      sheet.position.z = MathUtils.damp(sheet.position.z, pose.z, 4.1, dt);
      sheet.rotation.z = MathUtils.damp(sheet.rotation.z, pose.rot, 4.1, dt);
    }
  });

  return (
    <>
      <color attach="background" args={["#1c4536"]}/>
      <ambientLight intensity={1.75}/>
      <directionalLight position={[-4, 7, 6]} intensity={2.3} color="#fff8ec" />
      <pointLight position={[3, -1, 3]} intensity={3.0} color="#b9d9a2" distance={9} />
      <group ref={root} rotation={[0.07, -0.13, 0.03]} scale={kind === "hero" ? 1.05 : 0.88}>
        {stack.map((_, index) => (
          <DocumentSheet key={index} index={index} groupRef={(node) => { sheets.current[index] = node; }}/>
        ))}
      </group>
    </>
  );
}
