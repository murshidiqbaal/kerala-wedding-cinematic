import { motion } from "framer-motion";
import { wedding } from "@/data/wedding";
import { MapPin, Navigation, ExternalLink } from "lucide-react";

export const Venue = () => (
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
          <div className="relative aspect-video lg:aspect-square bg-background/5 p-2 border border-background/10 luxury-shadow">
            <iframe
              src={wedding.venue.mapEmbed}
              className="w-full h-full grayscale-[50%] contrast-[1.1] hover:grayscale-0 transition-all duration-1000"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="venue map"
            />
          </div>
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
          
          <div className="space-y-8 mb-12">
            <div>
              <h3 className="font-display text-2xl text-background mb-3">{wedding.venue.name}</h3>
              <div className="h-[1px] w-12 bg-luxury-gold/30 mb-4" />
              <p className="font-inter text-background/60 leading-relaxed flex items-start gap-3">
                <MapPin size={18} className="text-luxury-gold shrink-0 mt-1" />
                {wedding.venue.address}
              </p>
            </div>
            
            <p className="font-inter text-sm text-background/50 leading-relaxed italic">
              Join us at this beautiful venue as we begin our new chapter together. 
              Ample parking is available for all guests.
            </p>
          </div>

          <a
            href={wedding.venue.directions} 
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
      </div>
    </div>
  </section>
);
