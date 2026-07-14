import { motion } from "motion/react"
import { Activity, ShieldCheck, FileHeart, LineChart } from "lucide-react"

import { cn } from "@/lib/utils"
import { fadeUp, stagger, inView } from "@/lib/motion"
import { useImageLoaded } from "@/hooks/useImageLoaded"
import IconTile from "@/components/IconTile"
import TiltCard from "@/components/TiltCard"
import prontuario from "@/assets/prontuario_paciente.png"
import admin from "@/assets/dashboard_admin.png"

// Screenshot in a glass frame. The <img> width/height attributes let the
// browser reserve the aspect ratio before the (lazy) image loads — no layout
// shift — while a skeleton holds the space and the image fades up on load.
function GlassImage({ src, alt, width, height }) {
  const { ref, loaded, onLoad } = useImageLoaded()
  return (
    <div className="glass-strong relative overflow-hidden rounded-2xl p-1.5 shadow-glass-soft">
      {!loaded && (
        <div
          aria-hidden
          className="absolute inset-1.5 animate-pulse rounded-xl bg-gradient-to-br from-surface-2 to-surface-4"
        />
      )}
      <img
        ref={ref}
        onLoad={onLoad}
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className={cn(
          "relative w-full rounded-xl transition-[opacity,transform] duration-700 ease-liquid group-hover:scale-[1.045]",
          loaded ? "opacity-100 scale-100" : "opacity-0 scale-[1.02]"
        )}
      />
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
          <motion.p variants={fadeUp} {...inView} className="eyebrow">
            A plataforma
          </motion.p>
          <motion.h2 variants={fadeUp} {...inView} className="mt-4 text-4xl leading-tight text-ink sm:text-5xl">
            Prática clínica <span className="italic text-primary">organizada</span>, inteligente e segura.
          </motion.h2>
          <motion.p variants={fadeUp} {...inView} className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
            Cada funcionalidade nasce de uma pergunta simples: isso permite que um
            profissional cuide melhor de alguém?
          </motion.p>
        </div>

        <motion.div
          variants={stagger(0.1)}
          {...inView}
          className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-12"
        >
          <TiltCard
            variants={fadeUp}
            max={6}
            className="group glass flex flex-col overflow-hidden rounded-[1.75rem] p-6 sm:p-7 lg:col-span-8"
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
              <GlassImage src={prontuario} alt="Prontuário do paciente no PharmaCare" width={2940} height={1740} />
            </div>
          </TiltCard>

          <div className="flex flex-col gap-5 lg:col-span-4">
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
            className="group glass flex flex-col overflow-hidden rounded-[1.75rem] p-6 sm:p-7 lg:col-span-12"
          >
            <div className="grid items-center gap-8 lg:grid-cols-5">
              <div className="lg:col-span-2">
                <IconTile icon={LineChart} />
                <h3 className="mt-5 font-serif text-2xl text-ink sm:text-3xl">
                  Gestão com clareza clínica
                </h3>
                <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-soft">
                  Indicadores que respeitam a prática clínica. Uma visão serena do
                  serviço, sem a complexidade de um sistema hospitalar antigo.
                </p>
              </div>
              <div className="lg:col-span-3">
                <GlassImage src={admin} alt="Painel de gestão do PharmaCare com indicadores do serviço" width={2940} height={1740} />
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  )
}
