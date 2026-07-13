import { useRef } from "react"
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react"
import { ArrowRight, ShieldCheck } from "lucide-react"

import { cn } from "@/lib/utils"
import LiquidMesh from "@/components/LiquidMesh"
import SplitText from "@/components/SplitText"
import MagneticButton from "@/components/MagneticButton"
import { useMouseTilt } from "@/hooks/useMouseTilt"
import { useImageLoaded } from "@/hooks/useImageLoaded"
import dashboard from "@/assets/dahsboard_pharma.png"

const EASE = [0.22, 1, 0.36, 1]

const item = {
  hidden: { opacity: 0, y: 26, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: EASE } },
}

export default function Hero() {
  const reduce = useReducedMotion()
  const { ref: imgRef, loaded, onLoad } = useImageLoaded()
  const frameRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [70, -60])
  const scrollRotate = useTransform(scrollYProgress, [0, 0.5], reduce ? [0, 0] : [6, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], reduce ? [1, 1] : [0.94, 1])

  // Pointer-driven 3D tilt layered on top of the scroll parallax.
  const { ref: tiltRef, onMouseMove, onMouseLeave, rotateX, rotateY } = useMouseTilt({ max: 8 })

  return (
    <section id="top" className="relative overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-28">
      <LiquidMesh />
      {/* soft top glow anchoring the header */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-white/70 to-transparent"
      />

      <div className="relative mx-auto max-w-[1280px] px-6">
        <motion.div
          variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-3xl text-center"
        >
          <motion.p variants={item} className="eyebrow">
            Assistência farmacêutica clínica
          </motion.p>

          <SplitText
            as="h1"
            mode="chars"
            stagger={0.03}
            delay={0.15}
            trigger="mount"
            className="mt-5 text-[3.25rem] leading-[1.02] text-ink sm:text-7xl"
            segments={[
              { text: "Cuidar é " },
              { text: "nossa ciência", className: "italic text-primary" },
              { text: "." },
            ]}
          />

          <motion.p
            variants={item}
            className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-soft"
          >
            A plataforma que coloca o farmacêutico no centro do cuidado —
            para dedicar menos tempo à burocracia e mais tempo ao paciente.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <MagneticButton href="#agendar" size="lg">
              Agendar demonstração
              <ArrowRight className="size-4" />
            </MagneticButton>
            <MagneticButton href="#plataforma" size="lg" variant="glass">
              Conhecer a plataforma
            </MagneticButton>
          </motion.div>

          <motion.p
            variants={item}
            className="mt-6 flex items-center justify-center gap-2 text-sm text-ink-soft"
          >
            <ShieldCheck className="size-4 text-primary" />
            Construída com rigor científico e respeito pela decisão clínica.
          </motion.p>
        </motion.div>

        {/* The grand reveal — dashboard floating in a glass frame */}
        {/* Stable container: owns the pointer listeners + perspective, never transformed,
            so its measured rect stays put and the tilt tracks the cursor cleanly. */}
        <div
          ref={tiltRef}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          className="mx-auto mt-16 max-w-5xl [perspective:1400px] sm:mt-20"
        >
          {/* Scroll parallax */}
          <motion.div
            ref={frameRef}
            style={{ y, rotateX: scrollRotate, scale }}
            className="[transform-style:preserve-3d]"
          >
            {/* Idle float */}
            <motion.div
              className="[transform-style:preserve-3d]"
              animate={reduce ? undefined : { y: [0, -10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Pointer tilt (isolated on its own layer) */}
              <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
              <div className="glass-strong relative overflow-hidden rounded-[1.75rem] p-2 shadow-glass sm:p-3">
                <div className="absolute inset-x-10 -top-px z-10 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
                {/* light glare sweeping across the glass */}
                {!reduce && (
                  <motion.span
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 z-10 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent blur-md"
                    animate={{ x: ["-140%", "340%"] }}
                    transition={{ duration: 6, repeat: Infinity, repeatDelay: 3.5, ease: "easeInOut" }}
                  />
                )}
                {!loaded && (
                  <div
                    aria-hidden
                    className="absolute inset-2 animate-pulse rounded-[1.35rem] bg-gradient-to-br from-surface-2 to-surface-4 sm:inset-3"
                  />
                )}
                <img
                  ref={imgRef}
                  onLoad={onLoad}
                  src={dashboard}
                  alt="Painel clínico do PharmaCare com o acompanhamento farmacoterapêutico do paciente"
                  width="1440"
                  height="778"
                  fetchPriority="high"
                  decoding="async"
                  className={cn(
                    "relative w-full rounded-[1.35rem] transition-opacity duration-500 ease-liquid",
                    loaded ? "opacity-100" : "opacity-0"
                  )}
                />
              </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
