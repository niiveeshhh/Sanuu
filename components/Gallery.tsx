import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

interface MediaItem {
    id: number;
    type: 'image' | 'video';
    url: string;
    caption: string;
}

// Local photos from the Photos folder
const memories: MediaItem[] = [
    {
        id: 1,
        type: 'image',
        url: '/photos/p1.jpg.jpg',
        caption: 'Beautiful memories 🌹'
    },
    {
        id: 2,
        type: 'image',
        url: '/photos/p2.jpg.jpg',
        caption: 'Forever in my heart ❤️'
    },
    {
        id: 3,
        type: 'image',
        url: '/photos/p3.jpg.jpg',
        caption: 'You make me smile 😊'
    },
    {
        id: 4,
        type: 'image',
        url: '/photos/p4.jpg.jpg',
        caption: 'Perfect moments ✨'
    },
    {
        id: 5,
        type: 'image',
        url: '/photos/p5.jpg.jpg',
        caption: 'Always together 💕'
    },
    {
        id: 6,
        type: 'image',
        url: '/photos/p6.jpg.jpg',
        caption: 'My favorite person 🌟'
    },
    {
        id: 7,
        type: 'image',
        url: '/photos/p7.jpg.jpg',
        caption: 'Sweet memories 🍭'
    },
    {
        id: 8,
        type: 'image',
        url: '/photos/p8.jpg.jpg',
        caption: 'You and me 💑'
    },
    {
        id: 9,
        type: 'image',
        url: '/photos/p9.jpg.jpg',
        caption: 'Happiness overload 🎉'
    },
    {
        id: 10,
        type: 'image',
        url: '/photos/p10.jpg.jpg',
        caption: 'Best moments ever 🌈'
    },
    {
        id: 11,
        type: 'image',
        url: '/photos/p11.jpg.jpg',
        caption: 'Love you so much 💖'
    },
    {
        id: 12,
        type: 'image',
        url: '/photos/p12.jpg.jpg',
        caption: 'Our special day 🎊'
    },
    {
        id: 13,
        type: 'image',
        url: '/photos/p13.jpg.jpeg',
        caption: 'Unforgettable times 🌺'
    },
    {
        id: 14,
        type: 'image',
        url: '/photos/p14.jpg.jpeg',
        caption: 'Pure joy 😄'
    },
    {
        id: 15,
        type: 'image',
        url: '/photos/p15.jpg.jpg',
        caption: 'Together forever 🔒'
    },
    {
        id: 16,
        type: 'image',
        url: '/photos/p16.jpg.jpg',
        caption: 'My sunshine ☀️'
    },
    {
        id: 17,
        type: 'image',
        url: '/photos/p17.jpg.jpg',
        caption: 'Precious moments 💎'
    },
    {
        id: 18,
        type: 'image',
        url: '/photos/p18.jpg.jpg',
        caption: 'Forever & Always ✨'
    },
];

interface GalleryProps {
    onNext: () => void;
}

export const Gallery: React.FC<GalleryProps> = ({ onNext }) => {
    const [selectedId, setSelectedId] = useState<number | null>(null);

    return (
        <div className="flex flex-col items-center h-full w-full py-8 px-4 overflow-y-auto">
            <motion.h2 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-handwriting text-rose-600 mb-8 text-shadow-md bg-white/50 backdrop-blur-sm px-6 py-3 rounded-full border border-rose-200/50"
            >
                Our Beautiful Memories 💕
            </motion.h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl mb-20">
                {memories.map((item, index) => (
                    <motion.div
                        key={item.id}
                        layoutId={`card-${item.id}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => setSelectedId(item.id)}
                        className="cursor-pointer relative group rounded-2xl overflow-hidden aspect-square shadow-lg border-2 border-rose-100/60 bg-white/20 backdrop-blur-sm"
                        whileHover={{ scale: 1.05, zIndex: 10 }}
                    >
                        <img
                            src={item.url}
                            alt={item.caption}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                whileHover={{ scale: 1 }}
                                className="bg-white/20 backdrop-blur-md p-3 rounded-full"
                            >
                                <ZoomIn className="text-white w-8 h-8" />
                            </motion.div>
                        </div>
                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                            <p className="text-white text-xs md:text-sm font-medium">{item.caption}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.button
                whileHover={{ scale: 1.1, boxShadow: "0 20px 40px rgba(244,63,94,0.4)" }}
                whileTap={{ scale: 0.95 }}
                onClick={onNext}
                className="fixed bottom-8 px-8 py-4 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-full font-bold shadow-2xl z-10 hover:shadow-rose-500/50 transition-all border-2 border-rose-400/50"
            >
                See What's Next ➡️
            </motion.button>

            <AnimatePresence>
                {selectedId && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
                        onClick={() => setSelectedId(null)}
                    >
                        {memories.filter(i => i.id === selectedId).map(item => (
                            <motion.div
                                layoutId={`card-${item.id}`}
                                key={item.id}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                className="bg-white/95 backdrop-blur-xl p-6 rounded-3xl max-w-lg w-full shadow-2xl relative border-2 border-rose-200/60"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    onClick={() => setSelectedId(null)}
                                    className="absolute -top-4 -right-4 bg-rose-500 text-white p-3 rounded-full shadow-xl hover:bg-rose-600 transition-all hover:scale-110 z-10"
                                >
                                    <X size={20} />
                                </button>
                                <img
                                    src={item.url}
                                    alt={item.caption}
                                    className="w-full h-64 md:h-96 object-cover rounded-2xl mb-4 shadow-lg"
                                />
                                <h3 className="text-2xl font-handwriting text-rose-600 text-center">{item.caption}</h3>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
