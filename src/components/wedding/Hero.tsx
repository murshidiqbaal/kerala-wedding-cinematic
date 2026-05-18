import coupleImg from "@/assets/optimized/photo_2026-05-17_16-05-26.webp";
import { wedding } from "@/data/wedding";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// ── Floating jasmine/flower petal component with depth-of-field ────────────────
interface FlowerProps {
  delay: number;
  startX: number;
  size: number;
  depth: 0 | 1 | 2; // 0 = foreground (close, blurred), 1 = midground, 2 = background (far, tiny)
}

const Flower = ({ delay, startX, size, depth }: FlowerProps) => {
  let blur = "blur(0px)";
  let zIndex = 15;
  let duration = 14 + Math.random() * 8;
  let opacity = [0, 0.9, 0.7, 0];
  let currentSize = size;

  if (depth === 0) {
    // Foreground - large, blurred, moving fast
    blur = "blur(5px)";
    zIndex = 25;
    duration = 7 + Math.random() * 3;
    opacity = [0, 0.65, 0.45, 0];
    currentSize = size * 1.9;
  } else if (depth === 2) {
    // Background - small, faint, moving slow, slightly blurred
    blur = "blur(1.5px)";
    zIndex = 5;
    duration = 24 + Math.random() * 10;
    opacity = [0, 0.35, 0.25, 0];
    currentSize = size * 0.65;
  } else {
    // Midground - crisp, normal speed
    blur = "blur(0px)";
    zIndex = 15;
    duration = 13 + Math.random() * 7;
    opacity = [0, 0.85, 0.65, 0];
    currentSize = size;
  }

  // Create organic swaying breeze motion (horizontal keyframes)
  const swayOffset = depth === 0 ? 15 : depth === 2 ? 6 : 10;
  const xKeyframes = [
    `${startX}%`,
    `${startX + swayOffset}%`,
    `${startX - swayOffset}%`,
    `${startX + swayOffset / 2}%`,
    `${startX}%`
  ];

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: 0,
        top: "-15%",
        width: currentSize,
        height: currentSize,
        zIndex,
        filter: blur,
      }}
      animate={{
        y: ["0vh", "115vh"],
        x: xKeyframes,
        rotateX: [0, 180, 360, 540, 720],
        rotateY: [0, 360, 720, 1080, 1440],
        rotateZ: [0, 270, 540, 810, 1080],
        opacity,
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <div className="relative w-full h-full">
        {/* Render a premium multi-petal Kerala jasmine flower shape */}
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <div
            key={deg}
            className="absolute w-[45%] h-[32%] bg-gradient-to-r from-white via-white/80 to-blue-50/40 rounded-full"
            style={{
              transform: `rotate(${deg}deg) translateY(-40%) scaleX(0.7)`,
              border: "0.5px solid rgba(187, 222, 251, 0.4)",
              boxShadow: "0 0 5px rgba(255, 255, 255, 0.4)",
              transformOrigin: "bottom center",
            }}
          />
        ))}
        {/* Golden/Yellow-Blue Soft center pistil */}
        <div className="absolute inset-[36%] bg-gradient-to-r from-amber-200/90 to-blue-200/80 rounded-full blur-[0.5px]" />
      </div>
    </motion.div>
  );
};

