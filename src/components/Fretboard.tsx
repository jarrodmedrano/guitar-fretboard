'use client'

import { useState, useCallback } from 'react'
import {
  Note,
  NOTES,
  STANDARD_TUNING,
  SCALES,
  SCALE_POSITIONS,
  FRET_MARKERS,
  DOUBLE_MARKERS,
  getNoteAtFret,
  isNoteInScale,
  getInterval,
  getScaleDegree,
  getIntervalName,
  getRootFret,
} from '@/lib/music-theory'

type DisplayMode = 'notes' | 'intervals' | 'degrees'

interface FretboardProps {
  rootNote: Note
  scale: string
  tuning?: Note[]
  frets?: number
  displayMode?: DisplayMode
  showOnlyChordTones?: boolean
  position?: number | null // null means show all positions
  onNoteClick?: (note: Note, string: number, fret: number) => void
}

interface NoteMarkerProps {
  note: Note
  isRoot: boolean
  inScale: boolean
  interval: number
  degree: number
  displayMode: DisplayMode
  isNut?: boolean
  onClick?: () => void
  isSelected?: boolean
}

function NoteMarker({
  note,
  isRoot,
  inScale,
  interval,
  degree,
  displayMode,
  isNut = false,
  onClick,
  isSelected,
}: NoteMarkerProps) {
  if (!inScale) {
    return (
      <div className="h-8 w-8 flex items-center justify-center relative z-10">
        {isNut ? (
          <div
            className="h-2 w-2 rounded-full bg-zinc-700/30 hover:bg-zinc-600/50 cursor-pointer transition-colors"
            onClick={onClick}
            title={note}
          />
        ) : null}
      </div>
    )
  }

  const getBackgroundColor = () => {
    if (isRoot) return 'bg-red-500 hover:bg-red-400'
    if (interval === 4 || interval === 3) return 'bg-green-500 hover:bg-green-400' // 3rd
    if (interval === 7) return 'bg-blue-500 hover:bg-blue-400' // 5th
    if (interval === 10 || interval === 11) return 'bg-purple-500 hover:bg-purple-400' // 7th
    if (interval === 6) return 'bg-cyan-500 hover:bg-cyan-400' // blue note
    return 'bg-zinc-500 hover:bg-zinc-400'
  }

  const getDisplayText = () => {
    switch (displayMode) {
      case 'intervals':
        return getIntervalName(NOTES[0] as Note, NOTES[interval] as Note) || 'R'
      case 'degrees':
        return degree > 0 ? degree.toString() : ''
      default:
        return note
    }
  }

  return (
    <div className="h-8 w-8 flex items-center justify-center relative z-10">
      <button
        onClick={onClick}
        className={`
          h-7 w-7 rounded-full flex items-center justify-center
          text-xs font-bold text-white shadow-md
          transition-all duration-150 cursor-pointer
          ${getBackgroundColor()}
          ${isSelected ? 'ring-2 ring-white ring-offset-2 ring-offset-zinc-900' : ''}
          ${isRoot ? 'scale-110' : ''}
        `}
        title={`${note} - ${getIntervalName(NOTES[0] as Note, NOTES[interval] as Note)}`}
      >
        {getDisplayText()}
      </button>
    </div>
  )
}

function FretMarker({ fret }: { fret: number }) {
  const isDouble = DOUBLE_MARKERS.includes(fret)
  const hasMarker = FRET_MARKERS.includes(fret)

  if (!hasMarker) return null

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {isDouble ? (
        <div className="flex gap-4">
          <div className="h-3 w-3 rounded-full bg-amber-200/20" />
          <div className="h-3 w-3 rounded-full bg-amber-200/20" />
        </div>
      ) : (
        <div className="h-3 w-3 rounded-full bg-amber-200/20" />
      )}
    </div>
  )
}

// Chord tones: root (0), minor 3rd (3), major 3rd (4), perfect 5th (7)
const CHORD_TONE_INTERVALS = [0, 3, 4, 7]

