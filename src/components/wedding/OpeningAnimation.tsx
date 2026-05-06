import { wedding } from "@/data/wedding";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// ─── Floating rose petal ──────────────────────────────────────────────────────
const RosePetal = ({ x, delay, duration, size, drift }: any) => (
  <motion.div
    style={{
      position: "absolute",
      left: `${x}%`,
      top: "-4%",
      width: size,
      height: size * 0.65,
      borderRadius: "50% 0 50% 0",
      background: `rgba(${200 + Math.random() * 20},${220 + Math.random() * 20},${255},0.4)`,
      border: "0.5px solid rgba(147,197,253,0.4)",
      pointerEvents: "none",
    }}
    initial={{ opacity: 0, y: 0, rotate: 0 }}
    animate={{
      opacity: [0, 0.55, 0.35, 0],
      y: ["0vh", "108vh"],
      rotate: [0, drift * 90, drift * 200],
      x: [0, drift * 30],
    }}
    transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
  />
);

// ─── Sparkle dot ──────────────────────────────────────────────────────────────
const Sparkle = ({ x, y, delay }: any) => (
  <motion.div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: 3,
      height: 3,
      borderRadius: "50%",
      background: "rgba(147,197,253,0.9)",
      pointerEvents: "none",
    }}
    animate={{ scale: [0, 1.4, 0], opacity: [0, 1, 0] }}
    transition={{ duration: 1.6, delay, repeat: Infinity, repeatDelay: 2.8 + Math.random() * 3 }}
  />
);

// ─── Wax seal SVG ────────────────────────────────────────────────────────────
const WaxSeal = ({ visible }: { visible: boolean }) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        initial={{ scale: 0, rotate: -30, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 20,
          cursor: "default",
        }}
      >
        <svg width="96" height="96" viewBox="0 0 96 96">
          {/* Wax blob */}
          <path
            d="M48 4 C58 4 72 10 80 20 C88 30 92 42 90 54 C88 66 80 78 68 84 C56 90 44 90 32 84 C20 78 12 66 10 54 C8 42 12 30 20 20 C28 10 38 4 48 4Z"
            fill="#1e3a8a"
            opacity="0.92"
          />
          {/* Embossed ring */}
          <circle cx="48" cy="48" r="28" fill="none" stroke="rgba(147,197,253,0.35)" strokeWidth="1" />
          {/* Monogram / flourish */}
          <text
            x="48" y="44"
            textAnchor="middle"
            fontFamily="'Cormorant Garamond', serif"
            fontSize="11"
            fill="rgba(255,255,255,0.85)"
            letterSpacing="3"
          >
            {(wedding.groom[0] ?? "A") + (wedding.bride[0] ?? "B")}
          </text>
          <text
            x="48" y="58"
            textAnchor="middle"
            fontFamily="'Cormorant Garamond', serif"
            fontStyle="italic"
            fontSize="8"
            fill="rgba(255,255,255,0.5)"
            letterSpacing="2"
          >
            ✦ ✦ ✦
          </text>
        </svg>
      </motion.div>
    )}
  </AnimatePresence>
);

// ─── Envelope flap ───────────────────────────────────────────────────────────
const EnvelopeFlap = ({ open }: { open: boolean }) => (
  <motion.div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "52%",
      transformOrigin: "top center",
      zIndex: 15,
      overflow: "hidden",
    }}
    animate={{ rotateX: open ? -180 : 0 }}
    transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: open ? 0.3 : 0 }}
  >
    {/* Flap triangle shape */}
    <svg
      width="100%" height="100%"
      viewBox="0 0 320 160"
      preserveAspectRatio="none"
      style={{ display: "block" }}
    >
      <polygon
        points="0,0 320,0 160,145"
        fill="#ffffff"
        stroke="rgba(147,197,253,0.25)"
        strokeWidth="0.5"
      />
      {/* Inner lining */}
      <polygon
        points="8,0 312,0 160,130"
        fill="#f1f5f9"
        opacity="0.9"
      />
      {/* Gold edge highlight */}
      <line x1="0" y1="0" x2="160" y2="145" stroke="rgba(147,197,253,0.3)" strokeWidth="0.5" />
      <line x1="320" y1="0" x2="160" y2="145" stroke="rgba(147,197,253,0.3)" strokeWidth="0.5" />
    </svg>
  </motion.div>
);

