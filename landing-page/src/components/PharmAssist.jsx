import { motion, useReducedMotion } from "motion/react"
import { Sparkles, Brain, GitCompareArrows, Lightbulb, Stethoscope, Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { fadeUp, stagger, inView, floatIdle } from "@/lib/motion"
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

// Small frosted card that overhangs the app window, annotating what the
// assistant does — the empty-state screenshot can't show this on its own.
// Light on purpose so it reads as a product surface against the navy panel.
function Callout({ icon: Icon, label, sub, className, distance = 8, duration = 5.5, delay = 0 }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      {...(reduce ? {} : floatIdle(distance, duration, delay))}
      className={cn(
        "absolute z-20 hidden items-center gap-2.5 rounded-2xl border border-white/70 bg-white/90 px-3.5 py-2.5 shadow-glass backdrop-blur-md lg:flex",
        className
      )}
    >
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="size-4" />
      </span>
      <div className="leading-tight">
        <p className="text-[13px] font-semibold text-ink">{label}</p>
        <p className="text-[11px] text-ink-soft">{sub}</p>
      </div>
    </motion.div>
  )
}

export default function PharmAssist() {
  const reduce = useReducedMotion()
  const { ref: imgRef, loaded, onLoad } = useImageLoaded()

  return (
    <section id="pharmassist" className="relative px-4 py-16 sm:px-6 sm:py-24">
      <div className="relative mx-auto max-w-[1280px] overflow-hidden rounded-[2rem] bg-inverse px-6 py-16 sm:px-12 sm:py-20">
        <LiquidMesh intensity={0.55} className="opacity-70" />
        {/* subtle top hairline of light on the glass panel */}
        <div aria-hidden className="pointer-events-none absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

        <div className="relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
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
              className="mt-6 text-4xl leading-[1.08] text-inverse-ink sm:text-5xl"
            >
              Uma segunda camada de <span className="italic text-lavender">inteligência</span>.
            </motion.h2>

            <motion.p
              variants={fadeUp}
              {...inView}
              className="mt-5 max-w-md text-lg leading-relaxed text-inverse-ink/80"
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
              className="relative mt-8 overflow-hidden rounded-2xl border-l-2 border-lavender bg-white/5 py-4 pl-5 pr-4 backdrop-blur-md"
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
            max={7}
            glow="rgba(191,194,255,0.22)"
            className="group relative"
          >
            {/* the product surface, framed as a real app window — opaque so the
                navy panel and mesh never bleed through and wash it out */}
            <figure className="relative overflow-hidden rounded-2xl border border-white/15 bg-surface-1 shadow-glass">
              {/* window chrome: traffic-light dots + an address-bar cue */}
              <div className="flex items-center gap-3 border-b border-line/60 bg-surface-2 px-4 py-2.5">
                <div aria-hidden className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-outline/30" />
                  <span className="size-2.5 rounded-full bg-outline/30" />
                  <span className="size-2.5 rounded-full bg-primary/30" />
                </div>
                <div className="ml-auto flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-[11px] font-medium tracking-wide text-outline">
                  <Sparkles aria-hidden className="size-3 text-primary" />
                  app.pharmacare/assistente
                </div>
              </div>

              {/* opaque screen plate — the fix: no translucency, full contrast */}
              <div className="relative bg-surface">
                {!loaded && (
                  <div
                    aria-hidden
                    className="absolute inset-0 animate-pulse bg-gradient-to-br from-surface-2 to-surface-4"
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
                    "relative block w-full transition-[opacity,transform] duration-700 ease-liquid",
                    loaded ? "opacity-100 scale-100" : "opacity-0 scale-[1.02]"
                  )}
                />
              </div>
            </figure>

            {/* floating callouts narrate the value the empty screen can't show */}
            <Callout
              icon={Brain}
              label="Análise em tempo real"
              sub="Padrões e evidências"
              className="-right-4 top-14"
              distance={9}
              duration={5.5}
            />
            <Callout
              icon={GitCompareArrows}
              label="Interações sinalizadas"
              sub="No momento certo"
              className="-left-5 bottom-16"
              distance={7}
              duration={6.5}
              delay={0.8}
            />
          </TiltCard>
        </div>
      </div>
    </section>
  )
}
