import { useState } from "react";
import { motion } from "framer-motion";
import { Divider } from "./Divider";
import { toast } from "@/hooks/use-toast";

export const RSVP = () => {
  const [form, setForm] = useState({ name: "", phone: "", attending: "yes", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Thank you! 💛", description: "Your RSVP has been received with love." });
    setForm({ name: "", phone: "", attending: "yes", message: "" });
  };

  return (
    <section className="py-24 px-6 bg-[hsl(var(--maroon-deep))] text-[hsl(39_60%_96%)] relative">
      <div className="max-w-xl mx-auto text-center">
        <p className="font-display text-xs tracking-[0.4em] uppercase text-[hsl(46_80%_70%)] mb-3">Your Presence</p>
        <h2 className="font-serif-elegant text-5xl sm:text-6xl gradient-gold-text">Kindly RSVP</h2>
        <Divider light />

        <motion.form
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 1 }}
          onSubmit={submit}
          className="mt-8 space-y-5 text-left"
        >
          {[
            { key: "name", label: "Your Name", type: "text" },
            { key: "phone", label: "Phone Number", type: "tel" },
          ].map((f) => (
            <div key={f.key}>
              <label className="font-display text-[10px] tracking-[0.3em] uppercase text-[hsl(46_80%_70%)]">{f.label}</label>
              <input
                required type={f.type}
                value={(form as any)[f.key]}
                onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                className="mt-2 w-full bg-transparent border-b border-[hsl(46_80%_70%/0.4)] focus:border-[hsl(var(--gold))] outline-none py-2 font-serif-elegant text-lg text-[hsl(39_60%_96%)] transition-colors"
              />
            </div>
          ))}
          <div>
            <label className="font-display text-[10px] tracking-[0.3em] uppercase text-[hsl(46_80%_70%)]">Will you attend?</label>
            <div className="flex gap-3 mt-3">
              {["yes", "no"].map((v) => (
                <button
                  key={v} type="button"
                  onClick={() => setForm({ ...form, attending: v })}
                  className={`flex-1 py-3 rounded-full font-display text-xs tracking-[0.3em] uppercase transition-all ${
                    form.attending === v
                      ? "bg-[hsl(var(--gold))] text-[hsl(var(--maroon-deep))] shadow-gold"
                      : "border border-[hsl(46_80%_70%/0.4)] text-[hsl(46_80%_70%)]"
                  }`}
                >
                  {v === "yes" ? "Joyfully Yes" : "Regretfully No"}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="font-display text-[10px] tracking-[0.3em] uppercase text-[hsl(46_80%_70%)]">Your Blessing</label>
            <textarea
              rows={3}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="mt-2 w-full bg-transparent border-b border-[hsl(46_80%_70%/0.4)] focus:border-[hsl(var(--gold))] outline-none py-2 font-serif-elegant italic text-[hsl(39_60%_96%)] transition-colors resize-none"
            />
          </div>
          <motion.button
            type="submit" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            className="w-full mt-6 py-4 rounded-full bg-[hsl(var(--gold))] text-[hsl(var(--maroon-deep))] font-display text-xs tracking-[0.4em] uppercase shadow-gold animate-glow-pulse"
          >
            Send Blessings
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
};
