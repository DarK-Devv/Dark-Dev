import { motion } from 'framer-motion';
import { Mail, ArrowRight } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="py-24 bg-luxury-black relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-ember-orange/5 to-transparent pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-6xl font-serif font-bold mb-8 text-white"
                    >
                        Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-ember-orange via-ember-glow to-ember-core">Connect</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-stone-400 mb-12 font-light max-w-2xl mx-auto"
                    >
                        Looking for a proactive, tech-savvy professional with a keen eye for innovation?
                        I'm always ready to tackle new challenges.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col md:flex-row items-center justify-center gap-8"
                    >
                        <a href="mailto:veeti.pere@example.com" className="group flex items-center gap-3 bg-ember-orange hover:bg-white text-black px-10 py-4 rounded-sm font-bold text-sm tracking-widest transition-all duration-300 shadow-[0_0_20px_-5px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.5)]">
                            <Mail className="group-hover:rotate-12 transition-transform" />
                            <span>GET IN TOUCH</span>
                        </a>

                        <a href="#" className="group flex items-center gap-2 text-ember-orange/70 hover:text-ember-orange transition-colors font-sans text-sm tracking-widest border-b border-transparent hover:border-ember-orange pb-1">
                            <span>VIEW RESUME</span>
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                    </motion.div>
                </div>
            </div>

            <footer className="mt-24 border-t border-ember-orange/10 py-8 text-center text-stone-500 text-xs font-mono uppercase tracking-widest">
                <p>&copy; {new Date().getFullYear()} Veeti Pere / Dark-Dev. All rights reserved.</p>
            </footer>
        </section>
    );
};

export default Contact;