export default function Fretboard({
  rootNote,
  scale,
  tuning = STANDARD_TUNING,
  frets = 24,
  displayMode = 'notes',
  showOnlyChordTones = false,
  position = null,
  onNoteClick,
}: FretboardProps) {
  const [selectedNotes, setSelectedNotes] = useState<Set<string>>(new Set())
  const scaleFormula = SCALES[scale] || SCALES.major
  const positions = SCALE_POSITIONS[scale] || SCALE_POSITIONS.minorPentatonic
  const rootFret = getRootFret(rootNote)

  // Check if a fret is within the current position
  const isInPosition = useCallback((fret: number): boolean => {
    if (position === null) return true // Show all
    const pos = positions[position]
    if (!pos) return true

    // Calculate the actual fret range based on root note position
    const startFret = rootFret + pos.start
    const endFret = rootFret + pos.end

    // Handle wrapping at fret 12 (octave)
    if (fret >= startFret && fret <= endFret) return true
    // Also check if the position wraps around (for positions near fret 12)
    if (startFret + 12 <= frets && fret >= startFret + 12 && fret <= endFret + 12) return true

    return false
  }, [position, positions, rootFret, frets])

  const handleNoteClick = useCallback((note: Note, stringIndex: number, fret: number) => {
    const key = `${stringIndex}-${fret}`
    setSelectedNotes(prev => {
      const next = new Set(prev)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
    onNoteClick?.(note, stringIndex, fret)
  }, [onNoteClick])

  // Reverse tuning for display (high E at top)
  const displayTuning = [...tuning].reverse()

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[800px] p-4">
        {/* Fretboard container */}
        <div className="relative rounded-lg overflow-hidden" style={{
          background: 'linear-gradient(to bottom, #78350f, #451a03)',
        }}>
          {/* String labels */}
          <div className="absolute left-0 top-0 bottom-0 w-10 flex flex-col justify-around py-2 bg-zinc-900/50 z-10">
            {displayTuning.map((note, i) => (
              <div key={i} className="h-8 flex items-center justify-center text-xs font-mono text-zinc-400">
                {6 - i}
              </div>
            ))}
          </div>

          {/* Main fretboard area */}
          <div className="flex ml-10">
            {/* Nut (open strings) */}
            <div className="flex flex-col justify-around py-2 px-1 bg-zinc-200 border-r-4 border-zinc-400">
              {displayTuning.map((openNote, stringIndex) => {
                const actualStringIndex = tuning.length - 1 - stringIndex
                const note = openNote
                const inScale = isNoteInScale(note, rootNote, scaleFormula)
                const interval = getInterval(rootNote, note)
                const degree = getScaleDegree(note, rootNote, scaleFormula)
                const isRoot = note === rootNote
                const key = `${actualStringIndex}-0`
                const isChordTone = CHORD_TONE_INTERVALS.includes(interval)
                const inPosition = isInPosition(0)
                const shouldShow = (!showOnlyChordTones || isChordTone) && inPosition

                return (
                  <NoteMarker
                    key={stringIndex}
                    note={note}
                    isRoot={isRoot}
                    inScale={shouldShow && inScale}
                    interval={interval}
                    degree={degree}
                    displayMode={displayMode}
                    isNut={true}
                    onClick={() => handleNoteClick(note, actualStringIndex, 0)}
                    isSelected={selectedNotes.has(key)}
                  />
                )
              })}
            </div>

            {/* Frets */}
            {Array.from({ length: frets }, (_, fretIndex) => {
              const fret = fretIndex + 1
              return (
                <div
                  key={fret}
                  className="relative flex flex-col justify-around py-2 border-r-2 border-zinc-400/60"
                  style={{
                    minWidth: `${Math.max(36, 55 - fretIndex * 0.8)}px`,
                  }}
                >
                  {/* Fret number */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-zinc-500 font-mono">
                    {fret}
                  </div>

                  {/* Fret marker dots */}
                  <FretMarker fret={fret} />

                  {/* Strings with notes */}
                  {displayTuning.map((openNote, stringIndex) => {
                    const actualStringIndex = tuning.length - 1 - stringIndex
                    const note = getNoteAtFret(openNote, fret)
                    const inScale = isNoteInScale(note, rootNote, scaleFormula)
                    const interval = getInterval(rootNote, note)
                    const degree = getScaleDegree(note, rootNote, scaleFormula)
                    const isRoot = note === rootNote
                    const key = `${actualStringIndex}-${fret}`
                    const isChordTone = CHORD_TONE_INTERVALS.includes(interval)
                    const inPosition = isInPosition(fret)
                    const shouldShow = (!showOnlyChordTones || isChordTone) && inPosition

                    return (
                      <div key={stringIndex} className="relative flex items-center justify-center">
                        {/* String line */}
                        <div
                          className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px"
                          style={{
                            background: `linear-gradient(to bottom, #d4d4d4, #a3a3a3)`,
                            height: `${1 + (5 - stringIndex) * 0.3}px`,
                          }}
                        />
                        <NoteMarker
                          note={note}
                          isRoot={isRoot}
                          inScale={shouldShow && inScale}
                          interval={interval}
                          degree={degree}
                          displayMode={displayMode}
                          onClick={() => handleNoteClick(note, actualStringIndex, fret)}
                          isSelected={selectedNotes.has(key)}
                        />
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center text-sm">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-red-500" />
            <span className="text-zinc-400">Root</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-green-500" />
            <span className="text-zinc-400">3rd</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-blue-500" />
            <span className="text-zinc-400">5th</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-purple-500" />
            <span className="text-zinc-400">7th</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-cyan-500" />
            <span className="text-zinc-400">Blue Note</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-zinc-500" />
            <span className="text-zinc-400">Scale Note</span>
          </div>
        </div>
      </div>
    </div>
  )
}
