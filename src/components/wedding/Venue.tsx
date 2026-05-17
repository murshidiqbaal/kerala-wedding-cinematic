import { useState } from "react";
import { wedding } from "@/data/wedding";
import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";

export const Venue = () => {
  const [activeVenue, setActiveVenue] = useState<'ceremony' | 'reception'>('ceremony');

  const isCeremony = activeVenue === 'ceremony';
  const name = isCeremony ? wedding.venue.name1 : wedding.venue.name2;
  const address = isCeremony ? wedding.venue.address1 : wedding.venue.address2;
  const mapEmbed = isCeremony ? wedding.venue.mapEmbed1 : wedding.venue.mapEmbed2;
  const directions = isCeremony ? wedding.venue.directions1 : wedding.venue.directions2;
  const description = isCeremony
    ? "Join us at the sacred temple as we exchange our vows and embark on a lifetime of togetherness."
    : "Join us at this beautiful venue as we celebrate our new chapter with dinner and reception.";

  return (
    <section className="section-spacing px-6 bg-foreground text-background overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:items-center">
          {/* Left: Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 order-2 lg:order-1"
          >
            <motion.div
              key={`map-${activeVenue}`}
              initial={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-video lg:aspect-square bg-background/5 p-2 border border-background/10 luxury-shadow"
            >
              <iframe
                src={mapEmbed}
                className="w-full h-full grayscale-[50%] contrast-[1.1] hover:grayscale-0 transition-all duration-1000"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="venue map"
              />
            </motion.div>
          </motion.div>

          {/* Right: Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 order-1 lg:order-2"
          >
            <p className="font-inter text-[10px] md:text-xs uppercase tracking-[0.5em] text-luxury-gold mb-4">The Location</p>
            <h2 className="font-display text-4xl md:text-6xl text-background mb-8 leading-tight">Where We Celebrate</h2>

            {/* Elegant Venue Selector Tabs */}
            <div className="flex gap-2 p-1 bg-background/5 border border-background/10 rounded-full max-w-xs mb-10 relative">
              <button
                onClick={() => setActiveVenue('ceremony')}
                className={`flex-1 py-3 px-5 rounded-full font-inter text-[10px] uppercase tracking-widest transition-all duration-300 relative z-10 ${
                  isCeremony ? 'text-foreground font-semibold' : 'text-background/50 hover:text-background/80'
                }`}
              >
                {isCeremony && (
                  <motion.div
                    layoutId="activeVenueBg"
                    className="absolute inset-0 bg-background rounded-full -z-10 shadow-lg"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                Ceremony
              </button>
              <button
                onClick={() => setActiveVenue('reception')}
                className={`flex-1 py-3 px-5 rounded-full font-inter text-[10px] uppercase tracking-widest transition-all duration-300 relative z-10 ${
                  !isCeremony ? 'text-foreground font-semibold' : 'text-background/50 hover:text-background/80'
                }`}
              >
                {!isCeremony && (
                  <motion.div
                    layoutId="activeVenueBg"
                    className="absolute inset-0 bg-background rounded-full -z-10 shadow-lg"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                Reception
              </button>
            </div>

            <motion.div
              key={`details-${activeVenue}`}
              initial={{ opacity: 0, y: 15, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="space-y-8 mb-12">
                <div>
                  <h3 className="font-display text-2xl text-background mb-3">{name}</h3>
                  <div className="h-[1px] w-12 bg-luxury-gold/30 mb-4" />
                  <p className="font-inter text-background/60 leading-relaxed flex items-start gap-3">
                    <MapPin size={18} className="text-luxury-gold shrink-0 mt-1" />
                    {address}
                  </p>
                </div>

                <p className="font-inter text-sm text-background/50 leading-relaxed italic">
                  {description}
                </p>
              </div>

              <a
                href={directions}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-4 bg-background text-foreground px-10 py-5 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="font-inter text-[10px] uppercase tracking-[0.3em]">
                  Get Directions
                </span>
                <div className="p-2 bg-foreground text-background rounded-full transition-transform group-hover:translate-x-1">
                  <Navigation size={14} />
                </div>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
