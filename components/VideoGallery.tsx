import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play } from 'lucide-react';

interface VideoItem {
    id: number;
    url: string;
    caption: string;
}

// Local videos from the Videos folder
const videos: VideoItem[] = [
    {
        id: 1,
        url: '/videos/v1.mp4.mp4',
        caption: 'Special moments 🎬'
    },
    {
        id: 2,
        url: '/videos/v2.mp4.mp4',
        caption: 'Our adventures 🌟'
    },
    {
        id: 3,
        url: '/videos/v3.mp4.mp4',
        caption: 'Fun times together 🎉'
    },
    {
        id: 4,
        url: '/videos/v4.mp4.mp4',
        caption: 'Beautiful memories 💖'
    },
    {
        id: 5,
        url: '/videos/WhatsApp Video 2026-02-07 at 10.23.09 PM.mp4',
        caption: 'Forever cherished 💕'
    },
];

interface VideoGalleryProps {
    onNext: () => void;
}

export const VideoGallery: React.FC<VideoGalleryProps> = ({ onNext }) => {
    const [selectedId, setSelectedId] = useState<number | null>(null);

    return (
        <div className="flex flex-col items-center h-full w-full py-8 px-4 overflow-y-auto">
            <motion.h2 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-handwriting text-rose-600 mb-8 text-shadow-md bg-white/50 backdrop-blur-sm px-6 py-3 rounded-full border border-rose-200/50"
            >
                Our Video Memories 🎬
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl mb-20">
                {videos.map((video, index) => (
                    <motion.div
                        key={video.id}
                        layoutId={`video-${video.id}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => setSelectedId(video.id)}
                        className="cursor-pointer relative group rounded-2xl overflow-hidden aspect-video shadow-lg border-2 border-rose-100/60 bg-black"
                        whileHover={{ scale: 1.05, zIndex: 10 }}
                    >
                        <video
                            src={video.url}
                            className="w-full h-full object-cover"
                            muted
                            playsInline
                            loop
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-100 group-hover:opacity-80 transition-opacity flex items-center justify-center">
                            <motion.div
                                whileHover={{ scale: 1.2 }}
                                className="bg-white/20 backdrop-blur-md p-4 rounded-full border-2 border-white/30"
                            >
                                <Play className="text-white w-16 h-16 fill-white" />
                            </motion.div>
                        </div>
                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                            <p className="text-white text-sm md:text-base font-medium">{video.caption}</p>
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
                Continue ➡️
            </motion.button>

            <AnimatePresence>
                {selectedId && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
                        onClick={() => setSelectedId(null)}
                    >
                        {videos.filter(v => v.id === selectedId).map(video => (
                            <motion.div
                                layoutId={`video-${video.id}`}
                                key={video.id}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                className="bg-white/95 backdrop-blur-xl p-6 rounded-3xl max-w-3xl w-full shadow-2xl relative border-2 border-rose-200/60"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    onClick={() => setSelectedId(null)}
                                    className="absolute -top-4 -right-4 bg-rose-500 text-white p-3 rounded-full shadow-xl hover:bg-rose-600 transition-all hover:scale-110 z-10"
                                >
                                    <X size={20} />
                                </button>
                                <video
                                    src={video.url}
                                    controls
                                    autoPlay
                                    className="w-full rounded-2xl mb-4 shadow-lg"
                                />
                                <h3 className="text-2xl font-handwriting text-rose-600 text-center">{video.caption}</h3>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
