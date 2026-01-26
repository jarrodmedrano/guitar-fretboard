'use client'

import { FRET_MARKERS, DOUBLE_MARKERS } from '@/lib/music-theory'
import { styles } from './FretMarker.styles'

export interface FretMarkerProps {
  fret: number
}

export function FretMarker({ fret }: FretMarkerProps) {
  const isDouble = DOUBLE_MARKERS.includes(fret)
  const hasMarker = FRET_MARKERS.includes(fret)

  if (!hasMarker) return null

  return (
    <div className={styles.wrapper} aria-hidden="true">
      {isDouble ? (
        <div className={styles.dotsContainer}>
          <div className={styles.dot} />
          <div className={styles.dot} />
        </div>
      ) : (
        <div className={styles.dot} />
      )}
    </div>
  )
}
