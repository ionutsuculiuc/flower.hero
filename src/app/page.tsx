"use client";

import { motion } from "framer-motion";

/* ================================================================
   SVG Rose — golden-spiral petal arrangement

   Petals are placed using the golden angle (≈137.5°) which
   produces the natural spiral pattern seen in real roses.
   The bloom animation unfurls petals from center outward.
   ================================================================ */

const GOLDEN_ANGLE = 137.508;
const NUM_PETALS = 24;
const PETAL_PATH = "M0,0 C-5,-6 -4,-15 0,-19 C4,-15 5,-6 0,0Z";

const ROSE_COLORS = [
  "#6a1530", // deep wine (center)
  "#7a1e3a",
  "#8e2845",
  "#a83458",
  "#c04668",
  "#d46080",
  "#e07898",
  "#ec98b0",
  "#f4b0c4", // light pink (outer)
];

function SvgRose({
  delay,
  size = 1,
}: {
  delay: number;
  size?: number;
}) {
  return (
    <g transform={`scale(${size})`}>
      {Array.from({ length: NUM_PETALS }, (_, i) => {
        const angle = i * GOLDEN_ANGLE;
        const rad = (angle * Math.PI) / 180;
        // Spiral radius — sqrt gives Fermat spiral (sunflower/rose pattern)
        const dist = Math.sqrt(i) * 5.5;
        const px = Math.cos(rad) * dist;
        const py = Math.sin(rad) * dist;
        // Petal size grows outward
        const petalScale = 0.35 + (i / NUM_PETALS) * 0.75;
        // Color index — inner petals darker
        const ci = Math.min(
          Math.floor((i / NUM_PETALS) * ROSE_COLORS.length),
          ROSE_COLORS.length - 1
        );

        return (
          <g
            key={i}
            transform={`translate(${px},${py}) rotate(${angle + 90}) scale(${petalScale})`}
          >
            <motion.path
              d={PETAL_PATH}
              fill={ROSE_COLORS[ci]}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.92 }}
              transition={{
                duration: 0.55,
                delay: delay + i * 0.04,
                ease: [0.22, 1.15, 0.36, 1],
              }}
            />
          </g>
        );
      })}
      {/* Tight spiral center */}
      <motion.circle
        cx="0"
        cy="0"
        r="3"
        fill="#4a0e20"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.25, delay }}
      />
    </g>
  );
}

/* ================================================================
   Small rose icon for inline separators
   ================================================================ */

function SmallRoseIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      {Array.from({ length: 12 }, (_, i) => {
        const a = i * GOLDEN_ANGLE;
        const r = (a * Math.PI) / 180;
        const d = Math.sqrt(i) * 4;
        const s = 0.4 + (i / 12) * 0.6;
        const ci = Math.min(
          Math.floor((i / 12) * ROSE_COLORS.length),
          ROSE_COLORS.length - 1
        );
        return (
          <path
            key={i}
            d={PETAL_PATH}
            fill={ROSE_COLORS[ci]}
            opacity="0.85"
            transform={`translate(${25 + Math.cos(r) * d},${25 + Math.sin(r) * d}) rotate(${a + 90}) scale(${s * 0.45})`}
          />
        );
      })}
      <circle cx="25" cy="25" r="2" fill="#4a0e20" />
    </svg>
  );
}

/* ================================================================
   Stem + Rose definitions

   The stems ARE the letter tails — they begin exactly where the
   cursive stroke ends, using a gradient that transitions from
   the text ink color (#5c1a2a) to stem green.

   Anchor points (estimated for Great Vibes "Maria & Andrei"
   at fontSize 120, centered at x=500, y=140 in viewBox 1000×200):

     "M" tail:  the opening swash dips left & below baseline → (132, 158)
     "i" tail:  the final exit stroke curves right             → (862, 148)
   ================================================================ */

const M_TAIL = { x: 132, y: 158 };
const I_TAIL = { x: 862, y: 148 };

interface RoseBranch {
  /** SVG quadratic-bezier control point */
  cx: number;
  cy: number;
  /** Rose endpoint */
  ex: number;
  ey: number;
  /** Rose scale */
  size: number;
  /** Animation delay */
  delay: number;
}

/* Left branches — extend from M tail, curving outward */
const LEFT: RoseBranch[] = [
  { cx: 70, cy: 100, ex: 40, ey: 15, size: 1.2, delay: 2.3 },
  { cx: 60, cy: 145, ex: 20, ey: 95, size: 0.9, delay: 2.6 },
  { cx: 100, cy: 140, ex: 80, ey: 95, size: 0.65, delay: 2.5 },
  { cx: 120, cy: 152, ex: 105, ey: 135, size: 0.4, delay: 2.2 },
];

/* Right branches — extend from i tail, curving outward */
const RIGHT: RoseBranch[] = [
  { cx: 930, cy: 100, ex: 960, ey: 15, size: 1.2, delay: 2.3 },
  { cx: 940, cy: 145, ex: 980, ey: 95, size: 0.9, delay: 2.6 },
  { cx: 900, cy: 140, ex: 920, ey: 95, size: 0.65, delay: 2.5 },
  { cx: 880, cy: 152, ex: 895, ey: 135, size: 0.4, delay: 2.2 },
];

/* Leaves along the stems */
const LEAVES = [
  // Left
  { x: 75, y: 75, r: -40, s: 1.1, d: 2.5 },
  { x: 50, y: 120, r: -60, s: 0.9, d: 2.7 },
  { x: 95, y: 115, r: -25, s: 0.8, d: 2.4 },
  // Right
  { x: 925, y: 75, r: 40, s: 1.1, d: 2.5 },
  { x: 950, y: 120, r: 60, s: 0.9, d: 2.7 },
  { x: 905, y: 115, r: 25, s: 0.8, d: 2.4 },
];

