import { useEffect, useRef, useState } from "react"

/*
  Tracks whether an <img> has finished decoding so the frame can hold a
  skeleton and fade the image in on load. Handles the cached case, where the
  image is already complete before React attaches the onLoad handler.

  Usage:
    const { ref, loaded, onLoad } = useImageLoaded()
    <img ref={ref} onLoad={onLoad} ... />
*/
export function useImageLoaded() {
  const ref = useRef(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // Image served from cache can be complete before onLoad fires.
    if (ref.current?.complete) setLoaded(true)
  }, [])

  return { ref, loaded, onLoad: () => setLoaded(true) }
}

export default useImageLoaded
