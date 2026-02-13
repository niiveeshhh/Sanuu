import React, { useCallback } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Engine } from '@tsparticles/engine';

interface LayoutProps {
    children: React.ReactNode;
    onToggleMute: () => void;
    isMuted: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, onToggleMute, isMuted }) => {
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadSlim(engine);
    }, []);

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100 text-gray-800 transition-colors duration-500">
            {/* Floating Hearts Background */}
            <Particles
                id="tsparticles"
                init={particlesInit}
                className="absolute inset-0 z-0"
                options={{
                    background: {
                        color: {
                            value: "transparent",
                        },
                    },
                    fpsLimit: 120,
                    particles: {
                        color: {
                            value: ["#ff69b4", "#ff1493", "#ffc0cb", "#ffb6c1", "#ff69b4", "#ff4081"],
                        },
                        shape: {
                            type: ["circle", "triangle"],
                        },
                        opacity: {
                            value: { min: 0.2, max: 0.6 },
                            animation: {
                                enable: true,
                                speed: 0.5,
                                sync: false,
                            },
                        },
                        size: {
                            value: { min: 6, max: 18 },
                            animation: {
                                enable: true,
                                speed: 3,
                                minimumValue: 0.5,
                                sync: false,
                            },
                        },
                        move: {
                            enable: true,
                            speed: { min: 0.3, max: 1.5 },
                            direction: "none",
                            random: true,
                            straight: false,
                            outModes: {
                                default: "out",
                            },
                            attract: {
                                enable: false,
                            },
                            bounce: false,
                        },
                        number: {
                            density: {
                                enable: true,
                                area: 1000,
                            },
                            value: 40,
                        },
                        rotate: {
                            value: {
                                min: 0,
                                max: 360,
                            },
                            animation: {
                                enable: true,
                                speed: 5,
                                sync: false,
                            },
                        },
                    },
                    detectRetina: true,
                }}
            />
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffc0cb_1px,transparent_1px)] [background-size:16px_16px]"></div>

            <button
                onClick={onToggleMute}
                className="fixed top-4 right-4 z-50 bg-white/70 backdrop-blur-md p-3 rounded-full shadow-xl hover:bg-white/90 transition-all text-rose-600 hover:scale-110 border border-rose-200"
            >
                {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </button>

            <div className="relative z-10 w-full min-h-screen flex flex-col">
                {children}
            </div>
        </div>
    );
};
