import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface MessagesProps {
    onNext: () => void;
}

const messages = [
    "You are my favorite person in the whole world 🌎",
    "Every moment with you is a blessing ✨",
    "Thank you for making my life so beautiful 🌹",
    "I love you more than words can say ❤️",
    "You are the best thing that ever happened to me 🎁",
    "I love you forever 💕",
    "Every moment with you is special ✨"
];

export const Messages: React.FC<MessagesProps> = ({ onNext }) => {
    const [index, setIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(true);

    useEffect(() => {
        setIsTyping(true);
        setDisplayedText('');
        const currentMessage = messages[index];
        let charIndex = 0;

        const typeInterval = setInterval(() => {
            if (charIndex < currentMessage.length) {
                setDisplayedText(currentMessage.slice(0, charIndex + 1));
                charIndex++;
            } else {
                setIsTyping(false);
                clearInterval(typeInterval);
            }
        }, 50); // Typing speed

        return () => clearInterval(typeInterval);
    }, [index]);

    useEffect(() => {
        if (!isTyping) {
            const timer = setTimeout(() => {
                setIndex((prev) => (prev + 1) % messages.length);
            }, 3000); // Show complete message for 3 seconds before next

            return () => clearTimeout(timer);
        }
    }, [isTyping]);

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
                <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-white/70 backdrop-blur-md px-8 py-6 rounded-3xl shadow-xl border-2 border-rose-200"
                >
                    <p className="text-2xl md:text-4xl font-handwriting text-rose-700 leading-relaxed">
                        "{displayedText}"
                        {isTyping && (
                            <motion.span
                                animate={{ opacity: [1, 0] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                                className="inline-block ml-1"
                            >
                                |
                            </motion.span>
                        )}
                    </p>
                </motion.div>
            </div>

            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onNext}
                className="mt-12 px-8 py-3 bg-gradient-to-r from-rose-400 to-rose-600 text-white rounded-full font-bold shadow-xl hover:shadow-2xl transition-all border-2 border-rose-300"
            >
                One Last Surprise... ✨
            </motion.button>
        </div>
    );
};