// ─── Invitation card text reveal ─────────────────────────────────────────────
const CardText = ({ show }: { show: boolean }) => {
  const lines = [
    { text: "Together with their families", size: 11, spacing: "0.25em", italic: true, delay: 0.1 },
    { text: wedding.groom, size: 32, spacing: "0.08em", italic: false, delay: 0.4 },
    { text: "&", size: 20, spacing: "0.05em", italic: true, delay: 0.7, gold: true },
    { text: wedding.bride, size: 32, spacing: "0.08em", italic: false, delay: 1.0 },
    { text: "request the honour of your presence", size: 10, spacing: "0.25em", italic: true, delay: 1.3 },
    { text: wedding.dateLabel, size: 11, spacing: "0.35em", italic: false, delay: 1.6, upper: true },
  ];

  return (
    <div style={{ textAlign: "center", padding: "20px 12px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      {lines.map((l, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
          animate={show ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.9, delay: l.delay, ease: [0.22, 1, 0.36, 1] }}
          style={{
            margin: 0,
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: l.size,
            fontStyle: l.italic ? "italic" : "normal",
            letterSpacing: l.spacing,
            textTransform: (l as any).upper ? "uppercase" : "none",
            color: (l as any).gold ? "rgba(147,197,253,0.9)" : "rgba(30,58,138,0.92)",
            lineHeight: 1.2,
          }}
        >
          {l.text}
        </motion.p>
      ))}
    </div>
  );
};

// ─── MAIN ────────────────────────────────────────────────────────────────────
interface Props { onComplete: () => void }

type Stage =
  | "envelope-idle"      // Sealed envelope, wax seal visible
  | "seal-break"         // Seal cracks, shimmer
  | "flap-open"          // Flap opens
  | "card-rising"        // Card slides up out of envelope
  | "card-full"          // Card fully revealed, text animating in
  | "enter-ready"        // Button pulses
  | "exiting";           // Fade out to app

