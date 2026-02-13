import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart } from 'lucide-react';

export const FinalProposal: React.FC = () => {

    useEffect(() => {
        // Fire confetti on mount
        const duration = 5000;
        const animationEnd = Date.now() + duration;

        const random = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) return clearInterval(interval);

            const particleCount = 50 * (timeLeft / duration);
            confetti({
                particleCount,
                origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 },
                colors: ['#ff1744', '#ff4081', '#ffffff', '#ff69b4', '#ffc0cb'],
                shapes: ['circle', 'heart'],
                spread: 70,
            });
            confetti({
                particleCount,
                origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 },
                colors: ['#ff1744', '#ff4081', '#ffffff', '#ff69b4', '#ffc0cb'],
                shapes: ['circle', 'heart'],
                spread: 70,
            });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    const handleYes = () => {
        // Burst of confetti on YES
        const count = 200;
        const defaults = {
            origin: { y: 0.7 },
            colors: ['#ff1744', '#d50000', '#ff80ab', '#ff69b4', '#ffc0cb', '#ffffff'],
            shapes: ['circle', 'heart'],
        };

        function fire(particleRatio: number, opts: confetti.Options) {
            confetti({
                ...defaults,
                ...opts,
                particleCount: Math.floor(count * particleRatio),
            });
        }

        fire(0.25, {
            spread: 26,
            startVelocity: 55,
        });
        fire(0.2, {
            spread: 60,
        });
        fire(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8,
        });
        fire(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2,
        });
        fire(0.1, {
            spread: 120,
            startVelocity: 45,
        });

        // Show success message
        setTimeout(() => {
            alert("Yay! ❤️ Forever and Always! 🌹");
        }, 500);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full w-full px-4 text-center z-50 relative">
            <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: 0
                }}
                transition={{ 
                    type: 'spring', 
                    damping: 10, 
                    stiffness: 100,
                    scale: { duration: 2, repeat: Infinity }
                }}
                className="mb-8 relative"
            >
                <div className="relative">
                    <Heart className="w-48 h-48 text-rose-600 fill-rose-600 animate-pulse-slow drop-shadow-2xl" />
                    <motion.div
                        animate={{ 
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 0, 0.5]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <Heart className="w-48 h-48 text-rose-400 fill-rose-400/30" />
                    </motion.div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white/70 backdrop-blur-xl px-8 py-6 rounded-3xl shadow-2xl border-2 border-rose-200/60 mb-6 relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 to-pink-50/50"></div>
                <motion.h1
                    animate={{ 
                        textShadow: [
                            "0 0 0px rgba(244,63,94,0)",
                            "0 0 30px rgba(244,63,94,0.6)",
                            "0 0 0px rgba(244,63,94,0)"
                        ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-4xl md:text-6xl font-handwriting text-rose-600 relative z-10"
                >
                    Will you be my forever Valentine? 🌹
                </motion.h1>
            </motion.div>

            <div className="flex gap-6 mt-8">
                <motion.button
                    whileHover={{ scale: 1.15, boxShadow: "0 20px 50px rgba(244,63,94,0.5)" }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleYes}
                    className="px-10 py-5 bg-gradient-to-r from-rose-500 to-rose-600 text-white text-2xl font-bold rounded-full shadow-2xl hover:shadow-rose-500/50 transition-all border-2 border-rose-400/50 relative overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    <span className="relative z-10">YES! ❤️</span>
                </motion.button>
            </div>

            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-12 text-rose-500 text-sm opacity-90 bg-white/40 backdrop-blur-sm px-4 py-2 rounded-full border border-rose-200/50"
            >
                Made with ❤️ for you
            </motion.p>
        </div>
    );
};
