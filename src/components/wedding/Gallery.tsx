import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wedding } from "@/data/wedding";
import { X } from "lucide-react";

export const Gallery = () => {
  const [open, setOpen] = useState<string | null>(null);
  
  return (
    <section className="section-spacing px-6 bg-foreground text-background overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <p className="font-inter text-[10px] md:text-xs uppercase tracking-[0.5em] text-luxury-gold/80 mb-4">Gallery</p>
          <h2 className="font-display text-4xl md:text-6xl text-background">Cherished Moments</h2>
          <div className="h-[1px] w-12 bg-luxury-gold/30 mx-auto mt-6" />
        </motion.div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {wedding.gallery.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="break-inside-avoid relative group cursor-none"
              onClick={() => setOpen(src)}
            >
              <div className="overflow-hidden bg-background/10">
                <img
                  src={src} 
                  alt="" 
                  loading="lazy"
                  className="w-full h-auto object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
              </div>
              
              {/* Custom Cursor/Label on Hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/20 backdrop-blur-[2px]">
                <span className="font-inter text-[10px] uppercase tracking-widest text-white border border-white/30 px-4 py-2">
                  View
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
            onClick={() => setOpen(null)}
          >
            <button 
              className="absolute top-8 right-8 text-foreground transition-transform hover:rotate-90 duration-300" 
              onClick={() => setOpen(null)}
            >
              <X size={32} strokeWidth={1} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full h-full flex items-center justify-center"
            >
              <img
                src={open} 
                alt="" 
                className="max-h-full max-w-full object-contain luxury-shadow"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
