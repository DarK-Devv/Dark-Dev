import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getLenis } from '../lib/lenis';
import { toHexAddr } from '../lib/util';
import './SideRail.css';

gsap.registerPlugin(ScrollTrigger);

export default function SideRail({ sections, ready }) {
  const [active, setActive] = useState(0);
  const starts = useRef([]);
  const activeRef = useRef(0);

  const railRef = useRef(null);
  const fillRef = useRef(null);
  const pwrRef = useRef(null);
  const addrRef = useRef(null);
  const barRef = useRef(null);

  // measure section starts
  useEffect(() => {
    if (!ready) return;
    function build() {
      starts.current = sections.map((s) => {
        const el = document.getElementById(s.id);
        if (!el) return 0;
        const st = ScrollTrigger.create({ trigger: el, start: 'top top' });
        const v = st.start;
        st.kill();
        return v;
      });
    }
    build();
    ScrollTrigger.addEventListener('refresh', build);
    return () => ScrollTrigger.removeEventListener('refresh', build);
  }, [ready, sections]);

  // drive progress + telemetry
  useEffect(() => {
    if (!ready) return;
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const p = self.progress;
        if (fillRef.current) fillRef.current.style.transform = `scaleY(${p})`;
        if (pwrRef.current) pwrRef.current.textContent = String(Math.round(p * 100)).padStart(3, '0');
        if (addrRef.current) addrRef.current.textContent = toHexAddr(p);
        if (barRef.current) barRef.current.style.width = `${p * 100}%`;

        const px = self.scroll();
        let idx = 0;
        for (let i = 0; i < starts.current.length; i++) if (px >= starts.current[i] - 4) idx = i;
        if (idx !== activeRef.current) {
          activeRef.current = idx;
          setActive(idx);
        }
      },
    });
    return () => st.kill();
  }, [ready]);

  // entrance
  useEffect(() => {
    if (!ready) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.rail', { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out', delay: 0.25 });
      gsap.fromTo('.tele', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.35 });
    });
    return () => ctx.revert();
  }, [ready]);

  const goTo = (id) => {
    const el = document.getElementById(id);
    const lenis = getLenis();
    if (el && lenis) lenis.scrollTo(el, { duration: 1.1 });
    else el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className="rail" ref={railRef} aria-hidden={!ready}>
        <div className="rail__track">
          <div className="rail__fill" ref={fillRef} />
        </div>
        <ul className="rail__list">
          {sections.map((s, i) => (
            <li key={s.id}>
              <button
                className={`rail__node ${i === active ? 'is-active' : ''}`}
                onClick={() => goTo(s.id)}
                title={s.label}
              >
                <span className="rail__dot" />
                <span className="rail__label tc">{s.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="tele" aria-hidden="true">
        <span className="tele__dot" />
        <span className="tele__k tc">PWR</span>
        <span className="tele__bar">
          <span className="tele__bar-fill" ref={barRef} />
        </span>
        <span className="tele__v tc"><span ref={pwrRef}>000</span>%</span>
        <span className="tele__addr tc" ref={addrRef}>0x000000</span>
      </div>
    </>
  );
}
