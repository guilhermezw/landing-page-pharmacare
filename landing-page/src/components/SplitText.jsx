import { Fragment } from "react"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"
import { revealContainer, wordChild, charChild } from "@/lib/motion"

/*
  Reveals a heading word-by-word (default) or char-by-char, each token riding
  up from behind its own mask. Accent segments keep their styling and the
  heading stays a single semantic element.

  Props:
    - as        → element to render (motion[as]); default "h2"
    - segments  → [{ text, className? }] — accent styling per segment
    - mode      → "words" | "chars" (chars is more dramatic; for the hero)
    - stagger   → seconds between tokens
    - delay     → delayChildren
    - className → applied to the heading element

  Under reduced motion it renders plain text with the accent classes, no motion.
*/
export default function SplitText({
  as = "h2",
  segments = [],
  mode = "words",
  stagger = 0.05,
  delay = 0,
  className,
  ...props
}) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as]

  if (reduce) {
    const Tag = as
    return (
      <Tag className={className} {...props}>
        {segments.map((seg, i) => (
          <span key={i} className={seg.className}>
            {seg.text}
          </span>
        ))}
      </Tag>
    )
  }

  const child = mode === "chars" ? charChild : wordChild

  // Mask wrapping a single token — hides it until it rides up into view.
  const Mask = ({ children, className: c }) => (
    <span
      className={cn("inline-block overflow-hidden align-bottom", c)}
      style={{ paddingBottom: "0.12em", marginBottom: "-0.12em" }}
    >
      <motion.span variants={child} className="inline-block will-change-transform">
        {children}
      </motion.span>
    </span>
  )

  return (
    <MotionTag
      className={className}
      variants={revealContainer(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      {...props}
    >
      {segments.map((seg, si) => {
        const words = seg.text.split(/(\s+)/) // keep the whitespace tokens
        return (
          <Fragment key={si}>
            {words.map((word, wi) => {
              if (/^\s+$/.test(word)) return <span key={wi}> </span>
              if (mode === "chars") {
                // Keep each word unbreakable; mask every character.
                return (
                  <span key={wi} className={cn("inline-flex", seg.className)}>
                    {[...word].map((ch, ci) => (
                      <Mask key={ci}>{ch}</Mask>
                    ))}
                  </span>
                )
              }
              return (
                <Mask key={wi} className={seg.className}>
                  {word}
                </Mask>
              )
            })}
          </Fragment>
        )
      })}
    </MotionTag>
  )
}
