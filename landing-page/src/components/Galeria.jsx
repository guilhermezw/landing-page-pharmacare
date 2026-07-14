import { useCallback, useEffect, useRef, useState } from "react"
import {
  motion,
  animate,
  useMotionValue,
  useMotionTemplate,
  useTransform,
  useReducedMotion,
} from "motion/react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { fadeUp, inView, EASE } from "@/lib/motion"
import { useImageLoaded } from "@/hooks/useImageLoaded"
import { useMouseTilt } from "@/hooks/useMouseTilt"
import LiquidMesh from "@/components/LiquidMesh"

/*
  "Pessoas" — a Coverflow-3D gallery of clinical research photography.

  The active photo faces the viewer; neighbours rotate back into depth on a
  cobalt-lit stage. Drag with momentum, click a side card, use the arrows or
  the keyboard. Autoplay drifts gently (ping-pong) and pauses on interaction.
  Under reduced motion it degrades to a calm scroll-snap row — no 3D, no auto.

  Images are optimized at build time by vite-imagetools: each source JPG
  (3–12 MB) is emitted as responsive WebP (tens of KB) with a srcset.
*/

// Responsive WebP srcset per photo (vite-imagetools transforms at build time).
const srcsetModules = import.meta.glob("../assets/images/*.{jpg,jpeg}", {
  eager: true,
  import: "default",
  query: { w: "560;900;1400", format: "webp", quality: "72", as: "srcset" },
})

// Single-width WebP fallback used as the plain <img src>.
const srcModules = import.meta.glob("../assets/images/*.{jpg,jpeg}", {
  eager: true,
  import: "default",
  query: { w: "1100", format: "webp", quality: "72" },
})

// Generic, honest pt-BR descriptions — cycled across the (stock) photos.
const ALTS = [
  "Profissionais de saúde em pesquisa clínica",
  "Cientista analisando amostras em laboratório",
  "Equipe médica em ambiente hospitalar",
  "Pesquisa científica com foco no cuidado humano",
  "Farmacêuticos e pesquisadores em trabalho clínico",
]

const SLIDES = Object.keys(srcsetModules)
  .sort()
  .map((path, i) => ({
    srcset: srcsetModules[path],
    src: srcModules[path],
    alt: ALTS[i % ALTS.length],
  }))

