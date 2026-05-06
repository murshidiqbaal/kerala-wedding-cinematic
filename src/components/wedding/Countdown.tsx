import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { wedding } from "@/data/wedding";

const calc = (target: Date) => {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

export const Countdown = () => {
  const target = new Date(wedding.date);
  const [t, setT] = useState(calc(target));

  useEffect(() => {
    const i = setInterval(() => setT(calc(target)), 1000);
    return () => clearInterval(i);
  }, []);

  const items = [
    { label: "Days", value: t.days },
    { label: "Hours", value: t.hours },
    { label: "Minutes", value: t.minutes },
    { label: "Seconds", value: t.seconds },
  ];

  return (
    <section className="section-spacing px-6 bg-background">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <p className="font-inter text-[10px] md:text-xs uppercase tracking-[0.5em] text-luxury-gold mb-4">The Countdown</p>
          <h2 className="font-display text-4xl md:text-6xl text-foreground">Until We Say I Do</h2>
          <div className="h-[1px] w-12 bg-luxury-gold/30 mx-auto mt-6" />
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-20">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center"
            >
              <div className="font-display text-5xl md:text-8xl text-foreground tabular-nums leading-none">
                {String(item.value).padStart(2, "0")}
              </div>
              <div className="h-[1px] w-8 bg-luxury-gold/20 my-4" />
              <div className="font-inter text-[10px] md:text-xs uppercase tracking-[0.3em] text-luxury-gold/80">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
