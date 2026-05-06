import { wedding } from "@/data/wedding";
import { AnimatePresence, motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ─── Palette ──────────────────────────────────────────────────────────────────
const C = {
  bg: "#f0f4f8",          // ice blue page bg
  surface: "#e8eef5",          // slightly deeper surface
  card: "#ffffff",          // pure white card
  border: "rgba(162,192,220,0.35)",
  borderHov: "rgba(120,165,210,0.6)",
  ink: "#1a2a3a",          // deep navy text
  inkMid: "rgba(26,42,58,0.5)",
  inkFaint: "rgba(26,42,58,0.22)",
  gold: "rgba(180,148,90,0.85)",
  goldFaint: "rgba(180,148,90,0.2)",
  blue: "#6fa3c8",          // accent sky blue
  bluePale: "rgba(111,163,200,0.12)",
  blueGlow: "rgba(111,163,200,0.25)",
};

// ─── Tilt card wrapper ────────────────────────────────────────────────────────
const TiltCard = ({ children, onClick, delay, aspect }: {
  children: React.ReactNode;
  onClick: () => void;
  delay: number;
  aspect: "tall" | "wide" | "square";
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 180, damping: 28 });
  const sy = useSpring(my, { stiffness: 180, damping: 28 });
  const rotX = useTransform(sy, [-0.5, 0.5], [4, -4]);
  const rotY = useTransform(sx, [-0.5, 0.5], [-4, 4]);

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  const aspectH = aspect === "tall" ? "280px" : aspect === "wide" ? "160px" : "210px";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: "800px", height: aspectH, cursor: "pointer" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      <motion.div
        style={{
          rotateX: rotX,
          rotateY: rotY,
          height: "100%",
          transformStyle: "preserve-3d",
          borderRadius: 3,
          overflow: "hidden",
          border: `0.5px solid ${C.border}`,
          background: C.card,
          boxShadow: `0 2px 18px rgba(26,42,58,0.08), 0 0 0 0px ${C.blueGlow}`,
          transition: "box-shadow 0.3s, border-color 0.3s",
        }}
        whileHover={{
          boxShadow: `0 12px 48px rgba(26,42,58,0.14), 0 0 0 1px ${C.blueGlow}`,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

// ─── Gallery item ─────────────────────────────────────────────────────────────
const GalleryItem = ({ src, index, onClick, delay, aspect }: {
  src: string; index: number; onClick: () => void; delay: number;
  aspect: "tall" | "wide" | "square";
}) => (
  <TiltCard onClick={onClick} delay={delay} aspect={aspect}>
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
      {/* Image */}
      <motion.img
        src={src}
        alt={`Memory ${index + 1}`}
        loading="lazy"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          filter: "saturate(0.85) brightness(1.02)",
        }}
        whileHover={{ scale: 1.07, filter: "saturate(1.1) brightness(1.05)" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Hover overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(26,42,58,0.55) 0%, rgba(26,42,58,0.05) 55%, transparent 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "16px",
        }}
      >
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 13,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "rgba(240,248,255,0.9)",
          margin: 0,
        }}>
          View
        </p>
        <motion.div
          initial={{ width: 0 }}
          whileHover={{ width: 28 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          style={{ height: "0.5px", background: C.gold, marginTop: 6 }}
        />
      </motion.div>

      {/* Blue shimmer on hover */}
      <motion.div
        initial={{ x: "-100%", opacity: 0 }}
        whileHover={{ x: "200%", opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: 0, bottom: 0,
          width: "35%",
          background: "linear-gradient(90deg, transparent, rgba(111,163,200,0.18), transparent)",
          pointerEvents: "none",
        }}
      />

      {/* Index badge */}
      <div style={{
        position: "absolute",
        top: 10, right: 10,
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 10,
        letterSpacing: "0.3em",
        color: "rgba(240,248,255,0.6)",
        background: "rgba(26,42,58,0.35)",
        backdropFilter: "blur(4px)",
        padding: "3px 7px",
        borderRadius: 1,
      }}>
        {String(index + 1).padStart(2, "0")}
      </div>
    </div>
  </TiltCard>
);

// ─── Lightbox ─────────────────────────────────────────────────────────────────
const Lightbox = ({ index, onClose, onPrev, onNext, total }: {
  index: number; onClose: () => void;
  onPrev: () => void; onNext: () => void;
  total: number;
}) => {
  const progress = ((index + 1) / total) * 100;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 110,
        background: "rgba(240,244,248,0.97)",
        backdropFilter: "blur(24px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
      onClick={onClose}
    >
      {/* Decorative corner lines */}
      {["tl", "tr", "bl", "br"].map((c) => (
        <svg key={c} width="40" height="40" viewBox="0 0 40 40" style={{
          position: "absolute",
          top: c.startsWith("t") ? 20 : "auto", bottom: c.startsWith("b") ? 20 : "auto",
          left: c.endsWith("l") ? 20 : "auto", right: c.endsWith("r") ? 20 : "auto",
          transform: c === "tr" ? "scaleX(-1)" : c === "bl" ? "scaleY(-1)" : c === "br" ? "scale(-1,-1)" : "none",
          opacity: 0.35,
        }}>
          <path d="M2 36 L2 2 L36 2" fill="none" stroke={C.blue} strokeWidth="0.8" />
        </svg>
      ))}

      {/* Close */}
      <motion.button
        initial={{ opacity: 0, rotate: -45 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ delay: 0.2 }}
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        whileHover={{ rotate: 90 }}
        style={{
          position: "absolute", top: 24, right: 24,
          background: "none", border: "none",
          color: C.ink, cursor: "pointer", padding: 8, zIndex: 10,
        }}
      >
        <X size={24} strokeWidth={1} />
      </motion.button>

      {/* Counter */}
      <div style={{
        position: "absolute", top: 28, left: "50%", transform: "translateX(-50%)",
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 11, letterSpacing: "0.4em",
        color: C.inkMid,
      }}>
        {String(index + 1).padStart(2, "0")} — {String(total).padStart(2, "0")}
      </div>

      {/* Prev */}
      <motion.button
        whileHover={{ x: -4 }} whileTap={{ scale: 0.95 }}
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        style={{
          position: "absolute", left: 16,
          background: "none", border: `0.5px solid ${C.border}`,
          color: C.ink, cursor: "pointer", padding: "12px 10px",
          display: "flex", zIndex: 10,
        }}
      >
        <ChevronLeft size={22} strokeWidth={1} />
      </motion.button>

      {/* Next */}
      <motion.button
        whileHover={{ x: 4 }} whileTap={{ scale: 0.95 }}
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        style={{
          position: "absolute", right: 16,
          background: "none", border: `0.5px solid ${C.border}`,
          color: C.ink, cursor: "pointer", padding: "12px 10px",
          display: "flex", zIndex: 10,
        }}
      >
        <ChevronRight size={22} strokeWidth={1} />
      </motion.button>

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.02, filter: "blur(8px)" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{
            maxWidth: "min(80vw, 680px)",
            maxHeight: "75vh",
            position: "relative",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Card frame */}
          <div style={{
            border: `0.5px solid ${C.border}`,
            borderRadius: 3,
            overflow: "hidden",
            background: C.card,
            boxShadow: `0 24px 80px rgba(26,42,58,0.18)`,
          }}>
            <img
              src={wedding.gallery[index]}
              alt={`Memory ${index + 1}`}
              style={{
                maxWidth: "100%",
                maxHeight: "68vh",
                display: "block",
                objectFit: "contain",
              }}
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress bar */}
      <div style={{
        position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)",
        width: 120, height: "0.5px",
        background: C.border,
      }}>
        <motion.div
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          style={{ height: "100%", background: C.blue }}
        />
      </div>

      {/* Thumbnail strip */}
      <div style={{
        position: "absolute", bottom: 44,
        left: "50%", transform: "translateX(-50%)",
        display: "flex", gap: 6,
      }}>
        {wedding.gallery.map((_, i) => (
          <motion.button
            key={i}
            onClick={(e) => { e.stopPropagation(); }}
            whileHover={{ scale: 1.2 }}
            style={{
              width: i === index ? 20 : 5,
              height: 5,
              borderRadius: 3,
              background: i === index ? C.blue : C.border,
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "width 0.3s, background 0.3s",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

// ─── Section heading ──────────────────────────────────────────────────────────
const Heading = ({ inView }: { inView: boolean }) => (
  <div style={{ textAlign: "center", marginBottom: 56 }}>
    {/* Eyebrow */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 1 }}
      style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginBottom: 20 }}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={inView ? { width: 32 } : {}}
        transition={{ delay: 0.3, duration: 1.2 }}
        style={{ height: "0.5px", background: C.blue }}
      />
      <span style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 10,
        letterSpacing: "0.5em",
        textTransform: "uppercase",
        color: C.blue,
      }}>
        Gallery
      </span>
      <motion.div
        initial={{ width: 0 }}
        animate={inView ? { width: 32 } : {}}
        transition={{ delay: 0.3, duration: 1.2 }}
        style={{ height: "0.5px", background: C.blue }}
      />
    </motion.div>

    {/* Title */}
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontWeight: 300,
        fontSize: "clamp(36px, 10vw, 56px)",
        color: C.ink,
        margin: "0 0 12px",
        letterSpacing: "0.04em",
        lineHeight: 1,
      }}
    >
      Cherished Moments
    </motion.h2>

    {/* Sub */}
    <motion.p
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ delay: 0.5, duration: 1 }}
      style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontStyle: "italic",
        fontSize: 14,
        color: C.inkMid,
        margin: 0,
      }}
    >
      a lifetime of memories, beginning here
    </motion.p>

    {/* Gold accent line */}
    <motion.div
      initial={{ scaleX: 0 }}
      animate={inView ? { scaleX: 1 } : {}}
      transition={{ delay: 0.6, duration: 1.2, ease: "easeInOut" }}
      style={{
        height: "0.5px",
        width: 56,
        margin: "20px auto 0",
        background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`,
      }}
    />
  </div>
);

// ─── Main ─────────────────────────────────────────────────────────────────────
export const Gallery = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  const go = (dir: 1 | -1) =>
    setOpenIndex((p) =>
      p === null ? 0
        : dir === 1 ? (p < wedding.gallery.length - 1 ? p + 1 : 0)
          : (p > 0 ? p - 1 : wedding.gallery.length - 1)
    );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (openIndex === null) return;
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "Escape") setOpenIndex(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [openIndex]);

  // Build grid pattern: tall / wide / square alternating
  const aspects: Array<"tall" | "wide" | "square"> = wedding.gallery.map((_, i) =>
    i % 5 === 0 ? "tall" : i % 5 === 3 ? "wide" : "square"
  );

  return (
    <section
      ref={sectionRef}
      style={{
        background: C.bg,
        padding: "88px 0 100px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background pattern */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `
          radial-gradient(circle at 20% 20%, rgba(111,163,200,0.06) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(111,163,200,0.08) 0%, transparent 50%),
          linear-gradient(rgba(111,163,200,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(111,163,200,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "auto, auto, 60px 60px, 60px 60px",
        pointerEvents: "none",
      }} />

      {/* Top border line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.6, ease: "easeInOut" }}
        style={{
          position: "absolute", top: 0, left: 0, right: 0,
          height: "0.5px",
          background: `linear-gradient(90deg, transparent, ${C.blue}, rgba(111,163,200,0.3), transparent)`,
          transformOrigin: "left",
        }}
      />

      <div style={{ maxWidth: 380, margin: "0 auto", padding: "0 16px" }}>
        <Heading inView={isInView} />

        {/* ── Mosaic grid ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
        }}>
          {wedding.gallery.map((src, i) => (
            <div
              key={i}
              style={{
                gridColumn: aspects[i] === "wide" ? "1 / -1" : "auto",
              }}
            >
              <GalleryItem
                src={src}
                index={i}
                onClick={() => setOpenIndex(i)}
                delay={0.05 * (i % 8)}
                aspect={aspects[i]}
              />
            </div>
          ))}
        </div>

        {/* Bottom ornament */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ delay: 0.8, duration: 1.4, ease: "easeInOut" }}
          style={{ textAlign: "center", marginTop: 44 }}
        >
          <svg width="160" height="16" viewBox="0 0 160 16" style={{ display: "inline-block" }}>
            <line x1="0" y1="8" x2="58" y2="8" stroke={C.border} strokeWidth="0.8" />
            <circle cx="66" cy="8" r="2" fill="none" stroke={C.blue} strokeWidth="0.8" opacity="0.6" />
            <circle cx="80" cy="8" r="4" fill="none" stroke={C.blue} strokeWidth="0.8" opacity="0.8" />
            <circle cx="94" cy="8" r="2" fill="none" stroke={C.blue} strokeWidth="0.8" opacity="0.6" />
            <line x1="102" y1="8" x2="160" y2="8" stroke={C.border} strokeWidth="0.8" />
          </svg>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {openIndex !== null && (
          <Lightbox
            index={openIndex}
            onClose={() => setOpenIndex(null)}
            onPrev={() => go(-1)}
            onNext={() => go(1)}
            total={wedding.gallery.length}
          />
        )}
      </AnimatePresence>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');
      `}</style>
    </section>
  );
};