import { motion } from "motion/react"
import { Cpu, Share2, Compass, Infinity as InfinityIcon } from "lucide-react"

import { fadeUp, stagger, inView } from "@/lib/motion"
import IconTile from "@/components/IconTile"
import TiltCard from "@/components/TiltCard"

const PILLARS = [
  {
    icon: Cpu,
    title: "Inteligência clínica",
    text: "IA aplicada ao cuidado, sempre a serviço do julgamento do profissional.",
  },
  {
    icon: Share2,
    title: "Interoperabilidade",
    text: "Conhecimento que flui entre profissionais, sistemas e o cuidado.",
  },
  {
    icon: Compass,
    title: "Suporte à decisão",
    text: "Evidências no momento certo, para escolhas mais seguras e humanas.",
  },
  {
    icon: InfinityIcon,
    title: "Evolução contínua",
    text: "Uma plataforma que amadurece junto com a ciência que a inspira.",
  },
]

export default function Visao() {
  return (
    <section id="visao" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="max-w-2xl">
          <motion.p variants={fadeUp} {...inView} className="eyebrow">
            Visão de futuro
          </motion.p>
          <motion.h2 variants={fadeUp} {...inView} className="mt-4 text-balance text-4xl leading-tight text-ink sm:text-5xl">
            Construindo o futuro da <span className="italic text-primary">assistência farmacêutica</span>.
          </motion.h2>
          <motion.p variants={fadeUp} {...inView} className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
            Um único ecossistema conectando conhecimento científico, tecnologia e
            cuidado humano. Um novo padrão para a prática clínica.
          </motion.p>
        </div>

        {/* Top rule that draws its width in. */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 h-px w-full origin-left bg-line/60"
        />

        <motion.div
          variants={stagger(0.09, 0.15)}
          {...inView}
          className="mt-12 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {PILLARS.map(({ icon: Icon, title, text }) => (
            <TiltCard
              key={title}
              variants={fadeUp}
              max={10}
              glow="rgba(17,17,255,0.12)"
              className="group rounded-2xl p-1"
            >
              <IconTile icon={Icon} />
              <h3 className="mt-5 font-serif text-2xl text-ink">{title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{text}</p>
            </TiltCard>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
