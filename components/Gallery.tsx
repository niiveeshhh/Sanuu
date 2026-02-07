import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

interface MediaItem {
    id: number;
    type: 'image' | 'video';
    url: string;
    caption: string;
}

// Placeholder data - User should replace these URLs
const memories: MediaItem[] = [
    {
        id: 1,
        type: 'image',
        url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600&auto=format&fit=crop',
        caption: 'Our first date 🌹'
    },
    {
        id: 2,
        type: 'image',
        url: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=600&auto=format&fit=crop',
        caption: 'Best trip ever ✈️'
    },
    {
        id: 3,
        type: 'image',
        url: 'https://images.unsplash.com/photo-1522673607200-1645062cd958?q=80&w=600&auto=format&fit=crop',
        caption: 'Just you being cute 💖'
    },
    {
        id: 4,
        type: 'image',
        url: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=600&auto=format&fit=crop',
        caption: 'That smile though 😍'
    },
    {
        id: 5,
        type: 'image',
        url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop',
        caption: 'Always happy '
    },
    {
        id: 6,
        type: 'image',
        url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
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
            <h2 className="text-4xl font-handwriting text-rose-600 mb-8 text-shadow-sm">Our Beautiful Memories</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl mb-20">
                {memories.map((item) => (
                    <motion.div
                        key={item.id}
                        layoutId={`card-${item.id}`}
                        onClick={() => setSelectedId(item.id)}
                        className="cursor-pointer relative group rounded-xl overflow-hidden aspect-square shadow-md border-2 border-rose-100"
                        whileHover={{ scale: 1.02 }}
                    >
                        <img
                            src={item.url}
                            alt={item.caption}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <ZoomIn className="text-white w-8 h-8" />
                        </div>
                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                            <p className="text-white text-xs md:text-sm font-medium truncate">{item.caption}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onNext}
                className="fixed bottom-8 px-8 py-3 bg-rose-500 text-white rounded-full font-bold shadow-xl z-10 hover:bg-rose-600"
            >
                See What's Next ➡️
            </motion.button>

            <AnimatePresence>
                {selectedId && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={() => setSelectedId(null)} // Close on background click
                    >
                        {memories.filter(i => i.id === selectedId).map(item => (
                            <motion.div
                                layoutId={`card-${item.id}`}
                                key={item.id}
                                className="bg-white p-4 rounded-2xl max-w-lg w-full shadow-2xl relative"
                                onClick={(e) => e.stopPropagation()} // Prevent close on modal click
                            >
                                <button
                                    onClick={() => setSelectedId(null)}
                                    className="absolute -top-4 -right-4 bg-rose-500 text-white p-2 rounded-full shadow-lg hover:bg-rose-600"
                                >
                                    <X size={20} />
                                </button>
                                <img
                                    src={item.url}
                                    alt={item.caption}
                                    className="w-full h-64 md:h-96 object-cover rounded-xl mb-4"
                                />
                                <h3 className="text-2xl font-handwriting text-rose-600 text-center">{item.caption}</h3>
                            </motion.div>
                        ))}
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};
