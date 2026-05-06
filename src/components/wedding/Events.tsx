import { motion } from "framer-motion";
import { wedding } from "@/data/wedding";
import { Calendar, Clock, MapPin, ExternalLink } from "lucide-react";

export const Events = () => (
  <section className="section-spacing px-6 bg-background relative overflow-hidden">
    {/* Background decoration */}
    <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-luxury-gold/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
    
    <div className="max-w-5xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-16"
      >
        <p className="font-inter text-[10px] md:text-xs uppercase tracking-[0.5em] text-luxury-gold mb-4">Celebrations</p>
        <h2 className="font-display text-4xl md:text-6xl text-foreground">Wedding Events</h2>
        <div className="h-[1px] w-12 bg-luxury-gold/30 mx-auto mt-6" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {wedding.events.map((e, i) => (
          <motion.div
            key={e.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="group"
          >
            <div className="glass-card p-8 md:p-10 h-full flex flex-col luxury-shadow transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-1 border border-white/50">
              <div className="mb-8">
                <h3 className="font-display text-2xl md:text-3xl text-foreground mb-4">{e.name}</h3>
                <div className="h-[1px] w-12 bg-luxury-gold/20 group-hover:w-20 transition-all duration-500" />
              </div>
              
              <div className="space-y-6 flex-grow">
                <div className="flex items-start gap-4">
                  <div className="mt-1 p-2 bg-white/50 rounded-full text-luxury-gold">
                    <Calendar size={18} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-inter text-[10px] uppercase tracking-widest text-soft-grey mb-1">Date</p>
                    <p className="font-display text-lg text-foreground">{e.date}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 p-2 bg-white/50 rounded-full text-luxury-gold">
                    <Clock size={18} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-inter text-[10px] uppercase tracking-widest text-soft-grey mb-1">Time</p>
                    <p className="font-display text-lg text-foreground">{e.time}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 p-2 bg-white/50 rounded-full text-luxury-gold">
                    <MapPin size={18} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-inter text-[10px] uppercase tracking-widest text-soft-grey mb-1">Location</p>
                    <p className="font-inter text-sm md:text-base text-foreground/80 leading-relaxed">
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
                  className="mt-10 inline-flex items-center gap-2 font-inter text-[10px] uppercase tracking-[0.2em] text-luxury-gold group/link"
                >
                  View on Map 
                  <ExternalLink size={12} className="transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
