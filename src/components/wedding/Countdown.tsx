import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { wedding } from "@/data/wedding";
import { Divider } from "./Divider";

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
    <section className="py-20 px-6 gradient-royal text-[hsl(39_60%_96%)] relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: "var(--gradient-divine)" }} />
      <div className="relative max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 1 }}
          className="font-serif-elegant text-4xl sm:text-5xl gradient-gold-text mb-2"
        >
          Counting Every Moment
        </motion.h2>
        <Divider light />
        <div className="grid grid-cols-4 gap-2 sm:gap-6 mt-8">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.8 }}
              className="gold-border bg-[hsl(var(--maroon-deep)/0.6)] backdrop-blur-sm rounded-lg p-3 sm:p-6"
            >
              <div className="font-serif-elegant text-3xl sm:text-6xl gradient-gold-text leading-none tabular-nums">
                {String(item.value).padStart(2, "0")}
              </div>
              <div className="font-display text-[10px] sm:text-xs tracking-[0.3em] uppercase mt-2 text-[hsl(46_80%_70%)]">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
