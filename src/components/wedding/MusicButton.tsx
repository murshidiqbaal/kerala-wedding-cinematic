import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music2, VolumeX } from "lucide-react";
import bgMusic from "@/assets/optimized/bg_music.mp3";

export const MusicButton = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio(bgMusic);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;
    return () => { audioRef.current?.pause(); };
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) audioRef.current.pause();
    else audioRef.current.play().catch(() => {});
    setPlaying(!playing);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }} 
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-8 right-8 z-[60]"
    >
      <button
        onClick={toggle}
        className="relative w-14 h-14 bg-foreground text-background flex items-center justify-center luxury-shadow hover:scale-105 active:scale-95 transition-all duration-300 group"
        aria-label="Toggle music"
      >
        <AnimatePresence mode="wait">
          {playing ? (
            <motion.div
              key="music"
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
              transition={{ duration: 0.3 }}
            >
              <Music2 size={18} strokeWidth={1.5} className="text-luxury-gold" />
            </motion.div>
          ) : (
            <motion.div
              key="mute"
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
              transition={{ duration: 0.3 }}
            >
              <VolumeX size={18} strokeWidth={1.5} className="text-background/50" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Animated Rings when playing */}
        {playing && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 border border-luxury-gold/50 animate-ping opacity-20" />
          </div>
        )}
      </button>
    </motion.div>
  );
};
