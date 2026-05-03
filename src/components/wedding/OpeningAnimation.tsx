import { useRef, useState } from "react";
import { motion } from "framer-motion";
import videoBg from "@/assets/optimized/ezgif-381460686f916f0e.webm";

interface Props { onComplete: () => void; }

export const OpeningAnimation = ({ onComplete }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState(false);

  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-hidden bg-black flex items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        onEnded={onComplete}
        onError={() => setError(true)}
        className="w-full h-full object-cover"
      >
        <source src={videoBg} type="video/mp4" />
      </video>

      {error && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={onComplete}
          className="relative z-10 px-8 py-3 rounded-full bg-[hsl(46_80%_70%)] text-[hsl(var(--maroon-deep))] font-display text-sm tracking-widest uppercase hover:bg-[hsl(46_90%_80%)] transition-colors"
        >
          Enter Wedding
        </motion.button>
      )}

      {/* Subtle overlay to match theme during transition */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/40 via-transparent to-black/40" />
    </motion.div>
  );
};
