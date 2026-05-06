import { motion } from "framer-motion";
import { wedding } from "@/data/wedding";
import { MessageCircle } from "lucide-react";

export const WhatsAppButton = () => {
  const msg = encodeURIComponent(`Congratulations on your upcoming wedding, ${wedding.bride} & ${wedding.groom}! 🤍`);
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }} 
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2.2, duration: 1 }}
      className="fixed bottom-24 right-8 z-[60]"
    >
      <motion.a
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        href={`https://wa.me/${wedding.whatsappNumber}?text=${msg}`}
        target="_blank" 
        rel="noreferrer"
        className="flex items-center gap-3 bg-white/80 backdrop-blur-md border border-white/50 px-6 py-3 luxury-shadow group overflow-hidden"
        aria-label="WhatsApp"
      >
        <div className="relative z-10 flex items-center gap-3">
          <MessageCircle size={18} strokeWidth={1.5} className="text-foreground group-hover:text-luxury-gold transition-colors duration-300" />
          <span className="font-inter text-[10px] uppercase tracking-[0.2em] text-foreground font-medium">
            Send Wishes
          </span>
        </div>
        <div className="absolute inset-0 bg-foreground translate-y-full group-hover:translate-y-0 transition-transform duration-500 opacity-[0.03]" />
      </motion.a>
    </motion.div>
  );
};
