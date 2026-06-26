import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getLenis } from '../lib/lenis';
import './Navbar.css';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar({ ready }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ready || !ref.current) return;
    const ctx = gsap.context(() => {
      // hidden over the hero, slides in once you start executing
      gsap.set(ref.current, { yPercent: -120 });
      ScrollTrigger.create({
        start: 'top -120',
        end: 'max',
        onToggle: (self) =>
          gsap.to(ref.current, { yPercent: self.isActive ? 0 : -120, duration: 0.45, ease: 'power3.out' }),
      });
    }, ref);
    return () => ctx.revert();
  }, [ready]);

  const toContact = () => {
    const el = document.getElementById('contact');
    const lenis = getLenis();
    if (el && lenis) lenis.scrollTo(el, { duration: 1.1 });
    else el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="nav" ref={ref}>
      <div className="nav__brand">
        Dark<span>-Dev</span>
      </div>
      <button className="nav__cta" onClick={toContact}>
        INITIATE_CONTACT
      </button>
    </nav>
  );
}
