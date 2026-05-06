import { motion, Variants } from "framer-motion";
import { wedding } from "@/data/wedding";
import { Pencil } from "lucide-react";

export const Signature = () => {
  const brideName = wedding?.bride ? (wedding.bride.charAt(0).toUpperCase() + wedding.bride.slice(1)) : "";
  const groomName = wedding?.groom || "";
  const fullName = groomName && brideName ? `${groomName} & ${brideName}` : "";

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 1.5,
        ease: [0.22, 1, 0.36, 1],
        when: "beforeChildren",
        staggerChildren: 0.5
      }
    }
  };

  const pencilVariants: Variants = {
    hidden: { left: "0%", opacity: 0 },
    visible: { 
      left: "100%", 
      opacity: [0, 1, 1, 0],
      transition: { 
        duration: 4, 
        ease: "easeInOut",
        opacity: { times: [0, 0.1, 0.9, 1] }
      }
    }
  };

  const textVariants: Variants = {
    hidden: { clipPath: "inset(0% 100% 0% 0%)" },
    visible: { 
      clipPath: "inset(0% 0% 0% 0%)",
      transition: { 
        duration: 4, 
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="py-32 px-6 bg-background flex flex-col items-center justify-center relative overflow-hidden">
      {/* Decorative subtle background circle */}
      <div className="absolute w-96 h-96 bg-luxury-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="text-center relative z-10 w-full max-w-[100vw] overflow-x-hidden overflow-y-visible pt-10"
      >
        <p className="font-inter text-[10px] md:text-xs uppercase tracking-[0.5em] text-soft-grey mb-12 px-4">
          With all our love
        </p>

        {/* Signature Animation */}
        <div className="relative inline-block max-w-full">
          {/* Pencil Icon Animation */}
          <motion.div
            variants={pencilVariants}
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
            variants={textVariants}
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
