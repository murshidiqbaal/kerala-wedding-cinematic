import { motion } from "framer-motion";
import { wedding } from "@/data/wedding";
import { Divider } from "./Divider";

export const LoveStory = () => (
  <section className="py-24 px-6 gradient-ivory relative">
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 1 }}
        className="text-center mb-4"
      >
        <p className="font-display text-xs tracking-[0.4em] uppercase text-[hsl(var(--gold-deep))] mb-3">Our Journey</p>
        <h2 className="font-serif-elegant text-5xl sm:text-6xl text-[hsl(var(--maroon))]">Our Love Story</h2>
      </motion.div>
      <Divider />

      <div className="relative mt-12">
        <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[hsl(var(--gold)/0.5)] to-transparent" />
        {wedding.story.map((s, i) => {
          const isLeft = i % 2 === 0;
          return (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, x: isLeft ? -40 : 40, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9 }}
              className={`relative flex flex-col sm:flex-row items-center gap-6 mb-16 ${isLeft ? "" : "sm:flex-row-reverse"}`}
            >
              <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[hsl(var(--gold))] shadow-gold animate-glow-pulse" />
              <div className="w-full sm:w-1/2 pl-12 sm:pl-0 sm:px-8">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="overflow-hidden rounded-lg shadow-elegant gold-border"
                >
                  <img src={s.image} alt={s.title} loading="lazy" className="w-full h-56 sm:h-72 object-cover" />
                </motion.div>
              </div>
              <div className={`w-full sm:w-1/2 pl-12 sm:pl-0 sm:px-8 ${isLeft ? "sm:text-right" : "sm:text-left"}`}>
                <p className="font-display text-xs tracking-[0.3em] text-[hsl(var(--gold-deep))]">{s.year}</p>
                <h3 className="font-serif-elegant text-3xl sm:text-4xl text-[hsl(var(--maroon))] my-2">{s.title}</h3>
                <p className="font-serif-elegant italic text-base text-[hsl(var(--maroon)/0.8)]">{s.text}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);
