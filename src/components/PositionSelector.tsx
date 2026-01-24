'use client'

import { useCallback } from 'react'
import { SCALE_POSITIONS, getRootFret, Note, TUNINGS } from '@/lib/music-theory'

interface PositionSelectorProps {
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
    <div className="flex flex-col gap-2.5 md:gap-3">
      {/* Position label and info */}
      <div className="flex items-center justify-between gap-4">
        <label className="text-xs text-zinc-400 uppercase tracking-wide">
          {hasFormNames ? 'Form' : 'Position'}
        </label>
        <div className="flex items-center gap-2 text-xs">
          {currentPos?.name && (
            <span className="text-emerald-400 font-medium">{currentPos.name}</span>
          )}
          {range && (
            <span className="text-zinc-400">
              Frets {range.start === 0 ? 'Open' : range.start}-{range.end}
            </span>
          )}
        </div>
      </div>

      {/* Position buttons */}
      <div className="flex items-center gap-1.5 md:gap-1 flex-wrap" role="group" aria-label="Position selector">
        {/* All positions button */}
        <button
          onClick={() => onPositionChange(null)}
          className={`
            px-4 py-3 md:px-3 md:py-2 rounded-l-lg text-sm font-medium transition-all
            ${position === null
              ? 'bg-emerald-500 text-white shadow-lg'
              : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
            }
          `}
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
          return (
            <button
              key={index}
              onClick={() => onPositionChange(index)}
              className={`
                px-4 py-3 md:px-3 md:py-2 text-sm font-medium transition-all
                ${index === positions.length - 1 ? 'rounded-r-lg' : ''}
                ${position === index
                  ? 'bg-emerald-500 text-white shadow-lg'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                }
              `}
              aria-label={`Position ${index + 1}, Frets ${Math.max(0, positionRange.start)}-${positionRange.end}${pos.name ? ` - ${pos.name}` : ''}`}
              aria-current={position === index ? 'true' : undefined}
            >
              {index + 1}
            </button>
          )
        })}
      </div>

      {/* Previous/Next navigation for easier stepping */}
      <div className="flex items-center gap-2">
        <button
          onClick={handlePrevPosition}
          className="flex-1 px-4 py-3 md:px-3 md:py-1.5 rounded-md text-sm font-medium transition-all
                     bg-zinc-800 text-zinc-300 hover:bg-zinc-700 flex items-center justify-center gap-1"
          aria-label="Previous position"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Prev
        </button>
        <button
          onClick={handleNextPosition}
          className="flex-1 px-4 py-3 md:px-3 md:py-1.5 rounded-md text-sm font-medium transition-all
                     bg-zinc-800 text-zinc-300 hover:bg-zinc-700 flex items-center justify-center gap-1"
          aria-label="Next position"
        >
          Next
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}
