import { motion } from "framer-motion";
import { wedding } from "@/data/wedding";

export const Closing = () => (
  <section className="relative py-48 px-6 bg-background overflow-hidden">
    {/* Subtle gradient background */}
    <div className="absolute inset-0 bg-gradient-to-b from-background via-white to-background" />
    
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative max-w-2xl mx-auto text-center"
    >
      <p className="font-inter text-[10px] uppercase tracking-[0.5em] text-luxury-gold mb-8">Final Word</p>
      
      <h2 className="font-display text-4xl md:text-6xl text-foreground mb-12 leading-tight">
        We look forward to <br /> celebrating with you
      </h2>
      
      <div className="h-[1px] w-12 bg-luxury-gold/30 mx-auto mb-12" />

      <h3 className="font-display text-2xl md:text-3xl text-foreground mb-4">
        {wedding.groom} <span className="text-luxury-gold italic lowercase text-xl">&</span> {wedding.bride}
      </h3>
      
      <p className="font-inter text-[10px] uppercase tracking-[0.4em] text-soft-grey">
        {wedding.dateLabel}
      </p>

      {/* Subtle floating element */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="mt-20 text-luxury-gold/30"
      >
        ✦
      </motion.div>
    </motion.div>
  </section>
);
