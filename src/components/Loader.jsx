import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

const ARC_R = 155;
const ARC_CIRC = 2 * Math.PI * ARC_R;

const Loader = () => {
    const [phase, setPhase] = useState(0);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const t1 = setTimeout(() => setPhase(1), 150);
        const t2 = setTimeout(() => setPhase(2), 1700);
        const t3 = setTimeout(() => setPhase(3), 2500);
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, []);

    useEffect(() => {
        let n = 0;
        const id = setInterval(() => {
            n++;
            setCounter(n);
            if (n >= 100) clearInterval(id);
        }, 32);
        return () => clearInterval(id);
    }, []);

    const speedLines = useMemo(() =>
        Array.from({ length: 16 }, (_, i) => ({
            id: i,
            angle: i * 22.5,
            length: 140 + Math.floor(Math.random() * 100),
            delay: (Math.random() * 0.4),
            alpha: 0.25 + Math.random() * 0.45,
        })), []
    );

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.06 }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
            style={{ background: '#050505' }}
        >

            {/* ── Speed lines ── */}
            {phase >= 1 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {speedLines.map((ln) => (
                        <div
                            key={ln.id}
                            className="absolute"
                            style={{
                                left: '50%',
                                top: '50%',
                                transformOrigin: 'left center',
                                transform: `rotate(${ln.angle}deg)`,
                            }}
                        >
                            <motion.div
                                style={{
                                    width: ln.length,
                                    height: 1,
                                    background: `linear-gradient(to right, rgba(255,107,53,${ln.alpha}), transparent)`,
                                    transformOrigin: 'left center',
                                }}
                                initial={{ scaleX: 0, opacity: 0 }}
                                animate={{ scaleX: [0, 1, 0], opacity: [0, 1, 0] }}
                                transition={{
                                    duration: 1.0,
                                    delay: ln.delay,
                                    repeat: Infinity,
                                    repeatDelay: 1.2,
                                    ease: 'easeOut',
                                }}
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* ── Orbital rings ── */}
            {phase >= 1 && (
                <>
                    {/* Outer — slow clockwise */}
                    <motion.div
                        className="absolute rounded-full"
                        style={{
                            width: 290, height: 290,
                            border: '1px solid rgba(255,107,53,0.12)',
                        }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
                    >
                        <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 block w-2 h-2 rounded-full bg-ember-orange/60 shadow-[0_0_8px_#FF6B35]" />
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 block w-1 h-1 rounded-full bg-ember-orange/30" />
                    </motion.div>

                    {/* Middle — medium counter-clockwise */}
                    <motion.div
                        className="absolute rounded-full"
                        style={{
                            width: 210, height: 210,
                            border: '1px solid rgba(255,107,53,0.22)',
                        }}
                        animate={{ rotate: -360 }}
                        transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                    >
                        <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 block w-1.5 h-1.5 rounded-full bg-ember-glow shadow-[0_0_6px_#FFB627]" />
                        <span className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 block w-1 h-1 rounded-full bg-ember-orange/40" />
                    </motion.div>

                    {/* Inner — fast clockwise */}
                    <motion.div
                        className="absolute rounded-full"
                        style={{
                            width: 140, height: 140,
                            border: '1px solid rgba(255,107,53,0.35)',
                        }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                    >
                        <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 block w-2 h-2 rounded-full bg-ember-orange shadow-[0_0_10px_#FF6B35]" />
                    </motion.div>
                </>
            )}

            {/* ── Arc progress (SVG) ── */}
            {phase >= 1 && (
                <svg
                    className="absolute"
                    width="340" height="340"
                    viewBox="0 0 340 340"
                    style={{ transform: 'rotate(-90deg)' }}
                >
                    {/* Track */}
                    <circle
                        cx="170" cy="170" r={ARC_R}
                        fill="none"
                        stroke="rgba(255,107,53,0.07)"
                        strokeWidth="1.5"
                    />
                    {/* Fill */}
                    <motion.circle
                        cx="170" cy="170" r={ARC_R}
                        fill="none"
                        stroke="#FF6B35"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeDasharray={ARC_CIRC}
                        initial={{ strokeDashoffset: ARC_CIRC }}
                        animate={{ strokeDashoffset: 0 }}
                        transition={{ duration: 3.1, ease: [0.4, 0, 0.2, 1] }}
                    />
                </svg>
            )}

            {/* ── Logo — spring bounce ── */}
            {phase >= 2 && (
                <motion.div
                    className="relative z-10 flex items-center justify-center"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 14 }}
                >
                    <div
                        className="absolute w-32 h-32 rounded-full blur-3xl"
                        style={{ background: 'rgba(255,107,53,0.25)' }}
                    />
                    <span
                        className="font-black leading-none select-none relative z-10"
                        style={{
                            fontSize: 128,
                            color: '#FF6B35',
                            textShadow: '0 0 50px rgba(255,107,53,0.9), 0 0 100px rgba(255,107,53,0.4)',
                        }}
                    >
                        D
                    </span>
                </motion.div>
            )}

            {/* ── HUD corners ── */}
            {phase >= 1 && (
                <>
                    <motion.div className="absolute top-8 left-8"
                        initial={{ opacity: 0, x: -12, y: -12 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.05 }}
                    >
                        <div className="w-10 h-10 border-t-2 border-l-2 border-ember-orange/55" />
                        <p className="mt-2 font-mono text-[9px] tracking-widest text-ember-orange/30">SYS::INIT</p>
                    </motion.div>

                    <motion.div className="absolute top-8 right-8 flex flex-col items-end"
                        initial={{ opacity: 0, x: 12, y: -12 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.1 }}
                    >
                        <div className="w-10 h-10 border-t-2 border-r-2 border-ember-orange/55" />
                        <p className="mt-2 font-mono text-[9px] tracking-widest text-ember-orange/30">DARK-DEV</p>
                    </motion.div>

                    <motion.div className="absolute bottom-8 left-8"
                        initial={{ opacity: 0, x: -12, y: 12 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.15 }}
                    >
                        <div className="w-10 h-10 border-b-2 border-l-2 border-ember-orange/55" />
                    </motion.div>

                    <motion.div className="absolute bottom-8 right-8 flex flex-col items-end"
                        initial={{ opacity: 0, x: 12, y: 12 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.2 }}
                    >
                        <div className="w-10 h-10 border-b-2 border-r-2 border-ember-orange/55" />
                        <p className="mt-2 font-mono text-[11px] tabular-nums tracking-widest text-ember-orange/50">
                            {String(counter).padStart(3, '0')}%
                        </p>
                    </motion.div>
                </>
            )}

            {/* ── SYSTEM READY label ── */}
            {phase >= 3 && (
                <motion.p
                    className="absolute bottom-[28%] font-mono text-[10px] tracking-[0.6em] text-ember-orange"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: [0, 1, 1, 0.6] }}
                    transition={{ duration: 0.8, times: [0, 0.25, 0.7, 1] }}
                >
                    SYSTEM_READY
                </motion.p>
            )}

        </motion.div>
    );
};

export default Loader;
