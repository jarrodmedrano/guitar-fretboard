'use client'

import { useCallback } from 'react'
import { SCALE_POSITIONS, getRootFret, Note, TUNINGS } from '@/lib/music-theory'
import {
  containerStyles,
  headerRowStyles,
  labelStyles,
  infoSectionStyles,
  formNameStyles,
  fretRangeStyles,
  buttonGroupStyles,
  getAllButtonStyles,
  getPositionButtonStyles,
  navButtonGroupStyles,
  navButtonStyles,
  navIconStyles,
} from './PositionSelector.styles'

export interface PositionSelectorProps {
  scale: string
  rootNote: Note
  tuning: string
  position: number | null // null means "All"
  onPositionChange: (position: number | null) => void
}

export default function PositionSelector({
  scale,
  rootNote,
  tuning,
  position,
  onPositionChange,
}: PositionSelectorProps) {
  const positions = SCALE_POSITIONS[scale] || SCALE_POSITIONS.minorPentatonic
  const tuningNotes = TUNINGS[tuning] || TUNINGS.standard
  const rootFret = getRootFret(rootNote, tuningNotes)

  // Calculate actual fret range for current position
  const getCurrentRange = () => {
    if (position === null) return null
    const pos = positions[position]
    if (!pos) return null
    return {
      start: rootFret + pos.start,
      end: rootFret + pos.end,
    }
  }

  const range = getCurrentRange()
  const currentPos = position !== null ? positions[position] : null
  const hasFormNames = positions.some(p => p.name)

  const handlePrevPosition = useCallback(() => {
    if (position === null) {
      onPositionChange(0)
    } else if (position > 0) {
      onPositionChange(position - 1)
    } else {
      onPositionChange(positions.length - 1) // Wrap to last
    }
  }, [position, positions.length, onPositionChange])

  const handleNextPosition = useCallback(() => {
    if (position === null) {
      onPositionChange(0)
    } else if (position < positions.length - 1) {
      onPositionChange(position + 1)
    } else {
      onPositionChange(0) // Wrap to first
    }
  }, [position, positions.length, onPositionChange])

  return (
    <div className={containerStyles}>
      {/* Position label and info */}
      <div className={headerRowStyles}>
        <label className={labelStyles}>
          {hasFormNames ? 'Form' : 'Position'}
        </label>
        <div className={infoSectionStyles}>
          {currentPos?.name && (
            <span className={formNameStyles}>{currentPos.name}</span>
          )}
          {range && (
            <span className={fretRangeStyles}>
              Frets {range.start === 0 ? 'Open' : range.start}-{range.end}
            </span>
          )}
        </div>
      </div>

      {/* Position buttons */}
      <div className={buttonGroupStyles} role="group" aria-label="Position selector">
        {/* All positions button */}
        <button
          onClick={() => onPositionChange(null)}
          className={getAllButtonStyles(position === null)}
          aria-label="Show all positions across fretboard"
          aria-pressed={position === null}
        >
          All
        </button>

        {/* Individual position buttons */}
        {positions.map((pos, index) => {
          const positionRange = {
            start: rootFret + pos.start,
            end: rootFret + pos.end,
          }
          const isLast = index === positions.length - 1
          return (
            <button
              key={index}
              onClick={() => onPositionChange(index)}
              className={getPositionButtonStyles(position === index, isLast)}
              aria-label={`Position ${index + 1}, Frets ${Math.max(0, positionRange.start)}-${positionRange.end}${pos.name ? ` - ${pos.name}` : ''}`}
              aria-current={position === index ? 'true' : undefined}
            >
              {index + 1}
            </button>
          )
        })}
      </div>

      {/* Previous/Next navigation for easier stepping */}
      <div className={navButtonGroupStyles}>
        <button
          onClick={handlePrevPosition}
          className={navButtonStyles}
          aria-label="Previous position"
        >
          <svg className={navIconStyles} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Prev
        </button>
        <button
          onClick={handleNextPosition}
          className={navButtonStyles}
          aria-label="Next position"
        >
          Next
          <svg className={navIconStyles} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}
