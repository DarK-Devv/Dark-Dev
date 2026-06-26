import { useRef } from 'react';
import { Terminal, Building2, Workflow, Sparkles, Compass } from 'lucide-react';
import { useReveal } from '../lib/useReveal';
import darkImg from '../assets/dark.png';
import './About.css';

const FACTS = [
  { k: 'role', v: 'Software Engineer' },
  { k: 'background', v: 'ICT Engineering' },
  { k: 'company', v: '4 yrs @ Euroclear' },
  { k: 'venture', v: 'CTO · FHATAL' },
  { k: 'side', v: 'Crypto Trader / Analyst' },
];

// Service Desk @ Euroclear — what it built
const STRENGTHS = [
  'Technical troubleshooting',
  'Customer support',
  'Problem-solving under pressure',
  'IT service processes',
  'Clear communication',
  'Business-critical situations',
];

const ALSO = ['Web development', 'Video editing', 'Digital marketing', 'Project coordination', 'Client work', 'Entrepreneurship'];

const FOCUS = [
  'SaaS products',
  'AI-assisted workflows',
  'Automation',
  'Web applications',
  'Product strategy',
  'Digital business systems',
  'Modern websites',
  'User-focused tools',
  'Scalable browser-based software',
];

const VALUES = [
  'Clear communication',
  'Transparency',
  'Reliable delivery',
  'Practical decision-making',
  'Honest feedback',
  'Long-term thinking',
];

const INTERESTS = ['Crypto & trading', 'Digital economies', 'Gaming', 'Business development', 'New technologies', 'AI tools', 'Product ideas'];

