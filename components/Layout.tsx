import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
// import { toggleBgm } from '../utils/sounds';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const toggleMusic = () => {
        const newState = !isPlaying;
        setIsPlaying(newState);
        // toggleBgm(newState);
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-rose-50 text-gray-800 transition-colors duration-500">
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[radial-gradient(#ffc0cb_1px,transparent_1px)] [background-size:16px_16px]"></div>

            <button
                onClick={toggleMusic}
                className="fixed top-4 right-4 z-50 bg-white/50 backdrop-blur-md p-3 rounded-full shadow-lg hover:bg-white/80 transition-all text-rose-600"
            >
                {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
            </button>

            <div className="relative z-10 w-full min-h-screen flex flex-col">
                {children}
            </div>
        </div>
    );
};
