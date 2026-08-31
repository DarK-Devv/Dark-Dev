import { useEffect, useRef } from 'react';
import { seededFromString, pad } from '../../lib/util';
import { glitchPulse } from '../../lib/glitch';
import './SkillModule.css';

/**
 * A tech-stack chip rendered as a physical "installed hardware module":
 * numbered tile, deterministic (not random-per-render, not a real
 * proficiency claim) fake integration-level bar, activate-on-hover pulse.
 * Uses IntersectionObserver rather than ScrollTrigger since Stack.jsx pins
 * and translates its track horizontally — elements enter the viewport's
 * clipped bounds as the track scrubs, which IO already handles correctly.
 */
export default function SkillModule({ name, index }) {
  const ref = useRef(null);
  const level = 0.35 + seededFromString(name) * 0.6; // 0.35–0.95, stable per name

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('in-view');
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="skmod"
      style={{ '--lvl': level.toFixed(2) }}
      onMouseEnter={(e) => glitchPulse(e.currentTarget, { duration: 0.18, intensity: 0.5 })}
    >
      <span className="skmod__idx">MODULE {pad(index + 1)}</span>
      <div className="skmod__name">{name}</div>
      <div className="skmod__bar">
        <span className="skmod__bar-fill" />
      </div>
      <span className="skmod__label">CORE INTEGRATION</span>
    </div>
  );
}
