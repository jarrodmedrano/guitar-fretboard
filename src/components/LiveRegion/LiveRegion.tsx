'use client'

import { useEffect, useRef, useState } from 'react'

import { styles } from './LiveRegion.styles'

export interface LiveRegionProps {
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
        className={styles.srOnly}
      >
        {message}
      </div>

      {/* Visual toast notification */}
      {showToast && (
        <div
          className={styles.toast}
          aria-hidden="true"
        >
          {message}
        </div>
      )}
    </>
  )
}
