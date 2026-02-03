import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
    return (
        <nav className="absolute top-0 w-full z-50 px-8 py-6 flex justify-between items-center bg-transparent">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-2xl font-serif font-bold text-white"
            >
                Dark<span className="text-ember-orange italic">-Dev</span>
            </motion.div>
        </nav>
    );
};

export default Navbar;
