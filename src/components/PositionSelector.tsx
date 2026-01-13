'use client'

import { SCALE_POSITIONS, getRootFret, Note } from '@/lib/music-theory'

interface PositionSelectorProps {
  scale: string
  rootNote: Note
  position: number | null // null means "All"
  onPositionChange: (position: number | null) => void
}

export default function PositionSelector({
  scale,
  rootNote,
  position,
  onPositionChange,
}: PositionSelectorProps) {
  const positions = SCALE_POSITIONS[scale] || SCALE_POSITIONS.minorPentatonic
  const rootFret = getRootFret(rootNote)

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

  return (
    <div className="flex flex-col gap-3">
      {/* Position label and fret range indicator */}
      <div className="flex items-center justify-between">
        <label className="text-xs text-zinc-500 uppercase tracking-wide">Position</label>
        {range && (
          <span className="text-xs text-zinc-400">
            Frets {range.start === 0 ? 'Open' : range.start}-{range.end}
          </span>
        )}
      </div>

      {/* Position buttons */}
      <div className="flex items-center gap-1">
        {/* All positions button */}
        <button
          onClick={() => onPositionChange(null)}
          className={`
            px-3 py-2 rounded-l-lg text-sm font-medium transition-all
            ${position === null
              ? 'bg-emerald-500 text-white shadow-lg'
              : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
            }
          `}
        >
          All
        </button>

        {/* Individual position buttons */}
        {positions.map((_, index) => (
          <button
            key={index}
            onClick={() => onPositionChange(index)}
            className={`
              px-3 py-2 text-sm font-medium transition-all
              ${index === positions.length - 1 ? 'rounded-r-lg' : ''}
              ${position === index
                ? 'bg-emerald-500 text-white shadow-lg'
                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              }
            `}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Previous/Next navigation for easier stepping */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            if (position === null) {
              onPositionChange(0)
            } else if (position > 0) {
              onPositionChange(position - 1)
            } else {
              onPositionChange(positions.length - 1) // Wrap to last
            }
          }}
          className="flex-1 px-3 py-1.5 rounded-md text-sm font-medium transition-all
                     bg-zinc-800 text-zinc-300 hover:bg-zinc-700 flex items-center justify-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Prev
        </button>
        <button
          onClick={() => {
            if (position === null) {
              onPositionChange(0)
            } else if (position < positions.length - 1) {
              onPositionChange(position + 1)
            } else {
              onPositionChange(0) // Wrap to first
            }
          }}
          className="flex-1 px-3 py-1.5 rounded-md text-sm font-medium transition-all
                     bg-zinc-800 text-zinc-300 hover:bg-zinc-700 flex items-center justify-center gap-1"
        >
          Next
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}
