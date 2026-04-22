import { motion } from "framer-motion";
import { wedding } from "@/data/wedding";
import { MessageCircle } from "lucide-react";

export const WhatsAppButton = () => {
  const msg = encodeURIComponent(`Congratulations on your upcoming wedding, ${wedding.bride} & ${wedding.groom}! 💛`);
  return (
    <motion.a
      initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, type: "spring" }}
      href={`https://wa.me/${wedding.whatsappNumber}?text=${msg}`}
      target="_blank" rel="noreferrer"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-elegant hover:scale-110 transition-transform"
      aria-label="WhatsApp"
    >
      <MessageCircle size={22} />
    </motion.a>
  );
};
