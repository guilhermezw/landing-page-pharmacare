import { motion, useMotionValue, useMotionTemplate, useReducedMotion } from "motion/react"
import { ArrowRight } from "lucide-react"

import { fadeUp } from "@/lib/motion"
import LiquidMesh from "@/components/LiquidMesh"
import SplitText from "@/components/SplitText"
import MagneticButton from "@/components/MagneticButton"

export default function CTAFinal() {
  const reduce = useReducedMotion()

  // Cursor-tracked glow over the panel — motion values, no re-render.
  const mx = useMotionValue(50)
  const my = useMotionValue(50)
  const glow = useMotionTemplate`radial-gradient(600px circle at ${mx}% ${my}%, rgba(17,17,255,0.12), transparent 60%)`

  const onMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set(((e.clientX - rect.left) / rect.width) * 100)
    my.set(((e.clientY - rect.top) / rect.height) * 100)
  }

  return (
    <section id="agendar" className="relative px-4 pb-8 sm:px-6">
      <div
        onMouseMove={reduce ? undefined : onMouseMove}
        className="relative mx-auto max-w-[1280px] overflow-hidden rounded-[2rem] border border-white/60 bg-gradient-to-b from-surface-3 to-surface px-6 py-20 text-center sm:py-28"
      >
        <LiquidMesh intensity={0.8} />
        {!reduce && (
          <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: glow }} />
        )}

        <div className="relative mx-auto max-w-2xl">
          <SplitText
            as="h2"
            stagger={0.06}
            className="text-4xl leading-[1.1] text-ink sm:text-6xl"
            segments={[
              { text: "Continue escrevendo a " },
              { text: "história da saúde", className: "italic text-primary" },
              { text: "." },
            ]}
          />

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-ink-soft"
          >
            Conheça o PharmaCare e veja como a tecnologia pode devolver ao
            farmacêutico o que mais importa: tempo para cuidar.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <MagneticButton href="#agendar" size="lg" shimmer="always">
              Agendar demonstração
              <ArrowRight className="size-4" />
            </MagneticButton>
            <MagneticButton href="#plataforma" size="lg" variant="glass">
              Falar com a equipe
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
