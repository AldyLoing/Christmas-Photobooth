"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Note: You would add your own Christmas music file here
    // For now, this is a placeholder
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((err) => console.log("Audio play error:", err));
      }
      setIsPlaying(!isPlaying);
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleMute}
        className="bg-white/20 backdrop-blur-md text-white p-4 rounded-full shadow-lg hover:bg-white/30 transition-all border border-white/30"
      >
        <AnimatePresence mode="wait">
          {isMuted ? (
            <motion.span
              key="muted"
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 180, opacity: 0 }}
              className="text-2xl block"
            >
              🔇
            </motion.span>
          ) : (
            <motion.span
              key="unmuted"
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 180, opacity: 0 }}
              className="text-2xl block"
            >
              🔊
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Audio element - you can add your own Christmas music URL */}
      <audio
        ref={audioRef}
        loop
        muted={isMuted}
      >
        {/* Add your music source here */}
        {/* <source src="/music/christmas.mp3" type="audio/mpeg" /> */}
      </audio>
    </div>
  );
}
