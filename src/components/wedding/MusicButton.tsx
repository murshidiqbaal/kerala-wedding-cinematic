import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Music, VolumeX } from "lucide-react";

export const MusicButton = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_5d3b8a5c08.mp3?filename=indian-classical-meditation-7613.mp3");
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
