import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building2, Users, Gem } from 'lucide-react';
import { useReveal } from '../lib/useReveal';

gsap.registerPlugin(ScrollTrigger);

const ROLES = [
  {
    icon: Building2,
    pid: 'PID 0001',
    title: 'Service Desk Specialist',
    org: 'Euroclear',
    tag: '4 YRS',
    desc: 'Refined problem-solving, customer interaction, and technical skills while keeping top-tier professionalism in a fast-paced financial environment.',
  },
  {
    icon: Users,
    pid: 'PID 0002',
    title: 'Scrum Master & Team Player',
    org: 'Leadership & Collaboration',
    tag: 'AGILE',
    desc: 'Organized, cooperative, and results-oriented. Known for a calm, solution-driven approach — reliability and continuous learning on every team.',
  },
  {
    icon: Gem,
    pid: 'PID 0003',
    title: 'Crypto Trader & Analyst',
    org: 'Digital Markets',
    tag: 'INVESTOR',
    desc: 'Exploring market trends, risk management, and investment strategies — always expanding my edge in the digital economy.',
  },
];

export default function Experience() {
  const ref = useRef(null);
  const yearsRef = useRef(null);
  useReveal(ref);

  // count-up on enter
  useEffect(() => {
    if (!yearsRef.current) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      yearsRef.current.textContent = '04';
      return;
    }
    const obj = { v: 0 };
    const st = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 70%',
      once: true,
      onEnter: () =>
        gsap.to(obj, {
          v: 4,
          duration: 1.4,
          ease: 'power2.out',
          onUpdate: () => {
            if (yearsRef.current) yearsRef.current.textContent = String(Math.round(obj.v)).padStart(2, '0');
          },
        }),
    });
    return () => st.kill();
  }, []);

  return (
    <section className="sec section-pad" id="runtime" data-section ref={ref}>
      <div className="sec__head">
        <div className="sec__head-l">
          <span className="sec__index" data-reveal>
            03
          </span>
          <h2 className="sec__title" data-reveal>
            RUN<em>_</em>TIME
          </h2>
        </div>
        <p className="sec__note" data-reveal>
          The processes running in the background — roles, teams, and markets.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10 lg:gap-16 items-start">
        {/* headline stat */}
        <div className="lg:sticky lg:top-24" data-reveal>
          <div className="flex items-end gap-3">
            <span ref={yearsRef} className="font-display font-bold text-ember-orange text-7xl md:text-8xl leading-none">
              00
            </span>
            <span className="font-display font-bold text-white text-7xl md:text-8xl leading-none">+</span>
          </div>
          <p className="mt-4 font-mono text-xs tracking-widest text-stone-400 uppercase">
            years shipping in production
          </p>
        </div>

        {/* role log */}
        <div className="flex flex-col">
          {ROLES.map((r) => {
            const Icon = r.icon;
            return (
              <div
                key={r.pid}
                data-reveal
                className="group grid grid-cols-[auto_1fr] gap-5 md:gap-8 py-8 border-t border-white/10 first:border-t-0"
              >
                <div className="w-12 h-12 shrink-0 grid place-items-center text-ember-orange border border-ember-orange/25 bg-ember-orange/5 group-hover:bg-ember-orange/10 transition-colors">
                  <Icon size={22} />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="font-mono text-[10px] tracking-widest text-ember-orange/60">{r.pid}</span>
                    <span className="font-mono text-[10px] tracking-widest text-ember-glow px-2 py-0.5 border border-ember-orange/20">
                      {r.tag}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-2xl md:text-3xl text-white tracking-tight">
                    {r.title}
                  </h3>
                  <p className="font-mono text-xs tracking-widest text-stone-500 uppercase mt-1 mb-4">{r.org}</p>
                  <p className="text-stone-400 leading-relaxed font-light max-w-2xl">{r.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
