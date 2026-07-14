import { createContext, useContext } from "react"

// Context + hook live apart from the provider component so the provider file
// only exports a component (keeps React Fast Refresh happy).
export const LightboxContext = createContext(null)

export function useLightbox() {
  const ctx = useContext(LightboxContext)
  if (!ctx) throw new Error("useLightbox must be used within a LightboxProvider")
  return ctx
}
