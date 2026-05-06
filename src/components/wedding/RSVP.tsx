import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Loader2, Send } from "lucide-react";
import { useState } from "react";

// TODO: Replace with your deployed Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwi_si7lLJg3kiwTc9xnVxPjmPTmSP3wQYKWU_xz6fg3K3dirI5fPIFp0jstjs_CgfJGA/exec";

export const RSVP = () => {
  const [form, setForm] = useState({ name: "", phone: "", attending: "yes", message: "" });
  const [isFocused, setIsFocused] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL === "YOUR_GOOGLE_SCRIPT_URL_HERE") {
      // Fallback if URL is not configured
      setTimeout(() => {
        toast({ title: "Thank you! 🤍", description: "Your RSVP has been received with love." });
        setForm({ name: "", phone: "", attending: "yes", message: "" });
        setIsLoading(false);
      }, 1000);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("Name", form.name);
      formData.append("Phone", form.phone);
      formData.append("Attending", form.attending);
      formData.append("Message", form.message);

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: formData,
      });

      toast({ title: "Thank you! 🤍", description: "Your RSVP has been received with love." });
      setForm({ name: "", phone: "", attending: "yes", message: "" });
    } catch (error) {
      toast({ title: "Oops!", description: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="section-spacing px-6 bg-foreground text-background overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-luxury-gold/5 blur-[150px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <p className="font-inter text-[10px] md:text-xs uppercase tracking-[0.5em] text-luxury-gold/80 mb-4">Reservation</p>
          <h2 className="font-display text-4xl md:text-6xl text-background mb-4">Kindly RSVP</h2>
          <div className="h-[1px] w-12 bg-luxury-gold/30 mx-auto mt-6" />
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          onSubmit={submit}
          className="space-y-8"
        >
          <div className="space-y-8">
            {[
              { key: "name", label: "Full Name", type: "text", placeholder: "e.g. John Doe" },
              { key: "phone", label: "Phone Number", type: "tel", placeholder: "e.g. +91 98765 43210" },
            ].map((f) => (
              <div key={f.key} className="relative group">
                <label className={`block font-inter text-[10px] uppercase tracking-[0.2em] mb-2 transition-colors duration-300 ${isFocused === f.key ? 'text-luxury-gold' : 'text-background/50'}`}>
                  {f.label}
                </label>
                <input
                  required
                  type={f.type}
                  placeholder={f.placeholder}
                  value={(form as any)[f.key]}
                  onFocus={() => setIsFocused(f.key)}
                  onBlur={() => setIsFocused(null)}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  disabled={isLoading}
                  className="w-full bg-transparent border-b border-background/20 py-4 font-display text-xl text-background placeholder:text-background/10 outline-none transition-all duration-500 focus:border-luxury-gold disabled:opacity-50"
                />
              </div>
            ))}
          </div>

          <div className="relative">
            <label className="block font-inter text-[10px] uppercase tracking-[0.2em] mb-4 text-background/50">
              Will you be attending?
            </label>
            <div className="flex gap-4">
              {["yes", "no"].map((v) => (
                <button
                  key={v}
                  type="button"
                  disabled={isLoading}
                  onClick={() => setForm({ ...form, attending: v })}
                  className={`flex-1 py-4 border transition-all duration-500 font-inter text-[10px] uppercase tracking-[0.2em] disabled:opacity-50 ${form.attending === v
                    ? "bg-luxury-gold border-luxury-gold text-background shadow-lg shadow-luxury-gold/20"
                    : "border-background/20 text-background/60 hover:border-background/40"
                    }`}
                >
                  {v === "yes" ? "Joyfully Attend" : "Regretfully Decline"}
                </button>
              ))}
            </div>
          </div>

          <div className="relative group">
            <label className={`block font-inter text-[10px] uppercase tracking-[0.2em] mb-2 transition-colors duration-300 ${isFocused === 'message' ? 'text-luxury-gold' : 'text-background/50'}`}>
              Your Blessing
            </label>
            <textarea
              rows={3}
              placeholder="Leave a message for the couple..."
              value={form.message}
              onFocus={() => setIsFocused('message')}
              onBlur={() => setIsFocused(null)}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              disabled={isLoading}
              className="w-full bg-transparent border-b border-background/20 py-4 font-display text-lg text-background placeholder:text-background/10 outline-none transition-all duration-500 focus:border-luxury-gold resize-none disabled:opacity-50"
            />
          </div>

          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={!isLoading ? { scale: 1.02 } : {}}
            whileTap={!isLoading ? { scale: 0.98 } : {}}
            className="group w-full py-6 bg-background text-foreground relative overflow-hidden transition-all duration-300 disabled:opacity-80"
          >
            {!isLoading && <div className="absolute inset-0 bg-luxury-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500" />}
            <span className="relative z-10 font-inter text-[10px] uppercase tracking-[0.4em] flex items-center justify-center gap-3">
              {isLoading ? (
                <>Processing <Loader2 size={14} className="animate-spin" /></>
              ) : (
                <>Send Response <Send size={14} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></>
              )}
            </span>
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
};

