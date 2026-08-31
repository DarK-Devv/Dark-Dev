import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Rocket, ExternalLink } from 'lucide-react';
import { useMechReveal } from '../lib/mechReveal';
import SystemModule from './mech/SystemModule';
import AlienGlyph from './mech/AlienGlyph';
import SystemHUD from './mech/SystemHUD';
import SystemStatus from './mech/SystemStatus';
import { toSector, toCoreTemp } from '../lib/util';

gsap.registerPlugin(ScrollTrigger);

const BUILD = [
  'SaaS Platforms',
  'Web Applications',
  'AI-Powered Tools',
  'Automation',
  'Responsive Sites',
  'Digital Workflows',
  'Brand Experiences',
  'Cloud Services',
];

const SERVICES = [
  { t: 'Web Applications', d: 'Modern, scalable apps with Next.js, React & Node.js. Fast, secure, easy to use.', tags: ['Next.js & React', 'API integrations', 'Secure'] },
  { t: 'AI Solutions', d: 'AI integrations, ML, and intelligent automation that give you a competitive edge.', tags: ['AI integrations', 'Automation', 'Data analysis'] },
  { t: 'UX/UI Design', d: 'User-centric design at the core. Intuitive experiences that work on every device.', tags: ['Prototypes', 'Design systems', 'Accessibility'] },
  { t: 'Brand Identity', d: 'A strong visual identity sets you apart, from logos to a unified brand system.', tags: ['Logo design', 'Visual identity', 'Brand guides'] },
  { t: 'Analytics & SEO', d: 'Improve search visibility and track success with real analytics.', tags: ['SEO', 'Analytics', 'Performance'] },
  { t: 'Cloud Services', d: 'Deployment and scale on AWS, Vercel & Azure with CI/CD pipelines.', tags: ['CI/CD', 'Scalability', 'Hosting'] },
];

export default function Fhatal() {
  const ref = useRef(null);
  const pinRef = useRef(null);
  useMechReveal(ref);

  // flagship "SYSTEM 01" construction sequence: while pinned, the hero
  // card's own pieces fly in and lock — icon, wordmark, tag, description,
  // then the build-list panel slides into place. Mirrors Stack.jsx's own
  // pin+scrub precedent; abandoned below 860px in favor of a plain
  // staggered reveal, same "when do we abandon pinning" rule as Stack.
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || window.innerWidth < 860 || !pinRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(['.fh__icon', '.fh__word', '.fh__tag', '.fh__desc', '.fh__build'], { willChange: 'transform, opacity' });

      gsap.timeline({
        scrollTrigger: { trigger: pinRef.current, start: 'top top', end: '+=90%', pin: true, scrub: 1 },
      })
        .fromTo('.fh__icon', { opacity: 0, scale: 0.4, rotate: -35 }, { opacity: 1, scale: 1, rotate: 0, ease: 'power2.out' }, 0)
        .fromTo('.fh__word', { yPercent: 115 }, { yPercent: 0, ease: 'power3.out' }, 0.08)
        .fromTo('.fh__tag', { opacity: 0, x: -24 }, { opacity: 1, x: 0, ease: 'power2.out' }, 0.22)
        .fromTo('.fh__desc', { opacity: 0, y: 22 }, { opacity: 1, y: 0, ease: 'power2.out' }, 0.32)
        .fromTo(
          '.fh__build',
          { opacity: 0, x: 48, clipPath: 'inset(0 0 0 100%)' },
          { opacity: 1, x: 0, clipPath: 'inset(0 0 0 0%)', ease: 'power2.out' },
          0.3
        );
    }, pinRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="sec section-pad" id="fhatal" data-section ref={ref}>
      <div className="sec__head">
        <div className="sec__head-l">
          <AlienGlyph variant="a2" size={16} className="text-signal-bright/50 hidden sm:block" />
          <span className="sec__index" data-reveal>
            04
          </span>
          <h2 className="sec__title" data-reveal>
            THE <em>VENTURE</em>
          </h2>
        </div>
        <div className="flex flex-col items-end gap-3">
          <p className="sec__note text-right" data-reveal>
            A modern software house building fast, scalable, user-centric products.
          </p>
          <SystemHUD className="items-end" items={[{ label: 'SYSTEM', value: '01' }, { label: 'SECTOR', value: toSector(0.55) }, { label: 'CORE', value: toCoreTemp(0.6) }]} />
        </div>
      </div>

      {/* Hero block — pinned assembly sequence */}
      <div ref={pinRef}>
        <div
          className="relative tcard tcard--chamfer overflow-hidden border-l-4 !border-l-signal bg-gradient-to-r from-void-200 via-void-100 to-void-200"
          data-reveal
        >
          <span className="tcard__corner tl" />
          <span className="tcard__corner br" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <div>
              <div className="flex justify-between items-start mb-7">
                <div className="fh__icon p-4 text-signal border border-signal/30 bg-signal/10 animate-power-pulse">
                  <Rocket size={36} />
                </div>
                <a href="https://fhatal.com" target="_blank" rel="noopener noreferrer" aria-label="Visit FHATAL" data-cursor="lock">
                  <ExternalLink size={20} className="text-stone-500 hover:text-signal-bright transition-colors" />
                </a>
              </div>
              <h3 className="font-display font-bold text-5xl md:text-7xl text-white tracking-tighter leading-none overflow-hidden">
                <span className="fh__word inline-block">FHATAL</span>
              </h3>
              <p className="fh__tag font-mono text-xs tracking-widest text-signal-bright mt-3 mb-6 animate-flicker">
                [ CTO &amp; CO-FOUNDER ]
              </p>
              <p className="fh__desc text-stone-300 leading-relaxed">
                Our focus is <span className="text-signal font-medium">SaaS</span> and web-based software:
                accessible in the browser, scalable over time, and easier to maintain than heavy on-prem systems. We use a{' '}
                <span className="text-white font-medium">prototype-first</span> approach: ideas become working products
                fast, then improve on real feedback.
              </p>
            </div>

            <div className="fh__build bg-black/40 border border-white/5 p-7">
              <h4 className="font-mono text-xs tracking-widest text-white mb-5">&gt; WHAT_WE_BUILD</h4>
              <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                {BUILD.map((b) => (
                  <div key={b} className="flex items-center gap-2 font-mono text-xs text-stone-400">
                    <span className="text-signal shrink-0">::</span>
                    {b}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="relative mt-6 overflow-hidden border-y border-white/10 py-4" data-reveal aria-hidden="true">
        <div className="flex w-max animate-marquee whitespace-nowrap will-change-transform">
          {[...BUILD, ...BUILD].map((b, i) => (
            <span key={i} className="mx-6 font-display font-semibold text-2xl text-white/30 uppercase tracking-tight">
              {b} <span className="text-signal/60">/</span>
            </span>
          ))}
        </div>
      </div>

      {/* Sub-modules */}
      <div className="mt-10">
        <div className="flex items-center justify-between mb-6">
          <p className="font-mono text-[10px] uppercase tracking-widest text-signal/60" data-reveal>
            &gt; sub_modules // system_01
          </p>
          <SystemStatus label="FULLY OPERATIONAL" tone="online" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((s, i) => (
            <SystemModule key={s.t} index={i} title={s.t} description={s.d} tags={s.tags} />
          ))}
        </div>
      </div>
    </section>
  );
}
