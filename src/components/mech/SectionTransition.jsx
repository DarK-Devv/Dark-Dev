import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './SectionTransition.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * A brief full-bleed HUD takeover between two sections — "the machine
 * pausing to run a diagnostic" beat. Plays once as it scrolls into view
 * (no scroll-pin: pinning an interstitial that SideRail doesn't track as
 * a section risks scroll-position jank against SideRail's own section-start
 * measurements, so this reveals in-flow instead — reads the same to the
 * visitor, without the extra coordination risk).
 */
export default function SectionTransition({ title, subtitle, targetPct = 100 }) {
  const rootRef = useRef(null);
  const bodyRef = useRef(null);
  const pctRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(bodyRef.current, { opacity: 1 });
        if (pctRef.current) pctRef.current.textContent = `${targetPct}%`;
        if (barRef.current) barRef.current.style.width = '100%';
        return;
      }

      const state = { v: 0 };
      const st = ScrollTrigger.create({
        trigger: root,
        start: 'top 70%',
        once: true,
        onEnter: () => {
          const tl = gsap.timeline();
          tl.to(bodyRef.current, { opacity: 1, duration: 0.4, ease: 'power2.out' });
          tl.to(
            state,
            {
              v: targetPct,
              duration: 1.3,
              ease: 'power1.inOut',
              onUpdate: () => {
                if (pctRef.current) pctRef.current.textContent = `${Math.round(state.v)}%`;
                if (barRef.current) barRef.current.style.width = `${state.v}%`;
              },
            },
            '-=0.1'
          );
        },
      });
      return () => st.kill();
    }, root);

    return () => ctx.revert();
  }, [targetPct]);

  return (
    <div className="sxn" ref={rootRef} aria-hidden="true">
      <div className="sxn__grid" />
      <div className="sxn__body" ref={bodyRef}>
        <div className="sxn__title">{title}</div>
        <div className="sxn__pct">
          <span ref={pctRef}>0%</span>
        </div>
        <div className="sxn__bar">
          <span className="sxn__bar-fill" ref={barRef} />
        </div>
        <div className="sxn__sub">{subtitle}</div>
      </div>
    </div>
  );
}
