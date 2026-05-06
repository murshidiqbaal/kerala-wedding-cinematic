import { motion } from "framer-motion";
import { wedding } from "@/data/wedding";
import { Pencil } from "lucide-react";

export const Signature = () => {
  const brideName = wedding.bride.charAt(0).toUpperCase() + wedding.bride.slice(1);
  const fullName = `${wedding.groom} & ${brideName}`;

  return (
    <section className="py-32 px-6 bg-background flex flex-col items-center justify-center relative overflow-hidden">
      {/* Decorative subtle background circle */}
      <div className="absolute w-96 h-96 bg-luxury-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="text-center relative z-10 w-full max-w-[100vw] overflow-hidden"
      >
        <p className="font-inter text-[10px] md:text-xs uppercase tracking-[0.5em] text-soft-grey mb-12 px-4">
          With all our love
        </p>

        {/* Signature Animation */}
        <div className="relative inline-block max-w-full">
          {/* Pencil Icon Animation */}
          <motion.div
            initial={{ left: "0%", opacity: 0 }}
            whileInView={{ 
              left: ["0%", "100%"], 
              opacity: [0, 1, 1, 0] 
            }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ 
              duration: 4, 
              ease: "easeInOut", 
              delay: 0.8,
              opacity: { times: [0, 0.1, 0.9, 1] }
            }}
            className="absolute z-20 -top-4 md:-top-8 pointer-events-none"
            style={{ translateX: "-50%" }}
          >
            <motion.div
              animate={{ 
                rotate: [15, 25, 15, 30, 15],
                y: [0, -1, 0, -2, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 0.3, 
                ease: "linear" 
              }}
            >
              <Pencil className="w-6 h-6 md:w-10 md:h-10 text-luxury-gold/80 transform -scale-x-100" />
            </motion.div>
          </motion.div>

          {/* Text Reveal */}
          <motion.div
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 4, ease: "easeInOut", delay: 0.8 }}
            className="text-4xl sm:text-6xl md:text-9xl lg:text-[10rem] text-luxury-gold drop-shadow-sm px-6"
            style={{ 
              fontFamily: "'Mrs Saint Delafield', cursive", 
              whiteSpace: "nowrap",
              lineHeight: 1.2,
              letterSpacing: "0.02em"
            }}
          >
            {fullName}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
