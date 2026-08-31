import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';

const STEEL = '#3a3a42';
const SIGNAL = '#FF6B35';
const SIGNAL_BRIGHT = '#FFB627';

/**
 * The faceplate blueprint. Each entry is one armor panel with its LOCKED
 * transform in the emblem, the direction it flies in from, and the hinge
 * axis it rotates around when the structure transforms on scroll.
 * Mirrored pairs share a shape so the assembled silhouette reads as a
 * deliberate symmetric mask rather than a random cluster.
 */
const PANELS = [
  // crown slab
  { size: [2.0, 0.42, 0.34], pos: [0, 1.12, 0], rot: [0, 0, 0], from: [0, 6, -3], hinge: [1, 0, 0], swing: -0.9, delay: 0.0 },
  // brow wings, swept up and out (mirrored)
  { size: [1.1, 0.42, 0.3], pos: [-0.96, 0.7, 0.1], rot: [0, 0, 0.4], from: [-6, 3.5, 1], hinge: [0, 0, 1], swing: 0.75, delay: 0.09 },
  { size: [1.1, 0.42, 0.3], pos: [0.96, 0.7, 0.1], rot: [0, 0, -0.4], from: [6, 3.5, 1], hinge: [0, 0, 1], swing: -0.75, delay: 0.09 },
  // visor housing — the dominant horizontal
  { size: [2.24, 0.5, 0.36], pos: [0, 0.22, 0.1], rot: [0, 0, 0], from: [0, 0, 7], hinge: [1, 0, 0], swing: 0.5, delay: 0.2 },
  // cheek towers (mirrored)
  { size: [0.56, 1.0, 0.32], pos: [-0.86, -0.42, 0.06], rot: [0, 0, 0.1], from: [-7, -2.5, 0], hinge: [0, 1, 0], swing: -1.15, delay: 0.31 },
  { size: [0.56, 1.0, 0.32], pos: [0.86, -0.42, 0.06], rot: [0, 0, -0.1], from: [7, -2.5, 0], hinge: [0, 1, 0], swing: 1.15, delay: 0.31 },
  // central core block
  { size: [0.86, 0.86, 0.42], pos: [0, -0.36, 0.16], rot: [0, 0, 0], from: [0, -6, 4], hinge: [1, 0, 0], swing: 0.6, delay: 0.41 },
  // jaw slab
  { size: [1.34, 0.4, 0.32], pos: [0, -1.04, 0.08], rot: [0, 0, 0], from: [0, -7, -2], hinge: [1, 0, 0], swing: 1.0, delay: 0.5 },
  // mandible tusks (mirrored)
  { size: [0.3, 0.6, 0.26], pos: [-0.58, -1.18, 0.1], rot: [0, 0, -0.32], from: [-5, -6, 3], hinge: [0, 0, 1], swing: -0.85, delay: 0.58 },
  { size: [0.3, 0.6, 0.26], pos: [0.58, -1.18, 0.1], rot: [0, 0, 0.32], from: [5, -6, 3], hinge: [0, 0, 1], swing: 0.85, delay: 0.58 },
  // shoulder buttresses, set back (mirrored)
  { size: [0.4, 1.5, 0.3], pos: [-1.56, 0.06, -0.22], rot: [0, 0, 0.16], from: [-8, 1, -5], hinge: [0, 1, 0], swing: -1.3, delay: 0.66 },
  { size: [0.4, 1.5, 0.3], pos: [1.56, 0.06, -0.22], rot: [0, 0, -0.16], from: [8, 1, -5], hinge: [0, 1, 0], swing: 1.3, delay: 0.66 },
];

const ASSEMBLE_DURATION = 1.5;
const PANEL_TRAVEL = 1.05;

