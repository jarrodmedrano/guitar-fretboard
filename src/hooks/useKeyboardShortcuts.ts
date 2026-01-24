'use client'

import { useEffect } from 'react'

export interface KeyboardShortcutOptions {
  onPreviousPosition: () => void
  onNextPosition: () => void
  onToggleDisplayMode: () => void
  onToggleChordsMode: () => void
}

export function useKeyboardShortcuts({
  onPreviousPosition,
  onNextPosition,
  onToggleDisplayMode,
  onToggleChordsMode,
}: KeyboardShortcutOptions) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input/select
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement) {
        return
      }

      // Position navigation: [ and ]
      if (e.key === '[') {
        e.preventDefault()
        onPreviousPosition()
      }
      if (e.key === ']') {
        e.preventDefault()
        onNextPosition()
      }

      // Display mode toggle: D
      if (e.key === 'd' || e.key === 'D') {
        e.preventDefault()
        onToggleDisplayMode()
      }

      // Chords mode: C
      if (e.key === 'c' || e.key === 'C') {
        e.preventDefault()
        onToggleChordsMode()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onPreviousPosition, onNextPosition, onToggleDisplayMode, onToggleChordsMode])
}
