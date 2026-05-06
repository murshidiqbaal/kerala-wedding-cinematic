import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { wedding } from "@/data/wedding";
import { Calendar, Clock, MapPin, ExternalLink } from "lucide-react";

export const Events = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001
  });

  return (
    <section className="section-spacing px-6 bg-background relative overflow-hidden" ref={containerRef}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-luxury-gold/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-24"
        >
          <p className="font-inter text-[10px] md:text-xs uppercase tracking-[0.5em] text-luxury-gold mb-4">Celebrations</p>
          <h2 className="font-display text-4xl md:text-6xl text-foreground">Wedding Events</h2>
          <div className="h-[1px] w-12 bg-luxury-gold/30 mx-auto mt-6" />
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[1px] bg-luxury-gold/20 -translate-x-1/2" />
          <motion.div 
            className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-luxury-gold -translate-x-1/2 origin-top"
            style={{ scaleY: lineHeight }}
          />

          <div className="space-y-24">
            {wedding.events.map((e, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={e.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-[20px] md:left-1/2 top-0 md:top-1/2 w-4 h-4 rounded-full bg-background border-2 border-luxury-gold -translate-x-1/2 md:-translate-y-1/2 z-10 shadow-[0_0_15px_rgba(198,167,105,0.5)]" />

                  {/* Empty space for alternating layout on desktop */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Card Content */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <div className="glass-card p-8 hover:shadow-2xl transition-all duration-500 border border-white/50 relative group">
                      {/* Interactive glow border */}
                      <div className="absolute inset-0 border border-luxury-gold/0 group-hover:border-luxury-gold/30 transition-colors duration-500" />
                      
                      <div className={`mb-8 ${isEven ? "md:flex md:flex-col md:items-end" : ""}`}>
                        <h3 className="font-display text-2xl md:text-3xl text-foreground mb-4">{e.name}</h3>
                        <div className={`h-[1px] w-12 bg-luxury-gold/20 group-hover:w-24 transition-all duration-500 ${isEven ? "md:ml-auto" : ""}`} />
                      </div>
                      
                      <div className="space-y-6 flex-grow">
                        <div className={`flex items-start gap-4 ${isEven ? "md:flex-row-reverse" : ""}`}>
                          <div className="mt-1 p-2 bg-white/50 rounded-full text-luxury-gold shrink-0">
                            <Calendar size={18} strokeWidth={1.5} />
                          </div>
                          <div>
                            <p className="font-inter text-[10px] uppercase tracking-widest text-soft-grey mb-1">Date</p>
                            <p className="font-display text-lg text-foreground">{e.date}</p>
                          </div>
                        </div>

                        <div className={`flex items-start gap-4 ${isEven ? "md:flex-row-reverse" : ""}`}>
                          <div className="mt-1 p-2 bg-white/50 rounded-full text-luxury-gold shrink-0">
                            <Clock size={18} strokeWidth={1.5} />
                          </div>
                          <div>
                            <p className="font-inter text-[10px] uppercase tracking-widest text-soft-grey mb-1">Time</p>
                            <p className="font-display text-lg text-foreground">{e.time}</p>
                          </div>
                        </div>

                        <div className={`flex items-start gap-4 ${isEven ? "md:flex-row-reverse" : ""}`}>
                          <div className="mt-1 p-2 bg-white/50 rounded-full text-luxury-gold shrink-0">
                            <MapPin size={18} strokeWidth={1.5} />
                          </div>
                          <div>
                            <p className="font-inter text-[10px] uppercase tracking-widest text-soft-grey mb-1">Location</p>
                            <p className="font-inter text-sm text-foreground/80 leading-relaxed max-w-xs">
                              {e.location}
                            </p>
                          </div>
                        </div>
                      </div>

                      {e.mapLink && (
                        <a 
                          href={e.mapLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={`mt-10 inline-flex items-center gap-2 font-inter text-[10px] uppercase tracking-[0.2em] text-luxury-gold group/link ${isEven ? "md:justify-end" : ""}`}
                        >
                          View on Map 
                          <ExternalLink size={12} className={`transition-transform group-hover/link:-translate-y-1 ${isEven ? "md:-translate-x-1" : "translate-x-1"}`} />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
