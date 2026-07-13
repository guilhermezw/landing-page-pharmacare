import { motion, useReducedMotion } from "motion/react"
import { fadeUp } from "@/lib/motion"
import SplitText from "@/components/SplitText"

const LINES = [
  "Grandes descobertas não começam com máquinas.",
  "Começam com pessoas.",
]

export default function Manifesto() {
  const reduce = useReducedMotion()

  return (
    <section id="manifesto" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="eyebrow"
          >
            Manifesto
          </motion.p>

          <h2 className="mt-6 font-serif text-4xl leading-[1.15] text-ink sm:text-5xl">
            <SplitText as="span" className="block" stagger={0.06} segments={[{ text: LINES[0] }]} />
            <SplitText
              as="span"
              className="block"
              stagger={0.06}
              delay={0.25}
              segments={[{ text: LINES[1], className: "italic text-primary" }]}
            />
          </h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-ink-soft"
          >
            Pessoas curiosas. Pessoas comprometidas. Pessoas que acreditam que o
            cuidado pode ser melhor. O PharmaCare existe para potencializar essas
            pessoas — nunca para substituí-las.
          </motion.p>
        </div>

        {/* Divider that draws in, with a glow dot travelling across it. */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-16 h-px w-40 origin-center bg-gradient-to-r from-transparent via-primary/50 to-transparent"
        >
          {!reduce && (
            <motion.span
              aria-hidden
              className="absolute top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_12px_2px_rgba(17,17,255,0.7)]"
              animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 1.4, ease: "easeInOut" }}
            />
          )}
        </motion.div>
      </div>
    </section>
  )
}
