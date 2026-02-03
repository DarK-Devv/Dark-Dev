import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import {
    Code, Terminal, Brain, Building2, Users, Rocket, Gem, ExternalLink,
    Cpu, Github, Globe, Database, Layout, Server, Wifi
} from 'lucide-react';

const Card = ({ children, className = "", delay = 0 }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay, ease: "easeOut" }}
            onMouseMove={handleMouseMove}
            className={`group relative bg-luxury-charcoal/80 backdrop-blur-xl border border-white/5 rounded-none p-8 overflow-hidden hover:border-ember-orange/40 transition-colors duration-300 ${className}`}
            whileHover={{ y: -2 }}
        >
            {/* Corner Accents (Tech Feel) */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-ember-orange/30 group-hover:border-ember-orange transition-colors"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-ember-orange/30 group-hover:border-ember-orange transition-colors"></div>

            <motion.div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                          650px circle at ${mouseX}px ${mouseY}px,
                          rgba(212, 175, 55, 0.05),
                          transparent 80%
                        )
                    `,
                }}
            />
            <div className="relative z-10 h-full">{children}</div>
        </motion.div>
    );
};

const BentoGrid = () => {
    return (
        <section className="py-32 md:py-40 container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]">

                {/* About - 2 Cols */}
                <div id="about" className="md:col-span-2 contents">
                    <Card className="md:col-span-2 flex flex-col justify-center">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Code size={120} className="text-ember-orange" />
                        </div>
                        <h2 className="text-3xl font-sans font-bold text-white mb-6 flex items-center gap-4">
                            <div className="w-10 h-10 bg-ember-orange/10 flex items-center justify-center text-ember-orange border border-ember-orange/20">
                                <Terminal size={20} />
                            </div>
                            <span className="tracking-tight">WHO_<span className="text-ember-orange">AM</span>_I?</span>
                        </h2>
                        <div className="space-y-6">
                            <p className="text-stone-300 text-lg leading-relaxed max-w-2xl font-light font-mono">
                                <span className="text-ember-glow">const developer</span> = <span className="text-white">"Veeti Pere"</span>;
                                <br /><br />
                                Hey there! 👋 I'm <span className="text-white font-semibold">Veeti Pere</span> (aka DarK-Devs), a goal-driven ICT Engineer with a passion for modern, innovative solutions.
                                I thrive on challenges and love pushing boundaries to create impactful digital experiences.
                            </p>

                            {/* Origin Story */}
                            <div className="bg-ember-charcoal/50 border-l-2 border-ember-orange/50 p-4 rounded-r-sm">
                                <p className="text-xs text-ember-glow font-mono uppercase tracking-widest mb-2">&gt; ORIGIN_STORY</p>
                                <p className="text-stone-400 text-sm leading-relaxed font-light italic">
                                    My interest in technology began at a young age. One memorable moment was when my computer completely crashed from viruses,
                                    and my father said: <span className="text-white not-italic">"You should learn to do something other than just playing on the computer."</span>
                                    <br /><br />
                                    That comment stuck with me and guided my interest towards a deeper understanding of technology.
                                    Now I'm turning that passion into meaningful solutions. 🚀
                                </p>
                            </div>

                            {/* Professional Highlights */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                                <div className="bg-black/30 p-3 border border-white/5 rounded-sm">
                                    <span className="text-ember-orange">💼</span> <span className="text-stone-400">4 years at</span> <span className="text-white font-bold">Euroclear</span>
                                </div>
                                <div className="bg-black/30 p-3 border border-white/5 rounded-sm">
                                    <span className="text-ember-orange">🎓</span> <span className="text-stone-400">ICT Engineering</span> <span className="text-white">Specialist</span>
                                </div>
                                <div className="bg-black/30 p-3 border border-white/5 rounded-sm">
                                    <span className="text-ember-orange">🚀</span> <span className="text-stone-400">Co-Founder</span> <span className="text-white font-bold">FHATAL</span>
                                </div>
                                <div className="bg-black/30 p-3 border border-white/5 rounded-sm">
                                    <span className="text-ember-orange">💎</span> <span className="text-stone-400">Crypto</span> <span className="text-white">Trader & Analyst</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Tech Stack - 1 Col */}
                <Card className="md:col-span-1 bg-gradient-to-br from-luxury-charcoal to-black flex flex-col justify-between">
                    <div>
                        <h3 className="text-xl font-sans font-bold text-white mb-6 flex items-center gap-2">
                            <Cpu size={20} className="text-ember-orange" />
                            <span className="tracking-wide">TECH_<span className="text-ember-glow">STACK</span></span>
                        </h3>

                        <div className="space-y-6">
                            {/* Frontend */}
                            <div>
                                <p className="text-[10px] font-mono uppercase tracking-widest text-ember-orange/60 mb-3">&gt; FRONTEND</p>
                                <div className="flex flex-wrap gap-2">
                                    {['React', 'TypeScript', 'Tailwind', 'Three.js', 'Framer'].map((tech) => (
                                        <span key={tech} className="px-2 py-1 bg-white/5 text-[10px] font-mono text-stone-300 border-l-2 border-ember-orange/20 hover:border-ember-orange transition-colors duration-300">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Backend */}
                            <div>
                                <p className="text-[10px] font-mono uppercase tracking-widest text-ember-orange/60 mb-3">&gt; BACKEND</p>
                                <div className="flex flex-wrap gap-2">
                                    {['Node.js', 'Java', 'Python', 'PostgreSQL', 'MongoDB'].map((tech) => (
                                        <span key={tech} className="px-2 py-1 bg-white/5 text-[10px] font-mono text-stone-300 border-l-2 border-ember-orange/20 hover:border-ember-orange transition-colors duration-300">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* DevOps */}
                            <div>
                                <p className="text-[10px] font-mono uppercase tracking-widest text-ember-orange/60 mb-3">&gt; DEVOPS</p>
                                <div className="flex flex-wrap gap-2">
                                    {['Docker', 'AWS', 'Vercel', 'Git'].map((tech) => (
                                        <span key={tech} className="px-2 py-1 bg-white/5 text-[10px] font-mono text-stone-300 border-l-2 border-ember-orange/20 hover:border-ember-orange transition-colors duration-300">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Experience 1 - 1 Col */}
                <div id="experience" className="md:col-span-1 contents">
                    <Card delay={0.1} className="md:col-span-1">
                        <div className="flex items-center justify-between mb-6">
                            <div className="p-3 bg-ember-orange/5 text-ember-orange border border-ember-orange/20">
                                <Building2 size={24} />
                            </div>
                            <span className="text-[10px] font-mono tracking-widest text-ember-orange px-2 py-1 bg-ember-orange/5 border border-ember-orange/20">3 YRS</span>
                        </div>
                        <h3 className="text-xl font-sans font-bold text-white mb-2">Service Desk <span className="text-ember-orange">Specialist</span></h3>
                        <p className="text-xs font-mono tracking-widest text-luxury-silver uppercase mb-6">Euroclear</p>
                        <p className="text-stone-400 text-sm leading-relaxed font-light">
                            Refined skills in problem-solving, customer interactions, and technical expertise
                            while maintaining top-tier professionalism in a fast-paced financial environment.
                        </p>
                    </Card>
                </div>

                {/* Experience 2 - 1 Col */}
                <Card delay={0.2} className="md:col-span-1">
                    <div className="flex items-center justify-between mb-6">
                        <div className="p-3 bg-ember-orange/5 text-ember-orange border border-ember-orange/20">
                            <Users size={24} />
                        </div>
                    </div>
                    <h3 className="text-xl font-sans font-bold text-white mb-2">Scrum Master & <span className="text-ember-orange">Team Player</span></h3>
                    <p className="text-xs font-mono tracking-widest text-luxury-silver uppercase mb-6">Leadership & Collaboration</p>
                    <p className="text-stone-400 text-sm leading-relaxed font-light">
                        Organized, cooperative, and results-oriented. Known for calm, solution-driven approach.
                        Bringing reliability, adaptability, and continuous learning to every team.
                    </p>
                </Card>

                {/* FHATAL - 3 Cols (Full Width) */}
                <div className="md:col-span-3 contents">
                    <Card id="ventures" delay={0.3} className="md:col-span-3 bg-gradient-to-r from-ember-black via-ember-charcoal to-ember-black border-l-4 border-l-ember-orange shadow-[0_0_30px_-10px_rgba(255,107,53,0.3)] hover:shadow-[0_0_50px_-5px_rgba(255,107,53,0.5)] transition-shadow duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="flex justify-between items-start mb-8">
                                    <div className="p-4 bg-ember-orange/10 text-ember-orange border border-ember-orange/30 animate-ember-pulse">
                                        <Rocket size={40} />
                                    </div>
                                    <a href="https://fhatal.com" target="_blank" rel="noopener noreferrer">
                                        <ExternalLink size={20} className="text-stone-500 hover:text-ember-glow cursor-pointer transition-colors" />
                                    </a>
                                </div>
                                <h3 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter font-sans">
                                    FHATAL
                                </h3>
                                <p className="text-ember-glow font-mono text-xs tracking-widest mb-8 flex items-center gap-3 animate-flicker">
                                    [CO-FOUNDER & TECH LEAD]
                                </p>

                                <div className="space-y-4 text-stone-300 font-light">
                                    <p className="leading-relaxed text-base">
                                        I help startups and small businesses get the digital tools they need — <span className="text-ember-orange font-medium">fast</span>,
                                        <span className="text-ember-orange font-medium">affordable</span>, and <span className="text-ember-orange font-medium">tailored</span> to their vision.
                                    </p>
                                    <p className="leading-relaxed text-sm text-stone-400">
                                        Using AI, rapid prototyping, and modern tech to make sure clients see results before they ever commit.
                                        Every project is a chance to push boundaries and bring ideas to life.
                                    </p>
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {['Web Development', 'Video Editing', 'Rapid Prototyping', 'AI Integration'].map((skill) => (
                                            <span key={skill} className="px-3 py-1 bg-ember-orange/10 text-ember-orange text-xs font-mono border border-ember-orange/20 rounded-sm">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-black/40 backdrop-blur-sm p-8 border border-white/5 relative overflow-hidden">
                                <h4 className="text-lg font-bold text-white mb-6 font-mono">&gt; WHY_FHATAL?</h4>
                                <ul className="space-y-4">
                                    {[
                                        { title: "See Before You Commit", desc: "Results first, commitment later." },
                                        { title: "Modern Technology", desc: "AI-powered, rapid development." },
                                        { title: "Tailored Solutions", desc: "Your vision, our execution." }
                                    ].map((item, i) => (
                                        <li key={i} className="flex gap-4 items-start">
                                            <span className="text-ember-orange mt-1">::</span>
                                            <div>
                                                <div className="text-white font-bold text-sm mb-1 font-sans">{item.title}</div>
                                                <div className="text-stone-500 text-xs font-mono">{item.desc}</div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Crypto - 2 Cols */}
                <Card delay={0.4} className="md:col-span-2">
                    <div className="flex items-start gap-8">
                        <div className="p-4 bg-ember-orange/10 text-ember-glow border border-ember-orange/20 shrink-0">
                            <Gem size={32} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-sans font-bold text-white mb-2">Crypto <span className="text-ember-glow">Trading</span></h3>
                            <p className="text-xs text-ember-glow font-mono tracking-widest uppercase mb-4">Investor / Analyst</p>
                            <p className="text-stone-400 leading-relaxed max-w-xl font-light">
                                Exploring the world of crypto trading — learning the ins and outs of market trends,
                                risk management, and investment strategies. Always looking to expand my knowledge and skill set in the digital economy.
                            </p>
                        </div>
                    </div>
                </Card>

                {/* Contact Tile - 1 Col */}
                <Card delay={0.5} className="md:col-span-1 flex flex-col justify-center items-center text-center">
                    <p className="text-luxury-champagne font-mono text-xs mb-6 tracking-widest">READY TO BUILD?</p>
                    <a href="#contact" className="px-8 py-3 bg-ember-orange text-black font-bold font-mono text-xs tracking-widest hover:bg-white transition-colors duration-300">
                        INITIATE_CONTACT
                    </a>
                    <div className="flex gap-6 mt-8">
                        <a href="https://github.com/DarK-Devv" target="_blank" rel="noopener noreferrer">
                            <Github size={18} className="text-ember-orange/60 hover:text-ember-orange cursor-pointer transition-colors" />
                        </a>
                        <a href="https://fhatal.com" target="_blank" rel="noopener noreferrer">
                            <Globe size={18} className="text-ember-orange/60 hover:text-ember-orange cursor-pointer transition-colors" />
                        </a>
                        <a href="https://www.linkedin.com/in/veetipere/" target="_blank" rel="noopener noreferrer">
                            <Layout size={18} className="text-ember-orange/60 hover:text-ember-orange cursor-pointer transition-colors" />
                        </a>
                    </div>
                </Card>

            </div>
        </section>
    );
};

export default BentoGrid;
