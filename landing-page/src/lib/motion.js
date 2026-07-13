// Shared Framer Motion variants — from quiet reveals to expressive micro-motion.
// The liquid mesh sets the ambient tone; these variants add the interactive layer.

export const EASE = [0.22, 1, 0.36, 1]

export const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE },
  },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: EASE } },
}

// Container that staggers its children into view.
export const stagger = (staggerChildren = 0.09, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
})

// Shared whileInView props so every section reveals once, disciplined.
export const inView = {
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true, margin: "-80px" },
}

// ── Text reveals ──────────────────────────────────────────────────────────
// Each word/char rides up from behind a mask (parent needs overflow-hidden).

// Container: staggers its word/char children into view.
export const revealContainer = (staggerChildren = 0.055, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
})

// Word rises from below its mask with a soft blur settle.
export const wordChild = {
  hidden: { y: "110%", opacity: 0, filter: "blur(4px)" },
  show: {
    y: "0%",
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE },
  },
}

// Character reveal — more dramatic, for the hero headline.
export const charChild = {
  hidden: { y: "120%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.55, ease: EASE },
  },
}

// ── Continuous idle loops ─────────────────────────────────────────────────

// Gentle glow breathing for accents / the AI pull-quote.
export const glowPulse = {
  animate: {
    opacity: [0.55, 1, 0.55],
    filter: ["blur(6px)", "blur(10px)", "blur(6px)"],
    transition: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
  },
}

// Soft vertical float — badges, idle panels.
export const floatIdle = (distance = 6, duration = 5, delay = 0) => ({
  animate: {
    y: [0, -distance, 0],
    transition: { duration, delay, repeat: Infinity, ease: "easeInOut" },
  },
})
