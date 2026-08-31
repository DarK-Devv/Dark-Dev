import { useCallback, useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Stack from './components/Stack';
import Experience from './components/Experience';
import Fhatal from './components/Fhatal';
import Contact from './components/Contact';
import SideRail from './components/SideRail';
import TargetCursor from './components/mech/TargetCursor';
import SectionTransition from './components/mech/SectionTransition';
import { SpeedInsights } from '@vercel/speed-insights/react';

import { setLenis, getLenis } from './lib/lenis';
import './components/sections.css';

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
  { id: 'boot', label: 'BOOT' },
  { id: 'whoami', label: 'WHOAMI' },
  { id: 'stack', label: 'STACK' },
  { id: 'runtime', label: 'RUNTIME' },
  { id: 'fhatal', label: 'FHATAL' },
  { id: 'contact', label: 'CONTACT' },
];

function App() {
  const [loaded, setLoaded] = useState(false);

  // Smooth scroll + GSAP sync
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });
    setLenis(lenis);
    lenis.stop(); // hold until the loader finishes

    lenis.on('scroll', ScrollTrigger.update);
    const ticker = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    document.body.setAttribute('data-loading', 'true');

    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  const onLoaderDone = useCallback(() => {
    setLoaded(true);
    document.body.setAttribute('data-loading', 'false');
    getLenis()?.start();

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      requestAnimationFrame(() => ScrollTrigger.refresh());
    });
  }, []);

  // Safety net: GSAP's RAF ticker pauses in background tabs, which would
  // freeze the loader. setTimeout still fires when hidden, so guarantee the
  // site becomes reachable regardless of the loader animation completing.
  useEffect(() => {
    const t = setTimeout(() => {
      if (!loaded) onLoaderDone();
    }, 8000);
    return () => clearTimeout(t);
  }, [loaded, onLoaderDone]);

  // Keep measurements honest once webfonts swap in / on resize
  useEffect(() => {
    if (!loaded) return;
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [loaded]);

  return (
    <>
      {!loaded && <Loader onDone={onLoaderDone} />}

      <div className="relative min-h-screen w-full overflow-x-hidden bg-void text-steel">
        {/* Ambient background — dark gunmetal canvas, energy kept sparse */}
        <div className="fixed inset-0 z-0 pointer-events-none bg-void">
          <div className="absolute inset-0 bg-tech-grid opacity-40" />
          <div className="absolute top-[-15%] left-[-10%] w-[40%] h-[40%] bg-signal/[0.06] rounded-full blur-[160px]" />
          <div className="absolute bottom-[-15%] right-[-10%] w-[40%] h-[40%] bg-alert/[0.04] rounded-full blur-[160px]" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay" />
        </div>

        <div className="relative z-10">
          <Navbar ready={loaded} />
          <main>
            <Hero ready={loaded} />
            <About />
            <SectionTransition title="IDENTIFICATION SEQUENCE INITIATED" subtitle="PROFILE SCAN // SUBJECT: VEETI PERE" targetPct={100} />
            <Stack />
            <Experience />
            <SectionTransition title="SYSTEM ANALYSIS" subtitle="COMPILING VENTURE DATA // SYSTEM 01" targetPct={100} />
            <Fhatal />
            <Contact />
          </main>
        </div>

        <SideRail sections={SECTIONS} ready={loaded} />
        <TargetCursor />
      </div>

      <SpeedInsights />
    </>
  );
}

export default App;
