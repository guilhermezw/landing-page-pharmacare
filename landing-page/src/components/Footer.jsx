import { motion } from "motion/react"

import { fadeUp, stagger } from "@/lib/motion"
import logo from "@/assets/logo.png"

const GROUPS = [
  {
    title: "Plataforma",
    links: [
      { label: "Prontuário do paciente", href: "#plataforma" },
      { label: "Acompanhamento", href: "#plataforma" },
      { label: "PharmAssist", href: "#pharmassist" },
    ],
  },
  {
    title: "PharmaCare",
    links: [
      { label: "Manifesto", href: "#manifesto" },
      { label: "Visão de futuro", href: "#visao" },
      { label: "Nosso compromisso", href: "#crenca" },
    ],
  },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative mt-8 px-4 pb-8 sm:px-6">
      <div className="mx-auto max-w-[1280px] rounded-[2rem] glass px-6 py-14 sm:px-12">
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]"
        >
          <motion.div variants={fadeUp}>
            <a href="#top" className="group inline-flex">
              <img
                src={logo}
                alt="PharmaCare"
                width="132"
                height="76"
                className="-ml-[5px] h-16 w-auto origin-left transition-transform duration-300 ease-liquid group-hover:scale-[1.04]"
              />
            </a>
            <p className="mt-5 max-w-xs font-serif text-2xl italic leading-snug text-ink">
              Cuidar é nossa ciência.
            </p>
          </motion.div>

          {GROUPS.map((g) => (
            <motion.nav key={g.title} variants={fadeUp} aria-label={g.title}>
              <p className="eyebrow">{g.title}</p>
              <ul className="mt-4 space-y-3">
                {g.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-[15px] text-ink-soft transition-colors hover:text-primary-deep"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.nav>
          ))}
        </motion.div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-line/60 pt-6 text-sm text-ink-soft sm:flex-row sm:items-center">
          <p>© {year} PharmaCare. Cuidar é nossa ciência.</p>
          <p className="text-ink-soft/80">
            A tecnologia existe para ampliar capacidades. Jamais para substituir pessoas.
          </p>
        </div>
      </div>
    </footer>
  )
}
