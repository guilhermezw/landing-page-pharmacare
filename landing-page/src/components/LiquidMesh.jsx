import { motion, useReducedMotion } from "motion/react"

/*
  The signature: slow-drifting cobalt & lavender "liquid" blobs behind glass.
  Pure decoration — hidden from assistive tech, frozen under reduced-motion.
*/
export default function LiquidMesh({ className = "", intensity = 1 }) {
  const reduce = useReducedMotion()

  const blob = (delay, duration) =>
    reduce
      ? {}
      : {
          animate: {
            x: [0, 30, -20, 0],
            y: [0, -24, 18, 0],
            scale: [1, 1.08, 0.96, 1],
          },
          transition: { duration, delay, repeat: Infinity, ease: "easeInOut" },
        }

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <motion.div
        {...blob(0, 22)}
        className="absolute -top-24 left-[8%] h-[38rem] w-[38rem] rounded-full blur-[90px]"
        style={{
          opacity: 0.5 * intensity,
          background:
            "radial-gradient(circle at 30% 30%, #1111ff 0%, rgba(53,60,255,0.35) 45%, transparent 70%)",
        }}
      />
      <motion.div
        {...blob(3, 27)}
        className="absolute top-[6rem] right-[4%] h-[32rem] w-[32rem] rounded-full blur-[100px]"
        style={{
          opacity: 0.45 * intensity,
          background:
            "radial-gradient(circle at 60% 40%, #bfc2ff 0%, rgba(191,194,255,0.45) 50%, transparent 72%)",
        }}
      />
      <motion.div
        {...blob(6, 31)}
        className="absolute -bottom-32 left-[38%] h-[34rem] w-[34rem] rounded-full blur-[110px]"
        style={{
          opacity: 0.4 * intensity,
          background:
            "radial-gradient(circle at 50% 50%, #d3e4fe 0%, rgba(211,228,254,0.5) 55%, transparent 75%)",
        }}
      />
    </div>
  )
}
