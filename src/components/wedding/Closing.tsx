import { motion } from "framer-motion";
import { wedding } from "@/data/wedding";
import { Divider } from "./Divider";

export const Closing = () => (
  <section className="relative py-32 px-6 gradient-royal text-[hsl(39_60%_96%)] overflow-hidden">
    <div className="absolute inset-0" style={{ background: "var(--gradient-divine)" }} />
    {/* Falling petals */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 18 }).map((_, i) => (
        <div
          key={i}
          className="absolute top-0 w-3 h-3 rounded-full opacity-70 animate-float-petal"
          style={{
            left: `${(i * 5.5) % 100}%`,
            background: `radial-gradient(circle, hsl(${i % 2 === 0 ? "46 80% 65%" : "350 70% 50%"}), transparent)`,
            animationDuration: `${8 + (i % 5) * 2}s`,
            animationDelay: `${i * 0.6}s`,
          }}
        />
      ))}
    </div>

    <motion.div
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 1.5 }}
      className="relative max-w-2xl mx-auto text-center"
    >
      <Divider light />
      <p className="font-serif-elegant italic text-2xl sm:text-3xl text-[hsl(46_80%_70%)] leading-relaxed mt-6">
        "We await your presence to bless our union"
      </p>
      <p className="text-3xl mt-4">❤️</p>
      <Divider light />
      <h3 className="font-serif-elegant text-4xl sm:text-5xl gradient-gold-text mt-6">
        {wedding.bride} <span className="text-[hsl(46_80%_70%)] italic text-2xl">&amp;</span> {wedding.groom}
      </h3>
      <p className="font-display text-xs tracking-[0.4em] uppercase text-[hsl(46_80%_70%/0.7)] mt-6">
        {wedding.dateLabel}
      </p>
    </motion.div>
  </section>
);
