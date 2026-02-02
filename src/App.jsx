import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';
import Contact from './components/Contact';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Show loader for 2 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" />}
      </AnimatePresence>

      <div className="relative min-h-screen bg-luxury-black w-full overflow-x-hidden text-luxury-silver selection:bg-ember-orange selection:text-black">
        {/* Ambient Background */}
        <div className="fixed inset-0 z-0 bg-luxury-black">
          {/* Ember Glows */}
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-ember-orange/20 rounded-full blur-[150px] animate-pulse-slow"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-ember-red/20 rounded-full blur-[150px] animate-pulse-slow delay-1000"></div>

          {/* Grain Overlay */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 contrast-150 mix-blend-overlay"></div>
        </div>

        <div className="relative z-10 px-4 md:px-8 max-w-7xl mx-auto">
          <Navbar />
          <Hero />
          <BentoGrid />
          <Contact />
        </div>
      </div>
    </>
  );
}

export default App;
