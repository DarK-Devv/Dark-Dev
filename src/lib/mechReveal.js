import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VARIANTS = {
  // masked slide-up, matches Hero's name-line reveal motif
  slide: {
    from: { opacity: 0, y: 34 },
    to: { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
  },
  // panel unfolds open via clip-path rather than fading
  unfold: {
    from: { opacity: 0, clipPath: 'inset(0 0 100% 0)', y: 12 },
    to: { opacity: 1, clipPath: 'inset(0 0 0% 0)', y: 0, duration: 0.7, ease: 'power3.out' },
  },
  // angular chamfer reveal, corner-first
  chamfer: {
    from: { opacity: 0, clipPath: 'polygon(0 0,0 0,0 100%,0 100%)', scale: 0.98 },
    to: { opacity: 1, clipPath: 'polygon(0 0,100% 0,100% 100%,0 100%)', scale: 1, duration: 0.75, ease: 'power2.out' },
  },
  // scanline sweep reveal — used by ScanReveal
  scan: {
    from: { opacity: 0, y: 10 },
    to: { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
  },
};

/**
 * Generalized version of useReveal: batches ScrollTrigger reveals over
 * descendants of `ref`, but each element can select its own entrance
 * variant via `data-reveal="unfold"` / `data-reveal="chamfer"` / etc.
 * Elements with a bare `data-reveal` (no value) fall back to `slide`.
 * Honors prefers-reduced-motion; cleans up via gsap.context, same as
 * useReveal.
 */
export function useMechReveal(ref, { stagger = 0.08, start = 'top 78%' } = {}) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const els = gsap.utils.toArray('[data-reveal]');
      if (!els.length) return;

      if (reduce) {
        gsap.set(els, { opacity: 1, y: 0, clipPath: 'none', scale: 1 });
        return;
      }

      // group elements by their variant so each batch animates with a
      // consistent `to` shape (gsap.set needs matching from-states per call)
      const groups = new Map();
      els.forEach((el) => {
        const key = el.getAttribute('data-reveal') || 'slide';
        const variant = VARIANTS[key] || VARIANTS.slide;
        if (!groups.has(key)) groups.set(key, { variant, els: [] });
        groups.get(key).els.push(el);
      });

      groups.forEach(({ variant, els: groupEls }) => {
        gsap.set(groupEls, variant.from);
        ScrollTrigger.batch(groupEls, {
          start,
          once: true,
          onEnter: (batch) => gsap.to(batch, { ...variant.to, stagger }),
        });
      });
    }, root);

    return () => ctx.revert();
  }, [ref, stagger, start]);
}
