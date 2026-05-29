import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

const D_PATH = "M 22,10 L 22,90 L 50,90 C 82,90 90,73 90,50 C 90,27 82,10 50,10 Z";

const Loader = () => {
    const [phase, setPhase] = useState(0);

    const particles = useMemo(() =>
        Array.from({ length: 28 }, (_, i) => {
            const angle = (i / 28) * Math.PI * 2 + (Math.random() * 0.3 - 0.15);
            const dist = 55 + Math.random() * 70;
            return {
                id: i,
                x: Math.cos(angle) * dist,
                y: Math.sin(angle) * dist,
                size: 1.5 + Math.random() * 3.5,
                color: i % 3 === 0 ? '#FFB627' : i % 3 === 1 ? '#FF6B35' : '#ffffff',
                duration: 0.5 + Math.random() * 0.5,
            };
        }), []
    );

    useEffect(() => {
        const t1 = setTimeout(() => setPhase(1), 1300);
        const t2 = setTimeout(() => setPhase(2), 1900);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ y: '-100%', opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 bg-[#050505] flex flex-col items-center justify-center"
        >
            {/* Ambient background glow — blooms on burst */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                animate={phase >= 1 ? { opacity: [0, 0.7, 0.2] } : { opacity: 0 }}
                transition={{ duration: 0.9 }}
            >
                <div className="w-[700px] h-[700px] rounded-full bg-ember-orange/20 blur-[130px]" />
            </motion.div>

            {/* Burst flash */}
            {phase >= 2 && (
                <motion.div
                    className="absolute inset-0 bg-ember-orange/15 pointer-events-none"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                />
            )}

            {/* Logo container */}
            <div className="relative flex items-center justify-center">

                {/* Corner brackets draw in */}
                {[
                    { t: '-top-10', l: '-left-10', b: 'border-t-2 border-l-2', delay: 0.05 },
                    { t: '-top-10', l: '-right-10', b: 'border-t-2 border-r-2', delay: 0.1 },
                    { t: '-bottom-10', l: '-left-10', b: 'border-b-2 border-l-2', delay: 0.15 },
                    { t: '-bottom-10', l: '-right-10', b: 'border-b-2 border-r-2', delay: 0.2 },
                ].map((br, i) => (
                    <motion.div
                        key={i}
                        className={`absolute ${br.t} ${br.l} w-5 h-5 ${br.b} border-ember-orange/70`}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.25, delay: br.delay }}
                    />
                ))}

                {/* SVG D — draws itself */}
                <motion.svg
                    width="150" height="150" viewBox="0 0 112 100"
                    animate={phase >= 1
                        ? { filter: ['drop-shadow(0 0 25px #FF6B35)', 'drop-shadow(0 0 70px #FF6B35)', 'drop-shadow(0 0 35px #FF6B35)'] }
                        : { filter: 'drop-shadow(0 0 12px rgba(255,107,53,0.4))' }
                    }
                    transition={{ duration: 0.7 }}
                >
                    {/* Glow fill — appears on burst */}
                    <motion.path
                        d={D_PATH}
                        fill="#FF6B35"
                        initial={{ opacity: 0 }}
                        animate={phase >= 1 ? { opacity: [0, 0.2, 0.12] } : { opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    />
                    {/* Animated stroke */}
                    <motion.path
                        d={D_PATH}
                        fill="none"
                        stroke="#FF6B35"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0, opacity: 1 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1], delay: 0.15 }}
                    />
                </motion.svg>

                {/* Particle burst */}
                {phase >= 1 && particles.map((p) => (
                    <motion.div
                        key={p.id}
                        className="absolute rounded-full pointer-events-none"
                        style={{
                            width: p.size,
                            height: p.size,
                            backgroundColor: p.color,
                            top: '50%',
                            left: '50%',
                            marginTop: -p.size / 2,
                            marginLeft: -p.size / 2,
                            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
                        }}
                        initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                        animate={{ x: p.x, y: p.y, opacity: 0, scale: 0 }}
                        transition={{ duration: p.duration, ease: 'easeOut' }}
                    />
                ))}
            </div>

            {/* Bottom scanning bar + label */}
            <motion.div
                className="absolute bottom-[20%] flex flex-col items-center gap-3"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5 }}
            >
                <div className="w-52 h-[1px] bg-white/5 overflow-hidden relative">
                    <motion.div
                        className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-ember-orange to-transparent"
                        initial={{ x: '-100%' }}
                        animate={{ x: '320%' }}
                        transition={{ duration: 1.6, ease: 'easeInOut', delay: 0.3, repeat: Infinity, repeatDelay: 0.2 }}
                    />
                </div>
                <motion.span
                    className="text-[9px] font-mono tracking-[0.55em] text-ember-orange/35"
                    animate={{ opacity: [0.35, 0.7, 0.35] }}
                    transition={{ duration: 2.4, repeat: Infinity }}
                >
                    DARK-DEV
                </motion.span>
            </motion.div>
        </motion.div>
    );
};

export default Loader;
