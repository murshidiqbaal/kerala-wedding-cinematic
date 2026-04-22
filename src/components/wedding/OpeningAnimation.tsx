import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import templeDoors from "@/assets/temple-doors.jpg";
import { wedding } from "@/data/wedding";

interface Props { onComplete: () => void; }

export const OpeningAnimation = ({ onComplete }: Props) => {
  const [stage, setStage] = useState(0); // 0 black, 1 doors visible, 2 doors open, 3 names

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 600);
    const t2 = setTimeout(() => setStage(2), 1800);
    const t3 = setTimeout(() => setStage(3), 4200);
    const t4 = setTimeout(() => onComplete(), 8500);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-hidden bg-black"
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
    >
      {/* Light burst behind doors */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-[120vmin] h-[120vmin] rounded-full"
          style={{ background: "radial-gradient(circle, hsl(46 90% 65% / 0.9) 0%, hsl(40 70% 38% / 0.5) 30%, transparent 70%)" }}
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{ opacity: stage >= 2 ? 1 : 0, scale: stage >= 2 ? 1.4 : 0.2 }}
          transition={{ duration: 3, ease: "easeOut" }}
        />
      </div>

      {/* Doors */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: "1500px" }}>
        <div className="relative w-full max-w-2xl h-full flex">
          <motion.div
            className="w-1/2 h-full origin-left bg-cover bg-right"
            style={{ backgroundImage: `url(${templeDoors})`, backgroundSize: "200% 100%", backgroundPosition: "left center" }}
            initial={{ rotateY: 0, opacity: 0 }}
            animate={{
              opacity: stage >= 1 ? 1 : 0,
              rotateY: stage >= 2 ? -110 : 0,
            }}
            transition={{ opacity: { duration: 1 }, rotateY: { duration: 2.8, ease: [0.7, 0, 0.3, 1] } }}
          />
          <motion.div
            className="w-1/2 h-full origin-right bg-cover"
            style={{ backgroundImage: `url(${templeDoors})`, backgroundSize: "200% 100%", backgroundPosition: "right center" }}
            initial={{ rotateY: 0, opacity: 0 }}
            animate={{
              opacity: stage >= 1 ? 1 : 0,
              rotateY: stage >= 2 ? 110 : 0,
            }}
            transition={{ opacity: { duration: 1 }, rotateY: { duration: 2.8, ease: [0.7, 0, 0.3, 1] } }}
          />
        </div>
      </div>

      {/* Floating particles */}
      <AnimatePresence>
        {stage >= 2 && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-[hsl(46_90%_65%)]"
                style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, boxShadow: "0 0 8px hsl(46 90% 65%)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: [0, 1, 0], y: [-20, -120] }}
                transition={{ duration: 4 + Math.random() * 3, delay: Math.random() * 2, repeat: Infinity, ease: "easeOut" }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Names */}
      <AnimatePresence>
        {stage >= 3 && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1.2 }}
              className="font-display text-[hsl(46_80%_70%)] text-xs sm:text-sm tracking-[0.3em] uppercase mb-4"
            >
              With the blessings of God and elders
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1.2 }}
              className="font-serif-elegant italic text-[hsl(39_60%_96%)] text-sm sm:text-base mb-8"
            >
              Together with their families
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4, duration: 1.5 }}
              className="font-serif-elegant text-5xl sm:text-7xl md:text-8xl gradient-gold-text mb-2"
              style={{ textShadow: "0 0 40px hsl(46 80% 60% / 0.6)" }}
            >
              {wedding.bride}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="font-display text-[hsl(46_80%_70%)] text-xl my-2"
            >
              &amp;
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.4, duration: 1.5 }}
              className="font-serif-elegant text-5xl sm:text-7xl md:text-8xl gradient-gold-text mb-8"
              style={{ textShadow: "0 0 40px hsl(46 80% 60% / 0.6)" }}
            >
              {wedding.groom}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.2, duration: 1 }}
              className="font-serif-elegant italic text-[hsl(39_60%_96%)] text-sm sm:text-base"
            >
              invite you to celebrate their wedding
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