// ── One glass-framed photo, placed in 3D by its offset from the active card ──
function Slide({ slide, offset, spacing, cardW, cardH, isActive, inWindow, onActivate }) {
  const { ref: imgRef, loaded, onLoad } = useImageLoaded()
  const { ref: tiltRef, onMouseMove, onMouseLeave, style: tiltStyle, mx, my, hover, reduce: tiltReduce } =
    useMouseTilt({ max: 9 })

  // Coverflow placement derived from the signed distance to the active card.
  const dist = Math.abs(offset)
  const x = offset * spacing
  const rotateY = Math.max(-55, Math.min(55, -offset * 42))
  const z = -Math.min(dist, 3) * 220
  const scale = 1 - Math.min(dist, 3) * 0.12
  const opacity = isActive ? 1 : Math.max(0, 1 - dist * 0.32)
  const zIndex = SLIDES.length - dist

  // Cursor spotlight — only meaningful on the front-facing (active) card.
  const spotX = useTransform(mx, (v) => `${v * 100}%`)
  const spotY = useTransform(my, (v) => `${v * 100}%`)
  const spotlight = useMotionTemplate`radial-gradient(circle at ${spotX} ${spotY}, rgba(17,17,255,0.18), transparent 55%)`

  return (
    <motion.div
      className="absolute cursor-pointer select-none"
      style={{
        top: "50%",
        left: "50%",
        width: cardW,
        height: cardH,
        marginLeft: -cardW / 2,
        marginTop: -cardH / 2,
        zIndex,
        transformStyle: "preserve-3d",
        transformPerspective: 1400,
        pointerEvents: opacity <= 0.02 ? "none" : "auto",
      }}
      animate={{ x, rotateY, z, scale, opacity }}
      transition={{ duration: 0.7, ease: EASE }}
      onClick={() => !isActive && onActivate()}
      aria-hidden={!isActive}
    >
      <motion.div
        ref={tiltRef}
        onMouseMove={isActive ? onMouseMove : undefined}
        onMouseLeave={isActive ? onMouseLeave : undefined}
        style={isActive && !tiltReduce ? { ...tiltStyle, transformStyle: "preserve-3d" } : undefined}
        className={cn(
          "glass-strong relative h-full w-full overflow-hidden rounded-2xl p-1.5 transition-shadow duration-500",
          isActive ? "shadow-glass" : "shadow-glass-soft"
        )}
      >
        {/* Skeleton holds the frame until the WebP decodes. */}
        {inWindow && !loaded && (
          <div
            aria-hidden
            className="absolute inset-1.5 animate-pulse rounded-xl bg-gradient-to-br from-surface-2 to-surface-4"
          />
        )}

        {inWindow && (
          <img
            ref={imgRef}
            onLoad={onLoad}
            src={slide.src}
            srcSet={slide.srcset}
            sizes="(max-width: 640px) 72vw, 42vw"
            alt={slide.alt}
            width={cardW}
            height={cardH}
            draggable={false}
            decoding="async"
            className={cn(
              "h-full w-full rounded-xl object-cover transition-[opacity,transform] duration-700 ease-liquid",
              loaded ? "opacity-100 scale-100" : "opacity-0 scale-[1.03]"
            )}
          />
        )}

        {/* Depth veil on side cards; cobalt spotlight on the active one. */}
        {!isActive && (
          <div aria-hidden className="pointer-events-none absolute inset-1.5 rounded-xl bg-ink/25" />
        )}
        {isActive && !tiltReduce && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10 rounded-2xl"
            style={{ background: spotlight, opacity: hover }}
          />
        )}
      </motion.div>
    </motion.div>
  )
}

// ── Reduced-motion fallback: a calm horizontal scroll-snap row ───────────────
function GaleriaEstatica() {
  return (
    <div className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4">
      {SLIDES.map((slide, i) => (
        <div
          key={i}
          className="glass-strong shadow-glass-soft w-[78vw] max-w-[460px] shrink-0 snap-center overflow-hidden rounded-2xl p-1.5"
        >
          <img
            src={slide.src}
            srcSet={slide.srcset}
            sizes="78vw"
            alt={slide.alt}
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full rounded-xl object-cover"
          />
        </div>
      ))}
    </div>
  )
}

