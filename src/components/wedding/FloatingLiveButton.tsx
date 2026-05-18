import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Sparkles } from "lucide-react";

export const FloatingLiveButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const navigate = useNavigate();

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

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-6 right-6 z-[60] flex items-center justify-end select-none">
          {/* Custom Elegant Hover Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, x: -10, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -10, scale: 0.95 }}
                className="absolute right-16 mr-1 px-3.5 py-2 rounded-xl bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border border-white/50 dark:border-stone-850 text-foreground font-serif italic text-xs tracking-wide shadow-lg flex items-center gap-1.5 whitespace-nowrap"
              >
                <Sparkles className="h-3.5 w-3.5 text-luxury-gold shrink-0 fill-luxury-gold/20" />
                <span>Relive Live Photos</span>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 30 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onClick={() => navigate("/live-photos")}
            className="h-14 w-14 rounded-full bg-gradient-to-tr from-luxury-gold via-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-800 text-stone-950 flex items-center justify-center shadow-[0_4px_25px_rgba(212,175,55,0.4)] border border-amber-400/20 group relative cursor-pointer"
            aria-label="Live Photos"
          >
            {/* Camera Icon */}
            <Camera className="h-5.5 w-5.5 shrink-0 group-hover:scale-105 transition-transform duration-300" />
            
            {/* Pulse Live dot indicator in top right of circle */}
            <span className="absolute top-1 right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border border-stone-950/20"></span>
            </span>
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  );
};

