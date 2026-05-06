import { motion } from "framer-motion";
import { wedding } from "@/data/wedding";

export const LoveStory = () => (
  <section className="section-spacing px-6 bg-background">
    <div className="max-w-6xl mx-auto">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {wedding.story.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="group"
          >
            <div className="bg-white p-4 luxury-shadow overflow-hidden transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-2">
              <div className="relative aspect-[4/5] overflow-hidden mb-6">
                <img 
                  src={s.image} 
                  alt={s.title} 
                  className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              <div className="px-2 pb-4">
                <p className="font-inter text-[10px] uppercase tracking-[0.3em] text-luxury-gold mb-2">{s.year}</p>
                <h3 className="font-display text-2xl mb-3 text-foreground">{s.title}</h3>
                <p className="font-inter text-sm text-soft-grey leading-relaxed">
                  {s.text}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
