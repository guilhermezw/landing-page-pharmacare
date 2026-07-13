import { motion, useReducedMotion } from "motion/react"
import { Sparkles, Brain, GitCompareArrows, Lightbulb, Stethoscope, Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { fadeUp, stagger, inView } from "@/lib/motion"
import { useImageLoaded } from "@/hooks/useImageLoaded"
import LiquidMesh from "@/components/LiquidMesh"
import TiltCard from "@/components/TiltCard"
import assist from "@/assets/pharma_assist.png"

const CAPABILITIES = [
  { icon: Brain, label: "Análise clínica" },
  { icon: Stethoscope, label: "Revisão farmacoterapêutica" },
  { icon: GitCompareArrows, label: "Interações medicamentosas" },
  { icon: Check, label: "Apoio à tomada de decisão" },
  { icon: Lightbulb, label: "Insights clínicos" },
]

export default function PharmAssist() {
  const reduce = useReducedMotion()
  const { ref: imgRef, loaded, onLoad } = useImageLoaded()

  return (
    <section id="pharmassist" className="relative px-4 py-16 sm:px-6 sm:py-24">
      <div className="relative mx-auto max-w-[1280px] overflow-hidden rounded-[2rem] bg-inverse px-6 py-16 sm:px-12 sm:py-20">
        <LiquidMesh intensity={0.55} className="opacity-70" />
        {/* subtle top hairline of light on the glass panel */}
        <div aria-hidden className="pointer-events-none absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

        <div className="relative grid items-center gap-12 lg:grid-cols-2">
          <div>
            <motion.div variants={fadeUp} {...inView}>
              <Badge variant="inverse">
                <motion.span
                  aria-hidden
                  animate={reduce ? undefined : { opacity: [0.6, 1, 0.6], scale: [1, 1.15, 1], rotate: [0, 12, 0] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-flex"
                >
                  <Sparkles className="size-3.5" />
                </motion.span>
                PharmAssist · Inteligência Artificial
              </Badge>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              {...inView}
              className="mt-6 text-4xl leading-tight text-inverse-ink sm:text-5xl"
            >
              Uma segunda camada de <span className="italic text-lavender">inteligência</span>.
            </motion.h2>

            <motion.p
              variants={fadeUp}
              {...inView}
              className="mt-5 max-w-md text-lg leading-relaxed text-inverse-ink/85"
            >
              A PharmAssist organiza informações, identifica padrões e apresenta
              evidências. Para ampliar a capacidade clínica do profissional —
              nunca para substituir seu julgamento.
            </motion.p>

            <motion.ul
              variants={stagger(0.08)}
              {...inView}
              className="mt-8 flex flex-wrap gap-2.5"
            >
              {CAPABILITIES.map(({ icon: Icon, label }) => (
                <motion.li
                  key={label}
                  variants={fadeUp}
                  whileHover={reduce ? undefined : { y: -3, scale: 1.04 }}
                  transition={{ type: "spring", stiffness: 320, damping: 20 }}
                  className="flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm text-inverse-ink/90 backdrop-blur-md transition-colors duration-300 hover:border-lavender/40 hover:bg-white/10 hover:shadow-[0_8px_28px_-8px_rgba(191,194,255,0.5)]"
                >
                  <Icon className="size-4 text-lavender" />
                  {label}
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              variants={fadeUp}
              {...inView}
              className="relative mt-9 overflow-hidden rounded-2xl border-l-2 border-lavender bg-white/5 py-4 pl-5 pr-4 backdrop-blur-md"
            >
              {/* glow breathing along the accent edge */}
              <motion.span
                aria-hidden
                animate={reduce ? undefined : { opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-lavender/25 to-transparent blur-md"
              />
              <p className="relative font-serif text-xl italic leading-snug text-inverse-ink sm:text-2xl">
                “A decisão clínica continua sendo do farmacêutico.”
              </p>
            </motion.div>
          </div>

          <TiltCard
            variants={fadeUp}
            {...inView}
            max={9}
            glow="rgba(191,194,255,0.22)"
            className="group relative"
          >
            <div className="glass-strong relative overflow-hidden rounded-2xl p-2 shadow-glass">
              {!loaded && (
                <div
                  aria-hidden
                  className="absolute inset-2 animate-pulse rounded-xl bg-gradient-to-br from-white/10 to-white/5"
                />
              )}
              <img
                ref={imgRef}
                onLoad={onLoad}
                src={assist}
                alt="PharmAssist analisando o caso clínico e apresentando evidências ao farmacêutico"
                width="1440"
                height="779"
                loading="lazy"
                decoding="async"
                className={cn(
                  "relative w-full rounded-xl transition-[opacity,transform] duration-700 ease-liquid",
                  loaded ? "opacity-100 scale-100" : "opacity-0 scale-[1.02]"
                )}
              />
              {/* scan line sweeping the screenshot — suggests live analysis */}
              {!reduce && loaded && (
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-2 top-2 h-16 rounded-xl bg-gradient-to-b from-transparent via-lavender/25 to-transparent blur-sm"
                  animate={{ y: ["-4rem", "22rem"] }}
                  transition={{ duration: 3.8, repeat: Infinity, repeatDelay: 1.6, ease: "easeInOut" }}
                />
              )}
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  )
}
