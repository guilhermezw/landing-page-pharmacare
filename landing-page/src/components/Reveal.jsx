import { motion } from "motion/react"
import { fadeUp } from "@/lib/motion"

// Quiet, disciplined once-only reveal used across content sections.
export default function Reveal({ as = "div", children, delay = 0, className, ...props }) {
  const MotionTag = motion[as]
  return (
    <MotionTag
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
      className={className}
      {...props}
    >
      {children}
    </MotionTag>
  )
}
