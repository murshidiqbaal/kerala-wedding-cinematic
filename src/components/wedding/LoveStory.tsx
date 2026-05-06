import { motion } from "framer-motion";
import { wedding } from "@/data/wedding";

export const LoveStory = () => {
  // Duplicate the story array a few times to create a seamless infinite marquee effect
  const marqueeItems = [...wedding.story, ...wedding.story, ...wedding.story];

  return (
    <section className="section-spacing bg-background relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <p className="font-inter text-[10px] md:text-xs uppercase tracking-[0.5em] text-luxury-gold mb-4">Our Journey</p>
          <h2 className="font-display text-4xl md:text-6xl text-foreground">Our Love Story</h2>
          <div className="h-[1px] w-12 bg-luxury-gold/30 mx-auto mt-6" />
        </motion.div>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden flex py-10">
        {/* Soft edge fading */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <motion.div 
          className="flex gap-8 px-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
        >
          {marqueeItems.map((s, i) => {
            // Give each card a slight random rotation between -4deg and 4deg
            const rotation = (i % 2 === 0 ? 1 : -1) * (1 + (i % 3));
            
            return (
              <div
                key={s.title + "-" + i}
                className="shrink-0 w-[260px] group transition-transform duration-500 hover:scale-105 hover:z-20 relative"
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                {/* Polaroid Frame */}
                <div className="bg-white p-4 pb-8 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)] flex flex-col h-full border border-gray-100">
                  <div className="relative aspect-square overflow-hidden mb-4 bg-gray-100">
                    <img 
                      src={s.image} 
                      alt={s.title} 
                      className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
                  </div>
                  
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <h3 className="text-3xl text-foreground" style={{ fontFamily: "'Great Vibes', cursive" }}>{s.title}</h3>
                    <p className="font-inter text-[9px] uppercase tracking-widest text-luxury-gold mt-2">{s.year}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

