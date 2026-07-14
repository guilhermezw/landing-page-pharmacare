import { Maximize2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { useLightbox } from "@/context/lightbox-context"

// Turns an existing image frame into a button that opens the gallery viewer,
// without reshaping the section's own framing. Renders the frame as children and
// overlays an "Ampliar" affordance that surfaces on hover/focus. Uses a named
// `group/zoom` so it never collides with the plain `group` the sections already
// use for their hover-scale effect.
export default function LightboxTrigger({ id, label, className, children }) {
  const { openAt } = useLightbox()
  return (
    <button
      type="button"
      onClick={() => openAt(id)}
      aria-label={`Ampliar: ${label}`}
      className={cn(
        "group/zoom relative block w-full cursor-zoom-in text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary",
        className
      )}
    >
      {children}
      <span
        aria-hidden
        className="pointer-events-none absolute right-3 top-3 z-20 flex items-center gap-1.5 rounded-full border border-white/70 bg-white/85 px-3 py-1.5 text-xs font-medium text-ink shadow-glass-soft backdrop-blur-md opacity-0 translate-y-1 transition-all duration-300 ease-liquid group-hover/zoom:opacity-100 group-hover/zoom:translate-y-0 group-focus-visible/zoom:opacity-100 group-focus-visible/zoom:translate-y-0 motion-reduce:transition-none"
      >
        <Maximize2 className="size-3.5" />
        Ampliar
      </span>
    </button>
  )
}
