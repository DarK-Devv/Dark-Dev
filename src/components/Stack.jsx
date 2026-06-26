import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Stack.css';

gsap.registerPlugin(ScrollTrigger);

const REELS = [
  {
    key: 'FRONTEND',
    n: '01',
    items: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Vite', 'Tailwind', 'Three.js', 'Framer'],
  },
  {
    key: 'BACKEND',
    n: '02',
    items: ['Node.js', 'Express', 'Java', 'Python', 'SQL', 'PostgreSQL', 'Supabase', 'MongoDB', 'Firebase', 'REST API'],
  },
  {
    key: 'DEVOPS',
    n: '03',
    items: ['Docker', 'AWS', 'Linux', 'Nginx', 'Vercel', 'Git', 'CI/CD'],
  },
];

export default function Stack() {
  const secRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || window.innerWidth < 860) return; // fall back to native horizontal scroll

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: secRef.current,
          start: 'top top',
          end: () => '+=' + (track.scrollWidth - window.innerWidth),
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, secRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="stack" id="stack" data-section ref={secRef}>
      <div className="stack__inner">
        <div className="stack__head section-pad">
          <div className="sec__head-l">
            <span className="sec__index">02</span>
            <h2 className="sec__title">
              TECH<em>_</em>STACK
            </h2>
          </div>
          <p className="sec__note">The toolchain I reach for — scroll to traverse the stack.</p>
        </div>

        <div className="stack__track" ref={trackRef}>
          {REELS.map((r) => (
            <div className="reel" key={r.key}>
              <div className="reel__bar">
                <span className="reel__n tc">{r.n}</span>
                <span className="reel__title">{r.key}</span>
                <span className="reel__count tc">{r.items.length} tools</span>
              </div>
              <div className="reel__items">
                {r.items.map((it) => (
                  <span className="reel__chip" key={it}>
                    {it}
                  </span>
                ))}
              </div>
            </div>
          ))}
          <div className="reel reel--end">
            <p className="reel__end-k tc">&gt; status</p>
            <p className="reel__end-v">
              ALWAYS
              <br />
              LEARNING
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
