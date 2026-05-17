import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Sparkles } from "lucide-react";

export const FloatingLiveButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Control visibility of floating button based on page scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToMemories = () => {
    const element = document.getElementById("memories");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 30 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToMemories}
          className="fixed bottom-6 right-6 z-[49] flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 px-4 py-3 text-stone-950 font-bold text-xs tracking-wide shadow-[0_4px_25px_rgba(245,158,11,0.4)] border border-amber-400/20 select-none group"
        >
          {/* Pulse Live dot indicator */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>

          <Camera className="h-4 w-4 shrink-0" />
          
          <span className="font-serif">Live Photos</span>

          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="text-amber-300 ml-0.5"
          >
            <Sparkles className="h-3 w-3 fill-amber-300 shrink-0" />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
