import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScanReveal.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * Wraps content with a one-shot horizontal scanline sweep on section-enter —
 * the "IDENTIFICATION SEQUENCE" target-acquisition framing for About.
 * The content itself still reveals via useReveal/useMechReveal on its own
 * [data-reveal] children; this only adds the scan-sweep overlay layer.
 */
export default function ScanReveal({ children, className = '' }) {
  const rootRef = useRef(null);
  const sweepRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const sweep = sweepRef.current;
    if (!root || !sweep) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: root,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          gsap.fromTo(
            sweep,
            { top: '0%', opacity: 1 },
            { top: '100%', opacity: 0.3, duration: 1.1, ease: 'power2.inOut' }
          );
        },
      });
      return () => st.kill();
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div className={`scan-reveal ${className}`} ref={rootRef}>
      <span className="scan-reveal__sweep" ref={sweepRef} aria-hidden="true" />
      {children}
    </div>
  );
}
