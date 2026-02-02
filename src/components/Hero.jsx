import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import darkImg from '../assets/dark.png';

const GlitchText = ({ text }) => {
    return (
        <div className="relative inline-block group">
            <span className="relative z-10">{text}</span>
            <span className="absolute top-0 left-0 -z-10 w-full h-full text-ember-orange opacity-0 group-hover:opacity-70 animate-pulse translate-x-[2px]">{text}</span>
            <span className="absolute top-0 left-0 -z-10 w-full h-full text-white opacity-0 group-hover:opacity-70 animate-pulse delay-75 -translate-x-[2px]">{text}</span>
        </div>
    );
};

const Typewriter = ({ text, delay = 0 }) => {
    const [displayText, setDisplayText] = useState('');

    useEffect(() => {
        let currentText = '';
        let currentIndex = 0;

        const timeout = setTimeout(() => {
            const interval = setInterval(() => {
                if (currentIndex < text.length) {
                    currentText += text[currentIndex];
                    setDisplayText(currentText);
                    currentIndex++;
                } else {
                    clearInterval(interval);
                }
            }, 50);
            return () => clearInterval(interval);
        }, delay);

        return () => clearTimeout(timeout);
    }, [text, delay]);

    return <span>{displayText}</span>;
}

const Hero = () => {
    return (
        <section className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden py-32 md:py-40">

            <div className="container mx-auto px-6 z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-left order-2 lg:order-1"
                >
                    <div className="inline-block px-3 py-1 mb-6 border border-ember-orange/30 rounded-full bg-ember-orange/5 backdrop-blur-md">
                        <span className="text-ember-orange text-sm font-mono tracking-wider">
                            <Typewriter text="> SYSTEM.READY" />
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter leading-none font-sans">
                        <GlitchText text="VEETI" /> <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-ember-orange via-ember-glow to-ember-orange animate-ember-pulse">PERE</span>
                    </h1>

                    <div className="text-2xl md:text-4xl font-bold text-gray-400 mb-8 tracking-tight font-mono flex items-center gap-4">
                        <span className="text-ember-glow animate-pulse">_</span>
                        <span className="text-ember-orange">DARK-DEV</span>
                    </div>

                    <p className="text-gray-400 text-lg md:text-xl max-w-xl leading-relaxed mb-10 font-light">
                        ICT Engineer & Entrepreneur crafting digital experiences with <br className="hidden md:block" />
                        <span className="text-white font-medium">precision</span>, <span className="text-white font-medium">performance</span>, and <span className="text-ember-orange font-medium">style</span>.
                    </p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <a href="#ventures" className="group relative px-8 py-4 bg-ember-orange text-white font-bold text-lg rounded-sm overflow-hidden transition-all hover:scale-105 active:scale-95 inline-block shadow-[0_0_30px_-5px_rgba(255,107,53,0.5)] hover:shadow-[0_0_50px_-2px_rgba(255,107,53,0.8)] animate-glow">
                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-ember-glow/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <span className="relative z-10 flex items-center gap-2 justify-center tracking-wide">
                                VIEW PROJECTS <ArrowRight size={20} />
                            </span>
                        </a>

                        <a href="#contact" className="px-8 py-4 border border-ember-orange/30 hover:bg-ember-orange/10 text-luxury-silver hover:text-ember-orange font-medium text-lg rounded-sm transition-all backdrop-blur-sm inline-block text-center tracking-wide">
                            CONTACT ME
                        </a>
                    </motion.div>
                </motion.div>

                {/* Image / Visuals */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: 50 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="order-1 lg:order-2 flex justify-center relative"
                >
                    <div className="relative w-64 h-64 md:w-[380px] md:h-[380px]">
                        {/* Glowing Orbs behind */}
                        <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-ember-orange/15 rounded-full blur-[80px] animate-pulse-slow"></div>
                        <div className="absolute bottom-0 left-0 w-3/4 h-3/4 bg-ember-red/10 rounded-full blur-[80px] animate-pulse-slow delay-1000"></div>

                        {/* Main Image Container */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                            className="relative z-10 w-full h-full rounded-full border border-ember-orange/20 bg-dark-200/50 backdrop-blur-sm overflow-hidden p-2 ring-1 ring-ember-orange/10 shadow-2xl shadow-ember-orange/10 grayscale hover:grayscale-0 transition-all duration-700"
                        >
                            <div className="w-full h-full rounded-full overflow-hidden relative">
                                <img
                                    src={darkImg}
                                    alt="Veeti Pere"
                                    className="w-full h-full object-cover scale-110"
                                />
                                {/* Scanline overlay */}
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(212,175,55,0.03),rgba(255,255,255,0.02),rgba(212,175,55,0.03))] z-20 bg-[length:100%_2px,3px_100%] pointer-events-none mix-blend-overlay"></div>
                            </div>
                        </motion.div>

                        {/* Floating Elements */}
                        <motion.div
                            animate={{ y: [0, 30, 0], rotate: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
                            className="absolute -right-4 top-1/4 bg-black/80 backdrop-blur-md p-4 rounded-sm border-l-2 border-ember-orange shadow-xl z-20 hidden md:block"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                                <span className="text-xs font-mono text-ember-orange tracking-widest">ONLINE</span>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

            </div>

            {/* Decorative Grid Lines */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-ember-orange/10 to-transparent"></div>
                <div className="absolute left-1/2 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-ember-orange/10 to-transparent"></div>
            </div>

        </section>
    );
};

export default Hero;
