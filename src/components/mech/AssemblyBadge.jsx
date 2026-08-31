import { forwardRef, useImperativeHandle, useRef } from 'react';

/**
 * Emblem blueprint: each plate is a polygon in a 300x300 viewBox centered
 * on (0,0), plus the offset/rotation it flies in from and the delay before
 * it starts seating. Mirrored pairs make the locked silhouette read as a
 * deliberate angular faceplate. Original geometry — no existing insignia.
 */
const PLATES = [
  // crown
  { d: 'M -46,-96 L 46,-96 L 34,-72 L -34,-72 Z', from: [0, -180, -40], delay: 0.0 },
  // brow wings
  { d: 'M -84,-66 L -30,-66 L -20,-40 L -74,-40 Z', from: [-170, -60, 35], delay: 0.07 },
  { d: 'M 84,-66 L 30,-66 L 20,-40 L 74,-40 Z', from: [170, -60, -35], delay: 0.07 },
  // visor housing
  { d: 'M -80,-32 L 80,-32 L 68,-2 L -68,-2 Z', from: [0, 0, 60], delay: 0.16 },
  // cheeks
  { d: 'M -70,4 L -26,4 L -20,52 L -60,52 Z', from: [-190, 30, 45], delay: 0.26 },
  { d: 'M 70,4 L 26,4 L 20,52 L 60,52 Z', from: [190, 30, -45], delay: 0.26 },
  // core column
  { d: 'M -20,2 L 20,2 L 20,50 L -20,50 Z', from: [0, 150, 50], delay: 0.34 },
  // jaw
  { d: 'M -52,58 L 52,58 L 34,86 L -34,86 Z', from: [0, 190, 30], delay: 0.42 },
  // tusks
  { d: 'M -46,88 L -22,88 L -30,120 L -48,110 Z', from: [-120, 150, -50], delay: 0.5 },
  { d: 'M 46,88 L 22,88 L 30,120 L 48,110 Z', from: [120, 150, 50], delay: 0.5 },
  // buttresses
  { d: 'M -104,-30 L -88,-30 L -80,44 L -100,36 Z', from: [-220, 0, 60], delay: 0.58 },
  { d: 'M 104,-30 L 88,-30 L 80,44 L 100,36 Z', from: [220, 0, -60], delay: 0.58 },
];

const TRAVEL = 0.42; // fraction of total progress one plate takes to seat

/** overshoot-and-settle so each plate reads as slamming into its socket */
function easeOutBack(t) {
  const c1 = 2.2;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}
const clamp01 = (v) => Math.max(0, Math.min(1, v));

/**
 * An emblem that builds itself out of armor plates: each plate flies in
 * from off-frame on its own delay and snaps into place with a mechanical
 * overshoot, until the full faceplate is locked and the visor ignites.
 * Exposes imperative setProgress(p) so a GSAP/rAF-driven caller can write
 * every tick without React re-renders (matching Loader's direct-ref style).
 * `initialProgress={1}` renders the finished, static emblem — used as the
 * reduced-motion fallback.
 */
const AssemblyBadge = forwardRef(function AssemblyBadge({ className = '', initialProgress = 0 }, ref) {
  const plateRefs = useRef([]);
  const visorRef = useRef(null);

  const write = (p) => {
    PLATES.forEach((plate, i) => {
      const el = plateRefs.current[i];
      if (!el) return;
      const local = clamp01((p - plate.delay) / TRAVEL);
      const e = easeOutBack(local);
      const [fx, fy, fr] = plate.from;
      el.style.transform = `translate(${fx * (1 - e)}px, ${fy * (1 - e)}px) rotate(${fr * (1 - e)}deg)`;
      el.style.opacity = String(0.15 + local * 0.85);
    });
    if (visorRef.current) {
      const ignite = clamp01((p - 0.9) / 0.1);
      visorRef.current.style.opacity = String(ignite);
      visorRef.current.style.transform = `scaleX(${0.2 + ignite * 0.8})`;
    }
  };

  useImperativeHandle(ref, () => ({ setProgress: write }));

  return (
    <svg viewBox="-150 -150 300 300" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="ab-plate" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#26262c" />
          <stop offset="100%" stopColor="#101014" />
        </linearGradient>
        <filter id="ab-glow" x="-60%" y="-300%" width="220%" height="700%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {PLATES.map((plate, i) => {
        const local = clamp01((initialProgress - plate.delay) / TRAVEL);
        const e = easeOutBack(local);
        const [fx, fy, fr] = plate.from;
        return (
          <path
            key={i}
            ref={(el) => (plateRefs.current[i] = el)}
            d={plate.d}
            fill="url(#ab-plate)"
            stroke="var(--signal)"
            strokeWidth="2"
            strokeLinejoin="miter"
            style={{
              transform: `translate(${fx * (1 - e)}px, ${fy * (1 - e)}px) rotate(${fr * (1 - e)}deg)`,
              opacity: 0.15 + local * 0.85,
            }}
          />
        );
      })}

      <rect
        ref={visorRef}
        x="-64"
        y="-24"
        width="128"
        height="12"
        fill="var(--signal-bright)"
        filter="url(#ab-glow)"
        style={{
          opacity: clamp01((initialProgress - 0.9) / 0.1),
          transformOrigin: 'center',
          transform: `scaleX(${0.2 + clamp01((initialProgress - 0.9) / 0.1) * 0.8})`,
        }}
      />
    </svg>
  );
});

export default AssemblyBadge;
