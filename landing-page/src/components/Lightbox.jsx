import { useCallback, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react"

import { cn } from "@/lib/utils"
import { EASE } from "@/lib/motion"
import { useImageLoaded } from "@/hooks/useImageLoaded"

const MAX_SCALE = 4
const MIN_SCALE = 1
const ZOOM_STEP = 2.5 // double-tap / double-click target
const SWIPE = 60 // px threshold for swipe-to-navigate / swipe-down-to-close
const TAP_SLOP = 8 // px of movement still counted as a tap
const DOUBLE_TAP_MS = 300

const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi)
const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y)
const mid = (a, b) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 })
const IDENTITY = { scale: 1, x: 0, y: 0 }

// The zoomable image + zoom controls for a single screen. Keyed by screen id in
// the parent, so navigating to another screen remounts it and resets zoom/pan
// with no effect or ref juggling. Pointer events give mouse, touch and pen one
// shared code path.
function ZoomableStage({ screen, reduce, onClose, onNavigate }) {
  const stageRef = useRef(null)
  const imgRef = useRef(null)
  const { ref: loadRef, loaded, onLoad } = useImageLoaded()

  const [t, setT] = useState(IDENTITY)
  const [gesturing, setGesturing] = useState(false)

  const pointers = useRef(new Map())
  const pan = useRef(null)
  const pinch = useRef(null)
  const swipe = useRef(null)
  const lastTap = useRef({ time: 0, x: 0, y: 0 })

  const setImg = useCallback(
    (node) => {
      imgRef.current = node
      loadRef.current = node
    },
    [loadRef]
  )

  // Keep pan within the image bounds. With object-contain the displayed picture
  // is letterboxed inside the box, so derive its real size from the natural
  // ratio rather than the (possibly wider) box. Layout size ignores transform.
  const clampPan = useCallback((x, y, scale) => {
    const img = imgRef.current
    const stage = stageRef.current
    if (!img || !stage) return { x, y }
    const ratio = img.naturalWidth / img.naturalHeight || 1
    const boxW = img.clientWidth
    const boxH = img.clientHeight
    let dispW = boxW
    let dispH = boxW / ratio
    if (dispH > boxH) {
      dispH = boxH
      dispW = boxH * ratio
    }
    const maxX = Math.max(0, (dispW * scale - stage.clientWidth) / 2)
    const maxY = Math.max(0, (dispH * scale - stage.clientHeight) / 2)
    return { x: clamp(x, -maxX, maxX), y: clamp(y, -maxY, maxY) }
  }, [])

  // Zoom toward a screen point (transform origin is the stage centre).
  const zoomToward = useCallback(
    (nextScale, clientX, clientY) => {
      const stage = stageRef.current
      if (!stage) return
      setT((prev) => {
        const s2 = clamp(nextScale, MIN_SCALE, MAX_SCALE)
        if (s2 === MIN_SCALE) return IDENTITY
        const rect = stage.getBoundingClientRect()
        const mx = clientX - (rect.left + rect.width / 2)
        const my = clientY - (rect.top + rect.height / 2)
        const nx = mx - (mx - prev.x) * (s2 / prev.scale)
        const ny = my - (my - prev.y) * (s2 / prev.scale)
        return { scale: s2, ...clampPan(nx, ny, s2) }
      })
    },
    [clampPan]
  )

  const stepZoom = useCallback(
    (delta) =>
      setT((p) => {
        const s = clamp(p.scale + delta, MIN_SCALE, MAX_SCALE)
        if (s === MIN_SCALE) return IDENTITY
        return { ...p, scale: s, ...clampPan(p.x, p.y, s) }
      }),
    [clampPan]
  )

  // Native, non-passive wheel handler so the page zoom can be prevented.
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const onWheel = (e) => {
      e.preventDefault()
      zoomToward(t.scale * Math.exp(-e.deltaY * 0.0015), e.clientX, e.clientY)
    }
    stage.addEventListener("wheel", onWheel, { passive: false })
    return () => stage.removeEventListener("wheel", onWheel)
  }, [zoomToward, t.scale])

  // Zoom keys (+ / - / 0). Dialog-level keys (Esc, arrows, Tab) live in parent.
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "+" || e.key === "=") stepZoom(0.5)
      else if (e.key === "-") stepZoom(-0.5)
      else if (e.key === "0") setT(IDENTITY)
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [stepZoom])

  const onPointerDown = (e) => {
    e.currentTarget.setPointerCapture?.(e.pointerId)
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    setGesturing(true)

    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()]
      pinch.current = { startDist: dist(a, b), startScale: t.scale, startMid: mid(a, b), origX: t.x, origY: t.y }
      pan.current = swipe.current = null
    } else if (t.scale > MIN_SCALE) {
      pan.current = { startX: e.clientX, startY: e.clientY, origX: t.x, origY: t.y }
    } else {
      swipe.current = { startX: e.clientX, startY: e.clientY, moved: false }
    }
  }

  const onPointerMove = (e) => {
    if (!pointers.current.has(e.pointerId)) return
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })

    if (pinch.current && pointers.current.size >= 2) {
      const [a, b] = [...pointers.current.values()]
      const { startDist, startScale, startMid, origX, origY } = pinch.current
      const s2 = clamp((startScale * dist(a, b)) / startDist, MIN_SCALE, MAX_SCALE)
      const rect = stageRef.current.getBoundingClientRect()
      const mx = startMid.x - (rect.left + rect.width / 2)
      const my = startMid.y - (rect.top + rect.height / 2)
      const nx = mx - (mx - origX) * (s2 / startScale)
      const ny = my - (my - origY) * (s2 / startScale)
      setT({ scale: s2, ...clampPan(nx, ny, s2) })
      return
    }

    if (pan.current) {
      const { startX, startY, origX, origY } = pan.current
      setT((prev) => ({ ...prev, ...clampPan(origX + (e.clientX - startX), origY + (e.clientY - startY), prev.scale) }))
      return
    }

    if (swipe.current) {
      const dx = e.clientX - swipe.current.startX
      const dy = e.clientY - swipe.current.startY
      if (Math.hypot(dx, dy) > TAP_SLOP) swipe.current.moved = true
    }
  }

  const endPointer = (e) => {
    const wasSwipe = swipe.current
    pointers.current.delete(e.pointerId)
    if (pointers.current.size < 2) pinch.current = null
    if (pointers.current.size === 0) {
      pan.current = null
      swipe.current = null
      setGesturing(false)
    }

    if (!wasSwipe) return
    const dx = e.clientX - wasSwipe.startX
    const dy = e.clientY - wasSwipe.startY

    if (!wasSwipe.moved) {
      // Double-tap toggles zoom.
      const now = Date.now()
      const isDouble =
        now - lastTap.current.time < DOUBLE_TAP_MS &&
        Math.hypot(e.clientX - lastTap.current.x, e.clientY - lastTap.current.y) < 24
      if (isDouble) {
        zoomToward(t.scale > MIN_SCALE ? MIN_SCALE : ZOOM_STEP, e.clientX, e.clientY)
        lastTap.current = { time: 0, x: 0, y: 0 }
      } else {
        lastTap.current = { time: now, x: e.clientX, y: e.clientY }
      }
      return
    }

    // Swipe only matters while not zoomed: horizontal navigates, down closes.
    if (t.scale === MIN_SCALE) {
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > SWIPE) onNavigate(dx < 0 ? 1 : -1)
      else if (dy > SWIPE) onClose()
    }
  }

  const zoomed = t.scale > MIN_SCALE
  // Own the transform ourselves (Framer Motion would otherwise clobber it via
  // its animated `transform`). Skip the transform transition mid-gesture so pan
  // tracks the pointer 1:1; keep a soft opacity fade on load.
  const transformPart = gesturing ? "" : `transform 0.25s cubic-bezier(${EASE.join(",")}), `
  const transition = reduce ? undefined : `${transformPart}opacity 0.3s ease`

  return (
    <>
      <div
        ref={stageRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endPointer}
        onPointerCancel={endPointer}
        className={cn(
          "relative flex flex-1 items-center justify-center overflow-hidden p-3 select-none [touch-action:none] sm:p-6",
          zoomed ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"
        )}
      >
        {!loaded && <div aria-hidden className="absolute size-32 animate-pulse rounded-2xl bg-white/10" />}
        {/* object-contain guarantees the image keeps its aspect ratio even when
            flexbox clamps the box on both axes — no stretching, ever. */}
        <img
          ref={setImg}
          onLoad={onLoad}
          src={screen.src}
          alt={screen.alt}
          width={screen.width}
          height={screen.height}
          draggable={false}
          style={{
            transform: `translate3d(${t.x}px, ${t.y}px, 0) scale(${t.scale})`,
            transition,
            opacity: loaded ? 1 : 0,
          }}
          className="max-h-full max-w-full object-contain drop-shadow-[0_20px_60px_rgba(17,17,255,0.18)]"
        />
      </div>

      {/* Footer: caption + zoom controls */}
      <div className="relative flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <p className="max-w-[55%] truncate text-sm text-inverse-ink/80">{screen.alt}</p>
        <div className="glass flex items-center gap-1 rounded-full p-1">
          <button
            type="button"
            onClick={() => stepZoom(-0.5)}
            disabled={!zoomed}
            aria-label="Diminuir zoom"
            className="flex size-9 items-center justify-center rounded-full text-ink transition-colors duration-200 hover:bg-white/70 disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <ZoomOut className="size-4" />
          </button>
          <span className="min-w-11 text-center text-xs font-medium text-ink tabular-nums">{Math.round(t.scale * 100)}%</span>
          <button
            type="button"
            onClick={() => stepZoom(0.5)}
            disabled={t.scale >= MAX_SCALE}
            aria-label="Aumentar zoom"
            className="flex size-9 items-center justify-center rounded-full text-ink transition-colors duration-200 hover:bg-white/70 disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <ZoomIn className="size-4" />
          </button>
        </div>
      </div>
    </>
  )
}

