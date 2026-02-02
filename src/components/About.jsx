import { motion, useScroll, useTransform } from 'framer-motion';
import { Code, Terminal, Brain } from 'lucide-react';
import { useRef } from 'react';

const About = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const op = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    const features = [
        {
            icon: <Code className="w-8 h-8 text-brand-purple" />,
            title: "Software Engineering",
            desc: "Graduated ICT Engineer specializing in modern software solutions."
        },
        {
            icon: <Terminal className="w-8 h-8 text-brand-cyan" />,
            title: "Problem Solver",
            desc: "Thrive on challenges and pushing boundaries in digital experiences."
        },
        {
            icon: <Brain className="w-8 h-8 text-brand-blue" />,
            title: "Entrepreneurial",
            desc: "Running extensive digital business and crypto trading operations."
        }
    ];

    return (
        <section id="about" ref={ref} className="py-20 relative overflow-hidden z-10">
            <div className="container mx-auto px-6">
                <motion.div
                    style={{ opacity: op, y }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Who <span className="text-brand-purple">Am I?</span></h2>
                    <div className="w-20 h-1 bg-brand-cyan mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: idx * 0.2, duration: 0.6, type: "spring" }}
                            whileHover={{ scale: 1.05, y: -10 }}
                            className="bg-dark-200/50 backdrop-blur-md p-8 rounded-2xl border border-white/5 hover:border-brand-purple/50 transition-all group"
                        >
                            <div className="mb-4 bg-dark-100 w-16 h-16 rounded-lg flex items-center justify-center group-hover:bg-brand-purple/20 transition-colors">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-white group-hover:text-brand-purple transition-colors">{feature.title}</h3>
                            <p className="text-gray-400">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-dark-200 to-dark-100 p-1 rounded-2xl"
                >
                    <div className="bg-dark-200/80 backdrop-blur-xl p-8 rounded-xl">
                        <p className="text-lg md:text-xl text-gray-300 leading-relaxed text-center font-light">
                            "I'm <span className="text-white font-bold">Veeti Pere</span> (aka DarK-Devs), a goal-driven ICT Engineer with a passion for modern, innovative solutions.
                            For the past three years, I've worked as a Service Desk Specialist at Euroclear, refining my skills in problem-solving
                            and professionalism. I’m also the co-founder of <span className="text-brand-cyan">FHATAL</span>, helping startups get digital tools fast."
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
