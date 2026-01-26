'use client'

import { Note, NOTES, getIntervalName } from '@/lib/music-theory'
import { cn } from '@/lib/utils'
import { styles } from './NoteMarker.styles'

type DisplayMode = 'notes' | 'intervals' | 'degrees'

export interface NoteMarkerProps {
  note: Note
  isRoot: boolean
  inScale: boolean
  interval: number
  degree: number
  displayMode: DisplayMode
  isNut?: boolean
  onClick?: () => void
  isSelected?: boolean
  fingerNumber?: number | null // For chord mode: which finger to use
  isMuted?: boolean // For chord mode: whether string is muted
  showFingerings?: boolean // Show finger numbers or note labels
}

export function NoteMarker({
  note,
  isRoot,
  inScale,
  interval,
  degree,
  displayMode,
  isNut = false,
  onClick,
  isSelected,
  fingerNumber,
  isMuted = false,
  showFingerings = true,
}: NoteMarkerProps) {
  // Handle muted strings - only show X at the nut
  if (isMuted && isNut) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.mutedMarker}>X</div>
      </div>
    )
  }

  // For muted strings beyond the nut, show nothing
  if (isMuted) {
    return <div className={styles.wrapper} />
  }

  if (!inScale) {
    return (
      <div className={styles.wrapper}>
        {isNut ? (
          <div
            className={styles.emptyNutDot}
            onClick={onClick}
            title={note}
          />
        ) : null}
      </div>
    )
  }

  const getBackgroundColor = () => {
    // If showing finger numbers in chord mode, use neutral colors
    if (fingerNumber !== undefined && showFingerings) {
      if (isRoot) return styles.bgColor.fingerRoot
      return styles.bgColor.fingerOther
    }

    // Normal color coding for scale notes (used when not showing fingerings)
    if (isRoot) return styles.bgColor.root
    if (interval === 4 || interval === 3) return styles.bgColor.third // 3rd
    if (interval === 7) return styles.bgColor.fifth // 5th
    if (interval === 10 || interval === 11) return styles.bgColor.seventh // 7th
    if (interval === 6) return styles.bgColor.blueNote // blue note
    return styles.bgColor.default
  }

  const getDisplayText = () => {
    // If we're in chord mode with fingerNumber defined
    if (fingerNumber !== undefined) {
      // Show finger numbers if showFingerings is true
      if (showFingerings) {
        if (fingerNumber !== null) {
          return fingerNumber.toString()
        }
        // Open string in chord mode
        if (fingerNumber === null && isNut) {
          return 'O'
        }
      }
      // Otherwise use the displayMode (notes/intervals/degrees)
    }

    // Use displayMode for non-chord mode OR chord mode with fingerings off
    switch (displayMode) {
      case 'intervals':
        return getIntervalName(NOTES[0] as Note, NOTES[interval] as Note) || 'R'
      case 'degrees':
        return degree > 0 ? degree.toString() : ''
      default:
        return note
    }
  }

  const intervalName = getIntervalName(NOTES[0] as Note, NOTES[interval] as Note)

  return (
    <div className={styles.wrapper}>
      <button
        onClick={onClick}
        className={cn(
          styles.noteButton({ isRoot, isSelected: isSelected ?? false }),
          getBackgroundColor()
        )}
        aria-label={`${note} - ${intervalName}`}
        aria-pressed={isSelected}
      >
        {getDisplayText()}
      </button>
    </div>
  )
}
