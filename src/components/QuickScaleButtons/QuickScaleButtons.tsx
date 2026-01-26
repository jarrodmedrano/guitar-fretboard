'use client'

import { useCallback } from 'react'
import { Note } from '@/lib/music-theory'
import { styles } from './QuickScaleButtons.styles'

// Define the quick scale presets
const QUICK_SCALES = [
  { scale: 'minorPentatonic', root: 'A' as Note, title: 'A Minor Pentatonic', description: 'The essential blues/rock scale', color: 'red' as const },
  { scale: 'blues', root: 'E' as Note, title: 'E Blues Scale', description: 'Classic blues with the b5', color: 'red' as const },
  { scale: 'major', root: 'C' as Note, title: 'C Major Scale', description: 'The foundation of music theory', color: 'red' as const },
  { scale: 'dorian', root: 'D' as Note, title: 'D Dorian Mode', description: 'Jazz and funk favorite', color: 'red' as const },
  { scale: 'pentatonicForms', root: 'A' as Note, title: 'Minor Pent. Forms', description: 'Fret Science (minor)', color: 'emerald' as const },
  { scale: 'pentatonicFormsMajor', root: 'C' as Note, title: 'Major Pent. Forms', description: 'Fret Science (major)', color: 'emerald' as const },
] as const

export interface QuickScaleButtonsProps {
  onScaleChange: (scale: string) => void
  onRootChange: (root: Note) => void
}

export function QuickScaleButtons({ onScaleChange, onRootChange }: QuickScaleButtonsProps) {
  const handleSelect = useCallback((scale: string, root: Note) => {
    onScaleChange(scale)
    onRootChange(root)
  }, [onScaleChange, onRootChange])

  return (
    <section aria-label="Quick scale reference">
      <div className={styles.container}>
        <h3 className={styles.heading}>Quick Scale Reference</h3>
        <div className={styles.grid}>
          {QUICK_SCALES.map((preset) => (
            <button
              key={`${preset.scale}-${preset.root}`}
              onClick={() => handleSelect(preset.scale, preset.root)}
              className={styles.button}
            >
              <span className={styles.buttonTitle(preset.color)}>
                {preset.title}
              </span>
              <p className={styles.buttonDescription}>{preset.description}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
