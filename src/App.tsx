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
    audio.preload = 'auto';
    audioRef.current = audio;

    // Function to attempt playing audio
    const attemptPlay = () => {
      if (audioRef.current && !audioRef.current.paused) return;

      const playPromise = audioRef.current?.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('Audio playing successfully');
          })
          .catch(error => {
            console.log('Audio autoplay prevented:', error);
          });
      }
    };

    // Event listeners to ensure continuous playback
    const handleEnded = () => {
      console.log('Audio ended, restarting...');
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        attemptPlay();
      }
    };

    const handleError = (e: Event) => {
      console.error('Audio error:', e);
      // Try to reload and play again after a short delay
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.load();
          attemptPlay();
        }
      }, 1000);
    };

    const handlePause = () => {
      // If audio pauses unexpectedly (not due to mute), try to resume
      if (audioRef.current && !audioRef.current.muted && !isMuted) {
        console.log('Audio paused unexpectedly, resuming...');
        setTimeout(attemptPlay, 100);
      }
    };

    const handleCanPlay = () => {
      console.log('Audio can play');
      attemptPlay();
    };

    // Add event listeners
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('canplay', handleCanPlay);

    // Handle page visibility changes - resume audio when page becomes visible
    const handleVisibilityChange = () => {
      if (!document.hidden && audioRef.current) {
        attemptPlay();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Try to play on first user interaction if autoplay is blocked
    const playOnInteraction = () => {
      attemptPlay();
      document.removeEventListener('click', playOnInteraction);
      document.removeEventListener('touchstart', playOnInteraction);
      document.removeEventListener('keydown', playOnInteraction);
    };

    document.addEventListener('click', playOnInteraction);
    document.addEventListener('touchstart', playOnInteraction);
    document.addEventListener('keydown', playOnInteraction);

    // Initial play attempt
    attemptPlay();

    // Cleanup: stop music when app unmounts
    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('canplay', handleCanPlay);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('click', playOnInteraction);
      document.removeEventListener('touchstart', playOnInteraction);
      document.removeEventListener('keydown', playOnInteraction);

      audio.pause();
      audio.currentTime = 0;
      audio.src = '';
    };
  }, [isMuted]);

  // Handle mute/unmute
  const toggleMute = () => {
    if (audioRef.current) {
      const newMutedState = !isMuted;
      audioRef.current.muted = newMutedState;
      setIsMuted(newMutedState);

      // If unmuting, ensure audio is playing
      if (!newMutedState && audioRef.current.paused) {
        audioRef.current.play().catch(err => console.log('Play on unmute failed:', err));
      }
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
              className="absolute bottom-4 right-4 text-2xl px-4 py-2 text-rose-300 hover:text-rose-500 font-semibold"
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
