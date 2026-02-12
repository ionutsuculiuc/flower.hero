"use client";

import { useState } from "react";
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

/* Standalone rose rendered as its own <svg> element for use in HTML flow */
function Rose({
  delay,
  size = 1,
  className = "",
}: {
  delay: number;
  size?: number;
  className?: string;
}) {
  const dim = Math.round(50 * size);
  return (
    <motion.div
      className={className}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1.15, 0.36, 1] }}
    >
      <svg width={dim} height={dim} viewBox="-25 -25 50 50" overflow="visible">
        {Array.from({ length: NUM_PETALS }, (_, i) => {
          const angle = i * GOLDEN_ANGLE;
          const rad = (angle * Math.PI) / 180;
          const dist = Math.sqrt(i) * 5.5;
          const px = Math.cos(rad) * dist;
          const py = Math.sin(rad) * dist;
          const petalScale = 0.35 + (i / NUM_PETALS) * 0.75;
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
        <motion.circle
          cx="0"
          cy="0"
          r="3"
          fill="#4a0e20"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.25, delay }}
        />
      </svg>
    </motion.div>
  );
}

/* Standalone leaf rendered as its own <svg> element */
function Leaf({
  delay,
  rotate = 0,
  scale = 1,
  className = "",
}: {
  delay: number;
  rotate?: number;
  scale?: number;
  className?: string;
}) {
  const w = Math.round(14 * scale);
  const h = Math.round(22 * scale);
  return (
    <motion.div
      className={className}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, delay }}
    >
      <svg width={w} height={h} viewBox="0 0 14 22">
        <g transform={`translate(7,20) rotate(${rotate})`}>
          <path d="M0,0 Q5,-9 0,-18 Q-5,-9 0,0Z" fill="#4a7a3a" opacity="0.55" />
          <line x1="0" y1="-1" x2="0" y2="-16" stroke="#3a6a2a" strokeWidth="0.7" opacity="0.4" />
        </g>
      </svg>
    </motion.div>
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
   Rose cluster — a group of roses + leaves arranged with flexbox.
   Used on each side of the title.
   ================================================================ */

function RoseCluster({ mirror = false }: { mirror?: boolean }) {
  const baseDelay = 2.2;
  return (
    <div
      className="flex flex-col items-center gap-1"
      style={{ transform: mirror ? "scaleX(-1)" : undefined }}
    >
      {/* Large rose on top */}
      <div className="flex items-end gap-0.5">
        <Leaf delay={baseDelay + 0.3} rotate={-40} scale={1.1} />
        <Rose delay={baseDelay + 0.1} size={1.2} />
        <Leaf delay={baseDelay + 0.2} rotate={30} scale={0.9} />
      </div>
      {/* Two medium roses side by side */}
      <div className="flex items-center gap-1">
        <Leaf delay={baseDelay + 0.5} rotate={-55} scale={0.8} />
        <Rose delay={baseDelay + 0.3} size={0.9} />
        <Rose delay={baseDelay + 0.4} size={0.65} />
        <Leaf delay={baseDelay + 0.4} rotate={45} scale={0.7} />
      </div>
      {/* Small rose at bottom */}
      <Rose delay={baseDelay} size={0.4} />
    </div>
  );
}

/* ================================================================
   Reusable section dividers
   ================================================================ */

function RoseDivider() {
  return (
    <div className="flex items-center gap-4 w-full max-w-xs mx-auto">
      <div className="flex-1 h-px bg-[#5c1a2a]/20" />
      <SmallRoseIcon size={18} />
      <div className="flex-1 h-px bg-[#5c1a2a]/20" />
    </div>
  );
}

function RoseDividerLight() {
  return (
    <div className="flex items-center gap-4 w-full max-w-xs mx-auto">
      <div className="flex-1 h-px bg-white/20" />
      <SmallRoseIcon size={18} />
      <div className="flex-1 h-px bg-white/20" />
    </div>
  );
}

/* ================================================================
   Main Page
   ================================================================ */

