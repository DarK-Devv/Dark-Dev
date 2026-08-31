import gsap from 'gsap';

/**
 * One-shot "system interference" pulse: brief RGB-split (via the --gx CSS
 * var), a single scanline flash, and a subtle jitter. Meant for activation
 * moments only (loader ignition, first section entry, button press) — never
 * looped. Honors prefers-reduced-motion by resolving instantly.
 */
export function glitchPulse(el, { duration = 0.32, intensity = 1 } = {}) {
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) {
    el.style.setProperty('--gx', '0px');
    return;
  }

  const gx = 3 * intensity;
  const tl = gsap.timeline();
  tl.to(el, { '--gx': `${gx}px`, duration: duration / 8, repeat: 5, yoyo: true, ease: 'none' });
  tl.set(el, { '--gx': '0px' });
  return tl;
}

/**
 * Mounts a brief full-bleed scanline flash over `el` (expects `el` to be
 * position:relative and to contain a `.scan-flash` pseudo-target, or pass a
 * dedicated overlay node). Returns the GSAP tween for chaining/cleanup.
 */
export function scanFlash(el, { duration = 0.5 } = {}) {
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) {
    gsap.set(el, { opacity: 0 });
    return;
  }
  return gsap.fromTo(
    el,
    { opacity: 0, scaleY: 0.2, transformOrigin: 'top' },
    { opacity: 1, scaleY: 1, duration: duration * 0.35, ease: 'power2.out', yoyo: true, repeat: 1 }
  );
}