export const OpeningAnimation = ({ onComplete }: Props) => {
  const [stage, setStage] = useState<Stage>("envelope-idle");
  const [petalsMounted, setPetalsMounted] = useState(false);
  const tapCount = useRef(0);

  const petals = Array.from({ length: 18 }, (_, i) => ({
    x: 2 + (i / 17) * 96,
    delay: i * 0.9 + 1,
    duration: 9 + (i % 5) * 1.5,
    size: 7 + (i % 6) * 2,
    drift: i % 2 === 0 ? 1 : -1,
  }));

  const sparkles = [
    { x: "18%", y: "22%", delay: 1.2 },
    { x: "75%", y: "18%", delay: 2.8 },
    { x: "88%", y: "55%", delay: 0.6 },
    { x: "12%", y: "62%", delay: 3.5 },
    { x: "55%", y: "8%", delay: 1.9 },
    { x: "40%", y: "78%", delay: 4.1 },
    { x: "82%", y: "72%", delay: 2.2 },
    { x: "30%", y: "15%", delay: 0.3 },
  ];

  useEffect(() => {
    setPetalsMounted(true);
    // Auto-advance to seal-break after a brief pause
    const t = setTimeout(() => setStage("seal-break"), 1200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (stage === "seal-break") {
      const t = setTimeout(() => setStage("flap-open"), 1000);
      return () => clearTimeout(t);
    }
    if (stage === "flap-open") {
      const t = setTimeout(() => setStage("card-rising"), 1600);
      return () => clearTimeout(t);
    }
    if (stage === "card-rising") {
      const t = setTimeout(() => setStage("card-full"), 1200);
      return () => clearTimeout(t);
    }
    if (stage === "card-full") {
      const t = setTimeout(() => setStage("enter-ready"), 2400);
      return () => clearTimeout(t);
    }
  }, [stage]);

  const handleEnter = () => {
    setStage("exiting");
    setTimeout(onComplete, 1400);
  };

  const envelopeW = 300;
  const envelopeH = 200;

  return (
    <AnimatePresence>
      {stage !== "exiting" ? (
        <motion.div
          key="opening"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#f0f6ff",
            overflow: "hidden",
          }}
          exit={{ opacity: 0, scale: 1.08, filter: "blur(18px)" }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Radial glow bg */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse 70% 55% at 50% 55%, rgba(255,255,255,1) 0%, rgba(224,231,255,1) 100%)",
            pointerEvents: "none",
          }} />

          {/* Grain texture */}
          <div style={{
            position: "absolute",
            inset: 0,
            opacity: 0.038,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "160px",
            pointerEvents: "none",
          }} />

          {/* Sparkles */}
          {sparkles.map((s, i) => <Sparkle key={i} {...s} />)}

          {/* Falling petals */}
          {petalsMounted && petals.map((p, i) => <RosePetal key={i} {...p} />)}

          {/* ── STAGE: Envelope idle + seal ── */}
          <AnimatePresence mode="wait">
            {(stage === "envelope-idle" || stage === "seal-break") && (
              <motion.div
                key="envelope-stage"
                initial={{ opacity: 0, y: 40, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}
              >
                {/* Eyebrow */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.55 }}
                  transition={{ delay: 0.4, duration: 1.2 }}
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 11,
                    letterSpacing: "0.45em",
                    textTransform: "uppercase",
                    color: "rgba(30,58,138,0.6)",
                    margin: 0,
                  }}
                >
                  You are invited
                </motion.p>

                {/* Envelope body */}
                <div style={{ position: "relative", width: envelopeW, height: envelopeH }}>
                  {/* Envelope back */}
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "#ffffff",
                    border: "0.5px solid rgba(147,197,253,0.5)",
                    borderRadius: 3,
                  }} />

                  {/* Bottom fold lines */}
                  <svg style={{ position: "absolute", inset: 0, pointerEvents: "none" }} width={envelopeW} height={envelopeH} viewBox={`0 0 ${envelopeW} ${envelopeH}`}>
                    <polygon points={`0,${envelopeH} ${envelopeW},${envelopeH} ${envelopeW / 2},${envelopeH / 2 + 10}`} fill="#f8fafc" stroke="rgba(147,197,253,0.3)" strokeWidth="0.5" />
                    <line x1="0" y1={envelopeH} x2={envelopeW / 2} y2={envelopeH / 2 + 10} stroke="rgba(147,197,253,0.3)" strokeWidth="0.5" />
                    <line x1={envelopeW} y1={envelopeH} x2={envelopeW / 2} y2={envelopeH / 2 + 10} stroke="rgba(147,197,253,0.3)" strokeWidth="0.5" />
                    <line x1="0" y1="0" x2={envelopeW / 2} y2={envelopeH / 2 + 10} stroke="rgba(147,197,253,0.2)" strokeWidth="0.5" />
                    <line x1={envelopeW} y1="0" x2={envelopeW / 2} y2={envelopeH / 2 + 10} stroke="rgba(147,197,253,0.2)" strokeWidth="0.5" />
                    {/* Gold border inner */}
                    <rect x="6" y="6" width={envelopeW - 12} height={envelopeH - 12} fill="none" stroke="rgba(147,197,253,0.2)" strokeWidth="0.5" rx="2" />
                  </svg>

                  {/* Flap */}
                  <EnvelopeFlap open={false} />

                  {/* Wax seal (cracks on seal-break) */}
                  <WaxSeal visible={true} />

                  {/* Seal crack shimmer */}
                  <AnimatePresence>
                    {stage === "seal-break" && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: [0, 1, 0.6, 0], scale: [0.5, 1.6, 1.2, 2.5] }}
                        transition={{ duration: 0.9 }}
                        style={{
                          position: "absolute",
                          top: "50%", left: "50%",
                          transform: "translate(-50%,-50%)",
                          width: 96, height: 96,
                          borderRadius: "50%",
                          background: "radial-gradient(circle, rgba(147,197,253,0.35) 0%, transparent 70%)",
                          pointerEvents: "none",
                          zIndex: 25,
                        }}
                      />
                    )}
                  </AnimatePresence>
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  transition={{ delay: 1.5, duration: 1 }}
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    fontSize: 12,
                    color: "rgba(30,58,138,0.6)",
                    margin: 0,
                    letterSpacing: "0.1em",
                  }}
                >
                  Breaking the seal…
                </motion.p>
              </motion.div>
            )}

            {/* ── STAGE: Flap open + card rising ── */}
            {(stage === "flap-open" || stage === "card-rising" || stage === "card-full" || stage === "enter-ready") && (
              <motion.div
                key="card-stage"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 0,
                  width: "100%",
                  maxWidth: 360,
                  padding: "0 20px",
                }}
              >
                {/* Envelope with open flap + card emerging */}
                <div style={{ position: "relative", width: envelopeW, height: 480 }}>

                  {/* Card sliding out */}
                  <motion.div
                    initial={{ y: 0, opacity: 0 }}
                    animate={{
                      y: stage === "flap-open" ? -40 :
                        stage === "card-rising" ? -180 :
                          stage === "card-full" || stage === "enter-ready" ? -240 : 0,
                      opacity: stage === "flap-open" ? 0.35 : 1,
                    }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 12,
                      zIndex: 5,
                      background: "#ffffff",
                      border: "0.5px solid rgba(147,197,253,0.5)",
                      borderRadius: 2,
                      width: envelopeW - 24,
                      paddingBottom: 24,
                      boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
                    }}
                  >
                    {/* Card inner border */}
                    <div style={{
                      margin: 10,
                      border: "0.5px solid rgba(147,197,253,0.35)",
                      padding: "16px 8px 16px",
                    }}>
                      {/* Corner ornaments */}
                      {["topleft", "topright", "bottomleft", "bottomright"].map((pos) => (
                        <svg
                          key={pos}
                          width="18" height="18"
                          viewBox="0 0 18 18"
                          style={{
                            position: "absolute",
                            top: pos.includes("top") ? 4 : "auto",
                            bottom: pos.includes("bottom") ? 4 : "auto",
                            left: pos.includes("left") ? 4 : "auto",
                            right: pos.includes("right") ? 4 : "auto",
                            transform: pos === "topright" ? "scaleX(-1)" : pos === "bottomleft" ? "scaleY(-1)" : pos === "bottomright" ? "scale(-1,-1)" : "none",
                          }}
                        >
                          <path d="M2 16 L2 2 L16 2" fill="none" stroke="rgba(147,197,253,0.55)" strokeWidth="0.8" />
                          <circle cx="2" cy="2" r="1.2" fill="rgba(147,197,253,0.6)" />
                        </svg>
                      ))}

                      {/* Top ornament flourish */}
                      <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={stage === "card-full" || stage === "enter-ready" ? { opacity: 1, scaleX: 1 } : {}}
                        transition={{ delay: 0.2, duration: 1 }}
                        style={{ textAlign: "center", marginBottom: 8 }}
                      >
                        <svg width="120" height="16" viewBox="0 0 120 16" style={{ display: "inline-block" }}>
                          <line x1="0" y1="8" x2="45" y2="8" stroke="rgba(147,197,253,0.45)" strokeWidth="0.5" />
                          <circle cx="52" cy="8" r="2.5" fill="none" stroke="rgba(147,197,253,0.6)" strokeWidth="0.7" />
                          <circle cx="60" cy="8" r="3.5" fill="none" stroke="rgba(147,197,253,0.6)" strokeWidth="0.7" />
                          <circle cx="68" cy="8" r="2.5" fill="none" stroke="rgba(147,197,253,0.6)" strokeWidth="0.7" />
                          <line x1="75" y1="8" x2="120" y2="8" stroke="rgba(147,197,253,0.45)" strokeWidth="0.5" />
                        </svg>
                      </motion.div>

                      <CardText show={stage === "card-full" || stage === "enter-ready"} />

                      {/* Bottom ornament */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={stage === "card-full" || stage === "enter-ready" ? { opacity: 1 } : {}}
                        transition={{ delay: 1.8, duration: 1 }}
                        style={{ textAlign: "center", marginTop: 14 }}
                      >
                        <svg width="80" height="12" viewBox="0 0 80 12" style={{ display: "inline-block" }}>
                          <line x1="0" y1="6" x2="28" y2="6" stroke="rgba(147,197,253,0.4)" strokeWidth="0.5" />
                          <polygon points="36,2 40,6 36,10 32,6" fill="none" stroke="rgba(147,197,253,0.55)" strokeWidth="0.7" />
                          <polygon points="44,2 48,6 44,10 40,6" fill="none" stroke="rgba(147,197,253,0.55)" strokeWidth="0.7" />
                          <line x1="52" y1="6" x2="80" y2="6" stroke="rgba(147,197,253,0.4)" strokeWidth="0.5" />
                        </svg>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Envelope body (stays behind) */}
                  <div style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: envelopeW,
                    height: envelopeH,
                    zIndex: 10,
                  }}>
                    <div style={{
                      position: "absolute",
                      inset: 0,
                      background: "#ffffff",
                      border: "0.5px solid rgba(147,197,253,0.22)",
                      borderRadius: 3,
                    }} />
                    <svg style={{ position: "absolute", inset: 0 }} width={envelopeW} height={envelopeH} viewBox={`0 0 ${envelopeW} ${envelopeH}`}>
                      <polygon points={`0,${envelopeH} ${envelopeW},${envelopeH} ${envelopeW / 2},${envelopeH / 2 + 10}`} fill="#f8fafc" stroke="rgba(147,197,253,0.15)" strokeWidth="0.5" />
                      <line x1="0" y1={envelopeH} x2={envelopeW / 2} y2={envelopeH / 2 + 10} stroke="rgba(147,197,253,0.18)" strokeWidth="0.5" />
                      <line x1={envelopeW} y1={envelopeH} x2={envelopeW / 2} y2={envelopeH / 2 + 10} stroke="rgba(147,197,253,0.18)" strokeWidth="0.5" />
                      <line x1="0" y1="0" x2={envelopeW / 2} y2={envelopeH / 2 + 10} stroke="rgba(147,197,253,0.12)" strokeWidth="0.5" />
                      <line x1={envelopeW} y1="0" x2={envelopeW / 2} y2={envelopeH / 2 + 10} stroke="rgba(147,197,253,0.12)" strokeWidth="0.5" />
                      <rect x="6" y="6" width={envelopeW - 12} height={envelopeH - 12} fill="none" stroke="rgba(147,197,253,0.1)" strokeWidth="0.5" rx="2" />
                    </svg>
                    <EnvelopeFlap open={true} />
                  </div>
                </div>

                {/* ── Enter button ── */}
                <AnimatePresence>
                  {stage === "enter-ready" && (
                    <motion.button
                      key="enter-btn"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                      onClick={handleEnter}
                      style={{
                        marginTop: 48,
                        position: "relative",
                        padding: "16px 44px",
                        background: "rgba(147,197,253,0.1)",
                        border: "0.5px solid rgba(147,197,253,0.45)",
                        borderRadius: 2,
                        color: "rgba(30,58,138,0.9)",
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 12,
                        letterSpacing: "0.42em",
                        textTransform: "uppercase",
                        cursor: "pointer",
                        overflow: "hidden",
                      }}
                    >
                      {/* Pulse ring */}
                      <motion.div
                        style={{
                          position: "absolute",
                          inset: -4,
                          borderRadius: 4,
                          border: "0.5px solid rgba(147,197,253,0.3)",
                        }}
                        animate={{ scale: [1, 1.04, 1], opacity: [0.5, 0.15, 0.5] }}
                        transition={{ duration: 2.2, repeat: Infinity }}
                      />
                      {/* Shimmer sweep */}
                      <motion.div
                        style={{
                          position: "absolute",
                          top: 0, bottom: 0, width: "50%",
                          background: "linear-gradient(90deg, transparent, rgba(147,197,253,0.15), transparent)",
                        }}
                        animate={{ left: ["-50%", "150%"] }}
                        transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 2 }}
                      />
                      <span style={{ position: "relative" }}>Open the Invitation</span>
                    </motion.button>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');
          `}</style>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};