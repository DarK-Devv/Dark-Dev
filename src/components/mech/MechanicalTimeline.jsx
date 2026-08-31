import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './MechanicalTimeline.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * Vertical mechanical timeline: a spine with a travelling energy-line fill
 * (scrubbed to scroll progress through the container) plus node markers
 * that lock "active" as they're scrolled past. Children render their own
 * content — each top-level child should carry `className="mtimeline__node"`.
 */
export default function MechanicalTimeline({ children, className = '' }) {
  const rootRef = useRef(null);
  const fillRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const nodes = gsap.utils.toArray('.mtimeline__node', root);

      if (reduce) {
        if (fillRef.current) fillRef.current.style.height = '100%';
        nodes.forEach((n) => n.classList.add('is-active'));
        return;
      }

      if (fillRef.current) {
        gsap.to(fillRef.current, {
          height: '100%',
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top 60%', end: 'bottom 70%', scrub: true },
        });
      }

      ScrollTrigger.batch(nodes, {
        start: 'top 65%',
        once: true,
        onEnter: (batch) => batch.forEach((n) => n.classList.add('is-active')),
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div className={`mtimeline ${className}`} ref={rootRef}>
      <span className="mtimeline__spine" aria-hidden="true" />
      <span className="mtimeline__fill" ref={fillRef} aria-hidden="true" />
      {children}
    </div>
  );
}
