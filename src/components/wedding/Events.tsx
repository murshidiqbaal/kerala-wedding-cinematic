import { motion } from "framer-motion";
import { wedding } from "@/data/wedding";
import { Divider } from "./Divider";
import { Calendar, Clock, MapPin } from "lucide-react";

export const Events = () => (
  <section className="py-24 px-6 gradient-ivory relative">
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 1 }}
        className="text-center mb-4"
      >
        <p className="font-display text-xs tracking-[0.4em] uppercase text-[hsl(var(--gold-deep))] mb-3">Celebrations</p>
        <h2 className="font-serif-elegant text-5xl sm:text-6xl text-[hsl(var(--maroon))]">Wedding Events</h2>
      </motion.div>
      <Divider />

      <div className="space-y-5 mt-10">
        {wedding.events.map((e, i) => (
          <motion.div
            key={e.name}
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="bg-card rounded-xl p-6 sm:p-8 shadow-soft gold-border hover:shadow-gold transition-all duration-500 hover:-translate-y-1"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif-elegant text-3xl text-[hsl(var(--maroon))]">{e.name}</h3>
                <div className="ornate-divider w-20 my-3" />
                <p className="font-serif-elegant italic text-[hsl(var(--gold-deep))]">{e.location}</p>
              </div>
              <div className="flex sm:flex-col gap-4 sm:gap-2 sm:text-right text-sm text-[hsl(var(--maroon)/0.85)]">
                <div className="flex items-center gap-2 sm:justify-end">
                  <Calendar size={14} className="text-[hsl(var(--gold-deep))]" />
                  <span>{e.date}</span>
                </div>
                <div className="flex items-center gap-2 sm:justify-end">
                  <Clock size={14} className="text-[hsl(var(--gold-deep))]" />
                  <span>{e.time}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
