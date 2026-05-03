import coupleImg from "@/assets/optimized/couple-hero.webp";
import { wedding } from "@/data/wedding";
import { motion } from "framer-motion";
import { Divider } from "./Divider";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-royal">
      {/* Background Image with Blur */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center blur-[4px] scale-110 opacity-70"
          style={{ backgroundImage: `url(${coupleImg})` }}
        />
        {/* Overlays to blend the image with the theme - slightly darker for better text pop */}
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--maroon-deep))] via-[hsl(var(--maroon-deep))/0.4] to-[hsl(var(--maroon-deep))]" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(circle at center, transparent 0%, hsl(var(--maroon-deep)) 100%)", opacity: 0.8 }} />
      </div>

      {/* Hero Text Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl flex flex-col items-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="font-display text-[hsl(46_80%_70%)] text-xs sm:text-sm tracking-[0.4em] uppercase mb-6"
        >
          ✦ The Wedding Of ✦
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="font-serif-elegant text-6xl sm:text-8xl md:text-9xl gradient-gold-text leading-none"
          style={{ textShadow: "0 0 50px hsl(46 80% 60% / 0.6), 0 0 100px hsl(0 0% 0% / 0.4)" }}
        >
          {wedding.bride}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="my-3 sm:my-5"
        >
          <span className="font-serif-elegant italic text-2xl sm:text-3xl text-[hsl(46_80%_70%)]">&amp;</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1.2 }}
          className="font-serif-elegant text-6xl sm:text-8xl md:text-9xl gradient-gold-text leading-none"
          style={{ textShadow: "0 0 50px hsl(46 80% 60% / 0.6), 0 0 100px hsl(0 0% 0% / 0.4)" }}
        >
          {wedding.groom}
        </motion.h1>

        <Divider light />

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.8 }}
          className="font-display text-[hsl(39_60%_96%)] text-sm sm:text-base tracking-[0.3em] uppercase"
        >
          {wedding.dateLabel}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 2.1 }}
          className="font-serif-elegant italic text-[hsl(39_60%_96%/0.95)] text-base sm:text-lg mt-4"
        >
          "{wedding.tagline}"
        </motion.p>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[hsl(46_80%_70%)] flex flex-col items-center gap-2 z-10"
      >
        <span className="font-display text-[10px] tracking-[0.4em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
          className="w-px h-10 bg-gradient-to-b from-[hsl(46_80%_70%)] to-transparent"
        />
      </motion.div>
    </section>
  );
};
