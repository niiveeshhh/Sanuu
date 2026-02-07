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
            <h2 className="text-4xl font-handwriting text-rose-600 mb-8 text-shadow-sm">Our Video Memories</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl mb-20">
                {videos.map((video) => (
                    <motion.div
                        key={video.id}
                        layoutId={`video-${video.id}`}
                        onClick={() => setSelectedId(video.id)}
                        className="cursor-pointer relative group rounded-xl overflow-hidden aspect-video shadow-md border-2 border-rose-100 bg-black"
                        whileHover={{ scale: 1.02 }}
                    >
                        <video
                            src={video.url}
                            className="w-full h-full object-cover"
                            muted
                            playsInline
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-100 group-hover:opacity-70 transition-opacity flex items-center justify-center">
                            <Play className="text-white w-16 h-16 fill-white" />
                        </div>
                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                            <p className="text-white text-sm md:text-base font-medium">{video.caption}</p>
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
                Continue ➡️
            </motion.button>

            <AnimatePresence>
                {selectedId && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
                        onClick={() => setSelectedId(null)}
                    >
                        {videos.filter(v => v.id === selectedId).map(video => (
                            <motion.div
                                layoutId={`video-${video.id}`}
                                key={video.id}
                                className="bg-white p-4 rounded-2xl max-w-3xl w-full shadow-2xl relative"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    onClick={() => setSelectedId(null)}
                                    className="absolute -top-4 -right-4 bg-rose-500 text-white p-2 rounded-full shadow-lg hover:bg-rose-600 z-10"
                                >
                                    <X size={20} />
                                </button>
                                <video
                                    src={video.url}
                                    controls
                                    autoPlay
                                    className="w-full rounded-xl mb-4"
                                />
                                <h3 className="text-2xl font-handwriting text-rose-600 text-center">{video.caption}</h3>
                            </motion.div>
                        ))}
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};