// Full-screen gallery viewer. Owns the dialog chrome, scrim, navigation and the
// accessibility contract (mirrors the mobile sheet in Navbar.jsx); the keyed
// ZoomableStage owns per-screen zoom/pan.
export default function Lightbox({ screens, index, open, onClose, onNavigate }) {
  const reduce = useReducedMotion()
  const dialogRef = useRef(null)
  const screen = screens[index] ?? screens[0]

  // Scroll-lock, ESC / arrows / Tab focus-trap, focus restore.
  useEffect(() => {
    if (!open) return
    const previouslyFocused = document.activeElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const focusables = () =>
      dialogRef.current ? Array.from(dialogRef.current.querySelectorAll("button:not([disabled])")) : []

    focusables()[0]?.focus()

    const onKeyDown = (e) => {
      if (e.key === "Escape") return onClose()
      if (e.key === "ArrowRight") return onNavigate(1)
      if (e.key === "ArrowLeft") return onNavigate(-1)
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
  }, [open, onClose, onNavigate])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Visualizador de telas — ${screen.alt}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.25, ease: EASE }}
          className="fixed inset-0 z-[70] flex flex-col bg-ink/85 backdrop-blur-md"
        >
          {/* Backdrop — click/tap outside the image closes. */}
          <button type="button" aria-label="Fechar visualizador" onClick={onClose} className="absolute inset-0 -z-10 cursor-zoom-out" />

          {/* Top bar: counter + close */}
          <div className="relative flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
            <span className="glass rounded-full px-3.5 py-1.5 text-sm font-medium text-ink tabular-nums">
              {index + 1} / {screens.length}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar visualizador"
              className="glass flex size-11 items-center justify-center rounded-full text-ink transition-colors duration-200 hover:bg-white/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <X className="size-5" />
            </button>
          </div>

          <ZoomableStage key={screen.id} screen={screen} reduce={reduce} onClose={onClose} onNavigate={onNavigate} />

          {/* Prev / next — big tap targets, centred over the stage */}
          <button
            type="button"
            onClick={() => onNavigate(-1)}
            aria-label="Tela anterior"
            className="glass absolute left-3 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full text-ink transition-colors duration-200 hover:bg-white/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:left-5"
          >
            <ChevronLeft className="size-6" />
          </button>
          <button
            type="button"
            onClick={() => onNavigate(1)}
            aria-label="Próxima tela"
            className="glass absolute right-3 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full text-ink transition-colors duration-200 hover:bg-white/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:right-5"
          >
            <ChevronRight className="size-6" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