/** overshoot-and-settle: reads as a part slamming into its socket */
function easeOutBack(t) {
  const c1 = 1.9;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

function Panel({ spec, geo, edgesGeo, clockRef, progressRef }) {
  const meshRef = useRef(null);
  const edgeRef = useRef(null);

  const data = useMemo(() => {
    const lockedPos = new THREE.Vector3(...spec.pos);
    const lockedQuat = new THREE.Quaternion().setFromEuler(new THREE.Euler(...spec.rot));
    const fromPos = new THREE.Vector3(...spec.from);
    const fromQuat = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(spec.from[0] * 0.4, spec.from[1] * 0.4, spec.from[2] * 0.4)
    );
    const hinge = new THREE.Vector3(...spec.hinge).normalize();
    return { lockedPos, lockedQuat, fromPos, fromQuat, hinge };
  }, [spec]);

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const elapsed = clockRef.current;
    const local = THREE.MathUtils.clamp((elapsed - spec.delay) / PANEL_TRAVEL, 0, 1);
    const e = easeOutBack(local);
    const p = progressRef?.current ?? 0;

    mesh.position.lerpVectors(data.fromPos, data.lockedPos, e);
    mesh.quaternion.slerpQuaternions(data.fromQuat, data.lockedQuat, Math.min(1, local * 1.15));

    // once locked, scroll drives the transformation: panels hinge open and
    // push outward from the faceplate, as if the mask is unfolding
    if (local >= 1 && p > 0) {
      const swing = new THREE.Quaternion().setFromAxisAngle(data.hinge, spec.swing * p);
      mesh.quaternion.copy(data.lockedQuat).premultiply(swing);
      mesh.position.copy(data.lockedPos).multiplyScalar(1 + p * 0.85);
      mesh.position.z += p * spec.pos[2] * 2;
    }

    if (edgeRef.current) {
      edgeRef.current.position.copy(mesh.position);
      edgeRef.current.quaternion.copy(mesh.quaternion);
    }
  });

  return (
    <group>
      <mesh ref={meshRef} geometry={geo}>
        <meshStandardMaterial color={STEEL} roughness={0.45} metalness={0.55} />
      </mesh>
      <lineSegments ref={edgeRef} geometry={edgesGeo}>
        <lineBasicMaterial color={SIGNAL} transparent opacity={0.5} />
      </lineSegments>
    </group>
  );
}

/** the visor slit — ignites once the faceplate has finished locking */
function Visor({ clockRef, progressRef }) {
  const ref = useRef(null);
  const matRef = useRef(null);

  useFrame((state) => {
    if (!matRef.current || !ref.current) return;
    const elapsed = clockRef.current;
    const p = progressRef?.current ?? 0;
    const ignite = THREE.MathUtils.clamp((elapsed - (ASSEMBLE_DURATION + 0.15)) / 0.5, 0, 1);
    const pulse = 0.85 + 0.15 * Math.sin(state.clock.elapsedTime * 2.2);
    matRef.current.opacity = ignite * pulse * (1 - p * 0.7);
    ref.current.scale.x = 0.2 + ignite * 0.8;
  });

  return (
    <mesh ref={ref} position={[0, 0.22, 0.3]}>
      <planeGeometry args={[1.95, 0.17]} />
      <meshBasicMaterial ref={matRef} color={SIGNAL_BRIGHT} transparent opacity={0} toneMapped={false} />
    </mesh>
  );
}

/** thin orbital gimbal that spins up as the structure opens */
function GimbalRing({ progressRef, radius, tilt, speed }) {
  const ref = useRef(null);
  useFrame((state, delta) => {
    if (!ref.current) return;
    const p = progressRef?.current ?? 0;
    ref.current.rotation.z += delta * speed * (1 + p * 2.5);
    ref.current.scale.setScalar(1 + p * 0.5);
    void state;
  });
  return (
    <mesh ref={ref} rotation={tilt}>
      <torusGeometry args={[radius, 0.007, 6, 72]} />
      <meshBasicMaterial color={SIGNAL} transparent opacity={0.22} />
    </mesh>
  );
}

