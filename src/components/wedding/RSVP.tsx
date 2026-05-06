import { toast } from "@/hooks/use-toast";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwyEXdLccLrEZAlHCZcsKNh5QabbNiLxQBUZutA4gOxXwoWsERNc-WmX3Jn0np9u4xJFg/exec";

// ─── Floating particle ────────────────────────────────────────────────────────
const Particle = ({ x, y, delay, size }: any) => (
  <motion.div
    style={{
      position: "absolute",
      left: `${x}%`,
      top: `${y}%`,
      width: size,
      height: size,
      borderRadius: "50%",
      background: "rgba(212,175,107,0.55)",
      pointerEvents: "none",
    }}
    animate={{ y: [0, -80, -160], opacity: [0, 0.8, 0], scale: [0, 1, 0.3] }}
    transition={{ duration: 2.2, delay, ease: "easeOut" }}
  />
);

// ─── Success envelope ─────────────────────────────────────────────────────────
const SuccessEnvelope = ({ onDone }: { onDone: () => void }) => {
  const [phase, setPhase] = useState<"land" | "open" | "heart" | "done">("land");
  const particles = Array.from({ length: 22 }, (_, i) => ({
    x: 20 + Math.random() * 60,
    y: 30 + Math.random() * 40,
    delay: 0.6 + i * 0.07,
    size: 3 + Math.random() * 5,
  }));

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("open"), 900);
    const t2 = setTimeout(() => setPhase("heart"), 1800);
    const t3 = setTimeout(() => setPhase("done"), 4200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  useEffect(() => {
    if (phase === "done") onDone();
  }, [phase, onDone]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
      transition={{ duration: 0.8 }}
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
        background: "rgba(8,6,1,0.96)",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      {/* Gold particle burst */}
      {phase !== "land" && particles.map((p, i) => <Particle key={i} {...p} />)}

      {/* Envelope SVG */}
      <motion.div
        initial={{ y: -120, opacity: 0, rotate: -8 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <svg width="120" height="80" viewBox="0 0 120 80">
          {/* Envelope body */}
          <rect x="4" y="24" width="112" height="52" rx="2" fill="#1a1208" stroke="rgba(212,175,107,0.5)" strokeWidth="0.8" />
          {/* Bottom folds */}
          <polygon points="4,76 60,50 116,76" fill="#201710" stroke="rgba(212,175,107,0.25)" strokeWidth="0.5" />
          <line x1="4" y1="76" x2="60" y2="50" stroke="rgba(212,175,107,0.2)" strokeWidth="0.5" />
          <line x1="116" y1="76" x2="60" y2="50" stroke="rgba(212,175,107,0.2)" strokeWidth="0.5" />

          {/* Flap - animates open */}
          <motion.g
            animate={{ rotateX: phase === "land" ? 0 : -160 }}
            style={{ transformOrigin: "60px 24px", transformBox: "fill-box" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
          >
            <polygon points="4,24 116,24 60,56" fill="#231a0a" stroke="rgba(212,175,107,0.4)" strokeWidth="0.8" />
          </motion.g>

          {/* Heart rising from envelope */}
          <AnimatePresence>
            {(phase === "heart" || phase === "done") && (
              <motion.g
                initial={{ y: 20, opacity: 0, scale: 0.3 }}
                animate={{ y: -18, opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <path
                  d="M60 30 C60 30 48 20 44 28 C40 36 60 46 60 46 C60 46 80 36 76 28 C72 20 60 30 60 30Z"
                  fill="rgba(180,30,30,0.85)"
                  stroke="rgba(212,100,100,0.4)"
                  strokeWidth="0.5"
                />
                {/* Heart shimmer */}
                <motion.path
                  d="M60 30 C60 30 48 20 44 28 C40 36 60 46 60 46 C60 46 80 36 76 28 C72 20 60 30 60 30Z"
                  fill="none"
                  stroke="rgba(255,180,180,0.5)"
                  strokeWidth="0.5"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                />
              </motion.g>
            )}
          </AnimatePresence>
        </svg>
      </motion.div>

      {/* Text */}
      <AnimatePresence>
        {phase === "heart" && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            style={{ textAlign: "center", marginTop: 24 }}
          >
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 22,
              color: "rgba(235,220,195,0.95)",
              margin: 0,
              letterSpacing: "0.05em",
            }}>
              With love, received.
            </p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontSize: 13,
                color: "rgba(212,175,107,0.6)",
                margin: "8px 0 0",
                letterSpacing: "0.2em",
              }}
            >
              We look forward to celebrating with you
            </motion.p>

            {/* Gold line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 1.2, ease: "easeInOut" }}
              style={{
                height: "0.5px",
                background: "linear-gradient(90deg, transparent, rgba(212,175,107,0.6), transparent)",
                marginTop: 20,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ─── Field component ──────────────────────────────────────────────────────────
const Field = ({
  label, children, delay,
}: { label: string; children: React.ReactNode; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    style={{ display: "flex", flexDirection: "column", gap: 6 }}
  >
    <label style={{
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: 10,
      letterSpacing: "0.4em",
      textTransform: "uppercase",
      color: "rgba(212,175,107,0.55)",
    }}>
      {label}
    </label>
    {children}
  </motion.div>
);

// ─── Input base style ─────────────────────────────────────────────────────────
const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "transparent",
  border: "none",
  borderBottom: "0.5px solid rgba(212,175,107,0.2)",
  padding: "10px 0",
  color: "rgba(235,220,195,0.9)",
  fontFamily: "'Cormorant Garamond', serif",
  fontSize: 16,
  outline: "none",
  transition: "border-color 0.3s",
  boxSizing: "border-box",
};

// ─── RSVP Main ────────────────────────────────────────────────────────────────
export const RSVP = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    attending: "yes",
    guests: "1",
    event: "Wedding",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [sendingPhase, setSendingPhase] = useState<"idle" | "sealing" | "flying" | "done">("idle");
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const set = (key: string, val: string) => setForm((f) => ({ ...f, [key]: val }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSendingPhase("sealing");

    // Sealing animation
    await new Promise((r) => setTimeout(r, 700));
    setSendingPhase("flying");

    try {
      const params = new URLSearchParams();
      params.append("Name", form.name);
      params.append("Phone", form.phone);
      params.append("Attending", form.attending === "yes" ? "Yes" : "No");
      params.append("Guests", form.guests);
      params.append("Event", form.event);
      params.append("Message", form.message);
      params.append("Status", "Confirmed");

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: params,
        mode: "no-cors"
      });

      await new Promise((r) => setTimeout(r, 900));
      setSendingPhase("done");
      setShowSuccess(true);
    } catch {
      setSendingPhase("idle");
      toast({ title: "Oops!", description: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccessDone = () => {
    setShowSuccess(false);
    setSendingPhase("idle");
    setForm({ name: "", phone: "", attending: "yes", guests: "1", event: "Wedding", message: "" });
  };

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        background: "#080601",
        padding: "80px 0 100px",
        overflow: "hidden",
      }}
    >
      {/* Background grid lines */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(212,175,107,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(212,175,107,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "48px 48px",
        pointerEvents: "none",
      }} />

      {/* Side ornament lines */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : {}}
        transition={{ duration: 1.8, ease: "easeInOut" }}
        style={{
          position: "absolute",
          left: 24,
          top: "10%",
          bottom: "10%",
          width: "0.5px",
          background: "linear-gradient(to bottom, transparent, rgba(212,175,107,0.2), transparent)",
          transformOrigin: "top",
        }}
      />
      <motion.div
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : {}}
        transition={{ duration: 1.8, ease: "easeInOut", delay: 0.2 }}
        style={{
          position: "absolute",
          right: 24,
          top: "10%",
          bottom: "10%",
          width: "0.5px",
          background: "linear-gradient(to bottom, transparent, rgba(212,175,107,0.2), transparent)",
          transformOrigin: "top",
        }}
      />

      <div style={{ maxWidth: 360, margin: "0 auto", padding: "0 28px", position: "relative" }}>

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 16 }}>
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: 28 } : {}}
              transition={{ delay: 0.4, duration: 1.2 }}
              style={{ height: "0.5px", background: "rgba(212,175,107,0.5)" }}
            />
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 10,
              letterSpacing: "0.45em",
              textTransform: "uppercase",
              color: "rgba(212,175,107,0.6)",
            }}>
              Kindly Reply
            </span>
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: 28 } : {}}
              transition={{ delay: 0.4, duration: 1.2 }}
              style={{ height: "0.5px", background: "rgba(212,175,107,0.5)" }}
            />
          </div>

          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: 42,
            color: "rgba(235,220,195,0.95)",
            margin: "0 0 8px",
            letterSpacing: "0.04em",
            lineHeight: 1,
          }}>
            RSVP
          </h2>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: 14,
            color: "rgba(212,175,107,0.45)",
            margin: 0,
          }}>
            Please respond by the 30th
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "relative",
            border: "0.5px solid rgba(212,175,107,0.18)",
            padding: "36px 28px 32px",
            background: "rgba(20,14,4,0.85)",
          }}
        >
          {/* Corner ornaments */}
          {["tl", "tr", "bl", "br"].map((c) => (
            <svg key={c} width="16" height="16" viewBox="0 0 16 16" style={{
              position: "absolute",
              top: c.startsWith("t") ? -1 : "auto",
              bottom: c.startsWith("b") ? -1 : "auto",
              left: c.endsWith("l") ? -1 : "auto",
              right: c.endsWith("r") ? -1 : "auto",
              transform: c === "tr" ? "scaleX(-1)" : c === "bl" ? "scaleY(-1)" : c === "br" ? "scale(-1,-1)" : "none",
            }}>
              <path d="M1 14 L1 1 L14 1" fill="none" stroke="rgba(212,175,107,0.5)" strokeWidth="0.8" />
            </svg>
          ))}

          {/* Success overlay */}
          <AnimatePresence>
            {showSuccess && <SuccessEnvelope onDone={handleSuccessDone} />}
          </AnimatePresence>

          <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>

            <Field label="Full Name" delay={0.4}>
              <input
                required type="text"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                style={inputStyle}
                onFocus={(e) => e.target.style.borderBottomColor = "rgba(212,175,107,0.6)"}
                onBlur={(e) => e.target.style.borderBottomColor = "rgba(212,175,107,0.2)"}
              />
            </Field>

            <Field label="Phone Number" delay={0.5}>
              <input
                required type="tel"
                placeholder="+91 XXXXX XXXXX"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                style={inputStyle}
                onFocus={(e) => e.target.style.borderBottomColor = "rgba(212,175,107,0.6)"}
                onBlur={(e) => e.target.style.borderBottomColor = "rgba(212,175,107,0.2)"}
              />
            </Field>

            {/* Attending toggle */}
            <Field label="Will You Attend?" delay={0.6}>
              <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                {[{ v: "yes", label: "Joyfully Yes" }, { v: "no", label: "Regretfully No" }].map(({ v, label }) => (
                  <motion.button
                    key={v}
                    type="button"
                    onClick={() => set("attending", v)}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      flex: 1,
                      padding: "10px 8px",
                      border: "0.5px solid",
                      borderColor: form.attending === v ? "rgba(212,175,107,0.7)" : "rgba(212,175,107,0.15)",
                      background: form.attending === v ? "rgba(212,175,107,0.1)" : "transparent",
                      color: form.attending === v ? "rgba(212,175,107,0.95)" : "rgba(235,220,195,0.35)",
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 12,
                      letterSpacing: "0.15em",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {label}
                  </motion.button>
                ))}
              </div>
            </Field>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <Field label="Guests" delay={0.7}>
                <input
                  type="number" min="1" max="10"
                  value={form.guests}
                  onChange={(e) => set("guests", e.target.value)}
                  style={{ ...inputStyle }}
                  onFocus={(e) => e.target.style.borderBottomColor = "rgba(212,175,107,0.6)"}
                  onBlur={(e) => e.target.style.borderBottomColor = "rgba(212,175,107,0.2)"}
                />
              </Field>
              <Field label="Occasion" delay={0.75}>
                <select
                  value={form.event}
                  onChange={(e) => set("event", e.target.value)}
                  style={{
                    ...inputStyle,
                    appearance: "none",
                    cursor: "pointer",
                  }}
                  onFocus={(e) => e.target.style.borderBottomColor = "rgba(212,175,107,0.6)"}
                  onBlur={(e) => e.target.style.borderBottomColor = "rgba(212,175,107,0.2)"}
                >
                  <option style={{ background: "#1a1208" }}>Wedding</option>
                  <option style={{ background: "#1a1208" }}>Reception</option>
                  <option style={{ background: "#1a1208" }}>Engagement</option>
                </select>
              </Field>
            </div>

            <Field label="A Note for the Couple" delay={0.85}>
              <textarea
                rows={3}
                placeholder="Share your wishes…"
                value={form.message}
                onChange={(e) => set("message", e.target.value)}
                style={{
                  ...inputStyle,
                  resize: "none",
                  borderBottom: "none",
                  border: "0.5px solid rgba(212,175,107,0.15)",
                  padding: "12px",
                  marginTop: 4,
                  lineHeight: 1.6,
                  transition: "border-color 0.3s",
                }}
                onFocus={(e) => e.target.style.borderColor = "rgba(212,175,107,0.45)"}
                onBlur={(e) => e.target.style.borderColor = "rgba(212,175,107,0.15)"}
              />
            </Field>

            {/* Submit button */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1, duration: 0.8 }}
              style={{ marginTop: 8 }}
            >
              <motion.button
                type="submit"
                disabled={isLoading}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: "100%",
                  padding: "18px",
                  background: isLoading ? "rgba(212,175,107,0.12)" : "rgba(212,175,107,0.08)",
                  border: "0.5px solid rgba(212,175,107,0.45)",
                  color: "rgba(212,175,107,0.9)",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 12,
                  letterSpacing: "0.45em",
                  textTransform: "uppercase",
                  cursor: isLoading ? "not-allowed" : "pointer",
                  position: "relative",
                  overflow: "hidden",
                  transition: "background 0.3s",
                }}
              >
                {/* Shimmer sweep (idle) */}
                {!isLoading && (
                  <motion.div
                    style={{
                      position: "absolute",
                      top: 0, bottom: 0, width: "40%",
                      background: "linear-gradient(90deg, transparent, rgba(212,175,107,0.12), transparent)",
                    }}
                    animate={{ left: ["-40%", "140%"] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 2.5 }}
                  />
                )}

                {/* Sealing animation */}
                <AnimatePresence mode="wait">
                  {sendingPhase === "idle" && (
                    <motion.span key="send" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      Send with Love
                    </motion.span>
                  )}
                  {sendingPhase === "sealing" && (
                    <motion.span
                      key="sealing"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
                    >
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        style={{ display: "inline-block", fontSize: 14 }}
                      >
                        ✦
                      </motion.span>
                      Sealing…
                    </motion.span>
                  )}
                  {sendingPhase === "flying" && (
                    <motion.span
                      key="flying"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 60 }}
                      transition={{ duration: 0.5 }}
                    >
                      Sending ✦
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          </form>
        </motion.div>

        {/* Bottom flourish */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ delay: 1.2, duration: 1.4, ease: "easeInOut" }}
          style={{ textAlign: "center", marginTop: 32 }}
        >
          <svg width="160" height="16" viewBox="0 0 160 16" style={{ display: "inline-block" }}>
            <line x1="0" y1="8" x2="60" y2="8" stroke="rgba(212,175,107,0.25)" strokeWidth="0.5" />
            <circle cx="68" cy="8" r="2" fill="none" stroke="rgba(212,175,107,0.45)" strokeWidth="0.7" />
            <circle cx="80" cy="8" r="3.5" fill="none" stroke="rgba(212,175,107,0.55)" strokeWidth="0.7" />
            <circle cx="92" cy="8" r="2" fill="none" stroke="rgba(212,175,107,0.45)" strokeWidth="0.7" />
            <line x1="100" y1="8" x2="160" y2="8" stroke="rgba(212,175,107,0.25)" strokeWidth="0.5" />
          </svg>
        </motion.div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');
        input::placeholder, textarea::placeholder { color: rgba(212,175,107,0.25); font-family: 'Cormorant Garamond', serif; font-style: italic; }
        input[type=number]::-webkit-inner-spin-button { opacity: 0; }
        select option { background: #1a1208; color: rgba(235,220,195,0.9); }
      `}</style>
    </section>
  );
};