import coupleImg from "@/assets/optimized/couple-hero.webp";
import { wedding } from "@/data/wedding";
import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col md:flex-row bg-background overflow-hidden">
      {/* Left side: Text Content */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-20 py-20 relative z-10 bg-background">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl"
        >
          <p className="font-inter text-[10px] md:text-xs uppercase tracking-[0.5em] text-luxury-gold mb-8">
            The Wedding Invitation
          </p>
          
          <h1 className="font-display text-5xl md:text-8xl lg:text-9xl mb-8 leading-[0.9] text-foreground">
            {wedding.groom} <br />
            <span className="text-luxury-gold italic lowercase text-3xl md:text-6xl">&</span> <br />
            {wedding.bride}
          </h1>

          <div className="h-[1px] w-24 bg-luxury-gold/30 mb-8" />

          <p className="font-display text-xs md:text-sm tracking-[0.4em] uppercase text-soft-grey mb-4">
            {wedding.dateLabel}
          </p>
          
          <p className="font-inter text-sm md:text-base text-soft-grey italic max-w-xs">
            {wedding.tagline}
          </p>
        </motion.div>
      </div>

      {/* Right side: Image */}
      <div className="flex-1 relative h-[50vh] md:h-screen overflow-hidden">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full"
        >
          <img 
            src={coupleImg} 
            alt="The Couple" 
            className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000"
          />
        </motion.div>
        
        {/* Subtle overlay for mobile text readability if needed */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent md:hidden" />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-8 md:left-20 z-20 flex items-center gap-4"
      >
        <div className="w-8 h-[1px] bg-luxury-gold" />
        <span className="font-inter text-[10px] uppercase tracking-widest text-soft-grey animate-pulse">
          Scroll to explore
        </span>
      </motion.div>
    </section>
  );
};
