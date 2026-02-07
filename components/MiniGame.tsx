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

export const MiniGame: React.FC<MiniGameProps> = ({ onComplete }) => {
    const [score, setScore] = useState(0);
    const [items, setItems] = useState<Item[]>([]);
    const targetScore = 10;

    const spawnItem = useCallback(() => {
        const id = Date.now();
        const x = Math.random() * (window.innerWidth - 60); // Keep within bounds
        setItems(prev => [...prev, { id, x, type: 'rose' }]);
    }, []);

    useEffect(() => {
        if (score >= targetScore) {
            // playSuccess();
            setTimeout(onComplete, 1500);
            return;
        }

        const interval = setInterval(spawnItem, 800);
        return () => clearInterval(interval);
    }, [score, spawnItem, onComplete]);

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
            <div className="absolute top-4 right-4 bg-white/50 backdrop-blur-md p-4 rounded-xl shadow-lg border border-rose-200 z-50">
                <div className="flex items-center gap-2 text-2xl font-bold text-rose-600">
                    <Trophy className="w-6 h-6" />
                    <span>{score} / {targetScore}</span>
                </div>
                <p className="text-xs text-rose-800">Catch the roses!</p>
            </div>

            <AnimatePresence>
                {items.map(item => (
                    <motion.button
                        key={item.id}
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: window.innerHeight, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 4, ease: "linear" }}
                        onAnimationComplete={() => removeMissed(item.id)}
                        onClick={() => handleCollect(item.id)} // Desktop click
                        onTouchStart={() => handleCollect(item.id)} // Mobile tap
                        style={{ left: item.x }}
                        className="absolute top-0 cursor-pointer p-2 z-40 touch-none select-none"
                    >
                        <img src="/rose.jpg" alt="Rose" className="w-12 h-12 object-contain drop-shadow-lg" />
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
