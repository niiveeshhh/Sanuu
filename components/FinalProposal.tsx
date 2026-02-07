import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
// import confetti from 'canvas-confetti';
import { Heart } from 'lucide-react';

export const FinalProposal: React.FC = () => {

    useEffect(() => {
        // Fire confetti on mount
        /*
        const duration = 3000;
        const animationEnd = Date.now() + duration;

        const random = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) return clearInterval(interval);

            const particleCount = 50 * (timeLeft / duration);
            confetti({
                particleCount,
                origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 },
                colors: ['#ff1744', '#ff4081', '#ffffff']
            });
            confetti({
                particleCount,
                origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 },
                colors: ['#ff1744', '#ff4081', '#ffffff']
            });
        }, 250);
        */
    }, []);

    const handleYes = () => {
        /*
        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#ff1744', '#d50000', '#ff80ab']
        });
        */
        // Add more effects here
        alert("Yay! ❤️");
    };

    return (
        <div className="flex flex-col items-center justify-center h-full w-full px-4 text-center z-50">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 10, stiffness: 100 }}
                className="mb-8 relative"
            >
                <Heart className="w-48 h-48 text-rose-600 fill-rose-600 animate-pulse" />
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-4xl md:text-6xl font-handwriting text-rose-600 mb-6"
            >
                Will you be my forever Valentine? 🌹
            </motion.h1>

            <div className="flex gap-6 mt-8">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleYes}
                    className="px-8 py-4 bg-rose-600 text-white text-2xl font-bold rounded-full shadow-xl hover:bg-rose-700 transition w-32"
                >
                    YES!
                </motion.button>
                {/* We generally don't put a "No" button for these, or we make it run away :P Keeping it simple and positive. */}
            </div>

            <p className="mt-12 text-rose-400 text-sm opacity-80">Made with ❤️ for you</p>
        </div>
    );
};
