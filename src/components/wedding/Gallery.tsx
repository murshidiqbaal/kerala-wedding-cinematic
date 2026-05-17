import { wedding } from "@/data/wedding";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Play, Pause } from "lucide-react";
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
  <div style={{ textAlign: "center", marginBottom: 48 }}>
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
  const [currentSheet, setCurrentSheet] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
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

  // Responsive dynamic page bounds
  const pageWidth = "min(340px, 42vw)";
  const pageHeight = "min(450px, 56vw)";

  // Sheets Definition
  const sheets: { front: JSX.Element; back: JSX.Element }[] = [];

  // Sheet 0: Cover / Welcome
  sheets.push({
    front: (
      <div 
        onClick={() => { setIsPlaying(false); setCurrentSheet(1); }}
        className="w-full h-full flex flex-col items-center justify-center p-6 text-center cursor-pointer select-none relative" 
        style={{
          background: "linear-gradient(135deg, #0d2847 0%, #061526 100%)",
          border: "4px double rgba(180, 148, 90, 0.4)",
          boxShadow: "inset 0 0 30px rgba(0,0,0,0.6)",
          borderRadius: "0 4px 4px 0",
        }}
      >
        <div className="border border-luxury-gold/20 p-4 sm:p-6 flex flex-col items-center justify-center h-full w-full relative">
          <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-luxury-gold/30" />
          <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-luxury-gold/30" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-luxury-gold/30" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-luxury-gold/30" />
          
          <span style={{ fontSize: "clamp(7px, 2vw, 10px)" }} className="font-inter uppercase tracking-[0.4em] text-luxury-gold/60 mb-6">Our Wedding Album</span>
          <h1 style={{ fontSize: "clamp(18px, 5vw, 26px)" }} className="font-display text-luxury-gold mb-2 tracking-wide leading-tight">Rohith<br/><span style={{ fontSize: "clamp(14px, 4vw, 20px)" }} className="text-luxury-gold/80">&</span><br/>Anjana</h1>
          <div className="h-[1px] w-12 bg-luxury-gold/30 my-4" />
          <p style={{ fontSize: "clamp(7px, 2vw, 9px)" }} className="font-inter uppercase tracking-[0.3em] text-luxury-gold/60">07 . 06 . 2026</p>
          <span style={{ fontSize: "clamp(6px, 1.8vw, 8px)" }} className="font-inter italic text-luxury-gold/40 mt-8">Cherished Moments</span>
        </div>
        <div className="absolute bottom-2 right-3 font-inter text-[8px] tracking-wider text-luxury-gold/30 animate-pulse">Open ➔</div>
      </div>
    ),
    back: (
      <div 
        onClick={() => { setIsPlaying(false); setCurrentSheet(0); }}
        className="w-full h-full flex flex-col items-center justify-center p-6 sm:p-10 text-center cursor-pointer select-none" 
        style={{
          background: "#fcfaf2",
          borderRight: "1px solid rgba(0,0,0,0.05)",
          boxShadow: "inset 10px 0 20px rgba(0,0,0,0.05)",
        }}
      >
        <div className="max-w-[200px] flex flex-col items-center">
          <span style={{ fontSize: "clamp(12px, 3.5vw, 16px)" }} className="font-display text-luxury-gold mb-4 italic">Welcome</span>
          <p style={{ fontSize: "clamp(9px, 2.5vw, 11px)" }} className="font-inter text-luxury-gold/70 leading-relaxed italic">
            "From the first glance to the promise of forever. This album holds the pieces of our hearts, the laughter we shared, and the memories we cherish as we step into our new beginning together."
          </p>
          <div className="h-[1px] w-8 bg-luxury-gold/20 mt-6" />
        </div>
      </div>
    )
  });

  const endCover = (sheetIndex: number, isBack: boolean) => (
    <div 
      onClick={() => { setIsPlaying(false); setCurrentSheet(isBack ? sheetIndex : sheetIndex + 1); }}
      className="w-full h-full flex flex-col items-center justify-center p-6 text-center cursor-pointer select-none relative" 
      style={{
        background: "linear-gradient(135deg, #0d2847 0%, #061526 100%)",
        border: "4px double rgba(180, 148, 90, 0.4)",
        boxShadow: "inset 0 0 30px rgba(0,0,0,0.6)",
        borderRadius: isBack ? "4px 0 0 4px" : "0 4px 4px 0",
      }}
    >
      <div className="border border-luxury-gold/20 p-4 sm:p-6 flex flex-col items-center justify-center h-full w-full relative">
        <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-luxury-gold/30" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-luxury-gold/30" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-luxury-gold/30" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-luxury-gold/30" />
        
        <span style={{ fontSize: "clamp(11px, 3.5vw, 15px)" }} className="font-display text-luxury-gold mb-2">The End</span>
        <p style={{ fontSize: "clamp(6px, 1.8vw, 8px)" }} className="font-inter uppercase tracking-[0.2em] text-luxury-gold/60">of a beautiful beginning</p>
        <div className="h-[1px] w-8 bg-luxury-gold/25 my-4" />
        <p style={{ fontSize: "clamp(6px, 1.8vw, 8px)" }} className="font-inter text-luxury-gold/40">Thank You for Being Part of Our Story</p>
      </div>
      {isBack && <div className="absolute bottom-2 left-3 font-inter text-[8px] tracking-wider text-luxury-gold/30">➔ Restart</div>}
    </div>
  );

  const getPhotoPage = (imgIndex: number, isBack: boolean, sheetIndex: number) => {
    if (imgIndex >= wedding.gallery.length) return endCover(sheetIndex, isBack);
    return (
      <div 
        onClick={() => { setIsPlaying(false); setCurrentSheet(isBack ? sheetIndex : sheetIndex + 1); }}
        className="w-full h-full flex flex-col p-3 sm:p-5 cursor-pointer select-none" 
        style={{
          background: "#fcfaf2",
          boxShadow: isBack ? "inset 10px 0 20px rgba(0,0,0,0.03)" : "inset -10px 0 20px rgba(0,0,0,0.03)",
        }}
      >
        <div className="flex-1 bg-white p-2 border border-black/5 shadow-md flex flex-col">
          <div 
            onClick={(e) => { e.stopPropagation(); setOpenIndex(imgIndex); }}
            className="flex-1 overflow-hidden relative bg-slate-100 group"
          >
            <img src={wedding.gallery[imgIndex]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={`Memory ${imgIndex + 1}`} />
            <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-[8px] font-inter uppercase tracking-widest text-white bg-black/45 px-2.5 py-1 rounded-full backdrop-blur-sm">View</span>
            </div>
          </div>
          <div className="pt-2.5 text-center">
            <p style={{ fontSize: "clamp(10px, 3vw, 13px)" }} className="font-display text-luxury-gold">Beautiful Memory</p>
            <p style={{ fontSize: "clamp(6px, 1.8vw, 8px)" }} className="font-inter uppercase tracking-widest text-slate-400 mt-0.5">Cherished Moment</p>
          </div>
        </div>
      </div>
    );
  };

  const numPhotoSheets = Math.ceil(wedding.gallery.length / 2);
  for (let i = 0; i < numPhotoSheets; i++) {
    const sheetIndex = i + 1;
    sheets.push({
      front: getPhotoPage(i * 2, false, sheetIndex),
      back: getPhotoPage(i * 2 + 1, true, sheetIndex)
    });
  }

  if (wedding.gallery.length % 2 === 0) {
    sheets.push({
      front: endCover(sheets.length, false),
      back: (
        <div 
          onClick={() => { setIsPlaying(false); setCurrentSheet(sheets.length - 1); }}
          className="w-full h-full flex flex-col items-center justify-center p-6 text-center cursor-pointer select-none" 
          style={{
            background: "#fcfaf2",
            borderRight: "1px solid rgba(0,0,0,0.05)",
            boxShadow: "inset 10px 0 20px rgba(0,0,0,0.05)",
          }}
        >
          <div className="opacity-10">
            <div className="w-8 h-8 border-2 border-luxury-gold transform rotate-45 mb-2 mx-auto" />
          </div>
        </div>
      )
    });
  }

  // Auto page-flip logic loop
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSheet((prev) => (prev + 1) % (sheets.length + 1));
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying, sheets.length]);

  return (
    <section
      ref={sectionRef}
      style={{
        background: C.bg,
        padding: "80px 0 90px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background patterns */}
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

      <div className="w-full max-w-[800px] mx-auto px-4 flex flex-col items-center">
        <Heading inView={isInView} />

        {/* ─── 3D Photo Album ─── */}
        <div 
          className="relative flex flex-col items-center justify-center album-book-container mt-4"
          style={{
            width: "100%",
            maxWidth: "680px",
            perspective: "2000px",
          }}
        >
          {/* Depth Drop Shadow */}
          <div
            style={{
              position: "absolute",
              bottom: "-15px",
              width: `calc(1.8 * ${pageWidth})`,
              height: "20px",
              background: "rgba(6, 21, 38, 0.15)",
              filter: "blur(14px)",
              borderRadius: "50%",
              transform: "rotateX(80deg)",
              zIndex: 1,
            }}
          />

          {/* Book Linen Binder Cover Casing */}
          <div
            className="relative shadow-2xl transition-all duration-700 hover:shadow-[0_35px_80px_rgba(6,21,38,0.3)] select-none"
            style={{
              width: `calc(2 * ${pageWidth} + 16px)`,
              height: `calc(${pageHeight} + 16px)`,
              background: "linear-gradient(135deg, #091a2e 0%, #030a12 100%)",
              borderRadius: "8px",
              padding: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 25px 60px rgba(6,21,38,0.22), inset 0 0 15px rgba(0,0,0,0.6)",
              zIndex: 2,
            }}
          >
            {/* Spine (Center Binder Joint) */}
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "4px",
                background: "linear-gradient(90deg, #05101c, #162435 50%, #05101c)",
                boxShadow: "0 0 8px rgba(0,0,0,0.5)",
                zIndex: 15,
              }}
            />

            {/* Inner Page Spread Container */}
            <div
              className="relative overflow-hidden w-full h-full bg-[#f4ece1] rounded-[4px]"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {/* Spine Gutter Shadows */}
              <div className="album-gutter-shadow-left" style={{ left: "calc(50% - 15px)", right: "auto" }} />
              <div className="album-gutter-shadow-right" style={{ left: "50%" }} />

              {/* Album Sheets Render */}
              {sheets.map((sheet, i) => {
                const isFlipped = i < currentSheet;
                const rotateY = isFlipped ? -180 : 0;
                const zIndex = isFlipped ? i : sheets.length - i;
                
                return (
                  <motion.div
                    key={i}
                    className="album-sheet"
                    animate={{ rotateY }}
                    transition={{ 
                      duration: 1.3, 
                      ease: [0.25, 1, 0.5, 1],
                      delay: Math.abs(currentSheet - 1 - i) * 0.05 
                    }}
                    style={{
                      zIndex,
                      pointerEvents: (i === currentSheet || i === currentSheet - 1) ? "auto" : "none",
                    }}
                  >
                    {/* Front Side of Page Sheet */}
                    <div className="album-page-front">
                      {sheet.front}
                    </div>

                    {/* Back Side of Page Sheet */}
                    <div className="album-page-back">
                      {sheet.back}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ─── Playback Control Panel ─── */}
        <div className="flex items-center justify-center gap-6 mt-12 z-10 relative">
          {/* Previous Page Button */}
          <button
            onClick={() => {
              setIsPlaying(false);
              if (currentSheet > 0) setCurrentSheet((p) => p - 1);
            }}
            disabled={currentSheet === 0}
            className="p-3 border border-luxury-gold/30 text-luxury-gold rounded-full transition-all duration-300 hover:bg-luxury-gold/10 disabled:opacity-20 disabled:hover:bg-transparent"
            title="Previous Page"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Autoplay Play/Pause Toggle */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-6 py-2.5 border border-luxury-gold text-[9px] uppercase tracking-widest text-luxury-gold rounded-full transition-all duration-300 hover:bg-luxury-gold hover:text-white flex items-center gap-2 shadow-md"
            style={{ background: isPlaying ? "rgba(180, 148, 90, 0.08)" : "transparent" }}
          >
            {isPlaying ? (
              <>
                <Pause size={10} className="fill-luxury-gold" />
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse ml-0.5" />
                Auto Playing
              </>
            ) : (
              <>
                <Play size={10} className="fill-luxury-gold" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 ml-0.5" />
                Auto Flipping Paused
              </>
            )}
          </button>

          {/* Next Page Button */}
          <button
            onClick={() => {
              setIsPlaying(false);
              if (currentSheet < sheets.length) setCurrentSheet((p) => p + 1);
            }}
            disabled={currentSheet === sheets.length}
            className="p-3 border border-luxury-gold/30 text-luxury-gold rounded-full transition-all duration-300 hover:bg-luxury-gold/10 disabled:opacity-20 disabled:hover:bg-transparent"
            title="Next Page"
          >
            <ChevronRight size={18} />
          </button>
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

      {/* Lightbox full enlarger overlay */}
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
        
        .album-book-container {
          perspective: 2000px;
        }
        
        .album-sheet {
          transform-style: preserve-3d;
          position: absolute;
          top: 0;
          right: 0;
          width: 50%;
          height: 100%;
          transform-origin: left center;
        }
        
        .album-page-front,
        .album-page-back {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 0 4px 4px 0;
          overflow: hidden;
        }
        
        .album-page-back {
          transform: rotateY(180deg);
          border-radius: 4px 0 0 4px;
        }

        .album-gutter-shadow-left {
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          width: 15px;
          background: linear-gradient(90deg, transparent, rgba(0,0,0,0.14));
          pointer-events: none;
          z-index: 20;
        }
        
        .album-gutter-shadow-right {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 15px;
          background: linear-gradient(90deg, rgba(0,0,0,0.14), transparent);
          pointer-events: none;
          z-index: 20;
        }
      `}</style>
    </section>
  );
};