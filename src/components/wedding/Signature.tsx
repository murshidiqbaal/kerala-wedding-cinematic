import { motion } from "framer-motion";
import { wedding } from "@/data/wedding";

export const Signature = () => {
  return (
    <section className="py-32 px-6 bg-background flex flex-col items-center justify-center relative overflow-hidden">
      {/* Decorative subtle background circle */}
      <div className="absolute w-96 h-96 bg-luxury-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="text-center relative z-10"
      >
        <p className="font-inter text-[10px] md:text-xs uppercase tracking-[0.5em] text-soft-grey mb-12">
          With all our love
        </p>

        {/* Signature Animation */}
        <div className="relative">
          <motion.div
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 3, ease: "easeInOut", delay: 0.5 }}
            className="text-5xl md:text-8xl lg:text-9xl text-luxury-gold drop-shadow-sm"
            style={{ fontFamily: "'Great Vibes', cursive", paddingRight: "0.2em" }}
          >
            {wedding.groom} & {wedding.bride}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
