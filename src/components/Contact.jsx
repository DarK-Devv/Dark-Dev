import { useRef } from 'react';
import { Mail, Github, Globe, Linkedin } from 'lucide-react';
import { useReveal } from '../lib/useReveal';

const getEmail = () => 'moc.liamg@erep.iteev'.split('').reverse().join('');

const SOCIALS = [
  { icon: Github, href: 'https://github.com/DarK-Devv', label: 'GitHub' },
  { icon: Globe, href: 'https://fhatal.com', label: 'FHATAL' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/veetipere/', label: 'LinkedIn' },
];

export default function Contact() {
  const ref = useRef(null);
  useReveal(ref);

  const onEmail = (e) => {
    e.preventDefault();
    window.location.href = `mailto:${getEmail()}`;
  };

  return (
    <section className="sec section-pad" id="contact" data-section ref={ref}>
      <div className="sec__head">
        <div className="sec__head-l">
          <span className="sec__index" data-reveal>
            05
          </span>
          <h2 className="sec__title" data-reveal>
            LET'S <em>CONNECT</em>
          </h2>
        </div>
        <p className="sec__note" data-reveal>
          Looking for a proactive, tech-savvy engineer who ships? I'm always ready for the next challenge.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-6">
        <div className="tcard flex flex-col justify-between gap-10" data-reveal>
          <span className="tcard__corner tl" />
          <span className="tcard__corner br" />
          <p className="font-display font-bold text-3xl md:text-5xl text-white leading-tight tracking-tight">
            Let's build something <span className="text-ember-orange">worth shipping.</span>
          </p>
          <a
            href="#"
            onClick={onEmail}
            className="group inline-flex items-center gap-3 self-start bg-ember-orange hover:bg-white text-black px-8 py-4 font-mono text-xs font-bold tracking-widest transition-colors duration-300"
          >
            <Mail size={18} className="group-hover:rotate-12 transition-transform" />
            GET IN TOUCH
          </a>
        </div>

        <div className="tcard flex flex-col justify-center gap-1" data-reveal>
          <span className="tcard__corner tl" />
          <p className="font-mono text-[10px] uppercase tracking-widest text-ember-orange/60 mb-4">&gt; links</p>
          {SOCIALS.map((s) => {
            const Icon = s.icon;
            return (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 py-4 border-b border-white/5 last:border-0 hover:px-2 transition-all duration-300"
              >
                <span className="flex items-center gap-3">
                  <Icon size={18} className="text-ember-orange/60 group-hover:text-ember-orange transition-colors" />
                  <span className="font-mono text-sm text-stone-300 group-hover:text-white transition-colors">
                    {s.label}
                  </span>
                </span>
                <span className="font-mono text-ember-orange/40 group-hover:text-ember-orange transition-colors">↗</span>
              </a>
            );
          })}
        </div>
      </div>

      <footer className="mt-20 pt-8 pb-[calc(var(--rail-h)+24px)] border-t border-ember-orange/10 flex flex-col md:flex-row items-center justify-between gap-4 text-center">
        <p className="font-mono text-[11px] uppercase tracking-widest text-stone-500">
          &copy; {new Date().getFullYear()} Veeti Pere / Dark-Dev
        </p>
        <p className="font-mono text-[11px] uppercase tracking-widest text-stone-600">
          built in the runtime · react · gsap · lenis
        </p>
      </footer>
    </section>
  );
}
