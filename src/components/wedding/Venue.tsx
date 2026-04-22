import { motion } from "framer-motion";
import { wedding } from "@/data/wedding";
import { Divider } from "./Divider";
import { MapPin, Navigation } from "lucide-react";

export const Venue = () => (
  <section className="py-24 px-6 bg-[hsl(var(--maroon-deep))] text-[hsl(39_60%_96%)]">
    <div className="max-w-4xl mx-auto text-center">
      <p className="font-display text-xs tracking-[0.4em] uppercase text-[hsl(46_80%_70%)] mb-3">Location</p>
      <h2 className="font-serif-elegant text-5xl sm:text-6xl gradient-gold-text">The Venue</h2>
      <Divider light />
      <motion.div
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 1 }}
      >
        <h3 className="font-serif-elegant text-3xl mt-6 text-[hsl(46_80%_70%)]">{wedding.venue.name}</h3>
        <p className="font-serif-elegant italic mt-2 flex items-center justify-center gap-2">
          <MapPin size={16} className="text-[hsl(var(--gold))]" /> {wedding.venue.address}
        </p>

        <motion.div
          whileInView={{ opacity: 1, scale: 1 }} initial={{ opacity: 0, scale: 0.95 }}
          viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }}
          className="mt-8 rounded-xl overflow-hidden gold-border shadow-elegant"
        >
          <iframe
            src={wedding.venue.mapEmbed}
            className="w-full h-[300px] sm:h-[400px]"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="venue map"
          />
        </motion.div>

        <a
          href={wedding.venue.directions} target="_blank" rel="noreferrer"
          className="inline-flex items-center gap-2 mt-8 px-8 py-3 rounded-full bg-[hsl(var(--gold))] text-[hsl(var(--maroon-deep))] font-display text-xs tracking-[0.3em] uppercase shadow-gold hover:scale-105 transition-transform"
        >
          <Navigation size={16} /> Get Directions
        </a>
      </motion.div>
    </div>
  </section>
);
