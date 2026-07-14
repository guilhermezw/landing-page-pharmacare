import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { AGENDAR_URL } from "@/lib/config"
import logo from "@/assets/logo.png"

// Order mirrors the document flow (Hero → Manifesto → Plataforma → PharmAssist → Visão)
// so the active-section indicator glides left-to-right instead of jumping around.
const LINKS = [
  { label: "Manifesto", id: "manifesto" },
  { label: "Plataforma", id: "plataforma" },
  { label: "PharmAssist", id: "pharmassist" },
  { label: "Visão", id: "visao" },
]

const panelVariants = {
  hidden: { opacity: 0, y: -8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
  },
}

// Stagger lives on the <nav> wrapper so the dialog landmark structure and the
// link entrance animation can coexist.
const navVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
}

const linkVariants = {
  hidden: { opacity: 0, y: -6 },
  show: { opacity: 1, y: 0 },
}

export default function Navbar() {
  const reduce = useReducedMotion()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState(null)

  const sentinelRef = useRef(null)
  const menuRef = useRef(null)
  const toggleRef = useRef(null)

  // Header condense state — driven by a top sentinel, no per-frame scroll work.
  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Scroll spy — the active nav item follows the section crossing mid-viewport.
  // The hero (#top) is observed too, so the indicator clears near the top.
  useEffect(() => {
    const ids = ["top", ...LINKS.map((l) => l.id)]
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!sections.length) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id === "top" ? null : entry.target.id)
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  // Mobile sheet: scroll-lock, ESC to close, focus trap, focus restore.
  useEffect(() => {
    if (!open) return
    const previouslyFocused = document.activeElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const focusables = () =>
      menuRef.current
        ? Array.from(menuRef.current.querySelectorAll('a[href], button:not([disabled])'))
        : []

    focusables()[0]?.focus()

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpen(false)
        return
      }
      if (e.key !== "Tab") return
      const items = focusables()
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = prevOverflow
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus()
    }
  }, [open])

  const underlineTransition = reduce
    ? { duration: 0 }
    : { type: "spring", stiffness: 420, damping: 34 }

  return (
    <>
      {/* Flow sentinel — scrolls with the document to toggle the condensed header. */}
      <div ref={sentinelRef} aria-hidden className="absolute top-0 left-0 h-4 w-px" />

      <motion.header
        initial={reduce ? false : { y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-liquid",
          scrolled
            ? "border-b border-line/50 bg-surface/70 backdrop-blur-xl supports-[backdrop-filter]:bg-surface/55"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <nav
          className={cn(
            "mx-auto flex max-w-[1280px] items-center justify-between px-4 transition-all duration-500 ease-liquid sm:px-6",
            scrolled ? "h-14" : "h-16"
          )}
        >
          {/* Left cluster — logo + primary nav */}
          <div className="flex items-center gap-6 lg:gap-9">
            <a
              href="#top"
              className="group flex items-center rounded-md"
              aria-label="PharmaCare — início"
            >
              <img
                src={logo}
                alt="PharmaCare"
                width="1066"
                height="615"
                decoding="async"
                className="h-7 w-auto origin-left transition-transform duration-300 ease-liquid group-hover:scale-[1.03] sm:h-8"
              />
            </a>

            <div className="hidden items-center gap-1 md:flex">
              {LINKS.map((l) => {
                const isActive = activeId === l.id
                return (
                  <a
                    key={l.id}
                    href={`#${l.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "relative rounded-md px-3 py-2 text-[13px] font-medium tracking-[-0.006em] transition-colors",
                      isActive ? "text-ink" : "text-ink-soft hover:text-ink"
                    )}
                  >
                    {l.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        transition={underlineTransition}
                        className="absolute inset-x-3 -bottom-px h-px rounded-full bg-primary"
                      />
                    )}
                  </a>
                )
              })}
            </div>
          </div>

          {/* Right cluster */}
          <div className="flex items-center gap-2">
            <Button
              asChild
              className="hidden h-10 px-5 text-[13px] font-medium shadow-[0_1px_2px_rgba(11,28,48,0.08)] hover:shadow-[0_8px_24px_-8px_rgba(17,17,255,0.45)] md:inline-flex"
            >
              <a href={AGENDAR_URL} target="_blank" rel="noopener noreferrer">Agendar demonstração</a>
            </Button>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex size-11 touch-manipulation items-center justify-center rounded-lg text-ink transition-colors hover:bg-ink/[0.04] md:hidden"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <AnimatePresence initial={false} mode="wait">
                {open ? (
                  <motion.span
                    key="close"
                    initial={reduce ? false : { rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={reduce ? { opacity: 0 } : { rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <X className="size-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={reduce ? false : { rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={reduce ? { opacity: 0 } : { rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Menu className="size-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              aria-hidden
              className="fixed inset-0 z-40 bg-ink/10 backdrop-blur-sm md:hidden"
            />
            <motion.div
              key="sheet"
              id="mobile-menu"
              ref={menuRef}
              role="dialog"
              aria-modal="true"
              aria-label="Menu de navegação"
              variants={panelVariants}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
              className="glass-strong fixed inset-x-4 top-[4.5rem] z-50 rounded-2xl border border-line/50 p-3 shadow-glass [overscroll-behavior:contain] md:hidden"
            >
              <motion.nav
                aria-label="Menu principal"
                variants={navVariants}
                className="flex flex-col gap-1"
              >
                {LINKS.map((l) => (
                  <motion.a
                    key={l.id}
                    variants={linkVariants}
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={activeId === l.id ? "location" : undefined}
                    className={cn(
                      "rounded-xl px-4 py-3 text-[15px] font-medium transition-colors",
                      activeId === l.id
                        ? "bg-ink/[0.05] text-ink"
                        : "text-ink-soft hover:bg-ink/[0.04] hover:text-ink"
                    )}
                  >
                    {l.label}
                  </motion.a>
                ))}
                <motion.div variants={linkVariants} className="mt-1">
                  <Button asChild className="w-full">
                    <a
                      href={AGENDAR_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setOpen(false)}
                    >
                      Agendar demonstração
                    </a>
                  </Button>
                </motion.div>
              </motion.nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
