import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "motion/react"
import { ArrowRight, Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import MagneticButton from "@/components/MagneticButton"
import { cn } from "@/lib/utils"
import logo from "@/assets/logo.png"

const LINKS = [
  { label: "Plataforma", id: "plataforma" },
  { label: "PharmAssist", id: "pharmassist" },
  { label: "Manifesto", id: "manifesto" },
  { label: "Visão", id: "visao" },
]

const panelVariants = {
  hidden: { opacity: 0, y: -8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.05, delayChildren: 0.04 },
  },
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
  const [hoveredId, setHoveredId] = useState(null)

  const sentinelRef = useRef(null)
  const menuRef = useRef(null)
  const toggleRef = useRef(null)

  // Reading-progress bar — tracks how far the page is scrolled.
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 })

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

  const indicatorId = hoveredId ?? activeId
  const pillTransition = reduce
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
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 sm:pt-4"
      >
        <nav
          className={cn(
            "relative flex w-full max-w-[1280px] items-center justify-between rounded-2xl px-4 transition-all duration-500 ease-liquid sm:px-5",
            scrolled
              ? "glass-strong py-2 shadow-[0_10px_40px_-20px_rgba(17,17,255,0.25)]"
              : "border border-transparent bg-transparent py-2.5"
          )}
        >
          {/* Logo */}
          <a
            href="#top"
            className="group flex items-center rounded-full"
            aria-label="PharmaCare — início"
          >
            <img
              src={logo}
              alt="PharmaCare"
              width="1066"
              height="615"
              decoding="async"
              className="h-8 w-auto origin-left transition-transform duration-300 ease-liquid group-hover:scale-[1.04] sm:h-9"
            />
          </a>

          {/* Center nav — animated indicator follows hover / active section */}
          <div
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex"
            onMouseLeave={() => setHoveredId(null)}
          >
            {LINKS.map((l) => {
              const isActive = activeId === l.id
              return (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  aria-current={isActive ? "true" : undefined}
                  onMouseEnter={() => setHoveredId(l.id)}
                  onFocus={() => setHoveredId(l.id)}
                  onBlur={() => setHoveredId(null)}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    isActive ? "text-primary-deep" : "text-ink-soft hover:text-primary-deep"
                  )}
                >
                  {indicatorId === l.id && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={pillTransition}
                      className="absolute inset-0 -z-10 rounded-full bg-primary/15 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)]"
                    />
                  )}
                  {l.label}
                </a>
              )
            })}
          </div>

          {/* Right cluster */}
          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <MagneticButton href="#agendar" size="sm" className="h-10 px-5" strength={12}>
                Agendar demonstração
                <ArrowRight className="size-4" />
              </MagneticButton>
            </div>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex size-11 items-center justify-center rounded-full text-ink md:hidden"
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

          {/* Reading-progress bar along the base of the condensed header. */}
          <motion.div
            aria-hidden
            style={{ scaleX: progress }}
            className={cn(
              "absolute inset-x-4 bottom-0 h-0.5 origin-left rounded-full bg-gradient-to-r from-primary via-tint to-primary/40 transition-opacity duration-500 sm:inset-x-5",
              scrolled ? "opacity-100" : "opacity-0"
            )}
          />
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
              variants={panelVariants}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
              className="glass-strong fixed inset-x-4 top-[4.75rem] z-50 flex flex-col gap-1 rounded-3xl p-3 shadow-glass md:hidden"
            >
              {LINKS.map((l) => (
                <motion.a
                  key={l.id}
                  variants={linkVariants}
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={activeId === l.id ? "true" : undefined}
                  className={cn(
                    "rounded-2xl px-4 py-3 text-base font-medium transition-colors",
                    activeId === l.id
                      ? "bg-white/60 text-primary-deep"
                      : "text-ink hover:bg-white/60"
                  )}
                >
                  {l.label}
                </motion.a>
              ))}
              <motion.div variants={linkVariants} className="mt-1">
                <Button asChild className="w-full">
                  <a href="#agendar" onClick={() => setOpen(false)}>
                    Agendar demonstração
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
