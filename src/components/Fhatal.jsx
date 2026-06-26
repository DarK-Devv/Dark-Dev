import { useRef } from 'react';
import { Rocket, ExternalLink } from 'lucide-react';
import { useReveal } from '../lib/useReveal';

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
  { t: 'UX/UI Design', d: 'User-centric design at the core — intuitive experiences that work on every device.', tags: ['Prototypes', 'Design systems', 'Accessibility'] },
  { t: 'Brand Identity', d: 'A strong visual identity sets you apart — from logos to a unified brand system.', tags: ['Logo design', 'Visual identity', 'Brand guides'] },
  { t: 'Analytics & SEO', d: 'Improve search visibility and track success with real analytics.', tags: ['SEO', 'Analytics', 'Performance'] },
  { t: 'Cloud Services', d: 'Deployment and scale on AWS, Vercel & Azure with CI/CD pipelines.', tags: ['CI/CD', 'Scalability', 'Hosting'] },
];

export default function Fhatal() {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <section className="sec section-pad" id="fhatal" data-section ref={ref}>
      <div className="sec__head">
        <div className="sec__head-l">
          <span className="sec__index" data-reveal>
            04
          </span>
          <h2 className="sec__title" data-reveal>
            THE <em>VENTURE</em>
          </h2>
        </div>
        <p className="sec__note" data-reveal>
          A modern software house building fast, scalable, user-centric products.
        </p>
      </div>

      {/* Hero block */}
      <div
        className="relative tcard overflow-hidden border-l-4 !border-l-ember-orange bg-gradient-to-r from-ember-black via-ember-charcoal to-ember-black"
        data-reveal
      >
        <span className="tcard__corner tl" />
        <span className="tcard__corner br" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div>
            <div className="flex justify-between items-start mb-7">
              <div className="p-4 text-ember-orange border border-ember-orange/30 bg-ember-orange/10 animate-ember-pulse">
                <Rocket size={36} />
              </div>
              <a href="https://fhatal.com" target="_blank" rel="noopener noreferrer" aria-label="Visit FHATAL">
                <ExternalLink size={20} className="text-stone-500 hover:text-ember-glow transition-colors" />
              </a>
            </div>
            <h3 className="font-display font-bold text-5xl md:text-7xl text-white tracking-tighter leading-none">
              FHATAL
            </h3>
            <p className="font-mono text-xs tracking-widest text-ember-glow mt-3 mb-6 animate-flicker">
              [ CTO &amp; CO-FOUNDER ]
            </p>
            <p className="text-stone-300 leading-relaxed">
              Our focus is <span className="text-ember-orange font-medium">SaaS</span> and web-based software —
              accessible in the browser, scalable over time, and easier to maintain than heavy on-prem systems. We use a{' '}
              <span className="text-white font-medium">prototype-first</span> approach: ideas become working products
              fast, then improve on real feedback.
            </p>
          </div>

          <div className="bg-black/40 border border-white/5 p-7">
            <h4 className="font-mono text-xs tracking-widest text-white mb-5">&gt; WHAT_WE_BUILD</h4>
            <div className="grid grid-cols-2 gap-y-2 gap-x-4">
              {BUILD.map((b) => (
                <div key={b} className="flex items-center gap-2 font-mono text-xs text-stone-400">
                  <span className="text-ember-orange shrink-0">::</span>
                  {b}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="relative mt-6 overflow-hidden border-y border-white/10 py-4" data-reveal aria-hidden="true">
        <div className="flex w-max animate-marquee whitespace-nowrap will-change-transform">
          {[...BUILD, ...BUILD].map((b, i) => (
            <span key={i} className="mx-6 font-display font-semibold text-2xl text-white/30 uppercase tracking-tight">
              {b} <span className="text-ember-orange/60">/</span>
            </span>
          ))}
        </div>
      </div>

      {/* Services grid */}
      <div className="mt-10">
        <p className="font-mono text-[10px] uppercase tracking-widest text-ember-orange/60 mb-6" data-reveal>
          &gt; our_services
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((s) => (
            <div key={s.t} data-reveal className="tcard group">
              <span className="tcard__corner tl" />
              <h5 className="font-display font-bold text-lg text-white mb-2">{s.t}</h5>
              <p className="text-stone-500 text-sm leading-relaxed font-light mb-4">{s.d}</p>
              <div className="flex flex-wrap gap-1.5">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 font-mono text-[10px] text-ember-orange/70 border border-ember-orange/15 bg-ember-orange/5"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
