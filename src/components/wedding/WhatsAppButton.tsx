import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wedding } from "@/data/wedding";
import { MessageCircle, Sparkles } from "lucide-react";

export const WhatsAppButton = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const msg = encodeURIComponent(`Congratulations on your upcoming wedding, ${wedding.bride} & ${wedding.groom}! 🤍`);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }} 
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2.2, duration: 1 }}
      className="fixed bottom-24 right-6 z-[60] flex items-center justify-end select-none"
    >
      {/* Custom Elegant Hover Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: -10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -10, scale: 0.95 }}
            className="absolute right-16 mr-1 px-3.5 py-2 rounded-xl bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border border-white/50 dark:border-stone-850 text-foreground font-serif italic text-xs tracking-wide shadow-lg flex items-center gap-1.5 whitespace-nowrap"
          >
            <Sparkles className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
            <span>Send Wishes</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        href={`https://wa.me/${wedding.whatsappNumber}?text=${msg}`}
        target="_blank" 
        rel="noreferrer"
        className="h-14 w-14 rounded-full bg-white/80 dark:bg-stone-900/80 backdrop-blur-md border border-white/50 dark:border-stone-850 hover:bg-white flex items-center justify-center text-stone-700 dark:text-stone-300 shadow-[0_4px_25px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_30px_rgba(16,185,129,0.2)] hover:text-emerald-500 transition-all duration-300 group cursor-pointer"
        aria-label="WhatsApp"
      >
        <MessageCircle size={22} strokeWidth={1.5} className="group-hover:scale-105 transition-transform duration-350" />
      </motion.a>
    </motion.div>
  );
};