export default function About() {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <section className="sec section-pad" id="whoami" data-section ref={ref}>
      <div className="sec__head">
        <div className="sec__head-l">
          <span className="sec__index" data-reveal>
            01
          </span>
          <h2 className="sec__title" data-reveal>
            WHO<em>_</em>AM_I
          </h2>
        </div>
        <p className="sec__note" data-reveal>
          A goal-driven engineer and digital builder — turning ideas into clean, scalable, business-driven products.
        </p>
      </div>

      {/* Row 1 — intro + monitor */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6">
        <div className="tcard" data-reveal>
          <span className="tcard__corner tl" />
          <span className="tcard__corner br" />
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 grid place-items-center text-ember-orange border border-ember-orange/30 bg-ember-orange/5">
              <Terminal size={18} />
            </div>
            <span className="font-mono text-xs tracking-widest text-ember-orange/70">~/veeti — bash</span>
          </div>

          <p className="font-mono text-base md:text-lg leading-relaxed text-stone-300">
            <span className="text-ember-glow">const</span> <span className="text-white">developer</span> ={' '}
            <span className="text-ember-orange">"Veeti Pere"</span>;{' '}
            <span className="text-stone-500">// aka DarK-Devs</span>
          </p>

          <p className="mt-5 text-stone-300 leading-relaxed font-light max-w-2xl">
            Hey there 👋 I'm Veeti — a <span className="text-white font-medium">Software Engineer</span>,{' '}
            <span className="text-white font-medium">CTO &amp; Co-Founder of FHATAL</span>, and a digital builder focused
            on modern, scalable, and practical web-based solutions.
          </p>
          <p className="mt-4 text-stone-400 leading-relaxed font-light max-w-2xl">
            My background is in <span className="text-white">ICT Engineering</span>, specializing in Software
            Engineering. Over time that foundation has grown into a broader focus on{' '}
            <span className="text-ember-orange">SaaS platforms</span>, web applications, automation, AI-assisted
            workflows, product thinking, and digital business development.
          </p>

          <div className="mt-7 border-l-2 border-ember-orange/50 pl-5">
            <p className="text-[10px] font-mono uppercase tracking-widest text-ember-glow mb-2">&gt; origin_story</p>
            <p className="text-stone-400 text-sm leading-relaxed font-light italic">
              My interest in tech started young. After my computer crashed from viruses, my father said:{' '}
              <span className="text-white not-italic">
                "You should learn to do something other than just play on the computer."
              </span>{' '}
              That comment guided me toward a deeper understanding of technology — and I've been building ever since. 🚀
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="about__monitor" data-reveal>
            <div className="about__monitor-bar">
              <span className="about__monitor-rec" />
              <span className="tc">CAM_01 — VEETI.PERE</span>
              <span className="tc about__monitor-live">LIVE</span>
            </div>
            <div className="about__monitor-img">
              <img src={darkImg} alt="Veeti Pere" />
              <span className="about__monitor-scan" />
            </div>
          </div>

          <div className="tcard flex flex-col justify-center gap-1" data-reveal>
            <span className="tcard__corner tl" />
            <span className="tcard__corner br" />
            <p className="text-[10px] font-mono uppercase tracking-widest text-ember-orange/60 mb-4">
              &gt; whoami --json
            </p>
            {FACTS.map((f) => (
              <div
                key={f.k}
                className="flex items-baseline justify-between gap-4 py-3 border-b border-white/5 last:border-0"
              >
                <span className="font-mono text-xs text-ember-orange/70">{f.k}</span>
                <span className="font-mono text-sm text-white text-right">{f.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2 — professional background + how I work */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="tcard" data-reveal>
          <span className="tcard__corner tl" />
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 grid place-items-center text-ember-orange border border-ember-orange/25 bg-ember-orange/5">
              <Building2 size={16} />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-ember-orange/70">
              &gt; professional_background
            </span>
          </div>
          <p className="text-stone-300 leading-relaxed font-light">
            <span className="text-white font-medium">4 years</span> as a Service Desk Specialist at{' '}
            <span className="text-white font-medium">Euroclear</span> — where reliability, structure, and calm
            decision-making matter under pressure. It sharpened:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 mt-4">
            {STRENGTHS.map((s) => (
              <div key={s} className="flex items-center gap-2 font-mono text-xs text-stone-400">
                <span className="text-ember-orange shrink-0">::</span>
                {s}
              </div>
            ))}
          </div>
          <p className="mt-6 text-stone-500 text-sm font-light leading-relaxed">
            Alongside that, I've built experience across:
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {ALSO.map((a) => (
              <span key={a} className="about__chip">
                {a}
              </span>
            ))}
          </div>
        </div>

        <div className="tcard" data-reveal>
          <span className="tcard__corner tl" />
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 grid place-items-center text-ember-orange border border-ember-orange/25 bg-ember-orange/5">
              <Workflow size={16} />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-ember-orange/70">&gt; how_i_work</span>
          </div>
          <p className="text-stone-300 leading-relaxed font-light">
            Calm, cooperative, and solution-oriented — whether I'm leading technical direction, working with clients, or
            building with a team. What I value:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 mt-4">
            {VALUES.map((v) => (
              <div key={v} className="flex items-center gap-2 font-mono text-xs text-stone-400">
                <span className="text-ember-orange shrink-0">::</span>
                {v}
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm font-light leading-relaxed text-stone-400 border-l-2 border-ember-orange/40 pl-4">
            I believe good technology should make work <span className="text-white">easier</span>, not more complicated.
          </p>
        </div>
      </div>

      {/* Row 3 — focus + interests */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 mt-6">
        <div className="tcard" data-reveal>
          <span className="tcard__corner tl" />
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 grid place-items-center text-ember-orange border border-ember-orange/25 bg-ember-orange/5">
              <Sparkles size={16} />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-ember-orange/70">&gt; focused_on</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {FOCUS.map((f) => (
              <span key={f} className="about__chip">
                {f}
              </span>
            ))}
          </div>
        </div>

        <div className="tcard" data-reveal>
          <span className="tcard__corner tl" />
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 grid place-items-center text-ember-orange border border-ember-orange/25 bg-ember-orange/5">
              <Compass size={16} />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-ember-orange/70">&gt; interests</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {INTERESTS.map((i) => (
              <span key={i} className="about__chip">
                {i}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
