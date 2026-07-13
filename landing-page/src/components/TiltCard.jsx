import { motion, useMotionTemplate, useTransform } from "motion/react"

import { cn } from "@/lib/utils"
import { useMouseTilt } from "@/hooks/useMouseTilt"

/*
  A glass surface that leans toward the cursor in 3D and lights up with a
  spotlight that tracks the pointer. Pure transforms + opacity — no per-frame
  React re-renders (all driven by motion values from useMouseTilt).

  Props:
    - variants  → entrance variant to inherit (e.g. fadeUp); reveal handled by parent stagger
    - glow      → spotlight color (default cobalt primary)
    - max       → tilt amplitude in degrees
    - className → applied to the tilting surface (keep .glass / rounding here)
    - children  → card content; place inside a preserve-3d flow

  Under reduced motion useMouseTilt returns inert handlers, so it renders as a
  plain motion.div with just the entrance animation.
*/
export default function TiltCard({
  children,
  variants,
  glow = "rgba(17,17,255,0.16)",
  max = 10,
  className,
  ...props
}) {
  const { ref, onMouseMove, onMouseLeave, style, mx, my, hover, reduce } = useMouseTilt({ max })

  // Spotlight follows the cursor; fades in with hover.
  const spotX = useTransform(mx, (v) => `${v * 100}%`)
  const spotY = useTransform(my, (v) => `${v * 100}%`)
  const spotlight = useMotionTemplate`radial-gradient(circle at ${spotX} ${spotY}, ${glow}, transparent 55%)`

  return (
    <motion.div
      ref={ref}
      variants={variants}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ ...style, transformStyle: "preserve-3d" }}
      className={cn("relative", className)}
      {...props}
    >
      {!reduce && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit]"
          style={{ background: spotlight, opacity: hover }}
        />
      )}
      {children}
    </motion.div>
  )
}
