import { motion } from 'framer-motion';
import { Building2, Users } from 'lucide-react';

const Experience = () => {
    return (
        <section id="experience" className="py-20 bg-dark relative">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Professional <span className="text-brand-cyan">Experience</span></h2>
                    <div className="w-20 h-1 bg-brand-purple rounded-full"></div>
                </motion.div>

                <div className="space-y-12">
                    {/* Euroclear */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col md:flex-row gap-8 border-l-2 border-brand-purple/30 pl-8 relative"
                    >
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-brand-purple shadow-[0_0_10px_rgba(139,92,246,0.5)]"></div>
                        <div className="min-w-[200px]">
                            <span className="text-brand-cyan font-mono text-sm">3 Years</span>
                            <h3 className="text-xl font-bold text-white mt-1">Service Desk Specialist</h3>
                            <div className="flex items-center gap-2 text-gray-400 mt-1">
                                <Building2 size={16} />
                                <span>Euroclear</span>
                            </div>
                        </div>
                        <div className="max-w-2xl">
                            <p className="text-gray-300 leading-relaxed">
                                Refined skills in problem-solving, customer interactions, and technical expertise while maintaining top-tier professionalism in a fast-paced environment. Gained hands-on experience in web development and project coordination.
                            </p>
                        </div>
                    </motion.div>

                    {/* Collaboration */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col md:flex-row gap-8 border-l-2 border-brand-blue/30 pl-8 relative"
                    >
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-brand-blue shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                        <div className="min-w-[200px]">
                            <h3 className="text-xl font-bold text-white mt-1">Collaboration & Leadership</h3>
                            <div className="flex items-center gap-2 text-gray-400 mt-1">
                                <Users size={16} />
                                <span>Team Player</span>
                            </div>
                        </div>
                        <div className="max-w-2xl">
                            <p className="text-gray-300 leading-relaxed">
                                Experience as a Scrum Master aligning with an organized, cooperative, and results-oriented mindset. Known for a calm and solution-driven approach, bringing reliability and adaptability to every team.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
