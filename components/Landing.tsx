import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

interface LandingProps {
    onStart: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onStart }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center px-4 relative">
            {/* Floating sparkles */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                        x: Math.random() * 400 - 200,
                        y: Math.random() * 400 - 200,
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: i * 0.5,
                    }}
                    className="absolute pointer-events-none"
                >
                    <Sparkles className="w-6 h-6 text-rose-300" />
                </motion.div>
            ))}

            <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1, type: 'spring', bounce: 0.6 }}
                className="mb-8 relative"
            >
                <div className="bg-white/40 backdrop-blur-xl p-8 rounded-full shadow-2xl border-4 border-rose-200/60 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-100/50 to-pink-100/50 rounded-full"></div>
                    <Heart className="w-24 h-24 text-rose-500 fill-rose-500 animate-pulse-slow relative z-10" />
                </div>
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-5xl md:text-7xl font-handwriting text-rose-600 mb-4 drop-shadow-md relative z-10"
            >
                <motion.span
                    animate={{ 
                        textShadow: [
                            "0 0 0px rgba(244,63,94,0)",
                            "0 0 20px rgba(244,63,94,0.5)",
                            "0 0 0px rgba(244,63,94,0)"
                        ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    Happy Rose Day ❤️
                </motion.span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="text-xl md:text-2xl text-rose-800 font-body mb-12 relative z-10 bg-white/30 backdrop-blur-sm px-6 py-3 rounded-full border border-rose-200/50"
            >
                A little surprise just for you...
            </motion.p>

            <motion.button
                whileHover={{ scale: 1.1, boxShadow: "0 20px 40px rgba(244,63,94,0.4)" }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                onClick={onStart}
                className="px-10 py-5 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-full font-bold text-xl shadow-2xl hover:shadow-rose-500/50 transition-all flex items-center gap-3 group relative z-10 border-2 border-rose-400/50 overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <span className="relative z-10">Open Surprise</span>
                <Heart className="w-5 h-5 fill-white group-hover:animate-ping relative z-10" />
            </motion.button>
        </div>
    );
};
