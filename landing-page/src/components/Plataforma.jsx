import { motion } from "motion/react"
import { Activity, ShieldCheck, FileHeart, LineChart } from "lucide-react"

import { fadeUp, stagger } from "@/lib/motion"
import TiltCard from "@/components/TiltCard"
import prontuario from "@/assets/prontuario_paciente.png"
import admin from "@/assets/dashboard_admin.png"

function GlassImage({ src, alt }) {
  return (
    <div className="glass-strong overflow-hidden rounded-2xl p-1.5 shadow-glass-soft">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="w-full rounded-xl transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045]"
      />
    </div>
  )
}

// Icon tile that leans and brightens as the card is hovered.
function IconTile({ icon: Icon }) {
  return (
    <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-primary/15">
      <Icon className="size-5" />
    </div>
  )
}

function FeatureCard({ icon, title, children }) {
  return (
    <TiltCard
      variants={fadeUp}
      max={8}
      className="group glass flex h-full flex-col rounded-2xl p-7"
    >
      <IconTile icon={icon} />
      <h3 className="mt-5 font-serif text-2xl leading-tight text-ink">{title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{children}</p>
    </TiltCard>
  )
}

export default function Plataforma() {
  return (
    <section id="plataforma" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="max-w-2xl">
          <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className="eyebrow">
            A plataforma
          </motion.p>
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className="mt-4 text-4xl leading-tight text-ink sm:text-5xl">
            Prática clínica <span className="italic text-primary">organizada</span>, inteligente e segura.
          </motion.h2>
          <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
            Cada funcionalidade nasce de uma pergunta simples: isso permite que um
            profissional cuide melhor de alguém?
          </motion.p>
        </div>

        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-12"
        >
          <TiltCard
            variants={fadeUp}
            max={6}
            className="group glass flex flex-col overflow-hidden rounded-[1.75rem] p-7 lg:col-span-7"
          >
            <div className="flex items-center gap-3">
              <IconTile icon={FileHeart} />
              <h3 className="font-serif text-2xl text-ink">Prontuário do paciente</h3>
            </div>
            <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-ink-soft">
              Toda a história clínica em um só lugar. Cada paciente tem uma
              trajetória única — e ela permanece organizada, acessível e segura.
            </p>
            <div className="mt-6">
              <GlassImage src={prontuario} alt="Prontuário do paciente no PharmaCare" />
            </div>
          </TiltCard>

          <div className="flex flex-col gap-5 lg:col-span-5">
            <FeatureCard icon={Activity} title="Acompanhamento farmacoterapêutico">
              Registre evoluções, condutas e intervenções com clareza — do
              primeiro atendimento ao acompanhamento contínuo.
            </FeatureCard>
            <FeatureCard icon={ShieldCheck} title="Menos erros de medicação">
              Interações e riscos ficam visíveis no momento certo, apoiando
              decisões mais seguras para cada paciente.
            </FeatureCard>
          </div>

          <TiltCard
            variants={fadeUp}
            max={5}
            className="group glass flex flex-col overflow-hidden rounded-[1.75rem] p-7 lg:col-span-12"
          >
            <div className="grid items-center gap-8 lg:grid-cols-2">
              <div>
                <IconTile icon={LineChart} />
                <h3 className="mt-5 font-serif text-2xl text-ink sm:text-3xl">
                  Gestão com clareza clínica
                </h3>
                <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-soft">
                  Indicadores que respeitam a prática clínica. Uma visão serena do
                  serviço, sem a complexidade de um sistema hospitalar antigo.
                </p>
              </div>
              <GlassImage src={admin} alt="Painel de gestão do PharmaCare com indicadores do serviço" />
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  )
}
