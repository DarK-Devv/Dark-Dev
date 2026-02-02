import { motion } from 'framer-motion';
import { Rocket, Gem, ExternalLink } from 'lucide-react';

const Ventures = () => {
    return (
        <section id="ventures" className="py-20 relative z-10">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 text-right"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Entrepreneurial <span className="text-brand-purple">Mindset</span></h2>
                    <div className="w-20 h-1 bg-brand-cyan ml-auto rounded-full"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* FHATAL */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        whileHover={{ scale: 1.05, rotate: 1 }}
                        className="bg-dark-200/40 backdrop-blur-xl p-8 rounded-3xl border border-white/5 hover:border-brand-purple/50 transition-all shadow-2xl relative group overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                        <div className="relative z-10">
                            <div className="flex items-start justify-between mb-8">
                                <div className="p-4 bg-brand-purple/20 rounded-2xl text-brand-purple ring-1 ring-brand-purple/50">
                                    <Rocket size={32} />
                                </div>
                                <ExternalLink className="text-gray-500 hover:text-white transition-colors cursor-pointer" />
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-2">FHATAL</h3>
                            <p className="text-brand-purple font-mono mb-6 text-sm">Co-Founder</p>
                            <p className="text-gray-300 leading-relaxed mb-8">
                                Helping startups and small businesses get digital tools fast, affordable, and tailored to their vision.
                                Using AI, rapid prototyping, and modern tech to ensure results before commitment.
                            </p>
                            <div className="flex gap-2 flex-wrap">
                                {['Startups', 'Rapid Prototyping', 'AI'].map(tag => (
                                    <span key={tag} className="px-4 py-1.5 bg-white/5 rounded-full text-xs font-bold text-gray-300 border border-white/5">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Crypto Trading */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: 2 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        whileHover={{ scale: 1.05, rotate: -1 }}
                        className="bg-dark-200/40 backdrop-blur-xl p-8 rounded-3xl border border-white/5 hover:border-brand-cyan/50 transition-all shadow-2xl relative group overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                        <div className="relative z-10">
                            <div className="flex items-start justify-between mb-8">
                                <div className="p-4 bg-brand-cyan/20 rounded-2xl text-brand-cyan ring-1 ring-brand-cyan/50">
                                    <Gem size={32} />
                                </div>
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-2">Crypto Trading</h3>
                            <p className="text-brand-cyan font-mono mb-6 text-sm">Investor / Analyst</p>
                            <p className="text-gray-300 leading-relaxed mb-8">
                                Exploring market trends, risk management, and investment strategies.
                                Continuously expanding knowledge in the digital economy and blockchain technologies.
                            </p>
                            <div className="flex gap-2 flex-wrap">
                                {['Blockchain', 'Risk Mgmt', 'Market Analysis'].map(tag => (
                                    <span key={tag} className="px-4 py-1.5 bg-white/5 rounded-full text-xs font-bold text-gray-300 border border-white/5">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Ventures;
