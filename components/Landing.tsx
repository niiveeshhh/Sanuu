import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface LandingProps {
    onStart: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onStart }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, type: 'spring', bounce: 0.5 }}
                className="mb-8"
            >
                <div className="bg-rose-100 p-8 rounded-full shadow-lg border-4 border-rose-200">
                    <Heart className="w-24 h-24 text-rose-500 fill-rose-500 animate-pulse-slow" />
                </div>
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-5xl md:text-7xl font-handwriting text-rose-600 mb-4 drop-shadow-sm"
            >
                Happy Rose Day Saanuuuu ❤️
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="text-xl md:text-2xl text-rose-800 font-body mb-12"
            >
                A little surprise just for you...
            </motion.p>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                onClick={onStart}
                className="px-8 py-4 bg-rose-500 text-white rounded-full font-bold text-xl shadow-lg hover:bg-rose-600 transition-colors flex items-center gap-2 group"
            >
                <span>Open Surprise</span>
                <Heart className="w-5 h-5 fill-white group-hover:animate-ping" />
            </motion.button>
        </div>
    );
};