/* ================================================================
   Main Hero
   ================================================================ */

export default function Home() {
  return (
    <section className="flower-bg flex min-h-screen items-center justify-center overflow-hidden">
      <div className="flower-vignette" />

      <div className="relative z-10 flex flex-col items-center gap-5 px-6 py-20 text-center w-full">
        <svg
          className="relative w-full max-w-4xl"
          viewBox="0 0 1000 200"
          overflow="visible"
        >
          <defs>
            {/* Soft glow behind text */}
            <filter
              id="glow"
              x="-20%"
              y="-40%"
              width="140%"
              height="180%"
            >
              <feGaussianBlur in="SourceGraphic" stdDeviation="30" />
            </filter>

            {/* Stem gradient: text ink → green (left, going left) */}
            <linearGradient id="stem-l" x1="1" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#5c1a2a" />
              <stop offset="35%" stopColor="#4a5a3a" />
              <stop offset="100%" stopColor="#5a8a4a" />
            </linearGradient>

            {/* Stem gradient: text ink → green (right, going right) */}
            <linearGradient id="stem-r" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#5c1a2a" />
              <stop offset="35%" stopColor="#4a5a3a" />
              <stop offset="100%" stopColor="#5a8a4a" />
            </linearGradient>
          </defs>

          {/* Glow rect behind text */}
          <rect
            x="100"
            y="20"
            width="800"
            height="170"
            rx="50"
            fill="#fef7f0"
            opacity="0.55"
            filter="url(#glow)"
          />

          {/* ── Left stems + roses (from M tail) ── */}
          {LEFT.map((b, i) => (
            <g key={`l${i}`}>
              <motion.path
                d={`M${M_TAIL.x},${M_TAIL.y} Q${b.cx},${b.cy} ${b.ex},${b.ey}`}
                stroke="url(#stem-l)"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.8 }}
                transition={{
                  duration: 0.9,
                  delay: b.delay - 0.3,
                  ease: "easeOut",
                }}
              />
              <g transform={`translate(${b.ex},${b.ey})`}>
                <SvgRose delay={b.delay} size={b.size} />
              </g>
            </g>
          ))}

          {/* ── Right stems + roses (from i tail) ── */}
          {RIGHT.map((b, i) => (
            <g key={`r${i}`}>
              <motion.path
                d={`M${I_TAIL.x},${I_TAIL.y} Q${b.cx},${b.cy} ${b.ex},${b.ey}`}
                stroke="url(#stem-r)"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.8 }}
                transition={{
                  duration: 0.9,
                  delay: b.delay - 0.3,
                  ease: "easeOut",
                }}
              />
              <g transform={`translate(${b.ex},${b.ey})`}>
                <SvgRose delay={b.delay} size={b.size} />
              </g>
            </g>
          ))}

          {/* ── Leaves ── */}
          {LEAVES.map((l, i) => (
            <g
              key={`lf${i}`}
              transform={`translate(${l.x},${l.y}) rotate(${l.r}) scale(${l.s})`}
            >
              <motion.path
                d="M0,0 Q5,-9 0,-18 Q-5,-9 0,0Z"
                fill="#4a7a3a"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.55 }}
                transition={{ duration: 0.4, delay: l.d }}
              />
              <motion.line
                x1="0"
                y1="-1"
                x2="0"
                y2="-16"
                stroke="#3a6a2a"
                strokeWidth="0.7"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.4 }}
                transition={{ duration: 0.3, delay: l.d + 0.1 }}
              />
            </g>
          ))}

          {/* ── Animated names ── */}
          <motion.text
            x="500"
            y="140"
            textAnchor="middle"
            style={{
              fontFamily: "var(--font-great-vibes), cursive",
              fontSize: "120px",
              fill: "#5c1a2a",
              stroke: "#5c1a2a",
              strokeWidth: 1.5,
              strokeDasharray: 3000,
            }}
            initial={{ strokeDashoffset: 3000, fillOpacity: 0 }}
            animate={{ strokeDashoffset: 0, fillOpacity: 1 }}
            transition={{
              strokeDashoffset: {
                duration: 2,
                ease: [0.25, 0.1, 0.25, 1],
                delay: 0.3,
              },
              fillOpacity: { duration: 0.8, ease: "easeIn", delay: 1.8 },
            }}
          >
            Maria &amp; Andrei
          </motion.text>
        </svg>

        {/* ── Separator ── */}
        <motion.div
          className="relative flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.3 }}
        >
          <div className="w-12 h-px bg-[#5c1a2a] opacity-25" />
          <SmallRoseIcon size={20} />
          <div className="w-12 h-px bg-[#5c1a2a] opacity-25" />
        </motion.div>

        {/* ── Location ── */}
        <motion.p
          className="relative text-serif-light text-base sm:text-lg md:text-xl"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 2.5 }}
        >
          Timișoara, Sala de evenimente
        </motion.p>

        {/* ── Small separator ── */}
        <motion.div
          className="relative flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.8 }}
        >
          <div className="w-8 h-px bg-[#5c1a2a] opacity-20" />
          <SmallRoseIcon size={14} />
          <div className="w-8 h-px bg-[#5c1a2a] opacity-20" />
        </motion.div>

        {/* ── Date ── */}
        <motion.p
          className="relative text-serif-light text-xl sm:text-2xl md:text-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeIn", delay: 3.0 }}
        >
          15 August 2026
        </motion.p>
      </div>
    </section>
  );
}
