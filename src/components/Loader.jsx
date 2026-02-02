import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loader = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-luxury-black"
        >
            {/* Animated Background Glow */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-ember-orange/20 rounded-full blur-3xl animate-pulse-slow"></div>
            </div>

            {/* Logo Animation */}
            <div className="relative z-10 flex flex-col items-center gap-8">
                {/* Ember "D" with rotation */}
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative"
                >
                    <div className="text-9xl font-black text-ember-orange drop-shadow-[0_0_30px_rgba(255,107,53,0.6)]">
                        D
                    </div>

                    {/* Spinning ring */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 -m-4"
                    >
                        <div className="w-full h-full border-4 border-transparent border-t-ember-orange rounded-full"></div>
                    </motion.div>
                </motion.div>

                {/* Loading text with dots animation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center gap-2"
                >
                    <span className="text-luxury-silver font-mono text-sm tracking-widest">LOADING</span>
                    <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                }}
                                className="w-1 h-1 bg-ember-orange rounded-full"
                            />
                        ))}
                    </div>
                </motion.div>

                {/* Progress bar */}
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5 }}
                    className="w-48 h-0.5 bg-gradient-to-r from-transparent via-ember-orange to-transparent"
                ></motion.div>
            </div>
        </motion.div>
    );
};

export default Loader;