function Assembly({ progressRef, panelSpecs, interactive }) {
  const groupRef = useRef(null);
  const clockRef = useRef(0);
  const startRef = useRef(null);
  const flashRef = useRef(null);
  const flashedRef = useRef(false);

  const geoCache = useMemo(() => {
    const map = new Map();
    panelSpecs.forEach((s) => {
      const key = s.size.join(',');
      if (!map.has(key)) {
        const g = new THREE.BoxGeometry(...s.size);
        map.set(key, { geo: g, edges: new THREE.EdgesGeometry(g) });
      }
    });
    return map;
  }, [panelSpecs]);

  useFrame((state, delta) => {
    if (startRef.current === null) startRef.current = state.clock.elapsedTime;
    clockRef.current = state.clock.elapsedTime - startRef.current;

    // hard light flash at the moment the last panel seats
    if (!flashedRef.current && clockRef.current >= ASSEMBLE_DURATION) {
      flashedRef.current = true;
      if (flashRef.current) flashRef.current.userData.f = 1;
    }
    if (flashRef.current) {
      const f = flashRef.current.userData.f || 0;
      flashRef.current.intensity = 14 + f * 90;
      if (f > 0) flashRef.current.userData.f = Math.max(0, f - delta * 2.6);
    }

    if (groupRef.current) {
      const p = progressRef?.current ?? 0;
      // settle from a slight bank into square-on, then slow-rotate while idle
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.28) * 0.12 + p * 0.6;
      if (interactive) {
        const tx = (state.pointer.y || 0) * 0.12;
        const tz = -(state.pointer.x || 0) * 0.07;
        groupRef.current.rotation.x += (tx - groupRef.current.rotation.x) * 0.05;
        groupRef.current.rotation.z += (tz - groupRef.current.rotation.z) * 0.05;
      }
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.05;
      groupRef.current.scale.setScalar(1 - p * 0.22);
    }
  });

  return (
    <group ref={groupRef}>
      <pointLight ref={flashRef} position={[2.2, 2.4, 3.4]} intensity={14} color={SIGNAL_BRIGHT} distance={18} />
      {panelSpecs.map((spec, i) => {
        const { geo, edges } = geoCache.get(spec.size.join(','));
        return <Panel key={i} spec={spec} geo={geo} edgesGeo={edges} clockRef={clockRef} progressRef={progressRef} />;
      })}
      <Visor clockRef={clockRef} progressRef={progressRef} />
      <GimbalRing progressRef={progressRef} radius={1.95} tilt={[Math.PI / 2.4, 0, 0]} speed={0.16} />
      <GimbalRing progressRef={progressRef} radius={2.2} tilt={[Math.PI / 2.9, Math.PI / 6, 0]} speed={-0.11} />
    </group>
  );
}

/**
 * Lazy-loaded Three.js scene: a dormant machine assembling its own
 * faceplate. Armor panels fly in from off-screen on staggered timing and
 * slam into a symmetric angular mask (overshoot easing = mechanical
 * seating), a visor slit ignites, and scrolling hinges every panel open so
 * the structure unfolds. Original geometry — procedural boxes, no imported
 * models or third-party marks.
 */
export default function MechCoreScene({ progressRef, interactive = true, fragmentCount, dpr = [1, 2] }) {
  // On low-power devices drop the outer buttresses rather than shrinking
  // everything — the silhouette still reads, with 2 fewer meshes.
  const panelSpecs = useMemo(
    () => (interactive ? PANELS : PANELS.slice(0, 10)),
    [interactive]
  );
  void fragmentCount;

  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0, 7.4], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[-4, 4, 6]} intensity={3.4} color="#fff4ec" />
      <directionalLight position={[5, -1, 3]} intensity={1.4} color={SIGNAL} />
      <pointLight position={[-3.5, -2.5, -2]} intensity={10} color="#e0304a" distance={16} />
      <pointLight position={[0, 0.3, 3]} intensity={6} color={SIGNAL} distance={10} />
      <Assembly progressRef={progressRef} panelSpecs={panelSpecs} interactive={interactive} />
    </Canvas>
  );
}