export default function Galeria() {
  const reduce = useReducedMotion()
  const n = SLIDES.length

  const [active, setActive] = useState(Math.floor(n / 2))
  const [paused, setPaused] = useState(false)
  const [stageW, setStageW] = useState(0)

  const stageRef = useRef(null)
  const dragX = useMotionValue(0)
  const drag = useRef({ active: false, startX: 0, lastX: 0, lastT: 0, v: 0 })

  // Measure the stage so card size and spacing stay responsive.
  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    setStageW(el.clientWidth)
    const ro = new ResizeObserver(([entry]) => setStageW(entry.contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const isNarrow = stageW > 0 && stageW < 640
  const cardW = Math.min(Math.max(stageW * (isNarrow ? 0.72 : 0.42), 220), 460)
  const cardH = (cardW * 3) / 4
  const spacing = cardW * (isNarrow ? 0.5 : 0.62)

  const go = useCallback(
    (step) => setActive((cur) => Math.max(0, Math.min(n - 1, cur + step))),
    [n]
  )

  // Autoplay — ping-pong across the deck, disabled while paused or reduced.
  const dirRef = useRef(1)
  useEffect(() => {
    if (reduce || paused || n <= 1) return
    const id = setInterval(() => {
      setActive((cur) => {
        let d = dirRef.current
        if (cur + d > n - 1) d = dirRef.current = -1
        else if (cur + d < 0) d = dirRef.current = 1
        return cur + d
      })
    }, 4500)
    return () => clearInterval(id)
  }, [reduce, paused, n])

  // Drag-to-scrub with momentum snapping.
  const onPointerDown = (e) => {
    if (reduce) return
    setPaused(true)
    drag.current = { active: true, startX: e.clientX, lastX: e.clientX, lastT: performance.now(), v: 0 }
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }
  const onPointerMove = (e) => {
    const d = drag.current
    if (!d.active) return
    const now = performance.now()
    const dt = now - d.lastT || 16
    d.v = (e.clientX - d.lastX) / dt // px per ms
    d.lastX = e.clientX
    d.lastT = now
    dragX.set(e.clientX - d.startX)
  }
  const endDrag = (e) => {
    const d = drag.current
    if (!d.active) return
    d.active = false
    const delta = (e.clientX ?? d.lastX) - d.startX
    const momentum = d.v * 180 // project the fling a little further
    const steps = Math.round(-(delta + momentum) / (spacing || 1))
    if (steps) go(steps)
    animate(dragX, 0, { type: "spring", stiffness: 260, damping: 30 })
    setPaused(false)
  }

  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); go(-1) }
    else if (e.key === "ArrowRight") { e.preventDefault(); go(1) }
  }

  return (
    <section id="galeria" className="relative overflow-hidden py-24 sm:py-28">
      <LiquidMesh intensity={0.6} />

      <div className="relative mx-auto max-w-[1280px] px-6">
        <div className="max-w-2xl">
          <motion.p variants={fadeUp} {...inView} className="eyebrow">
            Pessoas
          </motion.p>
          <motion.h2
            variants={fadeUp}
            {...inView}
            className="mt-4 text-4xl leading-tight text-ink sm:text-5xl"
          >
            A ciência tem <span className="italic text-primary">rosto humano</span>.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            {...inView}
            className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft"
          >
            Por trás de cada dado clínico existem pessoas — pesquisando, cuidando,
            decidindo. É por elas, e para elas, que o PharmaCare existe.
          </motion.p>
        </div>
      </div>

      {reduce ? (
        <GaleriaEstatica />
      ) : (
        <>
          {/* 3D stage */}
          <div
            ref={stageRef}
            role="group"
            aria-roledescription="carrossel"
            aria-label="Galeria de pesquisa clínica"
            tabIndex={0}
            onKeyDown={onKeyDown}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            className="relative mt-14 w-full touch-pan-y outline-none"
            style={{ height: cardH * 1.16, perspective: 1400 }}
          >
            <motion.div
              className="absolute inset-0"
              style={{ x: dragX, transformStyle: "preserve-3d" }}
            >
              {stageW > 0 &&
                SLIDES.map((slide, i) => {
                  const offset = i - active
                  return (
                    <Slide
                      key={i}
                      slide={slide}
                      offset={offset}
                      spacing={spacing}
                      cardW={cardW}
                      cardH={cardH}
                      isActive={i === active}
                      inWindow={Math.abs(offset) <= 3}
                      onActivate={() => setActive(i)}
                    />
                  )
                })}
            </motion.div>
          </div>

          {/* Controls */}
          <div className="relative mx-auto mt-10 flex max-w-[1280px] items-center justify-center gap-6 px-6">
            <button
              type="button"
              onClick={() => go(-1)}
              disabled={active === 0}
              aria-label="Foto anterior"
              className="glass flex size-12 items-center justify-center rounded-full text-ink transition hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="size-5" />
            </button>

            <p className="eyebrow tabular-nums" aria-live="polite">
              {String(active + 1).padStart(2, "0")}
              <span className="text-outline"> / {String(n).padStart(2, "0")}</span>
            </p>

            <button
              type="button"
              onClick={() => go(1)}
              disabled={active === n - 1}
              aria-label="Próxima foto"
              className="glass flex size-12 items-center justify-center rounded-full text-ink transition hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </>
      )}
    </section>
  )
}
