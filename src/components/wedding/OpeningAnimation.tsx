import { motion } from "framer-motion";
import { wedding } from "@/data/wedding";

interface Props { onComplete: () => void; }

export const OpeningAnimation = ({ onComplete }: Props) => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background px-6"
      exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="text-center"
      >
        <p className="font-inter text-[10px] md:text-xs uppercase tracking-[0.4em] text-soft-grey mb-8">
          The Wedding of
        </p>
        
        <h1 className="font-display text-4xl md:text-7xl mb-6 flex flex-col md:flex-row items-center gap-2 md:gap-8">
          <span className="opacity-90">{wedding.groom}</span>
          <span className="text-luxury-gold italic lowercase text-2xl md:text-4xl">&</span>
          <span className="opacity-90">{wedding.bride}</span>
        </h1>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100px" }}
          transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
          className="h-[1px] bg-luxury-gold/30 mx-auto mb-12"
        />

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          onClick={onComplete}
          className="group relative px-12 py-4 overflow-hidden bg-foreground text-background transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <span className="relative z-10 font-inter text-[10px] uppercase tracking-[0.3em]">
            Enter Experience
          </span>
          <div className="absolute inset-0 bg-luxury-gold translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
        </motion.button>
      </motion.div>

      {/* Subtle background ambient elements */}
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-luxury-gold/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 blur-[120px] rounded-full animate-pulse delay-1000" />
      </div>
    </motion.div>
  );
};
