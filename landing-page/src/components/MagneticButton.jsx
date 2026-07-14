import { useRef } from "react"
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

/*
  An anchor CTA that is magnetically pulled toward the cursor and swept by a
  light shimmer. Wraps the shadcn Button (asChild → <a>) so all variants,
  sizes and focus styles are preserved.

  Props:
    - href       → anchor target. In-page anchors (#id) or external URLs
                   (http/https) — external links open in a new tab.
    - variant/size → forwarded to Button
    - shimmer    → "hover" (sweep on hover, default) | "always" (continuous)
    - strength   → magnetic pull factor (px per fraction of half-size)
    - className  → merged onto the button
    - children   → label + icon

  Under reduced motion it renders a plain Button with no magnet or shimmer.
*/
export default function MagneticButton({
  href,
  variant,
  size,
  shimmer = "hover",
  strength = 18,
  className,
  children,
  ...props
}) {
  const reduce = useReducedMotion()
  const anchorRef = useRef(null)

  // External links (http/https) open in a new tab with safe rel; in-page
  // anchors stay in the same tab.
  const isExternal = /^https?:\/\//.test(href || "")
  const externalProps = isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {}

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.5 })

  if (reduce) {
    return (
      <Button asChild variant={variant} size={size} className={className}>
        <a href={href} {...externalProps} {...props}>
          {children}
        </a>
      </Button>
    )
  }

  const onMouseMove = (e) => {
    const el = anchorRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const relX = (e.clientX - rect.left) / rect.width - 0.5
    const relY = (e.clientY - rect.top) / rect.height - 0.5
    x.set(relX * strength * 2)
    y.set(relY * strength * 2)
  }

  const onMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const shimmerSpan = (
    <motion.span
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        background:
          "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.55) 50%, transparent 70%)",
      }}
      variants={{ rest: { x: "-130%" }, hover: { x: "130%" } }}
      {...(shimmer === "always"
        ? {
            animate: { x: ["-130%", "130%"] },
            transition: { duration: 2.6, repeat: Infinity, repeatDelay: 1.4, ease: "easeInOut" },
          }
        : {})}
    />
  )

  return (
    <motion.div
      className="inline-block"
      style={{ x: sx, y: sy }}
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.97 }}
    >
      <Button asChild variant={variant} size={size} className={cn("relative overflow-hidden", className)}>
        <a ref={anchorRef} href={href} {...externalProps} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} {...props}>
          {shimmerSpan}
          <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
        </a>
      </Button>
    </motion.div>
  )
}
