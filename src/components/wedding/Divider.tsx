import divider from "@/assets/optimized/divider.webp";
import { motion } from "framer-motion";

export const Divider = ({ light = false }: { light?: boolean }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1.2 }}
    className="flex items-center justify-center gap-4 my-8"
  >
    <div className={`h-px flex-1 max-w-[80px] ${light ? "bg-[hsl(46_80%_70%/0.5)]" : "bg-[hsl(var(--gold)/0.5)]"}`} />
    <img src={divider} alt="" className="h-10 w-auto opacity-90" loading="lazy" />
    <div className={`h-px flex-1 max-w-[80px] ${light ? "bg-[hsl(46_80%_70%/0.5)]" : "bg-[hsl(var(--gold)/0.5)]"}`} />
  </motion.div>
);
