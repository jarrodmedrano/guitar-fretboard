'use client'

import { useEffect, useRef, useState } from 'react'

interface LiveRegionProps {
  message: string
}

export function LiveRegion({ message }: LiveRegionProps) {
  const [showToast, setShowToast] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!message) return

    // Show toast when message changes
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Required for timeout-based toast visibility
    setShowToast(true)

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Hide toast after 2500ms
    timeoutRef.current = setTimeout(() => {
      setShowToast(false)
    }, 2500)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [message])

  return (
    <>
      {/* Screen reader announcement */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {message}
      </div>

      {/* Visual toast notification */}
      {showToast && (
        <div
          className="fixed bottom-4 right-4 bg-zinc-800 border border-zinc-700 text-zinc-100 rounded-lg shadow-lg px-4 py-3 animate-slide-up"
          aria-hidden="true"
        >
          {message}
        </div>
      )}
    </>
  )
}
