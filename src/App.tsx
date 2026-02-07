import { useState, useEffect, useRef } from 'react';
import { Layout } from '../components/Layout';
import { Landing } from '../components/Landing';
import { MiniGame } from '../components/MiniGame';
import { Gallery } from '../components/Gallery';
import { VideoGallery } from '../components/VideoGallery';
import { Messages } from '../components/Messages';
import { FinalProposal } from '../components/FinalProposal';
import { AnimatePresence, motion } from 'framer-motion';

// Stages of the surprise
type Stage = 'landing' | 'game' | 'gallery' | 'videos' | 'messages' | 'final';

function App() {
  const [stage, setStage] = useState<Stage>('landing');
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Background music that plays throughout the entire experience
  useEffect(() => {
    const audio = new Audio('/song.mp3');
    audio.loop = true;
    audio.volume = 0.3; // Set volume to 30%
    audioRef.current = audio;

    // Play music when app starts
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.log('Audio autoplay prevented:', error);
        // If autoplay is blocked, try to play on first user interaction
        const playOnInteraction = () => {
          audio.play();
          document.removeEventListener('click', playOnInteraction);
        };
        document.addEventListener('click', playOnInteraction);
      });
    }

    // Cleanup: stop music when app unmounts
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  // Handle mute/unmute
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const startExperience = () => {
    setStage('game');
  };

  const nextStage = (next: Stage) => {
    setStage(next);
  };

  return (
    <Layout onToggleMute={toggleMute} isMuted={isMuted}>
      <AnimatePresence mode="wait">
        {stage === 'landing' && (
          <motion.div
            key="landing"
            exit={{ opacity: 0, y: -20 }}
            className="w-full h-full flex items-center justify-center p-4 absolute inset-0"
          >
            <Landing onStart={startExperience} />
          </motion.div>
        )}

        {stage === 'game' && (
          <motion.div
            key="game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full absolute inset-0"
          >
            <MiniGame onComplete={() => nextStage('gallery')} />
            {/* Fallback skip button for testing/impatience */}
            <button
              onClick={() => nextStage('gallery')}
              className="absolute bottom-4 right-4 text-xl text-rose-300 hover:text-rose-500"
            >
              Skip
            </button>
          </motion.div>
        )}

        {stage === 'gallery' && (
          <motion.div
            key="gallery"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full absolute inset-0"
          >
            <Gallery onNext={() => nextStage('videos')} />
          </motion.div>
        )}

        {stage === 'videos' && (
          <motion.div
            key="videos"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full absolute inset-0"
          >
            <VideoGallery onNext={() => nextStage('messages')} />
          </motion.div>
        )}

        {stage === 'messages' && (
          <motion.div
            key="messages"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full flex items-center justify-center p-4 absolute inset-0"
          >
            <Messages onNext={() => nextStage('final')} />
          </motion.div>
        )}

        {stage === 'final' && (
          <motion.div
            key="final"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full h-full flex items-center justify-center p-4 absolute inset-0"
          >
            <FinalProposal />
          </motion.div>
        )}

      </AnimatePresence>
    </Layout>
  );
}

export default App;
