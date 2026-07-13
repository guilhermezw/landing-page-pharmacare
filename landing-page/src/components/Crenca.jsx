import { motion, useReducedMotion } from "motion/react"

import { Badge } from "@/components/ui/badge"
import { fadeUp, stagger, inView } from "@/lib/motion"
import icon from "@/assets/icon.svg"

const VALUES = [
  "Confiança",
  "Excelência",
  "Inovação",
  "Segurança",
  "Inteligência",
  "Cuidado",
  "Simplicidade",
  "Elegância",
]

export default function Crenca() {
  const reduce = useReducedMotion()

  return (
    <section id="crenca" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="glass relative overflow-hidden rounded-[2rem] px-6 py-16 text-center sm:px-12 sm:py-20">
          {/* Icon breathes gently after it enters. */}
          <motion.div
            animate={reduce ? undefined : { y: [0, -6, 0], scale: [1, 1.04, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="mx-auto w-fit"
          >
            <motion.img
              src={icon}
              alt=""
              aria-hidden
              width="48"
              height="48"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="size-12"
            />
          </motion.div>

          <motion.p variants={fadeUp} {...inView} className="eyebrow mt-6">
            Nosso compromisso
          </motion.p>

          <motion.blockquote
            variants={fadeUp}
            {...inView}
            className="mx-auto mt-5 max-w-2xl font-serif text-3xl leading-tight text-ink sm:text-[2.6rem]"
          >
            “Isso ajuda alguém a cuidar{" "}
            <span className="italic text-primary">melhor</span> de outra pessoa?”
          </motion.blockquote>

          <motion.p variants={fadeUp} {...inView} className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">
            Toda decisão de design, toda funcionalidade, toda linha de código
            existe para responder essa única pergunta.
          </motion.p>

          <motion.div
            variants={stagger(0.05)}
            {...inView}
            className="mt-10 flex flex-wrap justify-center gap-2.5"
          >
            {VALUES.map((v, i) => (
              <motion.span key={v} variants={fadeUp} className="inline-block">
                <motion.span
                  className="inline-block"
                  animate={reduce ? undefined : { y: [0, -5, 0] }}
                  transition={{ duration: 4 + (i % 4) * 0.6, delay: i * 0.25, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={reduce ? undefined : { scale: 1.09 }}
                >
                  <Badge>{v}</Badge>
                </motion.span>
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
