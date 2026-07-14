import { useCallback, useMemo, useState } from "react"

import { SCREENS, screenIndex } from "@/lib/screens"
import { LightboxContext } from "@/context/lightbox-context"
import Lightbox from "@/components/Lightbox"

// Holds the gallery viewer state once for the whole page. Any section opens the
// viewer with `openAt(id)`; a single <Lightbox> is mounted at the app root so
// there is never more than one overlay and the gallery order stays stable.
export function LightboxProvider({ children }) {
  const [index, setIndex] = useState(-1)

  const openAt = useCallback((id) => {
    const i = screenIndex(id)
    if (i !== -1) setIndex(i)
  }, [])

  const close = useCallback(() => setIndex(-1), [])
  const go = useCallback(
    (delta) => setIndex((i) => (i + delta + SCREENS.length) % SCREENS.length),
    []
  )

  const value = useMemo(() => ({ openAt }), [openAt])

  return (
    <LightboxContext.Provider value={value}>
      {children}
      <Lightbox
        screens={SCREENS}
        index={index}
        open={index !== -1}
        onClose={close}
        onNavigate={go}
      />
    </LightboxContext.Provider>
  )
}
