import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

interface MessagesProps {
    onNext: () => void;
}

const messages = [
    "You are my favorite person in the whole world 🌎",
    "Every moment with you is a blessing ✨",
    "Thank you for making my life so beautiful 🌹",
    "I love you more than words can say ❤️",
    "You are the best thing that ever happened to me 🎁"
];

export const Messages: React.FC<MessagesProps> = ({ onNext }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % messages.length);
        }, 4000); // Change message every 4 seconds

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-full w-full px-4 text-center">
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="mb-12"
            >
                <Heart className="w-32 h-32 text-rose-500 fill-rose-500/20 stroke-[1.5]" />
            </motion.div>

            <div className="h-40 flex items-center justify-center w-full max-w-2xl px-6 relative">
                <AnimatePresence mode="wait">
                    <motion.p
                        key={index}
                        initial={{ opacity: 0, y: 20, rotateX: 90 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        exit={{ opacity: 0, y: -20, rotateX: -90 }}
                        transition={{ duration: 0.8 }}
                        className="text-2xl md:text-4xl font-handwriting text-rose-700 leading-relaxed"
                    >
                        "{messages[index]}"
                    </motion.p>
                </AnimatePresence>
            </div>

            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 5 }} // Show button after a while
                onClick={onNext}
                className="mt-12 px-8 py-3 border-2 border-rose-400 text-rose-600 rounded-full font-bold hover:bg-rose-50 transition-colors"
            >
                One Last Surprise...
            </motion.button>
        </div>
    );
};