export default function Home() {
  const [guests, setGuests] = useState(2);

  return (
    <main className="snap-y snap-mandatory h-screen overflow-y-auto">
      {/* ═══════════════════════════════════════════════════════════
         SECTION 1 — HERO
         ═══════════════════════════════════════════════════════════ */}
      <section className="flower-bg flex min-h-screen items-center justify-center overflow-hidden snap-start">
        <div className="flower-vignette" />

        <div className="relative z-10 flex flex-col items-center gap-5 px-6 py-20 text-center w-full">
          {/* ── Name row: roses + title + roses ── */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 w-full max-w-5xl">
            <div className="hidden sm:block shrink-0">
              <RoseCluster />
            </div>

            <svg className="flex-1 max-w-3xl min-w-0" viewBox="0 0 1000 200">
              <defs>
                <filter id="glow" x="-20%" y="-40%" width="140%" height="180%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="30" />
                </filter>
              </defs>
              <rect
                x="100" y="20" width="800" height="170" rx="50"
                fill="#fef7f0" opacity="0.55" filter="url(#glow)"
              />
              <motion.text
                x="500" y="140" textAnchor="middle"
                style={{
                  fontFamily: "var(--font-faith), cursive",
                  fontSize: "120px",
                  fill: "#5c1a2a",
                  stroke: "#5c1a2a",
                  strokeWidth: 1.5,
                  strokeDasharray: 3000,
                }}
                initial={{ strokeDashoffset: 3000, fillOpacity: 0 }}
                animate={{ strokeDashoffset: 0, fillOpacity: 1 }}
                transition={{
                  strokeDashoffset: { duration: 2, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 },
                  fillOpacity: { duration: 0.8, ease: "easeIn", delay: 1.8 },
                }}
              >
                Maria &amp; Andrei
              </motion.text>
            </svg>

            <div className="hidden sm:block shrink-0">
              <RoseCluster mirror />
            </div>
          </div>

          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.3 }}
          >
            <div className="w-12 h-px bg-[#5c1a2a] opacity-25" />
            <SmallRoseIcon size={20} />
            <div className="w-12 h-px bg-[#5c1a2a] opacity-25" />
          </motion.div>

          <motion.p
            className="text-serif-light text-base sm:text-lg md:text-xl"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 2.5 }}
          >
            Timișoara, Sala de evenimente
          </motion.p>

          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.8 }}
          >
            <div className="w-8 h-px bg-[#5c1a2a] opacity-20" />
            <SmallRoseIcon size={14} />
            <div className="w-8 h-px bg-[#5c1a2a] opacity-20" />
          </motion.div>

          <motion.p
            className="text-serif-light text-xl sm:text-2xl md:text-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeIn", delay: 3.0 }}
          >
            15 August 2026
          </motion.p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
         SECTION 2 — INVITATION
         ═══════════════════════════════════════════════════════════ */}
      <section className="flex min-h-screen items-center justify-center overflow-hidden bg-[#fef7f0] snap-start">
        <div className="relative z-10 flex flex-col items-center gap-12 px-6 py-24 text-center w-full max-w-3xl mx-auto">
          <motion.div
            className="flex flex-col items-center gap-10 w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <p className="text-serif-light text-lg sm:text-xl md:text-2xl tracking-[0.15em] leading-loose max-w-2xl font-normal">
              Împreună cu părinții noștri,{" "}
              <span className="font-bold">Ion &amp; Elena Popescu</span> și{" "}
              <span className="font-bold">Vasile &amp; Ana Ionescu</span>,
              și nașii noștri,{" "}
              <span className="font-bold">Mihai &amp; Cristina Dumitrescu</span>,
              vă invităm cu drag să ne fiți alături în cea mai importantă zi
              din viața noastră
            </p>

            <RoseDivider />
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
         SECTION 3 — LOCATIONS
         ═══════════════════════════════════════════════════════════ */}
      <section className="flower-bg-dark relative flex min-h-screen items-center justify-center overflow-hidden snap-start">
        <div className="relative z-10 flex flex-col items-center gap-16 px-6 py-24 text-center w-full max-w-5xl mx-auto">
          <motion.h2
            className="text-script text-4xl sm:text-5xl !text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Locatii
          </motion.h2>

          <motion.div
            className="flex flex-col md:flex-row items-stretch justify-center gap-8 w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          >
            {/* Cununie Civilă */}
            <div className="flex-1 flex flex-col items-center gap-3 bg-[#f4b0c4]/10 backdrop-blur-sm rounded-2xl px-6 py-8 border border-[#f4b0c4]/20">
              <span className="text-serif-light text-xs tracking-[0.3em] !text-white/70">
                Cununie Civilă
              </span>
              <p className="text-script text-xl sm:text-2xl !text-white">
                Primăria Timișoara
              </p>
              <p className="text-serif-light text-sm tracking-[0.15em] font-normal !text-white/50">
                Bd. C.D. Loga nr. 1, Timișoara
              </p>
              <p className="text-serif-light text-sm tracking-[0.15em] font-normal !text-white">
                Ora 11:00
              </p>
              <SmallRoseIcon size={14} />
            </div>

            {/* Cununie Religioasă */}
            <div className="flex-1 flex flex-col items-center gap-3 bg-[#f4b0c4]/10 backdrop-blur-sm rounded-2xl px-6 py-8 border border-[#f4b0c4]/20">
              <span className="text-serif-light text-xs tracking-[0.3em] !text-white/70">
                Cununie Religioasă
              </span>
              <p className="text-script text-xl sm:text-2xl !text-white">
                Catedrala Mitropolitană
              </p>
              <p className="text-serif-light text-sm tracking-[0.15em] font-normal !text-white/50">
                Piața Victoriei, Timișoara
              </p>
              <p className="text-serif-light text-sm tracking-[0.15em] font-normal !text-white">
                Ora 13:00
              </p>
              <SmallRoseIcon size={14} />
            </div>

            {/* Petrecere */}
            <div className="flex-1 flex flex-col items-center gap-3 bg-[#f4b0c4]/10 backdrop-blur-sm rounded-2xl px-6 py-8 border border-[#f4b0c4]/20">
              <span className="text-serif-light text-xs tracking-[0.3em] !text-white/70">
                Petrecere
              </span>
              <p className="text-script text-xl sm:text-2xl !text-white">
                Sala de evenimente
              </p>
              <p className="text-serif-light text-sm tracking-[0.15em] font-normal !text-white/50">
                Str. Martir Ion Mircea nr. 22, Timișoara
              </p>
              <p className="text-serif-light text-sm tracking-[0.15em] font-normal !text-white">
                Ora 18:00
              </p>
              <SmallRoseIcon size={14} />
            </div>
          </motion.div>

          {/* Google Maps */}
          <motion.div
            className="w-full rounded-2xl overflow-hidden border border-[#f4b0c4]/20 shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          >
            <iframe
              title="Locații nuntă"
              src="https://maps.google.com/maps?q=Timisoara+centru&hl=ro&z=13&output=embed"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
         SECTION 4 — TIMELINE
         ═══════════════════════════════════════════════════════════ */}
      <section className="flex min-h-screen items-center justify-center overflow-hidden bg-[#fef7f0] snap-start">
        <div className="flex flex-col items-center gap-16 px-6 py-24 text-center w-full max-w-3xl mx-auto">
          <motion.h2
            className="text-script text-4xl sm:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Programul zilei
          </motion.h2>

          <motion.div
            className="flex flex-col gap-0 w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          >
            {[
              { time: "11:00", title: "Cununie Civila", desc: "Primaria Timisoara" },
              { time: "13:00", title: "Cununie Religioasa", desc: "Catedrala Mitropolitana" },
              { time: "16:00", title: "Sedinta foto", desc: "Parcul Rozelor" },
              { time: "18:00", title: "Cocktail de bun venit", desc: "Sala de evenimente" },
              { time: "19:00", title: "Petrecere & Cina", desc: "Sala de evenimente" },
              { time: "00:00", title: "Tortul miresei", desc: "" },
            ].map((item, i, arr) => (
              <div key={i} className="flex items-stretch gap-6 sm:gap-10">
                {/* Time */}
                <div className="w-16 sm:w-20 flex-shrink-0 flex items-start justify-end pt-1">
                  <span className="text-serif-light text-sm sm:text-base tracking-[0.15em] font-bold">
                    {item.time}
                  </span>
                </div>

                {/* Timeline line & rose dot */}
                <div className="flex flex-col items-center">
                  <div className="flex-shrink-0 mt-0.5">
                    <SmallRoseIcon size={14} />
                  </div>
                  {i < arr.length - 1 && (
                    <div className="w-px flex-1 bg-[#5c1a2a]/20" />
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col items-start pb-10 pt-0">
                  <p className="text-script text-xl sm:text-2xl text-left">
                    {item.title}
                  </p>
                  {item.desc && (
                    <p className="text-serif-light text-sm tracking-[0.15em] font-normal opacity-60 text-left">
                      {item.desc}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
         SECTION 5 — RSVP
         ═══════════════════════════════════════════════════════════ */}
      <section className="flower-bg-dark relative flex min-h-screen items-center justify-center overflow-hidden snap-start">
        <div className="relative z-10 flex flex-col items-center gap-12 px-6 py-24 text-center w-full max-w-2xl mx-auto">
          <motion.h2
            className="text-script text-4xl sm:text-5xl !text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Confirma prezenta
          </motion.h2>

          <motion.p
            className="text-serif-light text-sm sm:text-base tracking-[0.15em] font-normal leading-relaxed max-w-lg !text-white/70"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          >
            Vă rugăm să confirmați participarea până la data de 1 August 2026
          </motion.p>

          <motion.form
            className="flex flex-col gap-6 w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            onSubmit={(e) => e.preventDefault()}
          >
            {/* Nume */}
            <div className="flex flex-col gap-2 text-left">
              <label className="text-serif-light text-xs tracking-[0.3em] !text-white/70">
                Nume și prenume
              </label>
              <input
                type="text"
                required
                placeholder="ex: Maria Popescu"
                className="w-full bg-[#f4b0c4]/10 backdrop-blur-sm border border-[#f4b0c4]/20 rounded-xl px-4 py-3 text-serif-light text-sm tracking-[0.1em] font-normal text-white placeholder:text-white/30 outline-none focus:border-[#f4b0c4]/50 transition-colors"
              />
            </div>

            {/* Număr persoane */}
            <div className="flex flex-col gap-2 text-left">
              <label className="text-serif-light text-xs tracking-[0.3em] !text-white/70">
                Număr persoane
              </label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setGuests((g) => Math.max(1, g - 1))}
                  className="w-12 h-12 flex items-center justify-center bg-[#f4b0c4]/10 backdrop-blur-sm border border-[#f4b0c4]/20 rounded-xl text-white text-xl hover:bg-[#f4b0c4]/20 transition-colors cursor-pointer"
                >
                  &minus;
                </button>
                <span className="text-serif-light text-2xl !text-white font-bold min-w-[3ch] text-center">
                  {guests}
                </span>
                <button
                  type="button"
                  onClick={() => setGuests((g) => Math.min(10, g + 1))}
                  className="w-12 h-12 flex items-center justify-center bg-[#f4b0c4]/10 backdrop-blur-sm border border-[#f4b0c4]/20 rounded-xl text-white text-xl hover:bg-[#f4b0c4]/20 transition-colors cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Participare */}
            <div className="flex flex-col gap-2 text-left">
              <label className="text-serif-light text-xs tracking-[0.3em] !text-white/70">
                Participare
              </label>
              <div className="flex gap-4">
                <label className="flex-1 flex items-center justify-center gap-2 bg-[#f4b0c4]/10 backdrop-blur-sm border border-[#f4b0c4]/20 rounded-xl px-4 py-3 cursor-pointer has-[:checked]:border-[#f4b0c4]/60 has-[:checked]:bg-[#f4b0c4]/20 transition-colors">
                  <input type="radio" name="attendance" value="yes" required className="accent-[#f4b0c4]" />
                  <span className="text-serif-light text-sm tracking-[0.1em] font-normal !text-white">
                    Confirm
                  </span>
                </label>
                <label className="flex-1 flex items-center justify-center gap-2 bg-[#f4b0c4]/10 backdrop-blur-sm border border-[#f4b0c4]/20 rounded-xl px-4 py-3 cursor-pointer has-[:checked]:border-[#f4b0c4]/60 has-[:checked]:bg-[#f4b0c4]/20 transition-colors">
                  <input type="radio" name="attendance" value="no" className="accent-[#f4b0c4]" />
                  <span className="text-serif-light text-sm tracking-[0.1em] font-normal !text-white">
                    Nu pot participa
                  </span>
                </label>
              </div>
            </div>

            {/* Mențiuni */}
            <div className="flex flex-col gap-2 text-left">
              <label className="text-serif-light text-xs tracking-[0.3em] !text-white/70">
                Mențiuni / Alergii alimentare
              </label>
              <textarea
                rows={3}
                placeholder="Opțional"
                className="w-full bg-[#f4b0c4]/10 backdrop-blur-sm border border-[#f4b0c4]/20 rounded-xl px-4 py-3 text-serif-light text-sm tracking-[0.1em] font-normal text-white placeholder:text-white/30 outline-none focus:border-[#f4b0c4]/50 transition-colors resize-none"
              />
            </div>

            {/* Separator */}
            <RoseDividerLight />

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#f4b0c4] text-[#5c1a2a] rounded-xl px-6 py-4 text-serif-light text-sm tracking-[0.3em] uppercase hover:bg-[#ec98b0] transition-colors cursor-pointer font-bold"
            >
              Trimite confirmarea
            </button>
          </motion.form>
        </div>
      </section>
    </main>
  );
}
