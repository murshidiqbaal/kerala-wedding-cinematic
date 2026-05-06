import coupleImg from "@/assets/optimized/couple-hero.webp";
import { wedding } from "@/data/wedding";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// ── Floating petal component ──────────────────────────────────────────────────
const Petal = ({ delay, x, size }: { delay: number; x: number; size: number }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{
      left: `${x}%`,
      top: "-5%",
      width: size,
      height: size,
      borderRadius: "50% 0 50% 0",
      background: "radial-gradient(circle at 40% 40%, rgba(212,175,107,0.35), rgba(212,175,107,0.08))",
      border: "0.5px solid rgba(212,175,107,0.25)",
      rotate: Math.random() * 45,
    }}
    animate={{
      y: ["0vh", "110vh"],
      rotate: [0, 180, 360],
      opacity: [0, 0.6, 0.4, 0],
      x: [`${x}%`, `${x + (Math.random() * 10 - 5)}%`],
    }}
    transition={{
      duration: 10 + Math.random() * 8,
      delay,
      repeat: Infinity,
      ease: "linear",
    }}
  />
);

// ── Shimmer line component ────────────────────────────────────────────────────
const ShimmerLine = ({ delay, y }: { delay: number; y: string }) => (
  <motion.div
    className="absolute left-0 right-0 pointer-events-none"
    style={{ top: y, height: "0.5px", background: "linear-gradient(90deg, transparent, rgba(212,175,107,0.15), rgba(212,175,107,0.4), rgba(212,175,107,0.15), transparent)" }}
    animate={{ opacity: [0, 1, 0], scaleX: [0.4, 1, 0.4] }}
    transition={{ duration: 6, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

// ── Animated character ────────────────────────────────────────────────────────
const Char = ({ char, index, baseDelay }: { char: string; index: number; baseDelay: number }) => (
  <motion.span
    style={{ display: "inline-block", whiteSpace: "pre" }}
    initial={{ opacity: 0, y: 60, rotateX: -90, filter: "blur(8px)" }}
    animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
    transition={{
      duration: 1.2,
      delay: baseDelay + index * 0.06,
      ease: [0.22, 1, 0.36, 1],
    }}
  >
    {char}
  </motion.span>
);

// ── Orbiting ring ─────────────────────────────────────────────────────────────
const OrbitRing = ({ size, duration, delay, opacity }: { size: number; duration: number; delay: number; opacity: number }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: size,
      height: size,
      border: `0.5px solid rgba(212,175,107,${opacity})`,
      left: "50%",
      top: "50%",
      marginLeft: -size / 2,
      marginTop: -size / 2,
    }}
    animate={{ scale: [1, 1.04, 1], opacity: [opacity, opacity * 1.6, opacity] }}
    transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

// ── Main Hero ─────────────────────────────────────────────────────────────────
export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Parallax on mobile via touch / gyro
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springCfg = { damping: 60, stiffness: 80 };
  const smoothX = useSpring(mouseX, springCfg);
  const smoothY = useSpring(mouseY, springCfg);
  const imgX = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const imgY = useTransform(smoothY, [-0.5, 0.5], [-12, 12]);
  const textX = useTransform(smoothX, [-0.5, 0.5], [8, -8]);
  const textY = useTransform(smoothY, [-0.5, 0.5], [4, -4]);

  useEffect(() => {
    setMounted(true);

    const onMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };

    // DeviceOrientation for mobile parallax
    const onGyro = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        mouseX.set(Math.max(-0.5, Math.min(0.5, e.gamma / 60)));
        mouseY.set(Math.max(-0.5, Math.min(0.5, (e.beta - 45) / 60)));
      }
    };

    window.addEventListener("mousemove", onMouse);
    window.addEventListener("deviceorientation", onGyro);
    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("deviceorientation", onGyro);
    };
  }, [mouseX, mouseY]);

  const petals = Array.from({ length: 14 }, (_, i) => ({
    delay: i * 1.1,
    x: 5 + (i / 13) * 90,
    size: 6 + Math.random() * 10,
  }));

  const groomName = wedding.groom;
  const brideName = wedding.bride;

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] flex flex-col overflow-hidden"
      style={{ background: "var(--bg, #0c0a07)" }}
    >
      {/* ── Deep textured background ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 120% 80% at 60% 30%, rgba(30,22,10,1) 0%, #080601 100%)",
        }}
      />

      {/* Noise grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px",
        }}
      />

      {/* Floating petals */}
      {mounted && petals.map((p, i) => <Petal key={i} {...p} />)}

      {/* Shimmer lines */}
      <ShimmerLine delay={0} y="22%" />
      <ShimmerLine delay={3.5} y="65%" />
      <ShimmerLine delay={7} y="88%" />

      {/* ── IMAGE LAYER (full bleed with parallax) ── */}
      <motion.div
        style={{ x: imgX, y: imgY }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0">
          {/* Ken Burns */}
          <motion.div
            className="w-full h-full"
            animate={{ scale: [1.06, 1.14, 1.06] }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          >
            <img
              src={coupleImg}
              alt="The Couple"
              className="w-full h-full object-cover object-top"
              style={{ filter: "sepia(20%) brightness(0.32) contrast(1.1)" }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* ── VIGNETTE & gradient overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 50% 0%, transparent 0%, rgba(8,6,1,0.55) 80%),
            linear-gradient(to bottom,
              rgba(8,6,1,0.15) 0%,
              rgba(8,6,1,0.0) 25%,
              rgba(8,6,1,0.5) 60%,
              rgba(8,6,1,0.92) 85%,
              rgba(8,6,1,1) 100%)
          `,
        }}
      />

      {/* ── Orbiting glow rings (centred mid-frame) ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <OrbitRing size={280} duration={8} delay={0} opacity={0.04} />
        <OrbitRing size={380} duration={10} delay={2} opacity={0.03} />
        <OrbitRing size={500} duration={14} delay={1} opacity={0.02} />
      </div>

      {/* ── CONTENT (pinned to bottom) ── */}
      <motion.div
        style={{ x: textX, y: textY }}
        className="relative z-10 flex flex-col justify-end flex-1 px-7 pb-14 pt-28"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="flex items-center gap-3 mb-7"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 28 }}
            transition={{ delay: 0.8, duration: 1.2, ease: "easeInOut" }}
            style={{ height: "0.5px", background: "rgba(212,175,107,0.7)", flexShrink: 0 }}
          />
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "10px",
              letterSpacing: "0.45em",
              color: "rgba(212,175,107,0.75)",
              textTransform: "uppercase",
            }}
          >
            Wedding Invitation
          </span>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 28 }}
            transition={{ delay: 0.8, duration: 1.2, ease: "easeInOut" }}
            style={{ height: "0.5px", background: "rgba(212,175,107,0.7)", flexShrink: 0 }}
          />
        </motion.div>

        {/* Names */}
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 400,
            color: "#f5ede0",
            lineHeight: 0.9,
            fontSize: "clamp(54px, 17vw, 96px)",
            perspective: "600px",
          }}
        >
          <div style={{ overflow: "hidden", display: "block", paddingBottom: "0.06em" }}>
            {groomName.split("").map((c, i) => (
              <Char key={i} char={c} index={i} baseDelay={0.6} />
            ))}
          </div>

          {/* & ampersand */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ delay: 1.4, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'Cormorant Upright', 'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "clamp(32px, 10vw, 56px)",
              color: "rgba(212,175,107,0.85)",
              display: "block",
              padding: "0.2em 0",
              lineHeight: 1,
            }}
          >
            &
          </motion.div>

          <div style={{ overflow: "hidden", display: "block", paddingTop: "0.04em" }}>
            {brideName.split("").map((c, i) => (
              <Char key={i} char={c} index={i} baseDelay={1.6} />
            ))}
          </div>
        </div>

        {/* Gold divider bar */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 2.8, duration: 1.6, ease: "easeInOut" }}
          style={{
            height: "0.5px",
            marginTop: "2rem",
            marginBottom: "1.5rem",
            background: "linear-gradient(90deg, rgba(212,175,107,0), rgba(212,175,107,0.6), rgba(212,175,107,0))",
            transformOrigin: "left",
          }}
        />

        {/* Date + tagline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.2, duration: 1 }}
        >
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "13px",
              letterSpacing: "0.38em",
              textTransform: "uppercase",
              color: "rgba(212,175,107,0.8)",
              marginBottom: "0.55rem",
            }}
          >
            {wedding.dateLabel}
          </p>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "15px",
              color: "rgba(220,205,178,0.55)",
              letterSpacing: "0.04em",
              maxWidth: "260px",
            }}
          >
            {wedding.tagline}
          </p>
        </motion.div>

        {/* CTA pill */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.6, duration: 1 }}
          whileTap={{ scale: 0.96 }}
          whileHover={{ scale: 1.02 }}
          style={{
            marginTop: "2rem",
            alignSelf: "flex-start",
            padding: "14px 32px",
            border: "0.5px solid rgba(212,175,107,0.5)",
            borderRadius: "2px",
            background: "rgba(212,175,107,0.07)",
            backdropFilter: "blur(8px)",
            color: "rgba(212,175,107,0.9)",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "12px",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            cursor: "pointer",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Shimmer sweep on button */}
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(105deg, transparent 35%, rgba(212,175,107,0.18) 50%, transparent 65%)",
              backgroundSize: "200% 100%",
            }}
            animate={{ backgroundPositionX: ["-100%", "200%"] }}
            transition={{ duration: 2.8, delay: 4.5, repeat: Infinity, repeatDelay: 3 }}
          />
          <span style={{ position: "relative" }}>View Invitation</span>
        </motion.button>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}
        className="absolute bottom-5 right-7 z-20 flex flex-col items-center gap-2"
      >
        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "9px",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "rgba(212,175,107,0.35)",
            writingMode: "vertical-rl",
          }}
        >
          Scroll
        </span>
        <motion.div
          style={{
            width: "0.5px",
            height: 36,
            background: "linear-gradient(to bottom, rgba(212,175,107,0.4), rgba(212,175,107,0))",
          }}
          animate={{ scaleY: [1, 0.4, 1], opacity: [0.6, 0.2, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* ── Google Fonts preload ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Cormorant+Upright:wght@300;400&family=Playfair+Display:wght@400;500&display=swap');
      `}</style>
    </section>
  );
};