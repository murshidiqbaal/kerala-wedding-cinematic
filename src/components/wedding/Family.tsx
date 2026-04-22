import { motion } from "framer-motion";
import { wedding } from "@/data/wedding";
import { Divider } from "./Divider";

const Card = ({ title, name, parents, place, delay = 0 }: { title: string; name: string; parents: string; place: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }} transition={{ duration: 1, delay }}
    className="text-center px-6"
  >
    <p className="font-display text-xs tracking-[0.4em] uppercase text-[hsl(var(--gold-deep))] mb-4">{title}</p>
    <h3 className="font-serif-elegant text-5xl text-[hsl(var(--maroon))] gradient-gold-text">{name}</h3>
    <div className="ornate-divider w-32 mx-auto my-4" />
    <p className="font-serif-elegant text-lg text-[hsl(var(--maroon))]">{parents}</p>
    <p className="font-serif-elegant italic text-sm text-[hsl(var(--maroon)/0.7)] mt-1">{place}</p>
  </motion.div>
);

export const Family = () => (
  <section className="py-24 px-6 gradient-ivory">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-4">
        <p className="font-display text-xs tracking-[0.4em] uppercase text-[hsl(var(--gold-deep))] mb-3">With Blessings From</p>
        <h2 className="font-serif-elegant text-5xl sm:text-6xl text-[hsl(var(--maroon))]">Our Families</h2>
      </div>
      <Divider />
      <div className="grid md:grid-cols-2 gap-12 mt-10">
        <Card title={wedding.family.bride.title} name={wedding.bride} parents={wedding.family.bride.parents} place={wedding.family.bride.place} />
        <Card title={wedding.family.groom.title} name={wedding.groom} parents={wedding.family.groom.parents} place={wedding.family.groom.place} delay={0.2} />
      </div>
    </div>
  </section>
);
