import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wedding } from "@/data/wedding";
import { Divider } from "./Divider";
import { X } from "lucide-react";

export const Gallery = () => {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <section className="py-24 px-6 bg-[hsl(var(--maroon-deep))] text-[hsl(39_60%_96%)] relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 1 }}
          className="text-center mb-4"
        >
          <p className="font-display text-xs tracking-[0.4em] uppercase text-[hsl(46_80%_70%)] mb-3">Memories</p>
          <h2 className="font-serif-elegant text-5xl sm:text-6xl gradient-gold-text">Cherished Moments</h2>
        </motion.div>
        <Divider light />

        <div className="columns-2 sm:columns-3 gap-3 sm:gap-4 mt-10 [&>*]:mb-3 sm:[&>*]:mb-4">
          {wedding.gallery.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.1 }}
              className="break-inside-avoid overflow-hidden rounded-lg gold-border cursor-pointer group relative"
              onClick={() => setOpen(src)}
            >
              <img
                src={src} alt="" loading="lazy"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--maroon-deep)/0.6)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-6"
            onClick={() => setOpen(null)}
          >
            <button className="absolute top-6 right-6 text-[hsl(46_80%_70%)]" onClick={() => setOpen(null)}>
              <X size={32} />
            </button>
            <motion.img
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              src={open} alt="" className="max-h-[90vh] max-w-full rounded-lg gold-border shadow-elegant"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
