import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy } from 'lucide-react';
// import { playPop, playSuccess } from '../utils/sounds';

interface MiniGameProps {
    onComplete: () => void;
}

interface Item {
    id: number;
    x: number;
    type: 'rose' | 'bad';
}

// Beautiful love quotes to display during the game
const loveQuotes = [
    "Every rose I catch reminds me of you 🌹",
    "You make my heart bloom like these roses 💖",
    "Catching roses for the love of my life ✨",
    "Each rose is a symbol of my love for you 💕",
    "You're more beautiful than a thousand roses 🌹",
    "My love for you grows with every rose 💗",
    "These roses can't compare to your beauty 🌺",
    "Forever catching roses, forever loving you 💝"
];

export const MiniGame: React.FC<MiniGameProps> = ({ onComplete }) => {
    const [score, setScore] = useState(0);
    const [items, setItems] = useState<Item[]>([]);
    const [currentQuote, setCurrentQuote] = useState(0);
    const targetScore = 10;

    const spawnItem = useCallback(() => {
        const id = Date.now();
        const x = Math.random() * (window.innerWidth - 140); // Keep within bounds for larger roses
        setItems(prev => [...prev, { id, x, type: 'rose' }]);
    }, []);

    useEffect(() => {
        if (score >= targetScore) {
            // playSuccess();
            setTimeout(onComplete, 1500);
            return;
        }

        const interval = setInterval(spawnItem, 550); // Even faster spawn
        return () => clearInterval(interval);
    }, [score, spawnItem, onComplete]);

    // Rotate love quotes every 4 seconds
    useEffect(() => {
        const quoteInterval = setInterval(() => {
            setCurrentQuote(prev => (prev + 1) % loveQuotes.length);
        }, 4000);
        return () => clearInterval(quoteInterval);
    }, []);

    const handleCollect = (id: number) => {
        // playPop();
        setItems(prev => prev.filter(item => item.id !== id));
        setScore(prev => prev + 1);
    };

    const removeMissed = (id: number) => {
        setItems(prev => prev.filter(item => item.id !== id));
    };

    return (
        <div className="flex flex-col items-center justify-center h-full w-full relative overflow-hidden">
            {/* Score Display */}
            <div className="absolute top-4 right-4 bg-white/50 backdrop-blur-md p-4 rounded-xl shadow-lg border border-rose-200 z-50">
                <div className="flex items-center gap-2 text-2xl font-bold text-rose-600">
                    <Trophy className="w-6 h-6" />
                    <span>{score} / {targetScore}</span>
                </div>
                <p className="text-xs text-rose-800">Catch the roses!</p>
            </div>

            {/* Love Quote Display */}
            <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 z-50 max-w-md px-4">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuote}
                        initial={{ opacity: 0, y: -20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.8 }}
                        transition={{ duration: 0.6 }}
                        className="bg-white/70 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl border-2 border-rose-300"
                    >
                        <p className="text-xl md:text-2xl font-handwriting text-rose-600 text-center leading-relaxed">
                            {loveQuotes[currentQuote]}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>

            <AnimatePresence>
                {items.map(item => (
                    <motion.button
                        key={item.id}
                        initial={{ y: -80, opacity: 0, rotate: -20 }}
                        animate={{
                            y: window.innerHeight,
                            opacity: 1,
                            rotate: 360
                        }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{
                            duration: 4.5,
                            ease: "linear",
                            rotate: { duration: 3, repeat: Infinity, ease: "linear" }
                        }}
                        onAnimationComplete={() => removeMissed(item.id)}
                        onClick={() => handleCollect(item.id)} // Desktop click
                        onTouchStart={() => handleCollect(item.id)} // Mobile tap
                        style={{ left: item.x }}
                        className="absolute top-0 cursor-pointer z-40 touch-none select-none"
                    >
                        <img src="/rose.jpg" alt="Rose" className="w-32 h-32 object-contain drop-shadow-2xl hover:scale-125 transition-transform" />
                    </motion.button>
                ))}
            </AnimatePresence>

            {score >= targetScore && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50"
                >
                    <div className="bg-white p-8 rounded-3xl shadow-2xl text-center">
                        <h2 className="text-4xl font-handwriting text-rose-600 mb-4">Good Job! 🎉</h2>
                        <p className="text-xl text-gray-600">You collected them all!</p>
                    </div>
                </motion.div>
            )}
        </div>
    );
};
