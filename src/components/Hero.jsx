import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MechCore from './mech/MechCore';
import AlienGlyph from './mech/AlienGlyph';
import SystemHUD from './mech/SystemHUD';
import { scramble } from '../lib/scramble';
import { glitchPulse } from '../lib/glitch';
import { toSector, toCoreTemp } from '../lib/util';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function Hero({ ready }) {
  const root = useRef(null);
  const revealed = useRef(false);
  const eyebrowL = useRef(null);
  const eyebrowR = useRef(null);
  const nameRef = useRef(null);
  const coreProgress = useRef(0);

  // Pre-hide before the loader lifts so nothing flashes
  useEffect(() => {
    if (prefersReduced()) return;
    const ctx = gsap.context(() => {
      gsap.set('.hero__line span', { yPercent: 115 });
      gsap.set('.hero__reveal', { y: 24, opacity: 0 });
      gsap.set('.hero__core', { opacity: 0, scale: 0.8 });
      gsap.set('.hero__top > *', { opacity: 0 });
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!ready || !root.current || revealed.current) return;
    revealed.current = true;

    const ctx = gsap.context(() => {
      if (prefersReduced()) {
        gsap.set(['.hero__line span', '.hero__reveal', '.hero__core', '.hero__top > *'], {
          yPercent: 0, y: 0, opacity: 1, scale: 1,
        });
        return;
      }

      const tl = gsap.timeline();
      tl.to('.hero__core', { opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out' });
      tl.to('.hero__top > *', { opacity: 1, duration: 0.5, stagger: 0.08 }, 0.2);
      // masked line reveal of the name — components locking into formation
      tl.to('.hero__line span', { yPercent: 0, duration: 0.95, ease: 'expo.out', stagger: 0.12 }, 0.15);
      // one-shot activation glitch as the name locks
      tl.call(() => glitchPulse(nameRef.current, { duration: 0.28 }), null, '-=0.2');
      tl.to('.hero__reveal', { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.08 }, '-=0.5');

      gsap.to('.hero__hint-arrow', { y: 6, repeat: -1, yoyo: true, duration: 0.9, ease: 'sine.inOut' });

      // decode the eyebrows
      scramble(eyebrowL.current, 'VEETI PERE // DARK-DEV', { duration: 1100, delay: 300 });
      scramble(eyebrowR.current, 'AVAILABLE · 2026 · FINLAND / REMOTE', { duration: 1300, delay: 500 });

      // parallax + mechanical-core transformation on scroll — the core
      // recedes/fragments here in sync with About's frame growing in
      gsap.to('.hero__name', {
        yPercent: 18, opacity: 0.3, ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      });
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          coreProgress.current = self.progress;
        },
      });
    }, root);

    return () => ctx.revert();
  }, [ready]);

  return (
    <section className="hero" id="boot" data-section ref={root}>
      {/* mechanical core */}
      <MechCore className="hero__core" progressRef={coreProgress} />

      <div className="hero__top section-pad">
        <span className="eyebrow" ref={eyebrowL}>VEETI PERE // DARK-DEV</span>
        <span className="eyebrow hero__top-r" ref={eyebrowR}>AVAILABLE · 2026 · FINLAND / REMOTE</span>
      </div>

      <div className="hero__main section-pad">
        <h1 className="hero__name" ref={nameRef}>
          <span className="hero__line"><span>VEETI</span></span>
          <span className="hero__line"><span>PERE</span></span>
        </h1>

        <div className="hero__foot">
          <div className="hero__role hero__reveal">
            Software Engineer <span className="hero__amp">&amp;</span> Entrepreneur
          </div>
          <p className="hero__desc hero__reveal">
            I build fast, scalable digital products, crafted with{' '}
            <span className="hero__hl">precision</span>, <span className="hero__hl">performance</span>, and{' '}
            <span className="hero__hl signal">style</span>. CTO &amp; co-founder of FHATAL.
          </p>
        </div>
      </div>

      <div className="hero__hud" aria-hidden="true">
        <SystemHUD items={[{ label: 'SECTOR', value: toSector(0.05) }, { label: 'CORE', value: toCoreTemp(0.1) }]} />
      </div>

      <AlienGlyph variant="a10" size={20} className="hero__glyph" style={{ position: 'absolute', top: '18%', left: 'calc(var(--gut) + 2px)', zIndex: 2 }} />

      <div className="hero__hint section-pad">
        <span className="eyebrow">SCROLL TO IGNITE</span>
        <span className="hero__hint-arrow">⌄</span>
      </div>
    </section>
  );
}
