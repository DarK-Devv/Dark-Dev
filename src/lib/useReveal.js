import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Staggered entrance for any descendant marked with `data-reveal`.
 * Honors prefers-reduced-motion and cleans itself up via gsap.context.
 */
export function useReveal(ref, { y = 30, stagger = 0.08, start = 'top 78%' } = {}) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const els = gsap.utils.toArray('[data-reveal]');
      if (!els.length) return;
      if (reduce) {
        gsap.set(els, { opacity: 1, y: 0 });
        return;
      }
      gsap.set(els, { opacity: 0, y });
      // Reveal each element as it enters; batch staggers items that arrive together.
      ScrollTrigger.batch(els, {
        start,
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger }),
      });
    }, root);

    return () => ctx.revert();
  }, [ref, y, stagger, start]);
}
