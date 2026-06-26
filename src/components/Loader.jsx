import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import EmberCore from './EmberCore';
import './Loader.css';

const R = 132;
const CIRC = 2 * Math.PI * R;

const STAGES = [
  { at: 0.0, label: 'COLD START' },
  { at: 0.18, label: 'SPINNING UP CORES' },
  { at: 0.42, label: 'PRESSURIZING' },
  { at: 0.66, label: 'IGNITION SEQUENCE' },
  { at: 0.86, label: 'STABILIZING OUTPUT' },
  { at: 0.98, label: 'REACTOR ONLINE' },
];

export default function Loader({ onDone }) {
  const rootRef = useRef(null);
  const arcRef = useRef(null);
  const pctRef = useRef(null);
  const statusRef = useRef(null);
  const flashRef = useRef(null);
  const coreWrapRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const state = { p: 0 };

    function update() {
      const p = state.p;
      if (arcRef.current) arcRef.current.style.strokeDashoffset = String(CIRC * (1 - p));
      if (pctRef.current) pctRef.current.textContent = String(Math.round(p * 100)).padStart(3, '0');
      let label = STAGES[0].label;
      for (const s of STAGES) if (p >= s.at) label = s.label;
      if (statusRef.current && statusRef.current.textContent !== label) {
        statusRef.current.textContent = label;
        gsap.fromTo(statusRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' });
      }
    }
    update();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: onDone });

      if (reduce) {
        tl.to(state, { p: 1, duration: 0.6, ease: 'none', onUpdate: update }).to(rootRef.current, {
          autoAlpha: 0, duration: 0.3,
        });
        return;
      }

      gsap.set('.boot__hud', { opacity: 0, y: 12 });
      gsap.set(coreWrapRef.current, { opacity: 0, scale: 0.4 });

      tl.to(coreWrapRef.current, { opacity: 1, scale: 1, duration: 1.0, ease: 'power3.out' });
      tl.to('.boot__hud', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.08 }, '<0.1');

      tl.to(state, { p: 0.62, duration: 2.0, ease: 'power1.inOut', onUpdate: update }, '<');
      tl.to(state, { p: 0.66, duration: 0.3, ease: 'none', onUpdate: update }); // hitch
      tl.to(state, { p: 1, duration: 1.6, ease: 'power2.inOut', onUpdate: update });

      // ignition flare
      tl.fromTo(
        flashRef.current,
        { opacity: 0, scale: 0.2 },
        { opacity: 1, scale: 1, duration: 0.45, ease: 'power2.out' },
        '-=0.15'
      );
      tl.to('.boot__hud', { opacity: 0, duration: 0.3 }, '<');
      // the whole loader scales into the page rather than wiping
      tl.to(rootRef.current, { scale: 1.18, opacity: 0, duration: 0.7, ease: 'power3.in' }, '-=0.1');
    }, rootRef);

    return () => ctx.revert();
  }, [onDone]);

  return (
    <div className="boot" ref={rootRef} aria-hidden="true">
      <div className="boot__grid" />

      <div className="boot__top boot__hud">
        <span className="boot__brand"><span className="boot__mark" /> DARK&#8209;DEV</span>
        <span className="boot__meta tc">REACTOR v2.0</span>
      </div>

      <div className="boot__stage">
        <div className="boot__ring" ref={coreWrapRef}>
          <EmberCore className="boot__core" spin={1.6} />
          <svg className="boot__arc" width="300" height="300" viewBox="0 0 300 300">
            <circle cx="150" cy="150" r={R} fill="none" stroke="rgba(255,107,53,0.1)" strokeWidth="2" />
            <circle
              ref={arcRef}
              cx="150" cy="150" r={R}
              fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round"
              strokeDasharray={CIRC}
              strokeDashoffset={CIRC}
              transform="rotate(-90 150 150)"
            />
          </svg>
          <div className="boot__pct tc">
            <span ref={pctRef}>000</span>
            <i>%</i>
          </div>
        </div>

        <div className="boot__status tc boot__hud" ref={statusRef}>COLD START</div>
      </div>

      <div className="boot__foot boot__hud tc">
        <span>SYS::IGNITE</span>
        <span>PWR / ON</span>
      </div>

      <div className="boot__flash" ref={flashRef} />
    </div>
  );
}
