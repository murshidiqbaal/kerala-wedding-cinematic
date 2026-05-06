import { wedding } from "@/data/wedding";
import { motion } from "framer-motion";

const FamilyMember = ({ title, name, parents, place, delay = 0 }: { title: string; name: string; parents: string; place: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
    className="flex flex-col items-center text-center"
  >
    <p className="font-inter text-[10px] uppercase tracking-[0.4em] text-luxury-gold mb-6">{title}</p>
    <h3 className="font-display text-4xl md:text-6xl text-foreground mb-4">{name}</h3>
    <div className="h-[1px] w-8 bg-luxury-gold/20 mb-6" />
    <p className="font-display text-xl text-foreground/80 mb-1">{parents}</p>
    <p className="font-inter text-xs tracking-widest text-soft-grey uppercase">{place}</p>
  </motion.div>
);

export const Family = () => (
  <section className="section-spacing px-6 bg-background">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-24"
      >
        <p className="font-inter text-[10px] md:text-xs uppercase tracking-[0.5em] text-luxury-gold mb-4">With Blessings From</p>
        <h2 className="font-display text-4xl md:text-6xl text-foreground">Our Families</h2>
        <div className="h-[1px] w-12 bg-luxury-gold/30 mx-auto mt-6" />
      </motion.div>

      <div className="grid md:grid-cols-2 gap-24 lg:gap-40">
        <FamilyMember 
          title={wedding.family.bride.title} 
          name={wedding.bride} 
          parents={wedding.family.bride.parents} 
          place={wedding.family.bride.place} 
        />
        <FamilyMember 
          title={wedding.family.groom.title} 
          name={wedding.groom} 
          parents={wedding.family.groom.parents} 
          place={wedding.family.groom.place} 
          delay={0.2} 
        />
      </div>
    </div>
  </section>
);
