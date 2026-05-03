import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Music, VolumeX } from "lucide-react";
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
    <motion.button
      initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, type: "spring" }}
      onClick={toggle}
      className="fixed bottom-6 left-6 z-40 w-12 h-12 rounded-full bg-[hsl(var(--maroon-deep))] gold-border text-[hsl(var(--gold))] flex items-center justify-center shadow-gold hover:scale-110 transition-transform"
      aria-label="Toggle music"
    >
      {playing ? <Music size={18} className="animate-pulse" /> : <VolumeX size={18} />}
    </motion.button>
  );
};