// ── Bokeh component ──────────────────────────────────────────────────────────
const Bokeh = ({ delay, x, y, size }: { delay: number; x: number; y: number; size: number }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none bg-blue-200/10 blur-[40px]"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      width: size,
      height: size,
    }}
    animate={{
      scale: [1, 1.3, 1],
      opacity: [0.1, 0.35, 0.1],
      x: ["0%", "5%", "0%"],
      y: ["0%", "-5%", "0%"],
    }}
    transition={{
      duration: 10 + Math.random() * 5,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

// ── Cinematic Lens Flare / Light Leak overlay ──────────────────────────────────
const LightLeak = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none mix-blend-screen opacity-[0.38] z-[8]">
    <motion.div
      className="absolute rounded-full bg-gradient-to-tr from-amber-200/35 via-blue-100/15 to-transparent blur-[120px]"
      style={{
        width: "160%",
        height: "160%",
        left: "-30%",
        top: "-30%",
      }}
      animate={{
        rotate: [0, 90, 180, 270, 360],
        scale: [1, 1.15, 0.92, 1.08, 1],
        x: ["-4%", "4%", "-1%", "3%", "-4%"],
        y: ["-4%", "-1%", "4%", "-3%", "-4%"],
      }}
      transition={{
        duration: 35,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    <motion.div
      className="absolute rounded-full bg-gradient-to-br from-pink-100/25 via-orange-50/10 to-transparent blur-[100px]"
      style={{
        width: "130%",
        height: "130%",
        right: "-15%",
        bottom: "-15%",
      }}
      animate={{
        rotate: [360, 270, 180, 90, 0],
        scale: [1, 0.92, 1.12, 0.97, 1],
        x: ["4%", "-4%", "2%", "-1%", "4%"],
        y: ["4%", "1%", "-3%", "2%", "4%"],
      }}
      transition={{
        duration: 42,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  </div>
);

// ── Shimmer line component ────────────────────────────────────────────────────
const ShimmerLine = ({ delay, y }: { delay: number; y: string }) => (
  <motion.div
    className="absolute left-0 right-0 pointer-events-none z-[9]"
    style={{
      top: y,
      height: "0.5px",
      background: "linear-gradient(90deg, transparent, rgba(187, 222, 251, 0.2), rgba(255, 255, 255, 0.75), rgba(187, 222, 251, 0.2), transparent)"
    }}
    animate={{ opacity: [0, 1, 0], scaleX: [0.4, 1.1, 0.4] }}
    transition={{ duration: 7, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

// ── Animated character reveal with 3D dynamics ───────────────────────────────
const Char = ({ char, index, baseDelay }: { char: string; index: number; baseDelay: number }) => (
  <motion.span
    style={{
      display: "inline-block",
      whiteSpace: "pre",
      transformOrigin: "bottom center",
      backfaceVisibility: "hidden",
    }}
    initial={{
      opacity: 0,
      y: 70,
      scale: 0.75,
      rotateX: -95,
      rotateY: 12,
      filter: "blur(10px)",
    }}
    animate={{
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      filter: "blur(0px)",
    }}
    transition={{
      duration: 1.4,
      delay: baseDelay + index * 0.05,
      ease: [0.16, 1, 0.3, 1], // Custom cinematic bezier curve
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
      border: `1px solid rgba(255, 255, 255, ${opacity})`,
      left: "50%",
      top: "50%",
      marginLeft: -size / 2,
      marginTop: -size / 2,
      boxShadow: `0 0 20px rgba(187, 222, 251, ${opacity * 2})`,
      zIndex: 6,
    }}
    animate={{ scale: [1, 1.06, 1], opacity: [opacity, opacity * 1.5, opacity] }}
    transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

// ── Concentric Ripple waves ──────────────────────────────────────────────────
const RippleRing = ({ size, delay }: { size: number; delay: number }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: size,
      height: size,
      border: "1.5px solid rgba(187, 222, 251, 0.25)",
      left: "50%",
      top: "50%",
      marginLeft: -size / 2,
      marginTop: -size / 2,
      background: "radial-gradient(circle, rgba(227, 242, 253, 0.04) 0%, transparent 70%)",
      zIndex: 5,
    }}
    initial={{ scale: 0.6, opacity: 0 }}
    animate={{
      scale: [0.6, 1.25, 1.6],
      opacity: [0, 0.55, 0],
    }}
    transition={{
      duration: 9,
      delay,
      repeat: Infinity,
      ease: "easeOut",
    }}
  />
);

// ── Main Hero ─────────────────────────────────────────────────────────────────
export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Increased particle count and structured layers
  const flowers = Array.from({ length: 22 }, (_, i) => ({
    delay: i * 0.7,
    startX: Math.random() * 100,
    size: 15 + Math.random() * 18,
    depth: (i % 3) as 0 | 1 | 2,
  }));

  const bokehs = Array.from({ length: 8 }, (_, i) => ({
    delay: i * 1.5,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 140 + Math.random() * 200,
  }));

  const groomName = wedding.groom;
  const brideName = wedding.bride;

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] flex flex-col overflow-hidden"
      style={{ background: "#EDF5FD" }}
    >
      {/* ── Dreamy Background Gradient ── */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: "radial-gradient(circle at 30% 25%, #FFFFFF 0%, #E3F2FD 45%, #B3D7F7 100%)",
        }}
      />

      {/* Bokeh Effects */}
      {mounted && bokehs.map((b, i) => <Bokeh key={i} {...b} />)}

      {/* Noise grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02] z-[3]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px",
        }}
      />

      {/* Floating jasmine flowers (background + foreground parallax layers) */}
      {mounted && flowers.map((p, i) => <Flower key={i} {...p} />)}

      {/* Shimmer lines */}
      <ShimmerLine delay={0} y="15%" />
      <ShimmerLine delay={3.5} y="48%" />
      <ShimmerLine delay={7} y="78%" />

      {/* ── IMAGE LAYER WITH CINEMATIC KEN BURNS ── */}
      <div className="absolute inset-0 z-[2]">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="w-full h-full"
            animate={{
              scale: [1.02, 1.08, 1.02],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <img
              src={coupleImg}
              alt="The Couple"
              className="w-full h-full object-cover object-[center_30%]"
              style={{ filter: "brightness(1.08) contrast(1.03) saturate(0.95) blur(0.2px)" }}
            />
          </motion.div>
        </div>
      </div>

      {/* Dynamic Lens Flare / Light Leak Overlays */}
      {mounted && <LightLeak />}

      {/* ── Ethereal Overlays & Vignette ── */}
      <div
        className="absolute inset-0 pointer-events-none z-[10]"
        style={{
          background: `
            linear-gradient(to bottom,
              rgba(255, 255, 255, 0.45) 0%,
              rgba(255, 255, 255, 0.05) 35%,
              rgba(255, 255, 255, 0.15) 65%,
              rgba(227, 242, 253, 0.95) 100%)
          `,
        }}
      />

      {/* Ripple rings backdrop */}
      {/* <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[4]">
        <RippleRing size={280} delay={0} />
        <RippleRing size={450} delay={3} />
        <OrbitRing size={320} duration={14} delay={0} opacity={0.16} />
        <OrbitRing size={520} duration={18} delay={4} opacity={0.12} />
      </div> */}

      {/* ── CONTENT LAYER ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="relative z-[12] flex flex-col justify-end flex-1 px-7 pb-14 pt-28"
      >
        {/* Eyebrow invite tag */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="flex items-center gap-3 mb-7"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 32 }}
            transition={{ delay: 0.7, duration: 1.4, ease: "easeInOut" }}
            style={{ height: "1px", background: "rgba(33, 150, 243, 0.65)", flexShrink: 0 }}
          />
          <motion.span
            initial={{ letterSpacing: "0.2em" }}
            animate={{ letterSpacing: "0.55em" }}
            transition={{ delay: 0.3, duration: 1.6, ease: "easeOut" }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "11px",
              color: "#1565C0",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            Wedding Invitation
          </motion.span>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 32 }}
            transition={{ delay: 0.7, duration: 1.4, ease: "easeInOut" }}
            style={{ height: "1px", background: "rgba(33, 150, 243, 0.65)", flexShrink: 0 }}
          />
        </motion.div>

        {/* The Couple Names with gorgeous perspective 3D animations */}
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 400,
            lineHeight: 0.95,
            fontSize: "clamp(54px, 17vw, 98px)",
            perspective: "1000px",
            color: "#0D47A1",
            textShadow: "0 2px 10px rgba(255, 255, 255, 0.85)",
          }}
        >
          <div
            style={{
              overflow: "hidden",
              display: "block",
              paddingBottom: "0.08em",
            }}
          >
            {groomName.split("").map((c, i) => (
              <Char key={i} char={c} index={i} baseDelay={0.5} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.4, rotate: -45, filter: "blur(12px)" }}
            animate={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
            transition={{ delay: 1.3, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Cormorant Upright', 'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "clamp(34px, 10vw, 58px)",
              color: "#42A5F5",
              display: "block",
              padding: "0.15em 0",
              lineHeight: 1,
              textShadow: "0 2px 8px rgba(255, 255, 255, 0.5)",
            }}
          >
            &
          </motion.div>

          <div
            style={{
              overflow: "hidden",
              display: "block",
              paddingTop: "0.06em",
            }}
          >
            {brideName.split("").map((c, i) => (
              <Char key={i} char={c} index={i} baseDelay={1.4} />
            ))}
          </div>
        </div>

        {/* Elegant blue linear gradient divider line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 2.4, duration: 1.8, ease: "easeInOut" }}
          style={{
            height: "1px",
            marginTop: "2.8rem",
            marginBottom: "1.6rem",
            background: "linear-gradient(90deg, transparent, rgba(33, 150, 243, 0.5), transparent)",
            transformOrigin: "center",
          }}
        />

        {/* Wedding Date + Tagline */}
        <div style={{ perspective: "800px" }}>
          {/* Expanded Letter-spacing Date */}
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.2em", y: 15 }}
            animate={{ opacity: 1, letterSpacing: "0.45em", y: 0 }}
            transition={{ delay: 2.8, duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "14px",
              textTransform: "uppercase",
              color: "#1565C0",
              marginBottom: "0.7rem",
              fontWeight: 500,
            }}
          >
            {wedding.dateLabel}
          </motion.p>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 3.2, duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "16px",
              color: "rgba(21, 101, 192, 0.75)",
              letterSpacing: "0.06em",
              maxWidth: "300px",
              lineHeight: 1.4,
            }}
          >
            {wedding.tagline}
          </motion.p>
        </div>

        {/* View Invitation Luxury Button */}
        <motion.button
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.04, backgroundColor: "rgba(255, 255, 255, 0.9)" }}
          style={{
            marginTop: "2.8rem",
            alignSelf: "flex-start",
            padding: "16px 38px",
            border: "1.5px solid rgba(33, 150, 243, 0.28)",
            borderRadius: "50px",
            background: "rgba(255, 255, 255, 0.65)",
            backdropFilter: "blur(12px)",
            color: "#1565C0",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "12px",
            letterSpacing: "0.42em",
            textTransform: "uppercase",
            cursor: "pointer",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 12px 35px rgba(187, 222, 251, 0.45)",
            transition: "all 0.4s ease",
          }}
        >
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(105deg, transparent 35%, rgba(255, 255, 255, 0.85) 50%, transparent 65%)",
              backgroundSize: "200% 100%",
            }}
            animate={{ backgroundPositionX: ["-100%", "200%"] }}
            transition={{ duration: 3.2, delay: 5.5, repeat: Infinity, repeatDelay: 3.5 }}
          />
          <span style={{ position: "relative", fontWeight: 600 }}>View Invitation</span>
        </motion.button>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.2, duration: 1.2 }}
        className="absolute bottom-5 right-7 z-20 flex flex-col items-center gap-2"
      >
        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "10px",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "rgba(21, 101, 192, 0.45)",
            writingMode: "vertical-rl",
          }}
        >
          Scroll
        </span>
        <motion.div
          style={{
            width: "1px",
            height: 42,
            background: "linear-gradient(to bottom, rgba(33, 150, 243, 0.45), transparent)",
          }}
          animate={{ scaleY: [1, 0.5, 1], opacity: [0.65, 0.25, 0.65] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Cormorant+Upright:wght@300;400&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
      `}</style>
    </section>
  );
};