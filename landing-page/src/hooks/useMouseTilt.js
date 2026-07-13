import { useRef } from "react"
import {
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react"

/*
  Pointer-tracked 3D tilt driven entirely by motion values — no React state,
  so the component never re-renders while the cursor moves.

  Returns:
    - ref            → attach to the tilting element
    - onMouseMove    → updates the raw pointer position (normalized 0..1)
    - onMouseLeave   → springs everything back to rest
    - style          → { rotateX, rotateY, transformPerspective } for the element
    - mx, my         → smoothed normalized position (0..1) to drive a spotlight
    - hover          → 0 at rest, 1 while hovered (for fading overlays)

  Under reduced motion it returns inert handlers and an empty style.
*/
export function useMouseTilt({ max = 12, spring = { stiffness: 220, damping: 22, mass: 0.6 } } = {}) {
  const reduce = useReducedMotion()
  const ref = useRef(null)

  // Raw normalized pointer position within the element (0..1).
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rawHover = useMotionValue(0)

  // Smoothed values — these are what everything reads from.
  const mx = useSpring(px, spring)
  const my = useSpring(py, spring)
  const hover = useSpring(rawHover, { stiffness: 180, damping: 26 })

  // Map 0..1 → tilt degrees. Y-axis inverted so the card leans toward the cursor.
  const rotateY = useTransform(mx, [0, 1], [-max, max])
  const rotateX = useTransform(my, [0, 1], [max, -max])

  if (reduce) {
    return {
      ref,
      onMouseMove: undefined,
      onMouseLeave: undefined,
      style: {},
      mx,
      my,
      hover,
      reduce: true,
    }
  }

  const onMouseMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
    rawHover.set(1)
  }

  const onMouseLeave = () => {
    px.set(0.5)
    py.set(0.5)
    rawHover.set(0)
  }

  return {
    ref,
    onMouseMove,
    onMouseLeave,
    style: { rotateX, rotateY, transformPerspective: 1200 },
    mx,
    my,
    hover,
    reduce: false,
  }
}

export default useMouseTilt
